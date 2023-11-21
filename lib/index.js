"use strict";
// createPages.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const Create_1 = require("./component/renderPages/Create");
const Edit_1 = require("./component/renderPages/Edit");
const List_1 = require("./component/renderPages/List");
const Show_1 = require("./component/renderPages/Show");
const node_fetch_1 = __importDefault(require("node-fetch"));
function main() {
    const argument = process.argv.slice(2);
    const dirname = argument[1];
    console.log(dirname);
    const Tag = argument[0].charAt(0).toUpperCase() + argument[0].slice(1);
    async function data() {
        return await (0, node_fetch_1.default)("https://stg-accounts.shakazoola.com/api/docs.json").then((e) => {
            return e.json();
        });
    }
    data().then((e) => {
        const routes = [];
        if (typeof e?.paths === "object") {
            const paths = e?.paths[`/api/${argument[0]}s`];
            const pathsId = e?.paths[`/api/${argument[0]}s/{id}`];
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
                            paths["get"]["responses"]["200"]["content"]["application/ld+json"]["schema"]["properties"]["hydra:member"]["items"]["$ref"];
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
                            paths["post"]["requestBody"]["content"]["application/ld+json"]["schema"]["$ref"];
                        refPath = ref.split("/");
                        itemdata = e?.components?.schemas?.[refPath[refPath.length - 1]];
                        console.log(itemdata.properties);
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
                let ref;
                let itemdata;
                let refPath;
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
                            pathsId["put"]["requestBody"]["content"]["application/json"]["schema"]["$ref"];
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
                        (0, utils_1.createPage)("list" + Tag + "page", item?.resource, item?.methode, (0, List_1.PageListContent)(Tag + "Page", item?.resource, item?.methode, item?.data));
                        break;
                    case "POST":
                        (0, utils_1.createPage)("create" + Tag + "page", item?.resource, item?.methode, (0, Create_1.PageCreateContent)(Tag + "Page", item?.resource, item?.methode, item?.data));
                        break;
                    case "PUT":
                        (0, utils_1.createPage)("edit" + Tag + "page", item?.resource, item?.methode, (0, Edit_1.PageEditContent)(Tag + "Page", item?.resource, item?.methode, item?.data));
                        break;
                    case "GETONE":
                        (0, utils_1.createPage)("show" + Tag + "page", item?.resource, item?.methode, (0, Show_1.PageShowContent)(Tag + "Page", item?.resource, item?.methode, item?.data));
                    default:
                        break;
                }
            });
        }
    });
}
main();
