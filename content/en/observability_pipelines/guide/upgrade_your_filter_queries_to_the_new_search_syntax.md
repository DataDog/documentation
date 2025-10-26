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

Worker versions 2.11 and newer use an updated search syntax. To upgrade to the new search syntax, install Worker version 2.11 or later and update your filter queries to the new syntax. This document goes over:

- [How to upgrade to the new syntax](#how-to-upgrade-to-new-search-syntax)
- [What's new in the updated search syntax](#whats-new-in-the-updated-search-syntax--whats-new-in-the-updated-search-syntax)

## How to upgrade to new search syntax

See the steps based on whether you:

- [Created the pipeline in the Pipeline UI](#created-the-pipeline-in-pipeline-ui)
- [Created the pipeline using the API or Terraform](#created-the-pipeline-using-the-api-or-terraform)

### Created the pipeline in Pipeline UI

If you created your pipeline using the Pipeline UI:

1. [Upgrade to Observability Pipelines Worker][1] version 2.11.
1. Navigate to the [Pipeline UI][2] for that pipeline and update your filter queries to the new syntax. See the [What's new in the updated search syntax](#whats-new-in-the-updated-search-syntax--whats-new-in-the-updated-search-syntax) section for more information.
1. By default the `Use legacy search syntax` box is checked because your pipeline is still running with the old search syntax
{{< img src="observability_pipelines/guide/legacy_search_checkbox.png" alt="The pipelines editor showing the legacy search checkbox selected" style="width:100%;" >}}
1. After you've updated all your queries in that pipeline, uncheck the `Use legacy search syntax` box and deploy your pipeline

### Created the pipeline using the API or Terraform

If your pipeline was created using the public API or Terraform:
- Within the same request that you make to update your pipeline queries to the new search syntax, set `use_legacy_search_syntax` to false.
- **Note**: You **must** set `use_legacy_search_syntax` to `false` while updating your queries because if `use_legacy_search_syntax` is left unpopulated, it defaults to `true` in the Worker.


## What's new in the updated search syntax

The following table lists the what has been updated with the search syntax:

| Legacy syntax | New syntax                        |
| ------------- | ------------------------------- |
| Must use the `@` for attribute search, except for [reserved fields](#). | Do not need to use `@` for attribute search. **Note**: The `@` symbol in queries gets stripped to preserve backwards compatibility. |
| Since `@` indicates an attribute search, tag searches do not include an `@` so are matched under the attributes `tags` and `ddtags`.<br><br>Attribute search queries without an `@` symbol are matched against the `tags` or `ddtags` array.<br><br>Example attribute search syntax: `env:prod` | Tags syntax must be explicitly entered.<br><br>Inspect your data with Live Capture to determine which fields to match against.<br><br>Example attribute search syntax: `tags:"env:prod" OR ddtags:"env:prod"`  |
| [Reserved fields](#legacy-syntax-reserved-fields) do not need the `@` symbol. | Reserved fields do not need the `@` symbol. |

**Note**: The upgraded search syntax does not need the `@` symbol for attribute searches. While you do not need to remove the `@` symbol from filter queries that were previously using them, Datadog recommends that you remove the `@` symbol.

The following examples show a matched log along with the legacy syntax and new syntax that matches the log, a description of the differences.

`{"user": "user.one"}`
: **Legacy syntax**: `@user:user.once`
: **New syntax**: `user:user.one`
: **Difference**: The `@` symbol is no longer required for attribute search.

`{"status": "INFO"}`
: **Legacy syntax**: `status:INFO`
: **New syntax**: `status:INFO`
: **Difference**: No changes because `status` was previously a reserved field that could be filtered without using the `@` symbol.

`{"tags": ["env:prod"] }` `{"ddtags": ["env:prod"] }`
: **Legacy syntax**: `env:prod`
: **New syntax**: `tags:"env:prod" OR ddtags:"env:prod"`
: **Difference**: With the old syntax, when the syntax does not contain the `@` symbol and is not searching for a reserved field, all terms were matched with the `tags` or `ddtags` field. With the new search syntax, there are no reserved fields so all searches must be entered explicitly.

`{"tags": ["message.log_level:INFO"] }` `{"ddtags": ["message.log_level:INFO"]}`
: **Legacy syntax**: `message.log_level:INFO`
: **New syntax**: `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **Difference**: Same reason as the previous query for `env:prod` query.

`{"source": "postgres" }` `{"ddsource":"postgres" }`
: **Legacy syntax**: `source:postgres`
: **New syntax**: `source:postgres OR ddsource:postgres`
: **Difference**: With the old syntax, attribute search with `source` field would match both `source` and `ddsource` fields. The new syntax no longer does this so you must enter `source` or `ddsource` explicitly.

`{"message": "Hello, world" }` `{"message: "hello world"}` `{"message": "Hello-world"}`
: **Legacy syntax**: `message:"hello world"`
: **New syntax**: `message:"hello world"`
: **Difference**: There are no changes between the legacy and new syntax because `message` was a reserved field in the old search syntax and didn't require the `@` symbol.

`{"message": {"log_level": "ERROR"}}`
: **Legacy syntax**: `@message.log_level:ERROR`
: **New syntax**: `message.log_level:ERROR`
: **Difference**: With the new syntax, the `@` symbol is not required for attribute search.

`{"something": ["values", "stuff"]}`
: **Legacy syntax**: @something:value*
: **New syntax**: something:value*
: **Difference**: With the new syntax, the `@` symbol not required for attribute search

`{"message": "hEllo world"}`
: **Legacy syntax**: `HELLO OR hello OR Hello`
: **New syntax**: `hello`
: **Difference**: With the new syntax, [free text search][/observability_pipelines/search_syntax/#free-text-search] is case insensitive.

`{"user": "james"}`
: **Legacy syntax**: `@user:(james OR James OR jAmes)`
: **New syntax**: `user:(james OR James or jAmes)`
: **Difference**: With the new syntax, [attribute search][/observability_pipelines/search_syntax/#attribute-search] is case sensitive and the `@` symbol is not required for attribute search.

**Note**: Using wildcards for field names in attribute search is not supported for either the legacy or new syntax. For example, the following usage of wildcard does not work:
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

[1]: /observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
