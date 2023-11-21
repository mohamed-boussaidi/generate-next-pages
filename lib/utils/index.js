"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectDataElement = exports.renderTypes = exports.createPage = void 0;
const fs = require("fs-extra");
const createPage = async (pageName, resource, methode, content) => {
    let folderPath = `./pages/${resource}`;
    switch (methode) {
        case "GET":
            folderPath = `./pages/${resource}`;
            break;
        case "PUT":
            folderPath = `./pages/${resource}/edit`;
            break;
        case "GETONE":
            folderPath = `./pages/${resource}/show`;
            break;
        case "POST":
            folderPath = `./pages/${resource}/create`;
            break;
        default:
            folderPath = `./pages/${resource}`;
    }
    if (!fs.existsSync(folderPath)) {
        // Create the folder
        fs.mkdir(folderPath, async (err) => {
            if (err) {
                console.error(`Error creating folder: ${err}`);
            }
            else {
                try {
                    await fs.writeFile(`${folderPath}/${["GETONE", "PUT"].includes(methode) ? "[id]" : "index"}.tsx`, content);
                    console.log(`Page "${pageName}" created successfully.`);
                }
                catch (error) {
                    console.error(`Error creating page "${pageName}":`, error);
                }
            }
        });
    }
    else {
        try {
            await fs.writeFile(`${folderPath}/${["GETONE", "PUT"].includes(methode) ? "[id]" : "index"}.tsx`, content);
            console.log(`Page "${pageName}" created successfully.`);
        }
        catch (error) {
            console.error(`Error creating page "${pageName}":`, error);
        }
    }
};
exports.createPage = createPage;
const renderTypes = (value, name) => {
    if (value.format === "iri-reference") {
        return `type I${name.charAt(0).toUpperCase() + name.slice(1)} = components["schemas"]["${name.charAt(0).toUpperCase() + name.slice(1)}-${name}.list"];`;
    }
};
exports.renderTypes = renderTypes;
const selectDataElement = (value, name) => {
    if (value.format === "iri-reference") {
        return ("const { options: " +
            name +
            "s } = useSelect<I" +
            name.charAt(0).toUpperCase() +
            name.slice(1) +
            ">({\n" +
            "resource: '" +
            name +
            "s' ,\n" +
            'optionLabel: "name",\n' +
            'optionValue: "id",\n' +
            "});");
    }
    else {
        return "";
    }
};
exports.selectDataElement = selectDataElement;
