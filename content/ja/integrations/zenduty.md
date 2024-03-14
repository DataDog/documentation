---
app_id: zenduty
app_uuid: 0f2dea25-5757-477c-ad92-d459133d8b05
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zenduty.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Zenduty
author:
  homepage: https://www.zenduty.com
  name: Zenduty
  sales_email: vishwa@zenduty.com
  support_email: shubham@zenduty.com
categories:
- アラート設定
- 問題追跡
- コラボレーション
- notification
- モニタリング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenduty/README.md
display_on_public_website: true
draft: false
git_integration_title: zenduty
integration_id: zenduty
integration_title: Zenduty
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: zenduty
oauth: {}
public_title: Zenduty
short_description: Datadog アラートのインシデントレスポンスおよび通知パートナーとして Zenduty を使用する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  - Category::Alerting
  - Category::Issue Tracking
  - Category::Collaboration
  - Category::Notification
  - Category::Monitoring
  configuration: README.md#Setup
  description: Datadog アラートのインシデントレスポンスおよび通知パートナーとして Zenduty を使用する
  media:
  - caption: 詳細かつシンプルなインシデントダッシュボード。
    image_url: images/incident_dashboard.png
    media_type: image
  - caption: Slack や Teams から直接、インシデント全体を処理できる
    image_url: images/slack_controls.png
    media_type: image
  - caption: きめ細かなアラートルールでインシデントレスポンス能力を向上させる
    image_url: images/alert_rules.png
    media_type: image
  - caption: インシデントマネジメントのサイクルを通じた、信頼性が高くノイズのないアラート
    image_url: images/incident_timeline.png
    media_type: image
  - caption: プレイブックをインシデントに自動的に取り込み、解決までのステップバイステップのガイドを得ることができる
    image_url: images/task_playbooks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zenduty
---

## 概要

Zenduty インテグレーションを使用して、Datadog アラートを適切なチームに送信し、オンコールスケジュールに従って通知し、インシデントを迅速に修復して解決できるようにします。メール、Slack、Microsoft Teams、SMS、電話、Android、iOS のプッシュメッセージで通知を送信します。

Zenduty と Datadog を接続することで、以下のことが可能になります。
- Zenduty のインシデントのトリガーと解決、作成されたインシデントのアラート受信、Datadog からの問題追跡に対応
- オンコールスケジュール、エスカレーションポリシー、インシデントプレイブック、ポストモーテム、詳細分析のデプロイメント
- アラートルールを使用して、特定のユーザーやチームへの Datadog アラートのルーティングをカスタマイズし、抑制ルールを記述して、メモ、対応者、インシデントタスクを自動的に追加する

## セットアップ

### Zenduty
[Zenduty][1] では、以下の手順で操作してください。

1. **Teams** に移動し、インテグレーションを追加したいチームをクリックします。

2. **Services** に移動します。新しいサービスを作成するか、既存のサービスを選択します。

3. **Integrations** から **Add New Integration** へ進みます。インテグレーションに名前を付け、ドロップダウンメニューからアプリケーション **Datadog** を選択します。

4. インテグレーションから **Configure** に移動し、生成された Datadog の Webhook URL をコピーします。

### Datadog 内で以下の手順を実行します。

5. サイドバーから、**Integrations** に移動します。[このページ][2]から **Webhooks** を検索し、追加ボタンをクリックします。

6. 下にスクロールして、Webhooks セクションの <kbd>**+New**</kbd> ボタンをクリックします。名前と Zenduty からコピーした Webhook の URL を記入し、ペイロードボックスに以下の JSON を貼り付けます。
```json
{
  "alert_id": "$ALERT_ID",
  "hostname": "$HOSTNAME",
  "date_posix": "$DATE_POSIX",
  "aggreg_key": "$AGGREG_KEY",
  "title": "$EVENT_TITLE",
  "alert_status": "$ALERT_STATUS",
  "alert_transition": "$ALERT_TRANSITION",
  "link": "$LINK",
  "event_msg": "$TEXT_ONLY_MSG"
}
```

7. **Save**をクリックします。Datadog Zenduty インテグレーションのセットアップが完了しました。

詳細なドキュメントやこのインテグレーションを最大限に活用する方法については、 [Zenduty のドキュメント][3]を参照してください。

**注**: Datadog のインシデントが作成または解決されたときに Zenduty を通してアラートを受け取るには、Datadog モニターの構成で **Notify your team** の下に `@zenduty` をチャンネルとして記載してください。

## 収集データ
### メトリクス

Zenduty インテグレーションには、メトリクスは含まれません。

### イベント

トリガーされたイベント、承認されたイベント、解決されたイベントは Zenduty のダッシュボードに表示されます。

### サービスのチェック

Zenduty インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.zenduty.com
[2]: https://app.datadoghq.com/integrations/webhooks?search=webhook
[3]: https://docs.zenduty.com/docs/datadog
[4]: https://docs.datadoghq.com/ja/help/