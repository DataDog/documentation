---
description: AI Setup CLI 또는 Datadog MCP Server를 사용하여 Datadog으로 애플리케이션을 계측하세요.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: 블로그
  text: Serverless 앱을 에이전트형 온보딩을 사용하여 계측하기
title: Agentic Onboarding 설정
---
## 개요 {#overview}

Agentic Onboarding은 애플리케이션 및 인프라에 대한 Datadog 계측을 자동화하는 AI 기반 도구 모음입니다.

- [AI Setup CLI](#ai-setup-cli): 코딩 어시스턴트 없이 터미널에서 Datadog을 설정합니다.
- [MCP Server](#mcp-server): IDE에서 프레임워크 탐지 및 구성을 처리하는 코딩 어시스턴트(Claude Code 또는 Cursor 등)를 통해 Datadog을 설정합니다.

두 경로는 상호 보완적이며 동일한 Datadog 계정을 사용합니다. IDE에 Datadog MCP Server를 설치하고 터미널에서 CLI를 실행할 수 있습니다.

## AI Setup CLI {#ai-setup-cli}

Datadog AI Setup CLI는 독립형 터미널 도구입니다. MCP 서버를 설치하고 싶지 않거나 Datadog 계정 생성과 같이 MCP 설정에서 지원하지 않는 작업을 수행할 때 사용하세요.

CLI 기능

- 터미널에서 Datadog 계정을 엔드투엔드로 생성
- 기존 Datadog 계정을 로컬 환경에 연결
- 파일을 제자리에서 편집하여 로컬 코드형 인프라(Terraform, Helm, Kustomize, Ansible, Pulumi, 원시 Kubernetes 매니페스트, Docker Compose 파일)를 계측
- 지원되는 프런트엔드 및 백엔드에 대한 SDK 초기화 및 구성을 추가하여 로컬 애플리케이션 코드 계측

### 전제 조건 {#prerequisites}

- Node.js 22 이상

### 지원되는 제품 {#supported-products}

CLI는 다음 제품을 설정할 수 있습니다.

| 제품 | 식별자 |
|---------|------------|
| 앱 및 API 보호 | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Error Tracking | `error-tracking` |
| Infrastructure Monitoring | `infra-monitoring` |
| Linux | `linux` |
| Agent Observability | `llm-obs` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring(RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Test Optimization | `test-optimization` |

### CLI 설치 및 실행 {#install-and-run-the-cli}

`npx`와 함께 CLI를 실행하고 `--site`를 전달하여 [Datadog 사이트][16]를 지정합니다({{< region-param key=dd_site code="true" >}}). Datadog 계정 보유 여부에 따라 두 가지 옵션이 있습니다.

   {{< tabs >}}
   {{% tab "대화형 설정" %}}
1. Datadog 계정이 없거나 CLI가 코드 분석을 기반으로 제품을 추천하도록 하려면 이 옵션을 사용합니다. CLI는 계정 설정, 리포지토리 분석 및 제품 권장 사항을 단계별로 안내합니다.

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com
   ```
   `--site`의 값을 계정의 Datadog 사이트로 바꿉니다({{< region-param key=dd_site code="true" >}}).

1. 시작 화면에서 <kbd>Enter</kbd> 키를 누르고 Datadog 계정 보유 여부를 선택하세요. OAuth(또는 계정이 없는 경우 계정 생성)를 위해 브라우저가 열립니다. 절차를 완료하고 Datadog 계정에 대한 액세스 권한을 부여하세요.
1. 계측하려는 리포지토리의 경로를 입력합니다.
1. 귀하의 동의하에 CLI는 읽기 전용 모드로 리포지토리를 분석하여 스택을 탐지합니다.
1. 탐지된 스택을 기반으로 CLI는 최대 3개의 지원되는 Datadog 제품을 권장합니다. 권장 사항은 기본적으로 선택됩니다. 전체 설정 옵션 목록을 사용하려면 개별 권장 사항을 선택 해제하거나, 선택을 확인하거나, **View all setup options**를 선택하세요.
   
   {{% /tab %}}
   
   {{% tab "직접 설정" %}}
1. Datadog 계정이 이미 있고 설치할 제품을 알고 있는 경우 이 옵션을 사용합니다. 리포지토리 분석 및 제품 권장 사항을 건너뛰고 설정으로 바로 이동하려면 `--product` 플래그를 추가하세요.

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
   ```

   - `--site`의 값을 계정의 Datadog 사이트로 바꿉니다({{< region-param key=dd_site code="true" >}}).
   - `<PRODUCT>`를 [지원되는 제품](#supported-products) 섹션에 나열된 제품 중 하나로 바꿉니다.

1. 시작 화면에서 <kbd>Enter</kbd> 키를 누르고 Datadog 계정 보유 여부를 선택하세요. OAuth(또는 계정이 없는 경우 계정 생성)를 위해 브라우저가 열립니다. 절차를 완료하고 Datadog 계정에 대한 액세스 권한을 부여하세요.

   {{% /tab %}}
   {{< /tabs >}}

#### 설정 구성 및 검증 {#configure-and-verify-your-setup}

1. CLI가 권장 사항을 생성할 수 없거나 리포지토리와 일치도가 높은 항목을 찾지 못하면 전체 설정 옵션 목록으로 안내합니다. `--product`를 사용한 직접 설정의 경우 이 메뉴에서 시작합니다.
   {{< img src="agentic_onboarding/product-selection.png" alt="CLI 메뉴 '무엇을 설정하시겠습니까?'는 인프라 및 백엔드 모니터링, 프런트엔드 모니터링, LLM 기반 애플리케이션 및 CI 테스트별로 그룹화되어 있습니다." style="width:80%;" >}}
1. CLI는 프로젝트의 프레임워크를 탐지하고, 필요한 구성을 적용하며, 필요한 환경 변수를 프로비저닝합니다. 진행 상황은 단계별로 보고됩니다.
   {{< img src="agentic_onboarding/setup-example.png" alt="진행 단계가 포함된 '애플리케이션 계측 중, 스테이지 3개 중 스테이지 1: Datadog RUM (Real User Monitoring)'을 보여주는 CLI입니다." style="width:80%;" >}}
1. 설정이 완료되면 CLI는 계측한 제품을 목록으로 보여주고 들어오는 데이터를 검증할 수 있는 Datadog UI 링크를 제공합니다.

1. 변경 사항을 리포지토리에 커밋하세요. 특정 환경에 맞게 Datadog 환경 변수(API 키, 애플리케이션 ID)를 편집할 수 있습니다.

CLI가 완료되면 [다음 단계](#next-steps) 섹션을 참조하여 데이터가 정상적으로 전송되는지 확인하세요.

### 헤드리스 모드{#headless-mode}

헤드리스 모드는 무인 설정을 위해 설계되었습니다. AI 코딩 에이전트, CI 작업 또는 스크립트가 리포지토리에서 CLI를 직접 실행하여 Datadog 계측을 자체적으로 완료할 수 있습니다. 프롬프트를 승인하거나 대화형 선택을 하기 위해 사용자가 직접 참여할 필요가 없습니다.

`--headless`를 사용하여 대화형 UI를 건너뛰세요. `--site` 및 `--product`가 모두 필요합니다.

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/ai-setup-cli \
  --headless \
  --site datadoghq.com \
  --product rum
```

사용자 상호 작용 없이 인증하려면 `DD_API_KEY` 및 `DD_APP_KEY` [환경 변수][19]를 설정하세요. 두 변수를 함께 제공하세요.

또는 API 및 애플리케이션 키를 생략하여 브라우저 OAuth로 인증할 수 있습니다. OAuth는 헤드리스 실행 중 사용자 상호 작용이 필요할 수 있는 유일한 부분이며, localhost 콜백이 필요합니다. 원격 또는 완전히 무인 환경의 경우 대신 `DD_API_KEY` 및 `DD_APP_KEY` 환경 변수를 사용하세요.

`--headless`를 사용하면 대상 프로젝트에 대해 소스 코드 업로드 및 자동 명령 실행이 승인되었음을 확인하게 됩니다.

## MCP Server {#mcp-server}

Datadog MCP Server는 `onboarding` 도구 세트를 MCP 호환 코딩 어시스턴트에 노출합니다. 서버를 설치하고 인증한 후, 한 줄 프롬프트를 입력하여 프로젝트를 계측하세요. 에이전트가 코드를 읽고, (사용자 허가를 받아) MCP 도구를 호출하며, 변경 사항을 적용하고 결과를 확인합니다.

### 전제 조건 {#prerequisites-1}

- [Claude Code][17] 또는 [Cursor][18]와 같은 MCP 호환 코딩 어시스턴트
- Datadog 계정

### 지원되는 프레임워크 {#supported-frameworks}

| 제품 | 프레임워크 |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes 관측 가능성 | Helm, Kustomize, 원시 매니페스트, Terraform, Pulumi, Ansible(GKE, EKS, AKS, minikube 및 kind, k3s, OpenShift와 같은 기타 환경 전반) |
| Docker 관측 가능성 | `docker-compose` 및 사이드카(`docker run`) 배포, Terraform, Ansible 및 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) |
| Linux 관측 가능성 | Terraform, Ansible, 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) 및 일반 셸 설치 |
| Serverless Monitoring(AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring(GCP Cloud Run 및 Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring(Azure Container Apps) | Terraform, Bicep, ARM 템플릿, `azure.yaml`(azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK(프로젝트 종속성에서 자동 탐지) |
| OpenTelemetry | Node.js / 서버 측 TS, 브라우저 JS / React / Vite, Python(Django, Flask, FastAPI), Java, Go |
| 앱 및 API 보호 | Python, Node.js, Java, Go, Ruby, .NET, PHP 및 Linux, Windows, Kubernetes, Docker, GCP Cloud Run, AWS Lambda, AWS Fargate/ECS용 프록시(Envoy, HAProxy) |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

###  1단계: MCP Server 설치 {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
활성 Claude Code 세션에서 다음을 실행하세요.

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**옵션 1: 딥링크 설치(권장)**

[Datadog 사이트][1]의 설치 딥링크를 클릭한 후, `datadog-onboarding-` 서버에 대해 Cursor가 열리면 {{< ui >}}Install{{< /ui >}}을{{< region-param key="dd_datacenter_lowercase" >}}확인하세요.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**옵션 2: 수동 구성**

`~/.cursor/mcp.json`에 서버를 추가하세요.

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>

[1]: /ko/getting_started/site/

{{% /tab %}}

{{% tab "기타 MCP 클라이언트" %}}

HTTP 전송을 지원하는 모든 MCP 클라이언트는 Datadog MCP Server에 연결할 수 있습니다. [Datadog 사이트][1]의 엔드포인트를 가리키세요.

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /ko/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

###  2단계: MCP Server 인증 {#step-2-authenticate-the-mcp-server}

1. MCP Server를 설치한 후, 코딩 어시스턴트가 인증을 요청합니다. <kbd>Enter</kbd>를 눌러 브라우저에서 Datadog OAuth 화면을 여세요.
1. 인증이 완료되면 {{< ui >}}Open{{< /ui >}}을 선택하여 IDE로 돌아가 MCP Server에 Datadog 계정 액세스 권한을 부여하세요.
1. MCP 도구가 `datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}` 서버 아래에 나타나는지 확인하세요.

### 3단계: 프로젝트에 계측 적용{#step-3-instrument-your-project}

설정하려는 제품과 일치하는 프롬프트를 전송하세요.

{{< tabs >}}
{{% tab "Error Tracking" %}}
{{< code-block lang="text" >}}Add Datadog Error Tracking to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Real User Monitoring" %}}
{{< code-block lang="text" >}}Add Datadog Real User Monitoring to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Product Analytics" %}}
{{< code-block lang="text" >}}Add Datadog Product Analytics to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Infrastructure Monitoring" %}}

**Kubernetes**
{{< code-block lang="text" >}}Add Datadog for Kubernetes to my project{{< /code-block >}}

**Docker**
{{< code-block lang="text" >}}Add Datadog for Docker to my project{{< /code-block >}}

{{% /tab %}}

{{% tab "앱 및 API 보호" %}}
{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**GCP Cloud Run 컨테이너**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**GCP Cloud Run 함수**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure 컨테이너 앱**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

에이전트가 스택을 탐지하고, 각 도구 호출 전에 권한을 요청하며, 변경 사항을 로컬에 적용하고(커밋하지 않음), 확인 단계를 출력합니다.

에이전트가 완료되면 변경 사항을 리포지토리에 커밋하고 프로덕션 환경에서 새로운 환경 변수(API 키, 애플리케이션 ID)를 설정하세요. 그런 다음 [다음 단계](#next-steps) 섹션을 참조하여 데이터가 정상적으로 전송되는지 확인하세요.

## 다음 단계 {#next-steps}

설정한 제품에 대해 Datadog UI에서 데이터가 수신되고 있는지 확인하세요.

- [Error Tracking][6]
- [App 및 API 보호][11]
- [RUM > 애플리케이션][7]
- [인프라 > 호스트][8]
- [Serverless > 함수][9]
- [Logs > Live Tail][10]


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /ko/getting_started/site/
[17]: https://claude.com/product/claude-code
[18]: https://cursor.com/
[19]: /ko/account_management/api-app-keys/