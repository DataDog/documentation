---
aliases:
- /ko/integrations/faq/issues-getting-integrations-working
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 에이전트 트러블슈팅
  text: 에이전트 디버그 모드
- link: /agent/troubleshooting/send_a_flare/
  tag: 에이전트 트러블슈팅
  text: 에이전트 플레어 보내기
- link: /agent/troubleshooting/agent_check_status/
  tag: 에이전트 트러블슈팅
  text: 에이전트 점검 상태 가져오기
title: 통합 활용하기
---

Datadog 통합은 YAML 구성 파일을 사용해 Datadog 에이전트를 통해 설정됩니다. 운영 체제의 설정 디렉터리에 관한 경로는 [에이전트 구성 파일][1] 설명서를 참고하세요.

설정한 통합이 Datadog에 나타나지 않으면 [`status`CLI 명령][2]을 실행하고 *Running Checks* 제목 아래의 통합을 찾습니다.

**Running Checks** 목록에 통합이 있지만 Datadog 앱에 표시되지 않는 경우:
1. `status` 출력에서 통합의 항목 아래에 표시된 오류나 경고가 있는지 확인합니다.
1. [메트릭 탐색기][3]에서 시스템 메트릭이 호스트에서 표시되는지 점검합니다. 예를 들어, 통합을 설정한 호스트에서 `system.cpu.user`를 찾습니다.
1. 아직도 메트릭이 보이지 않으면 [Datadog 로그][4]에서 오류를 점검하고 `status` 명령 출력과 함께 [Datadog 지원팀][5]으로 전송합니다.

**Running Checks** 목록에 통합이 없는 경우:
1. 통합의 설정 파일이 올바른 위치에 있고 이름이 올바른지 확인합니다.
1. 통합 [설명서를 참고][6]해 올바르게 설정되었는지 점검할 수 있습니다.
1. [YAML 파서][7]를 사용해 구성 파일을 확인하여 YAML이 유효한지 점검합니다.
1. 파일을 이동하거나 변경할 때마다 [에이전트를 재시작하고][8] `status`명령을 다시 실행하여 변경 사항을 점검합니다.
1. 여전히 통합이 `status` 출력에 나타나지 않으면 [Datadog 로그][4]에서 오류가 있는지 점검하고 [Datadog 지원팀][5]으로 전송하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: /ko/agent/configuration/agent-commands/#agent-information
[3]: https://app.datadoghq.com/metric/explorer
[4]: /ko/agent/configuration/agent-log-files/
[5]: /ko/help/
[6]: /ko/integrations/
[7]: https://codebeautify.org/yaml-parser-online
[8]: /ko/agent/configuration/agent-commands/#start-stop-restart-the-agent