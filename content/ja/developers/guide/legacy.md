---
title: Create an Agent check for Datadog Agent 5
description: Learn how to create an Agent check for Datadog Agent 5.
aliases:
- /developers/integrations/legacy
---
Datadog Agent v5 は既に Agent v6 に置き換えられていますが、このドキュメントでは、v5 に対応した Agent チェックの作成方法を説明します。引き続き v5 で独自のローカルチェックを書くことはできますが、v5 用の新しいインテグレーションはアップストリームと見なされません。Agent v6 用のインテグレーションの作成の詳細については、[新しいインテグレーションの設定][1]を参照してください。

## 要件

[Ruby][2] 作業環境が必要です。Ruby をインストールするには、[Ruby のインストール][3]を参照してください。

[Wget][4] も必要です。Wget は、ほとんどの Linux システムにインストールされています。Mac では [Homebrew][5]、Windows では [Chocolatey][6] を使用します。

## セットアップ

セットアップの支援、開発の円滑化、テストの提供を行う [gem][7] およびスクリプトセットがあります。以下の手順でインストールします。

1. Github の [integrations-extras リポジトリ][8]をフォークして、自身の開発環境に複製します。
2. `gem install bundler` を実行します。
3. `bundle install` を実行します。

必要な Ruby gem が Bundler によってインストールされたら、Python 環境を作成します。

1. `rake setup_env` を実行します。これで、インテグレーション開発に必要なすべてのコンポーネント (インテグレーションによって使用されるコア Agent も含む) と共に Python 仮想環境がインストールされます。`gcc` や `libssl-dev` などの Python 依存関係をインストールするために、何らかの基本ソフトウェアが必要になる場合もあります。

2. `source venv/bin/activate` を実行して、インストールされた Python 仮想環境を有効化します。仮想環境を終了するには、`deactivate` を実行します。Python 仮想環境の詳細については、[Virtualenv ドキュメント][9]を参照してください。

## インテグレーションの構築

`rake generate:skeleton[my_integration]` を実行して、新しいインテグレーションのスケルトンを生成します。この my_integration は新しいインテグレーションの名前です (注: インテグレーション名は角括弧で囲む)。

新しいディレクトリ `my_integration` が作成されます。ここには、新しいインテグレーションに必要なすべてのファイルが入っています。また、継続的インテグレーションファイル `.travis.yml` および `circle.yml` の中に新しいインテグレーションのエントリが作成されます。これで、新しいビルドが作成されるたびに、作成したテストが実行されます。

### インテグレーションファイル

新しいインテグレーションには、以下のファイルが含まれます。

#### `README.md`

README ファイルの中には以下のセクションが必要です。

- **Overview** (必須): このインテグレーションを使用して実行できることを記述します。
- **Installation** (必須): インテグレーションのインストール方法についての情報を提供します。
- **Configuration** (必須): インテグレーションまたは統合するサービスの構成に必要な手順を詳述します。
- **Validation** (必須): インテグレーションが意図したとおりに機能しているかどうかをユーザーが確認する方法を記述します。
- **Troubleshooting**: 起こりがちな問題の解決方法を共有することで、他のユーザーを支援します。
- **Compatibility** (必須): インテグレーションのテストと検証を終えたアプリケーションやサービスのバージョンをリストします。
- **Metrics** (必須): インテグレーションが提供するメトリクスのリストです。
- **Events**: インテグレーションがイベントを提供する場合は、それらのイベントのリストです。
- **Service checks**: インテグレーションがサービスチェックを提供する場合は、それらのサービスチェックのリストです。

詳細については、[Agent ベースのインテグレーションの作成][1]を参照してください。

#### `check.py`

チェックロジックを置くファイルです。スケルトン関数は、インテグレーションのインテグレーションクラスを挿入します。このクラスに含まれる `check` メソッドは、チェックロジックが記述される場所になります。

例:

```python

# check.py の例
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # カスタムイベントを送信します。
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
```

Datadog Agent を使用したインテグレーションの記述とメトリクスの送信の詳細については、[Agent ベースのインテグレーションの概要][11]を参照してください。

サードパーティのライブラリをインポートする必要がある場合は、`requirements.txt` ファイルに追加します。

##### `ci/my_integration.rake`

テストを実行する際にテスト環境が必要な場合は、`install` タスクと `cleanup` タスクを使用して、テスト環境のセットアップと終了処理を行います。

例:

```ruby
# my_integration.rake の例
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Python 仮想環境およびインストールパッケージを使用します。
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # docker テストコンテナをセットアップします。
      $(docker run -p 80:80 --name my_int_container -d my_docker)
```

インテグレーションテストの作成については、[Datadog Agent リポジトリ内のドキュメント][12]を参照してください。`install_requirements` や `sleep_for` などのヘルパー関数については、[ci common ライブラリ][13]も参照してください。

**注**: このファイルやテストの他の分野において、`flavor` という変数が出てきます。_flavor_ とは、統合ソフトウェアのバリエーション (主にバージョン) のことです。この変数を使用して、統合するソフトウェアのさまざまな _flavor_、すなわちバリエーションやバージョンをターゲットとしたテストセットを作成できます。

#### `conf.yaml.example`

インテグレーションをインストールするには、それぞれのインスタンスに合わせて構成する必要があります。そのために、`conf.yaml.example` ファイルを Agent の `conf.d` ディレクトリにコピーし、インスタンス固有の情報を使用してそれを更新します。

`conf.yaml.example` ファイルには 2 つのセクションを用意する必要があります。

- `init_config` は、グローバルに構成されるパラメーターに使用されます。
- `instances` は、統合する特定のインスタンスに使用されます。これには、サーバーやホストのアドレスと共に、認証情報、追加タグ、構成設定などの追加パラメーターが含まれます。

##### `manifest.json`

この JSON ファイルは、以下のようなインテグレーションのメタデータを提供します。

- **`maintainer`**: このインテグレーションに関する問い合わせを受けるための有効な電子メールアドレスを提供します。
- **`manifest_version`**: このマニフェストファイルのバージョン。
- **`max_agent_version`**: インテグレーションと互換性がある Datadog Agent の最大バージョン。Datadog は、いくつかのメジャーバージョンでインテグレーションの安定性を維持するために努力しています。そのため、このデータは、生成された番号のままにしておいてください。Datadog Agent の新しいリリースでインテグレーションが機能しない場合は、この番号を設定し、[Datadog Agent プロジェクトに問題を送信してください][14]。
- **`min_agent_version`**: インテグレーションと互換性がある Datadog Agent の最小バージョン。
- **`name`**: インテグレーションの名前。
- **`short_description`**: インテグレーションの簡単な説明を提供します。
- **`support`**: コミュニティに貢献するインテグレーションとして、"contrib" に設定してください。Datadog スタッフから指示された場合にのみ、別の値に設定します。
- **`version`**: インテグレーションの現在のバージョン。
- **`is_public`**: インテグレーションがパブリックな場合に true に設定されるブール値。
- **`has_logo`**: インテグレーションのロゴが `/src/images/integrations_logo` にある場合に true に設定されるブール値。
- **`type`**: **check**
- **`categories`**: Datadog ドキュメントで[インテグレーション][15]を分類するためのカテゴリ。

[マニフェストファイルの例][16]については、既存のインテグレーションの 1 つを参照してください。

#### `metadata.csv`

メタデータ CSV には、インテグレーションが提供するメトリクスのリストと、メトリクスにどのグラフやアラートを使用できるかについてを Datadog Web アプリケーションに提供するために役立つ基本情報が記載されます。

この CSV には、ヘッダー行と以下の列が含まれます。

**`metric_name`** (必須): ダッシュボードまたはモニターの作成時に Datadog サイトに表示されるメトリクスの名前。この名前は、プロバイダー、サービス、メトリクスをピリオドで区切って組み合わせた文字列 (例: `aws.ec2.disk_write_ops`) またはアプリケーション、アプリケーション機能、メトリクスをピリオドで区切って組み合わせた文字列 (例: `apache.net.request_per_s`) になります。

**`metric_type`** (必須): 報告するメトリクスの種類。これは、Datadog Web アプリケーションがデータを処理して表示する方法に影響します。使用できる値は、`count`、`gauge`、`rate` です。

  - `count`: カウントは、特定のイベントが発生した数です。カウントを報告する際は、前回の送信以降に記録された新しいイベントの数 (差分) のみを送信する必要があります。たとえば、`aws.apigateway.5xxerror` メトリクスは、サーバー側エラーの数の `count` です。
  - `gauge`: ゲージは、特定時点の値を追跡するメトリクスです。たとえば、`docker.io.read_bytes` は、1 秒あたりの読み取りバイト数の `gauge` です。
  - `rate`: レートは、経時的メトリクスです (したがって、通常は `per_unit_name` 値を含みます)。たとえば、`lighttpd.response.status_2xx` は、2xx ステータスコードが生成される数を 1 秒ごとに取得する `rate` メトリクスです。

**`interval`**: レートとカウント間の変換に使用される間隔。`metric_type` が `rate` タイプに設定された場合は必須です。

**`unit_name`**: 収集する測定単位のラベル。次の単位 (種類別にグループ化) を使用できます。

  - **バイト**: `bit`、`byte`、`kibibyte`、`mebibyte`、`gibibyte`、`tebibyte`、`pebibyte`、`exbibyte`
  - **キャッシュ**: `eviction`、`get`、`hit`、`miss`、`set`
  - **データベース**: `assertion`、`column`、`command`、`commit`、`cursor`、`document`、`fetch`、`flush`、`index`、`key`、`lock`、`merge`、`object`、`offset`、`query`、`question`、`record`、`refresh`、`row`、`scan`、`shard`、`table`、`ticket`、`transaction`、`wait`
  - **ディスク**: `block`、`file`、`inode`、`sector`
  - **周波数**: `hertz`、`kilohertz`、`megahertz`、`gigahertz`
  - **一般**: `buffer`、`check`、`email`、`error`、`event`、`garbage`,  `collection`、`item`、`location`、`monitor`、`occurrence`、`operation`、`read`、`resource`、`sample`、`stage`、`task`、`time`、`unit`、`worker`、`write`
  - **メモリ**: `page`、`split`
  - **金額**: `cent`、`dollar`
  - **ネットワーク**: `connection`、`datagram`、`message`、`packet`、`payload`、`request`、`response`、`segment`、`timeout`
  - **パーセンテージ**: `apdex`、`fraction`、`percent`、`percent_nano`
  - **システム**: `core`、`fault`、`host`、`instance`、`node`、`process`、`service`、`thread`
  - **時間**: `microsecond`、`millisecond`、`second`、`minute`、`hour`、`day`、`week`

単位名が上にリストされていない場合は、この値を空欄にしてください。このリストに単位を追加するには、[問題][17]を提出してください。

**`per_unit_name`**: 単位あたりのメトリクスを収集する場合は、ここで追加の単位名を指定し、`unit_name` と組み合わせます。たとえば、「request」という `unit_name` と「second」という `per_unit_name` を指定すると、「requests per second」(1 秒あたりのリクエスト) というメトリクスになります。指定する場合は、上にリストされた単位の値である必要があります。

**`description`**: このメトリクスが表す情報の基本的な説明 (400 文字まで)。

**`orientation`** (必須): 整数 `-1`、`0`、または `1`。

  - `-1` は、小さい方がよい値を示します。たとえば、`mysql.performance.slow_queries` や `varnish.fetch_failed` のカウントは、小さい方がよいメトリクスです。
  - `0` は、本質的な良し悪しがない値を示します。たとえば、`rabbitmq.queue.messages` や `postgresql.rows_inserted` は、値の大きさに良し悪しがない、またはそれがシステムの業務目的に依存しています。
  - `1` は、大きい方がよい値を示します。たとえば、`mesos.stats.uptime_secs` はアップタイムが大きい方がよく、`mysql.performance.key_cache_utilization` はキャッシュのヒット率が高い方がよいメトリクスです。

**`integration`** (必須): これはインテグレーションの名前と同じである必要があります (例: 「my_integration」)。

**`short_name`**: メトリクスのわかりやすい省略名。たとえば、`postgresql.index_blocks_read` の場合は `idx blks read` に設定できます。簡潔さより、読んでわかりやすいかどうかを重視してください。インテグレーション名と同じにしないでください。`short_name` を `metric_name` より短くてわかりやすい名前にできない場合は、このフィールドを空にしておきます。

**`curated_metric`**: インテグレーションのためのどのメトリクスが、与えられたタイプで注目すべきかをマークします (`cpu`と`memory`の両方が受け入れられる)。これらは、UI で他のインテグレーションメトリクスの上に表示されます。

#### `requirements.txt`

追加の Python ライブラリが必要な場合は、`requirements.txt` にリストします。ライブラリは、他のユーザーがこのインテグレーションを使用する際に pip を使って自動的にインストールされます。

#### `test_my_integration.py`

インテグレーションテストは、統合するソフトウェアから Datadog Agent がメトリクスを正しく受信して記録しているかどうかを確認します。

インテグレーションが収集するメトリクスをすべてテストする必要はありませんが、できるだけ多くのメトリクスをカバーすることを強くお勧めします。テストで `self.coverage_report()` メソッドを実行すると、どのメトリクスがカバーされているかを確認できます。

`test_my_integration.py` の例を挙げます。

```
# test_my_integraion.py の例
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect', count=1, status=AgentCheck.OK, tags=[host:localhost', 'port:80'])
    self.coverage_report()
```

テストおよび使用できるテストメソッドについては、[Datadog Agent リポジトリ内の AgentCheckTest クラス][18]を参照してください。

## ライブラリ

[Datadog Agent][19] は、複数の便利なライブラリを [`utils` ディレクトリ][20]で提供します。これらのライブラリはインテグレーションを構築する際に役立ちます。ただし、Datadog Agent v6 で移動されていますので、ご注意ください。

## インテグレーションのテスト

チェックとテストのコードを構築したら、以下のようにテストを実行します。

- `rake lint`: コードに文法エラーがないかをチェックします。
- `rake ci:run[my_integration]`: `test_my_integration.py` ファイルで `@attr(requires='my_integration')` 注釈付きで作成したテストを実行します。
- `rake ci:run[default]`: 追加されたいくつかの汎用テストに加えて、`test_my_integration.py` ファイルで作成したテスト (`@attr(requires='my_integration')` 注釈なし) を実行します。

プルリクエストを作成すると、Travis CI が自動的にテストを実行します。プルリクエストを送信する前に、テストカバレッジが十分で、すべてのテストに合格していることを確認してください。

完全な Docker テスト環境 (次のセクションを参照) を必要とするテストクラスまたはメソッドには、`@attr(requires='my_integration')` 注釈を追加します。
ユニットテストや模擬テストにはこの注釈を追加しないでください。これらのテストは、Travis CI で `rake ci:run[default]` で実行します。

ユニットテストや模擬テストを迅速に繰り返すには、`rake ci:run[default]` ですべてのテストを実行するのではなく、以下を実行します。

```
# virtualenv でユニットテストや模擬テストを実行します
$ bundle exec rake exec["nosetests my_integration/test/test_*.py -A 'not requires'"]
```

### Docker テスト環境

Datadog は、環境のテストに Docker コンテナを使用します。これは、推奨されるアプローチです。コンテナは軽量で簡単に管理でき、毎回のテストランに一貫性のある標準化された環境を提供します。

例えば、Datadog MySQL インテグレーションにおいて [`ci/mysql.rake` ファイル][21]は、[公式 MySQL コンテナ][22]を使用し、4 つの主要なタスクを含みます。

1. `before_install` - 新しい Docker テスト環境を開始する前に、以前の Docker テスト環境を確実に停止して削除してください。
2. `install` - インストールタスクは、Docker `run` を実行して MySQL テストサーバーを起動します。
3. `before_script` - このタスクは、MySQL サーバーが動作していることを確認してから、サーバーに接続していくつかのセットアップタスクを実行します。セットアップタスクは可能な限り `test_integration.py` ファイルに置いておきますが、Python テストスクリプトの前にセットアップや構成を実行しなければならない場合もあります。
4. `cleanup` - テストが完了したら、Docker テスト環境を停止して削除します。

### インテグレーションをローカルにインストールする

インテグレーションが `integrations-extras` リポジトリにマージされると、このインテグレーションを他のユーザーが簡単にインストールできるように、Datadog はいくつかのパッケージを生成します。ただし、マージする前に、インテグレーションをローカルにインストールすることもできます。

ローカルに実行するには、まず `check.py` ファイルを Datadog Agent の `checks.d` ディレクトリにコピーし、ファイルの名前を `my_integration.py` に変更します (インテグレーションの実際の名前を使用)。

次に、`conf.yaml.example` ファイルを Datadog Agent の `conf.d` ディレクトリにコピーし、ファイルの名前を `my_integration.yaml` に変更します (ここでも、インテグレーションの実際の名前を使用)。

Datadog Agent のディレクトリ構造の詳細については、[新しいインテグレーションの設定][1]を参照してください。

### 終了処理とクリーンアップ

インテグレーションの構築を完了したら、`rake clean_env` を実行して Python 仮想環境を削除します。

## インテグレーションの送信

インテグレーションの開発が完了したら、[プルリクエスト][23]を送信して、Datadog にインテグレーションのレビューを依頼します。インテグレーションのレビュー後、Datadog はプルリクエストを承認してマージします。または、フィードバックと共に承認に必要な次の手順を示します。

### その他の考慮事項

テストを作成するときは、次の点を考慮してください。

* テストクラスター。単一のソフトウェアインスタンスをテストする方が簡単なことは当然ですが、現実的な使用方法を代表する複数のセットアップに対してテストを実行する方がさらに有益です。たとえば、MongoDB は通常、シャーディング機能や Replica Set 機能と共に使用されるので、[テスト][24]はそれを反映しています。
* 未加工のメトリクスだけでなく、算出メトリクスを生成することも考慮します。たとえば、多くのデータベースが持つクエリは、遅いですが、あまり実行されていません。したがって、パーセンタイルを見るとよいことがよくあります。たとえば、Datadog MySQL インテグレーションには、[95 パーセンタイルクエリ実行時間][2]の算出メトリクスが含まれます。

[1]: https://docs.datadoghq.com/developers/integrations/agent_integration
[2]: https://www.ruby-lang.org
[3]: https://www.ruby-lang.org/en/documentation/installation
[4]: https://www.gnu.org/software/wget
[5]: https://brew.sh
[6]: https://chocolatey.org
[7]: https://rubygems.org/gems/datadog-sdk-testing
[8]: https://github.com/DataDog/integrations-extras
[9]: https://virtualenv.pypa.io/en/stable
[11]: https://docs.datadoghq.com/developers/integrations/
[12]: https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests
[13]: https://github.com/DataDog/dd-agent/blob/master/ci/common.rb
[14]: https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues
[15]: /integrations
[16]: https://github.com/DataDog/integrations-core/blob/master/activemq/manifest.json
[17]: https://github.com/DataDog/integrations-extras/issues
[18]: https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py
[19]: https://github.com/DataDog/dd-agent
[20]: https://github.com/DataDog/dd-agent/tree/master/utils
[21]: https://github.com/DataDog/integrations-core/blob/5.19.x/mysql/ci/mysql.rake
[22]: https://hub.docker.com/_/mysql
[23]: https://github.com/DataDog/integrations-extras/compare
[24]: https://github.com/DataDog/integrations-core/tree/5.22.x/mongo/test/ci
