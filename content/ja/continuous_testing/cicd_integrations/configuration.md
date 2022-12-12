---
aliases:
- /ja/synthetics/cicd_integrations/configuration
description: CI/CD パイプラインでテストを実行するための Continuous Testing の構成
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: GitHub
  text: Datadog の GitHub Action を使用して、ワークフローに Continuous Testing を追加します
- link: /synthetics/cicd_integrations
  tag: ドキュメント
  text: Continuous Testing と CI/CD について
- link: /continuous_testing/explorer
  tag: ドキュメント
  text: CI Results Explorer について学ぶ
- link: /continuous_testing/testing_tunnel
  tag: ドキュメント
  text: テストトンネルについて学ぶ
kind: documentation
title: Continuous Testing と CI/CD の構成
---

<div class="alert alert-info">このページでは、継続的インテグレーション (CI) と継続的デリバリー (CD) のパイプラインの Continuous Testing テストの構成について説明します。CI のメトリクスやデータを Datadog のダッシュボードに取り込みたい場合は、<a href="/continuous_integration/" target="_blank">CI Visibility</a> のセクションを参照してください。</div>

## 概要

NPM パッケージの `@datadog-ci` を使用すると、CI/CD パイプライン内で直接 Continuous Testing テストを実行することができます。Synthetics のテストがリグレッションを検出した場合、自動的にビルドを停止し、デプロイをブロックし、デプロイをロールバックすることが可能です。

テストがどの URL から始まるかを構成するには、テストオブジェクトに `startUrl` を指定します。テストのオリジナルの開始 URL の任意の部分と、以下の環境変数を使って、独自の開始 URL を構築します。

### パッケージのインストール

パッケージは NPM レジストリの [@datadog/datadog-ci][1] で公開されています。

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

1. 環境変数として定義

    ```bash
    export DATADOG_API_KEY="<API_KEY>"
    export DATADOG_APP_KEY="<APPLICATION_KEY>"
    ```

2. テストの実行中に CLI に渡す

    ```bash
    datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

3. または[グローバルコンフィギュレーションファイル](#global-configuration-file-options)で定義されています。

     グローバル JSON コンフィギュレーションファイルでは、追加の詳細オプションを指定できます。[テストを起動するとき](#run-tests)にフラグ `--config` を使用して、このファイルへのパスを指定します。グローバルコンフィギュレーションファイルの名前が `datadog-ci.json` に設定されている場合、その名前がデフォルトになります。

### グローバルコンフィギュレーションファイルのオプション

グローバルコンフィギュレーションファイルでは、次のオプションを構成できます。

`apiKey`
: Datadog API にクエリーを送信する際に使用される API キー。

`appKey`
: Datadog API にクエリーを送信する際に使用されるアプリケーションキー。

`datadogSite`
: リクエストの送信先となる Datadog インスタンス。デフォルトは `datadoghq.com`。Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。

`failOnCriticalErrors`
: テストがトリガーされなかったり、Datadog から結果を取得できなかった場合に CI ジョブを失敗させるためのブーリアンフラグ。デフォルトでは `false` に設定されています。

`failOnMissingTests`
: 少なくとも一つのテストが実行中に欠落している場合 (例えば、削除されている場合など)、CI ジョブを失敗させるブーリアンフラグ。デフォルトでは `false` に設定されています。

`failOnTimeout`
: 少なくとも一つのテストがデフォルトのテストタイムアウトを超えた場合、CI ジョブを失敗させるブーリアンフラグ。デフォルトでは `true` に設定されています。

`files`
: Synthetic テスト用コンフィギュレーションファイルを検出するグロブパターン。

`global`
: すべてのテストに適用される Synthetic テストのオーバーライド。

`pollingTimeout`
: **タイプ**: 整数<br>
`datadog-ci` がテスト結果のポーリングを停止するまでのミリ秒単位の期間。デフォルトは 30 分です。CI レベルでは、この期間の後に完了したテスト結果は失敗したと見なされます。

`proxy`
: Datadog への発信接続に使用されるプロキシ。`host` と `port` キーは必須の引数で、`protocol` キーの初期値は `http` です。サポートされる `protocol` キーの値は、`http`、`https`、`socks`、`socks4`、`socks4a`、`socks5`、`socks5h`、`pac+data`、`pac+file`、`pac+ftp`、`pac+http`、`pac+https` です。プロキシの構成に使用されるライブラリは、[proxy-agent][2] ライブラリです。

`subdomain`
: Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog へのアクセスに使用する URL が `myorg.datadoghq.com` の場合、`subdomain` の値は `myorg` にする必要があります。

`tunnel`
: [安全なトンネル][3]を使って、テストバッチを実行します。

`testSearchQuery`
: 実行する Synthetic テストを選択するためのクエリを渡します。CLI でテストを実行する場合は、`-s` フラグを使用します。

例: 

{{< code-block lang="json" filename="Global Configuration File" disable_copy="false" collapsible="true" >}}
{
    "apiKey": "<DATADOG_API_KEY>",
    "appKey": "<DATADOG_APPLICATION_KEY>",
    "datadogSite": "datadoghq.com",
    "files": "{,!(node_modules)/**/}*.synthetics.json",
    "failOnCriticalErrors": false,
    "failOnMissingTests": false,
    "failOnTimeout": true,
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
        "executionRule": "blocking",
        "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
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
    "subdomain": "subdomainname",
    "tunnel": true
}
{{< /code-block >}}

### テストの構成

デフォルトでは、クライアントは `**/*.synthetics.json` ファイルに指定されたすべてのテストを自動的に検出し、実行します。このパスは[グローバルコンフィギュレーションファイル](#global-configuration-file-options)で構成することができます。

これらのファイルには `tests` というキーがあり、実行するテストの ID とテストの構成を上書きするためのオブジェクトの配列が含まれています。

例: 

{{< code-block lang="json" filename="Basic Test Configuration File" disable_copy="false" collapsible="true" >}}
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
{{< /code-block >}}

#### 追加のコンフィギュレーション

テストに使用されるデフォルトのコンフィギュレーションはオリジナルテストのコンフィギュレーションです。これは UI または [API からテスト用コンフィギュレーションを取得][4]することで確認できます。

しかし、CI デプロイメントの文脈では、以下のオーバーライドでテストパラメーターの一部または全部を上書きすることを決定することができます。すべてのテストに対してオーバーライドを定義するには、[グローバルコンフィギュレーションファイル](#global-configuration-file-options)レベルで同じパラメーターを設定します。

`allowInsecureCertificates`
: **タイプ**: ブール値<br>
HTTP テストの認証チェックを無効化します。

`basicAuth`
: **タイプ**: オブジェクト<br>
HTTP またはブラウザテストで基本認証を行う際に提供する認証情報。
  - `username`: 文字列。基本認証で使用するユーザー名。
  - `password`: 文字列。基本認証で使用するパスワード。

`body`
: **タイプ**: 文字列<br>
HTTP テストで送信するデータ。

`bodyType`
: **タイプ**: 文字列<br>
HTTP テストで送信するデータのタイプ。

`cookies`
: **タイプ**: 文字列<br>
HTTP またはブラウザテストのクッキーヘッダーとして提供された文字列を使用。

`deviceIds`
: **タイプ**: 配列<br>
ブラウザテストを実行するデバイスのリスト。

`followRedirects`
: **タイプ**: ブール値<br>
HTTP テストでリダイレクトに従うかどうかを示す。

`headers`
: **タイプ**: オブジェクト<br>
HTTP またはブラウザテストで置換するヘッダー。このオブジェクトには、置換するヘッダーの名前 (キー) と、ヘッダーの新しい値 (値) が含まれている必要がある。

`locations`
: **タイプ**: 配列<br>
テストの実行元となる場所のリスト。

`retry`
: **タイプ**: オブジェクト<br>
テストの再試行ポリシー。
  - `count`: 整数。テストが失敗した場合に再試行する回数。
  - `interval`: 整数。試行する間隔 (ミリ秒)。

`executionRule`
: **タイプ**: 文字列<br>
テストが失敗した場合の CLI の挙動を定義するテストの実行規則。
  - `blocking`: テストが失敗した場合、CLI はエラーを返す。
  - `non_blocking`: テストが失敗した場合、CLI は警告のプリントのみを実施する。
  - `skipped`: テストを一切実行しない。

`startUrl`
: **タイプ**: 文字列<br>
HTTP またはブラウザテストに提供する新しい開始 URL。

`startUrlSubstitutionRegex`
: **タイプ**: 文字列<br>
元のテストによって与えられたものであっても、構成のオーバーライドである `startURL` によって与えられたものであっても、テストの開始 URL を修正する正規表現 (ブラウザと HTTP テストのみ)。URL が変数を含んでいる場合、この正規表現は変数の補間の後に適用されます。

`variables`
: **タイプ**: オブジェクト<br>
テストで置換する変数。このオブジェクトには、置換する変数の名前 (キー) と、変数の新しい値 (値) が含まれている必要がある。

`pollingTimeout`
: **タイプ**: 整数<br>
`datadog-ci` がテスト結果のポーリングを停止するまでのミリ秒単位の期間。デフォルトは 30 分です。CI レベルでは、この期間の後に完了したテスト結果は失敗したと見なされます。

**Note**: グローバルオーバーライドに優先するテストのオーバーライド。

{{< code-block lang="json" filename="Advanced Test Configuration File" disable_copy="false" collapsible="true" >}}
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
                "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
                "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
                "variables": { "titleVariable": "new value" },
                "pollingTimeout": 180000
            }
        }
    ]
}

{{< /code-block >}}

#### 実行規則

**CI Execution** の隣にあるドロップダウンメニューを使用して、各テストの実行ルールをテストレベルで定義します。

{{< img src="synthetics/cicd_integrations/execution_rule.mp4" alt="CI 実行ルール" video="true" width="100%">}}

テストに関連する実行ルールは、コンフィギュレーションファイルの中で最も制約の多いものです。オプションは、最も制限の厳しいものから順に、 `skipped`、`non_blocking`、`blocking` となります。例えば、UI 上では `skipped` に構成されているが、コンフィギュレーションファイル上では `blocking` になっている場合、テストの実行時には `skipped` になります。

#### 開始 URL のカスタマイズ

`startURL` 構成オプションによって、テストの開始 URL をオーバーライドすることができます。例えば、テストの開始 URL が `shopist.io` で、ステージング環境を `staging.shopist.io` でテストしたい場合、このオプションに `startURL: "staging.shopist.io"` とします。

この開始 URL をさらにカスタマイズしたい場合 (または URL の一部だけをカスタマイズしたい場合) には、`startUrlSubstitutionRegex` 構成オプションを使用することができます。フォーマットは `s/your_regex/your_substitution/modifiers` で、JavaScript の正規表現の構文に従ったものです。例えば、`s/(https://www.)(.*)/$1extra-$2/` は、`https://www.example.com` を `https://www.extra-example.com` に変換します。

### テストを実行する

CLI にすべての `**/*.synthetics.json` Synthetic テスト (または[グローバルコンフィギュレーションファイル](#global-configuration-file-options))で指定したパスに紐付いたすべてのテスト) を自動検知させるか、`-p,--public-id` フラグを使用して実行するテストを指定するか、定義できます。

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

### テストトンネルを使用する

また、[@datadog/datadog-ci][1] NPM パッケージには安全なトンネリングが付属しており、内部アプリケーションの Synthetic テストを起動することができます。

テストトンネルは、インフラストラクチャーと Datadog の間にエンドツーエンドで暗号化された HTTP プロキシを作成し、CLI を通して送られた全てのテストリクエストが、自動的に `datadog-ci` クライアントを通してルーティングされることを可能にします。

詳しくは、[テストトンネル][3]をご覧ください。

### テスト結果の表示

#### CI の場合

テストの実行中に、テストの実行結果を CI 内で直接確認することができます。

{{< img src="synthetics/cicd_integrations/successful_test_result.png" alt="成功したテスト結果"  style="width:100%;">}}

実行ログを確認し、失敗したアサーションの原因を検索することで、テストが失敗した原因を特定できます。

{{< img src="synthetics/cicd_integrations/failed_test_result.png" alt="失敗したテスト結果" style="width:100%;">}}

#### Datadog アプリケーションの場合

[CI Results Explorer][5] およびテストの詳細ページにリストされている CI テスト結果も確認できます。

{{< img src="synthetics/ci_results_explorer/ci_results_explorer.png" alt="CI Results Explorer" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/node-proxy-agent
[3]: /ja/continuous_testing/testing_tunnel/
[4]: /ja/api/latest/synthetics/#get-a-test-configuration
[5]: /ja/continuous_testing/explorer