import { useShow, useOne } from "@refinedev/core";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../../api/auth/[...nextauth]";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
} from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { components } from "../../../types";

const CompanyShow = () => {
  type IClient = components["schemas"]["Client-client.item"];

  const { queryResult } = useShow<IClient>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}></Stack>
    </Show>
  );
};
export default CompanyShow;
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
