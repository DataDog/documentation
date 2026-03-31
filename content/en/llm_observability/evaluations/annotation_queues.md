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

## API

The Annotation Queues API allows you to programmatically create annotation queues and add interactions to them using your Datadog API key and Application key.
### Create annotation queue

Use this endpoint to create a new annotation queue in a project.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/annotation-queues`

Method
: `POST`

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/json"`

#### Request

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description |
|-------|------|-------------|
| data [*required*] | [CreateAnnotationQueueRequest](#createannotationqueuerequest) | Entry point into the request body. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "queues",
    "attributes": {
      "name": "Failed Evaluations Review",
      "project_id": "a1b2c3d4-0000-0000-0000-000000000000",
      "description": "Queue for reviewing traces that failed automated evaluations"
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Code example

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/unstable/llm-obs/v1/annotation-queues" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/json" \
-d @- << EOF
{
  "data": {
    "type": "queues",
    "attributes": {
      "name": "Failed Evaluations Review",
      "project_id": "a1b2c3d4-0000-0000-0000-000000000000",
      "description": "Queue for reviewing traces that failed automated evaluations"
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Response

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description |
|-------|------|-------------|
| data | [AnnotationQueueResource](#annotationqueueresource) | The created annotation queue. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "queues",
    "id": "f5e6d7c8-0000-0000-0000-000000000000",
    "attributes": {
      "project_id": "a1b2c3d4-0000-0000-0000-000000000000",
      "name": "Failed Evaluations Review",
      "description": "Queue for reviewing traces that failed automated evaluations",
      "created_by": "b2c3d4e5-0000-0000-0000-000000000000",
      "created_at": "2026-03-25T12:00:00Z",
      "modified_by": "b2c3d4e5-0000-0000-0000-000000000000",
      "modified_at": "2026-03-25T12:00:00Z",
      "owned_by": "b2c3d4e5-0000-0000-0000-000000000000",
      "annotation_schema": null
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Add interactions to a queue

Use this endpoint to add traces to an existing annotation queue.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/annotation-queues/{queueId}/interactions`

Method
: `POST`

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/json"`

#### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| queueId [*required*] | string | The ID of the annotation queue to add interactions to. |

#### Request

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description |
|-------|------|-------------|
| data [*required*] | [AddInteractionsRequest](#addinteractionsrequest) | Entry point into the request body. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "interactions",
    "attributes": {
      "interactions": [
        {
          "type": "trace",
          "content_id": "6903738200000000af2d3775dfc70530"
        },
        {
          "type": "trace",
          "content_id": "7a14849300000000bf3e4886efd81641"
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Code example

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/unstable/llm-obs/v1/annotation-queues/f5e6d7c8-0000-0000-0000-000000000000/interactions" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/json" \
-d @- << EOF
{
  "data": {
    "type": "interactions",
    "attributes": {
      "interactions": [
        {
          "type": "trace",
          "content_id": "6903738200000000af2d3775dfc70530"
        },
        {
          "type": "trace",
          "content_id": "7a14849300000000bf3e4886efd81641"
        }
      ]
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Response

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description |
|-------|------|-------------|
| data | [AddInteractionsResponse](#addinteractionsresponse) | The result of adding interactions to the queue. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "interactions",
    "id": "f5e6d7c8-0000-0000-0000-000000000000",
    "attributes": {
      "interactions": [
        {
          "id": "a1b2c3d4-0000-0000-0000-000000000001",
          "type": "trace",
          "content_id": "6903738200000000af2d3775dfc70530",
          "already_existed": false
        },
        {
          "id": "a1b2c3d4-0000-0000-0000-000000000002",
          "type": "trace",
          "content_id": "7a14849300000000bf3e4886efd81641",
          "already_existed": false
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### API standards

#### CreateAnnotationQueueRequest

| Field | Type | Description |
|-------|------|-------------|
| type [*required*] | string | Resource type. Set to `queues`. |
| attributes [*required*] | [CreateAnnotationQueueAttributes](#createannotationqueueattributes) | The queue creation attributes. |

#### CreateAnnotationQueueAttributes

| Field | Type | Description |
|-------|------|-------------|
| name [*required*] | string | The name of the annotation queue. Must be unique within the project. |
| project_id [*required*] | string | The UUID of the LLM Observability project this queue belongs to. |
| description | string | A description of the queue's purpose and instructions for annotators. |

#### AnnotationQueueResource

| Field | Type | Description |
|-------|------|-------------|
| type | string | Resource type. Value: `queues`. |
| id | string | The unique ID of the annotation queue. |
| attributes | [AnnotationQueueAttributes](#annotationqueueattributes) | The queue attributes. |

#### AnnotationQueueAttributes

| Field | Type | Description |
|-------|------|-------------|
| project_id | string | The UUID of the LLM Observability project. |
| name | string | The name of the annotation queue. |
| description | string | The queue description. |
| created_by | string | UUID of the user who created the queue. |
| created_at | string | ISO 8601 timestamp of queue creation. |
| modified_by | string | UUID of the user who last modified the queue. |
| modified_at | string | ISO 8601 timestamp of last modification. |
| owned_by | string | UUID of the queue owner. |
| experiment_id | string | UUID of the associated experiment, if any. |
| annotation_schema | object | The label schema configuration. Null for queues created via the API. |

#### AddInteractionsRequest

| Field | Type | Description |
|-------|------|-------------|
| type [*required*] | string | Resource type. Set to `interactions`. |
| attributes [*required*] | [AddInteractionsAttributes](#addinteractionsattributes) | The interaction attributes. |

#### AddInteractionsAttributes

| Field | Type | Description |
|-------|------|-------------|
| interactions [*required*] | [[InteractionParams](#interactionparams)] | List of interactions to add to the queue. |

#### InteractionParams

| Field | Type | Description |
|-------|------|-------------|
| type [*required*] | string | The interaction type. Allowed values: `trace`, `experiment_trace`. |
| content_id [*required*] | string | The trace ID or experiment trace ID to add. |
| skip_content | boolean | If true, skip fetching and storing the trace content. Default: false. |

#### AddInteractionsResponse

| Field | Type | Description |
|-------|------|-------------|
| type | string | Resource type. Value: `interactions`. |
| id | string | The queue ID. |
| attributes | [AddInteractionsResponseAttributes](#addinteractionsresponseattributes) | The response attributes. |

#### AddInteractionsResponseAttributes

| Field | Type | Description |
|-------|------|-------------|
| interactions | [[InteractionResult](#interactionresult)] | List of interaction results. |

#### InteractionResult

| Field | Type | Description |
|-------|------|-------------|
| id | string | The unique ID of the interaction. |
| type | string | The interaction type (`trace` or `experiment_trace`). |
| content_id | string | The trace ID or experiment trace ID. |
| already_existed | boolean | Whether this interaction was already in the queue. |

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
