const { execSync } = require('child_process');
const fs = require('fs');

console.log("Compositing refined preview-thumb.jpg using ImageMagick...");

const bgWallAndWindow = "public/assets/aistudio/Screenshot_2026-10-26_at_2.05.10_AM_4804e738.png";
const coupleCaricature = "public/assets/aistudio/caricature_4_2a4b29c6.png";
const logoMonogram = "public/assets/aistudio/logo4_d190479e.png";

// 1. Prepare card mockup of the first page (340x550)
execSync(`convert "${bgWallAndWindow}" -resize 340x550^ -gravity center -extent 340x550 /tmp/card_inner.png`);

// Add subtle decorative label on the card mockup: "Shri Ganeshay Namah" and "Tap Window to Open"
execSync(`convert /tmp/card_inner.png \\
  -font Times-Italic -pointsize 13 -fill '#fcebd4' -gravity north -annotate +0+28 "Shri Ganeshay Namah" \\
  -font Helvetica-Bold -pointsize 11 -fill '#fdf8f0' -undercolor 'rgba(27,54,43,0.85)' -gravity south -annotate +0+32 "  TAP WINDOW TO OPEN  " \\
  /tmp/card_inner_labeled.png`);

// Rounded corners
execSync(`convert -size 340x550 xc:none -draw "roundrectangle 0,0,340,550,22,22" /tmp/card_mask.png`);
execSync(`convert /tmp/card_inner_labeled.png /tmp/card_mask.png -alpha set -compose DstIn -composite /tmp/card_rounded.png`);

// Subtle gold border on the card
execSync(`convert /tmp/card_rounded.png \\
  -stroke 'rgba(217, 178, 163, 0.85)' -strokewidth 2 -fill none -draw "roundrectangle 2,2,338,548,20,20" \\
  /tmp/card_bordered.png`);

// Drop shadow
execSync(`convert /tmp/card_bordered.png \\( +clone -background '#38180e' -shadow 40x12+0+10 \\) +swap -background none -layers merge +repage /tmp/card_with_shadow.png`);

// 2. Prepare Monogram (85x85)
execSync(`convert "${logoMonogram}" -resize 85x85 /tmp/logo_sized.png`);

// 3. Prepare Couple caricature (height 510, with soft shadow)
execSync(`convert "${coupleCaricature}" -resize x510 /tmp/couple_sized.png`);
execSync(`convert /tmp/couple_sized.png \\( +clone -background '#5a222b' -shadow 30x8+0+6 \\) +swap -background none -layers merge +repage /tmp/couple_with_shadow.png`);

// 4. Create main canvas: 1200x630 with a warm, luxurious bridal linen gradient and borders
execSync(`convert -size 1200x630 gradient:'#fffdfa'-'#fbeee6' \\
  -stroke '#b83348' -strokewidth 2 -fill none -draw "roundrectangle 20,20,1180,610,14,14" \\
  -stroke '#d89aa6' -strokewidth 1 -fill none -draw "roundrectangle 27,27,1173,603,10,10" \\
  -stroke '#f4acb7' -strokewidth 0.75 -fill none -draw "roundrectangle 31,31,1169,599,8,8" \\
  /tmp/base_canvas.png`);

// 5. Composite elements onto base canvas
// Card on left at x=65, y=32
execSync(`convert /tmp/base_canvas.png /tmp/card_with_shadow.png -geometry +65+32 -composite /tmp/step1.png`);

// Couple caricature on right at x=860, y=55
execSync(`convert /tmp/step1.png /tmp/couple_with_shadow.png -geometry +860+55 -composite /tmp/step2.png`);

// Monogram in center column at x=595, y=55
execSync(`convert /tmp/step2.png /tmp/logo_sized.png -geometry +595+55 -composite /tmp/step3.png`);

// 6. Typography in the center column (center aligned around x=637)
execSync(`convert /tmp/step3.png \\
  -gravity north \\
  -font Palatino-Bold -fill '#9e4252' -pointsize 15 -annotate +50+152 "S H U B H   V I V A H" \\
  -font Times-Bold -fill '#5a222b' -pointsize 42 -annotate +50+180 "Pallav & Aiswarya" \\
  -font Palatino-Italic -fill '#8c432d' -pointsize 20 -annotate +50+240 "“From Desert Sands to the River Ganges”" \\
  -font Palatino-Bold -fill '#b83348' -pointsize 19 -annotate +50+290 "Durgapur (Dec 4–5)   •   Kota (Dec 11–12)" \\
  -font Palatino-Roman -fill '#6e3832' -pointsize 16 -annotate +50+345 "Together with our families, we joyfully invite you" \\
  -font Palatino-Roman -fill '#6e3832' -pointsize 16 -annotate +50+370 "to celebrate our sacred wedding union." \\
  -font Times-Italic -fill '#a85838' -pointsize 15 -annotate +50+425 "— Kolkata Rajbari  •  Royal Rajasthan —" \\
  -font Palatino-Bold -fill '#9e4252' -pointsize 14 -annotate +50+495 "THE WEDDING STORYBOOK" \\
  -font Helvetica -fill '#8c432d' -pointsize 13 -annotate +50+525 "pallav-aiswarya-wedding.vercel.app" \\
  -quality 92 /tmp/preview_refined.jpg`);

fs.copyFileSync('/tmp/preview_refined.jpg', 'public/preview-thumb.jpg');
fs.copyFileSync('/tmp/preview_refined.jpg', 'preview-thumb.jpg');

console.log("preview-thumb.jpg updated successfully!");
