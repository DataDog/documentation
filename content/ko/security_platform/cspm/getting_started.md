---
further_reading:
- link: security_platform/default_rules
  tag: 설명서
  text: 기본 클라우드 설정 탐지 규칙 살펴보기
- link: security_platform/cspm/findings
  tag: 설명서
  text: CSPM 검색 결과 찾고 살펴보기
- link: security_platform/cspm/frameworks_and_benchmarks
  tag: 설명서
  text: 프레임워크와 업계 벤치마크 알아보기
title: CSPM 시작하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
본 사이트에서는 현재 Cloud Security Posture Management를 이용할 수 없습니다.
</div>
{{< /site-region >}}

## 개요

[시작하기 페이지][1]로 이동해 환경을 스캔 용도로 맞게 설정하세요.

{{< img src="security_platform/cspm/getting_started/posture-management-setup.png" alt="CSPM용 설정 페이지" style="width:100%;">}}

## 구성

### 제품의 설정

`Posture Management`를 선택합니다. 체크박스를 선택하면 여러 제품을 한번에 설정할 수 있습니다.

### 클라우드 환경 액세스

클라우드 환경에서 잘못 구성된 설정을 검출합니다. 이번 섹션에서는 클라우드 공급업체에서 리소스 설정 데이터를 수집하는 방법을 설명합니다. 리소스 설정을 수집하면 Datadog의 바로 사용할 수 있는 [Posture Management 클라우드 탐지 규칙][2]을 통해 사용자 환경을 평가할 수 있습니다.

### 호스트 및 컨테이너 액세스

호스트나 컨테이너의 보안 태세를 평가합니다. 이번 섹션에서는 호스트나 컨테이너를 스캔하기 위한 Datadog Agent 설정 방법을 설명합니다. Agent를 활용하면 바로 사용 가능한 Datadog의 [Posture Management Infrastructure Configuration 탐지 규칙][3]을 통해 호스트나 컨테이너의 상태를 지속 평가할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: /ko/security_platform/default_rules#cat-posture-management-cloud
[3]: /ko/security_platform/default_rules/#cat-posture-management-infra