---
title: Investigator
kind: documentation
aliases:
  - /security_platform/cloud_siem/cloud_security_investigator/
  - /security_platform/cloud_siem/cloud_siem_investigator/
  - /security_platform/cloud_siem/investigator/
further_reading:
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
---

## Overview

<div class="alert alert-warning">Cloud SIEM Investigator currently only supports AWS CloudTrail logs.</div>

When a security signal alerts on suspicious activity by a user or a resource, some commonly asked questions during the investigation include:

- Is the user accessing other accounts? 
- What other actions did the user take around that specific time frame? 
- What are all the actions taken on a resource by the user?
- What users have interacted with this resource?

For example, suppose you receive a security signal that someone changed the configuration of an AWS S3 bucket so that it is accessible by everyone, but the action was taken by an assumed role. To investigate, look into who took the action and what other activities they did recently, as that could indicate compromised credentials.

The Cloud SIEM Investigator provides a graphical interface for you to pivot from one affected entity to another, so that you can see user behavior and its impact on your environment.


## Visualize and investigate the activity

1. Navigate to **Security** > **Cloud SIEM** and click the [**Investigator** tab][1]. 

2. Select an entity type in the **In** field dropdown menu.

3. Select an entity or enter a specific entity name in the **Investigate** field to see a graph of the activities associated with the entity. For the **Assumed Role** entity, select an `AccessKeyID` or enter an `AccessKeyID` in the **for** field. 

4. Click on a node and select **Show list of logs** or **View in Log Explorer** to see the related logs. If you click on a service node, click **Investigate service** to pivot to the Investigator view for that service. Use the **and filter by** dropdown menu to filter by actions.

You can also navigate to the Cloud SIEM Investigator directly from a security signal. In the security signal panel, click **Investigate user activity** (where `user` is the user identity in question) to see the Investigator view filtered to the specific user identity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csi/aws
