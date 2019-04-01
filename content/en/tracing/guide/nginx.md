---
title: NGINX
kind: Documentation
further_reading:
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "https://www.nginx.com/"
  tag: "Documentation"
  text: "NGINX website"
- link: "https://github.com/opentracing-contrib/nginx-opentracing"
  tag: "Source Code"
  text: "NGINX plugin for OpenTracing"
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Source Code"
  text: "Datadog OpenTracing C++ Client"
aliases:
  - /tracing/proxies/nginx
---

Support for Datadog APM is available for NGINX using a combination of plugins and configurations.
The instructions below use NGINX from the official [Linux repositories][1] and pre-built binaries for the plugins.

## Plugin Installation

The following plugins must be installed:

- NGINX plugin for OpenTracing - [linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz][2] - installed in `/usr/lib/nginx/modules`
- Datadog OpenTracing C++ Plugin - [linux-amd64-libdd_opentracing_plugin.so.gz][3] - installed somewhere accessible to NGINX, eg `/usr/local/lib`

Commands to download and install these modules:

```bash
# Gets the latest release version number from Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.14.0
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Install NGINX plugin for OpenTracing
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Install Datadog Opentracing C++ Plugin
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

## NGINX Configuration

The NGINX configuration must load the OpenTracing module.

```nginx
load_module modules/ngx_http_opentracing_module.so; # Load OpenTracing module
```

The `http` section enables the OpenTracing module and loads the Datadog tracer:

```nginx
    opentracing on; # Enable OpenTracing
    opentracing_tag http_user_agent $http_user_agent; # Add a tag to each trace!
    opentracing_trace_locations off; # Emit only one span per request.

    # Load the Datadog tracing implementation, and the given config file.
    opentracing_load_tracer /usr/local/lib/libdd_opentracing_plugin.so /etc/dd-config.json;
```

Locations within the server where tracing is desired should add the following:

```nginx
            opentracing_operation_name "$request_method $uri";
            opentracing_tag "resource.name" "/";
```

A config file for the Datadog tracing implementation is also required:

```json
{
  "service": "nginx",
  "operation_name_override": "nginx.handle",
  "agent_host": "localhost",
  "agent_port": 8126
}
```

The `service` value can be modified to a meaningful value for your usage of NGINX.
The `agent_host` value may need to be changed if NGINX is running in a container or orchestrated environment.

Complete examples:

- [nginx.conf][4]
- [dd-config.json][5]


After completing this configuration, HTTP requests to NGINX will initiate and propagate Datadog traces, and will appear in the APM UI.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[3]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
