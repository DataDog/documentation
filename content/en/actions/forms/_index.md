---
title: Forms
description: Build forms to collect input, analyze responses, and trigger automations.
disable_toc: false

further_reading:
  - link: https://www.datadoghq.com/blog/datadog-forms
    tag: Blog
    text: Turn feedback into action across your engineering org with Datadog Forms

---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSe_OxTl8E_djqF107dKJDhcUuLxh1n9ytEKT6CZa-u8ZPqokg/viewform" btn_hidden="false" header="Join the Preview!" >}}
Forms are in Preview. Click {{< ui >}}Request Access{{< /ui >}}, and fill in the Datadog Product Preview Program form.
{{< /callout >}}

## Overview

Datadog Forms allow you to collect input, analyze responses, and trigger automations in Datadog. Forms and their responses can be shared across your organization, allowing you to collect and analyze data with your team.

## Examples

Here are some ways you can use forms:  
- Scaffold services from predefined templates.
- Collect engineering feedback in an internal developer portal (IDP).
- Create service requests for security, platform, or IT teams, directly from employee form responses. 

## Create a form

When creating a form, you can use a template or start from scratch. Templates are starter forms that cover common use cases. They come loaded with a sample description and questions to help familiarize yourself with form elements. Templates also showcase best practices for setting up form elements. 

{{< img src="/actions/forms/forms-blueprint-selected.png" alt="The form creation page with the IDP Feedback Survey selected" style="width:100%;" >}}

To create a form: 
1. On the [Forms][1] page, click {{< ui >}}New Form{{< /ui >}}.
1. Select a template or {{< ui >}}Start with a blank form{{< /ui >}}, then click {{< ui >}}Continue{{< /ui >}}.
1. Optionally, name your form and give it a description. Click {{< ui >}}Continue{{< /ui >}}.
1. New forms are auto-populated with placeholder components. To edit the form, click a placeholder component, or click the **<i class="icon-plus-circled-wui"></i>** icon to add a new component. Component types include short answer, paragraph, dropdown, checkboxes, ratings, and toggle. The following table lists the elements available inside components:
    | Element  | Description    | Component Availability |
    |----------------------------|---------------------------------------------------------------------|-----|
    | {{< ui >}}Required{{< /ui >}} | Determines whether the question requires an answer from the respondent; required questions are marked with a red asterisk on forms. | All components | 
    | {{< ui >}}Field name{{< /ui >}}           | The name of the field. Appears in the JSON version in [**Responses**][8]. Not visible to respondents.                                   | All components | 
    | {{< ui >}}Placeholder{{< /ui >}}         | The text the respondent sees before entering any text.                 | Short answer, paragraph, and dropdown |
    | {{< ui >}}Default value{{< /ui >}}         | The default item or text that is selected before the respondent makes a selection.                                | All components except ratings and checkboxes | 
    | {{< ui >}}Data{{< /ui >}}         | The available options that respondents can choose from.                | Dropdown and checkboxes | 
    | {{< ui >}}Questions{{< /ui >}}             | The questions respondents are asked when rating their experience. | Ratings |  
1. Click {{< ui >}}Save{{< /ui >}} to save your changes. 

To preview, share, and debug your form:
1. Click {{< ui >}}View{{< /ui >}} to display the form as it appears to respondents. Click {{< ui >}}Edit{{< /ui >}} to return to the creator view. 
1. Click {{< ui >}}Share{{< /ui >}} to copy the form link.
1. In the {{< ui >}}Debug{{< /ui >}} section, you can:
    - Click {{< ui >}}Form{{< /ui >}} to show a mini-preview of your form.
    - Click {{< ui >}}Data Definition{{< /ui >}} to show the JSON version of the components' definition.
    - Click {{< ui >}}UI Definition{{< /ui >}} to show the JSON version of the form's UI.

### Add automation 

After creating a form, you can add an [action][4] or [workflow blueprint][5] that triggers automatically when a form is submitted. 
1. From the [Forms][1] page, click a form. 
1. Click {{< ui >}}Automation{{< /ui >}}.
1. Choose an action or blueprint. 
1. The action or blueprint opens in a workflow canvas, where you can [edit it][2]. 
1. Click {{< ui >}}Create{{< /ui >}}.

**Note**: Because forms are powered by workflows, automations triggered by forms appear under [Workflow Automation][6]. Additionally, there is no charge associated with workflow executions that are triggered by a form. 

## Manage access

By default, only the creator of a form can access it. To change the permissions on a form: 
1. From the [Forms][1] page, click a form.
1. Click the gear <i class="icon-cog-2"></i> icon. 
1. To change who can see the form and submit answers, click {{< ui >}}Edit Form Permissions{{< /ui >}}.
1. To change who can see the submitted responses, click {{< ui >}}Edit Response Permissions{{< /ui >}}.

## Analyze your data 

### View in forms 

To view form responses in a table format: 
1. From the [Forms][1] page, click a form.
1. Click {{< ui >}}Responses{{< /ui >}}.
1. Click the edit icon on a response to view the JSON version. 

**Note**: Datadog stores responses in a datastore, which is listed in [Datastores][7].

### View in a dashboard

To visualize form responses in a dashboard:
1. Navigate to the [DDSQL Editor][13].
1. In the {{< ui >}}Data{{< /ui >}} tab, click {{< ui >}}Actions Datastores{{< /ui >}}.
1. Select the datastore associated with your form, then click {{< ui >}}Insert into editor{{< /ui >}}.
1. Optionally, click the query's title to rename it. 
1. Click {{< ui >}}Save{{< /ui >}}.
1. [Create a dashboard][9], then [add a widget][14]. For forms, all widgets except Timeseries are supported.
1. When [defining the metric][15], select {{< ui >}}DDSQL Editor{{< /ui >}} and the datastore query you created earlier.
1. Finish [configuring your widget][12], then click {{< ui >}}Save{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/forms
[2]: /actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[3]: https://app.datadoghq.com/workflow/blueprints/scaffold-new-service
[4]: https://app.datadoghq.com/actions/action-catalog/
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: https://app.datadoghq.com/workflow
[7]: https://app.datadoghq.com/actions/datastores
[8]: /actions/forms/#view-in-forms
[9]: /dashboards/#get-started
[10]: /dashboards/widgets/#add-a-widget-to-your-dashboard
[12]: /dashboards/widgets/configuration/
[13]: https://app.datadoghq.com/ddsql/editor
[14]: /dashboards/widgets/#add-a-widget-to-your-dashboard
[15]: /dashboards/querying/#define-the-metric