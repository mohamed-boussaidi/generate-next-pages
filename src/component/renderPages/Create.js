#!/usr/bin/env node

import { renderInputFields } from "../renderElements.js";
import renderHeaderForm from "../HeaderForm.js";
import renderFooterForm from "../FooterForm.js";
import {renderTypes, selectDataElement} from "../../utils/index.js";

const argument = process.argv.slice(2);
export const PageCreateContent = (
  pageName,
  resource,
  method,
  fields,
) => {
  if (argument.length !== 0) {
    const Tag = argument[2].charAt(0).toUpperCase() + argument[2].slice(1);

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
  import { Create } from '@refinedev/mui';
  import React from 'react';
  import Select from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';
  import { InputLabel, OutlinedInput } from '@mui/material';
  import FormControl from '@mui/material/FormControl';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { useSelect } from '@refinedev/core';
  import {IDealer, Nullable} from '../../../interfaces';
  import {components} from "../../../types";
  import Checkbox from '@mui/material/Checkbox';
  import FormControlLabel from '@mui/material/FormControlLabel';

  
  const ${pageName} = () => {
    type I${Tag} = components["schemas"]["${Tag}-${argument[2]}.create"];
   ${keys.map((item, index) => renderTypes(values[index], item)).join("")}

        const {
      saveButtonProps,
      register,
      control,
      formState: { errors },
    } = useForm<I${Tag}, HttpError, Nullable<I${Tag}>>();
    
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
  } else {
    return null;
  }
};
