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

- **Overview** (required): 他の人に、あなたの統合に期待できることを伝えましょう。
- **Installation** (required): 統合のインストール方法に関する情報を提供します。
- **Configuration** (required): 統合するサービスまたは統合するサービスを構成するために必要なステップの詳細。
- **Validation** (required): ユーザーはどのようにして統合が意図どおりに機能することを確認できますか？
- **Compatibility** (required): 統合がテストされ検証されたアプリケーションまたはサービスのバージョンを列挙します。
- **Metrics** (required): 統合で提供されるメトリックのリストを含めます。
- **Events**: あなたの統合が何かを提供する場合、イベントのリストを含めます。
- **Troubleshooting**: 経験のある一般的な問題に対する解決策を他のユーザーに教えてもらう。


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

チェックロジックが存在するはずのファイル。スケルトン関数は、チェックロジックを配置する必要がある `check` メソッドを含む、統合のための統合クラスを定型化します。

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

チェックの作成とDatadogエージェントへのメトリックの送信方法の詳細については、[エージェントチェックガイドの作成]（http://docs.datadoghq.com/guides/agent_checks/）を参照してください。

サードパーティライブラリをインポートする必要がある場合は、それらを `requirements.txt`ファイルに追加することができます。


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

テスト環境にテスト環境が必要な場合は、 `install`と` cleanup`タスクを使用してテスト環境を設定し、解凍することができます。

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

統合テストの作成の詳細については、[Datadogエージェントリポジトリのドキュメント]（https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests）を参照してください。 `install_requirements`や` sleep_for`のようなヘルパー関数については、[ci common library]（https://github.com/DataDog/dd-agent/blob/master/ci/common.rb）を参照することもできます。

用語についての注意：このファイルやテストの他の領域では、変数 `flavor`に気付くかもしれません。 *Flavor* は、一般的なバージョンの統合ソフトウェアのバリエーションを表すために使用する用語です。これにより、一連のテストを書くことができますが、統合しようとしているソフトウェアの種類、バージョン、バージョンなどをターゲットにすることができます。


<!-- ##### `conf.yaml.example`

In order to install your integration, users will need to configure the integration for their specific instances. To do this, they'll copy the `conf.yaml.example` file that you provide into their Agent's `conf.d` directory, then update it with their instance specific information.

Your `conf.yaml.example` file should provide two sections:

- `init_config` for any globally configured parameters
- `instances` for specific instances to integrate. This often includes a server or host address with additional parameters such as authentication information, additional tags and configuration settings. -->

##### `conf.yaml.example`

統合をインストールするには、特定のインスタンスの統合を設定する必要があります。 これを行うために、彼らは `conf.yaml.example`ファイルをあなたのエージェントの` conf.d`ディレクトリにコピーし、インスタンス固有の情報で更新します。

あなたの `conf.yaml.example`ファイルは2つのセクションを提供する必要があります:

- すべてのグローバルに設定されたパラメータに対する `init_config`
- 特定のインスタンスを統合するための `インスタンス '。 これには、認証情報、追加タグ、構成設定などの追加パラメータを含むサーバーまたはホストアドレスが含まれることがよくあります。


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

このJSONファイルは、統合に関するメタデータを提供し、次のものを含める必要があります。

- **`maintainer`**: この統合に関する連絡先となる有効なメールアドレスを入力してください。
- **`manifest_version`**: このマニフェストファイルのバージョン。
- **`max_agent_version`**: あなたの統合と互換性のあるDatadogエージェントの最大バージョン。メジャーバージョンでの統合の安定性を維持するために最善を尽くしています。統合がDatadogエージェントの新しいリリースで壊れている場合は、この番号を設定して[Datadogエージェントプロジェクトで問題を提出]してください（https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md ＃submitting-issues）。
- **`min_agent_version`**: あなたの統合と互換性のあるDatadogエージェントの最小バージョン。
- **`name`**: あなたの統合の名前。
- **`short_description`**: あなたの統合の簡単な説明を提供します。
- **`support`**: コミュニティが提供する統合として、これは" contrib "に設定する必要があります。 Datadogスタッフによって指示された場合にのみ、これを別の値に設定してください。
- **`version`**: あなたの統合の現在のバージョン。


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

メタデータCSVには、統合が提供するメトリックのリストと、そのメトリックに対してどのグラフおよびアラートを提供できるかについてDatadog Webアプリケーションに通知するための基本的な詳細が含まれています。

CSVにはヘッダー行と次の列が含まれている必要があります。

**`metric_name`** (required): ダッシュボードまたはモニタの作成時にDatadog Webアプリケーションに表示されるメトリックの名前。多くの場合、この名前はプロバイダ、サービス、メトリック（例えば、 `aws.ec2.disk_write_ops`）やアプリケーション、アプリケーション機能、メトリック（例えば、` apache.net.request_per_s`）のピリオド区切りの組み合わせです。

**`metric_type`** (required): 報告しているメトリックのタイプ。これは、Datadog Webアプリケーションがデータをどのように処理して表示するかに影響します。受け入れられる値は `count`、` gauge`、 `rate`です。

  - `count`: カウントは、発生した特定のイベントの数です。カウントを報告するときは、以前の提出以降に記録された新しいイベント（デルタ）の数だけを提出する必要があります。たとえば、 `aws.apigateway.5xxerror`メトリックは、サーバ側エラーの数の` count`です。
  - `gauge`: 特定の時点で値を追跡するメトリックです。たとえば、 `docker.io.read_bytes`は、1秒当たりに読み取られるバイト数の` guage`です。
  - `rate`: 時間の経過とともにメトリックを評価します（したがって、通常は` per_unit_name`値が含まれます）。たとえば、 `lighttpd.response.status_2xx`は1秒当たりに生成される2xxステータスコードの数をキャプチャする` rate`メトリックです。

**`interval`**: レートとカウントの間の変換に使用されるインターバル。これは、 `metric_type`が` rate`型に設定されている場合に必要です。

**`unit_name`**: 収集している測定単位のラベル。タイプごとにグループ化された以下のユニットが利用可能です:

  - **バイト**: `bit`、` byte`、 `kibibyte`、` mebibyte`、 `gibibyte`、` tebibyte`、 `pebibyte`、` exbibyte`
  - **Cache**: `eviction`、` get`、 `hit`、` miss`、 `set`
  - **データベース**: `アサーション`、 `カラム`、 `コマンド`、 `コミット`、 `カーソル`、 `ドキュメント`、 `フェッチ`、 `フラッシュ`、 `インデックス`、 `キー` `照合`、 `質問`、 `レコード`、 `リフレッシュ`、 `行`、 `スキャン`、 `シャード`、 `テーブル`、 `チケット`トランザクション '、'待機 '
  - **ディスク**: `ブロック`、 `ファイル`、 `iノード`、 `セクター`
  - **周波数**: 「ヘルツ」、「キロヘルツ」、「メガヘルツ」、「ギガヘルツ」
  - **一般**： `バッファ`、 `チェック`、 `電子メール`、 `エラー`、 `イベント`、 `ゴミ`、 `コレクション`、 `item`、` location`、 `monitor`、リソース、サンプル、ステージ、タスク、時刻、ユニット、ワーカー、ライトのうちの少なくとも1つを含むことを特徴とする請求項1に記載の方法。
  - **メモリ**: `ページ`、 `スプリット`
  - **マネー**: `セント`、 `ドル`
  - **ネットワーク**: `接続`、 `データグラム`、 `メッセージ`、 `パケット`、 `ペイロード`、 `要求`、 `レスポンス`、 `セグメント`、 `タイムアウト`
  - **パーセンテージ**: `apdex`、` fraction`、 `percent`、` percent_nano`
  - **システム**: `コア`、 `フォールト`、 `ホスト`、 `インスタンス`、 `ノード`、 `プロセス`、 `サービス`
  - **時間**: 「マイクロ秒」、「ミリ秒」、「秒」、「分」、「時」、「日」、「週」

ユニット名が上記のリストにない場合は、この値を空白のままにしてください。このリスティングにユニットを追加するには、[issue]（https://github.com/DataDog/integrations-extras/issues）

**`per_unit_name`**: ユニット単位のメトリックを集めている場合は、ここに追加のユニット名を与えることができ、それは` unit_name`と組み合わされます。たとえば、 "request"の `unit_name`と` second 'の `per_unit_name`を指定すると、" 1秒あたりの要求数 "というメトリックが得られます。提供されている場合、これは上記の利用可能なユニットの値でなければなりません。

**`description`**: このメトリックが表す情報の基本的な説明（最大400文字）。

**`orientation`** (required): ` -1`、 `0`、または` 1`の整数。

  - `-1`は小さい値が良いことを示します。例えば、 `mysql.performance.slow_queries`や` varnish.fetch_failed`のように、カウント数が少ない方が望ましいです。
  - `0`は、値に固有のプリファレンスがないことを示します。例えば、 `rabbitmq.queue.messages`や` postgresql.rows_inserted`のように、値の大きさや好みの設定がない場合は、システムのビジネス目標に依存します。
   - `1`は大きな値が良いことを示します。たとえば、より高い稼働時間の場合は `mesos.stats.uptime_secs`、より多くのキャッシュヒットが必要な場合は` mysql.performance.key_cache_utilization`などです。

** `integration`** (required): これはあなたの統合の名前と一致しなければなりません。 （例：「my_integration」）。

** `short_name` **: メトリック名のより人間が読めて簡略化したバージョン。例えば、 `postgresql.index_blocks_read`は` idx blks read`に設定されます。人間の可読性と簡潔さよりもわかりやすいものを目指してください。統合名を繰り返さないでください。 `short_name`を` metric_name`よりも短く、分かりやすくすることができない場合は、このフィールドを空白のままにしておきます。


<!-- ##### `requirements.txt`

If you require any additional Python libraries, you can list them here and they will be automatically installed via pip when others use your integration. -->

##### `requirements.txt`

追加のPythonライブラリが必要な場合は、ここにリストすることができ、他のPythonライブラリが統合を使用するときにpipによって自動的にインストールされます


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

統合テストでは、統合しているソフトウェアからDatadogエージェントがメトリックを正しく受信して記録していることを確認します。

統合によって収集された各指標のテストは必要ありませんが、可能な限り多くのカバレッジを提供することを強くお勧めします。テストで `self.coverage_report()`メソッドを実行すると、どのメトリックが対象となっているかを知ることができます。

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

テストと利用可能なテスト方法の詳細については、Datadog Agentリポジトリの[AgentCheckTestクラス](https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py)を参照してください。


<!-- #### Libraries

The [Datadog Agent](https://github.com/DataDog/dd-agent) provides a number of useful libraries in the [`utils` directory](https://github.com/DataDog/dd-agent/tree/master/utils). These libraries can be helpful when building your integration and we encourage you to use them, but please be aware that these libraries will be moved in the upcoming Datadog Agent version 6.0. We will provide more details regarding integrations and these libraries prior to the Datadog Agent 6.0 release. -->

#### ライブラリについて

[Datadog Agent](https://github.com/DataDog/dd-agent)は、[utils`ディレクトリ](https://github.com/DataDog/dd-agent/tree/master/utils)に数多くの便利なライブラリを提供しています。 これらのライブラリは、統合を構築する際に役立つ可能性があります。これらのライブラリは、今後のDatadog Agentバージョン6.0で移動されることにご注意ください。 Datadog Agent 6.0リリースより前の統合とこれらのライブラリに関する詳細を提供します。


<!-- #### Testing your integration

As you build your check and test code, you can use the following to run your tests:

- `rake lint`: Lint your code for potential errors
- `rake ci:run[my_integration]`: Run the tests that you have created in your `test_my_integration.py` file.
- `rake ci:run[default]`: Run the tests you have written in addition to some additional generic tests we have written.

Travis CI will automatically run tests when you create a pull request. Please ensure that you have thorough test coverage and that you are passing all tests prior to submitting pull requests. -->

#### インテグレーションのテスト

チェックとテストコードをビルドするときは、次のようにテストを実行します。

- `rake lint`: 潜在的なエラーをコード化する
- `rake ci:run[my_integration]`: `test_my_integration.py`ファイルで作成したテストを実行します。
- `rake ci:run[default]`: 私たちが作成した追加の一般的なテストに加えて、あなたが作成したテストを実行します。

トラビスCIは、プルリクエストを作成すると自動的にテストを実行します。 徹底的なテストカバレッジがあること、プルリクエストを提出する前にすべてのテストに合格していることを確認してください。


<!-- #### Docker test environments

At Datadog we're using Docker containers for testing environments and we highly encourage you to do the same. Containers are lightweight, easy to manage, and provide consistent, standardized environments for each test run.

For example in our MySQL integration, the [`ci/mysql.rake` file](https://github.com/DataDog/integrations-core/blob/master/mysql/ci/mysql.rake) uses the [official MySQL container](https://hub.docker.com/_/mysql/) and involves four main tasks

1. `before_install` - Prior to starting our new Docker test environment, we need to ensure that any previous Docker test environments are stopped and removed.
2. `install` - The install task performs the Docker `run` which will start the MySQL test server.
3. `before_script` - This task first ensures that the MySQL server is running, then connects to the server to perform some setup tasks. We highly recommend that you keep setup tasks in your `test_integration.py` file when possible, but we recognize that sometimes setup and configurations will need to be performed prior to the python test script.
4. `cleanup` - After the tests are complete, the Docker test environment is stopped and removed. -->

#### Dockerのテスト環境

Datadogでは、テスト環境用のDockerコンテナを使用しています。同じことをお勧めします。コンテナは軽量で管理が容易で、各テストの実行に一貫した標準化された環境を提供します。

たとえば、MySQLの統合では、[`ci / mysql.rake`ファイル](https://github.com/DataDog/integrations-core/blob/master/mysql/ci/mysql.rake) は[公式MySQLコンテナ](https://hub.docker.com/_/mysql/)にあり、4つの主なタスク

1. `before_install` - 新しいDockerテスト環境を開始する前に、以前のDockerテスト環境を停止して削除する必要があります。
2. `install` - インストールタスクは、MySQLテストサーバを起動するDocker` run`を実行します。
3. `before_script` - この作業ではまず、MySQLサーバが稼働していることを確認してから、サーバに接続していくつかの設定作業を行います。可能であれば、設定タスクを `test_integration.py`ファイルに保存することを強くお勧めしますが、時にはセットアップと設定をPythonテストスクリプトの前に実行する必要があることを認識しています。
4. `cleanup` - テストが完了すると、Dockerテスト環境が停止され、削除されます。


<!-- #### Installing your integration locally

When your integration is merged into the `integrations-extras` repository, we will generate packages so that others can easily install your integration (see the [Installing Core & Extra Integrations guide](http://docs.datadoghq.com/guides/installcoreextra)). However, you may want to install your integration locally before it's merged.

To run locally, first copy your `check.py` file into the Datadog Agent's `checks.d` directory and rename it to `my_integration.py` (using the actual name of your integration).

Next, copy your `conf.yaml.example` file into the Datadog Agent's `conf.d` directory and rename it to `my_integration.yaml` (again, using the actual name of your integration).

See the Agent Check guide for more information about the [Datadog Agent directory structure](http://docs.datadoghq.com/guides/agent_checks/#directory)). -->

#### ローカルホストにインテグレーションをインストールする

統合が `integations-extras`リポジトリにマージされると、他の人が簡単に統合をインストールできるようにパッケージを生成します。[Core＆Extra Integrationsのインストールガイド](http://docs.datadoghq.com/guides/installcoreextra)を参照。 ただし、統合前に統合をローカルにインストールしたい場合があります。

ローカルで実行するには、まず、 `check.py` ファイルを Datadog Agent の` checks.d`ディレクトリにコピーし、その名前を my_integration.py に変更します（実際の名前を使用します）。

次に、あなたの `conf.yaml.example` ファイルを Datadog Agent の ` conf.d` ディレクトリにコピーし、それを `my_integration.yaml` に名前を変更します（再び、あなたの統合の実際の名前を使用します）。

[Datadog Agentのディレクトリ構造](http://docs.datadoghq.com/guides/agent_checks/#directory) の詳細については、エージェントチェックのガイドを参照してください。


<!-- #### Teardown and cleanup

When you have finished building your integration, you can run `rake clean_env` to remove the Python virtual environment. -->

#### 停止とクリーンアップ

統合を完了したら、 `rake clean_env` を実行して Python 仮想環境を削除することができます。


<!-- ### Submitting Your integration

Once you have completed the development of your integration, submit a [pull request](https://github.com/DataDog/integrations-extras/compare) to have Datadog review your integration. After we've reviewed your integration, we will approve and merge your pull request or provide feedback and next steps required for approval. -->

### インテグレーションの提出

統合の開発が完了したら、[プルリクエスト](https://github.com/DataDog/integrations-extras/compare) を送信して、Datadog が統合をレビューするようにします。 統合の見直しが完了したら、プルリクエストを承認してマージしたり、承認に必要なフィードバックと次のステップを提供します。


<!-- ### Other Considerations

In our experience building integrations, we've also faced a number of challenges. As your write your tests, here are a few things to consider:

* Test clusters. Testing single instances of your software is often easier, but tests are more useful when run against setups that are representative of real-world uses. For example, MongoDB is typically used with sharding and replica set features, so [our tests reflect that](https://github.com/DataDog/integrations-core/tree/master/mongo/ci).
* Consider generating calculated metrics in addition to raw metrics. For example, many databases will have slow, but less frequently run queries. So it's often useful to look at percentiles. For example, our MySQL integration includes a calculated metric for the [95th percentile query execution time](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py#L1169). -->

### その他の考慮事項

私たちの経験を積み重ねることで、私たちはいくつかの課題に直面してきました。 あなたのテストを書く際には、以下の点を考慮する必要があります。

* クラスタをテストします。 ソフトウェアの単一のインスタンスをテストするほうが簡単ですが、実際の使用を代表するセットアップに対して実行すると、テストがより便利になります。 たとえば、MongoDB は通常シャーディングとレプリカセットの機能で使用されるため、[私たちのテストには反映されています](https://github.com/DataDog/integrations-core/tree/master/mongo/ci)。
* 生のメトリックに加えて計算されたメトリックを生成することを検討してください。 たとえば、多くのデータベースでは、低速ですが頻繁に実行されるクエリはありません。 したがって、パーセンタイルを見ることはしばしば有用です。 たとえば、MySQLの統合には、[95番目のパーセンタイルクエリの実行時間](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py#L1169)の計算メトリックが含まれています。
