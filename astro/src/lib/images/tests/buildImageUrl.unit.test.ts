import { describe, it, expect } from "vitest";
import { buildImageUrl } from "../buildImageUrl";
import { IMAGES_URL } from "@config/images";

describe("buildImageUrl", () => {
  it("builds the base image URL under the CDN images path", () => {
    const { imageUrl } = buildImageUrl("logos/aws.svg");

    expect(imageUrl).toBe(`${IMAGES_URL}/images/logos/aws.svg`);
  });

  it("builds a 1x/2x srcset capped at 850px", () => {
    const { srcset } = buildImageUrl("logos/aws.svg");

    expect(srcset).toBe(
      `${IMAGES_URL}/images/logos/aws.svg?auto=format&fit=max&w=850 1x, ` +
        `${IMAGES_URL}/images/logos/aws.svg?auto=format&fit=max&w=850&dpr=2 2x`,
    );
  });

  it("builds a full-size popup href with no width cap", () => {
    const { popupHref } = buildImageUrl("logos/aws.svg");

    expect(popupHref).toBe(
      `${IMAGES_URL}/images/logos/aws.svg?fit=max&auto=format`,
    );
  });
});
