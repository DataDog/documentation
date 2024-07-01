---
aliases:
- /ja/synthetics/cicd_integrations/azure_devops_extension
dependencies:
- https://github.com/DataDog/datadog-ci-azure-devops/blob/main/README.md
description: Synthetics と Datadog CI 拡張機能を使用して、CI パイプラインで使用できるタスクを作成します。
title: Continuous Testing と Datadog CI Azure DevOps 拡張機能
---
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Datadog.datadog-ci)][1]
[![Build Status](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_apis/build/status%2FDevelopment?branchName=main)](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_build/latest?definitionId=4&branchName=main)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## 概要

Datadog Continuous Testing Azure DevOps 拡張機能を使用すると、Azure パイプラインの構成内で Synthetic テストを実行し、Azure DevOps を使用しているすべてのチームが、ソフトウェアライフサイクルの各段階で Synthetic テストの恩恵を受けられるようにすることができます。タスクとして [`SyntheticsRunTests`][3] を実行することができます。

## Authentication

### サービス接続

[Datadog サイト][11]に接続するために、Datadog は Synthetic Run Test タスクの構成時にカスタムサービス接続を設定することを推奨しています。

以下の入力が必要です。

- Datadog site: どの [Datadog サイト][11]に接続し、データを送信するか。
- Custom subdomain (デフォルト: `app`): Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog へのアクセスに使用する URL が `myorg.datadoghq.com` の場合、この値は `myorg` にする必要があります。
- API Key: Datadog API キー。このキーは、[Datadog 組織][6]によって作成されます。
- Application key: Datadog アプリケーションキー。このキーは、[Datadog 組織][6]によって作成されます。


### API キーとアプリケーションキー

- API Key: Datadog API キー。このキーは [Datadog 組織][6]によって作成され、環境変数としてアクセスされます。
- Application key: Datadog アプリケーションキー。このキーは [Datadog 組織][6]によって作成され、環境変数としてアクセスされます。
- Datadog site: 接続し、データを送信する [Datadog サイト][11]。
- Custom subdomain (オプション): Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。Datadog へのアクセスに使用する URL が `myorg.datadoghq.com` の場合、この値は `myorg` にする必要があります。

## セットアップ

Datadog アカウントに接続するために、Azure パイプラインプロジェクトで [Datadog CI サービス接続を作成][5]します。一度作成すれば、あとはタスクにサービス接続の名前を入れるだけです。

1. Azure Organization に [Visual Studio Marketplace から Datadog Continuous Testing 拡張機能][1]をインストールします。
2. [Datadog CI サービス接続](#authentication)に、または [Azure パイプラインプロジェクトのシークレット][7]として Datadog API キーとアプリケーションキーを追加します。
3. Azure DevOps パイプラインで、`SyntheticsRunTests` タスクを使用します。

タスクは[シンプル](#simple-usage)または[複雑](#complex-usage)にすることができます。

## シンプルの使用

> **注**: 最近、タスクのメジャーバージョンを `SyntheticsRunTests@0` から `SyntheticsRunTests@1` に変更しました。
>
> これは**重大な変更ではありません**が、タスクバージョンと拡張機能バージョンの間の調整です。

### 公開 ID を使用したタスク例

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    publicIds: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### 既存の `synthetics.json` ファイルを使用したタスク例

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    files: 'e2e-tests/*.synthetics.json'
```

テストファイルの例としては、この [`test.synthetics.json` ファイル][14]を参照してください。

### 認証にパイプラインシークレットを使用したタスク例

```yaml
- task: SyntheticsRunTests@1
  inputs:
    authenticationType: 'apiAppKeys'
    apiKey: '$(DatadogApiKey)'
    appKey: '$(DatadogAppKey)'
    subdomain: 'myorg'
    datadogSite: '$(DatadogSite)'
```

## 複雑の使用

> **注**: 最近、タスクのメジャーバージョンを `SyntheticsRunTests@0` から `SyntheticsRunTests@1` に変更しました。
>
> これは**重大な変更ではありません**が、タスクバージョンと拡張機能バージョンの間の調整です。

### `testSearchQuery` を使用したタスク例

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
```

### `testSearchQuery` と変数のオーバーライドを使用したタスク例

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
    variables: |
      START_URL=https://staging.website.com
      PASSWORD=$(StagingPassword)
```

### `configPath` によるグローバル構成オーバーライドを使用したタスク例

このタスクは、グローバルな `datadog-ci.config.json` ファイルへのパスをオーバーライドします。

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    configPath: './synthetics-config.json'
```

コンフィギュレーションファイルの例としては、この [`global.config.json` ファイル][13] をご覧ください。

## 入力

| 名前                   | 要件 | 説明                                                                                                                                                                                                                                     |
| ---------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authenticationType`   | _必須_  | Datadog に使用させたい認証のタイプで、`connectedService` または `apiAppKeys` のどちらか。                                                                                                                                                  |
| `connectedService`     | _オプション_  | [Datadog CI サービス接続](#setup)で、`connectedService` 認証タイプを使用する際に使用する名前。                                                                                                                           |
| `apiKey`               | _オプション_  | `apiAppKeys` 認証タイプを使用する際の Datadog API キー。このキーは [Datadog 組織][6]によって作成され、[シークレット][7]として保存される必要があります。                                                                              |
| `appKey`               | _オプション_  | `apiAppKeys` 認証タイプを使用する際の Datadog アプリケーションキー。このキーは [Datadog 組織][6]によって作成され、[シークレット][7]として保存される必要があります。                                                                      |
| `subdomain`            | _オプション_  | `apiAppKeys` 認証タイプを使用する際に、Datadog アプリケーションにアクセスするために設定するカスタムサブドメインの名前。Datadog にアクセスするための URL が `myorg.datadoghq.com` である場合、この値は `myorg` に設定する必要があります。**デフォルト:** `app`。 |
| `datadogSite`          | _オプション_  | `apiAppKeys` 認証タイプを使用する場合の [Datadog サイト][11]。**デフォルト:** `datadoghq.com`。                                                                                                                                           |
| `publicIds`            | _オプション_  | トリガーしたい Synthetic テストの ID を、改行またはカンマで区切ったリスト。値を指定しない場合、タスクは `synthetics.json` という名前のファイルを探します。                                                                       |
| `testSearchQuery`      | _オプション_  | [検索][8]クエリに対応するテストをトリガーします。これは、テストの構成にタグを付けている場合に便利です。詳しくは、[タグの命名規則とベストプラクティス][10]を参照してください。                                                   |
| `files`                | _オプション_  | Synthetic テストの構成ファイルを検出するための Glob パターン。**デフォルト:** `{,!(node_modules)/**/}*.synthetics.json`。                                                                                                                                   |
| `configPath`           | _オプション_  | テストを起動するときに使用されるグローバル JSON 構成。詳細は[構成例][9]を参照してください。**デフォルト:** `datadog-ci.json`。                                                                                              |
| `variables`            | _オプション_  | Synthetic テストに使用するグローバル変数のリストで、改行またはカンマで区切って指定します。例: `START_URL=https://example.org,MY_VARIABLE=My title`。**デフォルト:** `[]`。                                                                  |
| `jUnitReport`          | _オプション_  | JUnit レポートを生成したい場合のファイル名。                                                                                                                                                                                    |
| `pollingTimeout`       | _オプション_  | タスクがテスト結果のポーリングを停止するまでの時間 (ミリ秒単位)。CI レベルでは、この時間以降に完了したテスト結果は失敗とみなされます。**デフォルト:** 30 分。                                                 |
| `failOnCriticalErrors` | _オプション_  | テストがトリガーされなかったり、Datadog から結果を取得できなかったりした場合に、CI ジョブを失敗させます。**デフォルト:** `false`                                                                                                                                 |
| `failOnMissingTests`   | _オプション_  | パブリック ID (`publicIds` を使用するか、[テストファイル][14]にリストされている) を持つ指定されたテストが少なくとも 1 つ実行中に見つからない場合 (例えば、プログラム上または Datadog サイトで削除された場合)、CI ジョブを失敗させます。**デフォルト:** `false`     |
| `failOnTimeout`        | _オプション_  | 少なくとも 1 つのテストがデフォルトのテストタイムアウトを超えた場合、CI ジョブを失敗させます。**デフォルト:** `true`                                                                                                                                                     |

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Continuous Testing と CI/CD の構成][4]
- [Datadog を使った継続的テストのベストプラクティス][12]

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-ci
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci-azure-devops/tree/main/SyntheticsRunTestsTask
[4]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables
[8]: https://docs.datadoghq.com/ja/synthetics/search/#search
[9]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[10]: https://docs.datadoghq.com/ja/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[11]: https://docs.datadoghq.com/ja/getting_started/site/
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[14]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files