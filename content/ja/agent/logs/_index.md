---
description: '[Datadog Agent][60] を使用してログを Datadog に送信します'
further_reading:
- link: agent/logs/agent_tags/
  tag: よくあるご質問
  text: Agent タグは自動的にログに追加されます
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: よくあるご質問
  text: Datadog に送信されるログの絞り込み
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: よくあるご質問
  text: ログの機密データのスクラビング
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: よくあるご質問
  text: 複数行のログの集約
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: よくあるご質問
  text: ワイルドカードを使用したディレクトリの追跡
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: よくあるご質問
  text: グローバルな処理ルール
title: ホスト Agent ログの収集
---
ログ収集には Datadog Agent v6.0 以降が必要です。古いバージョンの Agent には `log collection` インターフェイスが含まれていません。Agent をまだ使用していない場合は、[Agent のインストール手順][1] に従ってください。

ほかのベンダーのコレクターやフォワーダーを使用してログを送信したい場合、または配信前に環境内でログデータを前処理したい場合は、[Observability Pipelines][2] を参照してください。

## ログ収集を有効にする {#activate-log-collection}

Datadog Agent では、ログの収集はデフォルトでは**有効になっていません**。Agent を Kubernetes または Docker 環境で実行している場合は、専用の [Kubernetes ログ収集][3] または [Docker ログ収集][4] のドキュメントを参照してください。

ホストで実行されている Agent でログ収集を有効にするには、Agent の [メイン構成ファイル][5] (`datadog.yaml`) で `logs_enabled: false` を `logs_enabled: true` に変更します。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

使用可能なすべての構成オプションの詳細については、[サンプル config_template.yaml ファイル][6] を参照してください。

<div class="alert alert-info">Agent v6.19/v7.19 以降、使用されるデフォルトのトランスポートは HTTPS トランスポートです。詳細については、<a href="/agent/logs/log_transport/">Agent トランスポート</a>.</div>を参照してください。

**環境変数**を伴った形でログを送信するには、以下の構成を行ってください。

```
DD_LOGS_ENABLED=true
```

ログ収集を有効にすると、Agent から Datadog にログを転送できるようになります。次に、Agent でログの収集元を設定します。

## カスタムログ収集 {#custom-log-collection}

Datadog Agent v6 は、収集したログをファイル、ネットワーク (TCP または UDP)、journald、Windows チャンネルから Datadog に転送できます。

1. [Agent の構成ディレクトリ][5] のルートにある `conf.d/` ディレクトリに、Datadog ユーザーがアクセスできる新しい `<CUSTOM_LOG_SOURCE>.d/` フォルダを作成します。
2. この新しいフォルダに新しい `conf.yaml` ファイルを作成します。
3. 下記のパラメーターを指定して、カスタムログ収集構成グループを追加します。
4. [Agent を再起動][8] してこの新しい構成を適用します。
5. [Agent の status サブコマンド][9] を実行し、Checks セクションに `<CUSTOM_LOG_SOURCE>` があることを確認します。

権限エラーがある場合は、[ログファイルを追跡する権限の問題][10] を参照してトラブルシューティングを行ってください。

以下に、カスタムログ収集設定の例を示します。

{{< tabs >}}
{{% tab "ファイルのテール" %}}

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` に保存されているログを `<APP_NAME>` アプリケーションから収集するには、[Agent の構成ディレクトリ][1] のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

**Windows** では、パス `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` を使用し、ユーザー `ddagentuser` ログファイルへの読み取りおよび書き込みアクセス権を持つことを確認します。

**注**: ログ行は改行文字、`\n` または `\r\n` で終了する必要があります。そうしないと、Agent は無期限に待機し、ログ行を送信しません。

[1]: /ja/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

送信者の IP アドレスをキャプチャし、ログメッセージのペイロードに含めるには、`datadog.yaml` ファイルに以下の構成を追加します。

```yaml
 logs_config:
   use_sourcehost_tag: true
```
TCP ポート **10518** にログを転送する `<APP_NAME>` アプリケーションからログを収集するには、[Agent の構成ディレクトリ][1] のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

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
- ログ行は改行文字、`\n` または `\r\n` で終了する必要があります。そうしないと、Agent は無期限に待機し、ログ行を送信しません。

[1]: /ja/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

journald からログを収集するには、[Agent の構成ディレクトリ][1] のルートに以下の内容の `journald.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

コンテナ化環境およびユニットフィルタリングの設定については、[journald インテグレーション][2] に関するドキュメントを参照してください。

[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/integrations/journald/
{{% /tab %}}
{{% tab "Windows イベント" %}}

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
[インテグレーション自動処理パイプラインのセットアップ][1] を利用するには、対応する `source` パラメーターを同じチャンネル名に設定します。

最後に、[Agent を再起動][2] します。

[1]: /ja/logs/log_configuration/pipelines/#integration-pipelines
[2]: /ja/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Windows プライベートロケーション" %}}
以下のセクションの手順に従って、Windows プライベートロケーションのログを Datadog に送信します。

### Agent を構成する {#configure-the-agent}

1. Agent のログ収集を有効にするには、Agent 構成ファイルで `logs_enabled: true` を設定します.
2. `C:\ProgramData\Datadog\conf.d` に移動し、`synthetics_worker.d` という名前のフォルダを作成します。
3. `synthetics_worker.d` フォルダ内に、`conf.yaml` という名前のファイルを作成します。以下の例をテンプレートとして使用してください。

```yaml
logs:
  - type: file
    path: "C:\\Program Files\\Datadog-Synthetics\\Synthetics\\private-location-service.out.log"
    service: <YOUR_SERVICE>
    source: synthetics
    tags: # Defined per user preference
      - env:<YOUR_ENV>
      - private_location:<YOUR_PRIVATE_LOCATION>
```

### Agent を実行しているユーザーを確認する {#verify-the-user-running-the-agent}

プライベートロケーションのインストールフォルダには管理者しかアクセスできないため、Datadog Agent にログファイルへのアクセス権が必要です。Datadog Agent を実行しているユーザーを確認するには、次の手順を実行します。

1. Windows キーを押しながら `R` キーを押し、{{< ui >}}Run{{< /ui >}} を検索します。
2. Datadog Agent を見つけて右クリックし、[{{< ui >}}Properties{{< /ui >}}] (プロパティ) を選択します。
3. [{{< ui >}}Log On{{< /ui >}}] (ログオン) タブでアカウントを確認します (デフォルトは `ddagentuser` です)。
4. ウィンドウを閉じます。

### Agent を実行しているユーザーに権限を付与する {#grant-permission-to-the-user-running-the-agent}

1. `C:\Program Files` に移動し、`synthetics_worker.d` フォルダを見つけます。
2. `synthetics_worker.d` フォルダを右クリックし、[{{< ui >}}Properties{{< /ui >}}] を選択します。
3. [{{< ui >}}Security{{< /ui >}}] (セキュリティ) タブに移動します。
4. [{{< ui >}}Edit{{< /ui >}}] (編集) をクリックし、`ddagentuser` を追加します。
5. 必要な権限を付与します。
6. サービス画面またはコマンドラインから Datadog Agent を再起動して変更を適用し、Datadog へのログの送信を開始します。
{{% /tab %}}
{{< /tabs >}}

ログの収集に使用可能なパラメーターのリスト

| パラメーター        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | はい      | ログ入力ソースの種類。有効な値は、`tcp`、`udp`、`file`、`windows_event`、`docker`、または `journald` です。                                                                                                                                                                                                                                         |
| `port`           | はい      | `type` が **tcp** または **udp** の場合、ログをリスニングするポートを設定します。                                                                                                                                                                                                                                                                                    |
| `path`           | はい      | `type` が **file** または **journald** の場合、ログを収集するファイルパスを設定します。                                                                                                                                                                                                                                                                            |
| `channel_path`   | はい      | `type` が **windows_event** の場合、ログを収集する Windows イベントチャンネルをリストします。                                                                                                                                                                                                                                                                    |
| `service`        | はい      | ログを所有しているサービスの名前。ご使用のサービスを [Datadog APM][11] でインスツルメントしている場合、これは同じサービス名にする必要があります。複数のデータタイプにわたって `service` を構成する場合は、[unified service tagging][12] の手順を確認してください。                                                                                                         |
| `source`         | はい      | ログを送信しているインテグレーションを定義する属性。既存のインテグレーションに由来するログでない場合、このフィールドはカスタムソース名を含めることができます。ただし、関連して収集している [Custom Metrics][13] がある場合は、この値をそのネームスペースと一致させることをお勧めします。たとえば、`myapp.request.count` の `myapp` を使用します。|
| `include_units`  | いいえ       | `type` が **journald** の場合、対象とする journald ユニットのリスト。                                                                                                                                                                                                                                                                              |
| `exclude_paths`  | いいえ       | `type` が **file** で、`path` にワイルドカード文字が含まれている場合、ログ収集から除外する必要がある一致するファイルをリストします。6.18 以降の Agent バージョンで使用できます。                                                                                                                                                                            |
| `exclude_units`  | いいえ       | `type` が **journald** の場合、除外する journald ユニットのリスト。                                                                                                                                                                                                                                                                              |
| `sourcecategory` | いいえ       | ソース属性が属するカテゴリーの定義に使用される属性。たとえば、`source:postgres, sourcecategory:database` または `source: apache, sourcecategory: http_web_access` です。                                                                                                                                                                                                                             |
| `start_position` | いいえ       | 詳しくは、[開始位置](#start-position)を参照してください。|
| `encoding`       | いいえ       | `type` が **file** の場合、Agent がファイルを読み込む際のエンコーディングを設定します。UTF-16 リトルエンディアンの場合は `utf-16-le` に、UTF-16 ビッグエンディアンの場合は `utf-16-be` に、Shift JIS の場合は `shift-jis` に設定します。その他の値に設定すると、Agent はファイルを UTF-8 形式で読み込みます。_`utf-16-le` および `utf-16be` は Agent v6.23/v7.23 で、`shift-jis` は Agent v6.34/v7.34 で追加されました。_                                                                                      |
| `tags`           | いいえ       | 収集される各ログに追加するタグのリスト ([タグ付けの詳細はこちら][14])。                                                                                                                                                                                                                                                                            |

### 開始位置 {#start-position}

`start_position` パラメーターは **file** および **journald** テーラータイプでサポートされています。コンテナをテールする場合、`start_position` は常に `beginning` です。

サポート:
- **file**: Agent 6.19+/7.19+
- **journald**: Agent 6.38+/7.38+

`type` が **file** の場合:
- Agent がファイルの読み込みを開始する位置を設定します。
- 有効な値は、`beginning`、`end`、`forceBeginning`、および `forceEnd` です (デフォルト: `end`)。
- `beginning` の位置はワイルドカードを使ったパスに対応していません。

`type` が **journald** の場合:
- Agent がジャーナルの読み込みを開始する位置を設定します。
- 有効な値は、`beginning`、`end`、`forceBeginning`、および `forceEnd` です (デフォルト: `end`)。

#### 優先度 {#precedence}

file および journald テーラータイプの両方で、`end` または `beginning` 位置が指定され、オフセットが格納されている場合、オフセットが優先されます。`forceBeginning` または `forceEnd` を使用すると、Agent はオフセットが格納されていても指定された値を使用するようになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/observability_pipelines/
[3]: /ja/containers/kubernetes/log/
[4]: /ja/containers/docker/log/
[5]: /ja/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[7]: /ja/agent/logs/log_transport/
[8]: /ja/agent/configuration/agent-commands/#restart-the-agent
[9]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[10]: /ja/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /ja/tracing/
[12]: /ja/getting_started/tagging/unified_service_tagging
[13]: /ja/metrics/custom_metrics/#overview
[14]: /ja/getting_started/tagging/