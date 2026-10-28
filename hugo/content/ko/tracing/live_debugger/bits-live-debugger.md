---
aliases:
- /ko/tracing/live_debugger/debug-with-bits/
description: Bits Code를 사용하여 대화형 인터페이스를 통해 Live Debugger 세션을 생성하고 관리합니다.
further_reading:
- link: /bits_ai/bits_code/
  tag: 설명서
  text: Bits Code
- link: /tracing/live_debugger/
  tag: 설명서
  text: Live Debugger
- link: /dynamic_instrumentation/sensitive-data-scrubbing/
  tag: 설명서
  text: 민감한 데이터 스크러빙
- link: https://www.datadoghq.com/blog/live-debugger/
  tag: 블로그
  text: Datadog Live Debugger를 사용하여 재배포 없이 라이브 프로덕션 코드 디버그하기
title: Bits Live Debugger
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Bits Live Debugger는 미리 보기로 제공되고 있습니다. 대기자 명단에 등록하려면 액세스 권한을 요청하세요.
{{< /beta-callout >}}

## 개요 {#overview}

Bits Live Debugger는 자연어를 통해 실행 중인 서비스를 조사할 수 있도록 Live Debugger에 대화형 인터페이스를 제공합니다. 조사하려는 내용을 설명하면 Bits가 로그포인트를 배치하고, 변수 스냅샷을 검색하며, 결과를 해석합니다. Bits가 근본 원인을 식별한 후에는 코드 수정 사항을 제안할 수 있습니다.

모든 디버깅 활동은 [Live Debugger][1]를 통해 실행되므로 동일한 [권한][2], 속도 제한, 자동 만료 동작 및 [민감한 데이터 스크러빙][3]이 적용됩니다.

Bits Live Debugger 기능은 Live Debugger 페이지에서만 액세스할 수 있습니다.

<div class="alert alert-info">
Bits Live Debugger는 기본 Agent로 <a href="/bits_ai/bits_code/">Bits Code</a>를 사용합니다. Bits Live Debugger 미리 보기 단계에서는 Live Debugger를 통해 세션을 시작할 때 Bits Code AI 크레딧이 차감되지 않습니다.
</div>

## 전제 조건 {#prerequisites}

Bits Live Debugger를 사용하기 전에:

- [Live Debugger][1]가 타겟 서비스에 대해 활성화되어 있어야 합니다. 자세한 내용은 [Live Debugger 활성화][7]를 참조하세요.
- 계정에 타겟 환경에 대한 읽기, 쓰기 및 변수 캡처 권한을 포함하여 Live Debugger를 사용하는 데 필요한 [권한][2]이 있어야 합니다.
- 조직에서 [Bits Code][5]를 사용할 수 있어야 합니다.
- [소스 코드 통합][6]이 타겟 서비스에 대해 설정되어 있어야 합니다.

## 사용 가능한 작업 {#available-actions}

Bits는 디버깅 세션 중에 다음 Live Debugger 작업을 수행할 수 있습니다.

| 작업 | 설명 |
|--------|-------------|
| 서비스 검색 | 지정된 환경에서 디버깅에 사용할 수 있는 서비스를 찾고 유효성을 검사합니다. |
| 로그포인트 생성 | 특정 코드 위치의 실행 중인 서비스에 로그포인트를 추가합니다. |
| 세션 로그포인트 나열 | 디버그 세션에서 활성화된 로그포인트를 표시합니다. |
| 로그포인트 비활성화 | 디버그 세션의 모든 로그포인트를 비활성화합니다. |
| 스냅샷 데이터 검색 | 활성 로그포인트에서 캡처된 변수 값과 실행 컨텍스트를 가져옵니다. |

Bits가 생성한 로그포인트는 수동으로 생성된 로그포인트와 동일한 규칙을 따릅니다. 이 로그포인트는 읽기 전용이며, 비차단 방식이고, 구성된 시간 제한(10분~2일, 기본값: 60분)이 지나면 자동으로 만료됩니다. Bits는 애플리케이션 상태를 수정하거나 제어 흐름을 변경할 수 없습니다.

## 디버깅 세션 시작하기{#start-a-debugging-session}

1. Datadog에서 [Live Debugger][4]로 이동합니다.
1. Bits Live Debugger 채팅창에서 조사하려는 문제를 설명합니다. 프롬프트를 제출하기 전에 타겟 서비스와 환경을 선택하세요.

   이후 Bits가 자동으로 조사를 진행합니다.
   - 연결된 소스 코드 리포지토리에서 관련 코드 경로를 분석하며, 가설을 세우기 위해 추가 질문을 할 수 있습니다.
   - 필요한 특정 데이터를 캡처하기 위해 관련 코드 위치에 최대 5개의 로그포인트를 구성하고 활성화합니다.
   - 활성 로그포인트에서 로그와 변수 스냅샷을 검색 및 분석하여 가설을 검증하고 응답을 구성합니다.

1. Bits의 응답을 검토하고, 선택적으로 로그포인트, 캡처된 데이터 및 제안된 코드 수정 사항의 세부 정보를 살펴봅니다. 필요에 따라 채팅으로 답장하여 조사를 계속하세요.
1. 언제든지 로그포인트를 비활성화하려면 Bits에게 요청하거나 개별 로그포인트 또는 세션에서 {{< ui >}}Disable{{< /ui >}} 버튼을 클릭하세요.

**참고**: Bits는 일반적으로 필요한 데이터를 검색하는 즉시 생성한 로그포인트를 비활성화합니다. 또한 로그포인트는 구성된 시간 제한이 지나면 자동으로 만료됩니다.

## 동작 및 제한 사항 {#behavior-and-limitations}

**다중 버전 환경**: 타겟 환경에 여러 코드 버전이 배포된 경우, 타겟 파일이 버전마다 다를 수 있습니다. 이 경우, Bits는 로그포인트를 배치하기 전에 타겟 버전을 확인하도록 요청합니다. 이는 로그포인트가 잘못된 줄 번호에 배치되는 것을 방지합니다.

**언어 지원**: 일부 기능은 언어에 따라 다릅니다. 예를 들어, 조건식은 모든 런타임에서 지원되지는 않습니다. 요청한 기능을 타겟 서비스의 언어에서 사용할 수 없는 경우 Bits가 이를 알려줍니다.

**민감한 데이터**: 수동으로 생성된 로그포인트에 적용되는 [민감한 데이터 스크러빙][3] 동작은 Bits가 생성한 로그포인트에도 동일하게 적용됩니다. 프로덕션 환경에서는 숫자 및 부울이 아닌 캡처된 값이 기본적으로 마스킹됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/live_debugger/
[2]: /ko/tracing/live_debugger/#permissions
[3]: /ko/dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/
[5]: /ko/bits_ai/bits_code/
[6]: /ko/source_code/source-code-management/
[7]: /ko/tracing/live_debugger/#enable-live-debugger