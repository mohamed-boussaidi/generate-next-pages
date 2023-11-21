import {IValueField} from "../interfaces";

const fs = require("fs-extra");
export const createPage = async (
    pageName: string,
    resource: string,
    methode: string,
    content: string
) => {
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
        fs.mkdir(folderPath, async (err: any) => {
            if (err) {
                console.error(`Error creating folder: ${err}`);
            } else {
                try {
                    await fs.writeFile(
                        `${folderPath}/${
                            ["GETONE", "PUT"].includes(methode) ? "[id]" : "index"
                        }.tsx`,
                        content
                    );
                    console.log(`Page "${pageName}" created successfully.`);
                } catch (error) {
                    console.error(`Error creating page "${pageName}":`, error);
                }
            }
        });
    } else {
        try {
            await fs.writeFile(
                `${folderPath}/${
                    ["GETONE", "PUT"].includes(methode) ? "[id]" : "index"
                }.tsx`,
                content
            );
            console.log(`Page "${pageName}" created successfully.`);
        } catch (error) {
            console.error(`Error creating page "${pageName}":`, error);
        }
    }
};


export const renderTypes = (value: IValueField, name: string) => {
    if (value.format==="iri-reference") {
        return `type I${
            name.charAt(0).toUpperCase() + name.slice(1)
        } = components["schemas"]["${
            name.charAt(0).toUpperCase() + name.slice(1)
        }-${name}.list"];`;
    }
};

export const selectDataElement = (value: IValueField, name: string) => {
    if (value.format==="iri-reference") {
        return (
            "const { options: " +
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
            "});"
        );
    } else {
        return "";
    }
};