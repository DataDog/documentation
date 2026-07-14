---
aliases:
- /ko/tracing/code_origins/
- /ko/tracing/guide/code_origins/
description: Code Origin을 사용하여 코드베이스에서 스팬의 출처를 파악하는 방법 알아보기
further_reading:
- link: /tracing/glossary/
  tag: 설명서
  text: APM 용어 및 개념 알아보기
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 APM 트레이싱 설정 방법 알아보기
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: /tracing/live_debugger/
  tag: 설명서
  text: Live Debugger를 사용하여 프로덕션 서비스를 디버그하는 방법 알아보기
- link: /dynamic_instrumentation/
  tag: 설명서
  text: Dynamic Instrumentation을 사용하여 사용자 지정 스팬을 추가하는 방법 알아보기
title: 스팬의 Code Origin
---
## 개요 {#overview}

Code Origin은 APM 스팬이 코드베이스의 정확히 어느 위치에서 생성되었는지 캡처합니다. 호환되는 서비스에서 활성화하면 각 [서비스 엔트리 스팬][12]에 자동으로 파일 경로, 라인 번호, 함수 이름을 추가하여 다음과 같은 작업이 간편해집니다.

- 성능 문제 디버그
- 코드 실행 흐름 이해
- 성능 병목 식별

Trace Explorer의 활성화된 서비스의 스팬을 선택하여 개요 탭에서 Code Origin 세부 정보를 확인하세요.
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Code Origin 세부 정보" style="width:100%;">}}


## 시작하기 {#getting-started}

### 전제 조건 {#prerequisites}
- [Datadog APM][6]이 스팬을 캡처하도록 구성되어 있습니다.
- [Source Code Integration][7]이 활성화되어 있습니다(코드 미리 보기에 필수).
- 서비스가 [호환성 요구 사항](#compatibility-requirements)을 충족합니다.

### 호환성 요구 사항 {#compatibility-requirements}

{{% tabs %}}

{{% tab "Java" %}}

| SDK 버전 | 프레임워크 |
|---|---|
| 1.47.0+ | Spring Boot/Data, gRPC servers, Micronaut 4, Kafka 소비자 |

**제한 사항:** JDK 18 이하 버전에서는 `-parameters` 플래그로 컴파일한 클래스가 지원되지 않을 수 있습니다. Spring 6+, Spring Boot 3+, Scala는 기본적으로 이 플래그를 사용합니다.

{{% /tab %}}

{{% tab "Python" %}}

| SDK 버전 | 프레임워크 |
|---|---|
| 2.15.0+ | Django, Flask, Starlette 및 파생 제품 |

{{% /tab %}}

{{% tab "Node.js" %}}

| SDK 버전 | 프레임워크 |
|---|---|
| 4.49.0+ | Fastify |
| 5.54.0+ | Express |

**참고:** NestJS는 기본 프레임워크가 Express 또는 Fastify여도 지원되지 않습니다.

{{% /tab %}}

{{% tab ".NET" %}}

| SDK 버전 | 프레임워크 |
|---|---|
| 3.15.0+ | ASP.NET, ASP.NET Core |

{{% /tab %}}

{{% tab "PHP" %}}

| SDK 버전 | 프레임워크 |
|---|---|
| 1.11.0+ | 지원되는 모든 웹 프레임워크 |

{{% /tab %}}

{{% /tabs %}}

### Code Origin 활성화 {#enable-code-origin}

다음 환경 변수로 서비스 실행:

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  트랜스파일된 Node.js 애플리케이션의 경우(예: TypeScript) 배포된 애플리케이션으로 소스 맵을 생성 및 게시하고, Node.js를 <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> 플래그를 사용하여 실행하며 Node.js 트레이서 v5.59.0 이후 버전을 사용해야 합니다. 그러지 않으면 코드 미리 보기가 작동하지 않습니다. 자세한 내용은 Node.js <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">Source Code Integration</a> 설명서를 참조하세요.
</div>

## Code Origin 사용 {#using-code-origin}

### Trace Explorer에서 {#in-the-trace-explorer}

1. [Trace Explorer][1]로 이동합니다.
1. Code Origin이 활성화된 서비스에서 "서비스 엔트리 스팬"을 검색합니다.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - 서비스 엔트리 스팬 검색" style="width:100%;">}}

1. 스팬을 클릭하여 해당 스팬의 세부 정보를 조회합니다.
1. 트레이스 세부 정보 사이드 패널에서 "Code Origin" 섹션을 찾습니다.

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Trace Explorer의 Code Origin 세부 정보" style="width:100%;">}}

1. Code Origin 섹션에서:
    - "디버그 세션 시작"을 클릭하여 실행 중인 서비스에서 [Live Debugger][11] 세션을 시작해 Code Origin 메서드 위치에서 로그를 캡처합니다. 또는 코드 미리 보기의 여백에서 중단점을 선택하여 선택한 코드 라인에서 로그를 캡처합니다.

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Code Origin - Live Debugger 세션 시작" style="width:100%;">}}

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Dynamic Instrumentation을 사용하여 스팬 태그 추가" style="width:100%;">}}


### IDE에서 {#in-your-ide}

1. [Datadog IDE 통합][4]을 설정합니다.
    - 지원되는 IDE: IntelliJ, VS Code
    - 지원되는 언어: Java, Python
2. RED(Requests, Errors, Duration) 메트릭을 엔드포인트 메서드 위의 인라인 어노테이션으로 조회합니다.

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="IDE의 Code Origin 세부 정보" style="width:100%;">}}

## 문제 해결 {#troubleshooting}

### Code Origin 섹션이 없음 {#code-origin-section-is-missing}

- SDK 구성에서 Code Origin이 [활성화](#enable-code-origin)되어 있는지 확인합니다.
- 서비스가 모든 [호환성 요구 사항](#compatibility-requirements)(즉 서비스 언어, 지원되는 프레임워크, 최소 트레이서 버전)을 충족하는지 확인합니다.
- 대부분의 서비스에서 Code Origin은 [서비스 엔트리 스팬][12]에 대해서만 캡처됩니다. [APM Trace Explorer][1]에서 "서비스 엔트리 스팬"으로 필터링할 수 있습니다.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - 서비스 엔트리 스팬 검색" style="width:100%;">}}

### 코드 미리 보기가 표시되지 않거나 파일을 찾을 수 없음 {#code-preview-is-not-visible-or-the-file-is-not-found}

- [Source Code Integration][7] 설정 요구 사항을 모두 충족해야 합니다. 여기에는 `DD_GIT_*` 환경 변수를 올바른 값으로 구성하는 것도 포함합니다.
- 트랜스파일된 Node.js 애플리케이션의 경우(예: TypeScript), 배포된 애플리케이션으로 소스 맵을 생성 및 게시하고, Node.js를 [`--enable-source-maps`][10] 플래그로 실행하고 Node.js 트레이서 v5.59.0 이후 버전을 사용해야 합니다. 그러지 않으면 코드 미리 보기가 작동하지 않습니다. 자세한 내용은 Node.js [Source Code Integration][9] 설명서를 참조하세요.
- Code Origin은 사용자 코드만 참조하도록 설계되었지만, 상황에 따라 타사 코드 참조가 포함될 수도 있습니다. 이러한 케이스를 [Datadog 지원팀][13]에 신고해 주시면 이러한 참조를 개선하는 데 도움이 됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /ko/tracing/services/service_page/
[3]: /ko/tracing/services/resource_page/
[4]: /ko/ide_plugins/
[5]: /ko/dynamic_instrumentation/
[6]: /ko/tracing/trace_collection/
[7]: /ko/integrations/guide/source-code-integration/
[8]: /ko/tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /ko/integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /ko/tracing/live_debugger/
[12]: /ko/glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/