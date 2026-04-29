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
  - link: "https://www.datadoghq.com/blog/automations-annotation-queues"
    tag: "Blog"
    text: "Annotate traces to improve LLM quality with Datadog LLM Observability"
  - link: /api/latest/llm-observability/
    tag: API
    text: LLM Observability API reference
---

## Overview

Annotation Queues provide a structured workflow for human review of LLM traces. Use annotation queues to:
- Review traces with complete context including spans, metadata, tool calls, inputs, outputs, and evaluation results
- Apply structured labels and free-form observations to traces
- Identify and categorize failure patterns
- Validate LLM-as-a-Judge evaluation accuracy
- Build golden datasets with human-verified labels for testing and validation


## Creating an annotation queue

### Step 1: Configure queue settings

1. Navigate to [**AI Observability > Experiment > Annotations**][2] and select your project.
2. Click **Create Queue** 
3. On the **About** tab, configure:
   - **Name**: Descriptive name reflecting the queue's purpose (for example, "Failed Evaluations Review - Q1 2026")
   - **Project**: LLM Observability project this queue belongs to
   - **Description** (optional): Explain the queue's purpose and any special instructions for annotators

4. Then click **Next**.
5. On the **Schema** tab, define your new queue's label schema. Use the Preview pane to see how labels appear to annotators as you configure them. Each label can be marked as required and can optionally include:
   - **Assessment criteria**: Allow annotators to indicate pass/fail for that label value
   - **Reasoning**: Allow annotators to add a short explanation
6. Review your queue configuration and click **Create** to create the queue.

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="The Edit Queue modal showing the Schema tab with label configuration on the left and a preview pane on the right. The left panel displays fields for configuring a categorical label named failure_type with three categories: hallucination, formatting_error, and refusal. Checkboxes enable Assessment Criteria and Reasoning options. The right preview pane shows how the label appears to annotators with checkboxes for each category, Pass/Fail assessment buttons, and a reasoning text field." style="width:100%;" >}}

### Step 2: Select traces for annotation

You can create add traces to queue manually from Trace Explorer or populate queues automatically using Automation Rules.

{{< tabs >}}

{{% tab "Manually from Trace Explorer" %}}
Add traces to a queue manually from the Trace Explorer:
1. Navigate to  [**AI Observability > Traces**][1]
2. Filter traces using available facets (evaluation results, error status, application, time range)
3. Select individual traces or bulk select multiple traces
4. Click **Flag for Annotation**
5. Choose **Create New Queue** or select an existing queue

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "Using Automation Rules" %}}
Instead of manually selecting traces, use Automation Rules to route traces into annotation queues automatically based on filters and sampling criteria. This enables continuous, hands-off queue population without requiring manual trace selection.

To add an annotation queue action to an Automation Rule:
1. Navigate to  [**AI Observability > Traces**][1]
2. Apply filters to identify traces you want to route (evaluation failures, latency thresholds, specific applications). See the example queries in [Search Syntax](https://docs.datadoghq.com/logs/explorer/search_syntax/).
3. Click **Automate Query**
4. Configure sampling rate (for example, 10% of matching traces).
5. Under **Actions**, select **Add to Annotation Queue**.
6. Choose the target queue.
7. Save the rule.

Traces matching the rule's filters are added to the queue automatically as they arrive.

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}
{{< /tabs >}}


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
  
   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="The annotation review interface showing the annotation panel on the left and trace details on the right. The left panel displays label controls including failure_type checkboxes for hallucination, formatting_error, and refusal, plus a requires_escalation assessment with Pass and Fail buttons and a Save button at the bottom. The right panel shows the trace details for citizen_agent with a span tree, evaluation results, and expandable sections for Input and Output displaying JSON-formatted data about a weather information query." style="width:100%;" >}}

### Applying labels

For each trace:
1. **Review the full trace context**: Expand spans as needed to understand inputs, outputs, tool calls, and evaluation results.
2. **Apply labels**: Fill in the configured labels based on your assessment.
3. Annotations are be autosaved.
    
### Best practices for annotation

**Be consistent**:
- Review the queue description and label definitions before starting.
- When multiple annotators work on the same queue, establish shared understanding of criteria.
- Document reasoning in notes for borderline cases.

**Provide reasoning**:
- Use free-form notes to document why you applied specific labels.
- Note patterns you observe across multiple traces.
- Reasoning helps refine evaluation criteria and understand failure modes.

## Managing queues

### Tracking queue progress

The Annotations list page displays a progress bar for each queue showing the ratio of reviewed interactions to total interactions. Use this to monitor annotation completion across queues at a glance.

### Filtering traces by annotation labels

use the **Annotation Labels** facet to filter traces by labels applied in annotation queues. This allows you to:
- Find all traces tagged with a specific failure mode (for example, `failure_type: hallucination`)
- Build targeted samples for downstream review, dataset creation, or CSV export for data analysis
  
### Editing queue schema

You can modify a queue's label schema after creation:
1. Navigate to [**AI Observability > Experiment > Annotations**][2].
2. Open the queue.
3. If the Details panel is hidden, click **View Details**.
4. Click **Edit**.
5. Add, remove, or modify labels.
6. Click **Save Changes**.

<div class="alert alert-info">Changing the schema doesn't affect already-applied labels, but annotators will see the updated schema going forward.</div>

### Exporting annotated data

Export annotated traces for analysis or use in other workflows:

1. Navigate to [**AI Observability > Experiment > Annotations**][2].
2. Open the queue.
3. Select traces (or select all).
4. Click **Export**.

The file downloads as `annotations_<queue-id>.csv`. You can also retrieve span data programmatically using the [Export API][5].

{{% collapse-content title="CSV format" level="h4" expanded=false id="csv-format" %}}

Each row represents one annotated interaction. The file begins with these fixed columns:

| Column | Description |
|--------|-------------|
| `Content ID` | ID of the annotated content (for example, a trace ID or session ID) |
| `Type` | Interaction type: `trace`, `experiment_trace`, or `session` |
| `Input` | Input summary (empty for session interactions) |
| `Output` | Output summary (empty for session interactions) |
| `Expected Output` | Only present when **Include Expected Output** is enabled; populated for experiment traces only |

After the fixed columns, there is one set of columns per reviewer per label. Reviewers are sorted alphabetically by display name (spaces replaced with underscores). Labels follow the order defined in the queue schema:

| Column | Description |
|--------|-------------|
| `{reviewer}_{label}` | Label value (string, number, boolean, or JSON array) |
| `{reviewer}_{label}_assessment` | `pass` or `fail`, if assessment criteria is enabled for that label |
| `{reviewer}_{label}_reasoning` | Free-text reasoning, if reasoning is enabled for that label |

If a reviewer has not annotated a given row, those cells are empty.

**Example**: A queue with reviewers Alice Johnson and Bob Smith and labels `quality` (score) and `failure_type` (categorical) produces these column headers:

```
Content ID,Type,Input,Output,Alice_Johnson_quality,Alice_Johnson_quality_assessment,Alice_Johnson_quality_reasoning,Alice_Johnson_failure_type,Alice_Johnson_failure_type_assessment,Alice_Johnson_failure_type_reasoning,Bob_Smith_quality,...
```

{{% /collapse-content %}}

#### Retrieve spans by trace ID or session ID

After exporting annotation data, use the [Export API][5] to retrieve the full span data for traces or sessions in the CSV and join it with your annotation labels.

**By trace ID**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[trace_id]=<TRACE_ID>"
{{< /code-block >}}

**By session ID**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[query]=@session_id:<SESSION_ID>"
{{< /code-block >}}

### Adding to datasets

Transfer annotated traces to datasets for experiment evaluation:

1. Navigate to [**AI Observability > Experiment > Annotations**][2].
2. Open the queue.
3. Select traces to transfer.
4. Click **Add to Dataset**.
5. Choose an existing dataset, or create a dataset.

Labels are included with each trace as metadata.

See [Datasets][3] for more information about using datasets in experiments.

### Deleting queues

To delete a queue:
1. Navigate to [**AI Observability > Experiment > Annotations**][2].
2. Open the queue.
3. Click **Delete** in the Details panel.

<div class="alert alert-info">Deleting a queue removes the queue and label associations, but does not delete the underlying traces from LLM Observability. Traces remain accessible in Trace Explorer.</div>

## Using the API

You can manage annotation queues programmatically with the LLM Observability API. Use the API to:

- Create, list, update, and delete annotation queues
- Add interactions to a queue
- Retrieve annotated interactions from a queue

For endpoints, request schemas, and examples, see the [LLM Observability API reference][4].

## Data retention


| Data              | Retention period                                    |
| ----------------- | ----------------------------------------------------|
| Traces in queues  | Capped by your organization's trace retention period|
| Annotation labels | Indefinite                                          |


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
[4]: /api/latest/llm-observability/
[5]: /llm_observability/evaluations/export_api/?tab=model#api-standards
