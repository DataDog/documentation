---
description: コンプライアンスおよびセキュリティ監視のために、Datadog から Splunk、Elasticsearch、HTTP エンドポイントなどのカスタム宛先に監査イベントを転送します。
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: Audit Trail について
title: カスタム宛先への監査イベントの転送
---
## 概要{#overview}

Audit Event Forwarding を使用すると、Datadog からカスタム宛先 (Splunk、Elasticsearch、HTTP エンドポイントなど) に監査イベントを送信できます。監査イベントは JSON 形式で転送されます。Datadog 組織ごとに最大 3 つの宛先を追加できます。

Audit Trail には、組織ごとに月間最大 5 億件の監査イベントの転送が含まれています。この制限を超える使用量に対して追加料金が発生する場合があります。

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="アクティブな Login-Event-to-SIEM 宛先と、過去 24 時間の推定監査イベント量が 10.4 MB、フィルタリング用のクエリとして @action:login が示されている [Custom Destinations] (カスタム宛先) セクション。" >}}

**注**: `audit_trail_write` 権限を持つ Datadog ユーザーのみが、監査イベント転送用のカスタム宛先を作成、編集、削除できます。

## カスタム宛先への監査イベントの転送のセットアップ{#set-up-audit-event-forwarding-to-custom-destinations}

1. 必要に応じて、[IP 範囲リスト][1]から Webhook の IP を許可リストに追加します。
2. [[Audit Trail Settings] (Audit Trail 設定)][2] に移動します。
3. [{{< ui >}}Audit Event Forwarding{{< /ui >}}] (監査イベントの転送)セクションで [{{< ui >}}Add Destination{{< /ui >}}] (監査イベント) をクリックします。
4. 転送する監査イベントをフィルタリングするためのクエリを入力します。たとえば、ログインイベントのみを SIEM またはカスタム宛先に転送する場合は、フィルタリング用のクエリとして `@action:login` を追加してください。詳細については、[検索構文][3]を参照してください。
5. [{{< ui >}}Destination Type{{< /ui >}}] (宛先タイプ) を選択します。

{{< tabs >}}
{{% tab "HTTP" %}}

6. 宛先の名前を入力します。
7.  [{{< ui >}}Define endpoint{{< /ui >}}] (エンドポイントの定義) フィールドに、ログの送信先となるエンドポイントを入力します。エンドポイントは `https://` で始まる必要があります。
    - たとえば、Sumo Logic にログを送信する場合、[ログとメトリクスのための HTTP ソースの構成ドキュメント][1]に従って HTTP Source Address URL を取得し、コレクターにデータを送信します。HTTP Source Address URL を [{{< ui >}}Define endpoint{{< /ui >}}] (エンドポイントを定義) フィールドに入力します。
8.  [{{< ui >}}Configure Authentication{{< /ui >}}] (認証の構成) セクションで、次のいずれかの認証タイプを選択し、関連する詳細を入力します。
    - Basic Authentication (基本認証): ログの送信先となるアカウントのユーザー名とパスワードを入力します。
    - Request Header (リクエストヘッダー): ヘッダー名と値を指定します。たとえば、Authorization ヘッダーを使用し、ログを送信するアカウントのユーザー名が `myaccount` で、パスワードが `mypassword` の場合:
        - [{{< ui >}}Header Name{{< /ui >}}] (ヘッダー名) に `Authorization` と入力します。
        - ヘッダー値の形式は `Basic username:password` であり、`username:password` は base64 でエンコードされます。この例では、ヘッダー値は `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` です。
  9. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 宛先の名前を入力します。
7. [{{< ui >}}Configure Destination{{< /ui >}}] (宛先の構成) セクションで、ログの送信先エンドポイントを入力します。エンドポイントは `https://` で始まる必要があります。たとえば、`https://<your_account>.splunkcloud.com:8088` と入力します。**注**: `/services/collector/event` はエンドポイントに自動的に追加されます。
8. [{{< ui >}}Configure Authentication{{< /ui >}}] (認証の構成) セクションで Splunk HEC トークンを入力します。Splunk HEC トークンの詳細については、[HTTP Event Collector のセットアップと使用][1]を参照してください。
9. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

**注**: [インデクサ確認応答][2]を無効にする必要があります。

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 宛先の名前を入力します。
7. [{{< ui >}}Configure Destination{{< /ui >}}] (宛先の構成) セクションで、以下の詳細を入力します。
   1. ログの送信先エンドポイント。エンドポイントは `https://` で始まる必要があります。Elasticsearch のエンドポイントの例: `https://<your_account>.us-central1.gcp.cloud.es.io`。
   1. ログを送信する宛先インデックスの名前。  
   1. 必要に応じて、新しいインデックスの作成頻度を指定するインデックスローテーションを選択します (`No Rotation`、`Every Hour`、`Every Day`、`Every Week`、`Every Month`)。デフォルトは `No Rotation` です。
8. [{{< ui >}}Configure Authentication{{< /ui >}}] (認証の構成) セクションで、Elasticsearch アカウントのユーザー名とパスワードを入力します。
9. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">Microsoft Sentinel へのログ転送はプレビュー版です。</div>

6. 宛先の名前を入力します。
7. Microsoft Sentinel Forwarder の認証では、Datadog Azure インテグレーションを通じて App Registration を設定する必要があります。
8. [{{< ui >}}Configure Destination{{< /ui >}}] (宛先の構成) セクションで、以下の詳細を入力します。
  | 設定                   | 説明                                                                                                          | 例                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | ログの送信先となる Data Collection Endpoint (DCE) のエンドポイントを入力します。これは、DCE の概要ページで「Logs Ingestion」というラベルが付けられています。| `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | DCR の概要ページで「Immutable Id」として確認できる、ログルーティングが定義された Data Collection Rule (DCR) の不変 ID を指定します。 **注**: DCR の IAM 設定で Monitoring Metrics Publisher ロールが割り当てられていることを確認してください。| `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| DCR のリソース JSON の `streamDeclarations` の下にあるターゲットストリーム宣言の名前を指定します。| `Custom-MyTable`                                          |

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /ja/logs/explorer/search_syntax/