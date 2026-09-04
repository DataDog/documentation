---
aliases:
- /ko/tracing/error_tracking/executional_context
- /ko/tracing/error_tracking/execution_replay/
description: Error Tracking의 Exception Replay에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: 블로그
  text: Datadog Exception Replay로 프로덕션 디버깅 간소화하기
- link: /tracing/live_debugger
  tag: 설명서
  text: Datadog Live Debugger에 대해 알아보기
- link: /error_tracking/monitors
  tag: 설명서
  text: Error Tracking 모니터에 대해 알아보기
- link: /tracing/error_tracking
  tag: 설명서
  text: APM 백엔드 서비스를 위한 Error Tracking에 대해 알아보기
is_beta: true
title: Error Tracking의 Exception Replay
---
<div class="alert alert-info">
Exception Replay는 Python, Java, .NET, PHP에서 정식으로 제공되며,
<a href="#requirements--setup">지원되는 경우</a>에 기본적으로 활성화되어 있습니다.
</div>

## 개요 {#overview}

Exception Replay는 예외 발생 시 실행 컨텍스트와 로컬 변수 값을 캡처하여 진단을 돕고,
문제를 더 빠르게 재현하고 해결할 수 있도록 지원합니다. 스택 트레이스 및 변수
스냅샷을 포함한 주변 상태를 기록한 다음, 이 데이터를 다른 문제 세부 정보와 함께 Error Tracking에 직접 표시합니다.

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

Exception Replay는 프로덕션 환경에서 사용하도록 설계되었습니다. 스냅샷에는 속도 제한이 적용되며 민감한 데이터는 자동으로
[마스킹](#sensitive-data-redaction)됩니다. 활성화되면 애플리케이션에서 예외를 기다렸다가
Datadog으로 전달하기 전에 스택 트레이스 및 로컬 변수의 스냅샷을 캡처합니다.

<div class="alert alert-info">
<b>지원되는 제품은 무엇인가요?</b>
Exception Replay는 <b>APM 기반 예외</b>에만 사용할 수 있으며 로그나 RUM의 오류는 지원하지 않습니다.
</div>

## 요구 사항 및 설정{#requirements-setup}

Exception Replay는 Python, Java, .NET, PHP를 지원하며 APM 기반 예외만 캡처합니다. 이를 이용하려면
[Datadog Agent][12]와 [APM 계측 애플리케이션][1]이 필요합니다. 전체
환경, 인앱의 개별 서비스나 환경 변수를 사용하는 특정 서비스에 대해 활성화할 수 있습니다.

활성화 메서드는 트레이서 버전과 [Remote Configuration][2] 사용 가능 여부에 따라 달라집니다. 아래의 표를 참조하여
자세한 내용을 알아보세요.

| | 환경별<br>(일괄) | 서비스별<br>(인앱) | 서비스별<br>(환경 변수) |
|---|---|---|---|
| **활성화 방법** | 기본적으로 활성화됨| 설정 페이지| 환경 변수|
| **Agent 버전** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **트레이서 최소 버전** | [Python][8] ≥ 3.15.0<br>[Java][9] ≥ 1.54.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 3.10.0<br>[Java][9] ≥ 1.48.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 1.16.0<br>[Java][9] ≥ 1.47.0<br>[.NET][10] ≥ 2.53.0<br>[PHP][11] ≥ 1.12.1 |
| **Remote Configuration 필요 여부** | 예 | 예 | 아니요 |

인앱에서 Exception Replay를 활성화하려면 Error Tracking의 Exception Replay {{< ui >}}Settings{{< /ui >}} 페이지로 이동하여,
원하는 환경 또는 서비스를 선택하고 토글을 {{< ui >}}Enabled{{< /ui >}}로 설정하세요.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="설정 페이지를 통해 Exception Replay 활성화하기" style="width:90%" >}}

인앱 활성화를 사용할 수 없는 경우, 환경 변수를 설정하세요.

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

이 변수는 인앱 구성을 재정의하는 데 사용할 수도 있으며, 둘 다 설정된 경우 우선순위를 갖습니다.

### Exception Replay 스냅샷을 위한 logs index 생성{#create-a-logs-index-for-exception-replay-snapshots}

Exception Replay 스냅샷 전용 로그 인덱스를 생성하고, 원하는 보존 기간을 설정하고 샘플링 없이 구성하세요.

- 필터를 `source:dd_debugger`로 설정하세요.
- 이 인덱스가 이 태그와 일치하는 다른 인덱스보다 우선순위를 갖도록 설정하세요(첫 번째 일치 항목 우선).

<div class="alert alert-info">
<b>로그 인덱스를 생성하는 이유</b>
Exception Replay 스냅샷은 원본 APM 스팬으로 돌아가는 링크가 포함된 로그로 내보내집니다.
</div>

### 소스 코드 연결하기 {#link-your-source-code}

Datadog 소스 코드 통합을 활성화하면 Error Tracking 스택 트레이스 내에서 직접 코드 미리보기를 확인할 수
있습니다. Exception Replay 스냅샷이 캡처되면 코드 미리보기에서 변수 이름 위로 마우스를 가져가서
캡처된 값을 확인할 수 있습니다.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="소스 코드 통합을 사용한 Exception Replay" style="width:90%" >}}

## 민감한 데이터 마스킹 {#sensitive-data-redaction}

Exception Replay는 스냅샷이 사용 가능해지기 전에 민감한 데이터를 보호하기 위해 자동 모드 및 식별자 기반
마스킹을 적용합니다.

### 모드 기반 마스킹 {#mode-based-redaction}

Exception Replay에는 두 가지 마스킹 모드가 있습니다.

- {{< ui >}}Strict Mode{{< /ui >}}: 숫자와 부울을 제외한 모든 값을 마스킹합니다.
- {{< ui >}}Targeted Mode{{< /ui >}}: 신용카드 번호, API 키, IP 및 기타 PII와 같이 알려진 민감한 패턴을 마스킹합니다. 또한 스냅샷에 `[REDACTED:HIGH_ENTROPY]`로 표시되는 잠재적인 시크릿을 자동으로 마스킹하는 고엔트로피 시크릿 스캐너를 실행합니다.

이러한 마스킹 모드는 비활성화할 수 없고 전환만 가능하며, Targeted Mode는 일반적인
사전 프로덕션 환경(예: `staging` 또는 `preprod`)에 자동으로 적용됩니다.

### 식별자 기반 마스킹 {#identifier-based-redaction}

[공통 민감 식별자][3]와 연결된 변수 값(예: `password`, `accessToken` 및 유사한 용어)은
스냅샷이 호스트를 떠나기 전에 스크러빙됩니다. 추가적인 언어별 마스킹 규칙이 각 트레이서에 내장되어 있습니다
(예: Python 트레이서는 기본 민감 식별자 목록을 유지합니다).

다음을 통해 마스킹 동작을 확장할 수 있습니다.

- 사용자 지정 식별자 기반 마스킹
- 클래스/유형 기반 마스킹 규칙
- Sensitive Data Scanner 규칙

[Dynamic Instrumentation 민감한 데이터 스크러빙 지침][4] 및 [Sensitive Data Scanner][5] 문서를 참조하여
구성 세부 정보를 확인하세요.

<div class="alert alert-info">
<b>DI 지침이 필요한 이유</b>
Exception Replay는 <a href="/tracing/dynamic_instrumentation/">DI(Dynamic Instrumentation)</a>를 기반으로 하므로,
민감한 데이터 스크러빙 구성 옵션도 여기에 적용됩니다.
</div>

## 문제 해결하기 {#troubleshooting}

### 누락된 변수 값 {#missing-variable-values}

Exception Replay 스냅샷은 **인스턴스당 예외 유형별로 시간당 하나의 스냅샷**으로 속도가 제한됩니다. 일부 런타임에서는
특정 예외에 대해 **두 번째 발생** 이후에만 스냅샷이 캡처됩니다.

### 스냅샷이 나타나지 않을 수 있는 추가 이유 {#additional-reasons-a-snapshot-may-not-appear}

- Exception Replay가 활성화되지 않음
- 선택한 시간 범위 외에서 스냅샷 발생
- 타사 패키지 제외(타사 패키지를 포함하려면 `DD_THIRD_PARTY_DETECTION_EXCLUDES` 사용)
- [로그 인덱스][6] 보존 설정 또는 이전 인덱스의 [제외 필터][7]로 인해 `source:dd_debugger`가 포함된 로그 누락
- Exception Replay를 FedRAMP 리전에서 사용할 수 없음
- Java: JDK 18 이하 버전에서는 `-parameters` 플래그로 컴파일한 클래스가 지원되지 않을 수 있습니다. Spring 6+, Spring Boot 3+, Scala는 기본적으로 이 플래그를 사용합니다.

Error Tracking Explorer에서 쿼리 `@error.debug_info_captured:true`를 사용하여 Exception Replay
스냅샷이 포함된 오류를 찾으세요.

### GovCloud(Java)의 BatchUploader WARN 메시지 {#batchuploader-warn-messages-on-govcloud-java}

GovCloud 사이트(`app.ddog-gov.com`)에서 Java 트레이서는 HTTP 403 및 `This traffic is not permitted on your account`와 유사한 텍스트와 함께 `com.datadog.debugger.uploader.BatchUploader`에서 주기적인 WARN 메시지를 기록할 수 있습니다. 이는 Exception Replay, Dynamic Instrumentation 및 Code Origin for Spans가 지원되지 않는 사이트에서 디버거 관련 업로드를 시도할 때 예상되는 현상입니다. 핵심 APM 기능(트레이스, 메트릭, 프로파일링, 로그 주입)은 영향을 받지 않습니다.

이 로그 메시지를 중지하려면 Java 애플리케이션 포드에서 다음 환경 변수를 설정하고 워크로드를 다시 시작하세요.

```bash
DD_EXCEPTION_REPLAY_ENABLED=false
DD_DYNAMIC_INSTRUMENTATION_ENABLED=false
DD_CODE_ORIGIN_FOR_SPANS_ENABLED=false
```

또는 JVM 시스템 속성을 사용하세요.

```bash
-Ddd.exception.replay.enabled=false
-Ddd.dynamic.instrumentation.enabled=false
-Ddd.code.origin.for.spans.enabled=false
```

수정 사항을 검사하려면 트레이서 시작 JSON(`DATADOG TRACER CONFIGURATION`)을 검사하고 `debugger_exception_enabled`, `debugger_enabled`, `debugger_span_origin_enabled`가 모두 `false`인지 검사하세요. WARN 메시지는 약 5분마다 한 번으로 속도가 제한되어 있므로, 메시지가 중지되었는지 확인하기 전에 다시 시작한 후 최소한 이 시간 동안 대기합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[2]: /ko/tracing/guide/remote_config
[3]: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py
[4]: /ko/dynamic_instrumentation/sensitive-data-scrubbing/
[5]: /ko/security/sensitive_data_scanner/
[6]: https://app.datadoghq.com/logs/pipelines/indexes
[7]: /ko/logs/log_configuration/indexes/#exclusion-filters
[8]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[10]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[11]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[12]: /ko/agent/