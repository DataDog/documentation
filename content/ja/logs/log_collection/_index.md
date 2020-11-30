---
title: ログの収集とインテグレーション
kind: Documentation
description: Datadog Agent を設定して、ホスト、コンテナ、およびサービスからログを収集します。
aliases:
  - /ja/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /ja/logs/languages
  - /ja/integrations/windows_event_log/
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法について
  - link: /logs/processing/parsing/
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
[Datadog Agent のインストール手順][1]に従って、ログをメトリクスおよびトレースと共に転送します。Agent では、[ログファイルの追跡][2]や [UDP/TCP 経由で送信されたログの受信][2]ができます。ユーザーは、[ログの絞り込み][3]、[機密データのスクラビング][3]、[複数行に渡るログ][4]の集約を行うように Agent を構成することができます。最後に、以下のアプリケーション言語から選択して最良のログ方法を実現します。
既にログ転送デーモンを使用している場合は、[Rsyslog][5]、[Syslog-ng][6]、[NXlog][7]、[FluentD][8]、[Logstash][9] の専用ドキュメントを参照してください。

Datadog ログ管理には、ログを収集して Datadog に送信する一連のソリューションも付属しています。これらのソリューションは、追加設定なしで使用できます。

* [**ホストからログを収集**][2]。
* [**アプリケーションからログを収集**](?tab=ussite#アプリケーションのログ収集)。
* [**Docker 環境からログを収集**](?tab=ussite#コンテナのログ収集)。
* [**サーバーレス環境からログを収集**](?tab=ussite#サーバーレスのログ収集)。
* [**クラウドプロバイダーからログを収集**](?tab=ussite#クラウドプロバイダーのログ収集)。

Datadog のインテグレーションとログ収集は連携しています。インテグレーションのデフォルト構成ファイルを使用すると、Datadog で専用の[処理][10]、[パース][11]、および[ファセット][12]を有効にできます。

<div class="alert alert-warning">
現在利用可能なサポート済みインテグレーションのリストは、<a href="/integrations/#cat-log-collection">こちら</a>から確認できます。
</div>

ログを直接 Datadog に送信する場合は、このページの下部にある[使用可能な Datadog ログ収集エンドポイントのリスト](#datadog ログ収集エンドポイント) をご覧ください。

**注**: ログを JSON 形式で Datadog に送信する場合は、Datadog 内にある特定の予約属性を使用します。詳細については、[予約属性セクション](#予約属性) をご覧ください。

## アプリケーションログの収集

[ログ収集を有効][1]にしたら、ログ生成に使用されるアプリケーション言語を設定します。

{{< partial name="logs/logs-languages.html" >}}

## コンテナログの収集

Datadog Agent では、ログドライバーを使用せずに[コンテナ stdout/stderr から直接ログを収集][13]できます。Agent の Docker チェックを有効にすると、コンテナとオーケストレーターのメタデータがログにタグとして自動的に追加されます。
全てのコンテナから、または[コンテナのイメージ、ラベル、名前によってフィルタリングしたサブセットのみ][14]からログを収集することができます。また、オートディスカバリーを使用して、[コンテナラベルでログ収集を直接設定][15]することもできます。Kubernetes 環境では、[デーモンセットのインストール][16]も活用できます。

以下から環境を選択して、専用のログ収集手順を確認してください。

{{< partial name="logs/logs-containers.html" >}}

## サーバーレスログの収集

Datadog で、AWS Lambda からログを収集できます。これを有効にするには、[サーバーレスモニタリングのドキュメント][17]を参照してください。

## クラウドプロバイダーログの収集

以下からクラウドプロバイダーを選択すると、ログを自動的に収集して Datadog に転送する方法を確認できます。

{{< partial name="logs/logs-cloud.html" >}}

## カスタムログフォワーダー

**TCP** または **HTTP** 経由でログを転送できるカスタムプロセスまたは[ロギングライブラリ][18]を、Datadog ログと共に使用​​できます。

{{< tabs >}}
{{% tab "HTTP" %}}

{{< site-region region="us" >}}

パブリックエンドポイントは `http-intake.logs.datadoghq.com` です。API キーを以下の例のようにパスに、またはヘッダーとして追加する必要があります。

```bash
curl -X POST https://http-intake.logs.datadoghq.com/v1/input \
     -H "Content-Type: text/plain" \
     -H "DD-API-KEY: <API_キー>" \
     -d 'hello world'
```

JSON フォーマットの例や、リクエストごとに複数のログを作成する例、クエリパラメーターの使用例については、[Datadog ログ HTTP API ドキュメント][1]を参照してください。

[1]: /ja/api/v1/logs/#send-logs

{{< /site-region >}}
{{< site-region region="eu" >}}

パブリックエンドポイントは `http-intake.logs.datadoghq.eu` です。API キーを以下の例のようにパスに、またはヘッダーとして追加する必要があります。

```bash
curl -X POST https://http-intake.logs.datadoghq.eu/v1/input \
     -H "Content-Type: text/plain" \
     -H "DD-API-KEY: <API_キー>" \
     -d 'hello world'
```

JSON フォーマットの例や、リクエストごとに複数のログを作成する例、クエリパラメーターの使用例については、[Datadog ログ HTTP API ドキュメント][1]を参照してください。

[1]: /ja/api/v1/logs/#send-logs

{{< /site-region >}}
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

セキュリティ保護された TCP エンドポイントは `intake.logs.datadoghq.com:10516` (セキュリティ保護されていない接続の場合はポート `10514`) です。

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

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail

{{< /site-region >}}

{{< site-region region="eu" >}}

セキュリティ保護された TCP エンドポイントは `tcp-intake.logs.datadoghq.eu:443` (セキュリティ保護されていない接続の場合はポート `1883`) です。

ログエントリの前に必ず [Datadog API キー][1]を付けます。例:

```text
<DATADOG_API_キー><ペイロード>
```

**注**: `<ペイロード>`には未加工、Syslog、または JSON 形式を使用できます。

Telnet を使用して手動でテストします。未加工形式の`<ペイロード>`の例:

```text
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_キー> TCP 経由で直接送信されるログ
```

これにより、[ライブ追跡ページ][2]に次の結果が生成されます。

{{< img src="logs/custom_log_telnet.png" alt="カスタム telnet" style="width:70%;">}}

`<ペイロード>`が JSON 形式である場合、Datadog はその属性を自動的にパースします:

```text
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_キー> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="カスタム telnet" style="width:100%;">}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail

{{< /site-region >}}
{{% /tab %}}
{{< /tabs >}}

## Datadog ログのエンドポイント

Datadog では、SSL で暗号化された接続と暗号化されていない接続の両方にログのエンドポイントが提供されます。
可能な場合は常に、暗号化されたエンドポイントを使用してください。Datadog Agent では、暗号化されたエンドポイントを使用して、ログが Datadog に送信されます。詳細は、[Datadog のセキュリティに関するドキュメント][19]で確認できます。

{{< site-region region="us" >}}

Datadog US リージョンへのログの送信に使用できるエンドポイントは以下のとおりです。

| SSL で暗号化された接続のエンドポイント | ポート    | 説明                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | SSL で暗号化された TCP 接続を介して Agent が protobuf 形式のログを送信する際に使用されます。                                                                                     |
| `agent-http-intake.logs.datadoghq.com`  | `443`   | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[HTTP 経由のログ送信方法ドキュメント][1]参照。                                                        |
| `http-intake.logs.datadoghq.com`        | `443`   | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[HTTP 経由のログ送信方法ドキュメント][1]参照。                                       |
| `intake.logs.datadoghq.com`             | `10516` | SSL で暗号化された TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |
| `lambda-http-intake.logs.datadoghq.com` | `443`   | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                                                                            |
| `functions-intake.logs.datadoghq.com`   | `10516` | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |

| 暗号化されていない接続のエンドポイント | ポート    | 説明                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | 暗号化されていない TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。 |

[1]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="eu" >}}

Datadog EU リージョンへのログの送信に使用できるエンドポイントは以下のとおりです。

| SSL で暗号化された接続のエンドポイント | ポート  | 説明                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | SSL で暗号化された TCP 接続を介して Agent が protobuf 形式のログを送信する際に使用されます。                                                                                     |
| `agent-http-intake.logs.datadoghq.eu`   | `443` | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[Agent のログドキュメント][1]参照。                                                        |
| `http-intake.logs.datadoghq.eu`         | `443` | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Agent のログドキュメント][1]参照。                                       |
| `tcp-intake.logs.datadoghq.eu`          | `443` | SSL で暗号化された TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |
| `lambda-http-intake.logs.datadoghq.eu`  | `443` | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                                                                            |
| `functions-intake.logs.datadoghq.eu`    | `443` | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |

| 暗号化されていない接続のエンドポイント | ポート   | 説明                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | 暗号化されていない TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。 |

[1]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

## 予約済み属性

以下に、プロジェクトの設定時に注意を必要とする重要な属性の一部を示します。

| 属性 | 説明                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | メトリクスで定義された送信元ホストの名前。Datadog で一致したホストから、対応するホストタグが自動的に取得され、ログに適用されます。Agent では、この値が自動的に設定されます。                          |
| `source`  | これは、インテグレーション名 (ログの生成元) に対応します。インテグレーション名と一致する場合、対応するパーサーとファセットが自動的にインストールされます。たとえば、`nginx`、`postgresql` などです。 |
| `status`  | ログのレベル/重大度に対応します。[パターン][20]の定義に使用され、Datadog ログ UI 専用のレイアウトがあります。                                                                                                     |
| `service` | ログイベントを生成するアプリケーションまたはサービスの名前。Logs から APM への切り替えに使用されます。このため、両方の製品を使用する際には必ず同じ値を定義してください。                                                                |
| `message` | デフォルトでは、`message` 属性の値はログエントリの本文として収集されます。Logstream では、この値はハイライトされて表示され、全文検索用にインデックス化されます。                                    |

収集されたログは、[Log Explorer][21] ビューで集中管理されます。ログの検索や追加、またアラートの設定などが可能です。

{{< img src="logs/log_explorer_view.png" alt="Log Explorer ビュー" >}}

### 統合サービスタグ付け

Datadog では、タグ収集のベストプラクティスとして、統合サービスタグ付けを構成して Datadog テレメトリーを `env`、`service`、`version` の 3 つの標準タグと結合させることをおすすめしています。統合サービスタグ付けを構成する方法については、[統合サービスタグ付け][22]ドキュメントをご参照ください。

### アプリケーションログを最大限に活用する方法

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

### JSON によるアプリケーションログの送信

Datadog は、インテグレーションフレームワーク向けに JSON をログファイルに記録する方法のガイドラインを提供しています。JSON 形式のログは、複数行のアプリケーションログを処理するために便利で、Datadog によって自動的にパースされます。

#### JSON 形式のログを収集するメリット

Datadog は、JSON 形式のログを自動的にパースします。このため、Datadog に送信するログの形式を管理できる場合は、それらのログを JSON にすることをお勧めします。そうすると、カスタムパース規則を作成する必要がなくなります。

### 収集されたログイベントに適用される制限

* 最適な利用のために、Datadog ではログイベントのサイズが 25KB を超えないようにすることをお勧めしています。Datadog Agent を使用する場合、ログイベントは 256KB を超え、いくつかのエントリに分割されます。Datadog TCP または HTTP API を直接使用する場合、許容可能なログイベントは最大 1MB までとなります。
* ログイベントは過去 18 時間、未来の 2 時間まで送信が可能です。
* JSON 形式に変換されたログイベントが保持できる属性は 256 未満です。これらの各属性のキーは 50 文字未満、連続するネストのレベルは 10 未満、 それぞれの値は (ファセットに昇格した場合) 1024 文字未満となります。
* 1 つのログイベントが持つことができるタグは 100 個以下です。1 日あたり最大 1,000 万個の一意のタグに対して、各タグは 256 文字を超えてはなりません。

上の制限に準拠しないログイベントは、システムによって変換されるか、切り詰められます。または、所定のタイムレンジ外の場合はインデックス化されません。ただし、Datadog はユーザーデータを可能な限り維持するよう全力を尽くします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/agent/logs/
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/logs/advanced_log_collection/#filter-logs
[4]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /ja/integrations/rsyslog/
[6]: /ja/integrations/syslog_ng/
[7]: /ja/integrations/nxlog/
[8]: /ja/integrations/fluentd/#log-collection
[9]: /ja/integrations/logstash/#log-collection
[10]: /ja/logs/processing/
[11]: /ja/logs/processing/parsing/
[12]: /ja/logs/explorer/facets/
[13]: /ja/agent/docker/log/
[14]: /ja/agent/guide/autodiscovery-management/
[15]: /ja/agent/kubernetes/integrations/
[16]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[17]: /ja/serverless/forwarder
[18]: /ja/logs/log_collection/#how-to-get-the-most-of-your-application-logs
[19]: /ja/security/logs/#information-security
[20]: /ja/logs/explorer/patterns/
[21]: /ja/logs/explore/
[22]: /ja/getting_started/tagging/unified_service_tagging