---
aliases:
- /continuous_integration/static_analysis/circleci_orbs
- /static_analysis/circleci_orbs
dependencies:
- "https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md"
description: Use Datadog and CircleCI to run Static Analysis jobs in a CI pipeline.
title: Static Analysis and CircleCI Orbs
---
[![CircleCI Build Status](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/datadog/datadog-static-analyzer-circleci-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

## 概要

Run a [Datadog Static Analysis][1] job in your CircleCI workflows.

## セットアップ

Datadog Static Analysis を使用するには、リポジトリのルートディレクトリで `static-analysis.datadog.yml` ファイルを追加して、使用するルールセットを指定する必要があります。

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Python の例

Python ベースのリポジトリの例を見ることができます。

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## ワークフロー

Datadog Static Analysis ジョブを実行するためのファイルを `.circleci` に作成します。

以下はワークフローファイルのサンプルです。

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: "my-service"
          env: "ci"
          site: {{< region-param key="dd_site" code="true" >}}
          cpu_count: 2
          enable_performance_statistics: false
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### 環境変数

Set the following environment variables in the [CircleCI Project Settings page][2].

| 名前         | 説明                                                                                                                | 必須 |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][3] and should be stored as a secret.              | はい     |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][4] and should be stored as a secret.      | はい     |

## 入力

ワークフローをカスタマイズするために、Static Analysis に以下のパラメーターを設定することができます。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | 結果をタグ付けしたいサービス。                                                                                | はい     |                 |
| `env`     | 結果をタグ付けしたい環境。Datadog は、この入力値として `ci` を使用することを推奨します。                 | いいえ    | `none`          |
| `site`    | 情報を送信する [Datadog サイト][4]。                                                                                 | いいえ    | `datadoghq.com` | 
| `cpu_count`  | アナライザーが使用する CPU の数を設定します。                                                                            | いいえ      | `2`             |
| `enable_performance_statistics` | 分析されたファイルの実行時間統計を取得します。                                                   | いいえ      | `false`         |

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Learn about Code Analysis][1]

[1]: https://docs.datadoghq.com/code_analysis/static_analysis
[2]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#application-keys
