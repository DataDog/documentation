---
description: AI Setup CLI 또는 Datadog MCP Server를 사용하여 Datadog으로 애플리케이션을 계측하세요.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: 블로그
  text: Serverless 앱을 Agentic onboarding을 사용하여 계측하기
title: Agentic Onboarding 설정
---
## 개요 {#overview}

Agentic Onboarding은 애플리케이션 및 인프라에 대한 Datadog 계측을 자동화하는 AI 기반 도구 모음입니다.

- [AI Setup CLI](#ai-setup-cli): 코딩 어시스턴트 없이 터미널에서 Datadog을 설정합니다.
- [MCP Server](#mcp-server): IDE에서 프레임워크 탐지 및 구성을 처리하는 코딩 어시스턴트(Claude Code 또는 Cursor 등)를 통해 Datadog을 설정합니다.

두 경로는 상호 보완적이며 동일한 Datadog 계정을 사용합니다. IDE에 Datadog MCP Server를 설치하고 터미널에서 CLI를 실행할 수 있습니다.

## AI 설정 CLI {#ai-setup-cli}

Datadog AI 설정 CLI는 독립형 터미널 도구입니다. MCP 서버를 설치하고 싶지 않거나 Datadog 계정 생성과 같이 MCP 설정에서 지원하지 않는 작업을 수행할 때 사용하세요.

CLI 기능

- 터미널에서 Datadog 계정을 처음부터 끝까지 생성
- 기존 Datadog 계정을 로컬 환경에 연결
- 파일을 제자리에서 편집하여 로컬 인프라를 코드로 계측(Terraform, Helm, Kustomize, Ansible, Pulumi, 원시 Kubernetes 매니페스트, Docker Compose 파일)
- 지원되는 프런트엔드 및 백엔드에 대한 SDK 초기화 및 구성을 추가하여 로컬 애플리케이션 코드 계측

### 전제 조건 {#prerequisites}

- Node.js 22 이상

### 지원되는 제품 {#supported-products}

CLI는 다음 제품을 설정할 수 있습니다.

| 제품 | 식별자 |
|---------|------------|
| App 및 API 보호 | `app_and_api_protection` |
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

1. CLI를 `npx`와 함께 실행하고 [Datadog 사이트][16]를 대상으로 `--site`를 전달합니다. Datadog 계정 보유 여부에 따라 두 가지 옵션이 있습니다.

    **옵션 1: 대화형 설정.** Datadog 계정이 아직 없거나, 제품을 대화형으로 선택하려면 `--product` 플래그 없이 실행하세요. CLI는 계정 설정 및 제품 선택 과정을 단계별로 안내합니다.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com
    ```

    계정에서 `--site` 값을 [Datadog 사이트][16]로 교체하세요. `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, 또는 `ap2.datadoghq.com`.

    **옵션 2: 바로 설정.** 이미 Datadog 계정이 있고 특정 제품을 설치하려면 `--product`를 거쳐 제품 선택으로 건너뜁니다.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
    ```

    - 계정에서 `--site` 값을 [Datadog 사이트][16]로 교체합니다.
    - `<PRODUCT>`를 [지원되는 제품](#supported-products)으로 교체합니다.

1. 시작 화면에서 <kbd>Enter</kbd> 키를 누르고 Datadog 계정 보유 여부를 선택하세요. OAuth(또는 계정이 없는 경우 계정 생성)를 위해 브라우저가 열립니다. 절차를 완료하고 Datadog 계정에 대한 액세스 권한을 부여하세요.

1. `--product` 없이 CLI를 실행한 경우, 제품 메뉴에서 설정할 항목을 선택하세요. (`--product`를 통한 직접 설정은 이 메뉴를 건너뜁니다.)

   {{< img src="agentic_onboarding/product-selection.png" alt="CLI 메뉴 \"무엇을 설정하시겠습니까?\"는 인프라 및 백엔드 모니터링, 프론트엔드 모니터링, LLM 기반 애플리케이션 및 CI 테스트별로 그룹화되어 있습니다." style="width:80%;" >}}

   CLI는 프로젝트의 프레임워크를 탐지하고, 필요한 구성을 적용하며, 필요한 환경 변수를 프로비저닝합니다. 진행 상황은 단계별로 보고됩니다.

   {{< img src="agentic_onboarding/setup-example.png" alt="진행 단계가 포함된 '애플리케이션 계측 중, 스테이지 3개 중 스테이지 1: Datadog RUM (Real User Monitoring)'을 보여주는 CLI입니다." style="width:80%;" >}}

   설정이 완료되면 CLI는 계측한 제품을 나열하고 들어오는 데이터를 확인할 수 있는 Datadog UI 링크를 제공합니다.

   {{< img src="agentic_onboarding/success.png" alt="'설정 완료!'를 보여주는 CLI RUM, Error Tracking 및 Product Analytics 옆에 체크 표시가 있습니다." style="width:80%;" >}}

1. 변경 사항을 리포지토리에 커밋하세요. 특정 환경에 맞게 Datadog 환경 변수(API 키, 애플리케이션 ID)를 편집할 수 있습니다.

CLI가 완료된 후 [다음 단계](#next-steps)를 참조하세요.

## MCP 서버 {#mcp-server}

Datadog MCP Server는 `onboarding` 도구 모음을 MCP 호환 코딩 어시스턴트에 노출합니다. 서버를 설치하고 인증한 후, 한 줄 프롬프트를 입력하여 프로젝트를 계측합니다. 에이전트가 코드를 읽고, (사용자 허가를 받아) MCP 도구를 호출하며, 변경 사항을 적용하고 결과를 확인합니다.

### 전제 조건 {#prerequisites-1}

- [Claude Code][17] 또는 [Cursor][18]와 같은 MCP 호환 코딩 어시스턴트
- Datadog 계정

### 지원되는 프레임워크 {#supported-frameworks}

| 제품 | 프레임워크 |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes 관측성 | Helm, Kustomize, 원시 매니페스트, Terraform, Pulumi, Ansible(GKE, EKS, AKS, minikube 및 kind, k3s, OpenShift와 같은 기타 환경 전반) |
| Docker 관측성 | `docker-compose` 및 사이드카(`docker run`) 배포, Terraform, Ansible 및 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) |
| Linux 관측 가능성 | Terraform, Ansible, 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) 및 일반 셸 설치 |
| Serverless Monitoring(AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring(GCP Cloud Run 및 Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring(Azure Container Apps) | Terraform, Bicep, ARM 템플릿, `azure.yaml`(azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK(프로젝트 종속성에서 자동 탐지) |
| OpenTelemetry | Node.js / 서버 측 TS, 브라우저 JS / React / Vite, Python(Django, Flask, FastAPI), Java, Go |
| 앱 및 API 보호 | Python, Node.js, Java, Go, Ruby, .NET, PHP 및 Linux, Windows, Kubernetes, Docker, GCP Cloud Run, AWS Lambda, AWS Fargate/ECS용 프록시(Envoy, HAProxy) |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

### 1단계: MCP 서버 설치 {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
활성 Claude Code 세션에서 다음을 실행합니다:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**옵션 1: 딥링크 설치(권장)**

[Datadog 사이트][1]에 대한 설치 딥링크를 클릭한 후, Cursor가 열리면 확인합니다{{< ui >}}Install{{< /ui >}}(**datadog-onboarding-**{{< region-param key="dd_datacenter_lowercase" >}}** 서버).

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**옵션 2: 수동 구성**

`~/.cursor/mcp.json`에 서버를 추가합니다.

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

### 2단계: MCP 서버 인증{#step-2-authenticate-the-mcp-server}

1. MCP 서버를 설치한 후, 코딩 어시스턴트가 인증을 요청합니다. <kbd>Enter</kbd>를 눌러 브라우저에서 Datadog OAuth 화면을 엽니다.
1. 인증이 완료되면 {{< ui >}}Open{{< /ui >}}을 선택하여 IDE로 돌아가 MCP 서버에 Datadog 계정 액세스 권한을 부여하세요.
1. MCP 도구가 **datadog-onboarding-** 서버 아래에 나타나는지{{< region-param key="dd_datacenter_lowercase" >}}확인합니다.

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

{{% tab "앱 및 API 보호(미리 보기)" %}}
<div class="alert alert-info">앱 및 API 보호를 위한 에이전트 기반 온보딩은 공개 미리 보기 상태입니다.</div>

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

에이전트가 완료되면 변경 사항을 리포지토리에 커밋하고 프로덕션 환경에서 새로운 환경 변수(API 키, 애플리케이션 ID)를 설정하세요. 그런 다음 [다음 단계](#next-steps)를 확인하여 데이터가 수신되고 있는지 확인하세요.

## 다음 단계 {#next-steps}

설정한 제품에 대해 Datadog UI에서 데이터가 수신되고 있는지 확인하세요.

- [Error Tracking][6]
- [App 및 API 보호][11]
- [RUM > 애플리케이션][7]
- [인프라 > 호스트][8]
- [Serverless > 함수][9]
- [Logs > Live Tail][10]

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /ko/getting_started/site/
[17]: https://www.anthropic.com/claude-code
[18]: https://cursor.com/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}