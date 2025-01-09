---
title: Governance
description: Learn how to create infrastructure governance policies in Resource Catalog.
further_reading:
  - link: "/infrastructure/resource_catalog/"
    tag: "Documentation"
    text: "Datadog Resource Catalog"
  - link: "https://www.datadoghq.com/blog/datadog-resource-catalog/"
    tag: "Blog"
    text: "Govern your infrastructure resources with the Datadog Resource Catalog"
---

{{< callout url="https://www.datadoghq.com/product-preview/infra-governance-policies/" btn_hidden="false" header="Join the Preview!">}}
  Governance is in Preview.
{{< /callout >}} 

## Overview

{{< img src="/infrastructure/resource_catalog/governance/custom-policy-list-1.png" alt="The Resource Catalog page showing the Governance tab and list of custom policies" width="100%">}}


In the Resource Catalog's Governance view, you can define policies on your infrastructure resources based on governance best practices in your organization, such as improving ownership tag coverage on resources or ensuring versioning on critical resources is up-to-date. Instead of writing custom scripts or lambdas that scan every resource, Datadog gives you visibility into problematic resources so that you can focus on remediation.

Specifically, you can:

- Define a [custom policy](#create-a-custom-policy), which involves choosing a resource type, the attribute on the resource type, and target value(s) the attribute should have
- Define a [tagging policy](#create-a-tagging-policy), which involves a resource type and the desired tag key and value the resource type should have
- Access a dedicated view for each policy where you can see its list of non-compliant resources and compliance score
- Filter, group, and export the list of non-compliant resources for a policy so you can prioritize and assign the work

## Create a custom policy

{{< img src="/infrastructure/resource_catalog/governance/custom-policy-example-1.png" alt="A custom policy reflecting a compliance score of thirty percent." width="100%">}}

Custom policies require specific values in your cloud resource attributes within Datadog based on your organization's infrastructure best practices.

To create a custom policy:

1. Navigate to **Infrastructure > Resource Catalog** and click the [**Governance**][1] tab.
2. Click the **New Custom Policy** button.
3. Select a Resource Type from the dropdown menu.
4. Optionally, search for additional dataset filters.
5. Select a target resource attribute and desired value.
6. Optionally, add instructions for remediation.
7. A name is automatically generated based on the data entered, but you can modify it.
8. Click **Create Custom Policy**.

By clicking the new policy, you can review all non-compliant resources and filter them by region, environment, account, service, or team. You can also group them by attributes or tags.

## Create a tagging policy

Tagging policies require specific tag keys and tag value formats on your infrastructure resources across Datadog.

To create a tagging policy:

1. Navigate to **Infrastructure > Resource Catalog** and click the [**Governance**][1] tab.
2. Click the **New Tagging Policy** button.
3. Choose the resource types the policy applies to.
4. Define the required tag key and its allowed values.
5. A name is automatically generated based on the data entered, but you can modify it.
6. Click **Create Tagging Policy**.

By clicking the new policy, you can review all non-compliant resources and filter them by cloud, region, environment, account, service, team, or tag. You can also group them by attributes or tags.

[1]: https://app.datadoghq.com/infrastructure/catalog/governance

## Updating policies

To update a policy:

1. Click the policy.
2. Click the **Edit** button.
3. Modify the policy as needed.
4. Click **Update Custom Policy** or **Update Tagging Policy**.

## Deleting policies

To delete a custom or tagging policy, click the policy, then click the **Delete** button.

## Exporting policies

To export the list of non-compliant resources for a policy, click the policy, then click the **Export as CSV** button.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}