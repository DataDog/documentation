---
aliases:
- /kr/agent/faq/agent-s-are-no-longer-reporting-data
- /kr/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 설명서
  text: Agent 디버그 모드
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: Agent Flare 보내기
- link: /agent/troubleshooting/permissions/
  tag: 설명서
  text: Agent 권한 허용 문제
- link: /agent/troubleshooting/site/
  tag: 설명서
  text: Agent 사이트 점검
- link: /agent/troubleshooting/ntp/
  tag: 설명서
  text: Agent NTP 문제
- link: /agent/troubleshooting/agent_check_status/
  tag: 설명서
  text: Agent 점검의 상태 파악하기
kind: 설명서
title: Agent 트러블슈팅
---

Datadog Agent를 설치하지 않았다면 [Agent 전용 통합 페이지][1]로 이동하여 안내에 따라 설치하시기 바랍니다. Agent를 설치했다면 메트릭이 표시되기까지 몇 분 정도 소요될 수 있으니 잠시 기다려주세요. 처음으로 메트릭을 점검할 수 있는 곳은 [메트릭 익스플로러(Metrics Explorer)][2]입니다.

문제가 발생할 것으로 예상된다면 다음 체크리스트를 먼저 확인하세요.

* 호스트가 인터넷에 연결되어 있거나, 프록시를 통해 액세스할 수 있나요?
* 프록시를 사용하는 경우: [Agent가 프록시에 맞게 설정되어 있나요][3]?
* Datadog API 키가 `datadog.yaml` 설정 파일에서 [Datadog 플랫폼에 해당하는 API 키][4]로 구성되어 있나요?
* 사이트가 `datadog.yaml` 설정 파일에서 [소속 조직과 매치하도록][5] 설정되어 있나요?
* 호스트에서 Datadog Agent가 하나만 실행 중인가요?
* YAML 설정 파일을 수정한 후 Datadog Agent를 재시작했나요?

모든 질문에 대한 답변이 `yes`인 경우에는 [상태 명령어를 실행][6]해 Agent와 통합 현황을 자세히 알아보세요. 또, [Agent 로그][7]를 직접 점검하고 디버그 모드를 활성화하여 [Agent에서 더 많은 로그를 확보]할 수 있습니다.

아직 문제를 정확하게 파악할 수 없다면 Agent  [Flare][10]를 사용해 [Datadog 지원팀][9]으로 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /kr/agent/proxy/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /kr/agent/troubleshooting/site/
[6]: /kr/agent/guide/agent-commands/#agent-status-and-information
[7]: /kr/agent/guide/agent-log-files/
[8]: /kr/agent/troubleshooting/debug_mode/
[9]: /kr/help/
[10]: /kr/agent/troubleshooting/send_a_flare/