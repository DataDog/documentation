---
app_id: taskcall
app_uuid: dd54da03-0a8c-4796-aaa6-61eeb04e611b
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://taskcallapp.com
  name: TaskCall
  sales_email: support@taskcallapp.com
  support_email: support@taskcallapp.com
categories:
- アラート設定
- コラボレーション
- インシデント
- 問題追跡
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/taskcall/README.md
display_on_public_website: true
draft: false
git_integration_title: taskcall
integration_id: taskcall
integration_title: TaskCall
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: taskcall
public_title: TaskCall
short_description: TaskCall による Datadog インシデントの監視と一元化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Queried Data Type::Incidents
  configuration: README.md#Setup
  description: TaskCall による Datadog インシデントの監視と一元化
  media:
  - caption: インシデント通知
    image_url: images/incident_notifications.png
    media_type: image
  - caption: インシデント詳細
    image_url: images/incident_details.png
    media_type: image
  - caption: インパクトの可視性とステータスダッシュボード
    image_url: images/impact_visibility_status_dashboard.png
    media_type: image
  - caption: オンコール管理
    image_url: images/on_call_management.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: TaskCall
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

TaskCall は、対応プロセスを自動化することで、システムのダウンタイムを短縮するリアルタイムのインシデント対応システムです。システムの包括的なビューを提供するために、監視ツールからのフィードを継続的に受け入れます。オンコール管理とインシデント対応メカニズムを使用して、適切なチームを編成し、可能な限り最短時間でインシデントを解決します。

TaskCall のインテグレーションにより、Datadog ユーザーは、インシデント認識を向上させ、インシデント処理プロセスを簡素化することで、オペレーションを強化することができます。インシデントは、2 つのプラットフォーム間で双方向に同期されます。Datadog アラートが TaskCall で受信されると、ユーザーはすべてのインシデントを中断することなく体系的に管理することができます。ユーザーは、依存関係グラフとステータスダッシュボードから改善された影響の可視性からも恩恵を受けます。インフラストラクチャー全体の状態をよりよく理解することで、効率的な解決が可能になります。


## 主な特徴

- Datadog からアラートを受信すると、すぐに正しいオンコール対応者に通知されます。
- 繰り返されるアラートは自動的に消音され、オンコール対応者がすでにインシデントを見ているときに中断されることはありません。
- インテグレーションは双方向です。ステータスと優先度は、Datadog と TaskCall の間で同期されます。
- アラート条件がなくなると、インシデントは TaskCall で自動的に解決されます。
- このインテグレーションは、すべての TaskCall サブスクリプションプランで利用可能です。


## 計画と使用

インテグレーションは、TaskCall と Datadog の両方から構成する必要があります。

### Datadog への TaskCall アプリのインストール

1. まだアカウントをお持ちでない場合は、[TaskCall アカウントを作成][1]してください。
2. **Datadog で**: [TaskCall インテグレーションタイル][2]に移動します。
3. TaskCall インテグレーションタイルで、** Configure** タブに移動し、**Connect Accounts** をクリックします。TaskCall にリダイレクトされます。
4. **TaskCall で**: インテグレーションに**名前**を付け、インテグレーションが必要な**サービス**を選択します。

![TaskCall 認可][3]

5. **Integrate** をクリックします。Datadog の認可ページにリダイレクトされます。
6. インテグレーションを認可し、正しい権限があることを確認します。
7. インテグレーションを認可すると、TaskCallにリダイレクトされます。
8. ** TaskCall で**: インテグレーション用に発行された **Integration Url** をコピーします。これは Datadog で Webhook をセットアップするために必要です。

### Datadog で Webhook を作成する

1. [**Integrations** > **Integrations**][4] に移動します。
2. **Webhooks** を見つけてクリックします。
3. **New Webhook** ボタンをクリックします。
4. 名前を付け、TaskCall からコピーした **Integration Url** を貼り付けます。
5. 以下の [JSON ペイロード][5]をコピーし、ペイロードセクションに貼り付けます。
```json
{
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
         "id": "$ORG_ID",
         "name": "$ORG_NAME"
     },
     "id": "$ID",
     "aggreg_key": "$AGGREG_KEY",
     "alert": {
         "cycle_key": "$ALERT_CYCLE_KEY",
         "id": "$ALERT_ID",
         "metric": "$ALERT_METRIC",
         "scope": "$ALERT_SCOPE",
         "status": "$ALERT_STATUS",
         "title": "$ALERT_TITLE",
         "transition": "$ALERT_TRANSITION",
         "type": "$ALERT_TYPE",
         "query": "$ALERT_QUERY"
     },
     "user": "$USER",
     "username": "$USERNAME",
     "priority": "$PRIORITY",
     "text_msg": "$TEXT_ONLY_MSG",
     "snapshot": "$SNAPSHOT",
     "link": "$LINK",
     "hostname": "$HOSTNAME",
     "incident_uuid": "$INCIDENT_UUID",
     "incident_public_id": "$INCIDENT_PUBLIC_ID",
     "incident_title": "$INCIDENT_TITLE",
     "incident_url": "$INCIDENT_URL",
     "incident_msg": "$INCIDENT_MSG",
     "incident_severity": "$INCIDENT_SEVERITY",
     "security_rule_id": "$SECURITY_RULE_ID",
     "security_rule_name": "$SECURITY_RULE_NAME",
     "security_signal_severity": "$SECURITY_SIGNAL_SEVERITY",
     "security_signal_title": "$SECURITY_SIGNAL_TITLE",
     "security_signal_msg": "$SECURITY_SIGNAL_MSG",
     "security_rule_query": "$SECURITY_RULE_QUERY",
     "security_rule_type": "$SECURITY_RULE_TYPE",
     "tags": "$TAGS"
}
```
6. 詳細を入力したら、Save をクリックします。

詳細については、[TaskCall Datadog インテグレーションガイド][6]を参照してください。

## アンインストール

- TaskCall で、Services > Integrations からインテグレーションを削除します。
- Datadog の [TaskCall インテグレーションタイル][2]に移動し、アンインストールします。また、TaskCall に通知を送信するために作成した Webhook を削除する必要があります。
- このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。


## Agent

インテグレーションまたはプラットフォームに関するご質問は、[TaskCall サポートにお問い合わせください][7]。


[1]: https://app.us.taskcallapp.com/register
[2]: https://app.datadoghq.com/integrations/taskcall
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/taskcall/images/DatadogTaskCallAuthorization.png
[4]: https://app.datadoghq.com/integrations
[5]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide#in-datadog
[6]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide
[7]: https://www.taskcallapp.com/contact-us