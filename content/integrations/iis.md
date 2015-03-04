---
title: Datadog-IIS Integration
kind: documentation
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Connect IIS to Datadog in order to:
<ul>
<li> Visualize your web server performance.</li>
<li> Correlate the performance of IIS with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/iis.yaml.example">
IIS YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/iis.py">
IIS checks.d</a>

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



Overall metric definitions from IIS can be found <a target="_blank" href="http://msdn.microsoft.com/en-us/library/aa394298(v=vs.85).aspx">here</a>.
