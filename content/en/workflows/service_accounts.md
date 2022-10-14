---
title: Service accounts for Workflows
kind: Documentation
disable_toc: false
further_reading:
- link: "/account_management/org_settings/service_accounts/"
  tag: "Documentation"
  text: "Learn more about Datadog service accounts"
---

To add am automated or scheduled trigger to a workflow, the workflow must have an associated service account. The service account is needed:
- to resolve the connections defined in the workflow actions at runtime
- to provide an identity for workflow executions
- to provide an identity for workflow audit trails

To use automated or scheduled triggers, a workflow must be associated with a unique service account.

## Requirements

To create a service account for a workflow:
- You must have either the Datadog admin role, or a custom role with the `SERVICE_ACCOUNT_WRITE` permission. For more information on service accounts and permissions, see [Service accounts][1].
- Before you can add a service account, you need a workflow with at least one action so you can add a Trigger.

## Associate a service account with a workflow

You can dynamically create a service account for your workflow when you [add a trigger][5]. Alternatively, click on the workflow name add a service account next to **@worklow-** to dynamically create a service account and associate it with the workflow.

{{< img src="workflows/create-service-account.png" alt="You can create a service account by clicking on the workflow name" style="width:100%;" >}}

Service accounts use the email address associated with your Datadog account and follow the pattern: `[WF]:<your-workflow-name>`.

## Service account roles and permissions

When a workflow action runs, it checks the service account's roles to make sure that it is allowed to execute. For example, the **AWS Lambda** action requires the `CONNECTION_RESOLVE` resource permissions. The Datadog Admin Role and Datadog Standard Role both have `CONNECTION_RESOLVE` resource permissions, so the service account would require one of those roles before the **AWS Lambda** action could execute.

In addition to roles, you can further restrict a role's workflow permissions. You can restrict the permissions as follows:
- **Viewer**: Can view workflows
- **Resolver**: Can resolve and review workflows
- **Editor**: Can edit, resolve and review workflows

In the example below, the connection `raph-test` is restricted to the **Datadog Admin Role** with **Editor** permissions, and the **Datadog Standard Role** with **Resolver** permissions.

{{< img src="workflows/service-account-example.png" alt="A connection with roles and permissions assigned" style="width:100%;" >}}

At runtime, a workflow using this connection would require a service account with the Datadog Standard Role before it could successfully execute.

## View service account details

To view a service account's details:
1. On your workflow canvas, click on the automated or scheduled trigger.
1. Next to the service account, click **View**.

{{< img src="workflows/service-account-details.png" alt="Service account details" style="width:100%;" >}}

[1]: /account_management/org_settings/service_accounts/
[2]: https://app.datadoghq.com/workflow
[3]: /workflows/build
[4]: /workflows/trigger/




