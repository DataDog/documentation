---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ja/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /ja/logs/languages
- /ja/integrations/windows_event_log/
description: ホスト、コンテナ、およびサービスからログを収集するように環境を設定します。
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Logrotate を使用してログファイルを管理する方法
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: 高度なログ収集設定
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法について
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/live_tail/
  tag: Documentation
  text: Datadog の Live Tail 機能
- link: /logs/explorer/
  tag: Documentation
  text: ログの探索方法について
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging Without Limits*
title: ログ収集とインテグレーション
---
## 概要 {#overview}

ログの取り込みを開始するには、下記の設定オプションのいずれかを選択します。すでに log-shipper デーモンを使用している場合は、[Rsyslog][1]、[Syslog-ng][2]、[NXlog][3]、[FluentD][4]、または [Logstash][5] の専用ドキュメントを参照してください。

ログを Datadog に直接送信する場合は、[利用可能な Datadog ログ収集エンドポイントのリスト](#logging-endpoints)を参照してください。

**注**: JSON 形式のログを Datadog に送信する場合、Datadog 内で特定の意味を持つ予約済み属性のセットがあります。詳細は、[予約済み属性セクション](#attributes-and-tags)を参照してください。

##セットアップ {#setup}

{{< tabs >}}
{{% tab "ホスト" %}}

1. [Datadog Agent][1] をインストールします。
2.ログ収集を有効にするには、Agent のメイン設定ファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。詳細と例については、[ホスト Agent のログ収集ドキュメント][5]を参照してください。
3.有効にすると、Datadog Agent で、[ログファイルのテールまたは UDP/TCP 経由で送信されるログのリスニング][2]、[ログのフィルタリングまたは機密データのスクラビング][3]、および [複数行ログの集計][4]を設定できるようになります。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/logs/advanced_log_collection/#filter-logs
[4]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /ja/agent/logs/
{{% /tab %}}

{{% tab "アプリケーション" %}}

1. [Datadog Agent][1] をインストールします。
2.ログ収集を有効にするには、Agent のメイン設定ファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。詳細や例については、[ホスト Agent のログ収集ドキュメント][2]を参照してください。
3.アプリケーション言語のインストール手順に従ってロガーを設定し、ログの生成を開始します。

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/
{{% /tab %}}

{{% tab "コンテナ" %}}

コンテナまたはオーケストレーターのプロバイダーを選択し、専用のログ収集手順に従います。

{{< partial name="logs/logs-containers.html" >}}

**注**:

- Datadog Agent は、ロギングドライバーを使用せずに[コンテナの stdout/stderr から直接ログを収集][1]できます。Agent の Docker チェックが有効な場合、コンテナとオーケストレーターのメタデータがタグとしてログに自動的に追加されます。

-すべてのコンテナからログを収集することも、[コンテナイメージ、ラベル、または名前でフィルタリングされたサブセットのみ][2]から収集することも可能です。

-Autodiscovery を使用して、[コンテナラベルで直接ログ収集を設定][3]することもできます。

-Kubernetes 環境では、[DaemonSet インストール][4] を活用することもできます。

[1]: /ja/agent/docker/log/
[2]: /ja/agent/guide/autodiscovery-management/
[3]: /ja/agent/kubernetes/integrations/
[4]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "サーバーレス" %}}

環境から Datadog へログを送信する AWS Lambda 関数である Datadog Forwarder を使用します。AWS サーバーレス環境でログ収集を有効にするには、[Datadog Forwarder のドキュメント][1]を参照してください。

[1]: /ja/serverless/forwarder
{{% /tab %}}

{{% tab "クラウド/インテグレーション" %}}

下記からクラウドプロバイダーを選択し、ログを自動的に収集して Datadog に転送する方法を確認してください。

{{< partial name="logs/logs-cloud.html" >}}

Datadog のインテグレーションとログ収集は連携しています。インテグレーションのデフォルト設定ファイルを使用して、Datadog で専用の[プロセッサー][1]、[パース][2]、[ファセット][3]を有効にできます。インテグレーションでログ収集を開始するには:

1. [インテグレーションページ][6]からインテグレーションを選択し、セットアップ手順に従います。
2.インテグレーションのログ収集手順に従います。このセクションでは、そのインテグレーションの `conf.yaml` ファイルにある logs セクションのコメントを解除し、環境に合わせて構成する方法について説明します。

##データ転送料金の削減 {#reduce-data-transfer-fees}

Datadog の [Cloud Network Monitoring][7] を使用して、組織内で特にスループットの高いアプリケーションを特定します。サポートされているプライベート接続を介して Datadog に接続し、プライベートネットワーク経由でデータを送信することで、パブリックインターネットを回避し、データ転送料金を削減します。プライベートリンクに切り替えた後、Datadog の [Cloud Cost Management][8] ツールを使用して影響を確認し、クラウドコストの削減をモニタリングします。

詳細については、[データ転送料金を削減しながら Datadog にログを送信する方法][9]を参照してください。

[1]: /ja/logs/log_configuration/processors
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/logs/explorer/facets/
[4]: /ja/agent/kubernetes/log/#autodiscovery
[5]: /ja/agent/docker/log/#log-integrations
[6]: /ja/integrations/#cat-log-collection
[7]: /ja/network_monitoring/cloud_network_monitoring/
[8]: /ja/cloud_cost_management/
[9]: /ja/logs/guide/reduce_data_transfer_fees/


{{% /tab %}}

{{% tab "Agent チェック" %}}

カスタム Agent インテグレーションを開発している場合は、`send_log` メソッドを使用して Agent チェック内からプログラムでログを送信できます。これにより、カスタムインテグレーションでメトリクス、イベント、サービスチェックと並行してログを出力できるようになります。

カスタム Agent チェックからログを送信する方法については、[Agent インテグレーションのログ収集][15]を参照してください。

[15]: /ja/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## 追加の設定オプション {#additional-configuration-options}

### ログエンドポイント {#logging-endpoints}

Datadog は、SSL 暗号化接続と非暗号化接続の両方のログエンドポイントを提供しています。可能な場合は、暗号化エンドポイントを使用してください。Datadog Agent は、暗号化エンドポイントを使用して Datadog にログを送信します。詳細については、[Datadog セキュリティドキュメント][6]を参照してください。

####サポートされるエンドポイント {#supported-endpoints}

ページ右側の[サイト][13] セレクタードロップダウンを使用して、Datadog サイトごとのサポートされるエンドポイントを確認してください。

|サイト | タイプ | エンドポイント | ポート | 説明 |
|------|-------|----------|------|-------------|
|{{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | カスタムフォワーダーが HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するために使用されます。[ログ HTTP API ドキュメント][16]を参照してください。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Agent が HTTPS 経由で JSON 形式のログを送信するために使用されます。[ホスト Agent のログ収集ドキュメント][17]を参照してください。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Lambda 関数が HTTPS 経由で raw、Syslog、または JSON 形式のログを送信するために使用されます。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>logs.{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Browser SDK が HTTPS 経由で JSON 形式のログを送信するために使用されます。|

### カスタムログ転送 {#custom-log-forwarding}

**HTTP** を介してログを転送できるカスタムプロセスやロギングライブラリは、Datadog Logs と組み合わせて使用できます。

HTTP 経由で Datadog プラットフォームにログを送信できます。開始するには、[Datadog ログ HTTP API ドキュメント][15]を参照してください。

**注**:

* HTTPS API は、最大 1MB のサイズのログをサポートします。ただし、最適なパフォーマンスを得るためには、個々のログを 25KB 以下にすることをお勧めします。ロギングに Datadog Agent を使用する場合、900kB (900,000 バイト) でログを分割するように設定されています。
*1 つのログイベントに付けられるタグは 100 個以下にしてください。1 日あたり最大 1,000 万個の一意のタグを使えるように、各タグは 256 文字を超えないようにしてください。
*JSON 形式に変換されたログイベントに含まれる属性は 256 個未満である必要があります。これらの各属性のキーは 50 文字未満、ネストは 20 レベル未満にする必要があります。また、ファセットとして登録する場合、それぞれの値は 1024 文字未満にする必要があります。
*ログイベントは、最大 18 時間前までの[タイムスタンプ][14]を付けて送信できます。

<div class="alert alert-info">
<b>プレビュー版を利用可能</b>: 現在の 18 時間の制限ではなく、過去 7 日間のログを送信できます。<a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">プレビューに登録</a>してください。
</div>

これらの制限に従わないログイベントは、システムによって変換または切り捨てられたり、指定された時間範囲外の場合はインデックスが作成されなかったりする可能性があります。ただし、Datadog は可能な限り多くのユーザーデータを保持するように努めます。

インデックス化されたログのみに適用される、フィールドの追加の切り捨てがあります。メッセージフィールドの値は 75 KiB に、メッセージ以外のフィールドの値は 25 KiB に切り捨てられます。Datadog は引き続きフルテキストを保存し、ログエクスプローラーの通常のリストクエリでは表示が維持されます。ただし、その切り捨てられたフィールドでログをグループ化する場合や、その特定のフィールドを表示する同様の操作を行う場合など、グループ化されたクエリを実行するときは、切り捨てられたバージョンが表示されます。

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| サイト | タイプ        | エンドポイント                                                                  | ポート         | 説明                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Agent が TLS なしでログを送信するために使用します。
|US   | TCP および TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Agent が TLS ありでログを送信するために使用します。
|US | TCP および TLS | `intake.logs.datadoghq.com`                                               | 443 | カスタムフォワーダーが、SSL 暗号化された TCP 接続を介して raw、Syslog、または JSON 形式でログを送信するために使用します。                                                                |
| US | TCP および TLS | `functions-intake.logs.datadoghq.com`                                     | 443 | Azure Functions が、SSL 暗号化された TCP 接続を介して raw、Syslog、または JSON 形式でログを送信するために使用します。**注**: このエンドポイントは、他のクラウドプロバイダーでも役立つ場合があります。|
| US | TCP および TLS | `lambda-intake.logs.datadoghq.com`                                        | 443 | Lambda 関数が、SSL 暗号化された TCP 接続を介して raw、Syslog、または JSON 形式でログを送信するために使用します。                                                                 |
| EU | TCP および TLS | `agent-intake.logs.datadoghq.eu`                                          | 443 | Agent が、SSL 暗号化された TCP 接続を介して protobuf 形式でログを送信するために使用します。                                                                                    |
| EU | TCP および TLS | `functions-intake.logs.datadoghq.eu`                                      | 443 | Azure Functions が、SSL 暗号化された TCP 接続を介して raw、Syslog、または JSON 形式でログを送信するために使用します。**注**: このエンドポイントは、他のクラウドプロバイダーでも役立つ場合があります。|
| EU | TCP および TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443 | Lambda 関数が、SSL 暗号化された TCP 接続を介して raw、Syslog、または JSON 形式でログを送信するために使用します。 |

{{% /collapse-content %}}

### 属性とタグ {#attributes-and-tags}

属性は[ログファセット][9]を規定します。これらはログエクスプローラーでのフィルタリングや検索に使用されます。予約済み属性および標準属性のリスト、およびログの属性とエイリアシングによる命名規則のサポート方法については、専用の[属性とエイリアシング][10]のドキュメントを参照してください。

####スタックトレースの属性 {#attributes-for-stack-traces}

スタックトレースをログに記録する場合、ロガー名、現在のスレッド、エラータイプ、スタックトレース自体など、Datadog アプリケーション内で専用の UI 表示が行われる特定の属性があります。

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="パースされたスタックトレースの属性" >}}

これらの機能を有効にするには、次の属性名を使用します。

| 属性            | 説明                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | ロガーの名前                                                      |
| `logger.thread_name` | 現在のスレッドの名前                                              |
| `error.stack`        | 実際のスタックトレース                                                      |
| `error.message`      | スタックトレースに含まれるエラーメッセージ                              |
| `error.kind`         | エラーのタイプまたは「種類」 (例: "Exception"、"OSError") |

**注**: デフォルトでは、インテグレーションパイプラインは、デフォルトのロギングライブラリパラメータをそれらの特定の属性にリマップし、スタックトレースまたはトレースバックをパースして `error.message` と `error.kind` を自動的に抽出しようとします。

詳細については、完全な[ソースコード属性のドキュメント][11]を参照してください。

##次のステップ {#next-steps}

ログが収集されて取り込まれると、**ログエクスプローラー**で利用可能になります。ログエクスプローラーでは、ログの検索、強化、アラートの表示ができます。ログデータの分析を開始するには[ログエクスプローラー][12]のドキュメントを参照してください。または、以下の追加のログ管理ドキュメントを参照してください。

{{< img src="logs/explore.png" alt="ログエクスプローラーに表示されるログ" style="width:100%" >}}

## その他の参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/integrations/rsyslog/
[2]: /ja/integrations/syslog_ng/
[3]: /ja/integrations/nxlog/
[4]: /ja/integrations/fluentd/#log-collection
[5]: /ja/integrations/logstash/#log-collection
[6]: /ja/data_security/logs/#information-security
[7]: /ja/agent/logs/#send-logs-over-https
[8]: /ja/api/v1/logs/#send-logs
[9]: /ja/logs/explorer/facets/
[10]: /ja/logs/log_configuration/attributes_naming_convention
[11]: /ja/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /ja/logs/explore/
[13]: /ja/getting_started/site/
[14]: /ja/logs/log_configuration/pipelines/?tab=date#date-attribute
[15]: /ja/api/latest/logs/#send-logs
[16]: /ja/api/latest/logs/#send-logs
[17]: /ja/agent/logs/#send-logs-over-https