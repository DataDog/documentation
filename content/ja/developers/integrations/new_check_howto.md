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

* 正しい形式の `README.md` ファイル
* メトリクス収集を検証する一連のテスト
* UI タイルで使用する画像一式
* 収集されるメトリクスをすべてリストした `metadata.csv` ファイル
* 完全な `manifest.json` ファイル
* サービスチェックを収集するインテグレーションの場合は、`service_checks.json` も必要です。

これらの要件は、コードレビュープロセスでチェックリストとして使用されます。このドキュメントでは、新しいインテグレーションの要件と実装の詳細について説明します。

## 前提条件

* システムで Python 3.7 以上を使用できる必要があります。Python 2.7 は任意ですが、推奨されます。
* フルテストスイートを実行するための Docker。

一般に、[Python 仮想環境][1]を作成して有効化することで、開発環境を独立させることが推奨されますが、これは必須ではありません。詳細については、[Python 環境のドキュメント][2]を参照してください。

## セットアップ

[integrations-extras リポジトリ][3]を複製します。デフォルトでは、このツールは `$HOME/dd/` ディレクトリで作業することを想定しています。ただし、これは任意で、後で構成によって調整できます。

```shell
mkdir $HOME/dd && cd $HOME/dd       # 任意
git clone https://github.com/DataDog/integrations-extras.git
```

### 開発ツールキット

総合的な[開発ツールキット][4]には、多数の機能が含まれます。最初に行う作業は次のとおりです。

```
pip install "datadog-checks-dev[cli]"
```

このリポジトリを `$HOME/dd/` 以外の場所に複製する場合は、構成ファイルの調整が必要になります。

```
ddev config set extras "/path/to/integrations-extras"
```

主に `integrations-extras` で作業する場合は、それをデフォルトの作業用リポジトリとして設定します。

```
ddev config set repo extras
```

**注**: このステップを行わない場合は、コンテキストが正しく `integrations-extras` になるように、すべての呼び出しで `-e` を使用する必要があります。

```
ddev -e COMMAND [OPTIONS]
```

## スキャフォールディング

開発ツールキットの機能に含まれる `create` コマンドは、新しいインテグレーションに必要な基本ファイルとパス構造 (「スキャフォールディング」) を作成します。

### ドライラン

ディスクに何も書き込まない `-n/--dry-run` フラグを使用して、ドライランを行ってみます。

```
ddev create -n awesome
```

これで、ファイルが書き込まれるパスと、パス構造自体が表示されます。ここで確認が必要なのは、出力の 1 行目のパスが Extras リポジトリと一致していることのみです。

### インタラクティブモード

インタラクティブモードは、新しいインテグレーションを作成するためのウィザードです。いくつかの質問に答えることで、事前構成された状態でスキャフォールディングが簡易にセットアップされます。

```
ddev create awesome
```

質問に答えると上のドライランと同じ出力が得られますが、この場合は、新しいインテグレーションのスキャフォールディングが実際に作成されます。

## チェックの書き方

### はじめに

チェックは、次の要件を満たす Python クラスです。

* `AgentCheck` から派生されます。
* `check(self, instance)` というシグニチャを持つメソッドを提供する必要があります。

チェックは、標準 Python パッケージ内の `datadog_checks` ネームスペース以下に置かれるため、コードは `awesome/datadog_checks/awesome` の下に置く必要があります。要件は、パッケージ名とチェック名が同じでなければならないということだけです。パッケージ内の Python モジュールの名前やチェックを実装するクラスの名前に特別の制約はありません。

### チェックロジックの実装

Web ページ内の文字列を検索する `awesome.search` という名前のサービスチェックを作成するとします。このチェックは、文字列が存在する場合は `OK`、ページにアクセスできるが文字列が見つからない場合は `WARNING`、ページにアクセスできない場合は `CRITICAL` という結果になります。

`awesome/datadog_checks/awesome/awesome.py` のコードは次のようになります。

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

基本 Python クラスの詳細は、[Python API のドキュメント][5]を参照してください。

### テストの書き方

テストには、ユニットテストとインテグレーションテストという基本的な 2 つの種類があります。ユニットテストは特定の機能を検証し、インテグレーションテストは `check` メソッドを実行してメトリクスが適切に収集されているかを検証します。`integrations-extras` にインテグレーションを追加する場合、テストは**必須です**。テストは [pytest][6] と [tox][7] を使用して実行されます。

詳細については、[Datadog Checks Dev のドキュメント][8]を参照してください。

#### ユニットテスト

`check` メソッドの前半では、必要な 2 つの情報を構成ファイルから取得して検証しています。これは、ユニットテストにかける候補として適切です。`awesome/tests/test_awesome.py` ファイルを開き、内容を次のように書き換えます。

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

`pytest` は**マーカー**をサポートし、これを使用してテストをカテゴリにグループ化できます。`test_config` が `unit` テストとしてマークされていることに注目してください。

スキャフォールディングは、`awesome/tests` にあるすべてのテストを実行するようにあらかじめセットアップされています。テストを実行します。

```
ddev test awesome
```

#### インテグレーションテストの構築

ユニットテストでは収集**ロジック**がチェックされないため、インテグレーションテストを追加しましょう。`docker` を使用して Nginx コンテナをスピンアップし、チェックで Welcome ページを取得します。次のような内容の Compose ファイルを `awesome/tests/docker-compose.yml` として作成します。

```yaml
version: '3'

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

```
ddev test -m integration awesome
```

これでチェックはほぼ完成です。インテグレーション構成を追加して、最後の仕上げを行いましょう。

## コンフィグレーション

### README への入力

正しい形式の `awesome/README.md` ファイルが既にスキャフォールディングによって用意されています。このドキュメントに関連情報を入力する必要があります。

### 構成ファイル

新しいインテグレーションを用意する際は、必要なオプションと適正なデフォルトを設定した構成サンプルを追加する必要があります。この例のサンプル構成ファイルは `awesome/datadog_checks/awesome/data/conf.yaml.example` にあり、`init_config` と `instances` という 2 つのトップレベル要素を持っています。`init_config` 下の構成はインテグレーションにグローバルに適用され、インテグレーションのすべてのインスタンスで使用されます。一方、`instances` 内の構成は特定のインスタンスに適用されます。

どちらのセクションの構成ブロックも次の形式になります。

```yaml
## @<COMMAND> [- <ARGS>]
## <DESCRIPTION LINE 1>
## <DESCRIPTION LINE 2>
#
<KEY>: <VALUE>
```

構成ブロックは以下のガイドラインに従います。

* 説明を空にすることはできません。
* [ドキュメント寄稿ガイドライン][9]に準拠して、プレースホルダーは常に `<THIS_IS_A_PLACEHOLDER>` の形式に従う必要があります。
* すべての必須パラメーターはデフォルトでコメントに**されません**。
* すべてのオプションパラメーターはデフォルトでコメントにされます。
* プレースホルダーにインテグレーションのデフォルト値がある場合 (たとえば、インテグレーションのステータスエンドポイント)、それを汎用プレースホルダーの代わりに使用できます。

#### @param の指定

事実上 `@param` が唯一のコマンドです。`@param` は、主に文書化の目的で構成ブロックについて説明するために使用され、以下のいずれかの形式を使用して実装されます。

```
@param <name> - <type> - required
@param <name> - <type> - optional
@param <name> - <type> - optional - default: <defval>
```

引数

* `name`: パラメーターの名前。例: `search_string` (必須)。
* `type`: パラメーター値のデータタイプ (必須)。使用可能な値:
  * boolean
  * string
  * integer
  * double
  * float
  * dictionary
  * list&#42;
  * object
* `defval`: パラメーターのデフォルト値。空でもかまいません (オプション)。

`list` および `object` 変数は複数行にまたがり、特別な規則があります。

* `list` の個々の要素は、`@param` 指定を使用して文書化されません。
* `object` の場合は、`@param` 指定を使用して要素を個別に文書化することも、オブジェクト自体の指定に続けてトップレベルに共通の説明を付けることもできます。

#### オプションパラメーター

オプションパラメーターはデフォルトでコメントにする必要があります。パラメーターの記述に使用される各行の前に、`@param` 指定と同じインデントで `# ` (空白があることに注意) を追加します。

#### ブロックコメント

次の規則に従って、構成ファイルの任意の場所にブロックコメントを追加できます。

* コメントは `## ` (空白があることに注意) で開始されます。
* コメントは変数と同様にインデントされます (ハイフンはカウントされません)。


#### 構成サンプル

Awesome サービスチェックの `awesome/datadog_checks/awesome/data/conf.yaml.example`

```yaml
init_config:
  ## init_config 部分の中のブロック
  ## コメント。

## init_config 部分の外の
## ブロックコメント。

instances:

    ## @param url - string - required
    ## チェックする URL
    ## (ハイフンでインデントします)
    #
  - url: http://example.org

    ## @param search_string - string - required
    ## 検索対象の文字列
    #
    search_string: "Example Domain"

    ## @param user - object - optional
    ## ユーザーは次の構造にマップされます
    ## {'name': ['<FIRST_NAME>', '<LAST_NAME>'], 'username': <USERNAME>, 'password': <PASSWORD>}
    #
    # user:
    #   name:
    #     - <FIRST_NAME>
    #     - <LAST_NAME>
    #   username: <USERNAME>
    #   password: <PASSWORD>

    ## @param options - object - required
    ## 設定可能なオプションフラグ
    #
    options:

      ## @param follow_redirects - boolean - optional - default: false
      ## true に設定すると 301 リダイレクトになります
      #
      # follow_redirects: false

```

YAML 構文の詳細については、[Wikipedia][17] を参照してください。[Online YAML Parser][18] も活用してください。

### マニフェストファイル

各インテグレーションには `manifest.json` ファイルが含まれています。これには、オペレーティングパラメーター、さらに大きな Datadog インテグレーションエコシステム内の配置などが記述されます。

以下に、`manifest.json` ファイルの必須属性とオプション属性をすべてリストします。

| 属性            | 型            | 必須/オプション | 説明                                                                                                                                                                                                              |
| -------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integration_id`     | 文字列          | 必須          | このインテグレーションを一意に識別する名前。通常は表示名のケバブケース。                                                                                                                                  |
| `categories`         | 文字列の配列 | 必須          | [公開ドキュメントのインテグレーションページ][10]で使用されるインテグレーションカテゴリ。                                                                                                                                         |
| `creates_events`     | Boolean         | 必須          | インテグレーションがイベントを作成できるかどうか。これが `false` に設定された場合は、インテグレーションからイベントを作成しようとするとエラーになります。                                                                   |
| `display_name`       | 文字列          | 必須          | [公開ドキュメントのインテグレーションページ][10]と Datadog アプリケーションの対応するインテグレーションタイルに表示されるタイトル。                                                                                 |
| `guid`               | 文字列          | 必須          | インテグレーションの一意の ID。[UUID を生成します][11]。                                                                                                                                                                     |
| `is_public`          | Boolean         | 必須          | `false` に設定されると、インテグレーションの `README.md` コンテンツは Datadog 公開ドキュメントのインデックスにボットによって掲載されません。                                                                                                        |
| `maintainer`         | 文字列          | 必須          | インテグレーションの所有者の電子メール。                                                                                                                                                                                   |
| `manifest_version`   | 文字列          | 必須          | 現在のマニフェストのバージョン。                                                                                                                                                                                         |
| `name`               | 文字列          | 必須          | インテグレーションの一意の名前。このパラメーターにはフォルダー名を使用します。                                                                                                                                                 |
| `public_title`       | 文字列          | 必須          | ドキュメントに表示されるインテグレーションのタイトル。`Datadog-<INTEGRATION_NAME> integration` の形式に従う必要があります。                                                                                   |
| `short_description`  | 文字列          | 必須          | このテキストは、インテグレーションページで、インテグレーションタイルの先頭およびインテグレーションのロールオーバーテキストに表示されます。最大 80 文字。                                                                         |
| `support`            | 文字列          | 必須          | インテグレーションの所有者。                                                                                                                                                                                                |
| `supported_os`       | 文字列の配列 | 必須          | サポートされている OS のリスト。`linux`、`mac_os`、`windows` から選択します。                                                                                                                                                     |
| `type`               | 文字列          | 必須          | インテグレーションの種類。`check` に設定する必要があります。                                                                                                                                                                       |
| `aliases`            | 文字列の配列 | オプション           | Datadog ドキュメントの URL エイリアスのリスト。                                                                                                                                                                     |
| `description`        | 文字列          | オプション           | このテキストは、インテグレーションドキュメントのリンクを共有したときに表示されます。                                                                                                                                                        |
| `is_beta`            | Boolean         | オプション           | デフォルトは `false` です。`true` に設定されると、インテグレーションの `README.md` コンテンツは Datadog 公開ドキュメントに表示されません。                                                                                              |
| `metric_to_check`    | 文字列          | オプション           | このメトリクスが存在するかどうかで、このインテグレーションが正しく動作しているかどうかが判定されます。インテグレーションがインストールされているのに、このメトリクスが報告されていない場合、このインテグレーションは Datadog アプリケーションで破損しているとマークされます。 |
| `metric_prefix`      | 文字列          | オプション           | このインテグレーションのメトリクスのネームスペース。このインテグレーションによって報告されるすべてのメトリクスの先頭にこの値が付加されます。                                                                                               |
| `process_signatures` | 文字列の配列 | オプション           | このインテグレーションのコマンドラインに一致するシグニチャのリスト。                                                                                                                                                  |
| `assets`       | 辞書 | 必須          | アセットファイルが存在する相対的場所とそれぞれの名前。                                                                                                                                             |
| `assets`-> `dashboards`       | 辞書 | 必須          | (すべてのインテグレーションでグローバルに一意の) ダッシュボードの名前をキーとし、ダッシュボード定義がある場所の相対ファイルパスを値とする辞書。                                                                                                      |
| `assets`-> `monitors`       | 辞書 | 必須          | (すべてのインテグレーションでグローバルに一意の) モニターの名前をキーとし、ダッシュボード定義がある場所の相対ファイルパスを値とする辞書。                                                                                                                                              |
| `assets`-> `service_checks`       | 文字列 | 必須          | `service_checks.json` ファイルが存在する相対的な場所。                                                                       |

##### manifest config の例

サンプルインテグレーションの `awesome/manifest.json` は極めて単純です。大部分はツールによって生成されます。`guid` は一意 (かつ有効) である必要があるため、このサンプルのものは使用しないでください。いずれにしても、ツールによって自動的に生成されます。

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
  "supported_os": [
    "linux",
    "mac_os",
    "windows"
  ],
  "public_title": "Datadog-awesome Integration",
  "categories": [
    "web"
  ],
  "type": "check",
  "is_public": false,
  "integration_id": "awesome",
  "assets": {
    "dashboards": {},
    "monitors": {},
    "service_checks": "assets/service_checks.json"
  }
}
```

#### メトリクスメタデータファイル

`metadata.csv` ファイルには、インテグレーションが収集できるすべてのメトリクスが記述されます。

`metadata.csv` ファイルの各列について以下に説明します。

| 列名     | 必須/オプション | 説明                                                                                                                                                                     |
| ---             | ----               | ----                                                                                                                                                                            |
| `metric_name`   | 必須          | メトリクスの名前。                                                                                                                                                             |
| `metric_type`   | 必須          | [メトリクスのタイプ][12]。                                                                                                                                                       |
| `interval`      | オプション           | メトリクスの収集間隔 (秒単位)。                                                                                                                                    |
| `unit_name`     | オプション           | メトリクスの単位。[サポートされているすべての単位のリスト][13]                                                                                                                     |
| `per_unit_name` | オプション           | 単位の下位区分がある場合。`request per second` (1 秒あたりのリクエスト) など。                                                                                                                       |
| `description`   | オプション           | メトリクスの説明。                                                                                                                                                      |
| `orientation`   | 必須          | `myapp.turnover` のように、大きい方がよいメトリクスの場合は `1` に設定します。メトリクスの変動が特に重要でない場合は `0` に設定します。`myapp.latency` のように、小さい方がよいメトリクスの場合は `-1` に設定します。 |
| `integration`   | 必須          | メトリクスを送信するインテグレーションの名前。これは、`manifest.json` ファイルにある `display_name` を正規化した文字列です。文字、アンダースコア、ダッシュ、数字以外の文字はアンダースコアに変換されます。例: `Openstack Controller` -> `openstack_controller`、`ASP.NET` -> `asp_net`、`CRI-o` -> `cri-o`。                                                                                                                                |
| `short_name`    | 必須          | メトリクスの明示的な一意の ID。                                                                                                                                              |

##### metadata config の例

サンプルインテグレーションはメトリクスを送信しません。この場合、生成された `awesome/metadata.csv` には、CSV 列名を含む行だけが含まれます。

#### サービスチェックファイル

`service_check.json` ファイルは、インテグレーションによって作成されたサービスチェックを記述します。

`service_checks.json` ファイルには、次の必須属性が含まれています。

| 属性       | 説明                                                                                                              |
| ----            | ----                                                                                                                     |
| `agent_version` | サポートされている Agent の最小バージョン。                                                                                         |
| `integration`   | このサービスチェックを送信するインテグレーションの名前。これは、`manifest.json` にある正規化されていない `display_name` です。                                                                                                      |
| `check`         | サービスチェックの名前。一意である必要があります。                                                                            |
| `statuses`      | チェックのさまざまなステータスのリスト。`ok`、`warning`、`critical` から選択します。`unknown` も可能です。 |
| `groups`        | サービスチェックと共に送信される[タグ][14]。                                                                                  |
| `name`          | サービスチェックの表示名。表示名はわかりやすく、すべてのインテグレーションで一意である必要があります。                             |
| `description`   | サービスチェックの説明。                                                                                         |

##### サービスチェック config の例

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
        "description": "Returns `CRITICAL` if the check can't access the page, `WARNING` if the search string was not found, or `OK` otherwise."
    }
]
```

### 画像とロゴの追加

次は画像とロゴのディレクトリ構造です。

```
    awesome/
    ├── images
    │   └── an_awesome_image.png
    ├── assets
    │   └── logos/
            ├── avatars-bot.png
            ├── saas_logos-bot.png
            └── saas_logos-small.png
```

`images` フォルダーには、インテグレーションタイルで使用されるすべての画像が含まれています。画像は、`README.md` の `## Overview` セクションや `## Setup` セクションで、それぞれのパブリック URL を使用してマークダウン画像として参照されます。`integrations-core` および `integrations-extras` リポジトリはパブリックなので、`https://raw.githubusercontent.com` からこれらのファイルのパブリック URL を取得できます。

```markdown
![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/awesome/images/snapshot.png)
```

`assets/logos/` ディレクトリには、ファイル名とサイズが次の仕様に完全に一致する **3 つ**の画像が含まれている必要があります。仕様の下には、その画像が Web アプリ内に表示される場所がリストされています。

#### saas_logos-bot.png (200 × 128)

* インテグレーションタイル画像: `/account/settings`
* 説明見出し: `/account/settings#integrations/{integration_name}`
* インテグレーションモニタータイルと検索バー結果の画像: `/monitors#create/integration`

#### saas_logos-small.png (120 × 60)

* インテグレーションダッシュボードリスト画像: `/dash/list`
* 一部のインテグレーションダッシュボード/スクリーンボード: `/dash/integration/{integration_dash_name}`

#### avatars-bot.png (128 × 128)

* イベントストリーム: `/event/stream`
* 通知アイコン: `/report/monitor`

### ビルド

`setup.py` は、Wheel のパッケージ化とビルドを支援する setuptools セットアップスクリプトを提供します。Python パッケージの詳細については、[Python の公式ドキュメント][15]を参照してください。

`setup.py` が準備できたら、Wheel を作成します。

- `ddev` ツールを使用する (推奨): `ddev release build <INTEGRATION_NAME>`
- `ddev` ツールを使用しない: `cd <INTEGRATION_DIR> && python setup.py bdist_wheel`

#### Wheel の内容

Wheel には、インテグレーション自体の機能に必要なファイルしか入っていません。これには、チェック自体、構成のサンプルファイル、および Wheel のビルド中に生成されるいくつかの成果物が含まれます。画像、メタデータファイルなどのその他の要素を Wheel に入れることはできません。それらの要素は、さらに大きな Datadog プラットフォームおよびエコシステムによって別の場所で使用されます。

### インストール

Wheel は、[Agent v6.10.0 以上][16]で提供されている Agent の `integration` コマンドによってインストールされます。このコマンドは、環境に応じて、特定のユーザーとして、または特定の権限で実行する必要があります。

**Linux** (`dd-agent` として)
```
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (管理者として)
```
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows** (シェルセッションが administrator 権限を持っていること)

Agent バージョン <= 6.11 の場合
```
"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

Agent バージョン >= 6.12 の場合
```
"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```


[1]: https://virtualenv.pypa.io/en/stable
[2]: /ja/developers/integrations/python
[3]: https://github.com/DataDog/integrations-extras
[4]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[5]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[6]: https://docs.pytest.org/en/latest
[7]: https://tox.readthedocs.io/en/latest
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev#development
[9]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[10]: https://docs.datadoghq.com/ja/integrations
[11]: https://www.uuidgenerator.net
[12]: https://docs.datadoghq.com/ja/developers/metrics/#metric-types
[13]: https://docs.datadoghq.com/ja/developers/metrics/#units
[14]: https://docs.datadoghq.com/ja/getting_started/tagging
[15]: https://packaging.python.org/tutorials/distributing-packages
[16]: https://docs.datadoghq.com/ja/agent/?tab=agentv6
[17]: https://en.wikipedia.org/wiki/YAML
[18]: http://yaml-online-parser.appspot.com/