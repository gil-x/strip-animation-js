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
        self.images_stack(first_image, last_image + 1)
        self.dimensions()
        total_width = max(self.widths)
        max_height = sum(self.heights)
        strip = Image.new('RGBA', (total_width, max_height))
        y_offset = 0

        for image in self.images_stack(first_image, last_image + 1):
            strip.paste(image, (0, y_offset))
            y_offset += image.size[1]

        # strip.save(f'strip_horizontal_{self.directory}_{name}.png')
        strip.save(f'strip_{name}.png')


    def make_galileo_strip(self, rolls_amount):

        images_list = []
        images_files = []

        for i in range(1, rolls_amount + 1):
            images_list.append(f"strip_00{i}.png")
        
        for image in images_list:
            try:
                images_files.append(Image.open(image))
            except FileNotFoundError:
                print('Erreur : répertoire ou image manquant(e).')
                break

        widths, heights = zip(*(image.size for image in images_files))

        total_width = sum(widths)
        max_height = max(heights)
        strip = Image.new('RGBA', (total_width, max_height))
        x_offset = 0

        for image in images_files:
            strip.paste(image, (x_offset, 0))
            x_offset += image.size[0]

        strip.save(f'strip_final.png')


if __name__ == '__main__':
    

    # Installation :

    # Le script doit être placé à côté du dossier contenant les images

    # Création du venv / installation des dépendances / run :
    #   1. python -m venv venv
    #   2. . venv/bin/activate
    #   3. pip install pillow
    #   4. python strip_galileo.py


    # Config :
    
    # Créer l'instance de Strip_maker.
    # Indiquer ici le nom du dossier
    stripper = Strip_maker('frames')

    # Config pour 4 bandes. Ajouter à la main si nécessaire !
    # Arguments :
    #   - 1re image image de la bande (sans extension)
    #   - dernière image de la bande (sans extension)
    #   - nom de fichier, sera rendu sous la forme 'strip_00X' 
    # stripper.make_vertical_strip(1, 24, "001")
    # stripper.make_vertical_strip(25, 48, "002")
    # stripper.make_vertical_strip(49, 72, "003")
    # stripper.make_vertical_strip(73, 96, "004")

    stripper.make_vertical_strip(1, 48, "001")
    stripper.make_vertical_strip(49, 96, "002")

    # Génère le strip final.
    # Argument : nombre de bandes.
    stripper.make_galileo_strip(2)
