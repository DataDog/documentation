<!--
Live Debugger Ruby enablement — included when prog_lang is ruby.
-->

Ruby requires manual configuration through environment variables.

**SDK version**: [Datadog Ruby SDK (`ddtrace`)][1] version 2.38.0 or higher is strongly recommended. The minimum SDK version is 2.37.0, but it may result in unexpected errors and a degraded experience.

**Additional requirements:**

- Ruby 2.6 or higher (MRI/CRuby only; JRuby is not supported)
- A Rack-based framework (Rails, Sinatra, or other Rack-compatible frameworks). Background workers (such as Sidekiq or Resque) are not supported.
- `RAILS_ENV` or `RACK_ENV` set to `production`

Start your service with the following environment variables set:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

**Note**: Live Debugger initializes on the first HTTP request. Your service must receive at least one request before you can create a logpoint.

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
