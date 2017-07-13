---
last_modified: 2015/03/31
translation_status: complete
language: ja
title: よくあるご質問(FAQ)
kind: documentation
autotocdepth: 1
----------------------

<!--
===============================================================================
    Agent
===============================================================================
-->

<!-- ### Agent -->

### Agentについて
{: #agent}

<!--#### Is the agent necessary to use Datadog?
{: #agent-optional}

* No, it is not. You don't have to install an agent if you only want to submit
metrics via our API. You can read more about our API [here][agent-1].
* In general, most folks find a lot of value in installing an agent because
they get system metrics for free and metrics on common software like mysql,
postgres, etc. with just a little bit of configuration. Another advantage is
that there is a small statsd server built-in to the agent.
-->

#### Datadog を利用するのに、Datadog Agent のインストールは必要ですか。
{: #agent-optional}

* いいえ不要です。Datadog が提供するAPI を使ってメトリクスを送信するだけなら、どのAgent もインストールする必要は有りません。 API の詳細については、[次のページ][agentj-1]を参照してください。
* 一般的には、多くのユーザがAgent のインストールに価値を見出しています。 Agent をインストールすることでシステムのメトリクスが自動に収集できる上、mysql やpostgres などのよく使われるソフトウェアのメトリクスが最低限の設定で収集できるようになります。


<!--#### Can I use my own StatsD client?
{: #statsd}

Any StatsD client will work just fine, but using the Datadog DogStatsD client
will give you a few extra features. You can read more about our clients extra
features [here][agent-2].
-->

#### 独自のStatsDクライアントの利用方法は。
{: #statsd}

StatsD のクライアントならどれでも使えます。 しかし、Datadog のDogStatsD クライアントには、幾つかの追加機能があります。 DogStatsD クライアントの追加機能の詳細については、[次のページ][agentj-2]を参照してください。


<!--#### How can I change the hostname {#hostname-change}

You can change the hostname by updating your agent’s configuration file called
datadog.conf and replacing the value for the “hostname” key.  Use the following
link, select your OS in the left column, and go to
the [Configuration section][agent-3] to find the location of your
agent’s configuration file.-->

#### hostnameの変更方法は。
{: #hostname-change}

Agent の設定ファイル(datadog.conf)の“hostname”項目を有効化しホスト名を追記することで、任意の名前に変更することができます。 設定ファイルの保存先は、[次のページ][agentj-3]の左メニューからOSを選択し、**設定ファイルの保存されているディレクトリ**のセクションにて確認してください。


<!--How do I uninstall the agent
{: #agent-uninstall}

* Mac OS:

  Stop and Close the Datadog Agent: via the bone icon in the Tray.

  Drag the Datadog Application from the application folder to the Trash Bin.

  `$ sudo rm -rf /opt/datadog-agent` <br />
  `$ sudo rm -rf /usr/local/bin/datadog-agent` <br />
  `$ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks`


  If you ran the optional install commands to have the Agent run at boot time, you will also need to run the following to finish uninstalling:


  `$ sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist` <br />
  `$ sudo  rm /Library/LaunchDaemons/com.datadoghq.agent.plist` <br />


* Windows: You can uninstall the agent in Add/Remove Programs
* Linux: `$ sudo apt-get remove datadog-agent -y`
* CentOS 5: `$ sudo yum remove datadog-agent-base`
* CentOS 6: `$ sudo yum remove datadog-agent`-->

#### Datadog Agentのアンインストール方法は。
{: #agent-uninstall}

* Mac OS:

  画面上部のメニューバーの骨アイコンからメニューを表示し、Datadog Agent を停止して閉じる(stop 後、close する)。

  Datadogアプリケーションをアプリケーションフォルダからごみ箱にドラッグします。

  `$ sudo rm -rf /opt/datadog-agent` <br />
  `$ sudo rm -rf /usr/local/bin/datadog-agent` <br />
  `$ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks`

* Windows: コントルールパネルのプログラムの追加/削除でアンインストールができます。
* Linux: `$ sudo apt-get remove datadog-agent -y`
* CentOS 5: `$ sudo yum remove datadog-agent-base`
* CentOS 6: `$ sudo yum remove datadog-agent`


<!--#### I stopped my agent but I’m still seeing the host in my Datadog account. Why is that? {#agent-stopped}

It can take up to 24h for the host to disappear from the infrastructure page,
but it will only be part of the host count for billing purposes if we're
actually receiving data.-->

#### Datadog Agent を停止したが、ダッシュボード上には未だそのホスト名が表示される。
{: #agent-stopped}

Infrastructure のページから、ホスト名が消えるのには最長で24時間かかります。Agent を停止した後、
ダッシュボードにホスト名が残っていても課金の対象にはなりません。課金の判定は、Agent からのデータをDatadog 側で受信しているかどうかが基準になります。

<!--#### Other Agent-related questions? {#agent-other}

Please refer to the [Basic Agent Usage Guide][basic_agent_usage]. -->

#### Agent関連のその他の質問は。
{: #agent-other}

[Datadog Agent 入門][agentj-3]を参照してください。


[agent-1]: /api/
[agent-2]: /guides/dogstatsd/
[agent-3]: /guides/basic_agent_usage/
[agentj-1]: /ja/api/
[agentj-2]: /ja/guides/dogstatsd/
[agentj-3]: /ja/guides/basic_agent_usage/

<!--
===============================================================================
    Alerts
===============================================================================
-->

<!--### Alerts {#alerts}

#### I set up an alert with one of my integration metrics. Why am I getting so many No Data alerts?
{: #no-data}

For the AWS No Data errors, the issue here has to do with how frequently we
receive AWS metrics. Because our crawlers are rate-limited by the Cloudwatch
APIs, data is often delayed by 10 or more minutes, so we generally recommend
that an alert for an AWS metric be set to have a threshold window of at least
30 minutes or an hour (you can see this in step 3 of alert creation, “during
the last…”). Switching the time frame on this alert will resolve this issue, or
you can install the agent on some AWS hosts to get more up-to-date data to
alert on. Overall, we’re always working towards getting data more efficiently
from AWS. -->

###  Monitor(アラート)について
{: #alerts}

#### インテグレーションのメトリクスにアラートを設定したところ、大量のNo-Data アラートが発生した。
{: #no-data}

AWS 系インテグレーションのNo-Data エラーについては、Datadog がAWS からのメトリクスを受信する頻度が起因しています。Datadog のクローラーによるデータの収集は、Cloudwatch API の実行制限の制約を受け、10分かそれ以上の時間遅延することがあります。従って、AWS からのメトリクスにアラートを設定する場合、30分から1時間の時間枠での設定を推奨しています。 (この時間枠の設定は、[アラートの設定方法](/ja/guides/alerting/)ページのアラートの新規設定の第3ステップを参照してください。) アラートの発生条件の時間枠を変更することで、この問題は解決するはずです。 より短い遅延で集めたデータに基づいてアラートを設定したい場合は、AWS上で起動しているホストにDD-agent をインストールし、そこから送信されるデータを基にアラートを設定することをお勧めします。


<!--#### Is it possible to set up alerts based on % utilisation? For example alerting when 50% of memory has been used or 80% of disk space is used? {#alert-disk-utilization}

* Yes, this can be done! Here is an example for creating a disk space in use
alert when at 80% or above:
  1. Select a metric like "system.disk.in_use".
  2. Select the "threshold alert" type.
  3. For set alert grouping, select "simple alert".
  4. Set alert conditions: Select Above and for the value put 0.8.
  5. Add a custom message for alert if you'd like.
* You can read more about setting up alerts [here][alerting]</a>.
-->

#### リソースの利用率や消費率に基づいてアラートを発生することはできますか。
{: #alert-disk-utilization}

**例えば、メモリの利用率が50％になった時や、ディスク領域の使用率が80％になった時など。**

* はい、可能です。以下が、ディスク使用率が80％の時に発生するアラートの設定手順の概要です:
  1. `system.disk.in_use` というメトリクスを選択します。
  2. `threshold alert`というタイプを選択します。
  3. `simple alert` というアラートグループを選択します。
  4. "Set alert conditions:" で、`Above`を選択し、 値に`0.8`を入力します。
  5. "Say what's happening" にアラートメッセージを設定します。

* 詳細については、[Monitor (監視)機能の設定ガイド][alerting_ja]のページを参照してください。

[alerts-1]: /guides/monitoring/
[alertsj-1]: /ja/guides/monitoring/
[alerting_ja]: /ja/guides/monitors/

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

### API について
{: #api}

#### メトリクスの命名規則はありますか。
{: #api-metric-names}

* メトリクス名は、半角英字で始める必要があります。2文字目以降は、半角英数字、アンダースコア、ピリオドを使用することができます。 これらの条件に合わない全ての文字は、アンダースコアに変換されます。
* メトリクス名には、文字数の制限はありません。
* Unicode はサポートされていません。
* 空白は使用しないでください。

Agent によって送信されるメトリクス名は、疑似階層ドット形式（例：http.nginx.response_time）になります。この形式を採用しているのは、メトリック名から各サーバの機能を推測し易くするためです。例えば、「hostAとhostBは、‘http.nginx.*’というメトリックを送信してきているから、多分これらはwebのフロントエンドのインスタンスだよね〜」という感じです。


<!--#### What are valid tags? {#api-tags}

Tags must start with a letter, and after that may contain alphanumerics,
underscores, minuses, colons, periods and slashes. Other characters will get
converted to underscores. Tags can be up to 200 characters long and support
unicode. Tags will be converted to lowercase as well.-->

#### タグの。命名規則はありますか。
{: #api-tags}

* タグ名は、半角英字で始める必要があります。2文字目以降は、英数字、アンダースコア、マイナス、コロン、ピリオド、スラッシュを使用することができます。これらの条件に合わない全ての文字は、アンダースコアに変換されます。
* タグ名は、最大が200文字の制限があります。
* Unicodeをサポートします。
* タグ名は、全て小文字に変換されます。


<!--#### I'm submitting points to the API- anything I should know? {#api-else}

We store metric points at the 1 second resolution, but we’d prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps
will get rounded to the nearest second, and if any points have the same timestamp,
the latest point will overwrite the previous ones.

We have a soft limit of 100 time series per host, where a time series is
defined as a unique combination of metric name and tag.-->

#### API経由でメトリクスデータを送信しようとしています。その際に注意することはありますか。
{: #api-else}

Datadog では、1秒単位の分解能でデータを保存していますが、15秒間隔でのデータポイントの送信を推奨しています。尚、タイムスタンプの１秒以下の部分は、最も近い秒単位に丸められます。更に、秒単位に変換した後に同じタイムスタンプが複数発生した場合、先に受信したデータは、後から受信したデータによって上書きされます。　

Datadogではソフトリミットとして、Agent毎(又はホスト毎)に100個の時系列データの制限枠を設けています。 ここでいう時系列データとは、メトリック名とそれに付与したタグの組み合わせを1として見なしています。


<!--
===============================================================================
    Architecture
===============================================================================
-->

<!--### Architecture

#### Is Datadog a cloud service or server application?
{: #arch-cloud-or-server}

It's primarily a cloud service, but if you want to collect data on your servers,
there is an Agent you'll need to install. We never make any direct connections
to your infrastructure. For cloud integrations, we connect to them using the
credentials you provide to us.-->

### アーキテクチャについて
{: #architecture}

#### Datadog は、クラウドサービスですか、それともサーバアプリケーションですか。
{: #arch-cloud-or-server}

Datadogは、クラウドサービスです。しかし、サーバ/ミドルウエア/アプリケーションに関するデータを収集するためには、Datadogが提供するAgentをインストールし、それらのデータをDatadogのサービスに転送する必要があります。従ってDatadog側からは、監視対象のインフラに向かって直接コネクションを張ることはありません。 AWS 系インテグレーションなど、クラウドプロバイダーの監視用のAPIを使ったものでは、設定時に記述された認証情報のみを使ってデータを収取します。

<!--#### How do I delete a host or metric?
{: #arch-delete}

All hosts or metrics that have not seen data in 24 hours will disappear from the UI;
you can still query against them, but it will not appear in drop downs or infrastructure.
There is not a way to immediately delete a metric.-->

#### ホストやメトリクスを削除する方法はありますか。
{: #arch-delete}

**特定のホストやメトリックを直ちに削除する方法はありません。** 特定のDatadogアカウントに関連したホストやメトリクスの全てのデータの削除に関しては、[support@datadoghq.com][datadog-support]に相談しください。

メトリックが受信できなくなってからおよそ24時間経過後に、そのメトリックを送信していたホスト名はUIに表示されなくなります。UI内のドロップダウンメニュー等に表示されなくなった後も、これらのメトリックやホストの情報をクエリを使って検索することはできます。

<!--#### What's the difference between Graphite's query language and Datadog's?
{: #arch-graphite-differences}

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

Where `<application>.requests.mean_90` is the metric name, and
`http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>`
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

#### Graphite とDatadog のクエリの書き方の違いを教えてください。
{: #arch-graphite-differences}

Graphiteとは以下のように、クエリの記述方法が異なります。

Graphite クエリの次の例は:

~~~
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
~~~

Datadogでは、以下のようになります:

~~~
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
~~~

`<application>.requests.mean_90`は、メトリック名になり、`http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>`は、タグになります。

従って、具体的に書くと次のようになります:

~~~
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

先のクエリを使って集計をするには、先頭にaggregator を追記します:

~~~
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

aggregatorを使うことで、複数のホストのデータを一つの時系列データに集約することができます。上記は、タグを使って抽出した複数時系列データをタイムスタンプ情報を基に平均を取って一つの時系列データを生成しグラフ化しています。

Datadogでは、メトリクスの集計用に最小値(min)、最大値(max)、合計値(sum)、平均値(avg)のaggregatorを準備しています。

タグによって抽出した複数の時系列データを個別にグラフ化したい場合は、次のようなクエリを記述することで可能になります:

~~~
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
~~~

このクエリは、GET、POSTなどの各http_methodをエリアとして積み上げたグラフを表示します。


<!--#### How are hostnames determined?
{: #arch-hostnames}

The hostnames are determined by what the Datadog Agent detects; this is fully
documented [here][architecture-1]. You can see all names being detected by the Agent by running the info command:
`/etc/init.d/datadog-agent info`-->

#### ホスト名はどのように判定され、設定されますか。
{: #arch-hostnames}

ホスト名は、Agent のインストール時に、OS より検出したホスト名になります。詳細に関しては、[Host Name][architecturej-1]のページを参照してください。尚、Agent によって検出されたホスト名は、次のinfo コマンドを実行することで確認できます:

`/etc/init.d/datadog-agent info`


<!--#### Tell me about tagging!
{: #tagging}

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

Further tagging info can be found [here][architecture-2].

For information on AWS tagging, please see [here][architecture-3].-->

#### タグの使い方について教えて下さい。
{: #tagging}

Datadog内でメトリックを簡単に集計するために、タグ付けはとても重要です。 更にインフラの拡大や縮小への追従という観点でも、柔軟に対応した監視システムを実現するポイントになります。

タグ付の有用性を説明するために簡単な例を紹介します。 例えば、あるメトリックの合計が欲しいとします。 まずタグ付の設定をする前は、次のようになっていたとします:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
~~~

Datadogが推奨しているタグ付けの方法は、ドメイン名の"example.com"を残し、`tags=['domain:example.com']`と記述する方法です。
このようにタグ付けすることにより、異なるホストによって処理される同一ドメインのメトリックを異なるデータとして扱うことができるようになります:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
~~~

その後タグを使って、次のように合計を計算します:

~~~
sum:page.views{domain:example.com}
~~~

`sum:`で、各メトリクスの合計を一つの数字にまとめたグラフを表示することができます。

又、`by {host}`を追記することで、それぞれのホストが送信しいるメトリックの内訳を表示することもできます:

~~~
sum:page.views{domain:example.com} by {host}
~~~

タグ付けに関しての詳しい情報は、"DogStatsD を使った、メトリクスの送信"ページの[tag][architecturej-2]の項目を参照してください。

AWS系インテグレーションのタグ付けに関する詳細につては、["AWS Integration"][architecturej-3]のページを参照してください。


<!-- #### What is the difference between an Admin and a User in Datadog?

Admins have just a few extra capabilities that standard users do not have. This includes access to billing info, the ability to revoke API keys, removing users, and can configure read-only dashboards. They can also promote standard users to Admins. -->

#### 管理者と標準ユーザの違い

管理者には、標準ユーザにはないいくつかの機能が追加されています。 これには請求情報へのアクセス、APIキーの取り消し、ユーザーの削除、読み取り専用ダッシュボードの設定が含まれます。 尚、標準ユーザーを管理者に昇格させることもできます。


[architecture-1]: /hostnames/
[architecture-2]: /guides/metrics/#tags
[architecture-3]: /integrations/aws/
[architecturej-1]: /ja/hostnames/
[architecturej-2]: /ja/guides/metrics/#tags
[architecturej-3]: /ja/integrations/aws/


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

### AWS について
{: #aws}

#### AWS 用のインテグレーションを設定しました。同一がホストが重複表示されてしんいます。
{: #duplicate-hosts}

EC2上で起動したインスタンス(ホスト)には、インスタンスID（I-ABCD1234）、IPアドレスに基づいて付けられた標準的なホスト名（IP-192-0-0-1）、そして、hostsファイルやDNSによって管理されているホスト名(myhost.mydomain)があります。 Datadogでは、単一ホストに対して複数のユニークなホスト名が存在する場合、それら全てのホスト名のエリアスを作成します。 従って、実態インスタンスは1つのままです。 尚、このエリアスの作成には、通常約10〜20分かかります。 詳細に関しては、[Host Naming][architecturej-1]のページを参照してください。


<!--#### What metrics will I get from the AWS integration? {#aws-metrics}

* Our crawlers use the Cloudwatch API, and we collect everything available from it.
* You can read in detail about our AWS integration [here][integration-aws].-->

#### AWS用のIntegrationには、どのようなメトリクスが含まれていますか。
 {: #aws-metrics}

* CloudwatchのAPIを使用して収集できる情報は全て収集しています。
* AWS Integrationについては、[Datadog-AWS Cloudwatch Integration][architecturej-3]のページを参照してください。


<!--#### I can’t filter out my ELB instances - will I be charged for them? {#aws-elb}

We do not charge for ELBs (as they can’t be filtered out).-->

#### ELBインスタンスを除去することができません。これらのインスタンスに対しても請求されますか。
{: #aws-elb}

ELBインスタンスに関して請求されることはありません。(現状、ELBインスタンスは、表示から除外することはできません。)


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

#### データの受信に遅延が発生するのはなぜですか。
{: #aws-delay}

OSの現在時間の設定が大幅に進んでいたり、遅れていることによりすることで、メトリクスデータの送信障害を引き起こしているケースを見かけます。
Datadog側の時間とインスタンスの時間の差をチェックするには、次のコマンドを実行します:

~~~
date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date
~~~

このコマンドは、現在ログインしているシステムの現在時間を表示し、その後Datadog側の時間を取得し比較するためのリクエストを送信します。もしも、この時間の差が数分以上ある場合は、インスタンスの現在時間を正しく設定し直してください。


<!--#### Can I get my postgres data from RDS? {#aws-rds}

Yes you can! Follow the steps below to set this up:

1. Install the agent on an ec2 instance that can connect to the RDS instance
2. Use the RDS endpoint in <code>conf.d/postgres.yaml</code> (host and port)
3. Add tags in postgres.yaml: <code>dbinstanceidentifier:(rds-instance-id), enginename:postgres</code>
4. Restart the agent-->

#### RDSからPostgreSQLのメトリクスデータを取得することができますか。
{: #aws-rds}

はい、できます。設定は、次の手順になります。

1. RDSインスタンスに接続できるEC2インスタンスにAgentをインストールします。
2. Datadogの設定をファイルを保存するディレクトリで、RDSのエンドポイント情報(host, port)を、<code>conf.d/postgres.yaml</code>を記述します。
3. postgres.yamlに、次のタグを追加します。<code>dbinstanceidentifier:(rds-instance-id), enginename:postgres</code>
4. Datadog Agentを再起動します。

詳しくは、[PostgreSQL Integration](https://app.datadoghq.com/account/settings#integrations/postgres)のタイルを選択し、'configuration'のタブの参照してください。


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


### 請求について
{: #billing}

#### 請求先の変更はどのようにすればよいですか。
{: #billing-contact}

Datadogの`team`タブ以下で設定したメンバー以外の任意のメールアドレスを請求書の受信者として設定できます。(例:invoices@yourcompany.com)

請求書受信者のメールアドレスは、[Billing and Plan][billing-1]のページから変更してください。


<!--#### Where can I get a copy of the invoice? {#billing-invoice}

As an admin you can check out past invoices [here][app-billing-history].

***You can read more about billing [here][billing].***-->

#### 請求書のコピーは、どこから入手できますか。
{: #billing-invoice}

管理者権限のあるユーザは、[Billing History][billing-2]のページから過去の請求状況を確認することができます。

**課金に関する詳しい情報は、[課金に関するFAQ][billingj-3]のページを参照してください。**


[billing-1]: https://app.datadoghq.com/account/billing
[billing-2]: https://app.datadoghq.com/account/billing_history
[billing-3]: /guides/billing/
[billingj-3]: /ja/guides/billing/


<!--
===============================================================================
    Events
===============================================================================
-->

<!--### Events

#### What do @ notifications do in Datadog?
{: #notify}

* `@support-datadog` – this will reach Datadog support directly when posted in your stream.
* `@all` – this will send a notification to all members of your organization.
* `@yourname` – this will notify the specific user named ‘yourname’.
* `@test@test.com` this will send an email to test@test.com.
* If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
    * `@hipchat-[room-name]` or `@slack-[room-name]` – posts the event or graph to that chat room.
    * `@webhook` – alerts or triggers whatever is attached to that webhook. Check out [our blogpost on Webhooks][events-1]!
    * `@pagerduty` – sends an alert to Pagerduty. You can also use `@pagerduty-acknowledge` and `@pagerduty-resolve`.
-->

### イベントについて
{: #events}

#### Datadog内で@マーク付きの通知は、どのように機能しますか。
{: #notify}

* `@support-datadog` - イベントストリームでこの表記を使った場合は、Datadogのサポートにメッセージを送信します。
* `@All` - 組織のすべてのメンバにメッセージを送信します。
* `@yourname` - 'yourname'という名前のユーザにメッセージを送信します。
* `@test@test.com` test@test.comに電子メールを送信します。
* HipChat, Slack, Webhooks, Pagerduty, VictorOpsの使っている場合は、次のことができます。
  * `@hipchat-\[ルーム名\]`または`@slack-[ルーム名]` - \[ルーム名\]で指定したチャットルームに、イベントやグラフをポストすることができます。
  * `@webhook-[webhook名]` - アラートなどwebhookをつなげたものなら全て。例に関しては、[Send alerts by SMS with customizable WebHooks and Twilio][events-1]のblogポストを参照してください。この機能を使うためのIntegarationの基本は、[Datadog-Webhooks Integration][eventsj-5]のページと、ダッシュボードの[Integration][events-2]タブからwebhooksのタイルを選択し`configuration`タブを参照してください。
  * `@pagerduty` - Pagerdutyにアラートを送信します。 更に、`@pagerduty-acknowledge` や `@pagerduty-resolve`を使って通知することもできます。


<!--#### Searching Events Help

Your query runs a full text search of events and their comments. You can also
target certain event properties, such as the event source or status, by using
the following search prefixes:

* **`user:`**`pup@datadoghq.com` Find all events with comments by pup@datadoghq.com.
* **`sources:`**`github,chef` Show events from Github and Chef.
* **`tags:`**`env-prod,db` Show events tagged with #env-prod AND #db.
* **`hosts:`**`db1.myapp.com,db2.myapp.com` Show events from db1.myapp.com OR db2.myapp.com.
* **`status:`**`error` Show only error status events. (**supports:** 'error', 'warning', 'success')
* **`priority:`**`low` Show only low-priority events. (**supports:** 'low' or 'normal'. defaults to 'all')
* **`incident:`**`claimed` Show only claimed incidents. (**supports:** 'open', 'claimed', 'resolved', or 'all')

Prefixes can easily be combined to make much more complex searches.  For example,
if you wanted to find all open chef or nagios errors that mention cassandra, you'd
have a search like:

`sources:nagios,chef status:error cassandra`

Note: no spaces after the colon or commas in these lists and anything not attached
to a prefix goes to full text search.-->

#### イベントは、どのように検索すればよいですか。

検索クエリは、イベントとそれに含まれるコンテンツの全てに対し検索を実施します。更に、以下の検索用のプレフィックスを使用することにより、イベントソースやステータスなどの特定のプロパティを対象に検索をすることもできます。

* **`user:`**`pup@datadoghq.com` pup@datadoghq.comがコメントしている全てのイベントを検索します。
* **`sources:`**`github,chef` GithubとChefからのイベントを検索します。
* **`tags:`**`env-prod,db` ＃env-prodと#dbとタグ付けされたイベントを検索します。
* **`hosts:`**`db1.myapp.com,db2.myapp.com` ホスト名がdb1.myapp.comかdb2.myapp.comから得られたイベントを検索します。
* **`status:`**`error` ​ステータスがerrorのイベントを検索します。（statusには、'error','warning','success'があります。）
* **`priority:`**`low` 優先度が'low'のイベントを検索します。（priorityには、'low','normal'があります。ディフォルトは、'all'で、全てになります。）
* **`incident:`**`claimed` 誰かが対応中を宣言したインシデントを検索します。（inscidentには、'open','claimed','resolved','all'があります。）

プレフィックスを組み合わせることによって、複雑な検索も実行できます。 例えば、chef かnagios の未解決エラーで、cassandra の文字を含むのも検索したい場合は、次のようになります:

`sources:nagios,chef status:error cassandra`

注) コロン(:)とコンマ(,)の後ろには、空白は入りません。プレフィックスの後ろに検索対象の指定の無い場合は、全文検索が実行されます。


<!--#### Is it possible to submit events via email?

Yes! To get started you need to go the API tab in the [settings page][events-2],
create one or more API emails.

For a monitoring tool that does not allow you to edit the body of the email you
need to create a plain-text email, and have that system or tool send alarms or
notifications to this email.

For systems that allow you to edit the content of the notification emails, you
may use a JSON email. In the body of an email sent to a JSON API email you need
to include a well formatted JSON event request as per our existing events API.
For more details about our events API, visit our [API documentation][events-3].

Here is an example:

~~~
{
  "title": “Host CPU above 75% for 5 minutes",
  "text": "Host CPU has been above 75% for the last 5 minutes …etc",
  "priority": "normal",
  "tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
  "alert_type": "error"
}
~~~-->

#### Datadogへのイベントの送信は、メールでも可能ですか。

はい、できます。 まずは、ダッシュボードの`Integration`タブを選択し、次に[`API's`のタブ][events-2]で、メールアドレスの追加ページに移動します。'Events API Emails'セクションでイベント情報の送信先のメールを作成します。その後、ここで作成したメールアドレスに向けイベント情報を送信するようにアプリケーションやツールを設定します。

電子メールの本文を編集できない監視ツールの場合は、プレーンテキストの電子メールを作成し、そのシステムやツールでアラームや通知として送信します。

送信するメールの本文を自由に構成できる場合は、JSON を選択します。本文に記述するJSONは、Datadog API で指定している書式に準拠している必要があります。詳しくは、[API Reference][eventsj-3]のページの"POST AN EVENT"を参照してください。

次に例を示します:

~~~
{
"title": “Host CPU above 75% for 5 minutes",
"text": "Host CPU has been above 75% for the last 5 minutes …etc",
"priority": "normal",
"tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
"alert_type": "error"
}
~~~


<!-- #### What formatting is available for event text?
{: #eventformat}

We have adopted Daring Fireball's Markdown throughout the site. To find out more
about Markdown, visit the [Markdown docs][events-4]. -->

#### イベントを記述する際に使うことにできるフォーマットは。

Datadogでは、サイト全体でDaring Fireball Markdownを採用しています。Markdownの詳細については、[Markdownのドキュメント][events-4]を参照してください。


[events-1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[events-2]: https://app.datadoghq.com/account/settings#api
[events-3]: /api#events
[eventsj-3]: /ja/api#events-post
[events-4]: http://daringfireball.net/projects/markdown/syntax
[eventsj-5]: /ja/integrations/webhooks/


<!--
===============================================================================
    Graphing
===============================================================================
-->

<!--### Graphing
{: #graph}

#### How do I do arithmetic with grouped metrics?
{: #graph-sum-grouped}

To graph the sum of `app.foo.bar{env:staging}` and `app.foo.baz{env:staging}`
grouped `by {host}`, write a graph query that looks like:

~~~
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
~~~
-->

### グラフ表示の設定について
{: #graph}

#### メトリクスを集計しグラフ表示したい場合は、どのようにすればよいですか。
{: #graph-sum-grouped}

`by {host}`でグループ化した`app.foo.bar{env:staging}`メトリクス と `app.foo.baz{env:staging}`メトリクスの足し算の結果をグラフ表示するクエリは、次のようになります:

~~~
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
~~~


<!--#### What's the syntax to sum multiple datapoints into a single line?
{: #graph-mult-points}

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

#### 複数のデータポイントを合算するには、クエリをどう書けはよいですか。
{: #graph-mult-points}

カンマで分割し記述しているクエリの、コンマをプラス記号に置き換えます。

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


<!--##### How do I do graph smoothing?
{: #graph-smoothing}

You can apply smoothing averages to your series by droping to the JSON editor and
adding ‘ewma’, for example:
add any of ewma_x(…) where x can be 5, 10, 20 around your series, e.g.
`ewma_20(exception.invalid{*})`.
ewma stands for exponentially-moving average and the full list of functions
you can apply is [here][graphing-1].
-->

#### グラフを滑らかにするにはどうすいればよいですか。 {#graph-smoothing}

グラフ右上隅にある鉛筆マークをクリックし、表示されるJSONエディター内で'ewma_20'と追記することで、グラフ上に表示しているデータに平滑平均を適用することができます。

例: `ewma_20(exception.invalid{*})`

ewmaは、指数関数の移動平均の略語で、ewma_x(…)のxの部分には、平滑度によって5、10、20の値を設定することができます。

グラフ表示時に適用可能な関数は、[Graphing Primer][graphingj-1]を参照してください。

<!--#### Can I stack CPU metrics on the same graph?
{: #stack-cpu-metrics}

Check out our documentation on [stacked series][graphing-2].
The metric explorer just does one metric per graph, but you can see a stacked CPU graph
on the overview page by clicking any host [here][graphing-3].-->

#### CPU負荷の情報を同じグラフに積み上げるのにはどうすればよいですか。

各グラフの右上隅の歯車のマークをクリックし、ポップアップ表示の"Choose metrics and events"のセクションのJSONを編集します。詳細に関しては、グラフ表示の設定ページの[stacked series][graphingj-2])を参照してください。


<!--#### Is there a way to share graphs?
{: #share-graphs}

There are two ways to share a graph or screenboard

* In a time board, pick a graph on a dashboard and click on the pencil to edit it.
Under step 2, "Choose metrics and events," you’ll find the “share” tab that will
generate an IFRAME of just that graph.
* In a custom screenboard, click the settings cog in the upper right of the screen,
then click the "Generate public URL" option. This will create a URL which gives
live and read-only access to just the contents of that screenboard.-->

#### グラフを共有する方法はありますか。

2つの方法があります。タイムボード上にあるグラフを共有する方法と、スクリーンボード自体を共有すル方法があります。

* タイムボードでは、表示されているグラフを選択し、右上隅に表示されている鉛筆マークを選択します。"Choose metrics and events"セクションで"Share"タブを選択し、時間の尺度やグラフのサイズなどを選択した後、`Generate embed code`ボタンをクリックします。
* スクリーンボードでは、右上隅のギアのアイコンをクリックし、"Generate public URL"をクリックすると共有のためのURL が生成されます。このURL にアクセスすると、読み込み専用のライブなスクリーンボードが表示されます。


<!--<#### How do I track cron jobs?
{: #track-cron}

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the [datadog python client library][graphing-4]:

    dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table'" 2>&1 /var/log/postgres_vacuums.log


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). `--submit_mode all`
will send events on every run.

(To get the python client lib you can install it with `pip install datadog`).-->

#### 特定のcron job の実行状況は、どのように追跡すればよいですか。
{: #track-cron}

他のメトリクスと相関してホストの状況を監視するためにcron job にスクリプトを設定していることはよくあると思います。 例えば、Postgres のテーブルを吸い上げるために、cron.d にvacuum というスクリプトを設定していたとします:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

このvacuum スクリプトはリソースを大量に消費するので、そのスクリプトが実行されたタイミングを他のメトリクスやイベントと関連付けておきたいとします。そこで、スクリプト実行の際に、Datadog へイベントの通知をすることにします。このイベント通知は、[datadogのpythonクライアントライブラリー][graphing-4]で提供されているdogwrap command line tool を使うことによって実現できます:

    dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table'" 2>&1 /var/log/postgres_vacuums.log

これにより、Vacuum スクリプトが異常終了した場合に、その最後でdogrwap コマンドが呼び出され、Datadog にイベントを送信します。
`--submit_mode all`と置き換えると、Vacuum スクリプト実行時にイベントの通知をすることができます。

(Python のクライアントライブラリーをインストールするには、次のコマンドを実行します: `pip install datadog`)


[graphing-1]: /graphing/#functions
[graphing-2]: /graphing
[graphing-3]: http://app.datadoghq.com/infrastructure
[graphing-4]: https://github.com/DataDog/datadogpy
[graphingj-1]: /ja/graphing/#functions
[graphingj-2]: /ja/graphing


<!--
===============================================================================
    Integrations
===============================================================================
-->

<!--### Integrations

#### I set up my integration. Why am I not seeing metrics?
{: #integration-metrics}

There a several problems that could cause this.  Send a message to support
(support@datadoghq.com) describing the issue and include the agent info, the logs, and
the configuration file as attachments to that message.  You can find the location of
these in the following link and selecting your OS on our [agent usage guide][integrations-1]-->

### Integrationについて
{: #integrations}

#### Integrationをインストール/設定しましたが、メトリクスが表示されません。
{: #ntegration-metrics}

メトリクスが表示されない現象には、複数の原因が考えられます。その際は、症状の詳細と共に、Agent のflare コマンドで作成したアーカイブを添付し、サポート窓口([support@datadoghq.com][datadog-support])にご連絡ください。


<!--#### How is Datadog retrieving my data?
{: #integration-data}

* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here][integrations-2].-->

#### Datadogは、どのようにしてメトリクスデータを収集していますか。
{: #ntegration-data}

* 通信セッションは、常にAgent からDatadog のサービスに向かって開始されます。Datadog のサービス側からAgent に向かっ通信セッションを開始することは一切ありません。
* すべてのデータ送信は、SSLを介して送信されます。
* Datadogのサービス側へのすべての通信は、HTTPSを介して行われます。
* Datadogのサービス利用規約は、[SERVICE TERMS AND AGREEMENT][integrations-2]ページで確認することができます。

<!--#### I’d like to tweak an integration or write up a new one. Do you accept pull requests?
{: #integration-edit}

Yes! The agent is entirely open source and can be found on our [Github project page][integrations-3]. -->

#### Integrationを、改善したり開発したりしたいと思っています。開発コードのpull requestを受け付けていますか。
{: #integration-edit}

はい、できます。 Datadog Agentは、オープンソースです。GithubのDatadogアカウンントの[dd-agent][integrations-3]リポジトリーで公開しています。


[integrations-1]: /guides/basic_agent_usage
[integrations-2]: https://app.datadoghq.com/policy/license
[integrations-3]: https://github.com/DataDog/dd-agent
[integrationsj-1]: /ja/guides/basic_agent_usage

<!--
===============================================================================
    Metrics
===============================================================================
-->

<!--### Metrics

#### How do I submit custom metrics?

You can submit your custom metrics with the DogStatsD client. You can read more about this [here][metrics-1].
-->

### メトリクスについて
{: #metrics}

#### カスタムメトリクスはどのように送信すればよいですか。
{: #custom-metrics}

カスタムメトリクスは、DogStatsDクライアントを使ってDatadogのサービスサイトへ送信することができます。詳細に関しては、[DogStatsD を使った、メトリクスの送信][metricsj-1]のページを参照してください。


<!--#### Why is my counter metric showing decimal values?

StatsD counters are normalized over the flush interval to report per-second units. You can read more about this [here][metrics-2].
-->

#### イベントの発生回数をカウントしているメトリクスが、少数点付きの数字になるのはなぜですか。 {#ounter-values}

DogStatsDのカウンタは、flush interval間の総数を1秒間の数値に換算し、情報を送信しています。詳細に関しては、[DogStatsD を使った、メトリクスの送信][metricsj-1]のページの[カウンタ][metricsj-2]を参照してください。


<!--#### Is there a way to submit metrics from my log data?

Yes there is! We detail log parsing [here][metrics-3].
-->

#### ログデータを基にメトリクスを送信することはできますか。
{: #og-data-metrics}

はい、できます。 詳細に関しては、[Datadog Agent によるログの解析方法][metricsj-3]のページを参照してください。


<!--#### I’d like to add historical data to my account. Is there a way to do that?

Unfortunately, we do not allow adding historical data at this time.
-->

#### 新規に登録したアカウントに過去の蓄積したデータを追加することはできますか。
{: #ast-data}

残念ながら現状では、過去に蓄積したデータを追加することはできません。

<!--#### Correct metric syntax (JSON)?

This depends on the medium you use to send metrics.

* For an Agent Check, see this [link][metrics-4].
* For DogStatsD, see this [link][metrics-5].
* For the API, see this [link][metrics-6].
-->

#### メトリクス送信のためのデータ(JSON)の書き方
{: #metric-syntax}

メトリクスを送信するために使う方法によって異なります。

* Agent Checkを使って送信する場合は、[Agent Checkの書き方][metricsj-4]のページを参照してください。
* DogStatsDを使って送信する場合は、[DogStatsD を使った、メトリクスの送信][metricsj-5]のページを参照してください。
* APIを介して送信する場合は、[API Reference][metricsj-6]のページを参照してください。


<!--#### Is there a way I can get metric reports?

We offer reporting in a variety of ways so far, which include:

* The ability to embed any chart anywhere. Pick a graph on a dashboard, click on
the pencil to edit it and you’ll find the “share” tab that will generate an IFRAME.
* For certain sources (e.g. pagerduty), you’ll get a report in your mailbox once
a week to go over past alerts.
* Metric alerts provide a way to report changes that are outside of what you define
as “normal”.
-->

#### メトリクスの状況のレポートには、どのようなものがありますか。
{: #etric-reports}

現状では、次のようなレポートの方法を提供しています：

* すべての場所のすべてのグラフにスナップショットを撮りレポートをする機能があります。レポートをしたいグラフを選び、右上隅の鉛筆マークをクリックし、`share`タブを選択します。設定項目を確認した後、`generate`ボタンをクリックすることで、スナップショットのIFRAME へのリンクを生成することができます。
* 過去のアラートの状況をレビューできるように、一部の情報ソース(例:pagerduty)では、週に一度メールによるレポートを受信する設定ができます。
* メトリクスのアラート機能を使うことによって、メトリクスが正常の範囲から外れたさいのレポートを送信することができます。


<!--#### How do I get disk usage as a percentage instead of in bytes?

The Datadog Agent emits a metric named `system.disk.in_use` which will give you disk
usage as a percentage.
-->

#### ハードディスクの利用量を、バイトではなく、パーセントで監視するにはどのようにしたらよいですか。 {#metric-disk-usage}

Datadog Agentがデフォルトで送信しているディスクの使用量関連の情報は2種類あります。

1.`system.disk.in_use`は、パーセントでディスク使用量を送信しています。
2.`system.disk.used`は、バイト単位で使用量を送信しています。

従って、グラフで`system.disk.in_use`を指定すれば、パーセントで監視できます。


<!--#### How is data aggregated in graphs
{: #metric-aggregation}

Within Datadog, a graph can only contain a set number of points and, as the timeframe
over which a metric is viewed increases, aggregation between points will occur to
stay below that set number.

Thus, if you are querying for larger timeframes of data, the points
returned will be more aggregated. The max granularity within Datadog
is one point per second, so if you had submitted points at that interval
and requested a very small time interval (in this case, probably less
than two minutes), you could end up getting all of those exact points
displayed. Otherwise, you'll see coarser and coarser granularity as the
amount of time requested increases. We do this time aggregation via
average,sum,  min, max, or count.
-->

#### データは、グラフ上でどのように集計されていますか。
{: #metric-aggregation}

Datadogのグラフ内には、一定数以下のデータポイントしか表示することができません。従って、グラフ上に表示する全体時間が長くなると、この一定数にデータのポイント数が収まるように、時間軸方向にデータポイントの集約が始まります。

従って、特に長時間に渡るグラフを表示する際は、各データポイントは高度に集約されたものとなります。Datadogの最小のデータ粒度は1秒間隔です。もしもこの精度で送信したデータを、極短時間枠(ここでは2分以下)のグラフに表示しようとしたら、オリジナルの精度のままのデータを表示することができるようでしょう。それ以上の時間枠のグラフ表示では、時間が長くなればなるほど粗いデータを見ていることになります。尚、このデータポイントの集約は、json式で指定した平均、合計、最小、最大、countなどの処理を終えた値に対して適応されます。


<!--#### What's the difference between system.load.1, system.load.5, and system.load.15?
{: #systemload1-5-15}

When you run uptime on a *nix system, the three numbers at the end represent
system.load.1, system.load.5, and system.load.15. System.load.1 is the system load
for the past 1 minute for a single core. Related to these is system.load.norm.1, which
is the system.load for the past 1 minute on divided by the number of cores on that
machine.
-->

<!-- #### Any other things about metrics?
{: #metric-other}

When using the 'sum/min/max/avg' aggregator, we're looking across series,
not at points within a single series. So if it is scoped to it's most granular
level, it's possible that switching between those aggregators will not change
the values you're seeing.

For example, let's say you break down used memory by host, you'll get one
time series for each host. If you don't break down by host,
by default you'll get the average across all hosts.
 -->

#### メトリクスに関するその他の重要事項は。
{: #metric-other}

'sum/min/max/avg'のアグリゲーターをクエリーの先頭に付記した場合、一つの時系列シリーズ内のデータポイントを集計した結果を意味するのではなく、複数の時系列シリーズのデータポイントをタイムスタンプを基に集計した結果を意味しています。もしも、それが最も細かいレベルになっている場合(時系列データのシリーズが一つしかない場合)、それらのアグリゲーターを切り替えることによって、表示されている値が変わることはありません。

たとえばメモリ使用量をホスト別に分類すると、ホスト毎に時系列のシリーズになります。複数ホストのメモリ資料量を細分化する設定をせず、そのまま取り出した場合、メトリック値はデフォルトで全ホストで平均値になります。


[metrics-1]: /guides/metrics/
[metrics-2]: /guides/metrics/#counters
[metrics-3]: /guides/logs/
[metrics-4]: /guides/agent_checks/#sending-metrics
[metrics-5]: /guides/dogstatsd/#metrics
[metrics-6]: /api/#metrics-post
[metricsj-1]: /ja/guides/metrics/
[metricsj-2]: /ja/guides/metrics/#counters
[metricsj-3]: /ja/guides/logs/
[metricsj-4]: /ja/guides/agent_checks/#sending-metrics
[metricsj-5]: /ja/guides/dogstatsd/#metrics
[metricsj-6]: /ja/api/#metrics-post

<!--
===============================================================================
    Other
===============================================================================
-->

<!--### Other

#### How do I setup my team in Datadog?
{: #team}

The admin of the account should enter the email addresses of team members
[here][other-1]. Some team best practices are as follows:

* When the team member receives the confirmation email, they will be provided with a link to log in directly. The user should not click ‘sign up’ during this process.
* If multiple users from the same organization sign up separately, this will register as different organizations in Datadog. Please reach out to support to have these merged, but please note that all information contained in the account getting merged will not be transferred over.
* The only access controls we have right now are around admin activities (adding/removing users, billing, etc.). As far as data goes (hosts, metrics, dashboards, etc.) all users have access to everything; more robust access controls are in our pipeline, but not something we’ve focused a lot of attention on yet.
* To remove a team member use the “disable” button on the same ‘team’ page (only available for admins). You cannot permanently remove users, just disable; disabled users will only be visible to admins on the team page and can’t log in and any session they have open is invalidated. We don’t fully delete them because they might own events, dashboards, etc. which are not supposed to be removed.
-->

### その他
{: #other}

#### チームの設定は、どのようにすればよいですか。
{: #team}

アカウント管理者が、[ダッシュボードの`team`タブ][other-1]よりチームメンバの電子メールアドレスを入力する必要があります。

チーム管理のベストプラクティスは、次の通りです:

* チームメンバとしての確認メールには、Datadog への直接ログインするためのリンクが提供されます。新メンバは、このリンクを使いDatadog に直接ログインし、パスワードを設定することができます。招待を受けたユーザは、この招待プロセスの間に’サインアップ’をクリックしないようにしてください。
* 同じ組織からの複数のユーザが個別にユーザ登録をした場合、Datadog ではそれぞれ別の組織に属したユーザとして登録します。同一チームに所属させる必要がある場合は、サポートにご連絡ください。ただし、すべてのユーザ情報が移行されるわけではないの注意してください。
* Datadogが提供しているアクセス制御は、アカウント管理のためのユーザの追加/削除、請求書プランの変更などです。ホスト、メトリクス、ダッシュボードなどのデータという観点では、すべてのユーザがすべてのものにアクセスできます。Datadogでは、より堅牢なアクセス制御を実現するために鋭意開発を進めていますが、アクセス制御の開発が現在の最優先課題ではないことはご理解いただけると幸いです。
* チームメンバを削除するには、同じ[`team`のページ][other-1]（管理者のみ使用可能）の`disable`ボタンを使用します。チームメンバに追加したユーザは、使用停止の状態にすることはできますが、チームメンバを完全に削除することはできません。使用停止状態のユーザは、管理者のチームページにのみに表示され、ログインができなくなると同時に、すでに通信中のセッションもすべて遮断されます。チームメンバを完全に削除しない理由は、削除操作しようとしているメンバが削除が設定したイベントやダッシュボードに対し他のユーザ権限ではアクセスできなくなる可能性があるからです。


<!--#### Are my data and credentials safe?
{: #security}

* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here][other-2].
* The agent is entirely open source and can be found [here][other-3].
* Some installations (for example, installing the agent on CentOS 5), will request your password. The password is needed because it's installing packages - Datadog does not retain it in anyway. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.
-->

#### データと認証情報は安全ですか。
{: #security}

* 通信セッションは、常にDatadog AgentからDatadogのサービスに向かって開始されます。Datadogのサービス側からDatadog Agentに向かっ通信セッションを開始することは一切ありません。
* すべてのデータ送信は、SSLを介して送信されます。
* Datadogのサービス側へのすべての通信は、HTTPSを介して行われます。
* Datadogのサービス利用規約は、[SERVICE TERMS AND AGREEMENT][other-2]を参照してください。
* Datadog Agentのソースコードは、オープンソースとしてGithubのDatadogアカウント以下に[dd-agent][other-3]として公開しています。
* 一部のOSのインストール手順では、パスワードを求められることがあります。(例えば、CentOS5にDatadog Agentをインストールする場合)この際のパスワードの入力は、OSにパッケージ類をインストールする際に求められるものです。更に、Datadogではこれらのパスワードは一切保持していません。もしも、インストールスクリプトがどのような操作をしているのかが気になる場合は、ステップバイステップの手順に基づきDatadog Agentをインストールすることもできます。

<!--#### I have a feature request. How can I submit it?
{: #feature-request}

You can send the request to support@datadoghq.com and we will add it to our feature request log.
-->

#### サービスや機能に対する要望はどのように提出ればよいですか。
{: #feature-request}

要望は、[support@datadoghq.com][datadog-support]に送信してください。それらの要望は、Datadog の機能追加リクエスト専用のバックログに追加され、順次検討されていきます。


[other-1]: https://app.datadoghq.com/account/team
[other-2]: https://app.datadoghq.com/policy/license
[other-3]: https://github.com/DataDog/dd-agent/

[datadog-support]: mailto:support@datadoghq.com
