---
title: String Builder Processor
description: "Add a new attribute with the result of a provided template"
processor_type: string-builder-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the string builder processor to add a new attribute (without spaces or special characters) to a log with the result of the provided template. This enables aggregation of different attributes or raw strings into a single attribute.

The template is defined by both raw text and blocks with the syntax `%{attribute_path}`.

**Notes**:

* This processor only accepts attributes with values or an array of values in the block (see examples in the UI section below.
* If an attribute cannot be used (object or array of object), it is replaced by an empty string or the entire operation is skipped depending on your selection.
* If a target attribute already exists, it is overwritten by the result of the template.
* Results of a template cannot exceed 256 characters.

## Use cases
Use cases for the String Builder Processor are pretty diverse. An example is displaying a message including the user and action, such as GSuite logs where we use a String Builder to construct an attribute containing 'Actor %{usr.email} performed an event %{evt.name}'.
Another example is reconstructing an url, making it easier to navigate to an external application.


## Setup

Define the string builder processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="String builder processor" style="width:80%;">}}

With the following log, use the template `Request %{http.method} %{http.url} was answered with response %{http.status_code}` to returns a result. For example:


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

Returns the following:

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Note**: `http` is an object and cannot be used in a block (`%{http}` fails), whereas `%{http.method}`, `%{http.status_code}`, or `%{http.url}` returns the corresponding value. Blocks can be used on arrays of values or on a specific attribute within an array.

* For example, adding the block `%{array_ids}` returns:

   ```text
   123,456,789
   ```

* `%{array_users}` does not return anything because it is a list of objects. However, `%{array_users.first_name}` returns a list of `first_name`s contained in the array:

  ```text
  John,Jack
  ```

## Before and after state of logs

{{% collapse-content title="Example: Constructing a readable message with the String Builder Processor" level="h4" %}}

**Before:**

```json
{
  "usr": {
    "email": "alice@example.com"
  },
  "evt": {
    "name": "file_deleted"
  },
  "file": {
    "id": "abc123"
  }
}
```

**String Builder Processor**

We create a String Builder Processor to generate a more readable summary message.


**After processing:**

```json
{
  "usr": {
    "email": "alice@example.com"
  },
  "evt": {
    "name": "file_deleted"
  },
  "file": {
    "id": "abc123"
  },
  "summary": "Actor alice@example.com performed event file_deleted on file abc123"
}
```

This makes it much easier to filter, search, and display user-facing audit messages in dashboards or workflows.

{{% /collapse-content %}}


## API

Use the [Datadog Log Pipeline API endpoint][2] with the following string builder processor JSON payload:

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

| Parameter            | Type    | Required | Description                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the processor.                                                                                                                            |
| `name`               | String  | No       | Name of the processor.                                                                                                                            |
| `is_enabled`         | Boolean | No       | If the processor is enabled or not, defaults to `false`.                                                                                          |
| `template`           | String  | Yes      | A formula with one or more attributes and raw text.                                                                                               |
| `target`             | String  | Yes      | The name of the attribute that contains the result of the template.                                                                               |
| `is_replace_missing` | Boolean | No       | If `true`, it replaces all missing attributes of `template` by an empty string. If `false`, skips the operation for missing attributes. Default: `false`. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /api/v1/logs-pipelines/

