---
aliases:
- /ko/logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions
further_reading:
- link: /logs/log_collection/
  tag: 설명서
  text: 로그 수집 방법 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /glossary/#tail
  tag: 설정
  text: '"tail" 관련 용어 항목'
kind: guide
title: 상위 읽기 권한으로 커스텀 로그 파일에서 로그 전송하기
---

*syslog*나 *journald*와 같은 시스템 로그 파일을 비롯한 일부 로그 파일에는 상위 읽기 권한이 필요합니다. Datadog 에이전트는 *sudo*나 *admin* 액세스가 없기 때문에 이와 같은 로그 파일을 수집하지 못합니다.

이 문제를 해결하는 데에는 세 가지 방법이 있습니다.

* (추천하지 않음) 에이전트에 루트 액세스를 부여해 해당 파일에 테일링을 할 수 있습니다. Datadog에서는 이 방법을 사용하는 것을 권고하지 않습니다.
* 에이전트가 접근할 수 있도록 파일 권한을 변경합니다. 에이전트에 디렉터리에서 실행 및 읽기 권한과 파일 읽기 권한을 부여합니다. 다음 명령을 사용해 이 권한을 부여할 수 있습니다(에이전트 사용자 외 다른 사용자도 사용 가능).
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* 루트 액세스가 있는 오픈 소스 로그 관리 도구(예: Rsyslog, NXLog 등)를 구성해 해당 로그를 Datadog 플랫폼으로 바로 전송하거나 실행 중인 Datadog 에이전트로 로컬 전송합니다. 지침을 보려면 [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4], 또는 [Logstash][5] 전용 설명서를 참고하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/rsyslog/
[2]: /ko/integrations/syslog_ng/
[3]: /ko/integrations/nxlog/
[4]: /ko/integrations/fluentd/#log-collection
[5]: /ko/integrations/logstash/#log-collection