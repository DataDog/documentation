---
title: Upgrade to Worker Version 2.11
description: Learn more about Worker version 2.11.
disable_toc: false
---

Upgrade to Worker version 2.11 to have access to the following new features.

## Features

- More than 100 out-of-the-box rules for the Sensitive Data Scanner processor have been added. These rules redact Personally Identifiable Information (PII) and access key information that focus on GDPR compliance and secrets.
- [Live Capture][1] configurations that let you:
    - Capture specific logs using a filter query
    - Apply the capture on specific workers
    - Set a time duration for how long the capture runs
    - Set the number of events to capture
- An upgraded [Search Syntax][2] that lets you:
    - Dereference arrays
    - Perform case insensitive search within log messages
    - Deterministically target log attributes without using `@` symbol
    - See [Upgrade Your Filter Queries to the New Search Syntax][3] for more information.

[1]: /observability_pipelines/configuration/live_capture/#capture-events
[2]: /observability_pipelines/search_syntax/
[3]: /observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/
