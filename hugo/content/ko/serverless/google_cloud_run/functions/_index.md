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

## Datadog MCP 서버 사용 {#use-the-datadog-mcp-server}

[Datadog MCP 서버][2]를 사용하여 AI 지원으로 Cloud Run 컨테이너의 모니터링을 설정하세요. 연결한 후 다음과 같은 프롬프트를 시도해 보세요.

```shell
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

## 수동 계측 {#manual-instrumentation}

[Datadog-Google Cloud Platform 계측][1]을 설정하여 Google Cloud 서비스에서 메트릭과 로그를 수집하세요. 서비스 계정에 `cloud asset viewer` 역할을 추가하고 Google Cloud에서 Cloud Asset Inventory API를 활성화하세요.

그런 다음 아래에서 사용 중인 런타임 환경을 선택하여 애플리케이션 계측 방법에 대한 지침을 확인해 보세요.

{{% container-languages path="google_cloud_run/functions" functions="true" %}}



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/google-cloud-platform/
[2]: /ko/agentic_onboarding/setup