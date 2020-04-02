---
title: Grant permission
type: apicontent
order: 37.08
external_redirect: /api/#grant-permission
---

## Grant permission

Adds a permission to a role.

**PAYLOAD**:

* `data["type"]="permissions"`
* `data["id"]`: The permission ID to add to the role.
* `data["scope"]`: *optional* - The scope to grant permission to with the following format: `"<SCOPE_NAME>": ["<SCOPE_VALUES>"]`
    Certain permissions can be granted within a limited scope. This can be done manually from the Datadog application in [the Pipelines Page][1], or programmatically via this API if the correct "scope" is added in the payload. The following permissions can be granted within a limited scope:

    - `logs_read_index_data`: Grant read on only certain log indexes.
        - `<SCOPE_NAME>`: `indexes`
        - `<SCOPE_VALUES>`: List of index names (string).
    - `logs_write_exclusion_filters`: Grant update on the exclusion filters for only certain indexes.
        - `<SCOPE_NAME>`: `indexes`
        - `<SCOPE_VALUES>`: List of index names (string).
    - `logs_write_processors`: Grant update on only the processors of certain pipelines.
        - `<SCOPE_NAME>`: `pipelines`
        - `<SCOPE_VALUES>`: list of processing pipeline ids (string).

    For example:

    - To grant read access only on two indexes named `main` and `support` to a role named `support`, your scope payload would look like this: `"scope": {"indexes": ["main","support"]}`

    - To grant write access to only two processing pipelines whose IDs are `abcd-1234` and `bcde-2345` respectively, your scope payload would look like this: `"scope": {"pipelines": ["abcd-1234","bcde-2345"]}`
[1]: https://app.datadoghq.com/logs/pipelines
