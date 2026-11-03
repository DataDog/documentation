---
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: 설명서
  text: Node.js 애플리케이션 트레이싱
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: 설명서
  text: Node.js 로그와 트레이스의 상관관계 설정
title: Node.js Cloud Run 작업 계측
type: multi-code-lang
---
## 설정 {#setup}

<div class="alert alert-info">샘플 애플리케이션은 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/node">GitHub에서 제공됩니다</a>.</div>
<div class="alert alert-info">
Cloud Run Jobs에서 모든 Datadog 기능에 대한 완전한 가시성과 액세스를 확보하려면
<a href="/integrations/google_cloud_platform/">Google Cloud 통합</a>을 설치했는지 확인하세요.
그리고<a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init 1.9.0 이상 버전</a>을 사용하고 있는지 확인하세요.
</div>

1. **Datadog Node.js SDK를 설치합니다**.

   1. 메인 애플리케이션에 `dd-trace` 패키지를 설치합니다.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. `NODE_OPTIONS` 환경 변수를 사용하여 Node.js 트레이서를 초기화합니다.
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   **참고**: Cloud Run Jobs는 요청을 처리하는 대신 작업이 완료될 때까지 실행되므로 자동 계측으로는 최상위 수준의 'job' 스팬이 생성되지 않습니다. 엔드투엔드 가시성을 확보하려면 루트 스팬을 직접 생성하세요. [Node.js 사용자 지정 계측][1] 지침을 참조하세요.

   자세한 내용은 [Node.js 애플리케이션 트레이싱][2]을 참조하세요.

2. **serverless-init을 설치합니다**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" cloudservice="jobs" %}}

3. **로그를 설정합니다.**

   로깅을 활성화하려면 `DD_LOGS_ENABLED=true` 환경 변수를 설정합니다. 이렇게 하면 `serverless-init`이 stdout 및 stderr에서 로그를 읽을 수 있습니다.

   Datadog은 고급 Datadog 로그 구문 분석 기능을 활성화하기 위해`DD_LOGS_INJECTION=true` 및 `DD_SOURCE=nodejs` 환경 변수를 설정할 것을 권장합니다.

   여러 줄로 된 로그를 하나의 로그 메시지로 보존하려면 Datadog은 로그를 JSON 형식으로 작성할 것을 권장합니다. 예를 들어,`winston`과 같은 타사 로깅 라이브러리를 사용할 수 있습니다.
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

   자세한 내용은 [Node.js 로그와 트레이스의 상관관계 설정][3]을 참조하세요.

4. **애플리케이션을 구성합니다**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **사용자 지정 메트릭을 전송합니다**.

   사용자 지정 메트릭을 전송하려면 [코드 예시를 조회][4]하세요. 서버리스에서는 *분포* 메트릭 유형만 지원됩니다.

8. **프로파일링을 활성화합니다(미리 보기)**.

   [Continuous Profiler][7]를 활성화하려면 환경 변수 `DD_PROFILING_ENABLED=true`를 설정합니다.

   <div class="alert alert-info">Datadog의 Continuous Profiler는 Google Cloud Run Jobs에서 미리 보기로 제공되고 있습니다.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## 문제 해결 {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/custom_instrumentation/nodejs/dd-api?tab=locally#creating-spans
[2]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[7]: /ko/profiler/