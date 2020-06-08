---
title: Ruby Compatibility Requirements
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
kind: documentation
description: 'Compatibility Requirements for the Ruby tracer'
further_reading:
    - link: 'tracing/setup/ruby'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

**Supported Ruby interpreters**:

| Type  | Documentation              | Version | Support type                         | Gem version support |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 2.7     | Full                                 | Latest              |
|       |                            | 2.6     | Full                                 | Latest              |
|       |                            | 2.5     | Full                                 | Latest              |
|       |                            | 2.4     | Full                                 | Latest              |
|       |                            | 2.3     | Full                                 | Latest              |
|       |                            | 2.2     | Full                                 | Latest              |
|       |                            | 2.1     | Full                                 | Latest              |
|       |                            | 2.0     | Full                                 | Latest              |
|       |                            | 1.9.3   | Maintenance (until August 6th, 2020) | < 0.27.0            |
|       |                            | 1.9.1   | Maintenance (until August 6th, 2020) | < 0.27.0            |
| JRuby | http://jruby.org/          | 9.2.0.0 | Alpha                                | Latest              |

**Supported web servers**:

| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

**Supported tracing frameworks**:

| Type        | Documentation                                   | Version               | Gem version support |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (w/ Ruby 2.1+) | >= 0.16.0           |

*Full* support indicates all tracer features are available.

*Deprecated* indicates support will transition to *Maintenance* in a future release.

*Maintenance* indicates only critical bugfixes are backported until EOL.

*EOL* indicates support is no longer provided.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
