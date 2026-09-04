---
title: Restrict Access to Experiments Projects
description: Use Data Access Control to restrict an Agent Observability Experiments project to specific teams or roles.
further_reading:
- link: "/account_management/rbac/data_access"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/llm_observability/data_privacy_security_and_rbac"
  tag: "Documentation"
  text: "Data Privacy, Security, and RBAC"
- link: "/account_management/rbac/permissions/#access-management"
  tag: "Documentation"
  text: "Access management permissions"
---

## Overview

Experiments projects can contain sensitive material: the prompts and expected outputs stored in your datasets, the traces produced by an experiment run, and the evaluation results attached to them. Datadog's [Data Access Control][1] lets you restrict an individual project so that only the teams or roles you name can see it.

When a project is restricted, users outside the granted principals:

- Do not see the project, or its experiments and datasets, in any list view or search result.
- Receive a *not found* response when they open a direct link to the project or to anything inside it.
- Cannot read the project's dataset records, including inputs and expected outputs.
- Cannot read the evaluation metrics produced by the project's experiment runs.
- Cannot read the spans produced by those runs, unless the spans carry an `ml_app` value of their own. Experiments run through the SDK do produce such spans; see [Limitations](#limitations).
- Cannot create, modify, or delete anything inside the project, even with an ID they obtained earlier.

Restrictions are enforced consistently in the Datadog UI and in the API, including requests authenticated with an application key: an application key carries the identity of the user who owns it, and that user's access is what applies.

## Prerequisites

- Data Access Control is configured for your organization. See [Data Access Control][1].
- You have the Datadog Admin role, or another role carrying the [`user_access_manage` permission][2].
- The project you want to restrict already exists in Experiments.

## Restrict a project

Access to Agent Observability data is keyed on the **`ml_app`** tag, and that one key covers two different things:

- An **ML app** value restricts the traces your instrumented application sends under that `ml_app` name.
- An **Experiments project ID** restricts that project: its experiments, datasets, dataset records, and the spans and evaluation metrics produced by its experiment runs.

A project is matched by its ID, never by its name.

1. Navigate to [Organization Settings > Data Access Controls][3].
2. Create a new policy that restricts a subset of data.
3. Name the policy something that identifies the project it protects, for example `Experiments - Fraud Detection`.
4. Add a filter on the **Agent Observability** product with the key `ml_app`, then **select the project from the list of values**. The list contains two groups: your ML apps (the `ml_app` values your instrumented applications send), and your Experiments projects, offered by name. Selecting a project stores its ID, which is what the restriction matches on.
5. Grant access to the teams or roles that should keep access to the project. A maximum of 50 principals can be attached to one policy.
6. Save the policy.

The policy takes effect as soon as it is saved. The project, its experiments, its datasets, and its dataset records are hidden immediately, whatever their age. Spans and evaluation metrics are matched by a tag applied when they are ingested, so experiment runs from before your organization had this feature available are not covered; see [Limitations](#limitations).

<div class="alert alert-warning">Select the project from the list rather than typing its name. The value field also accepts free text, and a policy holding a project's <em>name</em> matches no Experiments data: the project stays visible to everyone while the policy looks like it is working. The same applies to a partially typed or misspelled name.</div>

Two things to expect while filling in the filter:

- **Projects already covered by another policy do not appear in the list.** A project can belong to only one policy at a time.
- **The key may be locked to `ml_app`.** Data Access Control allows one tag key per telemetry type, so if your organization already has an Agent Observability policy, new ones reuse the same key.

<div class="alert alert-info">Datadog is rolling out a redesigned access control page. Depending on your organization, step 2 is either <strong>New Restricted Dataset</strong> on the Data Access Controls page, or <strong>New Policy > Sensitive Data Partition</strong> on the Access Control page. Both configure the same restriction, and the link in step 1 takes you to whichever page your organization has. Selecting an Experiments project by name is only available on the redesigned page; on the older page, enter the project ID as the value.</div>

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

Access is granted by editing the policy's principals. Removing a team or role takes effect on their next request. Deleting the policy removes the restriction entirely, and the project becomes visible again to everyone in the organization with Agent Observability read access.

Users with the `user_access_manage` permission are not subject to restrictions, so verify a restriction with an account that does not hold that permission.

## Limitations

- **Spans from an experiment run by the SDK carry your application's `ml_app`, not the project.** The SDK sends an `ml_app` value with every span it produces, taken from the value you configured or from your service name, and Datadog does not replace it. A policy on the project does not match those spans, so for an experiment run this way the restriction covers its evaluation metrics but not the inputs and outputs recorded on its spans. The project, its experiments, its datasets, and its dataset records are hidden either way. To restrict the span contents as well, add a second filter for your application's own `ml_app` value to the same policy.
- **Spans and evaluation metrics ingested before this feature became available are not restricted.** The project ID is attached as a tag at ingestion time and past events are not re-tagged, so a policy on a project does not hide the event data of experiment runs that predate it. List views, metadata, and dataset records are unaffected by this and are hidden regardless of age.
- **Annotation queues and managed prompts are not supported** by Data Access Control. See [Data Access Control][1] for the full list of supported telemetry.
- **A project with no restriction policy is visible to everyone** with Agent Observability read access. Data Access Control is permissive by default unless your organization has enabled Strict Mode for the telemetry type. A policy whose value matches no project silently restricts nothing, so confirm every new restriction with a user outside the granted principals.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls
[4]: /llm_observability/improve/experiments/api/
[5]: /api/latest/datasets/
