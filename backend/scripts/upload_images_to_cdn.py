import os
import cloudinary
from cloudinary.uploader import upload
from decouple import config

cloudinary.config(
    cloud_name=config('CLOUDINARY_CLOUD_NAME'),
    api_key=config('CLOUDINARY_API_KEY'),
    api_secret=config('CLOUDINARY_API_SECRET')
)

image_directory = config('LOCAL_IMAGES_DIR')
custom_folder = config('CLOUDINARY_IMAGES_DIR')

image_files = [f for f in os.listdir(image_directory) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

for image_file in image_files:
    custom_url = f'{custom_folder}/{os.path.splitext(image_file)[0]}'
    result = upload(os.path.join(image_directory, image_file), public_id=custom_url)

    print(f"Uploaded {result['public_id']} to Cloudinary CDN in folder '{custom_folder}'")
