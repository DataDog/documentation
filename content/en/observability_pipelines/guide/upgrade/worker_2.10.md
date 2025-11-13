---
title: Upgrade to Worker Version 2.10
description: Learn more about Worker version 2.10.
disable_toc: false
---

Upgrade to Worker version 2.10 to have access to the following new features, enhancements, and fixes.

## New features

- The [Kafka destination][1]: Send logs from Observability Pipelines to your Kafka topics.
- New and updated [Custom Processor functions][2]:
    - The `pop` function removes the last item from an array.
    - The cryptographic functions `encrypt_ip` and `decrypt_ip` for IP address encryption.
        - These functions use the IPCrypt specification and support both IPv4 and IPv6 addresses with two encryption modes:
            - aes128 (IPCrypt deterministic, 16-byte key)
            - pfx (IPCryptPfx, 32-byte key).
            - Both algorithms are format-preserving (output is a valid IP address) and deterministic.
    - The `xxhash` function implements `xxh32`, `xxh64`, `xxh3_64`, and `xxh3_128` hashing algorithms.
    - The `parse_aws_alb_log` function has an optional `strict_mode` parameter.
        - When `strict_mode` is set to `false`, the parser ignores any newly added or trailing fields in AWS ALB logs, instead of failing.
        - Defaults to `true` to preserve current behavior.

## Enhancements

- Performance enhancement for the Custom Processor.
- Workers use their own copy of the Datadog key to authenticate, disregarding any keys sent in by the Datadog Agent to prevent the use of stale keys.
- Error reporting has been improved when validating JSON schema in custom functions that use the `validate_json_schema` function.

## Fixes

- Group-level filtering logic was fixed to exclude correct logs.

[1]: /observability_pipelines/destinations/kafka/
[2]: /observability_pipelines/processors/custom_processor/#custom-functions