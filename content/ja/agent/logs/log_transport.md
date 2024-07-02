---
title: Agent Transport for Logs
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: "agent/logs/advanced_log_collection/#filter-logs"
  tag: Documentation
  text: Filter logs sent to Datadog
- link: "agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs"
  tag: Documentation
  text: Scrub sensitive data from your logs
- link: "agent/logs/advanced_log_collection/#multi-line-aggregation"
  tag: Documentation
  text: Multi-line log aggregation
- link: "agent/logs/advanced_log_collection/#tail-directories-using-wildcards"
  tag: Documentation
  text: Tail directories by using wildcards
- link: "agent/logs/advanced_log_collection/#global-processing-rules"
  tag: Documentation
  text: Global processing rules
---


## Agent のデフォルトの動作

v6.19 以降/v7.19 以降の Agent は、デフォルトで、旧バージョンに合わせて TCP ではなく HTTPS で圧縮してログを転送します。
ログの収集が有効化されている場合、Agent を起動すると、HTTPS 接続性テストが実行されます。テストが成功した場合、Agent は圧縮された HTTPS 転送を使用します。それ以外の場合、Agent は TCP 転送をフォールバックします。

この接続性テストは Agent の起動時にのみ実行され、HTTPS のみをテストします。起動した時に Agent が TCP と HTTP の両方に接続していない場合、Agent は TCP 転送を使用し、再び接続しても次に Agent を再起動するまでこの動作は変わりません。

Agent が使用している転送を確認するには、[Agent status コマンド][1]を実行します。

{{< img src="agent/logs/agent-status.png" alt="Agent のステータス" style="width:70%;">}}

**注**:

* For older Agent versions, TCP transport is used by default. Datadog strongly recommends you to enforce HTTPS transport if you are running v6.14+/v7.14+ and HTTPS compression if you are running v6.16+/v7.16+.
* Datadog へログを転送する際にプロキシを使用する場合は、特定のトランスポート（TCP または HTTPS）を常に強制使用します。

## 特定の転送の実行

下記のコンフィギュレーションを使用して、TCP または HTTPS 転送を実行します。

{{< tabs >}}
{{% tab "HTTPS" %}}

バージョン v6.14 以降/v7.14 以降 の Agent で HTTPS 転送を実行するには、Agent の[メインコンフィギュレーションファイル][1] (`datadog.yaml`) を次のように更新します。

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

環境変数を伴った形でログを送信するには、以下の構成を行ってください。

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_HTTP=true`

デフォルトで、Datadog Agent はポート `443` を使用して HTTPS 経由でログを Datadog に送信します。

## HTTPS 転送

`200` ステータスコードが Datadog ストレージシステムから返されるため、最も信頼性の高いログ収集を行うには、**HTTPS ログ転送コンフィギュレーションを推奨します**。

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="HTTPS インテークスキーマ" style="width:80%;">}}

HTTP を使用して、次を上限として Agent がログのバッチを送信します。

* 最大バッチサイズ: 1MB
* ログ 1 つの最大サイズ: 256kB
* 各バッチの最大ログ数: 1,000

### ログの圧縮

`compression_level` パラメーター (または `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) には `0` (圧縮なし) から `9` (最大圧縮、リソース使用率: 高) までの値を設定できます。デフォルト値は `6` です。

圧縮を有効化した場合の Agent リソースの使用状況については、[Datadog Agent のオーバーヘッド][2]で詳細をご確認ください。

6.19 / 7.19 以前のバージョンの Agent の場合、次のようにAgent の[メインコンフィギュレーションファイル][1] (`datadog.yaml`) 更新して圧縮を行う必要があります。

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### バッチ待機時間を構成する

Agent は、各バッチが (コンテンツサイズまたはログ数のいずれかで) 満たされるまで最大 5 秒待ちます。そのため、最悪の場合 (ログがほとんど生成されない場合)、HTTPS に切り替えると、すべてのログをリアルタイムで送信する TCP  転送よりも 5 秒遅くなる可能性があります。

各バッチが満たされるまで Datadog Agent が待機する最大時間を変更するには、Agent の[メインコンフィギュレーションファイル][1] (`datadog.yaml`) に以下のコンフィギュレーションを追加してください。

```yaml
logs_config:
  batch_wait: 2
```

または、`DD_LOGS_CONFIG_BATCH_WAIT=2` 環境変数を使用します。単位は秒、整数 `1` から `10` の間で設定します。

### HTTPS プロキシのコンフィギュレーション

ログを HTTPS 経由で送信する場合は、他のデータタイプと同じ[プロキシ設定セット][3]を使用して、ログを Web プロキシ経由で送信します。

[1]: /agent/configuration/agent-configuration-files/
[2]: /agent/basic_agent_usage/#agent-overhead
[3]: /agent/configuration/proxy/
{{% /tab %}}
{{% tab "TCP" %}}

TCP 転送を実行するには、Agent の[メインコンフィギュレーションファイル][1] (`datadog.yaml`) を次のように更新します。

```yaml
logs_enabled: true
logs_config:
  force_use_tcp: true
```
環境変数を伴った形でログを送信するには、以下の構成を行ってください。

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_FORCE_USE_TCP=true`

デフォルトでは、Datadog Agent は TLS で暗号化された TCP を介して、ログを Datadog に送信します。これを実施するには、外部へ送信できる通信 (Datadog US サイトではポート `10516`、Datadog EU サイトではポート `443`) が必要です 。

[1]: /agent/configuration/agent-configuration-files/
{{% /tab %}}
{{< /tabs >}}

**注**:  SOCKS5 プロキシは 圧縮 HTTPS でまだサポートされていないため、[SOCKS5 プロキシ][2]サーバーのセットアップでは TCP 転送が実行されます。


[1]: /agent/configuration/agent-commands/?tab=agentv6v7#service-status
[2]: /agent/logs/proxy/?tab=socks5
