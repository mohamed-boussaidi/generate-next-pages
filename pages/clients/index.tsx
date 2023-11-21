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
  type IClient = components["schemas"]["Client-client.item"];

  const { dataGridProps } = useDataGrid<IClient>();

  const columns = React.useMemo<GridColDef<IClient>[]>(
    () => [
      { field: "id", headerName: "id", minWidth: 150, flex: 1 },
      { field: "name", headerName: "name", minWidth: 150, flex: 1 },
      { field: "client_id", headerName: "client_id", minWidth: 150, flex: 1 },
      {
        field: "description",
        headerName: "description",
        minWidth: 150,
        flex: 1,
      },
      { field: "domain", headerName: "domain", minWidth: 150, flex: 1 },
      {
        field: "webhook_url",
        headerName: "webhook_url",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "webhook_token",
        headerName: "webhook_token",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "redirect_uris",
        headerName: "redirect_uris",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "only_bearer",
        headerName: "only_bearer",
        minWidth: 150,
        flex: 1,
      },
      { field: "grants", headerName: "grants", minWidth: 150, flex: 1 },
      { field: "scopes", headerName: "scopes", minWidth: 150, flex: 1 },
      { field: "active", headerName: "active", minWidth: 150, flex: 1 },
      {
        field: "plain_text_pkce_allowed",
        headerName: "plain_text_pkce_allowed",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "client_roles",
        headerName: "client_roles",
        minWidth: 150,
        flex: 1,
      },
      { field: "roles", headerName: "roles", minWidth: 150, flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
              <EditButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [],
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
        destination: "login?to=" + encodeURIComponent("/users/create"),
        permanent: false,
      },
    };
  }

  return { props: { ...translateProps } };
}
