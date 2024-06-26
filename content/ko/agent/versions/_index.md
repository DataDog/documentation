---
further_reading:
- link: agent/versions/upgrade_to_agent_v7
  tag: 설명서
  text: 에이전트 v7로 업그레이드
- link: agent/versions/upgrade_to_agent_v6
  tag: 설명서
  text: 에이전트 v6로 업그레이드
- link: agent/versions/upgrade_between_agent_minor_versions
  tag: 설명서
  text: 에이전트 마이너 버전 간 업그레이드
- link: agent/faq/agent_v6_changes
  tag: FAQ
  text: 에이전트 v6 변경 사항
title: 에이전트 버전 차이
---

<div class="alert alert-info"><p>
Datadog에서는 마이너 및 패치 릴리스를 사용하거나 최소 매월 Datadog 에이전트를 업데이트할 것을 권장합니다.</p>
<p>
주요 Datadog 에이전트 버전으로 업그레이드하여 업데이트를 유지하는 것이 최신 에이전트 기능과 수정 사항을 얻을 수 있는 유일한 방법입니다. 하지만 에이전트의 업데이트 릴리스가 빈번하기 때문에 엔터프라이즈 확장으로 업데이트를 관리하는 것이 어려울 수 있습니다. 업데이트하기 전에 주요 릴리스를 기다려야 하는 것은 아닙니다. 조직에 적합한 업데이트 업데이트 주기는 인프라스트럭처와 설정 관리 방식에 따라 다르지만 매월 업데이트를 목표로 하는 것이 좋습니다.</p>
<p>
지정된 호스트에서 두 개의 보조 버전 간에 Datadog 에이전트 코어를 업데이트하려면 <a href="/agent/versions/upgrade_between_agent_minor_versions">플랫폼에 해당하는 설치 명령을</a> 실행합니다.</p>
<p>
Datadog 에이전트 릴리스 번호 지정이 <a href="https://semver.org/">SemVer </a>규칙을 따릅니다.</p>
</div>

## 주요 에이전트 버전 간의 변경 사항

{{< tabs >}}
{{% tab "에이전트 v7 vs v6" %}}

에이전트 버전 7은 Datadog 에이전트의 최신 주요 버전입니다. 에이전트 버전 6의 유일한 변경 사항은 **이 버전에는 통합 및 커스텀 점검를 위한 Python 3 지원만 포함되어 있다는 것입니다**.

에이전트를 버전 7로 업그레이드하는 방법에 대한 자세한 내용은 [에이전트 버전 7로 업그레이드] 설명서[1]를 참고하세요. 모든 공식 통합에서는 즉시 Python 3을 지원합니다. [Python 3 커스텀 점검 마이그레이션 가이드] [2]에 따라 사용자 지정 검사를 Python 3으로 마이그레이션하세요.

**참고**: [Datadog 에이전트 버전 6와 Python 3을 사용하여][3] 에이전트 버전 6에서 마이그레이션을 테스트할 수 있습니다.


[1]: /ko/agent/versions/upgrade_to_agent_v7/
[2]: /ko/agent/guide/python-3/
[3]: /ko/agent/guide/agent-v6-python-3/
{{% /tab %}}
{{% tab "에이전트 v6 vs v5" %}}

**에이전트 버전 6 주요 변경 사항**:

에이전트 5와 에이전트 6의 큰 차이점은 에이전트 6은 Golang을 사용해 에이전트의 핵심 부분을 완전히 다시 쓴 버전이라는 점입니다. Golang을 사용해 에이전트가 동시성의 이점을 활용할 수 있도록 했습니다. 에이전트 버전 5가 실행하던 세 가지 프로세스—_포워더_, _수집기_, _DogStatsD_—대신 _에이전트_라는 하나의 프로세스만 있습니다. 이와 더불어 다른 핵심적인 개선점도 여럿 있습니다.

- 에이전트 버전 6에서는 에이전트 버전 5에 비해 리소스 사용량이 크게 향상되었습니다.

  - CPU 사용량 감소
  - 메모리 사용량 감소
  - 파일 설명자 줄어듦
  - 공간이 전반적으로 줄어듦

- 에이전트 6은 [추가 포트 2개][1]를 사용합니다:

  - `5000`은 런타임 메트릭을 노출하는 데 사용합니다.
  - `5001`은 [에이전트 CLI/GUI 명령][2]에 사용합니다.

    **참고**: `datadog.yaml` 파일에서 `expvar_port` 및 `cmd_port`용 포트를 변경할 수 있습니다.

- 에이전트 버전 6 및 [DogStatsD][3]을 커스텀 빌드해 훨씬 쉽고 더 많은 설정 옵션을 사용해 보세요. 어떤 옵션이든 포함하거나 제외할 수 있습니다.

**에이전트 버전 6의 새로운 기능**:

에이전트 버전 5와 버전 6 간 변경 사항 전체를 보려면 [Datadog 에이전트 전용 변경사항][4] 설명서를 참고하세요. 다음은 주요 변경 사항입니다.

- [분포 메트릭][5]을 서버에서 직접 실행해 실제 유효한 전역 백분위수를 계산할 수 있습니다.
- [DogStatsD][3]를 UDP 대신 Unix 소켓을 통해 사용할 수 있습니다.
- [Windows용 실시간 프로세스 모니터링이 가능합니다][6].
- [Prometheus OpenMetric이 기본으로 지원됩니다][7].
- [모든 로그를 Datadog에 전송하여 경고, 분석, 메트릭의 상관 관계를 확인할 수 있습니다][8].


[1]: /ko/agent/#agent-architecture
[2]: /ko/agent/configuration/agent-commands/
[3]: /ko/developers/dogstatsd/unix_socket/
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /ko/metrics/types/?tab=distribution#metric-types
[6]: /ko/infrastructure/process/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /ko/logs/
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}