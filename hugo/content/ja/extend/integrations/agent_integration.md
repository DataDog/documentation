---
aliases:
- /ja/developers/integrations/integration_sdk/
- /ja/developers/integrations/testing/
- /ja/integrations/datadog_checks_dev/
- /ja/guides/new_integration/
- /ja/developers/integrations/new_check_howto/
- /ja/developers/integrations/agent_integration/
description: Datadog Agent インテグレーションを開発し、公開する方法をご紹介します。
further_reading:
- link: /extend/integrations/
  tag: ドキュメント
  text: インテグレーションを作成する
- link: /extend/integrations/python/
  tag: ドキュメント
  text: Agent ベースのインテグレーション開発のための Python
- link: /extend/
  tag: ドキュメント
  text: Datadog プラットフォームで開発する方法について
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: ラーニングセンター
  text: Agent インテグレーションの作成
title: Agent ベースのインテグレーションの作成
---
## 概要 {#overview}

このページは、テクノロジーパートナーが公式 Datadog Agent インテグレーションを作成するプロセスについてご案内します。

Agent ベースのインテグレーションは、Datadog Agent がインストールされているかネットワークアクセスがある顧客管理のインフラストラクチャー上で実行されているソフトウェアまたはシステムからテレメトリを収集するように設計されています。これらのインテグレーションは、承認済みテクノロジーパートナーによって開発されたカスタムエージェントチェックを通じてデータを収集しおよび送信するために [Datadog Agent][1] を使用します。

エージェントチェックは、[メトリクス][2]、[イベント][3]、および[ログ][5]を顧客の Datadog アカウントに送信することができます。各 Agent ベースのインテグレーションは、Datadog Agent 上に構築された Python パッケージとして提供され、顧客は Datadog Agent を通じて簡単に[インストール][6]できます。ただし、トレースは Datadog の SDK の 1 つを使用してエージェントチェックの外部で収集されます。詳細については、[アプリケーションインスツルメンテーションのドキュメント][25]を参照してください。

## Agent ベースのインテグレーションの構築 {#building-an-agent-based-integration}
始める前に、[Datadog パートナーネットワークに参加][7]し、パートナー開発者組織へのアクセス権限があり、[開発者プラットフォームでリスティングを作成][8]していることを確認してください。

Agent ベースのインテグレーションを作成するための手順は次のとおりです。

1. [必要な開発ツールをインストールします](#prerequisites)。
2. [Datadog Agent インテグレーション開発者ツールを構成します](#configure-the-datadog-agent-integration-developer-tool)。
3. [インテグレーションのスキャフォールディングを生成します](#generate-your-scaffolding)。
4. [エージェントチェックを開発します](#develop-your-agent-check)。
5. [インテグレーションをテストします](#test-your-agent-check)。
6. [レビュー用のコードを送信します](#submit-your-code-for-review)。

### 前提条件 {#prerequisites}

次のツールがインストールされていることを確認します。

- 開発ツールと依存関係をインストールするための [pipx][9]
- スキャフォールディングを生成し、インテグレーション開発を管理するための [Datadog Agent インテグレーション開発者ツール][10] (`ddev`)
- フルテストスイートを実行するための [Docker][11]
- Git [コマンドライン][12]または [GitHub デスクトップクライアント][13]

### Datadog Agent インテグレーション開発者ツールを構成する {#configure-the-datadog-agent-integration-developer-tool}
Datadog Agent 開発者ツールを使用して、インテグレーションを構築およびテストします。セットアップ手順は、[すぐに使える (OOTB) インテグレーションまたは Marketplace インテグレーション][23]を開発しているかどうかによって異なります。以下の適切なタブを選択します。

{{< tabs >}}

{{% tab "OOTB インテグレーション" %}}

1. 作業ディレクトリを作成します。開発者ツールは、作業内容が `$HOME/dd/` にあることを想定しています。

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. [Datadog/integrations-extras][101] リポジトリを GitHub アカウントにフォークします。

3. フォークを `dd` ディレクトリに複製します。

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. インテグレーション用の新しいブランチを作成して切り替えます。

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. デフォルトの作業用リポジトリとして `extras` を設定します。

   ```shell
   ddev config set repo extras
   ```

   リポジトリが `$HOME/dd/` の外に保存されている場合は、デフォルトとして設定する前にパスを指定します。

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Marketplace インテグレーション" %}}

1. 作業ディレクトリを作成します。開発者ツールは、作業内容が `$HOME/dd/` にあることを想定しています。

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. [Datadog/marketplace][101] リポジトリを複製します。アクセス権がない場合は、Datadog の担当者にリクエストしてください。

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. インテグレーション用の新しいブランチを作成して切り替えます。

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. デフォルトの作業用リポジトリとして `marketplace` を設定します。

   ```shell
   ddev config set repo marketplace
   ```

   リポジトリが `$HOME/dd/` の外に保存されている場合は、デフォルトとして設定する前にパスを指定します。

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### スキャフォールディングを生成する {#generate-your-scaffolding}

`ddev create` コマンドを使用して、Agent ベースのインテグレーションの初期ファイルおよびディレクトリ構造を生成します。

<div class="alert alert-info">インテグレーションの正しいコマンドについては、開発者プラットフォームの構成方法タブを参照してください。</div>

1. **ドライランを実行する (推奨)**

    `-n` または `--dry-run` フラグを使用して、生成されるファイルをプレビューし、ディスクに書き込まないようにします。出力パスが想定されるリポジトリの場所と一致していることを確認します。

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **ファイルを生成する** 

    ディレクトリの場所を確認した後、`-n` なしで同じコマンドを実行してスキャフォールディングを作成します。プロンプトに従ってインテグレーションの詳細を提供します。

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### エージェントチェックを開発する {#develop-your-agent-check}

各 Agent ベースのインテグレーションは Agent チェックを中心に構築されています。これは定期的にテレメトリを収集し、Datadog に送信する Python クラスです。

Agent [チェック][16] は `AgentCheck` ベースクラスを継承し、以下の要件を満たす必要があります。

- **Python の互換性**:
    - Datadog Agent v7+ のインテグレーションは Python 3 をサポートする必要があります。すべての新しいインテグレーションは v7+ を対象とする必要があります。
    - Datadog Agent v5-v6 のインテグレーションは Python 2.7 を使用します。
- **クラスの継承**: 各チェックは `AgentCheck` をサブクラス化する必要があります。
- **エントリーポイント**: 各チェックは `check(self, instance)` メソッドを実装する必要があります。
- **パッケージ構造**: チェックは `datadog_checks` ネームスペースの下に整理されます。例えば、`<INTEGRATION_NAME>` という名前のインテグレーションは `<integration_name>/datadog_checks/<integration_name>/` 内になります。
- **命名**:
    - パッケージ名はチェック名と一致する必要があります。
    - パッケージ内の Python モジュールおよびクラス名は自由に選択できます。

#### チェックロジックを実装する {#implement-check-logic}

以下の例は、`Awesome` という名前のインテグレーションのロジックを示しています。

このチェックは、特定の文字列をウェブページで検索する `awesome.search` という[サービスチェック][4]を定義します。
- 文字列が見つかった場合は `OK` を返します。
- ページが読み込まれたものの文字列が欠落している場合は `WARNING` を返します。
- ページにアクセスできない場合は `CRITICAL` を返します。

チェックから追加データを送信する方法については、以下を参照してください。

- メトリクスを送信するため[カスタム Agent チェック][17]。
- `send_log` を使用して AgentCheck からログを収集するための [Agent インテグレーションログ収集][5]。単一ソースのログ送信に最適です。
- 複数のエンドポイントや外部 HTTP API をポーリングする場合など、複数のログソースからログを収集するための [HTTP クローラーチュートリアル][24]。

ファイル `awesome/datadog_checks/awesome/check.py` は次のようになります。

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck derives from AgentCheck, and provides the required check method."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # It's a very good idea to do some basic sanity checking.
        # Try to be as specific as possible with the exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # Something went horribly wrong
        except Exception as e:
            # Ideally we'd use a more specific message...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
            # Submit an error log
            self.send_log({
                'message': f'Failed to access {url}: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'service': 'awesome',
                'url': url
            })
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
                # Submit an info log
                self.send_log({
                    'message': f'Successfully found "{search_string}" at {url}',
                    'timestamp': time.time(),
                    'status': 'info',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
                # Submit a warning log
                self.send_log({
                    'message': f'String "{search_string}" not found at {url}',
                    'timestamp': time.time(),
                    'status': 'warning',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
{{< /code-block >}}

基本 Python クラスの詳細は、[Python チェックの構造][18]を参照してください。

### 検証テストを書く {#write-validation-tests}

テストには 2 種類あります。

- [特定の機能のユニットテスト](#write-a-unit-test)
- [`check` メソッドを実行し、適切なメトリクス収集を検証するインテグレーションテスト](#write-an-integration-test)

[pytest][19] と [hatch][20] はテストを実行するために使用されます。インテグレーションを公開するためには、テストが必要です。

#### ユニットテストを書く {#write-a-unit-test}

Awesome の `check` メソッドの前半では、2 つの要素をコンフィギュレーションファイルから取得して検証しています。これは、ユニットテストにかける候補として適切です。

`awesome/tests/test_awesome.py` ファイルを開き、内容を次に書き換えます。

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # Don't forget to import your integration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # empty instance
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # only the url
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # only the search string
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # this should not fail
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` はマーカーをサポートし、これを使用してテストをカテゴリにグループ化できます。`test_config` が `unit` テストとしてマークされていることに注目してください。

スキャフォールディングは、`awesome/tests` にあるすべてのテストを実行するように設定されています。テストを実行するには、以下のコマンドを実行します。

```
ddev test awesome
```

#### インテグレーションテストを書く {#write-an-integration-test}

[上記のユニットテスト](#write-a-unit-test)では、コレクションロジックはチェックされません。ロジックをテストするには、[インテグレーションテスト用の環境を作成](#create-an-environment-for-the-integration-test)し、[インテグレーションテストを書く](#add-an-integration-test)必要があります。

##### インテグレーションテスト用の環境を作成する {#create-an-environment-for-the-integration-test}

このツールキットは `docker` を使って NGINX コンテナをスピンアップし、チェックにウェルカムページを取得させることができます。

インテグレーションテスト用の環境を作成するために、`awesome/tests/docker-compose.yml` に以下の内容で docker-compose ファイルを作成します。

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

次に、`awesome/tests/conftest.py` ファイルを開き、内容を次に書き換えます。

{{< code-block lang="python" filename="conftest.py" collapsible="true" >}}
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # This does 3 things:
    #
    # 1. Spins up the services defined in the compose file
    # 2. Waits for the url to be available before running the tests
    # 3. Tears down the services when the tests are finished
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### インテグレーションテストを追加する {#add-an-integration-test}

インテグレーションテストのための環境を整えたら、`awesome/tests/test_awesome.py` ファイルにインテグレーションテストを追加します。

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # the check should send OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # the check should send WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

開発をスピードアップするために、`-m/--marker` オプションを使って、インテグレーションテストのみを実行することができます。
   ```
   ddev test -m integration awesome
   ```

## エージェントチェックをテストする {#test-your-agent-check}

Agent ベースのインテグレーションは、顧客が Datadog Agent を通じてインストールする Python ホイール (.whl) ファイルとしてディストリビューションされます。インテグレーションを公開する前に、ホイールパッケージを手動でビルドしてインストールすることで、ローカルにテストできます。

### ホイールのビルド {#build-the-wheel}

`pyproject.toml` ファイルは、ホイールのパッケージ化とビルドに使用されるメタデータを提供します。ホイールはインテグレーションを機能させるために必要なファイルを含んでおり、これには Agent チェック、構成例ファイル、ホイールビルド中に生成される成果物が含まれます。

Python のパッケージングについてより詳しく知りたい場合は、[Python プロジェクトのパッケージング][21]を参照してください。

`pyproject.toml` の準備ができたら、以下のオプションのいずれかを使用してホイールを作成します。

- (推奨) `ddev` ツールを使用: `ddev release build <INTEGRATION_NAME>`。
- `ddev` ツールを使用しない: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`。

### ホイールのインストール {#install-the-wheel}

ホイールは、[Agent v6.10.0 以降][1]で提供されている Agent `integration` コマンドを使ってインストールされます。このコマンドは、環境に応じて、特定のユーザーとして、または特定の権限で実行する必要があります。

**Linux** (`dd-agent` として):

```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (管理者として):

```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (シェルセッションが _administrator_ 権限を持っていること):

{{% collapse-content title="Agent v6.11 またはそれ以前" level="h4" expanded=false %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

{{% collapse-content title="Agent v6.12 またはそれ以降" level="h4" expanded=true %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

Kubernetes 環境でテストするためにホイールをインストールするには
1. `.whl` ファイルを initContainer にマウントします。
2. initContainer でホイールインストールを実行します。
3. 実行中の Agent コンテナに initContainer をマウントします。

ホストおよびコンテナ環境の顧客インストールコマンドについては、[コミュニティおよび Marketplace Integrations のドキュメント][22]を参照してください。

## レビュー用のコードを送信する {#submit-your-code-for-review}

適切なリポジトリにインテグレーションディレクトリを含むプルリクエストを開きます。リポジトリは、[Datadog/integrations-extras][14] または [Datadog/marketplace][15] のいずれかです。プルリクエストは開発者プラットフォームへの送信と並行してレビューされます。

## インテグレーションの更新 {#updating-your-integration}

インテグレーションが公開された後、開発者プラットフォームを通じて更新をリリースできます。

### インテグレーションのバージョンアップ {#bumping-an-integration-version}
機能を追加、削除、または変更する際にはバージョンアップをする必要があります (例: 新しいメトリクスの導入、ダッシュボードの更新、またはインテグレーションコードの変更時など)。書き込まれたコンテンツ、ブランディング、ロゴ、または画像の変更など、機能に影響しない更新には必要ありません。

開発者プラットフォームで、**リリースノート**タブにこの形式で新しいエントリを含めます。
    

```
## Version Number / Date (YYYY-MM-DD)

***Added***:

* Description of new feature
* Description of new feature

***Fixed***:

* Description of fix
* Description of fix

***Changed***:

* Description of update or improvement
* Description of update or improvement

***Removed***:

* Description of removed feature
* Description of removed feature
```

インテグレーションのドキュメントとインストール手順全体でバージョン番号への参照をすべて更新してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/
[2]: https://docs.datadoghq.com/ja/metrics/
[3]: https://docs.datadoghq.com/ja/service_management/events/
[4]: /ja/extend/service_checks/
[5]: https://docs.datadoghq.com/ja/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[7]: /ja/extend/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /ja/extend/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /ja/extend/integrations/python/
[11]: https://docs.docker.com/get-docker/
[12]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[13]: https://desktop.github.com/
[14]: https://github.com/Datadog/integrations-extras
[15]: https://github.com/DataDog/marketplace
[16]: https://docs.datadoghq.com/ja/glossary/#check
[17]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count
[18]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[19]: https://docs.pytest.org/en/latest
[20]: https://github.com/pypa/hatch
[21]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[22]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[23]: /ja/extend/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/
[25]: /ja/tracing/trace_collection/