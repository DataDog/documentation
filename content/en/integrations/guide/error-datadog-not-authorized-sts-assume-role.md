---
title: "Error: Datadog is not authorized to perform sts:AssumeRole"

further_reading:
- link: "/integrations/amazon_web_services/#installation"
  tag: "Documentation"
  text: "AWS Datadog installation"
aliases:
  - /integrations/faq/error-datadog-not-authorized-sts-assume-role
---

This error usually indicates an issue with the trust policy associated with the Datadog integration role. Most of the time, this issue is caused by the [role delegation process][1].

Check the following points for the AWS account mentioned in the error:

{{< site-region region="us,us3,us5,eu,gov" >}}
1. If you created an IAM role, ensure that you are using the correct IAM role name in the [Datadog AWS integration page][2]. Extra spaces or characters in AWS or Datadog causes the role delegation to fail. If you deployed the role using CloudFormation, the default IAM role name is set to [DatadogIntegrationRole][3].

2. On the Datadog integration role's page in AWS, under the **Trust relationships** tab, ensure that the **Principal** is configured as below:

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::464622532012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}
{{< site-region region="ap1" >}}
1. If you created an IAM role, ensure that you are using the correct IAM role name in the [Datadog AWS integration page][2]. Extra spaces or characters in AWS or Datadog causes the role delegation to fail. If you deployed the role using CloudFormation, the default IAM role name is set to [DatadogIntegrationRole][3].

2. On the Datadog integration role's page in AWS, under the **Trust relationships** tab, ensure that the **Principal** is configured as below:

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::417141415827:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://ap1.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}

3. The AWS External ID on the role page needs to match the AWS External ID value on the **Account Details** tab of the [AWS integration page][2]. Update the IAM role in AWS with the AWS External ID value from the integration page in Datadog, or generate a new AWS External ID in Datadog and click **Save**:
  {{< img src="integrations/guide/aws_error_sts_assume_role/new-aws-external-id.png" alt="Datadog AWS integration page with the AWS Role Name and AWS External ID fields and Generate New ID button" >}}

4. If you generated a new AWS External ID, add it to your AWS trust policy:
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="AWS Trust Policy document with the sts:ExternalId parameter highlighted" >}}

**Note**: The error **may** persist in the UI for a few hours while the changes propagate.

If you see the STS AssumeRole error limited to one or a few regions:
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1
```
The source of the issue could be [AWS Service Control Policies][4].
```
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization. SCPs help you to ensure your accounts stay within your organization's access control guidelines.
```

To remove the error in the integration page, you can exclude regions in your AWS integration under the **General** tab, or use the [Update an AWS integration][5] API.

Still need help? Contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/api/latest/aws-integration/#update-an-aws-integration
[6]: /help/
