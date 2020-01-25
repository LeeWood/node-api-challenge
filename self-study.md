# ***NODE API SRINT CHALLENGE SELF STUDY QUESTIONS***

### 1.Mention two parts of Express that you learned about this week.

- Express is a framework that works with NodeJS to add extra functionality and makes the process of building servers and APIs more simple.Express provides us with convienence helpers right out of box that are already "assembled" so we can implement communications between the client and the server. One of the key features of Express is routing, or letting us write which request functions are executed based on the url and HTTP method being sent by the client.

### 2. Describe Middleware?

- Middleware are functions that extend the software capabilities of Express. They can be described as an array or functions that a request is sent through before the response is returned. A request is sent and middleware is what that data is run through before the server sends a response to the client. They are run in the order that they're introduced to the server, so order matters depending on the outcome you're trying to achieve with your middleware. There are three types of middleware: out of box, or from the Express software, third party, or middleware written and shared by other developers, and custom middleware, or middleware that a developer writes themselves.

### 3.Describe a Resource?

- A resource is the useful data in an API. The objects in the api that can be accessed by the user through the client. Essentially resources are the "meat" of our APIs that we build.

### 4. What can the API return to help clients know if a request was successful?

- In order to let the client know that a request was successful APIS can return the resulting status of the request from the server after the request has been sent (a 200 or 201 status, for example). APIs can also implpememnt logging to the console to let devs know that their requests were successful or not.

### 5. How can we partition our application into sub-applications?

- Much like when using mulitple components to handle different levels of functionality in frontend, we can also break our servers into sub-applications.There can be specific files with their own endpoints, routes, and functionality for things like users, admins, and emplyees for example. 