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

[`SyntheticsRunTests`][3] タスクを使用すると、Azure パイプラインの構成内で Synthetic テストを実行し、Azure DevOps を使用しているすべてのチームが、ソフトウェア ライフサイクルの各段階で Synthetic テストの恩恵を受けられるようにすることができます。

利用可能な構成の詳細については、 [`datadog-ci synthetics run-tests` のドキュメント][13]を参照してください。

## 認証

### サービス接続

[Datadog サイト][11]に接続するには、Datadog は [`SyntheticsRunTests`][3] タスクの構成時にカスタム サービス接続を設定することを推奨しています。

以下の入力が必要です。

- Datadog site: ご利用の Datadog サイト。使用可能な値は[こちらの表][11]に記載されています。 
- Custom subdomain (デフォルト: `app`): Datadog 組織にアクセスするためのカスタム サブドメイン。URL が `myorg.datadoghq.com` の場合、カスタム サブドメインは `myorg` になります。
- API key: Datadog API キー。このキーは [Datadog 組織内で作成][6]されます。
- Application key: Datadog アプリケーション キー。このキーは [Datadog 組織内で作成][6]されます。


### API キーとアプリケーションキー

- API key: Datadog API キーです。このキーは [Datadog 組織内で作成][6]され、[シークレット][7]として保存する必要があります。
- Application key: Datadog アプリケーション キーです。このキーは [Datadog 組織内で作成][6]され、[シークレット][7]として保存する必要があります。
- Datadog サイト: ご利用の Datadog サイト。使用可能な値は[こちらの表][11]に記載されています。 
- Custom subdomain (オプション): Datadog 組織にアクセスするためのカスタム サブドメイン。URL が `myorg.datadoghq.com` の場合、カスタム サブドメインは `myorg` になります。

## セットアップ

Datadog アカウントに接続するために、Azure パイプラインプロジェクトで [Datadog CI サービス接続を作成][5]します。一度作成すれば、あとはタスクにサービス接続の名前を入れるだけです。

1. Azure Organization に [Visual Studio Marketplace から Datadog Continuous Testing 拡張機能][1]をインストールします。
2. [Datadog CI サービス接続](#authentication)に、または [Azure パイプラインプロジェクトのシークレット][7]として Datadog API キーとアプリケーションキーを追加します。
3. Azure DevOps パイプラインで、[`SyntheticsRunTests`][3] タスクを使用します。

タスクは[シンプル](#simple-usage)または[複雑](#complex-usage)にすることができます。

## シンプルの使用

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
    datadogSite: '$(DatadogSite)'
    subdomain: 'myorg'
```

## 複雑の使用

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

### `configPath` でグローバル構成ファイルを使用したタスク例

デフォルトでは、グローバル構成ファイルへのパスは `datadog-ci.json` です。このパスは `config_path` の入力値でオーバーライドすることができます。

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    configPath: './global.config.json'
    connectedService: 'my-datadog-ci-connected-service'
```

## 入力

利用可能な構成の詳細については、 [`datadog-ci synthetics run-tests` のドキュメント][13]を参照してください。

| 名前                   | 説明                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`               | Datadog API キーです。このキーは [Datadog 組織内で作成][6]され、[シークレット][7]として保存する必要があります。<br><sub>`authenticationType == apiAppKeys` の場合は**必須**</sub>                                                                                                                             |
| `appKey`               | Datadog アプリケーション キーです。このキーは [Datadog 組織内で作成][6]され、[シークレット][7]として保存する必要があります。<br><sub>`authenticationType == apiAppKeys` の場合は**必須**</sub>                                                                                                                     |
| `authenticationType`   | (**必須**) 資格情報の保存・取得方法。<br><sub>`apiAppKeys` または `connectedService` のいずれかになります</sub>                                                                                                                                                                                             |
| `batchTimeout`         | CI バッチのタイムアウト時間をミリ秒単位で指定します。バッチがタイムアウトすると CI ジョブは失敗し、新しいテスト実行はトリガーされませんが、進行中のテスト実行は正常に完了します。<br><sub>**デフォルト:** `1800000` (30分)</sub>                                                                          |
| `connectedService`     | [Datadog CI サービス接続](#setup)の名前。<br><sub>`authenticationType == connectedService` の場合は**必須**</sub>                                                                                                                                                                                 |
| `configPath`           | datadog-ci の構成に使用されている[グローバル構成ファイル][9]へのパス。<br><sub>**デフォルト:** `datadog-ci.json`</sub>                                                                                                                                                                                           |
| `datadogSite`          | ご利用の Datadog サイト。使用可能な値は[こちらの表][11]に記載されています。<br><sub>**デフォルト:** `datadoghq.com`</sub>  <br><br>{{< region-param key="dd_site" code="true" >}} に設定します (右側で正しい SITE が選択されていることを確認してください)。                                                    |
| `failOnCriticalErrors` | レート制限、認証失敗、Datadog インフラストラクチャーの問題など、通常は一過性の重大なエラーが発生した場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `false`</sub>                                                                                                                        |
| `failOnMissingTests`   | 実行するテストのリストが空であるか、リストに明示されたテストが欠けている場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `false`</sub>                                                                                                                                                                           |
| `failOnTimeout`        | CI バッチがタイムアウトにより失敗した場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `true`</sub>                                                                                                                                                                                                                             |
| `files`                | Synthetic [テストの構成ファイル][14]を検出するための Glob パターン (改行区切り)。<br><sub>**デフォルト:** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                    |
| `jUnitReport`          | JUnit レポートを生成したい場合のファイル名。<br><sub>**デフォルト:** なし</sub>                                                                                                                                                                                                                      |
| `locations`            | テストを実行する場所のリストをオーバーライドします (改行またはカンマ区切り)。使用可能な値は、[こちらの API 応答][19]に記載されています。<br><sub>**デフォルト:** なし</sub>                                                                                                                                 |
| `publicIds`            | 実行する Synthetic テストの公開 ID (改行またはカンマ区切り)。値が指定されない場合、テストは Synthetic [テスト構成ファイル][14]から検出されます。<br><sub>**デフォルト:** なし</sub>                                                                                                                |
| `selectiveRerun`       | 失敗したテストだけを再実行するかどうかを指定します。あるコミットでテストが既に合格している場合、それ以降の CI バッチではそのテストを再実行しません。デフォルトでは、[組織のデフォルト設定][18]が使用されます。構成でデフォルトが有効になっている場合でも、`false` に設定するとフル実行を強制します。<br><sub>**デフォルト:** なし</sub> |
| `subdomain`            | `authenticationType == apiAppKeys` の場合に、Datadog 組織にアクセスするためのカスタム サブドメイン。URL が `myorg.datadoghq.com` の場合、カスタム サブドメインは `myorg` になります。<br><sub>**デフォルト:** `app`</sub>                                                                                                         |
| `testSearchQuery`      | [検索クエリ][10]を使用して、実行する Synthetic テストを選択します。[Synthetic Tests list ページの検索バー][15]を使ってクエリを作成し、コピー＆ペーストしてください。<br><sub>**デフォルト:** なし</sub>                                                                                                                |
| `variables`            | Synthetic テストで、既存のローカル変数と[グローバル変数][16]を上書きするか、キーと値のペアとして新しいローカル変数と[グローバル変数][16]を追加します (改行またはカンマ区切り)。例: `START_URL=https://example.org,MY_VARIABLE=My title`。<br><sub>**デフォルト:** なし</sub>                                                                      |

## 出力

| 名前                     | 説明                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `batchUrl`               | CI バッチの URL。                                                             |
| `criticalErrorsCount`    | CI バッチ実行中に発生した重大なエラーの数。                     |
| `failedCount`            | CI バッチ実行中に失敗した結果の数。                               |
| `failedNonBlockingCount` | CI バッチ実行中に CI をブロックすることなく失敗した結果の数。       |
| `passedCount`            | CI バッチ実行中に合格した結果の数。                               |
| `previouslyPassedCount`  | 同じコミットに対する以前の CI バッチで既に合格した結果の数。 |
| `testsNotFoundCount`     | CI バッチの開始時に見つけられなかったテストの数。              |
| `testsSkippedCount`      | CI バッチの開始時にスキップされたテストの数。                    |
| `timedOutCount`          | CI バッチのタイムアウトにより失敗した結果の数。                    |
| `rawResults`             | [`synthetics.Result[]`][20] の配列を JSON エンコードした文字列。                     |

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Continuous Testing の概要][17]
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
[9]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[10]: https://docs.datadoghq.com/ja/synthetics/explore/#search
[11]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[14]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/ja/synthetics/platform/settings/?tab=specifyvalue#global-variables
[17]: https://docs.datadoghq.com/ja/getting_started/continuous_testing/
[18]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[19]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[20]: https://github.com/DataDog/datadog-ci/blob/251299775d28b0535d0e5557fcc494a8124d3b11/src/commands/synthetics/interfaces.ts#L196-L227