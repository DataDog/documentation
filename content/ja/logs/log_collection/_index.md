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
description: ホスト、コンテナ、サービスからログを収集できるように環境を構成します。
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Logrotate を使用してログファイルを管理する方法
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: ログ収集の高度な設定
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法について
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/live_tail/
  tag: Documentation
  text: Datadog Live Tail 機能
- link: /logs/explorer/
  tag: Documentation
  text: ログの探索方法
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging Without Limits*
title: ログ収集とインテグレーション
---
## 概要

ログの取り込みを開始するには、下記の構成オプションを選択してください。すでに logshipper デーモンを使用している場合は、[Rsyslog][1]、[Syslogng][2]、[NXlog][3]、[FluentD][4]、または [Logstash][5] の専用ドキュメントを参照してください。

ログを Datadog に直接送信する場合は、[使用可能な Datadog ログ収集エンドポイントのリスト](#loggingendpoints)を参照してください。

**注**: Datadog に JSON 形式でログを送信する場合、Datadog 内で特定の意味を持つ予約済み属性のセットがあります。詳細については、[予約済み属性セクション](#attributesandtags)を参照してください。

## セットアップ

{{< tabs >}}
{{% tab "ホスト" %}}

1. [Datadog Agent][1] をインストールします。
2. ログ収集を有効にするには、Agent のメイン構成ファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。詳細情報と例については、[ホスト Agent ログ収集のドキュメント][5]を参照してください。
3. Datadog Agent を有効にしたら、[ログファイルのテールまたは UDP/TCP 経由で送信されるログのリスニング][2]、[ログの除外フィルタリングまたは機密データのスクラビング][3]、および[複数行ログの集約][4]をするように構成できます。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/#customlogcollection
[3]: /ja/agent/logs/advanced_log_collection/#filterlogs
[4]: /ja/agent/logs/advanced_log_collection/#multilineaggregation
[5]: /ja/agent/logs/
{{% /tab %}}

{{% tab "アプリケーション" %}}

1. [Datadog Agent][1] をインストールします。
2. ログ収集を有効にするには、Agent のメイン構成ファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。詳細情報と例については、[ホスト Agent ログ収集のドキュメント][2]を参照してください。
3. アプリケーション言語のインストール手順に従い、ロガーを構成し、ログの生成を開始します。

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/
{{% /tab %}}

{{% tab "コンテナ" %}}

コンテナまたはオーケストレーターのプロバイダーを選択し、それ用のログ収集手順に従います。

{{< partial name="logs/logs-containers.html" >}}

**注**:

 Datadog Agent は、ログドライバーを使用せずに[コンテナの stdout/stderr から直接ログを収集][1]できます。Agent の Docker チェックが有効になっていると、コンテナおよびオーケストレーターのメタデータが自動的にログのタグとして追加されます。

すべてのコンテナからログを収集することも、[コンテナイメージ、ラベル、または名前でフィルタリングされたサブセットのみ][2]を収集することも可能です。

Autodiscovery を使用して、[コンテナラベルで直接ログ収集するように構成する][3]こともできます。

Kubernetes 環境では [daemonset インストール][4]も活用できます。

[1]: /ja/agent/docker/log/
[2]: /ja/agent/guide/autodiscoverymanagement/
[3]: /ja/agent/kubernetes/integrations/
[4]: /ja/agent/basic_agent_usage/kubernetes/#logcollectionsetup
{{% /tab %}}

{{% tab "Serverless" %}}

Datadog にログを送信する AWS Lambda 関数である Datadog Forwarder を使用してください。AWS サーバーレス環境でのログ収集を有効にするには、[Datadog Forwarder ドキュメント][1]を参照してください。

[1]: /ja/serverless/forwarder
{{% /tab %}}

{{% tab "クラウド/インテグレーション" %}}

下記からクラウドプロバイダーを選択して、ログを自動的に収集して Datadog に転送する方法を確認します。

{{< partial name="logs/logs-cloud.html" >}}

Datadog のインテグレーションとログ収集は密接に関連しています。インテグレーションのデフォルト構成ファイルを使用して、Datadog で専用の[プロセッサ][1]、[パース][2]、および[ファセット][3]を有効にできます。インテグレーションでのログ収集を開始するには、次のようにします。

1. [インテグレーションページ][6]からインテグレーションを選択し、セットアップの指示に従います。
2. インテグレーションが提供するログ収集の手順に従います。このセクションでは、そのインテグレーションの `conf.yaml` ファイルにあるログセクションのコメントを外し、環境に合わせて構成する方法について説明します。

## データ転送料金の削減

Datadog の [Cloud Network Monitoring][7] を使用して、組織の最高スループットアプリケーションを特定します。公共のインターネットを回避し、データ転送料金を削減するために、サポートされている非公開接続を介して Datadog に接続し、データを非公開ネットワーク経由で送信します。非公開リンクに切り替えた後、Datadog の [Cloud Cost Management][8] ツールを使用して影響を確認し、クラウドコストの削減をモニターします。

詳細については、[データ転送料金を削減しながら Datadog にログを送信する方法][9]をご覧ください。

[1]: /ja/logs/log_configuration/processors
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/logs/explorer/facets/
[4]: /ja/agent/kubernetes/log/#autodiscovery
[5]: /ja/agent/docker/log/#logintegrations
[6]: /ja/integrations/#catlogcollection
[7]: /ja/network_monitoring/cloud_network_monitoring/
[8]: /ja/cloud_cost_management/
[9]: /ja/logs/guide/reduce_data_transfer_fees/


{{% /tab %}}

{{% tab "Agent チェック" %}}

カスタム Agent インテグレーションを開発している場合は、`send_log` メソッドを使用してAgent チェック内からプログラム的にログを送信できます。こうすることで、カスタムインテグレーションが、メトリクス、イベント、およびサービスチェックとともにログを出力できるようになります。

カスタム Agent チェックからログを送信する方法については、[Agent インテグレーションのログ収集][15]を参照してください。

[15]: /ja/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## その他の構成オプション

### ログエンドポイント

Datadog は、SSL 暗号化接続と非暗号化接続の両方のためのログエンドポイントを提供します。可能な限り暗号化されたエンドポイントを使用してください。Datadog Agent は、Datadog にログを送信するために暗号化されたエンドポイントを使用します。詳細については、[Datadog セキュリティのドキュメント][6]を参照してください。

#### サポートされるエンドポイント

ページの右側にある[サイト][13]セレクターのドロップダウンを使用して、Datadog サイトごとにサポートされているエンドポイントを確認できます。

| サイト | タイプ | エンドポイント | ポート | 説明 |
||||||
|{{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[ログ HTTP API ドキュメント][16]を参照してください。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Agent が HTTPS 経由で JSON 形式のログを送信するために使用します。[ホスト Agent ログ収集のドキュメント][17]を参照してください。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Lambda 関数が HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために使用します。|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>ログ。{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Browser SDK が HTTPS 経由で JSON 形式のログを送信するために使用します。|

### カスタムのログ転送

**HTTP** でログを転送できるカスタムプロセスまたはロギングライブラリを、Datadog ログと併用できます。

HTTP 経由で Datadog プラットフォームにログを送信できます。まず、[Datadog ログ HTTP API ドキュメント][15]を参照してください。

**注**:

* HTTPS API は最大 1MB のサイズのログをサポートしています。ただし、最適なパフォーマンスのために、個々のログは 25K バイトを超えないことを推奨します。Datadog Agent を使用してログを記録する場合、900kB (900000 バイト) でログを分割するように設定されています。
* 1 つのログイベントに付けられるタグは 100 個以下にしてください。1 日あたり最大 1,000 万個の一意のタグを使えるように、各タグは 256 文字にしてください。
* JSON 形式に変換されたログイベントに含まれる属性は、256 未満になるようにしてください。これらの各属性のキーは 50 文字未満、ネストは連続 20 レベル未満にしてください。ファセットに昇格した場合、それぞれの値は 1024 文字未満にしてください。
* ログイベントは、過去 18 時間までの[タイムスタンプ][14]を付けて送信できます。

<div class="alert alert-info">
<b>プレビューが利用可能</b>: 現在の 18 時間の制限を超えて、過去 7 日間のログを送信できます。<a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">プレビューに登録する</a>。
</div>

これらの制限を守らないログイベントは、システムによって変換または切り捨てられる場合があります。指定されている時間範囲外の場合はインデックス化されない可能性があります。しかし、Datadog は可能な限り多くのユーザーデータを保持しようとします。

インデックス化されたログにのみ適用されるフィールドの切り捨てがさらにあります。メッセージフィールドは 75 KiB に、非メッセージフィールドは 25 KiB に切り捨てられます。Datadog は依然として全文を保存しており、ログエクスプローラーの通常のリストクエリでは表示されます。ただし、切り捨てられたバージョンは、切り捨てられたフィールドでログをグループ化するとき、またはその特定のフィールドを表示する同様の操作を実行するときなど、グループ化されたクエリを実行するときに表示されます。

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| サイト | タイプ        | エンドポイント                                                                  | ポート         | 説明                                                                                                                                                                 |
||||||
| 米国   | TCP         | `agentintake.logs.datadoghq.com`                                         | 10514 | Agent が TLS なしでログを送信するために使用します。
| 米国   | TCP および TLS | `agentintake.logs.datadoghq.com`                                         | 10516 | Agent が TLS を使用してログを送信するために使用します。
| 米国   | TCP および TLS | `intake.logs.datadoghq.com`                                               | 443   | カスタムフォワーダーが、SSL 暗号化された TCP 接続を介して、未加工、Syslog、または JSON 形式でログを送信するために使用します。                                                                |
| 米国   | TCP および TLS | `functionsintake.logs.datadoghq.com`                                     | 443   | Azure 関数が、SSL 暗号化された TCP 接続を介して、未加工、Syslog、または JSON 形式でログを送信するために使用します。**注**: このエンドポイントは他のクラウドプロバイダーでも役立つ可能性があります。|
| 米国   | TCP およびT LS | `lambdaintake.logs.datadoghq.com`                                        | 443   | Lambda 関数が、SSL 暗号化された TCP 接続を介して、未加工、Syslog、または JSON 形式でログを送信するために使用します。                                                                 |
| EU   | TCP および TLS | `agentintake.logs.datadoghq.eu`                                          | 443  | Agent が、SSL 暗号化された TCP 接続を介して、protobuf 形式でログを送信するために使用します。                                                                                    |
| EU   | TCP および TLS | `functionsintake.logs.datadoghq.eu`                                      | 443  | Azure 関数が、SSL 暗号化された TCP 接続を介して、未加工、Syslog、または JSON 形式でログを送信するために使用します。**注**: このエンドポイントは他のクラウドプロバイダーでも役立つ可能性があります。|
| EU   | TCP および TLS | `lambdaintake.logs.datadoghq.eu`                                         | 443  | Lambda 関数が、SSL 暗号化された TCP 接続を介して、未加工、Syslog、または JSON 形式でログを送信するために使用します。                                                                 |

{{% /collapse-content %}}

### 属性とタグ

属性は、ログエクスプローラーのフィルタリングと検索に使用される[ログファセット][9]を規定します。予約済み属性と標準属性のリストや、ログ属性とエイリアスの命名ルールをサポートする方法については、専用の[属性とエイリアス][10]のドキュメントを参照してください。

#### スタックトレースの属性

スタックトレースをログ記録している場合、Datadog アプリケーション内に専用の UI 表示を持つ特別な属性があります。ロガー名、現在のスレッド、エラーの種類、スタックトレース自体などです。

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="解析されたスタックトレースの属性" >}}

この機能を使用するには、下記の属性名を使用します。

| 属性            | 説明                                                             |
|||
| `logger.name`        | ロガーの名前                                                      |
| `logger.thread_name` | 現在のスレッドの名前                                              |
| `error.stack`        | 実際のスタックトレース                                                      |
| `error.message`      | スタックトレースに含まれるエラーメッセージ                              |
| `error.kind`         | エラーのタイプまたは「種類」(例:「Exception」や「OSError」) |

**注**: デフォルトでは、インテグレーション Pipelines は、デフォルトのログライブラリパラメーターをこれらの特定の属性に再マップし、スタックトレースまたはトレースバックをパースして、自動的に `error.message` と `error.kind` を抽出しようとします。

詳しくは、[ソースコード属性のドキュメント][11]をご覧ください。

## 次のステップ

ログが収集され、取り込まれると、**ログエクスプローラー**で参照できます。ログエクスプローラーで、ログの検索、情報の追加、ログに関するアラートの確認ができます。[ログエクスプローラー][12]のドキュメントを参照して、ログデータの分析を開始するか、下記の追加のログ管理ドキュメントを参照してください。

{{< img src="logs/explore.png" alt="ログエクスプローラーに表示されるログ" style="width:100%" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/integrations/rsyslog/
[2]: /ja/integrations/syslog_ng/
[3]: /ja/integrations/nxlog/
[4]: /ja/integrations/fluentd/#logcollection
[5]: /ja/integrations/logstash/#logcollection
[6]: /ja/data_security/logs/#informationsecurity
[7]: /ja/agent/logs/#sendlogsoverhttps
[8]: /ja/api/v1/logs/#sendlogs
[9]: /ja/logs/explorer/facets/
[10]: /ja/logs/log_configuration/attributes_naming_convention
[11]: /ja/logs/log_configuration/attributes_naming_convention/#sourcecode
[12]: /ja/logs/explore/
[13]: /ja/getting_started/site/
[14]: /ja/logs/log_configuration/pipelines/?tab=date#dateattribute
[15]: /ja/api/latest/logs/#sendlogs
[16]: /ja/api/latest/logs/#sendlogs
[17]: /ja/agent/logs/#sendlogsoverhttps