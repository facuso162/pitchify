<div align="center">
  <br />
    <a href="https://youtu.be/Zq5fmkH0T78?feature=shared" target="_blank">
      <img src="https://github.com/user-attachments/assets/471e2baa-8781-43b8-aaed-62e313d03e99" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=react&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Sanity-black?style=for-the-badge&logoColor=white&logo=sanity&color=F03E2F" alt="sanity" />
  </div>

<h3 align="center">Startup Directory Platform</h3>
   <div align="center">
     This project is based on the <a href="https://youtu.be/Zq5fmkH0T78?si=M3JCM3PflnTri97b" target="_blank"><b>JavaScript Mastery tutorial project</b></a> 
   </div>
</div>

## Project description

Pitchify is a platform designed for entrepreneurs to professionally showcase their projects, connect with the audience, and gain valuable feedback.
Perfect for startups, innovators, and creatives looking for visibility and meaningful connections.

## Tech stack

- React 19
- Next 15
- Sanity
- Tailwind CSS
- TypeScript

## Features

- **Google Authentication**: Log in seamlessly using your Google account.  
- **Pitch Submission**: Share your startup ideas by submitting a title, description, and multimedia.  
- **View Pitches**: Explore a variety of pitches with an intuitive browsing experience.  
- **Pitch Details Page**: Dive into the details of any pitch, including multimedia and descriptions.  
- **Profile Page**: Manage and view all the pitches you've submitted in one place.
- **Edit profile**: Edit your information easily.  
- **Search**: Quickly find pitches using an efficient search functionality.  
- **Minimalistic Design**: Enjoy a clean and user-friendly interface with essential features.

## Quick start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- Git
- Node.js
- npm (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/facuso162/pitchify.git
cd pitchify
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION='vX'
SANITY_TOKEN=

AUTH_SECRET= 
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

Replace the placeholder values with your actual Sanity credentials. You can obtain these credentials by signing up &
creating a new project on the [Sanity website](https://www.sanity.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
