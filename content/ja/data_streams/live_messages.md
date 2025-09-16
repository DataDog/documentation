---
title: Live Messages
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Data Streams Monitoring は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="プレビューに参加しよう!">}}
Live Messages は Protobuf と Avro を使用する Java-Kafka サービス向けにプレビュー提供中です。他の言語やテクノロジーに関心がある場合は support@datadoghq.com に連絡してください。 
{{< /callout >}}

Live Messages は、特定のサービスが消費または生成するメッセージのライブ テールを表示できます。ライブ メッセージにアクセスして内容を確認することで、特定のサービスのトラブルシューティング時に問題の特定に役立ちます。

{{< img src="data_streams/live-messages.png" alt="サイド パネルを開いた Data Streams Monitoring。Live Messages のライブ テールを表示しています。" style="width:100%;" >}}

### セットアップ

1. 使用したいサービスで [Dynamic Instrumentation][1] を有効化します。

   <div class="alert alert-info">
   Dynamic Instrumentation requires <a href="/remote_configuration">Remote Configuration</a>.
   </div>
1. [Datadog Settings][2] で、次のロールを保持していることを確認します:
   - `Dynamic Instrumentation Read`
   - `Dynamic Instrumentation Write`

### Usage

1. Data Streams Monitoring マップに移動し、Dynamic Instrumentation が有効な Java サービスをクリックします。**Messages** タブを選択します。
   {{< img src="data_streams/dsm-messages-tab.png" alt="サービスのサイド パネルが開いた Data Streams Monitoring。再生ボタンが表示されています。" style="width:80%;" >}}
1. Live Messages のライブ テールをオンにするには、再生ボタンをクリックします。次に、取得するメッセージ数のおおよその値を指定し、**Start Capturing** をクリックします。メッセージはログとして生成され、ホスト 1 台あたり 1 秒に 1 メッセージのレートでサンプリングされます。
   {{< img src="data_streams/dsm-start-capturing.png" alt="Start Capturing Messages モーダル (ホスト 1 台あたり 1 秒に 1 メッセージのレートで、取得するメッセージ数を設定するフィールドがあります)。" style="width:80%;" >}}
1. 各メッセージをクリックすると、フィールドと値が表示されます。
   {{< img src="data_streams/dsm-details.png" alt="1 件のメッセージを選択した状態の Live Messages。" style="width:80%;" >}}

#### Live Messages のライブ テールをオフにする
{{< img src="data_streams/dsm-stop-capturing.png" alt="Stop Capturing Messages モーダル。" style="width:100%;" >}}

指定した概算のメッセージ数の取得が完了すると、ライブ テールは自動的にオフになります。**Stop Capturing** ボタンを選択して手動で停止することもできます。

### 追加の詳細

#### メッセージの保存とアクセス
メッセージはコンシューマーおよびプロデューサー内で Datadog によって取得されます。その後、[Sensitive Data Scanner][3] を通過したうえで、Datadog にログとして保存されます。

Live Messages 機能を使用するには、`Dynamic Instrumentation Capture Variables` と `Dynamic Instrumentation Read` のロールが必要です。組織内のすべてのユーザーがログを閲覧できます。ロール ベース アクセス制御 (RBAC) の詳細については、[Dynamic Instrumentation][4] を参照してください。

#### 機微情報のマスキング

Dynamic Instrumentation は、password や accessToken など、機微と見なされる特定の識別子に関連付けられた値を自動的にマスキングします。マスキング対象の識別子の[完全な一覧][5]を参照してください。

追加の識別子を指定することで、マスキングの範囲をさらに調整できます。アプリケーションの環境 (`datadog-agent` ではありません) で、環境変数 `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` に `firstName,lastName,phoneNumber` のような識別子のカンマ区切りリストを設定します。

機微データのスクラビングの詳細については、[Dynamic Instrumentation ドキュメント][6] を参照してください。機微データの取り扱いに関して追加の要件やリクエストがある場合は、[Datadog サポートに連絡][7]してください。

#### Kafka 上の SSL 暗号化
Datadog は、暗号化される前にクライアント (コンシューマー、プロデューサー) 内でメッセージを取得します。そのため、Kafka レイヤーで暗号化が有効かどうかに関係なく、Datadog はメッセージを取得できます。

[1]: /ja/dynamic_instrumentation/
[2]: https://app.datadoghq.com/personal-settings/profile
[3]: https://www.datadoghq.com/product/sensitive-data-scanner/
[4]: /ja/dynamic_instrumentation/#prerequisites
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[6]: /ja/dynamic_instrumentation/sensitive-data-scrubbing/
[7]: /ja/help