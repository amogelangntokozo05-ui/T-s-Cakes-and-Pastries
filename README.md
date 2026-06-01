# T's Cakes and Pastries

## Student Information
- **Student Name:** [Amogelang Kunene]
- **Student Number:** [ST10071157]
- **Course :** WEDE5020

## Project Overview (complete)
**Name of Organization:** T’s Cakes and Pastries
T's Cakes and Pastries began in 2024 when the owner turned a love for baking into a small business. It started with homemade cakes, muffins, scones, and pastries made for friends, family, funerals, and local events. It quickly grew through word-of-mouth. Today, T’s Cakes and Pastries is known in the community for freshly baked goods, friendly service, and treats made with love and care. The target audience focuses on Families, Students, Working professionals, and anyone who enjoys freshly baked goods. We also cater to customers looking for cakes and pastries for Birthdays, Celebrations, Funerals, and Special events.

## Website Goals and Objectives
The main goals of this website are to:
- Help customers easily look at our products and connect with the bakery.
- Showcase our freshly baked goods through high-quality photos.
- Promote current and seasonal special offers.
- Provide clear contact details and location maps so customers can make direct enquiries or place orders effortlessly.

## Key Features and Functionality
This website includes comprehensive, well-detailed pages that serve the bakery's customers:
- **Homepage (`index.html`)**: Features a hero image, brief introduction, clear call to action, navigation menu, and highlights "Featured Products" and "Current Specials".
- **About Us (`about.html`)**: Details the organisation's history, mission, vision, team members, and specifically outlines the site goals and target audience.
- **Products and Services (`services.html`)**: Contains detailed information about the bakery's offerings including Cakes, Bread, Pastries, and Custom Orders.
- **Gallery (`gallery.html`)**: A beautifully categorized gallery showing pictures of the baked goods.
- **Enquiry (`enquiry.html`)**: A highly semantic form allowing for detailed product/service enquiries.
- **Contact (`contact.html`)**: Includes phone numbers, social media links, a contact form, and embedded maps showcasing multiple assigned locations (Johannesburg and Pretoria).

## Timeline and Milestones
- **Milestone 1:** Project requirements analysis and research. *(Completed)*
- **Milestone 2:** Folder structure setup and semantic HTML base code. *(Completed)*
- **Milestone 3:** CSS styling and responsive layout designs. *(Completed)*
- **Milestone 4:** Premium JavaScript interactivity, Leaflet maps, catalog sorting & gallery lightboxes. *(Completed)*
- **Milestone 5:** Form Functionality, Client-Side Validation & AJAX Asynchronous integration. *(Completed)*

---

## 📝 Form Processing, Client-Side Validation & AJAX Workflows

We have implemented a premium form processing architecture on both `enquiry.html` and `contact.html` with robust JavaScript verification engines.

### 1. 🎂 Enquiry Form & Dynamic Cost Engine (`enquiry.html`)
- **Action Endpoint**: Submits asynchronously using `FormData` and native `fetch` POST requests directly to `https://httpbin.org/post`.
- **Client-Side JS Validation**:
  - Checks alphabetical string constraints for the full name.
  - Verifies email patterns against RFC-5322 specifications.
  - Ensures exactly 10-digit South African mobile phone numbers.
  - Validates that custom cake and booking dates are selected **at least 48 hours in the future** to guarantee preparation schedules.
- **Dynamic Cost Engine (AJAX callback)**:
  - Parses category base prices: Signature Cakes (`R450`), Baked Bread (`R45`), Pastries (`R25`), Muffins (`R20`), Scones (`R15`), Custom (`R500`).
  - Automatically calculates volume discount (10% bulk deduction if quantity is 10 or more items).
  - Appends a R150 delivery surcharge if the "Local Delivery" radio parameter is checked.
  - Computes a strict 50% deposit required schedule.
  - Triggers customized allergy warning highlights based on checked dietary attributes (Gluten-Free, Vegan, Nut Allergy).
  - Generates a beautifully formatted HTML invoice layout inside `enquiry-response-container` on success.

### 2. 📧 Contact Form & Email Compiler (`contact.html`)
- **Action Endpoint**: Intercepts standard redirect methods, submitting a POST request asynchronously to `https://httpbin.org/post` via AJAX.
- **Basic Contact details**: Requires visitor's Name, Email, and Phone Number.
- **Type of Inquiry**: Implemented a styled selector dropdown for: `General Feedback`, `Customer Support`, `Catering Request`, `Sponsorship & Volunteers`.
- **Email compilation flow**:
  - Displays a glassmorphic success modal confirming database logging.
  - Triggers a compiled browser `mailto:info@tscakes.co.za` redirect on click, auto-populating subject and body with structured form values for a seamless communication experience.

### 3. 🔴 Visual Error Handling & Tooltips
- Invalid fields dynamically trigger high-contrast red borders (`.field-invalid`) and display detailed visual instructions on submit.
- Textareas possess live character counters (`123 / 500 characters`) shifting red if approaching limits.

This submission constitutes Part 1 of the Web Development assignment. It focuses singularly on **HTML5 structure, semantic markup, and comprehensive local file organization**. No CSS or JS has been actively deployed, matching the strict assignment logic constraints for this phase.

## Sitemap
1. **Home (`index.html`)**
2. **About Us (`about.html`)**
3. **Products & Services (`services.html`)**
4. **Gallery (`gallery.html`)**
5. **Enquiry (`enquiry.html`)**
6. **Contact (`contact.html`)**

## Changelog
- **v1.0.0**: Initialized project and created foundational folder structure (`css/`, `js/`, `images/`).
- **v1.0.1**: Built foundational HTML files (`index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`).
- **v1.0.2**: Integrated project overview text, explicit semantic HTML5 layout tags (`<header>`, `<main>`, `<article>`), and theoretical code comments.
- **v1.0.3**: Added `gallery.html` branch and mapped local imagery to product features.
- **v1.0.4**: Established active navigation states across all 6 pages. Checked against final WEDE5020 Part 1 Rubric specifications.

## References

