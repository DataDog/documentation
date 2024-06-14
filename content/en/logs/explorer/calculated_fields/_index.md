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

Use calculated fields to transform and enrich your log events at query time during a search or investigation. You can, directly within the Log Explorer, manipulate text, perform arithmetic operations, and evaluate conditional logic on log data and store the result as a calculated field.

Like other log [attributes][2], you can use calculated fields for search, aggregation, visualization, and defining other calculated fields.

**Notes**:
- You can define up to five calculated fields at a time.
- Calculated fields are temporary and do not persist beyond a given Log Explorer session. If you decide that a calculated field you created may be useful again in the future for yourself or your team, update your [log pipelines][4] to ensure the information is encoded in your logs when they are ingested and processed.

## Adding a calculated field

There are two entry points for creating a calculated field in the Log Explorer: from the **Add** menu and from within a specific log event and attribute.

### From the Add menu

1. Navigate to [Log Explorer][1].
1. Click the **Add** button next to the search bar.
1. Select **Calculated field**.

This is a quick way to create a calculated field when you are already familiar with the structure and content of the logs you are interested in.

## From a specific log event or attribute

1. Navigate to [Log Explorer][1].
1. Click on a log event of interest to open the side panel.
1. Click on a specific JSON attribute to open the context menu.
1. Select **Create calculated from...**.

[IMAGE]

The option to add a calculated field from a attribute lets you pivot in the midst of an investigation or when exploring unfamiliar logs. For example, you may want to multiply or concatenate two values and store the result in a single field to simplify a graph or answer a specific question.

### Defining a calculated field

[IMAGE]

#### Name

Set a descriptive name that clearly indicates the purpose or intent of the calculated field. For example, if the goal is to capitalize users's first and last names and then concatenate them into one field, you might use the name`formatted_name`. To subsequently, filter logs from a user named `Bob Smith`, update your query to include `#formatted_name:"Bob Smith"`.

**Note:** The `#` prefix must be used to refer to calculated fields in searches, aggregation, or other calculated field definitions.

#### Formula

The formula (or expression) determines the result to be computed and stored as the value of the calculated field for each log event. Valid constructs include log attributes, other calculated fields, and a set of supported functions and operators. Relevant fields, functions, and operators are automatically suggested as you begin to write or edit the formula, to help accelerate the process.

See [Calculated Fields Expression Language][5] for the available functions and operators.

#### Using calculated fields

After successful creation of a new calculated field, the Log Explorer updates the following:
- Active calculated fields, which are displayed in a new row directly under the search bar.
    - Hover over a field to view its definition, and use quick actions to edit, filter by, or group by the field.
- The field is automatically added as a column in the **List** visualization (the title includes the `#` prefix).
- Calculated fields are displayed in a separate section inside the log side panel.

Calculated fields can be used for search, aggregation, visualization, and definition of other calculated fields and works in the same way as log attributes. Make sure to use the `#` prefix to reference calculated field names.

[Image]

#### When to use calculated fields

Calculated fields are not a replacement for log pipelines and processors for ingest-time parsing, normalization, and enrichment of logs. Calculated fields as a complementary tool that is useful for certain scenarios, such as when you:

- Perform a unique one-off investigation or ad-hoc analysis, and certain information is only relevant in the current context.
- Need to retroactively update the schema of indexed logs to answer a specific question, since pipelines changes only apply to logs ingested after a pipeline update.
- Do not have permission (or the knowledge) to modify relevant log pipelines. Calculated fields are available to all users and carry no risk of long-term or organization-wide side effects, providing quick exploration and worry-free experimentation.

If you realize that a calculated field you are using may be valuable in the long-term, update your log pipelines so your whole team benefits from it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/log_configuration/attributes_naming_convention/
[3]: /logs/explorer/search_syntax/
[4]: /logs/log_configuration/pipelines/?tab=source
[5]: /logs/explorer/calculated_fields/expression_language/