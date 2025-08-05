---
title: Property Fields
---

## Overview

Custom property fields enable you to capture important attributes unique to your organization, such as specific product models in the automotive industry or unique codes in a software deployment. These attributes help you efficiently categorize incidents.

You can use custom fields to filter for specific subsets of incidents on the [Homepage][2] and in [Incident Management Analytics][3]. You can also build conditions around custom fields in [incident notification rules][9].

## Field Sections

Property fields are organized into three tables that correspond to where the fields appear in the [Overview tab][1] of the Incident Details page:

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

You can move any property field into a different table or reorder them in the same table by dragging and dropping the field using the drag handle icon.

## Default Fields

{{< img src="/service_management/incidents/incident_settings/settings_property_fields.png" alt="Property Field Settings" style="width:100%;">}}

There are five default fields:

| Fields                   | Description |
| ----------------------   | ----------- |
|**Detection&nbsp;Method** | Add context on how this incident was declared.||
|**Summary**               | Provide details on what happened to cause this incident.||
|**Root&nbsp;Cause**       | List possible root causes or areas for investigation.||
|**Services**              | If you have [Datadog APM][4] configured, the `Services` property field automatically uses your APM Service names. To add values to `Services`, you can upload a CSV. |
|**Teams**                 | The `Teams` property field automatically populates from the [teams][5] defined in your organization. |

You cannot delete default fields.

### Field Types

You can define new fields of any of the following field types.

**Single-Select**
: A dropdown that accepts one value. You set the available values when defining the field.

**Multi-Select**
: A dropdown that accepts multiple values. You set the available values when defining the field.

**Text Array**
: A free-form field that accepts multiple values. Incident responders set arbitrary values when setting the field on an incident.

**Text Area**
: A free-form text box that accepts a single value. Incident responders set arbitrary values when setting the field on an incident.

**Metric Tag**
: A dropdown that accepts multiple values. Incident responders are prompted to select any ingested values of the metric tag you select when defining the field.

**Number**
: Accepts any integer or decimal number.

**Datetime**
: Accepts any datetime. Values are stored in UTC and are parsed and formatted using the user's local timezone.

### Required at Declaration

If you mark a field as "Required at Declaration," users will be required to enter a value when declaring incidents.

This option does not affect Datadog Workflow automations or API requests.

### Prompt User

Incident Management can be configured to prompt responders to set particular fields when changing the incident's state. To set this behavior for a field, edit the field's "Prompt user" option.

**During declaration**: Users are prompted to enter a value for the field during declaration and at all state changes if the field is empty.

**When the incident is moved to Stable/Resolved/Completed**: Users are prompted to enter a value for the field when moving the incident to the selected state and any later state. For example, if you select "When the incident is moved to Stable," users are prompted to fill out the field when moving incidents to Stable, Resolved, or Completed, as long as the field remains empty.

### Custom Fields in Search and Analytics

Single-Select, Multi-Select, Text Array, Number, and Datetime fields are searchable facets in the [Incident Homepage][2] and [Incident Management Analytics][3].

In Incident Management Analytics, number fields appear as measures that can be graphed and visualized in [Dashboards][7] and [Notebooks][8].

[1]: /service_management/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /service_management/incident_management/analytics
[4]: /tracing/
[5]: /account_management/teams/
[6]: /getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /dashboards/
[8]: /notebooks/
[9]: /service_management/incident_management/incident_settings/notification_rules