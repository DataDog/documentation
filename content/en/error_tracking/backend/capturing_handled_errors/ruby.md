---
title: Capturing Handled Exceptions In Ruby Applications
code_lang: ruby
type: multi-code-lang
code_lang_weight: 10
---

## Compatibility requirements

You must be running:
- Ruby `2.6+`. JRuby and TruffleRuby are not supported.
- dd-trace-rb `2.16.0+`.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][1]. You also need to [add the tracing library][2] directly in the application to instrument it.

### Automatic Instrumentation

You can enable automatic reporting of handled errors using the following environment variables:

- `DD_ERROR_TRACKING_HANDLED_ERRORS` to report handled errors from user code, third-party gems, or both. Accepted values are: `user`, `third_party`, `all`.
- `DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE` to provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported. Possible values are specified below.
For Ruby `v3.3+`, the location where the error was raised and where it was rescued will be matched. For earlier versions of Ruby, only the location where the error was raised can be matched.

Alternatively, you can set error tracking parameters in code with these functions, inside a `Datadog.configure` block:

- `c.error_tracking.handled_errors` to report handled errors from user code, third-party gems, or both. Accepted values are: `user,third_party,all`.
- `c.error_tracking.handled_errors_include` to provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported. Possible values are specified below.
For Ruby 3.3 or newer, the location where the error was raised and where it was rescued will be matched. For earlier versions of Ruby, only the location where the error was raised can be matched.

`DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE` comma-separated values should be either:
- A file name, such as `main`: `main.rb` will be instrumented.
- A folder name, such as `mypackage`: Every Ruby file in folders named `mypackage` will be instrumented.
- A gem name: Every Ruby file in the gem will be instrumented. Be careful, if you specify, for example `rails`, and you have a subfolder named `rails` in your project, it will also be instrumented.
- An absolute path (a path beginning with `/`), for example, `/app/lib/mypackage/main.rb`. If you provide only `/app/lib/mypackage`, every Ruby file in that folder will be instrumented.
- A path relative to the current directory (a path beginning with `./`). For example, if you execute your program in `/app/`, you can provide `./lib/mypackage/main.rb`. If you provide a path like `./lib/mypackage/`, every Ruby file in this folder will be instrumented.

[1]: /error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby
