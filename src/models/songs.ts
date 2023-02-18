type TSongMetadata = {
  name: string;
  artist: string;
  album: string;
  dirname: string;
  duration: number;
  romajiName: string;
  romajiArtist: string;
  romajiAlbum: string;
};

type TSongEntry = {
  id: number;
} & TSongMetadata;

export { TSongMetadata, TSongEntry };
