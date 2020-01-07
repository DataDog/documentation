---
categories:
  - monitoring
ddtype: クローラー
dependencies: []
description: Catchpoint のアラートを Datadog イベントストリームへ送信
doc_link: 'https://docs.datadoghq.com/integrations/catchpoint/'
git_integration_title: catchpoint
has_logo: true
integration_title: Catchpoint
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: catchpoint
public_title: Datadog-Catchpoint インテグレーション
short_description: Catchpoint のアラートを Datadog イベントストリームへ送信
version: '1.0'
---
{{< img src="integrations/catchpoint/catchpoint_event.png" alt="catchpoint event"  >}}

## 概要

Catchpoint は、素晴らしいユーザーエクスペリエンスの提供に役立つデジタルパフォーマンス分析プラットフォームです。

Catchpoint を Datadog と接続すると、以下のことができます。

* イベントストリームで包括的なアラートを構成できます。
* Catchpoint ポータル内の分析チャートに直接リンクできます。
* タイプタグに対してアラートを生成して簡単に絞り込むことができます。

## セットアップ
### インストール

インストールは必要ありません。

### コンフィグレーション

ストリームに Catchpoint のアラートを取り込むには、Catchpoint ポータルにログインし、Settings > API に移動します。

1. Alerts API で Enable を選択します。
2. 次の DataDog エンドポイント URL を入力します。
```
https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
```
DataDog の API キーも必要です。これは、DataDog ポータルで作成できます。
3. Status を Active に設定します。
4. Format は Template を選択します。
5. 新しいテンプレートを追加します。
6. テンプレート名 (例: DataDog) を入力し、Format を JSON に設定します。
7. 以下の JSON テンプレートを使用し、これを保存します。

```json
{
    "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
    "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
    "priority": "normal",
    "tags": ["alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3','Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"],
    "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
    "source_type_name": "catchpoint"
}
```

これで、Catchpoint は、すべてのアラートを DataDog のイベントストリームに直接送信するようになります。
{{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="Catchpoint configuration"  >}}

## 収集データ
### メトリクス

Catchpoint インテグレーションには、メトリクスは含まれません。

### イベント

Catchpoint インテグレーションは、Catchpoint イベントを Datadog のイベントストリームにプッシュします。

### サービスのチェック

Catchpoint インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}