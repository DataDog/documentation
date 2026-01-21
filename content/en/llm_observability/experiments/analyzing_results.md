
---
title: Analyze your Experiments results
description: How to analyze LLM Observability Experiments results.
---

This page describes how to analyze LLM Observability Experiments results in the Experiments UI and widgets.

After running an Experiment, you can analyze the results to understand performance patterns and investigate problematic records. 

# Using the Experiment page

## Summary Metrics

In the Experiments Details page, this section contains all the evaluations, summary_evaluations and metrics that you have logged during the execution of your Experiment.

All values are aggregated based on their types: 
- **Boolean**: Aggregated as the ratio of True over all the values recorded.
- **Score**: Aggregated as average over all values recorded.
- **Categorical**: Aggregated as the mode (most frequent value in the distribution).

## Records

This section contains traces related to the execution of your task on the dataset inputs. Each trace contains the list of spans showing the flow of information through your agent. You can use the facets (on the left-hand side) to filter the records based on their evaluation results to uncover patterns.

## Searching for specific records

You can use the search bar to find specific records, based on their properties (dataset records data) or on the result of the experiment (output and evaluations). The search is executed at trace level.

{{< img src="llm_observability/experiments/exp_details_search.png" alt="LLM Observability, Experiment Details focus. Heading: 'Highlighting the search bar'." style="width:100%;" >}}

Note: To have access to the most data, update to ddtrace-py >= 4.1.0 as this version brings the following changes: 
- Experiments spans contain metadata from the dataset record. 
- Experiments spans' input, output, expected_output fields are stored as is (e.g queryable JSON if they are emitted as such)
- Experiments spans and children spans are tagged with dataset_name, project_name, project_id, experiment_name for easier search.

You can find traces using the following strategies:

### By keyword
This will search across all available information (input, output, expected output, metadata, tags).

### By eval
```
@evaluation.external.<name>.value:<criteria>

[score]        @evaluation.external.correctness.value:>=0.35 
[bool]         @evaluation.external.has_risk_pred.value:true
[categorical]  @evaluation.external.violation.value:(not_fun OR not_nice)
```

### By metric
LLM Experiments automatically logs the following metrics: duration, token count, and cost.
```
@duration:>=9.5s 
@trace.total_tokens:>10000
@trace.estimated_total_cost:>10000000    [in nano-dollars => 1cent = 10,000,000]
```

### By tag
```
<tag>:<value>
dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 
```

The easiest way to know which dimensions are available is to open a trace and look at available tags.

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="LLM Observability, Experiment trace side-panel. Highlighting where to find trace tags." style="width:100%;" >}}


### By Input / Output / Expected Output / Metadata
To query a specific key in one of these properties, you need to emit them as JSON.
```
@meta.input.<key1>.<subkey1>:<value>
@meta.output.<key1>.<subkey1>:<value>
@meta.expected_output.<key1>.<subkey1>:<value>
@meta.metadata.<key1>.<subkey1>:<value>

Examples:
@meta.input.origin.country:"France"
@meta.output.result.status:"success"
@meta.expected_output.answer:"correct"
@meta.metadata.source:generated
```

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