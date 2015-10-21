---
title: Datadog-NGINX Integration
integration_title: nginx
kind: integration
---
### Overview


Connect NGINX to Datadog in order to:

* Visualize your web server performance
* Correlate the performance of Nginx with the rest of your applications


The default agent checks require the [nginx stub status module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html), which is not compiled by default.  In debian/ubuntu, this module is enabled in the `nginx-extras` package.  To check if your version of nginx has the stub status module support compiled in, you can run:

```
$ nginx -V |& grep http_stub_status_module
```

If you see some output with `configure arguments:` and lots of options, then you have it enabled.  Once you have a status-enabled version of nginx, you can set up a URL for the status module:

    server {
      listen 80;
      server_name localhost;

      access_log off;
      allow 127.0.0.1;
      deny all;

      location /nginx_status {
        stub_status on;
      }
    }

For more information on configuration, read the [stub status docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html).  For some more insight into configuring the agent, check out the [nginx example YAML config](https://github.com/DataDog/dd-agent/blob/master/conf.d/nginx.yaml.example) or take a look at the [nginx agent plugin](https://github.com/DataDog/dd-agent/blob/master/checks.d/nginx.py).

The following metrics are collected by default via the stub status module:

* **nginx.net.connections**
* **nginx.net.conn_dropped_per_s**
* **nginx.net.conn_opened_per_s**
* **nginx.net.reading**
* **nginx.net.request_per_s**
* **nginx.net.waiting**
* **nginx.net.writing**

The data pulled from the nginx stub status page are described in the [nginx docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html#data).

#### NGINX Plus

If you are using NGINX Plus, you have access to the extended [http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).  The agent supports this module too, and will collect a much [longer list of metrics](https://github.com/DataDog/dd-agent/blob/master/tests/checks/fixtures/nginx/nginx_plus_out.python) when the instance target is an http status module URL.

The metrics shown for the basic NGINX integration show up differently in the NGINX Plus integration.
Here are the  metrics name changes from NGINX to NGINX Plus:

* **nginx.net.connections -> nginx.connections.active**
* **nginx.net.conn_opened_per_s -> nginx.connections.accepted**
* **nginx.net.conn_dropped_per_s -> nginx.connections.dropped**
* **nginx.net.request_per_s -> nginx.requests.total**

These metrics do not have a directly related metric, but here are close translations:

* **nginx.net.waiting -> nginx.connections.idle**
 * **nginx.net.waiting**: The current number of idle client connections waiting for a request.
 * **nginx.connections.idle**: The current number of idle client connections.

Finally, these metrics have no good translation:

* **nginx.net.reading**
 * The current number of connections where nginx is reading the request header.
* **nginx.net.writing**
 * The current number of connections where nginx is writing the response back to the client.

Here are some of the metrics collected from NGINX Plus:

* **nginx.connections.accepted**
* **nginx.connections.active**
* **nginx.connections.dropped**
* **nginx.connections.idle**
* **nginx.generation**
* **nginx.load_timestamp**
* **nginx.pid**
* **nginx.processes.respawned**
* **nginx.requests.current**
* **nginx.requests.total**
* **nginx.server_zone.discarded**
* **nginx.server_zone.processing**
* **nginx.server_zone.received**
* **nginx.server_zone.requests**
* **nginx.server_zone.responses.1xx**
* **nginx.server_zone.responses.2xx**
* **nginx.server_zone.responses.3xx**
* **nginx.server_zone.responses.4xx**
* **nginx.server_zone.responses.5xx**
* **nginx.server_zone.responses.total**
* **nginx.server_zone.sent**
* **nginx.ssl.handshakes**
* **nginx.ssl.handshakes_failed**
* **nginx.ssl.session_reuses**
* **nginx.timestamp**
* **nginx.upstream.keepalive**
* **nginx.upstream.peers.active**
* **nginx.upstream.peers.backup**
* **nginx.upstream.peers.downstart**
* **nginx.upstream.peers.downtime**
* **nginx.upstream.peers.fails**
* **nginx.upstream.peers.health_checks.checks**
* **nginx.upstream.peers.health_checks.fails**
* **nginx.upstream.peers.health_checks.last_passed**
* **nginx.upstream.peers.health_checks.unhealthy**
* **nginx.upstream.peers.id**
* **nginx.upstream.peers.received**
* **nginx.upstream.peers.requests**
* **nginx.upstream.peers.responses.1xx**
* **nginx.upstream.peers.responses.2xx**
* **nginx.upstream.peers.responses.3xx**
* **nginx.upstream.peers.responses.4xx**
* **nginx.upstream.peers.responses.5xx**
* **nginx.upstream.peers.responses.total**
* **nginx.upstream.peers.selected**
* **nginx.upstream.peers.sent**
* **nginx.upstream.peers.unavail**
* **nginx.upstream.peers.weight**
* **nginx.version**

The data pulled from the NGINX Plus status page are described in the [nginx docs](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).