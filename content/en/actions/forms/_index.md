---
title: Forms
description: Build forms to collect input, analyze responses, and trigger automations.
disable_toc: false
---

{{< callout url="LINK GOES HERE" btn_hidden="false" header="Join the Preview!" >}}
Forms are in Preview. Click <b>Request Access</b>, and fill in the Datadog Product Preview Program form.
{{< /callout >}}

## Overview

Datadog Forms allows you to collect input, analyze responses, and trigger automations in Datadog. Forms and their responses can be shared across your organization, allowing you to collect and analyze data with your team. Because you don't need a Datadog account to respond to forms, they can also be shared with customers, internal teams, and other stakeholders. 

## Examples

Here are some ways you can use forms:  
- Create a GitHub repository from a template using a [scaffolding blueprint][3]. 
- Run developer surveys in an internal developer portal (IDP).
- Collect employee feedback about security concerns through a form that creates a case.

## Create a form

To create a new form: 
1. Navigate to the [Forms][1] page.
1. Click **+ New Form**.
1. New forms are auto-populated with a placeholder component. To edit the form, click the placeholder component, or click the **<i class="icon-plus-circled-wui"></i>** icon to add a new component. Component types include single line text, multi-line text, select, checkboxes, and ratings. The following table lists the elements available inside components:
    | Element  | Description    | Component Availability |
    |----------------------------|---------------------------------------------------------------------|-----|
    | Required | Determines whether the question requires an answer from the respondent; required questions are marked with a red asterisk on forms. | All components | 
    | Field name           | The name of the field. Appears in the JSON version in [**Responses**][8]. Not visible to respondents.                                   | All components | 
    | Placeholder         | The text the respondent sees before entering any text.                 | All components except ratings |
    | Default value         | The default item or text that is selected before the respondent makes a selection.                                | All components except ratings | 
    | Data         | The available options that respondents can choose from.                | Select and checkboxes | 
    | Questions             | The questions respondents are asked when rating their experience. | Ratings |  
1. Click **Save** to save your changes. 
1. Click **View** to display the form as it appears to respondents. Click **Edit** to return to the creator view. 
1. Click **Share** to copy the form link to your clipboard.
1. In the **Debug** section:
    1. click **Form** to show a mini-preview of your form.
    1. click **Data Definition** to show the JSON version of the components' definition.
    1. click **UI Definition** to show the JSON version of the form's UI.

### Add automation 

After creating a form, you can add an [action][4] or [blueprint][5] that triggers automatically when a form is submitted. 
1. From the [Forms][1] page, click a form. 
1. Click **Automation**.
1. Choose an action or blueprint. 
1. The action or blueprint opens in a workflow canvas, where you can [edit it][2]. 
1. Click **Create**.

**Note**: Because forms are powered by workflows, automations triggered by forms appear under [Workflow Automation][6]. Additionally, there is no charge associated with workflow executions that are triggered by a form. 

## Manage access

By default, only the creator of a form can access it. To change the permissions on a form: 
1. From the [Forms][1] page, click a form.
1. Click the gear <i class="icon-cog-2"></i> icon. 
1. To change who can see the form and submit answers, click **Edit Form Permissions**.
1. To change who can see the submitted responses, click **Edit Response Permissions**.

## Analyze your data 

### View in forms 

To view form responses in a tablet format: 
1. From the [Forms][1] page, click a form.
1. Click **Responses**.
1. Click the edit icon on a response to view the JSON version. 

**Note**: Responses to forms generate a datastore, which are listed in [Datastores][7].

### View in a dashboard

To visualize form responses in a dashboard:
1. After [creating a dashboard][9], [add a widget][10] for [**Timeseries**][11]. 
1. In **Graph Your Data**, choose **DDSQL Editor**. 
1. Finish [configuring your widget][12] and click **Save**.

[1]: https://app.datadoghq.com/actions/forms
[2]: /actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[3]: https://app.datadoghq.com/workflow/blueprints/scaffold-new-service
[4]: https://app.datadoghq.com/actions/action-catalog/
[5]: https://app.datadoghq.com/app-builder/blueprints
[6]: https://app.datadoghq.com/workflow
[7]: https://app.datadoghq.com/actions/datastores
[8]: /actions/forms/#view-in-forms
[9]: /dashboards/#get-started
[10]: /dashboards/widgets/#add-a-widget-to-your-dashboard
[11]: /dashboards/widgets/timeseries/
[12]: /dashboards/widgets/configuration/

