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
---

{{< callout url="https://www.datadoghq.com/product-preview/infra-governance-policies/" btn_hidden="false" header="Join the Preview!">}}
  Resource Catalog Policies is in Preview.
{{< /callout >}} 

## Overview

{{< img src="/infrastructure/resource_catalog/policies/resource_catalog_policies.png" alt="The Resource Catalog page showing the Policies tab and list of custom policies" width="100%">}}


In the Resource Catalog's Policies view, you can define policies on your infrastructure resources based on governance best practices in your organization, such as improving ownership tag coverage on resources or ensuring versioning on critical resources is up-to-date. Instead of writing custom scripts or lambdas that scan every resource, Datadog gives you visibility into problematic resources so that you can focus on remediation.

Specifically, you can:

- Define a [custom policy](#create-a-custom-policy), which involves choosing a resource type, the attribute on the resource type, and target values the attribute should have.
- Define a [tagging policy](#create-a-tagging-policy), which involves a resource type and the desired tag key and value the resource type should have.
- Access a dedicated view for each policy where you can see its list of non-compliant resources and compliance score.
- Filter, group, and export the list of non-compliant resources for a policy so you can prioritize and assign the work.

## Create a custom policy

{{< img src="/infrastructure/resource_catalog/policies/custom-policy-example-2.png" alt="A custom policy reflecting a compliance score." width="100%">}}

Custom policies require specific values in your cloud resource attributes within Datadog based on your organization's infrastructure best practices.

To create a custom policy:

1. Navigate to **Infrastructure > Resource Catalog** and click the [**Policies**][1] tab.
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
Validate more of your configurations (for example mandate that `TLS 1.2` stored in a nested property is used for Amazon CloudFront). 
* **Use advanced condition matching**:
Use operators like `\>, \<, \!=` (for example enforcing Kubernetes version \> 1.25).  
* **Use multi-attribute logic**:
Chain multiple attributes in one policy (for example requiring AWS CloudTrail logging *and* multi-region to be enabled).

{{< img src="/infrastructure/resource_catalog/policies/custom_policy.mp4" alt="Video showing how to create a custom policy with a target resource attribute and desired value" video=true >}}

## Create a tagging policy

Tagging policies require specific tag keys and tag value formats on your infrastructure resources across Datadog.

To create a tagging policy:

1. Navigate to **Infrastructure > Resource Catalog** and click the [**Policies**][1] tab.
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