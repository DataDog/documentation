---
title: API versioning
description: Learn how date-based versioning works for Datadog API operations.
type: documentation
disable_toc: true
---

{{< beta-callout url="#" btn_hidden="true" header="false" >}}
API versioning is in beta.
{{< /beta-callout >}}

Datadog supports date-based versions for individual API operations. Date-based versioning lets you control when you adopt a change to an operation you use. You don't have to adopt every change as soon as it ships.

## How versioning works

Date-based versioning is separate from the v1 and v2 in an operation's path, which reflect the product surface an operation belongs to. Date-based versions apply within v1 and v2 operations that opt in to this system.

Each version of an operation is identified by the date it was released. If you don't specify a version, an operation uses its default version. To view the versions available for an operation, use the version selector on that operation's reference page. The selector shows the request and response schemas for each version, and the version header required to use it.

## What's a breaking change

A breaking change is a change to an operation that can break existing integrations. Breaking changes include:

- Removing or renaming an API or field
- Changing the type of a field
- Changing an existing endpoint's URL or HTTP method
- Changing the semantics of an existing API in a way that would change the behavior of existing integrations
- Adding a new required field to a request
- Removing or renaming an enum value
- Changing an existing field from optional to required, or removing a default value
- Changing HTTP status codes returned by an existing endpoint

Non-breaking, additive changes include:

- Adding a new API or field
- Adding a new optional field to a request
- Adding a new enum value
- Adding new attributes to an existing payload

Datadog releases a new version of an operation for breaking changes. Non-breaking changes don't require a new version and roll out to all existing versions.

## Specifying a version

To specify a version for an operation, pass its release date in the `DD-API-VERSION` header:

```shell
curl -X GET "https://api.datadoghq.com/api/v2/example-endpoint" \
-H "Accept: application/json" \
-H "DD-API-Version: 2026-01-01" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APPLICATION_KEY}"
```

If you don't include this header, the operation uses its default version.

## Current versions

For the full list of released versions and the changes included in each, see the [API changelog][1].

## Lifecycle policies

[1]: /api/changelog/
