---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: サービスチェック機能の設定方法 (イベントの送信)
sidebar:
  nav:
    - header: サービスチェックのガイド
    - text: 概要
      href: "#overview"
    - text: セットアップ
      href: "#setup"
    - text: 設定
      href: "#config"
    - text: HTTP のチェックのための設定
      href: "#http_config"
    - text: TCP のチェックのための設定
      href: "#tcp_config"
---

<div class="alert alert-block">
サービスチェックを使うには、Datadog Agent 3.2.0 以降をインストールしている必要があります。
それ以前のバージョンには、サービチェック機能は実装されていません。
</div>

<!--
======================================================
OVERVIEW
======================================================
-->

<!-- <h3 id="overview">Overview</h3>

In this guide, we will show you how you can setup some service checks
to monitor your service and to be notified when one goes down.

Service checks run in the Agent and are called in the main loop but will be
processed in separate threads so they don't block the Agent.

A service check can be marked as either <b>UP</b> or <b>DOWN</b>.

Service checks will post an event on your stream when:

- The status of the service has changed.
- A service is DOWN on the first check. -->

<!-- ### 概要 -->

<h3 id="overview">概要</h3>

このガイドでは、Datadogのサービスチェック機能を使って、サービスを監視し、障害が発生した際に通知が受けられるようにする方法を紹介します。

サービスチェックは、Datadog Agent のメインループからコールされます。
尚コールされたプロセスは、Datadog Agent の処理をブロックすることがないように別スレッドのプロセスで実行されます。

サービスチェックは、**UP**または**DOWN**と記述して、起動したり停止することができます。

サービスチェックは、次の状況が発生した際にイベントストリームへイベントを送信します:

- サービスのステータスが変更されたとき
- first check で、サービスが停止しているとき

<!--
======================================================
SETUP
======================================================
-->

<!-- <h3 id="setup">Setup</h3>

If you have not already setup the Agent, then you should check out the Agent
setup instructions available at: <a href="http://app.datadoghq.com/account/settings#agent">http://app.datadoghq.com/account/settings#agent</a>.
This page will guide you through installing the Agent for your particular OS.

If you run into any issues during the setup, don't hesistate to pop by our
chat room, <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
where we'll be happy to answer any questions you might have. (There's a
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.) -->

<!-- ### セットアップ  -->

<h3 id="setup">セットアップ</h3>

未だDatadog Agentをインストールしていない場合は、[Datadog Agent 入門](/ja/guides/basic_agent_usage/)又は、ダッシュボード内タブの[Installations -> Agent](http://app.datadoghq.com/account/settings#agent)をクリックし、インストールドキュメントを参照してください。これらのドキュメントでは、特定のOS用のDatadog Agent をインストールする手順を解説しています。

セットアップ中に問題が発生した場合は、[freenode にあるDatadog](irc://irc.freenode.net/datadog)のチャットルームで気兼ねなく質問してください。 ([web チャットクライアント](http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1))

<!--
======================================================
CONFIGURATION
======================================================
-->

<!-- <h3 id="config">Configuration</h3>

There are currently two types of service checks:

- HTTP(S) checks
- TCP checks

As service checks are also Agent checks, they are configured <a href="http://docs.datadoghq.com/guides/agent_checks/#config">the same way</a>.

Each check will have a configuration file that will be placed in the `conf.d`
directory. Configuration is written using [YAML](http://www.yaml.org/).

HTTP(S) Check configuration file must be named http_check.yaml
TCP Check configuration file must be named tcp_check.yaml. -->

<!--  ### 設定  -->

<h3 id="config">設定</h3>

サービスチェックは、2種類あります:

- HTTP(S) のチェック
- TCP のチェック

サービスチェックは、Agent Check機能の一部分です。従って、設定方法も[Agent Check機能](/ja/guides/agent_checks/#config)で解説した内容と同じになります。

それぞれのサービスチェックの設定ファイルは、`conf.d` ディレクトリ以下に設置します。設置する設定ファルは、[YAML](http://www.yaml.org/)形式で記述していきことになります。

HTTP(S) のサービスチェックのための設定ファイルには、**http_check.yaml**というファイル名で指定します。
TCP のサービスチェックのための設定ファイルには、**tcp_check.yaml**というファイル名で指定します。

両設定ファイルとも、他のファイル名を指定することはできません。

<!--
======================================================
HTTP CHECK CONFIGURATION
======================================================
-->

<!-- <h3 id="http_config">HTTP Check Configuration</h3>

The HTTP(S) Check configuration file has the following structure:

{{< snippet-code-block file="guides-http_check-config.yaml" >}}

<div class="alert alert-block">Note: Your YAML files must use spaces instead of tabs.</div>

#### init_config

The *notify* parameter (optional) in the *init_config* section allows you to
chose which Datadog users will be notified when your service goes down
or when your service recovers. If you have any additional integrations
that support notifications (such as Pagerduty or Hipchat), you can notify
them as well.

#### instances

The *instances* section is a list of instances that this check will be run
against with the needed parameters.

List of parameters:

- name <b>(mandatory)</b>: A name that must be unique across all your HTTP checks
- url <b>(mandatory)</b>: The url you want to monitor
- username (optional): If you want to test pages protected by a basic authentication.
- password (optional): If you want to test pages protected by a basic authentication.
- timeout (optional): A timeout for the request, defaulting to 10 seconds.
A service will be marked as down if the request times out
- notify (optional): To override the global setting set in the *init_config* section.

#### Custom notifying:

You can also set-up your check to only trigger an error after a certain number of failures
have happend within a certain timeframe. Using the `window` and `threshold` parameters,
you can tell the alert to <em>only</em> trigger an alert if the check fails `x` times within
the last `y` attempts where `x` is the `threshold` and `y` is the `window`.

For example, if you have the following configuration for window and threshold:

{{< snippet-code-block file="guides-http_check-notify.yaml" >}}

You will only be notified if the check fails 3 times within the last 5 tries. -->

<h3 id="http_config">HTTP のチェックのための設定</h3>

HTTP(S)のサービスチェックの設定ファイルの構造は、次のように成ります:

{{< snippet-code-block file="guides-http_check-config.yaml" >}}

<div class="alert alert-block">
注) YAML ファイルでは、タブを使わず、スペースを使って記述してください。
</div>

#### init_config

*init_config*セクション内の*notify*パラメータを指定することでサービスが停止した際に、Datadog内のどのユーザが通知を受けるかを指定することができます。更に、Integrationによって外部のサービス(Pagerduty, Hipchat, etc)と連携している場合は、それらのサービスに対しても通知をすることができます。

#### instances

*instances*セクションには、チェックを実施するケースの詳細を記述していきます。

指定可能なパラメーター:

- name **(必須)**: すべてのHTTP のチェック名を通して、一意である必要があります。
- url **(必須)**: 監視をしたい url。
- username (オプション): ベーシック認証付きのベージをテストする場合のユーザ名です。
- password (オプション): ベーシック認証付きのベージをテストする場合のパスワードです。
- timeout (オプション): HTTP(S) リクエストのタイムアウト時間です。デフォルト値は10秒。リクエストのタイムアウトが発生した場合、そのサービスは停止していると見なされます。
- notify (オプション): *init_config* セクションで指定した内容を、変更するための通知先リストです。

#### 通知条件の追加設定項目:

サービスチェックを設定する際に、一定の時間内に一定回数の障害が発生したことをエラーの条件とすることができます。
このような通知条件の設定には`window` と`threshold` パラメーターを*instance* セクションに追記します。
一定の時間枠(`window`)で表現されるチェック回数が`y`の内に、障害回数のしきい値(`threshold`)が`x`回発生した時にのみ通知するように設定することになります。

例えば、次のようなチェック回数(window)と、その回数内でのしきい値(threshold)を指定したとします:

{{< snippet-code-block file="guides-http_check-notify.yaml" >}}

過去5回のチェックの内で、3回失敗した場合にのみ通知されます。

<!--
======================================================
TCP CHECK CONFIGURATION
======================================================
-->

<!-- <h3 id="tcp_config">TCP Check Configuration</h3>

The TCP Check configuration file has the following structure:

{{< snippet-code-block file="guides-tcp_check-config.yaml" >}}

#### init_config

The *notify* parameter (optional) in the *init_config* section allows you to
chose which Datadog users will be notified when your service goes down
or when your service recovers.
If you have installed the pagerduty integration or the hipchat integration,
you can also notify them.

#### instances

The *instances* section is a list of instances that this check will be run
against with the needed parameters.

List of parameters:

- name <b>(mandatory)</b>: A name that must be unique across all your TCP checks
- host <b>(mandatory)</b>: The hostname or IP (v4 or v6) address you want to monitor
- port <b>(mandatory)</b>: The port on which the check will try to connect to
- timeout (optional): A timeout for the request, defaulting to 10 seconds.
A service will be marked as down if the request times out
- notify (optional): To override the global setting set in the *init_config* section.

#### Custom notifying:

You can also set-up your check to only trigger an error after a certain number of failures
have happend within a certain timeframe. Using the `window` and `threshold` parameters,
you can tell the alert to <em>only</em> trigger an alert if the check fails `x` times within
the last `y` attempts where `x` is the `threshold` and `y` is the `window`.

For example, if you have the following configuration for window and threshold:

{{< snippet-code-block file="guides-tcp_check-notify.yaml" >}}

You will only be notified if the check fails 3 times within the last 5 tries.
 -->

 <h3 id="tcp_config">TCP のチェックのための設定</h3>

TCP のサービスチェックの設定ファイるの構造は、次のように成ります:

{{< snippet-code-block file="guides-tcp_check-config.yaml" >}}

#### init_config

*init_config*セクション内の*notify*パラメータを指定することでサービスが停止した際に、Datadog内のどのユーザが通知を受けるかを指定することができます。更に、Integrationによって外部のサービス(Pagerduty, Hipchat, etc)と連携しいてる場合は、それらのサービスに対しても通知をすることができます。

#### instances

*instances* セクションには、チェックを実施するケースの詳細を記述していきます。

指定可能なパラメータ:

- name **(必須)**: すべてのTCP のチェック名を通して、一意である必要があります。
- host **(必須)**: 監視したいホスト名又は、IP (v4 or v6) アドレス。
- port **(必須)**: サービスチェックが接続するポート番号。
- timeout (オプション): TCP リクエストのタイムアウト時間です。デフォルト値は10秒。リクエストのタイムアウトが発生した場合、そのサービスは停止していると見なされます。
- notify (オプション): *init_config* セクションで指定した内容を、変更するための通知先リストです。

#### 通知条件の追加設定項目:

サービスチェックを設定する際に、一定の時間内に一定回数の障害が発生したことをエラーの条件とすることができます。
このような通知条件の設定には`window` と`threshold` パラメータを*instance* セクションに追記します。
一定の時間枠(`window`)で表現されるチェック回数が`y`の内に、障害回数のしきい値(`threshold`)が`x`回発生した時にのみ通知するように設定することになります。

例えば、次のようなチェック回数(window)と、その回数内でのしきい値(threshold)を指定したとします:

{{< snippet-code-block file="guides-tcp_check-notify.yaml" >}}

過去5回のチェックの内で、3回失敗した場合にのみ通知されます。
