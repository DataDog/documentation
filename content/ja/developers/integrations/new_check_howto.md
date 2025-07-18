---
aliases:
- /ja/developers/integrations/integration_sdk/
- /ja/developers/integrations/testing/
- /ja/integrations/datadog_checks_dev/
- /ja/guides/new_integration/
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/new_check_howto.md
kind: documentation
title: Agent インテグレーションの作成
---
## 概要

このガイドでは、`integrations-extras` リポジトリに Datadog Agent インテグレーションを作成する手順を説明します。Agent ベースのインテグレーションを作成する理由については、[独自のソリューションを作成する][1]を参照してください。

## 前提条件

必要な Datadog Agent インテグレーション開発ツールは以下の通りです。

- Python v3.8、[pipx][2]、Agent Integration Developer Tool (`ddev`) が必要です。インストール方法については、[Datadog Agent Integration Developer Tool のインストール][3]を参照してください。
- フルテストスイートを実行するための [Docker][4]。
- git [コマンドライン][5]または [GitHub デスクトップクライアント][19]。

## integrations-extra リポジトリのセットアップ

以下の手順で、インテグレーション開発用のリポジトリをセットアップします。

1. `dd` ディレクトリを作成します。

   Datadog Development Toolkit は、`$HOME/dd/` ディレクトリで作業することを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

   `dd` ディレクトリを作成し、`integrations-extras` リポジトリを複製するには
   ```
   mkdir $HOME/dd && cd $HOME/dd
   ```

1. [`integrations-extras` リポジトリ][6]をフォークします。

1. フォークを `dd` ディレクトリに複製します。
   ```
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. 作業するフィーチャーブランチを作成します。
   ```
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## デベロッパーツールの構成

[Agent Integration Developer Tool][3] がインストールされていると仮定して、`integrations-extras` リポジトリに対してツールを構成します。

1. オプションとして、`integrations-extras` リポジトリが `$HOME/dd/` 以外の場所にある場合は、`ddev` 構成ファイルを調整します。
   ```
   ddev config set extras "/path/to/integrations-extras"
   ```

1. デフォルトの作業用リポジトリとして `integrations-extras` を設定します。
   ```
   ddev config set repo extras
   ```

## インテグレーションを作成する

Docker をダウンロードし、適切なバージョンの Python をインストールし、開発環境を準備したら、Agent ベースのインテグレーションの作成を始めることができます。以下の説明では、`Awesome` というインテグレーションのサンプルを使用します。Awesome のコードを参考にするか、Awesome を自分のコードに置き換えてください。

### インテグレーションのためのスキャフォールディングを作成する

`ddev create` コマンドは、新しい Agent ベースのインテグレーションに必要な基本的なファイルとパスの構造 (または "スキャフォールディング") を作成するインタラクティブツールを実行します。

1. 最初のインテグレーションディレクトリを作る前に、ディスクに何も書き込まない `-n/--dry-run` フラグを使って、ドライランを試してみてください。
   ```
   ddev create -n Awesome
   ```

   このコマンドで、ファイルが書き込まれるパスと、パス構造自体が表示されます。出力の 1 行目のパスが `integrations-extras` リポジトリの場所と一致していることを確認します。

1. コマンドを `-n` フラグを付けずに実行します。このツールは、メールと名前の入力を求め、インテグレーションを始めるために必要なファイルを作成します。
   ```
   ddev create Awesome
   ```

## Agent チェックを書く

各 Agent ベースのインテグレーションの核となるのは、定期的に情報を収集し Datadog に送信する *Agent チェック*です。チェックは、`AgentCheck` ベースクラスからそのロジックを継承し、以下の要件を持っています。

- Datadog Agent v7 以降で実行するインテグレーションには、Python 3 との互換性が必要ですが、Agent v5 と v6 では、まだ Python 2.7 を使用しています。
- チェックは `AgentCheck` から派生している必要があります。
- チェックは、このシグネチャを持つメソッド `check(self, instance)` を提供しなければなりません。
- チェックは通常の Python パッケージの中で、`datadog_checks` ネームスペースの下にまとめられています。例えば、Awesome のコードは `awesome/datadog_checks/awesome/` ディレクトリに格納されています。
- パッケージ名は、チェック名と同じでなければなりません。
- そのパッケージ内の Python モジュールの名称や、チ ェックを実装するクラスの名称には制限がありません。

### チェックロジックの実装

Awesome の場合、Agent チェックは `awesome.search` という名前のサービスチェックで構成されており、Web ページ上の文字列を検索します。文字列が存在する場合は `OK`、ページにアクセスできるが文字列が見つからない場合は `WARNING`、ページにアクセスできない場合は `CRITICAL` という結果になります。Agent チェックでメトリクスを送信する方法については、[カスタム Agent チェック][7]を参照してください。

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

テストには次の 2 つの基本的なタイプがあります。

- [特定の機能のユニットテスト。](#write-a-unit-test)
- [`check` メソッドを実行し、適切なメトリクス収集を検証するインテグレーションテスト。](#write-an-integration-test)

[pytest][9] と [hatch][10] はテストを実行するために使用されます。インテグレーションを `integrations-extras` リポジトリに含めたい場合は、テストが必要です。

### ユニットテストを書く

Awesome の `check` メソッドの前半では、2 つの要素をコンフィギュレーションファイルから取得して検証しています。これは、ユニットテストにかける候補として適切です。`awesome/tests/test_awesome.py` ファイルを開き、内容を次に書き換えます。

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

スキャフォールディングは、`awesome/tests` にあるすべてのテストを実行するように設定されています。

テストを実行するには、以下を実行します。
```
ddev test awesome
```

### インテグレーションテストを書く

[上記のユニットテスト](#write-a-unit-test)では、コレクションロジックはチェックされません。ロジックをテストするには、インテグレーションテストのための環境を作り、インテグレーションテストを書く必要があります。

#### インテグレーションテスト用の環境を作成する

このツールキットは `docker` を使って Nginx コンテナをスピンアップし、チェックにウェルカムページを取得させることができます。

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

## チェックアセットを作成する

チェックが `integrations-extras` で考慮されるためには、`ddev` スキャフォールディングによって作成されたアセットのセットにデータを入力する必要があります。

`README.md`
: これには、Agent チェックのドキュメント、その設定方法、収集するデータ、サポート情報が含まれます。

`spec.yaml`
: これは `ddev` ツールを使用して `conf.yaml.example` を生成するために使用されます (以下の**構成テンプレート**タブを参照してください)。詳しくは、[構成仕様][11]を参照してください。

`conf.yaml.example`
: これには、Agent チェックのデフォルト（または一例として）のコンフィギュレーションオプションが含まれます。**このファイルを手動で編集しないでください！**これは `spec.yaml` のコンテンツから生成されます。詳しくは、[コンフィギュレーションファイルのリファレンス][12]を参照してください。

`manifest.json`
: タイトルやカテゴリーなど、Agent チェックのメタデータが格納されています。詳しくは、[マニフェストファイルリファレンス][13]を参照してください。

`metadata.csv`
: これには、Agent チェックによって収集されたすべてのメトリクスのリストが含まれます。詳細については、[メトリクスメタデータファイルのリファレンス][14]を参照してください。

`service_check.json`
: Agent チェックによって収集されたすべてのサービスチェックのリストが含まれています。詳しくは、[サービスチェックファイルリファレンス][15]を参照してください。

{{< tabs >}}
{{% tab "Configuration template" %}}

この例では、`awesome/assets/configuration/spec.yaml` を使用して `awesome/datadog_checks/awesome/data/conf.yaml.example` を生成すると、以下のような形式になります。
```yaml
name: Awesome
files:
- name: awesome.yaml
  options:
  - template: init_config
    options:
    - template: init_config/default
  - template: instances
    options:
    - name: url
      required: true
      description: The URL to check.
      value:
        type: string
        example: http://example.org
    - name: search_string
      required: true
      description: The string to search for.
      value:
        type: string
        example: Example Domain
    - name: flag_follow_redirects
      # 必須: false は暗黙的です。コメントは起きていることを確認するためのものです。
      required: false
      description: Follow 301 redirects.
      value:
        type: boolean
        example: false
    # これらのテンプレートを転置して、様子をみてください。
    #- template: instances/http
- template: instances/default
```

`ddev` を使って `conf.yaml.example` を生成するには、以下を実行します。
```bash
ddev validate config --sync awesome
```

{{% /tab %}}
{{% tab "マニフェスト" %}}

この例では、Awesome サービスチェック用の `awesome/manifest.json` は、以下のような形式になります。
```json
{
  "manifest_version": "2.0.0",
  "app_uuid": "79eb6e54-2110-4d50-86c3-f7037d1a9daa", // この例の UUID は使用しないでください。UUID は一意で有効なものでなければなりません。
  "app_id": "awesome",
  "classifier_tags": [
    "Supported OS::Linux",
    "Supported OS::macOS",
    "Supported OS::Windows"
  ],
  "display_on_public_website": false,
  "tile": {
    "overview": "README.md#Overview",
    "configuration": "README.md#Setup",
    "support": "README.md#Support",
    "changelog": "CHANGELOG.md",
    "description": "",
    "title": "Awesome",
    "media": []
  },
  "author": {
    "support_email": "email@example.org"
  },
  "oauth": {},
  "assets": {
    "integration": {
      "source_type_name": "Awesome",
      "configuration": {
        "spec": "assets/configuration/spec.yaml"
      },
      "events": {
        "creates_events": false
      },
      "metrics": {
        "prefix": "awesome.",
        "check": "",
        "metadata_path": "metadata.csv"
      },
      "service_checks": {
        "metadata_path": "assets/service_checks.json"
      }
    }
  }
}
```

{{% /tab %}}
{{% tab "メタデータ" %}}

この例では、Awesome インテグレーションはメトリクスを提供していないので、この場合、生成される `awesome/metadata.csv` には列名を含む行のみが含まれます。

{{% /tab %}}
{{% tab "サービスチェック" %}}

この例では、Awesome インテグレーションにサービスチェックが含まれているので、それを `awesome/assets/service_checks.json` ファイルに追加する必要があります。
```json
[
  {
    "agent_version": "6.0.0",
    "integration": "awesome",
    "check": "awesome.search",
    "statuses": ["ok", "warning", "critical"],
    "groups": [],
    "name": "Awesome search!",
    "description": "チェックがページにアクセスできない場合は `CRITICAL`、検索文字列が見つからなかった場合は `WARNING`、それ以外の場合は `OK` を返します。"
  }
]
```

{{% /tab %}}
{{< /tabs >}}

## ホイールのビルド

`pyproject.toml` ファイルは、ホイールのパッケージ化とビルドに使用されるメタデータを提供します。ホイールはインテグレーションを機能させるために必要なファイルを含んでおり、これにはチェック、構成例ファイル、ホイールのビルド中に生成される成果物が含まれます。

メタデータファイルを含むすべての追加要素は、ホイールに含まれることを意図しておらず、Datadog プラットフォームとエコシステムによって他の場所で使用されます。Python のパッケージングについてより詳しく知りたい場合は、[Python プロジェクトのパッケージング][16]を参照してください。

`pyproject.toml` が準備できたら、Wheel を作成します。

- (推奨) `ddev` ツールを使用する: `ddev release build <INTEGRATION_NAME>`
- `ddev` ツールを使用しない: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`

## ホイールのインストール

Wheel は、[Agent v6.10.0 以上][17]で提供されている Agent の `integration` コマンドを使ってインストールされます。このコマンドは、環境に応じて、特定のユーザーとして、または特定の権限で実行する必要があります。

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

## インテグレーションを公開するためのチェックリストを確認する

Agent ベースのインテグレーションを作成した後、このリストを参照して、インテグレーションに必要なファイルと検証がすべて含まれていることを確認します。

- 正しい形式と内容の `README.md` ファイル。
- メトリクス収集を検証する一連のテスト。
- 収集されるメトリクスをすべてリストした `metadata.csv` ファイル。
- 完全な `manifest.json` ファイル。
- サービスチェックを収集するインテグレーションの場合は、`service_checks.json` も必要です。

プルリクエストを出す前に、以下のコマンドを実行して、インテグレーションに問題がないことを確認します。
```
ddev validate all <INTEGRATION_NAME>
```

プルリクエストを作成すると、自動チェックが実行され、プルリクエストが正常な状態であること、更新に必要なコンテンツがすべて含まれていることが確認されます。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [API コールによるインテグレーションの管理][18]
- [Agent ベースのインテグレーション開発のための Python][3]

[1]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: /ja/developers/integrations/python/
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
[18]: https://www.datadoghq.com/blog/programmatically-manage-your-datadog-integrations/
[19]: https://desktop.github.com/