# QFHO Tournament Project

COMP229-M2021-Team10 Final Project

## Features

- You can view a list of tournament without login.
- Tournament has 3 states: Open, Playing and Finished.
- A tournament need 8 players to start, you can log in to join it.
- When you logged in, you can create a new tournament with name, description and start date, you cannot change these information later; you can also join a tournament.
- If you created a tournament, you can delete it. When a tournament has enough players, you can set Semifinals, Finals and Winner.

## Installation

Open terminal

```bash
cd tournament/server
npm i
npm start
```

You should see the result:

```bash
> server@1.0.0 start
> node server.js

Server is running on port: 5000
MongoDB databse connection established successfully
```

Open another tab in terminal

```bash
cd tournament
npm i
npm start
```

You should see the result:

```bash
Compiled successfully!

You can now view tournament in the browser.

Local:            http://localhost:3000
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
