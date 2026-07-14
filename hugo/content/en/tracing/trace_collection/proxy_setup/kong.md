---
title: Instrumenting Kong
code_lang: kong
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: "https://docs.konghq.com/gateway/latest/"
  tag: "External Site"
  text: "Kong website"
- link: "https://github.com/DataDog/kong-plugin-ddtrace/"
  tag: "Source Code"
  text: "Datadog APM Plugin for Kong"
aliases:
- /tracing/proxies
- /tracing/setup_overview/proxy_setup/
---

Datadog APM is available for [Kong Gateway][1] using the [kong-plugin-ddtrace][2] plugin.

## Installation

The plugin is installed using `luarocks`.
```
luarocks install kong-plugin-ddtrace
```

Kong Gateway is not a bundled plugin, so it needs to be configured before it can be enabled.
To enable it, include `bundled` and `ddtrace` in the `KONG_PLUGINS` environment variable, or
set `plugins=bundled,ddtrace` in `/etc/kong/kong.conf`. Next, restart Kong Gateway to apply the change.

```
# Set the KONG_PLUGINS environment variable or edit /etc/kong/kong.conf to enable the ddtrace plugin
export KONG_PLUGINS=bundled,ddtrace
kong restart
```

## Configuration

The plugin can be enabled globally or on specific services in Kong Gateway.

```
# Enabled globally
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace'
# Enabled for specific service only
curl -i -X POST --url http://localhost:8001/services/example-service/plugins/ --data 'name=ddtrace'
```

Options are available for setting the service name, environment, and other features within the plugin.
The example below sets the service name to `mycorp-internal-api` in the `prod` environment.
```
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace' --data 'config.service_name=mycorp-internal-api' --data 'config.environment=prod'
```

More configuration options can be found on the [kong-plugin-ddtrace][3] plugin documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.konghq.com/gateway/latest/
[2]: https://github.com/DataDog/kong-plugin-ddtrace
[3]: https://github.com/DataDog/kong-plugin-ddtrace#configuration

