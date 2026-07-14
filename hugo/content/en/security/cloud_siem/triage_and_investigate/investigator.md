---
title: Investigator
aliases:
  - /security_platform/cloud_siem/cloud_security_investigator/
  - /security_platform/cloud_siem/cloud_siem_investigator/
  - /security_platform/cloud_siem/investigator/
  - /security/cloud_siem/cloud_security_investigator/
  - /security/cloud_siem/cloud_siem_investigator/
  - /security/cloud_siem/investigator/
further_reading:
- link: "/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/"
  tag: "Documentation"
  text: "Configure AWS for Cloud SIEM"
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "https://www.datadoghq.com/blog/visualize-cloud-activity-datadog-cloud-siem-investigator/"
  tag: "Blog"
  text: "Visualize activity in your cloud environment with Datadog Cloud SIEM Investigator"
---

## Overview

When a security signal alerts on suspicious activity by a user or a resource, some commonly asked questions during the investigation include:

- Is the user accessing other accounts?
- What other actions did the user take around that specific time frame?
- What are all the actions taken on a resource by the user?
- What users have interacted with this resource?

For example, suppose you receive a security signal that someone changed the configuration of an Amazon S3 bucket so that it is accessible by everyone, but the action was taken by an assumed role. To investigate, look into who took the action and what other activities they did recently, as that could indicate compromised credentials.

The Cloud SIEM Investigator provides a graphical interface for you to pivot from one affected entity to another, so that you can see user behavior and its impact on your environment.


## Visualize and investigate the activity

{{< tabs >}}
{{% tab "AWS" %}}

1. Navigate to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} and click the {{< ui >}}Investigate{{< /ui >}} tab, and then the [{{< ui >}}AWS Investigator{{< /ui >}}][1] tab.

2. Select an entity type in the {{< ui >}}In{{< /ui >}} field dropdown menu.

3. Select an entity or enter a specific entity name in the {{< ui >}}Investigate{{< /ui >}} field to see a diagram of the activities associated with the entity.

4. Click on a node and select {{< ui >}}View related logs{{< /ui >}} or {{< ui >}}View related signals{{< /ui >}} to investigate further. Use the {{< ui >}}Search for{{< /ui >}} dropdown menu to filter by actions.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=aws

{{% /tab %}}

{{% tab "GCP" %}}

1. Navigate to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} and click the {{< ui >}}Investigate{{< /ui >}} tab, and then the [{{< ui >}}GCP Investigator{{< /ui >}}][1] tab.

2. Select an entity type in the {{< ui >}}In{{< /ui >}} field dropdown menu.

3. Select an entity or enter a specific entity name in the {{< ui >}}Investigate{{< /ui >}} field to see a diagram of the activities associated with the entity.

4. Click on a node and select {{< ui >}}View related logs{{< /ui >}} or {{< ui >}}View related signals{{< /ui >}} to investigate further. Use the {{< ui >}}Search for{{< /ui >}} dropdown menu to filter by actions.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=gcp
{{% /tab %}}

{{% tab "Azure" %}}

1. Navigate to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} and click the {{< ui >}}Investigate{{< /ui >}} tab, and then the [{{< ui >}}Azure Investigator{{< /ui >}}][1] tab.

2. Select an entity type in the {{< ui >}}In{{< /ui >}} field dropdown menu.

3. Select an entity or enter a specific entity name in the {{< ui >}}Investigate{{< /ui >}} field to see a diagram of the activities associated with the entity.

4. Click on a node and select {{< ui >}}View related logs{{< /ui >}} or {{< ui >}}View related signals{{< /ui >}} to investigate further. Use the {{< ui >}}Search for{{< /ui >}} dropdown menu to filter by actions.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=azure
{{% /tab %}}

{{% tab "Datadog" %}}

1. Navigate to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} and click the {{< ui >}}Investigate{{< /ui >}} tab, and then the [{{< ui >}}Datadog Investigator{{< /ui >}}][1] tab.

2. Select an entity type in the {{< ui >}}In{{< /ui >}} field dropdown menu.

3. Select an entity or enter a specific entity name in the {{< ui >}}Investigate{{< /ui >}} field to see a diagram of the activities associated with the entity.

4. Click on a node and select {{< ui >}}View related Audit Trail{{< /ui >}} or {{< ui >}}View related signals{{< /ui >}} to investigate further. Use the {{< ui >}}Search for{{< /ui >}} dropdown menu to filter by actions.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=datadog
{{% /tab %}}
{{< /tabs >}}

You can also navigate to the Cloud SIEM Investigator directly from a security signal. In the security signal panel, click {{< ui >}}Investigate user activity{{< /ui >}} (where `user` is the user identity in question) to see the Investigator view filtered to the specific user identity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


