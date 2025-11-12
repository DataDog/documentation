---
title: Policies
description: Learn how to create infrastructure policies in Resource Catalog.
aliases:
- /infrastructure/resource_catalog/governance
further_reading:
  - link: "/infrastructure/resource_catalog/"
    tag: "Documentation"
    text: "Datadog Resource Catalog"
  - link: "https://www.datadoghq.com/blog/datadog-resource-catalog/"
    tag: "Blog"
    text: "Govern your infrastructure resources with the Datadog Resource Catalog"
  - link: "https://www.datadoghq.com/blog/datadog-resource-policies/"
    tag: "Blog"
    text: "Proactively enforce infrastructure best practices with Datadog Resource Policies"
---

{{< callout url="https://www.datadoghq.com/product-preview/infra-governance-policies/" btn_hidden="false" header="Join the Preview!">}}
  Resource Policies are in Preview.
{{< /callout >}} 

## Overview

{{< img src="/infrastructure/resource_catalog/policies/resource_policies_with_templates.png" alt="The Resource Catalog page showing the Policies tab and list of custom policies" width="100%">}}

In Resource Policies, you can define policies on the desired optimal configuration of your infrastructure resources based on governance best practices in your organization. Some examples include improving ownership tag coverage on resources, or ensuring versioning on critical resources is up-to-date. Instead of writing custom scripts or Lambdas that scan every resource, Datadog gives you visibility into problematic resources so that you can focus on remediation.

Specifically, you can:

- Define a [custom policy](#create-a-custom-policy), which involves choosing a resource type, the attribute on the resource type, and target values the attribute should have.
- Start from a set of [out-of-the-box policy](#start-with-an-out-of-the-box-policy-template) templates that span infrastructure reliability, cost optimization, operational excellence, and versioning.
- Define a [tagging policy](#create-a-tagging-policy), which involves a resource type and the desired tag key and value the resource type should have.
- Access a dedicated view for each policy where you can see its list of non-compliant resources and compliance score.
- Filter policies by team (or any custom tag) to create a shareable view for each team.
- Group policies by team (or any custom tag) to assess compliance and prioritize outreach to low-performing teams.

## Example Resource Policies

<details open>
<summary><strong>Operational excellence and versioning</strong></summary>

- Amazon EC2 instances should only use approved Golden AMIs.
- Amazon RDS instances running Postgres should use the latest compatible engine versions.
- AWS Lambda functions should not run deprecated runtimes.
- Amazon ElastiCache should use the latest engine version.

</details>

<details>
<summary><strong>Reliability</strong></summary>

- Amazon RDS instances should have at least 1 day of backup retention configured.
- Amazon ECS services should have desired task count > 1.
- Amazon ACM certificates should be in successful auto-renewal state.
- Google Compute Engine instances should have automatic restart enabled.
- Azure Virtual Machines should be deployed across multiple Availability Zones.

</details>

<details>
<summary><strong>Security</strong></summary>

- Amazon RDS instances should be encrypted.
- Amazon CloudFront distributions should use TLS protocol version 1.2.
- Amazon EBS volumes should be encrypted.

</details>

<details>
<summary><strong>Cost optimization</strong></summary>

- Amazon EBS volumes should use GP3 instead of GP2.
- Google Compute Engine instances should use ARM architecture where possible.
- Azure Managed Disks should be in the attached state.

</details>

## Create a custom policy

{{< img src="/infrastructure/resource_catalog/policies/custom_policy_lambdas_2.png" alt="A custom policy reflecting a compliance score of 66%." width="100%">}}

Custom policies require specific values in your cloud resource attributes within Datadog based on your organization's infrastructure best practices.

To create a custom policy:

1. In the side navigation, click on [**Resources > Policies**][1].
2. Click the **New Custom Policy** button.
3. Select a resource type from the dropdown menu.
4. Optionally, search for additional dataset filters, such as `env: prod` to only include resources in production.
5. Select a target resource attribute and desired value.
6. Optionally, add instructions for remediation.
7. A name is automatically generated based on the data entered, but you can modify it.
8. Click **Create Custom Policy**.

Click the new policy to review all non-compliant resources and filter them by region, environment, account, service, or team. You can also group them by attributes or tags.

### Selecting values for your target attribute

Custom policies let you define a target resource attribute and a desired value, providing flexibility in creating policies for your cloud resources without requiring complex query languages. The following features are available:

* **Access data in nested attributes**:
Validate more of your configurations (for example, require that `TLS 1.2`, which is data stored in a multi-level property, is used for Amazon CloudFront). 
* **Use advanced condition matching**:
Use operators like `>`, `<`, or `!=` (for example, enforcing Kubernetes version > 1.25).  
* **Use multi-attribute logic**:
Chain multiple attributes in one policy (for example, require AWS CloudTrail logging _and_ multi-region to be enabled).

{{< img src="/infrastructure/resource_catalog/policies/custom_policy.mp4" alt="Video showing how to create a custom policy with a target resource attribute and desired value" video=true >}}

## Start with an out-of-the-box policy template

For insights into your infrastructure's reliability, cost optimization, operational excellence, and versioning, Datadog provides out-of-the-box policy templates. These templates are curated using cloud provider best practices and customer stories. Since each organization has unique requirements, filters can be applied to limit the set of resources evaluated against a policy, and an attribute's target values can be customized as needed.

{{< img src="/infrastructure/resource_catalog/policies/policy_templates.png" alt="Out-of-the-box policy templates in Resource Policies" style="width:100%;" >}}

### Remediate with Native Actions

All policy templates come equipped with suggested remediation steps based on industry best practices, as well as Datadog Native Actions in some cases. Using Native Actions, you can remediate misconfigurations without ever leaving Datadog for the following policy templates:

* Amazon RDS instances should be configured with Multi-AZ deployment  
* Amazon EBS volume type should be upgraded from GP2 to GP3  
* Amazon DynamoDB point-in-time recovery should be enabled  
* Google Compute instances should have automatic restart enabled

As shown in the video below, on the policy template, you can enable an action and provide instructions for the responsible team to remediate non-compliant resources. This enables them to update cloud resource configurations directly from Datadog. To ensure the team can perform these actions, create a [connection][2] and give read/write permissions to the appropriate team members to run the action.

{{< img src="/infrastructure/resource_catalog/policies/policy_templates_2.mp4" alt="Using policy templates in Datadog to enable remediation actions for cloud resources" video=true >}}

## Create a tagging policy

Tagging policies require specific tag keys and tag value formats on your infrastructure resources across Datadog.

To create a tagging policy:

1. In the side navigation, click on [**Resources > Policies**][1].
2. Click the **New Tagging Policy** button.
3. Choose the resource types the policy applies to.
4. Define the required tag key and its allowed values.
5. A name is automatically generated based on the data entered, but you can modify it.
6. Click **Create Tagging Policy**.

Click the new policy to review all non-compliant resources and filter them by cloud, region, environment, account, service, team, or tag. You can also group them by attributes or tags.

## Updating policies

To update a policy, click the policy, then click the **Edit** button and modify as needed.

## Deleting policies

To delete a custom or tagging policy, click the policy, then click the **Delete** button.

## Exporting policies

To export the list of non-compliant resources for a policy, click the policy, then click the **Export as CSV** button.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure/catalog/governance
[2]: /actions/connections/