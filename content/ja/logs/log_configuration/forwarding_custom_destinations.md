---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: GitHub
  text: Datadog ログ転送でサードパーティシステムにログをルートする
- link: /logs/log_collection
  tag: ドキュメント
  text: ログの収集開始
- link: /logs/log_configuration/pipelines
  tag: ドキュメント
  text: ログパイプラインについて
is_beta: true
kind: documentation
private: true
title: カスタム宛先へのログの転送
---

{{< callout url="https://www.datadoghq.com/log-forwarding-limited-availability/" >}}
  ログ転送は現在ベータ版です。このフォームにご記入の上、アクセスをリクエストしてください。
{{< /callout >}}

## 概要

ログ転送を使用すると、Datadog から Splunk、Elasticsearch、HTTP エンドポイントなどのカスタム宛先にログを送信することができます。つまり、[ログパイプライン][1]を使用して、Datadog でログを一元的に収集、処理、標準化することが可能です。その後、Datadog から他のツールにログを送信し、各チームのワークフローをサポートします。取り込まれたログは、インデックスの有無にかかわらず、カスタム宛先に転送することができます。ログは JSON 形式で転送され、GZIP で圧縮されます。

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="ログ転送のページで、カスタム宛先がハイライト表示されています。宛先のリストには、Splunk (service:logs-processing でフィルタリング)、HTTP Endpoint (source:okta OR source:paloalto でフィルタリング)、Elasticsearch (team:acme env:prod でフィルタリング) が含まれています。" >}}

**注**: [`logs_write_forwarding_rules`][2] 権限を持つ Datadog ユーザーのみ、ログ転送用のカスタム宛先を作成、編集、削除することができます。

## カスタム宛先へのログ転送設定

1. [ログ転送][3]に移動します。または、**Logs** &gt; **Configuration** に移動して、**Log Forwarding** タブをクリックします。
2. **Custom Destinations** を選択します。
3. **New Destination** をクリックします。
4. 転送するログをフィルターするためのクエリを入力します。詳しくは、[検索構文][4]を参照してください。
5. **Destination Type** を選択します。

{{< img src="logs/log_configuration/forwarding/configuration.png" alt="宛先の構成ページで、新しい宛先を設定する手順を示しています。" style="width:70%;">}}

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
  9. **保存**をクリックします。

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{< /tabs >}}

{{% tab "Splunk" %}}

6. 宛先の名前を入力します。
7. **Configure Destination** セクションで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。例: `https://<your_account>.splunkcloud.com:8088/services/collector`
8. **Configure Authentication** セクションで、Splunk HEC トークンを入力します。Splunk HEC トークンの詳細については、[HTTP Event Collector のセットアップと使用][1]を参照してください。
9. **保存**をクリックします。

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
{{< /tabs >}}

{{% tab "Elasticsearch" %}}

6. 宛先の名前を入力します。
7. **Configure Destination** セクションで、以下の内容を入力します。
    a. ログを送信するエンドポイント。エンドポイントは `https://` で始まらなければなりません。Elasticsearch のエンドポイント例: `https://<your_account>.us-central1.gcp.cloud.es.io`
    b. ログを送信する宛先インデックスの名前。 
    c. オプションで、新しいインデックスを作成する頻度を示すインデックスローテーションを選択します。`No Rotation`、`Every Hour`、`Every Day`、`Every Week`、または `Every Month` です。デフォルトは `No Rotation` です。
8. **Configure Authentication** セクションで、Elasticsearch アカウントのユーザー名とパスワードを入力します。
9. **保存**をクリックします。

{{% /tab %}}
{{< /tabs >}}

[Log Forwarding][3] ページで、宛先のステータスにカーソルを合わせると、過去 1 時間に転送されたフィルターの条件に一致するログの割合が表示されます。

## 宛先を編集する
1. [ログ転送][3]に移動します。
2. **Custom Destinations** を選択すると、既存のすべての宛先のリストが表示されます。
3. 編集したい宛先の **Edit** ボタンをクリックします。
4. 構成ページで変更します。
5. **保存**をクリックします。

## 宛先を削除する
1. [ログ転送][3]に移動します。
2. **Custom Destinations** を選択すると、既存のすべての宛先のリストが表示されます。
3. 削除したい宛先の **Delete** ボタンをクリックし、**Confirm** をクリックします。これにより、設定されている宛先リストから宛先が削除され、ログが転送されなくなります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/pipelines/
[2]: /ja/account_management/rbac/permissions/?tab=ui#log-management
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[4]: /ja/logs/explorer/search_syntax/