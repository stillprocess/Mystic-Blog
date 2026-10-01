import "server-only";

import type { ComponentType } from "react";

type PostModule = {
  default: ComponentType;
};

export async function loadPostComponent(fileName: string) {
  const postModule = (await import(`../../content/posts/${fileName}`)) as PostModule;
  return postModule.default;
}
