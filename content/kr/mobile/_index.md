---
further_reading:
- link: /monitors/
  tag: 설명서
  text: 경고
- link: /dashboards/
  tag: 설명서
  text: 대시보드
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: 블로그
  text: Datadog 모바일 대시보드 위젯으로 온콜 경험 개선
kind: 설명서
title: Datadog 모바일 앱
---

Datadog Mobile 앱을 사용하면 모바일 기기에서 Datadog 경고를 확인 가능합니다. Slack, 이메일, Pagerduty 또는 기타 페이저 앱으로 경고를 수신하고, 모바일 기기에서 모니터 그래프와 대시보드를 열어 문제를 자세히 살펴볼 수 있습니다.

## 설치

iOS 기기의 [Apple App Store][1], 또는 Android 기기의 [Google Play 스토어][2]에서 앱을 다운로드하세요.

{{< img src="mobile/mobile_app_qr_code.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Datadog 모바일 앱 다운로드">}}

### 로그인

미국과 유럽(EU) 지역에서 표준 인증, Google 인증 또는 [SAML][3]으로 로그인할 수 있습니다.

#### SAML 활성화

SAML 로그인 시 Datadog를 사용해 SAML 제공자를 설정하고 인증해야 합니다. IdP에서 시작하는 SAML 로그인의 경우, 본 섹션의 마지막 부분을 참조해주세요. SAML을 인증하려면:

1. “Using Single Sign-On (SAML)?” 버튼을 누르세요.
2. 업무용 회사 이메일을 입력하고 이메일을 보냅니다.
3. 모바일 기기에서 이메일을 열고 안내된 링크를 클릭하세요.
4. 조직의 SAML 자격증명을 입력하세요. 확인 후 Datadog 모바일 앱의 인증된 세션으로 재연결됩니다.

선택 사항으로, 아래의 설명에 따라 QR 코드나 직접 입력으로 인증할 수도 있습니다.

##### QR 코드

1. 브라우저의 [Datadog 계정 프로필 페이지][4]에 로그인하고, 로그인하고자 하는 조직의 **Link mobile device** 버튼을 누르세요. QR 코드가 표시됩니다.
    {{< img src="mobile/link-device.png" alt="모바일 기기 연결" style="width:80%;">}}
2. 휴대폰 기본 카메라 앱을 사용해 QR 코드를 스캔한 다음, 연결되는 링크를 누르면 Datadog 앱이 실행됩니다. 조직 UDID가 자동으로 로그인 화면에 입력됩니다.

##### 직접 입력

1. SAML ID를 수동으로 직접 입력하려면 Datadog 모바일 앱을 열고 “Using Single Sign-On (SAML)?” 버튼을 누르세요.
2. “Use another method to login” 버튼을 누르고 직접 SAML ID를 입력합니다.

로그인 시 **Authorize**를 클릭하면 사용 중인 모바일 기기를 계정에 연동시킬 수 있습니다. 보안을 위해 1개월에 한 번씩 이 절차를 진행하셔야 합니다.

##### IdP에서 시작하는 SAML 로그인

SAML 로그인 시도 중에 계속 오류가 발생하는 경우, 신원인증 제공자가 IdP에서 시작하는 로그인을 사용하도록 설정해두었을 가능성이 있습니다. IdP에서 시작하는 SAML을 자세히 알아보려면 IdP 시작 SAML 페이지[IdP 시작 SAML 페이지][5]를 참조하세요.

## 모니터링

{{< img src="mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모니터링 페이지">}}

Monitors(모니터링) 페이지에서는 소속 Datadog 조직 내에서 액세스 가능한 모니터링 정보 모두를 조회하고 검색할 수 있습니다. 태그 지정 전략을 기준으로 항목 이름이나 빌드 고유의 검색 쿼리를 지정하기도 가능합니다. 검색과 관련해 자세한 정보를 알아보려면 [모니터링 검색 관리 섹션][6]을 참조하세요.

예를 들어, 경고를 받은 SRE 팀과 관련하여 메트릭 모니터링을 필터링하려면  `"status:Alert type:Metric team:sre"` 쿼리를 사용하세요. 개별 경고를 클릭하면 상세 정보를 확인할 수 있으며, 이 정보는 유형과 경고 시간을 기준으로 필터링이 가능합니다. 또, 경고를 음소거할 수도 있습니다. 빠르게 이전 쿼리에 액세스할 수 있도록 최근 검색 10개가 저장됩니다. 검색 바를 활성화하면 저장된 뷰가 표시되는데, 이를 활용해 모니터링 목록을 필터링할 수 있습니다. 마지막으로, Synthetic 모니터를 표시할 때 Synthetic 테스트를 표시하고 실행해보세요.

**참조:** 모니터링, 알림, 저장된 뷰를 설정하거나 수정하려면 [Datadog 웹 앱][7]을 이용해야 합니다. 웹 앱에서 설정된 모든 모니터링은 모바일 앱에서 볼 수 있습니다. 자세한 정보는 [모니터링 생성][8]을 참조하세요.

## 대시보드

{{< img src="mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="대시보드 페이지">}}

Dashboards(대시보드) 페이지에서는 소속 Datadog 조직 내에서 액세스 가능한 대시보드 모두를 조회하고 검색할 수 있습니다. Datadog 웹 앱에서 설정한 템플릿 변수를 동일하게 적용해 필터링할 수도 있습니다. 템플릿 변수를 저장한 뷰를 활용하여 대시보드를 빠르게 필터링하기도 가능합니다. 템플릿 변수를 저장한 뷰에 대해 자세히 알아보려면 [대시보드 저장된 뷰][9]를 참조하세요. 개별 대시보드를 클릭하면 대시보드가 표시됩니다.

**참조:** 대시보드를 설정하거나 수정하려면 [Datadog 브라우저 앱][10]에 로그인해야 합니다. 자세한 정보는 [대시보드][11]에서 확인해주세요.

## 인시던트

{{< img src="mobile/incidents.png" alt="인시던트 페이지" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Incidents(인시던트) 페이지에서는 Datadog 모바일 앱으로 Datadog 계정에서 액세스 가능한 인시던트 모두를 조회, 검색, 필터링하여 어디서나 빠르게 대응하고 해결할 수 있습니다. 또한 Slack, Zoom 등과의 통합을 통해 인시던트를 선언, 편집하고 팀과 원활하게 통신할 수도 있습니다. 인시던트를 자세히 알아보려면 [Datadog 인시던트 관리 문서]를 참조하세요.

### 인시던트 생성

1. 하단 바에 있는 Incidents 탭을 클릭해 인시던트 목록으로 이동합니다.
2. 상단 오른쪽 구석의 "+" 버튼을 클릭합니다.
3. 인시던트의 제목, 중요도, 커맨더를 설정합니다.

### 인시던트 푸시 알림 받기

1. **Account**로 이동합니다.
2. **Notifications**를 클릭합니다.
3. **Enable Notifications** 토글을 선택합니다. (**참조**: Android의 경우, 최신 버전의 Datadog 모바일 앱을 설치할 때 알림이 자동으로 활성화됩니다.)
4. 다음으로 Datadog 웹 앱에서 [Incident Notification Rules][13]로 이동합니다.
5. 알림 규칙을 만들거나 수정하고 **Notify** 아래에 이름을 입력하세요. 이메일로 알림을 받을지, 모바일 기기로 받을지 선택할 수 있는 두 가지 옵션이 표시됩니다.
6. 모바일 기기를 선택하고 **Save**를 클릭하세요.

인시던트 알림 규칙에 대한 자세한 정보는 [인시던트 설정 문서][14]에서 알아볼 수 있습니다.

## 위젯

### Open Incidents 위젯

{{< img src="mobile/incident_widget.png" alt="Datadog 인시던트 모바일 위젯이 Android 및 iOS 기기에 표시되어 있습니다" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

[오픈 인시던트][12]를 모바일 홈 화면에서 Datadog 위젯으로 확인하세요.

문제를 더 자세하게 확인하려면 위젯에 표시된 오픈 인시던트를 누르세요. Datadog 모바일 앱 내에서 상세 정보가 열립니다.

또한, 다음의 필터를 적용해 Open Incidents 위젯을 커스텀 구성할 수 있습니다.

- 조직
- 중요도
- 영향을 받은 고객
- 순서

#### Open Incidents 위젯 만들기

{{< tabs >}}
{{% tab "iOS" %}}

1. 화면 상단 왼쪽의 **+** 버튼을 누르세요.
2. "Datadog" 위젯을 찾으세요.
3. 선호하는 크기(소형, 중형, 대형)를 선택하세요.
4. 화면에서 원하는 위치로 위젯을 드래그하세요.


{{% /tab %}}
{{% tab "Android" %}}

1. 홈 화면을 길게 누르세요.
2. 홈 화면 편집기의 **Widgets** 버튼을 누르세요. 앱 바로가기가 있는 경우, 버블 상단 오른쪽에 아이콘으로만 표시되기도 합니다.
3. 홈 화면에서 원하는 위치로 위젯을 드래그하세요.
4. 취향에 맞추어 위젯 크기를 조정하세요.


{{% /tab %}}
{{< /tabs >}}

#### Open Incidents 위젯 수정하기

{{< tabs >}}
{{% tab "iOS" %}}

1. 설정할 위젯을 길게 누르세요.
2. **Edit Widget**을 누르세요.
2. **Organzation** 라벨 옆에 있는 **Choose**를 눌러 선택한 조직에서 오픈 인시던트를 가져오세요.
3. Severities 라벨 옆의 **SEV-1 and SEV-2**를 눌러 중요도 필터를 지정하세요.
4. **Customer Impacted** 라벨 옆의 **Both**를 눌러 영향을 받은 고객이 있는 오픈 인시던트에 대한 필터를 적용하세요.
5. 추가로 사용할 필터가 있다면 **Type additional filters** 텍스트 상자에 입력해 적용하세요.
6. **Ordering**을 눌러 인시던트 표시 순서를 지정하세요.
7. 위젯 바깥을 눌러 선택 사항을 저장한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. **Organzation**을 눌러 선택한 조직에서 오픈 인시던트를 가져오세요.
3. **Severities**를 눌러 중요도 필터를 지정하세요.
4. **Customer Impacted**를 눌러 영향을 받은 고객이 있는 오픈 인시던트에 대한 필터를 적용하세요.
5. 추가로 사용할 필터가 있다면 **Query**를 눌러 지정하세요.
6. **Sorted by**를 눌러 인시던트 표시 순서를 지정하세요.
7. **Save** 또는 **Apply**을 눌러 선택 사항을 저장하고 설정 화면을 종료하세요.
8. 위젯을 길게 누르고, 선호 사항에 맞추어 크기를 조절하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 Open Incidents 표시하기

여러 조직의 오픈 인시던트를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}
- Organization 라벨 옆에 있는 **Choose**를 눌러 선택한 조직에서 오픈 인시던트를 가져오세요.



{{% /tab %}}
{{% tab "Android" %}}

1. 설정할 위젯 타이틀을 누르세요.
2. 설정 화면에서 **Organization**을 누르세요.
3. 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
4. 취향에 맞추어 위젯 크기를 조정하세요.
5. **Save** 또는 **Apply**를 누르세요. 


{{% /tab %}}
{{< /tabs >}}

#### Open Incidents 위젯 삭제하기

{{< tabs >}}
{{% tab "iOS" %}}

홈 화면 편집 시 위젯 상단 왼쪽의 **-** 버튼을 눌러 위젯을 삭제하세요. 또는, 위젯을 길게 누른 다음 **Remove Widget**을 선택해도 위젯이 삭제됩니다.


{{% /tab %}}
{{% tab "Android" %}}

위젯을 오래 누르고 드래그한 다음 **Remove** 버튼에 드롭해 위젯을 삭제하세요.


{{% /tab %}}
{{< /tabs >}}

### SLO 위젯

{{< img src="mobile/slo_widget.png" alt="Application Uptime SLO 위젯이 Android 및 iOS 기기에 표시되어 있습니다" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

[SLO][15]를 모바일 홈 화면에서 Datadog 위젯으로 확인하세요. 조직의 SLO를 타임프레임과 함께 위젯으로 추가할 수 있습니다.

사용할 수 있는 타임프레임(기간) 옵션은 다음과 같습니다.
- 7일
- 30일
- 90일
- 저번 주
- 저번 달
- 지난 1주일(WTD)
- 지난 1개월(MTD)

또한, SLO 위젯을 선택했을 때 기본으로 열리는 대시보드를 지정하여 메트릭에 대한 자세한 정보를 빠르게 알아볼 수도 있습니다.

**참조**: 기본으로 열리는 대시보드를 지정하지 않는 경우, SLO 위젯을 선택하면 Datadog 앱이 열립니다.

#### SLO 위젯 만들기

{{< tabs >}}
{{% tab "iOS" %}}

- 홈 화면을 길게 누르세요.
- 화면 상단 왼쪽의 “+” 버튼을 누르세요.
- "Datadog" 위젯을 찾으세요.
- 선호하는 사이즈를 선택하세요(소형을 선택하면 하나의 SLO가 표시되고, 중형의 경우는 하나의 SLO가 건전성 타임프레임 시각화 정보와 함께 표시됩니다).
- 화면에서 원하는 위치로 위젯을 드래그하세요.


{{% /tab %}}
{{% tab "Android" %}}

- 홈 화면을 길게 누르세요.
- 홈 화면 편집기의 "Widgets" 버튼을 누르세요. 앱 바로가기가 있는 경우, 버블 상단 오른쪽에 아이콘으로만 표시되기도 합니다.
- 홈 화면에서 원하는 위치로 위젯을 드래그하세요.
- 원하는 크기에 맞추어 위젯 크기를 조절하세요. 항상 하나의 SLO가 표시됩니다. 모바일 홈 화면 너비에 맞게 위젯 크기를 변경하면 선택한 SLO가 건전성 타임프레임과 함께 표시됩니다.


{{% /tab %}}
{{< /tabs >}}

#### SLO 위젯 수정하기

{{< tabs >}}
{{% tab "iOS" %}}

- 설정할 위젯을 길게 누르세요.
- "Edit Widget"을 누르세요.
- SLO 라벨 옆의 "Choose"를 눌러 추적할 SLO를 선택하세요.
- 선택한 SLO에 따라 "Timeframe" 라벨이 표시됩니다. "Timeframe" 라벨 옆의 "Choose"를 눌러 SLO 타임프레임을 선택하세요.
- "Dashboard to open" 라벨 옆의 "Choose"를 눌러 SLO 위젯을 눌렀을 때 열리는 대시보드를 선택하세요.
- 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

- 설정할 위젯 타이틀을 누르세요.
- "Selected SLO"를 눌러 추적할 SLO를 선택하세요.
- "Selected Time Window"를 눌러 SLO 타임프레임을 선택하세요.
- "Dashboard to open"을 눌러 SLO 위젯을 눌렀을 때 열리는 대시보드를 선택하세요.
- **Save** 또는 **Apply**을 눌러 선택 사항을 확정하고 설정 화면을 종료하세요.
- 위젯을 길게 누르고, 취향에 맞추어 크기를 조절하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 SLO 표시하기

여러 조직의 SLO를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

로그인한 모든 조직이 설정 화면에 표시됩니다. 원하는 조직을 찾을 수 없다면 다시 로그인해주세요.


{{% /tab %}}
{{% tab "Android" %}}

- 설정할 위젯 타이틀을 누르세요.
- 설정 화면에서 "Organization"을 누르세요.
- 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
- 취향에 맞추어 위젯 크기를 조정하세요.
- "Save" 또는 "Apply"를 누르세요. 


{{% /tab %}}
{{< /tabs >}}

#### SLO 위젯 삭제하기

{{< tabs >}}
{{% tab "iOS" %}}

홈 화면 편집 시 위젯 상단 왼쪽의 "-" 버튼을 눌러 위젯을 삭제하세요. 또는, 위젯을 길게 누른 다음 "Remove Widget"을 선택해도 위젯이 삭제됩니다.


{{% /tab %}}
{{% tab "Android" %}}

위젯을 오래 누르고 드래그한 다음 "Remove" 버튼에 드롭해 위젯을 삭제하세요.


{{% /tab %}}
{{< /tabs >}}

### Monitors 위젯

{{< img src="mobile/monitor_widget.png" alt="설정이 완료된 모니터 위젯이 Android 및 iOS 화면에 표시되어 있습니다" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

[모니터링][16] 현황을 모바일 홈 화면에서 Datadog 위젯으로 확인하세요. 셀을 선택하면 앱에서 모니터링 정보가 이미 입력된 상태로 **Monitor Search** 화면이 열립니다.

**참조**: 모니터링과 관련해 저장된 뷰가 없는 경우, 위젯에서 기본으로 모든 모니터링을 표시합니다.

#### Monitors 위젯 만들기

{{< tabs >}}
{{% tab "iOS" %}}

- 홈 화면을 길게 누르세요.
- 화면 상단 왼쪽의 “+” 버튼을 누르세요.
- "Datadog" 위젯을 찾으세요.
- 원하는 크기를 선택하세요(소형은 2개의 모니터링 저장 뷰, 중형은 최대 3개의 모니터링 저장 뷰, 대형은 최대 6개의 모니터링 저장 뷰를 표시합니다).
- 화면에서 원하는 위치로 위젯을 드래그하세요.


{{% /tab %}}
{{% tab "Android" %}}

- 홈 화면을 길게 누르세요.
- 홈 화면 편집기의 "Widgets"을 누르세요. 앱 바로가기가 있는 경우, 버블 상단 오른쪽에 아이콘으로만 표시되기도 합니다.
- 홈 화면에서 원하는 위치로 위젯을 드래그하세요.
- 취향에 맞게 위젯 크기를 변경하세요. 저장된 뷰를 더 표시하려면 모바일 홈 화면의 위젯 길이를 늘립니다.


{{% /tab %}}
{{< /tabs >}}

#### Monitors 위젯 수정하기

{{< tabs >}}
{{% tab "iOS" %}}

- 설정할 위젯을 길게 누르세요.
- "Edit Widget"을 누르세요.
- 개별 저장된 뷰 셀을 눌러 선택하거나 선택 해제하세요.
- 각 셀을 드래그 앤 드롭하여 뷰의 순서를 지정하세요.
- 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

- 설정할 위젯 타이틀을 누르세요.
- "Saved Views"를 누르세요.
- 개별 저장된 뷰 셀을 눌러 선택하거나 선택 해제하세요.
- 각 셀을 드래그 앤 드롭하여 뷰의 순서를 지정하세요.
- **Save** 또는 **Apply**을 눌러 선택 사항을 확정하고 설정 화면을 종료하세요.
- 위젯 내부에서 스크롤하면 저장된 뷰를 더 볼 수 있습니다. 위젯을 길게 눌러, 취향에 맞게 크기를 변경하세요.


{{% /tab %}}
{{< /tabs >}}

#### 여러 조직의 Monitors 표시하기

여러 조직의 Monitors를 모바일 홈 화면에 표시할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

로그인한 모든 조직이 설정 화면에 표시됩니다. 소속 조직을 찾을 수 없다면 다시 로그인해주세요.


{{% /tab %}}
{{% tab "Android" %}}

- 설정할 위젯 타이틀을 누르세요.
- 설정 화면에서 "Organization"을 누르세요.
- 새 조직을 선택하세요(로그인해야 하는 경우가 있으니 참조하세요).
- 취향에 맞추어 위젯을 수정하세요.
- "Save" 또는 "Apply"를 누르세요. 


{{% /tab %}}
{{< /tabs >}}

#### Monitors 위젯 삭제하기

{{< tabs >}}
{{% tab "iOS" %}}

홈 화면 편집 시 위젯 상단 왼쪽의 "-" 버튼을 눌러 위젯을 삭제하세요. 또는, 위젯을 길게 누른 다음 "Remove Widget"을 선택해도 위젯이 삭제됩니다.


{{% /tab %}}
{{% tab "Android" %}}

위젯을 오래 누르고 드래그한 다음 "Remove" 버튼에 드롭해 위젯을 삭제하세요.


{{% /tab %}}
{{< /tabs >}}

## 빠른 작업

{{< img src="mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="빠른 작업">}}

앱 아이콘을 길게 누르면 iOS의 경우 [Frequently Viewed By Me][17] 대시보드 상위 5개의(보기 횟수와 최신성으로 측정) 빠른 작업 시트가, Android의 경우 모바일에서 가장 많이 열린 대시보드 5개의 빠른 작업 시트가 표시됩니다. 결과를 눌러 인앱 대시보드를 여세요.

## 홈 화면에서 검색하기

{{< img src="mobile/iphone_search_doc.png" alt="홈 화면 검색" style="width:40%;">}}

**iOS 전용**: iPhone Search에서 필요한 대시보드의 이름을 필터링하여 검색하세요. 결과를 눌러 모바일 앱에서 직접 대시보드 뷰를 열거나, "Search in App" 버튼을 눌러 인앱 Dashboard List 페이지에서 검색 쿼리를 엽니다.

## 바로가기와 Siri 제안

**Android**: Datadog 앱 아이콘을 길게 눌러 대시보드 바로가기 아이콘을 만든 다음 손가락을 떼세요. 앱에 바로가기가 있는 경우 목록이 표시됩니다. 원하는 바로가기를 길게 누르고 화면의 다른 곳으로 드래그 앤 드롭하면 고유한 바로가기 아이콘을 만들 수 있습니다.

**iOS**: 단축어 앱을 사용하여 Datadog 대시보드와 모니터의 Siri 단축어를 만듭니다. 단축어를 만들려면 앱에서 원하는 동작을 1회 이상 실행해야 합니다. 예를 들어, "AWS 개요 대시보드 열기" 단축어를 생성하려면 모바일 앱에서 AWS 개요 대시보드를 최소 한 번은 열어야 합니다.

바로가기/단축어를 활용하면 주요 동작 3가지로 대시보드와 모니터링에 액세스할 수 있습니다.

- 홈 화면에 단축어를 아이콘으로 고정하세요. 이렇게 하면 단축어 앱에 액세스하고 대시보드 단축어의 수정 메뉴가 열립니다.
- Siri Voice: “AWS 개요 열기” 등의 단축어 이름을 말하면 Siri가 인앱 대시보드를 열어줍니다.
- Siri 제안: Siri가 사용 습관을 학습한 다음 가장 필요할 때 홈 화면 또는 잠금 화면 배너, iPhone 검색, 또는 iOS 14 Siri 제안 위젯을 통해 대시보드 단축어를 제안합니다.

{{< img src="mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="바로가기">}}

Siri 바로가기와 제안에 대해 더 자세하게 알아보려면 [Apple Siri 설명서][18]를 참조해주세요.

## Handoff

**iOS 전용**: Apple Handoff를 사용해 여러 Apple 기기에서 계속 작업하세요. Datadog 모바일 앱을 사용 중일 때는 앱의 아이콘이 Mac의 Dock 왼쪽 끝에 표시됩니다. 아이콘을 클릭해 현재 대시보드를 열거나 Mac에서 모니터링할 수 있습니다.

Handoff로 작업하려면 각 기기는 다음의 조건을 충족해야 합니다.

- 동일한 Apple ID로 iCloud에 로그인한 상태여야 합니다
- Bluetooth를 켠 상태여야 합니다
- Wi-Fi를 켠 상태여야 합니다
- Handoff를 켠 상태여야 합니다

Handoff를 자세히 알아보려면 [Apple Handoff 설명서][19]를 참조하세요.

## 계정

조직을 전환하거나 Account 페이지에서 로그아웃하세요.

## 트러블슈팅

트러블슈팅과 관련해 도움이 필요한 경우 [Datadog 고객지원에 문의하세요][20]. 또,  [Datadog 공식 Slack][21] [#mobile-app][22] 채널에 메시지를 보내 도움을 받을 수 있습니다.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /kr/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /kr/account_management/saml/mobile-idp-login/
[6]: /kr/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /kr/monitors/create/#monitor-types
[9]: /kr/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /kr/dashboards/
[12]: /kr/monitors/incident_management
[13]: https://app.datadoghq.com/incidents/settings#Rules
[14]: /kr/monitors/incident_management/incident_settings/#rules
[15]: /kr/dashboards/widgets/slo/#setup
[16]: /kr/logs/explorer/saved_views/
[17]: https://app.datadoghq.com/dashboard/lists/preset/5
[18]: https://support.apple.com/en-us/HT209055
[19]: https://support.apple.com/en-us/HT209455
[20]: /kr/help/
[21]: https://chat.datadoghq.com/
[22]: https://datadoghq.slack.com/archives/C0114D5EHNG