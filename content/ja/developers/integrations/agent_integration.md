---
aliases:
- /ja/developers/integrations/integration_sdk/
- /ja/developers/integrations/testing/
- /ja/integrations/datadog_checks_dev/
- /ja/guides/new_integration/
- /ja/developers/integrations/new_check_howto/
description: Datadog Agent インテグレーションを開発し、公開する方法をご紹介します。
further_reading:
- link: /developers/integrations/
  tag: Documentation
  text: インテグレーションを作成する
- link: /developers/integrations/python/
  tag: Documentation
  text: Agent ベースのインテグレーション開発のための Python
- link: /developers/
  tag: Documentation
  text: Datadog プラットフォームで開発する方法について
title: Agent ベースのインテグレーションを作成
---
## 概要

このページでは、Technology Partners 向けに Datadog Agent インテグレーションの作成方法を説明します。作成したインテグレーションは、[Integrations ページ][23] で「すぐに使える」ものとして掲載するか、[Marketplace ページ][24] で価格を設定して掲載できます。

Agent ベースのインテグレーションは、開発者が作成したカスタム チェックを通じてデータを送信するために [Datadog Agent][17] を使用します。これらのチェックは、顧客の Datadog アカウントに [メトリクス][34]、[イベント][18]、[サービス チェック][25] を送出できます。Agent 自体も [ログ][26] を送信できますが、これはチェックの外で設定します。

## Agent ベースのインテグレーションを使うタイミング

Agent インテグレーションは、次の環境で動作するシステムやアプリケーションからデータを収集するのに最適です:
- ローカル エリア ネットワーク (LAN)
- バーチャル プライベート クラウド (VPC)
Agent ベースのインテグレーションは、Python wheel (.whl) として公開およびデプロイする必要があります。


## 開発プロセス

Agent ベースのインテグレーションを構築する流れは次のとおりです:

1. Join the Datadog Partner Network
   - まず [Datadog Partner Network][32] に申請します。承認されると、Datadog Technology Partner チームとの初回オリエンテーション コールがスケジュールされます。
2. 開発環境をセットアップする
   - Datadog Partner Network ポータルから Datadog サンドボックス アカウントをリクエストします。
   - 必要な開発ツールをインストールします。
3. インテグレーションを作成する
   - Datadog サンドボックス内で **Developer Platform** > **add a new listing** に移動します。
   - インテグレーションの詳細情報を入力します。
4. Agent チェックをビルドし、インテグレーションをテストする
   - [こちらの手順](#write-an-agent-check) に従って Agent チェックを作成します。
4. レビューに提出する
   - Developer Platform からインテグレーションのコンテンツを提出します。
   - Agent チェックのコードで GitHub の pull request を作成します。
   - Datadog チームが最終デモをスケジュールして、インテグレーションをレビューします。

## 前提条件

必要な Datadog Agent インテグレーション開発ツールは以下の通りです。

- Python v3.12、[pipx][2]、および Agent Integration Developer Tool (`ddev`)。インストール手順は [Datadog Agent Integration Developer Tool のインストール][3] を参照してください。
- フルテストスイートを実行するための [Docker][4]。
- git [コマンドライン][5]または [GitHub デスクトップクライアント][19]。

<div class="alert alert-info">すぐに使える Agent ベースのインテグレーションを Integrations ページで、または Agent ベースのインテグレーションを Marketplace ページで構築する手順について、タブを選択します。</div>

{{< tabs >}}
{{% tab "すぐに使えるインテグレーションを構築する" %}}

すぐに使えるインテグレーションを構築するには

`dd` ディレクトリを作成します。

```shell
mkdir $HOME/dd && cd $HOME/dd
```

   Datadog Development Toolkit は、`$HOME/dd/` ディレクトリで作業することを前提としています。必須ではありませんが、別のディレクトリで作業する場合は追加の構成手順が必要です。

1. [`integrations-extras` リポジトリ][101]をフォークします。

1. フォークを `dd` ディレクトリに複製します。
   ```shell
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. 作業するフィーチャーブランチを作成します。
   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## デベロッパーツールの構成

Agent Integration Developer Tool を使用すると、インテグレーションを開発する際に、インテグレーションタイルのアセットとメタデータのスケルトンを生成して、スキャフォールディングを作成することができます。ツールのインストール方法については、[Datadog Agent Integration Developer Tool をインストールする][102]を参照してください。

`integrations-extras` リポジトリに対応したツールを構成するには

1. オプションとして、`integrations-extras` リポジトリが `$HOME/dd/` 以外の場所にある場合は、`ddev` 構成ファイルを調整します。
   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ```

1. デフォルトの作業用リポジトリとして `integrations-extras` を設定します。
   ```shell
   ddev config set repo extras
   ```

[101]: https://github.com/Datadog/integrations-extras
[102]: https://docs.datadoghq.com/ja/developers/integrations/python

{{% /tab %}}

{{% tab "Marketplace インテグレーションを構築する" %}}

インテグレーションを構築するには

1. [Marketplace リポジトリ][101]へのアクセスリクエストは、[Marketplace 製品の構築][102]を参照してください。
1. `dd` ディレクトリを作成します。

   ```shell
   mkdir $HOME/dd```

   Datadog Development Toolkit コマンドは、`$HOME/dd/` ディレクトリで作業していることを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

1. マーケットプレイスのリポジトリへのアクセスが許可されたら、`dd` ディレクトリを作成し、`marketplace` リポジトリを複製します。

   ```shell
   git clone git@github.com:DataDog/marketplace.git```

1. 作業するフィーチャーブランチを作成します。

   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master```

## Datadog Development Toolkit をインストールして構成する

Agent Integration Developer Tool を使用すると、インテグレーションを開発する際に、インテグレーションタイルのアセットとメタデータのスケルトンを生成して、スキャフォールディングを作成することができます。ツールのインストール方法については、[Datadog Agent Integration Developer Tool をインストールする][103]を参照してください。

Agent Integration Developer Tool をインストールしたら、Marketplace のリポジトリ用に構成します。

1. デフォルトの作業用リポジトリとして `marketplace` を設定します。

   ```shell

   ddev config set repos.marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. `marketplace` ディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

   ```shell

   ddev config set repos.marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/ja/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## インテグレーションを作成する

Docker をダウンロードし、適切なバージョンの Python をインストールして開発環境を整えたら、Agent ベースのインテグレーションの作成を開始できます。

以下の手順では、`Awesome` というサンプル インテグレーションを使用します。Awesome のコードを使って進めるか、Awesome を自身のコードやコマンド内のインテグレーション名に置き換えてください。例えば、`ddev create Awesome` の代わりに `ddev create <your-integration-name>` を使用します。

### インテグレーションのためのスキャフォールディングを作成する

`ddev create` コマンドは、Agent ベースのインテグレーションに必要な基本的なファイルとパスの構造 (またはスキャフォールディング) を作成するインタラクティブツールを実行します。

1. 最初のインテグレーションディレクトリを作る前に、ディスクに何も書き込まない `-n/--dry-run` フラグを使って、ドライランを試してみてください。
   ```shell
   ddev create -n Awesome
   ```

   このコマンドで、ファイルが書き込まれるパスと、パス構造自体が表示されます。出力の 1 行目のパスがリポジトリの場所と一致していることを確認します。

1. コマンドを `-n` フラグを付けずに実行します。このツールは、メールと名前の入力を求め、インテグレーションを始めるために必要なファイルを作成します。

    <div class="alert alert-info">Datadog Marketplace 用のインテグレーションを作成する場合、ディレクトリが {パートナー名}_{インテグレーション名} のパターンに従っていることを確認してください。</div>

   ```shell
   ddev create Awesome
   ```

## Agent チェックを書く

各 Agent ベースのインテグレーションの中核は、定期的に情報を収集して Datadog に送信する *Agent Check* です。

[チェック][30]は、`AgentCheck` ベースクラスからロジックを継承し、以下の要件を備えています。

- Datadog Agent v7 以降で実行するインテグレーションは、Python 3 に対応している必要があります。Datadog Agent v5 と v6 で実行されるインテグレーションは、依然として Python 2.7 を使用しています。
- チェックは `AgentCheck` から派生している必要があります。
- チェックは、このシグネチャを持つメソッド `check(self, instance)` を提供しなければなりません。
- チェックは通常の Python パッケージの中で、`datadog_checks` ネームスペースの下にまとめられています。例えば、Awesome のコードは `awesome/datadog_checks/awesome/` ディレクトリに格納されています。
- パッケージ名は、チェック名と同じでなければなりません。
- そのパッケージ内の Python モジュールの名称や、チ ェックを実装するクラスの名称には制限がありません。

### チェックロジックの実装

Awesome の場合、Agent チェックは `awesome.search` という名前の [サービス チェック][25] で構成され、Web ページ上で文字列を検索します。文字列が存在する場合は結果が `OK`、ページにアクセスできるが文字列が見つからない場合は `WARNING`、ページにアクセスできない場合は `CRITICAL` になります。

Agent Check でメトリクスを送信する方法については、[カスタムAgent Check][7] を参照してください。

`awesome/datadog_checks/awesome/check.py` のコードは次のようになります。

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck は AgentCheck を継承し、必要なチェックメソッドを提供します。"""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # 基本的なサニティチェックを行うことをお勧めします。
        # 例外についてはできるだけ具体的に記述してください。
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # 大きな間違いがある場合
        except Exception as e:
            # もう少し具体的なメッセージを用意してください...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # ページがアクセス可能な場合
        else:
            # search_string が見つかった場合
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # search_string が見つからなかった場合
            else:
                self.service_check('awesome.search', self.WARNING)
{{< /code-block >}}

基本 Python クラスの詳細は、[Python チェックの構造][8]を参照してください。

## 検証テストを書く

テストには 2 種類あります。

- [特定の機能のユニットテスト](#write-a-unit-test)
- [`check` メソッドを実行し、適切なメトリクス収集を検証するインテグレーションテスト](#write-an-integration-test)

[pytest][9] と [hatch][10] はテストを実行するために使用されます。インテグレーションを公開するためには、テストが必要です。

### ユニットテストを書く

Awesome の `check` メソッドの最初の部分は、構成ファイルから 2 つの要素を取得して検証します。これはユニット テストに適した対象です。

`awesome/tests/test_awesome.py` ファイルを開き、内容を次に書き換えます。

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # インテグレーションをインポートするのを忘れないでください

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # 空のインスタンス
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # URL のみ
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # 検索文字列のみ
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # これは失敗しません
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` はマーカーをサポートし、これを使用してテストをカテゴリにグループ化できます。`test_config` が `unit` テストとしてマークされていることに注目してください。

スキャフォールディングは、`awesome/tests` にあるすべてのテストを実行するように設定されています。テストを実行するには、以下のコマンドを実行します。
```
ddev test awesome
```

### インテグレーションテストを書く

[上記のユニットテスト](#write-a-unit-test)では、コレクションロジックはチェックされません。ロジックをテストするには、[インテグレーションテストのための環境を作り](#create-an-environment-for-the-integration-test)、[インテグレーションテストを書く](#add-an-integration-test)必要があります。

#### インテグレーションテスト用の環境を作成する

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

    # これには 3 つの意味があります。
    #
    # 1. Compose ファイルで定義されたサービスをスピンアップします
    # 2. テストを実行する前に、URL が利用可能になるまで待ちます
    # 3. テスト終了後、サービスを撤収します
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### インテグレーションテストを追加する

インテグレーションテストのための環境を整えたら、`awesome/tests/test_awesome.py` ファイルにインテグレーションテストを追加します。

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # このチェックは OK を送信するはずです
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # このチェックは WARNING を送信するはずです
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

開発をスピードアップするために、`-m/--marker` オプションを使って、インテグレーションテストのみを実行することができます。
   ```
   ddev test -m integration awesome
   ```
インテグレーションはほぼ完了です。サンドボックス内の Developer Platform に戻り、提出を最終化してください。

## ホイールのビルド

`pyproject.toml` ファイルは、ホイールのパッケージ化とビルドに使用されるメタデータを提供します。ホイールはインテグレーションを機能させるために必要なファイルを含んでおり、これには Agent Check、構成例ファイル、ホイールビルド中に生成される成果物が含まれます。

メタデータ ファイルを含むすべての追加要素は、wheel に含めることを意図しておらず、Datadog プラットフォームおよびエコシステムの別の場所で使用されます。

Python のパッケージングについてより詳しく知りたい場合は、[Python プロジェクトのパッケージング][16]を参照してください。

`pyproject.toml` の準備ができたら、以下のオプションのいずれかを使用してホイールを作成します。

- (推奨) `ddev` ツールを使用する: `ddev release build <INTEGRATION_NAME>`
- `ddev` ツールを使用しない: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`

## ホイールのインストール

Wheel は、[Agent v6.10.0 以降][17]で提供されている Agent の `integration` コマンドを使ってインストールされます。このコマンドは、環境に応じて、特定のユーザーとして、または特定の権限で実行する必要があります。

**Linux** (`dd-agent` として)
```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (管理者として)
```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (シェルセッションが administrator 権限を持っていること)

<details>
  <summary>Agent <code>v6.11</code> 以前</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
  ```

</details>

<details open>
  <summary>Agent<code>v6.12</code> 以降</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
  ```
</details>

Kubernetes 環境でテスト用に wheel をインストールする場合:
1. `.whl` ファイルを initContainer にマウントします。
2. initContainer 内で wheel のインストールを実行します。
3. 実行中の Agent コンテナに initContainer をマウントします。

ホスト環境およびコンテナ環境の顧客向けインストール コマンドについては、[Community and Marketplace Integrations ドキュメント][35] を参照してください。

## コードをレビューに提出する

Developer Platform に記載された手順に従って、Agent チェックのコードを GitHub でレビューに提出してください。承認されると、その pull request はインテグレーションとともにリリースされます。

## インテグレーションを更新する
* インテグレーションのコードを編集または新規追加する場合は、バージョンの引き上げが必要です。

* README コンテンツ、マニフェスト情報、またはダッシュボードやモニター テンプレートなどのアセットを編集または追加する場合は、バージョンの引き上げは不要です。

### インテグレーションのバージョンを上げる
コード変更に加えて、インテグレーションのバージョンを上げる際には次が必要です:
1. 新しいバージョン番号を反映するように `__about__.py` を更新します。このファイルはインテグレーションのディレクトリ内の `/datadog_checks/<your_check_name>/__about__.py` にあります。
2. Developer Platform の **Release Notes** に、次の形式に従ったエントリを追加します:
   ```
   ## Version Number / Date in YYYY-MM-DD

   ***Added***:

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix

   ***Changed***:

   * Feature update
   * Feature update

   ***Removed***:

   * Feature removal
   * Feature removal
   ```
3. インストール手順などで言及されているバージョン番号の参照箇所をすべて更新します。インストール手順にはバージョン番号が含まれていることが多いため、必ず更新してください。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: https://docs.datadoghq.com/ja/developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://github.com/datadog/integrations-extras
[7]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count
[8]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[9]: https://docs.pytest.org/en/latest
[10]: https://github.com/pypa/hatch
[11]: https://datadoghq.dev/integrations-core/meta/config-specs/
[12]: /ja/developers/integrations/check_references/#configuration-file
[13]: /ja/developers/integrations/check_references/#manifest-file
[14]: /ja/developers/integrations/check_references/#metrics-metadata-file
[15]: /ja/developers/integrations/check_references/#service-check-file
[16]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[17]: https://docs.datadoghq.com/ja/agent/
[18]: https://docs.datadoghq.com/ja/service_management/events/
[19]: https://desktop.github.com/
[20]: https://docs.datadoghq.com/ja/developers/integrations/
[21]: https://github.com/Datadog/integrations-extras
[22]: https://github.com/Datadog/marketplace
[23]: https://app.datadoghq.com/integrations
[24]: https://app.datadoghq.com/marketplace
[25]: https://docs.datadoghq.com/ja/developers/service_checks/
[26]: https://docs.datadoghq.com/ja/logs/
[27]: https://docs.datadoghq.com/ja/monitors/
[28]: https://docs.datadoghq.com/ja/dashboards/
[29]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/
[30]: https://docs.datadoghq.com/ja/glossary/#check
[31]: https://docs.datadoghq.com/ja/developers/integrations/
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/ja/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/ja/metrics/
[35]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/