---
title: Instrumenting Apache HTTP Server
code_lang: httpd
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "https://github.com/DataDog/httpd-datadog"
  tag: "Source Code"
  text: "Datadog Module for Apache HTTP Server"
aliases:
- /tracing/proxies
- /tracing/proxies/httpd
- /tracing/setup_overview/httpd/
- /tracing/setup_overview/proxy_setup/
---

Datadog provides an HTTPd [module][1] to enhance [Apache HTTP Server][2] and [IHS HTTP Server][3] capabilities with APM Tracing.

## Compatibility

Since IHS HTTP Server is essentially a wrapper of the Apache HTTP Server, the module can also be used with IHS without any modifications.

## Installation

<div class="alert alert-warning">
  <strong>Note</strong>: Only Apache HTTP Server 2.4.x for x86_64 architecture is supported.
</div>

The module is provided as a shared library for dynamic loading by HTTPd. Each supported platform
and architecture has its own artifact hosted on [httpd-datadog's repository][1].

To install the module:

1. Run the following script to download the latest version of the module:

   ```bash
   curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest \
   | grep "mod_datadog-linux-x86_64.tar.gz" \
   | cut -d : -f 2,3 \
   | tr -d \" \
   | wget -qi -
   ```

   When unpacking the tarball, the resulting file is `mod_datadog.so`, the shared library that must
   be loaded by the server.

1. Place the file in the directory where HTTPd searches for modules, typically `/usr/local/apache2/modules`.

1. Load the module by adding the following line in the configuration file:

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. To enable the module, make sure to restart or reload HTTPd.

## Configuration

By default, all requests are traced and sent to the Datadog Agent.

To change the module default behavior, use `Datadog*` directives described in the Datadog module's [API documentation][3].

For example, the following configuration sets the service name to `my-service` and the sampling rate to 10%:

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md
