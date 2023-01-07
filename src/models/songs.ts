type TSongMetadata = {
  name: string;
  artist: string;
  album: string;
  dirname: string;
  duration: number;
};

type TSongEntry = {
  id: number;
} & TSongMetadata;

export { TSongMetadata, TSongEntry };
