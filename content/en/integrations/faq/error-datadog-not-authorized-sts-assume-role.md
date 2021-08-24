---
title: "Error: Datadog is not authorized to perform sts:AssumeRole"
kind: faq
further_reading:
- link: "/integrations/amazon_web_services/#installation"
  tag: "Documentation"
  text: "AWS Datadog installation"
---

This error usually indicates an issue with the trust policy associated with the Datadog integration role. Most of the time, this issue is caused by the [role delegation process][1].

Check the following points for the AWS account mentioned in the error:

1. When creating an IAM role, ensure that you are using the correct IAM role name in the [Datadog AWS integration tile][2]. Extra spaces or characters in AWS or Datadog causes the role delegation to fail. If you deployed the role using CloudFormation, the default IAM role name is set to [DatadogIntegrationRole][3].
    {{< img src="integrations/faq/aws-error-sts-assume-role-04.png" alt="AWS Create IAM Role - Review" >}}

2. Ensure Datadog's account ID `464622532012` is entered under `Another AWS account`. Entering any other account ID causes the integration to fail. Also ensure `Required MFA` is **unchecked**:
    {{< img src="integrations/faq/aws-error-sts-assume-role-01.png" alt="AWS Create IAM Role" >}}

3. Generate a new AWS External ID in the [Datadog AWS Integration tile][2] and click the **Update Configuration** button:
  {{< img src="integrations/faq/aws-error-sts-assume-role-02.png" alt="Datadog AWS integration tile" >}}

4. Add the newly generated AWS External ID to your AWS trust policy:
  {{< img src="integrations/faq/aws-error-sts-assume-role-03.png" alt="AWS Trust Policy" >}}

Note that the error **may** persist in the UI for a few hours whilst the changes propagate.
If the error persists, repeat steps 2 through 7 of the [AWS Installation instructions][1].

Still need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
[4]: /help/
