# Google Places Details React

A React application that fetches and displays details of places using the Google Places API.

## Features
- Search for places using Google Places API.
- Display detailed information about a selected place.
- Responsive UI built with React.

## Installation

### Prerequisites
- Node.js and npm installed on your system.
- A Google API Key with access to Places API.
- .NET backend set up to wrap the Google Places API.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/hetavi20/google-places-details-react.git
   cd google-places-details-react
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google API key:
   ```sh
   REACT_APP_GOOGLE_API_KEY=your_api_key_here
   ```
4. Start the .NET backend service.
5. Start the development server:
   ```sh
   npm start
   ```

## Usage
- Enter a place name in the search bar.
- Select a place from the dropdown suggestions.
- View detailed information about the selected place.

## Technologies Used
- React.js
- .NET (for backend API wrapping)
- Google Places API
- Axios (for API requests)

