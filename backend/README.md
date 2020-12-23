# Backend

## start
for dev purposes
`npm run devStart`

for prod purposes
`npm run start`

## functionality
The backend automatically checks in the startup if the following entities exist:
- measurements
- countries
- cities

if they are missing the get fetched into the database.

## db connection
The db connection needs a password. It is sent in the comment of the acn-code-now submission.
To config the database-password. Go to '/config/db.ts' and change the value of the `password`.

## possible improvements
- The api of thopenAQService is kinda instable and so slow, but when it's faster then there could be tests about if the import works fine
- For test cases there are only 1000 measurements imported, but before going live obiviously there would be a long running import process
