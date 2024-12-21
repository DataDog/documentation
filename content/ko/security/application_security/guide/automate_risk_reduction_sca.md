---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: 블로그
  text: Datadog Software Composition Analysis을 통해 타사 라이브러리의 취약점을 완화합니다.
title: Datadog SCA로 오픈소스 위험 감소 자동화
---

Datadog Software Composition Analysis (SCA)를 사용하면 애플리케이션 서비스에 사용되는 타사 OSS(오픈 소스 소프트웨어) 라이브러리의 취약성과 기타 위험을 쉽게 식별하고 우선순위를 지정하며 해결할 수 있습니다.

이 항목에서는 SCA를 사용하여 오픈 소스 라이브러리의 취약성과 위험을 보고 해결하는 방법에 대해 설명합니다.

## SCA 이점

SCA는 오픈 소스 라이브러리와 관련된 다음 위험을 해결합니다.

- **보안 취약성:** 알려진 취약성, 특히 CVE(Common Vulnerabilities and Exposures)가 있는 취약성입니다.
- **멀웨어:** 타이포스쿼팅, 하이재킹과 같은 기술을 사용하여 멀웨어를 배포하는 악의적인 행위자입니다.
- **라이센스 문제:** 다양한 오픈 소스 라이센스를 준수하지 않으면 법적 문제가 발생할 수 있습니다.
- **더 이상 사용되지 않는 라이브러리:** 오래된 구성 요소를 사용하면 패치가 적용되지 않은 취약점 및 호환성 문제가 발생할 수 있습니다.
- **관리되지 않는 라이브러리:** 적극적으로 개발하지 않으면 해결되지 않은 버그와 보안 결함이 발생할 수 있습니다.
- **불량한 보안 관리:** 일부 프로젝트에는 적절한 코드 검토와 같은 보안 모범 사례가 부족합니다.

Datadog SCA는 위험 감소 프로세스를 자동화하여 다음과 같은 방식으로 생산성을 향상시킵니다.

- **개발 수명주기 전반에 걸친 통합:** 오픈 소스 및 타사 구성 요소를 분석하여 자세한 라이브러리 카탈로그를 제공합니다.
- **지속적인 평가:** 배포된 서비스에 대한 실시간 가시성을 제공하고 민감한 환경에서 취약점의 우선순위를 지정하여 보안성을 강화합니다.
- **공동작업:** 사일로를 무너뜨리고 더 많은 보안 팀(DevOps, 운영, SRE)을 참여시켜 협업 문화를 조성합니다.


## 서비스에 사용되는 라이브러리 보기

라이브러리 카탈로그에는 서비스 전체에서 사용되는 라이브러리와 버전이 표시됩니다.

카탈로그는 여러 공개 데이터 소스(GuardDog, NIST, osv.dev, OpenSSF 점수 등)와 개인 데이터 소스(Datadog의 Security Research 그룹 포함)를 사용하여 모든 라이브러리 세부 정보를 표시합니다.

라이브러리 카탈로그를 사용하려면 [Libraries][1]를 참조하거나 *Security > Application Security > Catalogs > Libraries**를 선택하세요.

{{< img src="/security/application_security/software_composition_analysis/libraries_catalog.png" alt="라이브러리 카탈로그 대시보드" style="width:100%;" >}}


라이브러리 카탈로그에서 다음을 수행할 수 있습니다.

- 각 서비스에 사용되는 모든 라이브러리를 확인합니다.
- **View**에서 **Runtime**을 선택하면 런타임에 감지된 라이브러리를 확인합니다.
- **View**에서 **Static**을 선택하면 소스 코드 리포지토리에 감지된 라이브러리를 볼 수 있습니다.
- **Vulnerability Severity** 패싯을 사용하여 취약성 등급에 따라 라이브러리를 필터링합니다.
- 각 라이브러리의 소스 리포지토리를 확인합니다.
- 서비스에 사용되는 현재 버전, 사용 가능한 최신 버전 등 라이브러리 세부정보를 확인합니다.
- 라이브러리에 대한 [OpenSSF 스코어카드][2]를 확인합니다.


## 라이브러리의 취약점 및 위험 보기

**Vulnerabilities** 탐색기에서는 사용 중인 라이브러리의 취약점과 위험을 볼 수 있습니다.

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities.png" alt="라이브러리 취약성 대시보드" style="width:100%;" >}}

### 라이브러리 취약점

라이브러리 취약점은 라이브러리의 보안 버그입니다.

라이브러리 취약점을 보려면 [Library Vulnerabilities][3]를 참조하거나 **Security > Vulnerabilities > Library Vulnerabilities**로 이동합니다.

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_detail.png" alt="대시보드에 확장된 라이브러리 취약점 예시" style="width:100%;" >}}

**Library Vulnerabilities**에서 다음을 수행할 수 있습니다.

-  **Vulnerability** 패싯을 사용하여 다양한 취약점 유형을 확인합니다.
  - 예를 들어, 모든 취약점에는 탐색기와 각 라이브러리 세부 정보에 표시되는 관련 CVE ID가 있습니다. Vulnerability 패싯을 사용하여 CVE ID별로 정렬할 수 있습니다.
- 다음과 같은 취약점 세부정보를 확인합니다.
  - 설명
  - 서비스 및 환경
  - 처음과 마지막 감지
  - 노출 창 
  - 심각도 분석
  - 해결 단계

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_remediation_steps.png" alt="라이브러리 취약점 해결 단계" style="width:100%;" >}}

### 라이브러리 위험

라이브러리의 위험은 보안과 직접적인 관련이 없는 약점의 집합입니다. 예를 들어, 라이브러리가 더 이상 사용되지 않거나 프로젝트 라이센스가 너무 제한적이거나 팀이 잘못된 보안 관행을 따르는 경우입니다.

라이브러리 위험을 보려면 [Library Risks][3]를 참조하거나 **Security > Vulnerabilities > Library Risks**를 선택합니다.

{{< img src="/security/application_security/software_composition_analysis/library_risks.png" alt="라이브러리 위험 예시" style="width:100%;" >}}

Library Risks에서 다음을 수행할 수 있습니다.
- **View**에서 **Runtime**을 선택하면 런타임에 감지된 위험을 볼 수 있습니다.
- **View**에서 **Static**을 선택하면 소스 코드 리포지토리에 감지된 위험을 볼 수 있습니다.
- 다음과 같은 위험 세부정보를 확인합니다.
  - 설명
  - 서비스 및 환경
  - 처음과 마지막 감지
  - 노출 창 
  - 심각도 분석


## 위험 완화를 위한 모범 사례

위험을 완화하려면 다음 모범 사례를 따르세요.

   - **철저한 조사:** 오픈소스 프로젝트를 사용하기 전에 철저하게 평가합니다.
   - **업데이트 상태 유지:** 정기적으로 구성 요소를 업데이트하고 보안 권고를 구독합니다.
   - **취약점 관리:** 취약점을 분류하고 해결하는 프로세스를 확립합니다.
   - **측정:** 시간 경과에 따른 보안 상태를 이해하고 개선하기 위해 메트릭을 추적합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/libraries
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library
[4]: https://app.datadoghq.com/security/appsec/vm/library-risk