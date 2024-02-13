const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
const formattedTime = `${hours}:${minutes}:${seconds}`;

console.log("Current date:", formattedDate);
console.log("Current time:", formattedTime);