
# Foodbuddy Instagram Replica

Hello, I'm Gemini CLI. I created this static website as a local, clickable archive of the "foodbuddy" Instagram account. This project was generated from an official Instagram JSON data export.

## Project Overview

The goal of this project was to create a self-contained, serverless replica of an Instagram profile that can be hosted locally or on static site hosting services like GitHub Pages. The entire website is built from the data provided in the JSON export.

## Generation Process

The static site was generated using a combination of shell scripting and Python. The process involved the following key steps:

1.  **Data Analysis:** I began by analyzing the structure of the Instagram JSON export to understand how posts, media, captions, and timestamps were organized. The primary data source was `your_instagram_activity/media/posts_1.json`.

2.  **Directory Scaffolding:** I created the basic directory structure for the static site, including the root directory, a `posts` directory for individual post pages, and a `media` directory to store all images and videos.

3.  **Media Migration:** All media files (images and videos) were copied from the JSON export's `media` directory into the `foodbuddy_replica/media` directory.

4.  **Static Site Generation:** A Python script (`generate_site.py`) was developed to automate the creation of the HTML files. This script performs the following actions:
    *   Reads the `posts_1.json` file.
    *   Generates an `index.html` file with a grid of thumbnails for all posts.
    *   Creates individual HTML pages for each post in the `posts/` directory, containing the post's media, caption, and timestamp.

5.  **Styling:** A `style.css` file was created to provide a basic, Instagram-like visual layout for the website.

## Challenges and Solutions

During the development process, I encountered and resolved several challenges:

*   **Broken Media Links:** Initially, the paths to media files were incorrect, resulting in broken images and videos. This was resolved by correcting the relative paths in the `generate_site.py` script.

*   **Incorrect Timestamps:** Many posts were displaying incorrect dates (defaulting to 1970). I fixed this by making the script more robust, checking for the `creation_timestamp` at both the post and media levels within the JSON data.

*   **Broken Video Thumbnails:** The main grid page was attempting to use video files as image thumbnails, resulting in broken image icons. To solve this, I implemented the following:
    1.  Created a `generate_thumbnails.sh` script that uses `ffmpeg` to automatically extract a thumbnail from the first frame of each video.
    2.  Stored these thumbnails in a new `media/thumbnails` directory.
    3.  Updated the `generate_site.py` script to use these generated thumbnails for video posts on the main grid.

*   **Missing Post Text:** Some post pages, particularly those for videos, were missing their captions. I addressed this by updating the script to search for the caption text in multiple possible locations within the JSON data structure for each post.

*   **Character Encoding Issues:** Emojis and special characters were not displaying correctly due to a character encoding mismatch. This was resolved by:
    1.  Adding a `<meta charset="UTF-8">` tag to all generated HTML files.
    2.  Implementing a fix in the Python script to correctly decode the text from the JSON file, which had been improperly encoded during the export process.

## How to Regenerate the Site

To regenerate this static website from the original Instagram JSON export, follow these steps:

1.  **Ensure Dependencies are Met:** Make sure you have Python 3 and ffmpeg installed on your system.

2.  **Generate Video Thumbnails:** Run the thumbnail generation script from the project root directory:
    ```bash
    ./generate_thumbnails.sh
    ```

3.  **Generate the Static Site:** Run the Python script to generate the HTML files:
    ```bash
    python3 generate_site.py
    ```

This will rebuild the entire static site in the `foodbuddy_replica` directory based on the contents of the JSON export.
