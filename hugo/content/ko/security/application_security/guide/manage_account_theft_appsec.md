---
disable_toc: false
title: AAP를 통한 계정 도용 관리
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

사용자는 민감한 정보에 접근하고 민감한 작업을 수행할 수 있는 권한을 가진 시스템 내 신뢰할 수 있는 주체입니다. 악의적인 행위자들은 사용자를 웹사이트를 공격하고 귀중한 데이터와 리소스를 훔칠 기회로 파악했습니다.

Datadog App and API Protection(AAP)은 이 위협을 관리하는 데 도움이 되는 [기본 제공][1] 탐지 및 보호 기능을 제공합니다. 

이 가이드는 AAP를 사용하여 계정 도용(ATO) 캠페인에 대비하고 대응하는 방법을 설명합니다. 이 가이드는 세 단계로 나뉩니다:

1. [로그인 정보 수집](#phase-1-collecting-login-information):
   - 자동 또는 수동 계측 방법을 사용하여 Datadog AAP에서 로그인 활동 수집을 활성화하고 확인하세요.
   - 서비스 코드를 수정할 수 없는 경우 Remote Configuration 옵션을 사용하세요.
   - 누락되었거나 잘못된 데이터의 문제를 해결하세요.
2. [계정 도용 캠페인 대비](#phase-2-preparing-for-ato-campaigns):
   - AAP가 탐지한 ATO 캠페인에 대비하세요. 
   - 공격 알림에 대한 알림을 구성하세요.
   - 정확한 공격자 식별을 위해 올바른 데이터 전파를 검증하세요.
   - 즉각적인 완화를 위해 자동 IP 차단을 설정하세요.
   - 동적 공격자 IP로 인한 일시적 차단의 중요성에 대해 알아보세요.
3. [계정 도용 캠페인에 대응](#phase-3-reacting-to-ato-campaigns):
   - 공격자 전략, 분류, 대응, 조사, 모니터링 및 정리를 포함하여 ATO 캠페인에 대응하는 방법을 알아보세요.

## 단계 1: 로그인 정보 수집 {#phase-1-collecting-login-information}

악의적인 패턴을 탐지하기 위해 AAP는 사용자의 로그인 활동에 대한 가시성을 필요로 합니다. 이 단계에서는 이 가시성을 활성화하고 검증하는 방법을 설명합니다. 

### 1.1단계: ID 서비스에서 AAP가 활성화되어 있는지 확인 {#step-11-ensure-aap-is-enabled-on-your-identity-service}

이 단계에서는 AAP를 사용하도록 서비스를 설정하는 방법을 설명합니다.

<div class="alert alert-info">서비스에서 이미 AAP를 사용 중이라면 <a href="#step-1.3:-validating-login-information-is-automatically-collected">1.3단계: 로그인 정보가 자동으로 수집되는지 검증</a>으로 이동할 수 있습니다.</div>

1. [{{< ui >}}Catalog{{< /ui >}}][2]로 이동하여 {{< ui >}}Security{{< /ui >}} 렌즈를 클릭하고 로그인 서비스 이름을 검색하세요. 

   {{<img src="security/ato/guide_service_catalog.png" alt="인증을 관리하는 서비스가 포함된 카탈로그" style="width:100%;" >}}

2. 서비스를 클릭하여 세부 정보를 여세요. {{< ui >}}Threat management{{< /ui >}} 알약 모양 아이콘이 녹색이면 AAP가 활성화된 것이며 [1.3단계: 로그인 정보가 자동으로 수집되는지 검증](#step-1.3:-validating-login-information-is-automatically-collected)으로 이동할 수 있습니다.
   
   {{<img src="security/ato/guide_service_catalog_enabled.png" alt="서비스 사이드 패널이 확장되어 Threat Management가 활성화된 상태로 표시되는 카탈로그" style="width:100%;" >}}

   AAP가 활성화되어 있지 않으면 패널에 {{< ui >}}Discover AAP{{< /ui >}} 버튼이 표시됩니다.

   {{<img src="security/ato/guide_service_catalog_disabled.png" alt="서비스 사이드 패널이 확장되어 Threat Management가 활성화되어 있지 않고, 자세히 알아보기 링크가 표시된 카탈로그" style="width:100%;" >}}

   AAP를 설정하려면 [1.2 단계: 로그인 서비스에서 AAP 활성화](#step-12-enabling-aap-on-your-login-service)로 이동하세요.

### 1.2단계: 로그인 서비스에서 AAP 활성화 {#step-12-enabling-aap-on-your-login-service}

로그인 서비스에서 AAP를 활성화하려면 다음 요구 사항을 충족하는지 확인하세요.

* Datadog APM과 마찬가지로 AAP는 서비스 내 라이브러리 통합과 실행 중인 Datadog Agent가 필요합니다.  
* AAP는 일반적으로 최신 라이브러리를 사용하는 것이 좋지만, 최소 지원 버전은 [호환성 요구 사항][3]에 문서화되어 있습니다.   
* 최소한 {{< ui >}}Threat Detection{{< /ui >}}은 활성화되어 있어야 합니다. 이상적으로는 {{< ui >}}Automatic user activity event tracking{{< /ui >}}도 활성화되어 있어야 합니다.

새 배포를 사용하여 AAP를 활성화하려면 `APPSEC_ENABLED` 환경 변수/라이브러리 구성 또는 [Remote Configuration][11]을 사용하세요. 두 방법 모두 사용할 수 있지만, Remote Configuration은 Datadog UI를 사용하여 설정할 수 있습니다.

**Remote Configuration을 사용하여 AAP를 활성화하고** 서비스를 재시작하지 않으려면 다음을 수행하세요.

1. [AAP onboarding][5]로 이동합니다.  
2.  {{< ui >}}Enable App & API Protection{{< /ui >}}를 클릭합니다.   
3. {{< ui >}}Activate on your APM services{{< /ui >}}에서 {{< ui >}}Select Services{{< /ui >}}을 클릭합니다.
4. 서비스를 선택한 다음 {{< ui >}}Next{{< /ui >}}를 클릭하고 설정 지침을 진행합니다.

[AAP Traces][6]에서 서비스의 추적이 보이면 [1.3단계: 로그인 정보가 자동으로 수집되는지 검증](#step-1.3:-validating-login-information-is-automatically-collected)로 이동합니다.

새 배포 사용에 대한 자세한 지침은 [Datadog SDK를 활용한 AAP 위협 탐지 활성화][7]를 참조하세요.

### 1.3단계: 로그인 정보가 자동으로 수집되는지 검증 {#step-13-validating-login-information-is-automatically-collected}

AAP를 활성화한 후 Datadog에서 로그인 정보가 수집되는지 확인할 수 있습니다.

**참고:** 서비스에서 AAP를 활성화한 후, 사용자가 서비스에 로그인할 때까지 몇 분 정도 기다리거나 직접 서비스에 로그인하세요.

로그인 정보가 수집되는지 확인하려면 다음을 수행합니다.

1. AAP의 [트레이스][8]로 이동합니다.   
2. 로그인 서비스의 로그인 활동으로 태그가 지정된 트레이스를 찾습니다. 예를 들어 {{< ui >}}Search for{{< /ui >}}에는 `@appsec.security_activity:business_logic.users.login.*`이 있을 수 있습니다.  
3. 모든 로그인 서비스가 로그인 활동을 보고하고 있는지 검사합니다. {{< ui >}}Service{{< /ui >}} 패싯에서 이를 확인할 수 있습니다.

{{<img src="security/ato/guide_trace_explorer.png" alt="로그인 실패 및 성공의 정상 상태와 몇 차례의 스파이크를 보여주는 AAP 트레이스 탐색기" style="width:100%;" >}}

**서비스에서 로그인 활동이 보이지 않으면**, [1.5단계: 서비스 수동 계측](#step-15-manually-instrumenting-your-services)로 이동합니다.

### 1.4단계: 로그인 메타데이터가 자동으로 수집되는지 검증 {#step-14-validating-login-metadata-is-automatically-collected}

로그인 메타데이터가 수집되는지 확인하려면 다음을 수행합니다.

1. AAP의 [트레이스][8]로 이동합니다.   
2. 로그인 서비스에서 성공 및 실패한 로그인 활동으로 태그가 지정된 트레이스를 찾으세요. {{< ui >}}Search for{{< /ui >}}에서 검색 쿼리를 업데이트하여 `business_logic.users.login.success` 또는 `business_logic.users.login.failure`를 필터링할 수 있습니다. 
3. 트레이스를 여세요.  
4. {{< ui >}}Security{{< /ui >}} 탭에서 {{< ui >}}Business Logic Event{{< /ui >}}를 검토하세요.
5. 이벤트가 가짜 사용자에 대한 것인지 검사하세요.

{{<img src="security/ato/guide_trace_login_fail.png" alt="로그인 실패 이벤트와 전체 메타데이터를 보여주는 AAP 로그인 트레이스" style="width:100%;" >}}

로그인 성공 및 로그인 실패 트레이스를 몇 개 검토하세요. 로그인 실패의 경우, `usr.exists`가 `true`(기존 사용자의 로그인 시도 실패) 및 `false`인 트레이스를 찾으세요.

사용자 존재 여부와 관계없이 확인을 수행해야 합니다.

**가짜** 사용자(`usr.exists:false`)이벤트의 경우 다음 문제를 확인하세요.

- 단일 이벤트: 트레이스에 성공과 실패를 포함한 여러 로그인 이벤트가 포함된 경우, 이는 잘못된 자동 계측으로 인해 발생할 수 있습니다. 자동 계측을 변경하려면 [1.5단계: 서비스 수동 계측](#step-15-manually-instrumenting-your-services)으로 이동하세요.  
- 이벤트에 필수 메타데이터가 포함되어 있습니까? 로그인 성공 케이스는 사용자 속성 섹션으로 나타날 수 있습니다. 필수 메타데이터는 로그인 실패 케이스의 경우 `usr.login` 및 `usr.exists`이며, 로그인 성공 케이스의 경우 `usr.login` 및 `usr.id`입니다. 일부 메타데이터가 누락된 경우 [1.5단계: 서비스 수동 계측](#step-15-manually-instrumenting-your-services)으로 이동하세요.

**계측이 올바르면 [2단계: 계정 탈취 캠페인 준비](#phase-2-preparing-for-ato-campaigns)로 이동하세요.**

### 1.5단계: 서비스 수동 계측 {#step-15-manually-instrumenting-your-services}

AAP는 Datadog 라이브러리에 포함된 SDK를 사용하여 로그인 정보와 메타데이터를 수집합니다. 사용자 로그인이 성공하거나 실패할 때 SDK를 호출하고 SDK에 로그인 메타데이터를 제공하여 계측을 수행합니다. SDK는 로그인과 메타데이터를 트레이스에 첨부하여 Datadog으로 전송하고, Datadog은 이를 보관합니다.

<div class="alert alert-info">서비스 코드를 수정하는 대신 <a href="#step-16-remote-instrumentation-of-your-services">1.6단계: 서비스 원격 계측</a>을 참조하세요.</div>

서비스를 수동으로 계측하려면 다음을 수행하세요.

1. 자동 계측이 잘못된 데이터(단일 트레이스 내의 여러 이벤트)를 제공하는 경우 [자동 계측 비활성화][9]를 참조하세요.
2. 각 언어에 대한 자세한 계측 지침은 [트레이스에 비즈니스 로직 정보(로그인 성공, 로그인 실패, 기타 비즈니스 로직) 추가][10]를 참조하세요. 다음 메타데이터를 추가하세요.
   * `usr.login`: **로그인 성공 및 실패 시 필수 사항**. 이 필드에는 계정에 로그인하는 데 사용된 *이름*이 포함됩니다. 이름은 이메일 주소, 전화번호, 사용자 이름 또는 기타 정보일 수 있습니다. 이 필드의 목적은 사용자가 해당 계정을 변경할 수 있으므로 시스템에 존재하지 않는 경우에도 대상 계정을 식별하는 것입니다. 또한 이 필드는 공격자가 사용하는 데이터베이스의 위치에 대한 정보를 제공합니다. 이 값은 `usr.id`와 혼동해서는 안 됩니다.
   * `usr.exists`: **로그인 실패 시 필수 사항**. 이 필드는 일부 기본 탐지에 필요합니다. 이 필드는 시스템에 존재하지 않는 계정을 대상으로 하는 시도의 우선순위를 낮추는 데 도움이 됩니다.  

**코드를 배포한 후** [1.4단계: 로그인 메타데이터가 자동으로 수집되는지 확인](#step-1.4:-validating-login-metadata-is-automatically-collected)의 단계를 따라 계측이 올바른지 확인하세요.

### 1.6단계: 서비스 원격 계측 {#step-16-remote-instrumentation-of-your-services}

AAP는 사용자 지정 인앱 WAF 규칙을 사용하여 로그인 시도를 표시하고 탐지 규칙에 필요한 요청에서 메타데이터를 추출할 수 있습니다.

이 접근 방식을 사용하려면 [Remote Configuration][11]이 활성화되어 작동 중이어야 합니다. [Remote Configuration][12]에서 이 서비스에 대해 Remote Configuration이 실행 중인지 확인하세요.

사용자 지정 인앱 WAF 규칙을 사용하려면 다음을 수행하세요.

1. [인앱 WAF 사용자 지정 규칙 생성 양식][24]을 엽니다.   
2. 규칙의 이름을 지정하고 {{< ui >}}Business Logic{{< /ui >}} 범주를 선택하세요.   
3. 규칙 유형을 로그인 실패의 경우 `users.login.failure`로, 로그인 성공의 경우 `users.login.success`로 설정하세요.
   {{<img src="security/ato/guide_waf_instrumentation.png" alt="새 로그인 계측 규칙이 추가된 사용자 지정 WAF 규칙 생성 양식" style="width:100%;" >}}
4. 서비스를 선택하고 로그인 시도와 일치하는 규칙을 작성하세요. 일반적으로 메서드(`POST`), 정규식을 사용한 URI(`^/login`), 상태 코드(실패 시 403, 성공 시 302 또는 200)를 일치시킵니다.  
5. 탐지 규칙에 필요한 태그를 수집하세요. 가장 중요한 태그는 `usr.login`입니다. 요청에 로그인이 제공되었다고 가정하면, 조건을 추가하고 `store value as tag`를 연산자로 설정할 수 있습니다.
   {{<img src="security/ato/guide_waf_instrumentation_operator.png" alt="사용자 지정 WAF 규칙 생성 양식의 연산자 드롭다운, 태그로 저장된 값이 강조 표시됨" style="width:30%;" >}}

6. 본문 또는 쿼리에서 입력으로 사용할 특정 사용자 매개변수를 선택하세요.   
7.  `Tag` 필드를, `usr.login`을 사용하여 캡처한 값을 저장할 태그의 이름으로 설정하세요.
   {{<img src="security/ato/guide_waf_instrumentation_tagged.png" alt="사용자 지정 WAF 규칙 생성 양식, login이라는 매개변수를 선택하고 usr.login이라는 태그에 저장하는 조건이 완료" style="width:100%;" >}}

8.  {{< ui >}}Save{{< /ui >}}를 클릭합니다. 규칙은 서비스의 모든 인스턴스로 자동 전송되며 이후 로그인 실패 캡처를 시작합니다. 

**계측이 올바른지 확인하려면** [1.4단계: 로그인 메타데이터가 자동으로 수집되는지 확인](#step-1.4:-validating-login-metadata-is-automatically-collected)을 참조하세요.

자세한 내용은 [코드를 수정하지 않고 비즈니스 로직 정보 추적][13]을 참조하세요.

## 2단계: ATO 캠페인 준비 {#phase-2-preparing-for-ato-campaigns}

서비스에 대한 계측을 설정한 후, AAP는 공격 캠페인을 모니터링합니다. [공격 개요][14] {{< ui >}}Business logic{{< /ui >}} 섹션에서 트래픽을 검토할 수 있습니다. 

{{<img src="security/ato/guide_overview_card.png" alt="로그인 활동 및 ATO 관련 신호 개요" style="width:100%;" >}}

AAP는 [다양한 공격자 전략][15]을 탐지합니다. 높은 수준의 신뢰도로 공격을 탐지하면 [기본 제공 탐지 규칙][16]이 신호를 생성합니다. 

신호의 심각도는 위협의 긴급성에 따라 설정됩니다. 성공하지 못한 공격 케이스의 경우 {{< ui >}}Low{{< /ui >}}에서 성공적인 계정 침해 케이스의 경우 {{< ui >}}Critical{{< /ui >}}까지 설정됩니다.

다음 섹션에서 다루는 작업은 탐지를 더 빠르게 식별하고 활용하는 데 도움이 됩니다.

### 2.1단계: Notifications 구성 {#step-21-configuring-notifications}

[Notifications][17]은 신호가 트리거될 때 선호하는 채널로 경고를 제공합니다. Notification 규칙을 생성하려면 다음을 수행하세요.

1. [새로운 규칙 생성][18]을 엽니다.  
2. 규칙의 이름을 입력합니다.
3. {{< ui >}}Signal{{< /ui >}}을 선택하고 {{< ui >}}App & API Protection{{< /ui >}}을 제외한 모든 항목을 제거합니다.
4. 규칙을 `category:account_takeover`로 제한하고, 심각도를 확장하여 `Medium`을 포함합니다.
5. Notification 수신자(Slack, Teams, PagerDuty)를 추가합니다.
   자세한 내용은 [Notification 채널][19]을 참조하세요.  
6. 테스트한 후 규칙을 저장하세요.
   {{<img src="security/ato/guide_notification_config.png" alt="가장 관련성이 높은 ATO 신호를 알리도록 채워진 Notification 생성 양식" style="width:80%;" >}}
   Notification이 생성될 때 다음에 알림이 전송됩니다.

### 2.2단계: 적절한 데이터 전파 확인 {#step-22-validate-proper-data-propagation}

마이크로서비스 환경에서는 일반적으로 다른 서비스를 실행하는 내부 호스트를 통해 서비스에 도달합니다. 이러한 내부 환경으로 인해 IP, 사용자 에이전트, 핑거프린트 등과 같은 원래 공격자의 요청에 대한 고유한 특성을 식별하기가 어렵습니다.

[AAP 트레이스][20]을 사용하면 로그인 이벤트가 소스 IP, 사용자 에이전트 등으로 올바르게 태그 지정되었는지 확인할 수 있습니다. 확인하려면 [트레이스][21]에서 로그인 추적을 검토하고 다음 사항을 검사하세요.
 
* 소스 IP(`@http.client_ip`)는 다양한 공용 IP입니다.  
  * **문제:** 로그인 시도가 소수의 IP에서만 발생하는 경우, 이는 가용성을 위험에 빠뜨리지 않고는 차단할 수 없는 프록시일 수 있습니다.  
  * **해결 방법:** 초기 요청의 클라이언트 IP를, 예를 들어 `X-Forwarded-For`와 같은 HTTP 헤더를 통해 전달하세요. [더 나은 보안][22]을 위해 사용자 지정 헤더를 사용하고 `DD_TRACE_CLIENT_IP_HEADER` 환경 변수를 사용하여 이를 읽도록 SDK를 구성할 수 있습니다.  
* 사용자 에이전트(`@http.user_agent`)는 예상되는 트래픽(웹 브라우저, 모바일 앱 등)과 일치합니다.  
  * **문제:** 호출하는 마이크로서비스 네트워크 라이브러리의 사용자 에이전트로 대체될 수 있습니다.  
  * **해결 방법:** 후속 서비스를 호출할 때 클라이언트 사용자 에이전트를 사용하세요.
* 여러 헤더가 채워집니다. 트레이스의 {{< ui >}}See more details{{< /ui >}}를 {{< ui >}}Request{{< /ui >}} 블록에서 확인할 수 있습니다.
  * **문제:** 일반 요청 헤더(예: `accept-encoding`)가 계측된 서비스로 전달되지 않습니다. 이로 인해 핑거프린트(`@appsec.fingerprint.*`) 생성이 저해되고 공격자의 활동을 격리하는 신호의 능력이 저하됩니다.
  * **해결 방법:** 후속 마이크로서비스를 호출할 때 해당 헤더를 전달하세요.

### 2.3단계: 자동 차단 구성 {#step-23-configure-automatic-blocking}

<div class="alert alert-info">시작하기 전에: <a href="#step-22-validate-proper-data-propagation">2.2단계: 적절한 데이터 전파 확인</a>에 설명된 대로 IP 주소가 올바르게 구성되었는지 확인하세요.</div>

AAP 자동 차단을 사용하여 언제든지 공격을 차단할 수 있습니다. 자동 차단은 팀원이 온라인 상태가 되기 전에 공격을 차단하여 업무 시간 외에도 보안을 제공할 수 있습니다. ATO 내에서 자동 차단은 실패한 로그인 시도 증가로 인한 부하 문제를 완화하거나 공격자가 손상된 계정을 사용하지 못하도록 방지하는 데 도움이 될 수 있습니다.

공격의 일부로 식별된 IP를 차단하도록 자동 차단을 구성할 수 있습니다. 공격자가 IP를 변경할 수 있으므로 이는 부분적인 수정에 불과하지만, 포괄적인 수정을 구현할 시간을 더 벌어줄 수 있습니다.

자동 차단을 구성하려면 다음을 수행하세요.

1. {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > > [Detection Rules][23]로 이동합니다.  
2. {{< ui >}}Search{{< /ui >}}에서 `tag:"category:account_takeover"`를 입력합니다.   
3. 차단을 설정하려는 규칙을 엽니다. Datadog은 {{< ui >}}High{{< /ui >}} 또는 {{< ui >}}Critical{{< /ui >}} 심각도에 대해 IP 차단을 켜는 것을 권장합니다.  
4. 규칙 내 {{< ui >}}Define Conditions{{< /ui >}}의 {{< ui >}}Security Responses{{< /ui >}}에서 {{< ui >}}IP automated blocking{{< /ui >}}을 활성화합니다. {{< ui >}}User automated blocking{{< /ui >}}을 활성화할 수도 있습니다.  
   조건별로 차단 동작을 제어할 수 있습니다. 각 규칙은 신뢰도 및 공격 성공 여부에 따라 여러 조건을 가질 수 있습니다. 

**Datadog은 IP 주소를 영구적으로 차단하는 것을 권장하지 않습니다**. 공격자가 IP를 재사용할 가능성은 낮으며, 영구 차단은 사용자를 차단하는 결과를 초래할 수 있습니다. 또한, AAP에는 차단할 수 있는 IP 수에 제한(`~10000`)이 있으며, 이로 인해 불필요한 IP로 목록이 채워질 수 있습니다.

{{<img src="security/ato/guide_blocking_config.png" alt="차단을 구성할 수 있는 감지 규칙 페이지의 조건 섹션" style="width:100%;" >}}

## 3단계: ATO 캠페인에 대응 {#phase-3-reacting-to-ato-campaigns}

이 섹션에서는 일반적인 계정 탈취 해커의 행동과 감지 결과를 분류, 조사 및 모니터링하는 방법을 설명합니다.

### 공격자가 캠페인을 실행하는 방법 {#how-attackers-run-their-campaigns}

결국 귀하의 시스템이 공격을 받게 됩니다. 악의적인 로그인 시도 물결은 종종 서비스가 예상하는 정상적인 로그인 활동량을 압도할 수 있습니다. 부하가 증가하여 가용성 문제가 발생할 수 있으며, 공격자가 언제든지 계정에 성공적으로 로그인할 수 있습니다. 

공격자가 취하는 행동은 그들의 전략과 귀하의 시스템 구성에 따라 달라집니다. 일부 공격자는 귀하가 손상된 계정을 동결할 시간을 갖기 전에 즉시 액세스 권한을 악용하여 가치를 추출하기로 결정할 수 있습니다. 다른 공격자는 나중을 위해 계정을 휴면 상태로 유지할 수도 있습니다. 

많은 전략이 존재하지만, 공격의 가치 사슬이 종종 신중하게 분할된다는 점을 이해하는 것이 중요합니다.

1. 공격을 시작하는 행위자는 종종(다른 서비스의 손상을 통해 획득했을 가능성이 높은) 공급업체로부터 자격 증명 데이터베이스를 구매합니다.
2. 행위자는 탐지를 회피하면서 로그인 시도를 자동화하도록 설계된 스크립트(헤더 무작위화, 일반 트래픽과 최대한 유사하게 보이도록 시도)를 조달합니다.
3. 행위자는 봇넷에 대한 액세스 권한을 구매하여 여러 다른 IP를 활용해 공격을 실행합니다. 50만 건 이상의 시도가 포함된 대규모 캠페인이 매우 분산되어 Datadog이 IP당 평균 1.01건의 요청과 계정당 단일 시도를 확인한 극단적인 사례도 있습니다.
4. 유효한 자격 증명이 발견되면, 이를 금융 절도, 스팸, 남용 등과 같은 목적에 활용하기 위해 하위 단계의 다른 행위자에게 판매할 수 있습니다.

공격이 귀하의 시스템을 대상으로 시작되면, 시스템은 공격자의 전략에 따라 {{< ui >}}Credential Stuffing{{< /ui >}}, {{< ui >}}Distributed Credential Stuffing{{< /ui >}} 또는 {{< ui >}}Bruteforce{{< /ui >}}로 표시된 신호를 생성합니다.

### 3.1단계: 분류 {#step-31-triage}

첫 번째 단계는 탐지 결과가 정확한지 확인하는 것입니다. 로그인 엔드포인트에 대한 보안 스캔이나 잦은 토큰 교체와 같은 특정 동작은 탐지에 공격으로 보일 수 있습니다. 분석은 신호에 따라 달라지며, 다음 예시는 귀하의 상황에 맞게 조정해야 할 일반적인 지침을 제공합니다.

{{< tabs >}}
{{% tab "무차별 대입 공격(Bruteforce)" %}}

이 신호는 계정에 대해 여러 가지 다른 비밀번호를 시도하여 사용자 계정을 탈취하려는 시도를 찾습니다. 일반적으로 이러한 캠페인은 소수의 계정을 대상으로 합니다.

{{<img src="security/ato/guide_signal_bruteforce.png" alt="무차별 대입 공격 신호와 손상된 사용자가 표시된 신호 사이드 패널" style="width:100%;" >}}

손상된 것으로 표시된 계정을 검토하세요. 사용자를 클릭하여 최근 활동 요약을 여세요.

{{<img src="security/ato/guide_user_menu.png" alt="사용자 필 위에 마우스를 올렸을 때 표시되는 메뉴입니다. 사용자 사이드 패널을 열 수 있는 버튼이 오른쪽 상단에 강조 표시되어 있습니다." style="width:50%;" >}}

분류를 위한 질문:

* 활동이 급격히 증가했습니까?   
* 해당 IP들이 로그인을 시도하는 것이 처음입니까?   
* 위협 인텔리전스에 의해 플래그 지정되었습니까?

이 질문들에 대한 답변이 '예'라면, 해당 신호는 합법적일 가능성이 높습니다.

계정의 민감도에 따라 대응 방식을 조정할 수 있습니다. 예를 들어, 제한된 액세스 권한을 가진 무료 계정과 관리자 계정의 차이와 같습니다.

{{% /tab %}}

{{% tab "크리덴셜 스터핑" %}}

이 신호는 소수의 IP에서 다수의 계정으로 로그인 실패가 발생하는 경우를 찾습니다. 이는 종종 단순한 공격자에 의해 발생합니다.

{{<img src="security/ato/guide_signal_credential_stuffing.png" alt="손상된 사용자가 포함된 크리덴셜 스터핑 신호를 보여주는 신호 사이드 패널입니다." style="width:100%;" >}}

타겟으로 표시된 계정들의 유사성을 검토하고 해당 사용자들의 민감도를 확인하세요.

{{<img src="security/ato/guide_user_table.png" alt="공격 대상 사용자들을 보여주는 표입니다. 해당 사용자에 대한 더 많은 활동 정보가 포함된 사이드 패널이 있기 때문에 한 명의 사용자가 필 형태로 표시됩니다." style="width:100%;" >}}

모두 동일한 기관에서 오는 등 속성을 공유하는 경우, IP 위에 마우스를 올리고 사이드 패널을 열어 과거 활동을 검토한 후, 해당 IP가 해당 기관의 프록시인지 검사하세요.

{{<img src="security/ato/guide_ip_menu.png" alt="사용자 필 위에 마우스를 올렸을 때 표시되는 메뉴입니다. 사용자 사이드 패널을 열 수 있는 버튼이 오른쪽 상단에 강조 표시되어 있습니다." style="width:100%;" >}}

분류를 위한 질문:

* 활동이 급격히 증가했습니까?   
* 계정들이 서로 관련이 없습니까?   
* IP들이 위협 인텔리전스에 의해 플래그 지정되었습니까?   
* 로그인 성공보다 실패가 훨씬 더 많습니까?

이 질문들에 대한 답변이 '예'라면, 해당 신호는 합법적일 가능성이 높습니다.  
공격 규모와 계정 침해 여부에 따라 대응 방식을 조정할 수 있습니다.

{{% /tab %}}

{{% tab "분산 크리덴셜 스터핑" %}}

이 신호는 서비스의 전체 로그인 실패 횟수가 크게 증가하는지 확인합니다. 이는 봇넷을 활용하는 정교한 공격자로 인해 발생합니다.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="분산 스터핑 신호를 보여주는 신호 사이드 패널" style="width:100%;" >}}

Datadog은 귀하의 서비스 내 로그인 실패 간의 공통 속성을 식별하려고 시도합니다. 이는 악의적인 활동을 격리하는 데 사용할 수 있는 공격자 스크립트의 결함을 표면화할 수 있습니다. 발견되면 {{< ui >}}Attacker Attributes{{< /ui >}}이라는 섹션이 표시됩니다. 존재하는 경우, 클러스터를 선택하고 {{< ui >}}Explore clusters{{< /ui >}}를 클릭하여 정상적인 활동인지 검토하세요.

{{<img src="security/ato/guide_cluster_table.png" alt="공격 중에 감지된 사용자 속성 클러스터를 보여주는 표입니다. 행을 선택하여 해당 속성과 일치하는 활동에 대한 조사를 좁힐 수 있습니다." style="width:100%;" >}}

정확하다면 클러스터의 활동은 로그인 실패 증가와 밀접하게 일치해야 하며, 그 이전에는 낮거나 없어야 합니다.  
사용 가능한 클러스터가 없으면 {{< ui >}}Investigate in full screen{{< /ui >}}을 클릭하고 대상 사용자/IP에서 이상치를 검토하세요. 

목록이 잘린 경우 {{< ui >}}View in AAP Traces Explorer{{< /ui >}}를 클릭하고 트레이스 탐색기로 조사를 실행하세요. 추가 도구는 [3.3단계: 조사](#step-33-investigation)를 참조하세요.

{{% /tab %}}
{{< /tabs >}}


분류 결과 신호가 오탐지인 경우, 오탐지로 표시하고 닫을 수 있습니다. 

오탐지가 서비스의 고유한 설정으로 인해 발생한 경우, 억제 필터를 추가하여 오탐지를 침묵시킬 수 있습니다.

**신호가 정상적인 경우**, [3.2단계: 예비 대응](#step-32-disrupting-the-attacker-as-a-preliminary-response)으로 이동하세요.

### 3.2단계: 예비 대응으로 공격자 방해 {#step-32-disrupting-the-attacker-as-a-preliminary-response}

공격이 진행 중인 경우, 추가 조사와 함께 공격자를 방해하는 것이 좋습니다. 공격자를 방해하면 공격 속도가 느려지고 손상된 계정 수가 줄어듭니다. 

<div class="alert alert-info">이는 일반적인 단계이지만, 다음과 같은 상황에서는 이 단계를 건너뛰고 싶을 수 있습니다.

* 계정의 즉각적인 가치가 거의 없는 경우. 피해를 주지 않고 이러한 손상 후 활동을 차단할 수 있습니다.  
* 공격자에게 조사를 알리고 전술을 변경하게 만드는 모든 조치를 피함으로써 공격에 대한 가시성을 최대한 유지하려는 경우.
</div>

이 예비 대응을 시행하려면 서비스에 [Remote Configuration][11]이 활성화되어 있어야 합니다.

부분적인 대응을 시작하려면 다음을 수행하세요.

{{< tabs >}}
{{% tab "무차별 대입 또는 자격 증명 스터핑" %}}

공격자는 소수의 IP를 사용하고 있을 가능성이 높습니다. 차단하려면 신호를 열고 다음 단계를 사용하세요. 차단 기간을 설정할 수 있습니다. 

{{<img src="security/ato/guide_next_steps.png" alt="메뉴에는 신호 분류부터 IP 또는 손상된 사용자 차단, 자동 차단 활성화를 통한 신호 대응까지 신호에 대한 빠른 대응이 표시됩니다." style="width:50%;" >}}

Datadog은 **12시간**을 권장하는데, 이는 공격이 중단되기에 충분한 시간이며 공격 후 해당 IP가 정상 사용자에게 재할당될 때 정상 사용자가 차단되는 것을 방지합니다. Datadog은 영구적인 차단을 권장하지 않습니다.  
손상된 사용자를 차단할 수도 있지만, 자체 시스템을 사용하여 해당 사용자를 추출하고 자격 증명을 재설정하는 것이 더 나은 접근 방식입니다.

마지막으로, 다음 단계 섹션에서 자동 IP 차단을 활성화하여 조사하는 동안 새로운 IP가 자동으로 차단되도록 할 수 있습니다.

{{% /tab %}}

{{% tab "분산 크리덴셜 스터핑" %}}

이러한 공격은 종종 다수의 일회용 IP를 사용합니다. Datadog의 지연 시간으로 인해 공격자가 IP를 풀에서 삭제하기 전에 IP를 차단하여 로그인 시도를 막는 것은 비실용적입니다.

대신 악의적인 시도에 고유한 요청 특성(사용자 에이전트, 특정 헤더, 지문 등)을 차단하세요.

{{<img src="security/ato/guide_cluster_table.png" alt="공격 중에 감지된 사용자 속성 클러스터를 보여주는 표입니다. 행을 선택하여 해당 속성과 일치하는 활동에 대한 조사를 좁힐 수 있습니다." style="width:100%;" >}}

{{< ui >}}Distributed Credential Stuffing campaign{{< /ui >}} 신호에서 Datadog은 명확한 특성을 자동으로 식별하여 {{< ui >}}Attacker Attributes{{< /ui >}}로 표시합니다. 

차단하기 전에 Datadog은 클러스터의 활동을 검토하여 해당 활동이 실제로 악의적인지 확인할 것을 권장합니다.

확인하려는 질문은 다음과 같습니다.

- 트래픽이 악의적인가요? 이 트래픽이 공격 시작 전에도 존재했나요?  
- 상당한 양의 정상 트래픽이 함께 차단될 수 있습니까?  
- 이 클러스터를 기반으로 한 차단이 효과적일 수 있습니까?

그렇게 하려면 클러스터를 선택하고 {{< ui >}}Explore clusters{{< /ui >}}를 클릭하세요.

{{<img src="security/ato/guide_cluster_table_select.png" alt="공격 중에 감지된 사용자 속성 클러스터를 보여주는 표입니다. 행이 선택되면 'Explore clusters' 버튼에 포커스가 맞춰집니다." style="width:100%;" >}}

{{< ui >}}Investigate{{< /ui >}} 탐색기가 나타나며 클러스터 트래픽 지표를 제공합니다. 공격으로 인한 트래픽의 큰 비중과 위협 인텔리전스에 의해 플래그가 지정된 IP의 높은 비율이 표시됩니다. 

다음은 두 가지 중요한 지표입니다. 

- 위협 인텔리전스 %  
- 트래픽 분포

{{<img src="security/ato/guide_cluster_explorer.png" alt="클러스터 탐색기가 이전에 선택한 클러스터를 보여줍니다." style="width:100%;" >}}

지표를 클릭하여 클러스터 트래픽에 대한 자세한 정보를 확인하세요. 

{{< ui >}}Cluster Activity{{< /ui >}}에는 이 클러스터와 일치하는 전체 APM 트래픽 볼륨에 대한 시각화가 있습니다. AAP 데이터와 비교할 때, APM 데이터는 샘플링될 수 있지만 AAP 데이터는 그렇지 않으므로 척도에 유의하세요.

다음 예시에서는 공격 이전부터 많은 트래픽이 발생하고 있습니다. 이는 정상 트래픽에서 이 클러스터와 일치하는 정상 활동이 존재하며, 조치를 취할 경우 해당 트래픽이 차단됨을 의미합니다. 신호에서 에스컬레이션하거나 {{< ui >}}Block All Attacking IPs{{< /ui >}}를 클릭할 필요는 없습니다.

{{<img src="security/ato/guide_cluster_explorer_fp.png" alt="해당 속성과 일치하는 일정한 트래픽 비율을 보여주는 클러스터 활동은 이 트래픽의 대부분이 합법적이며 해당 클러스터를 차단에 사용할 수 없다는 강력한 힌트입니다." style="width:100%;" >}}

다른 예시에서는 클러스터의 활동이 공격과 함께 시작되었습니다. 이는 부수적인 피해가 없어야 함을 의미하며 차단을 진행할 수 있습니다.

{{<img src="security/ato/guide_cluster_explorer_tp.png" alt="공격 외의 트래픽이 거의 없음을 로그 스케일로 보여주는 그래프" style="width:70%;" >}}

특성이 공격자와 일치하는지 확인한 후, 해당 특성과 일치하는 요청을 차단하도록 인앱 WAF 규칙을 푸시할 수 있습니다. 이는 사용자 에이전트 기반 특성에 대해서만 지원됩니다.

규칙을 생성하려면 다음을 수행합니다.

1.  {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Custom Rules][33]으로 이동합니다.
2. {{< ui >}}Create New Rule{{< /ui >}}을 클릭하고 구성을 완료하세요. 
3.  {{< ui >}}Define your custom rule{{< /ui >}}의 단계를 따르세요.   
4.  {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}에서 로그인 서비스 또는 요청을 차단하려는 서비스를 선택하세요. 로그인 경로로 차단을 지정할 수도 있습니다.
   {{<img src="security/ato/guide_waf_blocking.png" alt="특정 서비스의 특정 경로를 선택하는 WAF 규칙 생성 모달의 스크린샷" style="width:100%;" >}}
5.  {{< ui >}}If incoming requests match these conditions{{< /ui >}}에서 규칙의 조건을 설정하세요. <!-- The following example uses the user agent. -->   
   1. 특정 사용자 에이전트를 차단하려면 {{< ui >}}Values{{< /ui >}}에 붙여넣으세요. {{< ui >}}Operator{{< /ui >}}에서는 {{< ui >}}matches value in list{{< /ui >}}를 사용할 수 있으며, 더 많은 유연성이 필요한 경우 {{< ui >}}Matches RegEx{{< /ui >}}를 사용할 수도 있습니다.
   {{<img src="security/ato/guide_waf_blocking_ua.png" alt="사용자 에이전트가 차단되는 모습의 스크린샷" style="width:100%;" >}}
6.  규칙의 영향을 최종 검토하려면 {{< ui >}}Preview matching traces{{< /ui >}} 섹션을 사용하세요. 예상치 못한 트레이스가 표시되지 않으면 차단 모드를 선택하고 규칙을 저장하세요. 
   {{<img src="security/ato/guide_waf_blocking_traces.png" alt="규칙과 일치하는 트레이스를 보여주는 표" style="width:100%;" >}}

여러 차단 작업을 사용할 수 있습니다. 공격자의 정교함 수준에 따라, 공격자가 차단되었음을 즉시 알아차리지 못하도록 더 은밀한 대응 방식을 원할 수도 있습니다.


{{% /tab %}}
{{< /tabs >}}

### 3.3단계: 조사 {#step-33-investigation}

[예비 대응으로 공격자를 차단한 후](#step-32-disrupting-the-attacker-as-a-preliminary-response)에는 다음을 식별할 수 있습니다.

- 공격자에 의해 손상된 계정(자격 증명을 재설정할 수 있음).  
- 타겟팅된 계정의 소스에 대한 힌트(사전 예방적 비밀번호 재설정이나 더 높은 수준의 정밀 조사를 위해 사용할 수 있음).
- 공격자 인프라에 대한 데이터(향후 시도나 기타 악의적인 활동(신용카드 스터핑, 남용 등)을 포착하는 데 사용할 수 있음).

첫 번째 단계는 애플리케이션의 전체 트래픽에서 공격자 활동을 격리하는 것입니다. 

#### 공격자 활동 격리 {#isolate-attacker-activity}

공격자 활동을 격리하는 동안 다음 두 가지 테스트를 통해 현재 필터가 철저한지 확인하세요.  
 

1. [트레이스][25]로 이동한 다음, 식별한 필터를 기반으로 트레이스를 *제외*하세요. 목표는 남은 트래픽 양을 정상적인 트래픽 양과 비슷하게 만드는 것입니다. 공격 중에 여전히 로그인 급증이 보인다면, 공격을 포괄적으로 격리하기 위해 추가 필터가 필요하다는 의미입니다.
2. 확장된 시간 범위에 걸쳐 필터와 일치하는 트래픽을 확인하세요(예: 공격이 한 시간 동안 지속되었다면 하루를 사용합니다). 공격 전후에 일치하는 모든 트래픽은 오탐지일 가능성이 높습니다.

다음으로, 공격 활동을 격리하는 것부터 시작하세요.

{{< tabs >}}
{{% tab "무차별 대입 공격(Bruteforce)" %}}

타겟팅된 사용자의 목록을 추출하려면 [신호][1]로 이동하세요.

{{< ui >}}Security Traces{{< /ui >}}에 있는 {{< ui >}}login attempts{{< /ui >}} 링크를 클릭하여 타겟팅된 사용자에 대한 추적을 쿼리할 수 있습니다.

타겟팅된 사용자에 직접 액세스하려면 신호 측면 패널에서 목록을 추출할 수 있습니다.

{{<img src="security/ato/guide_bruteforce_users.png" alt="공격받은 사용자를 보여주는 표" style="width:100%;" >}}

이 사용자 목록에서 [트레이스][2] 쿼리를 작성하여 타겟팅된 사용자의 모든 활동을 검토할 수 있습니다. 다음 템플릿을 따르세요. 

`@appsec.security_activity:business_logic.users.login.* @appsec.events_data.usr.login:(<users>)` 

성공적인 로그인은 의심스러운 것으로 간주해야 합니다.

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A"Application%20Security"%20category%3Aaccount_takeover&product=appsec
[2]: https://app.datadoghq.com/security/appsec/traces
{{% /tab %}}

{{% tab "크리덴셜 스터핑" %}}

이 신호는 소수의 IP에서 발생하는 많은 활동을 플래그 지정했으며, 분산 변형과 밀접한 관련이 있습니다. 신호가 공격의 일부를 놓친 경우 분산 크리덴셜 스터핑을 사용해야 할 수도 있습니다.

{{< ui >}}Security Traces{{< /ui >}}에 있는 {{< ui >}}login attempts{{< /ui >}} 링크를 클릭하여 공격 IP와 일치하는 추적을 쿼리할 수 있습니다.

공격 IP에 직접 액세스하려면 신호 사이드 패널에서 목록을 추출할 수 있습니다.

{{<img src="security/ato/guide_credential_stuffing_ip.png" alt="공격 IP를 보여주는 표" style="width:100%;" >}}

IP 목록에서 [트레이스][2] 쿼리를 작성하여 의심스러운 IP의 모든 활동을 검토할 수 있습니다. 다음 템플릿을 따르세요.

`@appsec.security_activity:business_logic.users.login.* @http.client_ip:(<IPs>)`

성공적인 로그인은 의심스러운 것으로 간주해야 합니다.

[2]: https://app.datadoghq.com/security/appsec/traces

{{% /tab %}}

{{% tab "분산 크리덴셜 스터핑" %}}

이 신호는 한 서비스에서 로그인 실패가 크게 증가했음을 알렸습니다. 공격 규모가 충분히 크면 이 신호는 무차별 대입 공격 또는 크리덴셜 스터핑 신호를 트리거할 수도 있습니다. 이 신호는 분산 공격을 더 포괄적으로 탐지할 수도 있습니다.

분산 공격 케이스는 공격자 속성을 신호에서 확인할 수 있습니다.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="분산 크리덴셜 스터핑 신호 스크린샷" style="width:100%;" >}}

1. 사이드 패널에서 신호를 연 후 {{< ui >}}Investigate in full screen{{< /ui >}}를 클릭하세요.   
2. {{< ui >}}Attacker Attributes{{< /ui >}}에서 클러스터를 선택하고 {{< ui >}}Filter this signal by selection{{< /ui >}}를 클릭하세요. 다음으로 {{< ui >}}Traces{{< /ui >}}에서 {{< ui >}}View in AAP Traces Explorer{{< /ui >}}을 클릭하세요.

그러면 플래그가 지정된 속성으로 필터가 설정된 트레이스 탐색기로 이동합니다. 현재 쿼리로 조사를 시작할 수 있지만, 실패뿐만 아니라 로그인 성공도 일치하도록 쿼리를 확장해야 합니다. `@appsec.security_activity:business_logic.users.login.failure`를 `@appsec.security_activity:business_logic.users.login.*`으로 바꾸면 됩니다. [위에서 설명한 기술](#isolate-attacker-activity)을 사용하여 필터의 철저함과 정확성을 검토하세요.

{{<img src="security/ato/guide_distributed_credential_stuffing_traces.png" alt="클러스터 속성별로 필터링된 트레이스 탐색기" style="width:100%;" >}}

해당 속성이 부정확하거나 불완전한 케이스는 공격자 활동을 격리하기 위해 추가적인 특성을 식별해 보세요. 전체 페이지 신호로 돌아가서 {{< ui >}}Traces{{< /ui >}} 섹션으로 스크롤하면 {{< ui >}}Analysis{{< /ui >}} 버튼을 찾을 수 있습니다. 그러면 공격으로 인한 트래픽이 다양한 속성별로 분류된 뷰가 열립니다.

{{<img src="security/ato/guide_investigate_overview.png" alt="공격 및 표에 제안된 몇 가지 속성이 포함된 분석 측면 패널이 열렸습니다." style="width:100%;" >}}

가장 일반적인 속성이 표 상단에 표시되지만, 아래로 스크롤하여 그 영향을 시각화할 수 있습니다. 각 행은 이 속성과 일치하는 트래픽의 점유율과 이 트래픽이 트래픽 증가의 "형태"와 얼마나 밀접하게 일치하는지를 보여줍니다. 귀하의 목표는 정상 상태의 트래픽을 제외하면서 이러한 활동 증가를 격리하는 속성을 식별하는 것입니다. 모든 트레이스에 모든 속성(예: 위협 인텔리전스)이 태그 지정되지 않을 수 있으므로 그래프의 규모에 유의하세요. 또한 일부 필드는 차단에 사용할 수 없다는 점에 유의하세요(위협 인텔리전스, ASN 및 IP 지리 정보).

{{<img src="security/ato/guide_investigate_correlation.png" alt="때로는 낮은 상관관계를, 때로는 높은 상관관계를 보여주는 분석 탭의 일부 시계열 데이터" style="width:100%;" >}}

속성을 식별한 후 목록에서 해당 속성을 선택하고 {{< ui >}}Filtering enabled{{< /ui >}} 버튼을 켜고 끄면서 철저함을 다시 검사하세요. 만족하시면 {{< ui >}}View Traces{{< /ui >}}를 클릭하여 영향을 받는 사용자에 대해 더 자세히 알아보세요.

{{% /tab %}}
{{< /tabs >}}

#### 로그인 성공 및 실패 검토 {#review-login-successes-and-failures}

로그인 성공 및 실패를 검토하면 다음 사항을 식별하는 데 도움이 됩니다.

* 공격자가 무엇을 노리는지 파악하여 차단할 수 있습니다.  
* 공격자가 무엇을 하는지 파악하여 스크립트를 변경하더라도 잡아낼 수 있습니다.   
* 공격자가 얼마나 성공했는지 파악하여 탈취한 계정을 되찾고 대응할 시간을 얼마나 확보할 수 있는지 확인할 수 있습니다.

공격자 활동이 격리되면 로그인 성공 사례를 검토하고 다음 질문을 고려하세요. 

* 계정이 탈취되었습니까?   
* 공격자가 탈취한 계정으로 무언가를 수행하고 있습니까, 아니면 그대로 방치하고 있습니까?   
* 그 후 계정에 다른 인프라를 통해 액세스합니까?   
* 이 인프라에서 발생한 과거 활동이 있습니까?

로그인 실패의 경우 다음 질문을 고려하세요.

* 공격자가 특정 사용자 하위 집합을 표적으로 삼고 있습니까?  
* 그들의 성공률은 어느 정도입니까? 공격의 정확도는 1/100~1/1000 범위여야 합니다.   
* 그들이 캡차(captcha)나 다중 인증을 무력화하고 있습니까?

조사가 진행됨에 따라 조사 결과에 기반하여 대응을 실행할 준비가 되면, 이 단계와 다음 단계 간에 자유롭게 전환할 수 있습니다.

### 3.4단계: 대응 {#step-34-response}

Datadog의 조사 기능은 백엔드 데이터로 강화되는데, 이 데이터는 대응을 실행하는 라이브러리에서 사용할 수 없습니다. 따라서 모든 필드가 대응 실행과 호환되는 것은 아닙니다.

의욕적인 공격자는 대응 조치를 인지하는 즉시 이를 우회하려고 시도합니다. 이러한 접근 방식에 대비하여 다음을 수행하세요.

1. 공격에 대한 가시성을 잃지 않도록 하세요.  
2. 공격자가 *를 식별*하기 어렵도록 최대한 차단하세요. 예를 들어, 차단 응답을 로그인 실패 응답과 동일하게 설정하세요. 이렇게 하면 공격자를 혼란스럽게 하여 공격이 여전히 성공하고 있다고 믿게 만들 수 있습니다.  
3. 공격자가 *를 우회*하기 어렵도록 최대한 차단하세요. IP 대신 특정 헤더 값과 같은 미묘한 특성을 사용하세요.

Datadog의 내장 차단 기능을 사용하여 특정 기준과 일치하는 모든 요청을 거부하거나, 데이터를 시스템 중 하나로 자동 내보내어 대응(자격 증명 재설정, 차단 시 로그인 실패 모방 등)을 수행할 수 있습니다.

### Datadog 차단 {#datadog-blocking}

Datadog에 의해 차단된 트래픽의 일부인 사용자는 {{< ui >}}You're blocked{{< /ui >}} 페이지를 보거나 리디렉션과 같은 사용자 지정 상태 코드를 받습니다. 차단은 각각 다른 성능 특성을 가진 두 가지 메커니즘, 즉 Denylist와 사용자 지정 WAF 규칙을 통해 적용할 수 있습니다. 

{{<img src="security/ato/guide_blocked.png" alt="사용자가 차단되었을 때 표시되는 페이지입니다. '죄송합니다. 이 페이지에 액세스할 수 없습니다.'라고 표시되는 페이지입니다. 고객 서비스 팀에 문의하세요." style="width:100%;" >}}

#### Denylist {#denylist}

[Denylist][27]는 많은 수의 항목을 차단하는 효율적인 방법이지만 IP 및 사용자로 제한됩니다. 조사를 통해 공격의 원인이 되는 소수의 IP(`<1000`)가 확인된 경우, 해당 IP를 차단하는 것이 가장 좋은 방법입니다. 

Denylist는 신호 내에서 {{< ui >}}Automate Attacker Blocking{{< /ui >}}을 클릭하여 Datadog 플랫폼을 통해 관리 및 자동화할 수 있습니다. 

{{< ui >}}Automate Attacker Blocking{{< /ui >}} 또는 {{< ui >}}Block All Attacking IPs{{< /ui >}} 신호 옵션을 사용하여 몇 시간, 일주일 또는 영구적으로 모든 공격 IP를 차단하세요. 마찬가지로 탈취된 사용자도 차단할 수 있습니다. 참고로, Datadog은 IP가 공용 풀로 재활용된 후 정상적인 트래픽이 차단될 위험이 있으므로 IP를 영구적으로 차단하는 것을 권장하지 않습니다.  

{{<img src="security/ato/guide_next_steps.png" alt="메뉴에는 신호 분류부터 IP 또는 손상된 사용자 차단, 자동 차단 활성화를 통한 신호 대응까지 신호에 대한 빠른 대응이 표시됩니다." style="width:50%;" >}}

차단은 [Denylist][27]에서 해제하거나 연장할 수 있습니다.

{{<img src="security/ato/guide_denylist_menu.png" alt="Denylist에 액세스할 수 있는 메뉴, Policies를 선택한 다음 Denylist를 선택하세요." style="width:100%;" >}}

신호가 정확하지 않은 경우, 사용자 또는 IP 목록을 추출하여 수동으로 Denylist에 추가할 수 있습니다.

{{<img src="security/ato/guide_denylist_new.png" alt="새 IP, 사용자 또는 사용자 에이전트를 Denylist에 추가할 수 있는 프롬프트" style="width:80%;" >}}

#### 인앱 WAF 규칙 {#in-app-waf-rules}

Denylist로 충분하지 않은 경우, WAF 규칙을 생성할 수 있습니다. WAF 규칙은 Denylist보다 평가 속도가 느리지만 더 유연합니다.

새 규칙을 만들려면 다음을 수행하세요.

1.  {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Custom Rules][33]으로 이동합니다.
2. {{< ui >}}Create New Rule{{< /ui >}}을 클릭하고 구성을 완료하세요. 
3.  {{< ui >}}Define your custom rule{{< /ui >}}의 단계를 따르세요.   
4. {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}에서 로그인 서비스 또는 요청을 차단하려는 서비스를 선택하세요. 로그인 경로로 차단을 지정할 수도 있습니다.
{{<img src="security/ato/guide_waf_blocking.png" alt="특정 서비스의 특정 경로를 선택하는 WAF 규칙 생성 모달의 스크린샷" style="width:100%;" >}}
5.  {{< ui >}}If incoming requests match these conditions{{< /ui >}}에서 규칙의 조건을 설정하세요. <!-- The following example uses the user agent. -->   
   1. 특정 사용자 에이전트를 차단하려면 {{< ui >}}Values{{< /ui >}}에 붙여넣으세요. {{< ui >}}Operator{{< /ui >}}에서 {{< ui >}}matches value in list{{< /ui >}}을 사용할 수 있으며, 더 많은 유연성을 원하면 또한 {{< ui >}}Matches RegEx{{< /ui >}}을 사용할 수 있습니다.
{{<img src="security/ato/guide_waf_blocking_ua.png" alt="사용자 에이전트가 차단되는 모습의 스크린샷" style="width:100%;" >}}
6.  규칙의 영향을 최종 검토하려면 {{< ui >}}Preview matching traces{{< /ui >}} 섹션을 사용하세요. 예상치 못한 트레이스가 표시되지 않으면 차단 모드를 선택하고 규칙을 저장하세요. 

응답은 트레이스에 자동으로 푸시되며 차단된 트레이스는 [트레이스 탐색기][25]에 나타납니다.

{{<img src="security/ato/guide_waf_blocking_traces.png" alt="규칙과 일치하는 트레이스를 보여주는 표" style="width:100%;" >}}

여러 차단 작업을 사용할 수 있습니다. 공격자의 정교함에 따라 공격자가 차단되었음을 즉시 알아차리지 못하도록 더 은밀한 응답을 원할 수 있습니다.

자세한 내용은 [인앱 WAF 규칙][34]을 참조하세요.

#### 자동 데이터 내보내기 {#automated-data-export}

웹훅을 사용하여 사용자 ID를 푸시하도록 신호를 구성할 수 있습니다. 이 방법은 탈취된 사용자를 시스템으로 푸시하고 자격 증명을 재설정하거나 제한하는 데 사용할 수 있습니다. 목표는 해당 계정을 공격자가 사용할 수 없게 만드는 것입니다.

<div class="alert alert-info">모든 규칙이 이 기능과 호환되는 것은 아닙니다. OOTB 규칙 중 호환되는 규칙은 다음과 같습니다.
<ul>
 <li>분산된 크리덴셜 스터핑 캠페인(공격자 지문)</li>
 <li>무차별 대입 공격</li>
 <li>크리덴셜 스터핑 공격</li>
</ul>
</div>

웹훅을 사용하여 사용자 ID를 푸시하도록 신호를 구성하려면 다음을 수행하세요. 
1. [표준 웹훅 대상][28] 구성. Cloud SIEM에서 이 기능이 어떻게 작동하는지 확인하려면 [Webhooks을 사용하여 탐지된 위협의 수정 자동화][29]로 이동하세요.
2. [탐지 규칙][30]에서 구성하려는 규칙을 엽니다. 
{{<img src="security/ato/guide_detection_rules.png" alt="ATO 관련 탐지 규칙 표" style="width:100%;" >}}
3. 탐지 규칙 조건의 알림 설정으로 이동합니다. 
4. 수신자를 추가하고 새로 탐지된 모든 `@usr.id`에 대해 {{< ui >}}Notify{{< /ui >}}를 켭니다. 이를 통해 업데이트가 발생할 때 목록을 내보낼 수 있습니다.

{{<img src="security/application_security/threats/notify-on-update.png" alt="탐지 규칙 편집기의 업데이트 시 알림 토글" style="width:100%;">}}

탐지 규칙 조건에 설정된 알림 대상은 새로운 사용자 ID가 탐지되면 메시지를 받습니다. 이 신호를 모니터링하는 알림 프로필은 새로운 사용자 ID에 대한 경고를 받지 않습니다.

웹훅으로 타겟팅된 사용자 ID와 손상된 사용자 ID를 받으려면 Datadog 웹훅 통합을 사용하여 웹훅을 설정하세요. 웹훅 페이로드에 `$SECURITY_SIGNAL_ATTRIBUTES` 변수를 포함하세요. 사용자 ID는 JSON 페이로드의 `@usr.id` 경로 아래에 저장됩니다.

{{<img src="security/application_security/threats/notify-on-update-payload.png" alt="업데이트 시 알림 예시 페이로드" style="width:100%;">}}

페이로드를 구문 분석하여 자체 시스템에서 ID에 대한 조치를 취할 수 있습니다. 

**중요:** 이 목록에는 마지막 알림 이후 탐지된 ID만 포함됩니다. ID가 다시 로그인해도 중복 제거되지 않습니다.

### 3.5 단계: {#step-35-monitor} 모니터링

공격자가 대응을 도입한 후, 공격을 일시 중단하거나 조정할 수 있습니다. 대응을 도입한 후 로그인 시도율, 특히 실패율을 계속 모니터링하세요. 공격이 잠시 중단되었다가 몇 분, 몇 시간 또는 며칠 후에 다시 시작될 수 있습니다. 

대규모 공격이 다시 시작되면 분산 Credential Stuffing 신호를 다시 실행해야 합니다. 이 경우 다음 고려 사항을 검토하세요.

* 끈질긴 공격자는 포기하기 전에 여러 번의 방어 조치를 반복해야 하는 경우가 많습니다.
* 이상적인 방어는 공격자가 우회할 수 없는 강력한 차단 전략입니다.
* 공격자는 IP와 사용자 에이전트를 변경하여 탐지를 회피하려고 자주 시도합니다. 공격자가 로그인 시도를 보내기 위해 확보한 스크립트를 깊이 수정할 가능성은 낮으므로 헤더가 더 탄력적인 대상입니다.
* 효과적인 전략에는 드문 헤더 조합을 식별하는 지문 기반 또는 상관관계 방법이 포함됩니다.
* 이전 방어 대응으로 인해 차단된 트래픽을 모니터링하세요.
* 공격자 트래픽을 차단하면 의도치 않게 정상적인 트래픽이 차단될 수 있습니다. 정상적인 트래픽의 차단을 해제하는 메커니즘을 구현하세요. Datadog 대응을 조정하거나 공격 후 차단이 해제되도록 하세요.

### 3.6 단계: 정리 {#step-36-cleanup}

공격자의 활동이 며칠 동안 눈에 띄게 없으면 공격이 종료된 것으로 간주하고 정리 단계로 넘어갈 수 있습니다. 

정리 단계의 목표는 다음과 같습니다.

- 추가된 완화 조치를 비활성화하세요.  
- 정상적인 트래픽이 차단되지 않았는지 확인하세요.  
- 향후 공격에 대비하여 서비스를 강화할 기회를 식별하세요.  
- 공격자가 사용자에게 사용한 데이터의 소스를 식별하세요.

#### 완화 조치 비활성화 {#disabling-mitigations}

사용자 차단은 신호에서 {{< ui >}}Block All Attacking IPs{{< /ui >}}를 선택했을 때 설정한 타이머를 기준으로 해야 합니다. 이 사용자 차단 구성은 추가 작업이 필요하지 않습니다.

영구 차단을 구성한 경우, 다음을 수행하여 차단 목록에서 사용자와 IP의 차단을 해제하세요. 

1. [Denylist][27]를 여세요.  
2. {{< ui >}}Blocked IPs{{< /ui >}} 또는 {{< ui >}}Blocked users{{< /ui >}}을 클릭하세요.  
3. 엔티티 목록에서 IP 또는 사용자를 찾아 {{< ui >}}Unblock{{< /ui >}}을 클릭하세요.

<!-- <insert up to date screenshot\> -->

#### 사용자 지정 In-App WAF 규칙을 비활성화하거나 삭제하세요 {#disable-or-delete-any-custom-in-app-waf-rules}

In-App WAF 규칙을 비활성화하거나 삭제하려면 [커스텀 인앱 WAF 규칙][33]으로 이동한 후, {{< ui >}}Monitoring{{< /ui >}} 또는 {{< ui >}}Blocking{{< /ui >}}을 클릭하고 {{< ui >}}Disable Rule{{< /ui >}}을 선택하여 규칙을 비활성화하세요. 

규칙이 더 이상 관련이 없으면, 추가 옵션({{< ui >}}...{{< /ui >}})을 클릭한 후 {{< ui >}}Delete{{< /ui >}}을 선택하여 삭제하세요.

#### 정상적인 트래픽이 차단되지 않았는지 확인하세요 {#validate-no-legitimate-traffic-is-blocked}

정상적인 트래픽이 차단되지 않았는지 확인하려면 트래픽 볼륨이 공격 트래픽과 거의 일치해야 하며, 주요 공격 파동 외에는 차단된 트레이스가 거의 없어야 합니다.

정상적인 트래픽이 차단되지 않았는지 확인하려면 다음을 수행하세요.

1. [트레이스][25]로 이동한 후, `@appsec.blocked:true` 검색을 사용하여 차단된 추적을 검색하세요.   
2. 지속적으로 상당한 트래픽이 차단되는 것이 보이면, 해당 트래픽은 정상적인 사용자일 가능성이 높습니다.
   1. 추가적인 사용자 차단을 방지하려면 잘못된 차단 규칙을 비활성화하세요. 
   2. [Denylist][27]에서 해당 트래픽의 차단 해제를 우선시하세요.

#### 서비스 강화 {#hardening-your-services}

대규모 ATO 캠페인은 단발성으로 발생하는 경우가 드뭅니다. 공격 사이의 시간을 활용하여 서비스를 강화하고 후속 공격 시 활용할 수 있는 구성을 설정하는 것이 좋습니다.

다음은 몇 가지 일반적인 강화 예시입니다.

* **IP / 사용자 / 네트워크 범위 / 사용자 에이전트별 로그인 시도 속도 제한:** 이 소프트 차단 기능을 사용하면, 공격자가 정상 사용자와 특성을 공유하더라도 정상 사용자에게 미치는 영향을 최소화하면서 일부 상황에서 공격 규모를 적극적으로 줄일 수 있습니다.  
* **로그인 시 마찰 추가:** 사용자에게 큰 영향을 주지 않으면서 공격자의 자동화를 차단하려면, 공격 중에 캡차를 사용하거나 로그인 흐름을 수정하세요(예: 새 엔드포인트에서 토큰을 가져오도록 요구).
* **다중 인증(MFA) 강제 적용:** Datadog은 MFA가 계정 침해를 막는 데 매우 효과적이라는 것을 확인했습니다. 특히 공격 중에는 가장 권한이 높은 사용자에게 MFA를 사용하도록 요구할 수 있습니다. 
* **사용자에 대한 민감한 작업 제한:** 서비스에서 사용자가 민감한 작업(금액 지출, 민감한 정보 액세스, 연락처 정보 변경 등)을 수행할 수 있는 경우, 수동 검토나 다중 인증을 통해 확인될 때까지 의심스러운 로그인이 있는 고위험 사용자를 차단하는 것이 좋습니다. 의심스러운 로그인은 웹훅을 통해 Datadog에서 시스템으로 프로그래밍 방식으로 전달될 수 있습니다.  
* **신호 결과를 프로그래밍 방식으로 소비하는 기능:** Datadog 웹훅을 소비하고 의심되는 사용자/IP/특성에 대해 자동으로 조치를 취할 엔드포인트를 만드세요.

#### 공격자 데이터 소스 식별 {#identifying-the-attacker-data-source}

공격자는 대량으로 침해된 계정 목록을 획득합니다. 데이터베이스의 소스를 식별함으로써 위험에 처한 사용자를 선제적으로 식별할 수 있습니다. 

데이터베이스의 소스를 식별하려면 다음 옵션 중 하나를 사용하여 공격의 영향을 받은 사용자를 내보내세요.

* 신호 세부 정보의 {{< ui >}}Targeted users{{< /ui >}}에서 {{< ui >}}Export to CSV{{< /ui >}}을 클릭하세요. 이 옵션은 최대 1만 명의 사용자를 내보냅니다.   
* 1만 명 이상의 사용자를 내보내야 하는 경우, 수동으로 [API 호출][31]을 수행하여 쿼리를 페이지화하세요. Traces 탐색기도 유사한 호출을 수행하므로, `@appsec.events_data.usr.login`으로 그룹화하여 해당 호출을 기반으로 요청을 구성할 수 있습니다. 백엔드 제한을 피하기 위해 제한을 10000으로 설정하고 더 짧은 시간 범위를 사용하세요.

{{<img src="security/ato/guide_user_table.png" alt="공격 대상 사용자들을 보여주는 표입니다. 해당 사용자에 대한 더 많은 활동 정보가 포함된 사이드 패널이 있기 때문에 한 명의 사용자가 필 형태로 표시됩니다." style="width:100%;" >}}

목록이 있으면 공통 속성을 검토하세요. 
- 모든 사용자가 한 지역이나 한 고객으로부터 오는 경우. 
- 사용자의 대다수가 알려진 침해를 공유하는 경우([Have I Been Pwned][32] API 사용).

데이터베이스의 소스가 확인되면 해당 고객의 비밀번호 재설정을 선제적으로 강제하거나 더 높은 위험으로 표시하세요. 이렇게 하면 향후 의심스러운 로그인이 실제로 침해된 것인지에 대한 신뢰도가 높아집니다.

#### 추가 공격자 활동을 검토하세요 {#review-additional-attacker-activity}

공격자의 서명을 활용하여 필터를 확장하고 공격자가 수행한 비로그인 활동을 확인하세요. 

이 필터는 정확도가 떨어질 수 있습니다. 예를 들어, 합법적인 트래픽을 가진 모바일 애플리케이션의 서명과 일치하지만 공격자가 공격을 위해 복제한 필터가 있습니다. 이 필터는 공격자가 사전에 수행한 조사 내용을 보여줄 수 있으며, 공격자가 다음에 무엇을 하려는지에 대한 힌트를 제공할 수 있습니다.

공격자가 사용한 인프라를 기반으로 피벗할 수도 있습니다. 해당 악성 IP가 로그인 외에 다른 활동을 수행했습니까? 다른 민감한 API에 액세스하고 있습니까?

## 결론 {#conclusion}

계정 도용은 일반적인 위협이지만 기존의 주입 공격보다 훨씬 복잡합니다. 이를 포착하려면 시스템과의 긴밀한 통합이 필요하며, 가장 정교한 공격의 경우 자동화된 대응이 불가능할 정도로 불확실성이 큽니다.  

이 가이드에서 수행한 작업은 다음과 같습니다. 
- 계정 탈취 캠페인이 어떻게 보일 수 있는지, 이를 분류하는 방법, 그리고 대응하는 방법을 배웠습니다.
- Datadog AAP에 필요한 모든 컨텍스트를 제공하도록 로그인 서비스를 계측했습니다.
- 공격 시점에 모든 기능을 제공하도록 로그인 서비스를 구성했습니다. 

이는 일반적인 지침입니다. 애플리케이션 및 환경에 따라 추가적인 대응 전략이 필요할 수 있습니다.

[1]: /ko/security/application_security/account_takeover_protection/
[2]: https://app.datadoghq.com/services?query=service%3Auser-auth&env=%2A&fromUser=false&hostGroup=%2A&lens=Security&sort=-fave%2C-team&start=1735636008863&end=1735639608863
[3]: /ko/security/application_security/setup/compatibility/
[4]: /ko/remote_configuration
[5]: https://app.datadoghq.com/security/appsec/onboarding
[6]: https://app.datadoghq.com/security/appsec/traces?query=&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036043639&end=1735640843639&paused=false
[7]: /ko/security/application_security/setup/threat_detection/
[8]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036164646&end=1735640964646&paused=false
[9]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-user-activity-event-tracking
[10]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[11]: /ko/tracing/guide/remote_config/
[12]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[13]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#tracking-business-logic-information-without-modifying-the-code
[14]: https://app.datadoghq.com/security/appsec/threat
[15]: /ko/security/application_security/account_takeover_protection/#attacker-strategies
[16]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[17]: /ko/security/notifications/
[18]: https://app.datadoghq.com/security/configuration/notification-rules/new?notificationData=
[19]: /ko/security/notifications/#notification-channels
[20]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[21]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[22]: https://securitylabs.datadoghq.com/articles/challenges-with-ip-spoofing-in-cloud-environments/#what-should-you-do
[23]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[24]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules&ruleId=newRule
[25]: https://app.datadoghq.com/security/appsec/traces
[26]: https://app.datadoghq.com/security
[27]: https://app.datadoghq.com/security/appsec/denylist
[28]: /ko/api/latest/webhooks-integration/
[29]: /ko/security/cloud_siem/guide/automate-the-remediation-of-detected-threats/
[30]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&mitreFilters=%7B%22visualize%22%3A%7B%22value%22%3A%5B%22all%22%5D%2C%22excluded%22%3Afalse%7D%2C%22ruleDensity%22%3A%7B%22value%22%3A%5B%5D%2C%22excluded%22%3Afalse%7D%7D&sort=date&viz=rules
[31]: /ko/api/latest/spans/#aggregate-spans
[32]: https://haveibeenpwned.com/
[33]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules
[34]: /ko/security/application_security/policies/inapp_waf_rules/