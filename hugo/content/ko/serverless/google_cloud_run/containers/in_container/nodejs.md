---
aliases:
- /ko/serverless/google_cloud_run/containers/in_process/nodejs
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: 설명서
  text: Node.js 애플리케이션 트레이싱
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: 설명서
  text: Node.js 로그 및 트레이스 상관관계 수립
title: Node.js Cloud Run 컨테이너 내부 계측(In-Container)
type: multi-code-lang
---
## 설정 {#setup}

<div class="alert alert-info">샘플 애플리케이션은 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/node">GitHub에서 확인할 수 있습니다</a>.</div>

1. **Datadog Node.js SDK를 설치합니다**.

   1. 메인 애플리케이션에서 `dd-trace` 패키지를 설치합니다.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Node.js 트레이서를 `NODE_OPTIONS` 환경 변수로 초기화합니다.
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   자세한 내용은 [Node.js 애플리케이션 트레이싱][1]을 참조하세요.

2. **serverless-init을 설치합니다**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" %}}

3. **로그를 설정합니다**.

   로깅을 활성화하려면 `DD_LOGS_ENABLED=true` 환경 변수를 설정합니다. 이렇게 하면 `serverless-init`이 stdout 및 stderr에서 로그를 읽을 수 있습니다.

   Datadog은 고급 Datadog 로그 구문 분석을 활성화하기 위해 환경 변수 `DD_LOGS_INJECTION=true` 및 `DD_SOURCE=nodejs`를 설정할 것을 권장합니다.

   줄이 여러 개인 로그를 로그 메시지 하나에 보존하고자 하는 경우, 로그를 JSON 형식으로 쓰는 것이 좋습니다. 예를 들어 `winston`과 같은 타사 로깅 라이브러리를 사용할 수 있습니다.
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   자세한 내용은 [Node.js 로그 및 트레이스 상관관계 수립][2]을 참조하세요.

4. **애플리케이션을 구성합니다**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **커스텀 메트릭을 전송합니다**.

   커스텀 메트릭을 전송하려면 [코드 예시를 참고][3]하세요. 서버리스에서는 *분포* 메트릭 유형만 지원됩니다.

7. **프로파일링을 활성화합니다(미리 보기)**.

   [Continuous Profiler][6]를 활성화하려면 환경 변수 `DD_PROFILING_ENABLED=true`를 설정합니다.

   <div class="alert alert-info">Datadog의 Continuous Profiler는 Google Cloud Run 서비스에서 미리 보기로 제공됩니다.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub을 사용한 분산 추적 {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## 문제 해결 {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /ko/profiler/