
# Alzheimer

Take care of your alzheimer friend's!

## Installation


Clone the repository

```bash
  git clone https://github.com/DevCrews/alzheimer
```

Navigate into the project's directory

```bash
    cd ./alzheimer

```

### Run the server

Navigate into backend folder

```bash
    cd ./backend.
```

Start the server

```bash
    node index.js
```

### Ngrok Configuration

1. Install Ngrok

```bash
    npm install ngrok -g
```

2. Forward the port 5000 to Ngrok using the below command

```bash
    ngrok http 5000
```

3. Now copy the ngrok url ( We will be using later in the project while running )

### Run the app in Expo Go

Copy the ngrok url and replace the url inside the axios-config.js file with the current ngrok url




Go back to alzheimer directory

```bash
    cd ..
```


Install the required npm packages

```bash
    npm install
```

Install Peer Dependency ( Note : Only perform this action only if the above steps throws error. )


```bash
    npm install --legacy-peer-deps`
```

Start the app

```bash
    npm start
```

Now scan the QR Code shown in the terminal using the Expo Go App. Hurray the app is now lauched!

