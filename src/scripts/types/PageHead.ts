export type PageHead = {
  lang: "en" | "pt-br";
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
};
