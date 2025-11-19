---
title: Upgrade Your Filter Queries to the New Search Syntax
description: Learn how to update your Observability Pipelines filter queries to use the new search syntax.
aliases:
    - /observability_pipelines/guide/upgrade_to_the_new_search_syntax/
disable_toc: false
further_reading:
- link: "/observability_pipelines/search_syntax/"
  tag: "Documentation"
  text: "Learn more about Observability Pipelines search syntax"
---

## Overview

Worker versions 2.11 and newer use an updated search syntax. This document covers the following:

- [How to upgrade existing queries to the new syntax](#how-to-upgrade-to-the-new-search-syntax)
- [What's new in the updated search syntax](#whats-new-in-the-updated-search-syntax)

## How to upgrade queries to the new search syntax

See the steps based on whether you:

- [Created the pipeline in the UI](#created-the-pipeline-in-the-ui)
- [Created the pipeline using the API or Terraform](#created-the-pipeline-using-the-api-or-terraform)

### Created the pipeline in the UI

If you created your pipeline in the UI:

1. [Upgrade to Observability Pipelines Worker][1] version 2.11.
1. Navigate to the [Pipeline page][2] for that pipeline and update your filter queries to the new syntax. See the [What's new in the updated search syntax](#whats-new-in-the-updated-search-syntax) section for more information.
1. On the pipeline editor page, by default **Legacy Search Syntax** is enabled because your pipeline is running the search syntax of Worker 2.10 or older.
{{< img src="observability_pipelines/guide/legacy_search_syntax_toggle.png" alt="The pipelines editor showing the legacy search toggle enabled" style="width:85%;" >}}
1. After you've updated all queries in that pipeline, toggle the switch to **New Search Syntax** and deploy your pipeline.

### Created the pipeline using the API or Terraform

If your pipeline was created using the public API or Terraform:
- Within the same request that you make to update your pipeline queries to the new search syntax, set `use_legacy_search_syntax` to `false`.

<div class="alert alert-warning">You <b>must</b> set <code>use_legacy_search_syntax</code> to <code>false</code> when you update your queries. If <code>use_legacy_search_syntax</code> is unpopulated, it defaults to <code>true</code> in the Worker.</div>

## What's new in the updated search syntax

The following table lists the differences between the legacy and new search syntax:

| Legacy syntax | New syntax                        |
| ------------- | ------------------------------- |
| Requires the `@` symbol for attribute search, except when referencing [reserved fields](#legacy-syntax-reserved-fields). | Does not require the `@` symbol for attribute search. |
| Since `@` indicates an attribute search, tag searches do not include an `@`, and are matched under the attributes `tags` and `ddtags`.<br><br>Attribute search queries without an `@` symbol are matched against the `tags` or `ddtags` array.<br><br>Example attribute search syntax: `env:prod` | Tags syntax must be explicitly entered.<br><br>Inspect your data with [Live capture][5] to determine which fields to match.<br><br>Example attribute search syntax: `tags:"env:prod" OR ddtags:"env:prod"`  |
| [Reserved fields](#legacy-syntax-reserved-fields) do not require the `@` symbol. | Reserved fields do not require the `@` symbol. |

**Note**: The upgraded search syntax does not require the `@` symbol for attribute searches. You do not need to remove the `@` symbol from existing filter queries, but Datadog recommends that you remove the `@` symbol from your queries.

The following examples show matched logs, along with the legacy syntax and new syntax that matches the logs.

`{"user": "firstname.lastname"}`
: **Legacy syntax**: `@user:firstname.lastname`
: **New syntax**: `user:firstname.lastname`
: **Difference**: The new syntax does not require the `@` symbol for attribute search.

`{"message": {"log_level": "ERROR"}}`
: **Legacy syntax**: `@message.log_level:ERROR`
: **New syntax**: `message.log_level:ERROR`
: **Difference**: The new syntax does not require the `@` symbol for attribute search.

`{"status": "INFO"}`
: **Legacy syntax**: `status:INFO`
: **New syntax**: `status:INFO`
: **Difference**: No changes because `status` was previously a [reserved field](#legacy-syntax-reserved-fields) that could be filtered without using the `@` symbol. The new syntax does not use the `@` symbol for attribute searches.

`{"message": "Hello, world" }`<br>`{"message: "hello world"}`<br>`{"message": "Hello-world"}`
: **Legacy syntax**: `message:"hello world"`
: **New syntax**: `message:"hello world"`
: **Difference**: There are no changes between the legacy and new syntax because `message` was a reserved field in the legacy search syntax and didn't require the `@` symbol. The new syntax does not use the `@` symbol for attribute searches.

`{"message": "hEllo world"}`
: **Legacy syntax**: `HELLO OR hello OR Hello`
: **New syntax**: `hello`
: **Difference**: With the new syntax, [free text search][4] is case insensitive.

`{"user": "name"}`
: **Legacy syntax**: `@user:(name OR Name OR nAme)`
: **New syntax**: `user:(name OR Name or nAme)`
: **Difference**: With the new syntax, [attribute search][4] is case sensitive and the `@` symbol is not required for attribute search.

`{"tags": ["env:prod"] }`<br>`{"ddtags": ["env:prod"] }`
: **Legacy syntax**: `env:prod`
: **New syntax**: `tags:"env:prod" OR ddtags:"env:prod"`
: **Difference**: With the legacy syntax, when the syntax does not contain the `@` symbol and is not searching for a reserved field, all terms are matched with the `tags` or `ddtags` field. With the new search syntax, there are no reserved fields so all searches must be entered explicitly.

`{"tags": ["message.log_level:INFO"] }`<br>`{"ddtags": ["message.log_level:INFO"]}}`
: **Legacy syntax**: `message.log_level:INFO`
: **New syntax**: `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **Difference**: Same reason as the previous query for `env:prod` query.

`{"source": "postgres" }`<br>`{"ddsource":"postgres" }`
: **Legacy syntax**: `source:postgres`
: **New syntax**: `source:postgres OR ddsource:postgres`
: **Difference**: With the legacy syntax, attribute search with `source` field matches both `source` and `ddsource` fields. The new syntax no longer does this so you must enter `source` or `ddsource` explicitly.

**Note**: Using wildcards for field names in attribute search is not supported for either the legacy or new syntax. For example, the following wildcard usage does not work:

- Legacy syntax: `*:something`
- New syntax: `*:something`

### Legacy syntax reserved fields

For the legacy syntax, these are the reserved fields:

* host
* source
* status
* service
* trace_id
* message
* timestamp
* tags

See [Reserved attributes][3] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /observability_pipelines/search_syntax/#attribute-search
[5]: /observability_pipelines/live_capture/
