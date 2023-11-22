#!/usr/bin/env node

import { createPage } from "./utils/index.js";
import { PageCreateContent } from "./component/renderPages/Create.js";
import { PageEditContent } from "./component/renderPages/Edit.js";
import { PageListContent } from "./component/renderPages/List.js";
import { PageShowContent } from "./component/renderPages/Show.js";
import fetch from "node-fetch";

function main() {
  const argument = process.argv.slice(2);
  console.log(argument)
  if(argument.length!==0){
  const pathurl = argument[0];
  const resource = argument[2];

    const Tag = resource?.charAt(0)?.toUpperCase() + resource?.slice(1);
  async function data() {
    return await fetch(
        pathurl,
    ).then((e) => {
      return e.json();
    });
  }
  data().then((e) => {
    let routes =[]
    if (typeof e?.paths === "object") {
      const paths = e?.paths[`/api/${resource}s`];
      const pathsId = e?.paths[`/api/${resource}s/{id}`];
      const pathsKeys = Object.keys(paths);
      const pathsIdkeys = Object.keys(pathsId);
      pathsKeys.map((item, index) => {
        let ref;
        let itemdata;
        let refPath;
        switch (item) {
          case "get":
            ref =
              // @ts-ignore
              paths["get"]["responses"]["200"]["content"][
                "application/ld+json"
              ]["schema"]["properties"]["hydra:member"]["items"]["$ref"];
            refPath = ref.split("/");
            itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];

            routes.push({
              methode: "GET",
              route: "/" + resource + "s",
              // @ts-ignore
              data: itemdata.properties,
              resource: resource + "s",
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
            routes.push({
              methode: "POST",
              route: "/" + resource + "s",
              data: itemdata.properties,
              resource: resource + "s",
            });
            break;
        }
      });
      pathsIdkeys.map((item, index) => {
        let ref;
        let itemdata;
        let refPath;
        switch (item) {
          case "get":
            ref =
                // @ts-ignore
                pathsId["get"]["responses"]["200"]["content"][
                    "application/ld+json"
                    ]["schema"]["$ref"];
            refPath = ref.split("/");
            itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];
            routes.push({
              methode: "GETONE",
              route: "/" + resource + "s",
              data: itemdata.properties,
              resource: resource + "s",
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
              route: "/" + resource + "s",
              data: itemdata.properties,
              resource: resource + "s",
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
              ) || "",
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
              ) || "",
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
              ) || "",
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
              ) || "",
            );
          default:
            break;
        }
      });
    }
  });
  }else{
    console.warn("error  ,you must add the required params ")
  }
}
main();
