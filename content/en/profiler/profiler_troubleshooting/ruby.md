---
title: Troubleshooting the Ruby Profiler
kind: Documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Ruby 2.7.3)

## Missing profiles for Resque jobs

When profiling [Resque][4] jobs, you should set the `RUN_AT_EXIT_HOOKS` environment
variable to `1`, as described in the
[Resque documentation][5].

Without this flag, profiles for short-lived Resque jobs will be unavailable.

## Profiling does not turn on because compilation of the Ruby VM just-in-time header failed

There is a known incompatibility between Ruby 2.7 and older GCC versions (4.8 and below) that impacts the profiler ([upstream Ruby report][6], [`dd-trace-rb` bug report][7]). This can result in the following error message: "Your ddtrace installation is missing support for the Continuous Profiler because compilation of the Ruby VM just-in-time header failed. Your C compiler or Ruby VM just-in-time compiler seem to be broken."

To fix this, update your operating system or Docker image so that the GCC version is something more recent than v4.8.

For further help with this issue, [contact support][2] and include the output of running `DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install ddtrace` and the resulting `mkmf.log` file.

## Frames omitted when backtraces are very deep

The Ruby profiler truncates deep backtraces when collecting profiling data. Truncated backtraces are missing some of their caller functions, making it impossible to link them to the root call frame. As a result, truncated backtraces are grouped together under a `N frames omitted` frame.

You can increase the maximum depth with the `DD_PROFILING_MAX_FRAMES` environment variable, or in code:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 500
end
```

## Unexpected failures or errors from Ruby gems that use native extensions in `dd-trace-rb` 1.11.0+

Starting from `dd-trace-rb` 1.11.0, the "CPU Profiling 2.0" profiler gathers data by sending `SIGPROF` unix signals to Ruby applications, enabling finer-grained data gathering.

Sending `SIGPROF` is a common profiling approach, and may cause system calls from native extensions/libraries to be interrupted with a system [`EINTR` error code][8].
Rarely, native extensions or libraries called by them may have missing or incorrect error handling for the `EINTR` error code.

The following incompatibilities are known:
* Using the `mysql2` gem together with versions of `libmysqlclient` [older than 8.0.0][9]. The affected `libmysqlclient` version is known to be present on Ubuntu 18.04, but not 20.04 or later releases.
* [Using the `rugged` gem.][10]
* Using the `passenger` gem/Phusion Passenger web server [older than 6.0.19][11]

In these cases, the latest version of the profiler automatically detects the incompatibility and applies a workaround.

If you encounter failures or errors from Ruby gems that use native extensions other than those listed above, you can manually enable the "no signals" workaround, which avoids the use of `SIGPROF` signals.
To enable this workaround, set the `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` environment variable to `true`, or in code:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

**Note**: The above setting is only available starting in `dd-trace-rb` 1.12.0.

Let our team know if you find or suspect any incompatibilities [by opening a support ticket][2].
Doing this enables Datadog to add them to the auto-detection list, and to work with the gem/library authors to fix the issue.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.54.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
[8]: https://man7.org/linux/man-pages/man7/signal.7.html#:~:text=Interruption%20of%20system%20calls%20and%20library%20functions%20by%20signal%20handlers
[9]: https://bugs.mysql.com/bug.php?id=83109
[10]: https://github.com/DataDog/dd-trace-rb/issues/2721
[11]: https://github.com/DataDog/dd-trace-rb/issues/2976
