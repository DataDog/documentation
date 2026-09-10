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

Experiments projects can hold sensitive material, including dataset prompts and expected outputs, traces from experiment runs, and evaluation results. [Data Access Control][1] lets you restrict a project so that only the teams or roles you specify can see it.

When a project is restricted, users outside the teams or roles you granted access to cannot:

- See the project, or its experiments and datasets, in any list view or search result
- Read the project's dataset records, including inputs and expected outputs
- Read the evaluation metrics produced by the project's experiment runs
- Read the spans produced by those runs, except for experiments run through the SDK (see [Limitations](#limitations))
- Create, modify, or delete anything inside the project, even with an ID they obtained earlier

Users outside those teams or roles receive a *not found* response when they open a direct link to the project or to anything inside it.

Restrictions apply in the Datadog UI and in the API. Application keys are subject to the same restrictions as the user who owns them.

## Prerequisites

- Data Access Control is configured for your organization. See [Data Access Control][1].
- You have the Datadog Admin role, or another role carrying the [`user_access_manage` permission][2].
- The project you want to restrict already exists in Experiments.

## Restrict a project in the UI

<div class="alert alert-info">Datadog is rolling out a redesigned access control page. Your organization has either the <strong>Data Access Controls</strong> page or the redesigned <strong>Access Control</strong> page. The link in step 1 takes you to whichever one you have, and both configure the same restriction.</div>

1. Navigate to [Organization Settings > Data Access Controls][3].
2. Create a restriction that covers a subset of data:
   - On the Data Access Controls page, click **New Restricted Dataset**.
   - On the Access Control page, click **New Policy > Sensitive Data Partition**.
3. Name it something that identifies the project it protects, for example `Experiments - Fraud Detection`.
4. Add a filter on the **Agent Observability** product, then specify the project:
   - On the Access Control page, select the project from the list of values. The list has two groups: your projects, and the applications that send traces to Agent Observability. Select from the projects group.
   - On the Data Access Controls page, enter the project ID as the `ml_app` value. See [Find a project's ID](#find-a-projects-id).

   **Note**: On the Access Control page, projects already covered by another Restricted Dataset do not appear in the list. A project can belong to only one Restricted Dataset at a time.
5. Grant access to the teams or roles that should keep access to the project. A maximum of 50 teams or roles can be attached to one Restricted Dataset.
6. Save the Restricted Dataset.

<div class="alert alert-warning">On the Access Control page, select the project from the list. Typing the project name, even in part or with a typo, matches no Experiments data. The project stays visible to everyone, and the restriction looks like it is working.</div>

**Note**: The filter key may be locked. Agent Observability uses one tag key, `ml_app`, for both applications and projects, and Data Access Control allows one tag key per telemetry type. If your organization already has an Agent Observability Restricted Dataset, new ones reuse the same key.

The restriction takes effect as soon as it is saved. The project and its experiments, datasets, and dataset records are hidden immediately, regardless of when they were created. Spans and evaluation metrics are subject to the exceptions in [Limitations](#limitations).

## Find a project's ID

The Data Access Controls page and the Datasets API take a project ID as the `ml_app` value, not a project name. Take the project ID from the URL of the project in Experiments, or from the `id` field returned by the [Experiments API][4] when listing projects.

## Restrict a project through the API

You can also create a restriction with the Data Access Control [Datasets API][5]. The `ml_obs` product filter takes the project ID as its `ml_app` value:

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

Access is granted by editing the teams or roles on the Restricted Dataset. Removing a team or role takes effect immediately. Deleting the Restricted Dataset removes the restriction entirely, and the project becomes visible again to everyone in the organization with Agent Observability read access.

Being an admin does not exempt you from a restriction. The `user_access_manage` permission lets you author and edit Restricted Datasets, but access to a restricted project follows team and role membership only. An admin who is not in a granted team or role sees the project as not found, exactly as any other user would.

## Limitations

- **Spans from an experiment run through the SDK are not restricted by a Restricted Dataset on the project.** These spans are attributed to the application that ran the experiment, not to the project. A Restricted Dataset on the project hides the project and its datasets, dataset records, and evaluation metrics, but not the inputs and outputs on those spans. To restrict those spans too, add a second filter for the application's `ml_app` value to the same Restricted Dataset.
- **Spans and evaluation metrics ingested before project tagging became available are not restricted.** The project is attached to these events as a tag at ingestion time, and past events are not re-tagged, so a restriction does not hide event data from experiment runs that predate the rollout. Events that carry the tag are hidden as soon as the restriction is saved, whatever their age. List views, metadata, and dataset records are hidden regardless of when they were created.
- **Annotation queues and managed prompts are not supported** by Data Access Control. See [Data Access Control][1] for the full list of supported telemetry.
- **A project with no Restricted Dataset is visible to everyone** with Agent Observability read access. Data Access Control is permissive by default unless your organization has enabled [Strict Mode][6] for Agent Observability. A Restricted Dataset whose value matches no project silently restricts nothing. Confirm every new restriction with a user outside the granted teams or roles.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /llm_observability/improve/experiments/api/
[5]: /api/latest/datasets/
[6]: /account_management/rbac/data_access/#strict-mode
