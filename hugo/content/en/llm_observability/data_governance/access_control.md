---
title: Data Access Control in Agent Observability
aliases:
- /llm_observability/improve/access_control/
description: Use Data Access Control to restrict Agent Observability projects, evaluator configs, and application-associated managed prompts to specific teams or roles.
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

Agent Observability projects can hold sensitive material, including dataset prompts and expected outputs, traces from experiment runs, evaluation results, and traces under review in annotation queues. [Data Access Control][1] lets you restrict a project so that only the teams or roles you specify can see it.

When a project is restricted, users outside the teams or roles you granted access to cannot:

- See the project, or its offline experiments, datasets, and annotation queues, in any list view or search result
- Read the project's dataset records, including inputs and expected outputs
- Read the evaluation metrics produced by the project's experiment runs
- Read the spans produced by those runs, except for offline experiments run through the SDK (see [Limitations](#limitations))
- Read the project's annotation queues, including the traces under review and the labels applied to them
- Create, modify, or delete anything inside the project, even with an ID they obtained earlier

Users outside those teams or roles receive a *not found* response when they open a direct link to the project or to anything inside it.

You can also restrict the evaluator configs that run on an application's traces and the managed prompts associated with that application. See [Restrict application-scoped data](#restrict-application-scoped-data).

Restrictions apply in the Datadog UI and in the API. Application keys are subject to the same restrictions as the user who owns them.

## Prerequisites

- Data Access Control is configured for your organization. See [Data Access Control][1].
- You have the Datadog Admin role, or another role carrying the [`user_access_manage` permission][2].
- The project or application you want to restrict already exists in Agent Observability.

## Restrict a project in the UI

<!-- TBD (DOCS-15824): Confirm these steps with the Agent Observability team. -->

1. Navigate to [Organization Settings > Access Control][3].
2. In the **Restricted Datasets** section, click **New Policy**. On the **New Policy** page, select the **Restricted Datasets** tab.
3. Under **Choose Data Scope**, select **Agent Observability** as the product, then select the project from the list of values. The list has two groups: your projects, and the applications that send traces to Agent Observability. Select from the projects group.

    <div class="alert alert-warning"><ul><li>Typing the project name, even in part or with a typo, matches no Offline Experiments data. The project stays visible to everyone, and the restriction looks like it is working.</li><li>Projects already covered by another Restricted Dataset do not appear in the list. A project can belong to only one Restricted Dataset at a time.</li></ul></div>

4. Under **Designate Users with Access**, add the teams or roles that should keep access to the project. A maximum of 50 teams or roles can be attached to one Restricted Dataset.
5. Under **Name Policy**, enter a name that identifies the project it protects, for example `Offline Experiments - Fraud Detection`.
6. Save the Restricted Dataset.

**Note**: The filter key may be locked. Agent Observability uses one tag key, `ml_app`, for both applications and projects, and Data Access Control allows one tag key per telemetry type. If your organization already has an Agent Observability Restricted Dataset, new ones reuse the same key.

The restriction takes effect as soon as it is saved. The project and its offline experiments, datasets, dataset records, and annotation queues are hidden immediately, regardless of when they were created. Spans from offline experiments run through the SDK are an exception. See [Limitations](#limitations).

## Restrict a project through the API

You can also create a restriction with the Data Access Control [Datasets API][5]. The `ml_obs` product filter takes the project ID as its `ml_app` value:

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Offline Experiments - Fraud Detection",
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

## Restrict application-scoped data

Evaluator configs and managed prompts are restricted by application rather than by project. To restrict them, create a Restricted Dataset with an Agent Observability `ml_app` filter whose value is the application name:

- On the Access Control page, select the application from the applications group in the value list.
- On the Data Access Controls page or in the Datasets API, enter the application name as the `ml_app` value. Matching on the application name is not case-sensitive.

Grant access to the teams or roles that should be able to access the application's data, then save the Restricted Dataset.

## Annotation queues

An annotation queue that belongs to a project inherits that project's restriction. Restricting a project hides its queues, the traces they hold for review, the labels that reviewers applied, and each queue's label schema. Users outside the granted teams or roles cannot annotate, edit, or delete a queue, and cannot export its annotated interactions to a dataset or to CSV.

A queue's own [access settings][7] are separate: the reviewer and assignee restrictions control who can annotate a queue that a user can already see. Data Access Control controls who can see the queue at all.

Every annotation queue you create must belong to a project. Queues created before this requirement took effect may have no project. See [Limitations](#limitations).

## Evaluator configs

[Evaluator configs][8], including custom LLM-as-a-judge and managed evaluator configs, are restricted by application rather than by project. Each evaluator config targets one application, and it follows the Restricted Dataset whose `ml_app` value is that application's name. Matching on the application name is not case-sensitive.

Users outside the granted teams or roles cannot view, edit, or create evaluator configs that target a restricted `ml_app` or project.

## Managed prompts

[Managed prompts][9] promoted from [Prompt Tracking][11] retain the application name from their tracked spans. They follow the Restricted Dataset whose `ml_app` value is that application name.

Users outside the granted teams or roles cannot list, view, retrieve, resolve, update, or delete the managed prompt or its versions. This restriction applies in the Datadog UI and to Prompt Management API and SDK operations. A restricted prompt also cannot be used as a source in [prompt composition][10] without access to that prompt.

Prompts created directly in the Prompt Management UI, API, or SDK are not associated with an application. They cannot be restricted with Data Access Control. To create an application-associated managed prompt, first track the prompt in an instrumented application, then promote it to the managed prompt registry.

## Find a project's ID

The Datasets API takes a project ID as the `ml_app` value, not a project name. Take the project ID from the URL of the project in Offline Experiments, or from the `id` field returned by the [Offline Experiments API][4] when listing projects.

## Grant and revoke access

Grant access by editing the teams or roles on the Restricted Dataset. Removing a team or role takes effect immediately. Deleting the Restricted Dataset removes the restriction entirely, and the project becomes visible again to everyone in the organization with Agent Observability read access.

Being an admin does not exempt you from a restriction. The `user_access_manage` permission lets you author and edit Restricted Datasets, but access to a restricted project follows team and role membership only. An admin who is not in a granted team or role sees the project as not found, exactly as any other user would.

## Limitations

- **Spans from an experiment run through the SDK are not restricted by a Restricted Dataset on the project.** These spans are attributed to the application that ran the experiment, not to the project. A Restricted Dataset on the project hides the project and its datasets, dataset records, and evaluation metrics, but not the inputs and outputs on those spans. To restrict those spans too, add a second filter for the application's `ml_app` value to the same Restricted Dataset.
- **Evaluator configs follow only Restricted Datasets that filter on `ml_app`.** A Restricted Dataset filter on any other tag key does not restrict evaluator configs, even if it restricts the application's traces.
- **Only application-associated managed prompts can be restricted.** Prompts created directly in Prompt Management have no `ml_app` value and remain visible to everyone with the required Agent Observability permissions, including when Agent Observability data outside Restricted Datasets is set to [Restricted][6].
- **An annotation queue that does not belong to a project is visible to everyone** with Agent Observability read access, and no Restricted Dataset can hide it. Move the queue into a project, or recreate it in one, to bring it under a restriction.
- **A project with no Restricted Dataset is visible to everyone** with Agent Observability read access. Data Access Control is permissive by default unless your organization sets Agent Observability data outside Restricted Datasets to [Restricted][6]. A Restricted Dataset whose value matches no project silently restricts nothing. Confirm every new restriction with a user outside the granted teams or roles.
- **When Agent Observability is set to [Restricted][6], a project is visible only if a Restricted Dataset names its project ID.** An `ml_app` value that is an application name grants nothing in Offline Experiments, so the project stays hidden from everyone, including the teams and roles on your other Restricted Datasets. See [Find a project's ID](#find-a-projects-id).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/access-controls
[4]: /llm_observability/guide/offline_experiments_api/
[5]: /api/latest/datasets/
[6]: /account_management/rbac/data_access/#strict-mode
[7]: /llm_observability/investigate/annotation_queues/#managing-queue-access
[8]: /llm_observability/investigate/evaluations/
[9]: /llm_observability/configure/prompt_management/
[10]: /llm_observability/configure/prompt_management/#reuse-prompts-with-composition
[11]: /llm_observability/instrument/prompt_tracking/
