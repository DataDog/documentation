---
title: Agent proxy configuration
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

## Why use a Proxy

If your network configuration restricted outbound traffic, proxy all Agent traffic through one or several hosts that have more permissive outbound policies.

A few options are available to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the Internet.

1. Using a web proxy (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
2. Using HAProxy (if you want to proxy **more than 16-20 Agents** through the same proxy)
3. Using the Agent as a proxy (for **up to 16 Agents** per proxy, **only on Agent v5** )

## Using a Web Proxy as Proxy

Traditional web proxies are supported natively by the Agent. If you need to connect to the Internet through a proxy, edit your Agent configuration file.

{{< tabs >}}
{{% tab "Agent v6" %}}

Set different proxy servers for `https` and `http` requests in your Agent `datadog.yaml` configuration file.
The Agent uses `https` to send data to Datadog, but integrations might use `http` to gather metrics. No matter the proxied requests, you can activate SSL on your proxy server. Below are some configuration examples for your `datadog.yaml` file:

Setting an HTTP proxy for all `https` requests:

```
proxy:
    https: http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>
```

Note: When setting up an HTTP proxy for `https` requests, the actual communication between the Agent and Datadog is encrypted end-to-end with TLS and cannot be decrypted by the proxy. The only unencrypted communication is the `HTTP CONNECT` request that's made between the Agent and the proxy to establish the initial TCP connection between the Agent and Datadog. As such, when using a proxy for `https` requests, there is no need to use an HTTPS proxy in order to have encrypted communication between the Agent and Datadog.

Setting an HTTPS proxy for both `https` and `http` requests:

```
proxy:
    https: https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>
```

Setting a `<USERNAME>` and `<PASSWORD>` to contact the proxy server for both `https` and `http` requests:

```
proxy:
    https: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
```

Using the `no_proxy` list to specify hosts that must bypass the proxy:

```
proxy:
    https: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    no_proxy:
      - host1
      - host2
```

**Proxy with environment variables**:

Starting with Agent v6.4, you can set your proxy settings through environment variables:

* `DD_PROXY_HTTPS`: Sets a proxy server for `https` requests.
* `DD_PROXY_HTTP`: Sets a proxy server for `http` requests.
* `DD_PROXY_NO_PROXY`: Sets a list of hosts that should bypass the proxy. The list is space-separated.

Environment variables have precedence over values in the `datadog.yaml` file. If the environment variables are present with an empty value (e.g. ``DD_PROXY_HTTP=""``), the Agent uses those empty values instead of lower-precedence options.

On Unix hosts, a system-wide proxy might be specified using standard environment variables, such as `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY`. The Agent uses these if present. Be careful, as such variables also impact every requests from integrations, including orchestrators like Docker, ECS, and Kubernetes.

The Agent uses the following values in order of precedence:

1. `DD_PROXY_HTTPS`, `DD_PROXY_HTTP`, and `DD_PROXY_NO_PROXY` environment variables
2. `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` environment variables
3. Values inside `datadog.yaml`

{{% /tab %}}
{{% tab "Agent v5" %}}

Edit the `datadog.conf` file with your proxy information:

```
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

Do not forget to [restart the Agent][1] for the new settings to take effect.


[1]: /agent/faq/agent-commands
{{% /tab %}}
{{< /tabs >}}

## Proxy for Logs

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface that is used for log collection.

Logs make use of a different set of proxy settings than other data types forwarded by the Datadog Agent. This is due to the fact that logs are transported over TCP/SSL, while other features submit data via HTTPS.

{{< tabs >}}
{{% tab "TCP" %}}

If you use a proxy for TCP transmission, configure the Datadog Agent to send logs to your proxy through TCP thanks to the following parameters in the `datadog.yaml` configuration file:

```
logs_config:
  logs_dd_url: <PROXY_ENDPOINT>:<PROXY_PORT>
  logs_no_ssl: true
```

Those parameters can also be set with the following environment variables:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Important Note**: The parameter `logs_no_ssl` is required to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`agent-intake.logs.datadoghq.com`) and your proxy hostname. You should use a SSL encrypted connection between your proxy and Datadog intake endpoint though.

* Then configure your proxy to listen on `<PROXY_PORT>` and forward the received logs to `agent-intake.logs.datadoghq.com` on port `10516` and activate SSL encryption.

* Use the [public key for TLS encryption][1] for the SSL encryption. On some systems, the full certificate chain may be required. If so, use [this public key][2] instead.


[1]: /crt/intake.logs.datadoghq.com.crt
[2]: /crt/FULL_intake.logs.datadoghq.com.crt
{{% /tab %}}
{{% tab "SOCK5" %}}

To send your logs to your Datadog account via a SOCKS5 proxy server use the following settings in your `datadog.yaml` configuration file:

```
logs_config:
  socks5_proxy_address: <MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>
```

This parameter can also be set with the following environment variable:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## Using HAProxy as a Proxy

[HAProxy][1] is a free, fast, and reliable solution offering proxying for TCP and HTTP applications. While HAProxy is usually used as a load balancer to distribute incoming requests to pools servers, you can also use it to proxy Agent traffic to Datadog from hosts that have no outside connectivity.

This is the best option if you do not have a web proxy readily available in your network, and you wish to proxy a large number of Agents. In some cases, a single HAProxy instance is sufficient to handle local Agent traffic in your network-each proxy can accommodate upwards of 1000 Agents. (Be aware that this figure is a conservative estimate based on the performance of m3.xl instances specifically. Numerous network-related variables can influence load on proxies. As always, deploy under a watchful eye. Visit [HAProxy documentation][2] for additional information.)

`agent ---> haproxy ---> Datadog`

### Proxy metric forwarding with HAProxy
#### HAProxy configuration

We assume that HAProxy is installed on a host that has connectivity to Datadog.
Use the following configuration file if you do not already have it configured.

```
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This declares the endpoint where your Agents connects for
# sending metrics (e.g. the value of "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# This declares the endpoint where your Agents connects for
# sending traces (e.g. the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# This declares the endpoint where your agents connects for
# sending processes (e.g. the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.com:443 check port 80

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.com:443 check port 80

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.com:443 check port 80
```

Once the HAProxy configuration is in place, you can reload it or restart HAProxy.

**We recommend having a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.com` fails over to another IP.

#### Datadog Agent configuration

{{< tabs >}}
{{% tab "Agent v6" %}}

Edit each Agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. `haproxy.example.com`).
This `dd_url` setting can be found in the `datadog.yaml` file.

`dd_url: https://haproxy.example.com:3834`

To send traces or processes through the proxy, setup the following in the `datadog.yaml` file:

```
apm_config:
    apm_dd_url: https://haproxy.example.com:3835

process_config:
    process_dd_url: https://haproxy.example.com:3836
```

Then edit the `datadog.yaml` Agent configuration file and set `skip_ssl_validation` to `true`. This is needed to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`app.datadoghq.com`) and your HAProxy hostname:

```
skip_ssl_validation: true
```

Finally [restart the Agent][1].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][2].


[1]: /agent/#start-stop-restart-the-agent/#windows
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "Agent v5" %}}

Edit each Agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. `haproxy.example.com`).
This `dd_url` setting can be found in the `datadog.conf` file.

`dd_url: https://haproxy.example.com:3834`

To send traces or processes through the proxy, setup the following in the `datadog.conf` file:

```
[trace.api]
endpoint = https://haproxy.example.com:3835

[process.api]
endpoint = https://haproxy.example.com:3836
```

Edit your supervisor configuration to disable SSL certificate verification. This is needed to prevent Python from complaining about the discrepancy between the hostname on the SSL certificate (`app.datadoghq.com`) and your HAProxy hostname. The supervisor configuration found at:

* `/etc/dd-agent/supervisor_ddagent.conf` on Debian-based systems
* `/etc/dd-agent/supervisor.conf` on Red Hat-based systems
* `/opt/local/datadog/supervisord/supervisord.conf` on SmartOS
* `/usr/local/etc/datadog/supervisord/supervisord.conf` on FreeBSD
* `~/.datadog-agent/supervisord/supervisord.conf` on macOS

Assuming that the supervisor file is found at `<SUP_FILE>`

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

For the Windows Agent, edit your configuration file `datadog.conf` and add this option:

```
skip_ssl_validation: yes
```

Finally [restart the Agent][1].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][2].


[1]: /agent/#start-stop-restart-the-agent/#windows
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## Using the Agent as a Proxy

**This feature is only available for Agent v5**

We recommend using an actual proxy (a web proxy or HAProxy) to forward your traffic to Datadog, however if those options aren't available to you, it is possible to configure an instance of Agent v5 to serve as a proxy.

1. Designate one node **running datadog-agent** as the proxy.
    In this example assume that the proxy name is `proxy-node`. This node **must** be able to reach `https://app.datadoghq.com`.

2. Verify SSL connectivity on `proxy-node`
    ```
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. Allow non-local traffic on `proxy-node` by changing the following line in `datadog.conf`.
     `# non_local_traffic: no` should read `non_local_traffic: yes`.

4. Make sure `proxy-node` can be reached from the other nodes over port 17123. Start the Agent on the `proxy-node` and run on the other nodes:

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. Update non-proxy nodes to forward to `proxy-node`. Change the following line in `datadog.conf` from:

    `dd_url: https://app.datadoghq.com`
to
    `dd_url: http://proxy-node:17123`

6. Verify on the [Infrastructure page][3] that all nodes report data to Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://haproxy.1wt.eu
[2]: http://www.haproxy.org/#perf
[3]: https://app.datadoghq.com/infrastructure#overview
