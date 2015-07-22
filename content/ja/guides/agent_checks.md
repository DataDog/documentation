---
last_modified: 2015/07/15
translation_status: complete
language: ja
title: Agent Checkの書き方
kind: guide
listorder: 5
sidebar:
  nav:
    - header: Agent Checkのガイド
    - text: 概要
      href: "#overview"
    - text: セットアップ
      href: "#setup"
    - text: Agent Checkのインターフェース
      href: "#interface"
    - text: 設定
      href: "#config"
    - text: ディレクトリーの構造
      href: "#directory"
    - text: 始めてのチェック
      href: "#first"
    - text: HTTPのチェック
      href: "#http"
---

<!-- <div class="alert alert-block">
This guide requires an Agent version >= 3.2.0. Older versions of the Agent do
not include the `AgentCheck` interface that we'll be using.
</div> -->

<div class="alert alert-block">
Agent Checkを使うには、Datadog Agent 3.2.0 以降をインストールしている必要があります。 それ以前のバージョンには、Agent Checkのインターフェースは実装されていません。
</div>


<!--
======================================================
OVERVIEW
======================================================
-->

<!-- <h3 id="overview">Overview</h3>
This guide details how to collect metrics and events from a new data source
by writing an Agent Check, a Python plugin to the Datadog Agent. We'll
look at the `AgentCheck` interface, and then write a simple Agent Check
that collects timing metrics and status events from HTTP services.

Any custom checks will be included in the main check run loop, meaning
they will run every check interval, which defaults to 15 seconds. -->


<h3 id="overview">概要</h3>

このガイドでは、Pythonで記述したDatadog Agent のpluginであるAgent Check を記述することで、新しいデータソースからメトリクスとイベント情報を取得する方法について説明します。
`AgentCheck`のインターフェースを確認した後、HTTP サービスからタイミングメトリクスやステータスに関するイベント情報を取得する簡単なAgent Checkを記述してみます。

Agent Checkは、メインチェックの実行ループに組み込まれ、デフォルト設定では15秒間隔で実行されます。


<!--
======================================================
SETUP
======================================================
-->

<!-- <h3 id="setup">Setup</h3>

First off, ensure you've properly
<a href="http://app.datadoghq.com/account/settings#agent">installed the
Agent</a> on your machine. If you run into any issues during the setup, pop by
our chatroom, <a href="irc://irc.freenode.net/datadog">#datadog on FreeNode</a>,
and we'll be happy to answer any questions you might have. (There's a
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.) -->

<h3 id="setup">セットアップ</h3>

まだDatadog Agentをインストールしていない場合は、[Datadog Agent 入門](../basic_agent_usage/)又は、ダッシュボード内タブを[Installations -> Agent](http://app.datadoghq.com/account/settings#agent)とクリックしてインストールドキュメントを参照してください。これらのドキュメントでは、特定のOS用のDatadog Agent をインストールする手順を解説しています。

セットアップ中に問題が発生した場合は、[freenode にあるDatadog](irc://irc.freenode.net/datadog)のチャットルームで気兼ねなく質問してください。 ([web チャットクライアント](http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1))


<!--
======================================================
INTERFACE
======================================================
-->

<!-- <h3 id="interface">Agent Check Interface</h3>

All custom checks inherit from the `AgentCheck` class found in `checks/__init__.py`
and require a `check()` method that takes one argument, `instance` which is a
`dict` having the configuration of a particular instance. The `check` method is
run once per instance defined in the check configuration (discussed later). -->

<h3 id="interface">Agent Check のインターフェース</h3>

すべてのカスタムチェックは、`checks/__init__.py`に記述されている`AgentCheck`クラスを継承し、`check()`関数をオーバーライドして生成します。
`check()` 関数には、そのインスタンスの構成が記述された辞書型の情報を引数に渡します。
`check()` 関数は、Check設定で定義されたインスタンスごとに一回実行されることになります。(詳細に関しては、後述します)


<!-- #### Sending metrics

Sending metrics in a check is easy. If you're already familiar with the
methods available in DogStatsD, then the transition will be very simple. If
you're not already familiar with that interface, you'll find sending metrics is
a breeze.

You have the following methods available to you:

    self.gauge( ... ) # Sample a gauge metric

    self.increment( ... ) # Increment a counter metric

    self.decrement( ... ) # Decrement a counter metric

    self.histogram( ... ) # Sample a histogram metric

    self.rate( ... ) # Sample a point, with the rate calculated at the end of the check

    self.count( ... ) # Sample a raw count metric

    self.monotonic_count( ... ) # Sample an increasing counter metric

All of these methods take the following arguments:

- `metric`: The name of the metric
- `value`: The value for the metric (defaults to 1 on increment, -1 on decrement)
- `tags`: (optional) A list of tags to associate with this metric.
- `hostname`: (optional) A hostname to associate with this metric. Defaults to the current host.
- `device_name`: (optional) A device name to associate with this metric.

These methods may be called from anywhere within your check logic. At the end of
your `check` function, all metrics that were submitted will be collected and
flushed out with the other Agent metrics.
 -->

#### メトリクスの送信

Agent Checkでメトリクスを送信することは非常に簡単です。既にDogStatsDが提供している関数に精通しているなら、移行は非常に簡単です。
まだそれらの関数に慣れていない場合でも、それほど大変ではないことがすぐに分かるはずです。


Agent Checkでは、以下の関数を利用することが出来ます:

    self.gauge( ... ) # Sample a gauge metric

    self.increment( ... ) # Increment a counter metric

    self.decrement( ... ) # Decrement a counter metric

    self.histogram( ... ) # Sample a histogram metric

    self.rate( ... ) # Sample a point, with the rate calculated at the end of the check

    self.count( ... ) # Sample a raw count metric

    self.monotonic_count( ... ) # Sample an increasing counter metric

全ての関数は、以下の引数を取ります:

- `metric`: The name of the metric
- `value`: The value for the metric (defaults to 1 on increment, -1 on decrement)
- `tags`: (optional) A list of tags to associate with this metric.
- `hostname`: (optional) A hostname to associate with this metric. Defaults to the current host.
- `device_name`: (optional) A device name to associate with this metric.

これらの関数は、チェックロジックのどこからでも呼び出すことが出来ます。これらの関数を使って取得したメトリクスは、`check` 機能の実行の最後に他のAgent メトリクスと共にDatadogのサービスに転送されます。


<!-- #### Sending events

At any time during your check, you can make a call to `self.event(...)` with one argument: the payload of the event. Your event should be structured like this:

    {
        "timestamp": int, the epoch timestamp for the event,
        "event_type": string, the event name,
        "api_key": string, the api key for your account,
        "msg_title": string, the title of the event,
        "msg_text": string, the text body of the event,
        "aggregation_key": string, a key to use for aggregating events,
        "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info');
            defaults to 'info',
        "source_type_name": (optional) string, the source type name,
        "host": (optional) string, the name of the host,
        "tags": (optional) list, a list of tags to associate with this event
    }


At the end of your check, all events will be collected and flushed with the rest
of the Agent payload. -->


#### イベントの送信

Check 内でイベントを送信するには、`self.event(...)`を呼び出し、`"argument":`に値を設定することで、そのイベントに関する情報(payload)を設定することが出来ます。イベントの中身は次のような構造になっている必要があります:

    {
        "timestamp": int, the epoch timestamp for the event,
        "event_type": string, the event name,
        "api_key": string, the api key for your account,
        "msg_title": string, the title of the event,
        "msg_text": string, the text body of the event,
        "aggregation_key": string, a key to use for aggregating events,
        "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info');
            defaults to 'info',
        "source_type_name": (optional) string, the source type name,
        "host": (optional) string, the name of the host,
        "tags": (optional) list, a list of tags to associate with this event
    }


全てのイベントは、`check` 機能の実行の最後に、他のAgent Checkの内容と共にDatadogのサービスに転送されます。


<!-- #### Exceptions

If a check cannot run because of improper configuration,  programming error or
because it could not collect any metrics, it should raise a meaningful exception.
This exception will be logged, as well as be shown in the Agent info command for
easy debugging. For example:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: ConnectionError('Connection refused.',)
          - Collected 0 metrics & 0 events -->

#### エラーと例外の表示

不適切な設定、プログラミング時のエラー、いずれかのメトリクスが取得できない時など、Checkが正常に実行できない場合には、状況を把握しやすい例外メッセージが必要です。この例外メッセージはログに記録されると同時に、`datadog-agent info` コマンドで表示出来るので、デバッグに利用することが出来ます:


    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: ConnectionError('Connection refused.',)
          - Collected 0 metrics & 0 events


<!-- #### Logging

As part of the parent class, you're given a logger at `self.log`, so you can do
things like `self.log.info('hello')`. The log handler will be `checks.{name}`
where `{name}` is the name of your check (based on the filename of the check
module). -->

#### ログの保存

AgentCheckクラスを承継しているので、親クラスで実装されているロギング機能を `self.log.info('hello')`の形で使うことが出来ます。
**The log handler will be `checks.{name}`
where `{name}` is the name of your check (based on the filename of the check
module).**


<!--
======================================================
CONFIGURATION
======================================================
-->

<!-- <h3 id="config">Configuration</h3>

Each check will have a configuration file that will be placed in the `conf.d`
directory. Configuration is written using [YAML](http://www.yaml.org/). The
file name should match the name of the check module (e.g.: `haproxy.py` and
`haproxy.yaml`).

The configuration file has the following structure:

<%= console <<EOF
init_config:
    key1: val1
    key2: val2

instances:
    - username: jon_smith
      password: 1234

    - username: jane_smith
      password: 5678
EOF
%>

<div class="alert alert-block">Note: YAML files must use spaces instead of tabs.</div> -->

<h3 id="config">設定</h3>

Agent Checkには設定ファイルがあり、その設定ファイルは`conf.d` 以下に置かれています。設定ファイルは、[YAML](http://www.yaml.org/) 形式で記述します。
設定ファイルの名前は、Agent Checkのモジュールの名前と同じ名前である必要があります。
(例: モジュール名が`haproxy.py` の場合は、設定ファイル名は、`haproxy.yaml` になります)

設定ファイルは、以下のようになります:

<%= console <<EOF
init_config:
    key1: val1
    key2: val2

instances:
    - username: jon_smith
      password: 1234

    - username: jane_smith
      password: 5678
EOF
%>

<div class="alert alert-block">注: YAML ファイルは、タブを使わず、スペースを使って記述してください。</div>


<!-- #### init_config

The *init_config* section allows you to have an arbitrary number of global
configuration options that will be available on every run of the check in
`self.init_config`. -->

#### init_config

*init_config*のセクションでは、Agent Check実行時に利用できるグローバルな設定オプションを複数記述することが出来ます。このオプションは、全てのCheckの実行において`self.init_config`の方法で、アクセスすることが出来ます。


<!-- #### instances

The *instances* section is a list of instances that this check will be run
against. Your actual `check()` method is run once per instance. This means that
every check will support multiple instances out of the box. -->

#### instances

*instances*のセクションは、Checkが実行される全ての対象(instance)のリストになります。

Checkの中で実行される`check()` 関数の実体は、各チェック対象(instance)に対して個別に実行されていきます。このことより全てのCheckは、そのままの状態で複数のチェック対象(instance)をサポートしていることを意味しています。


<!--
======================================================
DIRECTORY STRUCTURE
======================================================
-->

<!-- <h3 id="directory">Directory Structure</h3>

Before starting your first check it is worth understanding the checks directory
structure. There are two places that you will need to add files for your check.
The first is the `checks.d` folder, which lives in your Agent root.

For all Linux systems, this means you will find it at: -->

<h3 id="directory">ディレクトリの構造</h3>

Checkのプログラミングを始める前に、まず関連するディレクトリの構造を理解しておくのは重要なことです。Checkで使用するファイルは２カ所に分けて配置します。
Check のPython 実行ファイルは、Datadog Agent のルートディレクトリにある`checks.d` のフォルダに配置します。

Linux系のシステムは、以下のディレクトリになります:

    /etc/dd-agent/checks.d/

Windows Server > = 2008の場合は、以下のディレクトリになります:

    C:\Program Files (x86)\Datadog\Agent\checks.d\

    OR

    C:\Program Files\Datadog\Agent\checks.d\

Mac OS Xと、ソースからインストールした場合は、以下のディレクトリになります:

    ~/.datadog-agent/agent/checks.d/

    OR

    ~/.pup/agent/checks.d/

    OR

    <sandbox_folder>/checks.d/

Check の設定ファイルは、Datadog Agent の設定ファイルのルートディレクトリにある`conf.d` になります。

Linux系のシステムは、以下のディレクトリになります:

    /etc/dd-agent/conf.d/

Windowsの場合は、以下のディレクトリになります：

    C:\ProgramData\Datadog\conf.d\

    OR

    C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\

Mac OS Xと、ソースからインストールした場合は、以下のディレクトリになります:

    ~/.datadog-agent/agent/conf.d/

    OR

    ~/.pup/agent/conf.d/

    OR

    <sandbox_folder>/conf.d/

実行ファイルと設定ファイルは、デフォルトの場所以外に、一つのディレクトリにまとめて設置し、`datadog.conf` 内で設置ディレクトリを指定することも出来ます:

    additional_checksd: /path/to/custom/checks.d/

<!--
======================================================
FIRST CHECK
======================================================
-->

<!-- <h3 id="first">Your First Check</h3>

<div class="alert alert-block">
The names of the configuration and check files must match. If your check
is called <code>mycheck.py</code> your configuration file <em>must</em> be
named <code>mycheck.yaml</code>.
</div>

To start off simple, we'll write a check that does nothing more than send a
value of 1 for the metric `hello.world`. The configuration file will be very
simple, including no real information. This will go into `conf.d/hello.yaml`:

<%= console <<EOF
init_config:

instances:
    [{}]

EOF
%>

The check itself will inherit from `AgentCheck` and send a gauge of `1` for
`hello.world` on each call. This will go in `checks.d/hello.py`:

<%= python <<EOF
from checks import AgentCheck
class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)

EOF
%>

As you can see, the check interface is really simple and easy to get started
with. In the next section we'll write a more useful check that will ping HTTP
services and return interesting data. -->

<h3 id="first">始めてのCheck</h3>

<div class="alert alert-block">
Check 実行ファイルおよび設定ファイルの名前(拡張子を除く)は一致している必要があります。
例えば、実行ファイルが<code>mycheck.py</code> の場合、設定ファイルは、<code>mycheck.yaml</code> というファイル名になります。
</div>

まず簡単な例として、メトリクス名`hello.world`で、値1を送信するAegent Checkを書いてみます。設定ファイルは、`conf.d / hello.yaml` に配置し、以下の3行で非常にシンプルな内容になります:

<%= console <<EOF
init_config:

instances:
    [{}]

EOF
%>

HelloCheckは、AgentCheckクラスを継承し、`hello.world`というメトリクス名で毎回`1`を送信します。このCheckを記述した`hello.py` ファイルは、`checks.d` ディレクトリ以下に配置します:

<%= python <<EOF
from checks import AgentCheck
class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)

EOF
%>
ごのようにCheckのインターフェースは、シンプルで、簡単に使い始めることが出来ます。

次のセクションでは、HTTPサービスに対しpingを実行し、レスポンス時間を計測してDatadogに送信するCheckを書いてみることにします。


<!--
======================================================
HTTP CHECK
======================================================
-->

<!-- <h3 id="http">An HTTP Check</h3>

Now we will guide you through the process of writing a basic check that will
check the status of an HTTP endpoint. On each run of the check, a GET
request will be made to the HTTP endpoint. Based on the response, one of the
following will happen:

  - If the response is successful (response is 200, no timeout) the response
  time will be submitted as a metric.
  - If the response times out, an event will be submitted with the URL and
  timeout.
  - If the response code != 200, an event will be submitted with the URL and
  the response code. -->


<h3 id="http">HTTP のCheck</h3>

ここからは、HTTPのエンドポイントの状況を確認するための基本的なCheckの書き方を解説します。
Checkが実行される度に、HTTPのエンドポイントに対してGETリクエストを実行します。
レスポンスの結果に基づいて次の処理をします:

- レスポンスが成功と判定された場合（レスポンスステータスが200で、タイムアウトをしていない）、レスポンス時間をメトリクスとして送信します。
- レスポンスがタイムアウトした場合、URLとタイムアウトのイベントを送信します。
- レスポンスステータスが200以外の場合、URL及びレスポンスコードのイベントを送信します。



<!-- #### Configuration

First we will want to define how our configuration should look, so that we know
how to handle the structure of the `instance` payload that is passed into the
call to `check`.

Besides just defining a URL per call, it'd be nice to allow you to set a timeout
for each URL. We'd also want to be able to configure a default timeout if no
timeout value is given for a particular URL.

So our final configuration would look something like this:

<%= console <<EOF
init_config:
    default_timeout: 5

instances:
    -   url: https://google.com

    -   url: http://httpbin.org/delay/10
        timeout: 8

    -   url: http://httpbin.org/status/400

EOF
%> -->


#### 設定

インスタンス定義の中身が各Check本体でどのように処理されるのかを理解するために、
まず最初に設定ファイルがどのようになるか考えてみることにします。

設定ファイルは、Checkの実行先のURLの定義以外に、それぞれのURLに対してのタイムアウトを設定すると、より環境に合ったCheckを実行出来ることになります。更に、それぞれのインスタンスでタイムアウトを設定しなかった時のために、デフォルトのタイムアウトを設定しておくことも必要になります。

上記をふまえると、設定ファイルは次のようになります:


<%= console <<EOF
init_config:
    default_timeout: 5

instances:
    -   url: https://google.com

    -   url: http://httpbin.org/delay/10
        timeout: 8

    -   url: http://httpbin.org/status/400

EOF
%>
<!-- #### The Check

Now we can start defining our check method. The main part of the check will make
a request to the URL and time the response time, handling error cases as it goes.

In this snippet, we start a timer, make the GET request using the
[requests library](http://docs.python-requests.org/en/latest/) and handle and
errors that might arise.

<%= console <<EOF
# Load values from the instance config
url = instance['url']
default_timeout = self.init_config.get('default_timeout', 5)
timeout = float(instance.get('timeout', default_time))

# Use a hash of the URL as an aggregation key
aggregation_key = md5(url).hexdigest()

# Check the URL
start_time = time.time()
try:
    r = requests.get(url, timeout=timeout)
    end_time = time.time()
except requests.exceptions.Timeout as e:
    # If there's a timeout
    self.timeout_event(url, timeout, aggregation_key)

if r.status_code != 200:
    self.status_code_event(url, r, aggregation_key)
EOF
%>

If the request passes, we want to submit the timing to Datadog as a metric. Let's
call it `http.response_time` and tag it with the URL.

<%= python <<EOF
timing = end_time - start_time
self.gauge('http.reponse_time', timing, tags=['http_check'])
EOF
%>

Finally, we'll want to define what happens in the error cases. We have already
seen that we call `self.timeout_event` in the case of a URL timeout and
we call `self.status_code_event` in the case of a bad status code. Let's
define those methods now.

First, we'll define `timeout_event`. Note that we want to aggregate all of these
events together based on the URL so we will define the aggregation_key as a hash
of the URL.

<%= python <<EOF
def timeout_event(self, url, timeout, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'URL timeout',
        'msg_text': '%s timed out after %s seconds.' % (url, timeout),
        'aggregation_key': aggregation_key
    })
EOF
%>
Next, we'll define `status_code_event` which looks very similar to the timeout
event method.

<%= python <<EOF
def status_code_event(self, url, r, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'Invalid reponse code for %s' % url,
        'msg_text': '%s returned a status of %s' % (url, r.status_code),
        'aggregation_key': aggregation_key
    })
EOF
%>
 -->

#### Check 本体

では、Check 本体の関数を定義することにします。関数のメインは、設定ファイルで指定したURLに対しHTTP リクエストを実行し、レスポンス時間を計測します。
エラーが発生していれば、エラー条件によって処理をします。

以下のセクションでは、タイマをスタートし、[requests library](http://docs.python-requests.org/en/latest/)を使いHTTPリクエストを実行し、発生する可能性のあるエラーの処理を行います。

<%= console <<EOF
# Load values from the instance config
url = instance['url']
default_timeout = self.init_config.get('default_timeout', 5)
timeout = float(instance.get('timeout', default_time))

# Use a hash of the URL as an aggregation key
aggregation_key = md5(url).hexdigest()

# Check the URL
start_time = time.time()
try:
    r = requests.get(url, timeout=timeout)
    end_time = time.time()
except requests.exceptions.Timeout as e:
    # If there's a timeout
    self.timeout_event(url, timeout, aggregation_key)

if r.status_code != 200:
    self.status_code_event(url, r, aggregation_key)
EOF
%>

リクエストが成功した場合、レスポンス時間をDatadogへ送信します。その際、メトリクス名は、`http.response_time`。URLをタグとして付記します。

<%= python <<EOF
timing = end_time - start_time
self.gauge('http.reponse_time', timing, tags=['http_check'])
EOF
%>

最後に、エラー発生時の処理内容を定義します。
先のコードで既に、 HTTP リクエストがタイムアウトした場合の`timeout_event` 関数と、レスポンスステータスが200
以外の場合の`self.status_code_event` 関数を定義しています。
従って、これらのイベントの関数の中身を定義します。

まず、`timeout_event` を定義します。`self.event()` で注目してほしいのは、`'aggregation_key':` に、先のコードに出ているURLのハッシュである`aggregation_key = md5(url).hexdigest()`を設定している部分です。このaggregation_key を使って、特定のURLに関連したイベントを集約します。

<%= python <<EOF
def timeout_event(self, url, timeout, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'URL timeout',
        'msg_text': '%s timed out after %s seconds.' % (url, timeout),
        'aggregation_key': aggregation_key
    })
EOF
%>

次に、`status_code_event` を定義します。先に定義した`timeout_event` とほぼ同じ内容になります。

<%= python <<EOF
def status_code_event(self, url, r, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'Invalid reponse code for %s' % url,
        'msg_text': '%s returned a status of %s' % (url, r.status_code),
        'aggregation_key': aggregation_key
    })
EOF
%>


<!-- #### Putting It All Together

For the last part of this guide, we'll show the entire check. This module would
be placed into the `checks.d` folder as `http.py`. The corresponding
configuration would be placed into the `conf.d` folder as `http.yaml`.

Once the check is in `checks.d`, you can test it by running it as a python
script. **Make sure to change the conf.d path in the test method**. From your
Agent root, run:

    PYTHONPATH=. python checks.d/http.py

You'll see what metrics and events are being generated for each instance.

Here's the full source of the check:

<%= snippet_code_block("guides-agentchecks-ex-all.py", :nocomments => true) %>
 -->

#### 今までの解説をまとめると

このガイドの最後に、Checkの実行コード全体を載せてあります。このコードを、`checks.d`フォルダ以下へ、`http.py`のファイル名で配置します。この実行コードに必要な、設定ファイルは、`conf.d`フォルダー以下に、`http.yaml`として配置します。

Checkに実行ファイルを配置したら、次のpython スクリプトを使ってテストを実行することが出来ます。
尚、**`__main__`の部分の`/path/to/conf.d/http.yaml`を、テスト用の設定ファイルを配置している場所に書き換えてあることを必ず確認してください。**

Agent のroot から、次のコマンドでテストを実行します:

    PYTHONPATH=. python checks.d/http.py

インスタンスごとに生成されているメトリクスとイベントが表示されます。

チェックの完全なソースは次の通りです。

<%= snippet_code_block("guides-agentchecks-ex-all.py", :nocomments => true) %>


<!--
======================================================
Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Troubleshooting</h3>

Custom Agent checks can't be directly called from python and instead
 need to be called by the agent. To test this, run:

    sudo -u dd-agent dd-agent check my_check

If your issue continues, please reach out to Support with the help page that
 lists the paths it installs. -->

<h3 id="troubleshooting">トラブルシュート</h3>

カスタム Agent checkは、Pythonコマンドから直接実行出来ません。代わりに、Datadog Agentを使って、テスト実行するようにします。テストするには、次のようなコマンドを実行します:

    sudo -u dd-agent dd-agent check my_check

問題が解決しない場合、[お問い合わせ](../../help)に記載された方法でサポート要請のご連絡をしていただけると幸いです。

<!-- <h4>Testing Custom Checks on Windows</h4>

Testing custom checks on Windows is easy. The Agent install includes a file called shell.exe
in your Program Files directory for the Datadog Agent which you can use to run python within the Agent environment.

Once you're check (called "my_check") is written and you have the .py and .yaml files
in their correct places, you can run the following in shell.exe:

    >>> from checks import run_check
    >>> run_check('my_check')

This will output any metrics or events that the check will return. -->

<h4>WindowsでのカスタムCheckのテスト</h4>

Windows上でカスタムチェックのテストは簡単です。
Datadog Agentのインストールには`shell.exe` というDatadog Agent 用のpythonの実行環境が含まれています。
このファイルは、`Program Files` ディレクトリに保存されています。

Agent Check（例えば「my_check」）を書き終え、`.py`ファイルと`.yaml`ファイルの配置が終わったら、次のコマンドを、`shell.exe` で起動したウインドウ内で実行してみて下さい。

    >>> from checks import run_check
    >>> run_check('my_check')

このコマンドは、Checkが送信するメトリクスかイベントを表示します。
