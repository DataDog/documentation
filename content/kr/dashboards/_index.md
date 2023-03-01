---
aliases:
- /kr/guides/templating/
- /kr/graphing/dashboards/
- /kr/guides/graphing
- /kr/graphing/miscellaneous/metrics_arithmetic
- /kr/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /kr/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /kr/graphing/
- /kr/dashboards/dashboards/
- /kr/dashboards/screenboards/
- /kr/dashboards/timeboards/
description: 데이터를 시각화하여 인사이트 확보
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: 릴리스 노트
  text: 최신 Datadog 대시보드 릴리스를 확인하세요(앱 로그인 필요)!
- link: /dashboards/template_variables/
  tag: 설명서
  text: 템플릿 변수가 있는 대시보드 향상
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
- link: /dashboards/sharing/
  tag: 설명서
  text: Datadog 외부에서 그래프 공유
- link: /dashboards/widgets/
  tag: 설명서
  text: 모든 사용 가능한 대시보드용 위젯을 찾아보세요.
- link: /mobile/#dashboards
  tag: 설명서
  text: 모바일 앱에서 대시보드 보기
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: 클립보드에 대시보드 위젯 추가
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: 블로그
  text: 새로운 Datadog 대시보드 경험
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 개발자 문서
  text: 탁월한 통합 대시보드 만들기
kind: 설명서
title: 대시보드
---

## 개요

대시보드는 주요 성능 지표를 시각적으로 추적, 분석 및 표시하는 Datadog의 도구로, 이를 통해 인프라스트럭처의 상태를 모니터링할 수 있습니다.

**참고**: [Apple App Store][2] 및 [Google Play Store][3]에서 사용할 수 있는 [Datadog 모바일 앱][1]을 통해 대시보드를 확인하세요.

## 새 대시보드

대시보드를 생성하려면 [Dashboard List][1] 페이지에서 **+New Dashboard**를 클릭하거나 내비게이션 메뉴에서 **New Dashboard**를 클릭하세요. 대시보드 이름을 입력하고 레이아웃 옵션을 선택합니다.

{{< img src="dashboards/create-dashboard.png" alt="새 대시보드 추가" style="width:70%;">}}

### 대시보드
대시보드는 이미지, 그래프 및 로그와 같은 다양한 오브젝트를 포함할 수 있는 그리드 기반 레이아웃에 있습니다. 이들은 실시간으로 업데이트되고 과거의 고정 포인트를 나타낼 수 있는 상태 게시판 또는 스토리텔링 뷰로 일반적으로 사용됩니다. 또한 디버깅에서도 효과적으로 작동합니다.

### 타임보드
타임보드에는 자동 레이아웃이 있으며, 전체 대시보드에서 (고정 또는 실시간) 단일 포인트를 나타냅니다. 일반적으로 트러블슈팅, 상관관계 및 일반 데이터 탐색에 사용됩니다.

### 스크린보드
스크린보드는 이미지, 그래프 및 로그와 같은 다양한 오브젝트를 포함할 수 있는 자유 형식 레이아웃의 대시보드입니다. 일반적으로 실시간으로 업데이트되거나 과거의 고정 포인트를 나타내는 상태 게시판 또는 스토리텔링 뷰로 사용됩니다.

## 대시보드 설정

### 그래프 메뉴

대시보드 그래프를 클릭하여 옵션 메뉴를 엽니다.

| 옵션                 | 설명                                                   |
|------------------------|---------------------------------------------------------------|
| 스냅샷 전송          | 그래프의 스냅샷을 생성하고 전송합니다.                     |
| 상관 관계에 있는 메트릭 찾기| APM 서비스, 통합 및 대시보드에서 상관관계를 찾습니다. |
| 전체 화면으로 보기    | [전체화면 모드][4]에서 그래프를 봅니다.                     |
| 커서 잠금            | 페이지에서 커서를 제자리에 잠금 처리합니다.                         |
| 관련 프로세스 보기 | 그래프로 범위가 지정된 [Live Processes][5] 페이지로 이동합니다.   |
| 관련 호스트 보기     | 그래프로 범위가 지정된 [Host Map][6] 페이지로 이동합니다.         |
| 관련 로그 보기      | 그래프로 범위가 지정된 [Log Explorer][7] 페이지로 이동합니다.     |
| 관련 트레이스 보기    | 그래프로 범위가 지정된 [Traces][8] 패널을 이동시킵니다.           |
| 관련 프로필 보기  | 그래프로 범위가 지정된 [Profiling][9] 페이지로 이동합니다.        |

### 글로벌 시간 선택기

글로벌 시간 선택기를 사용하려면 하나 이상의 시간 기반 위젯이 `Global Time`을(를) 사용하도록 설정해야 합니다. **Set display preferences**에 있는 위젯 편집기에서 선택하거나, 위젯을 추가하세요(글로벌 시간이 기본 시간 설정임).

글로벌 시간 선택기는 동일한 대시보드에서 `Global Time` 옵션을 사용하여 모든 위젯에 대해 동일한 시간 프레임을 설정합니다. 과거의 무빙 윈도우(`Past 1 Hour`, `Past 1 Day` 등)를 선택하거나, `Select from calendar...` 옵션을 통해 고정 기간을 선택하거나 [커스텀 타임프레임 입력][10] 기능을 통해 시간 프레임을 선택합니다. 무빙 윈도우를 선택하면 위젯이 업데이트되어 지정된 기간을 따라 이동합니다.

글로벌 시간에 연결되지 않은 위젯은 글로벌 윈도우에 적용된 현지 시간 프레임의 데이터를 표시합니다. 예를 들어, 글로벌 시간 선택기가 2019년 1월 1일부터 2019년 1월 2일로 설정된 경우 `Past 1 Minute`에 대한 현지 시간 프레임으로 설정된 위젯은 오후 11시 59분부터 2019년 1월 2일 마지막 분까지를 표시합니다.

#### 새로고침 빈도

프라이빗 대시보드의 새로고침 빈도는 사용자가 보고 있는 시간 프레임에 따라 다릅니다. 시간 프레임이 짧을수록 데이터가 더 잦은 빈도로 새로고침됩니다. 공개적으로 공유된 대시보드는 선택된 시간 프레임에 관계없이 30초마다 새로고침됩니다.

| 시간 프레임   | 새로고침 빈도 |
|--------------|--------------|
| 1분     | 10초   |
| 2분    | 10초   |
| 5분    | 10초   |
| 10분   | 10초   |
| 30분   | 20초   |
| 1시간       | 20초   |
| 3시간      | 1분     |
| 4시간      | 1분     |
| 1일        | 3분     |
| 2일       | 10분    |
| 1주       | 1시간       |
| 1개월      | 1시간       |
| 3개월     | 1시간       |
| 6개월     | 1시간       |
| 1년       | 1시간       |

### TV 모드

대시보드는 대형 화면이나 TV에 주요 성능 메트릭을 표시하는 데 유용합니다. TV 모드를 활성화하려면 키보드 단축키 `F`을(를) 사용하거나, 대시보드에서 TV 아이콘을 클릭하세요.

### 설정

#### 퍼블릭 URL 생성

퍼블릭 URL을 생성하여 외부 사용자와 대시보드를 공유합니다. 자세한 내용은 [대시보드 공유][11]를 참조하세요.

#### UTC 시간 표시

UTC 시간과 기본 시간대 사이를 전환합니다.

#### 알림

대시보드에 대한 알림이 활성화되면 [Event Explorer][12]에 이벤트가 생성됩니다. 이 이벤트는 작업을 수행하는 사용자의 이름과 함께 텍스트 변경, 위젯 변경, 대시보드 복제 및 대시보드 삭제에 대한 정보를 제공합니다.

또한 알림을 활성화한 개별 사용자는 이메일 알림을 받습니다. 관리 권한 유무에 관계없이 조직의 모든 사용자는 가입 후 대시보드에 대한 변경 알림을 받을 수 있습니다.

알림이 활성화된 대시보드의 변경 이벤트는 이벤트 익스플로러에서 다음을 검색하여 볼 수 있습니다.

```text
tags:audit,dash
```

특정 대시보드로 검색 범위를 제한하려면 검색 시 대시보드 이름을 포함하세요.

#### 권한 허용

대시보드 상단에서 설정을 클릭하고 *Permissions*을 선택합니다.

{{< img src="dashboards/dashboard-menu-permissions.png" alt="대시보드 설정 메뉴" style="width:50%;">}}

팝업을 사용하여 사용자, 사용자의 역할이 있는 조직의 모든 사람 또는 조직의 특정 역할에 대한 액세스를 제한합니다.

{{< img src="dashboards/dashboard-role-restrictions.png" alt="설정에서의 역할 제한" style="width:70%;">}}

생성자는 항상 대시보드를 편집할 수 있지만, 대시보드 편집이 허용된 다른 사용자는 최종 액세스 제어 목록(ACL)에 자신의 역할 중 하나가 포함되어 있을 때에만 ACL에서 역할을 추가하거나 제거할 수 있습니다. 역할에 대한 자세한 내용은 [RBAC 가이드][13]를 참조하세요.

지원 중단된 "읽기 전용" 설정으로 대시보드를 만든 경우 액세스 제어 목록은 액세스 관리(`user_access_manage`) 권한이 있는 역할 목록으로 미리 채워집니다.

Terraform으로 대시보드를 관리하는 경우 최신 버전의 Datadog Terraform 제공업체를 사용하여 대시보드 편집이 가능한 역할을 제어할 수 있습니다. 자세한 내용은 Terraform 대시보드 역할 제한 가이드][14]를 참조하세요.

#### 고밀도 모드

고밀도 모드는 대시보드에 그룹 위젯을 나란히 표시하여 위젯 밀도를 높입니다. 그룹 위젯을 사용하는 대시보드의 대형 화면에서는 이 모드가 기본적으로 켜집니다.

{{< img src="dashboards/high-density-mode.png" alt="고밀도 모드 표시" style="width:90%;">}}
#### 대시보드 복제

이 옵션을 사용하면 전체 대시보드를 새 대시보드에 복사할 수 있습니다. 복제 대상의 이름을 지정하라는 메시지가 표시됩니다.

#### 대시보드 JSON 복사, 가져오기 또는 내보내기

개별 대시보드에서 다음 옵션이 있는 설정 톱니바퀴(오른쪽 상단)를 사용하여 대시보드의 JSON을 복사, 가져오기 또는 내보내기합니다.

| 옵션                          | 설명                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | 대시보드의 JSON을 클립보드에 복사합니다.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | JSON을 대시보드에 붙여넣거나 가져옵니다. 이 옵션은 대시보드의 모든 콘텐츠를 덮어씁니다. JSON이 이미 클립보드에 있는 경우 `Ctrl V`(Mac의 경우 `Cmd V`)을(를) 사용합니다. |
| Export&nbsp;dashboard&nbsp;JSON | 대시보드의 JSON이 포함된 JSON 파일을 다운로드합니다.                                                                                                                |

#### 대시보드 삭제

대시보드를 영구적으로 삭제하려면 이 옵션을 사용하세요. 삭제를 확인하라는 메시지가 표시됩니다.

## 추천 대시보드 및 활성 사용자

개별 대시보드에서 Datadog은 관련 대시보드의 보기를 추천합니다. 추천 대시보드 및 활성 사용자를 보려면 대시보드 타이틀 옆에 있는 캐럿 아이콘을 클릭하세요. 이들 대시보드의 추천은 조직의 사용자 활동 및 사용자가 이 대시보드에서 다른 기존 대시보드로 이동하는 빈도를 감안하여 이루어집니다. '`edit`을(를) 클릭하여 이 보기에서 Markdown 지원 대시보드 설명을 추가하거나 업데이트할 수도 있습니다.

{{< img src="dashboards/suggested_dashboards.png" alt="추천 대시보드" >}}

## 대시보드 목록

[Dashboard List][15] 페이지에서 대시보드 및 목록을 검색, 확인 또는 생성합니다.

### 새 목록

대시보드 목록을 생성하려면 오른쪽 상단의 **New List +** 버튼을 클릭합니다.

목록 타이틀은 사용자의 이름으로 자동 설정됩니다. 예를 들어, John Doe가 대시보드를 생성하는 경우 기본 타이틀은 `John's list`입니다. 목록 타이틀을 변경하려면 텍스트의 타이틀을 클릭하여 편집 가능한 상태로 만드세요.

목록에 대시보드를 추가하려면 기본 대시보드 목록에서 해당 확인란을 선택합니다. 그런 다음 대시보드 목록의 오른쪽 상단 모서리에 있는 Add to List* 버튼을 클릭합니다.

{{< img src="dashboards/dash_to_list.png" alt="목록에 대시보드 추가" style="width:100%;">}}

### 목록

왼쪽 사이드바에는 즐겨찾기, 프리셋, 공유 및 편집 가능한 목록이 표시됩니다. **Hide Controls** 링크를 사용하여 이 사이드바를 숨길 수 있습니다.

#### 즐겨찾기 목록

즐겨찾기 목록은 현재 로그인한 사용자가 별표 표시한 대시보드 목록입니다. **참고**: 별표 표시된 목록이 없으면 *Favorite Lists* 카테고리가 숨겨집니다.

#### 프리셋 목록

프리셋 목록은 Datadog의 기본 대시보드 목록입니다.

| 목록                     | 설명                                                               |
|--------------------------|---------------------------------------------------------------------------|
| 모든 커스텀               | 조직 계정의 팀원이 만든 커스텀 대시보드입니다. |
| 모든 호스트                | 호스트를 추가할 때 Datadog에서 생성한 자동 대시보드입니다.              |
| 모든 통합         | 통합을 설치할 때 Datadog에서 생성한 자동 대시보드입니다.  |
| 모두 공유됨               | 인증되었거나 공개 링크 공유가 활성화된 대시보드입니다.             |
| 직접 생성함           | 현재 사용자가 생성한 커스텀 대시보드입니다.                            |
| 자주 보는 대상 | 현재 사용자가 자주 보는 모든 대시보드입니다.                     |
| 최근 삭제됨         | 지난 30일 이내에 삭제된 대시보드입니다.                               |

#### 삭제된 대시보드 복원

프리셋한 **Recently Deleted** 목록을 사용하여 삭제된 대시보드를 복원합니다. 목록에서 복원할 모든 대시보드를 선택하고 **Restore to**를 클릭합니다. 대시보드를 복원할 특정 목록을 선택하거나, **All Custom**을 선택하여 커스텀 목록 없이 복원합니다. **Recently Deleted**의 대시보드는 30일 후에 영구적으로 삭제됩니다.

{{< img src="dashboards/recently_deleted.png" alt="삭제된 대시보드 복원" style="width:100%;">}}

#### 편집 가능한 공유된 목록

이 섹션에는 각 목록의 대시보드 수와 함께 편집 가능한 공유된 대시보드 목록이 표시됩니다.

### 모든 대시보드

나열된 모든 대시보드는 *Star*, *Name*, *Modified* 및 *Popularity* 등 열 머리글을 사용하여 정렬할 수 있습니다. 설명이 있는 모든 열은 다음과 같습니다.

| 열     | 설명                                                                              |
|------------|------------------------------------------------------------------------------------------|
| 별       | 현재 사용자가 별표 표시한 모든 대시보드입니다.                                              |
| 아이콘       | 대시보드 유형(타임보드 또는 스크린보드)을 나타내는 아이콘입니다.                     |
| 이름       | 커스텀 또는 프리셋 대시보드의 이름입니다.                                              |
| 수정됨   | 커스텀 대시보드의 마지막 수정 날짜입니다.                                            |
| 인기 | 조직에서의 상대적인 대시보드 [인기도](#popularity)입니다.           |
| 생성자    | 대시보드 생성자의 프로필 아이콘입니다. 프리셋 대시보드는 통합 로고를 사용합니다. |

#### 인기

조직에서 가장 인기 있는 대시보드에는 5개의 인기 막대가 표시됩니다. 이 대시보드의 인기는 다른 모든 대시보드의 인기와 상대적인 비율로 설정됩니다. 인기는 대시보드가 수신하는 트래픽 양을 기반으로 합니다. 인기는 매일 업데이트됩니다. 새 대시보드에는 최대 24시간 동안 인기 막대가 부여되지 않습니다.

**참고**: 퍼블릭 대시보드 URL의 트래픽은 인기를 위해 무시됩니다.

## 모바일 장치에서 대시보드 보기

[Apple App Store][2] 및 [Google Play Store][3]에서 제공되는 [Datadog 모바일 앱][1]을 사용하면 대시보드를 모바일 친화적인 형식으로 볼 수 있습니다.

대시보드 페이지에서 모든 대시보드를 보고 검색할 수 있으며 Datadog 웹 앱에서 설정한 것과 동일한 템플릿 변수를 사용하여 대시보드를 필터링할 수 있습니다. 템플릿 변수가 저장된 보기를 사용하여 대시보드를 빠르게 필터링하세요. 템플릿 변수가 저장된 보기에 대한 자세한 내용은 [Dashboard 저장된 보기][16]를 참조하세요. 개별 대시보드를 클릭하면 볼 수 있습니다.

**참고**: 대시보드를 설정하거나 편집하려면 Datadog 브라우저 UI에 로그인해야 합니다.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS와 Android의 대시보드">}}

## 모바일 홈 화면 대시보드 만들기

[Apple App Store][2] 및 [Google Play Store][3]에서 사용할 수 있는 [Datadog 모바일 앱][1]에도 모바일 홈 화면 위젯이 적용되어 있습니다. 이러한 위젯을 사용하면 모바일 앱을 열지 않고도 서비스 상태와 인프라스트럭처를 모니터링할 수 있습니다.

SLOs, Monitors 및 Open Incidents 위젯을 다른 개발 및 협업 도구와 함께 모바일 홈 화면에 추가하여 분류 및 인시던트 관리 워크플로우를 최적화할 수 있습니다.

{{< img src="dashboards/dashboards-widget-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS 및 Android의 위젯">}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: /kr/dashboards/widgets/#full-screen
[5]: https://app.datadoghq.com/process
[6]: https://app.datadoghq.com/infrastructure/map
[7]: https://app.datadoghq.com/logs
[8]: /kr/tracing/
[9]: /kr/profiler/
[10]: /kr/dashboards/guide/custom_time_frames/
[11]: /kr/dashboards/sharing/#dashboards
[12]: /kr/events/
[13]: /kr/account_management/rbac/
[14]: /kr/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[15]: https://app.datadoghq.com/dashboard/lists
[16]: /kr/dashboards/template_variables/#saved-views
