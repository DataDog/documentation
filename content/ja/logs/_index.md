---
title: ログ管理
kind: Documentation
description: Datadog Agent を設定して、ホスト、コンテナー、およびサービスからログを収集します。
aliases:
  - /ja/guides/logs/
  - /ja/agent/logs/
further_reading:
  - link: logs/log_collection
    tag: Documentation
    text: Datadog Agent を設定して、ホスト、コンテナ、およびサービスからログを収集します。
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer/
    tag: Documentation
    text: すべてのログを検索し、ログ分析を実行します。
  - link: 'https://learn.datadoghq.com/course/view.php?id=5'
    tag: ラーニング センター
    text: Datadog でのログ収集
---
ログ管理ソリューションはオールインワンの包括的なソリューションで、[アプリケーション][7]とインフラストラクチャーで生成されたすべてのログに対して、[収集][1]、[処理][2]、ライブでの監視、[調査][3]、[グラフ作成][4]、[ダッシュボードへの表示][5]、[アラート設定][6]、およびアーカイブを行います。

{{< vimeo 243374392 >}}

## ログの収集

[Datadog Agent][8] を使用して、ホストまたはコンテナ化された環境からログを直接収集します。Datadog の [AWS Lambda 関数](#from-aws-services)を使用して AWS サービスのログを収集できます。ログシッパーデーモンを既に使用している場合は、[Rsyslog][9]、[Syslog-ng][10]、[NXlog][11]、[FluentD][12]、および [Logstash][13] のドキュメントを参照してください。

インテグレーションとログの収集は相互に関連しています。インテグレーションのデフォルト構成ファイルを使用して、Datadog でその[処理][2]、[パース][14]、[ファセット][15]を有効にできます。

<div class="alert alert-warning">
現在利用可能なサポート済みインテグレーションのリストは、<a href="/integrations/#cat-log-collection">こちら</a>から確認できます。
</div>

以下の場所からログを収集できます。

### ホスト

[Datadog Agent のインストール手順][8] に従って、メトリクスとトレースとともにログの転送を開始します。
Agent では、[ログファイルの監視][16]や [UDP/TCP で送信されたログの待機][17]ができます。ユーザーは、[ログの絞り込み][18]、[機密データのスクラビング][19]、[複数行に渡るログ][20]の集約を行うように Agent を設定することができます。

### Docker 環境

Datadog Agent では、ロギングドライバーを使用することなく、[コンテナの stdout/stderr からログを直接収集][21]できます。Agent の Docker チェックが有効にされていると、コンテナとオーケストレーターのメタデータがタグとしてログに自動的に追加されます。

ログは、すべてのコンテナから、またはコンテナイメージ、ラベル、名前で絞り込まれた一部のコンテナから収集できます。また、オートディスカバリーを使用して、コンテナラベルでログの収集を直接設定することもできます。

Kubernetes 環境では [daemonSet][22] も活用できます。

### AWS サービス

Datadog Agent を使用して、ECS または EC2 インスタンス、およびそれらで実行されているアプリケーションからログを直接収集できます。

ただし、AWS サービスのログは、Datadog の [Lambda 関数][23]を使用して収集されます。次に、S3 バケット、CloudWatch Logs グループ、CloudWatch Events からログを転送するためのトリガーを[手動でまたは自動で][24]定義します。

### カスタムフォワーダー

カスタム処理または[ロギングライブラリ][7]は、**TCP** を通してログを転送できるものであれば Datadog ログと併用できます。安全な TCP エンドポイントは `intake.logs.datadoghq.com:10516` (安全でない接続の場合はポート `10514`) です。

ログエントリの先頭には [Datadog API キー][25]を付加する必要があります。たとえば、以下のように指定します。

```
<DATADOG_API_KEY> this is my log
```

Telnet を使用して手動でテストします。

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> Log sent directly via TCP
```

[Live Tail ページ][26]に、以下のような結果が表示されます。

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

Datadog では、JSON 形式のメッセージの属性は自動的に解析されます。

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:100%;">}}


### Datadog ログのエンドポイント

Datadog では、SSL で暗号化された接続と暗号化されていない接続の両方にログのエンドポイントが提供されます。
可能な場合は常に、暗号化されたエンドポイントを使用してください。Datadog Agent では、暗号化されたエンドポイントを使用して、ログが Datadog に送信されます。詳細は、[Datadog のセキュリティに関するドキュメント][27]で確認できます。

Datadog へのログの送信に使用できるエンドポイントは以下のとおりです。

{{< tabs >}}
{{% tab "US Site" %}}


| SSL で暗号化された接続のエンドポイント | ポート    | 説明                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | SSL で暗号化された TCP 接続を介して Agent が protobuf 形式のログを送信する際に使用されます。                                                                                     |
| `intake.logs.datadoghq.com`             | `10516` |  SSL で暗号化された TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |
| `functions-intake.logs.datadoghq.com`   | `10516` | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |


| 暗号化されていない接続のエンドポイント | ポート    | 説明                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | 暗号化されていない TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。 |

{{% /tab %}}
{{% tab "EU Site" %}}

| SSL で暗号化された接続のエンドポイント | ポート  | 説明                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | SSL で暗号化された TCP 接続を介して Agent が protobuf 形式のログを送信する際に使用されます。                                                                                     |
| `tcp-intake.logs.datadoghq.eu`          | `443` | SSL で暗号化された TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |
| `functions-intake.logs.datadoghq.eu`    | `443` | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |


| 暗号化されていない接続のエンドポイント | ポート   | 説明                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | 暗号化されていない TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。 |


{{% /tab %}}
{{< /tabs >}}

HTTPS を介してログを送信する方法については、[Datadog Logs HTTP API に関するドキュメント][28]を参照してください。

### 予約済み属性

以下に、プロジェクトの設定時に注意を必要とする重要な属性の一部を示します。

| 属性 | 説明                                                                                                                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | メトリクスで定義された送信元ホストの名前。Datadog で一致したホストから、対応するホストタグが自動的に取得され、ログに適用されます。Agent では、この値が自動的に設定されます。                      |
| `source`  | これは、インテグレーション名 (ログの生成元) に対応します。インテグレーション名と一致する場合、対応するパーサーとファセットが自動的にインストールされます。たとえば、`nginx`、`postgresql` などです。 |
| `status` | これは、ログのレベル/セキュリティに対応します。[パターン][29] の定義に使用され、Datadog Logs UI に専用のレイアウトがあります。|
| `service` | ログイベントを生成するアプリケーションまたはサービスの名前。Logs から API への切り替えに使用されます。このため、両方の製品を使用する際には必ず同じ値を定義してください。                                                            |
| `message` | デフォルトでは、`message` 属性の値はログエントリの本文として収集されます。Logstream では、この値はハイライトされて表示され、全文検索用にインデックス化されます。                                |

ログは収集され、[Log Explorer][3] ビューに集められます。ログは、検索したり、発展させたり、内容に基づいてアラートを表示したりすることもできます。

{{< img src="logs/log_explorer_view.png" alt="Log Explorer view" responsive="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection
[2]: /ja/logs/processing
[3]: /ja/logs/explore
[4]: /ja/logs/explorer/analytics
[5]: /ja/graphing/widgets/timeseries
[6]: /ja/monitors/monitor_types/log
[7]: /ja/logs/log_collection/?tab=tailexistingfiles#how-to-get-the-most-of-your-application-logs
[8]: /ja/logs/log_collection/#getting-started-with-the-agent
[9]: /ja/integrations/rsyslog
[10]: /ja/integrations/syslog_ng
[11]: /ja/integrations/nxlog
[12]: /ja/integrations/fluentd/#log-collection
[13]: /ja/integrations/logstash/#log-collection
[14]: /ja/logs/processing/parsing
[15]: /ja/logs/explorer/?tab=facets#setup
[16]: /ja/logs/log_collection/#tail-existing-files
[17]: /ja/logs/log_collection/#stream-logs-through-tcp-udp
[18]: /ja/logs/log_collection/#filter-logs
[19]: /ja/logs/log_collection/#scrub-sensitive-data-in-your-logs
[20]: /ja/logs/log_collection/#multi-line-aggregation
[21]: /ja/agent/docker/log
[22]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[23]: /ja/integrations/amazon_web_services/#log-collection
[24]: /ja/integrations/amazon_web_services/#enable-logging-for-your-aws-service
[25]: https://app.datadoghq.com/account/settings#api
[26]: https://app.datadoghq.com/logs/livetail
[27]: /ja/security/logs/#information-security
[28]: /ja/api/?lang=bash#send-logs-over-http
[29]: /ja/logs/explorer/patterns