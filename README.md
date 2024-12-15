# TéléSport - Olympics

## Description

This project is a web application developed from the **TéléSport** television channel.
It allows users to visualize and explore data related to previous editions of the Olympic Games. Built with the **Angular** framework, this application offers an intuitive and modern interface to discover comprehensive statistics on the performances of participating countries.

## Features

### Dashboard

* A **pie chart** displaying the total number of medals won by each country.
* Dynamic interaction: clicking on a country takes the user to a detailed page to explore the performance of that country.

### Country Detail Page

For each country, this page displays:

* The **number of medals per Olympic Games edition** (visualized through a line chart).
* The **total number of medals** won.
* The **number of participations** in the Olympic Games.
* The **total number of athletes** presented by the country.

## Technologies Used

* **Framework**:  Angular (TypeScript, SCSS)
* **Charting Library**: [ngx-charts](https://swimlane.gitbook.io/ngx-charts)
* **REST API**: Communication with a REST API to retrieve Olympic Games data.

## Installation and Usage

### Prerequisites

* Node.js 
* Angular CLI (version 18 or higher)

### Installation

1. Clone the repository:
```
git clone https://github.com/arnaud-romil/telesport-olympics.git
cd telesport-olympics
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
ng serve
```

4. Access the application in your browser: `http://localhost:4200`.

## Project Structure

Here is a simplified view of the main file organization:

```
teleport-olympics/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   ├── pages/
│   ├── assets/
├── angular.json
├── package.json
```

## Contributions

In order to contribute to this projet:

1. Fork the project.

2. Create a branch for your modifications:

```
git checkout -b feature/your-feature-name
```

3. Submit a pull request.

## Authors

* **DelivWeb**

## Licence

This project is the property of **DelivWeb**. All intellectual property rights are reserved by the company. Unauthorized use, reproduction, or distribution of any part of this project is strictly prohibited without prior permission from **DelivWeb**.

