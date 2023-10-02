import { NewCashRegisterStocking } from "@/api";
import { TextField } from "@mui/material";
import { NumericInput } from "@stustapay/components";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

export type TillRegisterStockingFormProps<T extends NewCashRegisterStocking> = FormikProps<T>;

export function TillRegisterStockingForm<T extends NewCashRegisterStocking>({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  setFieldValue,
}: TillRegisterStockingFormProps<T>) {
  const { t } = useTranslation();
  return (
    <>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        autoFocus
        name="name"
        label={t("register.name")}
        error={touched.name && !!errors.name}
        helperText={(touched.name && errors.name) as string}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro200")}
        name="euro200"
        value={values.euro200}
        onChange={(val) => setFieldValue("euro200", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro100")}
        name="euro100"
        value={values.euro100}
        onChange={(val) => setFieldValue("euro100", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro50")}
        name="euro50"
        value={values.euro50}
        onChange={(val) => setFieldValue("euro50", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro20")}
        name="euro20"
        value={values.euro20}
        onChange={(val) => setFieldValue("euro20", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro10")}
        name="euro10"
        value={values.euro10}
        onChange={(val) => setFieldValue("euro10", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro5")}
        name="euro5"
        value={values.euro5}
        onChange={(val) => setFieldValue("euro5", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro2")}
        name="euro2"
        value={values.euro2}
        onChange={(val) => setFieldValue("euro2", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.euro1")}
        name="euro1"
        value={values.euro1}
        onChange={(val) => setFieldValue("euro1", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent50")}
        name="cent50"
        value={values.cent50}
        onChange={(val) => setFieldValue("cent50", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent20")}
        name="cent20"
        value={values.cent20}
        onChange={(val) => setFieldValue("cent20", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent10")}
        name="cent10"
        value={values.cent10}
        onChange={(val) => setFieldValue("cent10", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent5")}
        name="cent5"
        value={values.cent5}
        onChange={(val) => setFieldValue("cent5", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent2")}
        name="cent2"
        value={values.cent2}
        onChange={(val) => setFieldValue("cent2", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.cent1")}
        name="cent1"
        value={values.cent1}
        onChange={(val) => setFieldValue("cent1", val)}
      />
      <NumericInput
        fullWidth
        margin="normal"
        label={t("register.variableInEuro")}
        name="variable_in_euro"
        value={values.variable_in_euro}
        onChange={(val) => setFieldValue("variable_in_euro", val)}
      />
    </>
  );
}
