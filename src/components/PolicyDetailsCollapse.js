import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Collapse, Paper } from "@material-ui/core";
import { withModulesManager, formatMessage, Table } from "@openimis/fe-core";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tableContainer: {
    margin: theme.spacing(1),
  },
});

class PolicyDetailsCollapse extends React.Component {
  getHeaders = () => {
    const { intl } = this.props;
    return [
      formatMessage(intl, "policy", "policies.policyValue"),
      formatMessage(intl, "policy", "policies.deduction"),
      formatMessage(intl, "policy", "policies.hospitalDeduction"),
      formatMessage(intl, "policy", "policies.nonHospitalDeduction"),
      formatMessage(intl, "policy", "policies.ceiling"),
      formatMessage(intl, "policy", "policies.hospitalCeiling"),
      formatMessage(intl, "policy", "policies.nonHospitalCeiling"),
      ...(this.props.modulesManager.getConf("fe-policy", "familyOrInsureePoliciesSummary.showBalance", false) 
        ? [formatMessage(intl, "policy", "policies.balance")] 
        : [])
    ];
  };

  itemFormatters = () => {
    return [
      (i) => i.policyValue,
      (i) => i.ded,
      (i) => i.dedInPatient,
      (i) => i.dedOutPatient,
      (i) => i.ceiling,
      (i) => i.ceilingInPatient,
      (i) => i.ceilingOutPatient,
      ...(this.props.modulesManager.getConf("fe-policy", "familyOrInsureePoliciesSummary.showBalance", false) 
        ? [(i) => i.balance] 
        : [])
    ];
  };

  render() {
    const { classes, open, policy, intl } = this.props;
    
    if (!policy) return null;

    return (
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.root}>
        <Paper className={classes.tableContainer} elevation={1}>
          <Table
            module="policy"
            headers={this.getHeaders()}
            items={[policy]}
            itemFormatters={this.itemFormatters()}
            withPagination={false}
            withHeader={true}
          />
        </Paper>
      </Collapse>
    );
  }
}

export default withModulesManager(withStyles(styles)(PolicyDetailsCollapse));