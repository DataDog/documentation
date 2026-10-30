---
title: VRL Processor
description: Run a custom Vector Remap Language (VRL) script on events to add, update, or delete attributes and tags in a single processor
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

Use the VRL processor to run a custom [Vector Remap Language (VRL)][1] script on each event that goes through a pipeline. A single script can apply several operations. For example, it can rewrite the event message or title, add tags, set an aggregation key, and add or delete custom attributes.

## Create a VRL processor

1. Go to [Event Management Pipelines][2] and open the pipeline where you want to add the processor.
1. Add a processor and select {{< ui >}}VRL Processor{{< /ui >}} as the processor type.
1. Name the processor. If you leave the name empty, the processor is saved as `VRL Processor`.
1. Enter your VRL script. To start from a common use case, click {{< ui >}}Add Library Function{{< /ui >}}. For more information, see the [Write a VRL script](#write-a-vrl-script) section.

    {{< img src="events/pipelines/vrl_processor_create.png" alt="VRL processor form with the processor type, name, and a VRL script" style="width:80%;" >}}
1. Optionally, test your script against a sample event. See the [Test the script](#test-the-script) section.
1. Click {{< ui >}}Add{{< /ui >}} (or {{< ui >}}Save{{< /ui >}} when editing an existing processor).

   The script is validated when you save the processor. If the script doesn't compile, calls a blocked function, or writes to a field that you can't update, an error appears below the script editor with the line and column of the problem.

## Write a VRL script

Your custom VRL script can read, update, and delete event fields and attributes.

The processor applies a script's updates only if the whole script runs successfully. If it doesn't, the processor doesn't apply any of the script's updates. For example, this happens when a function called with `!` fails or the script sets a value that a field doesn't accept. The event isn't dropped, and it continues through the rest of the pipeline without this processor's updates. For other restrictions on what a script can do, see the [Limitations](#limitations) section.

### Access event fields

The script sees the event as an object at `.`. To access an event field, use `.` followed by its path, such as `.title`, `.custom.region`, `.message`, or `.tags`.

You can read any available field. For the list of event fields you can update, see the [Update event fields](#update-event-fields) section.

### Update event fields

You can update an event by setting a new value for an existing field, adding custom attributes, or deleting certain fields or attributes.

The following table lists the fields you can update. Fields that aren't in the table can't be updated.

For each field, the table shows:

- **Event category**: Whether the field applies to alert events, change events, or all events.
- **Allowed operations**: Whether you can write to the field, delete it, or both.
- **Accepted values**: The type or values that you can set for the field. When you update a field, the value you assign must match the field's accepted values. For example, `priority` takes a string, so `.priority = 1` isn't allowed.

| Field | Event category | Allowed operations | Accepted values |
|-------|----------------|--------------------|-----------------|
| `message` | All | Write | String |
| `tags` | All | Write | Array of `key:value` strings |
| `title` | All | Write | String |
| `service` | All | Write | String |
| `aggregation_key` | All | Write | String |
| `custom` | Alert | Write, Delete | Object containing your custom attributes for alert events. Use `change_metadata` to create custom attributes for change events. |
| `status` | Alert | Write | `ok`, `warn`, or `error` |
| `priority` | Alert | Write | `"1"`, `"2"`, `"3"`, `"4"`, or `"5"` (as a string) |
| `links` | Alert | Write | Array of objects. Each `category` must be `runbook`, `documentation`, `dashboard`, or `resource`. |
| `change_metadata` | Change | Write, Delete | Object containing your custom attributes for change events. Use `custom` to create custom attributes for alert events. |
| `author` | Change | Write | Object. `type` must be `system`, `user`, `api`, or `automation`. |
| `changed_resource` | Change | Write | Object. `type` must be a [supported changed resource type][4]. |
| `impacted_resources` | Change | Write | Array of objects. Each `type` must be a [supported impacted resource type][4]. |
| `new_value`, `prev_value` | Change | Write | Object |

### Delete fields or attributes

You can delete custom fields, attributes within custom fields, or elements in an array.

`.custom` and `.change_metadata` are the only fields that you can delete entirely. You can also delete any attribute inside these fields, such as `del(.custom.raw_payload)`.

You can delete keys or array elements in other writable fields, but you can't delete the field itself. For example, `del(.tags[0])` removes the first tag.

### Filter events in the script

By default, the script runs on every event that matches the [pipeline filter][3]. The VRL processor doesn't have its own filter.

To apply updates to a subset of those events, use VRL conditions such as `if` blocks in your script. For example:

```text
if includes(array!(.tags), "env:prod") {
  .priority = "1"
}
```

### Examples

#### Enrich an alert event

The following script marks recovery notifications as OK, raises the priority for production events, and adds a custom attribute and a service tag:

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

#### Parse a JSON message into custom attributes

The following script parses a JSON message into a custom attribute. If the message isn't valid JSON, the script makes no updates instead of failing:

```text
if is_string(.message) {
  parsed = parse_json(string!(.message)) ?? null
  if is_object(parsed) {
    .custom.payload = object!(parsed)
  }
}
```

#### Add context to a change event

The following script adds a custom attribute to a change event and adds a prefix to its title:

```text
.change_metadata.reviewed_by = "release-bot"
.title = "[Deploy] " + string!(.title)
```

## Test the script

Before you save the processor, you can preview what your script does to a sample event.

<div class="alert alert-warning">The test runs your script in your browser without the processor's validation. It doesn't check which fields you can update, allowed values, value types, blocked functions, or the script size limit. A script that works in the test can still be rejected when you save it, or can leave events unchanged in the pipeline. Also, some functions, such as <code>get_hostname</code> and <code>parse_proto</code>, can't run in the browser. If your script uses one of these functions, the test shows a warning. The test output might also differ from what the processor produces in the pipeline.</div>

To test the script:

1. Paste a sample event as JSON in the {{< ui >}}Input{{< /ui >}} pane. To start from an example alert event, press the Tab key.

    You can also use the JSON object from the {{< ui >}}Event Attributes{{< /ui >}} tab of the event side panel. For more information, see [Navigate the Explorer][5]. If your script uses `message` or `tags`, add those fields at the top level of the JSON. The side panel JSON doesn't include them.

1. Click {{< ui >}}Run{{< /ui >}}.
1. Review the transformed event in the {{< ui >}}Output{{< /ui >}} pane. Messages from logging functions such as `log` appear in the {{< ui >}}Console{{< /ui >}} tab. Compile and runtime errors appear in the {{< ui >}}Errors{{< /ui >}} tab and are highlighted in the script editor.

{{< img src="events/pipelines/vrl_processor_test_sample.png" alt="Testing a VRL script against a sample alert event, with the transformed event in the Output tab" style="width:80%;" >}}

## Limitations

Scripts for VRL processors have the following limitations:

- Scripts can be up to 10,000 bytes. For ASCII-only scripts, this is about 10,000 characters. Non-ASCII characters use more than one byte each, which reduces the maximum character count.
- Fallible functions must handle their errors, for example with `!` (such as `parse_json!`), `??`, or `result, err = ...`. Scripts with unhandled errors do not compile.
- The `get_secret`, `set_secret`, `remove_secret`, and `set_semantic_meaning` functions are not available.
- Fields that belong to another event category are not available to the script. For example, `.status` is not available on change events. Writes to these fields are skipped, and the rest of the script still applies.
- Metadata written with the `%` path is not saved to the event.
- Timestamp values can't be stored in the event. For example, `.custom.processed_at = now()` causes a runtime error, which means that any changes from this processor are not applied. Convert timestamps to strings first, such as `format_timestamp!(now(), "%+")`.
- Results nested more than 19 levels deep are not applied.
- Attributes whose names start with an underscore (`_`) are reserved for Datadog and are not available to the script.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/vrl/
[2]: https://app.datadoghq.com/event/settings/pipelines
[3]: /events/pipelines_and_processors/#create-a-pipeline
[4]: /api/latest/events/post-an-event/
[5]: /events/explorer/navigate/
