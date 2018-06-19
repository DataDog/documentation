---
title: Agent proxy configuration
kind: documentation
aliases:
    - /agent/proxy
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Why use a Proxy

If your network configuration restricted outbound traffic, proxy all Agent traffic through one or several hosts that have more permissive outbound policies.

A few options are available to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the Internet.

1. Using a web proxy (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
2. Using HAProxy (if you want to proxy **more than 16-20 Agents** through the same proxy)
3. Using the Agent as a proxy (for **up to 16 Agents** per proxy, **only on Agent v5** )

## Using a Web Proxy as Proxy

Traditional web proxies are supported natively by the Agent. If you need to connect to the Internet through a proxy, edit your Agent configuration file.

### Agent v6

Edit the `datadog.yaml` file with your proxy information. Use the `no_proxy` list to specify hosts that should bypass the proxy.

```
proxy:
    http: http(s)://user:password@proxy_for_http:port
    https: http(s)://user:password@proxy_for_https:port
#   no_proxy:
#     - host1
#     - host2
```

[Refer to our log collection documentation page to learn how to forward your logs with a proxy][].

### Agent v5

Edit the `datadog.conf` file with your proxy information:

```
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

Do not forget to [restart the Agent][2] for the new settings to take effect.

## Using HAProxy as a Proxy

[HAProxy][3] is a free, very fast and reliable solution offering proxying for TCP and HTTP applications. While HAProxy is usually used as a load balancer to distribute incoming requests to pools servers, you can also use it to proxy Agent traffic to Datadog from hosts that have no outside connectivity.

This is the best option if you do not have a web proxy readily available in your network and you wish to proxy a large number of Agents. In some cases a single HAProxy instance is sufficient to handle local Agent traffic in your network - each proxy can accommodate upwards of 1000 Agents (be aware that this figure is a conservative estimate based on the performance of m3.xl instances specifically. Numerous network-related variables can influence load on proxies. As always, deploy under a watchful eye. Visit [HAProxy documentation][6] for additional information).

`agent ---> haproxy ---> Datadog`

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

# This declares a view into HAProxy statistics, on port 3835
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
    server mothership process.agent.datadoghq.com:443 check port 80
```

Once the HAProxy configuration is in place, you can reload it or restart HAProxy.

**We recommend having a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.com` fails over to another IP.

Then edit each Agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. haproxy.example.com). This `dd_url` setting can be found in `datadog.conf` for Agent v5 and `datadog.yaml` for Agent v6.

`dd_url: https://haproxy.example.com:3834`

If you want to send traces or processes through the proxy, you need to setup the following in `datadog.conf` for Agent v5:

```
[trace.api]
endpoint = https://haproxy.example.com:3835

[process.api]
url = https://haproxy.example.com:3836
 ```

For Agent v6, set up the following in `datadog.yaml`:

```
apm_config:
    endpoint: https://haproxy.example.com:3836

process_config:
    url: https://haproxy.example.com:3835
```

Before you [restart the Agent][2] Edit your supervisor configuration to disable SSL certificate verification. This is needed to prevent python from complaining about the discrepancy between the hostname on the SSL certificate (app.datadoghq.com) and your HAProxy hostname.

####  On GNU/Linux, Mac OS X, FreeBSD, SmartOS:
You need to edit the supervisor configuration found at:

* `/etc/dd-agent/supervisor_ddagent.conf` on debian-based systems
* `/etc/dd-agent/supervisor.conf` on redhat-based systems
* `/opt/local/datadog/supervisord/supervisord.conf` on SmartOS
* `/usr/local/etc/datadog/supervisord/supervisord.conf` on FreeBSD
* `~/.datadog-agent/supervisord/supervisord.conf` on Mac OS X

Assuming that file is found at `SUP_FILE`
```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' SUP_FILE
```

#### On Windows (Starting from Agent 3.9.2):

Edit your configuration file `datadog.conf` and add this option:
```
skip_ssl_validation: yes
```

Finally [restart the Agent][4].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3835` as well as the [Infrastructure Overview][5]

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

6. Verify on the [Infrastructure page][1] that all nodes report data to Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure#overview
[2]: /agent/faq/agent-commands
[3]: http://haproxy.1wt.eu
[4]: /agent/#start-stop-restart-the-agent/#windows
[5]: https://app.datadoghq.com/infrastructure
[6]: http://www.haproxy.org/#perf
[7]: /logs/log_collection/#using_a_proxy_for_logs
