---
aliases:
- /ko/dashboards/reporting/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: 블로그
  text: 모든 이와 안전하게 Datadog 대시보드 공유하기
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: 학습 센터
  text: 더 나은 대시보드 빌드
is_public: true
kind: 설명서
title: 리포트 스케줄링
---

## 개요

대시보드 리포트 스케줄링은 선택된 수취인에게 일정에 따라 시각화된 대시보드 개요를 자동으로 전송합니다. 생성된 리포트는 대시보드의 위젯 이미지를 선형 HTML 형식으로 표시합니다.

{{< img src="dashboards/scheduled_reports/report_example.png" alt="날짜, 설명, 대시보드 링크, Datadog 조직 이름 및 대시보드 위젯의 이미지 3개를 표시하는 Checkout KPI Report라는 제목의 예시 리포트" style="width:70%;" >}}

## 리포트 스케줄링

그리드 기반 또는 자동 레이아웃이 있는 대시보드에서 새 리포트를 생성합니다. 대시보드의 톱니바퀴 아이콘을 클릭하고 **Schedule a Report**을 선택합니다.

지원되는 위젯 유형은 다음과 같습니다.

- [Change][1]
- [Distribution][2]
- [Geomap][3]
- [Group][4]
- [Heat Map][5]
- [Monitor Summary][6]
- [Notes and Links][7]
- [Query Value][8]
- [Scatter Plot][9]
- [SLO Summary][10]
- [SLO List][11]
- [Table][12]
- [Timeseries][13]
- [Top List][14]

### 스케줄 설정

열리는 설정 모들에서 리포트 스케줄을 설정하여 리포트 전송 시점과 빈도를 결정합니다. 결과 리포트에 표시되는 시간 범위를 결정하는 시간 프레임을 설정합니다. 리포트 기간은 대시보드에 표시된 기간과 다를 수 있습니다.

### 수취인 추가

이메일 주소를 입력하여 리포트에 수취인을 추가합니다. Datadog 계정에 연결된 이메일이 자동으로 수취인으로 추가됩니다. 이메일 위로 마우스를 가져간 후 옆에 표시되는 **X**를 클릭하면 수취인으로 표시된 자신을 삭제할 수 있습니다.

**참고:** Enterprise 및 Pro 계정은 조직 외부의 수취인에게 리포트를 전송할 수 있습니다.

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="스케줄을 설정하고, 수취인을 추가하고, 이메일을 커스텀하는 섹션이 있는 개별 대시보드 리포트의 구성 모들입니다. 모들 하단에는 템플릿 변수 편집, 리포트 삭제, 미리보기 보내기, 취소 및 저장 버튼이 있습니다." style="width:100%;" >}}

### 리포트 커스텀

마지막으로 리포트를 커스텀하여 수취인에게 더 많은 컨텍스트 또는 맞춤형 보기를 제공합니다. 대시보드에 더 많은 컨텍스트를 제공하기 위해 부수적인 설명이 각 리포트의 상단에 나타납니다.

리포트를 전송할 때 적용된 필터를 수정하려면 **Edit Template Variables**를 클릭합니다. 이들 값은 기초 대시보드의 기본값에 영향을 주지 않습니다.

스케줄을 저장하기 전에 리포트를 보려면 **Send Preview**를 클릭합니다. 리포트 스케줄은 언제든지 일시 정지할 수 있습니다.

## 리포트 관리하기
단일 대시보드에는, 예를 들어 동일한 대시보드에 관심이 있는 다양한 이해관계자 그룹을 지원하는 등의 목적을 위해 각자 다른 리포트 스케줄링 설정이 여럿 있을 수 있습니다. 기존 대시보드에서 리포트를 보려면 대시보드 톱니바퀴 메뉴를 열고 **Configure Reports**를 선택합니다.

{{< img src="dashboards/scheduled_reports/dashboard_cog_menu.png" alt="대시보드의 톱니바퀴 아이콘 위로 마우스를 가져갈 때 표시되는 메뉴 보기. 여기서 리포트 설정 옵션이 표시됨" style="width:50%;" >}}

열리는 설정 모들에서 기존 리포트를 일시 정지하거나 새 리포트를 생성할 수 있습니다. 기존 보고서의 상세 정보를 보고 수정하거나 리포트를 삭제하려면 **Edit**를 클릭하세요.

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="리포트 스케줄링의 설정 모들로, 2개의 리포트가 표시됩니다. 각각은 그 타이틀, 태그, 수취인, 빈도, 리포트 켜기/끄기 전환 옵션 및 리포트 편집 버튼을 표시합니다. 하단에는 새 리포트를 추가하는 버튼과 완료 버튼이 있습니다." style="width:100%;" >}}

## 권한 허용

**Dashboard Report Write** 권한이 있는 사용자만 리포트를 생성할 수 있습니다. 관리자의 경우 이 권한은 기본적으로 켜져 있고, 다른 모든 역할에서는 꺼져 있습니다.

리포트에서 생성된 이미지는 상세 읽기 제한에 관계없이 모든 데이터를 표시합니다. Datadog은 데이터의 상세 읽기 제한이 없는 사용자에게만 리포트 권한을 국한할 것을 권장합니다. 사용자에게 **Dashboard Report Write** 권한을 부여하려면 **Dashboard Report Write** 권한이 켜져 있는 새 역할을 생성한  뒤 사용자를 이 역할에 할당하세요. 또는 이 사용자에게 **Admin** 역할을 할당하세요. 역할 및 권한 관리에 대한 자세한 내용은 [User Management][13]를 참조하세요.

{{< img src="dashboards/scheduled_reports/dashboard_permissions.png" alt="조직 설정 페이지 내에서 개별 사용자의 권한에 대한 스크린샷입니다. 대시보드 리포트 쓰기 권한이 대시보드 섹션 아래에 강조 표시됩니다" style="width:100%;" >}}

관리자 역할 또는 **Org Management** 권한이 있는 사용자는 **Organization Settings**의 [Public Sharing][16]에 있는 **Settings** 탭에서 계정에 대한 리포트 스케줄링 기능을 활성화하거나 비활성화할 수 있습니다.

{{< img src="dashboards/scheduled_reports/report_management.png" alt="리포트 관리 설정은 해당 설정이 활성화된 Datadog의 조직 설정 내 공개 공유의 설정 탭 아래에 있습니다" style="width:100%;" >}}



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/change/
[2]: /ko/dashboards/widgets/distribution/
[3]: /ko/dashboards/widgets/geomap/
[4]: /ko/dashboards/widgets/group/
[5]: /ko/dashboards/widgets/heat_map/
[6]: /ko/dashboards/widgets/monitor_summary/
[7]: /ko/dashboards/widgets/note/
[8]: /ko/dashboards/widgets/query_value/
[9]: /ko/dashboards/widgets/scatter_plot/
[10]: /ko/dashboards/widgets/slo/
[11]: /ko/dashboards/widgets/slo_list/
[12]: /ko/dashboards/widgets/table/
[13]: /ko/dashboards/widgets/timeseries/
[14]: /ko/dashboards/widgets/top_list/
[15]: /ko/account_management/users/#edit-a-users-roles
[16]: /ko/account_management/org_settings/#public-sharing