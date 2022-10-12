# URL Shortener

Users can shorten their long URL to a short one.

## Features 

- Users can paste their long URL and convert it to a simple and brief version.
- Users can use their new short URL after using our service.
- If users paste contents other than URL, they will see error message. 

## Screen Photos

#### Home page

![Home](/images/index.jpg)

#### URL Converted

![Result](/images/result.jpg)

#### Error

![Error](/images/error.jpg)


## Getting Started 

### Prerequisites

If you are windows user but has not installed git bash yet, please go to below link and download git bash.

- [git](https://git-scm.com/) - click 'Download for windows'

### Installing

1.Switch to your Terminal for MacOS or git-bash, CMD for Windows, and then clone this project to local.

```
git clone https://github.com/shorty60/url-shortener.git
```

2.change directory to project folder

```
cd url_shortener
```

3.Install npm packages

```
npm install  
```

4.Setting MongoDB environment variables

```
set "MONGODB_URI=Your MongoDB connection string" // for Windows cmd

export MONGODB_URI="Your MongoDB connection string" // for bash (Both MacOS bash terminal and Git bash for Windows)

```


5.Run URL shortener application

```
npm run start  
```

6.If your bash terminal(for Mac OS) or git bash(for windows) shown

```
Express is listening on http://localhost:3000
```

the application server starts successfully. 
Please go to [http://localhost:3000](http://localhost:3000) with your browser.

7.To turn off the application server, key in

```
ctrl + c
```
in your terminal.

## Built With 

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/)
- [Node.js](https://nodejs.org/zh-tw/download/) - v14.16.0
- [Express](https://www.npmjs.com/package/express) - v4.18.2
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - view engine template v6.0.6
- [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) - front-end template v5.2
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM v6.6.5
- [express-validator](https://express-validator.github.io/docs/) - server side validation v6.14.2

## Authors 

- [Author](https://github.com/shorty60) - Shorty Lin
