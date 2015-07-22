---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-IIS Integration
integration_title: IIS
kind: integration
doclevel: complete
---

<!-- ### Overview
{:#int-overview}

Connect IIS to Datadog in order to:

- Visualize your web server performance.
-  Correlate the performance of IIS with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的で、IISのメトリクスをDatadogに送信します:

* IISのパフォーマンスを可視化する
* IISのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する


<!-- From the open-source Agent:

* [IIS YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/iis.yaml.example)
* [IIS checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/iis.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [IISインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/iis.yaml.example)
* [IISインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/iis.py)


<!-- The following metrics are collected by default with the IIS integration:

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


Overall metric definitions from IIS can be found [here](http://msdn.microsoft.com/en-us/library/aa394298(v=vs.85).aspx). -->

IIS インテグレーションがデフォルトで取得しているメトリクス:

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


IISのメトリクスに関する詳細は、Microsoftの[「Win32_PerfFormattedData_W3SVC_WebService class」](https://msdn.microsoft.com/en-us/library/aa394298(v=vs.85).aspx)ページを参照してください。
