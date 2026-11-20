---
aliases:
- /ko/guides/multiaccountorg
- /ko/account_management/mult_account
- /ko/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /ko/account_management/multi_organisations
description: 관리형 서비스 공급자가 상위 계정에서 각 하위 조직의 청구, 사용량 추적 및 액세스 제어를 별도로 관리하면서 여러 하위 조직을
  운영할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: 블로그
  text: 대규모 Datadog 조직 관리의 모범 사례
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 구성
- link: /account_management/billing/usage_details
  tag: 설명서
  text: 사용 내역에 대해 알아보기
- link: /account_management/billing/usage_attribution
  tag: 설명서
  text: 사용량 속성 설정
- link: /account_management/org_settings/cross_org_visibility
  tag: 설명서
  text: 조직 간 가시성
title: 다중 조직 계정 관리
---
## 개요 {#overview}

하나의 상위 조직 계정에서 여러 하위 조직을 관리할 수 있습니다. 이는 일반적으로 고객 간 데이터 액세스를 차단해야 하는 관리형 서비스 공급자가 사용하는 기능입니다. 

다중 조직 계정 기능은 기본적으로 활성화되어 있지 않습니다. 이 기능을 활성화하려면 [Datadog 지원팀][1]에 문의하세요.

## 기능 {#capabilities}

사용자를 상위 조직과 여러 하위 조직에 추가할 수 있습니다. 사용자는 [사용자 계정 설정 메뉴][2]에서 조직을 전환할 수 있습니다. 

상위 조직 내의 조직은 서로의 데이터에 액세스할 수 없습니다. 조직 간 메트릭 쿼리를 활성화하려면 [조직 간 가시성][3]을 참조하세요.

상위 조직은 개별 하위 조직의 사용량을 볼 수 있으므로 상위 조직은 사용량 추세를 추적할 수 있습니다.

허용 목록에 있는 IP 주소와 같은 계정 설정은 하위 조직이 상위 조직에서 이어받지 않습니다.

## 하위 조직 {#child-organizations}

### 생성 {#create}

1. 기능이 활성화된 후에는 [새 조직 페이지][4]를 참조하세요.
2. 생성하려는 하위 조직의 이름을 입력합니다. **하위 조직 이름은 32자를 초과할 수 없습니다.**
3. 필요시 관리자 사용자를 하위 조직에 초대합니다.
    - 하나 이상의 이메일 주소를 입력합니다.
    - 초대된 사용자에게는 [Datadog Admin 역할][5]이 할당됩니다. 조직을 생성한 후
Organization Settings에서 추가 사용자를 초대할 수 있습니다.
    - 사용자에게 비밀번호가 없는 경우 Datadog로 비밀번호를 설정하고 새 하위 조직에 가입할 수 있는 링크가 포함된 이메일 초대장을 보냅니다.
4. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

새 하위 조직은 상위 조직의 플랜을 상속하며 상위 조직의 결제 계정에 추가됩니다. 하위 조직의 청구 정보를 업데이트하려면 [영업 담당자에게 문의][6]하세요.

### 콘텐츠 {#content}

[Datadog API][7] 및 Terraform과 같은 도구를 사용하여 프로그래밍 방식으로 새 하위 조직에 기본 설정 대시보드 및 모니터링 세트를 온보딩할 수 있습니다([Terraform으로 Datadog 관리하기][8] 참조). 또한 스크립트를 사용하여 기존 대시보드 및 [모니터링][9]을 코드로 백업할 수 있습니다.

### 사용자 지정 하위 도메인 {#custom-sub-domains}

사용자 지정 하위 도메인 기능은 기본적으로 활성화되어 있지 않습니다. 이 기능을 활성화하려면 [Datadog 지원팀][1]에 문의하세요.

여러 조직의 구성원인 경우 사용자 지정 하위 도메인을 통해 경보나 알림의 소스를 식별할 수 있습니다. 또한 하위 도메인과 연결된 조직으로 즉시 전환할 수 있습니다.

예를 들어, URL **https:{{< region-param key=dd_full_site >}}/event/event?id=1**은 조직 A의 이벤트와 연결되어 있습니다. 사용자가 조직 A와 조직 B에 모두 속해 있지만 조직 B의 컨텍스트에서 Datadog을 보고 있다면 해당 URL은 `404 Not Found error`를 반환합니다. 사용자는 [사용자 계정 설정 메뉴][2]에서 조직 A로 전환한 후 해당 URL에 다시 접속해야 합니다. 하지만 사용자 지정 하위 도메인을 사용하면**https://org-a.{{< region-param key=dd_site >}}/event/event?id=1**로 이동할 수 있으며, 이 경우 사용자 컨텍스트가 자동으로 조직 A로 전환되고 올바른 페이지가 표시됩니다.**참고**: 사용자 지정 Datadog 하위 도메인이 있는 경우 Datadog 설명서의 링크를 해당 하위 도메인 이름으로 수동 편집하세요. 예를 들어,**https:{{< region-param key=dd_full_site >}}/account/settings**로 리디렉션되는 링크는**https://<custom_sub-domain_name>.{{< region-param key=dd_site >}}/account/settings**가 됩니다.

## SAML 설정 {#set-up-saml}

SAML 설정은 상위 조직에서 하위 조직으로 상속되지 _않습니다_. SAML은 각 하위 조직에 대해 개별적으로 구성해야 합니다.

다중 조직의 SAML을 구성하는 방법은 다음과 같습니다.

1. 새 조직을 생성합니다.
2. SAML 사용자를 초대합니다.
3. SAML 사용자로 로그인한 후 [SAML을 설정][10]합니다.

### SAML 로그인 필수 상위 조직 {#saml-strict-parent-organizations}

경우에 따라 새로 만든 하위 조직에 액세스하지 못할 수도 있습니다. 조직에서 사용자가 SAML을 사용하여 로그인하도록 요구하는 경우, 해당 사용자 계정에 비밀번호가 없을 수 있습니다. 하위 조직은 상위 조직으로부터 SAML 설정을 상속받지 않으므로, 하위 조직에 로그인하려면 존재하지 않는 비밀번호가 필요합니다.

SAML 전용 상위 조직에서 생성된 하위 조직에 로그인할 수 있는지 확인하려면 상위 조직에서 다음 단계를 수행하시기 바랍니다.
1. 왼쪽 사이드 탐색 메뉴 하단의 계정 메뉴에서 {{< ui >}}Organization Settings{{< /ui >}}를 클릭하거나, Personal Settings 페이지 상단의 헤더 드롭다운에서 {{< ui >}}Organization Settings{{< /ui >}}를 선택합니다.
2. 왼쪽 페이지 메뉴에서 {{< ui >}}Users{{< /ui >}}를 선택합니다.
3. 자신의 사용자 프로필을 선택합니다.
4. {{< ui >}}Override Default Login Methods{{< /ui >}} 토글을 켭니다.
5. {{< ui >}}Select user's login methods{{< /ui >}} 아래에서 {{< ui >}}Password{{< /ui >}} 확인란을 선택합니다.
6. 계정에 비밀번호가 설정되어 있는지 확인합니다. 비밀번호 설정에 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.

위 단계를 따르면 이메일과 비밀번호 조합을 사용하여 상위 계정에 로그인할 수 있습니다. 하위 조직을 만든 후에는 이메일과 비밀번호를 사용하여 해당 조직에 로그인할 수도 있습니다.

이미 하위 조직을 만들었고 하위 조직이 잠겨 있는 경우에는 절차에 따라 로그인할 수 있습니다.

## 다중 조직 사용량 {#multi-org-usage}

상위 조직은 왼쪽 하단의 사용자 이름 위로 마우스를 가져가 [**Plan & Usage** > **Usage & Cost**][11]로 이동하여 모든 조직(하위 조직 및 상위 조직)의 총 사용량과 청구 대상 사용량을 확인할 수 있습니다.

Usage 페이지에는 상위 조직 및 모든 하위 조직의 집계 사용량이 표시됩니다. Usage 페이지에는 다음과 같은 두 개의 탭이 있습니다.

* {{< ui >}}Overall{{< /ui >}}
* {{< ui >}}Individual Organizations{{< /ui >}}

### Overall usage {#overall-usage}

이 탭에는 Month-to-Date Total Usage 섹션과 Overall Usage 섹션이 있습니다.

Month-to-Date Total Usage 섹션에는 상위 조직과 모든 하위 조직에서 해당 월에 사용한 호스트, 컨테이너, 사용자 지정 메트릭 및 기타 플랫폼 부분의 월별 사용량이 요약되어 있습니다.

{{< img src="account_management/multi-org-v2.png" alt="당월 누계 사용량" >}}

대부분의 계정은 기본적으로 최종 청구서에 반영되는 사용량을 보여주는 'Billable' 사용량을 확인할 수 있습니다. 이 보기에서는 약정 및 할당량을 초과한 온디맨드 사용량도 별도로 표시합니다. 'All' 보기에는 제품 체험판 등 청구 대상이 아닌 사용량을 포함한 모든 사용량이 표시됩니다.

Overall Usage 섹션에는 지난 6개월간 모든 조직의 월별 집계 사용량이 표시됩니다. 여기에 표시된 사용량은 'Billable' 사용량이 아닌 'All' 사용량이므로 최종 청구 금액 계산에 적용되는 체험 기간이나 기타 청구 조정 사항이 반영되지 않습니다. 이 정보는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-trends.png" alt="전체 사용량의 장기 추세" >}}

Month-to-Date Total Usage 섹션과 Overall Usage 섹션 모두 제품별 하위 탭을 클릭하여 필터링할 수 있습니다. 'Log Management' 하위 탭의 Logs Usage by Index 표에서는 다음 항목을 기준으로 당월 누계 및 지난달의 인덱싱된 로그 사용량을 확인할 수 있습니다.

* 인덱스 이름
* 조직
* 보존 기간(일)
* 라이브 로그와 재수화된 로그로 구분한 인덱싱된 로그 수
* 전체 인덱싱된 로그 사용량에서 해당 인덱스가 차지하는 비율

이 데이터는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="다중 조직의 인덱스별 로그 사용량" >}}

### 개별 조직 사용량 {#individual-organization-usage}

{{< ui >}}Individual Organizations{{< /ui >}} 사용량 탭에서 하위 조직의 사용량을 절댓값 또는 총 사용량 대비 백분율로 확인할 수 있습니다.

기본 보기는 최종 청구서에 반영되는 사용량을 표시하는 'Billable' 보기입니다. 이 보기에서는 체험판 조직과 같이 청구 대상이 아닌 하위 조직을 제외하고 기타 조정 사항을 반영하여 청구 금액에 영향을 미치는 사용량을 더 정확하게 요약합니다. 'All' 보기로 전환하면 상위 조직과 모든 하위 조직의 조정되지 않은 원시 사용량을 확인할 수 있습니다. 두 보기의 데이터 모두 CSV 파일로 다운로드할 수 있습니다.

하위 조직의 [사용 내역][12]을 보려면 하위 조직의 이름을 클릭하면 됩니다.

## 사용량 속성 {#usage-attribution}

상위 조직은 [사용량 속성][13] 페이지에서 기존 태그 키별로 하위 조직의 사용량을 확인할 수 있습니다. 관리자는 왼쪽 하단의 사용자 이름 위로 마우스를 가져간 다음 [**Plan & Usage > Usage Attribution**][14]으로 이동할 수 있습니다.

상위 조직 수준에서 활성화하면 사용량 속성에 모든 조직의 집계 사용량이 표시됩니다. 하위 조직의 사용량을 특정 프로젝트, 팀 또는 기타 그룹에 귀속시키려는 경우 유용합니다.

해당 기능에는 다음이 포함됩니다.

* 태그 키 변경 및 새 태그 키 추가(최대 3개)
* UI에서 월별 사용량 조회 및 .tsv(탭으로 구분된 값) 파일로 다운로드
* 대부분의 사용량 유형에 대한 일일 사용량을 .tsv 파일로 다운로드

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="월별 사용량 속성 보고서" style="width:100%;" >}}

사용량 속성은 하위 조직 수준에서도 활성화할 수 있습니다. 하위 조직 수준에서 활성화하면 태그가 해당 하위 조직에만 적용되며 해당 하위 조직에서만 확인할 수 있습니다. 하위 조직 수준에서 적용된 태그는 상위 조직으로 집계되지 않으며 상위 조직에서 확인할 수 없습니다.

사용량 속성은 엔터프라이즈 플랜에 포함된 고급 기능입니다. 다른 플랜을 사용하는 경우 계정 담당자 또는 [success@datadoghq.com][6]으로 문의하세요.

## 추가 자료 {#further-reading}

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