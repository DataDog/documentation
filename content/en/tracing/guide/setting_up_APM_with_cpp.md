---
title: Setting Up APM with C++
kind: guide
disable_toc: true
further_reading:
- link: "/tracing/setup/cpp"
  tag: "Documentation"
  text: "Learn more about tracing applications with C++"
---

## Overview
This guide expands on the [C++ APM docs][1] to provide step-by-step instructions on how to set up a simple C++ app with APM on your VM for troubleshooting. You can also directly spin up a ready-to-go box with all of this set up from our sandbox repo [here][2].

## Setting up your box

### Basic environment
First, spin up a fresh `ubuntu/xenial64` Vagrant box and `ssh` into it with:
```
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

Next, install the agent with the [instructions in the UI][3].

### Prepping for C++

Install `g++` and `cmake` via:

```
sudo apt-get update
sudo apt-get -y install g++ cmake
```

Run these two lines together to get the latest cpp version:
```
get_latest_release() {  
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |  
    grep '"tag_name":' |  
    sed -E 's/.*"([^"]+)".*/\1/';  
}  
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
```
If you get a rate limited message from Github, wait a few minutes and run the command again. When the update is complete, confirm that this is successful by checking your cpp version with:
```
echo $DD_OPENTRACING_CPP_VERSION
```

Then, download and install the `dd-opentracing-cpp` library via:
```
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
```

After downloading the `tar` file, create a new directory and a `.build` file for the library:
```
mkdir -p dd-opentracing-cpp/.build
```
Then unzip it via:
```bash
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
```

You should see a list of the library contents in your console:
```
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx.conf
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx_integration_test.sh
```
Next, go in your `.build` directory:
```
cd dd-opentracing-cpp/.build
```

Finally, install dependencies with:
```bash
sudo ../scripts/install_dependencies.sh
cmake ..
make
sudo make install
```

## Building a simple app

Create a new file called `tracer_example.cpp` and populate it with the below code:
```cpp
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

This creates a tracer that generates two spans, a parent span `span_a` and a child span `span_b`, and tags them.

Then, link against `libdd_opentracing` and `libopentracing` with:
```
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
```

Finally, run the app with:
```
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

## Sending traces
Now that an app exists, you can start sending traces and see the trace agent in action.

First, tail the trace agent log via:
```
tail -f /var/log/datadog/trace-agent.log
```
Next, open a new tab and run the example a couple times:
```
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

On the trace agent tab, you will see something similar to:
```
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:v1.0.1] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```
Then, in the Datadog UI, you will see the service show up in your APM services page.
{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="APM Services Page" responsive="true" >}}

Click on the service to view your traces.
{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="APM Traces UI" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/cpp/#compile-against-dd-opentracing-cpp
[2]: https://github.com/DataDog/sandbox
[3]: https://app.datadoghq.com/account/settings#agent/ubuntu
