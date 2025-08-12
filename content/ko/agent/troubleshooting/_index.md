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

Datadog 에이전트를 아직 설치하지 않은 경우 [에이전트 통합 전용 페이지][1]로 이동해 설치 지침을 따르세요. 에이전트를 방금 설치했다면 메트릭이 나타날 때까지 시간이 조금 걸릴 수 있습니다. 메트릭과 관련해 가장 먼저 방문해야 할 위치는 [Metric Explorer][2]입니다.

문제가 있다고 의심된다면 다음 체크리스트를 먼저 확인하세요.

* 시작하자마자 에이전트 컨테이너가 중단되나요? [호스트 이름][3] 감지 문제일 수 있습니다.
* 호스트가 인터넷에 연결되어 있거나, 프록시를 통해 액세스할 수 있나요?
* 프록시를 사용한다면 [에이전트가 이 프록시에 맞게 설정되어 있나요?][4]
* Datadog API 키가 `datadog.yaml` 설정 파일에서 [Datadog 플랫폼에 해당하는 API 키][5]로 구성되어 있나요?
* 사이트가 `datadog.yaml` 설정 파일에서 [소속 조직과 일치하도록][6] 설정되어 있나요?
* 호스트에 실행 중인 Datadog 에이전트가 하나 뿐인가요?
* yaml 구성 파일을 편집한 후 Datadog 에이전트를 재시작했나요?

위 질문에 대한 답변이 모두 `yes`인 경우에는 [상태 명령어를 실행][7]해 에이전트와 통합 상태을 점검해 보세요. [에이전트 로그][7]를 직접 체크하고 디버그 모드를 활성화해 [에이전트에서 더 많은 로그를 확보]할 수 있습니다.

아직 문제를 정확하게 파악할 수 없다면 에이전트에서 [플레어][10]를 사용해 [Datadog 지원팀][9]으로 문의하세요.

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