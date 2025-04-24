# 🪙 Real-Time Crypto Price Tracker

A responsive, real-time cryptocurrency price tracker built with **React** and **Redux Toolkit**. This project simulates WebSocket updates and efficiently manages global state using Redux, showcasing key metrics for major cryptocurrencies.

## 🚀 Features

- 📊 Real-time simulation of crypto price updates
- 🧠 State management using Redux Toolkit
- 📈 Responsive table layout with static 7D charts
- ✅ Percentage changes color-coded for clarity
- ⚡ Optimized re-renders using selectors

## 📷 Demo

[Click here to watch the full demo video](https://youtu.be/RTWeL407I04)

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit**
- **JavaScript**
- **Tailwind**
- **Mocked WebSocket** via `setInterval`

## 🧩 Architecture

- **Redux Store**: Configured with a single slice `cryptoSlice` that stores all asset data.
- **Selectors**: Used to extract and memoize data, ensuring minimal re-renders.
- **Data Simulation**: Prices and metrics are updated every 2 seconds to mimic real-time behavior.

## 📦 Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```
