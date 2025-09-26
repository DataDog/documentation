---
title: Setting Up APM with C++
description: Learn how to set up APM and distributed tracing for C++ applications using Datadog tracing libraries and instrumentation.

further_reading:
- link: "/tracing/trace_collection/dd_libraries/cpp/"
  tag: "Documentation"
  text: "Learn more about tracing applications with C++"
---

## Overview

This guide expands on the [C++ APM docs][1] to provide step-by-step instructions on how to set up a simple C++ app with APM on your VM for troubleshooting.

## Setting up your box

### Basic environment

First, spin up a fresh `ubuntu/jammy64` Vagrant box and `ssh` into it with:

```bash
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

Next, install the agent with the [instructions in the UI][2].

### Prepping for C++

Install `g++` and `cmake` with:

```bash
sudo apt-get update
sudo apt-get -y install g++ cmake
```

Download and install `dd-trace-cpp` library with:

```bash
wget https://github.com/DataDog/dd-trace-cpp/archive/v1.0.0.tar.gz -O dd-trace-cpp.tar.gz
```

If you get a rate limited message from GitHub, wait a few minutes and run the command again.

After downloading the `tar` file, unzip it:

```bash
mkdir dd-trace-cpp
tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
```

Finally, build and install the library:

```bash
cd dd-trace-cpp
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build -j
cmake --install build
```

## Building a simple app

Create a new file called `tracer_example.cpp` and populate it with the below code:

```cpp
#include <datadog/tracer.h>
#include <datadog/span_config.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::tracing::TracerConfig tracer_config;
  tracer_config.service = "compiled-in example";

  const auto validated_config = dd::finalize_config(tracer_config);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};

  // Create some spans.
  {
    datadog::tracing::SpanConfig options;
    options.name = "A";
    options.tags.emplace("tag", "123");
    auto span_a = tracer.create_span(options);

    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

This creates a tracer that generates two spans, a parent span `span_a` and a child span `span_b`, and tags them.

Then, compile and link against `libdd_trace_cpp` with:

```bash
g++ -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp-static -lcurl
```

Finally, run the app with:

```bash
./tracer_example
```

## Sending traces

Now that an app exists, you can start sending traces and see the Trace Agent in action.

First, tail the Trace Agent log with:

```bash
tail -f /var/log/datadog/trace-agent.log
```

Next, open a new tab and run the example a couple times:

```bash
./tracer_example
```

On the Trace Agent tab, you will see something similar to:

```text
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:0.2.0] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```

The service then shows up in the Software Catalog in Datadog.

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="APM Services Page" >}}

Click on the service to view your traces.

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="APM Traces UI" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/cpp/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
