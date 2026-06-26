---
description: 오류 추적 어시스턴트에 대해 알아보기
further_reading:
- link: /monitors/types/error_tracking
  tag: 설명서
  text: 오류 추적에서 실행 컨텍스트를 사용하는 방법 알아보기
- link: /tracing/error_tracking
  tag: 설명서
  text: 백엔드 서비스 오류 추적에 대해 알아보기
is_beta: true
private: true
title: 오류 추적 어시스턴트
---

{{< beta-callout url="#" btn_hidden="true" >}}
APM 오류 추적을 위한 오류 추적 어시스턴트는 비공개 베타 버전입니다. 액세스를 요청하려면 support@datadoghq.com을 통해 지원팀에 문의하세요.
{{< /beta-callout >}}

## 개요

APM 오류 추적의 오류 추적 어시스턴트는 오류에 대한 요약 내용을 제공하고 제안된 테스트 사례 및 수정 사항을 통해 오류를 해결하는 데 도움을 줍니다.

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="오류 추적 탐색기 실행 컨텍스트" style="width:100%" >}}

## 필수 요건 및 설정
지원 언어
: Python, Java

오류 추적 어시스턴트를 사용하려면 [소스 코드 통합][3]이 필요합니다. 소스 코드 통합을 활성화하려면:

1. **Integrations**로 이동하여 상단 탐색 모음에서 **Link Source Code**를 선택하세요.
2. 단계에 따라 커밋을 원격 측정과 연결하고 GitHub 리포지토리를 구성합니다.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="APM 소스 코드 통합 설정" style="width:80%" >}}

### 추가 설정(권장)
- 실제 프로덕션 변수 값을 어시스턴트에 제공하여 Python에 대한 제안을 강화하려면 [Python 실행 컨텍스트 베타][1]에 등록합니다.
- 테스트 사례 및 수정 사항을 IDE에 보내려면 생성된 제안에서 **Apply in VS Code**를 클릭하고 안내된 설정에 따라 Datadog VS Code 확장을 설치합니다.

## 시작하기
1. [**APM** > **Error Tracking**][4]으로 이동합니다.
2. 오류 추적 이슈를 클릭하여 새 **Generate test & fix** 섹션을 확인합니다.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="오류 추적 어시스턴트" style="width:80%" >}}

## 트러블슈팅

생성된 제안이 표시되지 않는 경우:

1. Github 통합과 함께 [소스 코드 통합][2]이 올바르게 구성되었는지 확인하세요.
2. [Python 실행 컨텍스트 베타][1]에 등록하여 오류 추적 어시스턴트 제안을 강화하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /ko/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking