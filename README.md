💱 Currency Converter App

A simple Currency Converter built with React that allows users to convert amounts between different currencies in real-time using the Frankfurter API.


---

🚀 Features

Toggle converter form (Open / Close)

Convert between multiple currencies (USD, EUR, CAD, INR)

Real-time conversion using an external API

Debounced API requests for better performance

Abort previous requests when a new one starts

Loading state handling

Keyboard support (close with Escape key)

Reusable components (Button & Options)



---

🛠️ Technologies Used

React (Hooks)

JavaScript (ES6+)

CSS

Frankfurter Currency API



---

📂 Project Structure

src/
│── App.jsx
│── Button.jsx
│── Options.jsx
│── App.css


---

🧩 Components Overview

🔘 Button Component

Reusable button component

Accepts children and onClick props


🔽 Options Component

Reusable select dropdown

Props:

label

value

onChange

options

disabled




---

⚙️ How It Works

User enters an amount

Selects From and To currencies

App waits 400ms (debounce)

Sends
