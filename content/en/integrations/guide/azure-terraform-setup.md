---
title: The Azure Integration with Terraform
kind: guide
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/managing-datadog-with-terraform/"
  tag: "Blog"
  text: "Managing Datadog with Terraform"
---

Using [Terraform][1], you can create the Datadog Azure integration and deploy the Datadog Agent in your Azure environment.

## Datadog Azure integration

1. Configure the [Datadog Terraform provider][2] to interact with the Datadog API through a Terraform configuration. 

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:  
    * `azure_tenant_name`: Your Azure Active Directory ID.
    * `client_id`: Your Azure web application secret key.
    * `client_secret`: Your Azure web application secret key.

See the [Terraform Registry][4] for further example usage and the full list of optional parameters, as well as additional Datadog resources. 

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<azure_tenant_name>"
  client_id     = "<azure_client_id>"
  client_secret = "<azure_client_secret_key>"
  host_filters  = "examplefilter:true,example:true"
}

{{< /code-block >}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box Azure overview dashboard to see metrics sent by your Azure resources.

## Additional sections as needed

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://docs.datadoghq.com/integrations/terraform/#overview
[3]: https://us3.datadoghq.com/dash/integration/95/azure-overview
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws

