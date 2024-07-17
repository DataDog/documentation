---
categories:
- 自動化
- クラウド
- 構成 & デプロイ
- developer tools
- metrics
custom_kind: integration
dependencies: []
description: Travis CI に接続して、ビルド時間、ビルドステータス、ジョブなどに関するメトリクスを表示
doc_link: https://docs.datadoghq.com/integrations/travis_ci/
draft: false
git_integration_title: travis_ci
has_logo: true
integration_id: ''
integration_title: Travis CI
integration_version: ''
is_public: true
manifest_version: '1.0'
name: travis_ci
public_title: Datadog-Travis CI インテグレーション
short_description: Travis CI に接続して、ビルド時間、ビルドステータス、ジョブなどに関するメトリクスを表示
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Travis CI is a hosted continuous integration service used to build and test software projects. Connect to Travis CI to view metrics about build times, build statuses, jobs, and more.

## Setup

### Installation

Travis CI インテグレーションは、[インテグレーションタイル][1]からインストールできます。

### Configuration

1. アカウント名、API トークン (Travis CI の Profile タブにあります)、プロジェクトタイプを追加します。プロジェクトタイプは以下のように決定されます。

    - **オープンソース**は、travis-ci.org に接続されたリポジトリです。
    - **プライベート**は、travis-ci.co に接続されたリポジトリです。
    - **エンタープライズ**は、カスタム Travis CI ドメインに接続されたリポジトリです。

2. アカウントが Travis CI Enterprise に登録されている場合は、カスタムドメインを入力します。
3. 必要に応じて、"Add row" をクリックして複数のアカウントを追加します。
4. 'Install' をクリックします (初回インストール時のみ)。
5. 対応する API キーを使用して、メトリクスの収集元になるオーガニゼーションとリポジトリを追加します。
6. オーガニゼーションに属するすべてのリポジトリのメトリクスを収集する場合は、プロジェクトで `<オーガニゼーション名>/*` と入力します。
7. 'Update Configuration' をクリックします。

## Data Collected

### Metrics
{{< get-metrics-from-git "travis_ci" >}}


### Events

Travis CI インテグレーションには、イベントは含まれません。

### Service Checks

Travis CI インテグレーションには、サービスのチェック機能は含まれません。

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/integrations/travis_ci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/travis_ci/travis_ci_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/