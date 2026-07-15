---
description: Pup 명령줄 인터페이스를 사용하여 터미널 또는 AI 에이전트 워크플로에서 Datadog의 API와 상호작용할 수 있습니다.
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Pup CLI 리포지토리
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: 전체 Pup CLI 문서
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: 명령 참조
- link: mcp_server/
  tag: 설명서
  text: Datadog MCP 서버
title: Pup CLI
---
## 개요 {#overview}

[Pup CLI][1]는 AI 에이전트가 Datadog의 관측 가능성 플랫폼에 접근할 수 있도록 하는 포괄적인 명령줄 인터페이스입니다. AI 에이전트 워크플로 및 자동화된 파이프라인에서 사용하기 위해 [Datadog의 API surface][9]를 노출합니다.

주요 기능:

- **자체적으로 탐색 가능한 명령**: 명령은 에이전트가 외부 문서 없이 탐색할 수 있도록 구조화되어 있습니다.
- **구조화된 출력**: 응답이 신뢰할 수 있는 구문 분석을 위해 JSON 및 YAML 형식으로 제공됩니다.
- **범위가 제한된 인증**: OAuth2 및 PKCE는 장기간 유효한 API 키를 사용하지 않고도 필요한 범위의 권한만 제공합니다.
- **폭넓은 제품 지원 범위**: Pup는 Monitors, Logs, Metrics, RUM, Security 등을 지원합니다.

<div class="alert alert-info">이 페이지는 Pup의 핵심 기능을 다룹니다. 전체 기능 및 명령 목록을 보려면 <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">Pup 리포지토리 문서</a>를 참조하세요.</div>

## 설치 {#installation}

### Homebrew(macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### 소스로 빌드 {#build-from-source}

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### 수동 다운로드 {#manual-download}

[최신 릴리스][2]에서 사전 빌드된 바이너리를 다운로드하세요.

## 사용 예 {#usage-examples}

{{< code-block lang="bash" >}}
# Log in to Datadog
pup auth login

# List monitors filtered by tag
pup monitors list --tags="team:api-platform"

# Search logs for errors in the last hour
pup logs search --query="status:error" --from="1h"

# Query CPU metrics
pup metrics query --query="avg:system.cpu.user{*}" --from="1h"

# Get dashboard details
pup dashboards get <DASHBOARD_ID>

# Delete a dashboard
pup dashboards delete <DASHBOARD_ID> --yes
{{< /code-block >}}

## 지원되는 제품 영역 {#supported-product-areas}

Pup은 대부분의 주요 Datadog 제품 영역을 지원합니다. 공식 제품별 명령 목록은 [명령 참조][3]를 참조하세요. 현재 빌드된 명령 목록을 확인하려면 `pup --help`(또는 기계 판독이 가능한 출력을 보려면 `pup agent schema`)를 실행하여 확인할 수 있습니다.

| 카테고리 | 예 |
|----------|----------|
| 핵심 관측 가능성 | 메트릭, 로그, 이벤트, RUM, APM, 트레이스 |
| 모니터링 및 경보 | 모니터링, 대시보드, SLO, Synthetics, 가동 중지, 워크플로 |
| 보안 및 규정 준수 | 보안 규칙, 시그널, 탐지 결과, 감사 로그, CSM 위협 |
| 인프라 및 클라우드 | 호스트, 태그, 컨테이너, 네트워크, AWS/GCP/Azure 통합 |
| 인시던트 및 운영 | 인시던트, 온콜, 케이스 관리, 오류 추적, 서비스 카탈로그 |
| CI/CD 및 개발 | CI Visibility, Test Optimization, DORA Metrics, Deployment Gates |
| 조직 및 액세스 | 사용자, API 키, 애플리케이션 키, 조직 |
| 플랫폼 및 구성 | 사용량 측정, 비용 관리, Feature Flag, Observability Pipelines |

## 에이전트 모드 {#agent-mode}

Pup이 AI 코딩 에이전트에 의해 호출되면 자동으로 에이전트 모드로 전환되어 머신이 처리하기에 최적화된 구조화된 JSON 응답을 반환합니다. 응답에는 메타데이터, 오류 세부 정보 및 힌트가 포함됩니다. 에이전트 모드는 확인 프롬프트를 자동으로 승인합니다.

[지원되는 코딩 에이전트][4]에 환경 변수가 설정되어 있으면 에이전트 모드가 자동으로 탐지됩니다. 또한 `--agent` 플래그를 사용하거나 `FORCE_AGENT_MODE=1`를 설정하여 명시적으로 활성화할 수 있습니다.

## 추가 기능 {#additional-features}

Pup은 AI 에이전트 워크플로에서 사용할 수 있는 추가 기능을 포함하고 있습니다. 자세한 내용은 아래 링크를 참조하세요.

- [**Runbooks**][5]: `pup runbooks`는 YAML로 정의된 운영 절차를 위한 로컬 실행 엔진으로, `pup`, 셸, HTTP 및 Datadog Workflow 단계들을 사용하여 여러 단계의 작업을 인코딩합니다.
- [**Agent 스킬**][6]: Pup에는 스킬과 도메인 에이전트가 이진 파일에 내장되어 있으며, `pup skills install`을 사용해 모든 AI 코딩 어시스턴트에 설치할 수 있습니다.
- [**ACP 서버**][7]: `pup acp serve`는 ACP 및 OpenAI 호환 프로토콜을 통해 코딩 도구를 Datadog Bits AI에 연결하는 로컬 AI 에이전트 서버를 실행합니다.

## 인증 {#authentication}

Pup는 OAuth2 및 API 키 인증 방법을 지원합니다. OAuth2가 권장되며, 브라우저를 통해 인증하려면 `pup auth login`을 실행하세요. OAuth2를 사용할 수 없는 경우, Pup은 API 키(`DD_API_KEY` 및 `DD_APP_KEY`)를 사용하도록 됩니다. 자세한 내용은 [인증 문서][8]를 참조하세요.

## 전역 플래그 {#global-flags}

| 플래그 | 설명 |
|------|-------------|
| `-o, --output` | 출력 형식(`json`, `table`, `yaml`). 기본값: `json` |
| `-y, --yes` | 파괴적인 작업에 대한 확인 프롬프트 건너뛰기 |
| `--agent` | 에이전트 모드 활성화 |
| `--no-agent` | 에이전트 모드 비활성화 |
| `--read-only` | 모든 쓰기 작업 차단(생성, 업데이트, 삭제) |
| `--org <org>` | 여러 계정을 사용하는 워크플로에서 명명된 조직 프로필 사용(설정하려면 `pup auth login --org` 실행)|
| `-h, --help` | 도움말 출력 |

## 환경 변수 {#environment-variables}

| 변수 | 설명 |
|----------|-------------|
| `DD_ACCESS_TOKEN` | [스테이트리스 인증][10]을 위한 Bearer 토큰 |
| `DD_API_KEY` | Datadog API 키(OAuth2 또는 `DD_ACCESS_TOKEN`을 사용하는 경우, 선택 사항임) |
| `DD_APP_KEY` | Datadog 애플리케이션 키(OAuth2 또는 `DD_ACCESS_TOKEN`을 사용하는 경우, 선택 사항임) |
| `DD_SITE` | Datadog 사이트(기본값: `datadoghq.com`) |
| `DD_AUTO_APPROVE` | 파괴적인 작업을 자동 승인(`true`/`false`) |
| `DD_TOKEN_STORAGE` | 토큰 스토리지 백엔드(`keychain` 또는 `file`, 기본값: 자동 탐지) |

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/pup
[2]: https://github.com/DataDog/pup/releases/latest
[3]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-mode
[5]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[6]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[7]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
[8]: https://github.com/DataDog/pup/blob/main/README.md#authentication
[9]: /ko/api/latest/
[10]: https://github.com/DataDog/pup#bearer-token-authentication-wasm--headless