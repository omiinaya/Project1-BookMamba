# PROJECT 1: Book search API

***Authors: Omar Minaya, Keyla Santoyo, Marcos Marti & Enid Soto***

## User Story

As a book lover  
I want to find the most popular books in a given topic  
So I can read the best books only

## Purpose of the Application

We developed a simple application where an user can search for books and receive the highest rated results we could find. The site also adds value to the user by displaying inspirational quotes and the top 3 books in the New York Times best sellers list.

The main purpose of the project is to apply all the knowledge we acquired in the first part of the UM Full Stack Developer Bootcamp 2019-2020.

## Concept

The name of the application is "Book Mamba." We chose the name of a snake because in some cultures, this animal is a symbol of wisdom. The UI is modern, strong, and sleek.

## Technologies used

The application's interface was built with the *Bulma* framework and custom css styles. The functionality was implemented with jQuery and custom javascript.

## APIs used

- "They Said So" quotes API
- Google Books API
- New York Times best sellers API

## Functionality

On load, the page displays a random inspirational quote and the top 3 books from the New York Times best sellers list. At the top of the page, the user has a search bar where they can type in a keyword, title or ISBN. The user can click the search icon or press the "Enter" key. The application takes the user input and performs a request to the Google Books API, then the responses from the API are sorted to include only the top rated books. The user can click the "view next" button to get another high rated result.

## User interface

![Book Mamba user interface](assets/images/book-mamba-ui.png)

## Link to the deployed application

You can find the deployed application [here](https://omiinaya.github.io/Project1/)








