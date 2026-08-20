import styles from "./ImgVideo.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import type { SizingProps } from "./imgTypes";

const cl = classListFactory(styles);

interface ImgVideoProps extends SizingProps {
  imageUrl: string;
}

export default function ImgVideo({
  imageUrl,
  width,
  height,
  widthPercent,
}: ImgVideoProps) {
  return (
    <figure class={cl("img__figure")}>
      <video
        class={cl("img__video")}
        style={widthPercent ? { width: `${widthPercent}%` } : undefined}
        width={width}
        height={height}
        muted
        playsinline
        autoplay
        loop
        controls
      >
        <source src={imageUrl} type="video/mp4" />
      </video>
    </figure>
  );
}
