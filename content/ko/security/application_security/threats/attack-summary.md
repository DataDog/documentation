---
aliases:
- /ko/security/application_security/threats/threat-overview
title: Attack Summary
---

{{< img src="security/application_security/threats/appsec-threat-overview-page-top.png" alt="AAP Attack Summary 페이지 스크린샷"  >}}

AAP **Attack Summary**는 애플리케이션 및 API 상태를 간략하게 보여줍니다. 트렌드, 서비스 노출, 공격 트래픽, 비즈니스 로직에 미치는 영향을 강조하여 보여주며, 위젯에서 관련 트레이스로 이동할 수 있습니다.

**Attack Summary**의 각 섹션은 보안의 다양한 측면에 초점을 맞춰 주요 정보를 제공합니다.

## 섹션

Attack Surface Area
: 이 섹션에서는 노출된 서비스, 공격자가 사용하는 도구, 잠재적인 취약점을 파악할 수 있는 상용 스캐너에 관한 인사이트를 제공합니다.

Attack Traffic
: 이 그래프는 SSRF, LFI, SQL, 명령어 삽입 등 공격 유형을 분류하여 보여줍니다. 이를 통해 사용자는 악성 트래픽 및 특정 패턴이 급증할 때 파악할 수 있습니다.

Business Logic
: 이 섹션에서는 계정 탈취 시도나 애플리케이션에서 추적하는 커스텀 비즈니스 로직 이벤트와 같은 사기 및 비즈니스 로직 악용에 초점을 맞춥니다.

Attack Traffic Sources
: 공격 트래픽의 출처를 나타내는 글로벌 히트맵으로, 지역별 위협을 시각적으로 표현합니다.

## 모범 사례

1. 트렌드를 검토하고 필요에 맞는 보호 정책을 설정합니다.
2. **Attack Surface Area**에서 **Exposed Services** 위젯을 정기적으로 검토하여 올바른 서비스에만 액세스할 수 있는지 확인하고 위험 수준에 적합한 보호 정책을 설정합니다.
3. 공격 도구를 차단하고, 고객의 스캐너가 승인된 취약성 관리 프로그램 내에 있는지 확인합니다.
4. 비즈니스 로직을 모니터링해 크리덴셜 스터핑 공격이나 위험성이 있는 결제 내역 급증을 파악할 수 있습니다.
5. **Attack Traffic Sources**를 사용하여 공격 트래픽 소스를 예상 고객 위치와 비교합니다.
6. [Powerpacks](#using-powerpacks)를 사용하여 가장 관련 있는 정보로 대시보드를 강화합니다.

### Powerpacks 사용

Datadog에서 [새 대시보드][1]에 위젯을 추가할 때 트레이에서 **Powerpacks** 섹션을 선택합니다. `tag:attack_summary`로 필터링하거나 검색창에 `Attack Summary`를 입력하세요.

**Attack Summary** 페이지의 각 섹션은 전용 Powerpack에 해당합니다.

[1]: https://app.datadoghq.com/dashboard/lists