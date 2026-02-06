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

Annotation Queues provide a structured workflow for systematic human review of LLM traces. While automated evaluations can run at scale, human judgment remains essential for understanding nuanced quality issues, discovering failure modes, and validating automated evaluation accuracy.

{{< callout url="#" btn_hidden="true" header="Preview Feature">}}
Annotation Queues are in Preview. To request access, contact ml-observability-product@datadoghq.com.
{{< /callout >}}

Annotation Queues enable domain experts to:
- Review traces with complete context including spans, metadata, tool calls, inputs, outputs, and evaluation results
- Apply structured labels and free-form observations to traces
- Systematically identify and categorize failure patterns
- Validate the accuracy and reliability of LLM-as-a-Judge evaluations
- Build golden datasets with human-verified labels for testing and validation

## Key concepts

### Annotation queue
A curated collection of traces selected for human review. Each queue has a defined purpose (error analysis, evaluation validation, golden dataset creation) and custom labeling schema.

### Labels
Structured or free-form data that annotators apply to traces:
- **Categorical labels**: Select from predefined values (e.g., failure type: "hallucination", "formatting error", "refusal")
- **Numeric scores**: Rate on a defined scale (e.g., accuracy: 0-10)
- **Boolean flags**: Binary indicators (e.g., "contains PII", "requires escalation")
- **Pass/fail rating**: Quick thumbs up/down assessment
- **Free-form notes**: Qualitative observations and reasoning

### Queue schema
The set of labels configured for a specific queue. Different queues can have different schemas based on their purpose.

## When to use annotation queues

### Error analysis and failure mode discovery
Systematically review failed traces to identify recurring patterns and categorize how your application fails in production.

**Example workflow:**
1. Filter traces in Trace Explorer for failed evaluations or specific error patterns
2. Manually select traces and add to an annotation queue
3. Annotators review traces and document failure types in free-form notes
4. Common patterns emerge: hallucinations in specific contexts, formatting issues, inappropriate refusals
5. Create categorical labels for identified failure modes and re-code traces
6. Use failure mode distribution to prioritize fixes

**Queue configuration:**
- **Labels**: Free-form notes, categorical "failure_type" label, pass/fail rating
- **Annotators**: Product managers, engineers, domain experts

### Validating LLM-as-a-Judge evaluations
Surface traces where automated evaluators may be uncertain or incorrect, then have humans provide ground truth.

**Example workflow:**
1. Sample evaluation results; either all results or a given score/threshold
2. Add selected traces to an annotation queue
3. Annotators review traces and provide human scores for the same criteria
4. Compare human labels to automated evaluation scores
5. Identify systematic disagreements (judge too strict, too lenient, or misunderstanding criteria)
6. Refine evaluation prompts based on disagreements

**Queue configuration:**
- **Labels**: Numeric scores matching evaluation criteria (0-10), categorical "judge_accuracy" label, reasoning notes
- **Annotators**: Subject matter experts who understand evaluation criteria

### Golden dataset creation
Build benchmark datasets with human-verified labels for regression testing and continuous validation.

**Example workflow:**
1. Sample diverse production traces from Trace Explorer (both good and bad examples)
2. Add traces to annotation queue
3. Annotators review and label traces across multiple quality dimensions
4. Add high-confidence, well-labeled examples to golden dataset
5. Use dataset for CI/CD regression testing of prompt changes
6. Continuously expand dataset with new edge cases

**Queue configuration:**
- **Labels**: Multiple categorical labels covering quality dimensions, numeric scores, pass/fail rating, notes
- **Annotators**: Team of domain experts for consistency

## Creating an annotation queue

### Step 1: Select traces for annotation

Add traces to a queue manually from the Trace Explorer:

1. Navigate to [**AI Observability > Traces**][1]
2. Filter traces using available facets (evaluation results, error status, application, time range)
3. Select individual traces or bulk select multiple traces
4. Click **Flag for Annotation**
5. Choose **Create New Queue** or select an existing queue

### Step 2: Configure queue settings

When creating a new queue, configure:

**Basic settings:**
- **Queue name**: Descriptive name reflecting the queue's purpose (e.g., "Failed Evaluations Review - Q1 2026")
- **Project**: LLM Observability project this queue belongs to
- **Description** (optional): Explain the queue's purpose and any special instructions for annotators

**Label schema:**
Define the labels annotators will use. Use the Preview pane to see how labels appear to annotators as you configure them. Each label can be marked as required and can optionally include:
- **Assessment criteria**: Allow annotators to indicate pass/fail for that label value
- **Reasoning**: Allow annotators to add a short explanation

**Categorical label:**
- Label name (e.g., "failure_type")
- Description (optional) to guide annotators
- List of allowed values (e.g., "hallucination", "formatting_error", "refusal", "tool_misuse")
- Mark as required or optional

**Score label:**
- Label name (e.g., "accuracy")
- Description (optional)
- Score range (min/max, e.g., 0-10)
- Optionally restrict to integers only
- Mark as required or optional

**Boolean label:**
- Label name (e.g., "contains_pii")
- Description (optional)
- Mark as required or optional

**Text label:**
- Label name (e.g., "annotator_notes")
- Description (optional)
- Free-form text input
- Mark as required or optional

### Step 3: Review and create

Review your queue configuration and click **Create** to create the queue. Selected traces are added to the queue immediately.

## Annotating traces

### Accessing your queues

Navigate to [**AI Observability > Experiment > Annotations**][2] to see all available annotation queues. Click on a queue to see the trace list, then click **Review** to begin annotating.

Review Mode displays:
- **Full trace context** (right panel):
  - Complete span tree with inputs, outputs, metadata
  - Tool calls and intermediate reasoning steps
  - Evaluation results on trace and individual spans

- **Annotation controls** (left panel):
  - Configured labels for this queue
  - Progress indicator showing position in queue
  - Navigation controls (Previous, Next)

### Applying labels

For each trace:

1. **Review the full trace context**: Expand spans as needed to understand inputs, outputs, tool calls, and evaluation results

2. **Apply labels**: Fill in the configured labels based on your assessment
   - **Categorical labels**: Select from dropdown
   - **Numeric scores**: Enter value within defined range
   - **Boolean flags**: Check or uncheck
   - **Pass/fail rating**: Click thumbs up or down
   - **Free-form notes**: Document observations, reasoning, or patterns

3. **Navigate**:
   - **Next**: Save labels and move to next trace
   - **Previous**: Return to previous trace (labels are saved)

### Best practices for annotation

**Be consistent:**
- Review the queue description and label definitions before starting
- When multiple annotators work on the same queue, establish shared understanding of criteria
- Document reasoning in notes for borderline cases

**Provide reasoning:**
- Use free-form notes to document why you applied specific labels
- Note patterns you observe across multiple traces
- Reasoning helps refine evaluation criteria and understand failure modes

## Managing queues

### Editing queue schema

You can modify a queue's label schema after creation:
1. Open the queue
2. Click **View Details** and then **Edit**
3. Add, remove, or modify labels
4. Click **Save Changes**

**Note**: Changing the schema doesn't affect already-applied labels, but annotators will see the updated schema going forward.

### Exporting annotated data

Export annotated traces for analysis or use in other workflows:

1. Open the queue
2. Select traces (or select all)
3. Click **Export**

### Adding to datasets

Transfer annotated traces to datasets for experiment evaluation:

1. Open the queue
2. Select traces to transfer
3. Click **Add to Dataset**
4. Choose existing dataset or create new
5. Human labels are included with each trace as metadata

See [Datasets documentation][3] for more on using datasets in experiments.

### Deleting queues

To delete a queue:
1. Open the queue
2. Click **Delete** in queue details panel

**Note**: Deleting a queue removes the queue and label associations, but does not delete the underlying traces from LLM Observability. Traces remain accessible in Trace Explorer.


## Data retention

- **Traces in queues**: Expire after 15 days
- **Annotation labels**: Persisted indefinitely


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /llm_observability/experiments/datasets