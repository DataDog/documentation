---
categories:
- イベント管理
- アラート設定
- モニタリング
ddtype: webhook
dependencies: []
description: SolarWinds Orion から Datadog イベントストリームにアラートを取り込みます。
doc_link: https://docs.datadoghq.com/integrations/solarwinds/
draft: false
git_integration_title: solarwinds
has_logo: true
integration_id: ''
integration_title: SolarWinds
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: solarwinds
public_title: Datadog-SolarWinds インテグレーション
short_description: SolarWinds Orion から Datadog イベントストリームにアラートを取り込みます。
version: '1.0'
---

## 概要

SolarWinds Orion からアラートを受け取り、一元化された場所でアラートを集約してトリアージします。

このインテグレーションは、Datadog をお使いの SolarWinds アラート通知すべてにサブスクライブすることで機能します。

## セットアップ

### トリガーアクションを作成する

SolarWinds で新規トリガーアクションを作成します:

1. アラートへ移動 > アラートの管理
2. 任意のアラートを選択し、“アラートの編集”をクリックするか、アラートがない場合は新しく作成します
3. トリガーアクションへ移動 > アクションを追加
4. “ウェブサーバーへ GET または POST リクエストを送信する”を選択します
5. “アクションを構成する”をクリックします
6. アクションペインに次の詳細を入力します:

        a. Name of Action: Send Alert to Datadog (or whatever you prefer)
        b. URL: https://app.datadoghq.com/intake/webhook/solarwinds?api_key=<DATADOG_API_KEY>
        c. Select: Use HTTP/S POST
        d. Body to Post: Copy and paste from alert template below
        e. Time of Day: Leave as is
        f. Execution Settings: Leave as is

7. “アクションを追加”をクリックします
8. “アクションをリセット”ステップをクリックし、トリガーアクションテンプレートではなくリセットアクションテンプレートを使い、ステップ 4〜7 を繰り返します。
9. “次へ“をクリックします
10. サマリーページで、“送信“をクリックします

### アラートにアクションを割り当てる

1. アラート管理ビューから Datadog へ送るすべてのアラートを選択し、Assign Action > Assign Trigger Action に移動します。
2. Send Alert to Datadog - Trigger アクションを選択し、Assign をクリックします
3. Send Alert to Datadog - Reset アクションを使い、Assign Action > Assign Reset Action を繰り返します

### 投稿するトリガーアクション本文
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}"
}
``` 

### 投稿するリセットアクション本文
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}",
    "reset": "true"
}
``` 

## 収集データ

### メトリクス

SolarWinds のインテグレーションにメトリクスは含まれません。

### イベント

SolarWinds インテグレーションはイベントストリームで SolarWinds アラートを集めます。

### サービスのチェック

SolarWinds のインテグレーションにサービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、Datadog サポートまでお問い合わせください