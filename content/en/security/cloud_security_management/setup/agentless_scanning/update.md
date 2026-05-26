---
title: Updating Agentless Scanning
further_reading:
  - link: "/security/cloud_security_management/setup/agentless_scanning/enable"
    tag: "Documentation"
    text: "Enabling Agentless Scanning"
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Agentless Scanning"
---

## Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly so you can get access to new features and bug fixes as they are released.

1. Log in to your AWS console and go to the CloudFormation Stacks page.
1. Expand the parent **DatadogIntegration** stack to reveal its nested sub-stacks. Select the **DatadogIntegration-DatadogAgentlessScanning-...** sub-stack, click **Update**, then click **Update nested stack**.
1. Click **Replace existing template**.
1. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][1]. Paste that URL into the **Amazon S3 URL** field.
1. Click **Next** to advance through the next several pages without modifying them, then submit the form.

## Update the Terraform module

Update the `source` reference for the Agentless Scanner modules to the latest release. You can find the latest version on [GitHub Releases][2].

For usage examples, see the [GitHub repository][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples