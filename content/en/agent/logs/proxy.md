---
title: TCP proxy for logs
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

Log collection requires the Datadog Agent v6.0+. Older versions of the Agent do not include the `log collection` interface.

## HTTPS log Forwarding

**We recommend to [configure the Agent to send logs in HTTPS][2]** and to use the same [set of proxy settings][2] as other data types.


## TCP log forwarding

By default, Datadog transports logs over TCP/SSL. Hence, there is a different [set of proxy settings][1] than other data types that the Datadog Agent forwards in HTTPS.

{{< tabs >}}
{{% tab "TCP" %}}

If you use a proxy for TCP transmission, configure the Datadog Agent to send logs to your proxy through TCP using the following parameters in the `datadog.yaml` configuration file:

```yaml
logs_config:
  logs_dd_url: "<PROXY_ENDPOINT>:<PROXY_PORT>"
  logs_no_ssl: true
```

The parameters above can also be set with the following environment variables:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Note**: The parameter `logs_no_ssl` is required to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`agent-intake.logs.datadoghq.com` or `agent-intake.logs.datadoghq.eu`) and your proxy hostname. It is recommended to use a SSL encrypted connection between your proxy and Datadog intake endpoint.

* Then configure your proxy to listen on `<PROXY_PORT>` and forward the received logs to:

    * For `app.datadoghq.com`: `agent-intake.logs.datadoghq.com` on port `10516` and activate SSL encryption.
    * For `app.datadoghq.eu`: `agent-intake.logs.datadoghq.eu` on port `443` and activate SSL encryption.

* Download the `CA certificates` for TLS encryption for the SSL encryption with the following command:

    * `sudo apt-get install ca-certificates` (Debian, Ubuntu)
    * `yum install ca-certificates` (CentOS, Redhat)
    
  And use the certificate file located in `/etc/ssl/certs/ca-certificates.crt`(Debian, Ubuntu) or `/etc/ssl/certs/ca-bundle.crt` (CentOS, Redhat)

{{% /tab %}}
{{% tab "SOCKS5" %}}

To send your logs to your Datadog account with a SOCKS5 proxy server use the following settings in your `datadog.yaml` configuration file:

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>"
```

The parameter above can also be set with the following environment variable:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## Examples of TCP proxy

### Using HAProxy as a TCP Proxy for Logs

This example explains how to configure the Datadog Agent to send logs in TCP to a server with Haproxy installed and listening on port `10514` to then forward the logs to Datadog.

`agent ---> haproxy ---> Datadog`

The encryption is disabled between the Agent and Haproxy which is then configured to encrypt the data before sending it to Datadog.

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
    
# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
    
# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**Note**: Download the certificate with the following command:
        * `sudo apt-get install ca-certificates` (Debian, Ubuntu)
        * `yum install ca-certificates` (CentOS, Redhat)
The file might be located at `/etc/ssl/certs/ca-bundle.crt` for CentOS, Redhat.

Once the HAProxy configuration is in place, you can reload it or restart HAProxy. **It is recommended to have a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.com` fails over to another IP.

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
    
# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
    
# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

**Note**: Download the certificate with the following command:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

The file might be located at `/etc/ssl/certs/ca-bundle.crt` for CentOS, Redhat.

Once the HAProxy configuration is in place, you can reload it or restart HAProxy. **It is recommended to have a `cron` job that reloads HAProxy every 10 minutes** (usually doing something like `service haproxy reload`) to force a refresh of HAProxy's DNS cache, in case `app.datadoghq.eu` fails over to another IP.

{{% /tab %}}
{{< /tabs >}}

#### Agent configuration

Then edit the `datadog.yaml` Agent configuration file and set `logs_no_ssl` to `true`. This is needed as Haproxy does not simply forward the traffic and is not the Datadog backend so cannot use the same certificate.

**Note**: `logs_no_ssl` might set to true because Haproxy is configured to encrypt the data. Do not set this parameter to `true` otherwise.

```
logs_config:
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:10514"
  logs_no_ssl: true
```

### Using NGINX as a TCP Proxy for logs

This example explains how to configure the Datadog Agent to send logs in TCP to a server with NGINX installed and listening on port `10514` to then forward the logs to Datadog.

`agent ---> nginx ---> Datadog`

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
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Agent configuration

Then edit the `datadog.yaml` Agent configuration file and set `logs_config.logs_dd_url` to use the newly created proxy instead of establishing a connection directly with Datadog:

```yaml
logs_config:
  logs_dd_url: myProxyServer.myDomain:10514
```

Do not change the `logs_no_ssl` parameter as NGINX is simply forwarding the traffic to Datadog and does not decrypt or encrypt the traffic.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/proxy
[2]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
