---
title: Annotation Queues
aliases:
- /llm_observability/evaluations/annotation_queues/
description: Enable systematic human review of LLM traces to identify failure modes, validate automated evaluations, and build golden datasets.
further_reading:
  - link: /llm_observability/investigate/evaluations/
    tag: Documentation
    text: Learn about evaluation types
  - link: /llm_observability/configure/automation_rules
    tag: Documentation
    text: Route traces into queues automatically with Automation Rules
  - link: /llm_observability/improve/offline_experiments
    tag: Documentation
    text: Run offline experiments to test improvements
  - link: /llm_observability/data_governance/access_control
    tag: Documentation
    text: Restrict a queue to specific teams or roles
  - link: "https://www.datadoghq.com/blog/automations-annotation-queues"
    tag: "Blog"
    text: "Annotate traces to improve LLM quality with Datadog LLM Observability"
  - link: /api/latest/agent-observability/
    tag: API
    text: Agent Observability API reference
---

## Overview

Annotation Queues provide a structured workflow for human review of LLM traces. Use annotation queues to:
- Review traces with complete context including spans, metadata, tool calls, inputs, outputs, and evaluation results
- Apply structured labels and free-form observations to traces
- Identify and categorize failure patterns
- Validate LLM-as-a-Judge evaluator accuracy
- Build golden datasets with human-verified labels for testing and validation


## Creating an annotation queue

### Step 1: Configure queue settings

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] and select your project.
2. Click {{< ui >}}Create Queue{{< /ui >}}.
3. On the {{< ui >}}About{{< /ui >}} tab, configure:
   - {{< ui >}}Name{{< /ui >}}: Descriptive name reflecting the queue's purpose (for example, "Failed Evaluations Review - Q1 2026")
   - {{< ui >}}Project{{< /ui >}}: Agent Observability project this queue belongs to
   - {{< ui >}}Description{{< /ui >}} (optional): Explain the queue's purpose and any special instructions for annotators

4. Then click {{< ui >}}Next{{< /ui >}}.
5. On the {{< ui >}}Schema{{< /ui >}} tab, define your new queue's label schema. Use the Preview pane to see how labels appear to annotators as you configure them. Each label can be marked as required and can optionally include:
   - {{< ui >}}Assessment criteria{{< /ui >}}: Allow annotators to indicate pass/fail for that label value
   - {{< ui >}}Reasoning{{< /ui >}}: Allow annotators to add a short explanation
6. Review your queue configuration and click {{< ui >}}Create{{< /ui >}} to create the queue.

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="The Edit Queue modal showing the Schema tab with label configuration on the left and a preview pane on the right. The left panel displays fields for configuring a categorical label named failure_type with three categories: hallucination, formatting_error, and refusal. Checkboxes enable Assessment Criteria and Reasoning options. The right preview pane shows how the label appears to annotators with checkboxes for each category, Pass/Fail assessment buttons, and a reasoning text field." style="width:100%;" >}}

#### Importing evaluation labels

When you create a queue from a completed experiment, Datadog automatically adds the experiment's evaluator scorers as blank, editable labels. Existing evaluator result values are not copied into the queue. Review the imported labels and edit or remove them as needed before creating the queue.

For other queue creation flows, use {{< ui >}}Add Evaluation as Label{{< /ui >}} on the {{< ui >}}Schema{{< /ui >}} tab to add available evaluation labels manually.

### Step 2: Select traces for annotation

You can create add traces to queue manually from Trace Explorer or populate queues automatically using Automation Rules.

{{< tabs >}}

{{% tab "Manually from Trace Explorer" %}}
Add traces to a queue manually from the Trace Explorer:
1. Navigate to  [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Filter traces using available facets (evaluation results, error status, application, time range)
3. Select individual traces or bulk select multiple traces
4. Click {{< ui >}}Flag for Annotation{{< /ui >}}
5. Choose {{< ui >}}Create New Queue{{< /ui >}} or select an existing queue

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "Using Automation Rules" %}}
Instead of manually selecting traces, use Automation Rules to route traces into annotation queues automatically based on filters and sampling criteria. This enables continuous, hands-off queue population without requiring manual trace selection. See [Automation Rules][5] for the full feature reference, including supported filter fields and limits.

<div class="alert alert-info">Automations apply going forward: new traces matching your rule are routed to the queue as they arrive. Existing traces matching the filter are not added retroactively.</div>

To add an annotation queue action to an Automation Rule:
1. Navigate to  [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Apply filters to identify traces you want to route (evaluation failures, latency thresholds, specific applications). See [Automation Rules > Supported filter fields][6] for what's allowed.
3. Click {{< ui >}}Automate Query{{< /ui >}}
4. Configure sampling rate (up to 5% for annotation queues; for example, 2% of matching traces).
5. Under {{< ui >}}Actions{{< /ui >}}, select {{< ui >}}Add to Annotation Queue{{< /ui >}}.
6. Choose the target queue.
7. Save the rule.

Traces matching the rule's filters are added to the queue as they arrive. Annotation queues hold up to 1,000 records; the automation pauses when the queue reaches that limit.

[1]: https://app.datadoghq.com/llm/traces
[5]: /llm_observability/configure/automation_rules/
[6]: /llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}


## Annotating traces

### Accessing your queues

Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] to see all available annotation queues. Click on a queue to see the trace list, then click {{< ui >}}Review{{< /ui >}} to begin annotating.

**Note**: When an annotation task is newly assigned to you, Datadog sends an email with the queue name, the user who assigned it, and a direct link to open the assigned interaction. To opt out, disable Agent Observability annotation assignment emails in [Personal Settings email subscriptions][15].

Review Mode displays:
- {{< ui >}}Full trace context{{< /ui >}} (right panel):
  - Complete span tree with inputs, outputs, metadata
  - Tool calls and intermediate reasoning steps
  - Evaluation results on trace and individual spans

- {{< ui >}}Annotation controls{{< /ui >}} (left panel):
  - Configured labels for this queue
  - Progress indicator showing position in queue
  - Navigation controls (Previous, Next)

   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="The annotation review interface showing the annotation panel on the left and trace details on the right. The left panel displays label controls including failure_type checkboxes for hallucination, formatting_error, and refusal, plus a requires_escalation assessment with Pass and Fail buttons and a Save button at the bottom. The right panel shows the trace details for citizen_agent with a span tree, evaluation results, and expandable sections for Input and Output displaying JSON-formatted data about a weather information query." style="width:100%;" >}}

### Applying labels

For each trace:
1. **Review the full trace context**: Expand spans as needed to understand inputs, outputs, tool calls, and evaluation results.
2. **Apply labels**: Fill in the configured labels based on your assessment.
3. Annotations are autosaved.

### Adding comments

Use the {{< ui >}}Comments{{< /ui >}} panel to discuss the interaction with other reviewers while you annotate it. Comments are associated with the trace being reviewed. For span interactions, the comment is associated with the corresponding span.

To add a comment:
1. Expand the {{< ui >}}Comments{{< /ui >}} panel.
2. Click {{< ui >}}Add comment{{< /ui >}}.
3. Enter your comment and click {{< ui >}}Save{{< /ui >}}.

You can edit or delete comments that you created.

### Best practices for annotation

**Be consistent**:
- Review the queue description and label definitions before starting.
- When multiple annotators work on the same queue, establish shared understanding of criteria.
- Document reasoning in notes for borderline cases.

**Provide reasoning**:
- Use free-form notes to document why you applied specific labels.
- Note patterns you observe across multiple traces.
- Reasoning helps refine evaluation criteria and understand failure modes.

## Annotation views

Annotation views control how the annotation workspace displays the interaction you are reviewing. Choose a built-in view for conversations, structured data, or generated web pages. Build a custom view with [Datadog Apps][18] when your review workflow needs a different presentation.

Use the same interaction view while applying individual annotations or reviewing [final scores][24].

### Use a built-in view

1. Open an interaction in an annotation queue.
2. Open the view menu.
3. Under {{< ui >}}Default Views{{< /ui >}}, select a view:

   | View | Use it to |
   |------|-----------|
   | {{< ui >}}Trace Conversation{{< /ui >}} | Review messages and tool calls as a conversation. |
   | {{< ui >}}Data Explorer{{< /ui >}} | Examine JSON objects and arrays from the selected span's output. |
   | {{< ui >}}Web Page Renderer{{< /ui >}} | Preview HTML and CSS from the selected span's output. |

Select {{< ui >}}Full Interaction{{< /ui >}} to return to the standard trace or session view.

#### Review a trace conversation

Use {{< ui >}}Trace Conversation{{< /ui >}} to follow messages and tool calls across a trace:

- Search message content, span names, and services.
- Enable {{< ui >}}System messages{{< /ui >}} to include system and context messages.
- Select a message or tool call to select its associated span.
- Switch between {{< ui >}}Chat{{< /ui >}} and {{< ui >}}Span{{< /ui >}} to review the conversation or the selected span's input and output.
- Copy individual messages, tool calls, inputs, or outputs for further review.

A preview trace can contain truncated span content. Check the preview notice when interpreting a conversation.

#### Explore structured output

Use {{< ui >}}Data Explorer{{< /ui >}} when the selected span returns a JSON object or array:

- Search for keys or values.
- Use {{< ui >}}Structured{{< /ui >}} to explore nested fields and expand or collapse objects and arrays.
- Use {{< ui >}}JSON{{< /ui >}} to inspect the formatted JSON output.

Selecting another span updates the output and resets the search and expansion state. If the span has no supported structured output, select another span or use {{< ui >}}Full Interaction{{< /ui >}}.

#### Preview web page output

Use {{< ui >}}Web Page Renderer{{< /ui >}} to review generated page output. Supported formats include raw or fenced HTML and JSON with `document`, `html`, or `code` fields. JSON can also include separate `css` and `javascript` or `js` fields.

The preview renders HTML and CSS with scripts disabled. Content that depends on JavaScript or external resources may appear incomplete. Select a span with page output to display its preview.

### Use a published custom view

1. Open the view menu in an annotation queue interaction.
2. Search for a view under {{< ui >}}My Custom Views{{< /ui >}} or {{< ui >}}All Custom Views{{< /ui >}}.
3. Select the view to display the interaction with that App.

Select the star next to a custom view to keep it at the top of its group. Custom views follow [App permissions][20].

The workspace remembers the last view that loaded successfully for your user and organization in the same browser. Copy the interaction URL to share the selected view. Recipients need access to the queue and, for custom views, the App.

### Create a custom view

To create a custom view, you need:

- Access to {{< ui >}}Create a custom view{{< /ui >}} in the view menu.
- A local coding agent and Node.js version 20.12.0 or later. See the [Datadog Apps prerequisites][19].
- Permission to create and publish Datadog Apps in the organization where you review annotations. See [App permissions][20].

Open an interaction in an annotation queue. In the view menu, select {{< ui >}}Create a custom view{{< /ui >}}.

#### Step 1: Install the skill

On the {{< ui >}}Install skill{{< /ui >}} tab, copy the installation command and run it in your project's terminal:

```shell
npx skills add datadog-labs/agent-skills --skill datadog-app --full-depth -y
```

If the skill does not appear in your agent, restart the agent. If you already installed the skill, continue to the next step.

#### Step 2: Build and publish the view

1. On the {{< ui >}}Copy prompt{{< /ui >}} tab, enter a description in {{< ui >}}What would you like to see?{{< /ui >}}. For example:

   ```text
   Show tool calls as a timeline, highlight failed steps, and display the final response alongside the original input.
   ```

2. Copy the generated prompt and paste it into your local coding agent. The prompt includes the target organization and Datadog site. It also includes instructions for reading the selected interaction and the tag that identifies the App as an annotation view.
3. Complete browser authorization when prompted. Select the organization shown in the setup dialog.
4. Work with your agent to build and preview the view locally. Review the result and approve uploading and publishing it to the target organization. For details, see [Build and upload your App][21] and [Publish and manage your Apps][22].
5. Return to the setup dialog and open the {{< ui >}}Use your view{{< /ui >}} tab.

#### Use API keys instead of browser authorization

For CI or environments where browser sign-in is unavailable:

1. Enable {{< ui >}}Use API keys instead{{< /ui >}} on the {{< ui >}}Copy prompt{{< /ui >}} tab.
2. Select or create an API key and enter an application key. The application key requires [Actions API Access][23] and permission to create and publish Apps.
3. Copy the generated commands and run them in your terminal to set `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` before starting your agent.
4. Copy the updated prompt into your agent and continue building the view.

Keep credentials in your terminal environment. Do not add them to source code or frontend bundles.

#### Step 3: Preview and apply the view

1. On the {{< ui >}}Use your view{{< /ui >}} tab, select {{< ui >}}Refresh{{< /ui >}} to load published Apps.
2. Search the {{< ui >}}Published App{{< /ui >}} dropdown and select your view. If there is only one matching published App, it is selected automatically.
3. Review the preview, which displays the selected interaction using your App.
4. Select {{< ui >}}Use this view{{< /ui >}} to apply it to the annotation workspace.

The workspace switches to the selected view after you select {{< ui >}}Use this view{{< /ui >}}. Closing the dialog without applying a view keeps your existing selection.

### Update a custom view

1. Work with your local agent to change the App and preview the changes locally.
2. Upload and publish an updated version of the same App.
3. Open {{< ui >}}Create a custom view{{< /ui >}} from the annotation workspace's view menu and go to {{< ui >}}Use your view{{< /ui >}}.
4. Select {{< ui >}}Refresh{{< /ui >}}, select the App, and review the updated preview.
5. Select {{< ui >}}Use this view{{< /ui >}} to apply it.

### Troubleshoot annotation views

#### The published App does not appear

- Check that you published the App to the same organization and Datadog site as the annotation workspace.
- Keep the annotation-view tag from the generated prompt in your App's configuration.
- Check that you have permission to view the App.
- Select {{< ui >}}Refresh{{< /ui >}} after publishing. If there are no published Apps, select {{< ui >}}Back to prompt{{< /ui >}} to continue working with your agent.

#### Published Apps fail to load

Select {{< ui >}}Refresh{{< /ui >}} to retry loading the list.

## Final scores

Use final scores to record a reviewed set of label values for an interaction in the queue. Compare individual annotator responses, resolve disagreements, and save the values to use as ground truth for evaluation.

Each final value follows its label's type: Boolean, categorical, score, or text. You can also record a pass/fail assessment where the label supports it and add reasoning. Individual annotations remain available after you save a final score.

### Final-score access

- An annotation queue with a label schema and an interaction to review.
- Access to {{< ui >}}Finalized Score{{< /ui >}} in the annotation workspace.
- Permission to manage the queue to save or update final scores. Other users with access to the queue can view final scores.

### Review and save a final score

1. Open an annotation queue.
2. Select the {{< ui >}}Final Scores{{< /ui >}} table tab, then open an interaction. From an interaction that is already open, select {{< ui >}}Finalized Score{{< /ui >}} next to {{< ui >}}Annotate{{< /ui >}}.
3. For each label, review the response summary. Select the response count to examine individual reviewers' values. A {{< ui >}}Disagreement{{< /ui >}} indicator highlights labels with different responses.
4. Review the suggested value, assessment, and reasoning. Accept or reject each suggestion, or edit the field to provide your reviewed result. Editing a suggested field accepts that suggestion.
5. Optionally, use {{< ui >}}Accept all{{< /ui >}} or {{< ui >}}Reject all{{< /ui >}} to resolve all pending suggestions.
6. Enter any additional final values and reasoning, then click {{< ui >}}Save{{< /ui >}}.

Resolve all pending suggestions before saving. Final scores require an explicit save. To update a saved final score, edit its fields and click {{< ui >}}Save{{< /ui >}} again.

Use [built-in or custom annotation views][25] to inspect the interaction while reviewing its final scores.

### Interpret response summaries and suggestions

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

The suggested final values require your review before saving. Dataset exports that aggregate individual annotations use a [separate aggregation method][26].

### Compare final scores with evaluations

Use {{< ui >}}Compare evaluations{{< /ui >}}, when available, to compare reviewed final values with automated evaluation results:

1. Open the queue's {{< ui >}}Final Scores{{< /ui >}} table tab.
2. Enable {{< ui >}}Compare evaluations{{< /ui >}}.
3. Review the final-score and evaluation columns for each label. Hover over an evaluation result to see whether it agrees with the final value.

The comparison pairs results by label name and value type. If there is no matching evaluation, no final value, or an unavailable evaluation result, the table explains the missing comparison. Session-level snapshot evaluations are unavailable for this comparison.

For export options, see [Exporting annotated data][27] and [Adding to datasets][26].

### Troubleshoot final scores

#### Save is unavailable

- Accept or reject all pending value, assessment, and reasoning suggestions.
- Check that you have permission to manage the queue.
- Change a field or accept a suggestion to create a result to save.

#### A label has no suggested final value

Check whether reviewers have submitted a value or whether their responses tie. Enter the final value after reviewing the responses. Text labels require you to enter the final text.

## Managing queues

### Tracking queue progress

The Annotations list page displays a progress bar for each queue showing the ratio of reviewed interactions to total interactions. Use this to monitor annotation completion across queues at a glance.

### Managing queue access

Queue owners manage the reviewer list, access settings, and assignments from the queue details. Only the queue owner can change the reviewer list, access settings, or assignments.

Access restrictions apply independently, so you can enable either restriction or both:
- Reviewer restriction limits unassigned interactions to designated reviewers.
- Assignee restriction limits assigned interactions to their assignees.
- When both restrictions are enabled, reviewers can annotate unassigned interactions and assignees can annotate their assigned interactions.

The queue owner retains access and can annotate all interactions.

These settings control who can annotate a queue, not who can see it. To control which teams and roles can see a queue at all, restrict its project with [Data Access Control][17].

### Filtering traces by annotation labels

use the {{< ui >}}Annotation Labels{{< /ui >}} facet to filter traces by labels applied in annotation queues. This allows you to:
- Find all traces tagged with a specific failure mode (for example, `failure_type: hallucination`)
- Build targeted samples for downstream review, dataset creation, or CSV export for data analysis

### Editing queue schema

You can modify a queue's label schema after creation:
1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Open the queue.
3. If the Details panel is hidden, click {{< ui >}}View Details{{< /ui >}}.
4. Click {{< ui >}}Edit{{< /ui >}}.
5. Add, remove, or modify labels.
6. Click {{< ui >}}Save Changes{{< /ui >}}.

<div class="alert alert-info">Changing the schema doesn't affect already-applied labels, but annotators will see the updated schema going forward.</div>

### Exporting annotated data

Export annotated traces for analysis or use in other workflows:

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Open the queue.
3. Select traces (or select all).
4. Click {{< ui >}}Export{{< /ui >}}.

The file downloads as `annotations_<queue-id>.csv`. You can also retrieve span data programmatically using the [Export API][5]. When final scoring is available, CSV downloads also include saved final scores.

{{% collapse-content title="CSV format" level="h4" expanded=false id="csv-format" %}}

Each row represents one annotated interaction. The file begins with these fixed columns:

| Column | Description |
|--------|-------------|
| `Content ID` | ID of the annotated content (for example, a trace ID or session ID) |
| `Type` | Interaction type: `trace`, `experiment_trace`, or `session` |
| `Input` | Input summary (empty for session interactions) |
| `Output` | Output summary (empty for session interactions) |
| `Expected Output` | Only present when {{< ui >}}Include Expected Output{{< /ui >}} is enabled; populated for experiment traces only |

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

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Open the queue.
3. Select traces to transfer.
4. Click {{< ui >}}Add to Dataset{{< /ui >}}.
5. Set the dataset's {{< ui >}}expected output{{< /ui >}}:
   - {{< ui >}}From interaction{{< /ui >}}: use each trace's actual output. For experiment traces, you can also pick {{< ui >}}Expected output{{< /ui >}} to use the original expected output from the experiment's source dataset.
   - {{< ui >}}From annotation label{{< /ui >}}: use the values the annotators applied. Pick one or more labels. The record's `expected_output` is built from your selection.
   - {{< ui >}}From final score{{< /ui >}}: use the final score recorded for each label instead of values aggregated across annotators. Pick one or more labels. The record's `expected_output` is a JSON object keyed by the selected label names. Traces without a final score for a selected label are still exported, with `null` for that label.
6. Choose an existing dataset, or create a dataset.

When **expected output** is built from annotation labels, the exported value is a JSON object keyed by label name, for example `{ "is_harmful": false, "tone": ["neutral"], "topics": ["safety", "policy"] }`. The same shape applies whether you select one label or multiple labels. Categorical labels are always exported as arrays of selected options, whether the label is single-select or multi-select.

{{% collapse-content title="How annotation values are aggregated across annotators" level="h4" expanded=false id="annotation-aggregation" %}}

When multiple annotators have annotated the same trace, the value for each label is aggregated across them by consensus:

| Label type   | Aggregation                                                                |
| ------------ | -------------------------------------------------------------------------- |
| Boolean      | Majority vote (ties break in favor of `true`)                              |
| Categorical  | Intersection: the sorted set of options that every annotator selected      |
| Score        | Average                                                                    |
| Text         | List of responses                                                          |

For categorical labels (single-select or multi-select), the aggregated value is the sorted array of options that *every* annotator selected. If any annotator's selection differs, the value is an empty array. The result is always an array, even when only one annotator has annotated the trace.

**Example: categorical (consensus).** Three annotators rate `tone` and all agree:

- Annotator A: `polite`
- Annotator B: `polite`
- Annotator C: `polite`

Aggregated: `["polite"]`.

**Example: categorical (disagreement).** Three annotators rate `tone` and one differs:

- Annotator A: `polite`
- Annotator B: `rude`
- Annotator C: `polite`

Aggregated: `[]`. The intersection is empty because `rude` is not in every annotator's set.

**Example: categorical (multi-select).** Three annotators tag `topics` (each can pick multiple options):

- Annotator A: `["safety", "policy"]`
- Annotator B: `["safety", "billing"]`
- Annotator C: `["safety", "policy"]`

Aggregated: `["safety"]`. Only `safety` appears in every annotator's set; `policy` is missing from B's selection and `billing` is missing from A's and C's.

**Example: text.** Two annotators leave notes:

- Annotator A: `"Confusing phrasing"`
- Annotator B: `"Tone too casual"`

Aggregated: `["Confusing phrasing", "Tone too casual"]`. Every annotator's value is preserved.

Raw per-annotator values are preserved in each record's metadata, along with annotator identity. If the default consensus doesn't fit your workflow, you can recompute with a different strategy (for example, median, weighted vote, or reviewer pick).

{{% /collapse-content %}}

Labels not selected as expected output are also included with each trace as metadata, along with any final scores and their assessment and reasoning.

See [Datasets][3] for more information about using datasets in offline experiments.

### Deleting queues

To delete a queue:
1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Open the queue.
3. Click {{< ui >}}Delete{{< /ui >}} in the Details panel.

<div class="alert alert-info">Deleting a queue removes the queue and label associations, but does not delete the underlying traces from Agent Observability. Traces remain accessible in Trace Explorer.</div>

## Using the API

You can manage annotation queues programmatically. The following endpoints are available in the [Agent Observability API reference][4]:

| Endpoint | Description |
|----------|-------------|
| [List annotation queues][6] | List all annotation queues in your organization. |
| [Create an annotation queue][7] | Create an annotation queue. `name` and `project_id` are required. Include an optional `annotation_schema` to define labels at creation time. |
| [Update an annotation queue][8] | Partially update a queue's `name`, `description`, or `annotation_schema`. |
| [Delete an annotation queue][9] | Delete an annotation queue by ID. |
| [Add interactions to a queue][10] | Add one or more traces to an annotation queue for review. |
| [Delete interactions from a queue][11] | Remove specific interactions from a queue by interaction ID. |
| [Get annotated interactions][12] | Retrieve all interactions and their applied annotation labels for a queue. |
| [Get label schema][13] | Retrieve the label schema configured for a queue. |
| [Update label schema][14] | Create or replace the label schema for a queue. |

## Data retention


| Data              | Retention period                                    |
| ----------------- | ----------------------------------------------------|
| Traces in queues  | Not retained beyond your organization's span retention period, unless annotated |
| Annotated traces  | 90 days from the time of annotation, or your span retention period if that is longer |
| Annotation labels | The same period as the trace they annotate           |

Annotating a trace extends its retention at no additional charge: a trace that would otherwise expire under a shorter span retention period is retained for 90 days from the time you annotate it. For details, see [Data Governance][16].


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

{{% collapse-content title="Validating LLM-as-a-Judge evaluators" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

Find traces where automated evaluators may be uncertain or incorrect, then have humans provide ground truth.

1. Sample evaluation results: all results, or a given score/threshold
2. Add selected traces to an annotation queue
3. Annotators review traces and provide human scores for the same criteria
4. Compare human labels to automated evaluation scores
5. Identify systematic disagreements (judge too strict, too lenient, or misunderstanding criteria)
6. Refine evaluator prompts based on disagreements

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
[3]: /llm_observability/improve/datasets
[4]: /api/latest/agent-observability/
[5]: /llm_observability/investigate/export_api/?tab=model#api-standards
[6]: /api/latest/agent-observability/#list-agent-observability-annotation-queues
[7]: /api/latest/agent-observability/#create-an-agent-observability-annotation-queue
[8]: /api/latest/agent-observability/#update-an-agent-observability-annotation-queue
[9]: /api/latest/agent-observability/#delete-an-agent-observability-annotation-queue
[10]: /api/latest/agent-observability/#add-annotation-queue-interactions
[11]: /api/latest/agent-observability/#delete-annotation-queue-interactions
[12]: /api/latest/agent-observability/#get-annotated-queue-interactions
[13]: /api/latest/agent-observability/#get-annotation-queue-label-schema
[14]: /api/latest/agent-observability/#update-annotation-queue-label-schema
[15]: /account_management/#email-subscriptions
[16]: /llm_observability/data_governance/
[17]: /llm_observability/data_governance/access_control/
[18]: /actions/datadog_apps/
[19]: /actions/datadog_apps/#prerequisites
[20]: /actions/app_builder/access_and_auth/#app-permissions
[21]: /actions/datadog_apps/#build-and-upload-your-app
[22]: /actions/datadog_apps/#publish-and-manage-your-apps
[23]: /account_management/api-app-keys/#actions-api-access
[24]: #final-scores
[25]: #annotation-views
[26]: #adding-to-datasets
[27]: #exporting-annotated-data
