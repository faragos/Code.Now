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

if they are missing the get fetched into the database. (Be careful with reimporting data sometimes the coordinates are missing)

## db connection
The db connection needs a password. It is sent in the comment of the acn-code-now submission.
To config the database-password. Go to `/config/db.ts` and change the value of the `password`.

## possible improvements
- The openAQapi is a little bit instable, inconsistent and slow, but when it would be stable and fast there could be tests about if the import works fine
- For test cases there are only 10000 measurements imported, but before going live obviously there would be a long running import process
- ...and as always more tests 😄
