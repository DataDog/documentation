---
categories:
- Collaboration
- issue tracking
dependencies: []
description: Datadog イベントストリームでストーリーを参照してコメントを入力。
doc_link: https://docs.datadoghq.com/integrations/pivotal/
draft: false
git_integration_title: pivotal
has_logo: true
integration_id: pivotal
integration_title: Pivotal Tracker
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: pivotal
public_title: Datadog-Pivotal Tracker インテグレーション
short_description: Datadog イベントストリームでストーリーを参照してコメントを入力。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[Pivotal Tracker][1] は、新機能の構築、バグの解決、技術的負債への対応など、開発サイクルのさまざまな部分を通して、チームがプロジェクトを追跡し、共同作業できるようにストーリーを使用します。Pivotal Tracker を Datadog に接続することで、

- Datadog Events Explorer でストーリーの進捗を確認し、議論することができます。
- ストーリーの完成度をシステム内の他のイベントやメトリクスと相関付け、グラフ化することができます。
- ストーリーの更新通知を受け取ることができます。

## 計画と使用

### インフラストラクチャーリスト

Datadog Events Explorer で Pivotal イベントを取得するには、Pivotal [プロファイルページ][2]で生成される API トークンを入力します。

{{< img src="integrations/pivotal/pivotal_token.png" alt="Pivotal のトークン" popup="true">}}

## リアルユーザーモニタリング

### データセキュリティ

Pivotal Tracker インテグレーションには、メトリクスは含まれません。

### ヘルプ

Pivotal Tracker インテグレーションには、イベントは含まれません。

### ヘルプ

Pivotal Tracker インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.pivotaltracker.com/features
[2]: https://www.pivotaltracker.com/signin
[3]: https://docs.datadoghq.com/ja/help/