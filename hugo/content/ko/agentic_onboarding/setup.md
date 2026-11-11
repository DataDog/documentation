---
description: Pup CLI 또는 Datadog MCP Server를 사용하여 Datadog으로 애플리케이션을 계측하세요.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: 블로그
  text: 에이전트형 온보딩을 사용하여 Serverless 앱 계측하기
title: 에이전트형 온보딩 설정
---
## 개요 {#overview}

에이전트형 온보딩은 애플리케이션 및 인프라에 대한 Datadog 계측을 자동화하는 AI 기반 도구 세트입니다.

- [Pup CLI](#pup-cli): 코딩 어시스턴트 없이 터미널에서 `pup setup`을 사용해 Datadog을 설정합니다.
- [MCP 서버](#mcp-server): IDE에서 프레임워크 탐지 및 구성을 처리하는 코딩 어시스턴트(Claude Code 또는 Cursor 등)를 통해 Datadog을 설정합니다.

두 경로는 상호 보완적이며 동일한 Datadog 계정을 사용합니다. IDE에 Datadog MCP Server를 설치하고 터미널에서 CLI를 실행할 수 있습니다.

## Pup CLI {#pup-cli}

[Pup CLI][20]는 터미널에서 Datadog을 설정합니다. 자체 코딩 어시스턴트나 AI 모델이 필요하지 않으므로 설정 시 사용자의 모델 토큰이 사용되지 않습니다. 다음과 같은 경우 CLI를 사용하세요.

- 자체 코딩 어시스턴트 또는 AI 모델에 액세스할 수 없습니다.
- 설정에 모델 토큰을 사용하고 싶지 않습니다.
- MCP 서버를 설치하고 싶지 않습니다.
- MCP 설정에서 지원하지 않는 Datadog 계정을 생성해야 합니다.

Pup CLI는 다음을 수행할 수 있습니다.

- 터미널에서 엔드투엔드로 Datadog 계정 생성
- 로컬 환경에 기존 Datadog 계정 연결
- 파일을 제자리에서 편집하여 로컬 코드형 인프라(Terraform, Helm, Kustomize, Ansible, Pulumi, 원시 Kubernetes 매니페스트, Docker Compose 파일) 계측
- 지원되는 프런트엔드 및 백엔드에 대한 SDK 초기화 및 구성을 추가하여 로컬 애플리케이션 코드 계측

### 전제 조건 {#prerequisites}

- Node.js 22 이상. `pup setup`은 `npx`를 사용해 Datadog의 설정 패키지를 실행하므로 Homebrew 또는 사전 구축된 바이너리로 Pup을 설치했더라도 Node.js가 필요합니다.

### 지원되는 제품 {#supported-products}

Pup CLI는 다음 제품을 설정할 수 있습니다. `--product` 열의 값을 `--product` 플래그에 전달하세요.

| 제품 | `--product` |
|---------|------------|
| Agent Observability | `llm-obs` |
| Amazon ECS | `ecs` |
| App and API Protection | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Error Tracking | `error-tracking` |
| Infrastructure Monitoring(Kubernetes) | `infra-monitoring` |
| Linux | `linux` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring(RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Test Optimization | `test-optimization` |

#### 제품별 플래그 {#product-specific-flags}

일부 제품은 `--product`와 함께 추가적인 선택적 플래그를 허용합니다. 각 플래그에 값을 지정해야 합니다.

| `--product` | 플래그 |
|-------------|-------|
| `ci_code_coverage`, `llm-obs`, `serverless`, `test-optimization` | `--api-key`: Datadog API 키입니다. |
| `docker` | `--products`: 활성화할 제품을 쉼표로 구분한 값(`infra`, `apm`, `logs`)입니다. 기본값은 세 가지 모두입니다.<br>`--library-versions`: 트레이서 라이브러리 버전(예: `java:v1,python:v4`)입니다.<br>`--env`: 환경 태그입니다. `DD_ENV`를 설정합니다. |
| `ecs` | `--ecs-launch-type`: `fargate` 또는 `ec2`입니다.<br>`--ecs-deployment-method`: `cli`, `terraform`, `cdk` 또는 `cloudformation`입니다. |
| `error-tracking`, `product-analytics`, `rum`, `studio` | `--rum-application-id`(별칭: `--app-id`): RUM 애플리케이션 ID입니다. |
| `infra-monitoring` | `--enabled-products`(별칭: `--k8s-products`): 활성화할 제품을 쉼표로 구분한 값(예: `infrastructure,logs,apm,otel`)입니다.<br>`--k8s-distro`: Kubernetes 배포(예: `gke`, `eks`, `aks` 또는 `minikube`)입니다.<br>`--k8s-cluster-name`: 클러스터 이름입니다.<br>`--k8s-env-name`: 환경 태그입니다.<br>`--k8s-library-versions`: 트레이서 라이브러리 버전(예: `java:v1,python:v4`)입니다.<br>`--k8s-target-namespaces`: 포함할 네임스페이스를 쉼표로 구분한 값입니다.<br>`--k8s-disabled-namespaces`: 제외할 네임스페이스를 쉼표로 구분한 값입니다.<br>`--k8s-registry`: Datadog 이미지용 컨테이너 레지스트리(예: 미러 또는 프라이빗 레지스트리)입니다. |
| `linux` | `--products`: 활성화할 제품을 쉼표로 구분한 값(`infra`, `apm`, `logs`, `otel`)입니다. 기본값은 `infra,apm,logs`입니다.<br>`--env`: 환경 태그입니다. `DD_ENV`를 설정합니다. |
| `llm-obs` | `--llm-obs-app`: LLM 애플리케이션 이름입니다. `DD_LLMOBS_ML_APP`을 설정합니다. |
| `product-analytics`, `rum` | `--rum-client-token`: RUM 클라이언트 토큰입니다. |
| `rum` | `--rum-framework`: `react`, `vue`, `angular`, `nextjs`, `browser`, `react-native` 또는 `expo`입니다. |
| `serverless` | `--serverless-compute-type`: `aws-lambda`, `gcp-cloud-run`, `gcp-cloud-run-functions` 또는 `azure-container-apps`입니다.<br>`--serverless-runtime`: `nodejs`, `python`, `java`, `ruby`, `dotnet`, `go` 또는 `php`입니다(`php`는 Cloud Run 및 Container Apps에서만 지원됨).<br>`--development-framework`: `aws-cdk`, `aws-sam`, `serverless-framework`, `terraform`, `ci` 또는 `other`입니다.<br>`--use-otel true`: OpenTelemetry SDK로 계측하여 Datadog OTLP 수집으로 직접 전송합니다. |

예를 들면 다음과 같습니다.

```shell
npx @datadog/pup setup --site datadoghq.com --product ecs --ecs-launch-type fargate --ecs-deployment-method terraform
```

### 설정 명령 실행 {#run-the-setup-command}

`pup setup`을 `npx`와 함께 실행하고 `--site`를 전달하여 [Datadog 사이트][16]를 대상으로 지정합니다({{< region-param key=dd_site code="true" >}}). `npx`가 Pup을 다운로드하므로 먼저 설치할 필요가 없습니다. Pup이 이미 [설치][20]되어 있는 경우, 동일한 플래그를 사용하여 `npx @datadog/pup setup` 대신 `pup setup`을 직접 실행하세요.

[`pup auth login`][22]으로 로그인한 경우, `pup setup`에 해당 로그인이 사용됩니다.

Datadog 계정 보유 여부에 따라 다음과 같은 두 가지 옵션이 있습니다.

   {{< tabs >}}
   {{% tab "대화형 설정" %}}
1. Datadog 계정이 없거나 CLI가 코드 분석을 기반으로 제품을 추천하도록 하려면 이 옵션을 사용합니다. CLI는 계정 설정, 리포지토리 분석 및 제품 권장 사항을 단계별로 안내합니다.

   ```shell
   npx @datadog/pup setup --site datadoghq.com
   ```
   `--site`의 값을 계정의 Datadog 사이트로 바꿉니다({{< region-param key=dd_site code="true" >}}).

1. 시작 화면에서 <kbd>Enter</kbd> 키를 누르고 Datadog 계정 보유 여부를 선택합니다. OAuth(아직 계정이 없는 경우 계정 생성)를 위해 브라우저가 열립니다. 흐름을 완료하고 Datadog 계정에 대한 액세스 권한을 부여합니다.
1. 계측하려는 리포지토리의 경로를 입력합니다.
1. 사용자 동의하에 CLI는 읽기 전용 모드로 리포지토리를 분석하여 스택을 탐지합니다.
1. 탐지된 스택을 기반으로 CLI는 최대 3개의 지원되는 Datadog 제품을 권장합니다. 권장 사항은 기본적으로 선택됩니다. 개별 권장 사항을 선택 해제하거나, 선택을 확인하거나, **View all setup options**를 선택하여 대신 전체 설정 옵션 목록을 사용합니다.
   
   {{% /tab %}}
   
   {{% tab "직접 설정" %}}
1. Datadog 계정이 이미 있고 설치할 제품을 알고 있는 경우 이 옵션을 사용합니다. 리포지토리 분석 및 제품 권장 사항을 건너뛰고 설정으로 바로 이동하려면 `--product` 플래그를 추가하세요.

   ```shell
   npx @datadog/pup setup --site datadoghq.com --product <PRODUCT>
   ```

   - `--site`의 값을 계정의 Datadog 사이트로 바꿉니다({{< region-param key=dd_site code="true" >}}).
   - `<PRODUCT>`를 [지원되는 제품](#supported-products) 섹션에 나열된 제품 중 하나로 바꿉니다.
   - 필요시 해당 제품에 대한 [제품별 플래그](#product-specific-flags)를 추가하세요.

1. 시작 화면에서 <kbd>Enter</kbd> 키를 누르고 Datadog 계정 보유 여부를 선택합니다. OAuth(아직 계정이 없는 경우 계정 생성)를 위해 브라우저가 열립니다. 흐름을 완료하고 Datadog 계정에 대한 액세스 권한을 부여합니다.

   {{% /tab %}}
   {{< /tabs >}}

#### 설정 구성 및 검증 {#configure-and-verify-your-setup}

1. CLI가 권장 사항을 생성할 수 없거나 리포지토리와 일치도가 높은 항목을 찾지 못하면 전체 설정 옵션 목록으로 안내합니다.
   {{< img src="agentic_onboarding/product-selection.png" alt="CLI 메뉴 'What would you like to set up?'이 인프라 및 백엔드 모니터링, 프런트엔드 모니터링, LLM 기반 애플리케이션 및 CI 테스트별로 그룹화되어 있습니다." style="width:80%;" >}}
1. CLI는 프로젝트의 프레임워크를 탐지하고, 필요한 구성을 적용하며, 필요한 환경 변수를 프로비저닝합니다. 진행 상황은 단계별로 보고됩니다.
   {{< img src="agentic_onboarding/setup-example.png" alt="진행 단계와 함께 'Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring)'을 보여주는 CLI입니다." style="width:80%;" >}}
1. 설정이 완료되면 CLI는 계측한 제품을 목록으로 보여주고 수신 데이터를 검증할 수 있는 Datadog UI 링크를 제공합니다.

1. 변경 사항을 리포지토리에 커밋합니다. 특정 환경에 맞게 Datadog 환경 변수(API 키, 애플리케이션 ID)를 편집할 수 있습니다.

CLI가 완료되면 [다음 단계](#next-steps) 섹션을 참조하여 데이터 흐름이 정상적인지 확인하세요.

### 헤드리스 모드 {#headless-mode}

헤드리스 모드는 무인 설정을 위해 설계되었습니다. AI 코딩 에이전트, CI 작업 또는 스크립트가 리포지토리에서 CLI를 직접 실행하여 Datadog 계측을 자체적으로 완료할 수 있습니다. 프롬프트를 승인하거나 대화형 선택을 하기 위해 사용자가 직접 참여할 필요가 없습니다.

헤드리스 모드는 [지원되는 AI 코딩 에이전트][21]가 `pup setup`을 시작할 때 또는 CI 작업 등과 같이 대화형 터미널이 없을 때 자동으로 설정됩니다. 수동으로 활성화하려면 `--headless`를 추가하세요.

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/pup setup \
  --headless \
  --site datadoghq.com \
  --product rum
```

헤드리스 모드에서는 다음과 같습니다.

- `--site`가 선택 사항입니다. 생략하면 `pup setup`에 `DD_SITE` 환경 변수가 사용된 다음 Pup 로그인 또는 구성 파일의 사이트, 그 다음으로 `datadoghq.com`이 사용됩니다.
- `--product`가 선택 사항입니다. 생략하면 `pup setup`이 리포지토리를 분석하고 가장 권장되는 제품을 설정합니다. 아무것도 변경하지 않고 권장 사항을 보려면 `--recommend-only`를 추가하세요. 그러면 권장 사항이 JSON으로 출력된 후 종료됩니다.

헤드리스 모드는 다음 중 사용 가능한 첫 번째 항목으로 로그인합니다.

1. 사용자의 Pup 로그인 또는 `DD_ACCESS_TOKEN` 환경 변수. 둘 중 하나라도 있으면 `pup setup`은 `DD_API_KEY` 및 `DD_APP_KEY`를 무시합니다.
1. `DD_API_KEY` 및 `DD_APP_KEY` [환경 변수][19]. 두 변수를 함께 제공하세요.
1. 브라우저 OAuth. 설정 명령이 브라우저를 열어 로그인할 수 있도록 합니다. 이는 헤드리스 모드에서 사용자 입력이 필요한 유일한 단계이며, localhost 콜백이 필요합니다. 원격 머신이나 완전히 무인으로 실행되는 경우에는 다른 옵션 중 하나를 사용하세요.

헤드리스 모드에서 `pup setup`을 실행하면 대상 프로젝트에 대해 소스 코드 업로드 및 자동 명령 실행이 승인되었음을 확인하게 됩니다. 이는 직접 `--headless`를 추가하든, 아니면 헤드리스 모드가 자동으로 설정되든 적용됩니다.

## MCP Server {#mcp-server}

Datadog MCP Server는 `onboarding` 도구 세트를 MCP 호환 코딩 어시스턴트에 노출합니다. 서버를 설치하고 인증한 후, 한 줄 프롬프트를 입력하여 프로젝트를 계측합니다. 에이전트가 코드를 읽고, (사용자 허가를 받아) MCP 도구를 호출하며, 변경 사항을 적용하고, 결과를 검증합니다.

### 전제 조건 {#prerequisites-1}

- [Claude Code][17] 또는 [Cursor][18]와 같은 MCP 호환 코딩 어시스턴트
- Datadog 계정

### 지원되는 프레임워크 {#supported-frameworks}

| 제품 | 프레임워크 |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes Observability | Helm, Kustomize, 원시 매니페스트, Terraform, Pulumi, Ansible(GKE, EKS, AKS, minikube 및 kind, k3s, OpenShift와 같은 기타 환경 전반) |
| Docker Observability | `docker-compose` 및 사이드카(`docker run`) 배포, Terraform, Ansible 및 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) |
| Linux Observability | Terraform, Ansible, 기타 IaC(Pulumi, CloudFormation, Puppet, Chef) 및 일반 셸 설치 |
| Serverless Monitoring(AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring(GCP Cloud Run 및 Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring(Azure Container Apps) | Terraform, Bicep, ARM 템플릿, `azure.yaml`(azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK(프로젝트 종속성에서 자동 탐지) |
| OpenTelemetry | Node.js/서버 측 TS, 브라우저 JS/React/Vite, Python(Django, Flask, FastAPI), Java, Go |
| App and API Protection | Python, Node.js, Java, Go, Ruby, .NET, PHP 및 Linux, Windows, Kubernetes, Docker, GCP Cloud Run, AWS Lambda, AWS Fargate/ECS용 프록시(Envoy, HAProxy) |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest/Swift Testing |

###  1단계: MCP Server 설치 {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
활성 Claude Code 세션에서 다음을 실행합니다.

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**옵션 1: 딥링크 설치(권장)**

[Datadog 사이트][1]의 설치 딥링크를 클릭한 다음 Cursor가 열리면 {{< ui >}}Install{{< /ui >}}('datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}' 서버)을 확인하세요.

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

HTTP 전송을 지원하는 모든 MCP 클라이언트는 Datadog MCP Server에 연결할 수 있습니다. [Datadog 사이트][1]의 엔드포인트에서 가리키세요.

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /ko/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### 2단계: MCP Server 인증 {#step-2-authenticate-the-mcp-server}

1. MCP Server를 설치한 후, 코딩 어시스턴트가 인증을 요청합니다. <kbd>Enter</kbd> 키를 눌러 브라우저에서 Datadog OAuth 화면을 엽니다.
1. 인증이 완료되면 {{< ui >}}Open{{< /ui >}}을 선택하여 IDE로 돌아가 MCP Server에 Datadog 계정 액세스 권한을 부여합니다.
1. MCP 도구가 'datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}' 서버 아래에 나타나는지 확인합니다.

### 3단계: 프로젝트 계측 {#step-3-instrument-your-project}

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

{{% tab "App and API Protection" %}}
{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**GCP Cloud Run 컨테이너**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**GCP Cloud Run 함수**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

에이전트가 스택을 탐지하고, 각 도구 호출 전에 권한을 요청하며, 변경 사항을 로컬에 적용하고(커밋하지 않음), 검증 단계를 출력합니다.

에이전트가 완료되면 변경 사항을 리포지토리에 커밋하고 프로덕션 환경에서 새로운 환경 변수(API 키, 애플리케이션 ID)를 설정하세요. 그런 후 [다음 단계](#next-steps) 섹션을 참조하여 데이터 흐름이 정상적인지 확인하세요.

## 다음 단계 {#next-steps}

설정한 제품에 대해 Datadog UI에서 데이터 흐름이 정상적인지 확인하세요.

- [Error Tracking][6]
- [App and API Protection][11]
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
[20]: /ko/cli/
[21]: /ko/cli/#agent-mode
[22]: /ko/cli/#authentication