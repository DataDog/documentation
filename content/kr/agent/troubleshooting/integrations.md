---
aliases:
- /kr/integrations/faq/issues-getting-integrations-working
kind: 설명서
title: 통합 작동시키기
---

Datadog는 Agent에서 YAML 파일을 통해 설정할 수 있는 [통합][1]을 지원합니다.

통합 설치 중 문제가 발생했을 때 빠르게 트러블슈팅하는 가이드를 안내해드리겠습니다.

1. [info 명령어][2]를 실행합니다.
2. [info 명령어][2]에서 통합이 표시되나요?

   **표시되지 않는 경우**:

      1. 설정 파일을 점검하고, 적절한 위치에 있으며 이름이 정확한지 확인하세요.
      2. YAML 파서(구문 분석기)에 있는지 점검하여 정확한 신택스를 갖추었는지 확인하세요. 예시 파일은 여기에서 찾아볼 수 있습니다.
      3. 파일을 옮기거나 변경했다면 [Agent를 재시작][3]한 다음, info 명령어를 다시 실행해 제대로 표시되는지 확인해봅니다.

    **표시되는 경우**:

      1. 메트릭 익스플로러를 점검해 시스템 메트릭이 호스트에서 표시되는지 확인합니다. 예를 들면, Agent를 실행 중인 호스트에서 `system.cpu.user`를 찾아 통합 설정이 되어 있는지 살펴보세요.
      2. 메트릭이 없다면 로그에 오류가 있는지 살펴보고, info 명령어 출력값과 함께 [Datadog 지원팀][4]에 보내주시기 바랍니다.

[1]: /kr/integrations/
[2]: /kr/agent/guide/agent-commands/#agent-status-and-information
[3]: /kr/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /kr/help/