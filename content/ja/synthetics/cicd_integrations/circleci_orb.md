---
dependencies:
- https://github.com/DataDog/synthetics-ci-orb/blob/main/README.md
kind: documentation
title: Synthetics CI CircleCI Orb
---
## 概要

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-ci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/synthetics-ci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Datadog CircleCI orb を使用して、CircleCI パイプラインで Synthetic テストを実行します。

CircleCI コマンド orb は [datadog-ci][1] をインストールし、`datadog-ci synthetics run-tests` [コマンド][2]で [Datadog Synthetic テスト][3]を実行するものです。

## セットアップ

始めるには

1. CircleCI プロジェクトに環境変数として Datadog の API キーとアプリケーションキーを追加します。命名規則については、[入力](#inputs)を参照してください。詳しくは、[API とアプリケーションキー][2]を参照してください。
2. orb を実行しているイメージが、cURL がインストールされた Linux x64 のベースイメージであることを確認します。

ワークフローは、[シンプル](#simple-workflows)または[複雑](#complex-workflows)にすることができます。

## シンプルなワークフロー

### 公開 ID を使用したワークフロー例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

### グローバルコンフィグレーションのオーバーライドを使用したワークフロー例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

## 複雑なワークフロー

### `test_search_query` を使用したワークフロー例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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
### [Synthetic テストトンネル][10]を使用したワークフロー例

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

CircleCI パイプラインの `pollingTimeout` のカスタマイズなど、その他のオプションについては、[CI/CD インテグレーション構成][12]を参照してください。

## 入力

名前 | タイプ | デフォルト | 説明
---|---|---|---
`api_key` | 環境変数名 | `DATADOG_API_KEY` | API キーが格納されている環境変数名。
`api_key` | 環境変数名 | `DATADOG_APP_KEY` | アプリケーションキーが格納されている環境変数名。
`config_path` | 文字列 | `datadog-ci.json` | テストを起動する際に使用するグローバルな JSON 構成。
`fail_on_critical_errors` | boolean | `false` | テストがトリガーされなかったか、結果を取得できなかった場合に失敗します。
`fail_on_timeout` | boolean | `true` | テストタイムアウトを超えた場合、CI を強制的に失敗 (または合格) させます。
`files` | 文字列 | `{,!(node_modules)/**/}*.synthetics.json` | Synthetic テストのコンフィギュレーションファイルを検出するためのグロブパターン。
`locations` | 文字列 | _テストコンフィギュレーションファイルの値_ | テストが実行される場所をオーバーライドするための、セミコロンで区切られた場所の文字列。
`public_ids` | 文字列 | _テストコンフィギュレーションファイルの値_ | トリガーしたい Synthetic テストの公開 ID をカンマで区切った文字列。
`site` | 文字列 | `datadoghq.com` | データ送信先となる Datadog のサイト。環境変数 `DD_SITE` が設定されている場合は、そちらが優先されます。
`subdomain` | 文字列 | `app` | Datadog アプリケーションにアクセスするために設定されたカスタムサブドメインの名前。
`test_search_query` | 文字列 | _なし_ | 検索クエリに対応するテストをトリガーします。
`tunnel` | boolean | `false` | テストトンネルを使用してテストをトリガーします。
`variables` | 文字列 | _なし_ | テストに変数を注入するための Key-Value ペア。`KEY=VALUE` という形式である必要があります。
`version` | 文字列 | `v1.1.1` | 使用する `datadog-ci` のバージョン。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CI/CD インテグレーションコンフィギュレーション][6]
- [Synthetics と CI GitHub アクション][11]
- [Synthetic テストトンネル][10]


[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/ja/synthetics/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-ci-orb/issues
[8]: https://github.com/DataDog/synthetics-ci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/ja/synthetics/testing_tunnel
[11]: https://docs.datadoghq.com/ja/synthetics/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/ja/synthetics/cicd_integrations/configuration?tab=npm