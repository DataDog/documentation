---
title: Calculated Fields
disable_toc: false
further_reading:
- link: "/logs/explorer/calculated_fields/expression_language"
  tag: "Documentation"
  text: "Calculated Fields expression language"
- link: "/logs/explorer/calculated_fields/extraction"
  tag: "Documentation"
  text: "Extraction Grok Parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
- link: "https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/"
  tag: "Blog"
  text: "Transform and enrich your logs at query time with Calculated Fields"
---


<div class="alert alert-info">For syntax, operators, and functions, see <a href="/logs/explorer/calculated_fields/expression_language">Expression Language</a></div>

## Overview

Calculated Fields lets you transform and enrich your log data at **query time**. It is defined directly in the Log Explorer and is available only for the duration of your session. Once created, a calculated field behaves like any other [log attribute][1] and can be used for search, aggregation, visualization, or even defining additional calculated fields.

There are two types of calculated fields: **Extraction** and **Formula**. Both share the following properties:

- They are **temporary** and do not persist beyond your Log Explorer session.
- They are **user-scoped** and visible only to you.
- They are ideal for **retroactive analysis**, since they can be applied to already indexed logs.
- They must be referenced with the `#` prefix when used in queries, aggregations, or other calculated fields.
- You can define up to **five** calculated fields at a time.

## When to use calculated fields

Calculated fields are not a replacement for log pipelines and processors, which handle ingest-time parsing, normalization, and enrichment of logs. Instead, use calculated fields in the following scenarios:

- When you need to perform a short-term investigation or analysis that requires a field that you don't need to keep in the long-term.
- When you need to retroactively analyze indexed logs (pipelines changes only affect logs ingested after the update).
- When you don't have the permission or expertise to modify log pipelines quickly.
- When you want a calculated field visible only to you, useful for quick exploration and low-risk experimentation.

If you find that a calculated field is valuable in the long-term, update your [log pipelines][2] so the entireyour team benefits from automated processing.

## Types of calculated fields

### Formula

Formula fields use the calculated fields expression language to compute new values from existing attributes. You can:
- Manipulate text values.
- Perform arithmetic on numeric attributes.
- Evaluate conditional logic.

For example:
```
#latency_gap = @client_latency - @server_latency
```

For a complete list of supported syntax, operators, and functions, see the [Expression Language Reference][3].

### Extraction

Extraction uses Grok parsing rules to capture values from raw log messages or attributes. You can use Grok rules to:
- Capture values from raw log messages.
- Retroactively extract attributes from already indexed logs without editing pipelines.
- Test against sample logs

For example, you can extract the first three words of a message into separate fields:
```
%{WORD:first} %{WORD:second} %{WORD:third}
```

Extraction rules are evaluated globally across all logs in your session. For more details and syntax example, see the [Extraction Grok Parsing reference][4].

## Create a calculated field

You can create a calculated field from two entry points in the Log Explorer: from the **Add** menu or from within a specific log event or attribute.

### From the Add menu

1. Navigate to the [Log Explorer][5].
1. Click the **Add** button next to the search bar.
1. Select **Calculated field**.

This is useful when you are already familiar with the structure and content of the logs and want to quickly define formula or parsing rule.

### From a specific log event or attribute

1. Navigate to the [Log Explorer][5].
1. Click on a log event to open the side panel.
1. Select a JSON attribute to open the context menu.
1. Choose **Create calculated from...**.

{{< img src="/logs/explorer/calculated_fields/add_calculated_field_side_panel.png" alt="Creating a calculated field from the log side panel in the Log Explorer" style="width:70%;" >}}

This approach is useful for extractions, since it provides a concrete log sample for building a parsing rule.

## Using calculated fields

After you create a calculated field, the Log Explorer updates instantly to show you the new data and give you tools to interact with it.
- **Header row**: A new row appears under the search bar, showing all active calculated fields. Hover to view the full definition, or use quick actions to edit, filter by, or group by the field.
- **List visualization**: In [List][6] view, a column for the calculated field is automatically added.
- **Log side panel**: Calculated fields are grouped into a dedicated section when you inspect a log.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="A calculated field called request_duration used to filter results in the Log Explorer" style="width:100%;" >}}

### Key usage rules

Calculated fields function like log attributes and can be used for search, aggregation, visualization, or defining other calculated fields. Always use the `#` prefix when referencing a calculated field.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/attributes_naming_convention/
[2]: /logs/log_configuration/pipelines/?tab=source
[3]: /logs/explorer/calculated_fields/expression_language/
[4]: /logs/explorer/calculated_fields/extraction
[5]: https://app.datadoghq.com/logs
[6]: /logs/explorer/visualize/#lists
