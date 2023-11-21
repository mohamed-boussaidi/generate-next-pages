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
import { Edit } from "@refinedev/mui";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelect } from "@refinedev/core";
import { IDealer, Nullable } from "../../../interfaces";
import { components } from "../../../types";
import Checkbox from "@mui/material/Checkbox";

const ClientPage = () => {
  type IClient = components["schemas"]["Client-client.item"];
  type IEditClient = components["schemas"]["Client-client.edit"];

  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<IClient, HttpError, Nullable<IEditClient>>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <TextField
          label="description"
          {...register("description", {
            required: "This field is required",
          })}
          helperText={errors.description?.message}
          error={!!errors.description}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <TextField
          label="domain"
          {...register("domain", {
            required: "This field is required",
          })}
          helperText={errors.domain?.message}
          error={!!errors.domain}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <TextField
          label="webhook_url"
          {...register("webhook_url", {
            required: "This field is required",
          })}
          helperText={errors.webhook_url?.message}
          error={!!errors.webhook_url}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <TextField
          label="webhook_token"
          {...register("webhook_token", {
            required: "This field is required",
          })}
          helperText={errors.webhook_token?.message}
          error={!!errors.webhook_token}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">redirect_uris</InputLabel>
          <Controller
            control={control}
            name="redirect_uris"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                labelId="level-label"
                {...field}
                multiple={true}
                input={<OutlinedInput label="redirect_uris" />}
              >
                {[].map((item, index) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>{" "}
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">grants</InputLabel>
          <Controller
            control={control}
            name="grants"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                labelId="level-label"
                {...field}
                multiple={true}
                input={<OutlinedInput label="grants" />}
              >
                {[].map((item, index) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <TextField
          label="scopes"
          {...register("scopes", {
            required: "This field is required",
          })}
          helperText={errors.scopes?.message}
          error={!!errors.scopes}
          margin="normal"
          fullWidth
          autoFocus
        ></TextField>
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
        />{" "}
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">client_roles</InputLabel>
          <Controller
            control={control}
            name="client_roles"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                labelId="level-label"
                {...field}
                multiple={true}
                input={<OutlinedInput label="client_roles" />}
              >
                {[].map((item, index) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>{" "}
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">roles</InputLabel>
          <Controller
            control={control}
            name="roles"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                labelId="level-label"
                {...field}
                multiple={true}
                input={<OutlinedInput label="roles" />}
              >
                {[].map((item, index) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Edit>
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
