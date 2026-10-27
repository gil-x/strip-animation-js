# Simple strip animation with JS

Plays a frame-by-frame animation in the browser from a single image strip:
all frames are stacked vertically in one PNG, and JavaScript shifts the
`background-position` of a `div` at a fixed frame rate. The animation plays
forward, then backward, in a loop.

## Usage

The page fetches its images, so serve the directory over HTTP rather than
opening `index.html` directly:

```sh
python -m http.server
```

Then open http://localhost:8000.

Animation parameters are at the top of `js/main.js`:

| Constant      | Default | Meaning                         |
|---------------|---------|---------------------------------|
| `totalFrames` | `24`    | Number of frames in the strip   |
| `FPS`         | `25`    | Playback speed                  |
| `videoH`      | `480`   | Height of one frame, in pixels  |

The player size (720×480) is set in `css/main.css`.

## Building the strip

Frames go in `media/` as `1.png`, `2.png`, … `24.png`.

1. **Renaming Blender output** – Blender writes frames as `0001.png`,
   `0002.png`… `renamer.py` strips the leading zeros. Copy it into the
   directory holding the frames and run it from there (PNG files only):

   ```sh
   python renamer.py
   ```

2. **Generating the strip** – `strip.py` assembles `media/1.png` to
   `media/24.png` into `strip_vertical.png` (a `horizontal_strip()` function
   is also available). Run it from the repository root, then move the result
   into `media/`:

   ```sh
   pip install -r requirements.txt
   python strip.py
   mv strip_vertical.png media/
   ```

## Credits

`js/loader.js` is [Loader.js](https://github.com/anuraghazra/Loader.js) by
Anurag Hazra, licensed under GPL-3.0. It is not covered by this repository's
license.

## License

[WTFPL](LICENSE) – Do What The Fuck You Want To Public License.
