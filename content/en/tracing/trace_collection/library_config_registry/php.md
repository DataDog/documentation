---
title: Configuring the PHP Tracing Library
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: "Blog"
  text: "PHP monitoring with Datadog APM and distributed tracing"
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Source Code"
  text: "Source code"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Documentation"
  text: "Advanced Usage"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OpenTelemetry Environment Variable Configurations"
---

This is the new page with registry configurations
-> Backport everything needed from the current one.

## All registry configurations

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /tracing/trace_collection/proxy_setup/?tab=nginx
[4]: /profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
[11]: /tracing/trace_collection/trace_context_propagation/
[13]: /agent/configuration/network/#configure-ports
[14]: /tracing/guide/trace-php-cli-scripts/#long-running-cli-scripts
[15]: /tracing/guide/trace-php-cli-scripts/
[16]: /tracing/configure_data_security#telemetry-collection
[17]: /tracing/other_telemetry/connect_logs_and_traces/php
[18]: /tracing/trace_collection/otel_instrumentation/php/
[19]: /tracing/trace_collection/compatibility/php/
[20]: /opentelemetry/interoperability/environment_variable_support
[21]: /tracing/trace_collection/library_config/#traces
[22]: https://www.w3.org/TR/baggage/
