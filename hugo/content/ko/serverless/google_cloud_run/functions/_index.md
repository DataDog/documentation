---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: 블로그
  text: Cloud Functions의 새로운 이름, Cloud Run Functions:단일 통합 서버리스 플랫폼으로 구현하는 이벤트 기반
    프로그래밍
- link: /mcp_server/tools/#serverless_onboarding
  tag: 설명서
  text: 'Datadog MCP 서버: serverless_onboarding 도구'
title: Cloud Run Functions 계측
type: multi-code-lang
---
<div class="alert alert-info">
<strong>1세대 Cloud Run Functions에 대한 내용을 찾고 계신가요?</strong> 이전에 Cloud Functions(1세대)로 불렸던 Cloud Run Functions(1세대)를 사용 중인 경우 이전에 <a href="/serverless/google_cloud_run/functions_1st_gen">1세대 Cloud Run Functions 계측</a>을 참조하세요.
</div>

## 에이전트 기반 온보딩으로 설정 {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 기능은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

에이전트 기반 온보딩을 사용하여 AI 지원으로 Cloud Run 함수 모니터링을 설정하십시오. 에이전트 기반 온보딩은 프로젝트의 프레임워크를 감지하고, 필요한 구성을 적용하며, 데이터가 정상적으로 전송되는지 확인합니다. 상호 보완적인 두 가지 경로에서 동일한 Datadog 계정을 사용합니다.

- **AI 설정 CLI**: 독립형 터미널 도구입니다. MCP 서버를 설치하고 싶지 않을 때 사용하세요.
- **MCP 서버**: Claude Code 또는 Cursor와 같은 코딩 어시스턴트를 통해 IDE에서 설정하세요.

{{< tabs >}}
{{% tab "AI 설정 CLI" %}}

프로젝트 디렉토리에서 CLI를 실행하세요(Node.js 22+ 필요). 이는 Datadog 계정을 연결한 다음 Cloud Run 함수를 계측합니다.

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```

대화형으로 실행하려면 `--product`를 생략하고, Datadog 사이트를 지정하려면 `--site`를 추가하세요.

{{% /tab %}}
{{% tab "MCP 서버" %}}

Datadog MCP 서버의 [`serverless_onboarding`](https://docs.datadoghq.com/ko/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) 도구를 사용하여 AI 지원으로 Cloud Run 함수 모니터링을 설정하십시오. 연결한 후 다음과 같은 프롬프트를 시도해 보세요.

```
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## 수동 계측 {#manual-instrumentation}

[Datadog-Google Cloud Platform 계측][1]을 설정하여 Google Cloud 서비스에서 메트릭과 로그를 수집하세요. 서비스 계정에 `cloud asset viewer` 역할을 추가하고 Google Cloud에서 Cloud Asset Inventory API를 활성화하세요.

그런 다음 아래에서 사용 중인 런타임 환경을 선택하여 애플리케이션 계측 방법에 대한 지침을 확인해 보세요.

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/google-cloud-platform/
[2]: /ko/agentic_onboarding/setup