---
title: Proxy Example with NGINX
further_reading:
- link: "/agent/configuration/proxy/"
  tag: "Documentation"
  text: "Agent Proxy Configuration"
private: true
---

## Overview

<div class="alert alert-danger">
Datadog discourages forwarding traffic using software like HAProxy or NGINX because it requires you to manually configure and maintain the list of specific Datadog endpoints the Agent needs to reach. This list can change, leading to potential data loss if not kept up-to-date. The only exception is if you need Deep Packet Inspection (DPI) capabilities, in which case you might consider using HAProxy or NGINX as they allow you to disable TLS or use your own TLS certificates and inspect the traffic.
</div>

[NGINX][2] is a web server which can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache. You can also use NGINX as a proxy for your Datadog Agents:

`agent ---> nginx ---> Datadog`

The communication between NGINX and Datadog is always encrypted with TLS. The communication between the Agent host and the NGINX host is not encrypted by default, because the proxy and the Agent are assumed to be on the same host. However, it is recommended that you secure this communication with TLS encryption if they are not located on the same isolated local network.
In order to encrypt data between the Agent and NGINX, you need to create an x509 certificate with the Subject Alternative Name (SAN) extension for the NGINX host.

**Note**: Download the Datadog certificate with one of the following commands:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

The path to the certificate is `/etc/ssl/certs/ca-certificates.crt` for Debian and Ubuntu or `/etc/ssl/certs/ca-bundle.crt` for CentOS and Red Hat.

### Proxy forwarding with NGINX

#### NGINX configuration

NGINX should be installed on a host that has connectivity to Datadog. You can use one of the following configuration files if you do not already have it configured. The configuration is dependent on the Datadog service and site. To see configurations based on your [Datadog site][1], use the `DATADOG SITE` selector on the right.

**Note**: It is recommended to use the `HTTPS` configuration file if the Agent and NGINX are not part of the same isolated local network.

##### HTTP

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847; #listen for network path
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS

This configuration adds SSL/TLS encryption on communication between the Agent and NGINX. Replace `<PATH_TO_PROXY_CERTIFICATE>` with the path to the proxy public certificate and `<PATH_TO_PROXY_CERTIFICATE_KEY>` with the path to the private key.

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847 ssl; #listen for network path
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

**Note**: You can remove `proxy_ssl_verify on` if you are unable to get the certificates on the proxy host, but be aware that NGINX will not be able to verify Datadog's intake certificate in that case.

#### Datadog Agent configuration

Edit each Agent configuration file to point to NGINX by setting its `dd_url` to the address of NGINX, for example: `nginx.example.com`.
This `dd_url` setting can be found in the `datadog.yaml` file.

`dd_url: "<SCHEME>://nginx.example.com:3834"`

Replace `<SCHEME>` with `https` if you previously chose the HAProxy HTTPS configuration, or with `http` if you did not choose HTTPS.

To send traces, profiles, processes, and logs through the proxy, setup the following in the `datadog.yaml` file:

```yaml
apm_config:
    apm_dd_url: <SCHEME>://nginx.example.com:3835
    profiling_dd_url: <SCHEME>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHEME>://nginx.example.com:3837

logs_config:
    force_use_http: true
    logs_dd_url: nginx.example.com:3838
    # Comment the line below to use encryption between the Agent and NGINX
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # Comment the line below to use encryption between the Agent and NGINX
    no_tls: true
```

When using encryption between the Agent and NGINX, if the Agent does not have access to the proxy certificate, is unable to validate it, or the validation is not needed, you can edit the `datadog.yaml` Agent configuration file and set `skip_ssl_validation` to `true`.
With this option set to `true`, the Agent skips the certificate validation step and does not verify the identity of the proxy, but the communication is still encrypted with SSL/TLS.

```yaml
skip_ssl_validation: true
```

When sending logs over TCP, see [TCP Proxy for Logs][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://www.nginx.com
[3]: /agent/logs/proxy
