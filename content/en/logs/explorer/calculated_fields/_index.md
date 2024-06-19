---
title: Calculated Fields
kind: documentation
disable_toc: false
private: true
further_reading:
- link: "/logs/explorer/calculated_fields/expression_language"
  tag: "Documentation"
  text: "Calculated Fields expression language"
---

## Overview

{{< beta-callout url="https://docs.google.com/forms/d/18tDqsB2pg0gC2irdtfIscSsxbDkRfVbEqowLku4Uqvg/viewform?edit_requested=true" >}}
Calculated Fields is in beta. Have feedback or a feature request? <a href= "https://docs.google.com/forms/d/e/1FAIpQLScQLJ1O_plHp0wiqRiGEEhNaO_cY0jsmu35gtEbJh_RBkqzYg/viewform">Let us know</a>.
{{< /beta-callout >}}

Use calculated fields to transform and enrich your log data at query time. You can define [formulas](#formula) to:
- [Manipulate text][1]
- [Perform arithmetic][2]
- [Evaluate conditional logic][3] and [more][4].

After a calculated field is defined, it can be used like any other [log attribute][5] for search, aggregation, visualization, and even defining other calculated fields.

**Notes**:
- You can define up to five calculated fields at a time.
- Calculated fields are temporary and do not persist beyond a given Log Explorer session. If you decide that a calculated field you created may be useful again in the future for yourself or your team, update your [log pipelines][6] to ensure the information is encoded in your logs when they are ingested and processed.

## Adding a calculated field

There are two entry points for creating a calculated field in the Log Explorer: from the **Add** menu and from within a specific log event and attribute.

### From the Add menu

1. Navigate to [Log Explorer][7].
1. Click the **Add** button next to the search bar.
1. Select **Calculated field**.

This is a quick way to create a calculated field when you are already familiar with the structure and content of the logs you are interested in.

### From a specific log event or attribute

1. Navigate to [Log Explorer][7].
1. Click on a log event of interest to open the side panel.
1. Click on a specific JSON attribute to open the context menu.
1. Select **Create calculated from...**.


{{< img src="logs/explorer/calculated_fields/create_field.png" alt="The log panel duration attribute with the option to create a calculated field for it" style="width:100%;" >}}

The option to add a calculated field from a attribute lets you pivot in the midst of an investigation or when exploring unfamiliar logs. For example, you may want to multiply or concatenate two values and store the result in a single field to simplify a graph or answer a specific question.

### Defining a calculated field


{{< img src="logs/explorer/calculated_fields/define_calculated_field.png" alt="A throughput attribute with the formula network.bytes attribute divided by the duration attribute" style="width:50%;" >}}

#### Name

Set a descriptive name that clearly indicates the purpose of the calculated field. For example, if the goal is to capitalize users's first and last names and then concatenate them into one field, you might use the name`formatted_name` for the calculated field. To subsequently filter logs from a user named `Bob Smith`, update your query to include `#formatted_name:"Bob Smith"`.

**Note:** The `#` prefix must be used to refer to calculated fields in searches, aggregation, or other calculated field definitions.

#### Formula

The formula (or expression) determines the result to be computed and stored as the value of the calculated field for each log event. Valid constructs include log attributes, other calculated fields, and a set of supported functions and operators. Relevant fields, functions, and operators are automatically suggested as you begin to write or edit the formula, to help accelerate the process.

See [Calculated Fields Expression Language][4] for the available functions and operators.

#### Using calculated fields

After successful creation of a calculated field, the Log Explorer updates the following:
- Active calculated fields, which are displayed in a new row directly under the search bar.
    - Hover over a field to view its definition, and use quick actions to edit, filter by, or group by the field.
- The field is automatically added as a column in the **[List][8]** visualization (the title includes the `#` prefix).
- Calculated fields are displayed in a separate section inside the log side panel.

Calculated fields can be used for search, aggregation, visualization, and definition of other calculated fields and work in the same way as log attributes. Make sure to use the `#` prefix to reference calculated field names.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="A calculated field attribute called request_duration" style="width:100%;" >}}

#### Persistence

Calculated fields are not a replacement for log pipelines and processors for ingest-time parsing, normalization, and enrichment of logs. Use calculated fields in the following scenarios:

- You need to perform a unique one-off investigation or ad-hoc analysis, creating a temporary need for a field that you don't need to reuse in the long-tem.
- You need to retroactively update indexed logs to answer a certain question (pipelines changes only apply to logs ingested after a pipeline update).
- You lack the permission (or knowledge) to modify log pipelines in a timely manner.
  - The calculated fields you create are only visible to you, which makes them ideal for quick exploration and worry-free experimentation.

If you realize that a calculated field you are using may be valuable in the long-term, update your log pipelines so you and the rest of your team can benefit from automated processing.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/calculated_fields/expression_language/#string
[2]: /logs/explorer/calculated_fields/expression_language/#arithmetic
[3]: /logs/explorer/calculated_fields/expression_language/#logical
[4]: /logs/explorer/calculated_fields/expression_language/
[5]: /logs/log_configuration/attributes_naming_convention/
[6]: /logs/log_configuration/pipelines/?tab=source
[7]: https://app.datadoghq.com/logs
[8]: /logs/explorer/visualize/#lists
