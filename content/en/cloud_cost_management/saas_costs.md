---
title: SaaS Cost Integrations
kind: documentation
is_beta: true
private: true
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/custom"
  tag: "Documentation"
  text: "Gain insights into your custom costs"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
SaaS Cost Integrations are in public beta.
{{< /beta-callout >}}

## Overview

SaaS Cost Integrations allow you to send cost data **directly from your providers** by configuring the accounts associated with your cloud cost data in Datadog. 

If your provider is not supported, use [Custom Costs][1] to upload any cost data source to Datadog and understand the total cost of your services.

## Setup

To use SaaS Cost Integrations, you must configure [Cloud Cost Management][2] for AWS, Azure, or Google Cloud. 

See the respective documentation for your cloud provider:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

Navigate to [**Infrastructure > Cloud Costs > Settings > Accounts**][8] and click **Configure** on a provider to collect cost data. 

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Add your accounts with AWS, Azure, Google Cloud to collect cost data. You can also add your accounts for Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, and Twilio" style="width:100%" >}}

{{< tabs >}}
{{% tab "Databricks" %}}

<div class="alert alert-warning">The Databricks SaaS Cost integration is in private beta.</div>

1. Navigate to the [Databricks integration tile][101] in Datadog and click **Add Account**.
2. Enter a `System Tables SQL Warehouse ID` corresponding to your Databricks instance's warehouse to query for system table billing data.
3. Under the **Resources** section, click the toggle for each account to enable `Databricks Cost Data Collection`.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/databricks_setup.png" alt="Integrate with Databricks to collect cost data." style="width:100%" >}}

Your Databricks cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

<div class="alert alert-warning">The Confluent Cloud SaaS Cost integration is in public beta.</div>

1. Create or acquire an API key with the organizational admin role in Confluent Cloud.
2. Navigate to the [Confluent Cloud integration tile][101] in Datadog and click **Add Account**.
3. Enter your Confluent Cloud account name, API key, API secret, and optionally, specify tags.
4. Under the **Additional Options** section, click the toggle for `Collecting Billing Data`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/confluent_setup.png" alt="Integrate with Confluent to collect cost data." style="width:100%" >}}

Your Confluent Cloud cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/confluent-cloud

{{% /tab %}}
{{% tab "MongoDB" %}}

<div class="alert alert-warning">The MongoDB SaaS Cost integration is in private beta.</div>

1. [Create an API token][101] in MongoDB with `Organization Member` permissions, and add `Organization Read Only` permissions for cluster resource tags.
2. Navigate to the [MongoDB Cost Management integration tile][102] in Datadog and click **Add New**.
3. Enter your MongoDB account name, public key, private key, organizational ID, and optionally, specify tags.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Integrate with MongoDB to collect cost data." style="width:100%" >}}

Your MongoDB cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}
{{% tab "Snowflake" %}}

<div class="alert alert-warning">The Snowflake SaaS Cost integration is in public beta.</div>

1. Navigate to the [Snowflake integration tile][101] in Datadog and click **Add Snowflake Account**.
2. Enter your Snowflake account URL, for example: `https://xyz12345.us-east-1.snowflakecomputing.com`.
3. Under the **Connect your Snowflake account** section, click the toggle to enable Snowflake in Cloud Cost Management.
4. Enter your Snowflake user name in the `User Name` field.
5. Create a Datadog-specific role and user to monitor Snowflake. 

   Run the following in Snowflake to create a custom role:

   ```shell
   -- Create a new role intended to monitor Snowflake usage.
   create role DATADOG;

   -- Grant privileges on the SNOWFLAKE database to the new role.
   grant imported privileges on database SNOWFLAKE to role DATADOG;

   -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

   -- If you have cost usage collection enabled, ensure that your credentials have permission to view the ORGANIZATION_USAGE schema.
   grant role orgadmin to role DATADOG

   -- Create a user.
   create user DATADOG_USER
   LOGIN_NAME = DATADOG_USER
   password = <PASSWORD>
   default_warehouse = <WAREHOUSE>
   default_role = DATADOG

   -- Grant the monitor role to the user.
   grant role DATADOG to user <USER>
   ```

4. Configure the key-value pair authentication:
   
   - Generate a private key by following the [official Snowflake documentation][102] and upload the private key file by clicking **Upload Key**.
   - Generate a public key by following the [official Snowflake documentation][103].
   - Assign the public key to the user created in Step 5 by following the [official Snowflake documentation][104].

5. Click **Save**.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Integrate with Snowflake to collect cost data." style="width:100%" >}}

Your Snowflake cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[103]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[104]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user

{{% /tab %}}
{{% tab "OpenAI" %}}

<div class="alert alert-warning">The OpenAI SaaS Cost integration is in public beta.</div>

1. [Create an API key][101] in your account settings in OpenAI.
2. Navigate to the [OpenAI integration tile][102] in Datadog and click **Add Account**.
3. Enter your OpenAI account name, input your API key, and optionally, specify tags.
4. Under the **Resources** section, click the toggle for each account to enable `OpenAI Billing Usage Data Collection`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Integrate with OpenAI to collect cost data." style="width:100%" >}}

Your OpenAI cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://platform.openai.com/docs/quickstart/account-setup
[102]: https://app.datadoghq.com/integrations/openai

{{% /tab %}}
{{% tab "Fastly" %}}

<div class="alert alert-warning">The Fastly SaaS Cost integration is in public beta.</div>

1. Create an API token with at least the `"global:read"` scope and `"Billing"` role on the [Personal API tokens][101] page in Fastly.
2. Navigate to the [Fastly integration tile][102] in Datadog and click **Add Account**.
3. Enter your Fastly account name and API token. 
4. Click the checkbox for `Collect Billing Data`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/fastly_setup.png" alt="Integrate with Fastly to collect cost data." style="width:100%" >}}

Your Fastly cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly

{{% /tab %}}
{{% tab "Twilio" %}}

<div class="alert alert-warning">The Twilio SaaS Cost integration is in private beta.</div>

1. Navigate to the [Twilio integration tile][101] in Datadog and click **Add Account**.
2. Under the **Resources** section, click the toggle for each account to enable `Twilio in Cloud Cost Management`.
3. Enter an `Account SID` for your Twilio account.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Integrate with Twilio to collect cost data." style="width:100%" >}}

Your Twilio cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

For more information about visualizing your cost data using metrics, see the [Custom Costs documentation][9].

## Use SaaS Cost Integration data

You can view cost data on the [**Cloud Costs Analytics** page][3], the [Cloud Costs Tag Explorer][4], and in [dashboards][5], [notebooks][6], or [monitors][7]. You can also combine these cost metrics with other cloud cost metrics or observability metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/custom
[2]: /cloud_cost_management
[3]: https://app.datadoghq.com/cost/analytics
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /dashboards
[6]: /notebooks
[7]: /monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts
[9]: /cloud_cost_management/custom/?tab=csv#cost-metric-types
