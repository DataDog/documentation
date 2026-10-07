---
aliases:
- /ko/agent/faq/network-time-protocol-ntp-offset-issues
title: 네트워크 타임 프로토콜(NTP) 문제
---

다음과 같은 문제가 발생했다면 Agent를 통해 메트릭을 전송하는 호스트 상의 NPT 오프셋과 관련된 문제일 수 있습니다.

* 부정확한 경고 트리거
* 메트릭 지연
* 메트릭 그래프의 격차

호스트용 NTP 오프셋을 점검하려면 Agent [상태 명령어][1]를 실행하세요. OS에 해당하는 안내를 따르거나, Clocks 섹션을 참조하시기 바랍니다.

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

중요한 오프셋은 원하지 않는 효과를 내기도 합니다. NTP 문제를 예방하려면 Datadog의 NTP 오프셋 모니터링을 활용해 호스트에 드리프트가 있을 때 경고를 보내도록 하세요([NTP 통합][2]이 있어 가능한 기능입니다).
또는, Datadog [점검 요약 페이지][3]를 사용하여 `ntp.in_sync`를 조사하고 NTP 문제가 있는 호스트 목록을 확인할 수 있습니다.

**참조**: 로컬 서버의 시각이 Datadog NTP 서버와 비교했을 때 허용 범위임을 Agent가 확인할 수 있도록, 포트 `123`을 경유하는 아웃바운드 UDP 트래픽을 허용해야 합니다.

## 참고 자료

{{< whatsnext desc="사용하는 운영 체제에 따라 시스템 시계와 NTP를 동기화하는 방법:">}}
    {{< nextlink href="https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}마이크로소프트 윈도우즈(Windows)와 NTP 서버를 동기화하는 방법{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}NTP를 사용해 시계를 강제 업데이트하는 방법{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}NTP와 Clock 동기화{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/agent/guide/agent-commands/#agent-status-and-information
[2]: /ko/integrations/ntp/
[3]: https://app.datadoghq.com/check/summary