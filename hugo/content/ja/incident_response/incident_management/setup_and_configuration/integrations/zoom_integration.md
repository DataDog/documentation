---
aliases:
- /ja/service_management/incident_management/zoom_integration/
- /ja/incident_response/incident_management/zoom_integration
description: Zoom を Datadog に接続し、チームのコラボレーションを支援する
title: Datadog Incident Management に Zoom を統合する
---
## 概要 {#overview}

Zoom と Datadog を接続することで、Zoom ミーティングを素早く作成し、アクティブなインシデントについてチームとコラボレーションすることができます。

## セットアップ {#setup}

### インストール {#installation}

Datadog for Zoom アプリをインストールするには

1. Datadog で、[**Incidents Settings**][3] ページを探します。
2. **Integrations** に移動し、[**Automatically create a meeting in Zoom for every incident (すべてのインシデントに対して Zoom ミーティングを自動作成する)**] トグルを有効にします。この設定により、Datadog のインシデント概要ページにある **Add Video Call** ボタンが **Start Zoom Call** ボタンに置き換わり、ワンクリックで Zoom ミーティングを作成できるようになります。
3. **Start Zoom Call** ボタンをクリックすると、Datadog Zoom アプリを追加するよう求められます。その際、Zoom 上の情報の表示および管理を許可するようにしてください。

## 使用方法 {#usage}

アプリをインストールしたら、インシデントから **Start Zoom Call** ボタンをクリックして新しい Zoom 通話を作成し、インシデントに自動的にリンクさせることができます。

## 権限{#permissions}

Datadog for Zoom には、以下の OAuth スコープが必要です。詳細については、「[Zoom OAuth スコープのドキュメント][2]」を参照してください。

### ユーザーレベルのスコープ {#user-level-scopes}

| スコープ                   | リクエストの理由                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Incident Management 製品でユーザーが **Start Zoom Call** をクリックしてミーティングを作成するため                        |

## アプリの削除 {#removing-the-app}
Datadog for Zoom アプリを削除するには

1. Zoom アカウントにログインし、Zoom アプリマーケットプレイスに移動します。
2. **Manage** > **Added Apps** をクリックするか、**Datadog** アプリを検索します。
3. **Datadog** アプリをクリックします。
4. **Remove** をクリックします。

## トラブルシューティング {#troubleshooting}

お困りですか？[Datadog サポート][1] にお問い合わせください。

[1]: /ja/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/
[3]: https://app.datadoghq.com/incidents/settings