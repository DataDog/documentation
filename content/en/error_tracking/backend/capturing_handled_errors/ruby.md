---
title: Capturing Handled Exceptions In Ruby Applications
code_lang: ruby
type: multi-code-lang
code_lang_weight: 10
---

## Compatibility requirements

You must be running:
- Ruby `2.7+`. JRuby and TruffleRuby are not supported.
- Datadog Ruby gem (`datadog`) `v2.16.0+`.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][1]. You also need to [add the tracing library][2] directly in the application to instrument it.

### Automatic instrumentation

To enable automatic reporting of handled errors, you can set one of these two environment variables:

`DD_ERROR_TRACKING_HANDLED_ERRORS`
: To report handled errors from user code, third-party gems, or both. Accepted values are: `user`, `third_party`, `all`.

`DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`
: To provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported. Possible comma-separated values should be either:
: - **A file name**: For example, `main` to instrument the `main.rb` file.
: - **A folder name**: For example, `subdir` to instrument every Ruby file in folders named `subdir`.
: - **A gem name**: For example, `rails` to instrument every Ruby file in the `rails` gem and every Ruby file in folders named `rails`.
: - **An absolute path** (a path beginning with `/`): For example, `/app/lib/mypackage/main.rb` to instrument that file or `/app/lib/mypackage` to instrument every Ruby file in that folder.
: - **A path relative to the current directory** (a path beginning with `./`): For example, if you execute your program in `/app/`, use `./lib/mypackage/main.rb` to instrument the `main.rb` file, or `./lib/mypackage/` to instrument every Ruby file in that folder.

: For Ruby `v3.3+`, the location where the error was rescued will be matched.
: For earlier versions of Ruby, the location where the error was raised will be matched.

Alternatively, you can set either of these error tracking parameters in code, inside a `Datadog.configure` block:

- `c.error_tracking.handled_errors` to report handled errors from user code, third-party gems, or both. Accepted values are: `user,third_party,all`.
- `c.error_tracking.handled_errors_include` to provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported. Possible values are specified under `DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE` in the previous table. For Ruby `v3.3+`, the location where the error was rescued will be matched. For earlier versions of Ruby, the location where the error was raised will be matched.

```Ruby
Datadog.configure do |c|
  # To report handled errors from user code
  c.error_tracking.handled_errors = 'user'

  # Or to provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported
  c.error_tracking.handled_errors_include = ['sinatra', 'subdir']
end
```

[1]: /error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby
