---
title: Custom Configurations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

You can import your own OCSF mapping when you add a custom mapping to the Remap OCSF processor. This document explains how to format your custom mapping for the processor.

## Mapping descriptor

The mapping descriptor tells the processor how to convert events into OCSF format. The mapping can be in either JSON or YAML format. Out-of-the-box mappings use the filename `mapping.yaml`.

The mapping descriptor has four sections:

| Name       | Required  | Description                                                                                                           |
|------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `version`    | Yes       | Must be set to `1` to indicate the mapping descriptor format version.                                                 |
| `metadata`   | Yes       | Contains a set of hard-coded description fields about the event class.                                                |
| `preprocess` | No        | Lists an ordered series of preprocessing steps. The preprocessors rework the data to allow the field-to-field mappings. Each entry is an object consisting of a `function` name (required) and parameters associated with that function. See [Preprocessors](#preprocessors) for more information. |
| `mapping`    | Yes       | Lists an ordered series of field-to-field assignments, where a `source` field is assigned to a `dest` field in the output OCSF event. See [Mapping](#mapping) for more information. Each mapping may have a `conversion` specified by a `lookup` table or post-processing `function`. See [Mapping lookup tables](#mapping-lookup-tables) and [Mapping functions](#mapping-functions) for more information. |

### Metadata section

The metadata section requires the following:

| Name     | Required | Description                                                                                     |
|----------|----------|-------------------------------------------------------------------------------------------------|
| version  | Yes      | The target OCSF schema version.                                                                 |
| class    | Yes      | The name of the OCSF event class. The event class ID, category name, and category ID are derived from this. |
| profiles | Yes      | An array of profile names that are added to the event class schema.                             |


{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
version: 1
metadata:
  version: 1.1.0
  class: Network Activity
  profiles: [container, host, security_control]
preprocess: []
mapping: []

```
{{% /tab %}}
{{% tab "JSON example" %}}

```json
{
  "version": 1,
  "metadata": {
    "version": "1.1.0",
    "class": "Network Activity",
    "profiles": ["container", "host", "security_control"]
  },
  "preprocess": [],
  "mapping": []
}
```

{{% /tab %}}
{{< /tabs >}}


### Preprocessors

Preprocessors rework the data to allow field-to-field mappings. Each entry in the `preprocess` section is an object consisting of a `function` name (required) and parameters associated with that function.

#### `parse_csv`

The `parse_csv` preprocessor:

1. Extracts a `source` field.
1. Parses `source` as CSV, maps the array of values to an object based on a list of field names in `columns`.
1. Inserts it at `dest`.

Fields with a corresponding `null` column name are dropped. One of the field names may have a wildcard `*` in which case it is assigned a string containing all the text from the fields that remain after those before and after have been mapped.

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
preprocess:
- function: parse_csv
  source: message
  dest: .
  skip_empty: true
  - null
  - receive_time
  - serial
  - type
  - subtype
  - null
  - 'wildcard*'
  - time_generated
```

{{% /tab %}}

{{% tab "JSON example" %}}

```json
{
  "preprocess": [
    {
      "function": "parse_csv",
      "source": "message",
      "dest": ".",
      "skip_empty": true,
      "columns": [
        null,
        "receive_time",
        "serial",
        "type",
        "subtype",
        null,
        "wildcard*",
        "time_generated"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}


In the examples above, the preprocessor expects an array object with seven or more columns. Since the first and sixth columns are `null`, they are dropped. The other six columns are mapped to:
- `receive_time`
- `serial`
- `type`
- `subtype`
- `time_generated`
- `wildcard`, which is set to the remaining columns of the array.

### Mapping

Each mapping entry consists of a `dest` path naming the destination field in the OCSF event and either a `source` path that names a field in the source event or a `value` that contains a literal constant to insert at that destination.

A `source` path starting with `OCSF.` names a field in the output OCSF event that has been previously assigned.

A `default` value may be named which is then used if the source paths do not exist before any further processing is done. The mapping may optionally also name a `function` to and/or a `lookup` table as described below.

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
mapping:
- dest: activity_name
  value: Create
- dest: actor.session.issuer
  source: authenticationContext.issuer.id
  default: Unknown
```

{{% /tab %}}
{{% tab "JSON example" %}}

```json
{
  "mapping": [
    {
      "dest": "activity_name",
      "value": "Create"
    },
    {
      "dest": "actor.session.issuer",
      "source": "authenticationContext.issuer.id",
      "default": "Unknown"
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

#### Implicit mappings

All enumerated name or label fields identified in the OCSF schema are converted to their sibling `id` field. For example, the string field `severity` is automatically converted to the numeric field `severity_id` based on the standard enum value table defined in the OCSF schema. If no matching value is found in the lookup table, the `id` field is set to `99` to represent `Other`.

If one of the listed `profiles` in the metadata section is `datetime`, the mapping
automatically has all numeric timestamps identified in the OCSF schema converted into the sibling field `{DEST}_dt`. For example, the numeric `time` field is converted into `time_dt`, which contains a string representation of that timestamp. No additional work is required to support the `datetime` profile.

### Mapping lookup tables

A lookup table names a series of values to compare against the source column, along with the
resulting `value` that should be used if the comparison succeeds. The comparison value is specified as one of the following operations:

| Name            | Description                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------------|
| `contains: S`   | Matches if `value` is a string and contains `S`, which must also be a string.                   |
| `equals: V`     | Matches if `value` is exactly the same as `V` including type.                                   |
| `equals_source: P` | Matches if `value` is exactly the same as the field at `P`.                                  |
| `matches: R`    | Matches if `value` is a string that matches the regular expression `R`.                        |
| `not_matches: R`| Matches if `matches` above does not.                                                            |

The table may also include a `default` value to be used if none of the comparisons succeed. If a `default` is not configured and none of the values match, the source value is passed through as is.

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
mapping:
- dest: src_endpoint.os.type
  source: client.userAgent.os
  lookup:
    table:
    - contains: Windows
      value: Windows
    - equals: Linux
      value: Linux
    - matches: "^[Mm]ac *OS"
      value: macOS
    default: Unknown
- dest: activity_name
  source: createdDateTime
  lookup:
    table:
    - equals_source: lastUpdatedDateTime
      value: Create
    default: Update
```

{{% /tab %}}
{{% tab "JSON example" %}}

```json
{
  "mapping": [
    {
      "dest": "src_endpoint.os.type",
      "source": "client.userAgent.os",
      "lookup": {
        "table": [
          {
            "contains": "Windows",
            "value": "Windows"
          },
          {
            "equals": "Linux",
            "value": "Linux"
          },
          {
            "matches": "^[Mm]ac *OS",
            "value": "macOS"
          }
        ],
        "default": "Unknown"
      }
    },
    {
      "dest": "activity_name",
      "source": "createdDateTime",
      "lookup": {
        "table": [
          {
            "equals_source": "lastUpdatedDateTime",
            "value": "Create"
          }
        ],
        "default": "Update"
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Mapping Functions

A function applies an operation to the value extracted from the source, before assigning to the destination.

### `concat_arrays`

The `concat_arrays` function looks up a second `source` and, if it exists, concatenates it to the original source data. If a source is not an array, the source is converted into an array with a single element. The result is always an array.

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
- dest: metadata.labels
  source: systemTags
  function:
    name: concat_arrays
    source: customTags
```

{{% /tab %}}
{{% tab "JSON example" %}}

```json
{
  "dest": "metadata.labels",
  "source": "systemTags",
  "function": {
    "name": "concat_arrays",
    "source": "customTags"
  }
}
```

{{% /tab %}}
{{< /tabs >}}


### `reshape_array`

The `reshape_array` function extracts data from a source array to create a new array of values. In particular, the function filters only array elements containing a named field matching a condition from the list in [Mapping Lookup Tables](#mapping-lookup-tables), and extracts another field into the output array.

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
mapping:
- dest: privileges
  source: protoPayload.metadata.event[0].parameter
  function:
    name: reshape_array
    filter:
      field: name
      equals: PRIVILEGE_NAME
    extract: value

```yaml
mapping:
- dest: privileges
  source: protoPayload.metadata.event[0].parameter
  function:
    name: reshape_array
    filter:
      field: name
      equals: PRIVILEGE_NAME
    extract: value
```

{{% /tab %}}
{{% tab "JSON example" %}}

```json
{
  "mapping": [
    {
      "dest": "privileges",
      "source": "protoPayload.metadata.event[0].parameter",
      "function": {
        "name": "reshape_array",
        "filter": {
          "field": "name",
          "equals": "PRIVILEGE_NAME"
        },
        "extract": "value"
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}