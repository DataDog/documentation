---
title: Data Access Control in Agent Observability
description: Use Data Access Control to restrict Agent Observability applications and projects to specific teams or roles.
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

Agent Observability traces can hold sensitive material, including user prompts, model responses, and tool inputs and outputs. [Data Access Control][1] lets you restrict this data so that only the teams or roles you specify can see it.

Agent Observability uses the `ml_app` tag key for restrictions. You can restrict data in two ways, depending on the value you give `ml_app`:

- **By application**: Set `ml_app` to the name of an application that sends traces to Agent Observability. This is the `ml_app` value set in your instrumentation. The restriction hides that application's traces on the Traces page and anywhere else in Datadog that displays its trace data. It also restricts the evaluator configs that target the application.
- **By project**: Set `ml_app` to the ID of an Agent Observability project. The restriction hides the project, along with its experiments, datasets, and annotation queues.

Restrictions apply in the Datadog UI and in the API. Application keys are subject to the same restrictions as the user who owns them.

## Prerequisites

- Data Access Control is configured for your organization. See [Data Access Control][1].
- You have the Datadog Admin role, or another role carrying the [`user_access_manage` permission][2].

## Create a restriction

<div class="alert alert-info">Datadog is rolling out a redesigned access control page. Your organization has either the <strong>Data Access Controls</strong> page or the redesigned <strong>Access Control</strong> page. The link in the steps below takes you to whichever one you have, and both configure the same restriction.</div>

{{< tabs >}}
{{% tab "Application" %}}

Restrict an application to hide its traces from users outside the teams or roles you grant access to. Those users cannot:

- See the application's traces and spans on the Traces page, or anywhere else in Datadog that displays Agent Observability trace data
- View, edit, or create [evaluator configs][101], including custom LLM-as-a-judge and managed evaluator configs, that target the application

### Restrict an application in the UI

1. Navigate to [Organization Settings > Data Access Controls][102].
2. Create a restriction that covers a subset of data:
   - On the Data Access Controls page, click **New Restricted Dataset**.
   - On the Access Control page, click **New Policy > Sensitive Data Partition**.
3. Name it something that identifies the application it protects, for example `Agent Observability - Support Chatbot`.
4. Add a filter on the **Agent Observability** product, then specify the application:
   - On the Access Control page, select the application from the list of values. The list has two groups: your projects, and the applications that send traces to Agent Observability. Select from the applications group.
   - On the Data Access Controls page, enter the application name as the `ml_app` value.
5. Grant access to the teams or roles that should keep access to the application. A maximum of 50 teams or roles can be attached to one Restricted Dataset.
6. Save the Restricted Dataset.

### Restrict an application through the API

You can also create a restriction with the Data Access Control [Datasets API][103]. The `ml_obs` product filter takes the application name as its `ml_app` value:

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Agent Observability - Support Chatbot",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:support-chatbot"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

### Evaluator configs

Each evaluator config targets one application, and it follows the Restricted Dataset whose `ml_app` value is that application's name. Matching on the application name is not case-sensitive.

Evaluator configs follow only Restricted Datasets that filter on `ml_app`. Traces can be restricted with any tag, but a Restricted Dataset filter on another tag key does not restrict evaluator configs, even if it restricts the application's traces.

[101]: /llm_observability/investigate/evaluations/
[102]: https://app.datadoghq.com/organization-settings/data-access-controls/
[103]: /api/latest/datasets/

{{% /tab %}}
{{% tab "Project" %}}

Agent Observability projects can hold sensitive material, including dataset prompts and expected outputs, traces from experiment runs, evaluation results, and traces under review in annotation queues. When a project is restricted, users outside the teams or roles you granted access to cannot:

- See the project, or its experiments, datasets, and annotation queues, in any list view or search result
- Read the project's dataset records, including inputs and expected outputs
- Read the evaluation metrics produced by the project's experiment runs
- Read the spans produced by those runs, except for experiments run through the SDK (see [Limitations](#limitations))
- Read the project's annotation queues, including the traces under review and the labels applied to them
- Create, modify, or delete anything inside the project, even with an ID they obtained earlier

Users outside those teams or roles receive a *not found* response when they open a direct link to the project or to anything inside it.

The project you want to restrict must already exist in Agent Observability.

### Restrict a project in the UI

1. Navigate to [Organization Settings > Data Access Controls][201].
2. Create a restriction that covers a subset of data:
   - On the Data Access Controls page, click **New Restricted Dataset**.
   - On the Access Control page, click **New Policy > Sensitive Data Partition**.
3. Name it something that identifies the project it protects, for example `Experiments - Fraud Detection`.
4. Add a filter on the **Agent Observability** product, then specify the project:
   - On the Access Control page, select the project from the list of values. The list has two groups: your projects, and the applications that send traces to Agent Observability. Select from the projects group.

       <div class="alert alert-warning"><ul><li>Typing the project name, even in part or with a typo, matches no Experiments data. The project stays visible to everyone, and the restriction looks like it is working.</li><li>Projects already covered by another Restricted Dataset do not appear in the list. A project can belong to only one Restricted Dataset at a time.</li></ul></div>

   - On the Data Access Controls page, enter the project ID as the `ml_app` value. See [Find a project's ID](#find-a-projects-id).

5. Grant access to the teams or roles that should keep access to the project. A maximum of 50 teams or roles can be attached to one Restricted Dataset.
6. Save the Restricted Dataset.

The restriction takes effect as soon as it is saved. The project and its experiments, datasets, dataset records, and annotation queues are hidden immediately, regardless of when they were created. Spans from experiments run through the SDK are an exception. See [Limitations](#limitations).

### Restrict a project through the API

You can also create a restriction with the Data Access Control [Datasets API][202]. The `ml_obs` product filter takes the project ID as its `ml_app` value:

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

### Find a project's ID

The Data Access Controls page and the Datasets API take a project ID as the `ml_app` value, not a project name. Take the project ID from the URL of the project in Experiments, or from the `id` field returned by the [Experiments API][203] when listing projects.

### Annotation queues

An annotation queue that belongs to a project inherits that project's restriction. Restricting a project hides its queues, the traces they hold for review, the labels that reviewers applied, and each queue's label schema. Users outside the granted teams or roles cannot annotate, edit, or delete a queue, and cannot export its annotated interactions to a dataset or to CSV.

A queue's own [access settings][204] are separate: the reviewer and assignee restrictions control who can annotate a queue that a user can already see. Data Access Control controls who can see the queue at all.

Every annotation queue you create must belong to a project. Queues created before this requirement took effect may have no project. See [Limitations](#limitations).

[201]: https://app.datadoghq.com/organization-settings/data-access-controls/
[202]: /api/latest/datasets/
[203]: /llm_observability/improve/experiments/api/
[204]: /llm_observability/investigate/annotation_queues/#managing-queue-access

{{% /tab %}}
{{< /tabs >}}

**Note**: The filter key may be locked. Agent Observability uses one tag key, `ml_app`, for both applications and projects, and Data Access Control allows one tag key per telemetry type. If your organization already has an Agent Observability Restricted Dataset, new ones reuse the same key.

## Grant and revoke access

Grant access by editing the teams or roles on the Restricted Dataset. Removing a team or role takes effect immediately. Deleting the Restricted Dataset removes the restriction entirely, and the application or project becomes visible again to everyone in the organization with Agent Observability read access.

Being an admin does not exempt you from a restriction. The `user_access_manage` permission lets you author and edit Restricted Datasets, but access to restricted data follows team and role membership only. An admin who is not in a granted team or role sees restricted data as not found, exactly as any other user would.

## Limitations

- **Spans from an experiment run through the SDK are not restricted by a Restricted Dataset on the project.** These spans are attributed to the application that ran the experiment, not to the project. A Restricted Dataset on the project hides the project and its datasets, dataset records, and evaluation metrics, but not the inputs and outputs on those spans. To restrict those spans too, add a second filter for the application's `ml_app` value to the same Restricted Dataset.
- **Managed prompts are not supported** by Data Access Control. See [Data Access Control][1] for the full list of supported telemetry.
- **An annotation queue that does not belong to a project is visible to everyone** with Agent Observability read access, and no Restricted Dataset can hide it. Move the queue into a project, or recreate it in one, to bring it under a restriction.
- **An application or project with no Restricted Dataset is visible to everyone** with Agent Observability read access. Data Access Control is permissive by default unless your organization sets Agent Observability data outside Restricted Datasets to [Restricted][3]. A Restricted Dataset whose value matches no application or project silently restricts nothing. Confirm every new restriction with a user outside the granted teams or roles.
- **When Agent Observability is set to [Restricted][3], a project is visible only if a Restricted Dataset names its project ID.** An `ml_app` value that is an application name grants nothing in Experiments, so the project stays hidden from everyone, including the teams and roles on your other Restricted Datasets. See [Find a project's ID](#find-a-projects-id).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/
[2]: /account_management/rbac/permissions/#access-management
[3]: /account_management/rbac/data_access/#strict-mode
