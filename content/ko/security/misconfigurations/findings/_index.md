---
aliases:
- /ko/security_platform/findings
- /ko/security_platform/cspm/findings
- /ko/security/cspm/findings
further_reading:
- link: security/default_rules
  tag: 설명서
  text: CSM 설정 오류의 클라우드 설정 준수 규정 기본값 살펴보기
- link: security/cspm/frameworks_and_benchmarks
  tag: 설명서
  text: 프레임워크와 업계 벤치마크 알아보기
kind: 설명서
title: 설정 오류 살펴보기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>용 클라우드 보안 관리 설정 오류를 지원하지 않습니다. ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

클라우드 보안 관리 설정 오류(CSM 설정 오류) [탐색기][1]를 사용하면 다음 작업을 수행할 수 있습니다.

- 리소스의 자세한 설정을 살펴봅니다.
- CSM 설정 오류로 리소스에 적용되는 규정 준수 규칙을 검토합니다.
- 리소스 소유자 및 환경 내 리소스 위치에 대한 자세한 내용을 보려면 태그를 확인하세요.
- 설정 오류가 있는 리소스를 수정하려면 업계 리소스에 기반한 설명 및 지침을 참조하세요.
- 시간 선택기를 활용하여 과거 어느 시점의 보안 설정 상태를 살펴보세요.

설정 오류를 검토하고 이에 대응하는 것 외에도, 설정 오류 문제에 관한 알림을 설정할 수 있습니다. 아울러, 신호를 설정하여 [클라우드 보안 정보와 이벤트 관리(SIEM)][2] 및 [CSM 위협][3]에서 생성한 실시간 위협과 동일한 보기에서 설정 오류를 상호 연관 및 분류할 수 있습니다. 오늘날 수많은 클라우드 공격의 근본 원인은 공격자의 설정 오류 악용이므로 해당 작업을 통해 빠르게 문제를 조사할 수 있습니다.

## 설정 오류

설정 오류는 리소스에 대한 규칙 평가 시의 우선 기본 요소입니다. 각 리소스가 규칙을 기준으로 평가될 때마다 **합격** 또는 **실패** 상태의 설정 오류가 생성됩니다. 리소스는 유형별로 15분 ~ 4시간 간격으로 평가됩니다. Datadog은 스캔이 완료되는 즉시 새로운 '설정 오류'를 생성하고, 지난 15개월 동안의 모든 '설정 오류'에 대한 전체 기록을 저장하여 조사 또는 감사 시 사용할 수 있도록 합니다.

## 클라우드 설정 오류 살펴보기

설정 오류는 [설정 오류 탐색기][1]에 표시됩니다. **그룹화** 필터와 쿼리 검색 바를 사용하여 규칙별로 설정 오류를 집계합니다. 예를 들어, `evaluation:fail`로 필터링하면 해결해야 할 문제가 있는 모든 '준수 규정'으로 목록의 범위를 좁힐 수 있습니다. 아울러, 리소스별로 설정 오류를 집계하여 실패한 설정 오류가 가장 많은 리소스의 순위를 매길 수 있습니다. 이렇게 하면 문제 해결 우선순위를 결정할 수 있습니다.

{{< img src="security/csm/explorers_page.png" alt="CSM 설정 오류 탐색기 페이지" style="width:100%;">}}

설정 오류를 선택하면 규정을 기준으로 평가한 리소스, 규정 설명, 해당 프레임워크 또는 업계 벤치마크 매핑, 제안하는 해결 단계를 확인할 수 있습니다.

{{< img src="security/cspm/findings/finding-side-panel3.png" alt="사이드 패널의 영향을 받는 리소스의 목록" style="width:65%;">}}

보안 결과 탐색기에서 **리소스**별로 그룹화한 후 리소스를 선택하면 해당 리소스를 평가한 준수 규정의 전체 목록 및 상태를 확인할 수 있습니다.

{{< img src="security/cspm/findings/resource-rules-evaluated2.png" alt="검색에서 리소스별로 그룹화 및 집계" style="width:65%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /ko/security/cloud_siem/
[3]: /ko/security/threats/
[4]: /ko/security/default_rules/cis-aws-1.5.0-2.1.5/