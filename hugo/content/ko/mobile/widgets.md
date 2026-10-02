---
description: 모바일 홈 화면이나 잠금 화면에 Datadog 위젯을 추가하면 SLO, 인시던트, 대시보드, 모니터, 온콜 정보에 빠르게 액세스할
  수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: 블로그
  text: Datadog 모바일 대시보드 위젯으로 온콜 경험 개선
title: 모바일 기기 위젯
---
Datadog 모바일 앱은 기기의 홈 화면이나 잠금 화면에서 SLO, 인시던트, 대시보드, 온콜, 모니터 위젯을 지원합니다. 

## 홈 화면 위젯 {#home-screen-widgets}
홈 화면에 위젯을 추가하면 Datadog 모바일 앱을 열지 않고도 홈 화면에서 실시간 중요 정보에 빠르게 액세스할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}
1. 홈 화면을 길게 누르세요.
2. {{< ui >}}Edit{{< /ui >}}을 누른 다음, 화면 왼쪽 상단의 {{< ui >}}Add Widget{{< /ui >}} 버튼을 누르세요.
2. "Datadog" 위젯을 찾으세요.
3. 원하는 위젯과 선호하는 크기(소형, 중형, 대형)를 누르세요.
4. {{< ui >}}Add Widget{{< /ui >}}을 누르고 위젯 필드를 구성하세요. 위젯에서 모바일 앱에 액세스할 때 앱에서 쿼리되는 필드입니다.
5. 위젯을 드래그하거나 최소화 또는 확대하여 홈 화면에서 위젯의 위치와 크기를 사용자 지정하세요.

{{% /tab %}}
{{% tab "Android" %}}
1. 홈 화면을 길게 누르세요.
2. 홈 화면 편집기의 {{< ui >}}Widgets{{< /ui >}} 버튼을 누르세요. 앱 바로가기가 있는 경우, 버블 상단 오른쪽에 아이콘으로만 표시되기도 합니다.
3. "Datadog" 위젯을 찾으세요.
4. 원하는 위젯을 누르고 {{< ui >}}Add{{< /ui >}}를 누르세요.
4. 취향에 맞추어 위젯 크기를 재조정하세요.
5. 위젯을 눌러 위젯 필드를 구성하세요. 위젯에서 모바일 앱에 액세스할 때 앱에서 쿼리되는 필드입니다.

{{% /tab %}}
{{< /tabs >}}

**참고**: 위젯은 30분마다 새로 고침됩니다. 위젯 왼쪽 상단의 타임프레임을 눌러 수동으로 새로 고침을 실행하세요.

### 인시던트 위젯 {#incident-widgets}
[미해결 인시던트][1]를 모바일 홈 화면에서 Datadog 위젯으로 확인하세요. 문제를 더 자세하게 확인하려면 위젯에 표시된 인시던트 열기를 누르세요. Datadog 모바일 앱 내에서 상세 정보가 열립니다.

또한, 다음의 필터를 적용해 미해결 인시던트 위젯을 커스텀 구성할 수 있습니다.

- 조직
- 중요도
- 영향을 받은 고객
- 순서

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_incident_widget_may_2025.png" alt="iOS 기기에 표시된 Datadog 인시던트 모바일 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 누르세요.
2. {{< ui >}}Organization{{< /ui >}} 라벨 옆의 {{< ui >}}Choose{{< /ui >}}를 눌러 선택한 조직에서 미해결 인시던트를 가져오세요.
3. 중요도 라벨 옆의 {{< ui >}}SEV-1 and SEV-2{{< /ui >}}를 눌러 중요도 필터를 지정하세요.
4. {{< ui >}}Customer Impacted{{< /ui >}} 라벨 옆의 {{< ui >}}Both{{< /ui >}}를 눌러 영향을 받은 고객이 있는 미해결 인시던트에 대한 필터를 적용하세요.
5. 추가로 사용할 필터가 있다면 {{< ui >}}Type additional filters{{< /ui >}} 텍스트 상자에 입력해 적용하세요.
6. {{< ui >}}Ordering{{< /ui >}}을 눌러 인시던트 표시 순서를 지정하세요.
7. 위젯 바깥을 눌러 선택 사항을 저장한 다음 설정 화면을 종료하세요.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_incidents_widget_may_2025.png" alt="Android 기기에 표시된 Datadog 인시던트 모바일 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯 타이틀을 누르세요.
2. </md_tag{{< ui >}}Organization{{< /ui >}}을 눌러 선택한 조직에서 미해결 인시던트를 가져오세요.
3. {{< ui >}}Severities{{< /ui >}}를 눌러 중요도 필터를 지정하세요.
4. {{< ui >}}Customer impacted{{< /ui >}}를 눌러 영향을 받은 고객이 있는 미해결 인시던트에 대한 필터를 적용하세요.
5. 추가로 사용할 필터가 있다면 {{< ui >}}Query{{< /ui >}}를 눌러 지정하세요.
6. {{< ui >}}Sorted by{{< /ui >}}를 눌러 인시던트 표시 순서를 지정하세요.
7. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 눌러 선택 사항을 저장하고 설정 화면을 종료하세요.
8. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.

{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 미해결 인시던트 표시{#display-open-incidents-from-multiple-organizations}

모바일 홈 화면에서 여러 조직의 미해결 인시던트를 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}
- 조직 라벨 옆의 {{< ui >}}Choose{{< /ui >}}를 눌러 선택한 조직에서 미해결 인시던트를 가져오세요.


{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. 설정 화면에서 {{< ui >}}Organization{{< /ui >}}을 누르세요.
3. 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
4. 취향에 맞추어 위젯 크기를 조정하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 누르세요.


{{% /tab %}}
{{< /tabs >}}

### SLO 위젯 {#slos-widget}

[SLO][2]를 모바일 홈 화면에서 Datadog 위젯으로 확인하세요. 조직의 모든 SLO를 타임프레임과 함께 위젯으로 추가할 수 있습니다.

사용할 수 있는 타임프레임 옵션은 다음과 같습니다.
- 7일
- 30일
- 90일
- 지난주
- 지난달
- 주간 누계(WTD)
- 월간 누계(MTD)

또한, SLO 위젯을 선택했을 때 기본으로 열리는 대시보드를 지정하여 메트릭에 대한 자세한 정보를 빠르게 알아볼 수도 있습니다.

**참고**: 기본으로 열리는 대시보드를 지정하지 않는 경우, SLO 위젯을 선택하면 Datadog 앱이 열립니다.

#### SLO 위젯 편집{#edit-an-slos-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_slo_widget_may_2025.png" alt="iOS 기기에 표시된 애플리케이션 가동 시간 SLO 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 누르세요.
3. SLO 라벨 옆의 {{< ui >}}Choose{{< /ui >}}를 눌러 추적할 SLO를 선택하세요.
4. 선택한 SLO에 따라 {{< ui >}}Timeframe{{< /ui >}} 라벨이 표시될 수 있습니다. {{< ui >}}Timeframe{{< /ui >}} 라벨 옆의 {{< ui >}}Choose{{< /ui >}}를 눌러 추적할 SLO 타임프레임을 선택하세요.
5. {{< ui >}}Dashboard to open{{< /ui >}} 라벨 옆의 {{< ui >}}Choose{{< /ui >}}를 눌러 SLO 위젯을 눌렀을 때 열리는 대시보드를 선택하세요.
6. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_slo_widget_may_2025.png" alt="Android 기기에 표시된 애플리케이션 가동 시간 SLO 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯 타이틀을 누르세요.
2. {{< ui >}}Selected SLO{{< /ui >}}를 눌러 추적할 SLO를 선택하세요.
3. {{< ui >}}Selected Time Window{{< /ui >}}를 눌러 SLO 타임프레임을 선택하세요.
4. {{< ui >}}Dashboard to open{{< /ui >}}을 눌러 SLO 위젯을 눌렀을 때 열리는 대시보드를 선택하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 눌러 선택 사항을 확정하고 설정 화면을 종료하세요.
6. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 SLO 표시하기 {#display-slos-from-multiple-organizations}

여러 조직의 SLO를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

로그인한 모든 조직이 설정 화면에 표시됩니다. 조직을 찾을 수 없다면 다시 로그인합니다.


{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. 설정 화면에서 {{< ui >}}Organization{{< /ui >}}을 누르세요.
3. 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
4. 취향에 맞추어 위젯 크기를 조정하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 누르세요.


{{% /tab %}}
{{< /tabs >}}

### 모니터 위젯{#monitors-widget}

[모니터][3]를 홈 화면에서 Datadog 위젯으로 확인하세요. 셀을 누르면 앱에서 {{< ui >}}Monitor Search{{< /ui >}} 화면이 열리고 모니터 정보가 이미 채워져 있습니다.

**참고**: 모니터와 관련해 저장된 뷰가 없는 경우, 위젯에서 기본으로 모든 모니터를 표시합니다.

#### 모니터 위젯 편집{#edit-a-monitors-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_monitor_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 모니터 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 누르세요.
3. 개별 저장된 뷰 셀을 눌러 선택하거나 선택 해제하세요.
4. 각 셀을 드래그 앤 드롭하여 뷰의 순서를 지정하세요.
5. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_monitor_widget_may_2025.png" alt="Android 화면에 표시된 설정 완료된 모니터 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯 타이틀을 누르세요.
2. {{< ui >}}Saved Views{{< /ui >}}를 누르세요.
3. 개별 저장된 뷰 셀을 눌러 선택하거나 선택 해제하세요.
4. 각 셀을 드래그 앤 드롭하여 뷰의 순서를 지정하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 눌러 선택 사항을 확정하고 설정 화면을 종료하세요.
6. 위젯 내에서 스크롤하여 저장된 뷰를 더 자세히 확인하세요. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 모니터 표시하기 {#display-monitors-from-multiple-organizations}

여러 조직의 모니터를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

로그인한 모든 조직이 설정 화면에 표시됩니다. 조직을 찾을 수 없다면 다시 로그인해야 할 수 있습니다.


{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. 설정 화면에서 {{< ui >}}Organization{{< /ui >}}을 누르세요.
3. 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
4. 취향에 맞추어 위젯을 편집하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 누르세요.

{{% /tab %}}
{{< /tabs >}}

### 대시보드 위젯 {#dashboard-widget}

[대시보드][4]를 홈 화면에서 Datadog 위젯으로 확인하세요. 셀을 누르면 앱에서 {{< ui >}}dashboard search{{< /ui >}} 화면이 열리고 대시보드가 이미 로드되어 있습니다.

#### 대시보드 위젯 편집 {#edit-a-dashboard-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_dashboard_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 대시보드 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 누르세요.
3. 설정 화면에서 {{< ui >}}Dashboard{{< /ui >}}를 누르고 대시보드를 선택하세요.
4. {{< ui >}}Widget{{< /ui >}}을 눌러 선택한 대시보드에서 특정 위젯을 선택하세요.
5. 위젯 쿼리의 {{< ui >}}Period{{< /ui >}}를 선택하세요.
6. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_dashboard_widget_may_2025.png" alt="Android 화면에 표시된 설정 완료된 대시보드 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯 타이틀을 누르세요.
2. {{< ui >}}Saved Views{{< /ui >}}를 누르세요.
3. 개별 저장된 뷰 셀을 눌러 선택하거나 선택 해제하세요.
4. 각 셀을 드래그 앤 드롭하여 뷰의 순서를 지정하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 눌러 선택 사항을 확정하고 설정 화면을 종료하세요.
6. 위젯 내에서 스크롤하여 저장된 뷰를 더 자세히 확인하세요. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 대시보드 표시하기 {#display-dashboards-from-multiple-organizations}

여러 조직의 대시보드를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

로그인한 모든 조직이 설정 화면에 표시됩니다. 조직을 찾을 수 없다면 다시 로그인합니다.


{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. 설정 화면에서 {{< ui >}}Organization{{< /ui >}}을 누르세요.
3. 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
4. 취향에 맞추어 위젯 크기를 조정하세요.
5. {{< ui >}}Save{{< /ui >}} 또는 {{< ui >}}Apply{{< /ui >}}를 누르세요.
   
{{% /tab %}}
{{< /tabs >}}

### On-Call 위젯 {#on-call-widget}

Datadog 위젯을 사용하여 모바일 홈 화면에서 On-Call 교대 근무와 On-Call 페이지를 확인하세요.

다음 필터를 적용해 On-Call 교대 근무 위젯을 사용자 지정할 수 있습니다.

- 조직
- 기간

다음 필터를 적용해 On-Call 페이지 위젯을 사용자 지정할 수 있습니다.

- 조직
- 팀
- 순서

**참고**: On-Call 페이지 위젯에 추가 필터를 적용할 수 있습니다.

#### On-Call 교대 근무 위젯 편집 {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 홈 화면 온콜 교대 근무 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 눌러 설정 화면을 불러오세요.
3. On-Call 교대 근무를 조회하려는 {{< ui >}}Organization{{< /ui >}} 및 {{< ui >}}Period{{< /ui >}}를 선택하세요.
4. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Android 화면에 표시된 설정 완료된 홈 화면 On-Call 교대 근무 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 누르세요.
2. On-Call 교대 근무를 조회하려는 {{< ui >}}Organization{{< /ui >}} 및 {{< ui >}}Time Period{{< /ui >}}를 선택하세요.
3. {{< ui >}}✓{{< /ui >}}를 눌러 설정을 저장하세요.
4. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.

{{% /tab %}}
{{< /tabs >}}

#### On-Call 페이지 위젯 편집 {#edit-an-on-call-pages-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_pages_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 홈 화면 On-Call 페이지 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 눌러 설정 화면을 불러오세요.
3. On-Call 페이지를 조회하려는 {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}}, {{< ui >}}Order{{< /ui >}}를 선택하세요.
4. 추가 필터를 입력하고 {{< ui >}}Done{{< /ui >}}을 누르세요.
5. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_pages_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 홈 화면 온콜 페이지 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 누르세요.
2. On-Call 페이지를 조회하려는 {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}}, {{< ui >}}Sort by{{< /ui >}}를 선택하세요.
3. 를 눌러 {{< ui >}}Additional Filter{{< /ui >}}를 입력하고 {{< ui >}}Save{{< /ui >}}를 누르세요.
4. 설정이 완료되면 {{< ui >}}✓{{< /ui >}}를 누르세요.
5. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.

{{% /tab %}}
{{< /tabs >}}


## 잠금 화면 위젯 {#lock-screen-widgets}
{{< img src="mobile/widgets/lockscreen_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 잠금 화면 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

iOS에서는 On-Call, 모니터, SLO, 인시던트, 대시보드용 잠금 화면 위젯을 지원합니다.

1. 잠금 화면을 길게 누르세요.
2. {{< ui >}}Customize{{< /ui >}}를 누른 다음 {{< ui >}}Lock Screen{{< /ui >}}을 누르세요.
3. 잠금 화면 위젯 공간을 눌러 {{< ui >}}Add Widgets{{< /ui >}} 카드를 불러오세요.
4. 스크롤하여 {{< ui >}}Datadog{{< /ui >}} 앱을 누르세요.
4. 추가할 잠금 화면 위젯을 누르세요.
5. 잠금 화면에서 위젯을 눌러 설정 패널을 불러오세요.
6. 선택한 위젯에 지정된 필드를 기준으로 위젯을 설정하세요.
7. 위젯을 드래그하거나 최소화 또는 확대하여 잠금 화면에서 위젯의 위치와 크기를 사용자 지정하세요.

**참고**: 새 위젯을 추가하려면 잠금 화면에 빈 공간이 있어야 합니다. 삭제하려는 위젯 왼쪽 상단의 {{< ui >}}\-{{< /ui >}} 버튼을 눌러 잠금 화면 위젯을 삭제할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/incident_management
[2]: /ko/dashboards/widgets/slo/#setup
[3]: /ko/monitors/
[4]: /ko/dashboards/
[5]: /ko/incident_response/on-call/