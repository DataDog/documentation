---
title: Getting Started with Terraform
further_reading:
    - link: 'https://www.datadoghq.com/blog/managing-datadog-with-terraform/'
      tag: 'Blog'
      text: 'Managing Datadog with Terraform'
---

## Overview

You can use the [Datadog Terraform provider][2] to create and programmatically manage Datadog resources. This guide provides an overview of getting started with Terraform, with links to Terraform resources and tutorials that address specific use cases.

## Setup

1. If you haven't already, install [Terraform][1].
2. If you don't yet have a Terraform configuration file, read the [configuration section][3] of the main Terraform documentation to create a directory and configuration file.
3. From the directory that contains your Datadog Provider configuration, run `terraform init`.

## Resources

### Cloud integrations

The [AWS integration resource][9], [Azure integration resource][10], and [Google Cloud Project integration resource][11] can establish the connections to quickly get data flowing into your Datadog account from your [AWS][12], [Azure][13], and [Google Cloud][14] services, respectively. If you're using the AWS integration, see the [AWS integration with Terraform][27] guide for an example of setting up the integration along with its associated IAM role and permissions.

### Logs and Metrics

See the [Manage Logs and Metrics with Terraform guide][20] for instructions on managing your logs and metrics with Terraform.

### Monitors

With data flowing into your Datadog account, implement [alerting with Datadog monitors][8] to be notified about any unexpected changes or anomalous behavior. Use the [monitor resource][4] to create and manage your monitors, or use the [monitor JSON resource][5] to use JSON definitions for your monitors. See the [create a monitor][6] section of the main Terraform documentation for an example `monitor.tf` file that creates a [Live Process monitor][7].

### Account management

See the [Manage Datadog with Terraform guide][19] for instructions on managing your Datadog account with Terraform.

### Dashboards

To further analyze or display your data for an audience, create [Datadog dashboards][18]. Terraform provides the [dashboard resource][15] for this, or you can use the [dashboard JSON resource][16] to create dashboards with JSON definitions. You can also [restrict the editing of a dashboard][17] by configuring restricted roles.

### Synthetic tests

   - For API tests, see the [Terraform section][21] of the **Create An API Test With The API** page.
   - For Browser tests, see the [Terraform section][22] of the **Manage Your Browser Tests Programmatically** page.

### Webhooks

You can send custom API requests and payloads to your own services in response to the data in your Datadog account with [Webhooks][29]. This allows you to alert your services or initiate automated actions in your infrastructure. Use the Terraform [Webhook resource][30] to create and manage your webhooks with Terraform.

## Go further with Terraform

Follow the [Terraform Datadog Provider][28] tutorial for a detailed walk-through of implementing and managing Datadog with Terraform, including the deployment of an example Kubernetes application with the Datadog Agent and the creation of [synthetic tests][31].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /integrations/terraform/#configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor_json
[6]: /integrations/terraform/#create-a-monitor
[7]: /monitors/types/process/
[8]: /monitors/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[12]: /integrations/amazon_web_services/
[13]: /integrations/azure/
[14]: /integrations/google_cloud_platform/
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json
[17]: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[18]: /dashboards/
[19]: /account_management/guide/manage-datadog-with-terraform/
[20]: /logs/guide/manage_logs_and_metrics_with_terraform/
[21]: /synthetics/guide/create-api-test-with-the-api/#terraform
[22]: /synthetics/guide/manage-browser-tests-through-the-api/#manage-your-browser-tests-with-terraform
[27]: /integrations/guide/aws-terraform-setup
[28]: https://developer.hashicorp.com/terraform/tutorials/use-case/datadog-provider
[29]: /integrations/webhooks/
[30]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
[31]: /synthetics/
