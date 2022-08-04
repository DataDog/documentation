---
title: "Error: Datadog is not authorized to perform sts:AssumeRole"
kind: guide
further_reading:
- link: "/integrations/amazon_web_services/#installation"
  tag: "Documentation"
  text: "AWS Datadog installation"
aliases:
  - /integrations/faq/error-datadog-not-authorized-sts-assume-role
---

This error usually indicates an issue with the trust policy associated with the Datadog integration role. Most of the time, this issue is caused by the [role delegation process][1].

Check the following points for the AWS account mentioned in the error:

1. When creating an IAM role, ensure that you are using the correct IAM role name in the [Datadog AWS integration tile][2]. Extra spaces or characters in AWS or Datadog causes the role delegation to fail. If you deployed the role using CloudFormation, the default IAM role name is set to [DatadogIntegrationRole][3].
    {{< img src="integrations/guide/aws_error_sts_assume_role/create-role-review.png" alt="AWS Create IAM Role Review page with DatadogAWSIntegrationRole entered for Role name, account 464622532012 listed for Trusted entities, and DatadogAWSIntegrationPolicy listed for Policies" >}}

2. Ensure Datadog's account ID `464622532012` is entered under `Another AWS account`. Entering any other account ID causes the integration to fail. Also ensure `Required MFA` is **unchecked**:
    {{< img src="integrations/guide/aws_error_sts_assume_role/create-role-configuration.png" alt="AWS Create IAM Role page with Another AWS Account selected under type of trusted entity, 464622532012 entered for account ID, and the require MFA button unchecked" >}}

3. Generate a new AWS External ID in the [Datadog AWS Integration tile][2] and click the **Update Configuration** button:
  {{< img src="integrations/guide/aws_error_sts_assume_role/datadog-aws-integration-tile.png" alt="Datadog AWS integration tile with the Generate new ID button highlighted and the Update Configuration button highlighted" >}}

4. Add the newly generated AWS External ID to your AWS trust policy:
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="AWS Trust Policy document with the sts:ExternalId parameter highlighted" >}}

Note that the error **may** persist in the UI for a few hours whilst the changes propagate.
If the error persists, repeat steps 2 through 7 of the [AWS Installation instructions][1].

Sometimes you might see the STS AssumeRole error but only limited to one or a few regions:
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1 
```
The source of the issue could be [AWS Service Control Policies][4].
```
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization. SCPs help you to ensure your accounts stay within your organization’s access control guidelines.
```

To get rid of the error in the integration tile you can exclude regions in your AWS integration using the [Update an AWS integration][5] API.

Still need help? Contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/api/latest/aws-integration/#update-an-aws-integration
[6]: /help/
