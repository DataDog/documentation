---
title: VRL Processor
aliases:
- /service_management/events/pipelines_and_processors/vrl_processor/
description: Run a custom Vector Remap Language (VRL) script on events to add, change, or delete attributes and tags in a single processor
further_reading:
- link: "/events/pipelines_and_processors/"
  tag: "Documentation"
  text: "Pipelines and Processors"
- link: "https://vector.dev/docs/reference/vrl/"
  tag: "External Site"
  text: "Vector Remap Language (VRL) reference"
- link: "https://vector.dev/docs/reference/vrl/functions/"
  tag: "External Site"
  text: "VRL function reference"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
The VRL processor for Event Management is in Preview. Contact your Datadog account team to request access.
{{< /callout >}}

## Overview

Use the VRL processor to run a custom [Vector Remap Language (VRL)][1] script on each event that goes through a pipeline. A single script can apply several operations at once. For example, it can rewrite the message or title, add tags, set an aggregation key, and add or delete custom attributes.

## Create a VRL processor

1. Navigate to [Event Management Pipelines][2] and open the pipeline you want to add the processor to.
1. Add a processor and select {{< ui >}}VRL Processor{{< /ui >}} as the processor type.
1. Name the processor. If you leave the name empty, the processor is saved as `VRL Processor`.
1. Enter your VRL script. To start from a common use case, click {{< ui >}}Add Library Function{{< /ui >}} and click {{< ui >}}Use{{< /ui >}} next to a snippet to insert it at your cursor.
1. Optionally, [test your script against a sample event](#test-your-script-against-a-sample-event).
1. Click {{< ui >}}Add{{< /ui >}} (or {{< ui >}}Save{{< /ui >}} when editing an existing processor).

{{< img src="events/pipelines/vrl_processor_create.png" alt="VRL processor form with the processor type, name, and a VRL script" style="width:80%;" >}}

### Test your script against a sample event

Use the {{< ui >}}Test your script against a sample event{{< /ui >}} section to preview what your script does before you save it:

1. Paste a sample event as JSON in the {{< ui >}}Input{{< /ui >}} pane. You can use the JSON object from the {{< ui >}}Event Attributes{{< /ui >}} tab of the event side panel, and add the `message` and `tags` fields at the top level if your script uses them. To start from an example alert event, press <kbd>Tab</kbd> in the empty input.
1. Click {{< ui >}}Run{{< /ui >}}.
1. Review the result in the {{< ui >}}Output{{< /ui >}} tab. Messages from logging functions such as `log` appear in the {{< ui >}}Console{{< /ui >}} tab, and compile or runtime errors appear in the {{< ui >}}Errors{{< /ui >}} tab and are highlighted in the script editor.

{{< img src="events/pipelines/vrl_processor_test_sample.png" alt="Testing a VRL script against a sample alert event, with the transformed event in the Output tab" style="width:80%;" >}}

<div class="alert alert-warning">The test runs your script in your browser without any of the processor's validation. It does not check which fields can be modified, allowed values, value types, blocked functions, or the script size limit, so a script that works in the test can still be rejected when you save it, or leave events unchanged in the pipeline. Some functions, such as <code>get_hostname</code> and <code>parse_proto</code>, can't be simulated in the browser; when your script uses them, a warning indicates that the output might not match the pipeline.</div>

### Script validation

The script is validated when you save the processor. If the script doesn't compile, calls a blocked function, or writes to a field that can't be modified, the error appears below the script editor with the line and column of the problem, for example:

```text
[E701] call to undefined variable
line 1, column 8: undefined variable; did you mean "false"?
```

**Note**: The VRL processor does not have its own filter. It runs on every event that matches the [pipeline filter][3]. Use VRL conditions such as `if` blocks in your script to apply changes to a subset of those events.

## Event fields in a VRL script

The script reads and writes the event through the `.` path:

- To access an attribute, use `.` followed by the attribute's path. For example, `.title`, `.status`, or `.custom.region`.
- To access the event message and tags, use `.message` and `.tags`. `.tags` is an array of `key:value` strings.
- Reserved attributes, such as `.host`, `.source`, and `.timestamp`, can be read but not modified.
- Attributes whose names start with an underscore (`_`) are reserved for Datadog and are not available to the script.

### Writable fields

You can read any available field. You can only modify the following fields:

| Field | Event category | Allowed operations | Value |
|-------|----------------|--------------------|-------|
| `message` | All | Write | String |
| `tags` | All | Write | Array of strings |
| `title` | All | Write | String |
| `service` | All | Write | String |
| `aggregation_key` | All | Write | String |
| `custom` | Alert | Write, delete | Object containing your custom attributes |
| `status` | Alert | Write | `ok`, `warn`, or `error` |
| `priority` | Alert | Write | `"1"`, `"2"`, `"3"`, `"4"`, or `"5"` (as a string) |
| `links` | Alert | Write | Array of objects. Each `category` must be `runbook`, `documentation`, `dashboard`, or `resource`. |
| `change_metadata` | Change | Write, delete | Object containing your custom attributes |
| `author` | Change | Write | Object. `type` must be `system`, `user`, `api`, or `automation`. |
| `changed_resource` | Change | Write | Object. `type` must be a [supported changed resource type][4]. |
| `impacted_resources` | Change | Write | Array of objects. Each `type` must be `service`, `application`, or `rum_view`. |
| `new_value`, `prev_value` | Change | Write | Object |

**Notes**:

- Add your own attributes under `.custom` for alert events and under `.change_metadata` for change events.
- Fields with a fixed list of values, such as `status` and `priority`, accept values in any case. The value is stored in lowercase, so `.status = "ERROR"` sets the status to `error`.
- A write must keep the field's existing type. For example, you cannot set a string attribute to a number.
- You can delete individual keys or array elements inside a writable field, such as `del(.custom.raw_payload)` or `del(.tags[0])`. You can only delete a whole field for `custom` and `change_metadata`.
- Fields that belong to another event category are not available to the script. For example, `.status` is not available on change events. Writes to these fields are skipped, and the rest of the script still applies.

## How changes are applied

The processor applies the result of a script to an event all at once:

- If the script writes to or deletes a field that can't be modified, or sets a value that isn't allowed, **none** of the script's changes are applied to that event.
- If the script fails at runtime, for example because `parse_json!` receives a message that isn't valid JSON, or the script calls `abort`, the event is left unchanged.

In both cases, the event is not dropped. It continues through the rest of the pipeline without the changes from this processor.

If a script fails on most of the events it processes, Datadog temporarily skips the processor for a few minutes before running it again.

## Examples

### Enrich an alert event

```text
# Mark recovery notifications as OK and raise the priority for production events
if contains(string(.message) ?? "", "recovered") {
  .status = "ok"
}
if includes(array!(.tags), "env:prod") {
  .priority = "1"
}

# Add a custom attribute and a tag based on the service
.custom.team = "payments"
if exists(.service) {
  .tags = push(array!(.tags), "owner_service:" + to_string!(.service))
}
```

### Parse a JSON message into custom attributes

```text
if is_string(.message) {
  parsed = parse_json(string!(.message)) ?? null
  if is_object(parsed) {
    .custom.payload = object!(parsed)
  }
}
```

### Add context to a change event

```text
.change_metadata.reviewed_by = "release-bot"
.title = "[Deploy] " + string!(.title)
```

## Limitations

- Scripts can be up to 10,000 bytes. This is about 10,000 characters unless your script contains non-ASCII characters.
- Fallible functions must handle their errors, for example with `!` (such as `parse_json!`), `??`, or `result, err = ...`. Scripts with unhandled errors do not compile.
- The `get_secret`, `set_secret`, `remove_secret`, and `set_semantic_meaning` functions are not available.
- Metadata written with the `%` path is not saved to the event.
- Timestamp values can't be stored in the event. For example, `.custom.processed_at = now()` causes the event to be left unchanged. Convert timestamps to strings first, such as `format_timestamp!(now(), "%+")`.
- Results nested more than 19 levels deep are not applied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/vrl/
[2]: https://app.datadoghq.com/event/settings/pipelines
[3]: /events/pipelines_and_processors/#create-a-pipeline
[4]: /api/latest/events/#post-an-event
