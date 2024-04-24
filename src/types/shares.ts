export type DataSource = {
  type: 'text' | 'image';
  data: {
    url: string;
  };
};

export type FaviconItem = {
  size: number | null;
  url: string | null;
};
export type Favicon = {
  common: FaviconItem[] | null;
  android: FaviconItem[] | null;
  ios: FaviconItem[] | null;
};

export type GetCommunityShareInformation = {
  id: string;
  name: string;
  url: string | null;
  icon: DataSource | null;
  favicon: Favicon | null;
  banner: DataSource;
  locale: string | null;
};
