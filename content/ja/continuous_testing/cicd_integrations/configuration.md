---
aliases:
- /ja/synthetics/cicd_integrations/configuration
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/synthetics/README.md
description: CI/CD パイプラインでテストを実行するための Continuous Testing の構成
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: ブログ
  text: Datadog の GitHub Action を使用して、ワークフローに Continuous Testing を追加します
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: Continuous Testing と CI/CD について
- link: /continuous_testing/explorer
  tag: ドキュメント
  text: Synthetic Monitoring & Continuous Testing Explorer について
- link: /continuous_testing/testing_tunnel
  tag: ドキュメント
  text: Continuous Testing Tunnel について
title: Continuous Testing と CI/CD の構成
---
<div class="alert alert-info">このページでは、継続的インテグレーション (CI) と継続的デリバリー (CD) のパイプラインの Continuous Testing テストの構成について説明します。CI のメトリクスやデータを Datadog のダッシュボードに取り込みたい場合は、<a href="https://docs.datadoghq.com/continuous_integration/" target="_blank">CI Visibility</a> のセクションを参照してください。</div>

## 概要

NPM パッケージの `@datadog-ci` を使用すると、CI/CD パイプライン内で直接 Continuous Testing テストを実行することができます。Synthetic ブラウザテストがリグレッションを検出した場合、自動的にビルドを停止し、デプロイをブロックし、デプロイをロールバックすることが可能です。

テストがどの URL から始まるかを構成するには、テストオブジェクトに `startUrl` を指定します。テストのオリジナルの開始 URL の任意の部分を使って、環境変数を含めて独自の開始 URL を構築します。

## セットアップ

### パッケージのインストール

{{< tabs >}}
{{% tab "NPM" %}}

NPM からパッケージをインストールします。

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Yarn からパッケージをインストールします。

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab %}}
{{< /tabs >}}

### クライアントのセットアップ

クライアントをセットアップするには、Datadog API キーとアプリケーションキーを構成する必要があります。これらのキーは次の 3 つの方法で定義できます。

1. 環境変数として定義されています:

   ```bash
   export DATADOG_API_KEY="<API_KEY>"
   export DATADOG_APP_KEY="<APPLICATION_KEY>"
   ```

2. テストの実行中に CLI に渡す

   ```bash
   yarn datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
   ```

3. または[グローバル JSON コンフィギュレーションファイル](#global-configuration-file-options)で定義されています。

   システム上に JSON コンフィギュレーションファイルを作成します。[テストの起動時](#run-tests)に `--config` フラグを使用してファイルへのパスを指定します。ファイルパスを指定しない場合、Datadog はデフォルトのファイル名である `datadog-ci.json` を使用します。

### グローバルコンフィギュレーションファイルのオプション

テストを実行する際には、コマンドラインで `--config` フラグを使用して、グローバルコンフィグレーションファイルのパスを指定します。

グローバルコンフィギュレーションファイルの高度なオプションの一覧は、以下を参照してください。コンフィギュレーションファイルの例としては、この [`global.config.json` ファイル][9]を参照してください。

`apiKey`
: Datadog API にクエリーを送信する際に使用される API キー。

`appKey`
: Datadog API にクエリーを送信する際に使用されるアプリケーションキー。

`datadogSite`
: リクエストの送信先となる Datadog インスタンス。デフォルトは `datadoghq.com`。Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。

`failOnCriticalErrors`
: テストがトリガーされなかったり、Datadog から結果を取得できなかった場合に CI ジョブを失敗させるためのブーリアンフラグ。デフォルトでは `false` に設定されています。

`failOnMissingTests`
: 公開 ID (`--public-id` CLI 引数、または[テストファイル](#test-files)にリストされている) を持つ指定したテストが少なくとも 1 つ実行中に見つからない場合 (例えば、プログラム的に削除されたか Datadog サイトで削除された場合)、CI ジョブが失敗するブール値フラグ。デフォルトは `false` に設定されています。

`failOnTimeout`
: 少なくとも一つのテストがデフォルトのテストタイムアウトを超えた場合、CI ジョブを失敗させるブーリアンフラグ。デフォルトでは `true` に設定されています。

`files`
: Synthetic テスト用[コンフィギュレーションファイル](#test-files)を検出するグロブパターン。

`global`
: すべてのテストに適用される Synthetic テストのオーバーライド。

`mobileApplicationVersionFilePath`
: すべての Synthetic モバイルアプリケーションテストのアプリケーションバージョンをオーバーライドします。

`pollingTimeout`
: **タイプ**: 整数<br>
`datadog-ci` がテスト結果のポーリングを停止するまでの期間 (ミリ秒単位)。デフォルトは 30 分です。CI レベルでは、この期間の後に完了したテスト結果は失敗したと見なされます。

`proxy`
: Datadog への発信接続に使用されるプロキシ。`host` と `port` キーは必須の引数で、`protocol` キーの初期値は `http` です。サポートされる `protocol` キーの値は、`http`、`https`、`socks`、`socks4`、`socks4a`、`socks5`、`socks5h`、`pac+data`、`pac+file`、`pac+ftp`、`pac+http`、`pac+https` です。プロキシの構成に使用されるライブラリは、[proxy-agent][2] ライブラリです。

`subdomain`
: Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog へのアクセスに使用する URL が `myorg.datadoghq.com` の場合、`subdomain` の値は `myorg` にする必要があります。

`testSearchQuery`
: 実行する Synthetic テストを選択するためのクエリを渡します。CLI でテストを実行する場合は、`-s` フラグを使用します。

`tunnel`
: [Continuous Testing Tunnel](#use-the-testing-tunnel) を使って、テストバッチを実行します。

#### プロキシの利用

グローバルコンフィギュレーションファイルの `proxy` キーを使用して、Datadog への送信接続に使用するプロキシを設定することが可能です。

プロキシの設定には [`proxy-agent` ライブラリ][2]を使用しているので、サポートされているプロトコルは `http`、`https`、`socks`、`socks4`、`socks4a`、`socks5`、`socks5h`、`pac+data`、`pac+file`、`pac+ftp`、`pac+http` および `pac+https` となります。グローバルコンフィギュレーションファイルの `proxy` キーは、新しい `proxy-agent` インスタンスに渡されます。つまり、ライブラリの同じ構成がサポートされていることになります。

**注**: `host` と `port` のキーは必須引数で、 `protocol` のキーは定義されていない場合、デフォルトで `http` になります。

例: 

```json
{
  "apiKey": "<DATADOG_API_KEY>",
  "appKey": "<DATADOG_APPLICATION_KEY>",
  "datadogSite": "datadoghq.com", // https://docs.datadoghq.com/getting_started/site/ で他の Datadog サイトを使用することもできます。デフォルトでは、リクエストは Datadog US1 に送信されます。
  "failOnCriticalErrors": false,
  "failOnMissingTests": false,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "global": {
    "allowInsecureCertificates": true,
    "basicAuth": {"username": "test", "password": "test"},
    "body": "{\"fakeContent\":true}",
    "bodyType": "application/json",
    "cookies": "name1=value1;name2=value2;",
    "deviceIds": ["laptop_large"],
    "followRedirects": true,
    "headers": {"<NEW_HEADER>": "<NEW_VALUE>"},
    "locations": ["aws:us-west-1"],
    "retry": {"count": 2, "interval": 300},
    "executionRule": "blocking",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "variables": {"titleVariable": "new value"},
    "pollingTimeout": 180000
  },
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  "subdomain": "subdomainname",
  "tunnel": true
}
```

### コマンドラインオプション

組織が Datadog にアクセスするためにカスタムサブドメインを使用している場合、テスト結果の URL を適切に表示するために、`DATADOG_SUBDOMAIN` 環境変数または `subdomain` キーのグローバル構成ファイルでこれを設定する必要があります。

例えば、Datadog にアクセスするための URL が `myorg.datadoghq.com` である場合、環境変数に `myorg` を設定します。

```bash
export DATADOG_SUBDOMAIN="myorg"
```

`DATADOG_SYNTHETICS_LOCATIONS` を使用すると、テストが実行される場所をオーバーライドすることができます。ロケーションは `;` で区切ってください。[テストファイル](#test-files)内の構成は、他のオーバーライドよりも優先されます。

```bash
export DATADOG_SYNTHETICS_LOCATIONS="aws:us-east-1;aws:us-east-2"
```

### API

デフォルトでは、`datadog-ci` は作業ディレクトリのルートで動作し、`{,!(node_modules)/**/}*.synthetics.json` ファイル (`.synthetics.json` で終わる全てのファイル、ただし `node_modules` フォルダにあるものを除く) を検出します。このツールは `datadog-ci.json` をロードしますが、`--config` 引数でオーバーライドすることができます。

例:

```json
{
  "apiKey": "<DATADOG_API_KEY>",
  "appKey": "<DATADOG_APPLICATION_KEY>",
  "datadogSite": "datadoghq.com", // https://docs.datadoghq.com/getting_started/site/ で他の Datadog サイトを使用することもできます。デフォルトでは、リクエストは Datadog US1 に送信されます。
  "failOnCriticalErrors": true,
  "failOnMissingTests": true,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "global": {
    "allowInsecureCertificates": true,
    "basicAuth": {"username": "test", "password": "test"},
    "body": "{\"fakeContent\":true}",
    "bodyType": "application/json",
    "cookies": "name1=value1;name2=value2;",
    "defaultStepTimeout": 15,
    "deviceIds": ["chrome.laptop_large"],
    "executionRule": "skipped",
    "followRedirects": true,
    "headers": {"NEW_HEADER": "NEW VALUE"},
    "locations": ["aws:us-east-1"],
    "mobileApplicationVersionFilePath": "path/to/application.apk",
    "retry": {"count": 2, "interval": 300},
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "variables": {"NEW_VARIABLE": "NEW VARIABLE"},
    "pollingTimeout": 120000
  },
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  "subdomain": "subdomainname",
  "tunnel": true
}
```

## テストを実行する

CLI にすべての `**/*.synthetics.json` Synthetic テスト (または[グローバルコンフィギュレーションファイル](#global-configuration-file-options))で指定したパスに紐付いたすべてのテスト) を自動検知させるか、`-p,--public-id` フラグを使用して実行するテストを指定するか、定義できます。

{{< tabs >}}
{{% tab "NPM" %}}

**NPM** を通じて CLI を実行し、テストを実行します。

`package.json` に下記を追加します。

```json
{
  "scripts": {
    "datadog-ci-synthetics": "datadog-ci synthetics run-tests"
  }
}
```

次に、以下を実行します。

```bash
npm run datadog-ci-synthetics
```

**注**: カスタムグローバルコンフィギュレーションファイルを使用してテストを起動している場合は、`datadog-ci-synthetics` スクリプトに紐付けられたコマンドに `--config <PATH_TO_GLOBAL_CONFIG_FILE>` を追加します。

{{% /tab %}}
{{% tab "Yarn" %}}

**Yarn** を通じて CLI を実行し、テストを実行します。

`run-tests` サブコマンドは `files` コンフィギュレーションキーにしたがって、フォルダ内で検出されたテストを実行します。`--public-id` (または短縮形の `-p`) 引数を指定することで、指定したテストのみをトリガーすることができます。複数のテストを実行するために、複数回設定することができます。

```bash
yarn datadog-ci synthetics run-tests --public-id pub-lic-id1 --public-id pub-lic-id2
```

また、フラグ `--search` (または省略形の `-s`) を使用することで、検索クエリに対応するテストをトリガーすることも可能です。このオプションでは、検索クエリで検出されたすべてのテストに、グローバル構成のオーバーライドが適用されます。

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global.config.json
```

1 つのグローバルコンフィギュレーションファイルで複数のスイートを並行して実行したい場合には、`--files` (短縮形 `-f`) を使ってグローバルファイルセレクタをオーバーライドすることができます。

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -f ./component-2/**/*.synthetics.json
```

また、変数を引数として渡すには、`--variable KEY=VALUE` を使用することができます。

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -v PASSWORD=$PASSWORD
```

**注**: カスタムグローバルコンフィギュレーションファイルを使用してテストを起動している場合は、コマンドに `--config <PATH_TO_GLOBAL_CONFIG_FILE>` を追加します。

{{% /tab %}}
{{< /tabs >}}

### 障害モードフラグ

- `--failOnTimeout` (または `--no-failOnTimeout`) は、テストタイムアウトを超えたら CI を失敗 (または成功) させます。
- `--failOnCriticalErrors` は、テストがトリガーされなかったり、結果を取得できなかった場合に、CI を失敗させます。
- `--failOnMissingTests` は、公開 ID (`--public-id` CLI 引数またはテストファイルにリストされている) を持つ指定したテストが少なくとも 1 つ実行中に見つからない場合 (例えば、プログラム的に削除されたか Datadog サイトで削除された場合)、CI を失敗させます。

### テストファイル

テストファイルの名前は `.synthetics.json` というサフィックスを付ける必要があります。

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "<TEST_PUBLIC_ID>",
      "config": {
        "allowInsecureCertificates": true,
        "basicAuth": {"username": "test", "password": "test"},
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "defaultStepTimeout": 15,
        "deviceIds": ["chrome.laptop_large"],
        "executionRule": "skipped",
        "followRedirects": true,
        "headers": {"NEW_HEADER": "NEW VALUE"},
        "locations": ["aws:us-east-1"],
        "mobileApplicationVersionFilePath": "path/to/application.apk",
        "pollingTimeout": 30000,
        "retry": {"count": 2, "interval": 300},
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
        "variables": {"MY_VARIABLE": "new title"}
      }
    }
  ]
}
```

`<TEST_PUBLIC_ID>` は、テスト詳細ページの URL の一部であるテストの識別子 (例えば `https://app.datadoghq.com/synthetics/details/abc-def-ghi` の場合は `abc-def-ghi`) か、詳細ページへの URL 全体 (例えば、直接 `https://app.datadoghq.com/synthetics/details/abc-def-ghi`) のいずれかになります。

`config` キーの下にあるオプションはすべてオプションで、Datadog に保存されているテストの構成をオーバーライドすることができます。

| オプション                            | タイプ             | 定義                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowInsecureCertificates`        | Boolean          | Synthetic API テストでの証明書チェックを無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `basicAuth`                        | オブジェクト           | 基本認証が必要な場合に提供する資格情報。<br><br>- `username` (文字列): 基本認証のユーザー名。<br>- `password` (文字列): 基本認証のパスワード。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `body`                             | 文字列           | API テストで送信するデータ。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `bodyType`                         | 文字列           | API テストで送信するデータのコンテンツタイプ。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cookies`                          | 文字列またはオブジェクト | API やブラウザのテストにおいて、提供された文字列をクッキーのヘッダーとして使用します (追加または置換)。<br><br>- これが文字列である場合、オリジナルのクッキーを置き換えるために使用されます。<br>- これがオブジェクトの場合、フォーマットは `{append?: boolean, value: string}` でなければならず、`append` の値によって、オリジナルのクッキーに追加されるか置き換えられるかが決まります。                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `defaultStepTimeout`               | 数値           | ブラウザテストにおけるステップの最大継続時間を秒単位で指定し、個別に設定されたステップのタイムアウトをオーバーライドしません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `deviceIds`                        | 配列            | ブラウザテストを実行するデバイスのリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `executionRule`                    | 文字列           | テストの実行ルールは、テストが失敗した場合の CLI の振る舞いを定義します。<br><br>- `blocking`: テストが失敗した場合、CLI はエラーを返します。<br>- `non_blocking`: テストが失敗した場合、CLI はエラーを返します。テストが失敗した場合に、CLI は警告を表示するだけである。<br>- `skipped`: テストは全く実行されません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `followRedirects`                  | Boolean          | Synthetic API テストにおいて、HTTP リダイレクトに従うか否かを示します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `headers`                          | オブジェクト           | テスト内で置換するヘッダー。このオブジェクトは、キーが置換するヘッダーの名前、そして値が置換するヘッダーの新しい値である必要があります。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `locations`                        | 配列            | テストを実行する場所のリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `mobileApplicationVersionFilePath` | 文字列           | Synthetic モバイルアプリケーションテストのアプリケーションバージョンをオーバーライドします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pollingTimeout`                   | 整数          | テストの最大継続時間をミリ秒単位で指定します。実行がこの値を超えた場合、失敗とみなされます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `retry`                            | オブジェクト           | テストの再試行ポリシー。<br><br>- `count` (整数): テストに失敗した場合に実行する試行回数を指定します。<br>- `interval` (整数): 再試行の間隔をミリ秒で指定します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `startUrl`                         | 文字列           | テストに提供する新しい開始 URL。環境変数にある、大括弧で指定された変数 (例えば `{{ EXAMPLE }}`) は置き換えられます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `startUrlSubstitutionRegex`        | 文字列           | テストの開始 URL を変更する正規表現 (ブラウザテストと HTTP テストのみ) で、元のテストや構成のオーバーライド `startUrl` によって与えられたものであるかどうかを指定します。<br><br>URL が変数を含んでいる場合、この正規表現は変数の補間の後に適用されます。可能なフォーマットは 2 つです: <br>- `your_regex\|your_substitution`: URL の `/` 文字との衝突を避けるために、パイプベースの構文を使用します。例: `https://example.com(.*)\|http://subdomain.example.com$1` は、`https://example.com/test` を `http://subdomain.example.com/test` に変換します。<br>- `s/your_regex/your_substitution/modifiers`: スラッシュ構文で、修飾語をサポートします。例: `s/(https://www.)(.*)/$1extra-$2/` は、`https://www.example.com` を `https://www.extra-example.com` に変換します。 |
| `variables`                        | オブジェクト           | テスト内で置換する変数。このオブジェクトは、キーが置換する変数の名前、そして値が置換する変数の新しい値である必要があります。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## テストトンネルを使用する

変数のオーバーライドと [Continuous Testing Tunnel][3] を組み合わせることで、開発環境内でテストを実行することができます。テストトンネルは、インフラストラクチャーと Datadog の間にエンドツーエンドで暗号化された HTTP プロキシを作成し、CLI を通して送信された全てのテストリクエストが自動的に `datadog-ci` クライアントを経由してルーティングされることを可能にします。

これにより、本番前環境から本番システムまで、ソフトウェア開発のライフサイクルのあらゆる段階で、エンドツーエンドで暗号化されたテストを実行することが可能になります。

## エンドツーエンドのテストプロセス

Synthetics コマンドが期待通りに動作することを確認するには、テスト実行をトリガーして、0 を返すことを確認します。

```bash
export DATADOG_API_KEY='<API_KEY>'
export DATADOG_APP_KEY='<APPLICATION_KEY>'

yarn datadog-ci synthetics run-tests --public-id abc-def-ghi
```

成功すると、次のような出力が得られます。

```bash
[abc-def-ghi] Trigger test "Check on testing.website"
[abc-def-ghi] Waiting results for "Check on testing.website"


=== REPORT ===
Took 11546ms

✓ [abc-def-ghi] | Check on testing.website
  ✓ location: Frankfurt (AWS)
    ⎋  total duration: 28.9 ms - result url: https://app.datadoghq.com/synthetics/details/abc-def-ghi?resultId=123456789123456789
    ✓ GET - https://testing.website
```

### レポーター

2 つのレポーターがすぐに使えます。

1. `stdout`
2. JUnit

JUnit レポートを有効にするには、コマンドに `--jUnitReport` (省略形 `-j`) を渡し、JUnit XML レポートのファイル名を指定します。

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global.config.json --jUnitReport e2e-test-junit
```

レポーターはコマンドの `MainReporter` に自分自身をフックすることができます。

### 使用可能なフック

| フック名        | パラメーター                                                                               | 説明                                                     |
| :--------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `log`            | `(log: string)`                                                                          | ロギング用に呼び出されます。                                             |
| `error`          | `(error: string)`                                                                        | エラーが発生するたびに呼び出されます。                                |
| `initErrors`     | `(errors: string[])`                                                                     | テストのパース段階でエラーが発生するたびに呼び出されます。 |
| `reportStart`    | `(timings: {startTime: number})`                                                         | レポート開始時に呼び出されます。                              |
| `resultEnd`      | `(result: Result, baseUrl: string)`                                                      | 全結果の終了時に各結果に対して呼び出されます。               |
| `resultReceived` | `(result: Result)`                                                                       | 結果を受信したときに呼び出されます。                               |
| `testTrigger`    | `(test: Test, testId: string, executionRule: ExecutionRule, config: UserConfigOverride)` | テストがトリガーされたときに呼び出されます。                                |
| `testWait`       | `(test: Test)`                                                                           | テストが結果の受信を待っているときに呼び出されます。           |
| `testsWait`      | `(tests: Test[])`                                                                        | すべてのテストが結果を受け取るのを待っているときに呼び出されます。     |
| `runEnd`         | `(summary: Summary, baseUrl: string, orgSettings?: SyntheticsOrgSettings)`               | 実行の終了時に呼び出されます。                                   |

## テスト結果の表示

CI バッチの結果は、[Synthetic Monitoring と Continuous Testing Explorer][4] でバッチをクリックするか、[**Synthetic Tests** ページ][5]でテストをクリックすることで確認できます。

また、テストが実行される際に、CI の中で直接テストの実行結果を確認することができます。テストが失敗した原因を特定するには、実行ログを見てアサーションが失敗した原因を探します。

```bash
  yarn datadog-ci synthetics run-tests --config synthetics.global.json
  yarn run v1.22.4
  $ /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/node_modules/.bin/datadog-ci synthetics run-tests --config synthetics.global.json
  Finding files in /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/{,!(node_modules)/**/}*.synthetics.json

  Got test files:
    - user.synthetics.json

  [2cj-h3c-39x] Trigger test "Test CI connection"
  [2cj-h3c-39x] Waiting results for "Test CI connection"

  === REPORT ===
  Took 2242ms

  x  [2cj-h3c-39x] | Test CI connection
    * location: 30019
      ⎋ total duration: 32.6 ms - result url: https://app.datadoghq.com/synthetics/details/2cj-h3c-39x?resultId=122140688175981634
      x GET - https://www.datadoghq.com
        [INCORRECT_ASSUMPTION] - [{"index":1,"operator":"is","property":"content-type","type":"header","target":"text/html","valid":false,"actual":"text/html"; charset=utf-8"}] 
  error Command failed with exit code 1.
  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

## アプリケーションのアップロードコマンド

**既存のアプリケーション**に新しいバージョンをアップロードするには、`synthetic upload-application` コマンドを使うことができます。使うには

`--mobileApplicationId` - 文字列 - 新しいバージョンをアップロードしたいアプリケーションの ID
`--mobileApplicationVersionFilePath` - 文字列 - モバイルアプリへのパス (.apk/.ipa)
`--versionName` - 文字列 - 新しいバージョンの名前。一意でなければなりません。
`--latest` - ブール値 - 存在する場合は、そのアプリケーションを 'latest' としてマークします。最新バージョンで実行されたテストは、次回実行時にこのバージョンを使用します。

例:
```
datadog-ci synthetics upload-application              \
--mobileApplicationId '123-123-123'                   \
--mobileApplicationVersionFilePath example/test.apk \
--versionName 'example 1.0'                           \
--latest
```   

これらのオプションは、コンフィギュレーションファイルで渡すこともできます
```
{
  "apiKey": <DATADOG_API_KEY>,
  "appKey": <DATADOG_APPLICATION_KEY>,
  "mobileApplicationVersionFilePath": "example_path/example_app.apk",
  "mobileApplicationId": "example-abc",
  "versionName": "example",
  "latest": true
}
```

そして `—config` フラグを付けてコマンドに渡します。例:
```
datadog-ci synthetics upload-application --config global.config.json
```

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog の GitHub Action を使用して、ワークフローに Continuous Testing を追加する][6]
- [Continuous Testing と CI/CD について][7]
- [Continuous Testing Explorer について][8]
- [Continuous Testing Tunnel について][3]

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/node-proxy-agent
[3]: https://docs.datadoghq.com/ja/continuous_testing/testing_tunnel/
[4]: https://app.datadoghq.com/synthetics/explorer/
[5]: https://app.datadoghq.com/synthetics/tests
[6]: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
[7]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/
[8]: https://docs.datadoghq.com/ja/continuous_testing/explorer/
[9]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json