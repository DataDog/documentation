---
aliases:
- /ja/synthetics/cicd_integrations/circleci_orb
dependencies:
- https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md
title: Continuous Testing と CircleCI Orb
---
## 概要

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Datadog CircleCI orb を使用して、CircleCI パイプラインで Synthetic テストを実行します。

CircleCI コマンド orb は [datadog-ci][1] をインストールし、`datadog-ci synthetics run-tests` [コマンド][2]で [Datadog Synthetic テスト][3]を実行するものです。

## セットアップ

始めるには

1. Datadog の API キーとアプリケーションキーを環境変数として CircleCI プロジェクトに追加します。詳しくは、[API とアプリケーションキー][2]を参照してください。
2. orb を実行しているイメージが、cURL がインストールされた Linux x64 のベースイメージであることを確認します。
3. [`run-tests.yml`][14] ファイルを作成し、命名規則に従ってワークフローの[入力](#inputs)を指定することで、ワークフローをカスタマイズします。

ワークフローは[シンプル](#simple-usage)または[複雑](#complex-usage)にすることができます。

## シンプルの使用

### 公開 ID を使用した orb 使用の例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.6.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### グローバルコンフィグレーションのオーバーライドを使用した orb 使用の例

この orb では、[テストファイル][18]のパターンへのパスがオーバーライドされます。

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.6.0

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

Synthetic テストをトリガーするパイプラインの別の例については、[`simple-example.yml` ファイル][15]を参照してください。

## 複雑の使用

### `test_search_query` を使用した orb 使用の例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.6.0

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

### [Continuous Testing Tunnel][10] を使用した orb 使用の例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.6.0

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

CircleCI パイプラインの `pollingTimeout` をカスタマイズするなどの追加オプションについては、[CI/CD インテグレーション構成][18]を参照してください。ローカルサーバーを起動し、Continuous Testing Tunnel を使用して Synthetic テストをトリガーする別のサンプルパイプラインについては、[`advanced-example.yml` ファイル][16]を参照してください。

## 入力

ワークフローをカスタマイズするために、[`run-tests.yml` ファイル][14]に以下のパラメーターを設定することができます。

| 名前                      | タイプ         | デフォルト                                   | 説明                                                                                                                                                                                                 |
| ------------------------- | ------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | 環境変数名 | `DATADOG_API_KEY`                         | API キーが格納されている環境変数名。                                                                                                                                                |
| `app_key`                 | 環境変数名 | `DATADOG_APP_KEY`                         | APP キーが格納されている環境変数名。                                                                                                                                                |
| `config_path`             | 文字列       | `datadog-ci.json`                         | テストを起動する際に使用するグローバルな JSON 構成。                                                                                                                                                    |
| `fail_on_critical_errors` | boolean      | `false`                                   | テストがトリガーされなかったか、結果を取得できなかった場合に失敗します。                                                                                                                                           |
| `fail_on_missing_tests`   | boolean      | `false`                                   | パブリック ID (`public_ids` を使用するか、[テストファイル][12]にリストされている) を持つ指定されたテストが少なくとも 1 つ実行中に見つからない場合 (例えば、プログラム上または Datadog サイトで削除された場合)、失敗します。 |
| `fail_on_timeout`         | boolean      | `true`                                    | テストタイムアウトを超えた場合、CI を強制的に失敗 (または合格) させます。                                                                                                                              |
| `files`                   | 文字列       | `{,!(node_modules)/**/}*.synthetics.json` | Synthetic テストのコンフィギュレーションファイルを検出するためのグロブパターン。                                                                                                                                                        |
| `junit_report`            | 文字列       | _なし_                                    | JUnit レポートを生成したい場合のファイル名。                                                                                                                                                |
| `locations`               | 文字列       | _[テストファイル][18]の値_              | テストが実行される場所をオーバーライドするための、セミコロンで区切られた場所の文字列。                                                                                                                 |
| `polling_timeout`         | 数値       | _30 分_                              | アクションがテスト結果のポーリングを停止するまでの時間 (ミリ秒単位)。CI レベルでは、この時間以降に完了したテスト結果は失敗とみなされます。                                    |
| `public_ids`              | 文字列       | _[テストファイル][18]の値_              | トリガーしたい Synthetic テストの公開 ID をカンマで区切った文字列。                                                                                                                           |
| `site`                    | 文字列       | `datadoghq.com`                           | データ送信先となる [Datadog のサイト][17]。環境変数 `DD_SITE` が設定されている場合は、そちらが優先されます。                                                                                                  |
| `subdomain`               | 文字列       | `app`                                     | Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。                                                                                                                                    |
| `test_search_query`       | 文字列       | _なし_                                    | 検索クエリに対応するテストをトリガーします。                                                                                                                                                              |
| `tunnel`                  | ブール値      | `false`                                   | Continuous Testing Tunnel を使用してテストをトリガーします。                                                                                                                                                         |
| `variables`               | 文字列       | _なし_                                    | テストに変数を注入するための Key-Value ペア。`KEY=VALUE` という形式である必要があります。                                                                                                                    |

CircleCI パイプラインの追加オプションについては、[Continuous Testing と CI/CD インテグレーション構成][12]を参照してください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Continuous Testing と CI/CD の構成][6]
- [Continuous Testing と CI GitHub アクション][11]
- [Datadog を使った継続的テストのベストプラクティス][13]
- [Continuous Testing Tunnel][10]

[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/issues
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/ja/continuous_testing/testing_tunnel
[11]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration?tab=npm
[13]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[14]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/commands/run-tests.yml
[15]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[16]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[17]: https://docs.datadoghq.com/ja/getting_started/site/
[18]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files