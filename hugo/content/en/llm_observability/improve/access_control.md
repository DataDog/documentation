---
title: Data Access Control in Agent Observability
description: Use Data Access Control to restrict an Agent Observability Experiments project to specific teams or roles.
further_reading:
- link: "/account_management/rbac/data_access/"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/llm_observability/data_governance/"
  tag: "Documentation"
  text: "Data Governance"
- link: "/account_management/rbac/permissions/#access-management"
  tag: "Documentation"
  text: "Access management permissions"
---

## Overview

Projects can contain sensitive material: the prompts and expected outputs stored in your datasets, the traces produced by an experiment run, and the evaluation results attached to them. Datadog's [Data Access Control][1] lets you restrict an individual project so that only the teams or roles you name can see it.

When a project is restricted, users outside the teams or roles you granted access to:

- Do not see the project, or its experiments and datasets, in any list view or search result.
- Receive a *not found* response when they open a direct link to the project or to anything inside it.
- Cannot read the project's dataset records, including inputs and expected outputs.
- Cannot read the evaluation metrics produced by the project's experiment runs.
- Cannot read the spans produced by those runs, with one exception for experiments run through the SDK. See [Limitations](#limitations).
- Cannot create, modify, or delete anything inside the project, even with an ID they obtained earlier.

Restrictions apply in the Datadog UI and in the API. Application keys are subject to the same restrictions as the user who owns them.

## Prerequisites

- Data Access Control is configured for your organization. See [Data Access Control][1].
- You have the Datadog Admin role, or another role carrying the [`user_access_manage` permission][2].
- The project you want to restrict already exists in Experiments.

## Restrict a project in the UI

1. Navigate to [Organization Settings > Data Access Controls][3].
2. Create a new policy that restricts a subset of data.
3. Name the policy something that identifies the project it protects, for example `Experiments - Fraud Detection`.
4. Add a filter on the **Agent Observability** product, then **select the project from the list of values**. The list holds two groups: your projects, and the ML apps sending traces to Agent Observability. Make sure you select from the projects group.
5. Grant access to the teams or roles that should keep access to the project. A maximum of 50 teams or roles can be attached to one policy.
6. Save the policy.

<div class="alert alert-warning">Select the project from the list rather than typing its name. The value field also accepts free text, and a policy holding a project's <em>name</em> matches no Experiments data: the project stays visible to everyone while the policy looks like it is working. The same applies to a partially typed or misspelled name.</div>

Two things to expect while filling in the filter:

- **Projects already covered by another policy do not appear in the list.** A project can belong to only one policy at a time.
- **The filter key may be locked.** Agent Observability policies restrict both applications and projects through a single tag key, `ml_app`, and Data Access Control allows one tag key per telemetry type. If your organization already has an Agent Observability policy, new ones reuse the same key.

<div class="alert alert-info">Datadog is rolling out a redesigned access control page. Depending on your organization, step 2 is either <strong>New Restricted Dataset</strong> on the Data Access Controls page, or <strong>New Policy > Sensitive Data Partition</strong> on the Access Control page. Both configure the same restriction, and the link in step 1 takes you to whichever page your organization has. Selecting a project by name is only available on the redesigned page; on the older page, enter the project ID as the <code>ml_app</code> value until then.</div>

The policy takes effect as soon as it is saved. The project, its experiments, its datasets, and its dataset records are hidden immediately, whatever their age. Spans and evaluation metrics are subject to the exceptions in [Limitations](#limitations).

### Find a project's ID

If your organization's access control page shows raw values rather than project names, take the project ID from the URL of the project in Experiments, or from the `id` field returned by the [Experiments API][4] when listing projects.

## Restrict a project through the API

You can also create the policy with the [Datasets API][5]. The `ml_obs` product filter takes the project ID as its `ml_app` value:

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Experiments - Fraud Detection",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:3547f4ac-3af4-4733-9a70-8fe596e1e76d"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

## Grant and revoke access

Access is granted by editing the teams or roles on the policy. Removing a team or role takes effect immediately. Deleting the policy removes the restriction entirely, and the project becomes visible again to everyone in the organization with Agent Observability read access.

Being an admin does not exempt you from a restriction. The `user_access_manage` permission lets you author and edit policies, but access to a restricted project follows team and role membership only: an admin who is not in a granted team or role sees the project as not found, exactly as any other user would.

## Limitations

- **Spans from an experiment run through the SDK are not restricted by a policy on the project.** Those spans are attributed to the application that ran the experiment rather than to the project, so a policy on the project hides the project, its datasets, its dataset records, and its evaluation metrics, but not the inputs and outputs recorded on its spans. To cover those as well, add a second filter for your application's own `ml_app` value to the same policy.
- **Spans and evaluation metrics ingested before this feature became available are not restricted.** The project is attached to these events as a tag at ingestion time and past events are not re-tagged, so a policy on a project does not hide the event data of experiment runs that predate it. List views, metadata, and dataset records are unaffected by this and are hidden regardless of age.
- **Annotation queues and managed prompts are not supported** by Data Access Control. See [Data Access Control][1] for the full list of supported telemetry.
- **A project with no restriction policy is visible to everyone** with Agent Observability read access. Data Access Control is permissive by default unless your organization has enabled [Strict Mode][6] for Agent Observability. A policy whose value matches no project silently restricts nothing, so confirm every new restriction with a user outside the granted teams or roles.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /llm_observability/improve/experiments/api/
[5]: /api/latest/datasets/
[6]: /account_management/rbac/data_access/#strict-mode
