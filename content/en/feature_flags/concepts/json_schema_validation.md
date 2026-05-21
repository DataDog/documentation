---
title: JSON Schema Validation
description: Validate JSON feature flag variant values with JSON Schema in Datadog Feature Flags.
further_reading:
- link: "/feature_flags/concepts/variants_and_flag_types"
  tag: "Documentation"
  text: "Variants and Flag Types"
- link: "/feature_flags/use_cases/dynamic_configuration"
  tag: "Documentation"
  text: "Dynamic Configuration"
---

## Overview

For JSON feature flags, you can define a [JSON Schema](https://json-schema.org/overview/what-is-jsonschema) to validate variant values. After you save a schema, Datadog only allows variant values that match the schema when you create or edit variants.

## Configure JSON Schema validation

1. Navigate to your JSON flag's details page.
2. Open **Manage Implementation & Variants**.
3. Enter a valid JSON Schema object in the schema text box.
4. Click **Save**.

When creating or editing variants, you can only save values that match the schema.

## Supported JSON Schema features

The following examples show minimal schemas and valid variant values for common JSON Schema features.

### Required fields

```json
{
  "type": "object",
  "properties": {
    "headline": { "type": "string" },
    "cta_color": { "type": "string" }
  },
  "required": ["headline", "cta_color"]
}
```

Valid variant:

```json
{
  "headline": "Welcome back",
  "cta_color": "blue"
}
```

### Type validation

```json
{
  "type": "object",
  "properties": {
    "enabled": { "type": "boolean" },
    "count": { "type": "integer" },
    "rate": { "type": "number" },
    "label": { "type": "string" },
    "tags": { "type": "array" },
    "meta": { "type": "object" }
  }
}
```

### Enums and allowed values

```json
{
  "type": "object",
  "properties": {
    "theme": { "type": "string", "enum": ["light", "dark"] }
  },
  "required": ["theme"]
}
```

Valid variant:

```json
{ "theme": "dark" }
```

### Number ranges

```json
{
  "type": "object",
  "properties": {
    "discount_percent": { "type": "number", "minimum": 0, "maximum": 100 }
  }
}
```

### String validation

```json
{
  "type": "object",
  "properties": {
    "email": { "type": "string", "format": "email" },
    "id": { "type": "string", "format": "uuid" },
    "code": { "type": "string", "minLength": 3, "maxLength": 12, "pattern": "^[A-Z0-9]+$" }
  }
}
```

### Array validation

```json
{
  "type": "object",
  "properties": {
    "features": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "maxItems": 5,
      "uniqueItems": true
    }
  }
}
```

### Nested objects

```json
{
  "type": "object",
  "properties": {
    "checkout": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean" },
        "provider": { "type": "string" }
      },
      "required": ["enabled"]
    }
  }
}
```

### Default values

```json
{
  "type": "object",
  "properties": {
    "headline": { "type": "string", "default": "Hello" }
  }
}
```

### Object property rules

```json
{
  "type": "object",
  "properties": {
    "known_field": { "type": "string" }
  },
  "additionalProperties": false
}
```

### Conditional validation

```json
{
  "type": "object",
  "properties": {
    "type": { "type": "string", "enum": ["free", "paid"] },
    "seat_count": { "type": "integer" }
  },
  "if": {
    "properties": { "type": { "const": "paid" } }
  },
  "then": {
    "required": ["seat_count"]
  }
}
```

### Nullable fields

```json
{
  "type": "object",
  "properties": {
    "subtitle": { "type": ["string", "null"] }
  }
}
```

Valid variant:

```json
{ "subtitle": null }
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
