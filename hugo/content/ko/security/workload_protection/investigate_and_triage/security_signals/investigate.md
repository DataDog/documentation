---
description: 신호 사이드 패널을 사용하여 공격 스토리를 재구성하고, 영향을 평가하며, 원시 신호 데이터를 읽으세요.
disable_toc: false
title: 보안 신호 조사
---
[Signals Explorer][1]에서 Workload Protection 신호를 선택하면 사이드 패널에서 공격 스토리를 재구성하고, 영향을 평가하며, 원시 신호 데이터에 액세스할 수 있는 조사 도구를 제공합니다.

## 무슨 일이 생긴 건가요?(What happened){#what-happened}

{{< ui >}}What Happened{{< /ui >}} 섹션에서는 현재 신호에 대한 요약을 제공합니다.

- {{< ui >}}Attack chain{{< /ui >}}: 감지된 활동에 대한 사람이 이해하기 쉬운 설명과 이것이 더 광범위한 위협 스토리와 어떻게 연결되는지 보여줍니다.
- {{< ui >}}Where{{< /ui >}}: 신호가 발생한 인프라 컨텍스트로, 클라우드 공급자, 계정, 리전, 호스트, Kubernetes 클러스터, 네임스페이스, 포드, 컨테이너 및 이미지를 포함합니다.
- {{< ui >}}Detection rule{{< /ui >}}: 신호를 생성한 백엔드 탐지 규칙으로, 이름, 심각도 및 규칙 표현식을 포함합니다.
- {{< ui >}}Agent rule{{< /ui >}}: 기본 런타임 활동과 일치한 Agent 규칙으로, 규칙 이름, 이벤트 이름 및 배포 정책을 포함합니다.

## 조사 그래프 {#investigation-graph}

{{< ui >}}Investigation{{< /ui >}} 탭에는 신호와 관련된 프로세스, 리소스 및 런타임 이벤트를 매핑하는 인터랙티브 그래프가 표시됩니다. 조사 그래프는 공격이 단계별로 어떻게 전개되었는지 확인하는 데 도움이 됩니다.

{{< img src="security/workload_protection/investigate_and_triage/security_signals/signal_investigation_graph.png" alt="공격자에 의해 침해된 컨테이너까지의 공격 체인과 상호 연계된 프로세스 및 의심스러운 작업을 보여주는 조사 그래프" width="100%">}}

그래프에서 텔레메트리 소스(예: Code Security 또는 Infrastructure Monitoring)로 피벗하여 코드 취약성을 검증하거나 특정 리소스에 대한 자세한 정보를 확인할 수 있습니다.

### 상호 연계된 이벤트{#correlated-events}

조사 그래프에서 {{< ui >}}Correlated events{{< /ui >}}를 사용하여 초기 신호를 넘어 조회 범위를 확장하세요. 이는 [변수][2]를 사용하여 동일한 프로세스 계보 또는 악용 체인에 속하는 런타임 활동을 그룹화합니다.

Workload Protection에서 감지한 각 이벤트에는 동일한 실행 체인의 다른 이벤트와 연결하는 상호 연계 키가 태그로 지정됩니다. 이러한 그룹화는 개별 경고에 대응하는 대신 더 광범위한 침해 시도에 집중할 수 있도록 도와줍니다.

Workload Protection에는 다음과 같은 일반적인 런타임 시나리오를 위한 실행 컨텍스트 레이어가 내장되어 있습니다.

- **일반 cgroup 컨텍스트**: 관련 없는 이벤트를 위한 폴백 컨텍스트입니다.
- **일반 auid 컨텍스트**: 사용자 세션별로 이벤트를 그룹화합니다.
- **서비스 컨텍스트**: 서비스 경계 내의 런타임 활동을 격리합니다.
- **인터랙티브 셸 컨텍스트**: 동일한 셸 세션의 명령을 상호 연계합니다.
- **Kubernetes 사용자 세션 컨텍스트**: 세밀한 상호 연계를 통해 Kubernetes 사용자 작업을 추적합니다.
- **멀웨어 IOC**: 파일 해시나 도메인과 같이 [위협 인텔리전스][5]에서 동일한 멀웨어 지표와 일치하는 이벤트를 그룹화합니다.

### 영향 범위 {#blast-radius}

조사 그래프에서 {{< ui >}}Blast radius{{< /ui >}}를 사용하여 감지된 위협의 잠재적 영향을 평가하세요. 영향 범위 조회는 침해가 초기 감지 지점을 넘어 확산될 경우 영향을 받을 수 있는 리소스, 서비스 및 종속성을 강조 표시합니다.

이를 통해 대응 노력의 우선순위를 정하고 추가적인 모니터링이나 강화가 필요한 인접 워크로드, 호스트 또는 컨테이너를 파악할 수 있습니다.

### 이벤트 타임라인 {#events-timeline}

{{< ui >}}Events timeline{{< /ui >}}은 상호 연계된 위협 스토리 내의 모든 이벤트를 시간순으로 보여줍니다. 상호 연계된 이벤트, 분류 상태, 대응 및 권장 조치를 하나의 뷰로 통합합니다. 뷰를 전환하지 않고도 초기 악용부터 후속 작업까지, 공격자의 이동 경로를 추적할 수 있습니다.

타임라인의 각 이벤트에는 컨텍스트 세부 정보와 상호 연계된 메트릭, 로그 및 트레이스에 대한 링크가 포함되어 있습니다.

## 컨텍스트(Context) {#context}

{{< ui >}}Context{{< /ui >}} 탭은 신호가 트리거된 호스트의 주요 속성을 요약하고 관련 메트릭, 프로세스 및 기타 정보에 대한 링크를 제공하여 영향을 받는 리소스를 평가할 수 있도록 돕습니다.

## 신호 JSON(Signal JSON) {#signal-json}

{{< ui >}}Signal JSON{{< /ui >}} 탭은 신호의 원시 콘텐츠를 표시합니다. Signal JSON은 Signals Explorer, 대시보드 및 프로그래밍 방식 쿼리를 구동하는 기본 데이터 구조입니다.

다음과 같은 경우 Signal JSON을 사용하세요.

- [Signals Explorer][1] 또는 [대시보드][3]에서 복잡한 쿼리를 작성하여 신호를 그룹화, 집계 또는 상관 분석할 경우
- [Datadog API][4]를 통해 신호 데이터를 사용하는 자동화 또는 통합을 구축할 경우
- 조사 중에 전체 신호 페이로드를 동료나 외부 도구와 공유할 경우

<div class="alert alert-info">Signal JSON은 프로그래밍 방식으로 신호를 쿼리하려는 고급 사용자에게 가장 유용합니다. 대부분의 조사에서는 조사 그래프, Timeline 및 Context 탭에서 필요한 정보를 확인할 수 있습니다.</div>

[1]: https://app.datadoghq.com/security/workload-protection/signals
[2]: /ko/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[3]: /ko/dashboards/
[4]: /ko/api/latest/security-monitoring/
[5]: /ko/security/workload_protection/detect_and_monitor/threat_intelligence