---
title: Connect Snowflake for Warehouse Native Experiment Analysis
description: Connect a Snowflake service account to enable warehouse native experiment analysis.
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

## Overview

This guide walks through connecting Snowflake to Datadog to enable warehouse-native experiment analysis. This is done in two steps:

1. Creating a dedicated Snowflake user and granting the required privileges
2. Configuring the connection in the Datadog interface

## Step 1: Prepare the Snowflake service account

### Create a dedicated service user and role in Snowflake

1. Use the [Snowflake documentation][6] to create a private-public key-pair for enhanced authentication.
1. Run the following commands in Snowflake to create the user and role in the service account. Replace `<public_key>` with the public key you generated in the previous step.

**Note**: Datadog only supports unencrypted private keys.

```sql
USE ROLE ACCOUNTADMIN;
CREATE ROLE IF NOT EXISTS datadog_experiments_role;
CREATE USER IF NOT EXISTS datadog_experiments_user
    RSA_PUBLIC_KEY = '<public_key>';
GRANT ROLE datadog_experiments_role TO USER datadog_experiments_user;
ALTER USER datadog_experiments_user SET DEFAULT_ROLE = datadog_experiments_role;
```

### Grant privileges to the role

1. Identify the tables in Snowflake from which you intend to create metrics. 
1. Run the following command to grant _read_ privileges to the new role, allowing the role to read the tables. Replace `<database>`, `<schema>`, and `<table>` with their appropriate values.

```sql
GRANT USAGE ON DATABASE <database> TO ROLE datadog_experiments_role;
GRANT USAGE ON SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table1> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table2> TO ROLE datadog_experiments_role;
...
GRANT SELECT ON TABLE <database>.<schema>.<tableN> TO ROLE datadog_experiments_role;
```

### Grant access to output schema

Datadog writes experiment exposure logs and intermediate metric results to tables in a dedicated output schema. Run the following command to grant the service role full access to this schema. Replace `<database>` with the appropriate value.

```sql
CREATE SCHEMA IF NOT EXISTS <database>.datadog_experiments_output;
GRANT ALL ON SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
GRANT ALL PRIVILEGES ON FUTURE TABLES IN SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
```

### Create Experiment Warehouse (optional)

Datadog recommends creating a dedicated warehouse for Datadog Experiments. Ensure that the [role created](#create-a-dedicated-service-user-and-role-in-snowflake) has access to at least one warehouse to use for computing results. 

**Note**: You need to provide the name of this warehouse when adding Snowflake credentials in Datadog in [Step 2](#step-2-connect-snowflake-to-datadog).


```sql
CREATE WAREHOUSE IF NOT EXISTS datadog_experiments_wh
    WAREHOUSE_SIZE = <wh_size>
    AUTO_SUSPEND = 300
    INITIALLY_SUSPENDED = true;
GRANT ALL PRIVILEGES ON WAREHOUSE datadog_experiments_wh TO ROLE datadog_experiments_role;
```

## Step 2: Connect Snowflake to Datadog

Once the service account has been created, connect Snowflake to Datadog by navigating to the [integrations page][2] and searching for Snowflake. Enter your account URL, username (for instance, `datadog_experiments_user`), and your RSA private key. To find your account URL, see the [Snowflake docs][3].

If you’re only using the Snowflake integration for warehouse-native experiment analysis, you can opt out of collecting other resources. 

The privileges granted above are sufficient for running warehouse native experiments. The additional grants described on this setup page are only required if you plan to leverage other warehouse observability functionality in Datadog. To learn about other Datadog Snowflake integrations, see the [Snowflake integration page][4].

{{< img src="/product_analytics/experiment/guide/snowflake_main_integration.png" alt="Datadog Snowflake integration, showing settings and options for connecting Snowflake to Datadog." style="width:90%;" >}}

## Step 3: Configure Experiment Settings

Once your Snowflake user is connected to Datadog, navigate to the [Experiment Warehouse Connection][5] page and click **Connect a data warehouse** to configure Experiment settings. Select the Snowflake integration you created above and enter the User, Role, Database, and Schema you created in step 1.

{{< img src="/product_analytics/experiment/guide/snowflake_experiment_setup.png" alt="Datadog Experiments Snowflake Settings, showing required inputs." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth
[2]: https://app.datadoghq.com/integrations
[3]: https://docs.snowflake.com/en/user-guide/organizations-connect#standard-account-urls
[4]: /integrations/snowflake-web/
[5]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections
[6]: https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-authentication