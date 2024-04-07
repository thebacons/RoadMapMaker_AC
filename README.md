# RoadMapMaker_AC
This version of RoadMapMaker is using office script and MS Excel. The node.js server is using adaptive cards. The node.js server connects to Microsoft powerautmate  and triggers a flow, which responds with the url of the roadmap as an Excel file it created.
# Overview

This solution is a Node.js application that uses Express.js for server-side operations and Axios for making HTTP requests. The application serves a static HTML page and exposes an endpoint (`/trigger`) that triggers a Power Automate flow when a POST request is made to it. The Power Automate flow generates a roadmap based on the provided start and end dates and a flag indicating whether weekends should be included. The flow then returns a URL to the generated roadmap, which the application sends back to the client.

# Client-Side Code

The client-side code is a simple HTML page with a form for the user to input the start and end dates and a checkbox to indicate whether weekends should be included in the roadmap. When the form is submitted, a JavaScript function makes a POST request to the `/trigger` endpoint with the form data. The server responds with a URL to the generated roadmap, which is then displayed on the page.

# Server-Side Code

The server-side code is a Node.js application using the Express.js framework. It serves the static HTML page and exposes the `/trigger` endpoint. When a POST request is made to this endpoint, the application formats the dates from the request body and sends a POST request to the Power Automate flow with the formatted dates and the `showWeekends` flag. The Power Automate flow returns a URL to the generated roadmap, which the application sends back in the response to the client.

# Power Automate Flow

The Power Automate flow is triggered by a HTTP request. It takes the start and end dates and the `showWeekends` flag from the request body and generates a roadmap based on this data. The flow then uploads the roadmap to a storage service and returns a URL to the uploaded file.

# Benefits of Using Adaptive Cards

Adaptive Cards provide a flexible way to display content in a consistent way across multiple platforms. They allow for the creation of rich, interactive content within your applications. In this solution, Adaptive Cards could be used to display the roadmap in a more interactive and user-friendly way.

# Functional Specification

This solution allows users to generate a roadmap based on a specified date range and a flag indicating whether weekends should be included. The user inputs the date range and the flag in a form on a web page, and the server generates the roadmap and returns a URL to the generated file.

# Technical Specification

This solution is a Node.js application using the Express.js framework for server-side operations and Axios for making HTTP requests. It serves a static HTML page and exposes a `/trigger` endpoint that triggers a Power Automate flow when a POST request is made to it. The Power Automate flow generates a roadmap and returns a URL to the generated file, which the application sends back in the response to the client. The client-side code is written in HTML and JavaScript, and the server-side code is written in JavaScript.

# Code Explanation

The server-side code is divided into several sections:

1. **Module Imports**: The necessary modules are imported. These include `express` for creating the server, `body-parser` for parsing incoming request bodies, `path` for handling file and directory paths, and `axios` for making HTTP requests.

2. **Server Setup**: An Express application is created, and middleware is set up to parse JSON request bodies and serve static files from the "public" directory and the root directory.

3. **Route Handlers**: Route handlers are set up for the root (`/`) route and the `/trigger` route. The root route serves the `index.html` file, and the `/trigger` route triggers the Power Automate flow and returns the URL of the generated roadmap.

4. **Server Start**: The server is started on port 3000.

The client-side code consists of a form for inputting the date range and the `showWeekends` flag, and a JavaScript function for making the POST request to the `/trigger` endpoint and displaying the returned roadmap URL.
