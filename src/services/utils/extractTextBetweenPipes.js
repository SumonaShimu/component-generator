
export function extractTextBetweenPipes(inputText) {
  const regex = /\|([^|]+)\|/g;
  const matches = inputText.match(regex);
  if (matches) {
    const res = matches.map((match) => match.slice(1, -1));// Remove the leading and trailing pipes
    console.log(res[0]);
    return res[0]; 
  } else {
    return [];
  }
}
