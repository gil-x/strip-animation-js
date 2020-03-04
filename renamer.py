import os 
  
def main(): 
    
    for filename in os.listdir("."):
        if ".py" not in filename:
            number = int(filename.replace(".png", ""))
            new_filename = str(number) + ".png"
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
# Beware: works withs png to png only.
