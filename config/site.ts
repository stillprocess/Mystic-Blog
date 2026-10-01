export type SocialLink = {
  label: string;
  url: string;
};

const githubUrl = "https://github.com/stillprocess";

export const siteConfig = {
  name: "Mystic Blog",
  description: "Code, design, and everything in between.",
  githubUrl,
  email: null as string | null,
  socialLinks: [
    {
      label: "GitHub",
      url: githubUrl,
    },
  ] satisfies SocialLink[],
};
