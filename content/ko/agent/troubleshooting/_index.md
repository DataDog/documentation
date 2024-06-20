---
aliases:
- /ko/agent/faq/agent-s-are-no-longer-reporting-data
- /ko/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/hostname_containers/
  tag: 설명서
  text: 컨테이너에서 에이전트 호스트 이름 확인
- link: /agent/troubleshooting/debug_mode/
  tag: 설명서
  text: 에이전트 디버그 모드
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: 에이전트 플레어 전송
- link: /agent/troubleshooting/permissions/
  tag: 설명서
  text: 에이전트 권한 허용 문제
- link: /agent/troubleshooting/site/
  tag: 설명서
  text: 에이전트 사이트 점검
- link: /agent/troubleshooting/ntp/
  tag: 설명서
  text: 에이전트 NTP 문제
- link: /agent/troubleshooting/agent_check_status/
  tag: 설명서
  text: 에이전트 점검의 상태 파악하기
- link: /agent/troubleshooting/high_memory_usage/
  tag: 설명서
  text: CPU 또는 메모리 사용량이 높을 경우
title: 에이전트 트러블슈팅
---

Datadog 에이전트를 설치하지 않았다면 [에이전트 전용 통합 페이지][1]로 이동하여 안내에 따라 설치하시기 바랍니다. 에이전트를 설치했다면 메트릭이 표시되기까지 몇 분 정도 소요될 수 있으니 잠시 기다려주세요. 처음으로 메트릭을 점검할 수 있는 곳은 [메트릭 익스플로러(Metrics Explorer)][2]입니다.

문제가 발생할 것으로 예상된다면 다음 체크리스트를 먼저 확인하세요.

* 에이전트 컨테이너가 시작되자마자 중단되나요? 이는 [호스트 이름][3] 감지 문제일 수 있습니다.
* 호스트가 인터넷에 연결되어 있거나, 프록시를 통해 액세스할 수 있나요?
* 프록시를 사용하는 경우: [에이전트가 이 프록시에 맞게 설정되어 있나요][4]?
* Datadog API 키가 `datadog.yaml` 설정 파일에서 [Datadog 플랫폼에 해당하는 API 키][5]로 구성되어 있나요?
* 사이트가 `datadog.yaml` 설정 파일에서 [소속 조직과 매치하도록][6] 설정되어 있나요?
* 호스트에서 Datadog 에이전트가 하나만 실행 중인가요?
* YAML 설정 파일을 수정한 후 Datadog 에이전트를 재시작했나요?

위의 모든 질문에 대한 답변이 `yes`인 경우 [상태 명령어를 실행하여][7] 에이전트와 통합 현황에 대해 자세히 알아보세요. 또한, [에이전트 로그][8]를 직접 점검하고 디버그 모드를 활성화하여 [에이전트에서 더 많은 로그를 확보][9]할 수 있습니다.

아직 문제를 정확하게 파악할 수 없다면 에이전트 [플레어][11]를 사용해 [Datadog 지원팀][10]으로 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://app.datadoghq.com/metric/explorer
[3]: /ko/agent/troubleshooting/hostname_containers/
[4]: /ko/agent/configuration/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ko/agent/troubleshooting/site/
[7]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[8]: /ko/agent/configuration/agent-log-files/
[9]: /ko/agent/troubleshooting/debug_mode/
[10]: /ko/help/
[11]: /ko/agent/troubleshooting/send_a_flare/