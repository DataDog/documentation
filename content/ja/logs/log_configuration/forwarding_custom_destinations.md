---
title: Forwarding Logs to Custom Destinations
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/"
  tag: Blog
  text: Route logs to third-party systems with Datadog Log Forwarding
- link: /logs/log_collection
  tag: Documentation
  text: Start collecting your logs
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Learn about log pipelines
- link: /observability_pipelines/
  tag: Documentation
  text: Forward logs directly from your environment with Observability Pipelines
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Log forwarding is not available for the Government site. Contact your account representative for more information.
</div>
{{% /site-region %}}

## Overview

Log Forwarding allows you to send logs from Datadog to custom destinations like Splunk, Elasticsearch, and HTTP endpoints. This means that you can use [Log Pipelines][1] to centrally collect, process, and standardize your logs in Datadog. Then, send the logs from Datadog to other tools to support individual teams' workflows. You can choose to forward any of the ingested logs, whether or not they are indexed, to custom destinations. Logs are forwarded in JSON format and compressed with GZIP.

**Note**: Only Datadog users with the [`logs_write_forwarding_rules`][2] permission can [create][6], [edit][7], and [delete][8] custom destinations for forwarding logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="ログ転送のページで、カスタム宛先がハイライト表示されています。宛先のリストには、Splunk (service:logs-processing でフィルタリング)、HTTP Endpoint (source:okta OR source:paloalto でフィルタリング)、Elasticsearch (team:acme env:prod でフィルタリング) が含まれています。" >}}

If a forwarding attempt fails (for example: if your destination temporarily becomes unavailable), Datadog retries periodically for 2 hours using an exponential backoff strategy. The first attempt is made following a 1-minute delay. For subsequent retries, the delay increases progressively to a maximum of 8-12 minutes (10 minutes with 20% variance).

次のメトリクスは、再試行後に正常に送信されたログなどの正常に転送されたログ、およびドロップされたログについて報告します。

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## カスタム宛先へのログ転送設定

1. Add webhook IPs from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.
2. [ログ転送][4]に移動します。
3. **Custom Destinations** を選択します。
4. **New Destination** をクリックします。
5. 転送するログをフィルターするためのクエリを入力します。詳しくは、[検索構文][5]を参照してください。
6. **Destination Type** を選択します。

{{< img src="logs/log_configuration/forwarding/tag-forwarding.png" alt="The destination configuration page, showing the steps to set up a new destination." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

6. 宛先の名前を入力します。
7. **Define endpoint** フィールドで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。
    - 例えば、Sumo Logic にログを送信する場合、[ログとメトリクスのための HTTP ソースの構成ドキュメント][1] に従って HTTP Source Address URL を取得し、コレクターにデータを送信します。HTTP Source Address URL を **Define endpoint** フィールドに入力します。
8. **Configure Authentication** セクションで、以下の認証タイプのいずれかを選択し、関連する詳細を入力します。
    - Basic Authentication: ログの送信先となるアカウントのユーザー名とパスワードを入力します。
    - Request Header: ヘッダー名と値を指定します。例えば、Authorization ヘッダーを使用し、ログを送信するアカウントのユーザー名が `myaccount` で、パスワードが `mypassword` の場合:
        - **Header Name** に `Authorization` を入力します。
        - ヘッダー値は `Basic username:password` というフォーマットで、`username:password` は base64 でエンコードされています。この例では、ヘッダー値は `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` となります。

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 宛先の名前を入力します。
7. In the **Configure Destination** section, enter the endpoint to which you want to send the logs. The endpoint must start with `https://`. For example, enter `https://<your_account>.splunkcloud.com:8088`.  
    **Note**: `/services/collector/event` is automatically appended to the endpoint.
8. In the **Configure Authentication** section, enter the Splunk HEC token. See [Set up and use HTTP Event Collector][1] for more information about the Splunk HEC token.  
    **Note**: The [indexer acknowledgment][2] needs to be disabled.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 宛先の名前を入力します。
7. **Configure Destination** セクションで、以下の内容を入力します。
    a. ログを送信するエンドポイント。エンドポイントは `https://` で始まらなければなりません。Elasticsearch のエンドポイント例: `https://<your_account>.us-central1.gcp.cloud.es.io`
    b. ログを送信する宛先インデックスの名前。 
    c. オプションで、新しいインデックスを作成する頻度を示すインデックスローテーションを選択します。`No Rotation`、`Every Hour`、`Every Day`、`Every Week`、または `Every Month` です。デフォルトは `No Rotation` です。
8. **Configure Authentication** セクションで、Elasticsearch アカウントのユーザー名とパスワードを入力します。

{{% /tab %}}
{{< /tabs >}}

9. In the **Select Tags to Forward** section:   
  a. Select whether you want **All tags**, **No tags**, or **Specific Tags** to be included.   
  b. Select whether you want to **Include** or **Exclude specific tags**, and specify which tags to include or exclude.
10. **Save** をクリックします。

[Log Forwarding][4] ページで、宛先のステータスにカーソルを合わせると、過去 1 時間に転送されたフィルターの条件に一致するログの割合が表示されます。

## 宛先を編集する
1. [ログ転送][4]に移動します。
2. **Custom Destinations** を選択すると、既存のすべての宛先のリストが表示されます。
3. 編集したい宛先の **Edit** ボタンをクリックします。
4. 構成ページで変更します。
5. **Save** をクリックします。

## 宛先を削除する
1. [ログ転送][4]に移動します。
2. **Custom Destinations** を選択すると、既存のすべての宛先のリストが表示されます。
3. 削除したい宛先の **Delete** ボタンをクリックし、**Confirm** をクリックします。これにより、設定されている宛先リストから宛先が削除され、ログが転送されなくなります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /logs/explorer/search_syntax/
[6]: /logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /logs/log_configuration/forwarding_custom_destinations#delete-a-destination
