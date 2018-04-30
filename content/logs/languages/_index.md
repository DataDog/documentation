---
title: Log Collection Languages
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your favorite languages."
---

## How to get the most of your application logs

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type and of course the stack trace itself.

{{< img src="logs/languages/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" popup="true" >}}

To enable those functionalities use the following attribute names:

* `logger.name`: Name of the logger
* `logger.thread_name`: Name of the current thread
* `error.stack`: Actual stack trace
* `error.message`: Error message contained in the stack trace
* `error.kind`: The type or "kind" of an error (i.e "Exception", "OSError", ...)

**Note**: By default, [integration pipelines][1] attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

## Send your application logs in JSON

For integration frameworks, we provide guidelines on how to log in JSON into a file. JSON-formatted logging helps handle multiline application logs, and is automatically parsed by Datadog.

{{< whatsnext desc="Select your framework in the list below:" >}}
    {{< nextlink href="/logs/languages/csharp" >}}Csharp{{< /nextlink >}}
    {{< nextlink href="/logs/languages/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/logs/languages/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/logs/languages/nodejs" >}}Nodejs{{< /nextlink >}}
    {{< nextlink href="/logs/languages/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/logs/languages/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/logs/languages/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /logs/processing
