---
title: 新しいインテグレーションの設定
kind: documentation
aliases:
  - /ja/developers/integrations/integration_sdk/
  - /ja/developers/integrations/testing/
  - /ja/integrations/datadog_checks_dev/
  - /ja/guides/new_integration/
---
Agent ベースのインテグレーションが用意され、コアリポジトリに組み込んで Agent パッケージにバンドルできる状態だと見なされるには、いくつかの前提条件を満たす必要があります。

- 正しい形式と内容の `README.md` ファイル
- メトリクス収集を検証する一連のテスト
- 収集されるメトリクスをすべてリストした `metadata.csv` ファイル
- 完全な `manifest.json` ファイル
- サービスチェックを収集するインテグレーションの場合は、`service_checks.json` も必要です。

これらの要件は、コードレビュープロセスでチェックリストとして使用されます。このドキュメントでは、新しいインテグレーションの要件と実装の詳細について説明します。

## 前提条件

- システムで Python 3.8 以上を使用できる必要があります。Python 2.7 は任意ですが、推奨されます。
- フルテストスイートを実行するための Docker。

一般に、[Python 仮想環境][1]を作成して有効化することで、開発環境を独立させることが推奨されますが、これは必須ではありません。詳細については、[Python 環境のドキュメント][2]を参照してください。

## セットアップ

[integrations-extras リポジトリ][3]を複製します。デフォルトでは、このツールは `$HOME/dd/` ディレクトリで作業することを想定しています。ただし、これは任意で、後で構成によって調整できます。

```shell
mkdir $HOME/dd && cd $HOME/dd       # 任意
git clone https://github.com/DataDog/integrations-extras.git
```

### 開発ツールキット

総合的な[開発ツールキット][4]には、多数の機能が含まれます。最初に行う作業は次のとおりです。

```bash
pip3 install "datadog-checks-dev[cli]"
```

このリポジトリを `$HOME/dd/` 以外の場所に複製する場合は、構成ファイルの調整が必要になります。

```bash
ddev config set extras "/path/to/integrations-extras"
```

主に `integrations-extras` で作業する場合は、それをデフォルトの作業用リポジトリとして設定します。

```bash
ddev config set repo extras
```

**注**: このステップを行わない場合は、コンテキストが正しく `integrations-extras` になるように、すべての呼び出しで `-e` を使用する必要があります。

```bash
ddev -e COMMAND [OPTIONS]
```

## スキャフォールディング

開発ツールキットの機能に含まれる `create` コマンドは、新しいインテグレーションに必要な基本ファイルとパス構造 (「スキャフォールディング」) を作成します。

### ドライラン

ディスクに何も書き込まない `-n/--dry-run` フラグを使用して、ドライランを行ってみます。

```bash
ddev create -n Awesome
```

これで、ファイルが書き込まれるパスと、パス構造自体が表示されます。ここで確認が必要なのは、出力の _1 行目_のパスが Extras リポジトリと一致していることのみです。

### インタラクティブモード

インタラクティブモードは、新しいインテグレーションを作成するためのウィザードです。いくつかの質問に答えることで、事前構成された状態でスキャフォールディングが簡易にセットアップされます。

```bash
ddev create Awesome
```

質問に答えると上のドライランと同じ出力が得られますが、この場合は、新しいインテグレーションのスキャフォールディングが実際に作成されます。

## チェックの書き方

### はじめに

チェックは、次の要件を満たす Python クラスです。

- Agent v7 以降を介して実行されるインテグレーションは、Python 3 互換でなければなりません。ただし、Agent v5 および v6 は引き続き Python 2.7 を使用します。
- `AgentCheck` から派生されます。
- `check(self, instance)` というシグニチャを持つメソッドを提供する必要があります。

チェックは、標準 Python パッケージ内の `datadog_checks` ネームスペース以下に置かれるため、コードは `awesome/datadog_checks/awesome` の下に置く必要があります。要件は、パッケージ名とチェック名が同じでなければならないということだけです。パッケージ内の Python モジュールの名前やチェックを実装するクラスの名前に特別の制約はありません。

### チェックロジックの実装

Web ページ内の文字列を検索する `awesome.search` という名前のサービスチェックでのみ構成される Agent チェックを作成するとします。このチェックは、文字列が存在する場合は `OK`、ページにアクセスできるが文字列が見つからない場合は `WARNING`、ページにアクセスできない場合は `CRITICAL` という結果になります。Agent チェックでメトリクスを送信する方法については、[メトリクスの送信: カスタム Agent チェック][5]を参照してください。

`awesome/datadog_checks/awesome/check.py` のコードは次のようになります。

```python
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
```

基本 Python クラスの詳細は、[Python API のドキュメント][6]を参照してください。

### テストの書き方

テストには次の 2 つの基本的なタイプがあります。

- 特定の機能のユニットテスト。
- `check` メソッドを実行し、適切なメトリクス収集を検証するインテグレーションテスト。

`integrations-extras` にインテグレーションを追加する場合、テストは_必須_です。テストは [pytest][7] と [tox][8] を使用して実行されます。

詳細については、[Datadog Checks Dev のドキュメント][9]を参照してください。

#### ユニットテスト

`check` メソッドの前半では、2 つの要素をコンフィギュレーションファイルから取得して検証しています。これは、ユニットテストにかける候補として適切です。`awesome/tests/test_awesome.py` ファイルを開き、内容を次のように書き換えます。

```python
import pytest

# 忘れずにインテグレーションをインポートします
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

    # これでエラーになりません
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
```

`pytest` は_マーカー_をサポートし、これを使用してテストをカテゴリにグループ化できます。`test_config` が `unit` テストとしてマークされていることに注目してください。

スキャフォールディングは、`awesome/tests` にあるすべてのテストを実行するようにあらかじめセットアップされています。テストを実行します。

```bash
ddev test awesome
```

#### インテグレーションテストの構築

ユニットテストでは収集_ロジック_がチェックされないため、インテグレーションテストを追加しましょう。`docker` を使用して Nginx コンテナをスピンアップし、チェックで Welcome ページを取得します。次のような内容の Compose ファイルを `awesome/tests/docker-compose.yml` として作成します。

```yaml
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"
```

ここで、`awesome/tests/conftest.py` ファイルを開き、内容を次のように書き換えます。

```python
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # これは 3 つのことを行います。
    #
    # 1. Compose ファイルで定義されているサービスをスピンアップします
    # 2. URL にアクセスできるようになるまで待ってから、テストを実行します
    # 3. テストが終了したら、サービスを終了します
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
```

#### インテグレーションテスト

最後に、`awesome/tests/test_awesome.py` ファイルにインテグレーションテストを追加します。

```python
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
```

迅速に開発するには、`-m/--marker` オプションを使用して、インテグレーションテストのみを実行します。

```bash
ddev test -m integration awesome
```

これでチェックはほぼ完成です。インテグレーション構成を追加して、最後の仕上げを行いましょう。

### チェックアセットを作成する

チェックが含まれると見なされるためには、ddev スキャフォールディングによって作成されたアセットのセットにデータを入力する必要があります。

- **`README.md`**: これには、チェックのドキュメント、その設定方法、収集するデータなどが含まれます。
- **`spec.yaml`**: これは、`ddev` ツールを使用して `conf.yaml.example` を生成するのに使用されます（下記 "コンフィギュレーションテンプレート" タブ参照）。[詳細はコンフィギュレーション仕様書をご覧ください。][16]
- **`conf.yaml.example`**: これには、Agent チェックのデフォルト（または一例として）のコンフィギュレーションオプションが含まれます。このファイルを手動で編集しないでください！これは `spec.yaml` のコンテンツから生成されます。[そのロジックについては、コンフィギュレーションファイルのリファレンスドキュメントを参照してください。][10]
- **`manifest.json`**: これには、タイトルやカテゴリなどの Agent チェックのメタデータが含まれます。[詳細については、マニフェストのリファレンスドキュメントを参照してください。][11]
- **`metadata.csv`**: これには、Agent チェックによって収集されたすべてのメトリクスのリストが含まれます。[詳細については、メトリクスメタデータのリファレンスドキュメントを参照してください。][12]
- **`service_check.json`**: これには、Agent チェックによって収集されたすべてのサービスチェックのリストが含まれます。[詳細については、サービスチェックのリファレンスドキュメントを参照してください。][13]

この例では、これらのファイルは次の形式になります。

{{< tabs >}}
{{% tab "Configuration template" %}}

`awesome/assets/configuration/spec.yaml` は、`awesome/datadog_checks/awesome/data/conf.yaml.example` を生成するために使用されます。

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

`ddev` を使用して、`conf.yaml.example` を生成します。

```bash
ddev validate config --sync awesome
```

{{% /tab %}}
{{% tab "マニフェスト" %}}

Awesome サービスチェックの `awesome/manifest.json`。`guid` は一意 (かつ有効) でなければならないことに注意してください。したがって、この例のものを使用_しない_でください (いずれにしても、ツールによって自動的に生成されます)。

```json
{
  "display_name": "awesome",
  "maintainer": "email@example.org",
  "manifest_version": "1.0.0",
  "name": "awesome",
  "metric_prefix": "awesome.",
  "metric_to_check": "",
  "creates_events": false,
  "short_description": "",
  "guid": "x16b8750-df1e-46c0-839a-2056461b604x",
  "support": "contrib",
  "supported_os": ["linux", "mac_os", "windows"],
  "public_title": "Datadog-awesome Integration",
  "categories": ["web"],
  "type": "check",
  "is_public": false,
  "integration_id": "awesome",
  "assets": {
    "dashboards": {
      "Awesome Overview": "assets/dashboards/overview.json",
      "Awesome Investigation Dashboard": "assets/dashboards/investigation.json"
    },
    "monitors": {},
    "service_checks": "assets/service_checks.json"
  }
}
```

{{% /tab %}}
{{% tab "メタデータ" %}}

サンプルインテグレーションはメトリクスを送信しません。この場合、生成された `awesome/metadata.csv` には、CSV 列名を含む行だけが含まれます。

{{% /tab %}}
{{% tab "サービスチェック" %}}

サンプルインテグレーションはサービスチェックが含まれているため、`awesome/assets/service_checks.json` ファイルに追加する必要があります。

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

## ビルド

`setup.py` は、Wheel のパッケージ化とビルドを支援する setuptools セットアップスクリプトを提供します。Python パッケージの詳細については、[Python の公式ドキュメント][14]を参照してください。

`setup.py` が準備できたら、Wheel を作成します。

- `ddev` ツールを使用する (推奨): `ddev release build <INTEGRATION_NAME>`
- `ddev` ツールを使用しない: `cd <INTEGRATION_DIR> && python setup.py bdist_wheel`

### Wheel の内容

Wheel には、チェック、コンフィギュレーションのサンプルファイル、Wheel のビルド中に生成される成果物など、インテグレーション自体の機能に必要なファイルのみが含まれます。メタデータファイルなどのその他の要素を Wheel に入れることは_できません_。それらの要素は、さらに大きな Datadog プラットフォームおよびエコシステムによって別の場所で使用されます。

## インストール

Wheel は、[Agent v6.10.0 以上][15]で提供されている Agent の `integration` コマンドによってインストールされます。このコマンドは、環境に応じて、特定のユーザーとして、または特定の権限で実行する必要があります。

**Linux** (`dd-agent` として)

```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (管理者として)

```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows** (シェルセッションが administrator 権限を持っていること)

Agent バージョン < 6.11 の場合

```ps
"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

Agent バージョン >= 6.12 の場合

```ps
"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```

[1]: https://virtualenv.pypa.io/en/stable
[2]: /ja/developers/integrations/python
[3]: https://github.com/DataDog/integrations-extras
[4]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[5]: https://docs.datadoghq.com/ja/developers/metrics/agent_metrics_submission/
[6]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[7]: https://docs.pytest.org/en/latest
[8]: https://tox.readthedocs.io/en/latest
[9]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev#development
[10]: /ja/developers/integrations/check_references#configuration-file
[11]: /ja/developers/integrations/check_references#manifest-file
[12]: /ja/developers/integrations/check_references#metrics-metadata-file
[13]: /ja/developers/integrations/check_references#service-check-file
[14]: https://packaging.python.org/tutorials/distributing-packages
[15]: https://docs.datadoghq.com/ja/agent/
[16]: https://datadoghq.dev/integrations-core/meta/config-specs/