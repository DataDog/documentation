---
title: Review Annotation Final Scores
description: Review annotator responses, resolve disagreements, and save final label values for interactions in annotation queues.
further_reading:
  - link: /llm_observability/investigate/annotation_queues/
    tag: Documentation
    text: Review traces with annotation queues
  - link: /llm_observability/guide/custom_annotation_views/
    tag: Documentation
    text: Use built-in and custom annotation views
  - link: /llm_observability/improve/datasets/
    tag: Documentation
    text: Build datasets for offline experiments
---

## Overview

Use final scores to record a reviewed set of label values for an interaction in an [annotation queue][1]. Compare individual annotator responses, resolve disagreements, and save the values to use as ground truth for evaluation.

Each final value follows its label's type: Boolean, categorical, score, or text. You can also record a pass/fail assessment where the label supports it and add reasoning. Individual annotations remain available after you save a final score.

## Prerequisites

- An annotation queue with a label schema and an interaction to review.
- Access to {{< ui >}}Finalized Score{{< /ui >}} in the annotation workspace.
- Permission to manage the queue to save or update final scores. Other users with access to the queue can view final scores.

## Review and save a final score

1. Open an annotation queue.
2. Select the {{< ui >}}Final Scores{{< /ui >}} table tab, then open an interaction. From an interaction that is already open, select {{< ui >}}Finalized Score{{< /ui >}} next to {{< ui >}}Annotate{{< /ui >}}.
3. For each label, review the response summary. Select the response count to examine individual reviewers' values. A {{< ui >}}Disagreement{{< /ui >}} indicator highlights labels with different responses.
4. Review the suggested value, assessment, and reasoning. Accept or reject each suggestion, or edit the field to provide your reviewed result. Editing a suggested field accepts that suggestion.
5. Optionally, use {{< ui >}}Accept all{{< /ui >}} or {{< ui >}}Reject all{{< /ui >}} to resolve all pending suggestions.
6. Enter any additional final values and reasoning, then click {{< ui >}}Save{{< /ui >}}.

Resolve all pending suggestions before saving. Final scores require an explicit save. To update a saved final score, edit its fields and click {{< ui >}}Save{{< /ui >}} again.

Use [built-in or custom annotation views][2] to inspect the interaction while reviewing its final scores.

## Interpret response summaries and suggestions

Response summaries show the annotators' submitted values, including distributions and disagreements. Numeric score summaries also show statistics such as the mean and median.

When an interaction has no saved final score, the workspace prepares suggested values from the available responses:

| Label type | Suggested final value |
|------------|-----------------------|
| Boolean | The most frequent value. For pass/fail labels, the majority assessment is used when available. |
| Categorical | Options selected by more than half of the reviewers who provided a value for that label. |
| Score | The most frequent numeric value. |
| Text | Enter the final text value after reviewing the individual responses. |

Boolean and numeric suggestions remain empty when multiple values tie for the highest count. Suggested pass/fail assessments remain empty when pass and fail counts tie.

Suggested reasoning collects reviewers' explanations with attribution. For text labels, it also includes their text responses. Review and edit this content before accepting it.

The suggested final values require your review before saving. Dataset exports that aggregate individual annotations use a [separate aggregation method][3].

## Compare final scores with evaluations

Use {{< ui >}}Compare evaluations{{< /ui >}}, when available, to compare reviewed final values with automated evaluation results:

1. Open the queue's {{< ui >}}Final Scores{{< /ui >}} table tab.
2. Enable {{< ui >}}Compare evaluations{{< /ui >}}.
3. Review the final-score and evaluation columns for each label. Hover over an evaluation result to see whether it agrees with the final value.

The comparison pairs results by label name and value type. If there is no matching evaluation, no final value, or an unavailable evaluation result, the table explains the missing comparison. Session-level snapshot evaluations are unavailable for this comparison.

## Export final scores

To use reviewed labels as dataset expected output, select {{< ui >}}From final score{{< /ui >}} when [adding interactions to a dataset][4]. Select the labels to include. Each record's `expected_output` contains an object keyed by label name, with `null` for a selected label that has no final score.

Queue CSV downloads include saved final scores when final scoring is available. Individual annotations remain available for comparison and analysis.

## Troubleshooting

### Save is unavailable

- Accept or reject all pending value, assessment, and reasoning suggestions.
- Check that you have permission to manage the queue.
- Change a field or accept a suggestion to create a result to save.

### A label has no suggested final value

Check whether reviewers have submitted a value or whether their responses tie. Enter the final value after reviewing the responses. Text labels require you to enter the final text.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/annotation_queues/
[2]: /llm_observability/guide/custom_annotation_views/
[3]: /llm_observability/investigate/annotation_queues/#adding-to-datasets
[4]: /llm_observability/investigate/annotation_queues/#adding-to-datasets
