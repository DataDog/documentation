---
title: Datadog-NGINX Integration
integration_title: NGINX
kind: integration
---
### Overview


Connect NGINX to Datadog in order to:

* Visualize your web server performance
* Correlate the performance of Nginx with the rest of your applications

![NGINX default dashboard](/static/images/nginx.jpg)

Learn more about how to monitor NGINX performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-nginx/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor NGINX.

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


| Metrics collected by default via stub status module |
|--------------------------------|
|nginx.net.connections | The current number of active client connections including Waiting connections. |
|nginx.net.conn_dropped_per_s |
|nginx.net.conn_opened_per_s |
|nginx.net.reading | The current number of connections where nginx is reading the request header.|
|nginx.net.request_per_s | The total number of client requests.|
|nginx.net.waiting | The current number of idle client connections waiting for a request. |
|nginx.net.writing | The current number of connections where nginx is writing the response back to the client.|
{:.table}

The data pulled from the nginx stub status page are described in the [nginx docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html#data).

#### NGINX Plus

If you are using NGINX Plus, you have access to the extended [http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).  The agent supports this module too, and will collect a much [longer list of metrics](https://github.com/DataDog/dd-agent/blob/master/tests/checks/fixtures/nginx/nginx_plus_out.python) when the instance target is an http status module URL.

The metrics shown for the basic NGINX integration show up differently in the NGINX Plus integration.
Here are the  metrics name changes from NGINX to NGINX Plus:

| NGINX Metrics | NGINX Plus Metrics |
|-------------------|-------------------|
| nginx.net.connections | nginx.connections.active |
| nginx.net.conn_opened_per_s | nginx.connections.accepted |
| nginx.net.conn_dropped_per_s | nginx.connections.dropped |
| nginx.net.request_per_s | nginx.requests.total |
{:.table}

<br/>
These metrics do not have a directly related metric, but here are close translations:

| NGINX Metrics | NGINX Plus Metrics |
|-------------------|-------------------|
| nginx.net.waiting | nginx.connections.idle|
 | nginx.net.waiting|  The current number of idle client connections waiting for a request|
 | nginx.connections.idle| The current number of idle client connections|
{:.table}

<br/>
Finally, these metrics have no good translation:

| NGINX Metrics | NGINX Plus Metrics |
|-------------------|-------------------|
| nginx.net.reading | The current number of connections where nginx is reading the request header. |
| nginx.net.writing | The current number of connections where nginx is writing the response back to the client. |
{:.table}

<br/>

| Other metrics collected in NGINX Plus |
|--------------------------|
| nginx.connections.accepted | The total number of accepted client connections.|
| nginx.connections.active |The current number of active client connections.|
| nginx.connections.dropped |The total number of dropped client connections.|
| nginx.connections.idle |The current number of idle client connections.|
| nginx.generation | The total number of configuration reloads.|
| nginx.load_timestamp | Time of the last reload of configuration, in milliseconds since Epoch.|
| nginx.pid | The ID of the worker process that handled status request.|
| nginx.processes.respawned |The total number of abnormally terminated and respawned child processes.|
| nginx.requests.current | The current number of client requests.|
| nginx.requests.total |The total number of client requests.|
| nginx.server_zone.discarded |The total number of requests completed without sending a response.|
| nginx.server_zone.processing |The number of client requests that are currently being processed.|
| nginx.server_zone.received |The total number of bytes received from clients.|
| nginx.server_zone.requests |The total number of client requests received from clients.|
| nginx.server_zone.responses.1xx |The number of responses with 1xx status code.|
| nginx.server_zone.responses.2xx |The number of responses with 2xx status code.|
| nginx.server_zone.responses.3xx |The number of responses with 3xx status code.|
| nginx.server_zone.responses.4xx |The number of responses with 4xx status code.|
| nginx.server_zone.responses.5xx |The number of responses with 5xx status code.|
| nginx.server_zone.responses.total |The total number of responses sent to clients.|
| nginx.server_zone.sent |The total number of bytes sent to clients.|
| nginx.ssl.handshakes |The total number of successful SSL handshakes.|
| nginx.ssl.handshakes_failed |The total number of failed SSL handshakes.|
| nginx.ssl.session_reuses |The total number of session reuses during SSL handshake.|
| nginx.timestamp |Current time in milliseconds since Epoch.|
| nginx.upstream.keepalive |The current number of idle keepalive connections.|
| nginx.upstream.peers.active |The current number of active connections.|
| nginx.upstream.peers.backup |A boolean value indicating whether the server is a backup server.|
| nginx.upstream.peers.downstart |The time (in milliseconds since Epoch) when the server became “unavail” or “unhealthy”.|
| nginx.upstream.peers.downtime |Total time the server was in the “unavail” and “unhealthy” states.|
| nginx.upstream.peers.fails |The total number of unsuccessful attempts to communicate with the server.|
| nginx.upstream.peers.health_checks.checks |The total number of health check requests made.|
| nginx.upstream.peers.health_checks.fails |The number of failed health checks.|
| nginx.upstream.peers.health_checks.last_passed |Boolean indicating if the last health check request was successful and passed tests.|
| nginx.upstream.peers.health_checks.unhealthy |How many times the server became unhealthy (state “unhealthy”).|
| nginx.upstream.peers.id |The ID of the server.|
| nginx.upstream.peers.received |The total number of bytes received from this server.|
| nginx.upstream.peers.requests |The total number of client requests forwarded to this server.|
| nginx.upstream.peers.responses.1xx |The number of responses with 1xx status code.|
| nginx.upstream.peers.responses.2xx |The number of responses with 2xx status code.|
| nginx.upstream.peers.responses.3xx |The number of responses with 3xx status code.|
| nginx.upstream.peers.responses.4xx |The number of responses with 4xx status code.|
| nginx.upstream.peers.responses.5xx |The number of responses with 5xx status code.|
| nginx.upstream.peers.responses.total |The total number of responses obtained from this server.|
| nginx.upstream.peers.selected |The time (in milliseconds since Epoch) when the server was last selected to process a request (1.7.5).|
| nginx.upstream.peers.sent |The total number of bytes sent to this server.|
| nginx.upstream.peers.unavail |How many times the server became unavailable for client requests (state “unavail”) due to the number of unsuccessful attempts reaching the max_fails threshold.|
| nginx.upstream.peers.weight |Weight of the server.|
| nginx.version | Version of nginx. |
{:.table}

The data pulled from the NGINX Plus status page are described in the [nginx docs](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).
