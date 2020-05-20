import sys
from PIL import Image

class Strip_maker:

    def __init__(self, directory):
        self.directory = directory
        # self.widths, self.heights


    def images_stack(self, first_image, last_image):

        images_list = []

        for i in range(first_image, last_image):
            images_list.append(f"{self.directory}/{i}.png")
        self.images_files = []

        for image in images_list:

            try:
                self.images_files.append(Image.open(image))

            except FileNotFoundError:
                print('Erreur : répertoire ou image manquant(e).')
                break

        return self.images_files
    

    def dimensions(self):
        self.widths, self.heights = zip(*(image.size for image in self.images_files))
        return self.widths, self.heights


    def make_vertical_strip(self, first_image, last_image, name):
        self.images_stack(first_image, last_image)
        self.dimensions()
        total_width = max(self.widths)
        max_height = sum(self.heights)
        strip = Image.new('RGBA', (total_width, max_height))
        y_offset = 0

        for image in self.images_stack(first_image, last_image):
            strip.paste(image, (0, y_offset))
            y_offset += image.size[1]

        # strip.save(f'strip_horizontal_{self.directory}_{name}.png')
        strip.save(f'strip_{name}.png')


    def make_vertical_strip_by_roll(image_amount, rolls_amount):
        pass


if __name__ == '__main__':

    stripper = Strip_maker('media/frames')
    stripper.make_vertical_strip(1, 24, "001")
    stripper.make_vertical_strip(25, 48, "002")
    stripper.make_vertical_strip(49, 72, "003")
    stripper.make_vertical_strip(73, 96, "004")