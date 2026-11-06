---
description: coding agent、knowledge agent、および生産性ツールを Datadog Agent Console に接続し、ツール間でユーザー
  ID をマッピングします。
further_reading:
- link: /ai_agents_console/
  tag: ドキュメント
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: ドキュメント
  text: Anthropic の使用状況とコストインテグレーション
- link: /integrations/openai-codex/
  tag: ドキュメント
  text: OpenAI Codex インテグレーション
- link: /integrations/openai/
  tag: ドキュメント
  text: OpenAI インテグレーション
- link: /integrations/cursor/
  tag: ドキュメント
  text: Cursor インテグレーション
- link: https://github.com/datadog-labs/trajectory
  tag: ソースコード
  text: Trajectory
title: Agent Console のセットアップ
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Agent Console はプレビュー中で、Datadog のお客様すべてにご利用いただけます。
{{< /callout >}}

[Agent Console][1] をセットアップするには、監視する AI ツールを接続し、必要に応じて生産性ツールを接続して、ツール間でユーザー ID をマッピングします。Agent Console の {{< ui >}}Setup{{< /ui >}} ページ {{< ui >}}Settings{{< /ui >}} では、各ステップの進捗状況を確認できます。

{{< img src="/ai_agents_console/setup_agent_console.png" alt="データの検証、ID のマッピング、最初の agent の接続、および生産性ツールの接続の手順と進捗バーが表示された Agent Console の Settings Setup ページ" style="width:100%;" >}}

## 権限 {#permissions}

Agent Console へのアクセスは、以下のロール権限によって制御されます。[Organization Settings > Roles][2] で、それらをロールに割り当てます。

| 権限 | 説明 |
|------------|-------------|
| `agent_console_read` | Overview、My Usage、Usage、および Settings を含む Agent Console を表示します。この権限がないユーザーは、Agent Console を開くことができません。|
| `agent_console_write` | ID マッピングやインテグレーション設定など、Agent Console の構成を変更します。|

## AI ツールの接続 {#connect-ai-tools}

Agent Console を初めて開いたときに表示される {{< ui >}}Set up your AI tools{{< /ui >}} ページから、接続する AI ツールを選択します。データの表示を開始するには、少なくとも 1 つのツールを接続します。ツールは後から追加できます。

{{< img src="/ai_agents_console/agent_console_onboarding.png" alt="Trajectory、Cursor、Anthropic Products、GitHub Copilot、Codex、Microsoft Copilot、ChatGPT Work、および Another Integration のカードが表示された AI ツールのセットアップページ" style="width:100%;" >}}

### Anthropic 製品 {#anthropic-products}

Claude Code、Claude Chat、Claude Cowork、および Claude Design を監視するには、[Anthropic Usage and Costs][3] インテグレーションをセットアップします。このインテグレーションにより、各 Claude 製品の日々の支出とユーザー分析が収集されます。

Anthropic Usage and Costs インテグレーションは、Claude Team プランをサポートしていません。組織で Team プランを使用している場合は、代わりに [OpenTelemetry](#claude-code-with-opentelemetry) を使用して Claude Code のテレメトリを Datadog に送信します。

### OpenTelemetry を使用した Claude Code {#claude-code-with-opentelemetry}

OpenTelemetry (OTLP) を使用して、Claude Code のテレメトリを Datadog に直接送信します。この方法で収集されたデータは、Agent Console の {{< ui >}}Claude Code (OTel){{< /ui >}} カードに表示されます。

組織全体で Claude Code の Agent Console をセットアップするには、IT チームがモバイルデバイス管理 (MDM) システムまたは[サーバー管理設定][4]を使用して、すべての管理対象デバイスに Claude Code 設定ファイルを配布できます。

{{< tabs >}}
{{% tab "Datadog に直接送信" %}}

1. [ログ構成][1]にすべてをキャッチする[インデックス][2]、または `service:claude-code` をカバーするインデックスが含まれていることを確認してください。
2. [Datadog API キー][3]を生成します。
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
4. Restart Claude Code.

[1]: /ja/logs/log_configuration/
[2]: /ja/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Datadog Agent 経由で転送" %}}

1. [ログ構成][1]にすべてをキャッチする[インデックス][2]、または `service:claude-code` をカバーするインデックスが含まれていることを確認してください。
2. [Datadog Agent をインストールします][3]。
3. OpenTelemetry Collector を有効にするように Datadog Agent を構成します。
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
5. Claude Code を再起動します。

[1]: /ja/logs/log_configuration/
[2]: /ja/logs/log_configuration/indexes/
[3]: /ja/agent/?tab=Host-based
{{% /tab %}}
{{< /tabs >}}

Claude Code を再起動すると、メトリクス (使用量、コスト、レイテンシ、エラー) が数分以内に Agent Console に表示されます。

### Codex {#codex}

Codex を監視するには、[OpenAI Codex][5] インテグレーションをセットアップします。このインテグレーションにより、日々の使用量、クレジット、コードの帰属、およびレビューの分析情報が収集されます。

### ChatGPT Work {#chatgpt-work}

ChatGPT Work を監視するには、[OpenAI][12] インテグレーションをセットアップします。このインテグレーションにより、アクティビティ、トークン、および推定コストの分析情報が収集されます。

### Cursor {#cursor}

Cursor を監視するには、Datadog Extension for Cursor を使用して [Cursor][6] インテグレーションをセットアップします。このインテグレーションにより、支出に関するメトリクスとユーザー分析情報が 1 日 1 回収集されます。

### GitHub Copilot {#github-copilot}

GitHub Copilot を監視するには、[GitHub Copilot][7] インテグレーションをセットアップします。このインテグレーションにより、支出に関するメトリクスとユーザー分析情報が 1 日 1 回収集されます。

### Microsoft Copilot 365 {#microsoft-copilot-365}

{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Microsoft Copilot 365 のサポートはプレビュー版です。アクセスをリクエストするには、Datadog アカウントチームにお問い合わせください。
{{< /callout >}}

Microsoft Copilot インテグレーションは、Microsoft 365 Copilot の日々の導入データとメタデータのみのインタラクション分析情報を収集します。

### Trajectory を使用したその他の coding agent および desktop agent {#other-coding-and-desktop-agents-with-trajectory}

[Trajectory][8] は、Claude Code、Claude Desktop、Codex CLI、Cursor、Cline、Windsurf、Zed など、30 以上の coding agent と desktop agent からセッションをキャプチャして Datadog に送信するオープンソースツールです。完全なリストとバージョン要件については、[サポートされているクライアント][9]をご覧ください。

Trajectory のセッションデータは、Agent Console の {{< ui >}}Tasks{{< /ui >}}、{{< ui >}}Skills{{< /ui >}}、{{< ui >}}Tools{{< /ui >}}、および {{< ui >}}Sessions{{< /ui >}} ビューの基盤となります。

{{< tabs >}}
{{% tab "個々の開発者" %}}

インストーラーを実行して、現在のユーザー用に Trajectory をインストールします。

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh)
```

インストーラーはお使いのプラットフォーム用の最新の Trajectory リリースをダウンロードし、`trajectory setup` を実行して、検出された coding agent を接続します。プロンプトが表示されたら、[Datadog API キー][1]を入力してデータを Datadog に送信します。

後から Datadog の送信先を構成するには、以下を実行します。

```bash
trajectory publish destination configure
```

Trajectory をアップグレードするには、インストーラーを再実行します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "管理対象フリート (MDM)" %}}

Jamf Pro や Microsoft Intune などの MDM または UEM 製品を使用して Trajectory を開発者のコンピューターに展開するには、[Managed Endpoint Administrator Guide][1] を参照してください。このガイドでは、パッケージの準備、ポリシーの展開、coding agent の選択、および検証について説明しています。

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### インテグレーションのリクエスト {#request-an-integration}

監視対象のツールが一覧にない場合は、{{< ui >}}Set up your AI tools{{< /ui >}} ページで {{< ui >}}Request an Integration{{< /ui >}} をクリックします。

## 生産性ツールの接続 {#connect-productivity-tools}

必要に応じて生産性ツールを接続すると、Agent Console でマージされたプルリクエスト、マージまでの時間、プルリクエストあたりのコスト、および解決された課題を AI 支出と並べて表示できます。

- **GitHub**: [GitHub][10] インテグレーションをセットアップして、プルリクエストデータを収集します。
- **Jira**: [Jira][11] インテグレーションをセットアップして、課題データを収集します。

## ID のマッピング {#map-identities}

各 AI ツールは、たとえばメールアドレス、GitHub ログイン、Microsoft ユーザープリンシパル名 (UPN) など、それぞれ異なる方法でユーザーを識別します。すべてのツールからの使用状況と支出が適切な人物に紐付けられるよう、ID マッピングテーブルをアップロードします。

1. Agent Console で、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Identity Mapping{{< /ui >}} に移動します。
2. 1 人につき 1 行で、次の列を含む CSV ファイルを用意します。

   | 列 | 要件 |
   |--------|-------------|
   | `email` | 必須 |
   | `github_login` | GitHub を使用する場合は必須 |
   | `microsoft_upn` | オプション |
   | `jira_account_id` | オプション |
   | `datadog_handle` | オプション |

   複数のメールエイリアス、GitHub ログイン、または Jira アカウント ID は、セミコロンで区切ります。最初のメールアドレスが正規のメールアドレスです。

   プライマリ識別子として、たとえば `email` のように一意の値を持つ列を選択します。この目的のために、従業員 ID などの独自の列を追加することもできます。
3. CSV ファイル (最大 10 MiB) をアップロードし、マッピングをプレビューして保存します。

{{< img src="/ai_agents_console/agent_console_identity_mapping.png" alt="必須およびオプションの CSV 列と CSV アップロード領域が表示された ID マッピングのセットアップダイアログ" style="width:100%;" >}}

## データを検証する {#validate-your-data}

ツールを接続した後、[Agent Console][1] を開き、接続された各インテグレーションが {{< ui >}}Overview{{< /ui >}} タブでアクティブと表示されていることを確認します。ほとんどのインテグレーションは 1 日 1 回データを収集するため、データが表示されるまでに最大 24 時間かかる場合があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://app.datadoghq.com/organization-settings/roles
[3]: /ja/integrations/anthropic-usage-and-costs/
[4]: https://code.claude.com/docs/en/server-managed-settings
[5]: /ja/integrations/openai-codex/
[6]: /ja/integrations/cursor/?tab=datadogextensionforcursor
[7]: /ja/integrations/github-copilot/
[8]: https://github.com/datadog-labs/trajectory
[9]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[10]: /ja/integrations/github/
[11]: /ja/integrations/jira/
[12]: /ja/integrations/openai/?tab=apikey