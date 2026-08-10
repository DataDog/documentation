---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /ko/service_management/mobile/
description: iOS 및 Android용 Datadog 모바일 앱을 통해 대시보드, 경보, 인시던트, 온콜 관리 기능을 갖춘 인프라를 이동
  중에도 모니터링하세요.
further_reading:
- link: /mobile/shortcut_configurations/
  tag: 설명서
  text: 단축키 구성
- link: /monitors/
  tag: 설명서
  text: 모니터링 및 Alerting에 대해 알아보기
- link: /dashboards/
  tag: 설명서
  text: 대시보드에 대해 알아보기
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: 블로그
  text: Datadog 모바일 대시보드 위젯으로 온콜 경험 개선
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: 블로그
  text: Datadog 모바일 앱 시작
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: 블로그
  text: Datadog 모바일 앱으로 평균 수리 시간 단축
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: 블로그
  text: 온콜 엔지니어를 위한 공감형 경보음을 설계한 방법
title: Datadog 모바일 앱
---
Datadog 모바일 앱을 사용해 모바일 기기에서 Datadog의 경보를 확인할 수 있습니다. On-Call, Slack 또는 이메일을 통해 경보를 수신할 때 모바일 기기에서 모니터링 그래프와 대시보드를 열어 문제를 조사할 수 있습니다.

## 설치 {#installing}

iOS 기기의 [Apple App Store][1], 또는 Android 기기의 [Google Play 스토어][2]에서 앱을 다운로드하세요.

### 로그인 {#logging-in}

미국과 유럽(EU) 리전에서 표준 인증, Google 인증 또는 [SAML][3]으로 로그인할 수 있습니다.

#### SAML 활성화 {#enabling-saml}

SAML 로그인 시 기본 iOS/Android 브라우저를 사용하여 SAML 공급자를 Datadog에 설정하고 인증해야 합니다. SAML IdP 시작 로그인은 이 섹션의 마지막 부분을 참조하세요. SAML을 인증하려면 다음 단계를 따르세요.

1. 모바일 앱에서 오른쪽 상단 모서리에 있는 데이터 센터 리전(예: US1)을 선택합니다.
2. 로그인 버튼을 누릅니다.
3. 'Using Single Sign-On (SAML)?' 링크를 클릭합니다.
4. 회사 이메일을 입력하고 이메일을 보냅니다.
5. 모바일 기기에서 이메일을 열고 기본 브라우저를 통해 안내된 링크를 클릭합니다.
6. 조직의 SAML 자격 증명을 입력하여 Datadog 모바일 앱의 인증된 세션으로 재연결합니다.

필요 시, 아래의 설명에 따라 QR 코드나 직접 입력으로 인증할 수도 있습니다.

##### QR 코드 {#qr-code}

1. 브라우저에서 [Datadog 계정 개인 설정 조직][4] 페이지로 이동하고 현재 로그인한 조직의 **Log in to Mobile App**을 클릭합니다. QR 코드가 표시됩니다.
2. 휴대폰 기본 카메라 앱을 사용해 QR 코드를 스캔한 다음, 연결되는 링크를 누르면 Datadog 앱이 실행됩니다. 자동으로 로그인됩니다.

**참고**: 현재 로그인하지 않은 조직의 **Log in to Mobile App** 버튼을 클릭하면 조직 UUID가 로그인 화면에 자동으로 삽입됩니다. 표준 방법을 사용하여 인증을 제공해야 합니다.

##### 수동 입력 {#manual-entry}

1. 수동으로 SAML ID를 입력하려면 Datadog 모바일 앱을 열고 'Using Single Sign-On (SAML)?' 버튼을 누릅니다.
2. 'Use another method to login' 버튼을 누르고 SAML ID를 직접 입력합니다.

로그인 시 **Authorize**를 클릭하면 사용 중인 모바일 기기가 계정에 연동됩니다. 보안을 위해 1개월에 한 번씩 이 절차를 진행해야 합니다.

##### IdP 시작 SAML 로그인 {#saml-idp-initiated-login}

SAML 로그인 시도 중에 계속 오류가 발생하는 경우, ID 제공자가 IdP 시작 로그인을 강제할 수 있습니다. IdP 시작 SAML 활성화에 대해 자세히 알아보려면 IdP 시작 SAML 페이지 [IdP 시작 SAML 페이지][5]를 참조하세요.

##### 서브도메인 로그인 {#subdomain-login}

1. 서브도메인을 누르고 사용자 지정 [서브도메인][29]을 입력합니다.
2. 메시지에 따라 로그인 단계를 진행합니다.

### 조직 전환 {#switch-organizations}

조직을 전환하려면 모바일 앱의 **Settings** 페이지로 이동하여 **Organization**을 클릭하세요. 

**참고**: 조직을 전환할 때 재인증이 필요할 수 있습니다.

### 로그아웃 {#log-out}
로그아웃하려면 모바일 앱의 **Settings** 페이지로 이동하여 **Log Out**을 클릭하세요. **Yes**를 클릭해 확인합니다. 

## On-Call {#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="교대 근무, 일정 및 에스컬레이션 옵션을 보여주는 iOS on-call 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="교대 근무, 일정 및 에스컬레이션 옵션을 보여주는 Android on-call 페이지">}}

{{% /tab %}}
{{< /tabs >}}

On-Call 페이지는 온콜 교대 근무, 일정, 페이지 및 에스컬레이션 정책에 대한 포괄적인 뷰를 제공합니다. 사용자, 팀, 긴급성, 상태 또는 날짜별로 정보를 필터링하여 관련 세부정보를 빠르게 찾을 수 있습니다. **Escalate**를 누르면 다음 정책 수준으로의 에스컬레이션을 확인하라는 메시지가 표시됩니다. **Declare Incident**를 누르면 제목을 입력하고 관련 인시던트 특성을 제공하라는 메시지가 표시됩니다.

개인 또는 팀에 페이지를 시작할 수 있으며, 재정의하려는 교대 근무를 눌러 기존 교대 근무를 덮어쓸 수 있습니다. Bits Investigation 모니터링 조사를 통해 초기 발견 및 결론을 확인할 수 있습니다. 자세한 내용은 [Datadog On-Call][20]을 참조하세요.

모바일 기기에서 Datadog On-Call 알림을 구성하려면 [Datadog On-Call 사용을 위한 모바일 기기 설정][21] 가이드를 참조하세요.

<div class="alert alert-info">
모바일에서 On-Call에만 액세스해야 하고 모바일 기기에서 민감한 텔레메트리 데이터에 대한 액세스를 제한하려면 Datadog 지원팀에 문의하세요.
</div>

## Incidents {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/incident_may_2025.png" alt="Datadog On-call 모바일 앱의 Incidents 페이지" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Incident.png" alt="Datadog On-call 모바일 앱의 Incidents 페이지" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Incidents 페이지에서는 Datadog 계정에서 액세스할 수 있는 모든 인시던트를 보고, 검색하고, 필터링하여 어디서나 응답 및 해결을 보장할 수 있습니다. 또한 Slack, Zoom 등과의 통합을 통해 인시던트를 선언 및 편집하고, 팀과 원활하게 소통할 수 있습니다. 인시던트에 대한 자세한 내용은 [Datadog 인시던트 관리][12]를 참조하세요.

### 인시던트 생성 {#create-an-incident}

1. 하단 바에 있는 Incidents 탭을 눌러 인시던트 목록으로 이동합니다.
2. 오른쪽 상단 모서리의 **+** 버튼을 누릅니다.
3. 인시던트의 제목, 심각도 및 커맨더를 지정합니다.

## Notification Center {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_notification_center.png" alt="Datadog 모바일 앱의 ios Notification center" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_notification_center.png" alt="Datadog 모바일 앱의 Android Notification center" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Notification Center는 수신된 모든 푸시 알림을 나열하여 알림의 맥락을 잃지 않도록 합니다. 알림 유형별로 필터링할 수 있습니다.

## Dashboards {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 대시보드 목록을 보여주는 iOS 대시보드 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 대시보드 목록을 보여주는 Android 대시보드 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Dashboards 페이지에서는 Datadog 조직에서 액세스할 수 있는 모든 대시보드를 보고 검색할 수 있으며, Datadog 웹 앱에서 설정한 동일한 템플릿 변수를 사용하여 필터링할 수 있습니다. 템플릿 변수 저장된 뷰를 사용하여 여러 대시보드를 빠르게 필터링합니다. 템플릿 변수 저장된 뷰에 대한 자세한 내용은 [대시보드 저장된 뷰][9]를 참조하세요. 개별 대시보드를 클릭하여 확인합니다. 대시보드 범위를 사용자 정의하려면 오른쪽 하단의 시간 범위를 클릭하세요. 

**참고**: 
- 대시보드를 설정하거나 편집하려면 [Datadog 브라우저 앱에 로그인][10]해야 합니다. 자세한 내용은 [대시보드][11]를 참조하세요.
- UTC로 구성된 대시보드 링크는 모바일 앱에서 UTC로 열립니다. 자세한 내용은 [대시보드 구성][24]을 참조하세요.
- 모든 위젯 유형을 이용할 수 있는 것은 아니므로 모바일 앱에서 데이터가 표시되지 않습니다. 여기에는 토폴로지 맵, 목록 위젯(모든 데이터 소스), 레거시 트리맵 위젯 및 SLO 요약 위젯이 포함됩니다.

## Monitors {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 모니터링 목록을 보여주는 iOS monitors 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 모니터링 목록을 보여주는 Android monitors 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Monitors 페이지에서는 소속 Datadog 조직 내에서 액세스 가능한 모니터링 정보 모두를 조회하고 검색할 수 있습니다. 태그 지정 전략을 기준으로 항목 이름이나 빌드 고유의 검색 쿼리를 지정하는 것도 가능합니다. 검색과 관련해 자세한 정보를 알아보려면 [모니터링 검색 관리 섹션][6]을 참조하세요.

예를 들어, 경보를 수신하는 SRE 팀과 관련된 메트릭 모니터링을 필터링하려면 쿼리 `"status:Alert type:Metric team:sre"`를 사용하세요. 개별 경보를 클릭하면 상세정보를 확인할 수 있으며, 이 정보는 유형과 경고 시간을 기준으로 필터링이 가능합니다. 경보를 음소거할 수도 있습니다. 빠르게 이전 쿼리에 액세스할 수 있도록 최근 검색 10개가 저장됩니다. 검색창을 활성화하여 표시되는 저장된 뷰를 활용해 모니터링 목록을 필터링할 수 있습니다. Synthetic 모니터링을 조회할 때 Synthetic 테스트를 조회하고 실행할 수도 있습니다.

**참고**: 모니터링, 알림 또는 저장된 뷰를 설정하거나 수정하려면 [Datadog 웹 앱][7]을 사용해야 합니다. 웹 앱에서 설정한 모든 모니터링은 모바일 앱에서 볼 수 있습니다. 자세한 내용은 [모니터링 생성][8]을 참조하세요.

## Notebooks {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터핑 옵션과 함께 Notebooks 목록을 보여주는 iOS notebooks 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터핑 옵션과 함께 Notebooks 목록을 보여주는 Android notebooks 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Notebooks 페이지에서는 Datadog 조직에서 접근할 수 있는 모든 노트북을 조회하고 검색할 수 있으며, 태그로 필터링할 수 있습니다. 노트북 태그를 사용하면 즐겨찾기, 팀 및 유형별로 필터링할 수 있습니다. 자세한 내용은 [노트북 태그][19]를 참조하세요.

**참고**: 노트북을 설정하거나 수정하려면 [Datadog 브라우저 앱에 로그인][10]해야 합니다. 자세한 내용은 [Notebooks][18]를 참조하세요.

## Traces {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 트레이스 목록을 보여주는 iOS traces 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 트레이스 목록을 보여주는 Android traces 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Traces 페이지에서는 소속 Datadog 조직 내에서 액세스 가능한 트레이스 정보 모두를 조회하고 검색할 수 있습니다. 저장된 뷰를 통해 목록을 좁히거나 태그 전략에 따라 특정 검색 쿼리를 작성할 수 있습니다. 검색에 대한 자세한 내용은 [Trace Explorer 쿼리 구문][16]을 참조하세요.

예를 들어, 태그 `#env:prod` 또는 태그 `#test`로 트레이스를 필터링하려면 쿼리 `"env:prod" OR test`를 사용합니다. 개별 서비스를 클릭하여 관련 스팬을 확장하고, 스팬을 선택하여 정보, 오류 및 관련 로그를 볼 수 있습니다. 서비스와 로그에서 트레이스를 열 수도 있습니다.

**iOS에서만 사용 가능**: Watchdog Insights는 지연 시간 이상치와 오류 이상치를 지정합니다. 자세한 내용은 [Watchdog Insights][26]를 참조하세요.


## Logs {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 로그 목록을 보여주는 iOS logs 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 로그 목록을 보여주는 Android logs 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Logs 페이지에서는 Datadog 조직에서 액세스할 수 있는 모든 로그 또는 flex 로그를 조회하고 검색할 수 있습니다. 저장된 뷰 또는 쿼리 필터를 통해 목록을 좁힐 수 있습니다. 검색에 대한 자세한 내용은 [로그 검색 구문][23]을 참조하세요.

로그 패턴별로 그룹화하고 다양한 로그 특성을 선택하여 결과를 클러스터링하거나 그룹화할 수도 있습니다. 로그 패턴에 대한 자세한 내용은 [패턴으로 로그 그룹화][22]를 참조하세요.

**참고**: flex 로그를 활성화하려면 로그 목록으로 이동해 오른쪽 상단을 누르고 flex 로그를 활성화하세요.

**iOS에서만 사용 가능**: Watchdog Insights는 로그 이상 및 이상치를 지정합니다. 자세한 내용은 [Watchdog Insights for Logs][25]를 참조하세요.


## Services {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 서비스 목록을 보여주는 iOS services 페이지">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="검색 및 필터 옵션과 함께 서비스 목록을 보여주는 Android services 페이지">}}

{{% /tab %}}
{{< /tabs >}}

Services 페이지에서는 Datadog 모바일 앱을 통해 Datadog 계정에서 액세스할 수 있는 모든 서비스를 조회 및 검색하고 필터링하여 언제 어디서나 서비스의 상태를 확인할 수 있습니다. 해당 서비스와 관련된 최근 배포, 리소스, SLO 및 모니터링도 조회할 수 있습니다. 서비스 조사 도구에 대한 자세한 내용은 [카탈로그 관리][17]를 참조하세요.

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="사용자가 서비스에 대해 질문하는 ios에서의 Bits AI 챗봇 인터페이스">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="사용자가 서비스에 대해 질문하는 Android에서의 Bits AI 챗봇 인터페이스">}}

{{% /tab %}}
{{< /tabs >}}

Bits AI 홈페이지에서 조직의 시스템 상태에 대한 질문을 할 수 있습니다. Bits AI는 로그 및 APM 트레이스에 대한 자연어 쿼리를 지원합니다. 자세한 내용은 [Bits 채팅][27]을 참조하세요.

### Bits Investigation {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="On-Call 페이지에 표시된 Bits Investigation 결과">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="On-Call 페이지에 표시된 Bits Investigation 결과">}}

{{% /tab %}}
{{< /tabs >}}

활성화되면 Bits Investigation이 On-Call 페이지에서 직접 조사를 시작합니다. 이러한 조사는 초기 발견 사항과 결론을 제시하여 응답자가 잠재적인 근본 원인과 다음 단계를 식별하는 데 도움을 줍니다. 자세한 내용은 [Bits Investigation][28]을 참조하세요.

## 자주 묻는 질문 {#frequently-asked-question}
### 모바일 앱에서 계속 로그인 상태를 유지하려면 어떻게 해야 하나요? {#how-do-i-remain-logged-into-the-mobile-app}
모바일 앱에서 성공적으로 인증을 마치면 90일 동안 로그인 상태를 유지합니다.  

**참고**: 알림이 활성화된 경우, 토큰 만료 10일 전에 사전 알림이 전송됩니다.

### 자동으로 로그아웃되는 경우에 여전히 알림을 받을 수 있나요? {#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
90일 토큰 기간 동안 자동으로 로그아웃되더라도 알림을 받을 수 있으며, 다시 로그인하라는 메시지가 표시됩니다.

**참고**: 앱에서 수동으로 로그아웃하면 알림 수신이 중단됩니다.

### 왜 알림을 받지 못하나요? {#why-am-i-not-receiving-notifications}
기기 앱 설정에서 Datadog 앱에 대한 알림이 활성화되어 있는지 확인하세요. 알림이 방해 금지 모드를 우회하도록 하려면, 중요 알림이 켜져 있는지 확인하세요.

### 내가 로그인한 모든 조직에 대해 알림을 받을 수 있나요? {#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
네, 전환하는 조직에 관계없이 로그인한 모든 조직에 대한 알림을 받습니다. 여기에는 중요한 푸시 알림이 포함됩니다. 

### 사용자가 비활성화되면 어떻게 되나요? {#what-happens-if-a-user-is-disabled}
모바일 앱 토큰이 무효화되어 사용자가 로그아웃됩니다.

## 문제 해결 {#troubleshooting}

문제 해결을 위한 도움은 [Datadog 지원팀에 문의하세요][13]. 또한 [Datadog 공개 Slack][14] [#mobile-app][15] 채널에 메시지를 보낼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /ko/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /ko/account_management/saml/mobile-idp-login/
[6]: /ko/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /ko/monitors/types
[9]: /ko/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /ko/dashboards/
[12]: /ko/monitors/incident_management
[13]: /ko/help/
[14]: https://chat.datadoghq.com/
[15]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: /ko/tracing/trace_explorer/query_syntax/
[17]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/set_up/
[18]: https://docs.datadoghq.com/ko/notebooks/
[19]: https://docs.datadoghq.com/ko/notebooks/#notebook-tags
[20]: https://docs.datadoghq.com/ko/incident_response/on-call/
[21]: /ko/incident_response/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[22]: https://docs.datadoghq.com/ko/logs/explorer/analytics/patterns/
[23]: https://docs.datadoghq.com/ko/logs/explorer/search_syntax/
[24]: /ko/dashboards/configure/#configuration-actions
[25]: /ko/logs/explorer/watchdog_insights/
[26]: /ko/watchdog/insights/?tab=logmanagement
[27]: /ko/bits_ai/bits_assistant/
[28]: /ko/bits_ai/bits_ai_sre/
[29]: /ko/account_management/multi_organization/#custom-sub-domains