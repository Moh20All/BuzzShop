// src/components/Autocomplete.js
import React, { useState, useEffect } from 'react';

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this._findAllWords(node, prefix);
  }

  _findAllWords(node, prefix) {
    let words = [];
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (const char in node.children) {
      words = words.concat(this._findAllWords(node.children[char], prefix + char));
    }
    return words;
  }
}

// Levenshtein distance function
const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

const Autocomplete = ({ keywords, onSelectSuggestion, onFilter }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(new Trie());

  // Build the Trie when keywords change
  useEffect(() => {
    const newTrie = new Trie();
    keywords.forEach((productName) => {
      // Split product name into individual words and insert each word into the Trie
      const words = productName.split(' ');
      words.forEach((word) => newTrie.insert(word.toLowerCase()));
    });
    setTrie(newTrie);
  }, [keywords]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const prefix = value.toLowerCase();
      const results = trie.search(prefix);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSelectSuggestion(suggestion); // Notify parent component
    setSuggestions([]); // Clear suggestions
  };

  // Handle filter button click
  const handleFilterClick = () => {
    // Check if any product name contains the query
    const matchingProducts = keywords.filter((productName) =>
      productName.toLowerCase().includes(query.toLowerCase())
    );

    if (matchingProducts.length > 0) {
      onFilter(query); // Filter with the query
    } else {
      // Find the nearest keyword using Levenshtein distance
      let nearestWord = '';
      let minDistance = Infinity;

      keywords.forEach((productName) => {
        const distance = levenshteinDistance(query, productName);
        if (distance < minDistance) {
          minDistance = distance;
          nearestWord = productName;
        }
      });

      if (nearestWord) {
        setQuery(nearestWord); // Update the query with the nearest word
        onFilter(nearestWord); // Filter with the nearest word
      } else {
        alert('No matching products found.');
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleFilterClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Filter
      </button>
    </div>
  );
};

export default Autocomplete;