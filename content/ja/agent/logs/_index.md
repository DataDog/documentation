---
description: '[Datadog Agent][60] を使用してログを Datadog に送信します'
further_reading:
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: ドキュメント
  text: Datadog に送信されるログの絞り込み
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: ドキュメント
  text: ログの機密データのスクラビング
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: ドキュメント
  text: 複数行のログの集約
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: ドキュメント
  text: ワイルドカードを使用したディレクトリの追跡
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: ドキュメント
  text: グローバルな処理ルール
title: ホスト Agent ログの収集
---

ログの収集には、Datadog Agent v6.0 以上が必要です。古いバージョンの Agent には、`log collection` インターフェイスが含まれていません。まだ Agent を使用していない場合は、[Agent のインストール手順][1]に従ってください。

他のベンダーのコレクターやフォワーダーを使用してログを送信したい場合、または配信前に環境内でログデータを前処理したい場合は、[Observability Pipelines][2] を参照してください。

## ログ収集を有効にする

Datadog Agent では、ログの収集はデフォルトで**有効になっていません**。Agent を Kubernetes または Docker 環境で実行している場合は、専用の [Kubernetes ログ収集][3]または [Docker ログ収集][4]のドキュメントを参照してください。

ホストで実行されている Agent でログ収集を有効にするには、Agent の[メインコンフィギュレーションファイル][5] (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。

{{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

Agent v6.19+/v7.19+ 以降、使用されるデフォルトのトランスポートは HTTPS トランスポートです。HTTPS/TCP トランスポートを実行する方法の詳細については、[Agent トランスポートのドキュメント][6]を参照してください。

環境変数を伴った形でログを送信するには、以下の構成を行ってください。

* `DD_LOGS_ENABLED=true`

ログ収集を有効にすると、Agent から Datadog にログを転送できるようになります。次に、Agent でログの収集元を設定します。

## カスタムログ収集

Datadog Agent v6 は、収集したログをファイル、ネットワーク (TCP または UDP)、journald、Windows チャンネルから Datadog に転送できます。

1. [Agent の構成ディレクトリ][5]のルートにある `conf.d/` ディレクトリに、Datadog ユーザーがアクセスできる新しい `<CUSTOM_LOG_SOURCE>.d/` フォルダを作成します。
2. この新しいフォルダーに新しい `conf.yaml` ファイルを作成します。
3. 下記のパラメーターを指定して、カスタムログ収集構成グループを追加します。
4. [Agent を再起動][7]してこの新しい構成を適用します。
5. [Agent の status サブコマンドを実行][8]し、Checks セクションで `<CUSTOM_LOG_SOURCE>` を検索します。

権限エラーがある場合は、[ログファイルを追跡する権限の問題][9]を参照してトラブルシューティングを行ってください。

以下に、カスタムログ収集設定の例を示します。

{{< tabs >}}
{{% tab "Tail files" %}}

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` に保存されているログを `<APP_NAME>` アプリケーションから収集するには、[Agent の構成ディレクトリ][1]のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

Windows では、パス `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` を使用し、ユーザー `ddagentuser` がログファイルへの読み取りおよび書き込みアクセス権を持つことを確認します。

**注**: ログ行は改行文字、`n` または `\r\n` で終了する必要があります。そうしないと、Agent は無期限に待機し、ログ行を送信しません。

[1]: /ja/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

TCP ポート **10518** にログを転送する `<APP_NAME>` アプリケーションからログを収集するには、[Agent の構成ディレクトリ][1]のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Serilog を使用している場合、UDP を使用して接続するには、`Serilog.Sinks.Network` オプションを使用します。

Agent バージョン 7.31.0 以降では、TCP 接続はアイドル状態でも無期限に開いたままになります。

**注**:
- Agent は、単純文字列、JSON、および Syslog 形式のログをサポートします。複数のログを一度に送信する場合は、改行文字を使用してログを区切ってください。
- ログ行は改行文字、`n` または `\r\n` で終了する必要があります。そうしないと、Agent は無期限に待機し、ログ行を送信しません。

[1]: /ja/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

journald からログを収集するには、[Agent の構成ディレクトリ][1]のルートに以下の内容の `journald.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

コンテナ化環境およびユニットフィルタリングの設定については、[journald インテグレーション][2]に関するドキュメントを参照してください。

[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/integrations/journald/
{{% /tab %}}
{{% tab "Windows Events" %}}

Windows のイベントをログとして Datadog に送信するには、`conf.d/win32_event_log.d/conf.yaml` にチャンネルを手動で追加するか、Datadog Agent Manager を使用します。

チャンネルリストを表示するには、PowerShell で以下のコマンドを実行します。

```text
Get-WinEvent -ListLog *
```

最もアクティブなチャンネルを表示するには、PowerShell で以下のコマンドを実行します。

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

次に、チャンネルを `win32_event_log.d/conf.yaml` 構成ファイルに追加します。

```yaml
logs:
  - type: windows_event
    channel_path: "<CHANNEL_1>"
    source: "<CHANNEL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "<CHANNEL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

`<CHANNEL_X>` パラメーターは、イベントの収集に使用する Windows チャンネル名に変更してください。
[インテグレーションの自動処理パイプライン設定][1]を利用するには、対応する `source` パラメーターを同じチャンネル名に設定します。

最後に、[Agent を再起動][2]します。

[1]: /ja/logs/log_configuration/pipelines/#integration-pipelines
[2]: /ja/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

ログの収集に使用可能なパラメーターのリスト

| パラメーター        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | はい      | ログ入力ソースの種類。有効な値は、`tcp`、`udp`、`file`、`windows_event`、`docker`、`journald` です。                                                                                                                                                                                                                                          |
| `port`           | はい      | `type` が **tcp** または **udp** の場合、ログをリスニングするポートを設定します。                                                                                                                                                                                                                                                                                     |
| `path`           | はい      | `type` が **file** または **journald** の場合、ログを収集するファイルパスを設定します。                                                                                                                                                                                                                                                                             |
| `channel_path`   | はい      | `type` が **windows_event** の場合、ログを収集する Windows イベントチャンネルをリストします。                                                                                                                                                                                                                                                                     |
| `service`        | はい      | ログを所有しているサービスの名前。ご使用のサービスを [Datadog APM][10] でインスツルメントしている場合、これは同じサービス名にする必要があります。複数のデータタイプにわたって `service` を構成する場合は、[統合サービスタグ付け][11]の手順を確認してください。                                                                                                          |
| `source`         | はい      | ログを送信しているインテグレーションを定義する属性。既存のインテグレーションに由来するログでない場合、このフィールドはカスタムソース名を含めることができます。ただし、関連して収集している[カスタムメトリクス][12]がある場合は、そのネームスペースと一致させることをお勧めします。たとえば、`myapp.request.count` の `myapp` を使用します。 |
| `include_units`  | いいえ       | `type` が **journald** の場合、対象とする journald ユニットのリスト。                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | いいえ       | `type` が **file** で、`path` にワイルドカード文字が含まれている場合、ログ収集から除外する必要がある一致するファイルをリストします。6.18 以降の Agent バージョンで使用できます。                                                                                                                                                                            |
| `exclude_units`  | いいえ       | `type` が **journald** の場合、対象としない journald ユニットのリスト。                                                                                                                                                                                                                                                                               |
| `sourcecategory` | いいえ       | ソース属性が属するカテゴリーの定義に使用される属性。たとえば、source:postgres、sourcecategory:database`、`source: apache, sourcecategory: http_web_access` です。                                                                                                                                                                                                                              |
| `start_position` | いいえ       | 詳しくは[開始位置](#start-position)を参照してください。|
| `encoding`       | いいえ       | `type` が **file** の場合、Agent がファイルを読み込む際のエンコーディングを設定します。UTF-16 リトルエンディアン の場合は `utf-16-le` に、UTF-16 ビッグエンディアンの場合は `utf-16-be` に、Shift JIS の場合は `shift-jis` に設定します。その他の値に設定すると、Agent はファイルを UTF-8 形式で読み込みます。_`utf-16-le` および `utf-16be` は Agent v6.23/v7.23 の、`shift-jis` は Agent v6.34/v7.34 の追加機能です_                                                                                      |
| `tags`           | いいえ       | 収集される各ログに追加するタグのリスト ([タグ付けの詳細はこちら][13])。                                                                                                                                                                                                                                                                             |

### 開始位置

`start_position` パラメーターは **file** および **journald** テーラータイプでサポートされています。コンテナをテールする場合、 `start_position` は常に `beginning` です。

サポート:
- **File**: Agent 6.19+/7.19+
- **Journald**: Agent 6.38+/7.38+

`type` が **file** の場合
- Agent がファイルの読み込みを開始する位置を設定します。
- 有効な値は `beginning`、`end`、`forceBeginning`、`forceEnd` です (デフォルトは `end`)。
- `beginning` の位置はワイルドカードを使ったパスに対応していません。

`type` が **journald** の場合
- Agent がジャーナルの読み込みを開始する位置を設定します。
- 有効な値は `beginning`、`end`、`forceBeginning`、`forceEnd` です (デフォルトは `end`)。

#### 優先度

file および journald テーラータイプの両方で、`end` または `beginning` 位置が指定され、オフセットが格納されている場合、オフセットが優先されます。`forceBeginning` または `forceEnd` を使用すると、Agent はオフセットが格納されていても指定された値を使用するようになります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/observability_pipelines/
[3]: /ja/agent/kubernetes/log/
[4]: /ja/agent/docker/log/
[5]: /ja/agent/configuration/agent-configuration-files/
[6]: /ja/agent/logs/log_transport/
[7]: /ja/agent/configuration/agent-commands/#restart-the-agent
[8]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[9]: /ja/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files'
[10]: /ja/tracing/
[11]: /ja/getting_started/tagging/unified_service_tagging
[12]: /ja/metrics/custom_metrics/#overview
[13]: /ja/getting_started/tagging/