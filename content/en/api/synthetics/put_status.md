---
title: Start or pause a test
type: apicontent
order: 31.2
external_redirect: /api/#status-test
---

## Start or pause a test

Use this method to start or pause an existing Synthetics test.

**ARGUMENTS**:

*   **`new_status`** - _required_ - A key-value pair where you define whether you want to start or pause a test. Valid values are `live` and `paused`. Returns `true` if the status has been changed, and `false` if the status has stayed the same.
