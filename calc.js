/*
 * Цю функцію вам потрібно реалізувати
 * Ви можете змінити її вміст на власний розсуд
 */
function grandTotal(donations) {
	// Parameter "donations" is an array of objects.
	// Each object has 2 properties: name (user who did donation) and amount (sum of donation)
	// You need to do the following:
	// 1) Calculate total amount of all donations and output it in the console
	// 2) Define the 3 top donators. We should output their names and amount into the console in ascending order

	// PUT YOUR CODE HERE
}

/*
 * Будь ласка, не змінюйте решту цього файла
 */
function main() {
	
	// check command line argument for csv filename
	const params = process.argv
	if (params.length !== 3) {
		console.error("Unsupported number of agruments")
		console.log(params)
		console.log("Usage:")
		console.log("\tnpm run start data/sample0.csv")
		console.log("\tnode calc.js data/sample0.csv")
		return
	}

	const fs = require("fs")
	const csvParser = require("csv-parser")

	const filename = params[2]
	console.log("Reading CSV file:", filename)
	const donations = []

	fs.createReadStream(filename)
		.pipe(csvParser())
		.on("data", (data) => {
			donations.push({
				name: data.name,
				amount: Number(data.amount)
			})
		})
		.on("end", () => {
			console.log("Total number of donations:", donations.length)
			console.log()
			console.log("Calculating all the donations")
			grandTotal(donations)
		})
}

main()