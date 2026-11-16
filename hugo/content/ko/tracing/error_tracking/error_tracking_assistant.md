---
description: Error Tracking 어시스턴트에 대해 알아보기
further_reading:
- link: /monitors/types/error_tracking
  tag: 문서
  text: Error Tracking에서 실행 컨텍스트를 사용하는 방법 알아보기
- link: /tracing/error_tracking
  tag: 문서
  text: 백엔드 서비스 Error Tracking에 대해 알아보기
is_beta: true
private: true
title: Error Tracking 어시스턴트
---
{{< callout url="#" btn_hidden="true" >}}
Error Tracking Assistant for APM Error Tracking이 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 support@datadoghq.com으로 지원팀에 문의하세요.
{{< /callout >}}

## 개요 {#overview}

APM Error Tracking의 Error Tracking 어시스턴트는 오류에 대한 요약 내용을 제공하고 제안된 테스트 사례 및 수정 사항을 통해 오류를 해결하는 데 도움을 줍니다. 

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Error Tracking Explorer 실행 컨텍스트" style="width:100%" >}}

## 필수 요건 및 설정 {#requirements-and-setup}
지원되는 언어
: Python, Java

Error Tracking Assistant에는 [Source Code Integration][3]이 필요합니다. Source Code Integration을 활성화하려면 다음 단계를 따르세요.

1. {{< ui >}}Integrations{{< /ui >}}로 이동하여 상단 탐색 모음에서 {{< ui >}}Link Source Code{{< /ui >}}를 선택합니다.
2. 단계에 따라 커밋을 텔레메트리와 연결하고 GitHub 리포지토리를 구성합니다.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="APM 소스 코드 통합 설정" style="width:80%" >}}

### 추가 설정(권장){#recommended-additional-setup}
- 실제 프로덕션 변수 값을 Assistant에 제공하여 Python에 대한 제안을 강화하려면 [Python Executional Context Beta][1]에 등록하세요.
- 테스트 케이스 및 수정 사항을 IDE에 보내려면 생성된 제안에서 {{< ui >}}Apply in VS Code{{< /ui >}}를 클릭하고 안내된 설정에 따라 Datadog VS Code 확장 프로그램을 설치하세요.

## 시작 {#getting-started}
1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][4]으로 이동합니다.
2. Error Tracking 이슈를 클릭하여 새 {{< ui >}}Generate test & fix{{< /ui >}} 섹션을 조회합니다.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Error Tracking 어시스턴트" style="width:80%" >}}

## 문제 해결 {#troubleshooting}

생성된 제안이 표시되지 않는 다음 조치를 취하세요.

1. GitHub Integration과 함께 [Source Code Integration][2]이 올바르게 구성되었는지 확인하세요.
2. [Python Executional Context Beta][1]에 등록하여 Error Tracking Assistant 제안을 강화하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /ko/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking