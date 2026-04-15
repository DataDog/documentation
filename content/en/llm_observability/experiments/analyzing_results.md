---
title: Analyze Your Experiments Results
description: How to analyze LLM Observability Experiments results.
---

This page describes how to analyze LLM Observability Experiments results in Datadog's Experiments UI and widgets.

After running an Experiment, you can analyze the results to understand performance patterns and investigate problematic records. 

## Using the Experiment page in Datadog

On the Experiments page, click on an experiment to see its details. 

The **Summary** section contains the evaluations, summary evaluations, and metrics that were logged during the execution of your Experiment.

Each value is aggregated based on its type: 
- **Boolean**: Aggregated as the ratio of `True` over all the values recorded.
- **Score**: Aggregated as average over all values recorded.
- **Categorical**: Aggregated as the mode (most frequent value in the distribution).

The **Records** section contains traces related to the execution of your task on the dataset inputs. Each trace contains the list of spans showing the flow of information through your agent. 

You can use the facets (on the left-hand side) to filter the records based on their evaluation results to uncover patterns.

### Customizing the results table

You can customize the experiment results table to surface the fields that matter most to you without opening each trace individually.

#### Column picker

Use the column picker to toggle columns on or off and drag to reorder them. By default, raw JSON blob columns (Input, Output, Expected Output) are hidden to keep the table scannable. You can toggle them back on at any time.

The table includes a **Record ID** column that shows which dataset record each experiment run was executed against. For experiments with multiple runs per record, expand a record to see all runs underneath.

#### Custom columns

Extract specific fields from your top-level experiment span, such as an input key, output key, or metadata key, and display them as dedicated table columns. This lets you compare key properties across records at a glance.

To add a custom column, type a field path in the **Add Column** input at the top of the table:

| Source          | Path format                    | Example                          |
| --------------- | ------------------------------ | -------------------------------- |
| Input           | `@meta.input.<key>`           | `@meta.input.user_query`        |
| Output          | `@meta.output.<key>`          | `@meta.output.result.status`    |
| Expected output | `@meta.expected_output.<key>` | `@meta.expected_output.answer`  |
| Metadata        | `@meta.metadata.<key>`        | `@meta.metadata.scenario_type`  |
| Tag             | `<tag_key>`                    | `env`                            |

You can add multiple custom columns and reorder them with drag-and-drop. Column configuration is saved to your browser's local storage per project.

#### Quick actions from the span detail

When viewing the root span in the span detail side panel, you can act on fields directly from the context menu instead of manually typing paths.

The following options are available on JSON fields (Input, Output, Expected Output, Metadata):

- **Copy key path**: Copies the field's full path (for example, `@meta.input.user_query`) so you can paste it into the custom column input, search bar, or a dashboard widget query.
- **Add column**: Adds the field as a custom column in the results table in one click.
- **Filter by / Exclude**: Adds the field's key-value pair to the search query to narrow down or exclude matching records. Available on leaf values (strings, numbers, booleans) only.

**On tags**:

- **Copy key**: Copies the tag key (for example, `env`).
- **Copy to clipboard**: Copies the full tag including its value (for example, `env:prod`).
- **Add column**: Adds the tag key as a custom column in the results table.
- **Filter by / Exclude**: Adds the tag's key-value pair to the search query.

<div class="alert alert-info">These actions are available on the root span of a trace.</div>

### Searching for specific records

You can use the search bar to find specific records, based on their properties (dataset records data) or on the result of the experiment (output and evaluations). The search is executed at trace level.

{{< img src="llm_observability/experiments/exp_details_search.png" alt="LLM Observability, Experiment Details focus. Heading: 'Highlighting the search bar'." style="width:100%;" >}}

<div class="alert alert-info">To have access to the most data, update to <code>ddtrace-py >= 4.1.0</code>, as this version brings the following changes: 

<ul>
<li>Experiments spans contain metadata from the dataset record. </li>
<li>Experiments spans' <code>input</code>, <code>output</code>, and <code>expected_output</code> fields are stored as-is (that is, as queryable JSON if they are emitted as such) </li>
<li>Experiments spans and children spans are tagged with <code>dataset_name</code>, <code>project_name</code>, <code>project_id</code>, <code>experiment_name</code> for easier search.</li>
</ul></div>

#### Find traces by keyword
Searching by keyword executes a search across all available information (input, output, expected output, metadata, tags).

#### Find traces by evaluation

To find a trace by evaluation, search: `@evaluation.<name>.value:<criteria>`

| Evaluation type | Example search term |
| --------------- | ----------- |
| Boolean         | `@evaluation.has_risk_pred.value:true` |
| Score           | `@evaluation.correctness.value:>=0.35` |
| Categorical     | `@evaluation.violation.value:(not_fun OR not_nice)` |

#### Find traces by experiment status

To find a trace by experiment status, search: `@experiment.status:<status>`

| Status | Example search term |
| ------ | ------------------- |
| Running | `@experiment.status:running` |
| Completed | `@experiment.status:completed` |

#### Find traces by metric

LLM Experiments automatically collects duration, token count, and cost metrics.

| Metric               | Example search term |
| -------------------- | ------------------- |
| Duration             | `@duration:>=9.5s ` |
| Token count          | `@trace.total_tokens:>10000` |
| Estimated total cost<br/> (in nanodollars; 1 nanodollar = 10<sup>-9</sup> dollars) | `@trace.estimated_total_cost:>10000000` |


#### Find traces by tag

To find traces using tags, search `<tag>:<value>`. For example, `dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 `.

To see which tags are available, open a trace to find its tags.

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="LLM Observability, Experiment trace side-panel. Highlighting where to find trace tags." style="width:100%;" >}}


#### Find traces by input, output, expected output, or metadata

To query a specific key in input, output, expected output, or metadata, you need to emit the property as JSON.

| Property | Format | Example search term |
| -------- | ------ | ------------------- |
| input | `@meta.input.<key1>.<subkey1>:<value>` | `@meta.input.origin.country:"France"` |
| output | `@meta.output.<key1>.<subkey1>:<value>` | `@meta.output.result.status:"success"` |
| expected output | `@meta.expected_output.<key1>.<subkey1>:<value>` | `@meta.expected_output.answer:"correct"`|
| metadata | `@meta.metadata.<key1>.<subkey1>:<value>` | `@meta.metadata.source:generated` |


##### Querying JSON arrays 
Simple arrays are flattened as strings, and you can query them. 

**Example 1**: Queryable JSON array

```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```

You can query this example array by searching: `@meta.output.action_matches:"^/cases/settings$"`.

**Example 2**: Non-queryable JSON array 

```
"output": {
  "expected_actions": [
    [
      "bonjour",
      "a_bientot"
    ],
    [
      "todobem",
      "click here"
    ]
  ],
}
```

In this example, the array is nested and cannot be queried.

## Using widgets with LLM Experiments data

You can build widgets in Dashboards and Notebooks using LLM Experiments data. 
Datadog suggests that you:
- Populate the metadata of your dataset records with all extra information that might help you slice your data (for example: difficulty, language, etc.) 
- Ensure that your tasks outputs a JSON object
- Update `ddtrace-py` version >= 4.1.0


To build a widget using LLM Experiments data, use `LLM Observability > Experiments` as data source. Then, use the [search syntax on this page](#searching-for-specific-records) to narrow down the events to plot. 

For record level data aggregation, use `Traces`; otherwise, use `All Spans`.

Group or filter by `@experiment.status` to compare metrics across running or completed experiments.

### Widget examples
#### Plotting performance over time broken down by a metadata field
{{< img src="llm_observability/experiments/widget-metadata.png" alt="Widget using LLM Experiments data. Graph showing the performance over time broken down by a metadata field." style="width:100%;" >}}

<div class="alert alert-info">If you are trying to compute an average of a Boolean evaluation, you must manually compute the percentage of <code>True</code> over all traces.</div>

#### Displaying tool usage stats
In a situation where your agent is supposed to call a certain tool, and you need to understand how often the tool is called and get some stats about it:

{{< img src="llm_observability/experiments/widget-tool.png" alt="Widget using LLM Experiments data. Graph showing some usage statistics of a tool in multiple experiments." style="width:100%;" >}}
