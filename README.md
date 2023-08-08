# byFood Take Home Test

## Quick Start

### Question 1-3
For the first three questions, `cd` into the directory of the question and running the following commands.

```bash
# To run the program
go run main.go

# To run the tests
cd answer
go test -v

```

### Question 4
View live demo [here](http://165.227.154.215/).<br>
For the forth question there are two parts, the backend API and the frontend. They both need to be running for the app to work. To setup and run the app, follow the steps below.
#### - Backend API
Run from the `question4/backend` directory
```bash
# API dependencies
go mod download

# Run tests (optional) 
go test -v 

# Run the api (leave this running)
go run api.go 
```

#### - Frontend web app
Run from the `question4/frontend` directory
```bash
# Frontend dependencies
npm install

# Run tests (optional) 
npm test

# Run the frontend (leave this running)
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view local instance of the app
