---
title: APM (Tracing) special meaning tags
kind: faq
---

When [submitting your traces](/api/#tracing) you may add attributes in the `meta` parameter. Some of them have a special meaning which lead to a dedicated display and behavior in Datadog:

* `sql.query` - *Optional*:
    Allows specific SQL stats, formating and display in Datadog UI: 

* `error.msg` - *Optional*:
    Allow dedicated display for error message.
* `error.type` - *Optional*:
    Allow dedicated display for errors, types available are:
    - ez
    - fez

* `error.stack` - *Optional*:
    Allows a better display of the Stacktrace of an exception in Datadog UI (red boxes etc....)