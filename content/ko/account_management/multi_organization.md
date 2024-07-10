---
aliases:
- /ko/guides/multiaccountorg
- /ko/account_management/mult_account
- /ko/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /ko/account_management/multi_organisations
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/billing/usage_details
  tag: Documentation
  text: Learn about Usage Details
- link: /account_management/billing/usage_attribution
  tag: Documentation
  text: Set-up Usage Attribution
title: 다중 조직 계정 관리
---

상위 조직 계정 하나에서 여러 하위 조직을 관리할 수 있습니다. 이와 같은 형태는 데이터에 서로 액세스해서는 안 되는 고객이 있는 관리형 서비스 제공업체에서 일반적으로 사용됩니다. 사용자를 상위 조직 및/또는 여러 하위 조직에 추가하고 [사용자 계정 설정 메뉴][1]에서 전환할 수 있습니다. 상위 조직은 개별 하위 조직의 사용량을 확인하여 사용량 추세를 추적할 수 있습니다.

허용 목록에 있는 IP 주소와 같은 계정 설정은 하위 조직이 상위 조직에서 이어받지 않습니다.

다중 조직 계정 기능은 기본적으로 활성화되어 있지 않습니다. 활성화하려면 [Datadog 지원팀][2]에 문의하세요.

다음 안내 동영상(2분)을 참고하세요.

{{< wistia tg9ufqbin9>}}
<br>

## 하위 조직

### 생성

1. 기능을 활성화한 후에는 [새 조직 페이지][3]를 참조하세요.
2. 생성할 하위 구성의 이름을 입력합니다. **하위 구성 이름은 32자를 초과할 수 없습니다.**
3. 또는 하위 조직에 관리자를 초대합니다:
    - 전자 메일 주소를 하나 이상 입력합니다.
    - 초대된 사용자에게는 [Datadog Admin 역할][4] 이 할당됩니다. 더 많은 사용자를 초대할 수 있습니다
조직을 생성한 후 조직 설정을 합니다.
    - 사용자에게 암호가 없으면 Datadog은 암호를 설정하고 새 하위 조직에 가입할 수 있는 링크와 함께 전자 메일 초대를 보냅니다.
4. **생성**을 클릭합니다.

새 하위 조직은 상위 조직의 플랜을 이어받고, 상위 조직의 빌링 계정에 추가됩니다. 하위 조직의 빌링을 업데이트하려면 [영업 담당자에게 문의하세요][5].

### 콘텐츠

기준 대시보드 및 모니터 세트로 새로운 하위 조직을 온보딩하는 것은 [Datadog API][6] 및 Terraform과 같은 도구를 사용하여 프로그래밍 방식으로 수행할 수 있습니다([Terraform으로 Datadog 관리하기][7] 참조). 또한 스크립트를 사용하여 기존 대시보드와 [모니터][8]를 코드로 백업할 수 있습니다.

### 커스텀 하위 도메인

커스텀 하위 도메인 기능은 기본적으로 활성화되어 있지 않습니다. 활성화하려면 [Datadog 지원팀][2]에 문의하세요.

다중 조직의 구성원인 경우 커스텀 하위 도메인을 사용하면 경고 또는 알림의 출처를 식별하는 데 도움이 됩니다. 또한 하위 도메인과 연결된 조직으로 즉시 전환할 수 있습니다.

예를 들어 URL `https://app.datadoghq.com/event/event?id=1`은 조직 A의 이벤트와 연결됩니다. 사용자가 조직 A와 조직 B 모두의 구성원이지만 조직 B의 컨텍스트에서 Datadog를 보고 있는 경우 해당 URL은 `404 Not Found error`를 반환합니다. 사용자는 [사용자 계정 설정 메뉴][1]를 사용하여 조직 A로 전환한 뒤 URL을 다시 방문해야 합니다. 그러나 커스텀 하위 도메인을 사용하면 사용자가 `https://org-a.datadoghq.com/event/event?id=1`로 이동하고, 여기서 사용자 컨텍스트가 조직 A로 자동 전환된 뒤 올바른 페이지가 표시됩니다.

**참고**: 커스텀 Datadog 하위 도메인이 있는 경우 하위 도메인 이름으로 Datadog 설명서의 링크를 수동으로 편집하세요. 예를 들어 `https://**app**.datadoghq.com/account/settings`로 리디렉션되는 링크는 `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings`가 됩니다.

## SAML 설정

SAML 설정은 하위 조직이 상위 조직에서 이어받지 _않습니다_. 각 하위 조직에 SAML을 개별적으로 구성해야 합니다.

다중 조직의 SAML을 구성하는 방법은 다음과 같습니다.

1. 새 조직을 만듭니다.
2. SAML 사용자를 초대합니다.
3. SAML 사용자로 로그인 후 [SAML 설정][9]합니다.

### SAML 전용 상위 조직

경우에 따라 새로 생성된 하위 조직에 액세스하지 못할 수 있습니다. 조직에서 사용자에게 SAML을 사용하여 로그인하도록 요구하는 경우 해당 사용자 계정에 비밀번호가 없을 수 있습니다. 하위 조직은 상위 조직으로부터 SAML 설정을 이어받지 않으므로 하위 조직에 로그인하려면 존재하지 않는 비밀번호가 필요합니다.

SAML 전용 상위 조직에서 생성된 하위 조직에 로그인할 수 있는지 확인하려면 상위 조직에서 다음 단계를 수행하시기 바랍니다.
1. 왼쪽 탐색 하단의 계정 메뉴에서 **Organization Settings**를 클릭하거나, 개인 설정 페이지 상단의 헤더 드롭다운에서 **Organization Settings**를 선택합니다.
2. 왼쪽 페이지 메뉴에서 **Users**를 선택합니다.
3. 사용자 프로필을 선택합니다.
4. 해당 위치에서 **Override Default Login Methods** 토글을 설정합니다.
5. **Select user's login methods**에서 **Password** 확인란에 확인 표시를 합니다.
6. 계정에 비밀번호가 있는지 확인하세요. 비밀번호 설정에 도움이 필요한 경우 [Datadog 지원팀][2]에 문의하세요.

위의 단계를 따르면 이메일과 비밀번호 조합을 사용하여 상위 계정에 로그인할 수 있습니다. 하위 조직을 만든 후 이메일과 비밀번호를 사용하여 로그인할 수도 있습니다.

이미 하위 조직을 만들었고 하위 조직이 잠겨 있는 경우에는 절차에 따라 로그인할 수 있습니다.

## 다중 조직 사용량

상위 조직은 왼쪽 하단 모서리에 있는 사용자 이름 위로 마우스를 가져간 다음 *Plan & Usage** > **Usage**로 이동하여 모든 조직(하위 조직 및 상위 조직)의 총 사용량과 빌링 가능 사용량을 볼 수 있습니다.

사용량 페이지에는 상위 조직 및 모든 하위 조직의 집계 사용량이 표시됩니다. 사용량 페이지에는 두 개의 탭이 있습니다.

* 전체
* 개별 조직

### 전체 사용량

이 탭에는 당월 누계 총 사용량 섹션과 전체 사용량 섹션이 있습니다.

월별 총 사용량 섹션에는 상위 조직과 모든 하위 조직에서 해당 월에 사용한 호스트, 컨테이너, 커스텀 메트릭 및 플랫폼기타 부분의 월별 사용량이 요약되어 있습니다.

{{< img src="account_management/multi-org-v2.png" alt="당월 누계 사용량" >}}

대부분의 계정은 기본적으로 최종 빌링에 관계되는 사용량을 보여주는 "Billable" 사용량을 볼 수 있습니다. 또한 이 보기에서는 약정량 및 할당량을 초과하는 온디맨드 사용량을 분류합니다. "All" 보기에는 제품 평가판과 같이 빌링 불가 사용량을 포함한 모든 사용량이 표시됩니다.

전체 사용량 섹션에는 지난 6개월 동안에 걸친 모든 조직의 월별 집계 사용량이 표시됩니다. 여기에 표시된 사용량은 "Billable" 사용량이 아닌 "All" 사용량입니다. 즉 평가판 기간이나 최종 빌링 금액을 계산하는 데 사용되는 기타 빌링 변경 사항에 맞춰 조정이 이뤄지지 않습니다. 이 정보는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-trends.png" alt="전체 사용량 장기 추세" >}}

로그로그당월 누계 총 사용량 섹션과 전체 사용량 섹션은 제품별 하위 탭을 클릭하여 필터링할 수 있습니다. "Log Management" 하위 탭에서 다음을 기준으로 당월 누계 및 전월의 인덱싱 로그 사용량을 표시하는 인덱스별 로그 사용량 표를 볼 수 있습니다.

* 인덱스 이름
* 조직
* 리텐션 기간(일)
* 라이브 로그와 복원 로그 간에 분류된 인덱싱 로그 수
* 전체 인덱싱 로그 사용량에 대한 해당 인덱스의 기여도

이 데이터는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="인덱스별 다중 조직 로그 사용량" >}}

### 개별 조직 사용량

**Individual Organizations** 사용량 탭에서 하위 조직의 사용량을 절대 단위 또는 총 사용량 대비 백분율로 볼 수 있습니다.

{{< img src="account_management/multi-org-percent-billable-v2.png" alt="개별 퍼센트 사용량" >}}

기본 보기는 최종 빌링 금액에 기여하는 사용량을 보여주는 "Billable" 보기입니다. 이 보기는 평가판 조직과 같이 청구 불가능한 하위 조직과, 빌링 원인을 보다 정확하게 요약하는 기타 조정 요소를 제거합니다. 상위 조직 및 모든 하위 조직의 조정되지 않은 원시 사용량을 보려면 "All" 보기로 전환하시기 바랍니다. 두 보기 모두 CSV 파일로 다운로드할 수 있습니다.

하위 조직의 [사용량 세부정보][10]를 보려면 하위 조직의 이름을 클릭합니다.

## 사용량 속성

상위 조직은 [사용량 속성][11] 페이지에서 기존 태그 키에 의한 하위 조직의 사용을 볼 수 있습니다. 관리자는 왼쪽 하단에 있는 사용자 이름 위에 마우스를 올린 후 다음 `Plan & Usage`-->`Usage Attribution`로 이동할 수 있습니다.

상위 조직 수준에서 활성화하면 사용량 속성에 모든 조직의 집계 사용량이 표시됩니다. 이는 특정 프로젝트, 팀 또는 기타 그룹에 대한 하위 조직의 사용량을 지정하려는 경우에 유용합니다.

해당 기능에는 다음이 포함됩니다.

* 새 태그 키 변경 및 추가(최대 3개).
* UI 및 .tsv 다운로드(탭으로 구분된 값) 모두에서 월별 사용량에 액세스 가능.
* 대부분의 사용량 유형에서 .tsv 파일 형식의 일일 사용량에 액세스 가능.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-v2-Total-Usage.png" alt="Datadog에 적용된 태그" style="width:100%;" >}}

사용량 속성은 하위 조직 수준에서도 활성화할 수 있습니다. 이 수준에서 활성화하면 태그가 특정 하위 조직에만 적용되고 해당 하위 조직에서만 볼 수 있습니다. 하위 조직 수준에서 적용된 태그는 반영되지 않으며 상위 조직에서 볼 수 없습니다.

참고: 다음 사용량 유형은 이 도구에서 지원되지 않습니다.

* 인덱싱 로그 이벤트
* 수집 로그
* (리텐션 필터로 리텐션된) 인덱싱 스팬

사용량 속성은 엔터프라이즈 플랜에 포함된 고급 기능입니다. 다른 모든 플랜에 대한 내용은 계정 담당자 또는 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/#managing-your-organizations
[2]: /ko/help/
[3]: https://app.datadoghq.com/account/new_org
[4]: /ko/account_management/rbac/permissions/#advanced-permissions
[5]: mailto:success@datadoghq.com
[6]: /ko/api/
[7]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[8]: /ko/monitors/manage/
[9]: /ko/account_management/saml/
[10]: /ko/account_management/plan_and_usage/usage_details/
[11]: /ko/account_management/billing/usage_attribution/