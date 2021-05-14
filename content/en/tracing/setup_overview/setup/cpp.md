---
title: Tracing C++ Applications
kind: documentation
aliases:
- /tracing/cpp/
- /tracing/languages/cpp/
- /agent/apm/cpp/
- /tracing/setup/cpp
- /tracing/setup_overview/cpp
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Github"
  text: Source code
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---
**Note**: C++ does not provide integrations for OOTB instrumentation, but it's used by Proxy tracing such as [Envoy][1] and [Nginx][2]. For compatibility requirements for the C++ Tracer, visit the [Compatibility Requirements][3] page.

## Getting Started

If you already have a Datadog account you can find [step-by-step instructions][4] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][5].

Compile against [OpenTracing-cpp][6].

## Installation

Datadog tracing can be enabled in one of two ways:

* Compile against dd-opentracing-cpp, where the Datadog lib is compiled in and configured in code
* Dynamic loading, where the Datadog OpenTracing library is loaded at runtime and configured via JSON

### Compile against dd-opentracing-cpp

```bash
# Gets the latest release version number from Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Download and install dd-opentracing-cpp library.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
mkdir -p dd-opentracing-cpp/.build
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
cd dd-opentracing-cpp/.build
# Download and install the correct version of opentracing-cpp, & other deps.
../scripts/install_dependencies.sh
cmake ..
make
make install
```

Include `<datadog/opentracing.h>` and create the tracer:

```cpp
// tracer_example.cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Link against `libdd_opentracing` and `libopentracing`, making sure that they are both in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

### Dynamic Loading

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
OPENTRACING_VERSION="v1.5.1"
# Download and install OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/${OPENTRACING_VERSION}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# Install dd-opentracing-cpp shared plugin.
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

Include `<opentracing/dynamic_load.h>` and load the tracer from `libdd_opentracing_plugin.so`:

```cpp
// tracer_example.cpp
#include <opentracing/dynamic_load.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  // Load the tracer library.
  std::string error_message;
  auto handle_maybe = opentracing::DynamicallyLoadTracingLibrary(
      "/usr/local/lib/libdd_opentracing_plugin.so", error_message);
  if (!handle_maybe) {
    std::cerr << "Failed to load tracer library " << error_message << "\n";
    return 1;
  }

  // Read in the tracer's configuration.
  std::string tracer_config = R"({
      "service": "dynamic-load example",
      "agent_host": "localhost",
      "agent_port": 8126
    })";

  // Construct a tracer.
  auto& tracer_factory = handle_maybe->tracer_factory();
  auto tracer_maybe = tracer_factory.MakeTracer(tracer_config.c_str(), error_message);
  if (!tracer_maybe) {
    std::cerr << "Failed to create tracer " << error_message << "\n";
    return 1;
  }
  auto& tracer = *tracer_maybe;

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Just link against `libopentracing`, making sure that `libopentracing.so` is in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++11 -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

**Note**: OpenTracing requires C++ 11 or higher.

## Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1]

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port change it by setting the below env variables:

`DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

To connect to the agent using Unix Domain Sockets, `DD_TRACE_AGENT_URL` can be used instead. The value should match the Agent's value for `DD_APM_RECEIVER_SOCKET`.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Services Extension][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

### Environment Variables


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
If specified, sets the default service name. Otherwise the service name must be provided via TracerOptions or JSON configuration.

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

[1]: /tracing/setup/envoy/
[2]: /tracing/setup/nginx/
[3]: /tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/docs
[5]: /tracing/send_traces/
[6]: https://github.com/opentracing/opentracing-cpp
