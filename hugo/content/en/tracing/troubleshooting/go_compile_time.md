---
title: Troubleshooting Go Compile-Time Instrumentation
description: Debug Orchestrion build issues by preserving work trees, configuring logging, and examining transformed source files.
further_reading:
- link: "/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/"
  tag: "Documentation"
  text: "Tracing Go Applications"
---

## Overview

This guide explains how to troubleshoot builds that [Orchestrion][1] manages. These procedures can help Datadog gather insights about build processes and can assist with bug reports.

<div class="alert alert-danger">The generated files may contain sensitive project information, such as source code and dependency names. If sharing such information publicly is a concern, contact Datadog support to share the data privately.</div>

## Preserving the work tree

Orchestrion records build transformations in the `go build` work tree. To prevent the `go` toolchain from cleaning this directory after building, use the `-work` flag:

```shell
orchestrion go build -work ./...
WORK=/tmp/go-build2455442813
```

The work tree location prints at the start of the build, marked with `WORK=`. This directory contains subdirectories for each built `go` package, which are called _stage directories_.

## Work tree contents

When Orchestrion injects code into a source file, it writes the modified file to the package's stage directory (`$WORK/b###`) in the `orchestrion/src` subdirectory. For modified package import configurations, the original file is preserved with a `.original` suffix. You can inspect these human-readable files to verify Orchestrion's actions. Contact Datadog support for help interpreting these files.

## Logging configuration

### Log levels

Control Orchestrion's logging output using the `ORCHESTRION_LOG_LEVEL` environment variable or `--log-level` flag:

| Level | Description |
|-------|-------------|
| `NONE`, `OFF` (default) | No logging output |
| `ERROR` | Error information only |
| `WARN` | Errors and warnings |
| `INFO` | Errors, warnings, and informational messages |
| `DEBUG` | Detailed logging |
| `TRACE` | Extremely detailed logging |

<div class="alert alert-danger">Setting <code>ORCHESTRION_LOG_LEVEL</code> to the <code>DEBUG</code> or <code>TRACE</code> levels might have a significant impact on build performance. These settings are not recommended for normal operations.</div>

### Log file output

Write logging messages to files instead of the console by setting the `ORCHESTRION_LOG_FILE` environment variable or `--log-file` flag with the desired file path.

<div class="alert alert-info">Setting <code>ORCHESTRION_LOG_FILE</code> changes the default value of <code>ORCHESTRION_LOG_LEVEL</code> to <code>WARN</code>.</div>

The log file path can include `$PID` or `${PID}` tokens, which are replaced with the logging process's PID. This reduces file contention but creates multiple log files for large projects.

Logging appends to existing files rather than overwriting them, regardless of the presence of `$PID` in the file path.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/orchestrion
