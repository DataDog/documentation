---
title: Property Fields
---

## Overview

Custom property fields enable you to capture important attributes unique to your organization, such as specific product models in the automotive industry or unique codes in a software deployment. These attributes help you efficiently categorize incidents.

## Incident details page

Property fields are organized into three tables that correspond to where the fields appear in the [Overview tab][1] of the Incident Details page:

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

You can move any property field into a different table or reorder them in the same table by dragging and dropping the field using the drag handle icon.

## Default Fields

{{< img src="/service_management/incidents/incident_settings/settings_property_fields.png" alt="Property Field Settings" style="width:100%;">}}

Property fields are key pieces of metadata you can attach to your incidents. This makes it easier to search for specific subsets of incidents on the [Homepage][2] and make more robust queries in [Incident Management Analytics][3]. There are five default fields:

| Fields                   | Description |
| ----------------------   | ----------- | 
|**Detection&nbsp;Method** | Add context on how this incident was declared.||
|**Summary**               | Provide details on what happened to cause this incident.||
|**Root&nbsp;Cause**       | List possible root causes or areas for investigation.||
|**Services**              | If you have [Datadog APM][4] configured, the `Services` property field automatically uses your APM Service names. To edit the values of `Services`, upload a CSV of the values you wish to associate with each field. Your CSV file must start with your field's name in the top row, with the desired values listed immediately below it. | 
|**Teams**                 | The `Teams` property field automatically populates from the [teams][5] defined in your organization. | 

### Custom Fields

You can add a custom incident field of any of the following types.

**Metric Tag**
: A dropdown that accepts multiple values. Incident responders are prompted to select values from the distinct tag values of the selected metric tag.

**Single-Select**
: A dropdown that accepts one value. You set the available values when defining the field.

**Multi-Select**
: A dropdown that accepts multiple values. You set the available values when defining the field.

**Text Array**
: A free-form field that accepts multiple values. Incident responders set arbitrary values when setting the field on an incident.

**Text Area**
: A free-form text box that accepts a single value. Incident responders set arbitrary value when setting the field on an incident.

**Number**
: A text area that accepts any integer or decimal number.

### Required at Declaration

If you mark a field as "Required at Declaration," users will be required to enter a value for it when declaring incidents.

This option does not affect Workflow Automations or API requests.

### Prompt User

When responders move an incident to a new State, Incident Management can be configured to prompt them to set certain fields at different points in the incident lifecycle. To set this behavior for a particular field, edit the field's "Prompt user" option.

**During declaration**: Users are prompted to enter a value for the field when declaring incidents and at all state changes if the field is empty.

**When the incident is moved to Stable/Resolved/Completed**: Users are prompted to enter a value for the field when moving the incident to the selected state and any later state. For example, if "When the incident is moved to Stable" is selected, users will be prompted with the field when the incident is moved to Stable, Resolved, or Completed, as long as the field remains empty.

### Custom Fields in Search and Analytics

Single-Select, Multi-Select, Text Array, and Number fields are searchable facets in the [Incident Homepage][2] and [Incident Management Analytics][3].

In Incident Management Analytics, number fields appear as measures that can be graphed and visualized in [Dashboards][7] and [Notebooks][8].

[1]: /service_management/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /service_management/incident_management/analytics
[4]: /tracing/
[5]: /account_management/teams/
[6]: /getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /dashboards/
[8]: /notebooks/
