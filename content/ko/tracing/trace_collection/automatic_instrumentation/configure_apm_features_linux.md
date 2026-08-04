---
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: 설명서
  text: Single Step 계측에 대해 자세히 알아보기
title: Linux 기반 SDK 종속 제품 활성화
---

{{< callout url="#" btn_hidden="true" header="false" >}}
다음 기능이 미리 보기에 있습니다.
{{< /callout >}}

## 개요

SSI(Single Step Instrumentation)을 사용하는 Linux 호스트의 경우, `application_monitoring.yaml` 파일을 통해 호스트 수준에서 Datadog SDK 종속 제품을 활성화하거나 비활성화할 수 있습니다. 호스트 기반 모든 계측 서비스가 이러한 설정을 상속받습니다.

## 설정 단계

1. 다음 경로에 `application_monitoring.yaml` 파일이 있는지 확인합니다.

   ```
   /etc/datadog-agent/application_monitoring.yaml
   ```

1. 제품을 활성화 또는 비활성화하려면 `apm_configuration_default` 블록에서 제품을 정의하고 `true` 또는 `false`로 설정합니다.

   **참고: [SDK에 설정된 환경 변수][1]를 통해 제품을 활성화한 경우 해당 값은 `application_monitoring.yaml` 설정보다 우선합니다.

   예를 들어 다음은 프로파일링 및 Data Streams Monitoring을 활성화하고 추적을 비활성화합니다.

   ```
   apm_configuration_default:
     DD_PROFILING_ENABLED: true
     DD_DATA_STREAMS_ENABLED: true
     DD_APM_TRACING_ENABLED: false
   ```

## 지원되는 제품 및 구성 키

다음 표에는 제품 및 해당 구성 키가 나열되어 있습니다.


| 제품                          | 구성 키             |
|----------------------------------|-------------------------------|
| [APM 추적][2]                      | `DD_APM_TRACING_ENABLED`      |
| [Continuous Profiler][3]              | `DD_PROFILING_ENABLED`        |
| [Data Streams Monitoring][4]          | `DD_DATA_STREAMS_ENABLED`     |
| [AAP(App and API Protection)][5]     | `DD_APPSEC_ENABLED`           |
| [IAST(Code Security)][6]             | `DD_IAST_ENABLED`             |
| [Data Jobs Monitoring][7]             | `DD_DATA_JOBS_ENABLED`        |
| [Software Composition Analysis][8]    | `DD_APPSEC_SCA_ENABLED`       |


## SDK 버전 요구 사항

다음 최소 SDK 버전은 `application_monitoring.yaml`을 통한 구성을 지원합니다.

| 언어   | 최소 SDK 버전 |
|------------|---------------------|
| Java       | v1.47.0             |           
| Python     | v3.2.0              |           
| Node.js    | v5.41.0             |           
| .NET       | 아직 지원 안 됨   |
| PHP        | v1.8.0              |
| Ruby       | v2.18.0             |
| Go         | v2.1.0              |



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/library_config/
[2]: https://www.datadoghq.com/product/apm/
[3]: https://www.datadoghq.com/product/code-profiling/
[4]: https://www.datadoghq.com/product/data-streams-monitoring/
[5]: https://www.datadoghq.com/dg/security/application-security-management/
[6]: https://www.datadoghq.com/dg/security/code-security/
[7]: https://www.datadoghq.com/product/data-jobs-monitoring/
[8]: https://www.datadoghq.com/product/software-composition-analysis/