// createPages.js

import { OpenAPI3 } from "openapi-typescript";
import { createPage } from "./utils";
import { PageCreateContent } from "./component/renderPages/Create";
import { PageEditContent } from "./component/renderPages/Edit";
import { PageListContent } from "./component/renderPages/List";
import { PageShowContent } from "./component/renderPages/Show";
import fetch from "node-fetch";
import {IRoute} from "./interfaces";


const argument: string[] = process.argv.slice(2);
const Tag = argument[0].charAt(0).toUpperCase() + argument[0].slice(1);

async function data(): Promise<OpenAPI3> {
  return await fetch("https://stg-accounts.shakazoola.com/api/docs.json").then(
    (e: any) => {
      return e.json();
    },
  );
}

data().then((e) => {
  const routes = [] as IRoute[];
  if (typeof e?.paths === "object") {
    const paths = e?.paths[`/api/${argument[0]}s`];
    const pathsId = e?.paths[`/api/${argument[0]}s/{id}`];
    const pathsKeys = Object.keys(paths);
    const pathsIdkeys = Object.keys(pathsId);
    pathsKeys.map((item, index) => {
      let ref: any;
      let itemdata: any;
      let refPath: any;
      switch (item) {
        case "get":
          ref =
            // @ts-ignore
            paths["get"]["responses"]["200"]["content"]["application/ld+json"][
              "schema"
            ]["properties"]["hydra:member"]["items"]["$ref"];
          refPath = ref.split("/");
          itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];

          routes.push({
            methode: "GET",
            route: "/" + argument[0] + "s",
            // @ts-ignore
            data: itemdata.properties,
            resource: argument[0] + "s",
          });
          break;
        case "post":
          ref =
            // @ts-ignore
            paths["post"]["requestBody"]["content"]["application/ld+json"][
              "schema"
            ]["$ref"];
          refPath = ref.split("/");
          itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];
          console.log(itemdata.properties)
          routes.push({
            methode: "POST",
            route: "/" + argument[0] + "s",
            data: itemdata.properties,
            resource: argument[0] + "s",
          });
          break;
      }
    });
    pathsIdkeys.map((item, index) => {
      let ref: any;
      let itemdata: any;
      let refPath: any;
      switch (item) {
        case "get":
          routes.push({
            methode: "GETONE",
            route: "/" + argument[0] + "s",
            data: {},
            resource: argument[0] + "s",
          });
          break;
        case "put":
          ref =
            // @ts-ignore
            pathsId["put"]["requestBody"]["content"]["application/json"][
              "schema"
            ]["$ref"];
          refPath = ref.split("/");
          itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];
          // @ts-ignore
          routes.push({
            methode: "PUT",
            route: "/" + argument[0] + "s",
            data: itemdata.properties,
            resource: argument[0] + "s",
          });
          break;
        default:
          break;
      }
    });

    routes?.map((item) => {
      switch (item?.methode) {
        case "GET":
          createPage(
            "list" + Tag + "page",
            item?.resource,
            item?.methode,
            PageListContent(
              Tag + "Page",
              item?.resource,
              item?.methode,
              item?.data,
            ),
          );
          break;
        case "POST":
          createPage(
            "create" + Tag + "page",
            item?.resource,
            item?.methode,
            PageCreateContent(
              Tag + "Page",
              item?.resource,
              item?.methode,
              item?.data,
            ),
          );
          break;
        case "PUT":
          createPage(
            "edit" + Tag + "page",
            item?.resource,
            item?.methode,
            PageEditContent(
              Tag + "Page",
              item?.resource,
              item?.methode,
              item?.data,
            ),
          );
          break;
        case "GETONE":
          createPage(
            "show" + Tag + "page",
            item?.resource,
            item?.methode,
            PageShowContent(
              Tag + "Page",
              item?.resource,
              item?.methode,
              item?.data,
            ),
          );
        default:
          break;
      }
    });
  }
});
