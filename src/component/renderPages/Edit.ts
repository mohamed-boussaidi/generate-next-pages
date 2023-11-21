import {renderInputFields} from "../renderElements";
import {renderTypes, selectDataElement} from "../../utils";
import renderHeaderForm from "../HeaderForm";
import renderFooterForm from "../FooterForm";

const argument: string[] = process.argv.slice(2);
const Tag = argument[0].charAt(0).toUpperCase() + argument[0].slice(1);
export const PageEditContent = (
    pageName: string,
    resource: string,
    method: string,
    fields: object
) => {

    const keys = Object.keys(fields);
    const values = Object.values(fields);

    return `
  import { HttpError } from '@refinedev/core';
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import { isLeft } from 'fp-ts/lib/Either';
  import { useForm } from '@refinedev/react-hook-form';
  import { Controller } from 'react-hook-form';
  import { getServerSession } from 'next-auth';
  import { authOptions } from '../../api/auth/[...nextauth]';
  import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
  import {
    ICompany,
    ICountry,
    ICreateUser,
    ILanguage,
    IProvider,
    ISubscription,
  } from '../../../interfaces/User';
  import { Edit } from '@refinedev/mui';
  import React from 'react';
  import Select from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';
  import { InputLabel, OutlinedInput } from '@mui/material';
  import FormControl from '@mui/material/FormControl';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { useSelect } from '@refinedev/core';
  import {IDealer, Nullable} from '../../../interfaces';
  import {components} from "../../../types";
  import Checkbox from '@mui/material/Checkbox';
  
  const ${pageName} = () => {
    type I${Tag} = components["schemas"]["${Tag}-${argument[0]}.item"];
    type IEdit${Tag} = components["schemas"]["${Tag}-${argument[0]}.edit"];
   ${keys.map((item, index) => renderTypes(values[index], item)).join("")}

  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<I${Tag}, HttpError, Nullable<IEdit${Tag}>>();
    
    ${keys
        .map((item, index) => selectDataElement(values[index], item)?.toString())
        .join("")}
  
    return (
       ${renderHeaderForm(method)}
    ${keys
        .map((item, index) => renderInputFields(values[index], item)?.toString())
        .join("")}
      ${renderFooterForm(method)}
    );
  };
  
  export default ${pageName};
  export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const translateProps = await serverSideTranslations(context.locale ?? 'en', [
      'common',
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
  
    return {
      props: {
        ...translateProps,
      },
    };
  }
  `;
};