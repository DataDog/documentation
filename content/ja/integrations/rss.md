---
integration_title: RSS
name: rss
kind: インテグレーション
doclevel: basic
description: RSS フィードを Datadog イベントストリームに表示
is_public: true
public_title: Datadog-RSS インテグレーション
short_description: Datadog イベントストリームで RSS フィードをキャプチャ
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/rss.md
categories:
  - notification
  - web
ddtype: crawler
integration_id: feed
---
{{< img src="integrations/rss/rss.png" alt="RSS イベント"  >}}

## 概要

Datadog で RSS フィードのアクティビティをキャプチャして、以下のことができます。

- カスタムソースからストリームにイベントを追加できます。
- フィードイベントについてチームで議論できます。

## セットアップ

### インストール

構成には以下が必要です。

- RSS または ATOM フィードへの完全な URL
- フィードごとに少なくとも 1 つのカスタムタグ

**オプション**: RSS フィードにアクセスするためのユーザー名とパスワードを入力します。

{{< img src="integrations/rss/rss_setup.png" alt="RSS セットアップ"  >}}

### 検証

Datadog で RSS フィードのアクティビティを表示するには、[Events Stream][1] と [Events Explorer][2] を確認してください。

## その他の参考資料

### ドキュメント

- [Datadog のイベントを探索する][3]

[1]: https://app.datadoghq.com/event/stream
[2]: https://app.datadoghq.com/event/explorer
[3]: https://docs.datadoghq.com/ja/events/#exploring-datadog-events