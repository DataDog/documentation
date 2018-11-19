---
title: "Error: Datadog is not authorized to perform sts:AssumeRole"
kind: faq
disable_toc: true
further_reading:
- link: "/integrations/amazon_web_services/#installation"
  tag: "Documentation"
  text: "AWS Datadog installation"
---

This error usually indicates an issue with the trust policy associated with the `DatadogAWSIntegrationRole`. Most of the time, this issue is caused by the [role delegation process][1].

Check the following points for the AWS account mentioned in the error:

1. Ensure that you are using the correct IAM role name in the [Datadog AWS integration tile][2]. Extra spaces or characters in AWS or Datadog causes the role delegation to fail.
2. When creating an IAM role, ensure Datadog's account ID `464622532012` is entered under `Another AWS account`. Entering any other account ID causes the integration to fail.
3. Also ensure `Required MFA` is **unchecked**:
    {{< img src="integrations/faq/aws-error-sts-assume-role-01.png" alt="AWS Create IAM Role" responsive="true">}}
4. Generate a new AWS External ID in the [Datadog AWS integration tile][2] and click the **Update Configuration** button:
  {{< img src="integrations/faq/aws-error-sts-assume-role-02.png" alt="Datadog AWS integration tile" responsive="true">}}
5. Add the newly generated AWS External ID to your AWS trust policy:
  {{< img src="integrations/faq/aws-error-sts-assume-role-03.png" alt="AWS Trust Policy" responsive="true">}}
6. If the error persists, repeat steps 2 through 7 of the [AWS Installation instructions][1].

Still need help? Contact [Datadog support][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/#installation
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: /help
