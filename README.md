## Food Finder Vancouver

- [General info](#general-info)
- [Technologies](#technologies)
- [Contents](#content)

## General Info

This browser based web application helps theoretical 2030 Olympic tourist find a place to eat.

Team members: Jackie Ma, Tracy Ly, and Alex Kong.

## Technologies

Technologies used for this project:

- HTML, CSS
- JavaScript
- Bootstrap
- Firebase
- JQuery

## Content

Content of the project folder:

```
 Top level of project folder:
├── .gitignore                  # Git ignore file
├── index.html                  # Landing HTML file, this is what users see when you come to url
├── login.html                  # Login page
├── search.html                 # Restaurant search page
├── restaurant.html             # Restaurant information page
├── main.html                   # User's saved restaurants page
└── README.md                   # This file.

It has the following subfolders and files:
├── .git                        # Folder for git repo
├── images                      # Folder for images
    ├── icons                   # Folder for icons
        /icons_down_arrow.svg   # Dropdown menu arrow. Unused.
        /icons_foodQuality.svg  # Food quality icon
        /icons_language.svg     # Language icon
        /icons_service.svg      # Service icon
        /icons_trending.svg     # Trending icon
        /icons_value.svg        # Value icon
    /back_arrow.svg             # Food quality icon
    /hero_bkg.svg               # Hero background image
    /logo.svg                   # App logo

├── restaurant generation       # Folder for restaurant generation script
    /rest.js                    # Contains a function that generates restaurants for Firebase. Unlink if not in use.
├── scripts                     # Folder for scripts
    /applyFilter.js             # Apply search query to restaurant list. Linked to search.html.
    /authentication.js          # Firebase widget for login.
    /changeRestaurantInfo.js    # Fills in HTML tags with a restaurants information. Linked to restaurant.html.
    /firebaseInit.js            # Initializes Firebase.
    /languagePrompt.js          # Prompts the user to translate to another language if they want. Linked to index.html
    /main.js                    # Gets and handles changes to the user's saved restaurant list. Linked to main.html.
    /savedList.js               # Gets and handles changes to the user's saved restaurant list. Linked to restaurant.html.
    /translate.js               # Translates pages back to English. Linked to many html files.
    /updateNav.js               # Updates the nav menu for logged in versus logged out. Linked to many html files.
├── styles                      # Folder for styles
    /style.css                  # Custom css for the whole project.

Firebase hosting files:
├── 404.html                    # Page shown if a file doesn't exist.


```