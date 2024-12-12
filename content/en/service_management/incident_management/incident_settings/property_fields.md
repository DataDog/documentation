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

You can move any property field into a different table or reorder them in the same table by dragging and dropping the field using the drag handle icon. Preview what your property fields look like by clicking the **Preview** button on the top right.

## Fields

{{< img src="/service_management/incidents/incident_settings/settings_property_fields.png" alt="Property Field Settings" style="width:100%;">}}

Property fields are key pieces of metadata you can tag your incidents with. This makes it easier to search for specific subsets of incidents on the [Homepage][2] and make more robust queries in [Incident Management Analytics][3]. There are five default fields:

| Fields                   | Description |
| ----------------------   | ----------- | 
|**Detection&nbsp;Method** | Add context on how this incident was declared.||
|**Summary**               | Provide details on what happened to cause this incident.||
|**Root&nbsp;Cause**       | List possible root causes or areas for investigation.||
|**Services**              | If you have [Datadog APM][4] configured, the `Services` property field automatically uses your APM Service names. To edit the values of `Services`, upload a CSV of the values you wish to associate with each field. Your CSV file must start with your field's name in the top row, with the desired values listed immediately below it. | 
|**Teams**                 | The `Teams` property field automatically populates from the [teams][5] defined in your organization. | 

You can add more property fields to your settings by selecting one of your existing `key:value` pair [metric tags][6]. When you do this, the key of your property field is the start case of your metric tag's key (for example, the tag `scope_name` becomes field `Scope Name`) and the values for the property field are equal to the values reported by the metric tag.

### Field types

In addition to the five default fields and the fields based on metric tags, you can also create custom property fields and mark them as required at the creation of an incident. There are four kinds of custom fields you can create:

**Single-Select**
: A dropdown field that can only have one value assigned at a time per incident. Values can be predefined in-line from the UI or by uploading values through a CSV file.

**Multi-Select**
: A dropdown field that can have multiple values assigned per incident. Values can be predefined in-line from the UI or by uploading values through a CSV file.

**Text Area**
: A free-form text box. Values are entered by a responder on a per-incident basis.

**Number**
: A text area that only accepts digits and a single period as input. Values are entered by a responder on a per-incident basis.

Single-Select, Multi-Select, and Number custom fields are searchable facets in the [Incident Homepage][2] and [Incident Management Analytics][3] for easy filtering of incidents. Number fields are measures in Incident Management Analytics that can be graphed and visualized in [Dashboards][7] and [Notebooks][8].

[1]: /service_management/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /service_management/incident_management/analytics
[4]: /tracing/
[5]: /account_management/teams/
[6]: /getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /dashboards/
[8]: /notebooks/
