---
categories:
  - monitoring
  - exceptions
dependencies: []
description: イベントストリームで Airbrake の例外を表示、検索、議論。
doc_link: https://docs.datadoghq.com/integrations/airbrake/
draft: false
git_integration_title: airbrake
has_logo: true
integration_id: ''
integration_title: Airbrake
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: airbrake
public_title: Datadog-Airbrake インテグレーション
short_description: イベントストリームで Airbrake の例外を表示、検索、議論。
version: '1.0'
---
{{< img src="integrations/airbrake/airbrakeevent.png" alt="Airbrake のイベント" popup="true">}}

## 概要

Airbrake を Datadog に接続すると、以下のことができます。

- ストリームで例外をリアルタイムに確認できます。
- グラフで例外を検索できます。
- 例外についてチームで議論できます。

## セットアップ

### コンフィギュレーション

Airbrake インテグレーションのセットアップには、Webhook を使用します。

1. Airbrake アカウントの Settings ページに移動します。

2. 有効にするプロジェクトごとに、"Integrations" をクリックします。

3. "WebHooks" をクリックして、"URL" フィールドに次の URL を入力します。

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. "Save" をクリックします。

## 収集データ

新しいエラーが発生するたびに、[イベントストリーム][1]に表示されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://docs.datadoghq.com/ja/events/
[2]: https://docs.datadoghq.com/ja/help/