---
aliases:
- /ko/tracing/runtime_metrics/nodejs
code_lang: nodejs
code_lang_weight: 40
description: 트레이스에 연결된 런타임 메트릭을 통해 Node.js 애플리케이션의 성능에 관한 추가 인사이트를 얻으세요.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그 및 트레이스를 서로 연결
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
kind: 설명서
title: Node.js 런타임 메트릭
type: multi-code-lang
---

<div class="alert alert-warning">
이 기능은 공용 베타 단계입니다.
</div>

## 자동 설정

추적 옵션 `tracer.init({ runtimeMetrics: true })`나 환경 변수 `DD_RUNTIME_METRICS_ENABLED=true`를 통해 추적 클라이언트의 구성 파라미터로 런타임 메트릭 수집을 활성화할 수 있습니다.


   {{< tabs >}}
{{% tab "환경 변수" %}}

```shell
export DD_RUNTIME_METRICS_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "코드 내" %}}

```js
const tracer = require('dd-trace').init({
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3',
  runtimeMetrics: true
})
```

{{% /tab %}}
{{< /tabs >}}

Node 서비스와 연결해 런타임 메트릭을 볼 수 있습니다. Datadog의 [서비스 카탈로그][1]를 참고하세요.

기본적으로 애플리케이션 런타임 메트릭은 DogStatsD를 사용하여 `8125` 포트를 통해 Datadog 에이전트로 전송됩니다. [에이전트에 DogStatsD가 활성화되어 있는지 확인하세요][2].
에이전트를 컨테이너로 실행하는 경우 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`이 [true로 설정][3]되어 있는지 확인하고 `8125` 포트가 에이전트에 개방되어 있는지 확인하세요.
쿠버네티스의 경우 [DogstatsD 포트를 호스트 포트로 바인딩][4]하세요. ECS의 경우 [작업을 정의할 때 적절한 플래그를 설정][5]하세요.

또는 에이전트는 UDP 전송의 대안으로 유닉스 도메인 소켓(UDS)을 사용하여 메트릭을 수집할 수 있습니다. 자세한 내용은 [DogStatsD 를 통한 Unix 도메인 소켓][7]을 참조하세요.

## 수집된 데이터

런타임 메트릭을 활성화하면 기본적으로 다음 메트릭을 수집할 수 있습니다.

{{< get-metrics-from-git "노드" >}}

Datadog에서는 APM 서비스 페이지에 이 메트릭을 표시하고 [기본 Node 런타임 대시보드][6]를 제공합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: /ko/agent/docker/#dogstatsd-custom-metrics
[4]: /ko/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ko/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
[7]: /ko/developers/dogstatsd/unix_socket/