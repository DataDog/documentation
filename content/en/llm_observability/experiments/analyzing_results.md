---
title: Analyze your Experiments results
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

To find a trace by evaluation, search: `@evaluation.external.<name>.value:<criteria>`

| Evaluation type | Example search term |
| --------------- | ----------- |
| Boolean         | `@evaluation.external.has_risk_pred.value:true` |
| Score           | `@evaluation.external.correctness.value:>=0.35` |
| Categorical     | `@evaluation.external.violation.value:(not_fun OR not_nice)` |

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


### Note about arrays 
Simple arrays are flattened as “strings” so you can query them. Let's say your output looked like this below:
```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```
You can query the values like this: `@meta.output.action_matches:"^/cases/settings$"`.

But nested arrays like below are not queryable. 
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

# Using Widgets with LLM Experiments data

You can build widgets in Dashboards and Notebooks using LLM Experiments data. 
To make the most of the widget capabilities to help you slice/dice your data the way you want, we suggest you:
- populate the metadata of your dataset records with all extra information that might help you slice your data (e.g: difficulty, language, …) 
- ensure that your tasks outputs a JSON object
- you have updated ddtrace-py >= 4.1.0


To build a widget using LLM Experiments data, use `LLM Observability > Experiments` as data source, then use the EvP search syntax described above to narrow down on the events to plot. 

For record level data aggregation, use `Traces`, otherwise use `All Spans`.

The easiest way to know which dimensions are available is to open a trace and look at available tags..
{{< img src="llm_observability/experiments/side-panel-tag.png" alt="LLM Observability, Experiment trace side-panel. Highlighting where to find trace tags." style="width:100%;" >}}


## Widget Examples
### Plotting performance over time broken down by a metadata field
{{< img src="llm_observability/experiments/widget-metadata.png" alt="Widget using LLM Experiments data. Graph showing the performance over time broken down by a metadata field." style="width:100%;" >}}

**Note:** If you are trying to compute an average of a boolean evaluation, you will have to manually compute the % of True over all traces.

### Displaying tool usage stats
In a situation where your agent is supposed to call a certain tool and you need to understand how often the tool is called and get some stats about it:

{{< img src="llm_observability/experiments/widget-tool.png" alt="Widget using LLM Experiments data. Graph showing some usage statistics of a tool in multiple experiments." style="width:100%;" >}}