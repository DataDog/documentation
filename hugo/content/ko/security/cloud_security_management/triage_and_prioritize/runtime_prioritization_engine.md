---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: 설명서
  text: Cloud Security 심각도 점수 이해하기
- link: /security/cloud_security_management/vulnerabilities/
  tag: 설명서
  text: Cloud Security를 사용하여 취약성을 탐지하고 해결하기
- link: /security/security_inbox/
  tag: 설명서
  text: Security Inbox에서 우선순위가 지정된 탐지 결과 검토하기
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: 블로그
  text: Datadog Runtime Prioritization Engine을 사용한 보안 탐지 결과 우선순위 지정
- link: https://www.datadoghq.com/blog/datadog-security/
  tag: 블로그
  text: 'AI 시대의 보안: 통합 보안 및 관측 가능성으로 AI 기반 공격에 한발 앞서기'
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: 블로그
  text: CISA의 BOD 26-04가 취약성 우선순위 지정에 미치는 변화
title: Runtime Prioritization Engine
---
보안 스캐너는 환경마다 수천 건의 탐지 결과를 생성합니다. 대부분의 팀은 CVSS 심각도로 순위를 매기지만, 정적 점수는 실제로는 결코 악용되지 않는 많은 탐지 결과를 심각한 것으로 분류합니다. 실제 위험은 현재 취약한 코드가 실행 중인지, 활동 중인 익스플로잇이 있는지, 영향을 받는 리소스가 민감한 데이터 또는 비즈니스에 중요한 워크플로에 연결되어 있는지와 같은 실시간 컨텍스트에 따라 달라집니다.

Datadog Runtime Prioritization Engine은 Observability 및 Security 데이터에서 얻은 런타임 동작, 악용 가능성, 노출도 및 비즈니스 컨텍스트를 결합하여 실제로 악용 가능한 위험을 초래하는 5%의 탐지 결과를 식별함으로써 중요한 사항에만 집중할 수 있도록 지원합니다.

## 작동 방식 {#how-it-works}

Runtime Prioritization Engine은 우선순위의 근거를 설명하도록 설계되었습니다. Datadog은 각 탐지 결과에 대해 프로덕션 환경의 컨텍스트를 바탕으로 5가지 위험 요소를 평가하고, 해당 탐지 결과의 우선순위에 대한 근거를 보여줍니다.

| 차원 | 질문 | 신호의 예 |
|---|---|---|
| **도달 가능성** | 취약한 구성 요소가 실제로 실행 중인가? | 영향을 받는 이미지가 프로덕션 워크로드에서 실행 중인 것으로 관찰됨. 취약한 패키지가 런타임에서 실행 중인 것으로 관찰됨. |
| **노출도** | 공격자가 해당 리소스에 접근할 수 있는가? | 정적 네트워크 분석 결과, 해당 리소스가 공개적으로 접근 가능한 것으로 확인됨. 런타임에서 실제 공격에 노출된 증거가 확인됨. |
| **악용 가능성** | 공격자가 이를 악용할 가능성이 높은가? | 공개된 익스플로잇 코드가 존재함. 실제 환경에서 활발히 악용되고 있음([CISA KEV][1]에 등록됨). 높은 악용 확률([EPSS][2]). |
| **비즈니스 중요도** | 침해될 경우 영향이 큰가? | 리소스가 중요한 비즈니스 기능([Crown Jewel](#crown-jewels))을 지원함. 높은 권한으로 실행되며 민감한 데이터를 처리함. |
| **실행 가능성** | 적절한 팀이 이를 해결할 수 있는가? | 서비스 소유자가 식별됨. 해결 또는 완화 방법이 있음. |

Runtime Prioritization Engine은 이러한 신호를 바탕으로 사용자의 환경에서 실제로 악용 가능한 위험이 판단될 때 탐지 결과의 우선순위를 매깁니다. 우선순위 기준을 충족하지 않는 탐지 결과도 계속 표시되지만, 활성 분류 대기열에서는 제외됩니다.

## Crown Jewels {#crown-jewels}

[Crown Jewels][8]는 가장 중요한 비즈니스 기능(서비스, 호스트, 데이터베이스, 컨테이너 등)을 지원하는 리소스입니다. Datadog은 APM 트레이스 흐름, 서비스 의존성(팬인), SLO, 트래픽, 인시던트 등과 같은 관측 가능성 데이터를 통해 이러한 리소스를 자동으로 추론합니다.

Crown Jewels는 환경이 변화함에 따라 지속적으로 업데이트됩니다. Datadog Cloud Security에서 직접 Crown Jewels를 추가할 수도 있습니다.

## Ownership {#ownership}

[Ownership][7]은 보안 탐지 결과를 수정할 책임이 있는 팀 또는 서비스 소유자를 식별합니다. Datadog은 서비스 태그, 팀 태그, 배포 메타데이터, 온콜 구성, 소스 제어 링크, 서비스 카탈로그 항목 등과 같은 관측 가능한 메타데이터를 바탕으로 소유권을 추론합니다.

소유권이 확인되면 보안 팀이 직접 해결 담당자를 찾는 대신, 엔진이 적절한 팀으로 탐지 결과를 전달할 수 있습니다.

## 런타임 신호로 탐지 결과 필터링 {#filter-findings-by-runtime-signals}

Datadog은 관찰한 런타임 신호를 취약성 탐지 결과에 추가합니다. [취약성 탐색기][11]에서 이러한 신호를 다른 기준과 함께 사용하세요.

### 패키지 실행 중 {#package-is-running}

[Runtime Package Prioritization][4]이 활성화되면 Datadog은 운영 체제 패키지 관리자(`apt`, `yum` 또는 `apk`)에 의해 설치된 패키지에 대해 컨테이너 이미지 취약성 탐지 결과에 패키지 수준의 런타임 컨텍스트를 추가합니다. 다음 태그로 검색하고, 필터링하며, 그룹화하세요.

| 런타임 컨텍스트 | 태그 |
|---|---|
| 패키지 실행 중 | `@risk.is_package_running:true` |
| 루트 프로세스에 의해 액세스됨 | `@package.is_running_as_root:true` |
| SUID 바이너리 존재 | `@package.has_suid:true` |

Datadog은 런타임 컨텍스트를 관찰하면 태그를 추가합니다. 태그가 없다는 것은 Datadog이 해당 컨텍스트를 관찰하지 못했음을 의미하며, 패키지가 사용되지 않는다는 의미는 아닙니다. 태그를 사용하여 무엇을 먼저 수정할지 우선순위를 지정하세요. 탐지 결과를 제외하는 데 사용하지 마세요.

예를 들어, 현재 실행 중인 취약성 중 위험도가 높거나 치명적이면서 수정 가능한 항목은 다음과 같습니다.

```
@risk.is_package_running:true @severity:(high OR critical) @remediation.is_available:true
```

런타임 컨텍스트는 이미지 버전의 수명 동안 유지됩니다. 패키지가 실행 중인 것으로 관찰되면 해당 이미지의 탐지 결과는 이 컨텍스트를 계속 유지합니다. 컨테이너 이미지는 변경 불가능하므로, 해당 이미지에서 실행된 내용을 반영합니다. 이미지가 더 이상 배포되지 않으면, 해당 이미지의 탐지 결과는 만료되어 종료됩니다.

### 이미지 실행 중 {#image-is-running}

Datadog은 추가적인 Agent 구성 없이 모든 컨테이너 이미지 취약성 탐지 결과에 컨테이너 이미지 실행 컨텍스트를 추가합니다. 이 태그로 검색하고, 필터링하며, 그룹화하세요.

| 런타임 컨텍스트 | 태그 |
|---|---|
| 지난 12시간 동안 실행이 감지된 이미지 | `@risk.is_image_running:true` |

이 태그는 컨테이너 이미지 탐지 결과에서는 항상 `true` 또는 `false`이며, 호스트, 호스트 이미지 및 서버리스 탐지 결과에는 없습니다. 모든 자산 유형에서 실행 중인 이미지에 우선순위를 두려면, 실행 중인 것으로 탐지되지 않은 컨테이너 이미지 탐지 결과를 제외하세요.

```
-@risk.is_image_running:false
```

12시간 이외의 기간을 확인하려면 마지막 탐지 시간인 `@risk_details.is_image_running.evidence.detected_at`을 쿼리하세요.

#### 실행 컨텍스트 결정 방식 {#how-the-running-context-is-determined}

Datadog은 Datadog Agent 또는 Agentless Scanning을 사용하여 실행 중인 이미지를 탐지하지만, 두 방식은 컨텍스트의 출처와 업데이트 빈도가 다릅니다.

| | Agent | Agentless |
|---|---|---|
| **필요 조건** | Agent에서 [Cloud Security 취약성 스캔][14]과 [컨테이너 모니터링][12]이 활성화되어 있어야 합니다. | 클라우드 계정의 [Agentless Scanning][13] |
| **컨텍스트 출처** | [컨테이너 모니터링][12] 데이터: Agent가 모니터링하는 호스트에서 Datadog이 실행 중인 것으로 관찰한 컨테이너입니다. | Agentless Scanning: 스캔 실행 시점에 리소스에서 실행 중인 이미지를 기록합니다. |
| **업데이트 빈도** | Datadog이 이미지의 탐지 결과를 재평가하는 시점에 따라 매시간 업데이트 | 리소스에 대해 Agentless 스캔이 수행될 때마다 업데이트(12시간마다 한 번) |
| **컨테이너 수준 세부 정보** | [취약성 탐색기][11]의 탐지 결과 사이드 패널에 해당 이미지를 최근에 실행한 컨테이너가 나열됩니다. | 사용 불가. |

## 시작하기 {#get-started}

1. Agent에서 Runtime Package Prioritization을 활성화하여 취약성 탐지 결과에 *패키지 실행 중* 신호가 표시되도록 합니다. [Kubernetes][4], [Docker][9] 또는 [Linux][10] 배포에 대한 설정 지침을 참조하세요. [Cloud Security 설정][3]을 참조하세요.
2. Datadog에서 [{{< ui >}}Cloud Security Summary{{< /ui >}}][5]를 엽니다. 우선순위가 지정된 탐지 결과는 각 퍼널의 상단과 [{{< ui >}}Security Inbox{{< /ui >}}][6]에 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /ko/security/cloud_security_management/setup/
[4]: /ko/security/cloud_security_management/setup/agent/kubernetes/#runtime-package-prioritization
[5]: https://app.datadoghq.com/security/csm
[6]: /ko/security/security_inbox/
[7]: /ko/security/cloud_security_management/review_remediate/ownership_agent/
[8]: /ko/security/cloud_security_management/crown_jewels/
[9]: /ko/security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization
[10]: /ko/security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization
[11]: https://app.datadoghq.com/security/csm/vm
[12]: /ko/containers/
[13]: /ko/security/cloud_security_management/setup/agentless_scanning/
[14]: /ko/security/cloud_security_management/vulnerabilities/