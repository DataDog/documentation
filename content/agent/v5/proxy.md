---
title: Proxy Configuration
kind: documentation
aliases:
    - /agent/proxy
---

<div class="alert alert-info">
This documentation covers Agent <strong>versions prior to 6.0.0</strong><br>
Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version </a> to benefit from all new functionalities 
</div>

## Why use a Proxy

If your network configuration restricted outbound traffic, proxy all agent traffic through one or several hosts that have more permissive outbound policies.

A few options are available to send traffic to Datadog over SSL/TLS for
hosts that are not directly connected to the Internet.

1. Using the agent as a proxy (for **up to 16 agents** per proxy)
2. Using a web proxy (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
3. Using HAProxy (if you want to proxy **more than 16-20 agents** through the
same proxy)

## Using the Agent as a Proxy

1. Designate one node **running datadog-agent** as the proxy.  
    In this example assume that the proxy name is `proxy-node`. This node **must** be able to reach `https://app.datadoghq.com`.

2. Verify SSL connectivity on `proxy-node`  
    ```
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. Allow non-local traffic on `proxy-node` by changing the following line in `datadog.conf`.  
     `# non_local_traffic: no` should read `non_local_traffic: yes`.

4. Make sure `proxy-node` can be reached from the other nodes over port 17123. Start the agent on the `proxy-node` and run on the other nodes:

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. Update non-proxy nodes to forward to `proxy-node`. Change the following line in `datadog.conf` from:

    `dd_url: https://app.datadoghq.com`
to
    `dd_url: http://proxy-node:17123`

6. Verify on the [Infrastructure page](https://app.datadoghq.com/infrastructure#overview) that all nodes report data to Datadog.

## Using a Web Proxy as Proxy

Traditional web proxies are supported natively by the agent. 
Edit `datadog.conf` with your proxy information.

```
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

Do not forget to [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent) for the new settings to take effect.

## Using HAProxy as a Proxy

[HAProxy](http://haproxy.1wt.eu) is a free, very fast and reliable
solution offering proxying for TCP and HTTP applications. While
HAProxy is usually used as a load balancer to distribute incoming
requests to pools servers, you can also use it to proxy agent traffic
to Datadog from hosts that have no outside connectivity.

This is the best option if you do not have a web proxy readily available
in your network and you wish to proxy a large number of agents. In some cases a single HAProxy instance is sufficient to handle local agent traffic in your network - each proxy can accommodate upwards of 1000 agents (be aware that this figure is a conservative estimate based on the performance of m3.xl instances specifically. Numerous network-related variables can influence load on proxies. As always, deploy under a watchful eye. Visit http://www.haproxy.org/#perf for additional information).

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
listen stats :3835
    mode http
    stats enable
    stats uri /

# This declares the endpoint where your agents connects.
# In this example we use port 3834 but you can use any other
# free port.
frontend forwarder
    bind *:3834 # DTDG
    mode tcp
    default_backend datadog

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontend defined above is proxied to
# Datadog's public endpoints.
backend datadog
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.com:443 check port 80
```

Once the HAProxy configuration is in place, you can reload it or restart HAProxy.

**We recommend having a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.com` fails over to another IP.

Then edit each agent to point to HAProxy by setting its `dd_url` to the address of HAProxy (e.g. haproxy.example.com). This `dd_url` setting can be found in `datadog.conf`.

`dd_url: https://haproxy.example.com:3834`

Before you [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent) Edit your supervisor configuration to disable SSL certificate verification. This is needed to prevent python from complaining about the discrepancy between the hostname on the SSL certificate (app.datadoghq.com) and your HAProxy hostname.

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

#### On Windows (Starting from agent 3.9.2):

Edit your configuration file `datadog.conf` and add this option:
```
skip_ssl_validation: yes
```

Finally [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent/#windows).

To verify that everything is working properly, review the
HAProxy statistics at `http://haproxy.example.com:3835` as well as
the [Infrastructure Overview](https://app.datadoghq.com/infrastructure)