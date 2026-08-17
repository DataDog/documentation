---
title: Forms
description: Build forms to collect input, analyze responses, and trigger automations.
disable_toc: false
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-forms
    tag: Blog
    text: Turn feedback into action across your engineering org with Datadog Forms
  - link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
    tag: Blog
    text: Turn developer feedback into operational insight with Datadog Forms and Sheets

---

## Overview

Datadog Forms allow you to collect input, analyze responses, and trigger automations in Datadog. Forms and their responses can be shared across your organization, allowing you to collect and analyze data with your team.

Some ways you can use forms:
- Scaffold services from predefined templates.
- Survey engineering feedback in an internal developer portal (IDP).
- Create service requests and [cases][1] for security, platform, or IT teams directly from employee form responses.

## Create a form

On the [Forms][2] page, click {{< ui >}}New Form{{< /ui >}}, then select a creation method:

{{< tabs >}}
{{% tab "Create with AI" %}}
1. Select {{< ui >}}Create with AI{{< /ui >}} and click {{< ui >}}Continue{{< /ui >}}. The form editor opens with [Bits Chat][100].
1. Describe the form you want to build in the Bits Chat panel.
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.

You can also ask Bits Chat to create a form from anywhere in Datadog, not only from the Forms editor. See [Create and manage forms with MCP](#create-and-manage-forms-with-mcp).

[100]: /bits_ai/bits_chat/

{{% /tab %}}

{{% tab "Blank form" %}}
1. Select {{< ui >}}Start with a blank form{{< /ui >}} and click {{< ui >}}Continue{{< /ui >}}.
1. Name your form and optionally add a description and theme color. Click {{< ui >}}Continue{{< /ui >}}.
1. To add a component, click {{< ui >}}Add Component{{< /ui >}}, or in the {{< ui >}}Fields{{< /ui >}} panel, click the plus **+** icon. See [Form components][3] for the full list of component types and their options.
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.

[3]: /actions/forms/components/

{{% /tab %}}

{{% tab "Blueprint" %}}
Blueprints are starter forms for common use cases, pre-loaded with sample questions. Some blueprints include a pre-configured automation. Available blueprints include Developer Experience Survey, IDP Feedback, Case Management Service Request, Report an Incident, Bug Report, On-Call Escalation, Post-Incident Review, and more.

1. Select {{< ui >}}Create from blueprint{{< /ui >}} and browse the available templates.
1. Select a blueprint and click {{< ui >}}Continue{{< /ui >}}.
1. Name your form and optionally add a description and theme color. Click {{< ui >}}Continue{{< /ui >}}.
1. To further customize your form, see [Form components][3].
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.


[3]: /actions/forms/components/
{{% /tab %}}

{{% tab "Import" %}}
You can import an existing form from a PDF or JSON file.

1. Select {{< ui >}}Import a form{{< /ui >}}. An import dialog opens.
1. Choose a source and follow the prompts.
1. Name your form and optionally add a description and theme color. Click {{< ui >}}Continue{{< /ui >}}.
1. To further customize your form, see [Form components][3].
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.


[3]: /actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

To preview or share your form:
1. Click {{< ui >}}Preview{{< /ui >}} to view the form as it appears to respondents.
1. Click {{< ui >}}Share{{< /ui >}} to copy the form link or configure sharing options.

## Form settings

From the [Forms][2] page, click a form to open it in the editor. In the editor header, click the gear <i class="icon-cog-2"></i> icon to access the following settings:

| Setting | Description |
|---------|-------------|
| Accepting Responses | Set the form as active or inactive. When inactive, the form does not accept new responses. You can also set an end date to automatically close the form on a specific date. Only available for published forms. |
| Anonymous Responses | When enabled, respondent emails are not stored. |
| Manage Permissions | Configure who can view and edit the form, and who can view submitted responses. See [Manage access](#manage-access). |
| Clone Form | Create a copy of the form. |
| Import Form | Import fields from a PDF or JSON file into the current form. |
| Export Form (JSON) | Download the form as a JSON file. |

For more information on managing responses, see [Form responses][4].

## Share a form

To configure sharing for a form:
1. From the [Forms][2] page, click a form.
1. Click {{< ui >}}Share{{< /ui >}}.

The following sharing options are available:

{{% collapse-content title="Share within Datadog" level="h3" expanded=false %}}
Share the form with users in your Datadog organization.

Under {{< ui >}}Add to Dashboard{{< /ui >}}, use the dropdown to add the form to an existing dashboard or create a dashboard.

Enable the {{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} toggle to surface the form in the [Self-Service Actions][5] catalog. This is a central place where platform and infrastructure teams publish tools for the rest of the organization to discover and use.
{{% /collapse-content %}}

{{% collapse-content title="Share with external users" level="h3" expanded=false %}}
Share the form with users outside your Datadog organization. You can configure an access expiration date for each sharing option and create multiple sharing configurations with different settings and expiration dates.

The following options are available:

- **Specific individuals**: Add recipients by individual email address. For example, `alice@example.com` and `bob@example.com`.
- **Company domain**: Share with anyone in a specific email domain. For example, `*@yourcompany.com`.
- **Shareable link**: Generate a link that anyone can use to access the form without a Datadog account.
{{% /collapse-content %}}

To pause or remove external sharing, click {{< ui >}}Share{{< /ui >}}, then click {{< ui >}}Edit{{< /ui >}} and select {{< ui >}}Pause Sharing{{< /ui >}} or {{< ui >}}Delete Sharing{{< /ui >}}.

To prefill fields in a shared link so respondents start with some answers filled in, see [Prefill form fields][15].

## Add a form to a dashboard

To add a form to a dashboard from the form editor:
1. From the [Forms][2] page, click a form to open it in the editor.
1. Click the {{< ui >}}Share{{< /ui >}} dropdown and select {{< ui >}}Share within Datadog{{< /ui >}} .
1. Under {{< ui >}}Add to Dashboard{{< /ui >}}, select an existing dashboard or create one, then click {{< ui >}}Add{{< /ui >}}.

You can also add a form to a dashboard directly from the dashboard:
1. Navigate to a [dashboard][6].
1. Click **Add Widgets** to open the side panel.
1. Click the **Apps** tab.
1. Select **Form Widget**.
1. Select your form, then click {{< ui >}}Save{{< /ui >}}.

## Add automation

After creating a form, you can add an [action][7] or [workflow blueprint][8] that triggers automatically when a form is submitted.
1. From the [Forms][2] page, click a form.
1. At the top of the form, select {{< ui >}}Automation{{< /ui >}}.
1. Choose an action or blueprint.
1. The action or blueprint opens in a workflow canvas, where you can [edit it][9].
1. Click {{< ui >}}Create{{< /ui >}}.

**Note**: Automations triggered by forms appear under [Workflow Automation][10].

## Create and manage forms with MCP

Connect an external AI agent to the [Datadog MCP Server][11] to create, update, publish, and read forms and their responses. Enable the `forms` toolset (or `all`) when you [connect to the MCP Server][12]. You can also ask [Bits Chat][13] to build a form from anywhere in Datadog. See [Forms][14] in the Datadog MCP Server tools reference for the full list of available tools.

## Manage access

By default, only the creator of a form can access it. To change the permissions on a form:
1. From the [Forms][2] page, click a form to open it in the editor.
1. In the editor header, click the gear <i class="icon-cog-2"></i> icon.
1. Click {{< ui >}}Manage Permissions{{< /ui >}}. A modal opens with two sections:
   - **Form Access**: Controls who can view and edit the form.
   - **Response Access**: Controls who can view submitted responses. This section is only available after the form receives its first submission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/case_management/
[2]: https://app.datadoghq.com/forms
[3]: /actions/forms/components/
[4]: /actions/forms/responses/
[5]: /internal_developer_portal/self_service_actions/
[6]: /dashboards/
[7]: https://app.datadoghq.com/actions/action-catalog/
[8]: https://app.datadoghq.com/workflow/blueprints
[9]: /actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[10]: https://app.datadoghq.com/workflow
[11]: /mcp_server/
[12]: /mcp_server/setup/#toolsets
[13]: /bits_ai/bits_chat/
[14]: /mcp_server/tools/#forms
[15]: /actions/forms/guide/prefill/
