module.exports = {
    // Format date as MM/DD/YYYY
    format_date: (date) => {
      return date.toLocaleDateString('en-US');
    },
    // Pluralize words based on amount
    format_plural: (word, amount) => {
      return amount === 1 ? word : `${word}s`;
    },
    // Shorten content to the specified length
    format_snippet: (content, length = 100) => {
      if (content.length > length) {
        return `${content.substring(0, length)}...`;
      }
      return content;
    },
  };