---
title: Agent Proxy Configuration
aliases:
- /account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /agent/proxy
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces and profiles"
- link: "/agent/configuration/fips-compliance"
  tag: "Documentation"
  text: "Datadog FIPS Compliance"
algolia:
  tags: ['agent proxy']
---

## Datadog Agent Proxy Configuration

Configure the Datadog Agent to send traffic through an HTTP/HTTPS proxy.

### Configuration

You can configure the proxy using either the main Agent configuration file or environment variables. Environment variables override configuration file settings.

#### 1. Configuration File

Edit the main Agent configuration file (`datadog.yaml`). Locate or add the `proxy` section:

```yaml
proxy:
  # Required: Proxy endpoint for HTTP connections
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  # Required: Proxy endpoint for HTTPS connections (most Datadog traffic)
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>

  # Optional: List of hosts or CIDR ranges to bypass the proxy
  # Example:
  # no_proxy:
  #   - 192.168.0.0/24
  #   - localhost
  #   - .myinternaldomain.com
  no_proxy:
    - <HOST_TO_BYPASS_1>
    - <HOST_TO_BYPASS_2>
  # Recommended: Set to true to ensure no_proxy behaves in a standard way
  no_proxy_nonexact_match: true

  # Recommended: Force the Agent to use HTTP to send logs (if logs is enabled)
  logs_config:
    force_use_http: true
```

* Replace `<USER>`, `<PASSWORD>`, `<PROXY_HOST>`, and `<PROXY_PORT>` with your proxy credentials and address.
* Username and password are optional.
* Specify `http`, `https`, or both, depending on your proxy setup and needs. Most Datadog traffic uses HTTPS.
* Use `no_proxy` to specify hosts the Agent should connect to directly, bypassing the proxy.

#### 2. Environment Variables

Alternatively, you can set the following environment variables:

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1>,<HOST_TO_BYPASS_2>"
DD_PROXY_NO_PROXY_NONE_EXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

### Apply Changes

**[Restart the Datadog Agent][1]** after modifying the configuration for changes to take effect.

### Proxy Server Setup Examples

If you don't have an existing proxy server, we recommend using an HTTP proxy like **Squid**.

1. **Squid (Recommended)**: A robust HTTP/HTTPS proxy that simplifies configuration by automatically handling Datadog endpoints. [See Squid Example Setup][2].
2. **HAProxy (Not Recommended)**: Can forward traffic to Datadog, but this requires maintaining an up-to-date list of Datadog domains and is more complex to manage. [See HAProxy Example Setup][3].
3. **Nginx (Not Recommended)**: Similar to HAProxy, using Nginx to forward traffic to Datadog is discouraged due to the maintenance overhead of keeping domain lists current. [See Nginx Example Setup][4].

Forwarding traffic to Datadog using software like HAProxy or Nginx is **discouraged** because it requires you to manually configure and maintain the list of specific Datadog endpoints the Agent needs to reach.
This list can change, leading to potential data loss if not kept up-to-date.

### Verification

Check the Agent status command and review the Agent logs (`agent.log`, `trace-agent.log`, etc.) for any connection errors after restarting.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/
[2]: /agent/configuration/proxy_example_squid/
[3]: /agent/configuration/proxy_example_haproxy/
[4]: /agent/configuration/proxy_example_nginx/
