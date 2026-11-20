---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: ドキュメント
  text: Cloud SIEM のデフォルト検出ルールを確認する
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: ドキュメント
  text: カスタム検出ルールを作成する
- link: /integrations/google_cloud_platform/#log-collection
  tag: ドキュメント
  text: Google Cloud Platform のログを収集する
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog を使用して Google Cloud AI スタックを評価、最適化、保護する
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: ブログ
  text: Datadog Cloud SIEM Investigator で Google Cloud 環境のアクティビティを視覚化する
title: Cloud SIEM のための Google Cloud 構成ガイド
---
## 概要 {#overview}

[Datadog Cloud SIEM][1] は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でないリソース変更などの脅威を検出します。この脅威は、トリアージするためにセキュリティシグナルエクスプローラーでセキュリティシグナルとして表面化されます。

[Google Cloud Dataflow][2] と [Datadog テンプレート][3]を使用して、Google Cloud サービスから Datadog にログを転送します。このガイドでは、Google Cloud の監査ログを使用して脅威の検出を開始するために、次の手順について説明します。

1. [データアクセスの監査ログを有効にする](#enable-data-access-audit-logs)
1. [Google Cloud のパブリッシュ/サブスクリプション (Pub/Sub) トピックとプルサブスクリプションを作成](#create-a-google-cloud-publishsubscription-pubsub-system)して、構成済みのログシンクからログを受信します。
1. [カスタム Dataflow ワーカーサービスアカウントを作成する](#create-a-custom-dataflow-worker-service-account)
1. [Pub/Sub にログを公開するためのログシンクを作成する](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Dataflow ジョブを作成して実行する](#create-and-run-the-dataflow-job)
1. [Cloud SIEM でセキュリティシグナルをトリアージする](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub プッシュサブスクリプションを使用した Google Cloud ログの収集</a>は、以下の理由により非推奨化が進んでいます。

- Google Cloud VPC を所有している場合、プッシュサブスクリプションでは VPC 外のエンドポイントにアクセスできません。
- プッシュサブスクリプションはイベントの圧縮やバッチ処理を提供しないため、少ないログ量にのみ適しています。

<strong>プッシュ</strong>サブスクリプションに関するドキュメントは、従来の設定のトラブルシューティングや変更のためにのみ保持されています。代わりに<strong>プル</strong>サブスクリプションと Datadog Dataflow テンプレートを使用して、Google Cloud ログを Datadog に転送してください。
</div>

## データアクセスの監査ログを有効にする {#enable-data-access-audit-logs}

1. IAM & Admin Console > [監査ログ][4]に移動します。
1. データアクセスログを有効にするサービスを選択します。
1. **ログの種類**パネルで、{{< ui >}}Admin Read{{< /ui >}}、{{< ui >}}Data Read{{< /ui >}}、および {{< ui >}}Data Write{{< /ui >}} を有効にします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### 新サービスのデフォルト構成を変更する {#change-default-configuration-for-new-services}

新しい Google Cloud サービスが追加された場合、[デフォルトの監査構成][5]を引き継ぎます。

新しい Google Cloud サービスに対してデータアクセスの監査ログがキャプチャされるようにするには、デフォルトの監査構成を変更します。

1. **IAM & Admin Console > [監査ログ][4]**に移動します。
1. {{< ui >}}Admin Read{{< /ui >}}、{{< ui >}}Data Read{{< /ui >}}、および {{< ui >}}Data Write{{< /ui >}} を有効にします。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## Google Cloud のパブリッシュ/サブスクリプション (Pub/Sub) システムを作成する {#create-a-google-cloud-publishsubscription-pubsub-system}

1. Pub/Sub > [トピックス][5]に移動します。
1. {{< ui >}}Create Topic{{< /ui >}} をクリックします。
1. わかりやすいトピック名を入力します。例: `export-audit-logs-to-datadog`。
1. **デフォルトサブスクリプションを追加する**を選択したままにしておくと、デフォルトの構成値でサブスクリプションが作成されます。サブスクリプション名は、トピック名に「-sub」を付加したものが自動生成されます。このサブスクリプション名は、後で [Dataflow ジョブ](#create-and-run-the-dataflow-job)を作成する際に使用されます。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### outputDeadletterTopic パラメーター用の追加トピックとサブスクリプションを作成する {#create-an-additional-topic-and-subscription-for-outputdeadlettertopic-parameter}
Datadog API によって拒否されたログメッセージを処理するために、追加のトピックとデフォルトのサブスクリプションを作成します。このトピックは、後で [Dataflow ジョブ](#create-and-run-the-dataflow-job)を設定する際に使用されます。

1. Pub/Sub > [トピックス][5]に戻ります
1. {{< ui >}}Create Topic{{< /ui >}} をクリックします。
1. わかりやすいトピック名を入力します。
1. **デフォルトサブスクリプションを追加する**を選択したままにしておきます。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

**警告**: Pub/Sub は [Google Cloud の割り当てと制限][6] の対象となります。Datadog では、ログの数がこの制限を上回る場合、ログを複数のトピックに分割することを推奨しています。これらの制限に近づいたときに通知するモニターを設定する方法については、[ログ転送を監視する][7]を参照してください。

### Secret Manager でシークレットを作成する {#create-a-secret-in-secret-manager}

Datadog では、[Secret Manager][8] で有効な Datadog API キーの値でシークレットを作成することを推奨しています。このシークレットは、後で [Dataflow ジョブ](#create-and-run-the-dataflow-job)をセットアップする際に使用されます。

1. セキュリティ > [Secret Manager][8] に移動します。
1. {{< ui >}}Create Secret{{< /ui >}} をクリックします。
1. シークレットの名前を入力します。
1. [Datadog API キー][9]をコピーして、**シークレットの値**セクションに貼り付けます。
1. オプションで、ユースケースに応じてその他の構成を設定します。
1. {{< ui >}}Create Secret{{< /ui >}} をクリックします。

## カスタム Dataflow ワーカーサービスアカウントを作成する {#create-a-custom-dataflow-worker-service-account}

Dataflow パイプラインワーカーのデフォルトの動作は、プロジェクトの [Compute Engine のデフォルトのサービスアカウント][10] を使用することです。このアカウントは、プロジェクト内のすべてのリソースに対する権限を付与します。本番環境からログを転送している場合は、必要なロールと権限のみを持つカスタムワーカーのサービスアカウントを作成し、このサービスアカウントを Dataflow パイプラインワーカーに割り当てます。

**注**: Dataflow パイプラインワーカー用のカスタムサービスアカウントを作成していない場合は、デフォルトの Compute Engine のサービスアカウントが下記の[必要な権限](#required-permissions)を持っていることを確認してください。

1. Google Cloud の[サービスアカウント][11]ページに移動します。
1. プロジェクトを選択します。
1. {{< ui >}}Create Service Account{{< /ui >}} をクリックします。
1. わかりやすいサービスアカウント名を入力します。
1. {{< ui >}}Create and Continue{{< /ui >}} をクリックします。
1. 以下のロールを追加します。
##### 必要な権限
    | ロール | パス | 説明 |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  このサービスアカウントが Dataflow 管理タスクを実行することを許可します
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  このサービスアカウントが Dataflow のジョブオペレーションを実行することを許可します
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションのメッセージを表示することを許可します
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを取得することを許可します
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | このサービスアカウントが別のサブスクリプションに失敗したメッセージを公開することを許可します。これにより、ログの解析や再送信が可能になります
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | このサービスアカウントが Secret Manager で Datadog API キーにアクセスすることを許可します
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | このサービスアカウントがファイルのステージング用に指定されたクラウドストレージバケットに対する読み取りと書き込みを行うことを許可します |
7. {{< ui >}}Continue{{< /ui >}} をクリックします。
8. {{< ui >}}Done{{< /ui >}} をクリックします。

##  Pub/Sub にログを公開するためのログシンクを作成する {#create-a-log-sink-to-publish-logs-to-the-pubsub}

1. Google Cloud の[ログエクスプローラー][19]に移動します。
1. 左側のサイドメニューで {{< ui >}}Log Router{{< /ui >}} を選択します。
1. {{< ui >}}Create Sink{{< /ui >}} をクリックします。
1. わかりやすいシンク名を入力します。
1. {{< ui >}}Next{{< /ui >}} をクリックします。
1. **シンクサービスを選択する**ドロップダウンメニューで {{< ui >}}Cloud Pub/Sub topic{{< /ui >}} を選択します。
    **注**: Cloud Pub/Sub トピックは別のプロジェクトに配置できます。
1. **Cloud Pub/Sub トピックを選択する** で、先ほど作成した Pub/Sub を選択します。
1. {{< ui >}}Next{{< /ui >}} をクリックします。
1. Datadog に送信するログの包含フィルターを入力します。
1. {{< ui >}}Next{{< /ui >}} をクリックします。
1. 必要に応じて、Datadog に送信しないログを除外するためのフィルターを入力します。
1. {{< ui >}}Create Sink{{< /ui >}} をクリックします。

**注**: 異なるシンクを利用して、Google Cloud Logging から同一の Pub/Sub トピックに対して複数のエクスポートを行うことが可能です。

## Dataflow ジョブを作成して実行する {#create-and-run-the-dataflow-job}

1. Google Cloud [データフロー][20]に移動します。
1. {{< ui >}}Create job from template{{< /ui >}} をクリックします。
1. ジョブの名前を入力します。
1. 地域のエンドポイントを選択します。
1. **データフローテンプレート**ドロップダウンメニューで {{< ui >}}Pub/Sub to Datadog{{< /ui >}} を選択します。
1. **必要なパラメーター**セクションで、以下を実行します。
   1. **Pub/Sub 入力サブスクリプション**ドロップダウンメニューで、新しい [Pub/Sub システム](#create-a-google-cloud-publishsubscription-pubsub-system) を作成したときに作成されたデフォルトのサブスクリプションを選択します。
   1. **Datadog Logs API URL** フィールドに以下の値を入力します。
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Note**: Ensure that the Datadog site selector on the right of this documentation page is set to your Datadog site before copying the URL above.
   1. **Output deadletter Pub/Sub topic** フィールドで、Datadog API によって拒否されたメッセージを受信するために以前に作成した[追加トピック](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic) を選択します。
   1. **Temporary location** フィールドで、ストレージバケット内の一時ファイルのパスを指定します。
1. 先ほど Datadog API キー値用の[シークレットを Secret Manager で作成](#create-a-secret-in-secret-manager)した場合:
   1. {{< ui >}}Optional Parameters{{< /ui >}} をクリックして、追加のフィールドを表示します。
   1. **Google Cloud Secret Manager ID** フィールドにシークレットのリソース名を入力します。<br />
      リソース名を取得するには、[Secret Manager][8] でシークレットに移動します。シークレットをクリックします。**アクション**の下の 3 点ドットをクリックし、{{< ui >}}Copy resource name{{< /ui >}} を選択します。
   1. **Source of the API key passed** フィールドに `SECRET_MANAGER` と入力します。
1. Datadog API キーの値にシークレットを使用していない場合:
    - **推奨**:
        - `Source of API key passed` を `KMS` に設定します。
        - `Google Cloud KMS  key for the API key` を Cloud KMS キー ID に設定します。
        - `Logs API Key` を暗号化された API キーに設定します。
    - **非推奨**: `Source of API key passed` を `PLAINTEXT` に設定し、`Logs API Key` に平文の API キーを設定します。
1. その他の使用可能なオプションの詳細については、Dataflow テンプレートの[テンプレートパラメーター][21]を参照してください。
1. カスタムワーカーサービスアカウントを作成した場合は、**サービスアカウントメール**ドロップダウンメニューでそれを選択します。
1. {{< ui >}}Run Job{{< /ui >}} をクリックします。

[Datadog Log エクスプローラー][22]で Cloud Pub/Sub トピックに配信された新規ログイベントを確認します。

## Cloud SIEM でセキュリティシグナルをトリアージする {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM は、設定した Google Cloud 監査ログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- [Cloud SIEM シグナルエクスプローラー][23]に移動して、脅威を表示し、トリアージします。詳細については、セキュリティシグナルエクスプローラーを参照してください。
- また、[Google Cloud Audit Log ダッシュボード][24]を使って、異常なアクティビティを調査することも可能です。
- ログに適用される[すぐに使える検出ルール][25]を参照してください。
- [新しいルール][26]を作成し、特定のユースケースにマッチした脅威を検出することができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /ja/logs/guide/google-cloud-log-forwarding/#monitor-the-cloud-pubsub-log-forwarding
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