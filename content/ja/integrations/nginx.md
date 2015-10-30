---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-NGINX Integration
integration_title: NGINX
kind: integration
doclevel:
---
<!-- <div id="int-overview">
<h3>Overview</h3>
</div> -->

<div id="int-overview">
  <h3>概要</h3>
</div>

<!-- Connect NGINX to Datadog in order to:

* Visualize your web server performance
* Correlate the performance of Nginx with the rest of your applications -->

NGINXのメトリクスを、次の目的の為Datadogに送信します:

* Webサーバのパフォーマンスの可視化する。
* 関連するアプリケーションに合わせてNginxのパフォーマンスを調整する。


<!-- The default agent checks require the [nginx stub status module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html), which is not compiled by default.  In debian/ubuntu, this module is enabled in the `nginx-extras` package.  To check if your version of nginx has the stub status module support compiled in, you can run: -->


Datadog-agentのインテグレーションを使ってNginxのメトリクスを取得する為には、 [nginx stub status module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html)が、有効になっている必要があります。Nginxのデフォルト設定では、このモジュールは有効になっていません。(但しdebian/ubuntuでは、`nginx-extras`パッケージ内で同時にインストールされ、有効化されているはずです。)

使用しているNginxのstub statusモジュールのサポートが有効になっているか確認する為には、次のコマンドを実行して下さい:


~~~
nginx -V |& grep http_stub_status_module
~~~

出力結果は、次のようになります。

~~~
configure arguments: --with-cc-opt='-g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_spdy_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module
~~~

<!-- If you see some output with `configure arguments:` and lots of options, then you have it enabled.  Once you have a status-enabled version of nginx, you can set up a URL with for the status module: -->

`configure arguments:`のオプションリストの中に`--with-http_stub_status_module`が含まれていれば、stub statusモジュールは有効です。

オプションの確認が済んだら、stub statusモジュールがリクエストを待ち受けるURLを設定します。次にの3行を稼働しているwebサイトの`server{}`区分に追記します:

~~~
location /nginx_status {
    stub_status on;
}
~~~

<!-- For more information on configuration, read the [stub status docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html).  For some more insight into configuring the agent, check out the [nginx example YAMl config](https://github.com/DataDog/dd-agent/blob/master/conf.d/nginx.yaml.example) or take a look at the [nginx agent plugin](https://github.com/DataDog/dd-agent/blob/master/checks.d/nginx.py).

The following metrics are collected by default via the stub status module: -->

Nginxの再起動後に、webサイトの`URL/nginx_status`にアクセスし、次のような情報が表示されれば、stub status moduleの設定は終了です。

~~~
Active connections: 1
server accepts handled requests
4 4 2
Reading: 0 Writing: 1 Waiting: 0
~~~

stub statusモジュールの設定方法の詳細に関しては、 [stub status docs](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html)を参照して下さい。

Datadog AgentへNginxインテグレーションを追加するには、`/etc/dd-agent/conf.d`以下にnginx.yamlを設置し、先のURL(`URL/nginx_status`)を指定します。設定に必要な記述内容の詳細は、[nginx example YAMl config](https://github.com/DataDog/dd-agent/blob/master/conf.d/nginx.yaml.example)を参考にして下さい。(さらに詳しい情報が必要な場合は、インテグレーションのソースコード: [nginx agent plugin](https://github.com/DataDog/dd-agent/blob/master/checks.d/nginx.py)を参照して下さい。)

設定が完了すると、次のメトリクスを取得出来るようになります:

* **nginx.net.connections**
* **nginx.net.conn_dropped_per_s**
* **nginx.net.conn_opened_per_s**
* **nginx.net.reading**
* **nginx.net.request_per_s**
* **nginx.net.waiting**
* **nginx.net.writing**

<!-- #### NGINX Plus -->

#### NGINX Plusについて

<!-- If you are using NGINX Plus, you have access to the extended [http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data).  The agent supports this module too, and will collect a much [longer list of metrics](https://github.com/DataDog/dd-agent/blob/master/tests/data/nginx_plus_out.python) when the instance target is an http status module URL. -->

NGINX Plusを採用している場合、[http_status_module](http://nginx.org/en/docs/http/ngx_http_status_module.html#data)を経由し、更に多くのメトリクスを収集することが出来ます。Datadog Agentは、このモジュールにも対応し、[リンク先に示すようなメトリクス](https://github.com/DataDog/dd-agent/blob/master/tests/data/nginx_plus_out.python)を取得出来るようになっています。

設定が完了すると、次のメトリクスを取得出来るようになります:

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
