<!--
Requirements for Ruby profiler.
-->

The Datadog Profiler requires Ruby 2.5+ (Ruby 3.2.3+ or later is recommended). JRuby and TruffleRuby are not supported.

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

You also need either the [`pkg-config`][1] or the [`pkgconf`][2] system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- The `pkg-config` package is available for [Homebrew][3], and [Debian][4]- and [Ubuntu][5]-based Linux
- The `pkgconf` package is available for [Arch][6]- and [Alpine][7]-based Linux
- The `pkgconf-pkg-config` package is available for [Fedora][8]- and [Red-Hat][9]-based Linux

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda. Additionally, [Single Step APM Instrumentation][10] cannot be used to set up the Ruby Profiler.

[1]: https://www.freedesktop.org/wiki/Software/pkg-config/
[2]: https://github.com/pkgconf/pkgconf
[3]: https://formulae.brew.sh/formula/pkgconf
[4]: https://packages.debian.org/search?keywords=pkg-config
[5]: https://packages.ubuntu.com/search?keywords=pkg-config
[6]: https://archlinux.org/packages/?q=pkgconf
[7]: https://pkgs.alpinelinux.org/packages?name=pkgconf
[8]: https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config
[9]: https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config
[10]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
