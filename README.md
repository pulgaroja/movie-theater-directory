# Local Movie Theater Directory

This project was created as a Code Challenge for Rockstar Coders. Built using `create-react-app` and "The Movie DB" free API service.

To keep the code light and simple it's build using custom CSS and simple Functional React components. Although I love SCSS, I'm opting to use vanilla CSS to restrain from adding pre-processors or additional packages to a minimum (as per code challenge instructions).

## Instructions

Ok well, that's all fine and nice but let's get to the good stuff, how do I run this puppy? It's simple, just follow these steps:

1. Open your terminal and cd into this project
2. Run the following command to install the project dependencies: `yarn install`
3. Once it's done, you're all set to run it locally, write out this command: `yarn start`

This will build and run the React project, once it's finished compiling it will open a browser window with `http://localhost:3000` as it's location and load the app.

## Some more information

I've added a Prettier config file which helps me keep my code looking just the way I like it, however it's also a great tool in cases where the required standards collide with personal preferences as it ensures the correct format is saved.

The only additional package I installed was `react-router-dom`, this is because when navigating between views (movie directory and movie detail) users expect the ability to use broswer navigation to go back, and thus the need for routing. This [package](https://www.npmjs.com/package/react-router-dom) is one of the most used with a heavy number of weekly downloads and great community support, it's also heavily used in courses and tutorials and it's the package I have experience with.

## Main Components

So let's breakdown the project:

App Component: as the parent component, it has all shared state management, our Router, as well as the two main network requests used to feed information into the app: getMovies and searchMovies (we'll talk more about these later).

Header Component: I took inspiration from the design link shared in the challenge and built this component to provide the app with a clean look that dynamically updates depending on the page being viewd:

- Directory: shows a custom image taken from "The Net" (a personal favorite), as well as the search component which links back to the App component as that's where the state lives. Here I wanted to display how props can be used input information as well as event handling.

- Detail View: it hides all default text and the search input and loads the backdrop image for the selected movie. Here I wanted to show usage of different images provided by the API.

Directory Component: I built this separately as the App component to keep the render code separate and with it overall a cleaner code base. This component is in charge of rendering the data loaded by the App component, regardless of it it's the Recommended Movie list or Search results.

Detail View Component: here I decided to make use of [The Movie DB API documentation](https://developers.themoviedb.org/3/movies/get-movie-details) and used the `/movie/{movie_id}` to grab as much relevant information for the selected movie as possible. This component was looking a bit heavy given the amount of information being displayed, for this reason I decided to break up the render code into two separate stateless components: Detail Header and Detail Content.

## Additional Components

- Alert: whenever a project is dealing with network calls we must provide error handling to prevent app crashes and gracefully alert the user of any issues.

- Footer: when creating The Movie DB API Key they require you to agree with their Terms and Conditions, here they state that when it's a free account we must show their logo and a specific message. I decided the best way to show this was in the footer. I also added my name and the date I started the project to keep it simple for any evaluator to know who created the app.

- Rating: I wanted to keep the rating component as light and simple as possible, but also in it's own component as to keep code clean and lean.

## Network and Utils

As a best practice I've used on many projects and that I've seen many other developers use, I created two separate Javascript files to contain all network methods as well as all utilities methods. There aren't that many but this follows the single concept principle and keeps the code clean and easy to navegate.

> NOTE: the API Key is sensitive information and would normally be passed using environment variables, but given the nature of this particular project and for ease of testing I left it as a separate constant which could be easily updated.

## Questions or Comments

Please feel free to reach out through any of the following options:

- Email: crojassoto@gmail.com
- LinkedIn: https://www.linkedin.com/in/cristinarojassoto/

## Thank you for your time and consideration
