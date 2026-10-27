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

Frames go in `media/` as `1.webp`, `2.webp`, … `24.webp` (lossless WebP).

1. **Renaming Blender output** – Blender writes frames as `0001.webp`,
   `0002.webp`… `renamer.py` strips the leading zeros. Copy it into the
   directory holding the frames and run it from there (PNG and WebP files
   only):

   ```sh
   python renamer.py
   ```

2. **Generating the strip** – `strip.py` assembles `media/1.webp` to
   `media/24.webp` into `media/strip_vertical.webp` (lossy WebP, quality 85).
   Run it from the repository root:

   ```sh
   pip install -r requirements.txt
   python strip.py
   ```

   WebP images can't exceed 16383 px per side, which limits the strip to
   34 frames of 480 px.

## Credits

`js/loader.js` is [Loader.js](https://github.com/anuraghazra/Loader.js) by
Anurag Hazra, licensed under GPL-3.0. It is not covered by this repository's
license.

## License

[WTFPL](LICENSE) – Do What The Fuck You Want To Public License.
