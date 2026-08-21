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

interface PopupImageProps extends SizingProps {
  srcset: string;
  alt?: string;
  caption?: string;
  popup: boolean;
  popupHref: string;
  onTriggerClick: (e: MouseEvent) => void;
}

function PopupImage({
  srcset,
  alt,
  caption,
  popup,
  popupHref,
  width,
  height,
  widthPercent,
  onTriggerClick,
}: PopupImageProps) {
  const image = (
    <PictureImage
      srcset={srcset}
      alt={alt}
      width={width}
      height={height}
      widthPercent={widthPercent}
    />
  );

  return (
    <figure class={cl("img__figure")}>
      {popup ? (
        <a
          href={popupHref}
          class={cl("img__link", "img__link--popup")}
          onClick={onTriggerClick}
        >
          {image}
        </a>
      ) : (
        image
      )}
      {caption && <figcaption class={cl("img__caption")}>{caption}</figcaption>}
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
  if (inline) {
    return (
      <PictureImage
        srcset={srcset}
        alt={alt}
        width={width}
        height={height}
        widthPercent={widthPercent}
      />
    );
  }

  if (!popup) {
    return (
      <PopupImage
        srcset={srcset}
        alt={alt}
        caption={caption}
        popup={popup}
        popupHref={popupHref}
        width={width}
        height={height}
        widthPercent={widthPercent}
        onTriggerClick={() => {}}
      />
    );
  }

  return (
    <Lightbox imageUrl={imageUrl} alt={alt} caption={caption}>
      {(onTriggerClick) => (
        <PopupImage
          srcset={srcset}
          alt={alt}
          caption={caption}
          popup={popup}
          popupHref={popupHref}
          width={width}
          height={height}
          widthPercent={widthPercent}
          onTriggerClick={onTriggerClick}
        />
      )}
    </Lightbox>
  );
}
