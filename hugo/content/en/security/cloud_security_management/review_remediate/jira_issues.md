---
title: Create Jira Issues
products:
  - name: Workload Protection
    url: /security/workload_protection/
    icon: cloud-security-management
  - name: Cloud Security Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
  - name: Cloud Security Identity Risks
    url: /security/cloud_security_management/identity_risks/
    icon: cloud-security-management
site_support_id: workflows
---

{{< product-availability >}}

This example creates an automated ticket routing workflow that creates and assigns a Jira issue to the appropriate team when a security finding is detected.

**Note**: To build this workflow, you must configure the [Jira integration][6].

## Initialize the workflow

1. On the [Workflow Automation page][4], click **New Workflow**.
1. Click **Add Trigger** > **Security**. 

   **Note**: A workflow must include a security trigger before you can run it. 
   
   The trigger’s [source object variables][7] allow you to access security misconfiguration data, such as the title `{{ Source.securityFinding.attributes.title }}`.
1. Enter a name for the workflow and click **Save**.

## Add Jira action

1. Click the plus (`+`) icon on the workflow canvas to add another step.
2. Search for the **Create issue** Jira action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Jira account**: The URL of your Jira account.
    - **Project**: `{{ Source.securityFinding.tags_value.team }}`
    - **Summary**: `{{ Source.securityFinding.attributes.title }}`
4. Click **Save**.

[4]: https://app.datadoghq.com/workflow
[6]: /integrations/jira/
[7]: /actions/workflows/variables/#context-variables
