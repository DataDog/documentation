---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/service_management/workflows/test_and_debug
description: 실행 기록 및 오류 메시지를 사용하여 모니터 트리거, 개별 워크플로 단계를 테스트하고 실패한 단계를 디버깅하세요.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: Workflow Automation 시작
- link: /actions/workflows/build
  tag: 설명서
  text: 워크플로 빌드
- link: /actions/workflows/trigger
  tag: 설명서
  text: 워크플로를 트리거
title: 테스트 및 디버깅
---
## 모니터 트리거를 테스트 {#test-a-monitor-trigger}

워크플로 생성 중에 모니터 트리거를 테스트할 수 있습니다. 모니터를 테스트하면 워크플로를 트리거하기 위해 모니터 알림창에 붙여넣을 수 있는 스니펫이 생성됩니다.

모니터 트리거를 테스트하려면 다음 단계를 따르세요.
1. 워크플로에서 모니터 트리거 액션을 선택합니다.
1. {{< ui >}}Test from Monitor{{< /ui >}}를 클릭합니다.
1. 모니터가 워크플로에 입력을 전달하는 경우, {{< ui >}}Workflow Inputs{{< /ui >}} 아래에 테스트 값을 입력합니다.
1. 테스트할 모니터를 선택합니다.
1. 모니터 상태를 선택합니다.
1. {{< ui >}}Run From Monitor{{< /ui >}}를 클릭합니다.


## 단계 테스트 {#test-a-step}

전체 워크플로를 실행하지 않고도 단계가 원하는 대로 작동하는지 확인하기 위해 단계를 독립적으로 테스트할 수 있습니다.

워크플로 단계를 테스트하려면 다음 단계를 따르세요.
1. 단계의 {{< ui >}}Inputs{{< /ui >}} 섹션에서 {{< ui >}}Test{{< /ui >}}를 클릭합니다.
1. 필요시 단계 구성을 조정합니다. 단계에서 이전 단계의 출력 변수를 사용하는 경우, 단계에서 사용할 하드코딩된 테스트 데이터를 입력하세요.
1. {{< ui >}}Test{{< /ui >}}를 클릭하여 액션을 테스트합니다.
1. 단계 테스트를 완료하면 {{< ui >}}Use in configuration{{< /ui >}}을 클릭하여 새 구성을 워크플로에 적용합니다. 테스트 구성을 저장하지 않고 워크플로로 돌아가려면 화면을 닫으세요.

브랜치 및 로직 액션에는 테스트 기능을 사용할 수 없습니다. 이전 단계의 출력 변수를 사용하는 JavaScript 함수 또는 표현식 액션을 테스트하려면 코드에서 변수를 주석 처리하고 테스트 데이터로 교체하세요. 자세한 내용은 [표현식 및 함수 테스트][6]를 참조하세요.


## 실패한 단계 디버깅 {#debug-a-failed-step}

워크플로의 {{< ui >}}Run History{{< /ui >}}를 사용하여 실패한 단계를 디버깅할 수 있습니다. 왼쪽 상단에서 {{< ui >}}Configuration{{< /ui >}} 또는 {{< ui >}}Run History{{< /ui >}}를 클릭하여 구성 조회와 실행 기록 조회 간에 전환하세요.

실패한 단계를 클릭하면 해당 단계의 입력, 출력, 실행 컨텍스트 및 관련 오류 메시지가 표시됩니다. 아래 예시는 실패한 _GitHub 풀 리퀘스트 상태 확인_ 단계를 보여줍니다. 오류 메시지에는 권한 누락으로 인해 단계가 실패했음이 표시됩니다.

{{< img src="actions/workflows/test_and_debug/failed-step4.png" alt="실패한 단계가 포함된 워크플로" >}}

워크플로의 초기 실행 기록에는 이전 워크플로 실행 목록과 각 실행의 성공 또는 실패 여부가 패널에 표시됩니다. 실패한 실행에는 실패한 워크플로 단계로 연결되는 링크가 포함됩니다. 확인하려면 목록에서 워크플로 실행을 클릭하세요. 워크플로 캔버스의 아무 곳이나 클릭하면 언제든지 초기 실행 기록으로 돌아갈 수 있습니다.


## AI로 실패한 단계 수정{#fix-a-failed-step-with-ai}

{{< ui >}}Run History{{< /ui >}}에서 실패한 단계를 선택하고 {{< ui >}}Outputs{{< /ui >}} 탭을 여세요. 오류 메시지 옆의 {{< ui >}}Fix with AI{{< /ui >}}를 클릭하여 실패 해결에 대한 도움을 받으세요.

{{< img src="actions/workflows/test_and_debug/fix-with-ai.png" alt="실패한 워크플로 단계를 진단하고 수정 사항을 제안하는 Bits Chat" >}}

어시스턴트가 [Bits Chat][7]에서 열리며, 단계의 입력값, 출력값, 실행 컨텍스트 및 오류 메시지를 사용하여 실패 원인을 진단하고, 타사 API에서 반환된 오류에 대해서는 외부 문서를 검색할 수 있습니다. 문제를 설명하고 해결 방법을 제안한 후, 변경 사항을 적용하기 전에 사용자에게 확인을 요청합니다. 사용자가 확인하면 어시스턴트가 단계 구성을 업데이트하고 유효성 검사를 다시 실행합니다.

AI 수정은 잘못된 입력값이나 오래된 액션 설정과 같은 워크플로 구성의 문제에 적용됩니다. 잘못된 자격 증명, 속도 제한 또는 연결된 서비스의 중단과 같은 외부 요인으로 인한 실패의 경우, 어시스턴트가 근본 원인을 설명하고 자격 증명 확인 또는 연결된 서비스 소유자에게 문의하는 등의 다음 단계를 제안합니다.

실패한 단계가 다른 워크플로를 트리거하는 경우, Bits Chat은 트리거된 워크플로까지 실패를 추적하여 해당 워크플로에 대해서도 원인을 진단하고 해결 방법을 제안할 수 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][10]의 **#workflows** 채널에 참여하세요.

[6]: /ko/actions/workflows/expressions/
[7]: /ko/bits_ai/bits_chat/
[10]: https://chat.datadoghq.com/