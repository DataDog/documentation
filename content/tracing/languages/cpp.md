---
title: Tracing C++ Applications
kind: Documentation
aliases:
- /tracing/cpp/
- /tracing/setup/cpp/
further_reading:
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=c"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---


**Note**: C++ does not provide integrations for OOTB instrumentation, but it's used by Proxy tracing such as [Envoy][1] and [Nginx][2].

## Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][3].

Compile against [OpenTracing-cpp][4].

## Compatibility

`dd-opentracing-cpp` requires C++14 to build, but if you use [dynamic loading](#dynamic-loading) then you are instead only limited by OpenTracing's requirement for [C++11 or later][5].

Supported platforms include Linux and Mac. If you need Windows support, [contact Datadog support][6].

## Installation

Datadog tracing can be enabled in one of two ways:

* Compile against dd-opentracing-cpp, where the Datadog lib is compiled in and configured in code
* Dynamic loading, where the Datadog OpenTracing library is loaded at runtime and configured via JSON

### Compile against dd-opentracing-cpp

```bash
# Download and install dd-opentracing-cpp library.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/v0.3.7.tar.gz -O dd-opentracing-cpp.tar.gz
tar zxvf dd-opentracing-cpp.tar.gz
mkdir dd-opentracing-cpp-0.3.7/.build
cd dd-opentracing-cpp-0.3.7/.build
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
g++ -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

### Dynamic Loading

```bash
# Download and install OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/v1.5.0.tar.gz -O opentracing-cpp.tar.gz
tar zxvf opentracing-cpp.tar.gz
mkdir opentracing-cpp-1.5.0/.build
cd opentracing-cpp-1.5.0/.build
cmake ..
make
make install
# Install dd-opentracing-cpp shared plugin.
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/v0.3.7/linux-amd64-libdd_opentracing_plugin.so.gz
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
    return false;
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
    return false;
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
g++ -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/proxies/envoy
[2]: /tracing/proxies/nginx
[3]: https://docs.datadoghq.com/tracing/setup
[4]: https://github.com/opentracing/opentracing-cpp
[5]: https://github.com/opentracing/opentracing-cpp/#cc98
[6]: https://docs.datadoghq.com/help
