---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: ブログ
  text: Datadog ログ転送でサードパーティシステムにログをルートする
- link: /logs/log_collection
  tag: ドキュメント
  text: ログの収集開始
- link: /logs/log_configuration/pipelines
  tag: ドキュメント
  text: ログパイプラインについて
- link: /observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines を使用して、環境から直接ログを転送します
- link: https://www.datadoghq.com/blog/microsoft-sentinel-logs/
  tag: ブログ
  text: ログを Microsoft Sentinel に送信する前に、Datadog で一元的に処理および管理します
- link: /security/events_forwarding
  tag: ドキュメント
  text: セキュリティシグナル、スパン、およびその他のイベントをカスタム宛先に転送します。
title: カスタム宛先へのログの転送
---
## 概要{#overview}

ログ転送を使用すると、Datadog から Splunk、Elasticsearch、HTTP エンドポイントなどのカスタム宛先にログを送信できます。つまり、[Log Pipelines][1] を使用して、Datadog でログを一元的に収集、処理、および標準化できます。その後、Datadog から他のツールにログを送信して、各チームのワークフローをサポートします。インデックス化されているかどうかにかかわらず、取り込まれたログをカスタム宛先に転送することができます。ログはデフォルトで JSON 形式で転送され、GZIP で圧縮されます。

**注**: [`logs_write_forwarding_rules`][2] 権限を持つ Datadog ユーザーのみが、ログ転送用のカスタム宛先を[作成][6]、[編集][7]、[削除][8]できます。

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="カスタム宛先が強調表示されているログ転送ページ。宛先のリストには、Splunk (service:logs-processing でフィルタリング)、HTTP エンドポイント (source:okta または source:paloalto でフィルタリング)、および Elasticsearch (team:acme env:prod でフィルタリング) が含まれます。" >}}

転送の試行が失敗した場合 (例: 宛先が一時的に利用できなくなった場合)、Datadog は指数バックオフ戦略を使用して 2 時間の間、定期的に再試行します。最初の試行は 1 分の遅延の後に行われます。その後の再試行では、遅延は段階的に増加し、最大で 8〜12 分に達します (10 分には 20% の分散が適用されます)。

次のメトリクスは、再試行後に正常に送信されたログなどの正常に転送されたログ、およびドロップされたログについて報告します。

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## カスタム宛先へのログ転送設定{#set-up-log-forwarding-to-custom-destinations}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">カスタム宛先へのログの送信は Datadog GovCloud 環境の外部で行われるため、Datadog の管理外となります。Datadog は、Datadog GovCloud 環境を離れたログについて一切の責任を負いません。これには、FedRAMP、DoD インパクトレベル、ITAR、輸出コンプライアンス、データ所在地、またはそれらのログに適用される同様の規制に関連してユーザーが負う義務や要件が含まれますが、これらに限定されません。
<br><br>
セキュリティプロトコルのため、 {{< region-param key="dd_datacenter" >}} サイトではログ転送用にポート 443 および 8088 のみが開放されています。別のポートを使用するには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>までお問い合わせください。</div>
{{< /site-region >}}

1.  {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} に記載されている Webhook IP を許可リストに追加してください。
1. [Log Archiving & Forwarding][4] に移動します。
3. {{< ui >}}Custom Destinations{{< /ui >}} を選択します。
4. {{< ui >}}New Destination{{< /ui >}} をクリックします。
5. 転送するログをフィルタリングするためのクエリを入力します。詳細については、[検索構文][5]を参照してください。
6. {{< ui >}}Destination Type{{< /ui >}} を選択します。

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="新しい宛先を設定する手順を示す、宛先構成ページ。" style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. 宛先の名前を入力します。
8. {{< ui >}}Define endpoint{{< /ui >}} フィールドに、ログの送信先となるエンドポイントを入力します。エンドポイントは `https://` で始まる必要があります。
    - たとえば、Sumo Logic にログを送信する場合、[ログとメトリクスのための HTTP ソースの構成ドキュメント][1]に従って HTTP Source Address URL を取得し、コレクターにデータを送信します。HTTP Source Address URL を {{< ui >}}Define endpoint{{< /ui >}} フィールドに入力します。
9. (オプション) HTTP エンドポイントが圧縮されたペイロードをサポートしていない場合は、GZIP 圧縮を無効にします。
10. {{< ui >}}Configure Authentication{{< /ui >}} セクションで、次のいずれかの認証タイプを選択し、関連する詳細を入力します。
  | 認証タイプ      | 説明                                                                                                              | 例                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| {{< ui >}}Basic Authentication{{< /ui >}} | ログの送信先となるアカウントのユーザー名とパスワードを入力します。                                       | ユーザー名: `myaccount`<br>パスワード: `mypassword`                       |
| {{< ui >}}Request Header{{< /ui >}}       | ヘッダー名と値を入力します。Authorization の例:<br>- {{< ui >}}Header Name{{< /ui >}} に `Authorization` を入力します。<br>- `Basic username:password` の形式でフォーマットされ、base64 でエンコードされたヘッダー値を使用します。| ヘッダー名: `Authorization`<br>ヘッダー値: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. 宛先の名前を入力します。
8. {{< ui >}}Configure Destination{{< /ui >}} セクションで、ログの送信先エンドポイントを入力します。エンドポイントは `https://` で始まる必要があります。たとえば、`https://<your_account>.splunkcloud.com:8088` と入力します。 
    **注**: `/services/collector/event` はエンドポイントに自動的に追加されます。
9. {{< ui >}}Configure Authentication{{< /ui >}} セクションで、Splunk HEC トークンを入力します。Splunk HEC トークンの詳細については、[HTTP Event Collector のセットアップと使用][1]を参照してください。 
    **注**: [インデクサ確認応答][2]を無効にする必要があります。
10. (オプション) {{< ui >}}Configure Sourcetype{{< /ui >}} セクションで、転送されたイベントに割り当てる Splunk sourcetype を指定します。Splunk sourcetype の詳細については、[Sourcetype が重要な理由][3]を参照してください。設定しない場合、デフォルトの sourcetype である `_json` が使用されます。sourcetype なしでイベントを送信するには、**Send without sourcetype** を選択します。

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
[3]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.4/configure-source-types/why-source-types-matter
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. 宛先の名前を入力します。
8. {{< ui >}}Configure Destination{{< /ui >}} セクションで、以下の詳細を入力します。
  | 設定                        | 説明                                                                                                  | 例                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| {{< ui >}}Endpoint{{< /ui >}}                   | ログの送信先エンドポイントを入力します。エンドポイントは `https://` で始まる必要があります。              | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| {{< ui >}}Destination Index Name{{< /ui >}}     | ログの送信先インデックスの名前を指定します。                                  | `your_index_name`                        |
| {{< ui >}}Index Rotation{{< /ui >}}              | オプションで、新しいインデックスを作成する頻度を選択します: `No Rotation`、`Every Hour`、`Every Day`、`Every Week`、`Every Month`。デフォルトは `No Rotation` です。| `Every Day`                              |
9. {{< ui >}}Configure Authentication{{< /ui >}} セクションで、Elasticsearch アカウントのユーザー名とパスワードを入力します。

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. 宛先の名前を入力します。
8. Microsoft Sentinel Forwarder の認証には、Datadog Azure インテグレーションを通じて構成されたアプリ登録が必要です。Azure インテグレーションのアプリ登録がすでに存在する場合は、新しく作成する代わりにそれを再利用できます。
9. {{< ui >}}Configure Destination{{< /ui >}} セクションで、以下の詳細を入力します。
  | 設定                   | 説明                                                                                                          | 例                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | ログの送信先となる Data Collection Endpoint (DCE) のエンドポイントを入力します。これは、DCE の概要ページで「Logs Ingestion」というラベルが付けられています。| `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | DCR の概要ページで「Immutable Id」として確認できる、ログルーティングが定義された Data Collection Rule (DCR) の不変 ID を指定します。 **注**: DCR の IAM 設定で Monitoring Metrics Publisher ロールが割り当てられていることを確認してください。| `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| DCR のリソース JSON の `streamDeclarations` の下にあるターゲットストリーム宣言の名前を指定します。  | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

7. 宛先の名前を入力します。
8. Google Chronicle Forwarder の認証には、Chronicle への書き込みアクセス権を持つ GCP サービスアカウントを使用する必要があります。
9. {{< ui >}}Configure Destination{{< /ui >}} セクションで、以下の詳細を入力します。
  | 設定                   | 説明                                                                                                          | 例                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Customer ID{{< /ui >}} | Google から提供された Chronicle 顧客 ID。| `abcd1234`   |
| {{< ui >}}Regional Endpoint{{< /ui >}}           | リージョンに基づいた Chronicle 取り込み API エンドポイント URL。 **注**: DCR の IAM 設定で Monitoring Metrics Publisher ロールが割り当てられていることを確認してください。| `https://us.chronicle.googleapis.com`              |
| {{< ui >}}Namespace{{< /ui >}}| Chronicle ログを取り込むネームスペース。 | `default`                                          |

10. {{< ui >}}Configure authentication settings{{< /ui >}} セクションで、以下の詳細を入力します。
  | 設定                   | 説明                                                                                                          | 例                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Project ID{{< /ui >}}| Chronicle インスタンスに関連付けられた GCP プロジェクト ID。 | `my-gcp-chronicle-project`                                          |
| {{< ui >}}Private Key ID{{< /ui >}}| サービスアカウントの認証情報に含まれる秘密鍵の ID。 | `0123456789abcdef`                                          |
| {{< ui >}}Private Key{{< /ui >}}| サービスアカウントの認証情報に含まれる秘密鍵。 | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| {{< ui >}}Client Email{{< /ui >}}| サービスアカウントのメールアドレス。 | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| {{< ui >}}Client ID{{< /ui >}}| サービスアカウントの認証情報に含まれるクライアント ID。  | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. {{< ui >}}Select Tags to Forward{{< /ui >}} セクションで、次の操作を行います。
    1. {{< ui >}}All tags{{< /ui >}}、{{< ui >}}No tags{{< /ui >}}、または {{< ui >}}Specific Tags{{< /ui >}} のいずれを含めるかを選択します。
    1. {{< ui >}}Include{{< /ui >}} するか {{< ui >}}Exclude specific tags{{< /ui >}} するかを選択し、含めるタグまたは除外するタグを指定します。
11. {{< ui >}}Save{{< /ui >}} をクリックします。


[Log Forwarding][4] ページで、宛先のステータスにカーソルを合わせると、過去 1 時間に転送されたフィルターの条件に一致するログの割合が表示されます。

## 宛先を編集する{#edit-a-destination}
1. [Log Forwarding][4] に移動します。
2. 既存のすべての宛先の一覧を表示するには、{{< ui >}}Custom Destinations{{< /ui >}} を選択します。
3. 編集する宛先の {{< ui >}}Edit{{< /ui >}} ボタンをクリックします。
4. 構成ページで変更します。
5. {{< ui >}}Save{{< /ui >}} をクリックします。

## 宛先を削除する{#delete-a-destination}
1. [Log Forwarding][4] に移動します。
2. 既存のすべての宛先の一覧を表示するには、{{< ui >}}Custom Destinations{{< /ui >}} を選択します。
3. 削除する宛先の {{< ui >}}Delete{{< /ui >}} ボタンをクリックし、{{< ui >}}Confirm{{< /ui >}} をクリックします。これにより、構成済みの宛先リストから宛先が削除され、ログはその宛先に転送されなくなります。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/pipelines/
[2]: /ja/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /ja/logs/explorer/search_syntax/
[6]: /ja/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /ja/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /ja/logs/log_configuration/forwarding_custom_destinations#delete-a-destination
[9]: /ja/security/events_forwarding/