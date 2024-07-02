---
title: Forwarding Audit Events to Custom Destinations
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: Learn more about Audit Trail
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Audit Event Forwarding is not available in the US1-FED site.
</div>
{{% /site-region %}}

{{% site-region region="US,US3,US5,EU,AP1" %}}
<div class="alert alert-warning">Audit Event Forwarding is in beta. </div>
{{% /site-region %}}

## 概要

Audit Event Forwarding allows you to send audit events from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. Audit events are forwarded in JSON format. You can add up to three destinations for each Datadog org.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="The Custom Destinations section showing an active Login-Event-to-SIEM destination with 10.4 MB of estimated audit events volume in the last 24 hours and @action:login as query to filter." >}}

**Note**: Only Datadog users with the `audit_trail_write` permission can create, edit, or delete custom destinations for forwarding audit events.

## Set up audit event forwarding to custom destinations

1. Add webhook IPs from the [IP ranges list][1] to the allowlist if necessary.
2. Navigate to [Audit Trail Settings][2].
3. Click **Add Destination** in the **Audit Event Forwarding** section.
4. Enter the query to filter your audit events for forwarding. For example, add `@action:login` as the query to filter if you only want to forward login events to your SIEM or custom destination. See [Search Syntax][3] for more information.
5. **Destination Type** を選択します。

{{< tabs >}}
{{% tab "HTTP" %}}

6. 宛先の名前を入力します。
7. **Define endpoint** フィールドで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。
    - 例えば、Sumo Logic にログを送信する場合、[ログとメトリクスのための HTTP ソースの構成ドキュメント][1] に従って HTTP Source Address URL を取得し、コレクターにデータを送信します。HTTP Source Address URL を **Define endpoint** フィールドに入力します。
8. **Configure Authentication** セクションで、以下の認証タイプのいずれかを選択し、関連する詳細を入力します。
    - Basic Authentication: ログの送信先となるアカウントのユーザー名とパスワードを入力します。
    - Request Header: Provide the header name and value. For example, if you use the Authorization header and the username for the account to which you want to send logs is `myaccount` and the password is `mypassword`:
        - Enter `Authorization` for the **Header Name**.
        - ヘッダー値は `Basic username:password` というフォーマットで、`username:password` は base64 でエンコードされています。この例では、ヘッダー値は `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` となります。
  9. **Save** をクリックします。

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 宛先の名前を入力します。
7. **Configure Destination** セクションで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。例えば、`https://<your_account>.splunkcloud.com:8088`と入力します。**注**: エンドポイントには `/services/collector/event` が自動的に付加されます。
8. **Configure Authentication** セクションで、Splunk HEC トークンを入力します。Splunk HEC トークンの詳細については、[HTTP Event Collector のセットアップと使用][1]を参照してください。
9. **Save** をクリックします。

**注**: [インデクサ確認応答][2]を無効にする必要があります。

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 宛先の名前を入力します。
7. In the **Configure Destination** section, enter the following details:

   a. The endpoint to which you want to send the logs. The endpoint must start with `https://`. An example endpoint for Elasticsearch: `https://<your_account>.us-central1.gcp.cloud.es.io`.

   b. The name of the destination index where you want to send the logs.

   c. Optionally, select the index rotation for how often you want to create a new index: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, or `Every Month`. The default is `No Rotation`.

8. **Configure Authentication** セクションで、Elasticsearch アカウントのユーザー名とパスワードを入力します。
9. **Save** をクリックします。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /logs/explorer/search_syntax/
