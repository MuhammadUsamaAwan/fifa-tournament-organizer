import { cn } from '~/lib/cn';

type ImageProps = {
  meta: {
    img: {
      src: string;
      w: number;
      h: number;
    };
    sources: {
      [key: string]: string;
    };
  };
  sizes?: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  containerClassName?: string;
  imageClassName?: string;
  placeholder?: string;
};

export function Image({
  meta,
  sizes = '100vw',
  alt,
  loading = 'lazy',
  containerClassName,
  imageClassName,
  placeholder,
}: ImageProps) {
  return (
    <div
      className={cn('bg-cover bg-center bg-no-repeat', containerClassName)}
      style={{
        backgroundImage: placeholder,
      }}
    >
      <picture>
        {Object.entries(meta.sources).map(([type, srcSet]) => (
          <source key={type} type={`image/${type}`} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          className={cn('size-full object-cover object-center', imageClassName)}
          src={meta.img.src}
          alt={alt}
          loading={loading}
          decoding='async'
          width={meta.img.w}
          height={meta.img.h}
        />
      </picture>
    </div>
  );
}
