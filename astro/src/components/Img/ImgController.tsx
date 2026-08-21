import type { ComponentChildren } from "preact";
import styles from "./ImgController.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import Lightbox from "./Lightbox";
import type { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const cl = classListFactory(styles);

interface PictureImageProps {
  srcset: string;
  alt?: string;
  width?: string;
  height?: string;
  widthPercent?: number;
}

type ImgControllerProps = PictureImageProps & {
  imageUrl: string;
  popupHref: string;
  caption?: string;
  inline?: boolean;
  popup?: boolean;
};

function PictureImage({
  srcset,
  alt,
  width,
  height,
  widthPercent,
}: PictureImageProps) {
  return (
    <picture>
      <img
        class={cl("img__image")}
        srcset={srcset}
        style={widthPercent ? { width: `${widthPercent}%` } : undefined}
        width={width}
        height={height}
        alt={alt}
      />
    </picture>
  );
}

function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: ComponentChildren;
}) {
  return (
    <figure class={cl("img__figure")}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function ImgController({
  imageUrl,
  srcset,
  popupHref,
  alt,
  caption,
  width,
  height,
  widthPercent,
  inline = false,
  popup = true,
}: ImgControllerProps) {
  const image = (
    <PictureImage
      srcset={srcset}
      alt={alt}
      width={width}
      height={height}
      widthPercent={widthPercent}
    />
  );

  if (inline) return image;

  return (
    <Figure caption={caption}>
      {popup ? (
        <Lightbox
          imageUrl={imageUrl}
          popupHref={popupHref}
          alt={alt}
          caption={caption}
        >
          {image}
        </Lightbox>
      ) : (
        image
      )}
    </Figure>
  );
}
