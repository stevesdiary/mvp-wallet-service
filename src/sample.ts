const generatedNumbers = new Set<number>();

function generateUnique10DigitNumber(): number {
  let number: number;
  do {
    // Generate a random 10-digit number
    number = Math.floor(1000000000 + Math.random() * 9000000000);
  } while (generatedNumbers.has(number));

  // Add the number to the set to ensure uniqueness
  generatedNumbers.add(number);
	console.log(number, )
  return number;
}

function generateMultipleUniqueNumbers(count: number): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(generateUnique10DigitNumber());
  }
  return numbers;
}

// Automatically generate and print 10 unique 10-digit numbers
const uniqueNumbers = generateMultipleUniqueNumbers(10);
console.log('Generated unique 10-digit numbers:', uniqueNumbers);
