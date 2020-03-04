import sys
# import time
from PIL import Image

images_list = []

for i in range(1, 25):
    images_list.append(f"media/{i}.png")

images_files = []

for image in images_list:
    images_files.append(Image.open(image))

widths, heights = zip(*(image.size for image in images_files))




def horizontal_strip():
    total_width = sum(widths)
    max_height = max(heights)
    strip = Image.new('RGBA', (total_width, max_height))
    x_offset = 0

    for image in images_files:
        strip.paste(image, (x_offset, 0))
        x_offset += image.size[0]

    strip.save('strip_horizontal.png')


def vertical_strip():
    total_width = max(widths)
    max_height = sum(heights)
    strip = Image.new('RGBA', (total_width, max_height))
    y_offset = 0

    for image in images_files:
        strip.paste(image, (0, y_offset))
        y_offset += image.size[1]

    strip.save('strip_vertical.png')

# horizontal_strip()
vertical_strip()
