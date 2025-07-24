const generateUniqueArray = (start, end, length) => {
  const range = [];
  
  // Create the range array
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Check if length is valid
  if (length > range.length) {
    throw new Error("Length exceeds the number of unique values in the range.");
  }

  // Shuffle the range using Fisher-Yates algorithm
  for (let i = range.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [range[i], range[j]] = [range[j], range[i]];
  }

  // Return the first 'length' elements
  return range.slice(0, length);
}

export default generateUniqueArray