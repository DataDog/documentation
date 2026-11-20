---
further_reading:
- link: /integrations/google-cloud-run/
  tag: 설명서
  text: Google Cloud Run 통합
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: Cloud Run 서비스에서 트레이스, 로그, 사용자 지정 메트릭 수집
- link: /serverless/google_cloud_run/containers/in_container/
  tag: 설명서
  text: 컨테이너 내 내장 방식으로 컨테이너 연동
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: 설명서
  text: 사이드카 방식으로 컨테이너 연동
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: 블로그
  text: 새로운 Datadog Agent 사이드카로 Google Cloud Run 애플리케이션 연동
- link: /mcp_server/tools/#serverless_onboarding
  tag: 설명서
  text: 'Datadog MCP 서버: serverless_onboarding 도구'
title: 컨테이너용 계측 방법 선택
---
## 에이전트 기반 온보딩으로 설정 {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 기능은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

에이전트 기반 온보딩을 사용하여 AI 지원으로 Cloud Run 컨테이너의 모니터링을 설정하십시오. 에이전트 기반 온보딩은 프로젝트의 프레임워크를 감지하고, 필요한 구성을 적용하며, 데이터가 정상적으로 전송되는지 확인합니다. 상호 보완적인 두 가지 경로에서 동일한 Datadog 계정을 사용합니다.

- **AI 설정 CLI**: 독립형 터미널 도구입니다. MCP 서버를 설치하고 싶지 않을 때 사용하세요.
- **MCP 서버**: Claude Code 또는 Cursor와 같은 코딩 어시스턴트를 통해 IDE에서 설정하세요.

{{< tabs >}}
{{% tab "AI 설정 CLI" %}}

프로젝트 디렉토리에서 CLI를 실행하세요(Node.js 22+ 필요). 이는 Datadog 계정을 연결한 다음 Cloud Run 서비스를 계측합니다:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run
```

대화형으로 실행하려면 `--product`를 생략하고, Datadog 사이트를 지정하려면 `--site`를 추가하세요.

{{% /tab %}}
{{% tab "MCP 서버" %}}

Datadog MCP의 [`serverless_onboarding`](https://docs.datadoghq.com/ko/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) 도구를 사용하여 AI 지원으로 Cloud Run 컨테이너의 모니터링을 설정하십시오. 연결한 후 다음과 같은 프롬프트를 시도해 보세요.

```
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## 수동 계측 {#manual-instrumentation}
Datadog으로 Google Cloud Run 컨테이너를 연동하려면 두 가지 옵션 중 하나를 선택하세요.

{{% gcr-container-options %}}

- [**컨테이너 내 내장**][1]: 애플리케이션 컨테이너를 Datadog Agent를 포함합니다. 설정이 간단하고 비용 오버헤드가 적으며 로그를 직접 파이핑하려는 경우 이 옵션을 선택하세요.
- [**사이드카**][2]: 앱 컨테이너 옆에 별도의 컨테이너에 Datadog Agent를 배포합니다. 단일 서비스 내에 여러 컨테이너가 있는 경우, Datadog Agent의 철저한 격리를 선호하는 경우, 성능에 민감한 워크로드를 운영하는 경우 이 옵션을 선택하세요.

### 비교: 컨테이너 내장 방식 대 사이드카 계측 {#comparison-in-container-versus-sidecar-instrumentation}

| 비교 항목                        | 컨테이너 내 내장                                               | 사이드카                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 배포                    | 단일 컨테이너(Datadog Agent가 내장된 앱) | 두 개의 컨테이너(앱, Datadog Agent)                                                                                                                    |
| 이미지 변경                 | 앱 이미지 크기가 증가합니다.                                | 앱 이미지에 변화가 없습니다.                                                                                                                                      |
| 비용 오버헤드                 | 사이드카보다 적습니다(추가 컨테이너 없음).                  | 추가 vCPU/메모리가 소모됩니다. 사이드카를 과도하게 할당하면 비용을 낭비하게 되고 부족하게 할당하면 예상보다 빠르게 확장이 발생할 수 있습니다.                                                       |
| 로깅                       | stdout/stderr에 직접 액세스합니다.                             | 공유 볼륨 + 로그 라이브러리를 통해 로그 파일로 라우팅합니다. 처리되지 않은 예외는 자동으로 로그 라이브러리에서 처리되지 않기 때문에 추가적인 대응이 필요합니다. |
| 실패 격리             | 드물게 Datadog Agent의 버그가 앱에 영향을 미칠 수 있습니다.   | Datadog Agent의 결함이 격리됩니다.                                                                                                                           |

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/google_cloud_run/containers/in_container
[2]: /ko/serverless/google_cloud_run/containers/sidecar
[3]: /ko/agentic_onboarding/setup