---
description: Understand how errors are grouped into issues.
kind: documentation
title: Default Grouping
---

## Overview

Error Tracking intelligently groups similar errors into issues. This grouping is based on the following error properties:

- `service`: the service where the error occurred.
- `error.type` or `error.kind`: the class of the error.
- `error.message`: a description of the error.
- `error.stack`: the file name and the function name of the top-most meaningful stack frame.

The error stack trace is the code path followed by an error between being thrown and being captured by Datadog instrumentation. Error Tracking evaluates the topmost stack frame (the *location* of the error) and uses it to group the error.

If any stack-frame properties differ for two given errors, the two errors are grouped under different issues. For example, Error Tracking does not group issues across services or error types.

**Note**: To improve grouping accuracy, Error Tracking removes variable stack-frame properties such as versions, ids, dates, and so on.