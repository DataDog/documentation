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
Fastly and Confluent Cloud Cost Integrations are in public beta. Snowflake Costs are in private beta, contact your account team to be added to the private beta.
{{< /beta-callout >}}

## Overview

SaaS Cost Integrations allow you to send cost data *directly from your providers*, with a one time set up. If your provider is not supported, you can use [Custom Costs][1] to upload any cost data source to Datadog and understand the total cost of your services.

## Configure SaaS Cost Integrations

To use SaaS Cost Integrations, you must [configure Cloud Cost Management][1] for either AWS, Azure, or Google Cloud.

Navigate to [**Cloud Costs** > **Settings** > **Accounts**][8] and click on the provider you want to integrate. 

{{< img src="cloud_cost/cloud_and_saas_accounts.png" alt="Integrate with Fastly, Confluent, or Snowflake." style="width:80%" >}}

{{< tabs >}}
{{% tab "Fastly" %}}

1. Create an API token with at least the `"global:read"` scope and `"Billing"` role on the [Personal API tokens][101] page.
2. Then, click **Add Account** on the page to integrate it with Datadog.

{{< img src="cloud_cost/fastly_setup.png" alt="Integrate with Fastly." style="width:80%" >}}

[101]: https://manage.fastly.com/account/personal/tokens

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

1. Create or acquire an API key with the organizational admin role.
2. Then, click **Add Account** on the page to integrate it with Datadog.

{{< img src="cloud_cost/confluent_setup.png" alt="Integrate with Confluent." style="width:80%" >}}

{{% /tab %}}
{{% tab "Snowflake" %}}
1.  Create a Datadog specific role and user to monitor Snowflake. In Snowflake, run the following to create a custom role.

    ```none

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

2. Configure the key-value pair authentication.
   
   - Generate a private key by following the [official Snowflake documentation][101].
   - Generate a public key by following the [official Snowflake documentation][102].
   - Assign the public key to the user created in Step 1 by following the [official Snowflake documentation][103].

3. Then, click **Add Account** on the page to integrate it with Datadog.

{{< img src="cloud_cost/snowflake_setup.png" alt="Integrate with Snowflake." style="width:80%" >}}

[101]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[102]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[103]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user

{{% /tab %}}
{{< /tabs >}}

Cost data appears after 24 hours.

## Cost metric types

For more information, see the [Custom Costs documentation][9].

## Use SaaS Cost Integration data

You can view cost data on the [**Cloud Costs Analytics** page][3], the [Cloud Costs Tag Explorer][4], and in [dashboards][5], [notebooks][6], or [monitors][7]. You can also combine these cost metrics with other cloud cost metrics or observability metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management/custom
[2]: https://docs.datadoghq.com/cloud_cost_management
[3]: https://app.datadoghq.com/cost/analytics
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /dashboards
[6]: /notebooks
[7]: /monitors/create/cost
[8]: https://app.datadoghq.com/cost/settings/accounts
[9]: /cloud_cost_management/custom/?tab=csv#cost-metric-types