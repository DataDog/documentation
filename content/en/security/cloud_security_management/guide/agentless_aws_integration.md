---
title: Setting up Agentless Scanning with the AWS Integration
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning"
    tag: "Documentation"
    text: "Agentless Scanning Quick Start for Cloud Security Management"
  - link: "/security/cloud_security_management/guide/agentless_terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
---

You can install and configure [Agentless Scanning][1] for your cloud environments either manually using Terraform or by utilizing the CloudFormation template with the AWS integration. This guide provides detailed instructions for the AWS integration approach.

{{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Set up the [Amazon Web Services][1] integration. You must also add the required [permissions][2] for resource collection.
1. Click **Yes** under **Enable Cloud Security Management**, and enable scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Select an API key that is already configured for Remote Configuration. If you enter an API key that does not have Remote Configuration enabled, it will automatically be activated upon selection.
1. Click **Launch CloudFormation Template**. The template includes all the necessary [permissions][3] to deploy and manage Agentless scanners. The template must run successfully to receive scans.

[1]: /integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#resource-collection
[3]: /security/cloud_security_management/setup/agentless_scanning/?tab=agentlessscanningnewawsaccount#permissions

{{% /tab %}}

{{% tab "Agentless scanning (existing AWS account)" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you intend to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be enabled. Enable scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Go to your AWS console, create a new CloudFormation Stack using [this template][2], and then run it.
1. Make sure the template runs successfully, then click **Done** to begin scanning. 

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/cloudformation/main.yaml

{{% /tab %}}
{{< /tabs >}}

### Uninstall with CloudFormation

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning