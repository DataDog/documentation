---
algolia:
  tags:
  - Software Composition Analysis
  - 취약성 관리
  - SCA
  - AVM
  - GuardDog
aliases:
- /ko/security/application_security/risk_management/
- /ko/security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: 가이드
  text: Software Composition Analysis 시작하기
- link: /security/application_security/code_security
  tag: 설명서
  text: 서비스에서 코드 보안 취약점 탐지 활성화
- link: /code_analysis/software_composition_analysis/
  tag: 설명서
  text: CI 파이프라인에서 Software Composition Analysis 설정하기
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: 블로그
  text: Datadog Software Composition Analysis를 통해 타사 라이브러리의 취약점을 완화합니다.
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: 블로그
  text: 애플리케이션 취약성 관리로 운영 환경의 애플리케이션 보안 강화
- link: https://securitylabs.datadoghq.com/articles/guarddog-identify-malicious-pypi-packages/
  tag: 블로그
  text: '정적 코드 분석을 통해 악성 PyPI 패키지 찾기: GuardDog에 대해 알아보기'
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: 블로그
  text: Datadog SCA로 취약성 해결 우선 순위 지정하기
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: 블로그
  text: Datadog는 더 스마트한 취약점 수정 방안을 제공합니다.
title: Software Composition Analysis
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트에서는</a> Application Security Management가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 개요

Datadog Software Composition Analysis(SCA)를 사용하면 소스를 안심하고 활용할 수 있습니다. SCA의 기능에는 취약성 탐지, 비즈니스 위험(라이브러리 인벤토리 및 라이선스 정보), 서비스 내 오픈 소스 라이브러리의 품질 평가가 포함됩니다.

Datadog SCA는 개발자가 커밋하는 코드부터 Datadog 배포에서 이미 실행 중인 프로덕션 애플리케이션까지 소프트웨어 개발 수명주기의 엔드투엔드 커버리지를 제공한다는 점에서 독보적입니다.

Datadog SCA는 엄선된 독점 데이터베이스를 사용합니다. 이 데이터베이스는 오픈 소스 취약점(OSV), 국가 취약점 데이터베이스(NVD), GitHub 권고 및 기타 언어 에코시스템 권고에서 가져옵니다. 또한 Datadog 보안 연구팀에서 취약점 및 멀웨어 발견 사항을 평가합니다. 자세한 내용은 [GuardDog][13] GitHub 프로젝트를 참고하세요.


각 ASM 제품의 ASM 호환성을 확인하여 사용 중인 서비스가 지원되는지 확인하세요.


## 라이브러리 인벤토리

Datadog SCA 라이브러리 인벤토리는 애플리케이션을 구성하는 라이브러리 목록과 버전을 이해하는 데 도움이 됩니다. Library Explorer에 액세스하려면 [**Security** > **Application Security** > **Catalog** > **Libraries**][8]로 이동합니다.

코드에서 프로덕션에 이르는 소프트웨어 개발 수명 주기에 걸쳐 Datadog SCA를 사용하면 애플리케이션의 수명 주기 전반에 걸쳐 라이브러리를 감지하고 취약성, 위험, 라이선스 등에 관해 알 수 있습니다.

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="Software Composition Analysis(SCA) 라이브러리 탐색기 페이지에서 라이브러리별로 그룹화된 라이브러리 취약점을 표시합니다." style="width:100%;" >}}

## SCA 취약점 탐색 및 관리하기

<div class="alert alert-info">Datadog Software Composition Analysis(SCA)은 소프트웨어 개발 수명 주기(SDLC) 전반에서 취약한 라이브러리를 찾을 수 있습니다. 애플리케이션 보안은 리포지토리의 기본 브랜치와 실행 중인 서비스에서 발견된 결과를 요약하여 보여줍니다. 다른 브랜치 및 커밋에서 발견된 취약점을 보려면 자세한 내용은 <a href="/code_analysis/software_composition_analysis" target="_blank">코드 분석을</a> 참조하세요.</div>

[Vulnerability Explorer][3]는 Datadog SCA에서 탐지한 오픈 소스 라이브러리의 전체 목록과 이와 관련된 보안 취약점을 보고합니다.

Datadog SCA는 두 가지 기술을 활용하여 서비스를 분석합니다.

- 리포지토리의 정적 코드 분석(정적 관점)
- 배포된 서비스의 런타임 분석(런타임 관점)

두 기술을 결합하면 코드 리포지토리 커밋(정적 관점)부터 프로덕션에서 실행 중인 애플리케이션(런타임 관점)까지 오픈 소스 라이브러리를 엔드투엔드 모니터링할 수 있습니다.

코드 리포지토리 커밋 관점으로 전환하려면 **정적**을 선택하세요. 정적 보기는 리포지토리에 있는 _소스 코드_의 취약점을 보여줍니다.

이미 실행 중인 애플리케이션의 _실시간_ 시점으로 전환하려면 **런타임**을 선택합니다. 런타임 보기는 Datadog에서 모니터링하는 서비스의 실시간 보기입니다.

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="Software Composition Analysis(SCA) 탐색기 페이지에서 취약점을 정적 또는 런타임별로 구분하여 표시합니다." style="width:100%;" >}}

특정 취약점을 선택하면 영향을 받는 서비스, 심각도 분류 점수, 권장 해결 단계 등 세부 정보를 확인할 수 있습니다.

취약점에 대한 Details Explorer에서 영향을 받는 인프라를 볼 수 있습니다. 이 보기는 전반적인 공격 노출에 관해 더 나은 인사이트를 제공합니다.

## Datadog 심각도 점수

각 취약점에는 정의된 기본 심각도 점수가 있습니다. 수정 우선순위를 정하는 데 사용하기 위해 Datadog에서는 의심스러운 요청 또는 공격의 증거, 비즈니스 민감도 또는 인터넷 노출 환경, 공격 성공의 위험성을 고려하여 기본 CVSS 점수를 Datadog 심각도 점수로 수정합니다.

기본 점수에는 네 가지 점수 수정자가 적용될 수 있습니다. 두 개는 런타임 컨텍스트에서 제공됩니다.
 - 취약점이 프로덕션에 있습니다.
 - 취약점의 영향을 받는 서비스가 공격을 받고 있습니다.

두 가지는 CVE 컨텍스트에서 제공됩니다.
 - 공격 가능 여부
 - 공격 확률

Datadog는 위의 요소에 따라 기본 CVSS 점수가 Datadog 심각도 점수로 조정되는 과정을 보여줍니다.

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="취약점 세부정보 페이지에서 수정된 심각도 점수를 표시합니다." style="width:100%;" >}}

조정된 취약점 점수에 관한 자세한 내용은 [Software Composition Analysis 시작하기][7]를 참조하세요.

## 복구

Vulnerability Explorer에서는 발견된 취약점에 대해 해결 권장 사항을 표시합니다. 권장 사항을 통해 취약점의 상태를 변경하고, 검토를 위해 팀원에게 할당하고, 추적할 Jira 이슈를 만들 수 있습니다. 또 각 취약점의 배경을 이해하는 데 도움이 되는 웹사이트 또는 정보 소스에 대한 링크 및 참조 모음도 포함되어 있습니다.

**참고**: SCA 취약성에 대한 Jira 이슈를 만들려면 Jira 통합을 구성하고 `manage_integrations` 권한이 있어야 합니다. 자세한 지침은 [Jira 통합][11] 설명서 및 [역할 기반 액세스 제어][10] 설명서를 참조하세요.

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="애플리케이션 취약점 관리의 취약점 세부정보 페이지에서 영향을 받는 서비스, 인프라 연결 링크, 권장되는 조치사항 및 추가 정보 링크를 표시합니다." style="width:100%;" >}}

## Software Composition Analysis 구성

Software Composition Analysis(SCA)에는 [코드 분석][9]을 사용하여 CI 파이프라인의 취약점을 스캔할 수 있는 추가 기능이 포함되어 있습니다. 코드 분석용 SCA를 사용하면 코드베이스로 가져온 취약한 오픈 소스 라이브러리를 식별할 수 있습니다.

CI 파이프라인에서 취약점을 구성하려면 [Security -> Application Security -> Settings][12]으로 이동하세요.

**Software Composition Analysis(SCA)**에서 **Get Started**를 클릭하여 Software Composition Analysis을 활성화하고 리포지토리 및 서비스를 선택합니다.

자세한 지침은 [Software Composition Analysis 시작하기][7]를 참조하세요.

## APM 뷰의 위험 정보

Software Composition Analysis는 APM에서 이미 수집하고 있는 정보를 보강하고 현재 취약성 권고와 일치하는 라이브러리에 플래그를 지정합니다. 잠재적으로 취약한 서비스는 [APM Service Catalog][2]에 포함된 **Security** 뷰에 바로 강조 표시됩니다.

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="APM Service Catalog에 표시된 취약점 정보" style="width:100%;" >}}

## Software Composition Analysis 비활성화

Software Composition Analysis 비활성화에 대한 자세한 내용은 [Software Composition Analysis 비활성화][14]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[7]: /ko/getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /ko/code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /ko/account_management/rbac/permissions/#integrations
[11]: /ko/integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup
[13]: https://github.com/DataDog/guarddog
[14]: /ko/security/application_security/troubleshooting/#disabling-software-composition-analysis