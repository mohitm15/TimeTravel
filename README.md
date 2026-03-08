[![Netlify Status](https://api.netlify.com/api/v1/badges/5da23b2d-e652-4ddd-893f-50587ae43f5c/deploy-status)](https://app.netlify.com/sites/adoring-einstein-8cdfd1/deploys)

# 🌏 TimeTravel

**TimeTravel** is a responsive web application that lets users explore the current time across major Asian capitals.
Users can search for a capital city, receive intelligent suggestions, and instantly view the current date, time, timezone, and country details along with the national flag.

The application focuses on a **clean modern UI**, **fast search experience**, and **useful country insights**.

---

# 🚀 Live Preview

### 🔗 Live Demo
👉 [https://timetravel-mohit.netlify.app/](https://timetravel-mohit.netlify.app/)

---

# ✨ Features

### 🔎 Smart City Search
* **Auto-Suggestion Dropdown**: Intelligent real-time suggestions while typing.
* **Contextual Suggestions**: Displays Asian capital cities alongside their corresponding countries and flag icons.
* **Keyboard Navigation**: Easy selection using mouse or keyboard.
* **Graceful Fallbacks**: Reverts to default city if input is cleared.

### ⏰ Real-Time Time Display
* Accurately fetches the current **Date**.
* Accurately fetches the current **Time**.
* Displays **Timezone information** and local time mappings.

### 🌍 Dynamic Country Information
Displays contextual country data using parallel API fetching (with skeleton loaders):
* **Country Name & Capital**
* **Currency** (Symbol & Name)
* **Population**
* **Primary Language**
* **National Flag** (Featuring a custom CSS 3D waving animation)

### 🎨 Enhanced UI (Revamp)
* **Glassmorphism Aesthetic**: Modern, semi-transparent frosted glass layout with soft neon accents.
* **Dark-Themed Dashboard**: Deep color palette for reduced eye strain and a premium feel.
* **Responsive Design**: Adapts beautifully across Desktop, Tablet, and Mobile screens.
* **Smooth Transitions**: Incorporates fade-in and pulse animations for loading states.

---

# 💻 Tech Stack
* **Frontend Framework**: React.js
* **Styling**: Tailwind CSS (Utility-first) & Vanilla CSS Modules
* **Icons**: Inline SVG Icons (Heroicons)
* **Components**: React-Autosuggest
* **APIs Used**: 
  * [Time.now API](https://time.now) (Time & Date)
  * [REST Countries API](https://www.apicountries.com) (Stats & Demographics)

---

# 📸 Screenshots


### Desktop View
<img width="1871" height="976" alt="timeTravel_web" src="https://github.com/user-attachments/assets/56a2851f-e807-4e11-a300-e361a6cfda4e" />


### Mobile View

#### View1
<img width="400" height="741" alt="timeTravel_mob1" src="https://github.com/user-attachments/assets/b2e6a34c-1436-42db-968a-8dc67b06b330" />

#### View2
<img width="399" height="888" alt="timeTravel_mob2" src="https://github.com/user-attachments/assets/9bc5ec44-7b4d-4f81-87b8-eff7d719877f" />

---

# 🛠️ Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohitm15/TimeTravel.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd TimeTravel
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
5. **Open** `http://localhost:3000` in your browser.
