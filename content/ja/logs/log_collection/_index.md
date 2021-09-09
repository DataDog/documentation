---
title: ログの収集とインテグレーション
kind: Documentation
description: Datadog Agent を設定して、ホスト、コンテナ、およびサービスからログを収集します。
aliases:
  - /ja/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /ja/logs/languages
  - /ja/integrations/windows_event_log/
further_reading:
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
    text: ログの調査方法
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Logging Without Limits*
---
## 概要

以下のコンフィギュレーションオプションを選択して、ログの取り込みを開始します。すでに log-shipper デーモンを使用している場合は、[Rsyslog][1]、[Syslog-ng][2]、[NXlog][3]、[FluentD][4]、または [Logstash][5] の専用ドキュメントを参照してください。

ログを Datadog に直接送信する場合は、[使用可能な Datadog ログ収集エンドポイントのリスト](#logging-endpoints)を参照してください。

**注**: ログを JSON 形式で Datadog に送信する場合は、Datadog 内にある特定の予約属性を使用します。詳細については、[予約属性セクション](#attributes-and-tags)をご覧ください。

## セットアップ

{{< tabs >}}
{{% tab "Host" %}}

[Datadog Agent のインストール手順][1] に従って、メトリクスとトレースとともにログの転送を開始します。Agent では、[ログファイルの監視][2]や [UDP/TCP で送信されたログの待機][2]ができます。ユーザーは、[ログの絞り込み][3]、[機密データのスクラビング][3]、[複数行に渡るログ][4]の集約を行うように Agent を設定することができます。


[1]: /ja/agent/logs/
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/logs/advanced_log_collection/#filter-logs
[4]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}

{{% tab "アプリケーション" %}}

[ログ収集を有効][1]にしたら、ログ生成に使用されるアプリケーション言語を設定します。

{{< partial name="logs/logs-languages.html" >}}

**注**: JSON 形式のログは、複数行のアプリケーションログの処理に役立ちます。JSON 形式のログは Datadog によって自動的にパースされます。Datadog に送信するログ形式を制御できる場合は、カスタムパースルールが不要になるように、ログを JSON として形式化することをお勧めします。


[1]: /ja/agent/logs/
{{% /tab %}}

{{% tab "コンテナ" %}}

Datadog Agent では、ログドライバーを使用せずに[コンテナ stdout/stderr から直接ログを収集][1]できます。Agent の Docker チェックを有効にすると、コンテナとオーケストレーターのメタデータがログにタグとして自動的に追加されます。
全てのコンテナから、または[コンテナのイメージ、ラベル、名前によってフィルタリングしたサブセットのみ][2]からログを収集することができます。また、オートディスカバリーを使用して、[コンテナラベルでログ収集を直接設定][3]することもできます。Kubernetes 環境では、[デーモンセットのインストール][4]も活用できます。

以下から環境を選択して、専用のログ収集手順を確認してください。

{{< partial name="logs/logs-containers.html" >}}


[1]: /ja/agent/docker/log/
[2]: /ja/agent/guide/autodiscovery-management/
[3]: /ja/agent/kubernetes/integrations/
[4]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "サーバーレス" %}}

Datadog で、AWS Lambda からログを収集できます。これを有効にするには、[サーバーレスモニタリングのドキュメント][1]を参照してください。


[1]: /ja/serverless/forwarder
{{% /tab %}}

{{% tab "クラウド/インテグレーション" %}}

以下からクラウドプロバイダーを選択すると、ログを自動的に収集して Datadog に転送する方法を確認できます。

{{< partial name="logs/logs-cloud.html" >}}

Datadog のインテグレーションとログ収集は連携しています。インテグレーションのデフォルト構成ファイルを使用すると、Datadog で専用の[プロセッサー][1]、[パース][2]、および[ファセット][3]を有効にできます。

[利用可能なサポートされているインテグレーションのリスト][4]を参照してください。


[1]: /ja/logs/log_configuration/processors
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/logs/explorer/facets/
[4]: /ja/integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## 追加のコンフィギュレーションオプション

### ログのエンドポイント

Datadog では、SSL で暗号化された接続と暗号化されていない接続の両方にログのエンドポイントが提供されます。可能な場合は常に、暗号化されたエンドポイントを使用してください。Datadog Agent では、暗号化されたエンドポイントを使用して、ログが Datadog に送信されます。詳細は、[Datadog のセキュリティに関するドキュメント][6]で確認できます。

SSL で暗号化された接続において、Datadog へのログの送信に使用できるエンドポイントは以下のとおりです。


`{{< region-param key="tcp_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="tcp_endpoint_port_ssl" code="true" >}}` <br>
SSL で暗号化された TCP 接続を介して protobuf 形式のログを送信するために Agent が使用。

`{{< region-param key="agent_http_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="agent_http_port" code="true" >}}`<br>
HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[HTTP 経由のログ送信方法ドキュメント][7]参照。

`{{< region-param key="http_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="http_port" code="true" >}}`<br>
HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[HTTP 経由のログ送信方法ドキュメント][7]参照。

`{{< region-param key="web_integrations_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="web_integrations_port" code="true" >}}`<br>
SSL で暗号化された TCP 接続を介して生ログ、Syslog、または JSON 形式のログを送信するためにカスタムフォワーダーが使用。

`{{< region-param key="lambda_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="lambda_port" code="true" >}}`<br>
SSL で暗号化された TCP 接続を介して生ログ、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。

`{{< region-param key="lambda_http_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="lambda_http_port" code="true" >}}`<br>
HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。

`{{< region-param key="functions_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="functions_port" code="true" >}}`<br>
SSL で暗号化された TCP 接続を介して生ログ、Syslog、または JSON 形式のログを送信するために Azure 関数が使用。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。

暗号化されていない接続において、Datadog へのログの送信に使用できるエンドポイントは以下のとおりです。

`{{< region-param key="web_integrations_endpoint" code="true" >}}`
: **ポート**: `{{< region-param key="web_integrations_unencrypted_port" code="true" >}}`<br>
暗号化されていない TCP 接続を介して生ログ、Syslog、または JSON 形式のログを送信するためにカスタムフォワーダーが使用。

### カスタムログ転送

**TCP** または **HTTP** 経由でログを転送できるカスタムプロセスまたはロギングライブラリを、Datadog ログと共に使用​​できます。

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP 経由で Datadog プラットフォームにログを送信できます。開始するには、[Datadog ログ HTTP API ドキュメント][1]を参照してください。


[1]: /ja/api/v1/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

セキュリティ保護された TCP エンドポイントは `intake.logs.datadoghq.com 10516` (セキュリティ保護されていない接続の場合はポート `10514`) です。

ログエントリの前に必ず [Datadog API キー][1]を付けます。例:

```text
<DATADOG_API_キー><ペイロード>
```

**注**: `<ペイロード>`には未加工、Syslog、または JSON 形式を使用できます。

Telnet を使用して手動でテストします。未加工形式の`<ペイロード>`の例:

```text
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_キー> TCP 経由で直接送信されるログ
```

これにより、[ライブ追跡ページ][2]に次の結果が生成されます。

{{< img src="logs/custom_log_telnet.png" alt="カスタム telnet" style="width:70%;">}}

`<ペイロード>`が JSON 形式である場合、Datadog はその属性を自動的にパースします:

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_キー> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="カスタム telnet" style="width:100%;">}}


{{< /site-region >}}

{{< site-region region="eu" >}}

セキュリティ保護された TCP エンドポイントは `tcp-intake.logs.datadoghq.eu 443` (セキュリティ保護されていない接続の場合はポート `1883`) です。

ログエントリの前に必ず [Datadog API キー][1]を付けます。例:

```text
<DATADOG_API_キー><ペイロード>
```

**注**: `<ペイロード>`には未加工、Syslog、または JSON 形式を使用できます。

Telnet を使用して手動でテストします。未加工形式の`<ペイロード>`の例:

```text
telnet tcp-intake.logs.datadoghq.eu 443
<DATADOG_API_KEY> Log sent directly via TCP
```

これにより、[ライブ追跡ページ][2]に次の結果が生成されます。

{{< img src="logs/custom_log_telnet.png" alt="カスタム telnet" style="width:70%;">}}

`<ペイロード>`が JSON 形式である場合、Datadog はその属性を自動的にパースします:

```text
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_キー> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="カスタム telnet" style="width:100%;">}}

{{< /site-region >}}

{{< site-region region="us3,gov" >}}
TCP エンドポイントはこのリージョンでサポートされていません。
{{< /site-region >}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**注**:

* 最適な利用のために、Datadog ではログイベントのサイズが 25KB を超えないようにすることをお勧めしています。Datadog Agent を使用する場合、 256KB を超えるログイベントは、いくつかのエントリに分割されます。Datadog TCP または HTTP API を直接使用する場合、許容可能なログイベントは最大 1MB までとなります。
* 1 つのログイベントが持つことができるタグは 100 個以下です。1 日あたり最大 1,000 万個の一意のタグに対して、各タグは 256 文字を超えてはなりません。
* JSON 形式に変換されたログイベントが保持できる属性は 256 未満です。これらの各属性のキーは 50 文字未満、連続するネストのレベルは 10 未満、 それぞれの値は (ファセットに昇格した場合) 1024 文字未満となります。
* ログイベントは過去 18 時間、未来の 2 時間まで送信が可能です。

上の制限に準拠しないログイベントは、システムによって変換されるか、切り詰められます。または、所定のタイムレンジ外の場合はインデックス化されません。ただし、Datadog はユーザーデータを可能な限り維持するよう全力を尽くします。

### 属性とタグ

属性は、ログエクスプローラーでのフィルタリングと検索に使用される[ログファセット][8]を規定します。予約済み属性および標準属性のリストと、ログ属性とエイリアス設定を使用した命名規則のサポート方法については、専用の[属性とエイリアス設定][9]ドキュメントをご参照ください。

#### スタックトレースの属性

スタックトレースをログに記録するに当たっては、Datadog アプリケーション内に専用の UI 表示を持つ特別な属性があります。ロガー名、現在のスレッド、エラーの種類、スタックトレース自体などです。

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="スタックトレース" >}}

この機能を使用するには、以下の属性名を使用します。

| 属性            | 説明                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | ロガーの名前                                               |
| `logger.thread_name` | 現在のスレッドの名前                                       |
| `error.stack`        | 実際のスタックトレース                                               |
| `error.message`      | スタックトレースに含まれるエラーメッセージ                       |
| `error.kind`         | エラーのタイプ ("kind") ("Exception"、"OSError" など) |

**注**: インテグレーションパイプラインは、デフォルトのログライブラリパラメーターをこれらの属性に再マップし、スタックトレースをパースまたはトレースバックして、自動的に `error.message` と `error.kind` を抽出しようとします。

詳しくは、[ソースコードと属性ドキュメント][10]をご覧ください。

## 次のステップ

ログが収集されて取り込まれると、**ログエクスプローラー**で利用できるようになります。ログエクスプローラーでは、ログのアラートを検索、強化、表示できます。[ログエクスプローラー][11]のドキュメントを参照してログデータの分析を開始するか、以下の追加のログ管理ドキュメントを参照してください。

{{< img src="logs/log_explorer_view.png" alt="Log Explorer ビュー" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/integrations/rsyslog/
[2]: /ja/integrations/syslog_ng/
[3]: /ja/integrations/nxlog/
[4]: /ja/integrations/fluentd/#log-collection
[5]: /ja/integrations/logstash/#log-collection
[6]: /ja/security/logs/#information-security
[7]: /ja/agent/logs/#send-logs-over-https
[8]: /ja/logs/explorer/facets/
[9]: /ja/logs/log_configuration/attributes_naming_convention
[10]: /ja/logs/log_configuration/attributes_naming_convention/#source-code
[11]: /ja/logs/explore/