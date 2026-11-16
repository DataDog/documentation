---
algolia:
  tags:
  - error tracking
description: 백엔드 서비스에서 수집된 오류를 검색하고 관리하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: 블로그
  text: 서비스 텔레메트리, Error Tracking, SLO 등을 한곳에서 확인하세요.
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Trace Explorer에 대해 알아보기
- link: /tracing/error_tracking/explorer
  tag: 설명서
  text: Error Tracking 탐색기에 대해 알아보기
- link: /monitors/types/error_tracking/
  tag: 설명서
  text: Error Tracking 모니터 만들기
title: 백엔드 서비스 Error Tracking
---
## 개요 {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Error Tracking Explorer의 문제 세부 정보" style="width:100%;" >}}

{{% error-tracking-description %}}

## 설정 {#setup}

Error Tracking은 APM에서 지원하는 모든 언어에서 사용할 수 있습니다. 추가 SDK나 구성 변경이 필요하지 않습니다.

(선택 사항) 스택 트레이스에서 코드 스니펫을 확인하려면 [GitHub 통합][4]을 설정하세요.

{{< img src="tracing/error_tracking/inline_code_snippet_2.png" alt="스택 트레이스의 인라인 코드 스니펫" style="width:70%;" >}}

리포지토리 설정을 시작하려면 [소스 코드 통합 설명서][6]를 참조하세요.

## 스팬 속성을 사용한 오류 스팬 추적 {#use-span-attributes-to-track-error-spans}

Datadog SDKs는 통합 및 백엔드 서비스 소스 코드의 수동 계측을 통해 오류를 수집합니다. 오류 스팬이 추적되려면 `error.stack`, `error.message`, `error.type` [스팬 속성][1]을 포함하고 전체 트레이스에 속해야 합니다. 서비스 내에서 오류가 여러 번 보고되면 최상위 오류만 유지됩니다.

<div class="alert alert-warning">
Go 트레이서는 v2.7.0 버전에서 스택 트레이스를 보고하는 데 사용되는 속성을 변경했습니다.
이전 Go 트레이서 버전(v2.7.0 이전)의 경우 스택 트레이스는 <code>error.stack</code> 스팬 속성으로 보고됩니다.
v2.7.0부터 Go 트레이서는 처리 스택 트레이스를 <code>error.handling_stack</code> 스팬 속성으로 보고합니다( <code>error.stack</code> 이제 사용 가능한 경우 예외 발생 스택을 포함함).
자세한 내용은 <a href="/tracing/error_tracking/stack_traces/">Error Tracking의 스택 트레이스</a>를 참조하세요.
</div>

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="오류가 포함된 플레임 그래프" style="width:100%;" >}}

Error Tracking은 처리하는 각 오류 스팬에 대한 핑거프린트를 계산합니다. 핑거프린트는 오류 유형, 오류 메시지, 스택 트레이스를 구성하는 프레임을 사용합니다. 동일한 핑거프린트를 가진 오류는 함께 그룹화되며 동일한 문제에 속합니다. 자세한 내용은 [Trace Explorer 설명서][2]를 참조하세요.

## 추적할 오류 제어 {#control-which-errors-are-tracked}

Error Tracking은 모든 오류 스팬을 자동으로 처리하지만, 수집할 오류와 관리 방법을 제어할 수 있습니다.

- **포함 및 제외 규칙으로 오류 필터링**: 서비스, 환경 또는 오류 유형과 같은 속성을 기반으로 오류를 포함하거나 제외하는 규칙을 정의하세요. [데이터 수집 관리][7]를 참조하세요.
- **속도 제한 설정**: 하루에 수집되는 오류 양을 제어하여 비용을 관리하세요. [데이터 수집 관리][7]를 참조하세요.
- **특정 문제 제외**: 반복되는 조치가 필요 없는 문제를 `EXCLUDED`로 표시하여 수집을 중단하세요. [문제 상태][8]를 참조하세요.
- **전체 트레이스 필터링**: 오류를 필터링하는 대신 트레이스가 Datadog으로 전송되지 않도록 방지하세요. [APM에서 원치 않는 리소스 무시][9]를 참조하세요.

## 문제 검토를 통한 문제 해결 또는 디버깅 시작 {#examine-issues-to-start-troubleshooting-or-debugging}

Error Tracking은 백엔드 서비스에서 수집된 오류를 [Error Tracking Explorer][5]의 문제로 자동 분류합니다. 주요 기능에 대한 안내는 [Error Tracking Explorer 설명서][3]를 참조하세요.

애플리케이션 성능 모니터링(APM) 분포에서 생성된 이슈에는 영향을 받은 스팬, 가장 관련된 최신 스택 트레이스, 스팬 속성, 호스트 태그, 컨테이너 태그 및 메트릭이 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/visualization/trace/?tab=spantags#more-information
[2]: /ko/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /ko/tracing/error_tracking/explorer
[4]: /ko/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /ko/integrations/guide/source-code-integration
[7]: /ko/error_tracking/manage_data_collection/
[8]: /ko/error_tracking/issue_states/
[9]: /ko/tracing/guide/ignoring_apm_resources/