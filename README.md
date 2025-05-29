# URL-Shortner
URL-Shortner
# URL Shortener

A simple URL shortener service built with Node.js, Express, and MongoDB.  
Shorten long URLs into easy-to-share short links, with QR code generation support.

## Features

- Generate short URLs for any valid original URL
- Redirect short URLs to the original URL
- QR code generation for each short URL
- Persistent storage with MongoDB Atlas
- Simple REST API endpoints

## Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose (ODM)
- nanoid (for generating unique short IDs)
- qrcode (for generating QR codes)

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/mayu615/URL-Shortner.git
   cd URL-Shortner
