import type { ComponentChildren } from "preact";
import styles from "./ImgController.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import type { SizingProps } from "./imgTypes";
import Lightbox from "./Lightbox";

const cl = classListFactory(styles);

interface ImgControllerProps extends SizingProps {
  imageUrl: string;
  srcset: string;
  popupHref: string;
  alt?: string;
  caption?: string;
  inline?: boolean;
  popup?: boolean;
}

function PictureImage({
  srcset,
  alt,
  width,
  height,
  widthPercent,
}: SizingProps & { srcset: string; alt?: string }) {
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
