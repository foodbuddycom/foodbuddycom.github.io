#!/bin/bash

VIDEO_DIR="/Users/arsenyspb/projects/foodbuddy-insta/foodbuddy_replica/media"
THUMBNAIL_DIR="/Users/arsenyspb/projects/foodbuddy-insta/foodbuddy_replica/media/thumbnails"

for video in $(find "$VIDEO_DIR" -name "*.mp4"); do
    filename=$(basename "$video")
    thumbnail="$THUMBNAIL_DIR/${filename%.*}.jpg"
    ffmpeg -i "$video" -ss 00:00:01.000 -vframes 1 "$thumbnail"
done

echo "Thumbnail generation complete."