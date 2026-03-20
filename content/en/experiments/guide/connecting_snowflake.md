---
title: Connect Snowflake for Warehouse Native Experimentation
description: Connect a Snowflake service account to enable warehouse native experimentation.
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

## Step 1: Prepare the Snowflake Service Account

### Create a Dedicated Service User and Role

Datadog encourages Key Pair Authentication for maximum security. To create a public RSA key, follow [these docs][1] from Snowflake. Note that Datadog currently only supports unencrypted private keys.

Once you have your RSA key, run the following commands in Snowflake to create the service account, replacing `<public_key>` with your key.

```sql
USE ROLE ACCOUNTADMIN;
CREATE ROLE IF NOT EXISTS datadog_experiments_role;
CREATE USER IF NOT EXISTS datadog_experiments_user
    RSA_PUBLIC_KEY = '<public_key>';
GRANT ROLE datadog_experiments_role TO USER datadog_experiments_user;
ALTER USER datadog_experiments_user SET DEFAULT_ROLE = datadog_experiments_role;
```

### Grant Role Privileges

Grant the new role the read privileges on any tables from which you intend to create metrics. Replace the database, schema, and table names with the appropriate values.

```sql
GRANT USAGE ON DATABASE <database> TO ROLE datadog_experiments_role;
GRANT USAGE ON SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table1> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table2> TO ROLE datadog_experiments_role;
...
GRANT SELECT ON TABLE <database>.<schema>.<tableN> TO ROLE datadog_experiments_role;
```

### Create Output Schema

Datadog will write experiment exposure logs and intermediate metric results to tables in a dedicated output schema. The service role needs full access to this schema. Grant these privileges by running the following, again replacing the database name with the appropriate value.

```sql
CREATE SCHEMA IF NOT EXISTS <database>.datadog_experiments_output;
GRANT ALL ON SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
GRANT ALL PRIVILEGES ON FUTURE TABLES IN SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
```

### Create Experiment Warehouse (optional)

We recommend creating a dedicated warehouse for Datadog Experiments. While this is optional, ensure that the role created above has access to at least one warehouse to use for computing results. This warehouse will need to be provided when adding Snowflake credentials in the Datadog UI in the steps below.


```sql
CREATE WAREHOUSE IF NOT EXISTS datadog_experiments_wh
    WAREHOUSE_SIZE = <wh_size>
    AUTO_SUSPEND = 300
    INITIALLY_SUSPENDED = true;
GRANT ALL PRIVILEGES ON WAREHOUSE datadog_experiments_wh TO ROLE datadog_experiments_role;
```

## Step 2: Connect Datadog to Snowflake

Once the service account has been created, connect Snowflake to Datadog by navigating to the [integrations page][2] and searching for Snowflake. Enter your account URL, username (for instance, `datadog_experiments_user`), and your RSA private key. To find your account URL, see the [Snowflake docs][3].

If you’re only using the Snowflake integration for warehouse-native experiment analysis, you can opt out of collecting other resources. 

The privileges granted above are sufficient for running warehouse native experiments. The additional grants described on this setup page are only required if you plan to leverage other warehouse observability functionality in Datadog. To learn about other Datadog Snowflake integrations, see the [Snowflake integration page][4].

{{< img src="/product_analytics/experiment/guide/snowflake_main_integration.png" alt="Datadog Snowflake integration, showing settings and options for connecting Snowflake to Datadog." style="width:90%;" >}}

### Configure Experiment Settings

Once your Snowflake user is connected to Datadog, navigate to the [Experiment Warehouse Connection][5] page and click **Connect a data warehouse** to configure Experiment settings. Select the Snowflake integration you created above and enter the User, Role, Database, and Schema you created in step 1.

{{< img src="/product_analytics/experiment/guide/snowflake_experiment_setup.png" alt="Datadog Experiments Snowflake Settings, showing required inputs." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth
[2]: https://app.datadoghq.com/integrations
[3]: https://docs.snowflake.com/en/user-guide/organizations-connect#standard-account-urls
[4]: /integrations/snowflake-web/
[5]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections