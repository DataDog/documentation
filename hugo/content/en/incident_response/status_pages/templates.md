---
title: Notice Templates
description: Save reusable notice titles, messages, and impacted components to publish status page notices faster.
further_reading:
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Datadog Status Pages"
---

Templates let you save pre-configured language for degradation notices and maintenance windows that you publish repeatedly, such as a recurring maintenance activity or a known type of service disruption. When you publish a notice, select a template to pre-fill the notice title, per-status messages, and affected components instead of typing them each time.

## Create a template

1. From your status page, click **Settings** and select the **Templates** tab.
1. In the **Degradation Templates** or **Maintenance Templates** section, click **Add Template**.
1. Provide the following details:

   | Field | Description |
   | ---- | ---- |
   | **Template name** | Internal name used to identify the template when selecting it. Not shown on the published status page. |
   | **Notice Title** | Default title pre-filled when the template is used. |
   | **Messages** | A message for each notice status. Degradation templates support **Investigating**, **Identified**, **Monitoring**, and **Resolved**. Maintenance templates support **Scheduled**, **In Progress**, and **Completed**. |
   | **Components** | Components to pre-select when the template is used. For degradation templates, you can also set an initial status for each component. |

1. Click **Save**.

{{< img src="incident_response/status_pages/create_degradation_template.png" alt="Create a degradation template with a title, per-status messages using template variables, and impacted components" style="width:100%;" >}}

## Insert template variables

Insert a variable into a template message to have Datadog resolve it when the template is applied to a notice. Depending on the variable, Datadog either fills the value automatically or prompts the publisher to provide one. The **Message Variables** panel next to the message fields lists the available variables:

| Variable | Description |
| ---- | ---- |
| `{{date}}` | Prompts the publisher to select a date and time when the template is applied. |
| `{{components_impacted}}` | Automatically fills in the list of components selected on the notice. |

To insert a variable, type `{{` in a message field and select a variable from the list, or click a variable in the **Message Variables** panel to insert it at the cursor.

## Apply a template to a notice

From the **Publish Notice** modal, select a template from the **Template** dropdown to pre-fill the notice with its title, messages, and components.

Applying a template pre-fills the notice's fields, which remain editable. To discard your edits and restore the original template content, click **Reset Values**.

{{< img src="incident_response/status_pages/apply_template_to_notice.png" alt="Publish Notice modal with a template applied, pre-filling the notice title, message, and impacted components" style="width:60%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
