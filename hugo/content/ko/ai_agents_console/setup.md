---
description: Claude Code, Cursor 및 GitHub Copilot의 통합을 설정하여 Datadog Agent Console에서
  코딩 에이전트 활동을 모니터링합니다.
further_reading:
- link: /ai_agents_console/
  tag: 설명서
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: 설명서
  text: Anthropic 사용량 및 비용 통합
- link: /integrations/cursor/
  tag: 설명서
  text: Cursor 통합
title: Agent Console 설정
---
{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Agent Console은 현재 미리 보기 버전으로 제공되며 모든 Datadog 고객이 사용할 수 있습니다.
{{< /callout >}}

모니터링하려는 각 코딩 에이전트에 대한 통합을 [Agent Console][1]에서 설정합니다.

## Claude Code {#claude-code}

### 옵션 1: Anthropic 사용량 및 비용 통합(추천) {#option-1-anthropic-usage-and-costs-integration-recommended}

Agent Console에서 Claude Code를 모니터링하려면 [Anthropic 사용량 및 비용][4] 통합을 설정합니다.

설정 후 [Agent Console][1]로 이동한 다음 {{< ui >}}Claude Code{{< /ui >}} 타일을 클릭하여 메트릭을 확인합니다.

### 옵션 2: OpenTelemetry(OTLP) {#option-2-opentelemetry-otlp}

다음 절차는 Claude Code가 OpenTelemetry 프로토콜(OTLP)을 사용하여 Datadog에 직접 텔레메트리를 전송하도록 구성합니다.

1. [로그 구성][6]에 모든 로그를 포괄하는 [인덱스][7] 또는 `service:claude-code`에 해당하는 인덱스가 포함되어 있는지 확인합니다.
2. [Datadog API 키][8]를 생성합니다.
3. Claude Code 설정 파일(예: `~/.claude/settings.json`)에 다음과 같은 환경 변수를 설정합니다.

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
4. Claude Code 설정 파일(예: `~/.claude/settings.json`)에 다음과 같은 환경 변수를 설정합니다.
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

   <div class="alert alert-info">조직 전체에서 Claude Code에 대한 Agent Console을 설정하려면 IT 팀이 MDM(모바일 기기 관리) 시스템 또는 <a href="https://code.claude.com/docs/en/server-managed-settings">서버 관리 설정</a>을 사용하여 모든 관리 기기에 Claude Code 설정 파일을 배포할 수 있습니다.</div>
5. Claude Code를 재시작합니다.

Claude Code를 재시작한 후 [Agent Console][1]로 이동하여 {{< ui >}}Claude Code{{< /ui >}} 타일을 클릭합니다. 몇 분 이내에 메트릭(사용량, 비용, 지연 시간, 오류)이 표시됩니다.

## Cursor {#cursor}

Agent Console에서 Cursor를 모니터링하려면 Cursor용 Datadog Extension을 사용하여 [Cursor][5] 통합을 설정합니다.

설정 후 [Agent Console][1]로 이동한 다음 {{< ui >}}Cursor{{< /ui >}} 타일을 클릭하여 메트릭을 확인합니다.

## GitHub Copilot {#github-copilot}

Agent Console에서 GitHub Copilot을 모니터링하려면 [GitHub Copilot][10] 통합을 설정합니다.

설정 후 [Agent Console][1]로 이동한 다음 {{< ui >}}GitHub Copilot{{< /ui >}} 타일을 클릭하여 메트릭을 확인합니다.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[4]: /ko/integrations/anthropic-usage-and-costs/
[5]: /ko/integrations/cursor/?tab=datadogextensionforcursor
[6]: /ko/logs/log_configuration/
[7]: /ko/logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /ko/agent/?tab=Host-based
[10]: /ko/integrations/github-copilot/