---
aliases:
- /ja/developers/integrations/integration_sdk/
- /ja/developers/integrations/testing/
- /ja/integrations/datadog_checks_dev/
- /ja/guides/new_integration/
- /ja/developers/integrations/new_check_howto/
description: Learn how to develop and publish a Datadog Agent integration.
further_reading:
- link: /developers/integrations/create_a_tile/
  tag: Documentation
  text: Create a tile
- link: /developers/integrations/python/
  tag: Documentation
  text: Python for Agent-based Integration Development
- link: /developers/
  tag: Documentation
  text: Learn how to develop on the Datadog platform
title: Create an Agent Integration
---
## 概要

このページでは、Datadog Agent インテグレーションを作成する方法について、テクノロジーパートナーに説明します。このインテグレーションは、[Integrations ページ][23]ですぐに使えるものとして、または [Marketplace ページ][24]で価格を付けて出品することができます。

## Agent ベースのインテグレーション

Agent ベースのインテグレーションでは、[Datadog Agent][17] を使用して、開発者が書いたチェックを介してデータを送信します。チェックは、[メトリクス][34]、[イベント][18]、[サービスチェック][25]を顧客の Datadog アカウントに送信できます。Agent 自体も同様に[ログ][26]を送信することができますが、これはチェックの外側で構成されます。

これらのインテグレーションの実装コードは、Datadog がホスティングしています。Agent インテグレーションは、ローカルエリアネットワーク (LAN) や仮想プライベートクラウド (VPC) に存在するシステムまたはアプリケーションからデータを収集するのに最適な方法です。Agent インテグレーションの作成では、ソリューションを Python ホイール (`.whl`) として公開およびデプロイする必要があります。

Agent ベースのインテグレーションには、[モニター][27]、[ダッシュボード][28]、[ログパイプライン][29]などのすぐに使えるアセットを含めることができます。ユーザーがインテグレーションタイルの **Install** をクリックすると、セットアップ手順に従うよう促され、すぐに使えるすべてのダッシュボードがアカウントに表示されます。ログパイプラインなどの他のアセットは、インテグレーションを適切にインストールおよび構成した後に、ユーザーに表示されます。

## 開発プロセス

Agent ベースのインテグレーションを構築するプロセスは、次のようになります。

1. [Datadog パートナーネットワーク][32]に合格すると、Datadog テクノロジーパートナーチームと面談し、提供する製品やユースケースについて話し合います。
2. Datadog パートナーネットワークポータルから、開発用の Datadog サンドボックスアカウントをリクエストします。
3. インテグレーションの開発を開始します。これには、あなたの側でインテグレーションコードを書くことと、Python ホイール (`.whl`) を構築してインストールすることが含まれます。
4. Datadog サンドボックスアカウントでインテグレーションをテストします。
5. 開発作業をテストして完了したら、**Integrations** または **Marketplace** ページに表示されるインテグレーションタイルを構成するセットアップ手順、イメージ、サポート情報などの情報を提供し、タイルアセットを作成します。
6. プルリクエストが送信され、承認されると、Datadog テクノロジーパートナーチームは、インテグレーションを最終確認するためのデモをスケジュールします。
7. Datadog のサンドボックスアカウントでタイルとインテグレーションをテストしてから公開するか、すべての顧客向けにインテグレーションをすぐに公開するかのオプションがあります。 

## 前提条件

必要な Datadog Agent インテグレーション開発ツールは以下の通りです。

- Python v3.11, [pipx][2], and the Agent Integration Developer Tool (`ddev`). For installation instructions, see [Install the Datadog Agent Integration Developer Tool][3].
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

Datadog Development Toolkit は、`$HOME/dd/` ディレクトリで作業することを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

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
   ddev config set extras "/path/to/integrations-extras"
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

   ddev config set marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. `marketplace` ディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

   ```shell

   ddev config set marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/ja/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## インテグレーションを作成する

Docker をダウンロードし、適切なバージョンの Python をインストールし、開発環境を準備したら、Agent ベースのインテグレーションを作成し始めることができます。

以下の説明では、`Awesome` というインテグレーションを例にしています。Awesome のコードを使うか、Awesome を自分のコードに置き換えて、コマンドの中にインテグレーション名を入れてください。例えば、`ddev create Awesome` の代わりに `ddev create <your-integration-name>` を使用します。

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

Agent ベースの各インテグレーションの中核には、定期的に情報を収集し Datadog に送信する *Agent Check* があります。

[チェック][30]は、`AgentCheck` ベースクラスからロジックを継承し、以下の要件を備えています。

- Datadog Agent v7 以降で実行するインテグレーションは、Python 3 に対応している必要があります。Datadog Agent v5 と v6 で実行されるインテグレーションは、依然として Python 2.7 を使用しています。
- チェックは `AgentCheck` から派生している必要があります。
- チェックは、このシグネチャを持つメソッド `check(self, instance)` を提供しなければなりません。
- チェックは通常の Python パッケージの中で、`datadog_checks` ネームスペースの下にまとめられています。例えば、Awesome のコードは `awesome/datadog_checks/awesome/` ディレクトリに格納されています。
- パッケージ名は、チェック名と同じでなければなりません。
- そのパッケージ内の Python モジュールの名称や、チ ェックを実装するクラスの名称には制限がありません。

### チェックロジックの実装

Awesome の場合、Agent Check は、Web ページ上の文字列を検索する `awesome.search` という名前の[サービスチェック][25]で構成されています。文字列が存在する場合は `OK`、ページにはアクセスできるが文字列が見つからない場合は `WARNING`、ページにアクセスできない場合は `CRITICAL` という結果が得られます。

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

Awesome の `check` メソッドの前半では、2 つの要素をコンフィギュレーションファイルから取得して検証しています。これは、ユニットテストにかける候補として適切です。

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
インテグレーションはほぼ完了です。次に、必要なチェックアセットを追加します。

## インテグレーションアセットを入力する

`ddev` スキャフォールディングによって作成された以下のアセットセットには、インテグレーションに関連する情報を入力する**必要があります**。

`README.md`
: これには、Agent チェックのドキュメント、その設定方法、収集するデータ、サポート情報が含まれます。

`spec.yaml`
: これは `ddev` ツールを使用して `conf.yaml.example` を生成するために使用されます。詳しくは、[構成仕様][11]を参照してください。

`conf.yaml.example`
: これには、Agent チェックのデフォルト（または一例として）のコンフィギュレーションオプションが含まれます。**このファイルを手動で編集しないでください**。これは `spec.yaml` のコンテンツから生成されます。詳しくは、[コンフィギュレーションファイルのリファレンスドキュメント][12]を参照してください。

`manifest.json`
: タイトルやカテゴリーなど、Agent チェックのメタデータが格納されています。詳しくは、[マニフェストファイルリファレンスドキュメント][13]を参照してください。

`metadata.csv`
: これには、Agent チェックによって収集されたすべてのメトリクスのリストが含まれます。詳細については、[メトリクスメタデータファイルのリファレンスドキュメント][14]を参照してください。

`service_check.json`
: Agent チェックによって収集されたすべてのサービスチェックのリストが含まれています。詳しくは、[サービスチェックファイルリファレンスドキュメント][15]を参照してください。

`README.md` と `manifest.json` ファイルの詳細については、[タイルの作成][20]と[インテグレーションアセットリファレンス][33]をご覧ください。

## ホイールのビルド

`pyproject.toml` ファイルは、ホイールのパッケージ化とビルドに使用されるメタデータを提供します。ホイールはインテグレーションを機能させるために必要なファイルを含んでおり、これには Agent Check、構成例ファイル、ホイールビルド中に生成される成果物が含まれます。

メタデータファイルを含むすべての追加要素は、ホイールに含まれることを意図しておらず、Datadog プラットフォームとエコシステムによって他の場所で使用されます。

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

## タイルを入力し、インテグレーションを公開する

Agent ベースのインテグレーションを作成したら、インテグレーションタイルに表示される残りの[必須アセット][31]を入力し、プルリクエストを開くための情報については、[タイルの作成][20]ドキュメントを参照してください。

## Update your integration
To update your integration, edit the relevant files and open a new pull request to your integration's directory in the [`integrations-extras`][21] or [`marketplace`][22] repository. 

* If you are editing or adding new integration code, a version bump is required.

* If you are editing or adding new README content, manifest information, or assets such as dashboards and recommended monitors, a version bump is not needed. 

After making updates to assets such as dashboards and recommended monitors, or non-code files such as `README.md` and `manifest.json`, no further action is needed from the developer after the corresponding pull requests have been merged. These changes will show up for the customer without any action on their end. 

### Bumping an integration version 
In addition to any code changes, the following is required when bumping an integration version:
1. Update `__about__.py` to reflect the new version number. This file can be found in your integration's directory under `/datadog_checks/<your_check_name>/__about__.py`.
2. Add an entry to the CHANGELOG.md file that adheres to the following format:
   ```
   ## Version Number / Date

   ***Added***: 

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix
   ```
3. Update all references to the version number mentioned in `README.md` and elsewhere. Installation instructions in `README.md` often include the version number, which needs to be updated.

## 参考資料

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
[20]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile
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
[31]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile/#complete-the-necessary-integration-asset-files
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/ja/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/ja/metrics/