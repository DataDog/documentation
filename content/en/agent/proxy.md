---
title: Agent proxy configuration
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process"
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
{{% tab "Agent v6 & v7" %}}

Set different proxy servers for `https` and `http` requests in your Agent `datadog.yaml` configuration file.
The Agent uses `https` to send data to Datadog, but integrations might use `http` to gather metrics. No matter the proxied requests, you can activate SSL on your proxy server. Below are some configuration examples for your `datadog.yaml` file.

<div class="alert alert-warning">
Unless the Datadog Agent is configured to <a href="/agent/logs/?tab=tailexistingfiles#send-logs-over-https">forward logs in HTTPS</a>, the <code>&ltHOST&gt;:&ltPORT&gt;</code> used to proxy metrics can **not** be used to proxy logs. See the <a href="/agent/logs/proxy">Proxy for Logs</a> page.
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

#### Environment variables

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

[1]: /agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

## Using HAProxy as a Proxy

[HAProxy][1] is a free, fast, and reliable solution offering proxying for TCP and HTTP applications. While HAProxy is usually used as a load balancer to distribute incoming requests to pools servers, you can also use it to proxy Agent traffic to Datadog from hosts that have no outside connectivity.

This is the best option if you do not have a web proxy readily available in your network, and you wish to proxy a large number of Agents. In some cases, a single HAProxy instance is sufficient to handle local Agent traffic in your network-each proxy can accommodate upwards of 1000 Agents. (Be aware that this figure is a conservative estimate based on the performance of m3.xl instances specifically. Numerous network-related variables can influence load on proxies. As always, deploy under a watchful eye. Visit [HAProxy documentation][2] for additional information.)

`agent ---> haproxy ---> Datadog`

### Proxy metric forwarding with HAProxy

#### HAProxy configuration

HAProxy should be installed on a host that has connectivity to Datadog. Use the following configuration file if you do not already have it configured.

{{< tabs >}}
{{% tab "Datadog US site" %}}

```conf
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
    
# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> with your DNS Server IP.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 XXX.XXX.XXX.XXX:53
    nameserver dns2 XXX.XXX.XXX.XXX:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s

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

# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.datadoghq.com:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership haproxy-app.agent.datadoghq.com:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.datadoghq.com:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership trace.agent.datadoghq.com:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.datadoghq.com:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership process.datadoghq.com:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**Note**: Download the certificate with the following command:
        * `sudo apt-get install ca-certificates` (Debian, Ubuntu)
        * `yum install ca-certificates` (CentOS, Redhat)
The file might be located at `/etc/ssl/certs/ca-bundle.crt` for CentOS, Redhat.

HAProxy 1.8 and newer allows DNS service discovery to detect server changes and automatically apply them to configuration.
If you are using older version of HAProxy, you have to reload or restart HAProxy. **It is recommended to have a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.com` fails over to another IP.

{{% /tab %}}
{{% tab "Datadog EU site" %}}

```conf
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

# This section is to reload DNS Records
# You can replace XXX.XXX.XXX.XXX with your DNS Server IP.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 XXX.XXX.XXX.XXX:53
    nameserver dns2 XXX.XXX.XXX.XXX:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s

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

# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.datadoghq.eu:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership haproxy-app.agent.datadoghq.eu:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.datadoghq.eu:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership trace.agent.datadoghq.eu:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.datadoghq.eu:443 check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server mothership process.datadoghq.eu:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check resolvers my-dns init-addr none resolve-prefer ipv4
    # The following configuration is for older HAProxy versions
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

**Note**: Download the certificate with the following command:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

The file might be located at `/etc/ssl/certs/ca-bundle.crt` for CentOS, Redhat.

HAProxy 1.8 and newer allows DNS service discovery to detect server changes and automatically apply them to configuration.
If you are using older version of HAProxy, you have to reload or restart HAProxy. **It is recommended to have a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.eu` fails over to another IP.

{{% /tab %}}
{{< /tabs >}}

#### Datadog Agent configuration

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Edit each Agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. `haproxy.example.com`).
This `dd_url` setting can be found in the `datadog.yaml` file.

`dd_url: https://haproxy.example.com:3834`

To send traces or processes through the proxy, setup the following in the `datadog.yaml` file:

```yaml
apm_config:
    apm_dd_url: https://haproxy.example.com:3835

process_config:
    process_dd_url: https://haproxy.example.com:3836
```

Then edit the `datadog.yaml` Agent configuration file and set `skip_ssl_validation` to `true`. This is needed to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`app.datadoghq.com` or `app.datadoghq.eu`) and your HAProxy hostname:

```yaml
skip_ssl_validation: true
```

Finally [restart the Agent][1].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][2].

[1]: /agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "Agent v5" %}}

Edit each Agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. `haproxy.example.com`).
This `dd_url` setting can be found in the `datadog.conf` file.

`dd_url: https://haproxy.example.com:3834`

To send traces or processes through the proxy, setup the following in the `datadog.conf` file:

```conf
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

```conf
skip_ssl_validation: yes
```

Finally [restart the Agent][1].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][2].

[1]: /agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## Using NGINX as a Proxy

[NGINX][3] is a web server which can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache. You can also use NGINX as a proxy for your Datadog Agents:

`agent ---> nginx ---> Datadog`

### Proxy forwarding with NGINX

#### NGINX configuration

This example `nginx.conf` can be used to proxy Agent traffic to Datadog. The last server block in this configuration does TLS wrapping to ensure internal plaintext logs are encrypted between your proxy and Datadog's log intake API endpoint:

{{< tabs >}}
{{% tab "Datadog US site" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# TCP Proxy for Datadog Agent
stream {
    server {
        listen 3834; #listen for metrics
        proxy_pass haproxy-app.agent.datadoghq.com:443;
    }
    server {
        listen 3835; #listen for traces
        proxy_pass trace.agent.datadoghq.com:443;
    }
    server {
        listen 3836; #listen for processes
        proxy_pass process.datadoghq.com:443;
    }
    server {
        listen 3837; #listen for logs with use_http: true
        proxy_pass agent-http-intake.logs.datadoghq.com:443;
    }
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# TCP Proxy for Datadog Agent
stream {
    server {
        listen 3834; #listen for metrics
        proxy_pass haproxy-app.agent.datadoghq.eu:443;
    }
    server {
        listen 3835; #listen for traces
        proxy_pass trace.agent.datadoghq.eu:44;
    }
    server {
        listen 3836; #listen for processes
        proxy_pass process.datadoghq.eu:443;
    }
    server {
        listen 3837; #listen for logs with use_http: true
        proxy_pass agent-http-intake.logs.datadoghq.eu:443;
    }
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Datadog Agent configuration

To use the Datadog Agent v6 as the logs collector, instruct the Agent to use the newly created proxy instead of establishing a connection directly with the logs intake by updating `datadog.yaml`:

```yaml
logs_config:
  logs_dd_url: myProxyServer.myDomain:10514
```

Do not change the `logs_no_ssl` parameter as NGINX is simply forwarding the traffic to Datadog and does not decrypt or encrypt the traffic.

When choosing to send logs over HTTPS, use the following code block in `datadog.yaml` to configure Agent behavior:

```yaml
logs_config:
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:3837"
  use_http: true
  use_compression: true
  compression_level: 6
```

## Using the Agent as a Proxy

**This feature is only available for Agent v5**

It is recommended to use an actual proxy (a web proxy or HAProxy) to forward your traffic to Datadog, however if those options aren't available to you, it is possible to configure an instance of Agent v5 to serve as a proxy.

1. Designate one node **running datadog-agent** as the proxy.
    In this example assume that the proxy name is `proxy-node`. This node **must** be able to reach `https://app.datadoghq.com`.

2. Verify SSL connectivity on `proxy-node`:

    ```shell
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

6. Verify on the [Infrastructure page][4] that all nodes report data to Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://haproxy.1wt.eu
[2]: http://www.haproxy.org/#perf
[3]: https://www.nginx.com
[4]: https://app.datadoghq.com/infrastructure#overview
