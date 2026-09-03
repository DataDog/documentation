---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Cloud SIEM のデフォルト検出ルールの確認
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: Documentation
  text: 新しい検出ルールの作成
- link: /integrations/google_cloud_platform/#log-collection
  tag: Documentation
  text: Google Cloud Platform のログを収集する
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: ブログ
  text: Datadog Cloud SIEM Investigator で Google Cloud 環境のアクティビティを視覚化する
title: Cloud SIEM のための Google Cloud 構成ガイド
---

## 概要

[Datadog Cloud SIEM][1] は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でないリソース変更などの脅威を検出します。この脅威は、トリアージするためにセキュリティシグナルエクスプローラーでセキュリティシグナルとして表面化されます。

[Google Cloud Dataflow][2] と [Datadog テンプレート][3]を使用して、Google Cloud サービスから Datadog にログを転送します。このガイドでは、Google Cloud の監査ログを使用して脅威を検出するために、次の手順について説明します。

1. [Data Access の監査ログを有効にする](#enable-data-access-audit-logs)
1. [Google Cloud のパブリッシュ/サブスクリプション (Pub/Sub) トピックとプルサブスクリプションを作成](#create-a-google-cloud-publishsubscription-pubsub-system)して、構成済みのログシンクからログを受信します。
1. [カスタム Dataflow ワーカーのサービスアカウントを作成](#create-a-custom-dataflow-worker-service-account)します。
1. [ログを Pub/Sub に公開するためのログシンクを作成](#create-a-log-sink-to-publish-logs-to-the-pubsub)します。
1. [Dataflow ジョブを作成して実行](#create-and-run-the-dataflow-job)します。
1. [Cloud SIEM でセキュリティシグナルのトリアージを行う](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push サブスクリプションを使用した Google Cloud のログ収集</a>は、以下の理由で非推奨となっています。

- Google Cloud VPC を使用している場合、Push サブスクリプションは VPC 外部のエンドポイントにアクセスできない。
- Push サブスクリプションは、イベントの圧縮やバッチ処理を提供しないため、少ないログ量にのみ適している。

<strong>Push</strong> サブスクリプションのドキュメントは、トラブルシューティングやレガシーセットアップの変更のためにのみ維持されています。代わりに、Datadog Dataflow テンプレートを使用して <strong>Pull</strong> サブスクリプションで Google Cloud ログを Datadog に転送してください。
</div>

## Data Access の監査ログを有効にする

1. IAM & Admin Console > [Audit Log][4] に移動します。
1. データアクセスログを有効にするサービスを選択します。
1. **Log Types** パネルで、**Admin Read**、**Data Read**、**Data Write** を有効にします。
1. **Save** をクリックします。

### 新サービスのデフォルト構成を変更する

新しい Google Cloud サービスが追加された場合、[デフォルトの監査構成][5]を引き継ぎます。

新しい Google Cloud サービスに対して Data Access の監査ログがキャプチャされるようにするには、デフォルトの監査構成を変更します。

1. **IAM & Admin Console > [Audit Log][4]** に移動します。
1. **Admin Read**、**Data Read**、**Data Write** を有効にします。
1. **Save** をクリックします。

## Google Cloud のパブリッシュ/サブスクリプション (Pub/Sub) システムを作成する

1. Pub/Sub > [Topics][5] に移動します。
1. **Create Topic** をクリックします。
1. わかりやすいトピック名を入力します。例えば、`export-audit-logs-to-datadog` とします。
1. **Add a default subscription** を選択したままにしておくと、デフォルトの構成値でサブスクリプションが作成されます。サブスクリプション名はトピック名に「-sub」を付加したものが自動生成され、後で [Dataflow ジョブ](#create-and-run-the-dataflow-job)を作成する際に使用します。
1. **作成**をクリックします。

### outputDeadletterTopic パラメーター用の追加トピックとサブスクリプションを作成します。
Datadog API によって拒否されたログメッセージを処理するために、追加のトピックとデフォルトのサブスクリプションを作成します。このトピックは後で [Dataflow ジョブ](#create-and-run-the-dataflow-job) を設定する際に使用します。

1. Pub/Sub > [Topics][5] に戻ります。
1. **Create Topic** をクリックします。
1. わかりやすいトピック名を入力します。
1. **Add a default subscription** を選択したままにしておきます。
1. **作成**をクリックします。

**警告**: pub/sub は、[Google Cloud の割り当てと制限][6]に従います。ログの数がこれらの制限を上回る場合、Datadog はログをいくつかのトピックに分割することをお勧めします。これらの制限に近づいたときに通知するモニターを設定する方法については、[ログ転送のモニター][7]を参照してください。

### Secret Manager でシークレットを作成する

Datadog では、有効な Datadog API キー値を使用して [Secret Manager][8] でシークレットを作成することを推奨しています。このシークレットは後で [Dataflow ジョブ](#create-and-run-the-dataflow-job)をセットアップする際に使用します。

1. Security > [Secret Manager][8] に移動します。
1. **Create Secret** をクリックします。
1. シークレットの名前を入力します。
1. [Datadog API キー][9]をコピーして、**Secret value** セクションに貼り付けます。
1. オプションで、ユースケースに応じてその他の構成を設定します。
1. **Create Secret** をクリックします。

## カスタム Dataflow ワーカーサービスアカウントを作成する

Dataflow パイプラインワーカーのデフォルトの動作は、プロジェクトの [Compute Engine のデフォルトのサービスアカウント][10]を使用することです。このアカウントは、プロジェクト内のすべてのリソースへの権限を付与します。本番環境からログを転送している場合は、必要なロールと権限のみを持つカスタムワーカーのサービスアカウントを作成し、このサービスアカウントを Dataflow パイプラインワーカーに割り当てます。

**注**: Dataflow パイプラインワーカー用のカスタムサービスアカウントを作成していない場合は、デフォルトの Compute Engine のサービスアカウントが下記の[必要な権限](#required-permissions)を持っていることを確認してください。

1. Google Cloud の [Service Account][11] ページに移動します。
1. プロジェクトを選択します。
1. **Create Service Account** をクリックします。
1. わかりやすいサービスアカウント名を入力します。
1. **Create and Continue** をクリックします。
1. 以下のロールを追加します。
   ##### 必要な権限
   | ロール | パス | 説明 |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  このサービスアカウントが Dataflow の管理者タスクを実行することを許可します。
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  このサービスアカウントが Dataflow のジョブオペレーションを実行することを許可します
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを表示することを許可します
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを取得することを許可します
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | このサービスアカウントが別のサブスクリプションに失敗したメッセージを公開することを許可します。これにより、ログの解析や再送信が可能になります
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | このサービスアカウントが Secret Manager で Datadog API キーにアクセスすることを許可します
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | このサービスアカウントがファイルのステージング用に指定された Cloud Storage バケットに対する読み取りと書き込みを行うことを許可します |
7. **Continue** をクリックします。
8. **Done** をクリックします。

## Pub/Sub にログを公開するためのログシンクを作成する

1. Google Cloud の [Logs Explorer][19] に移動します。
1. 左サイドメニューの **Log Router** を選択します。
1. **Create Sink** をクリックします。
1. わかりやすいシンク名を入力します。
1. **Next** をクリックします。
1. **Select Sink Service** ドロップダウンメニューで、**Cloud Pub/Sub topic** を選択します。
   **注**: Cloud Pub/Sub トピックは別のプロジェクトに配置できます。
1. **Select a Cloud Pub/Sub topic** で、先ほど作成した Pub/Sub を選択します。
1. **Next** をクリックします。
1. Datadog に送信するログの包含フィルターを入力します。
1. **Next** をクリックします。
1. オプションで、Datadog に送信しないログを除外するための除外フィルターを入力します。
1. **Create Sink** をクリックします。

**注**: 異なるシンクを利用して、Google Cloud Logging から同一の Pub/Sub トピックに対して複数のエクスポートを行うことが可能です。

## Dataflow ジョブを作成して実行する

1. Google Cloud [Dataflow][20] に移動します。
1. **Create job from template** をクリックします。
1. ジョブの名前を入力します。
1. 地域のエンドポイントを選択します。
1. **Dataflow template** ドロップダウンメニューで、**Pub/Sub to Datadog** を選択します。
1. **Required Parameters** セクションで、次を行います。
   a. **Pub/Sub input subscription** ドロップダウンメニューで、新しい [Pub/Sub システム](#create-a-google-cloud-publishsubscription-pubsub-system)を作成したときに作成されたデフォルトのサブスクリプションを選択します。
      b. **Datadog Logs API URL** フィールドに以下の値を入力します。
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **注**: 上記の URL をコピーする前に、このドキュメントページの右側にある Datadog サイトセレクタが Datadog サイトに設定されていることを確認してください。
   c. **Output deadletter Pub/Sub topic** フィールドで、Datadog API によって拒否されたメッセージを受信するために以前に作成した [追加トピック](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic)を選択します。
      d. **Temporary location** フィールドで、ストレージバケット内の一時ファイルのパスを指定します。
1. 先ほど Datadog API キー値用の [シークレットを Secret Manager で作成](#create-a-secret-in-secret-manager)した場合:
   a. **Optional Parameters** をクリックして、追加フィールドを表示します。
   b. **Google Cloud Secret Manager ID** フィールドにシークレットのリソース名を入力します。
        リソース名を取得するには、[Secret Manager][8] の自分のシークレットに移動します。シークレットをクリックします。**Action** の下にある 3 つの点をクリックし、**Copy resource name** を選択します。
   c. **Source of the API key passed** フィールドに `SECRET_MANAGER` と入力します。
1. Datadog API キーの値にシークレットを使用していない場合:
    - **推奨**:
        - `Source of API key passed` を `KMS` に設定します。
        - `Google Cloud KMS key for the API key` を Cloud KMS キー ID に設定します。
        - 暗号化された API キーを `Logs API Key` に設定します。
    - **推奨しません**: `Source of API key passed` を `PLAINTEXT` に設定し、`Logs API Key` に平文の API キーを設定します。
1. その他の使用可能なオプションの詳細については、Dataflow テンプレートの[テンプレートパラメーター][21]を参照してください。
1. カスタムワーカーサービスアカウントを作成した場合は、**Service account email** ドロップダウンメニューでそれを選択します。
1. **Run Job** をクリックします。

[Datadog Log Explorer][22] で Cloud Pub/Sub トピックに配信された新規ログイベントを確認します。

## Cloud SIEM でセキュリティシグナルのトリアージを行う

Cloud SIEM は、設定した Google Cloud の監査ログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- [Cloud SIEM シグナルエクスプローラー][23]にアクセスして、脅威の表示とトリアージを行います。詳細はセキュリティシグナルエクスプローラーをご覧ください。
- また、[Google Cloud Audit Log ダッシュボード][24]を使って、異常なアクティビティを調査することも可能です。
- ログに適用される[すぐに使える検出ルール][25]をご覧ください。
- [新しいルール][26]を作成し、特定のユースケースにマッチした脅威を検出することができます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /ja/integrations/google_cloud_platform/#monitor-the-cloud-pubsub-log-forwarding
[8]: https://console.cloud.google.com/security/secret-manager
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[11]: https://console.cloud.google.com/iam-admin/serviceaccounts
[12]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[13]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[16]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[17]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[18]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[19]: https://console.cloud.google.com/logs/
[20]: https://console.cloud.google.com/dataflow/
[21]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[22]: https://app.datadoghq.com/logs/
[23]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /ja/security/default_rules/#cat-cloud-siem
[26]: /ja/security/detection_rules/
