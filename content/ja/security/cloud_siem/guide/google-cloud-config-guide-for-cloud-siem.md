---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Cloud SIEM のデフォルト検出ルールの確認
- link: /security/explorer/
  tag: Documentation
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/cloud_siem/log_detection_rules/
  tag: Documentation
  text: 新しい検出ルールの作成
- link: /integrations/google_cloud_platform/#log-collection
  tag: Documentation
  text: Google Cloud Platform のログを収集する
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: ブログ
  text: Datadog Cloud SIEM Investigator で Google Cloud 環境のアクティビティを視覚化する
kind: documentation
title: Cloud SIEM のための Google Cloud 構成ガイド
---

## 概要

[Datadog Cloud SIEM][1] は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でないリソース変更などの脅威を検出します。この脅威は、トリアージするためにセキュリティシグナルエクスプローラーでセキュリティシグナルとして表面化されます。

このガイドでは、Google Cloud の監査ログから脅威の検出を開始できるように、次の手順を説明します。

1. [Data Access の監査ログを有効にする](#enable-data-access-audit-logs)
1. [Google Cloud のパブリッシュ/サブスクリプション (pub/sub) システムを新規に作成する](#create-a-new-google-cloud-publishsubscription-pubsub-system)
1. [Datadog にログを送信するための pub/sub を構成する](#configure-the-pubsub-to-send-logs-to-datadog)
1. [Google Cloud Logging から pub/sub にログをエクスポートする](#export-logs-from-google-cloud-logging-to-the-pubsub)
1. [Cloud SIEM でセキュリティシグナルのトリアージを行う](#use-cloud-siem-to-triage-security-signals)

## Data Access の監査ログを有効にする

1. IAM & Admin Console > [Audit Log][6] に移動します。
1. データアクセスログを有効にするサービスを選択します。
1. **Log Types** パネルで、**Admin Read**、**Data Read**、**Data Write** を有効にします。
1. **Save** をクリックします。

### 新サービスのデフォルト構成を変更する

新しい Google Cloud サービスが追加された場合、[デフォルトの監査構成][7]を引き継ぎます。

新しい Google Cloud サービスに対して Data Access の監査ログがキャプチャされるようにするには、デフォルトの監査構成を変更します。

1. **IAM & Admin Console > [Audit Log][6]** に移動します。
1. **Admin Read**、**Data Read**、**Data Write** を有効にします。
1. **保存**をクリックします。

## Google Cloud のパブリッシュ/サブスクリプション (pub/sub) システムを新規に作成する

1. Pub/Sub > [Topics][7] に移動します。
1. **Create Topic** をクリックします。
1. トピック名を入力します。例えば、`export-audit-logs-to-datadog` とします。
1. **作成**をクリックします。

## Datadog にログを送信するための pub/sub を構成する

1. Pub/Sub > [Subscriptions][8] に移動します。
1. **Create Subscription** をクリックします。
1. サブスクリプション名を入力します。
1. 先ほど作成したトピックを選択します。
1. **Delivery type** で、**Push** を選択します。
1. 次のエンドポイント URL を入力し、`DATADOG_API_KEY` を既存または新規の Datadog API キーに置き換えます: `https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp`
1. ユースケースに必要な追加オプションを構成します。
1. **作成**をクリックします。

pub/sub が Google Cloud Logging からログを受け取り、Datadog へ転送する準備ができました。

## Google Cloud Logging から pub/sub にログをエクスポートする

1. [Cloud Logs Explorer][9] に移動します。
1. エクスポートしたいログにフィルターをかけるためのクエリを入力します。
1. 左サイドメニューの **Log Router** を選択します。
1. **Create Sink** をクリックします。
1. シンクの名前を入力します。
1. **Next** をクリックします。
1. **Select Sink Service** ドロップダウンメニューで、**Cloud Pub/Sub topic** を選択します。
1. **Select a Cloud Pub/Sub topic** で、先ほど作成した Pub/Sub を選択します。
1. **Create Sink** をクリックします。

**注**: 異なるシンクを使用して、Google Cloud Logging から同じ pub/sub への複数のエクスポートを作成することができます。

**警告**: pub/sub は、[Google Cloud の割り当てと制限][10] に従います。ログの数がこれらの制限を上回る場合、Datadog はログをいくつかのトピックに分割することをお勧めします。これらの制限に近づいたときに通知するモニターを設定する方法については、[ログ転送のモニター][11]を参照してください。
## Cloud SIEM でセキュリティシグナルのトリアージを行う

Cloud SIEM は、設定した Google Cloud の監査ログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- [Cloud SIEM シグナルエクスプローラー][12]にアクセスして、脅威の表示とトリアージを行います。詳細はセキュリティシグナルエクスプローラーをご覧ください。
- また、[Google Cloud Audit Log ダッシュボード][13]を使って、異常なアクティビティを調査することも可能です。
- ログに適用される[すぐに使える検出ルール][14]をご覧ください。
- [新しいルール][15]を作成し、特定のユースケースにマッチした脅威を検出することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://console.cloud.google.com/apis/credentials
[3]: https://console.cloud.google.com/iam-admin/serviceaccounts
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://app.datadoghq.com/integrations/google-cloud-platform
[6]: https://console.cloud.google.com/iam-admin/audit
[7]: https://console.cloud.google.com/cloudpubsub/topic
[8]: https://console.cloud.google.com/cloudpubsub/subscription
[9]: https://console.cloud.google.com/logs/
[10]: https://cloud.google.com/pubsub/quotas#quotas
[11]: /ja/integrations/google_cloud_platform/#monitor-the-log-forwarding
[12]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[13]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[14]: /ja/security/default_rules/#cat-cloud-siem
[15]: /ja/security/detection_rules/