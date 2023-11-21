import { HttpError } from "@refinedev/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { isLeft } from "fp-ts/lib/Either";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  ICompany,
  ICountry,
  ICreateUser,
  ILanguage,
  IProvider,
  ISubscription,
} from "../../../interfaces/User";
import { Create } from "@refinedev/mui";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelect } from "@refinedev/core";
import { IDealer, Nullable } from "../../../interfaces";
import { components } from "../../../types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ClientPage = () => {
  type IClient = components["schemas"]["Client-client.create"];

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IClient, HttpError, Nullable<IClient>>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          label="name"
          {...register("name", {
            required: "This field is required",
          })}
          helperText={errors.name?.message}
          error={!!errors.name}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <TextField
          label="client_id"
          {...register("client_id", {
            required: "This field is required",
          })}
          helperText={errors.client_id?.message}
          error={!!errors.client_id}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="only_bearer"
              render={({ field }) => <Checkbox {...field} />}
            />
          }
          label="only_bearer"
        />{" "}
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="active"
              render={({ field }) => <Checkbox {...field} />}
            />
          }
          label="active"
        />{" "}
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="plain_text_pkce_allowed"
              render={({ field }) => <Checkbox {...field} />}
            />
          }
          label="plain_text_pkce_allowed"
        />
        <TextField
          label="identifier"
          {...register("identifier", {
            required: "This field is required",
          })}
          helperText={errors.identifier?.message}
          error={!!errors.identifier}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
      </Box>
    </Create>
  );
};

export default ClientPage;
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

  return {
    props: {
      ...translateProps,
    },
  };
}
