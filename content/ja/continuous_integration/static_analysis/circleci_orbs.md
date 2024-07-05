---
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md
description: Datadog と CircleCI を使用して、CI パイプラインで Static Analysis ジョブを実行します。
title: Static Analysis と CircleCI Orbs
---
[![CircleCI Build Status](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/datadog/datadog-static-analyzer-circleci-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

## 概要

CircleCI ワークフローで Datadog Static Analysis ジョブを実行します。

Static Analysis は非公開ベータ版です。アクセスをリクエストするには、[サポートにご連絡ください][5]。

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
          service: my-service
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### 環境変数

[CircleCI Project Settings ページ][1]で以下の環境変数を設定してください。

| 名前         | 説明                                                                                                                | 必須 |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Datadog API キー。このキーは [Datadog 組織][2]によって作成され、シークレットとして保存する必要があります。              | はい     |
| `DD_APP_KEY` | Datadog アプリケーションキー。このキーは [Datadog 組織][3]によって作成され、シークレットとして保存する必要があります。      | はい     |

## 入力

ワークフローをカスタマイズするために、Static Analysis に以下のパラメーターを設定することができます。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | 結果をタグ付けしたいサービス。                                                                                | はい     |                 |
| `env`     | 結果をタグ付けしたい環境。Datadog は、この入力値として `ci` を使用することを推奨します。                 | ✕    | `none`          |
| `site`    | 情報を送信する [Datadog サイト][4]。                                                                                 | ✕    | `datadoghq.com` | 

[1]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://docs.datadoghq.com/ja/help/