---
app_id: cloudquery-cloud
categories:
- developer tools
- cloud
custom_kind: integration
description: シンプル、高速、拡張可能なデータ ムーブメント
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: CloudQuery Cloud
---
## 概要

[CloudQuery](https://www.cloudquery.io/) is an open-source, high-performance data integration framework built for developers, with support for a wide range of plugins.

CloudQuery はクラウド API から構成情報を抽出、変換、ロードし、データベース、データ レイク、ストリーミング プラットフォームなどのさまざまな対応先に送ってさらに分析できるようにします。

[CloudQuery Cloud](https://cloud.cloudquery.io/) is a great way to get started with CloudQuery and syncing data from source to destination without the need to deploy your own infrastructure. It is also much easier to connect to sources and destinations with the integrated OAuth authentication support. You only need to select a source and destination plugin and CloudQuery will take care of the rest.

## セットアップ

### インストール

1. Sign up for free at [cloud.cloudquery.io](https://cloud.cloudquery.io/).
1. Datadog で CloudQuery Cloud インテグレーション タイルに移動します。
1. **Connect Accounts** をクリックします。
1. CloudQuery にリダイレクトされ、ログインします。
1. **Sources** ページに移動し、Datadog ソースを追加します。
1. **Authentication** セクションで **Authenticate** ボタンを使用し、OAuth2 フローを通じて Datadog アカウントへのアクセスを許可します。

For more information about using CloudQuery Cloud, refer to the [quickstart guide](https://docs.cloudquery.io/docs/quickstart/cloudquery-cloud).

### 設定

Detailed documentation for the CloudQuery Datadog source is available [here](https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs).

## アンインストール

1. Navigate to the **Sources** page under [CloudQuery Cloud](https://cloud.cloudquery.io/) and find your Datadog source you have previously set up.
1. **Edit source** タブで **Delete this source** ボタンをクリックします。

## サポート

For support, contact [CloudQuery](https://www.cloudquery.io/) or [CloudQuery Community](https://community.cloudquery.io/).