import fs from "fs-extra";

export const createPage = async (pageName, resource, methode, content) => {
  const argument = process.argv.slice(2);
  const dirname = argument[4];

  let folderPath = `${dirname || ""}./pages/${resource}`;
  switch (methode) {
    case "GET":
      folderPath = `${dirname || "."}/pages/${resource}`;
      break;
    case "PUT":
      folderPath = `${dirname || "."}/pages/${resource}/edit`;
      break;
    case "GETONE":
      folderPath = `${dirname || "."}/pages/${resource}/show`;
      break;
    case "POST":
      folderPath = `${dirname || "."}/pages/${resource}/create`;
      break;
    default:
      folderPath = `${dirname || "."}/pages/${resource}`;
  }
  if (!fs.existsSync(folderPath)) {
    // Create the folder
    fs.mkdir(folderPath, async (err) => {
      if (err) {
        console.error(`Error creating folder: ${err}`);
      } else {
        try {
          await fs.writeFile(
            `${folderPath}/${
              ["GETONE", "PUT"].includes(methode) ? "[id]" : "index"
            }.tsx`,
            content,
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
        content,
      );
      console.log(`Page "${pageName}" created successfully.`);
    } catch (error) {
      console.error(`Error creating page "${pageName}":`, error);
    }
  }
};

export const renderTypes = (value, name) => {
  if (value.format === "iri-reference") {
    return `type I${
      name.charAt(0).toUpperCase() + name.slice(1)
    } = components["schemas"]["${
      name.charAt(0).toUpperCase() + name.slice(1)
    }-${name}.list"];`;
  }
};

export const selectDataElement = (value, name) => {
  if (value.format === "iri-reference") {
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
