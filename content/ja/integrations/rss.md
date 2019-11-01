---
integration_title: RSS
name: rss
kind: インテグレーション
doclevel: basic
description: "RSS フィードを Datadog イベントストリームに表示"
is_public: true
public_title: Datadog-RSS インテグレーション
short_description: "Datadog イベントストリームで RSS フィードをキャプチャ"
categories:
- notification
- web
ddtype: クローラー
---

{{< img src="integrations/rss/rss.png" alt="RSS event" responsive="true" >}}

## 概要
Datadog で RSS フィードのアクティビティをキャプチャして、以下のことができます。

  * カスタムソースからストリームにイベントを追加できます。
  * フィードイベントについてチームで議論できます。

## セットアップ
### インストール

構成には以下が必要です。

* RSS または ATOM フィードへの完全な URL
* フィードごとに少なくとも 1 つのカスタムタグ

**オプション**: RSS フィードにアクセスするためのユーザー名とパスワードを入力します。

{{< img src="integrations/rss/rss_setup.png" alt="RSS setup" responsive="true" >}}

