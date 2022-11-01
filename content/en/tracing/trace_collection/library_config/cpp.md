---
title: Configuring the C++ Tracing Library
kind: documentation
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Github"
  text: Source code
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].
## Environment variables

`DD_AGENT_HOST` 
: **Version**: v0.3.6 <br>
**Default**: `localhost` <br>
Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set.

`DD_TRACE_AGENT_PORT` 
: **Version**: v0.3.6 <br>
**Default**: `8126` <br>
Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set.

`DD_TRACE_AGENT_URL` 
: **Version**: v1.1.4 <br>
Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. This URL supports http, https and unix address schemes.

`DD_ENV` 
: **Version**: v1.0.0 <br>
If specified, adds the `env` tag with the specified value to all generated spans.

`DD_SERVICE` 
: **Version**: v1.1.4 <br>
If specified, sets the default service name. Otherwise, the service name must be provided via TracerOptions or JSON configuration.

`DD_TRACE_ANALYTICS_ENABLED` 
: **Version**: v1.1.3 <br>
**Default**: `false` <br>
Enable App Analytics globally for the application.

`DD_TRACE_ANALYTICS_SAMPLE_RATE` 
: **Version**: v1.1.3 <br>
Sets the App Analytics sampling rate. Overrides `DD_TRACE_ANALYTICS_ENABLED` if set. A floating point number between `0.0` and `1.0`.

`DD_TRACE_SAMPLING_RULES` 
: **Version**: v1.1.4 <br>
**Default**: `[{"sample_rate": 1.0}]` <br>
A JSON array of objects. Each object must have a "sample_rate", and the "name" and "service" fields are optional. The "sample_rate" value must be between 0.0 and 1.0 (inclusive). Rules are applied in configured order to determine the trace's sample rate.

`DD_VERSION` 
: **Version**: v1.1.4 <br>
If specified, adds the `version` tag with the specified value to all generated spans.

`DD_TAGS` 
: **Version**: v1.1.4 <br>
If specified, will add tags to all generated spans. A comma-separated list of `key:value` pairs.

`DD_PROPAGATION_STYLE_INJECT` 
: **Version**: v0.4.1 <br>
**Default**: `Datadog` <br>
Propagation style(s) to use when injecting tracing headers. `Datadog`, `B3`, or `Datadog B3`.

`DD_PROPAGATION_STYLE_EXTRACT` 
: **Version**: v0.4.1 <br>
**Default**: `Datadog` <br>
Propagation style(s) to use when extracting tracing headers. `Datadog`, `B3`, or `Datadog B3`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
