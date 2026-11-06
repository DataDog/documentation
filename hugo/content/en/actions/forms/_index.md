---
title: Forms
description: Build forms to collect input, analyze responses, and trigger automations.
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
- Create service requests and [work items][1] for security, platform, or IT teams directly from employee form responses.

## Create a form

On the [Forms][2] page, click {{< ui >}}New Form{{< /ui >}}. The **Build a form with Bits Chat** page opens with a prompt field.

1. Describe the form you want to build. To use one of the rotating example prompts shown in the field, press **Tab**. To use one of the suggested prompts listed below the field, click it. Then submit your prompt.
1. Your form opens directly in the form editor with [Bits Chat][3], where you can continue describing changes to refine the form.
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.

You can also ask Bits Chat to create a form from anywhere in Datadog. Or use an AI coding assistant connected to the Datadog MCP Server. See [Create and manage forms with MCP](#create-and-manage-forms-with-mcp).

To start a form another way, under **Get started in other ways**, select one of the following options. Each one takes you directly to the form editor, where you can name your form and add or edit components.

{{< tabs >}}
{{% tab "Blueprint" %}}
Blueprints are starter forms for common use cases, pre-loaded with sample questions. Some blueprints include a pre-configured automation. Available blueprints include Developer Experience Survey, IDP Feedback, Work Management Service Request, Report an Incident, Bug Report, On-Call Escalation, Post-Incident Review, and more.

1. Select {{< ui >}}View Blueprints{{< /ui >}} and browse the available templates.
1. Select a blueprint. The form editor opens with the blueprint's fields and, if included, its automation.
1. To further customize your form, see [Form components][4].
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.


[4]: /actions/forms/components/
{{% /tab %}}

{{% tab "Import" %}}
You can import an existing form from a PDF or JSON file.

1. Select {{< ui >}}Import a form{{< /ui >}}. An import dialog opens.
1. Choose a source and follow the prompts. The form editor opens with the imported fields.
1. To further customize your form, see [Form components][4].
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.


[4]: /actions/forms/components/
{{% /tab %}}

{{% tab "Start from scratch" %}}
1. Select {{< ui >}}Start from scratch{{< /ui >}}. An empty form opens in the form editor.
1. To add a component, click {{< ui >}}Add Component{{< /ui >}}, or in the {{< ui >}}Fields{{< /ui >}} panel, click the plus **+** icon. See [Form components][4] for the full list of component types and their options.
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to make the form available to respondents.

[4]: /actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

To preview or share your form:
1. Click {{< ui >}}Preview{{< /ui >}} to view the form as it appears to respondents.
1. Click {{< ui >}}Share{{< /ui >}} to copy the form link or configure sharing options.

## Customize start and end pages

Forms can include a start page shown before the first question, and an end page shown after a respondent submits the form. Customize the title and message on both pages. By default, forms don't include a start page, and the end page shows a generic completion message.

To add or customize a start or end page:
1. From the [Forms][2] page, click a form to open it in the editor.
1. In the {{< ui >}}Pages{{< /ui >}} panel, click {{< ui >}}Start Page{{< /ui >}} or {{< ui >}}End Page{{< /ui >}}.
1. Edit the title and message.
1. Click {{< ui >}}Publish{{< /ui >}} or {{< ui >}}Publish Changes{{< /ui >}} to apply your changes.

To remove a start page, hover over {{< ui >}}Start Page{{< /ui >}} in the {{< ui >}}Pages{{< /ui >}} panel, click the trash <i class="icon-trash"></i> icon, and confirm.

When a form has a start page or more than one question page, the form's title and description move to a separate card above the form. To split a form's questions across multiple pages, see [Pages][5].

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

For more information on managing responses, see [Form responses][6].

## Share a form

To configure sharing for a form:
1. From the [Forms][2] page, click a form.
1. Click {{< ui >}}Share{{< /ui >}}.

The following sharing options are available:

{{% collapse-content title="Share within Datadog" level="h3" expanded=false %}}
Share the form with users or teams in your Datadog organization.

Add individual users or teams as recipients. Enable {{< ui >}}Notify added teammates{{< /ui >}} to send a notification, and optionally add a custom message. Teams are notified in their configured Slack channel or by email; individual users are notified by email.

Under {{< ui >}}Add to Dashboard{{< /ui >}}, use the dropdown to add the form to an existing dashboard or create a dashboard.

Enable the {{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} toggle to surface the form in the [Self-Service Actions][7] catalog. This is a central place where platform and infrastructure teams publish tools for the rest of the organization to discover and use.
{{% /collapse-content %}}

{{% collapse-content title="Share with external users" level="h3" expanded=false %}}
Share the form with users outside your Datadog organization. You can configure an access expiration date for each sharing option and create multiple sharing configurations with different settings and expiration dates.

The following options are available:

- **Specific individuals**: Add recipients by individual email address. For example, `alice@example.com` and `bob@example.com`.
- **Company domain**: Share with anyone in a specific email domain. For example, `*@yourcompany.com`.
- **Anyone with a link**: Generate a link that anyone can use to access the form after verifying their email address.
{{% /collapse-content %}}

{{% collapse-content title="Share in Slack" level="h3" expanded=false %}}
Post a form to a Slack channel so your team can respond without leaving Slack.

To share a form in Slack:
1. Invite the Datadog app to the Slack channel. For setup steps, see the [Slack integration][8].
1. In the channel, run `/dd` and select {{< ui >}}Share a Form{{< /ui >}}.
1. Search for the form by name, then select it.
1. Click {{< ui >}}Send to Channel{{< /ui >}}.

You can also paste a form link, such as `https://app.datadoghq.com/forms/<FORM_ID>`, in a channel that includes the Datadog app. Datadog unfurls the link into a form card.

Datadog posts a card with the form's title and description. Respondents click {{< ui >}}Fill Out{{< /ui >}} to complete the form in a Slack modal, or {{< ui >}}Open in Datadog{{< /ui >}} to complete it in the browser.

{{< img src="/actions/forms/slack_form_link.png" alt="A form link unfurled in Slack, showing the form title, response type, and the Fill Out and Open in Datadog buttons" style="width:90%;" >}}

**Note**: Sharing a form is not supported in direct messages.

#### Forms that must be completed in Datadog

Not every field can be rendered in a Slack modal. The following are not available in Slack:

- Ranking components
- Dropdowns that use [dynamic options][9]
- [Conditional fields][10]
- Checkbox components with minimum or maximum selection limits

If only optional fields are affected, the form is still fillable in Slack and Datadog warns that `Some fields aren't available in Slack and won't appear in the fill-out modal.` Those fields do not appear in the modal.

If a **required** field is affected, or the form is too large for a Slack modal, the form cannot be completed in Slack. Datadog asks you to confirm with {{< ui >}}Share Anyway{{< /ui >}}, then posts the card with only {{< ui >}}Open in Datadog{{< /ui >}}.

Forms that are no longer accepting responses cannot be shared.
{{% /collapse-content %}}

To pause or remove external sharing, click {{< ui >}}Share{{< /ui >}}, then click {{< ui >}}Edit{{< /ui >}} and select {{< ui >}}Pause Sharing{{< /ui >}} or {{< ui >}}Delete Sharing{{< /ui >}}.

To prefill fields in a shared link so respondents start with some answers filled in, see [Prefill form fields][11].

## Add a form to a dashboard

To add a form to a dashboard from the form editor:
1. From the [Forms][2] page, click a form to open it in the editor.
1. Click the {{< ui >}}Share{{< /ui >}} dropdown and select {{< ui >}}Share within Datadog{{< /ui >}} .
1. Under {{< ui >}}Add to Dashboard{{< /ui >}}, select an existing dashboard or create one, then click {{< ui >}}Add{{< /ui >}}.

You can also add a form to a dashboard directly from the dashboard:
1. Navigate to a [dashboard][12].
1. Click **Add Widgets** to open the side panel.
1. Click the **Apps** tab.
1. Select **Form Widget**.
1. Select your form, then click {{< ui >}}Save{{< /ui >}}.

## Add automation

After creating a form, you can add an [action][13] or [workflow blueprint][14] that triggers automatically when a form is submitted.
1. From the [Forms][2] page, click a form.
1. At the top of the form, select {{< ui >}}Automation{{< /ui >}}.
1. Choose an action or blueprint.
1. The action or blueprint opens in a workflow canvas, where you can [edit it][15].
1. Click {{< ui >}}Create{{< /ui >}}.

**Note**: Automations triggered by forms appear under [Workflow Automation][16].

## Create and manage forms with MCP

Connect an external AI agent to the [Datadog MCP Server][17] to create, update, publish, and read forms and their responses. Enable the `forms` toolset (or `all`) when you [connect to the MCP Server][18]. You can also ask [Bits Chat][19] to build a form from anywhere in Datadog. For a list of available tools, see [Forms][20] in the Datadog MCP Server tools reference.

## Manage access

By default, only the creator of a form can access it. To change the permissions on a form:
1. From the [Forms][2] page, click a form to open it in the editor.
1. In the editor header, click the gear <i class="icon-cog-2"></i> icon.
1. Click {{< ui >}}Manage Permissions{{< /ui >}}. A modal opens with two sections:
   - **Form Access**: Controls who can view and edit the form.
   - **Response Access**: Controls who can view submitted responses. This section is only available after the form receives its first submission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/work_management/
[2]: https://app.datadoghq.com/forms
[3]: /bits_ai/bits_chat/
[4]: /actions/forms/components/
[5]: /actions/forms/components/#pages
[6]: /actions/forms/responses/
[7]: /internal_developer_portal/self_service_actions/
[8]: /integrations/slack/
[9]: /actions/forms/components/#dynamic-dropdown-options
[10]: /actions/forms/components/#conditional-fields
[11]: /actions/forms/guide/prefill/
[12]: /dashboards/
[13]: https://app.datadoghq.com/actions/action-catalog/
[14]: https://app.datadoghq.com/workflow/blueprints
[15]: /actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[16]: https://app.datadoghq.com/workflow
[17]: /mcp_server/
[18]: /mcp_server/setup/#toolsets
[19]: /bits_ai/bits_chat/
[20]: /mcp_server/tools/#forms
