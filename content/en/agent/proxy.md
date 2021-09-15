---
title: Agent Proxy Configuration
kind: documentation
aliases:
- /account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
---

## Overview

If your network configuration restricted outbound traffic, proxy all Agent traffic through one or several hosts that have more permissive outbound policies.

A few options are available to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the Internet.


{{< tabs >}}
{{% tab "Existing Web Proxy" %}}

Traditional web proxies are supported natively by the Agent. If you need to connect to the Internet through a proxy that is already deployed to your network, such as Squid or Microsoft Web Proxy, edit your Agent configuration file.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Set different proxy servers for `https` and `http` requests in your Agent `datadog.yaml` configuration file. The Agent uses `https` to send data to Datadog, but integrations might use `http` to gather metrics. No matter the proxied requests, you can activate SSL on your proxy server. Below are some configuration examples for your `datadog.yaml` file.

<div class="alert alert-warning">
If log collection is enabled, make sure that a specific transport is <a href="/agent/logs/log_transport?tab=https#enforce-a-specific-transport">enforced</a>.
The recommended setup is to use HTTPS. In that case, the <code>&ltHOST&gt;:&ltPORT&gt;</code> used to proxy metrics is used to proxy logs.
If you are using TCP transport, see <a href="/agent/logs/proxy">TCP Proxy for Logs</a>.
</div>

Setting an HTTP proxy for all `https` requests:

```yaml
proxy:
    https: "http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
```

Note: When setting up an HTTP proxy for `https` requests, the actual communication between the Agent and Datadog is encrypted end-to-end with TLS and cannot be decrypted by the proxy. The only unencrypted communication is the `HTTP CONNECT` request that's made between the Agent and the proxy to establish the initial TCP connection between the Agent and Datadog. As such, when using a proxy for `https` requests, there is no need to use an HTTPS proxy in order to have encrypted communication between the Agent and Datadog.

Setting an HTTPS proxy for both `https` and `http` requests:

```yaml
proxy:
    https: "https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>"
```

Setting a `<USERNAME>` and `<PASSWORD>` to contact the proxy server for both `https` and `http` requests:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
```

Using the `no_proxy` list to specify hosts that must bypass the proxy:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
    no_proxy:
      - host1
      - host2
```

**Note**: All integrations that make HTTP(S) requests default back to proxy settings defined in `datadog.yaml` configuration file if none are specified at the integration level. If this is undesired, set `skip_proxy` to true in every instance config or in the `init_config` fallback for your integration.

##### NO_PROXY accepted values

By default, `no_proxy`/`NO_PROXY` must match endpoints exactly for Agent HTTP(S) requests (except requests performed by Agent integrations). It is recommended to enable `no_proxy_nonexact_match` to make the Agent match `NO_PROXY` values with the same rules (below) used for Agent integrations.

```yaml
no_proxy_nonexact_match: true
```

The following rules apply to Agent integrations (and the whole Agent when `no_proxy_nonexact_match` is enabled):
* A domain name matches that name and all subdomains, for example:
  - `datadoghq.com` matches `app.agent.datadoghq.com`, `www.datadoghq.com`, `datadoghq.com`, but **not** `www.notdatadoghq.com`
  - `datadoghq` matches `frontend.datadoghq`, `backend.datadoghq`, but **not** `www.datadoghq.com` nor `www.datadoghq.eu`
* A domain name with a leading "." matches subdomains only, for example:
  - `.datadoghq.com` matches `app.agent.datadoghq.com`, `www.datadoghq.com`, but **not** `datadoghq.com`
* A CIDR range matches an IP address within the subnet, for example:
  - `192.168.1.0/24` matches IP range `192.168.1.1` through `192.168.1.254`
* An exact IP address, for example:
  - `169.254.169.254`
* A hostname, for example:
  - `webserver1`

#### Environment variables

Starting with Agent v6.4, you can set your proxy settings through environment variables:

* `DD_PROXY_HTTPS`: Sets a proxy server for `https` requests.
* `DD_PROXY_HTTP`: Sets a proxy server for `http` requests.
* `DD_PROXY_NO_PROXY`: Sets a list of hosts that should bypass the proxy. The list is space-separated.

Environment variables have precedence over values in the `datadog.yaml` file. If the environment variables are present with an empty value, for example: ``DD_PROXY_HTTP=""``, the Agent uses the empty values instead of lower-precedence options.

On Unix hosts, a system-wide proxy might be specified using standard environment variables, such as `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY`. The Agent uses these if present. Be careful, as such variables also impact every requests from integrations, including orchestrators like Docker, ECS, and Kubernetes.

The Agent uses the following values in order of precedence:

1. `DD_PROXY_HTTPS`, `DD_PROXY_HTTP`, and `DD_PROXY_NO_PROXY` environment variables
2. `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` environment variables
3. Values inside `datadog.yaml`

{{% /tab %}}
{{% tab "Agent v5" %}}

<div class="alert alert-warning">
The <code>&ltHOST&gt;:&ltPORT&gt;</code> used to proxy metrics can NOT be used to proxy logs. See the <a href="/agent/logs/proxy">Proxy for Logs</a> page.
</div>

Edit the `datadog.conf` file with your proxy information:

```text
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

Do not forget to [restart the Agent][1] for the new settings to take effect.

[1]: /agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

{{% /tab %}}
{{% tab "thing 2" %}}

[thing 2 link][1]. whatup. 

[1]: https://github.com/DataDog/documentation/edit/master/content/en/agent/proxy.md
{{% /tab %}}
{{% tab "thing 3" %}}

[thing 3 link][1]. yo.

[1]: https://github.com/DataDog/documentation/edit/master/content/en/agent/proxy.md
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
