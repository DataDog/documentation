---
aliases:
- /ko/guides/multiaccountorg
- /ko/account_management/mult_account
- /ko/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /ko/account_management/multi_organisations
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Configure SAML for your Datadog account
- link: /account_management/billing/usage_details
  tag: 설명서
  text: Learn about Usage Details
- link: /account_management/billing/usage_attribution
  tag: 설명서
  text: Set-up Usage Attribution
- link: /account_management/org_settings/cross_org_visibility
  tag: 설명서
  text: 조직 간 가시성
title: 다중 조직 계정 관리
---

## 개요

하나의 상위 조직 계정에서 여러 하위 조직을 관리할 수 있습니다. 이는 일반적으로 서로의 데이터에 액세스해서는 안 되는 고객을 보유한 관리형 서비스 제공업체에서 사용합니다. 

다중 조직 계정 기능은 기본적으로 사용 설정되어 있지 않습니다. 사용 설정하려면 [Datadog 지원팀][1]에 문의하세요.

## 기능

상위 조직과 여러 하위 조직에 사용자를 추가할 수 있습니다. 사용자는 [사용자 계정 설정 메뉴][2]에서 조직 간에 전환할 수 있습니다. 

상위 조직 내의 조직은 서로의 데이터에 액세스할 수 없습니다. 교차 조직 메트릭 쿼리를 활성화하려면 [조직 간 가시성][3]을 참조하세요.

상위 조직은 개별 하위 조직의 사용량을 볼 수 있으므로 상위 조직은 사용량 추세를 추적할 수 있습니다.

허용 목록에 있는 IP 주소와 같은 계정 설정은 하위 조직이 상위 조직에서 이어받지 않습니다.

## 하위 조직

### 생성

1. 기능이 활성화된 후에는 [새 조직 페이지][4]를 참조하세요.
2. 만들려는 하위 조직의 이름을 입력합니다. **하위 조직 이름은 32자를 초과할 수 없습니다**.
3. 선택 사항으로 관리자를 하위 조직에 초대합니다.
    - 하나 이상의 이메일 주소를 입력합니다.
    - 초대된 사용자에게는 [Datadog 관리자 역할][5]이 할당됩니다. 다음에서 더 많은 사용자를 초대할 수 있습니다.
조직 생성 후 설정
    - 사용자에게 비밀번호가 없는 경우 Datadog로 비밀번호를 설정하고 새 하위 조직에 가입할 수 있는 링크가 포함된 이메일 초대장을 보냅니다.
4. **생성**을 클릭합니다.

새 하위 조직은 상위 조직의 요금제를 상속받으며 상위 조직의 빌링 계정에 추가됩니다. 하위 조직의 빌링을 업데이트하려면 [영업 담당자에게 문의][6]하세요.

### 콘텐츠

[Datadog API][7] 및 Terraform과 같은 도구를 사용하여 프로그래밍 방식으로 새 하위 조직에 기본 설정 대시보드 및 모니터 세트를 온보딩할 수 있습니다([Terraform으로 Datadog 관리하기][8]를 참조하세요). 또한 스크립트를 사용하여 기존 대시보드 및 [모니터][9]를 코드로 백업할 수도 있습니다.

### 커스텀 하위 도메인

커스텀 하위 도메인 기능은 기본적으로 사용하도록 설정되어 있지 않습니다. 사용 설정하려면 [Datadog 지원팀][1]에 문의하세요.

여러 조직의 회원인 경우 커스텀 하위 도메인 도움말에서 알림의 출처를 확인하거나 알림에서 해당 하위 도메인과 연결된 조직으로 즉시 전환할 수 있습니다.
{{% site-region region="us,us3,us5,ap1" %}}
예를 들어 URL `https://app.datadoghq.com/event/event?id=1`은 조직 A의 이벤트와 연결되어 있습니다. 사용자가 조직 A와 조직 B의 회원이지만 조직 B의 컨텍스트 내에서 Datadog를 보고 있는 경우 해당 URL은 `404 Not Found error`를 반환합니다. 사용자는 [사용자 계정 설정 메뉴][2]를 사용하여 조직 A로 전환한 다음 해당 URL을 다시 방문해야 합니다. 그러나 커스텀 하위 도메인을 사용하는 경우, 사용자가 `https://org-a.datadoghq.com/event/event?id=1`로 이동하면, 사용자의 컨텍스트가 자동으로 조직 A로 전환되어 올바른 페이지가 표시됩니다.

**참고**: 커스텀 Datadog 하위 도메인이 있는 경우 Datadog 설명서에서 하위 도메인 이름으로 링크를 수동으로 편집하세요. 예를 들어 `https://**app**.datadoghq.com/account/settings`로 리디렉션되는 링크는 `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings`이 됩니다. {{% /site-region %}}

{{% site-region region="eu" %}}
예를 들어 URL `https://app.datadoghq.eu/event/event?id=1`은 조직 A의 이벤트와 연결되어 있습니다. 사용자가 조직 A와 조직 B의 회원이지만 조직 B의 컨텍스트 내에서 Datadog를 보고 있는 경우 해당 URL은 `404 Not Found error` 을 반환합니다. 사용자는 [사용자 계정 설정 메뉴][2]를 사용하여 조직 A로 전환한 다음 해당 URL을 다시 방문해야 합니다. 그러나 커스텀 하위 도메인을 사용하는 경우, 사용자가 `https://org-a.datadoghq.eu/event/event?id=1`로 이동하면, 사용자의 컨텍스트가 자동으로 조직 A로 전환되어 올바른 페이지가 표시됩니다.

**참고**: 커스텀 Datadog 하위 도메인이 있는 경우 Datadog 문서에서 하위 도메인 이름으로 링크를 수동으로 편집하세요. 예를 들어 `https://**app**.datadoghq.eu/account/settings`로 리디렉션되는 링크는 `https://**<custom_sub-domain_name>**.datadoghq.eu/account/settings`가 됩니다. {{% /site-region %}}

{{% site-region region="gov" %}}
예를 들어 URL `https://app.ddog-gov.com/event/event?id=1`은 조직 A의 이벤트와 연결되어 있습니다. 사용자가 조직 A와 조직 B의 회원이지만 조직 B의 컨텍스트 내에서 Datadog를 보고 있는 경우 해당 URL은 `404 Not Found error`를 반환합니다. 사용자는 [사용자 계정 설정 메뉴][2]를 사용하여 조직 A로 전환한 다음 해당 URL을 다시 방문해야 합니다. 그러나 커스텀 하위 도메인을 사용하는 경우 사용자가 `https://org-a.ddog-gov.com/event/event?id=1`로 이동하면 사용자의 컨텍스트가 자동으로 조직 A로 전환되어 올바른 페이지가 표시됩니다.

**참고**: 커스텀 Datadog 하위 도메인이 있는 경우 Datadog 문서에서 하위 도메인 이름으로 링크를 수동으로 편집하세요. 예를 들어 `https://**app**.ddog-gov.com/account/settings`로 리디렉션되는 링크는 `https://**<custom_sub-domain_name>**.ddog-gov.com/account/settings`가 됩니다. {{% /site-region %}}

## SAML 설정

SAML 설정은 상위 조직에서 하위 조직으로 상속되지 _않습니다_. 각 하위 조직에 대해 개별적으로 SAML을 설정해야 합니다.

다중 조직의 SAML을 구성하는 방법은 다음과 같습니다.

1. 새 조직을 만듭니다.
2. SAML 사용자를 초대합니다.
3. SAML 사용자로 로그인하고 [SAML 설정][10]을 합니다.

### SAML 전용 상위 조직

경우에 따라 새로 생성된 하위 조직에 액세스하지 못할 수 있습니다. 조직에서 사용자에게 SAML을 사용하여 로그인하도록 요구하는 경우 해당 사용자 계정에 비밀번호가 없을 수 있습니다. 하위 조직은 상위 조직으로부터 SAML 설정을 이어받지 않으므로 하위 조직에 로그인하려면 존재하지 않는 비밀번호가 필요합니다.

SAML 전용 상위 조직에서 생성된 하위 조직에 로그인할 수 있는지 확인하려면 상위 조직에서 다음 단계를 수행하시기 바랍니다.
1. 왼쪽 탐색 하단의 계정 메뉴에서 **Organization Settings**를 클릭하거나, 개인 설정 페이지 상단의 헤더 드롭다운에서 **Organization Settings**를 선택합니다.
2. 왼쪽 페이지 메뉴에서 **Users**를 선택합니다.
3. 사용자 프로필을 선택합니다.
4. 해당 위치에서 **Override Default Login Methods** 토글을 설정합니다.
5. **Select user's login methods**에서 **Password** 확인란에 확인 표시를 합니다.
6. 계정에 비밀번호가 있는지 확인하세요. 비밀번호 설정에 도움이 필요한 경우 [Datadog 지원팀][1]에 문의하세요.

위의 단계를 따르면 이메일과 비밀번호 조합을 사용하여 상위 계정에 로그인할 수 있습니다. 하위 조직을 만든 후 이메일과 비밀번호를 사용하여 로그인할 수도 있습니다.

이미 하위 조직을 만들었고 하위 조직이 잠겨 있는 경우에는 절차에 따라 로그인할 수 있습니다.

## 다중 조직 사용량

상위 조직은 왼쪽 하단의 사용자 이름 위로 마우스를 가져가 [**플랜 및 사용량** > **사용량 및 비용**][11]으로 이동하여 모든 조직(하위 조직 및 상위 조직)의 총 사용량과 청구 가능한 사용량을 확인할 수 있습니다.

사용량 페이지에는 상위 조직 및 모든 하위 조직의 집계 사용량이 표시됩니다. 사용량 페이지에는 두 개의 탭이 있습니다.

* 전체
* 개별 조직

### 전체 사용량

이 탭에는 당월 누계 총 사용량 섹션과 전체 사용량 섹션이 있습니다.

월별 총 사용량 섹션에는 상위 조직과 모든 하위 조직에서 해당 월에 사용한 호스트, 컨테이너, 커스텀 메트릭 및 플랫폼기타 부분의 월별 사용량이 요약되어 있습니다.

{{< img src="account_management/multi-org-v2.png" alt="당월 누계 사용량" >}}

대부분의 계정은 기본적으로 최종 빌링에 관계되는 사용량을 보여주는 "Billable" 사용량을 볼 수 있습니다. 또한 이 보기에서는 약정량 및 할당량을 초과하는 온디맨드 사용량을 분류합니다. "All" 보기에는 제품 평가판과 같이 빌링 불가 사용량을 포함한 모든 사용량이 표시됩니다.

전체 사용량 섹션에는 지난 6개월 동안 모든 조직의 월별 총 사용량이 표시됩니다. 여기에 표시된 사용량은 '청구 가능' 사용량이 아닌 '전체' 사용량으로, 평가판 기간이나 최종 청구서를 계산하는 데 사용되는 기타 빌링 변경 사항을 조정하지 않습니다. 이 정보는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-trends.png" alt="전체 사용량 장기 추세" >}}

로그로그당월 누계 총 사용량 섹션과 전체 사용량 섹션은 제품별 하위 탭을 클릭하여 필터링할 수 있습니다. "Log Management" 하위 탭에서 다음을 기준으로 당월 누계 및 전월의 인덱싱 로그 사용량을 표시하는 인덱스별 로그 사용량 표를 볼 수 있습니다.

* 인덱스 이름
* 조직
* 보존 기간(일)
* 라이브 로그와 복원 로그 간에 분류된 인덱싱 로그 수
* 전체 인덱싱 로그 사용량에 대한 해당 인덱스의 기여도

이 데이터는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="인덱스별 다중 조직 로그 사용량" >}}

### 개별 조직 사용량

**Individual Organizations** 사용량 탭에서 하위 조직의 사용량을 절대 단위 또는 총 사용량 대비 백분율로 볼 수 있습니다.

기본 보기는 최종 빌링 금액에 기여하는 사용량을 보여주는 "Billable" 보기입니다. 이 보기는 평가판 조직과 같이 청구 불가능한 하위 조직과, 빌링 원인을 보다 정확하게 요약하는 기타 조정 요소를 제거합니다. 상위 조직 및 모든 하위 조직의 조정되지 않은 원시 사용량을 보려면 "All" 보기로 전환하시기 바랍니다. 두 보기 모두 CSV 파일로 다운로드할 수 있습니다.

하위 조직의 [사용 내역][12]을 보려면 하위 조직의 이름을 클릭하면 됩니다.

## 사용량 속성

상위 조직은 [사용 속성][13] 페이지에서 기존 태그를 설정하다 키를 통해 하위 조직의 사용량을 확인할 수 있습니다. 관리자는 왼쪽 하단의 사용자 ID에 마우스를 가져가 다음 페이지로 이동할 수 있습니다: [**계획 및 사용량 > 사용량 어트리뷰션**][14]으로 이동합니다.

상위 조직 수준에서 활성화하면 사용량 속성에 모든 조직의 집계 사용량이 표시됩니다. 이는 특정 프로젝트, 팀 또는 기타 그룹에 대한 하위 조직의 사용량을 지정하려는 경우에 유용합니다.

해당 기능에는 다음이 포함됩니다.

* 새 태그 키 변경 및 추가(최대 3개).
* UI 및 .tsv 다운로드(탭으로 구분된 값) 모두에서 월별 사용량에 액세스 가능.
* 대부분의 사용량 유형에서 .tsv 파일 형식의 일일 사용량에 액세스 가능.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="월별 사용량 어트리뷰션 보고서" style="width:100%;" >}}

사용량 속성은 하위 조직 수준에서도 활성화할 수 있습니다. 이 수준에서 활성화하면 태그가 특정 하위 조직에만 적용되고 해당 하위 조직에서만 볼 수 있습니다. 하위 조직 수준에서 적용된 태그는 반영되지 않으며 상위 조직에서 볼 수 없습니다.

사용량 속성은 엔터프라이즈 플랜에 포함된 고급 기능입니다. 다른 모든 플랜에 대한 내용은 계정 담당자 또는 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/account_management/#managing-your-organizations
[3]: /ko/account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /ko/account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /ko/api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /ko/monitors/manage/
[10]: /ko/account_management/saml/
[11]: https://app.datadoghq.com/billing/usage?cost_summary
[12]: /ko/account_management/plan_and_usage/usage_details/
[13]: /ko/account_management/billing/usage_attribution/
[14]: https://app.datadoghq.com/billing/usage-attribution