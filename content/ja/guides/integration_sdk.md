---
last_modified: 2017/02/23
translation_status: complete
language: ja
title: 新規インテグレーションの作成
kind: guide
autotocdepth: 2
listorder: 3
---

<!-- Additional styling to help file name headers stand out -->
<style>h5 code{font-size:16px;display:inline-block;margin-top:20px;}</style>

<!-- ### Requirements

You will need a working [Ruby](https://www.ruby-lang.org) environment. For more information on installing Ruby, please reference [the Ruby installation documentation](https://www.ruby-lang.org/en/documentation/installation/).

You will also need [Wget](https://www.gnu.org/software/wget/). Wget is already installed on most Linux systems and is easy to install on Mac using [Homebrew](http://brew.sh/) or on Windows using [Chocolatey](https://chocolatey.org/). -->

### 要件

[Ruby](https://www.ruby-lang.org) 実行環境が必要です。 Ruby のインストールについては、[the Ruby installation documentation](https://www.ruby-lang.org/en/documentation/installation/) を参照してください。

[Wget](https://www.gnu.org/software/wget/) も必要です。 ほとんどのLinuxシステムでは、Wget はインストール済みのはずです。Macの場合は、[Homebrew](http://brew.sh/) を使うと簡単にインストールするができます。Windowsの場合は、[Chocolatey](https://chocolatey.org/)を使ってください。


<!-- ### Setup

We've written [a gem](https://rubygems.org/gems/datadog-sdk-testing) and a set of scripts to help you get set up, ease development, and provide testing. To begin:

1. Fork the [integrations-extras repository](https://github.com/DataDog/integrations-extras) on Github and clone the repository to your dev environment.
2. Run `gem install bundler`
3. Run `bundle install` -->

### セットアップ

開発環境のセットアップ、素早い開発、テストのために、[gem](https://rubygems.org/gems/datadog-sdk-testing) ファイルとスクリプトを公開しています。

まずは:

1. Github の  [integrations-extras](https://github.com/DataDog/integrations-extras) リポジトリをフォークし、ローカルの開発環境にリポジトリをクローンします。
2. `gem install bundler` を実行します。
3. `bundle install` を実行します。


<!-- Once the required Ruby gems have been installed by Bundler, you can easily create a [Python](https://www.python.org/) environment:

1. Run `rake setup_env`. This will install a Python virtual environment along with all the components necessary for integration development.
2. Run `source venv/bin/activate` to activate the installed Python virtual environment. To exit the virtual environment, run `deactivate`. You can learn more about the Python virtual environment on the [Virtualenv documentation](https://virtualenv.pypa.io/en/stable/).
 -->

Bundler により、Ruby gems が正しくインストールされていれば、次のコマンドで簡単にPython環境を作成できます:

1. `rake setup_env` を実行します。これにより、Python 仮想環境と、インテグレーションの開発に必要なすべてのコンポーネントがインストールされます。
2. `source venv/bin/activate` を実行します。このコマンドにより、Python 仮想環境をアクティブにします。 この仮想環境を終了するには、`deactivate` を実行します。 Python の仮想環境については、[Virtualenv のドキュメント](https://virtualenv.pypa.io/en/stable/)を参照してください。


<!-- ### Building an integration

You can use rake to generate the skeleton for a new integration by running `rake generate:skeleton[my_integration]`, where "my_integration" is the name of your new integration (note: you must enclose your integration name in square brackets).

This will create a new directory, `my_integration`, that contains all the files required for your new integration. This will also create an entry for your new integration in our `.travis.yml` and `circle.yml` continuous integration files to ensure that your tests are run whenever new builds are created.
 -->

### インテグレーションの開発

`rake generate:skeleton[my_integration]` を実行することで、新しいインテグレーションのスケルトンを生成することができます。"my_integration"　は、新しいインテグレーションの名前になります。 (注: インテグレーション名は、角括弧で囲む必要があります）

この `rake` コマンドにより、新しいインテグレーションに必要なすべてのファイルが格納された `my_integration` というディレクトリが作成されます。このコマンドは、インテグレーションの新しいビルドが作成された際に、自動でテストが走るように, `.travis.yml` および `circle.yml` という継続的インテグレーションに必要なファイルを生成します。


<!-- #### Integration files

New integrations should contain the following files: -->

#### インテグレーションに必要なファイル

新しいインテグレーションには、次のファイルが含まれている必要があります。


<!-- ##### `README.md`

Your README file should provide the following sections:

- **Overview** (required): Let others know what they can expect to do with your integration.
- **Installation** (required): Provide information about how to install your integration.
- **Configuration** (required): Detail any steps necessary to configure your integration or the service you are integrating.
- **Validation** (required): How can users ensure the integration is working as intended?
- **Compatibility** (required): List the version(s) of the application or service that your integration has been tested and validated against.
- **Metrics** (required): Include a list of the metrics your integration will provide.
- **Events**: Include a list of events if your integration provides any.
- **Troubleshooting**: Help other users by sharing solutions to common problems they might experience. -->

##### `README.md`

READMEファイルには、次のセクションがあります。

- **Overview** (required): インテグレーションでどのようなことができるかの概要を書きます。
- **Installation** (required): インテグレーションをインストールする方法を書きます。
- **Configuration** (required): ステップ バイ ステップで、インテグレーションを設定するために必要なステップや外部サービスの設定の手順を書きます。
- **Validation** (required): インテグレーションが正しく動作してるのを確認する方法を書きます。
- **Compatibility** (required): インテグレーションがテストされ検証されたアプリケーションまたはサービスのバージョンを書きます。
- **Metrics** (required): インテグレーションで集取できるメトリックのリストを書きます。
- **Events**: インテグレーションでレポーティングしているイベントのリストを書きます。
- **Troubleshooting**: 一般的な問題に対する解決策を他のユーザーと共有します。


<!-- ##### `check.py`

The file where your check logic should reside. The skeleton function will boilerplate an integration class for your integration, including a `check` method where you should place your check logic.

For example:

~~~
# Example check.py
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # Send a custom event.
    self.event({
      'timestamp': int(time.time()),
      'source_type_name': 'my_integration',
      'msg_title': 'Custom event',
      'msg_text': 'My custom integration event occurred.',
      'host': self.hostname,
      'tags': [
          'action:my_integration_custom_event',
      ]
    })
~~~

For more information about writing checks and how to send metrics to the Datadog agent, reference our [Writing an Agent Check guide](http://docs.datadoghq.com/guides/agent_checks/)

If you need to import any third party libraries, you can add them to the `requirements.txt` file.
 -->

##### `check.py`

Check のロジックが記述されているファイルです。インテグレーションクラスのひな形が提供されています。このクラスの `check` 関数にメトリクスを収集するためのロジックを記述します。

例えば:

~~~
# Example check.py
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # Send a custom event.
    self.event({
      'timestamp': int(time.time()),
      'source_type_name': 'my_integration',
      'msg_title': 'Custom event',
      'msg_text': 'My custom integration event occurred.',
      'host': self.hostname,
      'tags': [
          'action:my_integration_custom_event',
      ]
    })
~~~

Check の書き方と Datadog Agent へのメトリックの送信方法の詳細については、 ["Agent Checkの書き方"](http://docs.datadoghq.com/ja/guides/agent_checks/) を参照してください。

サード パーティのライブラリをインポートする必要がある場合は、それらを、 `requirements.txt` ファイルに追記します。


<!-- ##### `ci/my_integration.rake`

If your tests require a testing environment, you can use the `install` and `cleanup` tasks to respectively set up and tear down a testing environment.

For example:

~~~
# Example my_integration.rake
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Use the Python Virtual Environment and install packages.
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # Setup a docker testing container.
      $(docker run -p 80:80 --name my_int_container -d my_docker)
~~~

For more information about writing integration tests, please see [the documentation in the Datadog agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests). You can also reference the [ci common library](https://github.com/DataDog/dd-agent/blob/master/ci/common.rb) for helper functions such as `install_requirements` and `sleep_for`.

A note about terminology: You may notice the variable `flavor` in this file and other areas of testing. *Flavor* is a term we use to denote variations of integrated software, typically versions. This allows you to write one set of tests, but target different *flavors*, variants or versions of the software you are integrating. -->

##### `ci/my_integration.rake`

このインテグレーションのテストに専用のテスト環境が必要な場合は、 `install` と ` cleanup` タスクを使用してテスト環境を構築し、取り壊すことができます。

例えば:

~~~
# Example my_integration.rake
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Use the Python Virtual Environment and install packages.
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # Setup a docker testing container.
      $(docker run -p 80:80 --name my_int_container -d my_docker)
~~~

インテグレーションのテストを書くための詳細については、[the documentation in the Datadog agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests) を参照してください。又、 `install_requirements` や ` sleep_for`のようなヘルパー関数については、[ci common library](https://github.com/DataDog/dd-agent/blob/master/ci/common.rb) を参照することもできます。

用語について: このファイルやテストを見ていると、`flavor` 変数に気付いたかもしれませね。*Flavor* は、インテグレーション ソフトウェアの一般的なバリエーションを表すために使用する用語です。これにより、ソフト ウェアの派生種や異なるバージョンに対して、１セットのテストで、*flavors* を変えてテストが実施できるようになります。


<!-- ##### `conf.yaml.example`

In order to install your integration, users will need to configure the integration for their specific instances. To do this, they'll copy the `conf.yaml.example` file that you provide into their Agent's `conf.d` directory, then update it with their instance specific information.

Your `conf.yaml.example` file should provide two sections:

- `init_config` for any globally configured parameters
- `instances` for specific instances to integrate. This often includes a server or host address with additional parameters such as authentication information, additional tags and configuration settings. -->

##### `conf.yaml.example`

インテグレーションのインストールには、インスタンス内でそのインテグレーションを設定する必要があります。設定内容を Agent の渡すためには、`conf.yaml.example` ファイルを Agnet の `conf.d` ディレクトリにコピーし、その中にインスタンス固有の情報を記述する必要があります。

`conf.yaml.example` ファイルには、次の2つのセクションが必要です:

- `init_config`: グローバルな設定用パラメータを記述するセクション。
- `instances`: 特定のインスタンスに対する設定を記述セクション。一般的にこのセクションには、サーバーまたはホストのIPアドレスと、それに付随した認証情報、追加タグ、設定構成などの追加パラメータを記述します。


<!-- ##### `manifest.json`

This JSON file provides metadata about your integration and should include:

- **`maintainer`**: Provide a valid email address where you can be contacted regarding this integration.
- **`manifest_version`**: The version of this manifest file.
- **`max_agent_version`**: The maximum version of the Datadog agent that is compatible with your integration. We do our best to maintain integration stability within major versions, so you should leave this at the number generated for you. If your integration breaks with a new release of the Datadog agent, please set this number and [submit an issue on the Datadog Agent project](https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues).
- **`min_agent_version`**: The minimum version of the Datadog agent that is compatible with your integration.
- **`name`**: The name of your integration.
- **`short_description`**: Provide a short description of your integration.
- **`support`**: As a community contributed integration, this should be set to "contrib". Only set this to another value if directed to do so by Datadog staff.
- **`version`**: The current version of your integration.

You can reference one of the existing integrations for an example of the manifest file. -->

##### `manifest.json`

この JSON ファイルには、インテグレーションに関するメタデータを記述し、次のものを含める必要があります。

- **`maintainer`**: このインテグレーションに関して連絡先を受けることができるメールアドレスを書きます。
- **`manifest_version`**: このマニフェスト ファイルのバージョンを書きます。
- **`max_agent_version`**: このインテグレーションと互換性のある Datadog Agent の最新バージョンを書きます。インテグレーションの安定動作の確保作業は、メジャーバージョンの更新時に最善を尽くします。もしも、インテグレーションが Datadog Agent の新しいリリースで動作しなくなった場合は、動作しなくなったバージョン番号を書いて、[submit an issue on the Datadog Agent project](https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues) へ連絡してください。
- **`min_agent_version`**: このインテグレーションと互換性のあるDatadog Agentの最も古いバージョン。
- **`name`**: このインテグレーションの名前を書きます。
- **`short_description`**: このインテグレーションの簡単な説明を書きます。
- **`support`**: コミュニティで提供するインテグレーションの場合は、 "contrib" と記述します。Datadog のスタッフよって指示があった場合にのみ、この部分を別の値で設定してください。
- **`version`**: 現在のインテグレーションのバージョンを書きます。


<!-- ##### `metadata.csv`

The metadata CSV contains a list of the metrics your integration will provide and basic details that will help inform the Datadog web application as to which graphs and alerts can be provided for the metric.

The CSV should include a header row and the following columns:

**`metric_name`** (required): The name of the metric as it should appear in the Datadog web application when creating dashboards or monitors. Often this name is a period delimited combination of the provider, service, and metric (e.g. `aws.ec2.disk_write_ops`) or the application, application feature, and metric (e.g. `apache.net.request_per_s`).

**`metric_type`** (required): The type of metric you are reporting. This will influence how the Datadog web application handles and displays your data. Accepted values are: `count`, `gauge`, or `rate`.

  - `count`: A count is the number of particular events that have occurred. When reporting a count, you should only submit the number of new events (delta) recorded since the previous submission. For example, the `aws.apigateway.5xxerror` metric is a `count` of the number of server-side errors.
  - `gauge`: A gauge is a metric that tracks a value at a specific point in time. For example, `docker.io.read_bytes` is a `guage` of the number of bytes read per second.
  - `rate`: A rate a metric over time (and as such, will typically include a `per_unit_name` value). For example, `lighttpd.response.status_2xx` is a `rate` metric capturing the number of 2xx status codes produced per second.

**`interval`**: The interval used for conversion between rates and counts. This is required when the `metric_type` is set to the `rate` type.

**`unit_name`**: The label for the unit of measure you are gathering. The following units (grouped by type) are available:

  - **Bytes**: `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, `exbibyte`
  - **Cache**: `eviction`, `get`,  `hit`,  `miss`,  `set`
  - **Database**: `assertion`, `column`, `command`, `commit`, `cursor`, `document`, `fetch`, `flush`, `index`, `key`, `lock`, `merge`, `object`, `offset`, `query`, `question`, `record`, `refresh`, `row`, `scan`, `shard`, `table`, `ticket`, `transaction`, `wait`
  - **Disk**: `block`, `file`, `inode`, `sector`
  - **Frequency**: `hertz`, `kilohertz`, `megahertz`, `gigahertz`
  - **General**: `buffer`, `check`, `email`, `error`, `event`, `garbage`,  `collection`, `item`, `location`, `monitor`, `occurrence`, `operation`, `read`, `resource`, `sample`, `stage`, `task`, `time`, `unit`, `worker`, `write`
  - **Memory**: `page`, `split`
  - **Money**: `cent`, `dollar`
  - **Network**: `connection`, `datagram`, `message`, `packet`, `payload`, `request`, `response`, `segment`, `timeout`
  - **Percentage**: `apdex`, `fraction`, `percent`, `percent_nano`
  - **System**: `core`, `fault`, `host`, `instance`, `node`, `process`, `service`, `thread`
  - **Time**: `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`

If the unit name is not listed above, please leave this value blank. To add a unit to this listing, please file an [issue](https://github.com/DataDog/integrations-extras/issues)

**`per_unit_name`**: If you are gathering a per unit metric, you may provide an additional unit name here and it will be combined with the `unit_name`. For example, providing a `unit_name` of "request" and a `per_unit_name` of "second" will result in a metric of "requests per second". If provided, this must be a value from the available units listed above.

**`description`**: A basic description (limited to 400 characters) of the information this metric represents.

**`orientation`** (required): An integer of `-1`, `0`, or `1`.

  - `-1` indicates that smaller values are better. For example, `mysql.performance.slow_queries` or `varnish.fetch_failed` where low counts are desirable.
  - `0` indicates no intrinsic preference in values. For example, `rabbitmq.queue.messages` or `postgresql.rows_inserted` where there is no preference for the size of the value or the preference will depend on the business objectives of the system.
  - `1` indicates that larger values are better. For example, `mesos.stats.uptime_secs` where higher uptime or `mysql.performance.key_cache_utilization` where more cache hits are desired.

**`integration`** (required): This must match the name of your integration. (e.g. "my_integration").

**`short_name`**: A more human-readable and abbreviated version of the metric name. For example, `postgresql.index_blocks_read` might be set to `idx blks read`. Aim for human-readability and easy understandability over brevity. Don't repeat the integration name. If you can't make the `short_name` shorter and easier to understand than the `metric_name`, leave this field empty.
 -->

##### `metadata.csv`

メタデータ CSV には、インテグレーションが提供するメトリックのリストと、そのメトリックに対しDatadog Webアプリケーションがどのグラフやアラートを準備するべきかを伝えるための情報を記述します。

CSV には、以下の情報を記述したコラム ヘッダ行が必要です。

**`metric_name`** (required): ダッシュボードまたはモニタの作成時にDatadog Web アプリケーションに表示されるメトリックの名前です。多くの場合、この名前はプロバイダ、サービス、メトリック（例えば、 `aws.ec2.disk_write_ops` ）やアプリケーション、アプリケーションの機能、メトリック(例えば、 `apache.net.request_per_s` )をピリオドで繋いだものになります。

**`metric_type`** (required): レポーティングしているメトリックのタイプ。この情報は、Datadog Web アプリケーションがデータをどのように処理して表示するかに影響します。設定できる値は `count`、` gauge`、 `rate`です。

  - `count`: カウントは、特定のイベントの発生数です。カウントの値をレポーティングするときは、前回の送信以降に記録された新しいイベントの数(差分値)だけを送信する必要があります。例えば、 `aws.apigateway.5xxerror`メトリックは、サーバ側で発生しているエラー数の `count` 値です。
  - `gauge`: 特定の時点での値を記録するメトリックです。たとえば、 `docker.io.read_bytes` は、1秒当たりに読み取られるバイト数の `guage` 値です。
  - `rate`: 発生回数を経過時間で割ったメトリックです。 (従って、通常は `per_unit_name` 値の指定が含まれます）。たとえば、 `lighttpd.response.status_2xx` は、一秒当たりに生成される 2xx ステータスコードの数をキャプチャする `rate` 値です。

**`interval`**: インターバルは、`rate` と `count` の変換に使用されます。metric_type` に `rate` 型が設定されている場合に必要です。

**`unit_name`**: 収集しているメトリックの測定単位です。各タイプでは、以下の様なユニットが利用可能です:

  - **Bytes**: `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, `exbibyte`
  - **Cache**: `eviction`, `get`,  `hit`,  `miss`,  `set`
  - **Database**: `assertion`, `column`, `command`, `commit`, `cursor`, `document`, `fetch`, `flush`, `index`, `key`, `lock`, `merge`, `object`, `offset`, `query`, `question`, `record`, `refresh`, `row`, `scan`, `shard`, `table`, `ticket`, `transaction`, `wait`
  - **Disk**: `block`, `file`, `inode`, `sector`
  - **Frequency**: `hertz`, `kilohertz`, `megahertz`, `gigahertz`
  - **General**: `buffer`, `check`, `email`, `error`, `event`, `garbage`,  `collection`, `item`, `location`, `monitor`, `occurrence`, `operation`, `read`, `resource`, `sample`, `stage`, `task`, `time`, `unit`, `worker`, `write`
  - **Memory**: `page`, `split`
  - **Money**: `cent`, `dollar`
  - **Network**: `connection`, `datagram`, `message`, `packet`, `payload`, `request`, `response`, `segment`, `timeout`
  - **Percentage**: `apdex`, `fraction`, `percent`, `percent_nano`
  - **System**: `core`, `fault`, `host`, `instance`, `node`, `process`, `service`, `thread`
  - **Time**: `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`

ユニット名が上記のリストにない場合は、この値を空白のままにしてください。このリストにユニットを追加する必要がある場合は、[issue](https://github.com/DataDog/integrations-extras/issues) 欄からコンタクトしてください。

**`per_unit_name`**: ユニット単位のメトリックを集めている場合は、ここに追加のユニット名を与えることができ、それは` unit_name`と組み合わされます。


例えば、 "request" という `unit_name` と "second" という `per_unit_name` を指定すると、"requests per second" というメトリックが得られます。この値を指定する場合は、上記にリストした利用可能なユニットでなければなりません。

**`description`**: このメトリックの基本的な説明になります。（最大400文字）。

**`orientation`** (required): `-1`、 `0`、または `1` の整数。

  - `-1`は、小さい値が良いことを示します。例えば、 `mysql.performance.slow_queries` や `varnish.fetch_failed`のように、カウント数が少ない方が望ましいことを示しています。
  - `0` は、値に特定のプレがレンスがないことを示します。例えば、 `rabbitmq.queue.messages` や ` postgresql.rows_inserted` のように、値の大きさにプレファレンスがない場合は、システムが達成しなくてはならないアウトプットに依存していることを示しています。
   - `1` は、大きな値が良いことを示します。例えば、 `mesos.stats.uptime_secs` は、より高い稼働時間が好ましく、 `mysql.performance.key_cache_utilization` は、より高いキャッシュヒットが好ましいことを示しています。

**`integration`** (required): インテグレーションの名前です。metadataの **name** と一致していなければなりません。 (例: "my_integration")

**`short_name`**: 人間に読みやすくする目的で、簡略化したバージョンのメトリック名です。例えば、 `postgresql.index_blocks_read` は、 `idx blks read` を指定します。
短さよりも、可読性と分かりやすさを優先してください。又、インテグレーション名を繰り返し指定しないでください。 `short_name` を `metric_name` よりも短く、分かりやすくす表現することができない場合は、このフィールドを空白のままにしてください。


<!-- ##### `requirements.txt`

If you require any additional Python libraries, you can list them here and they will be automatically installed via pip when others use your integration. -->

##### `requirements.txt`

追加のPythonライブラリが必要な場合は、このリストに追記します。他のユーザが、このインテグレーションをインストールした際に、pipによって自動的でにインストールされるようになります。


<!-- ##### `test_my_integration.py`

Integration tests ensure that the Datadog agent is correctly receiving and recording metrics from the software you are integrating.

Though we don't require test for each of the metrics collected by your integration, we strongly encourage you to provide as much coverage as possible. You can run the `self.coverage_report()` method in your test to see which metrics are covered.

Here's an example `test_my_integration.py`:

~~~
# Example test_my_integraion.py
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect',
                            count=1,
                            status=AgentCheck.OK,
                            tags=[host:localhost', 'port:80'])
    self.coverage_report()
~~~

For more information about tests and available test methods, please reference the [AgentCheckTest class in the Datadog Agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py) -->

##### `test_my_integration.py`

インテグレーションのテストは、インテグレーションが監視対象ソフトウェアから正しくメトリックを記録し、Datadog Agent がその情報を正しく受け取れているかを確認します。

インテグレーションによって収集された全メトリクスのテストは、強制していませんが、可能な限り高いカバレッジを強くお願いしています。テスト内で `self.coverage_report()` 関数を実行することで、どのメトリックがテストの対象に含まれているかを知ることができます。

`test_my_integration.py` の例です:

~~~
# Example test_my_integraion.py
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect',
                            count=1,
                            status=AgentCheck.OK,
                            tags=[host:localhost', 'port:80'])
    self.coverage_report()
~~~

テストと利用可能なテスト関数の詳細については、 [AgentCheckTest class in the Datadog Agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py) を参照してください。


<!-- #### Libraries

The [Datadog Agent](https://github.com/DataDog/dd-agent) provides a number of useful libraries in the [`utils` directory](https://github.com/DataDog/dd-agent/tree/master/utils). These libraries can be helpful when building your integration and we encourage you to use them, but please be aware that these libraries will be moved in the upcoming Datadog Agent version 6.0. We will provide more details regarding integrations and these libraries prior to the Datadog Agent 6.0 release. -->

#### ライブラリについて

[Datadog Agent](https://github.com/DataDog/dd-agent)の、 [`utils` ディレクトリ](https://github.com/DataDog/dd-agent/tree/master/utils) には、複数の便利なライブラリがあります。これらのライブラリは、インテグレーションの開発に役立ちますので採用をお勧めします。しかしながら、これらのライブラリは、 Datadog Agent v6.0 で、別のレポジトリに移動される可能性があることを認識しておいてください。 Datadog Agent v6.0 のリリースまでには、インテグレーション開発の方向性とこれらのライブラリの管理に関する詳細を提供したいと考えています。


<!-- #### Testing your integration

As you build your check and test code, you can use the following to run your tests:

- `rake lint`: Lint your code for potential errors
- `rake ci:run[my_integration]`: Run the tests that you have created in your `test_my_integration.py` file.
- `rake ci:run[default]`: Run the tests you have written in addition to some additional generic tests we have written.

Travis CI will automatically run tests when you create a pull request. Please ensure that you have thorough test coverage and that you are passing all tests prior to submitting pull requests. -->

#### インテグレーションのテスト

Check とそのテスト コードを開発したら、次のステップでテストを実行します。

- `rake lint`: lintを使って潜在的なエラーを探索します。
- `rake ci:run[my_integration]`: `test_my_integration.py`ファイルに記述したテスト項目を実行します。
- `rake ci:run[default]`: Datadog が準備している一般的なテスト項目を追加して、テストを実行します。

Pull Request をすると、Travis CI を使ってテストが自動実行されます。 Pull Request を提出する際は、やり残しのないテストカバレッジと、全てのテストに合格していることを今一度確認してください。


<!-- #### Docker test environments

At Datadog we're using Docker containers for testing environments and we highly encourage you to do the same. Containers are lightweight, easy to manage, and provide consistent, standardized environments for each test run.

For example in our MySQL integration, the [`ci/mysql.rake` file](https://github.com/DataDog/integrations-core/blob/master/mysql/ci/mysql.rake) uses the [official MySQL container](https://hub.docker.com/_/mysql/) and involves four main tasks

1. `before_install` - Prior to starting our new Docker test environment, we need to ensure that any previous Docker test environments are stopped and removed.
2. `install` - The install task performs the Docker `run` which will start the MySQL test server.
3. `before_script` - This task first ensures that the MySQL server is running, then connects to the server to perform some setup tasks. We highly recommend that you keep setup tasks in your `test_integration.py` file when possible, but we recognize that sometimes setup and configurations will need to be performed prior to the python test script.
4. `cleanup` - After the tests are complete, the Docker test environment is stopped and removed. -->

#### Dockerのテスト環境

Datadog では、テスト環境用に Docker コンテナを使用しています。インテグレーションの開発の際には、類似の環境で開発されることをお勧めします。コンテナは、軽量で管理が容易な上、各テストの実行に一貫した標準環境を提供してくれます。

例えば MySQL のインテグレーションの場合、[`ci/mysql.rake` file](https://github.com/DataDog/integrations-core/blob/master/mysql/ci/mysql.rake) は、[official MySQL container](https://hub.docker.com/_/mysql/) を使用し、次の四つのステップで docker 環境を準備することができます。

1. `before_install` - Docker での新しいテスト環境を開始する前に、以前の使った Docker のテスト環境が停止して削除されていることを確認する必要があります。
2. `install` - `install` タスクは、 Docker の `run` を実行し、 MySQL テストサーバを起動します。
3. `before_script` - この作業ではまず、 MySQL サーバが稼働していることを確認し、サーバに接続して事前設定の作業を行います。可能であれば、この事前設定のタスクを `test_integration.py` ファイルに記述することを強くお勧めします。尚、状況によって事前設定を Python テスト スクリプトの前に実行する必要がある場合は、臨機応変に対応してください。
4. `cleanup` - テストが完了すると、 Docker のテスト環境が停止され、削除されます。


<!-- #### Installing your integration locally

When your integration is merged into the `integrations-extras` repository, we will generate packages so that others can easily install your integration (see the [Installing Core & Extra Integrations guide](http://docs.datadoghq.com/guides/installcoreextra)). However, you may want to install your integration locally before it's merged.

To run locally, first copy your `check.py` file into the Datadog Agent's `checks.d` directory and rename it to `my_integration.py` (using the actual name of your integration).

Next, copy your `conf.yaml.example` file into the Datadog Agent's `conf.d` directory and rename it to `my_integration.yaml` (again, using the actual name of your integration).

See the Agent Check guide for more information about the [Datadog Agent directory structure](http://docs.datadoghq.com/guides/agent_checks/#directory)). -->

#### ローカルホストにインテグレーションをインストールする

インテグレーションが `integations-extras` リポジトリにマージされると、他の人が簡単にインテグレーションをインストールできるようにパッケージを生成します。([Installing Core & Extra Integrations guide](http://docs.datadoghq.com/guides/installcoreextra) を参照してください。) 尚、マージの前にそのインテグレーションをローカルホストにインストールしたい場合があるかもしれません。

ローカルで実行するには、まず、 `check.py` ファイルを Datadog Agent の` checks.d` ディレクトリにコピーし、その名前を `my_integration.py`(インテグレーションの実際の名前) に変更します。

次に、`conf.yaml.example` ファイルを Datadog Agent の `conf.d` ディレクトリにコピーし、それを `my_integration.yaml`(再び、インテグレーションの実際の名前) に名前を変更します。

[Datadog Agent のディレクトリ構造](http://docs.datadoghq.com//ja/guides/agent_checks/#directory) については、Agent Chechの書き方のガイドを参照してください。


<!-- #### Teardown and cleanup

When you have finished building your integration, you can run `rake clean_env` to remove the Python virtual environment. -->

#### 開発環境の解体とクリーンアップ

インテグレーションの開発が終わったら、 `rake clean_env` を実行し Python の仮想環境を削除することができます。


<!-- ### Submitting Your integration

Once you have completed the development of your integration, submit a [pull request](https://github.com/DataDog/integrations-extras/compare) to have Datadog review your integration. After we've reviewed your integration, we will approve and merge your pull request or provide feedback and next steps required for approval. -->

### インテグレーションの提出

インテグレーションの開発が終わったら、[pull request](https://github.com/DataDog/integrations-extras/compare) を提出し、Datadog のメンバーがレビューできるようにします。メンバーによるレビューが終わると、pull request の承認のために必要な次のステップをフィードバックしたり、承認とマージをします。


<!-- ### Other Considerations

In our experience building integrations, we've also faced a number of challenges. As your write your tests, here are a few things to consider:

* Test clusters. Testing single instances of your software is often easier, but tests are more useful when run against setups that are representative of real-world uses. For example, MongoDB is typically used with sharding and replica set features, so [our tests reflect that](https://github.com/DataDog/integrations-core/tree/master/mongo/ci).
* Consider generating calculated metrics in addition to raw metrics. For example, many databases will have slow, but less frequently run queries. So it's often useful to look at percentiles. For example, our MySQL integration includes a calculated metric for the [95th percentile query execution time](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py#L1169). -->

### その他

過去のインテグレーション開発で、多くことを学んできました。 Check 関数やテストを書く際には、以下の点も検討してみてください。

* クラスタ環境でのテストの検討:

    単一インスタンスでソフトウェアをテストするのは、それほど難しくなりません。しかし、実際の使用環境に近い環境で最終テストを実行する方が、テストしての価値が高いです。例えば、 MongoDB の通常の利用シーンでは、シャーディングとレプリカセットの機能を使っています。[Datadogのテスト](https://github.com/DataDog/integrations-core/tree/master/mongo/ci) では、そのことを考慮しクラスター環境でのテストコードを、開発しています。

* Raw メトリックに加えて、計算/加工されたメトリックを生成するこの検討:

    例えば、多くのデータベースでは、低速だが頻繁に実行されないクエリが実行されているはずです。これらのクエリのパーセンタイルを把握することは、一般的に価値のあることです。Datadogが提供している MySQL のインテグレーションでは、クエリ実行時間の Raw データから [95th パーセンタイル値](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py#L1169)を計算し、メトリックとして送信するようにしています。
