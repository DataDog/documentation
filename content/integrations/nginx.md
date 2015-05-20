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
* **nginx.net.reading**
* **nginx.net.request_per_s**
* **nginx.net.waiting**
* **nginx.net.writing**

#### NGINX Plus

If you are using NGINX Plus, you have access to the extended [http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).  The agent supports this module too, and will collect a much [longer list of metrics](https://github.com/DataDog/dd-agent/blob/master/tests/checks/fixtures/nginx/nginx_plus_out.python) when the instance target is an http status module URL.
