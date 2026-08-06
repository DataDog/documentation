---
description: Claude Code、Cursor、および GitHub Copilot のインテグレーションをセットアップして、Datadog Agent
  Console でコーディングエージェントのアクティビティを監視します。
further_reading:
- link: /ai_agents_console/
  tag: ドキュメント
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: ドキュメント
  text: Anthropic の使用状況とコストインテグレーション
- link: /integrations/cursor/
  tag: ドキュメント
  text: Cursor インテグレーション
title: Agent Console のセットアップ
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Agent Console はプレビュー中で、Datadog のお客様すべてにご利用いただけます。
{{< /callout >}}

[Agent Console][1] で監視したい各コーディングエージェントのインテグレーションをセットアップします。

## Claude Code {#claude-code}

### オプション 1: Anthropic 使用状況とコストインテグレーション (推奨) {#option-1-anthropic-usage-and-costs-integration-recommended}

Agent Console で Claude Code を監視するには、[Anthropic 使用状況とコスト][4]インテグレーションをセットアップします。

セットアップ後、[Agent Console][1] に移動し、{{< ui >}}Claude Code{{< /ui >}} タイルをクリックすると、メトリクスが表示されます。

### オプション 2: OpenTelemetry (OTLP) {#option-2-opentelemetry-otlp}

以下の手順では、OpenTelemetry プロトコル (OTLP) を使用して Datadog に直接テレメトリを送信するように Claude Code を設定します。

1. [ログ構成][6]にすべてをキャッチする[インデックス][7]、または `service:claude-code` をカバーするインデックスが含まれていることを確認してください。
2. [Datadog API キー][8]を生成します。
3. Claude Code 設定ファイル (例: `~/.claude/settings.json`) に次の環境変数を設定します。

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}",
       "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.

   <div class="alert alert-info">To set up Agent Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
4. Restart Claude Code.

After you restart Claude Code, navigate to the [Agent Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

### Option 3: Forward data through the Datadog Agent 

1. Make sure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
2. [Install the Datadog Agent][9].
3. Configure your Datadog Agent to enable the OpenTelemetry Collector:
   ```yaml
   otlp_config:
     receiver:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
     logs:
       enabled: true
   otelCollector:
     enabled: true
   ```
4. Claude Code 設定ファイル (例: `~/.claude/settings.json`) に次の環境変数を設定します。
   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:4317",
       "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
       "OTEL_METRIC_EXPORT_INTERVAL": "10000"
     }
   }
   ```

   <div class="alert alert-info">組織全体で Claude Code のための Agent Console をセットアップするには、IT チームがモバイルデバイス管理 (MDM) システムまたは <a href="https://code.claude.com/docs/en/server-managed-settings">サーバー管理設定</a>を使用して、すべての管理デバイスに Claude Code 設定ファイルを配布できます。</div>
5. Claude Code を再起動します。

Claude Code を再起動した後、[Agent Console][1]に移動し、{{< ui >}}Claude Code{{< /ui >}} タイルをクリックします。数分以内にメトリクス (使用状況、コスト、レイテンシー、エラー) が表示されるはずです。

## Cursor {#cursor}

Cursor を Agent Console で監視するには、Datadog Extension for Cursor を使用して [Cursor][5] インテグレーションをセットアップします。

セットアップ後、[Agent Console][1] に移動し、{{< ui >}}Cursor{{< /ui >}} タイルをクリックすると、メトリクスが表示されます。

## GitHub Copilot {#github-copilot}

GitHub Copilot を Agent Console で監視するには、[GitHub Copilot][10] のインテグレーションをセットアップします。

セットアップ後、[Agent Console][1] に移動し、{{< ui >}}GitHub Copilot{{< /ui >}} タイルをクリックすると、メトリクスが表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[4]: /ja/integrations/anthropic-usage-and-costs/
[5]: /ja/integrations/cursor/?tab=datadogextensionforcursor
[6]: /ja/logs/log_configuration/
[7]: /ja/logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /ja/agent/?tab=Host-based
[10]: /ja/integrations/github-copilot/