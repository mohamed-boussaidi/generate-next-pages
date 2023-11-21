const argument: string[] = process.argv.slice(2);
const Tag = argument[0].charAt(0).toUpperCase() + argument[0].slice(1);
export const PageShowContent = (
  pageName: string,
  resource: string,
  method: string,
  fields: object,
) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  return `import { useShow, useOne } from "@refinedev/core";
import {getServerSession} from "next-auth";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authOptions} from "../../api/auth/[...nextauth]";
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
  type I${Tag} = components["schemas"]["${Tag}-${argument[0]}.item"];

  const { queryResult } = useShow<I${Tag}>();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
      
         ${keys.map(
           (item, index) =>
             '<div>          <Typography variant="body1" fontWeight="bold">\n          ' +
             item +
             "\n          </Typography>\n          <NumberField value={record?." +
             item +
             ' ?? ""} /></div>',
         )}


      </Stack>
    </Show>
  );
  }
export default CompanyShow
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
}
`;
};
