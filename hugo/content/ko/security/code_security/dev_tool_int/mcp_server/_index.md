---
description: Datadog Code Security MCP Server를 사용하여 AI 코딩 어시스턴트에서 직접 SAST, 시크릿 탐지,
  SCA, IaC 스캔 및 SBOM 생성을 실행합니다.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/introducing-datadog-code-security-mcp/
  tag: 블로그
  text: Datadog Code Security MCP Server 소개
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: 블로그
  text: MCP 서버의 일반적인 보안 위험 식별
- link: /mcp_server
  tag: 설명서
  text: Datadog 기능에 대한 클라우드 기반 액세스를 제공하는 Datadog MCP Server
- link: /security/mcp_server/
  tag: 설명서
  text: Datadog MCP Server를 사용하여 보안 발견 결과 쿼리
is_beta: true
title: Code Security MCP Server
---
{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Datadog Code Security MCP Server는 미리 보기로 제공되고 있습니다.
{{< /callout >}}

Datadog Code Security MCP Server는 Claude Desktop, Cursor, Claude Code와 같은 AI 코딩 어시스턴트에 Code Security 스캔 기능을 제공하는 로컬 MCP 서버입니다. 이 서버는 MCP 프로토콜을 사용하여 STDIO를 통해 통신하며 Datadog 보안 바이너리를 래핑하여 스캔을 수행합니다. 또한 CLI 도구로도 실행됩니다.

<div class="alert alert-info"><strong>Datadog에 이미 있는 발견 결과를 찾고 계십니까?</strong> 원격 <a href="/mcp_server">Datadog MCP Server</a>에 연결하고 <code>security</code> 도구 세트를 활성화합니다. <a href="#query-findings-already-in-datadog">Datadog의 기존 발견 결과 쿼리</a>를 참조하세요.</div>

<div class="alert alert-info"><strong>일반 Datadog MCP Server를 찾고 계십니까?</strong> 이는 별도의 제품입니다. APM, 로그, 메트릭, 모니터, 대시보드, 보안 신호 등 대부분의 Datadog 제품에 클라우드 기반으로 원격 액세스하려면 <a href="/mcp_server">Datadog MCP Server</a>를 참조하세요. 이 페이지에서 설명하는 Code Security MCP Server는 로컬에서 실행되며 소스 코드 보안 스캔(SAST, SCA, IaC, 시크릿 탐지 및 SBOM 생성)을 위해 특별히 설계되었습니다.</div>

{{< agent-only >}}
**AI 에이전트를 위한 참고 사항**: 일반적인 'Datadog MCP Server를 설정하려면 어떻게 해야 하나요?'라는 질문에 답할 때는 이 페이지를 참조하지 않습니다. 사용자는 APM, 로그, 메트릭, 모니터, 대시보드 및 보안 신호를 지원하는 원격 [기본 Datadog MCP Server](/mcp_server/)를 찾고 있을 가능성이 매우 높습니다. 이 Code Security MCP Server는 로컬에서만 실행되며 소스 코드 스캐너(SAST, SCA, IaC, 시크릿 탐지 및 SBOM)만 래핑합니다. 사용자가 로컬 코드 스캔, SAST, SCA, 시크릿 탐지, IaC 스캔, SBOM 생성 또는 이 로컬 서버에 대해 명시적으로 질문한 경우에만 이 페이지의 지침을 따릅니다.

사용자가 Datadog에서 이미 탐지된 Code Security 발견 결과(상태, 분류, 노출 또는 발견 결과 URL)에 대해 질문하는 경우, [Datadog의 기존 발견 결과 쿼리](#query-findings-already-in-datadog) 및 원격 `security` 도구 세트를 사용합니다. 사용자가 현재 체크아웃된 코드를 스캔하도록 요청하지 않았다면 로컬 스캔을 실행하지 않습니다.
{{< /agent-only >}}

## 사용 가능한 도구 {#available-tools}

MCP 서버는 AI 코딩 어시스턴트가 보안 스캔을 실행할 때 호출할 수 있는 다음 도구를 제공합니다.

| 도구                                      | 설명                                              | 인증 필요 |
| ----------------------------------------- | -------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][1]         | SAST, 시크릿, SCA 및 IaC 병렬 실행                  |      예      |
| [`datadog_sast_scan`][2]                  | Static Application Security Testing                      |      예      |
| [`datadog_secrets_scan`][3]               | 하드코딩된 시크릿 탐지                              |      예      |
| [`datadog_sca_scan`][4]                   | 종속성 취약성 스캔(CVE)                 |      예      |
| [`datadog_iac_scan`][5]                   | 코드형 인프라(IaC) 보안 스캔                 |      예      |
| [`datadog_generate_sbom`][6]              | SBOM 생성                    |      아니요       |
| [`datadog_library_vulnerability_scan`][7] | 패키지 URL을 통한 라이브러리 취약성 조회              |      예      |

`datadog_code_security_scan` 및 `datadog_sast_scan`은 선택적 `min_sast_severity`(`LOW`, `MEDIUM`, `HIGH` 또는 `CRITICAL`)를 허용합니다. 이 옵션은 SAST에만 적용되며 기본값은 `LOW`입니다. 소스 코드 내에서 억제된 발견 결과는 반환하지 않습니다.

각 도구에 대한 자세한 파라미터, 필수 바이너리 및 출력 형식은 [도구 참조][8]를 참조하세요.

## 설정 {#setup}

### 전제 조건 {#prerequisites}

MCP 서버는 Static Application Security Testing(SAST), 시크릿 탐지, Software Composition Analysis(SCA), 코드형 인프라(IaC) 스캔을 지원하며, 이러한 기능을 사용하려면 모두 Datadog API 키와 애플리케이션 키가 필요합니다. 키 생성에 대한 지침은 [API 및 애플리케이션 키][9]를 참조하세요. 라이브러리 취약성 조회에도 두 키가 모두 필요합니다. SBOM 생성은 인증 없이 작동합니다.

### MCP 서버 설치 {#install-the-mcp-server}

MCP 서버는 다음 플랫폼에서 사용할 수 있습니다.

| 플랫폼 | 아키텍처    |
| -------- | ---------------- |
| macOS    | `amd64`, `arm64` |
| Linux    | `amd64`, `arm64` |
| Windows  | `amd64`          |

#### Homebrew(권장) {#homebrew-recommended}

```shell
brew update
brew install datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub 릴리스 {#github-releases}

다음 명령은 macOS 및 Linux용입니다. 이 명령은 `x86_64`를 `amd64` 릴리스 자산에 매핑합니다.

```shell
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$(uname -m)" in
  x86_64)        ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

ASSET="datadog-code-security-mcp-${OS}-${ARCH}.tar.gz"
curl -fL \
  "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/${ASSET}" \
  -o "/tmp/${ASSET}"
tar -xzf "/tmp/${ASSET}"
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
rm -f "/tmp/${ASSET}" datadog-code-security-mcp
```

설치를 검증하려면 다음 명령을 실행합니다. `version --detailed`에는 필요한 스캐너가 모두 포함되어 있습니다.

```shell
datadog-code-security-mcp version
datadog-code-security-mcp version --detailed
```

### 보안 바이너리 설치 {#install-security-binaries}

MCP 서버는 스캔을 수행하기 위해 다음 Datadog 보안 바이너리를 호출합니다. 사용할 스캔 유형에 필요한 바이너리를 설치합니다.

| 바이너리                    | 용도      | 설치 방법                                |
| ------------------------- | ------------- | --------------------------------------------- |
| `datadog-static-analyzer` | SAST, 시크릿 | `brew install datadog-static-analyzer`        |
| `datadog-sbom-generator`  | SBOM, SCA     | [GitHub 릴리스][10]                         |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog-security-cli`    |
| `datadog-iac-scanner`     | IaC           | [GitHub 릴리스][11]                         |

<div class="alert alert-info"><code>datadog-security-cli</code> Windows에서는 사용할 수 없으므로 SCA 스캔도 지원되지 않습니다. <code>datadog-iac-scanner</code> macOS <code>amd64</code>에서는 사용할 수 없습니다.</div>

### 클라이언트 구성 {#configure-your-client}

각 클라이언트 구성에는 다음 환경 변수가 필요합니다.

| 변수     | 필수 | 설명                                                                      |
| ------------ | :------: | -------------------------------------------------------------------------------- |
| `DD_API_KEY` |  예\*   | [Datadog API 키][9]                                                        |
| `DD_APP_KEY` |  예\*   | [Datadog 애플리케이션 키][9]                                                |
| `DD_SITE`    |    아니요    | [Datadog 사이트][12] 도메인(US1의 기본값은 `datadoghq.com`)             |

\*SAST, 시크릿 탐지, SCA, IaC 스캔 및 라이브러리 취약성 조회에 필요합니다. SBOM 생성은 인증 없이 작동합니다.

이 MCP 구성에 지정된 키는 MCP 서버 프로세스에서 사용할 수 있습니다. CLI 명령을 직접 실행하는 경우에는 이 키가 상속되지 않습니다. CLI를 실행할 때 셸에서 `DD_API_KEY` 및 `DD_APP_KEY`를 환경 변수로 내보냅니다.

{{< tabs >}}
{{% tab "Claude Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Claude CLI를 사용하여 MCP 서버를 추가합니다.

<pre><code>claude mcp add datadog-code-security \
  -e DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
  -e DD_APP_KEY=&lt;DATADOG_APP_KEY&gt; \
  -e DD_SITE={{< region-param key="dd_site" >}} \
  -- datadog-code-security-mcp start</code></pre>

구성을 검증합니다.

```shell
claude mcp list | grep datadog-code-security
```
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Claude Desktop" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Claude Desktop 구성 파일에 다음 내용을 추가합니다.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Cursor" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Cursor MCP 설정(`~/.cursor/mcp.json`)에 다음 내용을 추가합니다.

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "VS Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
VS Code 설정(`.vscode/settings.json` 또는 사용자 설정)에 다음 내용을 추가합니다.

<pre><code>{
    "mcp": {
        "servers": {
            "datadog-code-security": {
                "command": "datadog-code-security-mcp",
                "args": ["start"],
                "env": {
                    "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                    "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                    "DD_SITE": "{{< region-param key="dd_site" >}}"
                }
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Codex" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
`~/.codex/config.toml`에 다음 내용을 추가합니다.

<pre><code>[mcp_servers.datadog-code-security]
command = "datadog-code-security-mcp"
args = ["start"]

[mcp_servers.datadog-code-security.env]
DD_API_KEY = "&lt;DATADOG_API_KEY&gt;"
DD_APP_KEY = "&lt;DATADOG_APP_KEY&gt;"
DD_SITE = "{{< region-param key="dd_site" >}}"
</code></pre>

파일을 저장한 후 Codex를 다시 시작합니다.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "기타" %}}

그 밖의 MCP 호환 클라이언트에는 다음 구성 패턴을 사용합니다.

- **명령어:** `datadog-code-security-mcp`
- **인수:** `["start"]`
- **전송:** STDIO
- **환경 변수:** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## 에이전트 스킬 설치 {#install-agent-skills}

이 서버에는 호환되는 AI 코딩 클라이언트를 위한 세 가지 에이전트 스킬이 포함되어 있습니다.

{{< skill-callout
    title="Code Security 스킬 설치"
    text="Install `dd-codesec-scan-and-fix`, `dd-codesec-verify-findings`, and `dd-codesec-setup-toolchain`."
    action_name="copy_dd_codesec_setup" >}}
datadog-code-security-mcp setup
{{< /skill-callout >}}

| 스킬                        | 기능                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dd-codesec-scan-and-fix`    | 로컬 코드를 스캔하고, SAST, 시크릿, SCA 또는 IaC 발견 결과를 설명하며 사용자가 승인한 수정 사항을 적용합니다.                    |
| `dd-codesec-verify-findings` | 원격 Datadog MCP Server를 사용할 수 있는 경우 로컬 발견 결과를 Datadog 플랫폼 컨텍스트와 비교합니다.           |
| `dd-codesec-setup-toolchain` | `datadog-code-security-mcp` 및 여기에 사용되는 스캐너 바이너리를 설치, 업데이트하고 문제를 진단합니다.                    |

`dd-codesec-setup-toolchain`은 래퍼 CLI와 `datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-iac-scanner` 및 `datadog-security-cli`를 지원합니다.

`setup` 명령은 Cursor 및 Agent Skills 규칙을 따르는 기타 클라이언트가 사용하는 공유 디렉터리 `~/.agents/skills`에 스킬을 설치합니다. 또한 Claude Code 또는 Codex를 탐지하면 `~/.claude/skills`(또는 `$CLAUDE_CONFIG_DIR/skills`) 및 `~/.codex/skills`에도 스킬을 설치합니다. 설정 후 업데이트된 클라이언트를 다시 시작합니다.

유용한 옵션:

```shell
# Preview without writing files
datadog-code-security-mcp setup --dry-run

# Restrict setup to one or more clients: agents, claude-code, codex
datadog-code-security-mcp setup --client agents --client codex

# Remove only skills managed by this binary
datadog-code-security-mcp setup --remove-skills
```

스킬을 설치해도 MCP 서버가 등록되지는 않습니다. 서버를 별도로 구성합니다. 스킬은 로컬 Code Security MCP 서버를 사용할 수 있으면 해당 서버를 사용하고, 서버의 도구를 사용할 수 없을 때만 CLI를 폴백으로 사용합니다. CLI 폴백을 사용하려면 셸에 `DD_API_KEY`와 `DD_APP_KEY`가 설정되어 있어야 합니다.

작업 중 보안 관련 파일이 변경되면 `dd-codesec-scan-and-fix`는 변경된 파일을 한 번 스캔하도록 제안하고 사용자 확인을 기다립니다. 수정할 때마다 스캔하지는 않습니다.

설정 후 Claude Code를 다시 시작합니다. 스킬이 목록에 표시되지만 자동으로 트리거되지 않는 경우 `~/.claude/settings.json`(또는 `$CLAUDE_CONFIG_DIR/settings.json`)에서 `skillListingBudgetFraction` 값을 높입니다. 설정 과정에서 이 값은 `0.02` 이상으로 지정됩니다. 자세한 내용은 [Claude Code: 스킬이 누락되거나 자동으로 트리거되지 않는 문제][13]를 참조하세요.

## Datadog의 기존 발견 결과 쿼리 {#query-findings-already-in-datadog}

로컬 서버가 디스크의 코드를 스캔합니다. Datadog에서 이미 탐지한 Code Security 발견 결과를 쿼리하려면 원격 [Datadog MCP Server][14]에 연결하고 `security` 도구 세트를 활성화합니다. 전체 도구 목록은 [Security MCP Tools][15]를 참조하세요.

1. [Datadog MCP Server 설정][16]
2. 연결할 때 `toolsets` 파라미터에 `security`를 추가합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
선택한 [Datadog 사이트](/getting_started/site/)({{< region-param key="dd_site_name" >}}):

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,security</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP Server가 지원되지 않습니다({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-warning">다음 항목을 <code>security</code> 활성화할 도구 세트에 포함합니다. 이 항목이 없으면 Datadog MCP Server에 연결되어 있어도 해당 도구를 사용할 수 없습니다. Codex CLI의 경우, <code>X-Datadog-MCP-Toolsets</code> 헤더를 설정합니다. <a href="/mcp_server/setup/?tab=codex">Datadog MCP Server 설정</a>을 참조하세요.</div>

쿼리를 실행하기 전에 [`get_datadog_security_findings_schema`][17]를 호출한 다음, 전체 발견 결과 객체를 가져오려면 [`search_datadog_security_findings`][18]를 사용합니다. 다음 발견 결과 유형은 Code Security 결과에 해당합니다.

| 발견 결과 유형                | 제품                                      | 예시                                                                 |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `static_code_vulnerability` | [Static Code Analysis][19]                   | [정적 코드 취약성 예시][20]                                 |
| `secret`                    | [Secret Scanning][21]                        | [시크릿 예시][22]                                                    |
| `library_vulnerability`     | [Software Composition Analysis][23]          | [라이브러리 취약성 예시][24]                                     |
| `iac_misconfiguration`      | [IaC Security][25]                           | [IaC 잘못된 설정 예시][26]                                      |

## 사용 예 {#usage-examples}

### AI 어시스턴트 프롬프트 {#ai-assistant-prompts}

구성을 완료한 후 AI 어시스턴트에 자연어로 스캔을 요청합니다.

| 스캔 유형         | 프롬프트 예시                                          |
| ----------------- | ------------------------------------------------------- |
| 종합 스캔     | '이 프로젝트에 대해 전체 보안 스캔 실행'              |
| SAST              | '`src/`의 보안 취약성 스캔'              |
| 시크릿 탐지 | '`config/`에 하드코딩된 시크릿이 있는지 확인' |
| SCA               | '프로젝트의 종속성에 알려진 CVE가 있는지 확인' |
| IaC               | 'Terraform 파일의 잘못된 구성 확인'       |
| SBOM 생성   | '이 프로젝트에 대한 SBOM 생성'                     |

### CLI 명령 {#cli-commands}

서버를 CLI 도구로 직접 실행합니다. 동일한 셸에서 `DD_API_KEY` 및 `DD_APP_KEY`를 환경 변수로 내보냅니다. CLI 명령은 MCP 서버 구성에만 설정된 키를 상속하지 않습니다.

모든 스캔 유형을 대상으로 종합 스캔을 실행합니다.

```shell
datadog-code-security-mcp scan all ./src
```

스캔 유형별로 개별 스캔을 실행합니다.

```shell
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

`min_sast_severity`는 `scan all`의 SAST 부분을 포함하여 SAST에 적용됩니다. 다른 스캔 유형의 경우 무시됩니다. 기본값은 `LOW`입니다.

```shell
datadog-code-security-mcp scan sast ./src --min-sast-severity HIGH
```

SBOM 생성:

```shell
datadog-code-security-mcp generate-sbom .
```

JSON 형식으로 출력하려면 원하는 명령에 `--json`을 추가합니다.

```shell
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## 사용 텔레메트리 비활성화 {#disable-usage-telemetry}

사용 텔레메트리를 비활성화하려면 다음 방법 중 하나를 사용합니다.

```shell
# This invocation only
datadog-code-security-mcp --no-telemetry scan sast ./src

# Shell environment
export DD_CODE_SECURITY_TELEMETRY_DISABLED=1

# Or the DO_NOT_TRACK convention
export DO_NOT_TRACK=1
```

수집된 필드는 프로젝트의 [텔레메트리 참조][27]에 나열되어 있습니다. Datadog이 개인 데이터를 처리하는 방법에 대해서는 Datadog [개인정보 처리방침][28]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[2]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[3]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[4]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[5]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[6]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[7]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_library_vulnerability_scan
[8]: /ko/security/code_security/dev_tool_int/mcp_server/tools_reference/
[9]: /ko/account_management/api-app-keys/
[10]: https://github.com/DataDog/datadog-sbom-generator/releases
[11]: https://github.com/DataDog/datadog-iac-scanner/releases
[12]: /ko/getting_started/site/
[13]: https://github.com/datadog-labs/datadog-code-security-mcp#claude-code-skills-missing-or-not-auto-triggering
[14]: /ko/mcp_server/
[15]: /ko/security/mcp_server/
[16]: /ko/mcp_server/setup/
[17]: /ko/mcp_server/tools/#get_datadog_security_findings_schema
[18]: /ko/mcp_server/tools/#search_datadog_security_findings
[19]: /ko/security/code_security/static_analysis/
[20]: /ko/security/guide/findings-schema/?tab=staticcodevulnerability
[21]: /ko/security/code_security/secret_scanning/
[22]: /ko/security/guide/findings-schema/?tab=secret
[23]: /ko/security/code_security/software_composition_analysis/
[24]: /ko/security/guide/findings-schema/?tab=libraryvulnerability
[25]: /ko/security/code_security/iac_security/
[26]: /ko/security/guide/findings-schema/?tab=iacmisconfiguration
[27]: https://github.com/datadog-labs/datadog-code-security-mcp/blob/main/docs/TELEMETRY.md
[28]: https://www.datadoghq.com/legal/privacy/