---
last_modified: 2015/04/22
translation_status: translated
language: ja
title: Datadog-Apache Integration
integration_title: Apache
kind: integration
doclevel: complete
---
<!-- <div id="int-overview">
<h3>Overview</h3>

<p>Get metrics from Apache in real time; graph them and correlate them with other relevant system metrics and events.</p>
<ul>
  <li>Visualize your web server performance</li>
  <li>Correlate the performance of Apache with the rest of your applications</li>
</ul>

</div> -->

### 概要と目的
{: #int-overview}

Apacheからリアルタイムでメトリクスの収集しグラフ化すると共に、他の関連したメトリクスやイベントと相互に関係付けてる。

* Webサーバのパフォーマンスの可視化する
* Apacheのパフォーマンスをインフラに含まれる他のアプリケーションと相互に関連付けて把握する


<!-- From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/apache.yaml.example">Apache YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/apache.py">Apache checks.d</a> -->

### Datadog Agentの関連ソールコードへのリンク

* [Apache checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/apache.py)
* [Apache YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/apache.yaml.example)


<!-- The following metrics are collected by default with the Apache integration:

    apache.net.bytes
    apache.net.bytes_per_s
    apache.net.hits
    apache.net.request_per_s
    apache.performance.busy_workers
    apache.performance.cpu_load
    apache.performance.idle_workers
    apache.performance.uptime -->

### 収集しているメトリクス

Apacheインテグレーションは、次のメトリクスをディフォルトで収集してます:

    apache.net.bytes
    apache.net.bytes_per_s
    apache.net.hits
    apache.net.request_per_s
    apache.performance.busy_workers
    apache.performance.cpu_load
    apache.performance.idle_workers
    apache.performance.uptime


<!-- <div id="int-configuration">
<h3>Configuration</h3>
 <p><em>To capture Apache metrics you need to install the Datadog agent.</em></p>

<ol>
  <li><b>Make sure that <a href="http://httpd.apache.org/docs/2.0/mod/mod_status.html"><code>mod_status</code></a> is installed on your Apache server</b> with <code>ExtendedStatus</code> set to <code>on</code></li>
  <li>Configure the agent to connect to Apache<br>
      Edit <code>/etc/dd-agent/conf.d/apache.yaml</code><br><br>
        <pre class="textfile"><code>init_config:

instances:
    -   apache_status_url: http://example.com/server-status?auto
        # apache_user: example_user
        # apache_password: example_password
        tags:
            -   instance:foo
    </code>
</pre></li>

  <li>Restart the agent
        <pre class="linux"><code>sudo /etc/init.d/datadog-agent restart</code></pre>
  </li>
  <li> Verification:
  <pre class="verification"><code>sudo /etc/init.d/datadog-agent info</code></pre>
    </li>
</ol>
</div> -->


### 設定
{: #int-configuration}

**Apacheのメトリクスを収集するには、Datadog Agentのインストールがつようです。**  
*詳細は、[Datadog Agent 入門](/ja/guides/basic_agent_usage/)を参照してください。*

1.**Apacheサーバに、[`mod_status`](http://httpd.apache.org/docs/2.0/mod/mod_status.html) がインストールされ**、そのモジュールが`ExtendedStatus`付きで有効化されていることを確認してください。

2.Apacheのメトリクスを収集するためのにDatadog Agentの設定ファイル`/etc/dd-agent/datadog.conf`を次のように設定してください。(`mod_status`が、メトリクスを表示しているURLを指定します。)

  `/etc/dd-agent/datadog.conf`の編集例

~~~
init_config:

instances:
-   apache_status_url: http://example.com/server-status?auto
# apache_user: example_user
# apache_password: example_password
tags:
    -   instance:foo
~~~

3.`datadog.conf`の設定が完了したら、Datadog Agentを再起動します。

~~~
sudo /etc/init.d/datadog-agent restart
~~~

4.次のコマンドで再起動の確認をします。

~~~
sudo /etc/init.d/datadog-agent info
~~~
