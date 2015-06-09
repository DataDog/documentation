---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-IIS Integration
integration_title: IIS
kind: integration
doclevel: complete
---

### Overview
{:#int-overview}

Connect IIS to Datadog in order to:

- Visualize your web server performance.
-  Correlate the performance of IIS with the rest of your applications.

From the open-source Agent:

* [IIS YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/iis.yaml.example)
* [IIS checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/iis.py)

The following metrics are collected by default with the IIS integration:

    iis.errors.locked
    iis.errors.not_found
    iis.httpd_request_method.delete
    iis.httpd_request_method.get
    iis.httpd_request_method.head
    iis.httpd_request_method.options
    iis.httpd_request_method.post
    iis.httpd_request_method.put
    iis.httpd_request_method.trace
    iis.net.bytes_rcvd
    iis.net.bytes_sent
    iis.net.bytes_total
    iis.net.connection_attempts
    iis.net.files_rcvd
    iis.net.files_sent
    iis.net.num_connections
    iis.requests.cgi
    iis.requests.isapi
    iis.uptime
    iis.users.anon
    iis.users.nonanon



Overall metric definitions from IIS can be found [here](http://msdn.microsoft.com/en-us/library/aa394298(v=vs.85).aspx).
