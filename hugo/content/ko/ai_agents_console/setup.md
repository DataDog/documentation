---
description: 코딩 에이전트, 지식 에이전트, 생산성 도구를 Datadog Agent Console에 연결하고 도구 전반에서 사용자 ID를
  매핑하세요.
further_reading:
- link: /ai_agents_console/
  tag: 설명서
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: 설명서
  text: Anthropic 사용량 및 비용 통합
- link: /integrations/openai-codex/
  tag: 설명서
  text: OpenAI Codex 통합
- link: /integrations/openai/
  tag: 설명서
  text: OpenAI 통합
- link: /integrations/cursor/
  tag: 설명서
  text: Cursor 통합
- link: https://github.com/datadog-labs/trajectory
  tag: 소스 코드
  text: Trajectory
title: Agent Console 설정
---
{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Agent Console은 현재 미리 보기로 제공되고 있으며 모든 Datadog 고객이 사용할 수 있습니다.
{{< /callout >}}

[Agent Console][1]을 설정하려면 모니터링할 AI 도구를 연결하고, 선택적으로 생산성 도구를 연결한 다음 도구 전반에서 사용자 ID를 매핑하세요. Agent Console {{< ui >}}Settings{{< /ui >}}의 {{< ui >}}Setup{{< /ui >}} 페이지는 각 단계의 진행 상황을 추적합니다.

{{< img src="/ai_agents_console/setup_agent_console.png" alt="데이터 검증, ID 매핑, 첫 번째 에이전트 연결, 생산성 도구 연결 단계와 진행률 표시줄이 있는 Agent Console Settings Setup 페이지" style="width:100%;" >}}

## 권한 {#permissions}

Agent Console 액세스는 다음 역할 권한에 의해 제어됩니다. [Organization Settings > Roles][2]에서 해당 권한을 역할에 할당하세요.

| 권한 | 설명 |
|------------|-------------|
| `agent_console_read` | Overview, My Usage, Usage, Settings를 포함한 Agent Console을 확인합니다. 이 권한이 없는 사용자는 Agent Console을 열 수 없습니다. |
| `agent_console_write` | ID 매핑 및 통합 설정과 같은 Agent Console 구성을 변경합니다. |

## AI 도구 연결 {#connect-ai-tools}

Agent Console을 처음 열 때 나타나는 {{< ui >}}Set up your AI tools{{< /ui >}} 페이지에서 연결할 AI 도구를 선택하세요. 데이터를 확인하려면 최소 하나의 도구를 연결해야 합니다. 나중에 도구를 더 추가할 수 있습니다.

{{< img src="/ai_agents_console/agent_console_onboarding.png" alt="Trajectory, Cursor, Anthropic Products, GitHub Copilot, Codex, Microsoft Copilot, ChatGPT Work, Another Integration 카드가 있는 AI 도구 설정 페이지" style="width:100%;" >}}

### Anthropic 제품 {#anthropic-products}

Claude Code, Claude Chat, Claude Cowork 및 Claude Design을 모니터링하려면 [Anthropic 사용량 및 비용][3] 통합을 설정하세요. 이 통합은 각 Claude 제품에 대한 일일 지출 및 사용자 분석 데이터를 수집합니다.

Anthropic 사용량 및 비용 통합은 Claude Team 플랜을 지원하지 않습니다. 조직에서 Team 플랜을 사용하는 경우, 대신 [OpenTelemetry](#claude-code-with-opentelemetry)를 사용하여 Claude Code 텔레메트리 데이터를 Datadog으로 전송하세요.

### OpenTelemetry를 사용하는 Claude Code {#claude-code-with-opentelemetry}

OpenTelemetry(OTLP)를 사용하여 Claude Code 텔레메트리 데이터를 Datadog으로 직접 전송하세요. 이 방식으로 수집된 데이터는 Agent Console의 {{< ui >}}Claude Code (OTel){{< /ui >}} 카드에 표시됩니다.

조직 전체에서 Claude Code에 대한 Agent Console을 설정하려면 IT 팀이 MDM(모바일 기기 관리) 시스템 또는 [서버 관리 설정][4]을 사용하여 모든 관리 기기에 Claude Code 설정 파일을 배포할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog으로 직접 전송" %}}

1. [로그 구성][1]에 모든 로그를 포괄하는 [인덱스][2] 또는 `service:claude-code`에 해당하는 인덱스가 포함되어 있는지 확인합니다.
2. [Datadog API 키][3]를 생성합니다.
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
4. Restart Claude Code.

[1]: /ko/logs/log_configuration/
[2]: /ko/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Datadog Agent를 통해 전달" %}}

1. [로그 구성][1]에 모든 로그를 포괄하는 [인덱스][2] 또는 `service:claude-code`에 해당하는 인덱스가 포함되어 있는지 확인합니다.
2. [Datadog Agent를 설치][3]합니다.
3. OpenTelemetry Collector를 활성화하도록 Datadog Agent를 구성합니다.
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
5. Claude Code를 재시작합니다.

[1]: /ko/logs/log_configuration/
[2]: /ko/logs/log_configuration/indexes/
[3]: /ko/agent/?tab=Host-based
{{% /tab %}}
{{< /tabs >}}

Claude Code를 다시 시작하면 몇 분 내에 Agent Console에 메트릭(사용량, 비용, 지연 시간, 오류)이 표시됩니다.

### Codex {#codex}

Codex를 모니터링하려면 [OpenAI Codex][5] 통합을 설정하세요. 이 통합은 일일 사용량, 크레딧, 코드 기여도 및 검토 분석을 수집합니다.

### ChatGPT Work {#chatgpt-work}

ChatGPT Work를 모니터링하려면 [OpenAI][12] 통합을 설정하세요. 이 통합은 활동, 토큰 및 예상 비용 분석을 수집합니다.

### Cursor {#cursor}

Cursor를 모니터링하려면 Cursor용 Datadog Extension을 사용하여 [Cursor][6] 통합을 설정하세요. 이 통합은 하루에 한 번 지출 메트릭과 사용자 분석 데이터를 수집합니다.

### GitHub Copilot {#github-copilot}

GitHub Copilot을 모니터링하려면 [GitHub Copilot][7] 통합을 설정합니다. 이 통합은 하루에 한 번 지출 메트릭과 사용자 분석 데이터를 수집합니다.

### Microsoft Copilot 365 {#microsoft-copilot-365}

{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Microsoft Copilot 365 지원은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 Datadog 계정 팀에 문의하세요.
{{< /callout >}}

Microsoft Copilot 통합은 일일 Microsoft 365 Copilot 도입 데이터와 메타데이터 전용 상호 작용 분석 데이터를 수집합니다.

### Trajectory를 사용하는 기타 코딩 및 데스크톱 에이전트 {#other-coding-and-desktop-agents-with-trajectory}

[Trajectory][8]는 Claude Code, Claude Desktop, Codex CLI, Cursor, Cline, Windsurf, Zed 등 30개 이상의 코딩 및 데스크톱 에이전트에서 세션을 캡처하여 Datadog으로 전송하는 오픈 소스 도구입니다. 전체 목록 및 버전 요구 사항은 [지원되는 클라이언트][9]를 참조하세요.

Trajectory 세션 데이터는 Agent Console의 {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} 및 {{< ui >}}Sessions{{< /ui >}} 뷰에 사용됩니다.

{{< tabs >}}
{{% tab "개별 개발자" %}}

설치 프로그램을 실행하여 현재 사용자를 위해 Trajectory를 설치하세요.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh)
```

설치 프로그램은 플랫폼에 맞는 최신 Trajectory 릴리스를 다운로드하고 `trajectory setup`을 실행한 다음, 발견된 코딩 에이전트를 연결합니다. 메시지가 표시되면 [Datadog API 키][1]를 입력하여 Datadog으로 데이터를 전송하세요.

나중에 Datadog 대상을 구성하려면 다음을 실행합니다.

```bash
trajectory publish destination configure
```

Trajectory를 업그레이드하려면 설치 프로그램을 다시 실행합니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "관리형 플릿(MDM)" %}}

Jamf Pro 또는 Microsoft Intune과 같은 MDM 또는 UEM 제품을 사용하여 개발자 컴퓨터에 Trajectory를 배포하려면 [관리형 엔드포인트 관리자 가이드][1]를 따르세요. 이 가이드에서는 패키지 준비, 정책 배포, 코딩 에이전트 선택 및 확인 과정을 다룹니다.

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### 통합 요청 {#request-an-integration}

모니터링하려는 도구가 목록에 없으면 {{< ui >}}Set up your AI tools{{< /ui >}} 페이지에서 {{< ui >}}Request an Integration{{< /ui >}}을 클릭합니다.

## 생산성 도구 연결 {#connect-productivity-tools}

선택적으로 생산성 도구를 연결하면 Agent Console에서 AI 비용과 함께 병합된 풀 리퀘스트, 병합까지 걸린 시간, 풀 리퀘스트당 비용 및 해결된 이슈를 표시할 수 있습니다.

- **GitHub**: [GitHub][10] 통합을 설정하여 풀 리퀘스트 데이터를 수집합니다.
- **Jira**: [Jira][11] 통합을 설정하여 이슈 데이터를 수집합니다.

## ID 매핑 {#map-identities}

각 AI 도구는 이메일 주소, GitHub 로그인 또는 Microsoft 사용자 주체 이름(UPN) 등 서로 다른 방식으로 사용자를 식별합니다. 모든 도구의 사용량과 비용이 올바른 사람에게 귀속되도록 ID 매핑 표를 업로드하세요.

1. Agent Console에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Identity Mapping{{< /ui >}}으로 이동합니다.
2. 사람당 한 행과 다음 열이 포함된 CSV 파일을 준비합니다.

   | 열 | 요구 사항 |
   |--------|-------------|
   | `email` | 필수 |
   | `github_login` | GitHub를 사용하는 경우 필수 |
   | `microsoft_upn` | 선택 사항 |
   | `jira_account_id` | 선택 사항 |
   | `datadog_handle` | 선택 사항 |

   여러 이메일 별칭, GitHub 로그인 또는 Jira 계정 ID는 세미콜론으로 구분합니다. 첫 번째 이메일이 표준 이메일입니다.

   `email`과 같은 고유한 값이 있는 열을 기본 식별자로 선택합니다. 직원 ID와 같이 이 목적을 위한 열을 직접 추가할 수도 있습니다.
3. CSV 파일을 업로드하고(최대 10 MiB), 매핑을 미리 본 다음 저장합니다.

{{< img src="/ai_agents_console/agent_console_identity_mapping.png" alt="필수 및 선택 CSV 열과 CSV 업로드 영역을 보여주는 ID 매핑 설정 대화 상자" style="width:100%;" >}}

## 데이터 검증{#validate-your-data}

도구를 연결한 후 [Agent Console][1]을 열고 연결된 각 통합이 {{< ui >}}Overview{{< /ui >}} 탭에서 활성 상태로 표시되는지 검사합니다. 대부분의 통합은 하루에 한 번 데이터를 수집하므로 데이터가 표시되기까지 최대 24시간이 걸릴 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://app.datadoghq.com/organization-settings/roles
[3]: /ko/integrations/anthropic-usage-and-costs/
[4]: https://code.claude.com/docs/en/server-managed-settings
[5]: /ko/integrations/openai-codex/
[6]: /ko/integrations/cursor/?tab=datadogextensionforcursor
[7]: /ko/integrations/github-copilot/
[8]: https://github.com/datadog-labs/trajectory
[9]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[10]: /ko/integrations/github/
[11]: /ko/integrations/jira/
[12]: /ko/integrations/openai/?tab=apikey