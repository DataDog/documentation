---
title: Create Jira Issues for Security Issues
kind: documentation
further_reading:
  - link: "/security/cloud_security_management"
    tag: "Documentation"
    text: Cloud Security Management
  - link: "/service_management/workflows/"
    tag: "Documentation"
    text: Workflow Automation
---

security issues or impacted resources

**Notes**:

- To use this functionality, you must configure the [Jira integration][1].
- Jira for Cloud Security Management is available for CSM Misconfigurations and CSM Identity Risks.

you can either create one ticket per selected issue or multiple tickets with one single click
You have to specify the jira project key that corresponds to your jira project, and the jira issue type (task, story, bug, Epic ...)
Once the request is sent, an animation will indicate that the jira is being created and a link to the jira ticket is then added to findings panels

### Create a Jira issue for one or more impacted resources

on the side panel for Misconfigurations or Identity Risks

1. On the side panel, under **Resources Impacted**, select one or more resources.
2. On the **Actions** dropdown menu, select **Create Jira Issue**.
3. Choose whether to create a single issue or multiple issues (one issue for each resource).
4. Select the Jira project you want to assign the issue to.
5. Select the issue type from the available options.
6. Click **Create Issue**.

### Create a Jira issue for a security issue

standalone issue side panel.

1. On the side panel, click **Create Jira Issue**.
2. On the **Create a Jira Issue** modal, select the Jira project you want to assign the issue to.
3. Select the issue type from the available options.
4. Click **Create Issue**.

After you create the issue, a link to the Jira issue is displayed on the side panel. You can add additional Jira issues for the same security issue.

[1]: /integrations/jira/