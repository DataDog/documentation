---
categories:
  - notification
  - monitoring
ddtype: crawler
dependencies: []
description: VictorOps を Datadog のアラートとイベントで通知チャンネルとして使用。
doc_link: 'https://docs.datadoghq.com/integrations/victorops/'
git_integration_title: victorops
has_logo: true
integration_title: VictorOps
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: victorops
public_title: Datadog-VictorOps インテグレーション
short_description: VictorOps を Datadog のアラートとイベントで通知チャンネルとして使用。
version: '1.0'
---
## 概要

Datadog-VictorOps インテグレーションを使用して、Datadog のアラートを VictorOps に送信し、ルーティングとエスカレーションに対して高精度な制御を行うことができます。**@victorops** を使用して、以下の方法でアラートを作成することで、問題を迅速に見つけ、解決までの時間を短縮できます。

- イベントストリームから作成
- スナップショットを取得して作成
- メトリクスアラートがトリガーされたときに作成

## セットアップ

### インストール

1. VictorOps の設定ページで "Integrations" をクリックします。
2. "Datadog" をクリックし、"Enable Integration" をクリックします。
3. キーをコピーします。
4. Datadog に戻り、API キーを次のセクションに貼り付けます。

## 収集されたデータ

### メトリック

VictorOps インテグレーションには、メトリクスは含まれません。

### イベント

VictorOps インテグレーションには、イベントは含まれません。

### サービスチェック

VictorOps インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参照先

### ナレッジベース

#### VictorOps ルーティングキー

特定の VictorOps ユーザーに直接アラートを送信できます。
Datadog で使用するすべてのルーティングキーをリストしてください (何も設定しなかった場合、VictorOps はアラートをデフォルトのグループに送信します)。

次に、@victorops を使用して、アラートを受け取る VictorOps エンドポイントを選択できます。

名前には、特殊文字を使用できません。英大文字/小文字、数字、'\_'、'-' を使用できます。

### カスタムエンドポイントの選択

このフィールドを空白にした場合、デフォルトのエンドポイントは 'https://alert.victorops.com/integrations/datadog/20140523/alert' になります。

[1]: https://docs.datadoghq.com/ja/help/