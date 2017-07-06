---
title: Datadog-NGINX Integration
integration_title: NGINX
kind: integration
git_integration_title: nginx
---
### Overview

Connect NGINX to Datadog in order to:

* Visualize your web server performance
* Correlate the performance of NGINX with the rest of your applications

![NGINX default dashboard](/static/images/nginx.jpg)

Learn more about how to monitor NGINX performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-nginx/). We detail the key performance metrics, [how to collect them](https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html), and [how to use Datadog to monitor NGINX](https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html).

The default agent checks require the [NGINX stub status module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html), which is not compiled by default.  In debian/ubuntu, this module is enabled in the `nginx-extras` package.  To check if your version of nginx has the stub status module support compiled in, you can run:

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

For more information on configuration, read the [stub status docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html).

<%= insert_example_links%>

**All metrics collected for NGINX and NGINX Plus**

<%= get_metrics_from_git()%>

#### NGINX (Open Source)

<%= get_metrics_from_git('nginx', 'nginx.net.writing,nginx.net.waiting,nginx.net.reading,nginx.net.connections,nginx.net.request_per_s,nginx.net.conn_opened_per_s,nginx.net.conn_dropped_per_s' )%>

The data pulled from the nginx stub status page are described in the [NGINX docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html#data).

#### NGINX Plus

If you are using NGINX Plus, you have access to the extended [http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).  The agent supports this module too, and will collect a much [longer list of metrics](https://github.com/DataDog/integrations-core/blob/master/nginx/ci/fixtures/nginx_plus_out.python) when the instance target is an http status module URL.

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
{:.table}

<br/>
Finally, these metrics have no good translation:

| nginx.net.reading | The current number of connections where nginx is reading the request header. |
| nginx.net.writing | The current number of connections where nginx is writing the response back to the client. |
{:.table}


The data pulled from the NGINX Plus status page are described in the [NGINX docs](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).
