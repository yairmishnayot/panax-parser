# Panax-Parser

## Installation

1. Run `npm install`
2. Add .env file with DB configurations in the root of the project. See .env.example file
3. Run `npm migrate`

## Running the project

1. Run `npm run build`
2. Run `npm run start`

## Testing

1. It's recommended to create a separate DB for testing. You can create it and run the migrations on it like the original DB.
2. make sure you have .env.test file in the root of the project, for format - see .env.example file
3. run `npm run test`

## Assumptions:

1. If the reference number exists in a transaction, it is unique
2. We can use the server's time zone for saving the dates.
3. The date format in the CSV file for the date field is from the type "30/12/2022"
4. No need for rate-limiting
