---
title: Synthetic Continuous Testing
kind: ドキュメント
description: CI/CD パイプラインでオンデマンドの Synthetics テストを実行します。
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /synthetics/
    tag: ドキュメント
    text: チェックを管理する
  - link: /synthetics/browser_tests/
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: /synthetics/api_tests/
    tag: ドキュメント
    text: APIテストの設定
---
事前定義された間隔でテストを実行するだけでなく、API エンドポイントを使用して Datadog Synthetic テストをオンデマンドで実行することもできます。Datadog Synthetic テストを継続的インテグレーション (CI) パイプラインで実行して、製品を破壊する恐れのあるブランチのデプロイをブロックできます。
Datadog Continuous Testing を使用して、**CD プロセスの一部としてテストを実行**し、デプロイが完了した直後に本番アプリケーションの状態を評価することもできます。これにより、ユーザーに影響を与える可能性のある潜在的な回帰を検出し、重要なテストが失敗したときに自動的にロールバックをトリガーできます。

この関数により、本番システムの問題修正に時間を割く必要がなくなり、プロセスの早期でバグと回帰を検出できます。

これらの API エンドポイントに加え、Datadog ではコマンドラインインターフェース (CLI) を提供および管理しているため、Datadog Synthetic テストを CI ツールに容易に統合できます。Synthetic Continuous Testing はオープンソースで、そのソースコードは GitHub の [DataDog/datadog-ci][1] から入手できます。

## API の使用

トリガーエンドポイントから、トリガーされたチェックのリストとその結果識別子が提供されます。完全なテスト結果が入手可能な場合は、ポーリングエンドポイントから入手できます。

### トリガーテストエンドポイント

エンドポイントをトリガーするテストは、1 回のリクエストで最大 50 件のテスト実行に対応します。

{{< site-region region="us" >}}

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: トリガーする全テストのリストと各テストのコンフィギュレーションオーバーライドを含む JSON オブジェクト。

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint**: `https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: トリガーする全テストのリストと各テストのコンフィギュレーションオーバーライドを含む JSON オブジェクト。

{{< /site-region >}}

#### リクエストデータの構造

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

`TEST_TO_TRIGGER` オブジェクトは、トリガーするテストの `public_id` (必須) と任意のコンフィギュレーションオーバーライドから構成されます (各フィールドの説明については[下記を参照](#テストの構成)してください)。

テストの公開識別子は、テスト詳細ページの URL の一部であるテストの識別子 (`https://app.datadoghq.com/synthetics/details/abc-def-ghi` の場合は `abc-def-ghi`) か、詳細ページへの URL 全体 (`https://app.datadoghq.com/synthetics/details/abc-def-ghi`) のいずれかになります。

#### リクエスト例

{{< site-region region="us" >}}

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "tests": [
        {
            "public_id": "abc-def-ghi",
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NEW_HEADER": "NEW VALUE" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://new.url/",
            "variables": { "titleVariable": "new value" }
        }
    ]
}' "https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}
{{< site-region region="eu" >}}


```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "tests": [
        {
            "public_id": "abc-def-ghi",
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NEW_HEADER": "NEW VALUE" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://new.url/",
            "variables": { "titleVariable": "new value" }
        }
    ]
}' "https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}


#### 応答例

```json
{
  "results": [
    {
      "result_id": "0123456789012345678",
      "public_id": "abc-def-ghi",
      "location": 1
    },
  ],
  "triggered_check_ids": [
    "abc-def-ghi"
  ]
}
```

### ポーリング結果のエンドポイント

{{< site-region region="us" >}}

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: 結果の入手元となる結果識別子のリストを含む JSON 配列。

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint**: `https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: 結果の入手元となる結果識別子のリストを含む JSON 配列。

{{< /site-region >}}

#### リクエスト例

{{< site-region region="us" >}}

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -G \
    "https://api.datadoghq.com/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -G \
    "https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}

#### 応答例

```json
{
  "results": [
    {
      "check_id": "123456",
      "timestamp": 1585841351642,
      "orgID": 2,
      "result": {
        "unhealthy": false,
        "eventType": "finished",
        "timings": {
          "firstByte": 14.7,
          "tcp": 11.6,
          "ssl": 45.7,
          "dns": 12.484235048294067,
          "download": 0.2,
          "total": 84.7
        },
        "mainDC": "us1.prod",
        "runType": 2,
        "httpStatusCode": 200,
        "responseSize": 9201,
        "healthCheckRatio": 1
      },
      "dc_id": 1,
      "resultID": "0123456789012345678"
    }
  ]
}
```

## CLI の使用

### パッケージのインストール

パッケージは NPM レジストリの [@datadog/datadog-ci][2] で公開されています。

{{< tabs >}}
{{% tab "NPM" %}}

`~/.npmrc` ファイルで下記のように設定します。

```conf
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=<TOKEN>
```

次に、NPM からパッケージをインストールします。

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Yarn v2 では、`.yarnrc` ファイルの `@datadog` スコープにトークンを含めることができます。

```yaml
npmScopes:
  datadog:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: "<TOKEN>"
```

次に、Yarn からパッケージをインストールします。

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab %}}
{{< /tabs >}}

### クライアントのセットアップ

クライアントをセットアップするには、Datadog API キーとアプリケーションキーを構成する必要があります。これらのキーは次の 3 つの方法で定義できます。

1. 環境変数として定義

    ```bash
    export DATADOG_API_KEY="<API_KEY>"
    export DATADOG_APP_KEY="<APPLICATION_KEY>"
    ```

2. テストの実行中に CLI に渡す

    ```bash
    datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

3. グローバルコンフィギュレーションファイルで定義

     また、JSON コンフィギュレーションファイルを作成して、さらに高度なオプションを指定できます。このグローバルコンフィギュレーションファイルへのパスは、[テストの起動時]にフラグ `--config` (#テストの実行)を使用して設定できます。グローバルコンフィギュレーションファイルの名前が `datadog-ci.json` に設定されている場合は、これがデフォルトになります。

    * **apiKey**: Datadog API にクエリーを送信する際に使用される API キー。
    * **appKey**: Datadog API にクエリーを送信する際に使用されるアプリケーションキー。
    * **datadogSite**: リクエストの送信先となる Datadog インスタンス (`datadoghq.com` または `datadoghq.eu`)。デフォルトは `datadoghq.com` です。
    * **files**: Synthetic テスト用コンフィギュレーションファイルを検出するグロブパターン。
    * **global**: すべてのテストに適用される Synthetic テストのオーバーライド ([各フィールドの説明については下記を参照してください](#テストの構成))。
    * **proxy**: Datadog への発信接続に使用されるプロキシー。`host` と `port` キーは必須の引数で、`protocol` キーの初期値は `http` です。サポートされる `protocol` キーの値は、`http`、`https`、`socks`、`socks4`、`socks4a`、`socks5`、`socks5h`、`pac+data`、`pac+file`、`pac+ftp`、`pac+http`、`pac+https` です。プロキシーの構成に使用されるライブラリーは、[proxy-agent][3] ライブラリーです。
    * **subdomain**: Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog へのアクセスに使用する URL が `myorg.datadoghq.com` の場合、`subdomain` の値は `myorg` にする必要があります。

    **グローバルコンフィギュレーションファイルの例**

    ```json
    {
        "apiKey": "<DATADOG_API_KEY>",
        "appKey": "<DATADOG_APPLICATION_KEY>",
        "datadogSite": "datadoghq.com",
        "files": "{,!(node_modules)/**/}*.synthetics.json",
        "global": {
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "<NEW_HEADER>": "<NEW_VALUE>" },
                "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "executionRule": "skipped",
            "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
            "variables": { "titleVariable": "new value" },
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
        "subdomain": "subdomainname"
    }
    ```

### テストの構成

デフォルトでは、クライアントは `**/*.synthetics.json` ファイルで指定されたすべてのテストを自動的に検出して実行します (パスは[グローバルコンフィギュレーションファイル](#クライアントの設定)で構成できます。このファイルには、 実行するテストのオブジェクト配列と ID、および、このテストで考えられるコンフィギュレーションオーバーライドを含む `tests` キーが含まれています。

**基本的なテストコンフィギュレーションファイルの例**

```json
{
    "tests": [
        {
            "id": "<TEST_PUBLIC_ID>"
        },
        {
            "id": "<TEST_PUBLIC_ID>"
        }
    ]
}
```

#### 詳細なコンフィギュレーション

テストに使用されるデフォルトのコンフィギュレーションはオリジナルテストのコンフィギュレーションです (UI または [API からテスト用コンフィギュレーションを取得]する際に確認可能[4])。

ただし、CI デプロイメントの際に、下記のオーバーライドを使用して、テストパラメーターの一部 (またはすべて) をオーバーライドするように任意で定めることもできます。テストすべてをオーバーライドするように定義する場合は、下記と同じパラメーターを[グローバルコンフィギュレーションファイル](#クライアントのセットアップ)ごとに設定できます。

* **allowInsecureCertificates**: (_boolean_) API テストの認証チェックを無効化します。
* **basicAuth**: (_オブジェクト_) 基本認証を行う際に提供する認証情報。
     * **username**: (_文字列_) 基本認証で使用するユーザー名。
     * **password**: (_文字列_) 基本認証で使用するパスワード。
* **body**: (_文字列_) Synthetic API テストで送信するデータ。
* **bodyType**: (_文字列_) Synthetic API テストで送信するデータのタイプ。
* **cookies**: (_文字列_) API またはブラウザテストのクッキーヘッダーとして提供された文字列を使用。
* **deviceIds**: (_配列_) ブラウザテストを実行するデバイスのリスト。
* **followRedirects**: (_boolean_) API テストで HTTP リダイレクトに従うかどうかを示す。
* **headers**: (_オブジェクト_) テストで置換するヘッダー。このオブジェクトには、置換するヘッダーの名前 (キー) と、ヘッダーの新しい値 (値) が含まれている必要がある。
* **locations**: (_配列_) テストの実行元となる場所のリスト。
* **retry**: (_オブジェクト_) テストの再試行ポリシー。
     * **count**: (_整数_) テストが失敗した場合に再試行する回数。
     * **interval**: (_整数_) 試行する間隔 (ミリ秒)。
* **executionRule**: (_文字列_) テストの実行規則。テストが失敗した場合の CLI の挙動を定義する。
     * **blocking**: テストが失敗した場合、CLI はエラーを返す。
     * **non_blocking**: テストが失敗した場合、CLI は警告のプリントのみを実施する。
     * **skipped**: テストを一切実行しない。
* **startUrl**: (_文字列_) テストに提供する新しい開始 URL。
* **variables**: (_オブジェクト_) テストで置換する変数。このオブジェクトには、置換する変数の名前 (キー) と、変数の新しい値 (値) が含まれている必要がある。
* **pollingTimeout**: (_整数_) Synthetic テストが失敗したとみなす経過時間（ミリ秒）。

**Note**: グローバルオーバーライドに優先するテストのオーバーライド。

**高度なテストコンフィギュレーションファイルの例**

```json
{
    "tests": [
        {
            "id": "<TEST_PUBLIC_ID>",
            "config": {
                "allowInsecureCertificates": true,
                "basicAuth": { "username": "test", "password": "test" },
                "body": "{\"fakeContent\":true}",
                "bodyType": "application/json",
                "cookies": "name1=value1;name2=value2;",
                "deviceIds": ["laptop_large"],
                "followRedirects": true,
                "headers": { "<NEW_HEADER>": "<NEW_VALUE>" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "executionRule": "skipped",
                "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
                "variables": { "titleVariable": "new value" },
                "pollingTimeout": 180000
            }
        }
    ]
}
```

#### 実行規則

各テストの _実行規則_ もまた、アプリケーション内でテストごとに定義できます。**CI Execution** 横のドロップダウンから選択します。

{{< img src="synthetics/ci/execution_rule.mp4" alt="CI 実行規則" video="true" width="100%">}}

テストに関連付けられた実行規則は常に、コンフィギュレーションファイルで設定されている中で最も制限の厳しいものが適用されます。最も制限の厳しいものから緩いものに並べると `skipped`、`non_blocking`、`blocking` の順になります。たとえば、UI ではテストを `skipped` で構成し、コンフィギュレーションファイルでは `blocking` で構成している場合、テストを実行すると `skipped` が適用されます。

#### 開始 URL

テストオブジェクトに `startUrl` を含めることで、テストを開始する URL を構成し、テストのオリジナルの開始 URL の一部と下記の環境変数を使用した独自の開始 URL を作成できます。

| 環境変数 | 説明                  | 例                                                |
|----------------------|------------------------------|--------------------------------------------------------|
| `URL`                | テストのオリジナルの開始 URL | `https://www.example.org:81/path/to/something?abc=123` |
| `DOMAIN`             | テストのドメイン名           | `example.org`                                          |
| `HOST`               | テストのホスト                  | `www.example.org:81`                                   |
| `HOSTNAME`           | テストのホストの名前              | `www.example.org`                                      |
| `ORIGIN`             | テストの起点                | `https://www.example.org:81`                           |
| `PARAMS`             | テストのクエリパラメーター      | `?abc=123`                                             |
| `PATHNAME`           | テストの URl パス              | `/path/to/something`                                   |
| `PORT`               | テストのホストのポート             | `81`                                                   |
| `PROTOCOL`           | テストのプロトコル              | `https:`                                               |
| `SUBDOMAIN`          | テストのサブドメイン            | `www`                                                  |

たとえば、テストの開始 URL が `https://www.example.org:81/path/to/something?abc=123` なら、次のような記述になります。

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}`
* `{{URL}}`

### テストの実行

CLI にすべての `**/*.synthetics.json` Synthetic テスト (または[グローバルコンフィギュレーションファイル](#クライアントのセットアップ)で指定したパスに紐付いたすべてのテスト) を自動検知させるか、`-p,--public-id` フラグを使用して実行するテストを指定するか、定義できます。

CLI を実行してテストを実行する

{{< tabs >}}
{{% tab "Yarn" %}}

```bash
yarn datadog-ci synthetics run-tests
```

**注**: カスタムグローバルコンフィギュレーションファイルを使用してテストを起動している場合は、コマンドに `--config <PATH_TO_GLOBAL_CONFIG_FILE` を追加します。

{{% /tab %}}
{{% tab "NPM" %}}

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

**注**: カスタムグローバルコンフィギュレーションファイルを使用してテストを起動している場合は、`datadog-ci-synthetics` スクリプトに紐付けられたコマンドに `--config <PATH_TO_GLOBAL_CONFIG_FILE` を追加します。

{{% /tab %}}
{{< /tabs >}}

## テスト結果の表示

### CI の場合

テストの実行中に、テストの実行結果を CI 内で直接確認することができます。

{{< img src="synthetics/ci/successful_test_result.png" alt="成功したテスト結果"  style="width:80%;">}}

実行ログを確認し、失敗したアサーションの原因を検索することで、テストが失敗した原因を特定できます。

{{< img src="synthetics/ci/failed_test_result.png" alt="失敗したテスト結果" style="width:80%;">}}

### Datadog アプリケーションの場合

Datadog のテスト詳細ページでも一覧表示されたテスト結果を確認することができます。

{{< img src="synthetics/ci/test_results.png" alt="成功したテスト結果" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/TooTallNate/node-proxy-agent
[4]: /ja/api/v1/synthetics/#get-test