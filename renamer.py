import os 
  
def main(): 
    
    for filename in os.listdir("."):
        name, extension = os.path.splitext(filename)
        if extension in (".png", ".webp"):
            number = int(name)
            new_filename = str(number) + extension
            os.rename(filename, new_filename)
  
if __name__ == '__main__': 
    main()

# Script to remove zeros from files names (Blender output or other)
# 
# How to use:
# 1. put this script file in images directory
# 2. run a shell & go in this directory
# 3. type: python renamer.py
#
# Beware: works with png and webp files only.
