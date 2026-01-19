---
title: Attribute Remapper
description: "Remap any source attribute or tag to another target attribute or tag"
processor_type: attribute-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn about attributes and tags"
---

## Overview

The remapper processor remaps any source attribute(s) or tags to another target attribute or tag. For example, remap `user` by `firstname` to target your logs in the Log Explorer.

Constraints on the tag/attribute name are explained in the [attributes and tags documentation][1]. Some additional constraints, applied as `:` or `,`, are not allowed in the target tag/attribute name.

If the target of the remapper is an attribute, the remapper can also try to cast the value to a new type (`String`, `Integer` or `Double`). If the cast is not possible, the original type is kept.

**Note**: The decimal separator for `Double` need to be `.`.

## Use cases

The Remapper is typically used to remap an attribute from your logs to a Standard Attribute. It is primarily used for log format normalization.

## Before and after state of logs

{{% collapse-content title="Example: Remapping an attribute in custom application logs" level="h4" %}}

**Before:**

```json
{
  "network": {
    "client": {
      "ip": "192.168.1.1"
    },
    "bytes_written": 1234
  },
  "user": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "http": {
    "method": "GET",
    "url": "/api/users",
    "version": "1.1",
    "status_code": 200
  },
  "timestamp": 1696945536000
}
```

**Remapper**

We create a Remapper to remap the user.firstname attribute to a new user_name attribute, and choose to keep the source attribute.

**After processing:**

```json
{
  "network": {
    "client": {
      "ip": "192.168.1.1"
    },
    "bytes_written": 1234
  },
  "user": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "user_name": "John",
  "http": {
    "method": "GET",
    "url": "/api/users",
    "version": "1.1",
    "status_code": 200
  },
  "timestamp": 1696945536000
}
```

The Remapper adds the new user_name attribute while preserving the original user.firstname attribute.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][2] with the following Remapper JSON payload:

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Parameter              | Type             | Required | Description                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | String           | Yes      | Type of the processor.                                                         |
| `name`                 | String           | No      | Name of the processor.                                                         |
| `is_enabled`           | Boolean          | No      | If the processors is enabled or not. Default: `false`.                          |
| `source_type`          | String           | No      | Defines if the sources are from log `attribute` or `tag`. Default: `attribute`. |
| `sources`              | Array of strings | Yes      | Array of source attributes or tags                                             |
| `target`               | String           | Yes      | Final attribute or tag name to remap the sources to.                           |
| `target_type`          | String           | No      | Defines if the target is a log `attribute` or a `tag`. Default: `attribute`.    |
| `target_format`        | String           | No      | Defines if the attribute value should be cast to another type. Possible values: `auto`, `string`, or `integer`. Default: `auto`. When set to `auto`, no cast is applied.  |
| `preserve_source`      | Boolean          | No      | Remove or preserve the remapped source element. Default: `false`.               |
| `override_on_conflict` | Boolean          | No      | Override or not the target element if already set. Default: `false`.            |



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/?tab=host#attributes-and-tags
[2]: /api/v1/logs-pipelines/
