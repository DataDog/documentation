---
categories:
  - security
ddtype: crawler
dependencies: []
description: Immunio からデータを収集して攻撃パターンを可視化および監視。
doc_link: https://docs.datadoghq.com/integrations/immunio/
draft: false
git_integration_title: immunio
has_logo: true
integration_id: immunio
integration_title: Immunio
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: immunio
public_title: Datadog-Immunio インテグレーション
short_description: Immunio からデータを収集して攻撃パターンを可視化および監視。
version: '1.0'
---
{{< img src="integrations/immunio/immunio_dash.png" alt="Immunio ダッシュボード" popup="true">}}

## 概要

IMMUNIO の高度なアプリケーションセキュリティ監視を Datadog に接続して、攻撃による Web アプリケーションへの影響を可視化し、IMMUNIO の自動保護を監視します。

IMMUNIO はアプリケーションを監視して、次のすべての攻撃を検出および防御します。

- アカウント乗っ取り攻撃 (ブルートフォース、クレデンシャルスタッフィングなど)
- コードレベルの攻撃 (XSS、SQLi、リモートコード実行など)
- カスタマイズされたビジネスレベルの攻撃 (クレジットカード詐欺などの不正行為)
- 一般的な不良行為 (スキャニング、スクレイピングなど)

## セットアップ

### インストール

1. [IMMUNIO アカウント][1]にログインします。
2. [インテグレーションのセットアップページ][2]に移動します。
    {{< img src="integrations/immunio/immuniosetup1.png" alt="インテグレーション設定ページ" popup="true">}}
3. "Add an API Key" をクリックします。
    {{< img src="integrations/immunio/immuniosetup2.png" alt="API キーを追加" popup="true">}}
4. API キーを追加します。

### コンフィギュレーション

このインテグレーションに構成手順は必要ありません。

### 検証

インストールと構成を検証するには、Agent を再起動し、info コマンドを実行します。出力には、次のようなセクションが含まれているはずです。

```shell
Checks
======
  [...]
  immunio
  -----
      - instance #0 [OK]
      - Collected 4 metrics & 0 events
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "immunio" >}}


### イベント

IMMUNIO インテグレーションには、イベントは含まれません。

### サービスのチェック

IMMUNIO インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: http://www.immun.io
[2]: https://dashboard.immun.io/#/settings/integrations
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/immunio/immunio_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/