---
title: Annotation Queues
description: Enable systematic human review of LLM traces to identify failure modes, validate automated evaluations, and build golden datasets.
further_reading:
  - link: /llm_observability/evaluations/evaluation_types
    tag: Documentation
    text: Learn about evaluation types
  - link: /llm_observability/experiments
    tag: Documentation
    text: Run experiments to test improvements
---

## Overview

{{< callout url="#" btn_hidden="true" header="Preview Feature">}}
Annotation Queues are in Preview. To request access, contact ml-observability-product@datadoghq.com.
{{< /callout >}}

Annotation Queues provide a structured workflow for human review of LLM traces. Use annotation queues to:
- Review traces with complete context including spans, metadata, tool calls, inputs, outputs, and evaluation results
- Apply structured labels and free-form observations to traces
- Identify and categorize failure patterns
- Validate LLM-as-a-Judge evaluation accuracy
- Build golden datasets with human-verified labels for testing and validation

## Create and use an annotation queue

1. Navigate to [**AI Observability > Experiment > Annotations**][2] and select your project.
1. Click **Create Queue**.
1. On the **About** tab, configure:
   - **Name**: Descriptive name reflecting the queue's purpose (for example, "Failed Evaluations Review - Q1 2026")
   - **Project**: LLM Observability project this queue belongs to
   - **Description** (optional): Explain the queue's purpose and any special instructions for annotators

   Then click **Next**.
1. On the **Schema** tab, define your new queue's label schema. Use the Preview pane to see how labels appear to annotators as you configure them. 

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="The Edit Queue modal showing the Schema tab with label configuration on the left and a preview pane on the right. The left panel displays fields for configuring a categorical label named failure_type with three categories: hallucination, formatting_error, and refusal. Checkboxes enable Assessment Criteria and Reasoning options. The right preview pane shows how the label appears to annotators with checkboxes for each category, Pass/Fail assessment buttons, and a reasoning text field." style="width:100%;" >}}

   Then click **Create**.
1. Add interactions. 
   1. Navigate to [**AI Observability > Traces**][1].
   1. Filter traces using available facets (evaluation results, error status, application, time range).
   1. Click on an individual trace, or bulk select multiple traces.
   1. Click **Flag for Annotation**.
   1. Select your queue from the drop-down.
1. Return to the annotation queue you created, and click **Review** to begin annotating.

   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="The annotation review interface showing the annotation panel on the left and trace details on the right. The left panel displays label controls including failure_type checkboxes for hallucination, formatting_error, and refusal, plus a requires_escalation assessment with Pass and Fail buttons and a Save button at the bottom. The right panel shows the trace details for citizen_agent with a span tree, evaluation results, and expandable sections for Input and Output displaying JSON-formatted data about a weather information query." style="width:100%;" >}}

## Managing queues

### Editing queue schema

You can modify a queue's label schema after creation:
1. Navigate to [**AI Observability > Experiment > Annotations**][2]
1. Open the queue
1. If the Details panel is hidden, click **View Details**
1. Click **Edit**
1. Add, remove, or modify labels
1. Click **Save Changes**

<div class="alert alert-info">Changing the schema doesn't affect already-applied labels, but annotators will see the updated schema going forward.</div>

### Exporting annotated data

Export annotated traces for analysis or use in other workflows:

1. Navigate to [**AI Observability > Experiment > Annotations**][2]
1. Open the queue
1. Select traces (or select all)
1. Click **Export**

### Adding to datasets

Transfer annotated traces to datasets for experiment evaluation:

1. Navigate to [**AI Observability > Experiment > Annotations**][2]
1. Open the queue
1. Select traces to transfer
1. Click **Add to Dataset**
1. Choose an existing dataset, or create a dataset

Labels are included with each trace as metadata.

See [Datasets][3] for more information about using datasets in experiments.

### Deleting queues

To delete a queue:
1. Navigate to [**AI Observability > Experiment > Annotations**][2]
1. Open the queue
1. Click **Delete** in the Details panel

<div class="alert alert-info">Deleting a queue removes the queue and label associations, but does not delete the underlying traces from LLM Observability. Traces remain accessible in Trace Explorer.</div>

## Data retention


| Data              | Retention period |
| ----------------- | ---------------- |
| Traces in queues  | 15 days          |
| Annotation labels | Indefinite       |

## Best practices for annotation

**Be consistent**:
- Review the queue description and label definitions before starting
- When multiple annotators work on the same queue, establish shared understanding of criteria
- Document reasoning in notes for borderline cases

**Provide reasoning**:
- Use free-form notes to document why you applied specific labels
- Note patterns you observe across multiple traces
- Reasoning helps refine evaluation criteria and understand failure modes

## Example workflows

{{% collapse-content title="Error analysis and failure mode discovery" level="h3" expanded=true id="example-error-analysis-and-failure-mode-discovery" %}}
Review failed traces to identify recurring patterns and categorize how your application fails in production.

1. Filter traces in Trace Explorer for failed evaluations or specific error patterns
2. Manually select traces and add to an annotation queue
3. Annotators review traces and document failure types in free-form notes
4. Common patterns emerge: hallucinations in specific contexts, formatting issues, inappropriate refusals
5. Create categorical labels for identified failure modes and re-code traces
6. Use failure mode distribution to prioritize fixes

#### Queue configuration
- **Labels**: Free-form notes, categorical `failure_type` label, pass/fail rating
- **Annotators**: Product managers, engineers, domain experts

{{% /collapse-content %}}

{{% collapse-content title="Validating LLM-as-a-Judge evaluations" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

Find traces where automated evaluators may be uncertain or incorrect, then have humans provide ground truth.

1. Sample evaluation results: all results, or a given score/threshold
2. Add selected traces to an annotation queue
3. Annotators review traces and provide human scores for the same criteria
4. Compare human labels to automated evaluation scores
5. Identify systematic disagreements (judge too strict, too lenient, or misunderstanding criteria)
6. Refine evaluation prompts based on disagreements

#### Queue configuration
- **Labels**: Numeric scores matching evaluation criteria (0-10), categorical `judge_accuracy` label, reasoning notes
- **Annotators**: Subject matter experts who understand evaluation criteria

{{% /collapse-content %}}

{{% collapse-content title="Golden dataset creation" level="h3" expanded=true id="example-golden-dataset-creation" %}}

Build benchmark datasets with human-verified labels for regression testing and continuous validation.

1. Sample diverse production traces from Trace Explorer (both good and bad examples)
2. Add traces to annotation queue
3. Annotators review and label traces across multiple quality dimensions
4. Add high-confidence, well-labeled examples to golden dataset
5. Use dataset for CI/CD regression testing of prompt changes
6. Continuously expand dataset with new edge cases

#### Queue configuration
- **Labels**: Multiple categorical labels covering quality dimensions, numeric scores, pass/fail rating, notes
- **Annotators**: Team of domain experts for consistency
{{% /collapse-content %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /llm_observability/experiments/datasets