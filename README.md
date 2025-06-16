# Trip-Go Classic

## Overview
Trip-Go Classic is a clean-slate web application built using Vanilla JavaScript and Vite. It leverages the OpenTripMap API for place suggestions and the ExchangeRates API for currency conversion. The project is designed with a focus on modularity, accessibility, and performance, adhering to the principles covered in WDD 330.

## Features
- **Search Functionality**: Users can search for places using the OpenTripMap API, with autosuggestions displayed in a card format.
- **Itinerary Management**: Users can add and remove places from their itinerary, which is stored in the browser's localStorage.
- **Map Integration**: A map view displays the selected places using Leaflet, with markers for each location.
- **Responsive Design**: The application is styled using CSS variables for easy theming and includes animations for a smooth user experience.
- **Accessibility**: The project follows accessibility best practices, ensuring a usable experience for all users.

## Prerequisites
- Node.js (version 18 or higher)
- Git
- OpenTripMap API key (free tier)
- ExchangeRates API key (free tier)

## Getting Started

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/trip-go-classic.git
   cd trip-go-classic
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development
To start the development server, run:
```
npm run dev
```
This will launch the application in your default web browser.

### Building for Production
To build the application for production, run:
```
npm run build
```
The output will be generated in the `dist` directory.

### Deployment
You can deploy the application using GitHub Pages or Netlify. For GitHub Pages, run:
```
git subtree push --prefix dist origin gh-pages
```
For Netlify, link your repository and set the build command to `npm run build` with the output directory as `dist`.

## File Structure
```
trip-go-classic
├── src
│   ├── css
│   ├── js
│   └── assets
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
└── .prettierrc
```

## Usage
- Open `index.html` in your browser to view the application.
- Use the search bar to find places and add them to your itinerary.
- Navigate to the map view to see your selected places on the map.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.