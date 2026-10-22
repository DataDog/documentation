---
aliases:
- /ko/quality_gates/
- /ko/quality_gates/explorer/
- /ko/quality_gates/explorer/search_syntax/
- /ko/quality_gates/explorer/facets/
- /ko/quality_gates/explorer/saved_views/
- /ko/quality_gates/search/
- /ko/quality_gates/guide/
- /ko/quality_gates/guide/understanding_rule_scopes/
- /ko/pr_gates/explorer/
- /ko/pr_gates/explorer/search_syntax/
- /ko/pr_gates/explorer/facets/
- /ko/pr_gates/explorer/saved_views/
- /ko/pr_gates/search/
- /ko/pr_gates/guide/
- /ko/pr_gates/guide/understanding_rule_scopes/
description: PR 게이트를 사용하여 팀에서 프로덕션에 배포되는 코드를 제어하도록 하는 방법을 알아보세요.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate/
  tag: 문서
  text: 신규 불안정한 테스트 PR 게이트 설정
- link: https://www.datadoghq.com/blog/azure-devops-source-code-integration/
  tag: 블로그
  text: Datadog의 Azure DevOps 소스 코드 통합을 통해 코드 문제를 더 빠르게 식별하여 수정하기
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: 블로그
  text: '봇보다 먼저 CI/CD 구성 오류 찾아내기: Datadog IaC Security로 GitHub Actions 보안 강화'
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: 블로그
  text: Datadog Quality Gates를 사용하여 코드 안정성 향상
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: 블로그
  text: GitHub Actions 배포를 위한 품질 게이트로 Datadog 모니터링 사용하기
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: 블로그
  text: '불안정한 테스트: 숨겨진 비용과 불안정한 동작을 해결하는 방법'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 사용하여 클라우드의 구성 오류가 프로덕션 환경에 도달하지 못하도록 방지하기
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인하세요! (앱 로그인 필요)
is_beta: false
title: PR 게이트
---
## 개요 {#overview}

PR 게이트를 사용하면 표준 이하의 코드가 포함된 풀 리퀘스트가 병합되지 않도록 규칙을 구성하여 소프트웨어 보안 및 품질을 제어할 수 있습니다. 표준 이하의 코드가 포함된 풀 리퀘스트가 병합되지 않도록 방지하면 최종적으로 프로덕션에 배포되는 코드가 높은 조직 표준을 준수하도록 보장하여 인시던트를 줄이고 원치 않는 동작을 최소화할 수 있습니다.

{{< img src="pr_gates/setup/sca_4.png" alt="리포지토리에서 심각도가 위험 또는 높음인 라이브러리 취약점이 탐지되는 경우 실패를 트리거하는 SCA 규칙입니다." style="width:100%" >}}

[Datadog 모니터링][9]과 유사한 PR 게이트는 호환되는 Datadog 제품에서 출력된 데이터와 발견 결과를 사용하여 PR이 조직 표준을 충족하는지 확인합니다. 개발자의 속도에 불필요한 영향을 주지 않기 위해, PR 게이트는 해당 PR의 코드 변경으로 인해 발생한 위반 사항만 차단하며 PR 및 해당 브랜치가 생성되기 전부터 리포지토리에 존재했던 발견 결과는 차단하지 않습니다. 예를 들어, PR 게이트가 심각도가 위험인 코드 취약점을 차단하도록 구성된 경우 개발자가 해당 PR의 일부로 심각도가 위험 상태인 새로운 코드 취약점을 도입할 때만 PR 게이트가 실패하고 PR을 차단합니다.

PR 게이트 규칙은 다음 카테고리에 대해 구성할 수 있습니다. PR 게이트가 관련 PR에 대해 조치를 취하기 시작하려면 먼저 호환되는 제품이 원하는 리포지토리에서 실행 중이어야 합니다. 

| 소스 유형     | 조건 유형 |
| --- | ----------- |
| [**정적 코드 분석(SAST)**][1] | - 코드 취약점<br/> - 코드 품질 위반 사항 |
| [**Software Composition Analysis**][2] | - 라이브러리 취약점<br/> - 라이브러리 라이선스 위반 사항 |
| [**Code Coverage**][3] | - 전체 코드 적용 범위<br/> - 패치 코드 적용 범위 |
| [**Infrastructure as Code Scanning**][4] | - IaC 취약점 |
| [**Secret Scanning**][10] | - 유출된 시크릿 |
| [**신규 불안정한 테스트**][11] | - 신규 불안정한 테스트 |

PR 게이트 규칙을 생성하면 Datadog은 [GitHub][5], [GitLab 소스 코드][13], [Azure DevOps 소스 코드][6] 또는 [Bitbucket Cloud 소스 코드][14] 통합을 사용하여 풀 리퀘스트에 대한 검사를 자동으로 생성합니다. PR 게이트를 적용하려면 준비가 되었을 때 GitHub, Azure DevOps 또는 Bitbucket Cloud에서 해당 검사를 필수 항목으로 설정합니다. GitLab에서는 Datadog 서비스 계정을 병합 요청의 필수 승인자로 설정합니다. [PR 게이트 규칙 설정][15]을 참조하세요.

PR 게이트는 이모지 반응도 활성화합니다([PR 코멘트][12]와 유사함). PR 게이트가 있는 Datadog 제품이 결과를 기다리는 중이면 Datadog에서는 PR 설명에 👀 반응이 게시됩니다. 모든 결과가 수신된 이후:
  * 모든 결과가 긍정적이면 반응이 👍으로 변경됩니다.
  * 발견 결과가 하나라도 있으면 요약 코멘트에 해당 발견 결과에 대한 세부 정보가 포함되므로 👀 반응은 제거됩니다.

<div class="alert alert-warning">
  PR 게이트는 소스 브랜치와 다른 리포지토리의 대상 브랜치를 대상으로 하는 풀 리퀘스트(즉, 포크된 리포지토리가 메인 리포지토리로 병합을 시도하는 경우)에는 지원되지 않습니다. PR 게이트는 병합 대기열을 사용하는 GitHub 리포지토리에서는 필수 항목으로 설정할 수 없습니다.
</div>

## 규칙 유형 {#rule-types}

PR 게이트는 다음과 같은 규칙 유형을 제공합니다.

{{< tabs >}}
{{% tab "정적 코드 분석(SAST)" %}}

풀 리퀘스트의 수정된 라인에서 특정 심각도의 새로운 코드 취약점이나 코드 품질 위반이 하나 이상 발생할 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/static_analysis_4.png" alt="리포지토리에 오류 수준 심각도의 새로운 코드 품질 위반 사항이 하나 이상 포함된 경우 실패하는 PR 게이트 규칙" style="width:80%" >}}

{{% /tab %}}
{{% tab "SCA(Software Composition Analysis)" %}}

풀 리퀘스트의 수정된 라인에서 특정 심각도의 새로운 라이브러리 취약점이 하나 이상 발생하거나 금지된 라이선스가 있는 새로운 라이브러리가 하나 이상 포함될 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/sca_4.png" alt="리포지토리에 심각도가 높거나 치명적인 라이브러리 취약점이 하나 이상 포함된 경우 실패하는 PR 게이트 규칙" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
풀 리퀘스트의 수정된 라인으로 인해 리포지토리의 전체 코드 적용 범위가 특정 비율 아래로 떨어지거나 해당 라인의 패치 적용 범위가 특정 임계값 미만일 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/code_coverage_2.png" alt="리포지토리에 심각도가 높거나 치명적인 라이브러리 취약점이 하나 이상 포함된 경우 실패하는 PR 게이트 규칙" style="width:80%" >}}

{{% /tab %}}

{{% tab "Infrastructure as Code Scanning" %}}
풀 리퀘스트의 수정된 라인에서 특정 심각도의 새로운 IaC(Infrastructure as Code) 취약점이 하나 이상 발생할 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/iac_2.png" alt="리포지토리에 심각도가 높거나 치명적인 라이브러리 취약점이 하나 이상 포함된 경우 실패하는 PR 게이트 규칙" style="width:80%" >}}

{{% /tab %}}

{{% tab "Secret Scanning" %}}
풀 리퀘스트의 수정된 라인에서 특정 심각도의 새로운 유출된 시크릿이 하나 이상 발생할 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/secret_scanning.png" alt="리포지토리에서 위험 또는 높음 심각도의 유출된 시크릿이 하나 이상 탐지되면 실패하는 PR 게이트 규칙" style="width:80%" >}}

{{% /tab %}}

{{% tab "신규 불안정한 테스트" %}}
풀 리퀘스트가 최소 하나의 신규 불안정한 테스트를 도입할 때 코드 변경 사항이 병합되지 않도록 차단하는 규칙을 생성할 수 있습니다.

{{< img src="pr_gates/setup/flaky_tests.png" alt="풀 리퀘스트가 최소 하나의 신규 불안정한 테스트를 도입할 때 실패하는 PR 게이트 규칙" style="width:80%" >}}

이 PR 게이트를 [조기 불안정성 탐지][1]와 함께 사용하여 신규 불안정한 테스트를 탐지하세요.

[신규 불안정한 테스트 PR 게이트 설정 방법][2]을 읽어보세요.

[1]: /ko/tests/flaky_tests/early_flake_detection
[2]: /ko/tests/guides/setup_new_flaky_pr_gate/
{{% /tab %}}
{{< /tabs >}}

PR 게이트 규칙을 생성하려면 [설정 문서][7]를 참조하세요. 

## 규칙 관리 {#manage-rules}

[{{< ui >}}PR Gates Rules{{< /ui >}}][8] 페이지에서 PR 게이트 규칙을 관리하고 업데이트할 수 있습니다. 프로젝트 요구 사항 및 위험 허용 범위에 따라 보안 및 품질 관행을 개선하세요. 

조직에서 정의한 모든 규칙을 확인할 수 있습니다.

{{< img src="pr_gates/rules_list_3.png" alt="Datadog의 PR 게이트 규칙 목록" style="width:100%" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/static_analysis
[2]: /ko/security/code_security/software_composition_analysis
[3]: /ko/code_coverage/
[4]: /ko/security/code_security/iac_security/
[5]: /ko/integrations/github/
[6]: /ko/integrations/azure_devops_source_code/
[7]: /ko/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates
[9]: /ko/monitors/
[10]: /ko/security/code_security/secret_scanning/
[11]: /ko/tests/flaky_tests/
[12]: /ko/source_code/features/#pr-comments
[13]: /ko/integrations/gitlab-source-code/
[14]: /ko/integrations/bitbucket-source-code/
[15]: /ko/pr_gates/setup/