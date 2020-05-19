import sys
from PIL import Image

def horizontal_strip():
    total_width = sum(widths)
    max_height = max(heights)
    strip = Image.new('RGBA', (total_width, max_height))
    x_offset = 0

    for image in images_files:
        strip.paste(image, (x_offset, 0))
        x_offset += image.size[0]

    strip.save(f'strip_horizontal_{IMAGES_DIRECTORY}.png')


def vertical_strip():
    total_width = max(widths)
    max_height = sum(heights)
    strip = Image.new('RGBA', (total_width, max_height))
    y_offset = 0

    for image in images_files:
        strip.paste(image, (0, y_offset))
        y_offset += image.size[1]

    strip.save(f'strip_vertical_{IMAGES_DIRECTORY}.png')


# def vertical_strip_multi(roll_amount):
#     total_width = max(widths)
#     max_height = sum(heights)
#     strip = Image.new('RGBA', (total_width, max_height))
#     y_offset = 0

#     def make_strip(strip, index):
#         strip.save(f'strip_vertical_{IMAGES_DIRECTORY}_00{index}.png')

#     for i, image in enumerate(images_files):
#         strip.paste(image, (0, y_offset))
#         y_offset += image.size[1]

#         if i % roll_amount == 0:
#             make_strip(strip, i)
#             strip = Image.new('RGBA', (total_width, max_height))

#     # strip.save(f'strip_vertical_{IMAGES_DIRECTORY}.png')


if __name__ == '__main__':
    IMAGES_DIRECTORY = input('Images directory?\n')
    FIRST_IMAGE = int(input('First image number?\n'))
    LAST_IMAGE = int(input('Last image number?\n')) + 1
    DIRECTION = input('Direction? (vertical= v, horizontal= h)\n')

    images_list = []

    for i in range(FIRST_IMAGE, LAST_IMAGE):
        images_list.append(f"{IMAGES_DIRECTORY}/{i}.png")

    images_files = []

    for image in images_list:
        try:
            images_files.append(Image.open(image))
        except FileNotFoundError:
            print('Erreur : répertoire ou image manquant(e).')
            break

    widths, heights = zip(*(image.size for image in images_files))


    if DIRECTION == "v":
        vertical_strip()
    elif DIRECTION == "h":
        horizontal_strip()
    elif DIRECTION == "s":
        vertical_strip_multi(4)
    else:
        pass