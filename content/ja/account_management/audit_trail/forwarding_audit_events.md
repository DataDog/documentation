---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
title: カスタム宛先への監査イベントの転送
---

<div class="alert alert-warning">監査イベントの転送はベータ版です。 </div>

## 概要

監査イベントの転送機能により、Datadog から Splunk、Elasticsearch、およびHTTPエンドポイントなどのカスタムの宛先に監査イベントを送信することができます。監査イベントは JSON 形式で転送されます。各 Datadog 組織には最大で 3 つの宛先を追加することができます。

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="カスタム宛先セクションに、過去 24 時間の監査イベントの推定ボリュームが 10.4 MB で、@action:login をフィルタリング用クエリとして使用する Login-Event-to-SIEM のアクティブな宛先が表示されている様子。" >}}

**注**: `audit_trail_write` 権限を持つ Datadog ユーザーのみ、監査イベント転送用のカスタム宛先を作成、編集、削除することができます。

## カスタム宛先への監査イベント転送設定

1. 必要に応じて、[IP 範囲リスト][1]から Webhook の IP を許可リストに追加します。
2. [Audit Trail Settings][2] に移動します。
3. **Audit Event Forwarding** セクションの **Add Destination** をクリックします。
4. 転送する監査イベントのフィルタリングに使用するクエリを入力します。例えば、ログインイベントのみを SIEM またはカスタム宛先に転送したい場合は、`@action:login` をフィルタリング用のクエリとして追加します。詳細については、[検索構文][3]を参照してください。
5. **Destination Type** を選択します。

{{< tabs >}}
{{% tab "HTTP" %}}

6. 宛先の名前を入力します。
7. **Define endpoint** フィールドで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。
    - 例えば、Sumo Logic にログを送信する場合、[ログとメトリクスのための HTTP ソースの構成ドキュメント][1] に従って HTTP Source Address URL を取得し、コレクターにデータを送信します。HTTP Source Address URL を **Define endpoint** フィールドに入力します。
8. **Configure Authentication** セクションで、以下の認証タイプのいずれかを選択し、関連する詳細を入力します。
    - Basic Authentication: ログの送信先となるアカウントのユーザー名とパスワードを入力します。
    - Request Header: ヘッダー名と値を指定します。例えば、Authorization ヘッダーを使用し、ログを送信するアカウントのユーザー名が `myaccount` で、パスワードが `mypassword` の場合:
        - **Header Name** に `Authorization` を入力します。
        - ヘッダーの値は `Basic username:password` の形式であり、`username:password` は base64 でエンコードされています。この例では、ヘッダー値は `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` となります。
  9. **Save** をクリックします。

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 宛先の名前を入力します。
7. **Configure Destination** セクションで、ログを送信するエンドポイントを入力します。エンドポイントは、`https://` で始まる必要があります。例えば、`https://<your_account>.splunkcloud.com:8088`と入力します。**注**: エンドポイントには `/services/collector/event` が自動的に付加されます。
8. **Configure Authentication** セクションで、Splunk HEC トークンを入力します。Splunk HEC トークンの詳細については、[HTTP Event Collector のセットアップと使用][1]を参照してください。
9. **Save** をクリックします。

**注**: [インデクサの確認][2]は無効にする必要があります。

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
9. **Save** をクリックします。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /ja/logs/explorer/search_syntax/