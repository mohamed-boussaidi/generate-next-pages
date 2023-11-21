"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageCreateContent = void 0;
const renderElements_1 = require("../renderElements");
const utils_1 = require("../../utils");
const HeaderForm_1 = __importDefault(require("../HeaderForm"));
const FooterForm_1 = __importDefault(require("../FooterForm"));
const argument = process.argv.slice(2);
const Tag = argument[0].charAt(0).toUpperCase() + argument[0].slice(1);
const PageCreateContent = (pageName, resource, method, fields) => {
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
    type I${Tag} = components["schemas"]["${Tag}-${argument[0]}.create"];
   ${keys.map((item, index) => (0, utils_1.renderTypes)(values[index], item)).join("")}

        const {
      saveButtonProps,
      register,
      control,
      formState: { errors },
    } = useForm<I${Tag}, HttpError, Nullable<I${Tag}>>();
    
    ${keys
        .map((item, index) => (0, utils_1.selectDataElement)(values[index], item)?.toString())
        .join("")}
  
    return (
       ${(0, HeaderForm_1.default)(method)}
    ${keys
        .map((item, index) => (0, renderElements_1.renderInputFields)(values[index], item)?.toString())
        .join("")}
      ${(0, FooterForm_1.default)(method)}
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
exports.PageCreateContent = PageCreateContent;
