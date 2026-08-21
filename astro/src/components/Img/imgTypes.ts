export interface SizingProps {
  width?: string;
  height?: string;
  widthPercent?: number;
}

export interface ImgTagProps extends SizingProps {
  src: string;
  alt?: string;
  caption?: string;
  video?: boolean;
  inline?: boolean;
  popup?: boolean;
}
