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
	let arrayWithoutDublicates = []
	donations.forEach(donation => {
		if (!arrayWithoutDublicates[donation.name]) {
			arrayWithoutDublicates[donation.name] = { ...donation }
		} 
		else {
			arrayWithoutDublicates[donation.name].amount += donation.amount
		}
	})

	donations = Object.values(arrayWithoutDublicates).sort((donationA, donationB) => {
		return donationA.amount - donationB.amount
	})

	const start_point = donations.length - 3
	let sum = 0
	for (let i = 0; i < donations.length; i++) {
		sum += donations[i].amount
	}
	
	console.log("Total amount: "+sum+"\nTop donators: ")
	let current_number = 3
	for (let i = start_point; i < donations.length; i++) {
		console.log(`${current_number--}. ${donations[i].name} ${donations[i].amount}`)
	}
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