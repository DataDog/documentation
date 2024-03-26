---
aliases:
- /ja/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /ja/logs/languages
- /ja/integrations/windows_event_log/
description: 環境を設定して、ホスト、コンテナ、およびサービスからログを収集します。
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: ブログ
  text: Logrotate を使ったログファイルの管理方法
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: 高度なログ収集の構成
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
kind: Documentation
title: ログの収集とインテグレーション
---

## 概要

以下のコンフィギュレーションオプションを選択して、ログの取り込みを開始します。すでに log-shipper デーモンを使用している場合は、[Rsyslog][1]、[Syslog-ng][2]、[NXlog][3]、[FluentD][4]、または [Logstash][5] の専用ドキュメントを参照してください。

ログを Datadog に直接送信する場合は、[使用可能な Datadog ログ収集エンドポイントのリスト](#logging-endpoints)を参照してください。

**注**: ログを JSON 形式で Datadog に送信する場合は、Datadog 内にある特定の予約属性を使用します。詳細については、[予約属性セクション](#attributes-and-tags)をご覧ください。

## セットアップ

{{< tabs >}}
{{% tab "Host" %}}

1. [Datadog Agent][1] をインストールします。
2. ログ収集を有効にするには、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。より詳細な情報と例については、[ホスト Agent ログ収集のドキュメント][5]を参照してください。
3. Datadog Agent を有効にすると、[ログファイルの尾行または UDP/TCP 経由で送信されるログのリスニング][2]、[ログのフィルタリングまたは機密データのスクラビング][3]、[複数行ログの集約][4]を構成することができるようになります。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/logs/advanced_log_collection/#filter-logs
[4]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "アプリケーション" %}}

1. [Datadog Agent][1] をインストールします。
2. ログ収集を有効にするには、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。より詳細な情報と例については、[ホスト Agent ログ収集のドキュメント][2]を参照してください。
3. アプリケーション言語のインストール手順に従い、ロガーを構成し、ログの生成を開始します。

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "コンテナ" %}}

コンテナまたはオーケストレーターのプロバイダーを選択し、そのプロバイダー専用のログ収集手順に従います。

{{< partial name="logs/logs-containers.html" >}}

**注**:

- Datadog Agent では、ロギングドライバーを使用することなく、[コンテナの stdout/stderr からログを直接収集][1]できます。Agent の Docker チェックが有効にされていると、コンテナとオーケストレーターのメタデータがタグとしてログに自動的に追加されます。

- すべてのコンテナからログを収集することも、[コンテナイメージ、ラベル、または名前でフィルタリングされたサブセットのみ][2]を収集することも可能です。

- オートディスカバリーは、[コンテナラベルで直接ログ収集を構成する][3]ために使用することもできます。

- Kubernetes 環境では [daemonSet][4] も活用できます。

[1]: /ja/agent/docker/log/
[2]: /ja/agent/guide/autodiscovery-management/
[3]: /ja/agent/kubernetes/integrations/
[4]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "サーバーレス" %}}

環境から Datadog にログを送信する AWS Lambda 関数である Datadog Forwarder を使用します。AWS サーバーレス環境でログ収集を有効にするには、[Datadog Forwarder のドキュメント][1]を参照してください。

[1]: /ja/serverless/forwarder
{{< /tabs >}}

{{% tab "クラウド/インテグレーション" %}}

以下からクラウドプロバイダーを選択すると、ログを自動的に収集して Datadog に転送する方法を確認できます。

{{< partial name="logs/logs-cloud.html" >}}

Datadog のインテグレーションとログ収集は連携しています。インテグレーションのデフォルト構成ファイルを使用すると、Datadog で専用の[プロセッサー][1]、[パース][2]、および[ファセット][3]を有効にできます。インテグレーションでログ収集を開始するには:

1. [インテグレーションページ][6]からインテグレーションを選択し、セットアップの指示に従います。
2. インテグレーションが提供するログ収集の手順に従ってください。このセクションでは、そのインテグレーションの `conf.yaml` ファイルにある logs セクションのコメントを解除し、環境に合わせて構成する方法について説明します。

[1]: /ja/logs/log_configuration/processors
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/logs/explorer/facets/
[4]: /ja/agent/kubernetes/log/#autodiscovery
[5]: /ja/agent/docker/log/#log-integrations
[6]: /ja/integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## 追加のコンフィギュレーションオプション

### ログのエンドポイント

Datadog では、SSL で暗号化された接続と暗号化されていない接続の両方にログのエンドポイントが提供されます。可能な場合は常に、暗号化されたエンドポイントを使用してください。Datadog Agent では、暗号化されたエンドポイントを使用して、ログが Datadog に送信されます。詳細は、[Datadog のセキュリティに関するドキュメント][6]で確認できます。

#### サポートされるエンドポイント

ページの右側にある[サイト][13]セレクターのドロップダウンを使用して、Datadog サイトごとにサポートされているエンドポイントを確認できます。

{{< site-region region="us" >}}

| サイト | タイプ        | エンドポイント                                                                  | ポート         | 説明                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443   | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。                                                    |
| US   | HTTPS       | `agent-http-intake-pci.logs.datadoghq.com`                                | 443   | Agent が PCI DSS コンプライアンスを有効にした組織へ HTTPS でログを送信するために使用します。詳しくは、[ログ管理のための PCI DSS コンプライアンス][3]を参照してください。                 |
| US   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443   | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。                                                             |
| US   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443   | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                                                                            |
| US   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443   | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                                                                             |
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Agent が TLS を使わずにログを送信するために使用します。
| US   | TCP と TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Agent が TLS を使ってログを送信するために使用します。
| US   | TCP と TLS | `intake.logs.datadoghq.com`                                               | 443   | SSL で暗号化された TCP 接続を介してカスタムフォワーダーが生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                 |
| US   | TCP と TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |
| US   | TCP と TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https
[3]: /ja/data_security/logs/#pci-dss-compliance-for-log-management
{{< /site-region >}}

{{< site-region region="eu" >}}

| サイト | タイプ        | エンドポイント                                                                  | ポート | 説明                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EU   | HTTPS       | `http-intake.logs.datadoghq.eu`                                           | 443  | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。                                                    |
| EU   | HTTPS       | `agent-http-intake.logs.datadoghq.eu`                                     | 443  | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。                                                             |
| EU   | HTTPS       | `lambda-http-intake.logs.datadoghq.eu`                                    | 443  | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                                                                            |
| EU   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                                                                             |
| EU   | TCP と TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | SSL で暗号化された TCP 接続を介して Agent が protobuf 形式のログを送信する際に使用されます。                                                                                     |
| EU   | TCP と TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | SSL で暗号化された TCP 接続を介して Azure 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。**注**: 他のクラウドプロバイダーもこのエンドポイントを使用できます。 |
| EU   | TCP と TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | SSL で暗号化された TCP 接続を介して Lambda 関数が生ログ、Syslog、または JSON 形式のログを送信する際に使用されます。                                                                  |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="us3" >}}

| サイト | タイプ  | エンドポイント                                                                  | ポート | 説明                                                                                                              |
|------|-------|---------------------------------------------                              |------|--------------------------------------------------------------------------------------------------------------------------|
| US3  | HTTPS | `http-intake.logs.us3.datadoghq.com`                                      | 443  | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。 |
| US3  | HTTPS | `lambda-http-intake.logs.us3.datadoghq.com`                               | 443  | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                         |
| US3  | HTTPS | `agent-http-intake.logs.us3.datadoghq.com`                                | 443  | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。          |
| US3  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                          |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="us5" >}}

| サイト | タイプ  | エンドポイント                                                                  | ポート | 説明                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.us5.datadoghq.com`                                      | 443  | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。 |
| US5  | HTTPS | `lambda-http-intake.logs.us5.datadoghq.com`                               | 443  | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                         |
| US5  | HTTPS | `agent-http-intake.logs.us5.datadoghq.com`                                | 443  | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                          |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="ap1" >}}

| サイト | タイプ  | エンドポイント                                                                  | ポート | 説明                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| AP1  | HTTPS | `http-intake.logs.ap1.datadoghq.com`                                      | 443  | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。 |
| AP1  | HTTPS | `lambda-http-intake.logs.ap1.datadoghq.com`                               | 443  | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                         |
| AP1  | HTTPS | `agent-http-intake.logs.ap1.datadoghq.com`                                | 443  | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。          |
| AP1  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                          |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| サイト    | タイプ  | エンドポイント                                                                  | ポート | 説明                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.com`                                          | 443  | HTTPS 経由で JSON またはプレーンテキスト形式のログを送信するためにカスタムフォワーダーが使用。[Logs HTTP API のドキュメント][1]参照。 |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.datadoghq.com`                          | 443  | HTTPS 経由で未加工、Syslog、または JSON 形式のログを送信するために Lambda 関数が使用。                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.datadoghq.com`                           | 443  | HTTPS 経由で JSON 形式のログを送信するために Agent が使用。[ホスト Agent ログ収集のドキュメント][2]参照。          |
| US1-FED | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK が HTTPS で JSON 形式のログを送信するために使用します。                                                          |

[1]: /ja/api/latest/logs/#send-logs
[2]: /ja/agent/logs/#send-logs-over-https

{{< /site-region >}}

### カスタムログ転送

**TCP** または **HTTP** 経由でログを転送できるカスタムプロセスまたはロギングライブラリを、Datadog ログと共に使用​​できます。

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP 経由で Datadog プラットフォームにログを送信できます。開始するには、[Datadog ログ HTTP API ドキュメント][1]を参照してください。

[1]: /ja/api/latest/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

OpenSSL、GnuTLS、または他の SSL/TLS クライアントを使用して、接続を手動でテストすることができます。GnuTLS の場合は、以下のコマンドを実行します。

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

OpenSSL の場合、以下のコマンドを実行します。

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

ログエントリの前に必ず [Datadog API キー][1]を付けて、ペイロードを追加する必要があります。

```
<DATADOG_API_KEY> Log sent directly using TLS
```

ペイロード、または例で書かれている `Log sent directly using TLS` (TCP 経由で直接送信されたログ) は、raw、Syslog、または JSON 形式にすることができます。ペイロードが JSON 形式の場合、Datadog は自動的にその属性をパースします。

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}

[1]: /ja/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

OpenSSL、GnuTLS、または他の SSL/TLS クライアントを使用して、手動で接続をテストすることができます。GnuTLS の場合は、以下のコマンドを実行します。

```shell
gnutls-cli tcp-intake.logs.datadoghq.eu:443
```

OpenSSL の場合、以下のコマンドを実行します。

```shell
openssl s_client -connect tcp-intake.logs.datadoghq.eu:443
```

ログエントリの前に必ず [Datadog API キー][1]を付けて、ペイロードを追加する必要があります。

```
<DATADOG_API_KEY> Log sent directly using TLS
```

ペイロード、または例で書かれている `Log sent directly using TLS` (TCP 経由で直接送信されたログ) は、raw、Syslog、または JSON 形式にすることができます。ペイロードが JSON 形式の場合、Datadog は自動的にその属性をパースします。

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /ja/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="us3" >}}
TCP エンドポイントは、このサイトでは推奨していません。詳しくは[サポート][1]にお問い合わせください。

[1]: /ja/help
{{< /site-region >}}

{{< site-region region="gov,us5,ap1" >}}

このサイトでは、TCP エンドポイントはサポートされていません。

[1]: /ja/help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**注**:

* HTTPS API は、最大で 1MB のサイズのログをサポートします。ただし、最適なパフォーマンスには各ログが 25K バイトを超えないことをおすすめします。ログ作成に Datadog Agent を使用する場合、ログは 256kB (256000 バイト) に分割されるよう構成されています。
* 1 つのログイベントが持つことができるタグは 100 個以下です。1 日あたり最大 1,000 万個の一意のタグに対して、各タグは 256 文字を超えてはなりません。
* JSON 形式に変換されたログイベントが保持できる属性は 256 未満です。これらの各属性のキーは 50 文字未満、連続するネストのレベルは 10 未満、 それぞれの値は (ファセットに昇格した場合) 1024 文字未満となります。
* ログイベントは、過去 18 時間までの[タイムスタンプ][14]で送信可能です。

上の制限に準拠しないログイベントは、システムによって変換されるか、切り詰められます。または、所定のタイムレンジ外の場合はインデックス化されません。ただし、Datadog はユーザーデータを可能な限り維持するよう全力を尽くします。

### 属性とタグ

属性は、ログエクスプローラーでのフィルタリングと検索に使用される[ログファセット][9]を規定します。予約済み属性および標準属性のリストと、ログ属性とエイリアス設定を使用した命名規則のサポート方法については、専用の[属性とエイリアス設定][10]ドキュメントをご参照ください。

#### スタックトレースの属性

スタックトレースをログに記録するに当たっては、Datadog アプリケーション内に専用の UI 表示を持つ特別な属性があります。ロガー名、現在のスレッド、エラーの種類、スタックトレース自体などです。

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="パースされたスタックトレースの属性" >}}

この機能を使用するには、以下の属性名を使用します。

| 属性            | 説明                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | ロガーの名前                                                      |
| `logger.thread_name` | 現在のスレッドの名前                                              |
| `error.stack`        | 実際のスタックトレース                                                      |
| `error.message`      | スタックトレースに含まれるエラーメッセージ                              |
| `error.kind`         | エラーのタイプまたは「種類」("Exception" や "OSError" など) |

**注**: インテグレーションパイプラインは、デフォルトのログライブラリパラメーターをこれらの属性に再マップし、スタックトレースをパースまたはトレースバックして、自動的に `error.message` と `error.kind` を抽出しようとします。

詳しくは、[ソースコードと属性ドキュメント][11]をご覧ください。

## 次のステップ

ログが収集されて取り込まれると、**ログエクスプローラー**で利用できるようになります。ログエクスプローラーでは、ログのアラートを検索、強化、表示できます。[ログエクスプローラー][12]のドキュメントを参照してログデータの分析を開始するか、以下の追加のログ管理ドキュメントを参照してください。

{{< img src="logs/explore.png" alt="ログエクスプローラーに表示されるログ" style="width:100%" >}}

## その他の参考資料

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