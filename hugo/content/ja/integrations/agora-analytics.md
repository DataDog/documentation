---
aliases:
- /ja/integrations/agora_analytics
app_id: agora-analytics
categories:
- collaboration
custom_kind: integration
description: Datadog で Agora Analytics Collector のメトリクスを表示する
integration_version: 1.0.0
media:
- caption: Agora Analytics の概要 - ダッシュボード
  image_url: images/agora_analytics_dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Agora Analytics
---
## 概要

Agora Analytics は、チャット、リアルタイム音声やビデオの使用状況、品質、パフォーマンスを追跡し、解釈します。Analytics は、Agora の音声通話、ビデオ通話、インタラクティブライブストリーミング、Agora チャットの拡張機能で、品質問題の特定、根本原因の特定、エンドユーザーエクスペリエンスを向上させるための問題解決に役立ちます。

このインテグレーションは、使用率、品質、パフォーマンスなどのメトリクスを Datadog アカウントに直接送信します。

## セットアップ

Agora Analytics Datadog Connector の設定方法については、Agora Analytics インテグレーションの [ドキュメント](https://docs.agora.io/en/agora-analytics/analyze/video-voice-sdk/datadog-integration) を参照してください。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **agora.rtc.app_id.online_user** <br>(count) | オンライン ユーザー数。|
| **agora.rtc.app_id.online_channel** <br>(count) | オンライン チャンネル数。|
| **agora.rtc.app_id.audio_freeze_rate** <br>(rate) | オーディオ フリーズ率。|
| **agora.rtc.app_id.video_freeze_rate** <br>(rate) | ビデオ フリーズ率。|
| **agora.rtc.app_id.network_delay_rate** <br>(rate) | ネットワーク遅延率。|
| **agora.rtc.app_id.join_attempt** <br>(count) | 参加試行数。|
| **agora.rtc.app_id.join_success_count** <br>(count) | 参加成功数。|
| **agora.rtc.app_id.join_success_rate** <br>(rate) | 参加成功率。|
| **agora.rtc.app_id.join_success_in_5s_rate** <br>(rate) | 5 秒以内の参加成功率。|
| **agora.chat.group.total** <br>(count) | チャット グループ総数。|
| **agora.chat.group.new** <br>(count) | 日次の新規チャット グループ数。|
| **agora.chat.group.disbanded** <br>(count) | 日次の解散チャット グループ数。|
| **agora.chat.group.active** <br>(count) | 日次のアクティブ チャット グループ数。|
| **agora.chat.room.total** <br>(count) | チャット ルーム総数。|
| **agora.chat.room.new** <br>(count) | 日次の新規チャット ルーム数。|
| **agora.chat.room.disbanded** <br>(count) | 日次の解散チャット ルーム数。|
| **agora.chat.room.active** <br>(count) | 日次のアクティブ チャット ルーム数。|
| **agora.chat.room.pcu** <br>(count) | 日次のチャット ルーム同時接続ユーザー数のピーク。|
| **agora.chat.user.total** <br>(count) | 登録ユーザー総数。|
| **agora.chat.user.dnu** <br>(count) | 日次の新規ユーザー数。|
| **agora.chat.user.dau** <br>(count) | 日次のアクティブ ユーザー数。|
| **agora.chat.user.maxdau** <br>(count) | 月間最大の日次アクティブ ユーザー数。|

### イベント

Agora Analytics には、イベントは含まれません。

### サービス チェック

Agora Analytics には、サービスのチェック機能は含まれません。

## サポート

サポートが必要な場合は、[Agora サポート](mailto:support@agora.io) にお問い合わせください。