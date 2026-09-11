---
aliases:
- /ko/integrations/github_apps
categories:
- collaboration
- developer tools
- issue tracking
- source control
custom_kind: 통합
dependencies: []
description: GitHub을 Datadog에 연결해 서비스 성능에 영향을 주는 커밋과 풀 요청을 모니터링하기.
doc_link: https://docs.datadoghq.com/integrations/github/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-github-audit-logs-alerts-datadog/
  tag: 블로그
  text: Datadog로 GitHub 감사 로그 및 스캔 알림 수집
- link: https://www.datadoghq.com/blog/github-source-code-integration/
  tag: 블로그
  text: Datadog의 GitHub과 소스 코드 통합을 사용해 트러블슈팅 간소화
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: 블로그
  text: 전 GitHub Actions를 사용하는데요. 모두에게 추천합니다.
- link: https://docs.datadoghq.com/integrations/guide/source-code-integration/
  tag: 설명서
  text: Datadog 소스 코드 통합에 관해 알아보기
- link: https://docs.datadoghq.com/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
  tag: 설명서
  text: 서비스 카탈로그에서 GitHub 통합 사용하는 방법 알아보기
- link: https://docs.datadoghq.com/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
  tag: 설명서
  text: 서버리스 모니터링에서 GitHub 통합 사용하는 방법 알아보기
git_integration_title: github
has_logo: true
integration_id: github
integration_title: GitHub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: github
public_title: GitHub 통합
short_description: Datadog와 GitHub 연결하기.
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

GitHub 통합을 설정해 GitHub Apps와 GitHub Actions를 구성하고 내 리포지토리 액세스를 안정화한 후 고급 텔레메트리(예: 감사 로그, 취약성 보고서, 비밀 스캔, 리포지토리 통계)를 수집하세요.

{{< img src="integrations/github/repo_configuration.png" alt="GitHub 통합 타이틀의 리포지토리 구성 탭" popup="true" style="width:100%;">}}

Datadog [소스 코드 통합][1]을 사용해 내 스택 트레이스의 코드 조각을 확인하고, [Lambda 함수][2]에 사용하기 위해 스택 트레이스를 GitHub 소스 코드에 연결하며, [CI Visibility][3]의 풀 요청 댓글에서 테스트 결과를 표시할 수 있습니다. 또 [서비스 카탈로그][4]에서 GitHub의 여러 서비스 정의에 액세스할 수 있습니다.

## 설정

<div class="alert alert-info">
다음 지침에 따라 GitHub Apps를 설치하고 Datadog에 권한을 부여하세요. 부여한 권한에 따라 소스 코드 통합을 설정하고, 스택 트레이스에서 코드 조각을 확인하며, 감사 로그와 같은 텔레메트리를 수집할 수 있습니다. 이에 더해 CI Visibility에서 GitHub Actions에 액세스하는 등 다양한 작업을 할 수 있습니다.
</div>

### 내 조직이나 개인 계정에 리포지토리 연결

GitHub 조직 관리자 역할을 맡고 있는 경우 GitHub App을 구성할 수 있습니다.

1. [GitHub 통합 타이틀][5]에서 **Repo Configuration** 탭으로 이동하세요.
2. **Link GitHub Account**를 클릭해 새 GitHub App을 생성하세요.
3. **Configure**에서 **Organization**를 클릭해 내 조직 이름을 입력하거나 **Personal Account**를 선택하세요.

   (선택 사항) GitHub Enterprise Server 인스턴스(버전 2.22 이상)의 URL을 지정하고 Datadog 서버가 내 Enterprise 인스턴스에 연결할 수 있는지 확인하세요. [IP 범위][6]의 Webhook 섹션에서 서버 IP를 확인할 수 있습니다.

4. **Edit Permissions**에서 이슈, 풀 요청, 컨텐츠에 대한 Datadog의 읽기 권한을 활성화하세요. 최소 권한 하나를 선택해야 합니다.
5. **Create App in GitHub**을 클릭하면 GitHub 내의 GitHub App 이름을 입력하는 화면이 나타납니다.
6. GitHub App 이름 필드에 이름을 입력하고 **Create GitHub App**을 클릭하세요.
7. **Configuration** 탭에서 **Install GitHub App**을 클릭하고 **Install & Authorize**을 선택하세요.

GitHub App에서 통합 타이틀을 표시합니다. 스택 트레이스에서 인라인 코드 조각을 활성화하려면 [소스 코드 통합 설정][1]을 참고하세요.

### 노트북

이슈와 풀 요청에 대한 GitHub App 읽기 권한을 부여한 경우 GitHub 이슈와 풀 요청에서 마우스 오버하면 나타나는 미리 보기 상자를 자동으로 생성하여 커밋 내역, 작성자, [노트북][7] 내 날짜를 표시합니다.

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Git 링크" style="width:90%;">}}

1.  **Notebooks** > **New Notebook**으로 이동하세요.
2. **Text** 셀을 추가하고 **Edit** 필드에 GitHub의 이슈나 풀 요청을 언급하세요(예: `https://github.com/project/repository/pull/#`).
3. **Done**을 클릭하면 내가 연결한 이슈나 풀 요청 옆에 GitHub 아이콘이 나타납니다.
4. **Connect to Preview**와 **Authorize**를 클릭하세요.
5. 연결한 이슈나 풀 요청에 마우스 커서를 올리면 설명 미리 보기가 나타납니다.

### 감사 로그

감사 로그에는 GitHub 조직 전반의 활동과 이벤트 전체가 포함됩니다. 애플리케이션을 설치한 후 **Organization Administration** 권한을 허용해 읽기 액세스가 가능하도록 하세요. 그러면 애플리케이션에서 GitHub을 대신해 GitHub의 감사 스트림을 로그로 스트림하기 시작합니다.

**참고**: 감사 로그를 수집하려면 GitHub Enterprise 계정이 필요합니다.

GitHub 설명서의 [Datadog로 스트리밍 설정][8]에 안내된 지침에 따라 감사 로그를 Datadog로 전송하세요. 감사 로그에 관한 자세한 정보를 보려면 GitHub 설명서에서 [감사 로그 작업][9]을 참고하세요.

## 수집한 데이터

### 메트릭

GitHub 통합에서는 코드 스캔 알림과 비밀 스캔 알림 메트릭을 수집합니다. 이 메트릭을 상태, 레포, 비밀 유형별로 카테고리화하여 조직의 알림 상태를 전반적으로 파악할 수 있습니다. 또 알람 추세와 일반적인 진행 상황에 관한 장기적인 인사이트를 얻을 수 있습니다.

이와 같은 메트릭을 수집하려면 애플리케이션을 설치하고 읽기 액세스를 허용하는 권한을 선택하세요. 코드 스캔이나 비밀 스캔 메트릭을 받고 싶지 않으면 통합 타이틀의 **Telemetery** 탭에서 해당 조직을 찾은 후 해당 섹션에 있는 토글 버튼을 클릭한 후 **Update Account**를 클릭하세요.

### 이벤트

<div class="alert alert-info">
GitHub과 Datadog에서 웹훅을 구성하려면 다음 지침을 따라 Events Explorer에서 이벤트가 나타나도록 허용하세요.
</div>

#### GitHub에서 웹훅 추가

1. GitHub 프로젝트에서 **Settings** > **Webhooks**으로 이동하세요.
2. **Add webhook**을 클릭하세요.
3. **Payload URL** 필드에 URL `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<DATADOG_API_KEY>`를 추가하세요. 이때 `<DATADOG_API_KEY>`를 [내 Datadog API 키][10]로 바꿔야 합니다.
4. **Content type** 드롭다운 메뉴에서 `application/json`를 선택하세요.
5. (선택 사항) **Secret** 필드에 비밀을 추가합니다.
6. **Which events would you like to trigger this webhook?** 섹션에서 **Let me select individual events.**를 클릭하고 지원되는 다음 옵션 중 하나를 선택해 [이벤트][11]를 Datadog로 전송하세요.

   | 이벤트 이름 | 이벤트 작업                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
   |---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | [브랜치 또는 태그 생성][12] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [커밋 댓글][13] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [이슈 댓글][14] | 다음 작업이 지원됩니다. <br><br>- [`created`][15]<br>- [`deleted`][16]<br>- [`edited`][17]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
   | [이슈][18] | 다음 작업이 지원됩니다. <br><br>- [`assigned`][19]<br>- [`closed`][20]<br>- [`deleted`][21]<br>- [`demilestoned`][22]<br>- [`edited`][23]<br>- [`labeled`][24]<br>- [`locked`][25]<br>- [`milestoned`][26]<br>- [`opened`][27]<br>- [`pinned`][28]<br>- [`reopened`][29]<br>- [`transferred`][30]<br>- [`unassigned`][31]<br>- [`unlabeled`][32]<br>- [`unlocked`][33]<br>- [`unpinned`][34]                                                                                                                                                                                |
   | [풀 요청 검토 댓글][35] | 다음 작업이 지원됩니다. <br><br>- [`created`][36]<br>- [`deleted`][37]<br>- [`edited`][38]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
   | [풀 요청][39] | 다음 작업이 지원됩니다. <br><br>- [`assigned`][40]<br>- [`unassigned`][41]<br>- [`labeled`][42]<br>- [`unlabeled`][43]<br>- [`opened`][44]<br>- [`edited`][45]<br>- [`closed`][46]<br>- [`reopened`][47]<br>- [`synchronize`][48]<br>- [`converted_to_draft`][49]<br>- [`locked`][50]<br>- [`unlocked`][51]<br>- [`enqueued`][52]<br>- [`dequeued`][53]<br>- [`milestoned`][54]<br>- [`demilestoned`][55]<br>- [`ready_for_review`][56]<br>- [`review_requested`][57]<br>- [`review_request_removed`][58]<br>- [`auto_merge_enabled`][59]<br>- [`auto_merge_disabled`][60]  |
   | [푸시][61] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [리포지토리][62] | 다음 작업이 지원됩니다, <br><br>- [`archived`][63]<br>- [`created`][64]<br>- [`deleted`][65]<br>- [`edited`][66]<br>- [`privatized`][67]<br>- [`publicized`][68]<br>- [`renamed`][69]<br>- [`transferred`][70]<br>- [`unarchived`][71]                                                                                                                                                                                                                                                                                                                                      |
   | [보안 및 분석][72] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [팀 추가][73] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

7. **Active**를 선택해 후크가 트리거될 때 이벤트 상세 내용을 받으세요.
8. **Add webhook**을 클릭해 웹훅을 저장하세요.

#### Datadog에 웹훅 추가

1. [GitHub 통합 타이틀][5]에서 **Webhooks** 탭으로 이동하세요.
2. 각 리포지토리에 모니터링하고 싶은 리포지토리와 브랜치를 지정하세요. 사용자나 조직에 있는 모든 리포지토리를 추가하려면 와일드카드(`*`)를 사용하세요. 브랜치 이름에 와일드카드를 사용하면 됩니다. 예를 들어 `dev-*`를 사용하면 `dev-`로 시작하는 모든 브랜치를 포함합니다.

   `DataDog/documentation` GitHub 리포지토리의 `master` 브랜치와 관련한 이벤트 전체를 모으려면 **Repository** 필드에 `DataDog/documentation`을 입력하고 **Branches** 필드에 `master`를 입력하세요.

   Datadog 조직의 `master` 브랜치 **전체**와 관련한 이벤트 모두를 모으려면 **Repository** 필드에 `DataDog/*`를 입력하고 **Branches** 필드에 `master`를 입력하세요.
   참고: 리포지토리 이름에 와일드카드를 사용할 때 사용자나 조직을 지정해야 합니다. 예를 들어 '*'는 유효한 리포지토리 이름이 될 수 없습니다. 'DataDog/*'가 유효한 리포지토리 이름입니다.

3. 이벤트 알림을 받으려면 **Commits**와 **Issues**에 체크 박스를 클릭하세요.
4. **Update Configuration**을 클릭해 웹훅 구성을 저장하세요.

통합 타이틀의 **Webhooks** 탭에 웹훅을 추가하면 위에서 지정한 GitHub 리포지토리의 이벤트가 [Events Explorer][74]에 나타나기 시작합니다. 더 자세한 정보는 [Events Explorer 설명서][75]를 참고하세요.

GitHub에서 오는 이벤트를 필터링하려면 **Core** 아래 **Source** 패싯 메뉴에서 **Github**을 선택하거나 검색 쿼리에 `source:github`를 입력하세요. 검색 쿼리를 편집하면 이벤트 막대 차트가 자동으로 업데이트됩니다.

### 서비스 점검

GitHub 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][76]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/guide/source-code-integration/
[2]: https://docs.datadoghq.com/ko/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
[3]: https://docs.datadoghq.com/ko/continuous_integration/guides/pull_request_comments/
[4]: https://docs.datadoghq.com/ko/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
[5]: https://app.datadoghq.com/integrations/github/
[6]: https://docs.datadoghq.com/ko/api/latest/ip-ranges/
[7]: https://app.datadoghq.com/notebook
[8]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[9]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads
[12]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#create
[13]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
[14]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
[15]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#issue_comment
[16]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issue_comment
[17]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issue_comment
[18]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
[19]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#issues
[20]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#issues
[21]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issues
[22]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#issues
[23]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issues
[24]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#issues
[25]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#issues
[26]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#issues
[27]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#issues
[28]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=pinned#issues
[29]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#issues
[30]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#issues
[31]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#issues
[32]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#issues
[33]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#issues
[34]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unpinned#issues
[35]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment
[36]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#pull_request_review_comment
[37]: hhttps://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#pull_request_review_comment
[38]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request_review_comment
[39]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
[40]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request
[41]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#pull_request
[42]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#pull_request
[43]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#pull_request
[44]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request
[45]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request
[46]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#pull_request
[47]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#pull_request
[48]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=synchronize#pull_request
[49]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=converted_to_draft#pull_request
[50]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#pull_request
[51]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#pull_request
[52]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=enqueued#pull_request
[53]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=dequeued#pull_request
[54]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#pull_request
[55]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#pull_request
[56]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=ready_for_review#pull_request
[57]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_requested#pull_request
[58]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_request_removed#pull_request
[59]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_enabled#pull_request
[60]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_disabled#pull_request
[61]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push
[62]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository
[63]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=archived#repository
[64]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#repository
[65]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#repository
[66]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#repository
[67]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=privatized#repository
[68]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=publicized#repository
[69]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=renamed#repository
[70]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#repository
[71]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unarchived#repository
[72]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#security_and_analysis
[73]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#team_add
[74]: https://app.datadoghq.com/event/explorer/
[75]: https://docs.datadoghq.com/ko/events/explorer/
[76]: https://docs.datadoghq.com/ko/help/
