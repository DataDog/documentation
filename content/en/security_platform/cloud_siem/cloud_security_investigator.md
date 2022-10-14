---
title: Cloud Security Investigator
kind: documentation
further_reading:
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
---

{{< beta-callout url="#" btn_hidden="true">}}
  The Cloud Security Investigator is currently in beta.
{{< /beta-callout >}} 

<div class="alert alert-warning">Cloud Security Investigator currently only supports AWS Cloudtrail logs.</div>

## Overview

When a security signal alerts on suspicious activity by a user, common questions asked as part of the investigation could include:

- Is the user accessing other accounts? 
- What other actions did the user take around that specific time frame? 
- What are all the actions taken on a resource by the user?

For example, you received a security signal that someone changed the configuration of an AWS S3 bucket so that it is accessible by everyone, but the action was taken by an assumed role. To investigate, you might want to look into who took the action and what other activities they have taken recently, as that could indicate compromised credentials.

The Cloud Security Investigator (CSI) provides a graphical interface for you to pivot from one affected entity to another, so that you can see user behavior and its impact on your environment.


## Visualize and investigate the activity

1. Navigate to the [Cloud Security Investigator][1]. Alternatively, you can get to it from **Security** > **Cloud SIEM**, and then click the **Cloud Security Investigator** tab. 

2. Select a user identity type in the **In** field dropdown.

3. Select a user entity or enter a specific identity in the **Investigate** field to see a graph of the user’s activities. For the Assumed Role entity, select an `AccessKeyID` or enter an `AccessKeyID` in the **for** field. 

4. Click on a node and select **Show list of logs** or **View in Log Explorer** to see the related logs. If you click on a service node, click **Investigate service** to pivot to the Investigator view for that service. Use the **and filter by** dropdown to filter by actions.

You can also go to the Cloud Security Investigator directly from a security signal. In the security signal panel, click **Investigate user activity**, where `user` is the user identity in question, to see the Investigator view filtered to the specific user identity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/cloud-security-investigator/aws
