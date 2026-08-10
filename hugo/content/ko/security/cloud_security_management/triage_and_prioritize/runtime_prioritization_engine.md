---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: 설명서
  text: Cloud Security 심각도 점수 이해하기
- link: /security/cloud_security_management/vulnerabilities/
  tag: 설명서
  text: Cloud Security를 사용하여 취약점을 탐지하고 해결하기
- link: /security/security_inbox/
  tag: 설명서
  text: Security Inbox에서 우선순위가 지정된 탐지 결과 검토하기
title: Runtime Prioritization Engine
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
Cloud Security 취약성을 위한 Runtime Prioritization Engine이 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

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

[Crown Jewels][8]는 가장 중요한 비즈니스 기능(서비스, 호스트, 데이터베이스, 컨테이너 등)을 지원하는 리소스입니다. Datadog은 APM 트레이스 흐름, 서비스 의존성(팬인), SLO, 트래픽, 인시던트 등과 같은 관측 가능한 데이터를 통해 이러한 리소스를 자동으로 추론합니다.

Crown Jewels는 환경이 변화함에 따라 지속적으로 업데이트됩니다. Datadog Cloud Security에서 직접 Crown Jewels를 추가할 수도 있습니다.

## Ownership {#ownership}

[Ownership][7]은 보안 탐지 결과를 수정할 책임이 있는 팀 또는 서비스 소유자를 식별합니다. Datadog은 서비스 태그, 팀 태그, 배포 메타데이터, 온콜 구성, 소스 제어 링크, 서비스 카탈로그 항목 등과 같은 관측 가능한 메타데이터를 바탕으로 소유권을 추론합니다.

소유권이 확인되면 보안 팀이 직접 해결 담당자를 찾는 대신, 엔진이 적절한 팀으로 탐지 결과를 전달할 수 있습니다.


## 시작하기 {#get-started}

1. Cloud Security가 활성화된 Datadog Agent 7.79 이상 버전을 배포하세요. [Cloud Security 설정][3]을 참조하세요.
2. Agent에서 [Runtime Package Tracking][4]을 활성화하여 취약성 탐지 결과에서 *사용 중인 패키지* 신호가 표시되도록 합니다.
3. Datadog에서 [Cloud Security 요약][5]을 엽니다. 우선순위가 지정된 탐지 결과는 각 퍼널의 상단과 [Security Inbox][6]에 표시됩니다.


## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /ko/security/cloud_security_management/setup/
[4]: /ko/security/cloud_security_management/setup/agent/
[5]: https://app.datadoghq.com/security/csm
[6]: /ko/security/security_inbox/
[7]: /ko/security/cloud_security_management/guide/frontier_group/ownership_agent/
[8]: /ko/security/cloud_security_management/crown_jewels/