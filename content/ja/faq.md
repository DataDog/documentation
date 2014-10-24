---
title: Frequently Asked Questions
kind: documentation
sidebar:
  nav:
    - header: FAQ トピック
    - text: Agentについて
      href: "/faq/#agent"
    - text: アラートについて
      href: "/faq/#alerts"
    - text: APIについて
      href: "/faq/#api"
    - text: アーキテクチャについて
      href: "/faq/#architecture"
    - text: AWSについて
      href: "/faq/#aws"
    - text: 請求について
      href: "/faq/#billing"
    - text: グラフ化について
      href: "/faq/#graph"
    - text: Integrationについて
      href: "/faq/#integrations"
    - text: メトリクスについて
      href: "/faq/#metrics"
    - text: イベントについて
      href: "/faq/#events"
    - text: その他
      href: "/faq/#other"

---
<!-- Old table of contents
<ol class="outline">
    <li><a href="#agent">Agent<ol>
        <li><a href="#agent-config-files">Where are the agent's config files located?</a></li>
        <li><a href="#agent-version">How can I tell what version of the agent is running?</a></li>
    </ol></li>
    <li><a href="#api">API<ol>
        <li><a href="#api-metric-names">What are valid metric names?</a></li>
        <li><a href="#api-tags">What are valid tags?</a></li>
    </ol></li>
    <li><a href="#arch">Architecture<ol>
        <li><a href="#arch-cloud-or-server">Is datadog a cloud service or server application?</a></li>
        <li><a href="#arch-graphite-differences">What's the difference between Graphite's query language and Datadog's?</a></li>
    </ol></li>
    <li><a href="#graph">Graphing<ol>
        <li><a href="#graph-sum-grouped">How do I do arithmetic with grouped metrics?</a></li>
    </ol></li>
</ol>
-->


<!--
===============================================================================
    Agent
===============================================================================
-->

### Agentについて {#agent}

<!-- this is not currently true
<h4 id="dogstatsd-flush-interval">Is the DogStatsD flush interval configurable?</h4>
<p>
Yes, it is!  You can change the flush interval by updating your agent’s configuration file called datadog.conf and replacing the value for the “dogstatsd_interval” key.  Use the following link, select your OS in the left column, and go to the Configuration section to find the location of your agent’s configuration file: <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">http://docs.datadoghq.com/guides/basic_agent_usage/</a>
</p>
-->

<!--#### Is the agent necessary to use Datadog? {#agent-optional}

* No, it is not. You don't have to install an agent if you only want to submit
metrics via our API. You can read more about our API [here][api].
* In general, most folks find a lot of value in installing an agent because
they get system metrics for free and metrics on common software like mysql,
postgres, etc. with just a little bit of configuration. Another advantage is
that there is a small statsd server built-in to the agent.
-->

#### Datadogを利用するのに、Datadog Agent のインストールは必要ですか。 {#agent-optional}

* いいえ不要です。Datadogが提供するAPIを使ってメトリクスを送信するだけなら、どのAgentをインストール必要も有りません。
APIの詳細については、[次のページ][api]を参照してください。
* 一般的には、多くのユーザーがAgentのインスットールに価値を見出しています。
Agentをインストールすることでシステムのメトリックすが自動に収集できる上、mysqlやpostgresなどのよく使われるソフトウェアのメトリクスが最低限の設定で収集できるようになります。


<!--#### Can I use my own StatsD client? {#statsd}

Any StatsD client will work just fine, but using the Datadog DogStatsD client
will give you a few extra features. You can read more about our clients extra
features [here][dogstatsd].
-->

#### 独自のStatsDクライアントを使うことはできますか。 {#statsd}

StatsDのクライアントならどれでも使えます。
しかし、DatadogのDogStatsDクライアントには、幾つかの追加機能があります。
DogStatsDクライアントの追加機能の詳細については、[次のページ][dogstatsd]を参照していください。


<!--#### How can I change the hostname {#hostname-change}

You can change the hostname by updating your agent’s configuration file called
datadog.conf and replacing the value for the “hostname” key.  Use the following
link, select your OS in the left column, and go to
the [Configuration section][basic_agent_usage] to find the location of your
agent’s configuration file.-->

#### hostnameはどのように変更すればいいですか。 {#hostname-change}

datadog.confというDatadog Agentの設定ファイル内のhostname”の値を変更し、ファイル更新することでホスト名を変更することができます。
設定ファイルの保存先は、[次のページ][basic_agent_usage_ja]の左メニューから、Datadog AgnetをインストールしたOSを選択し、
**設定ファイルの保存されているディレクトリ**のセクションにて確認してください。


<!--#### How do I uninstall the agent {#agent-uninstall}

* Mac OS:

  ~~~
  $ launchctl unload -w ~/LibraryLaunchAgents/com.datadoghq.Agent.plist
  $ rm -r ~/.datadog-agent
  $ rm ~/Library/LaunchAgents/com.datadoghq.Agent.plist
  ~~~

* Windows: You can uninstall the agent in Add/Remove Programs
* Linux: ```$ sudo apt-get remove datadog-agent -y```
* CentOS 5: ```$ sudo yum remove datadog-agent-base```
* CentOS 6: ```$ sudo yum remove datadog-agent```-->

#### Datadog Agentは、どのようにアンインストールすればよいですか。 {#agent-uninstall}

* Mac OS:

  ~~~
  $ launchctl unload -w ~/LibraryLaunchAgents/com.datadoghq.Agent.plist
  $ rm -r ~/.datadog-agent
  $ rm ~/Library/LaunchAgents/com.datadoghq.Agent.plist
  ~~~

* Windows: コントルールパネルから移動し、プログラム追加/削除で削除できます。
* Linux: ```$ sudo apt-get remove datadog-agent -y```
* CentOS 5: ```$ sudo yum remove datadog-agent-base```
* CentOS 6: ```$ sudo yum remove datadog-agent```


<!--#### I stopped my agent but I’m still seeing the host in my Datadog account. Why is that? {#agent-stopped}

It can take up to 24h for the host to disappear from the infrastructure page,
but it will only be part of the host count for billing purposes if we're
actually receiving data.-->

#### ホスト上でDatadog Agentを停止しますたが、ダッシュボード上には未だそのホストが表示されています。 {#agent-stopped}

Infrastructureのページから、ホスト名から消えるのに最長で24時間くらいかかります。
Agentを停止したのちダッシュボードにホスト名が残っている時間は、そのホストに対しは課金請求を受けることはありません。
課金の判定基準は、メトリクスデーターをDatadog側で受信しているかどうかです。


<!--#### Other Agent-related questions? {#agent-other}

Please refer to the [Basic Agent Usage Guide][basic_agent_usage]. -->

#### その他のDatadog Agent 関連の質問。 {#agent-other}

[Datadog Agent 入門][basic_agent_usage_ja]を参照してください。


<!--[api]: /api/
[dogstatsd]: /guides/dogstatsd/
[basic_agent_usage]: /guides/basic_agent_usage/-->

[api]: /api/
[dogstatsd]: /guides/dogstatsd/
[basic_agent_usage]: /guides/basic_agent_usage/
[basic_agent_usage_ja]: /ja/guides/basic_agent_usage/


<!--
===============================================================================
    Alerts
===============================================================================
-->

<!--### Alerts {#alerts}

#### I set up an alert with one of my integration metrics. Why am I getting so many No Data alerts? {#no-data}

For the AWS [No Data] errors, the issue here has to do with how frequently we
receive AWS metrics. Because our crawlers are rate-limited by the Cloudwatch
APIs, data is often delayed by 10 or more minutes, so we generally recommend
that an alert for an AWS metric be set to have a threshold window of at least
30 minutes or an hour (you can see this in step 3 of alert creation, “during
the last…”). Switching the time frame on this alert will resolve this issue, or
you can install the agent on some AWS hosts to get more up-to-date data to
alert on. Overall, we’re always working towards getting data more efficiently
from AWS. -->

### アラートについて {#alerts}

### メトリクスにアラートを設定したところ、なぜか非常に多くの[No Data] アラートが発生します。 {#no-data}

AWSの[No Data]エラーの問題は、DatadogがAWSからのメトリクスを受信する頻度に関係しています。
DatadogのクローラーはCloudwatch APIの実行制限の制約の影響を受け、メトリクスデーターは、10分かそれ以上遅延します。
従って、AWSのメトリクスにアラートを設定する場合、30分から1時間の時間枠での設定を推奨しています。
(この時間枠の設定は、[アラートの設定方法][alerting_ja]ページのアラートの新規設定の第3ステップを参照してください。)
アラートの発報条件の時間枠を変更することで、この問題は解決するはずです。
より粒度の細かいデーターでアラートを設定したい場合は、AWS上で起動しているホストにインストールしたDatadog Agentから送信されるメトリクスデーターを基にアラートを設定することをお勧めします。


<!--#### Is it possible to set up alerts based on % utilisation? For example alerting when 50% of memory has been used or 80% of disk space is used? {#alert-disk-utilization}

* Yes, this can be done! Here is an example for creating a disk space in use
alert when at 80% or above:
  1. Select a metric like "system.disk.in_use".
  2. Select the "threshold alert" type.
  3. For set alert grouping, select "simple alert".
  4. Set alert conditions: Select Above and for the value put 0.8.
  5. Add a custom message for alert if you'd like.
* You can read more about setting up alerts [here][alerting]</a>.

[alerting]: guides/alerting/-->

### リソースの利用率に基づいてアラートを発報することはできますか。例えば、メモリーの利用率が50％になった時や、ディスク領域の使用率が80％になった時など。 {#alert-disk-utilization}

* **はい、可能です。**
* 詳細については、[アラートの設定方法][alerting_ja]のページを参照してください。
* 以下が、ディスク使用率が80％の時に発報するアラートの設定手順の概要です:
  1. `system.disk.in_use` というメトリクスを選択します。
  2. `threshold alert` タイプを選択します。
  3. `simple alert` グループタイプを選択します。
  4. "Set alert conditions:" で、`Above`を選択し、 値に`0.8`を入力します。
  5. "Say what's happening" にアラートメッセージを設定します。

[alerting]: /guides/alerting/
[alerting_ja]: /ja/guides/alerting/

<!--
===============================================================================
    API
===============================================================================
-->

<!--### APIについて {#api}

#### What are valid metric names? {#api-metric-names}

Metric names must start with a letter, and after that may contain ascii alphanumerics, underscore and periods.
Other characters will get converted to underscores. There is no max length. Unicode is not support.
We recommend avoiding spaces.
Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. http.nginx.response_time).
We say pseudo-hierarchical because we’re not actually enforcing a hierarchy or doing anything with it,
but we have aspirations to use it to infer things about servers (e.g. “hey, I see hostA and hostB are
reporting ‘http.nginx.*’, those must be web frontends”). -->

### APIについて {#api}

#### メトリクスの命名規則はありますか。 {#api-metric-names}

- メトリクス名は、ascii英字で始める必要があります。2文字目以降は、ascii英数字、アンダースコア、ピリオドを使用することができます。
これらの条件に合わない全ての文字は、アンダースコアに変換されます。
- メトリクス名には、文字数の制限はありません。
- Unicodeはサポートされていません。
- 空白は使用しないでください。

Datadog Agentによって送信されるメトリクス名は、疑似階層ドット形式（例：http.nginx.response_time）になります。この形式を採用しているのは、メトリクス名から各サーバーの機能を推測し易くするためです。例えば、「hostAとhostBは、‘http.nginx.*’だから、多分これらはwebのフロントエンドのインスタンスだよね〜」という感じです。

<!--#### What are valid tags? {#api-tags}

Tags must start with a letter, and after that may contain alphanumerics,
underscores, minuses, colons, periods and slashes. Other characters will get
converted to underscores. Tags can be up to 200 characters long and support
unicode. Tags will be converted to lowercase as well.-->

#### タグの。命名規則はありますか。 {#api-tags}

- タグ名は、ascii英字で始める必要があります。2文字目以降は、英数字、アンダースコア、マイナス、コロン、ピリオド、スラッシュを使用することができます。これらの条件に合わない全ての文字は、アンダースコアに変換されます。
- タグ名は、最大が200文字の制限があります。
- Unicodeをサポートします。
- タグ名は、全て小文字に変換されます。


<!--#### I'm submitting points to the API- anything I should know? {#api-else}

We store metric points at the 1 second resolution, but we’d prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps
will get rounded to the nearest second, and if any points have the same timestamp,
the latest point will overwrite the previous ones.

We have a soft limit of 100 time series per host, where a time series is
defined as a unique combination of metric name and tag.-->

#### API経由でメトリクスデーターを送信しようとしています。その際に注意することはありますか。 {#api-else}

Datadogでは、1秒の分解能でメトリクスのデーターを保存していますが、15秒間隔でのメトリクス・ポイントのデーター送信を推奨しています。
タイムスタンプの１秒以下の部分は、最も近い秒単位に丸められます。
この処理によって、同じタイムスタンプが複数発生した場合、先に受信したデーターは、後から受信したタイムスタンプのデーターによって上書きされます。　

Datadogでは、100個/ホストの時系列データーの制限を設けています。
ここでいう時系列データーとは、メトリクス名とタグの組み合わせの数になります。


<!--
===============================================================================
    Architecture
===============================================================================
-->

<!--### Architectureについて {#architecture}

#### Is Datadog a cloud service or server application? {#arch-cloud-or-server}

It's primarily a cloud service, but if you want to collect data on your servers,
there is an Agent you'll need to install. We never make any direct connections
to your infrastructure. For cloud integrations, we connect to them using the
credentials you provide to us.-->

### アーキテクチャについて {#architecture}

#### Datadogは、クラウドサービスですか、それもとサーバーにインストールするアプリケーションですか。 {#arch-cloud-or-server}

Datadogは、クラウドサービスです。しかし、サーバー上のメトリクスデータを収集するためには、それらのデーターをDatadogのサービスに転送するためのAgentをインストールする必要があります。
Datadog側からは、監視対象のインフラに直接コネクションを張るすることはありません。
AWS Integrationなど、クラウドプロバイダーの監視用のAPIを使ったインテグレーションでは、設定時に記述された認証情報でのみ監視情報を収取します。


<!--#### How do I delete a host or metric? {#arch-delete}

All hosts or metrics that have not seen data in 24 hours will disappear from the UI;
you can still query against them, but it will not appear in drop downs or infrastructure.
There is not a way to immediately delete a metric.-->

#### ホストやメトリクスを削除る方法はありますか。 {#arch-delete}

**メトリクスを直ちに削除する方法はありません。**

Datadog側でのメトリクス受信が停止していからおよそ24時間経過後、そのメトリクスを送信していたホストはUIに表示されなくなります。UIに表示されなくなった後も、これらのメトリクスやホストの情報をクエリーを使って検索することはできます。



<!--#### What's the difference between Graphite's query language and Datadog's? {#arch-graphite-differences}

In terms of metric naming, we differ a little with Graphite in that a metric
query is defined by a metric name and a scope, where a scope is one or more tags.
To translate:

~~~
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
~~~

into Datadog, we'd probably say:

~~~
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
~~~


Where ```<application>.requests.mean_90``` is the metric name, and
  ```http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>```
    are tags, so a concrete example might look like:

~~~
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

To do aggregation, we can specify an aggregator as part of the metric query:

~~~
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

This will graph a single series that's the average of that metric across the
intersection of those tags. We support avg, sum, min, max aggregators. If you
wanted to see all the possible series for a given tag facet, you can say:

~~~
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
~~~

Which would graph stacked area series for each http_method value like GET, POST, etc.
-->

#### Graphiteのquery languageとDatadogのクエリーを教えてください。 {#arch-graphite-differences}

Graphiteとは以下のように、クエリーの記述方法が少々異なります。

Graphiteの次の例では:

~~~
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
~~~

Datadogでは、以下のようになります:

~~~
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
~~~

```<application>.requests.mean_90```は、メトリクス名になり、```http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>```は、タグになります。

従って、具体的に書くと次のようになります:

~~~
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

先のクエリーを使って集計をするには、先頭にaggregatorを追記します:

~~~
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

This will graph a single series that's the average of that metric across the　intersection of those tags.  
Datadogでは、メトリクスの集計用に最小値(min)、最大値(max)、合計値(sum)、平均値(avg)のaggregatorを準備しています。

すべてのタグ要素について時系列のグラフを見たい場合は、次のようなクエリーを記述することができます:

~~~
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
~~~

このクエリーは、GET、POSTなどの各http_methodを積み重ねた時系列のグラフを表示します。


<!--#### How are hostnames determined? {#arch-hostnames}

The hostnames are determined by what the Datadog Agent detects; this is fully
documented [here][hostnames]. You can see all names being detected by the Agent by running the info command:
 ```/etc/init.d/datadog-agent info```-->
 
#### ホスト名はどのように判定され、設定されますか。 {#arch-hostnames}

ホスト名は、Datadog Agentのインストール時に、スクリプトが検出したホスト名になります。詳細に関しては、[Host Name][hostnames_ja]のページを参照してください。尚、Datadog Agentによって検出されたホスト名は、次のinfoコマンドを実行することで確認できます: ```/etc/init.d/datadog-agent info```


<!--#### Tell me about tagging! {#tagging}

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
~~~

What we recommend doing is leaving off the hostname; it will then default to the host
that is sending that point, since they’re different hosts it will be treated as different points:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
~~~

With these tags you can then do:

~~~
sum:page.views{domain:example.com}
~~~
which should give the desired result.

To get a breakdown by host, you can do:

~~~
sum:page.views{domain:example.com} by {host}
~~~

Further tagging info can be found [here][tags]</a>.

For information on AWS tagging, please see [here][integration-aws].-->

#### Datadogを使う上での、タグの使い方について教えて下さい。 {#tagging}

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
~~~

What we recommend doing is leaving off the hostname; it will then default to the host
that is sending that point, since they’re different hosts it will be treated as different points:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
~~~

With these tags you can then do:

~~~
sum:page.views{domain:example.com}
~~~
which should give the desired result.

To get a breakdown by host, you can do:

~~~
sum:page.views{domain:example.com} by {host}
~~~

Further tagging info can be found [here][tags]</a>.

For information on AWS tagging, please see [here][integration-aws].


[hostnames]: /hostnames/
[tags]: /guides/metrics/#tags
[integration-aws]: /integrations/aws/
[hostnames_ja]: /ja/hostnames/
[tags_ja]: /ja/guides/metrics/#tags
[integration-aws_ja]: /ja/integrations/aws/


<!-- ====================================================================== -->

<!--
===============================================================================
    AWS
===============================================================================
-->

<!--### AWS {#aws}

#### I just set up my AWS integration. Why am I seeing duplicate hosts? {#duplicate-hosts}

A single host running in EC2 might have an instance ID (i-abcd1234), a generic
hostname provided by EC2 based on the host’s IP address (ip-192-0-0-1), and a
meaningful host name provided by an internal DNS server or a config-managed hosts
file (myhost.mydomain). Datadog creates aliases for host names when there are multiple
uniquely identifiable names for a single host.  It takes about 10-20 minutes for the
single host’s duplicate names to be aliased. You can read more about
hostnames [here][hostnames].
-->

### AWS について{#aws}

#### AWS用のIntegrationを設定しました。ホスト名が重複して表示されるのはどうしてですか。 {#duplicate-hosts}

A single host running in EC2 might have an instance ID (i-abcd1234), a generic
hostname provided by EC2 based on the host’s IP address (ip-192-0-0-1), and a
meaningful host name provided by an internal DNS server or a config-managed hosts
file (myhost.mydomain). Datadog creates aliases for host names when there are multiple
uniquely identifiable names for a single host.  It takes about 10-20 minutes for the
single host’s duplicate names to be aliased. You can read more about
hostnames [here][hostnames].

EC2で実行している単一のホストは、インスタンスID（I-ABCD1234）、ホストのIPアドレス（IP-192-0-0-1）に基づいて、EC2が提供する汎用的なホスト名、および内部が提供する意味のあるホスト名を持っているかもしれませんDNSサーバまたはコンフィグ管理対象ホストファイル（がmyhost.mydomain）。Datadog、単一のホストのために複数の一意に識別名があるホスト名のエイリアスを作成します。これは、エイリアスされる単一のホストの名前の重複を約10〜20分かかります。あなたは、ホスト名の詳細を読むことができますここに。


<!--#### What metrics will I get from the AWS integration? {#aws-metrics}

* Our crawlers use the Cloudwatch API, and we collect everything available from it.
* You can read in detail about our AWS integration [here][integration-aws].-->

#### AWS用のIntegrationには、どのようなメトリクスが含まれていますか。 {#aws-metrics}

* Our crawlers use the Cloudwatch API, and we collect everything available from it.
* You can read in detail about our AWS integration [here][integration-aws].


- Googleのクローラは、CloudWatchのAPIを使用して、私たちはそれから利用可能なすべてのものを収集する。
- あなたは私たちのAWS統合について詳細に読むことができますここに。


<!--#### I can’t filter out my ELB instances - will I be charged for them? {#aws-elb}

We do not charge for ELBs (as they can’t be filtered out).-->

#### I can’t filter out my ELB instances - will I be charged for them? {#aws-elb}

#### ELBのインスタンスをフィルターすることができません。これらのELBのインスタンスに対しても請求されますか。 {#aws-elb}

We do not charge for ELBs (as they can’t be filtered out).

（これらは除外することはできませんように）私たちはELBsのために充電しないでください。



<!--#### Why is there a delay in receiving my data? {#aws-delay}

We have seen a few cases where machines have their clock set further in the
future or the past, which can sometimes cause problems with metric submission.
To check for this, run:

~~~
date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date
~~~

This will output the current system’s date, and then make a request to our
endpoint and grab the date on our end. If these are more than a few minutes
apart, you may want to look at the time settings on your server.-->

#### データーを取得するのになぜ遅延が発生するのですか。 {#aws-delay}

We have seen a few cases where machines have their clock set further in the
future or the past, which can sometimes cause problems with metric submission.
To check for this, run:

~~~
date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date
~~~

This will output the current system’s date, and then make a request to our
endpoint and grab the date on our end. If these are more than a few minutes
apart, you may want to look at the time settings on your server.

私たちは、時にはメトリックの提出に問題が発生する可能性がありますマシンが自分の時計が未来や過去にさらに設定されているいくつかのケースを見てきました。これをチェックするには、実行します。

日付-u && -s -v https://app.datadoghq.com/intake 2>カール＆1 | grepの日
この意志の出力は、現在のシステムの日付、およびその後は私たちのエンドポイントに要求を行い、私たちの最後の日付をつかむ。これらは離れて数分以上である場合は、サーバー上の時刻設定を見てみたいことがあります。


<!--#### Can I get my postgres data from RDS? {#aws-rds}

Yes you can! Follow the steps below to set this up:

1. Install the agent on an ec2 instance that can connect to the RDS instance
2. Use the RDS endpoint in <code>conf.d/postgres.yaml</code> (host and port)
3. Add tags in postgres.yaml: <code>dbinstanceidentifier:(rds-instance-id), enginename:postgres</code>
4. Restart the agent-->

#### RDSからpostgresのメトリクスデーターを取得することができますか。 {#aws-rds}

Yes you can! Follow the steps below to set this up:

1. Install the agent on an ec2 instance that can connect to the RDS instance
2. Use the RDS endpoint in <code>conf.d/postgres.yaml</code> (host and port)
3. Add tags in postgres.yaml: <code>dbinstanceidentifier:(rds-instance-id), enginename:postgres</code>
4. Restart the agent

はい、できます！これを設定するには、次の手順に従います。

1. RDSインスタンスに接続できるEC2インスタンスにエージェントをインストールします。
2. にRDSエンドポイントを使用して、のconf.d / postgres.yaml（ホストとポート）
3. postgres.yamlでタグを追加します。dbinstanceidentifier：（RDS-instance-idに）、は、EngineName：postgresの
4. エージェントを再起動します


<!--
===============================================================================
    Billing
===============================================================================
-->


<!--### Billing {#billing}


#### How can I change the Billing contact? {#billing-contact}

You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com) [here][app-billing].


#### Where can I get a copy of the invoice? {#billing-invoice}

As an admin you can check out past invoices [here][app-billing-history].-->

### 請求について {#billing}

#### 請求先の変更はどのようにすればよいですか。 {#billing-contact}

You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com) [here][app-billing].

あなたは、そのアドレスがDatadog（invoices@yourcompany.com）内のチームメンバーでなくても、請求書を受け取るために、特定の電子メールアドレスを設定することができ、ここで。


<!--#### Where can I get a copy of the invoice? {#billing-invoice}

As an admin you can check out past invoices [here][app-billing-history].

***You can read more about billing [here][billing].***-->

#### 請求書のコピーは、どこから入手できますか。 {#billing-invoice}

As an admin you can check out past invoices [here][app-billing-history].

***You can read more about billing [here][billing].***

管理者として、あなたは、過去の請求書をチェックアウトすることができ、ここで。

あなたは、課金についてもっと読むことができますここを。


[app-billing]: https://app.datadoghq.com/account/billing
[app-billing-history]: https://app.datadoghq.com/account/billing_history
[billing]: /guides/billing/
<!--
===============================================================================
    Graphing
===============================================================================
-->

<!--### Graphing {#graph}

#### How do I do arithmetic with grouped metrics? {#graph-sum-grouped}

To graph the sum of ```app.foo.bar{env:staging}``` and ```app.foo.baz{env:staging}```
grouped ```by {host}```, write a graph query that looks like:

~~~
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
~~~ -->

### グラフ化について {#graph}

#### グループ化したメトリクスの計算はどのようにすればよいですか。 {#graph-sum-grouped}

```by {host}```でグループ化した```app.foo.bar{env:staging}```メトリクス と ```app.foo.baz{env:staging}```メトリクスの足し算の結果をグラフ化するクエリーは、次になります:

~~~
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
~~~


<!--#### What's the syntax to sum multiple datapoints into a single line? {#graph-mult-points}

You can switch commas separating the queries into plus signs, from:

~~~
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
~~~

to:

~~~
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
~~~-->

#### 複数のデーターポイントの足し算し1つの線にするは、クエリーをどう書けはよいですか。 {#graph-mult-points}

カンマで分割し記述しているクエリーの、コンマをプラス記号に置き換える。

置き換える前:
    
~~~
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
~~~

置き換えた後:

~~~
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
~~~

<!--#### How do I do graph smoothing? {#graph-smoothing}

You can apply smoothing averages to your series by droping to the JSON editor and
adding ‘ewma’, for example:
add any of ewma_x(…) where x can be 5, 10, 20 around your series, e.g.
```ewma_20(exception.invalid{*})```.
ewma stands for exponentially-moving average and the full list of functions
you can apply is <a href="http://docs.datadoghq.com/graphing/#functions">here</a>.-->

#### グラフのスムージングはどうすいればよいですか。 {#graph-smoothing}

You can apply smoothing averages to your series by droping to the JSON editor and
adding ‘ewma’, for example:
add any of ewma_x(…) where x can be 5, 10, 20 around your series, e.g.
```ewma_20(exception.invalid{*})```.
ewma stands for exponentially-moving average and the full list of functions
you can apply is <a href="http://docs.datadoghq.com/graphing/#functions">here</a>.

次の例のように、JSONのエディタにdropingと「EWMA」を追加することで、一連の平滑平均を適用することができます。xは、例えば、あなたの一連の周りに5、10、20にあることができるewma_xのいずれか（...）を追加 ewma_20（exception.invalid { *}） 。EWMAは、指数関数的に、移動平均の略で、適用可能な関数の完全なリストであるここに。


<!--<h4>Can I stack CPU metrics on the same graph?</h4>
<p>
Check out our documentation on <a href="http://docs.datadoghq.com/graphing/">stacked series</a>.
The metric explorer just does one metric per graph, but you can see a stacked CPU graph
on the overview page by clicking any host <a href="https://app.datadoghq.com/infrastructure">here</a>.
</p>-->

#### 同じグラフにCPUの負荷を積み上げるのにはどうしたらよいですか。

Check out our documentation on [stacked series][stacked series_ja].
The metric explorer just does one metric per graph, but you can see a stacked CPU graph
on the [overview page][overview_page_ja] by clicking any host <a href="https://app.datadoghq.com/infrastructure">here</a>.

上の私たちのドキュメントのチェックアウト積み重ねシリーズ。メトリックエクスプローラはちょうどグラフごとに1つのメトリックをしていますが、任意のホストをクリックして概要ページに積載されたCPUのグラフを見ることができ、ここに。


[stacked_series_ja]: /ja/graphing
[overview_page_ja]: https://app.datadoghq.com/infrastructure

<!--<h4>Is there a way to share graphs?</h4>
<p>
There are two ways to share a graph or screenboard
<ul>
<li>In a time board, pick a graph on a dashboard,
click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME of just that graph.
</li>
<li>
In a custom screenboard, the middle button in the upper right will generate a URL which gives
live and read-only access to just the contents of that screenboard.
</li>
</ul>
</p>-->

#### Is there a way to share graphs?

There are two ways to share a graph or screenboard

- In a time board, pick a graph on a dashboard,
click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME of just that graph.
- In a custom screenboard, the middle button in the upper right will generate a URL which gives
live and read-only access to just the contents of that screenboard.

グラフやscreenboardを共有する二つの方法があります

- タイムボードでは、ダッシュボード上のグラフを選択し、それを編集するためにコグをクリックすると、あなただけの、そのグラフのIFRAMEを生成します「共有」タブを見つけることができます。
- カスタムscreenboardでは、右上の中央ボタンは、ライブ与えURLを生成し、読み取り専用アクセスをそのscreenboardの内容だけに。


<!--<h4>How do I track cron jobs?</h4>

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the dogapi client
library:

    dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). <code>--submit_mode all</code>
will send events on every run.

(To get the python client lib you can install it with <code>easy_install dogapi</code>).-->

#### How do I track cron jobs?

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the dogapi client
library:

    dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). ``--submit_mode all``
will send events on every run.

(To get the python client lib you can install it with ``easy_install dogapi``).


多くの場合、あなたが監視し、他のメトリックと相関したいいくつかの意味のあるスクリプトをトリガするcronジョブを設定します。たとえば、毎日Postgresのテーブルを真空cron'dスクリプトがあるとします。

0 0 * * psqlの-c '真空冗長my_tableに' >> /var/log/postgres_vacuums.log 2>＆1
真空は、特にも集中的なリソースなので、彼らはそのようにあなたが掃除したメトリックや他のイベントを相関させることができます実行するたびにDatadogイベントをお勧めします。あなたはdogapiクライアントライブラリが提供するdogwrapコマンドラインツールでこれを行うことができます。

dogwrap -n -k $ API_KEY --submit_modeのエラー "MYTABLEの掃除」「また、psql -c '真空冗長my_tableに「2>＆1 /var/log/postgres_vacuums.log
これは、スクリプトの終了時にコマンドを呼び出し、それがゼロ以外の終了コード（すなわちエラー）で終了している場合Datadogイベントを送信します。すべてを--submit_mode 実行のたびにイベントを送信します。

（あなたがそれをインストールすることができますlibにpythonのクライアントを取得するにはeasy_installをdogapi）。


<!-- ====================================================================== -->


<!--
===============================================================================
    Integrations
===============================================================================
-->

<!--### Integrations {#integrations}

#### I set up my integration. Why am I not seeing metrics? {#ntegration-metrics}

There a several problems that could cause this.  Send a message to support (support@datadoghq.com) describing the issue and include the agent info, the logs, and the configuration file as attachments to that message.  You can find the location of these in the following link and selecting your OS: <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">http://docs.datadoghq.com/guides/basic_agent_usage/</a>-->

### Integrationについて {#integrations}

#### I set up my integration. Why am I not seeing metrics? {#ntegration-metrics}

There a several problems that could cause this.  Send a message to support (support@datadoghq.com) describing the issue and include the agent info, the logs, and the configuration file as attachments to that message.  You can find the location of these in the following link and selecting your OS: <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">http://docs.datadoghq.com/guides/basic_agent_usage/</a>

があり、これを引き起こす可能性がいくつかの問題。サポート（support@datadoghq.com）の問題を説明するメッセージを送信し、エージェント情報、ログ、およびそのメッセージに添付ファイルとして設定ファイルが含まれています。あなたは次のリンクでこれらの場所を見つけて、お使いのOSを選択することができます。http://docs.datadoghq.com/guides/basic_agent_usage/


<!--#### How is Datadog retrieving my data? {#ntegration-data}

- Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
- All traffic is sent over SSL.
- All communication to Datadog is via HTTPS.
- The full license agreement can be found <a href="https://app.datadoghq.com/policy/license">here</a>.-->

#### How is Datadog retrieving my data? {#ntegration-data}

- Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
- All traffic is sent over SSL.
- All communication to Datadog is via HTTPS.
- The full license agreement can be found <a href="https://app.datadoghq.com/policy/license">here</a>.
- トラフィックは常にDatadog、エージェントによって開始されます。いいえセッションは今までに戻ってエージェントにDatadogから開始されていません。
すべてのトラフィックは、SSLを介して送信されます。
- Datadogへのすべての通信は、HTTPSを介して行われる。
- フルライセンス契約を見つけることができるここに。



#### I’d like to tweak an integration or write up a new one. Do you accept pull requests? {#integration-edit}

Yes! The agent is entirely open source and can be found <a href="https://github.com/DataDog/dd-agent/">here</a>.

うん！エージェントは、完全にオープンソースであり、見つけることができるここに。

<!--
===============================================================================
    Metrics
===============================================================================
-->
<!--<h3><a name="metrics" href="#metrics">メトリクスについて</a></h3>

<h4 id="custom-metrics">How do I submit custom metrics?</h4>
<p>
You can submit your custom metrics with the DogStatsD client.  You can read more about this <a href="http://docs.datadoghq.com/guides/metrics/">here</a>.
</p>-->

### メトリクスについて {#metrics}

#### How do I submit custom metrics? {#custom-metrics}

You can submit your custom metrics with the DogStatsD client.  You can read more about this <a href="http://docs.datadoghq.com/guides/metrics/">here</a>.

あなたはDogStatsDクライアントでカスタムメトリックスを提出することができます。あなたはこれについての詳細を読むことができますここに。

<!--<h4 id="counter-values">Why is my counter metric showing decimal values?</h4>
<p>
StatsD counters are normalized over the flush interval to report per-second units.  You can read more about this <a href="http://docs.datadoghq.com/guides/metrics/#counters">here</a>.
</p>-->

#### Why is my counter metric showing decimal values? {#ounter-values}

StatsD counters are normalized over the flush interval to report per-second units.  You can read more about this <a href="http://docs.datadoghq.com/guides/metrics/#counters">here</a>.

StatsDカウンタは毎秒単位を報告するために、フラッシュ間隔で正規化されている。あなたはこれについての詳細を読むことができますここに。


<!--<h4 id="log-data-metrics">Is there a way to submit metrics from my log data?</h4>
<p>
Yes there is!  We detail log parsing <a href="http://docs.datadoghq.com/guides/logs/">here</a>.
</p>
-->

#### Is there a way to submit metrics from my log data? {#og-data-metrics}

Yes there is!  We detail log parsing <a href="http://docs.datadoghq.com/guides/logs/">here</a>.

はい、あります！私たちは、詳細ログの解析ここに。


<!--<h4 id="past-data">I’d like to add past data to my account. Is there a way to do that?</h4>
<p>
Unfortunately, we do not allow adding past data at this time.
</p>-->

#### I’d like to add past data to my account. Is there a way to do that? {#ast-data}

Unfortunately, we do not allow adding past data at this time.

残念ながら、現時点では、過去のデータを追加することはできません。

<!--<h4 id="metric-syntax">Correct metric syntax (JSON)?</h4>
<p>
This depends on the medium you use to send metrics.
<ul>
<li>For an Agent Check, see this <a href="http://docs.datadoghq.com/guides/agent_checks/#sending-metrics">link</a>.</li>
<li>For DogStatsD, see this <a href="http://docs.datadoghq.com/guides/dogstatsd/#metrics">link</a>.</li>
<li>For the API, see this <a href="http://docs.datadoghq.com/api/#metrics-post">link</a>.</li>
</ul>
</p>-->

#### Correct metric syntax (JSON)? {#metric-syntax}

This depends on the medium you use to send metrics.

- For an Agent Check, see this <a href="http://docs.datadoghq.com/guides/agent_checks/#sending-metrics">link</a>.
- For DogStatsD, see this <a href="http://docs.datadoghq.com/guides/dogstatsd/#metrics">link</a>.
- For the API, see this <a href="http://docs.datadoghq.com/api/#metrics-post">link</a>.


これは、メトリックを送信するために使用するメディアによって異なります。

エージェントのチェックについては、この参照リンクを。
DogStatsDの場合、これを参照してくださいリンクを。
APIの場合、これを参照してくださいリンクを。


<!--<h4 id="metric-reports">Is there a way I can get metric reports?</h4>
<p>
We offer reporting in a variety of ways so far, which include:
<ul>
<li>The ability to embed any chart anywhere. Pick a graph on a dashboard, click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME.</li>
<li>For certain sources (e.g. pagerduty), you’ll get a report in your mailbox once a week to go over past alerts.</li>
<li>Metric alerts provide a way to report changes that are outside of what you define as “normal”.</li>
</ul>
</p>-->

#### Is there a way I can get metric reports? {#etric-reports}

We offer reporting in a variety of ways so far, which include:

- The ability to embed any chart anywhere. Pick a graph on a dashboard, click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME.
- For certain sources (e.g. pagerduty), you’ll get a report in your mailbox once a week to go over past alerts.
- Metric alerts provide a way to report changes that are outside of what you define as “normal”.


私たちは、これはこれまでさまざまな方法で報告オファー：

どこでもチャートを埋め込む機能。、ダッシュボード上のグラフを選んで、それを編集するためにコグをクリックすると、あなたは、IFRAMEを生成します「共有」タブを見つけることができます。
週がアラートを過ぎてオーバー行かれると、特定の情報源（例えばpagerduty）のために、あなたのメールボックスにレポートを取得します。
メトリックのアラートでは、「通常の」として定義したものの外にある変更を報告する方法を提供します。


<!--<h4 id="metric-disk-usage">How do I get disk usage as a percentage instead of in bytes?</h4>
<p>
The Datadog Agent emits a metric named <code>system.disk.in_use</code> which will give you disk usage as a percentage.
</p>-->

#### How do I get disk usage as a percentage instead of in bytes? {#metric-disk-usage}

The Datadog Agent emits a metric named <code>system.disk.in_use</code> which will give you disk usage as a percentage.

Datadogエージェントは、メトリックという名前の発するsystem.disk.in_useパーセンテージであなたのディスク使用量を与えます。


<!--#### How is data aggregated in graphs
{: #metric-aggregation}

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points will occur to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points
returned will be more aggregated. The max granularity within Datadog
is one point per second, so if you had submitted points at that interval
and requested a very small time interval (in this case, probably less
than two minutes), you could end up getting all of those exact points
displayed. Otherwise, you'll see coarser and coarser granularity as the
amount of time requested increases. We do this time aggregation via
average,sum,  min, max, or count.-->

#### How is data aggregated in graphs {#metric-aggregation}

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points will occur to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points
returned will be more aggregated. The max granularity within Datadog
is one point per second, so if you had submitted points at that interval
and requested a very small time interval (in this case, probably less
than two minutes), you could end up getting all of those exact points
displayed. Otherwise, you'll see coarser and coarser granularity as the
amount of time requested increases. We do this time aggregation via
average,sum,  min, max, or count.

Datadog内では、グラフはメトリックが増加して見た上での時間枠として、ポイント間の凝集が、そのセット番号の下に滞在するが発生し、点のみのセット数を含めることができます。

このように、あなたはより多くのデータの時間枠を照会している場合は、返されるポイントは、より集約されます。あなたがその間隔で点を提出し、非常に小さな時間間隔を要求した（この場合は、おそらく少ない2分以上）を使用すると、表示されるものの正確な点のすべてを得ることを終えることができたかのようにDatadog内の最大粒度は、1秒当たり1ポイントです。そうしないと、時間が要求された量が増加するにつれて、より粗いと粗い粒度が表示されます。私たちは、平均、合計、最小、最大、またはcount経由でこの時間集計を行います。


<!--<h4 id="metric-other">Any other things about metrics?</h4>
<p>
When using the 'sum/min/max/avg' aggregator, we're looking across series, not at points within a single series. So if it is scoped to it's most granular level, it's possible that switching between those aggregators will not change the values you're seeing.
</p>
<p>
For example, let's say you break down used memory by host, you'll get one
time series for each host. If you don't break down by host,
by default you'll get the average across all hosts.
</p>-->

#### メトリクスに関するその他の重要事項は。 {#metric-other}

When using the 'sum/min/max/avg' aggregator, we're looking across series, not at points within a single series. So if it is scoped to it's most granular level, it's possible that switching between those aggregators will not change the values you're seeing.

For example, let's say you break down used memory by host, you'll get one
time series for each host. If you don't break down by host,
by default you'll get the average across all hosts.

「和/最小/最大/平均 'アグリゲータを使用するとき、私たちはシリーズ全体ではなく、単一のシリーズ内のポイントを見ている。それがスコープされている場合は、最も詳細なレベルだとそう、それはこれらのアグリゲータの切り替えはあなたが見ている値を変更しない可能性があります。

たとえば、あなたが、ホストが使用するメモリを打破しましょう​​、あなたは、ホストごとに1の時系列を得るでしょう。あなたがホストによって分解しない場合、デフォルトでは、すべてのホスト間で平均値を得るでしょう。


<!--
===============================================================================
    Events
===============================================================================
-->

<!--<h3><a name="events" href="#other">Events</a></h3>

<h4 id="notify">What do @ notifications do in Datadog?</h4>
<p>
<ul>
<li><code>@support</code> – this will reach Datadog support directly when posted in your stream.</li>
<li><code>@all</code> – this will send a notification to all members of your organization.</li>
<li><code>@yourname</code> – this will notify the specific user named ‘yourname’.</li>
<li><code>@test@test.com</code> this will send an email to test@test.com.</li>
<li>If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
<ul>
<li><code>@hipchat-[room-name]</code> or <code>@slack-[room-name]</code> – posts the event or graph to that chat room.</li>
<li><code>@webhook</code> – alerts or triggers whatever is attached to that webhook. Check out
<a target="_blanks" href="https://www.datadoghq.com/2014/07/send-alerts-sms-customizable-webhooks-twilio/">this blogpost</a> on Webhooks!</li>
<li><code>@pagerduty</code> or <code>@oncall</code>
– sends an alert to Pagerduty. You can also use <code>@pagerduty-acknowledge</code> and <code>@pagerduty-resolve</code>.</li>
</ul>

</li>
</ul>
</p>-->

### イベントについて {#events}

#### Datadog内で@マーク付きの通知は、どのように機能しますか。 {#notify}

- ``@support`` – this will reach Datadog support directly when posted in your stream.
- ``@all`` – this will send a notification to all members of your organization.
- ``@yourname`` – this will notify the specific user named ‘yourname’.
-  ``@test@test.com`` this will send an email to test@test.com.
- If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
    - ``@hipchat-[room-name]`` or ``@slack-[room-name]`` – posts the event or graph to that chat room.
    - ``@webhook`` – alerts or triggers whatever is attached to that webhook. Check out
<a target="_blanks" href="https://www.datadoghq.com/2014/07/send-alerts-sms-customizable-webhooks-twilio/">this blogpost</a> on Webhooks!
    - ``@pagerduty`` or ``@oncall``
    - sends an alert to Pagerduty. You can also use ``@pagerduty-acknowledge`` and ``@pagerduty-resolve``.

- @support -あなたのストリームに掲示するとき、これは直接Datadogサポートに到達します。
- @All -これは、組織のすべてのメンバーに通知を送信します。
- @yourname -これは'yournameの'という名前の特定のユーザに通知します。
- @ test.com @テストこれはtest@test.comに電子メールを送信します。
- あなたがHipChat、スラック、Webhooks、PagerdutyまたはVictorOpsをお持ちの場合は、使用することができます。
    - @ hipchat- [部屋名]または@ slack- [部屋名] -ポストそのチャットルームにイベントやグラフ。
    - @webhook -そのwebhookに接続されているどのようなアラートやトリガされます。チェックアウト これはBlogPostを Webhooksに！
    - @pagerdutyまたは@oncallは - Pagerdutyにアラートを送信します。また、使用することができ、確認応答pagerduty @とpagerduty-決意@。



<!--<h4>Searching Events Help</h4>

<p>Your query runs a full text search of events and their comments.
You can also target certain event properties, such as the event source or status, by using the following search prefixes:</p>

<ul>
<li>
<p>
<code class="no-highlight"><strong>user:</strong>pup@datadoghq.com</code>
Find all events with comments by pup@datadoghq.com. </p>
</li>

<li>
<p>
<code class="no-highlight"><strong>sources:</strong>github,chef</code>
Show events from Github and Chef.</p>
</li>

<li>
<p><code class="no-highlight"><strong>tags:</strong>env-prod,db</code>
Show events tagged with #env-prod AND #db.</p>
</li>

<li>
<p><code class="no-highlight"><strong>hosts:</strong>db1.myapp.com,db2.myapp.com</code>
Show events from db1.myapp.com OR db2.myapp.com.</p>
</li>

<li>
<p><code class="no-highlight"><strong>status:</strong>error</code>
Show only error status events. (supports:</strong> 'error', 'warning', 'success')</p>
</li>

<li>
<p><code class="no-highlight"><strong>priority:</strong>low</code>
Show only low-priority events. (supports:</strong> 'low' or 'normal'. defaults to 'all')</p>
</li>

<li>
<p><code class="no-highlight"><strong>incident:</strong>claimed</code>
Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')</p>
</li>
</ul>

<p>Prefixes can easily be combined to make much more complex searches.
For example, if you wanted to find all open chef or nagios errors that mention cassandra, you'd have a search like:
</p>
<p><code>sources:nagios,chef status:error cassandra </code>.</p>

<p>
Note: no spaces after the colon or commas in these lists and anything not attached to a prefix goes to full text search.
</p>-->

#### イベントの検索はどのようにすればよいですか。

Your query runs a full text search of events and their comments.
You can also target certain event properties, such as the event source or status, by using the following search prefixes:

- ``user:pup@datadoghq.com`` Find all events with comments by pup@datadoghq.com. 
- ``sources:github,chef`` Show events from Github and Chef.
- ``tags:env-prod,db`` Show events tagged with #env-prod AND #db.
- ``hosts:db1.myapp.com,db2.myapp.com`` Show events from db1.myapp.com OR db2.myapp.com.
- ``status:error`` Show only error status events. (supports:'error', 'warning', 'success')
- ``priority:</strong>low``  Show only low-priority events. (supports:'low' or 'normal'. defaults to 'all')
- ``incident:claimed`` Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')

Prefixes can easily be combined to make much more complex searches.
For example, if you wanted to find all open chef or nagios errors that mention cassandra, you'd have a search like:

``sources:nagios,chef status:error cassandra ``

Note: no spaces after the colon or commas in these lists and anything not attached to a prefix goes to full text search.

あなたのクエリがイベントとそのコメントの全文検索を実行します。また、以下の検索プレフィックスを使用することにより、このようなイベント·ソースやステータスなどの特定のイベントのプロパティをターゲットにできます。

- ユーザー： pup@datadoghq.comが pup@datadoghq.comによるコメントすべてのイベントを検索します。

- ソース： githubの、シェフ Githubにシェフからのショーイベント。

- タグ： ENV-PROD、デシベル ＃のENV-PRODと#dbでタグ付けされたイベントを表示。

- ホスト： db1.myapp.com、db2.myapp.com db1.myapp.com OR db2.myapp.comからショーイベント。

- ステータス：エラー のみ ​​、エラーステータスイベントを表示。（担体：「エラー」、「警告」、「成功」）

- 優先度：低 だけを表示する優先度の低いイベント。（サポートされています。「低」または「通常の」デフォルトは「すべて」に）

- 事件：主張 のみを表示インシデントを主張した。（サポートされています。「オープン」、「解決'主張'、または'すべて'）

プレフィックスが容易にはるかに複雑な検索を行うために組み合わせることができる。あなたはカサンドラに言及開いているすべてのシェフやのnagiosエラーを見つけたい場合は、次のような検索を持っていると思います。

ソース：Nagiosの、シェフのステータス：エラーカサンドラ。

注意：接頭辞に接続されていないこれらのリスト、何のコロンやカンマがフルテキスト検索に行くスペースなしの後。




<!--<h4>Is it possible to submit events via email?</h4>
<p>
Yes!
To get started you need to go the API tab in the
<a target="_blank" href="https://app.datadoghq.com/account/settings#api">settings page</a>,
create one or more API emails.
For a monitoring tool that does not allow you to edit the body of the email you need to create a plain-text email,
and have that system or tool send alarms or notifications to this email.
For systems that allow you to edit the content
of the notification emails, you may use a JSON email. In the body of an email sent to a JSON API email you need
to include a well formatted JSON event request as per our existing events API (which you can find more details
about on <a target="_blank" href="http://docs.datadoghq.com/api/">here</a>).
</p>

<p>
Here is an example:
<pre><code>{
"title": “Host CPU above 75% for 5 minutes",
"text": "Host CPU has been above 75% for the last 5 minutes …etc",
"priority": "normal",
"tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
"alert_type": "error"
}</code></pre>
</p>-->

#### Datadogへのイベントの送信は、メールでも可能ですか。

Yes!
To get started you need to go the API tab in the
<a target="_blank" href="https://app.datadoghq.com/account/settings#api">settings page</a>,
create one or more API emails.
For a monitoring tool that does not allow you to edit the body of the email you need to create a plain-text email,
and have that system or tool send alarms or notifications to this email.
For systems that allow you to edit the content
of the notification emails, you may use a JSON email. In the body of an email sent to a JSON API email you need
to include a well formatted JSON event request as per our existing events API (which you can find more details
about on <a target="_blank" href="http://docs.datadoghq.com/api/">here</a>).

Here is an example:

うん！開始するには、APIでタブを移動する必要があり 、設定ページ、一つ以上のAPIの電子メールを作成します。あなたはプレーンテキストの電子メールを作成し、そのシステムやツールを持っている必要があり、電子メールの本文を編集することはできません監視ツールの場合はこのメールにアラームや通知メールを送信します。あなたは、通知メールの内容を編集できるようにするシステムでは、JSON形式の電子メールを使用することができます。JSONのAPIのメールに送信される電子メールの本文では、（あなたが詳細について見つけることができる私たちの既存のイベントAPIのあたりにもフォーマット済みのJSONイベント要求含める必要がここに）。

次に例を示します。

<pre><code>{
"title": “Host CPU above 75% for 5 minutes",
"text": "Host CPU has been above 75% for the last 5 minutes …etc",
"priority": "normal",
"tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
"alert_type": "error"
}</code></pre>


<!--
===============================================================================
    Other
===============================================================================
-->
<!--<h3><a name="other" href="#other">Other</a></h3>

<h4 id="team">How do I setup my team in Datadog?</h4>
<p>
The admin of the account should enter the email addresses of team members
<a href="https://app.datadoghq.com/account/team">here</a>. Some team best practices are as follows:
<ul>
<li>When the team member receives the confirmation email, they will be provided
with a link to log in directly. The user should not click ‘sign up’ during this process.</li>
<li>If multiple users from the same organization sign up separately, this will
register as different organizations in Datadog. Please reach out to support to
have these merged, but please note that all information contained in the
account getting merged will not be transferred over.</li>
<li>The only access controls we have right now are around admin activities
(adding/removing users, billing, etc.). As far as data goes (hosts, metrics, dashboards, etc.)
all users have access to everything; more robust access controls are in our
pipeline, but not something we’ve focused a lot of attention on yet.</li>
<li>To remove a team member use the “disable” button on the same ‘team’ page (only available
for admins). You cannot permanently remove users, just disable; disabled users will
only be visible to admins on the team page and can’t log in and any session they have
open is invalidated. We don’t fully delete them because they might own events,
dashboards, etc. which are not supposed to be removed.</li>
</ul>
</p>-->

### その他 {#other}

#### チームの設定は、どのようにしてすればよいですか。 {#team}

アカウント管理者が、[ダッシュボードの`team`タブ][register_member]よりチームメンバーの電子メールアドレスを入力する必要があります。

チーム管理のベストプラクティスは、次のとおりです:

- チームメンバーとしての確認メールには、Datadogへの直接ログインするためのリンクが提供されます。新メンバーは、このリンクを使いDatadogに直接ログインし、パスワードを設定することができます。この確認プロセスの間に’サインアップ’をクリックしないようにしてください。
- 同じ組織からの複数のユーザーが個別にユーザー登録をした場合、Datadogではそれぞれ別の組織としてユーザー情報を登録します。同一チームに所属させる必要がある場合は、サーポートにご連絡ください。ただし、すべてのユーザー情報が移行されるわけではないの注意してください。
- Datadogが提供しているアクセス制御は、管理者活動としてのユーザーの追加/削除、請求書プランの変更などです。ホスト、メトリクス、ダッシュボードなどのデーターという観点では、すべてのユーザーがすべてのものにアクセスできます。Datadogでは、より堅牢なアクセス制御を実現するために鋭意開発を進めていますが、アクセス制御の開発が現在の最優先課題ではないことはご理解いただけると幸いです。

- チームメンバーを削除するには、同じ[`team`のページ][register_member]（管理者のみ使用可能）の`disable`ボタンを使用します。チームメンバーに追加したユーザーは、使用停止の状態することはできますが、を完全に削除することはできません。使用停止状態のユーザーは、管理者のチームページにのみに表示され、ログインができなくなると同時に、すでに通信中のセッションもすべて遮断されます。チームメンバーを完全に削除しない理由は、削除操作しようとしているメンバーが同時に削除されることを意図していないイベントやダッシュボードなどの所有者になっている可能性があるからです。

[register_member]: https://app.datadoghq.com/account/team

<!--<h4 id="security">Are my data and credentials safe?</h4>
<p>
<ul>
<li>Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.</li>
<li>All traffic is sent over SSL.</li>
<li>All communication to Datadog is via HTTPS.</li>
<li>The full license agreement can be found <a href="https://app.datadoghq.com/policy/license">here</a>.</li>
<li>The agent is entirely open source and can be found <a href="https://github.com/DataDog/dd-agent/">here</a>.</li>
<li>Some installations (for example, installing the agent on CentOS 5), will request your password. The password is needed because it's installing packages - Datadog does not retain it in anyway. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.</li>
</ul>
</p>-->

#### データーと認証情報は安全ですか。 {#security}

- 通信セッションは、常にDatadog AgentからDatadogのサービスに向かって開始されます。Datadogのサービス側からDatadog Agentに向かっ通信セッションを開始することは一切ありません。
- すべてのデーター送信は、SSLを介して送信されます。
- Datadogのサービス側へのすべての通信は、HTTPSを介して行われます。
- Datadogのサービス利用規約は、[SERVICE TERMS AND AGREEMENT][service_term]ページで確認することができます。
- Datadog Agentのソースコードは、オープンソースとしてGithubのDatadogアカウント以下に[dd-agent][dd-agent_repo]として公開しています。
- 一部のOSのインストール手順では、パスワードを求められることがあります。(例えば、CentOS5にDatadog Agentをインストールする場合)この際のパスワードの入力は、OSにパッケージ類をインストールする際に求められるものです。更に、Datadogではこれらのパスワードは一切保持していません。もしも、インストールスクリプトがどのような操作をしているのかが気になる場合は、ステップバイステップの手順に基づきDatadog Agentをインストールすることもできます。 

[service_term]: https://app.datadoghq.com/policy/license
[dd-agent_repo]: https://github.com/DataDog/dd-agent/

<!--<h4 id="feature-request">I have a feature request. How can I submit it?</h4>
<p>
You can send the request to support@datadoghq.com and we will add it to our feature request log.
</p>-->

#### サービスや機能に対する要望はどのように提出ればよいですか。 {#feature-request}

要望は、support@datadoghq.comに送信してください。それらの要望は、Datadogの機能追加要求のバックログに随時追加され検討されていきます。
