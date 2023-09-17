// Function to format large numbers
export const formatLargeNumber = (number) => {
    if (number >= 1e12) {
      return `${(number / 1e12).toFixed(1)}T`; // Trillion
    } else if (number >= 1e9) {
      return `${(number / 1e9).toFixed(1)}B`; // Billion
    } else if (number >= 1e6) {
      return `${(number / 1e6).toFixed(1)}M`; // Million
    } else if (number >= 1e5) {
      return `${(number / 1e3).toFixed(1)}K`; // Thousand
    } else {
      return number.toString();
    }
}