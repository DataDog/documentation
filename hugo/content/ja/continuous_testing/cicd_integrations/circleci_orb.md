---
aliases:
- /ja/synthetics/cicd_integrations/circleci_orb
dependencies:
- https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md
title: Continuous Testing と CircleCI Orb
---
## 概要

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Datadog CircleCI orb を使って、CircleCI パイプライン内で Datadog Synthetic テストを実行します。

利用できる設定の詳細については [`datadog-ci synthetics run-tests` ドキュメント][1] を参照してください。

## セットアップ

始めるには

1. Datadog の API キーとアプリケーション キーを、CircleCI プロジェクトの環境変数として追加してください。
   - 詳細は [API キーとアプリケーション キー][2] を参照してください。
2. orb を実行するイメージは、`curl` がインストールされた Linux-x64 ベースのイメージを使用してください。
3. `synthetics-ci/run-tests` ステップを CircleCI ワークフローに追加し、以下に示す [入力](#inputs) を指定してワークフローをカスタマイズします。

ワークフローは[シンプル](#simple-usage)または[複雑](#complex-usage)にすることができます。

## シンプルの使用

### 公開 ID を使用した orb 使用の例

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: |
            abc-d3f-ghi
            jkl-mn0-pqr

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### グローバルコンフィグレーションのオーバーライドを使用した orb 使用の例

この orb は、[テスト ファイル][4] を指定するパターンのパスを上書きします。

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          files: e2e-tests/*.synthetics.json

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

Synthetic テストをトリガーする別のパイプライン例として [`simple-example.yml` ファイル][5] を参照してください。

## 複雑の使用

### `test_search_query` を使用した orb 使用の例

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          test_search_query: 'tag:e2e-tests'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### [Continuous Testing tunnel][7] を使った orb の利用例

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: your-image
    steps:
      - checkout
      - run:
          name: Running server in background
          command: npm start
          background: true
      - synthetics-ci/run-tests:
          config_path: tests/tunnel-config.json
          files: tests/*.synthetics.json
          test_search_query: 'tag:e2e-tests'
          tunnel: true

workflows:
  test-server:
    jobs:
      - build-image
      - integration-tests:
          requires:
            - build-image
```

`batchTimeout` のカスタマイズなど、CircleCI パイプライン向けの追加オプションは [CI/CD インテグレーション 設定][6] を参照してください。 Continuous Testing tunnel を使ってローカル サーバーを起動し、Synthetic テストをトリガーする別のパイプライン例として [`advanced-example.yml` ファイル][8] を参照してください。

## 入力

利用できる設定の詳細については [`datadog-ci synthetics run-tests` ドキュメント][1] を参照してください。

| 名前                      | 説明                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api_key`                 | Datadog API キーを格納する環境変数の名前。このキーは [Datadog 組織で作成][2] し、シークレットとして保存してください。 <br><sub>**デフォルト:** `DATADOG_API_KEY`</sub>                                                                                                            |
| `app_key`                 | Datadog アプリケーション キーを格納する環境変数の名前。このキーは [Datadog 組織で作成][2] し、シークレットとして保存してください。 <br><sub>**デフォルト:** `DATADOG_APP_KEY`</sub>                                                                                                    |
| `background`              | このステップをバックグラウンドで実行するかどうかは [CircleCI 公式ドキュメント][18] を参照してください。 <br><sub>**デフォルト:** `false`</sub>                                                                                                                                                                              |
| `batch_timeout`           | CI バッチのタイムアウト時間をミリ秒単位で指定します。バッチがタイムアウトすると CI ジョブは失敗し、新しいテスト実行はトリガーされませんが、進行中のテスト実行は正常に完了します。<br><sub>**デフォルト:** `1800000` (30分)</sub>                                                                          |
| `config_path`             | datadog-ci を設定する [グローバル設定ファイル][12] のパス。 <br><sub>**デフォルト:** `datadog-ci.json`</sub>                                                                                                                                                                                          |
| `datadog_site`            | Datadog サイト。指定できる値は [この表][10] に記載されています。 <br><sub>**デフォルト:** `datadoghq.com`</sub> <br><br>右側で正しい SITE が選択されていることを確認したうえで {{< region-param key="dd_site" code="true" >}} に設定してください。                                                    |
| `fail_on_critical_errors` | レート制限、認証失敗、Datadog インフラストラクチャーの問題など、通常は一過性の重大なエラーが発生した場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `false`</sub>                                                                                                                        |
| `fail_on_missing_tests`   | 実行するテストのリストが空であるか、リストに明示的に示されたテストが欠けている場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `false`</sub>                                                                                                                                                                           |
| `fail_on_timeout`         | CI バッチがタイムアウトにより失敗した場合に CI ジョブを失敗させます。<br><sub>**デフォルト:** `true`</sub>                                                                                                                                                                                                                             |
| `files`                   | Synthetic の [テスト設定ファイル][4] を検出するための Glob パターン (改行区切り)。 <br><sub>デフォルト: `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                         |
| `junit_report`            | JUnit レポートを生成する場合のファイル名。 <br><sub>デフォルト: なし</sub>                                                                                                                                                                                                                          |
| `locations`               | テストの実行ロケーション一覧を上書きします (改行またはカンマ区切り)。指定できる値は [この API 応答][3] に記載されています。 <br><sub>**デフォルト:** なし</sub>                                                                                                                                  |
| `no_output_timeout`       | コマンドが出力なしで実行できる経過時間。値は単位サフィックス付きの小数で、例: `20m`、`1.25h`、`5s`。詳細は [CircleCI 公式ドキュメント][13] を参照してください。 <br><sub>**デフォルト:** `35m`</sub>                                                                                                              |
| `public_ids`              | 実行する Synthetic テストの公開 ID (改行またはカンマ区切り)。値を指定しない場合は Synthetic の [テスト設定ファイル][4] からテストを検出します。 <br><sub>**デフォルト:** なし</sub>                                                                                                                 |
| `selective_rerun`         | 失敗したテストのみを再実行するかどうか。特定のコミットですでに合格しているテストは、その後の CI バッチでは再実行されません。既定では [組織のデフォルト設定][17] が使用されます。設定で既定が有効になっている場合でも常に全件実行したいときは `false` を設定してください。 <br><sub>**デフォルト:** なし</sub> |
| `subdomain`               | Datadog 組織にアクセスするためのカスタム サブドメイン。URL が `myorg.datadoghq.com` の場合、カスタム サブドメインは `myorg` です。 <br><sub>**デフォルト:** `app`</sub>                                                                                                                                                 |
| `test_search_query`       | [検索クエリ][14] を使って、実行する Synthetic テストを選択します。クエリは [Synthetic Tests 一覧ページの search bar][15] で作成し、コピーして貼り付けてください。 <br><sub>**デフォルト:** なし</sub>                                                                                                                |
| `tunnel`                  | [Continuous Testing tunnel][7] を使って、内部環境に対するテストを起動します。 <br><sub>**デフォルト:** `false`</sub>                                                                                                                                                                                          |
| `variables`               | Synthetic テストで、既存のローカル変数と[グローバル変数][16]をオーバーライドするか、新しいローカル変数と[グローバル変数][16]を注入します (改行またはカンマ区切り)。例: `START_URL=https://example.org,MY_VARIABLE=My title`。<br><sub>**デフォルト:** なし</sub>                                                                      |

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Continuous Testing 入門][11]
- [Continuous Testing と CI/CD の構成][6]
- [Datadog による継続的テストのベスト プラクティス][9]

[1]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[4]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[6]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration
[7]: https://docs.datadoghq.com/ja/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[9]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[10]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site
[11]: https://docs.datadoghq.com/ja/getting_started/continuous_testing/
[12]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[13]: https://circleci.com/docs/configuration-reference/#run
[14]: https://docs.datadoghq.com/ja/synthetics/explore/#search
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/ja/synthetics/platform/settings/?tab=specifyvalue#global-variables
[17]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[18]: https://circleci.com/docs/configuration-reference/#background-commands