
import json
from datetime import datetime
import os

# Define base paths
base_dir = "/Users/arsenyspb/projects/foodbuddy-insta/foodbuddy_replica"
json_export_path = "/Users/arsenyspb/projects/foodbuddy-insta/foodbuddy_export_json"
posts_json_path = os.path.join(json_export_path, "your_instagram_activity/media/posts_1.json")
thumbnail_dir = os.path.join(base_dir, "media/thumbnails")

# Load the JSON data
with open(posts_json_path, encoding='utf-8') as f:
    posts = json.load(f)

# Function to fix broken encoding
def fix_encoding(text):
    return text.encode('latin-1').decode('utf-8')

# Create the main index.html page
index_html = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Foodbuddy Insta</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Foodbuddy Insta</h1>
    <div class="grid-container">
"""

for i, post in enumerate(posts):
    thumbnail_uri = None
    if post.get('media'):
        # Find the first image in the media list to use as a thumbnail
        for media_item in post['media']:
            if media_item['uri'].endswith('.jpg'):
                thumbnail_uri = media_item['uri']
                break

        # If no jpg is found, check for a video and its generated thumbnail
        if not thumbnail_uri:
            for media_item in post['media']:
                if media_item['uri'].endswith('.mp4'):
                    video_filename = os.path.basename(media_item['uri'])
                    thumbnail_filename = os.path.splitext(video_filename)[0] + '.jpg'
                    thumbnail_path = os.path.join("media/thumbnails", thumbnail_filename)
                    absolute_thumbnail_path = os.path.join(base_dir, thumbnail_path)

                    if os.path.exists(absolute_thumbnail_path):
                        thumbnail_uri = thumbnail_path
                        break

    if thumbnail_uri:
        index_html += f'<div class="grid-item"><a href="posts/{i}.html"><img src="{thumbnail_uri}" width="300"></a></div>'
    else:
        # Fallback for posts with no media or no generated thumbnail
        index_html += f'<div class="grid-item"><a href="posts/{i}.html"><div class="video-thumb">NO THUMBNAIL</div></a></div>'

index_html += """
    </div>
</body>
</html>
"""

with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(index_html)

# Create individual post pages
for i, post in enumerate(posts):
    post_html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post {i}</title>
    <link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body>
    <div class="post-container">
"""
    if post.get('media'):
        for media in post['media']:
            media_path = os.path.join('..', media["uri"])
            if media['uri'].endswith('.jpg'):
                post_html += f'<img src="{media_path}" width="600"><br>'
            elif media['uri'].endswith('.mp4'):
                post_html += f'<video width="600" controls><source src="{media_path}" type="video/mp4"></video><br>'

    caption = post.get('title', '')
    if not caption and post.get('media'):
        caption = post['media'][0].get('title', '')

    # Fix the encoding of the caption
    caption = fix_encoding(caption)

    timestamp_val = post.get('creation_timestamp')
    if not timestamp_val and post.get('media'):
        timestamp_val = post['media'][0].get('creation_timestamp')

    date_str = ''
    if timestamp_val:
        date_str = datetime.fromtimestamp(timestamp_val).strftime('%Y-%m-%d %H:%M:%S')

    post_html += f"""
        <p>{caption}</p>
        <p>{date_str}</p>
        <a href="../index.html">Back to main page</a>
    </div>
</body>
</html>
"""
    with open(os.path.join(base_dir, f'posts/{i}.html'), 'w', encoding='utf-8') as f:
        f.write(post_html)

print("Static site generated successfully with encoding fix!")
