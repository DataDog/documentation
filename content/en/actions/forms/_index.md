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
- Collect engineering feedback in an internal developer portal (IDP).
- Create service requests for security, platform, or IT teams directly from employee form responses.

## Create a form

When creating a form, you can use a blueprint or start from scratch. Blueprints are starter forms that cover common use cases. They come loaded with a sample description and questions to help familiarize yourself with form elements, and some blueprints include a pre-configured automation. Blueprints include Developer Experience Survey, IDP Feedback, Case Management Service Request, Report an Incident, Bug Report, On-Call Escalation, Post-Incident Review, and more.

To create a form:
1. On the [Forms][1] page, click {{< ui >}}New Form{{< /ui >}}.
1. Select a blueprint or start with a blank form, then click {{< ui >}}Continue{{< /ui >}}.
1. Optionally, name your form and give it a description. Click {{< ui >}}Continue{{< /ui >}}.
1. To add a new component, click **Add Component**, or on the Fields side panel, click the **+** icon. See [Form components][2] for the full list of component types and their options.
1. Click {{< ui >}}Save{{< /ui >}}.

To preview, share, and debug your form:
1. Click {{< ui >}}View{{< /ui >}} to display the form as it appears to respondents. Click {{< ui >}}Edit{{< /ui >}} to return to the creator view.
1. Click {{< ui >}}Share{{< /ui >}} to copy the form link or configure sharing options.
1. In the {{< ui >}}Debug{{< /ui >}} section, you can:
    - Click {{< ui >}}Form{{< /ui >}} to show a mini-preview of your form.
    - Click {{< ui >}}Data Definition{{< /ui >}} to show the JSON version of the components' definition.
    - Click {{< ui >}}UI Definition{{< /ui >}} to show the JSON version of the form's UI.

## Import a form

You can import an existing form into Datadog from a JSON file or migrate directly from Google Forms.

To import a form:
1. On the [Forms][1] page, click {{< ui >}}New Form{{< /ui >}}.
1. Click {{< ui >}}Import a Form{{< /ui >}}.
1. Choose a source to import your form fields, then follow the prompts.

## Form settings

From the [Forms][1] page, click a form. In the {{< ui >}}Fields{{< /ui >}} panel, click the gear <i class="icon-cog-2"></i> icon to access the following settings:

| Setting | Description |
|---------|-------------|
| Accepting Responses | Toggle to set the form as active or inactive. When inactive, the form does not accept new responses. |
| Anonymous Responses | When enabled, respondent emails are not stored. |
| Manage Permissions | Configure who can view the form and submitted responses. See [Manage access](#manage-access). |
| Edit Theme | Change the form's color theme. |
| Clone Form | Create a copy of the form. |
| Export Form | Download the form as a JSON file. |

For more information on managing responses, see [Form responses][3].

## Share a form

To configure sharing for a form:
1. From the [Forms][1] page, click a form.
1. Click {{< ui >}}Share{{< /ui >}}.

The following sharing options are available:

{{< collapse-content title="Share within Datadog" level="h4" >}}
Share the form with users in your Datadog organization. To also surface the form in the [Self-Service Actions][9] catalog, enable the **Self-Service Action** toggle.
{{< /collapse-content >}}

{{< collapse-content title="Share with external users" level="h4" >}}
Share the form with users outside your Datadog organization. You can configure an access expiration date for each sharing option, and create multiple sharing configurations with different settings and expiration dates.

The following options are available:

- **Specific individuals**: Add recipients by individual email address. For example, `alice@example.com` and `bob@example.com`.
- **Company domain**: Share with anyone in a specific email domain. For example, `*@yourcompany.com`.
- **Shareable link**: Generate a link that anyone can use to access the form without a Datadog account.
{{< /collapse-content >}}

To pause or remove external sharing, click {{< ui >}}Share{{< /ui >}}, then click {{< ui >}}Edit{{< /ui >}} and select {{< ui >}}Pause Sharing{{< /ui >}} or {{< ui >}}Delete Sharing{{< /ui >}}.

## Add a form to a dashboard

To embed a form directly in a dashboard as a widget:
1. Navigate to a [dashboard][8].
1. Click **Add Widgets** to open the side panel.
1. Click the **Apps** tab.
1. Select **Form Widget**.
1. Select your form, then click {{< ui >}}Save{{< /ui >}}.

## Add automation

After creating a form, you can add an [action][4] or [workflow blueprint][5] that triggers automatically when a form is submitted.
1. From the [Forms][1] page, click a form.
1. At the top of the form, select {{< ui >}}Automation{{< /ui >}}.
1. Choose an action or blueprint.
1. The action or blueprint opens in a workflow canvas, where you can [edit it][6].
1. Click {{< ui >}}Create{{< /ui >}}.

**Note**: Automations triggered by forms appear under [Workflow Automation][7]. There is no charge for workflow executions triggered by a form.

## Manage access

By default, only the creator of a form can access it. To change the permissions on a form:
1. From the [Forms][1] page, click a form.
1. In the {{< ui >}}Fields{{< /ui >}} panel, click the gear <i class="icon-cog-2"></i> icon.
1. To change who can see the form and submit answers, click {{< ui >}}Edit Form Permissions{{< /ui >}}.
1. To change who can see the submitted responses, click {{< ui >}}Edit Response Permissions{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/forms
[2]: /actions/forms/components/
[3]: /actions/forms/responses/
[4]: https://app.datadoghq.com/actions/action-catalog/
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[7]: https://app.datadoghq.com/workflow
[8]: /dashboards/
[9]: https://app.datadoghq.com/software/self-service
