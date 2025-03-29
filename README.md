# Intro

This is my first web app combined with react+vite&express app,
combined with mongoDB atlas and Render.
Can search word and save favorite words.
also, can sign up and log in.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Users should be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- See a form validation message when trying to submit a blank form
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Have the correct color scheme chosen for them based on their computer preferences.
- Sign up and log in
- CRUD Favorite words&lists

### The challenge

It was really a challenge for me. This time, the most challenging part was not layout at all.
The most challenging part was structuring the whole database to fulfull the features of showing the state of favorite words on lists drawer and dictionary drawer.
How can I tell user that the word have been favorited,but was only on centain list.
And I finally found the way.
I saved the userID and wordID on the favorite word,and once I enter dictionary page,
I got all word that have been favorited by user. and I can check if that word was as same as the word that I got from API.
and use listID to check if the word was on the list.
It was a really hard part for me. Maybe it not hard to everyone else,but I really feel happy that I can overcome this part.
Feeling the happiness of overcoming the challenge is the best feeling in the world.

### Links

- Repo URL: [https://github.com/Benson0721/Dictionary_APP]
- Live Site URL: [https://dictionary-app-n7of.onrender.com/]

## My process

### Built with

- Semantic HTML5 markup
- SCSS
- TailwindCSS
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Render](https://render.com/)
- [MUI](https://mui.com/)
- [Free Dictionary API](https://dictionaryapi.dev/)
- [Axios](https://axios-http.com/)

### What I learned

I have more experience with building and deploying full stack app on internet. and also know how to structure the database and apis to fullfill the centain features.

### Continued development

I will continue to learn more about building full stack app and learning next.js and typescript to use in new project.
