const argument = process.argv.slice(2);

const actions =
  "      {\n" +
  '        field: "actions",\n' +
  '        headerName: "Actions",\n' +
  "        renderCell: function render({ row }) {\n" +
  "          return (\n" +
  "            <>\n" +
  "              <ShowButton hideText recordItemId={row.id} />\n" +
  "              <DeleteButton hideText recordItemId={row.id} />\n" +
  "              <EditButton hideText recordItemId={row.id} />\n" +
  "            </>\n" +
  "          );\n" +
  "        },\n" +
  '        align: "center",\n' +
  '        headerAlign: "center",\n' +
  "        minWidth: 80,\n" +
  "      },";
export const PageListContent = (
  pageName,
  resource,
  method,
  fields,
) => {
  if (argument.length !== 0) {
    const Tag = argument[2].charAt(0).toUpperCase() + argument[2].slice(1);
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const columns = keys.slice(2).map((key) => {
      if (key !== "@id" && key !== "@type")
        return (
          '{ field: "' +
          key +
          '", headerName: "' +
          key +
          '", minWidth: 150, flex: 1 }'
        );
    });

    return `
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { components } from "../../types";

const UserList = () => {
      type I${Tag} = components["schemas"]["${Tag}-${argument[2]}.item"];

  const { dataGridProps } = useDataGrid<I${Tag}>();

  const columns = React.useMemo<GridColDef<I${Tag}>[]>(
    () => [${columns}
    ,${actions}],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        slots={{ toolbar: GridToolbar }}
      />
    </List>
  );
};

export default UserList;
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!session) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
          destination: 'login?to='+encodeURIComponent('/users/create'),
        permanent: false,
      },
    };
  }

  return { props: { ...translateProps } };
}`;
  } else {
    return null;
  }
};
