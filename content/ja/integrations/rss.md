---
categories:
- notification
- web
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/rss.md
description: RSS フィードを Datadog イベントエクスプローラーに表示
doclevel: basic
integration_id: feed
integration_title: RSS
is_public: true
kind: インテグレーション
name: rss
public_title: Datadog-RSS インテグレーション
short_description: Datadog イベントエクスプローラーで RSS フィードをキャプチャ
---

{{< img src="integrations/rss/rss.png" alt="RSS イベント"  >}}

## 概要

Datadog で RSS フィードのアクティビティをキャプチャして、以下のことができます。

- カスタムソースからエクスプローラーにイベントを追加できます。
- フィードイベントについてチームで議論できます。

## セットアップ

### インストール

構成には以下が必要です。

- RSS または ATOM フィードへの完全な URL
- フィードごとに少なくとも 1 つのカスタムタグ

**オプション**: RSS フィードにアクセスするためのユーザー名とパスワードを入力します。

{{< img src="integrations/rss/rss_setup.png" alt="RSS セットアップ"  >}}

### 検証

Datadog で RSS フィードのアクティビティを表示するには、[イベントエクスプローラー][1]を確認してください。

## その他の参考資料

### ドキュメント

- [Datadog のイベントを探索する][2]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://docs.datadoghq.com/ja/events/#exploring-datadog-events