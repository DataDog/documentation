---
title: Custom Mapping Configuration Format
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

When you add a Remap OCSF processor with custom mapping, you can import your own OCSF mapping configuration. This document explains how to format your custom mapping file for the processor so that the processor can convert the events into OCSF format.

## Mapping descriptor

Your custom mapping file must be in the mapping descriptor format and can be in JSON or YAML. Out-of-the-box mappings use the filename `mapping.yaml`.

The following is an example of the mapping descriptor:

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

The mapping descriptor has four main sections:

| Name       | Required  | Description                                                                                                           |
|------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `version`    | Yes       | Must be set to `1` to indicate the mapping descriptor format version.                                                 |
| `metadata`   | Yes       | Contains a set of hard-coded description fields about the event class. See [Metadata section](#metadata-section) for details.                         |
| `preprocess` | No        | An ordered list of preprocessing steps. The preprocessors reformat raw data from the sources so that the data can be converted to OCSF format based on `mapping`. Each preprocessor entry consists of a `function` and parameters associated with that function. See [Preprocessors](#preprocess-section) for more information. |
| `mapping`    | Yes       | An ordered list of field-to-field assignments, where a `source` field is assigned to a `dest` field in the output OCSF event. Each [mapping](#mapping-section) may have a `conversion` specified by a [lookup table](#mapping-lookup-tables) or post-processing [mapping function](#mapping-functions). |

### Metadata section

The metadata section requires the following:

| Name     | Required | Description                                                                                     |
|----------|----------|-------------------------------------------------------------------------------------------------|
| `version`  | Yes      | The target OCSF schema version.                                                                 |
| `class`    | Yes      | The name of the OCSF event class. The event class ID, category name, and category ID are derived from this. |
| `profiles` | Yes      | An array of profile names that are added to the event class schema.                             |

### Preprocess section

The `preprocess` section lists the preprocessors that reformat the data to enable field-to-field mappings. Each entry in this section consists of a `function` and the parameters associated with that function.

#### `parse_csv`

The `parse_csv` preprocessor:

1. Extracts data in the `source` field.
1. Parses `source` as CSV and maps the values to the `columns` listed.
1. Inserts the mapped data in the `dest` field.

Columns with a `null` value are dropped. One of the columns can have a wildcard (`*`), where the column with the wildcard is assigned a string containing all of the remaining field values that have not been mapped.

The following is an example of a `preprocess` section:

{{< tabs >}}
{{% tab "YAML example" %}}

```yaml
preprocess:
- function: parse_csv
  source: message
  dest: .
  skip_empty: true
  columns:
  - null
  - receive_time
  - serial
  - type
  - subtype
  - null
  - wildcard*
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

In the example above, the preprocessor expects an input of an array with seven or more elements. Since the first and sixth `columns` are `null`, the corresponding elements in the array are dropped. The other six array elements are mapped to:
- `receive_time`
- `serial`
- `type`
- `subtype`
- `time_generated`
- `wildcard`, which is set to the remaining columns of the array.

For example, if the source log contains the following:

```
 { "message": "a,b,c,d,e,f,g,h,i,j,k" }
```

The preprocessor would reformat the data in JSON to:

```json
{
  "receive_time": "b",
  "serial": "c",
  "type": "d",
  "subtype": "e",
  "wildcard": "g,h,i,j",
  "time_generated": "k"
}
```

### Mapping section

The `mapping` section is an ordered list of field-to-field assignments. Each mapping entry consists of a `dest` path that refers to the destination field in the OCSF event, and either a `source` path that refers to a field in the source event, or a `value` that contains a literal constant to insert at that destination.

A `source` path starting with `OCSF.` refers to a field in the output OCSF event that has been previously assigned.

Use the `default` value if the source path may not exist before processing is done. The mapping may also optionally specify a `function` to and/or a [lookup table](#mapping-lookup-tables).

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

If the source contains the following:

```json
{
  "authenticationContext": {
    "issuer": {
      "id": "something"
    }
  }
}
```

Then based on the example `mapping` above, the data is converted to the mapping part of the OCSF output as:

```json
{
  "activity_id": 1,
  "activity_name": "Create",
  "actor": {
    "session": {
      "issuer": "something"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Implicit mappings

All enumerated name or label fields identified in the OCSF schema are converted to their sibling `id` field. For example, the string field `severity` is automatically converted to the numeric OSCF field `severity_id` based on the values defined in the OCSF schema. See `severity_id` in [Authentication][1] for the OCSF values. If no matching value is found in the lookup table, the `id` field is set to `99` to represent `Other`.

If one of the listed `profiles` in the metadata section is `datetime`, the mapping
automatically has all numeric timestamps identified in the OCSF schema converted into the sibling field `{DEST}_dt`. For example, the numeric `time` field is converted into `time_dt`, which contains a string representation of that timestamp. No additional work is required to support the `datetime` profile.

### Mapping lookup tables

A lookup table is a series of values that is compared against the source column, along with the
resulting `value` that should be used if the comparison succeeds. The comparison can be one of the following operations:

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

### Mapping functions

A function applies an operation to the value extracted from the source, before assigning the extracted value to the destination.

#### `concat_arrays`

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

The `reshape_array` function extracts data from a source array to create a new array of values. The function filters array elements, selecting only those that contain a field that matches a condition from the [Mapping lookup tables](#mapping-lookup-tables), and extracts the corresponding field value into the output array. For example, if an array contains `[{"a":1},{"a":2}]`, then you can extract field `a` to get the resulting array: `[1,2]`.

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

[1]: https://schema.ocsf.io/1.3.0/classes/authentication?extensions=
