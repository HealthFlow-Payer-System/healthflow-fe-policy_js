import { Grid } from "@mui/material";
import { PublishedComponent, useModulesManager, useTranslations, ConstantBasedPicker } from "@openimis/fe-core";
import React from "react";
import { POLICY_RENEWALS_REPORT_SORTING_CRITERIA } from "../constants";

const PolicyRenewalsReport = (props) => {
  const { values, setValues } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("policy", modulesManager);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.dateStart}
          module="policy"
          required
          label="PolicyRenewalsReport.dateStart"
          onChange={(dateStart) => setValues({ ...values, dateStart })}
        />
      </Grid>
      <Grid>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.dateEnd}
          module="policy"
          required
          label="PolicyRenewalsReport.dateEnd"
          onChange={(dateEnd) => setValues({ ...values, dateEnd })}
        />
      </Grid>
      <Grid>
        <PublishedComponent
          pubRef="location.LocationPicker"
          onChange={(region) =>
            setValues({
                ...values,
                region,
                district:null,
          })}
          value={values.region}
          locationLevel={0}
          label={formatMessage("PolicyRenewalsReport.region")}
        />
      </Grid>
      <Grid>
        <PublishedComponent
          pubRef="location.LocationPicker"
          onChange={(district) =>
            setValues({
                ...values,
                district,
          })}
          value={values.district}
          parentLocation={values.region}
          locationLevel={1}
          label={formatMessage("PolicyRenewalsReport.district")}
        />
      </Grid>
      <Grid>
        <PublishedComponent
          pubRef="product.ProductPicker"
          onChange={(product) => setValues({ ...values, product })}
          module="policy"
          value={values.product}
          label={formatMessage("PolicyRenewalsReport.product")}
        />
      </Grid>
      <Grid>
        <PublishedComponent
          pubRef="admin.EnrolmentOfficerPicker"
          onChange={(officer) => setValues({ ...values, officer })}
          module="policy"
          value={values.officer}
          label={formatMessage("PolicyRenewalsReport.officer")}
        />
      </Grid>
      <Grid>
        <ConstantBasedPicker
          module="policy"
          value={values.sorting}
          label="PolicyRenewalsReport.sorting"
          constants={POLICY_RENEWALS_REPORT_SORTING_CRITERIA}
          onChange={(sorting) => setValues({ ...values, sorting })}
        />
      </Grid>
    </Grid>
  );
};

export default PolicyRenewalsReport;
