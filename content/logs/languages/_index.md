---
title: Log Collection Languages
kind: Documentation
description: "Configure your Datadog agent to gather logs from your favorite languages."
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## How to get the most of your application logs

When logging stack traces, there are specific elements that are very important such as the logger name, the current thread, the error type and of course the stack trace itself. 

https://cl.ly/1w1b1g301Y1r

To make sure all those parameters get the special treatment they deserve, make sure that you are using the following attribute names:

* `logger.name`: Name of the logger
* `logger.thread_name`: Name of the current thread
* `error.stack`: Actual stack trace
* `error.msg`: Error message contained in the stack trace
* `error.kind`: The type or "kind" of an error (i.e "Exception", "OSError", ...)

By default, integration pipelines attempt to remap default logging library parameters to those specific values and parse stack traces or traceback to automatically extract the `error.msg` and `error.kind`.

## Send your application logs in JSON

For integration frameworks, we provide guidelines on how to log in JSON into a file. JSON-formatted logging helps handle multiline application logs, and is automatically parsed by Datadog.

{{< whatsnext desc="Select your framework in the list below:" >}}
    {{< nextlink href="/logs/languages/csharp" >}}Csharp{{< /nextlink >}}
    {{< nextlink href="/logs/languages/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/logs/languages/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/logs/languages/nodejs" >}}Nodejs{{< /nextlink >}}
    {{< nextlink href="/logs/languages/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/logs/languages/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}
