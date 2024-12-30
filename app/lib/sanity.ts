//msking sanity client to connect with databse of sanity its important
//dont foret to download npm i next-sanity 
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";


export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "ka0v855l",
  useCdn: false,
});
// npm i @sanity/image-url is for tranfrm the images and give urls 
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}