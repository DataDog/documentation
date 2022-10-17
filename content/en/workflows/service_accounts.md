---
title: Service Accounts for Workflows
kind: Documentation
disable_toc: false
further_reading:
- link: "/account_management/org_settings/service_accounts/"
  tag: "Documentation"
  text: "Learn more about Datadog service accounts"
- link: "/workflows/authentication/"
  tag: "Documentation"
  text: "Learn how to create Connections for the actions in your workflow."
---

To add an automated trigger to a workflow, the workflow must have an associated service account. The service account is needed to:
- resolve the connections defined in the workflow actions at runtime
- provide an identity for workflow executions
- provide an identity for workflow audit trails

To create a service account for a workflow, you must have either the Datadog admin role, or a custom role with the **Service Account Write** permission. The service account you create adopts your role and permissions. For more information on service accounts and permissions, see [Service accounts][1].

<div class="alert alert-info">The service account you create allows a workflow to be triggered automatically. However, individual actions in the workflow might still require <bold>Connections</bold>. For more information, see <a href="/workflows/authentication/">Authentication</a>.</div>

## Associate a service account with a workflow

You can dynamically create a service account for your workflow when you [add an automatic trigger][2]. Alternatively, click on the workflow name and click **Create**.

Service accounts use the email address associated with your Datadog account and follow the pattern: `[WF]: <your-workflow-name>`.

## View service account details

To view a service account's details:
1. On your workflow canvas, click on the automated or scheduled trigger.
1. Next to the service account, click **View**.

{{< img src="workflows/service-account-details1.png" alt="Service account details" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/org_settings/service_accounts/
[2]: /workflows/trigger/