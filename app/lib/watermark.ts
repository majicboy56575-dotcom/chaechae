import sharp from "sharp";
import { WATERMARK_TILE_B64, WATERMARK_BANNER_B64 } from "./watermarkAssets";

const PREVIEW_MAX_WIDTH = 1024;

/**
 * Apply the free-trial watermark to a generated image.
 * - Downscales to preview size (max 1024px wide)
 * - Tiles a diagonal "MONOPIC · FREE PREVIEW" mark over the whole image
 * - Adds a bottom banner
 * Returns a JPEG data URL.
 */
export async function applyTrialWatermark(rawBase64: string): Promise<string> {
  const input = Buffer.from(rawBase64, "base64");

  const { data: resized, info } = await sharp(input)
    .resize({ width: PREVIEW_MAX_WIDTH, withoutEnlargement: true })
    .png()
    .toBuffer({ resolveWithObject: true });

  const tile = Buffer.from(WATERMARK_TILE_B64, "base64");
  const banner = await sharp(Buffer.from(WATERMARK_BANNER_B64, "base64"))
    .resize({ width: info.width })
    .png()
    .toBuffer();

  const output = await sharp(resized)
    .composite([
      { input: tile, tile: true, blend: "over" },
      { input: banner, gravity: "south" },
    ])
    .jpeg({ quality: 82 })
    .toBuffer();

  return `data:image/jpeg;base64,${output.toString("base64")}`;
}
