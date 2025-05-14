---
aliases:
- /ko/tracing/dynamic_instrumentation/
- /ko/dynamic_instrumentation/how-it-works/
further_reading:
- link: /dynamic_instrumentation/expression-language/
  tag: 설명서
  text: 동적 계측 표현식 언어에 대해 자세히 알아보기
- link: dynamic_instrumentation/sensitive-data-scrubbing/
  tag: 설명서
  text: 동적 계측 데이터에서 민감한 정보 제거
- link: /tracing/trace_collection/dd_libraries
  tag: 설명서
  text: 애플리케이션 계측 방법에 대해 자세히 알아보기
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: 통합 서비스 태깅
- link: /tracing/software_catalog/
  tag: 설명서
  text: Datadog에 보고되는 서비스 검색 및 카탈로그 작성
- link: /metrics
  tag: 설명서
  text: 메트릭에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/dynamic-instrumentation-application-logging/
  tag: 블로그
  text: Datadog 동적 계측을 사용하여 재배치 없이 애플리케이션 로그 추가
is_beta: false
private: false
title: 동적 계측
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
 동적 계측은 선택한<a href="/getting_started/site">Datadog </a> ({{< region-param key="dd_site_name" >}}) 사이트를 지원하지 않습니다. 이 기능을 사용하려면 <a href="/agent/remote_config/">원격 설정</a>을 활성화해야 합니다.
</div>
{{% /site-region %}}

## 개요

동적 계측을 사용하면 서드 파티 라이브러리를 포함하여, 애플리케이션 코드의 어느 부분에서든 재시작 없이 실행 중인 프로덕션 시스템에 계측 기능을 추가할 수 있습니다. Datadog UI에서 로그, 메트릭, 스팬, 해당 태그에 대한 텔레메트리를 추가하거나 수정할 수 있습니다. 동적 계측은 오버헤드가 낮고 시스템에 부작용을 일으키지 않습니다.

동적 계측의 최신 사용자 경험 개선 사항을 사용해 보고 싶다면, [자동완성 및 검색 미리보기][17]를 활성화해 보세요.

## 시작하기

### 필수 요건

동적 계측 기능을 사용하려면 다음이 조건을 충족해야 합니다.

- [Datadog Agent][1] 7.45.0 이상이 서비스와 함께 설치되어 있습니다.
- Agent에 [원격 설정][2]이 활성화되어 있습니다.
- Java 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-java`][3] 1.34.0 이상입니다.
- Python 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-py`][4] 2.2.0 이상입니다.
- For .NET 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-dotnet`][5] 2.54.0 이상입니다.
- (제한된 미리보기) Node.js 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-js`][18] 5.39.0 이상입니다.
- (제한된 미리보기) Ruby 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-rb`][19] 2.9.0 이상입니다.
- (제한된 미리보기) PHP 애플리케이션의 경우, 추적 라이브러리 버전이 [`dd-trace-php`][20] 1.5.0 이상입니다.
- [통합 서비스 태깅][6] 태그 `service`, `env`, `version`이 배포 환경에 적용되어 있습니다.
- 권장: [자동완성 및 검색(미리보기)][17]이 활성화되어 있습니다.
- 권장: [소스 코드 통합][7]이 설정되어 있습니다.
- **동적 계측 읽기 설정** (`debugger_read`) 권한이 동적 계측 페이지 접근에 필요합니다.
- **동적 계측 쓰기 설정** (`debugger_write`) 권한이 계측을 생성 및 수정하는 데 필요합니다.
- **메서드 매개변수 및 로컬 변수 캡처**를 사용하려면 **동적 계측 캡처 변수** (`debugger_capture_variables`) 권한이 필요합니다.

 역할 및 사용자에게 역할을 할당하는 방법에 대한 자세한 내용을 확인하려면 [역할 기반 액세스 제어l][8]를 참조하세요.

### 로그 인덱스 생성

동적 계측은 Datadog에 전송되고 일반 애플리케이션 로그와 같이 표시되는 '동적 로그'를 생성합니다.

[제외 필터][9]를 사용하는 경우, 다음과 같이 동적 계측 로그가 필터링되지 않도록 주의합니다.

1. 로그 인덱스를 생성하고 **샘플링 없이** 원하는 보존 기간을 [설정][10]합니다.
2. `source:dd_debugger` 태그와 매칭되도록 필터를 설정합니다. 모든 동적 계측 로그에는 이 소스가 있습니다.
3. 새 인덱스가 해당 태그와 매칭되는 필터가 있는 다른 인덱스보다 우선하도록 설정합니다. 먼저 매칭되는 인덱스가 우선하여 적용되기 때문입니다.

### 동적 계측 활성화

서비스에서 동적 계측을 활성화하려면 [인앱 설정 페이지][16]로 이동합니다.

자세한 지침을 확인하려면 다음 런타임을 선택하세요.

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}


### 제한

- 동적 계측은 아직 Azure App Service 또는 서버리스 환경과 호환되지 않습니다.
- Python, Java, .NET.로 빌드한 애플리케이션만 전체 지원이 제공됩니다.
- Node.js, Ruby, PHP로 빌드한 애플리케이션용으로 제한된 미리보기가 진행 중입니다.

## 동적 계측 탐색

동적 계측은 애플리케이션의 런타임 동작을 이해할 수 있도록 도와드립니다. 동적 계측 프로브를 추가하면 코드를 변경하거나 재배포하지 않고도 애플리케이션에서 추가 데이터를 내보낼 수 있습니다.

### 프로브 사용

프로브로 프로그램 실행을 중단하지 않고 코드의 특정 지점에서 데이터를 수집할 수 있습니다.

코드를 변경하거나 배포 또는 서비스를 재시작하지 않고도 실행 중인 애플리케이션에 동적 로그, 메트릭, 스팬을 추가하여 관측성을 향상시킬 수 있는 방안으로 프로브를 고려해 보시기 바랍니다. 사용자 환경을 방해하거나 장시간 배포하지 않고도 바로 데이터를 수집할 수 있습니다.

개발자는 프로브를 '비중단 중단점(Non-breaking breakpoint)'이라고 생각하면 좋습니다. 기존 디버깅에서 중단점은 프로그램 실행이 중단되는 지점으로, 개발자가 해당 지점의 프로그램 상태를 조사할 수 있게 합니다. 그러나 실제 운영 환경에서는 프로그램 실행을 중단하는 것이 현실적이지 않거나 아예 가능하지 않습니다. 프로브는 이러한 프로덕트 운영 환경에서 비침입적 방식으로 변수 상태를 검사할 수 있도록 도와줌으로써 이러한 한계를 보완합니다.

### 프로브 생성

모든 프로브 유형은 다음과 같은 초기 설정이 필요합니다.

1. [동적 계측 페이지][12]로 이동합니다.
1. 오른쪽 상단의 **Create Probe**를 클릭하거나 서비스 메뉴에서 점 세 개를 클릭하고 **Add a probe for this service**를 선택합니다.
1. 정보가 미리 채워지지 않은 경우 서비스, 런타임, 환경, 버전을 선택합니다.
1. 소스 코드에서 클래스와 메서드 또는 소스 파일 및 라인 중 하나를 선택하여 프로브를 설정할 위치를 지정합니다. [자동완성 및 검색 미리보기][17]를 설정한 경우, 자동 완성 기능은 클래스 또는 메서드 선택 제안을 제시합니다.

각 프로브 유형에 대한 개별 생성 단계는 다음 개별 프로브 유형을 참조하세요.

또는 다음과 같은 컨텍스트에서 프로브를 생성합니다.

프로파일링
: 프로파일러 플레임 그래프에서 프레임 컨텍스트 메뉴의 **Instrument this frame with a probe**를 선택하여 메서드용 프로브를 생성합니다.

오류 추적
: 스택 트레이스(stack trace)에서 스택 프레임에 마우스를 올리고 **Instrument**를 클릭합니다. 그러면 프로브 생성 양식에 오류 컨텍스트가 미리 채워집니다. 


### 로그 프로브 생성

A *로그 프로브*는 실행 시 로그를 출력합니다.

다음에 따라 로그 프로브를 생성합니다.

1. 프로브 유형으로 **로그**를 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)(서버, 환경, 버전, 프로브 위치 선택)을 완료합니다.
1. 로그 메시지 템플릿을 정의합니다. 동적 계측 정규 표현식으로 실행 컨텍스트 값을 참조할 수 있습니다.
1. 옵션으로 프로브에서 추가 데이터 캡처 기능을 활성화합니다(베타 버전).
1. 옵션으로 동적 계측 정규 표현식으로 조건을 정의합니다. 표현식이 True로 산출되면 로그가 출력됩니다.

로그 프로브는 지정한 환경 또는 버전과 일치하는 모든 서비스 인스턴스에서 기본값으로 활성화됩니다. 서비스의 각 인스턴스에서 초당 최대 5,000회 실행되는 속도 제한이 있습니다.

모든 로그 프로브에 로그 메시지 템플릿을 반드시 지정해야 합니다. 해당 템플릿은 중괄호 안에 [정규 표현식][15]을 삽입할 수 있도록 지원합니다. 예시: `User {user.id} purchased {count(products)} products`.

[정규 표현식][15]으로 로그 프로브에 조건을 설정할 수도 있습니다. 정규 표현식은 반드시 부울로 결과값이 산출되어야 합니다. 표현식이 True면 프로브가 실행되고, False면 데이터를 캡처 또는 출력하지 않습니다.

{{< img src="dynamic_instrumentation/log_probe.png" alt="동적 계측 로그 프로브 생성하기" >}}

**베타**: 로그 프로브에서 **메서드 파라미터 및 로컬 변수 캡처**를 활성화하면 다음의 모든 실행 컨텍스트가 로그 이벤트에 추가됩니다.
  - 다음 기본 제한이 적용된 **메서드 인수**, **로컬 변수**, **필드**:
    - 세 단계 깊이의 참조를 따름(UI에서 설정 가능).
    - 컬렉션 내 첫 100개 아이템.
    - 문자열 값의 경우 첫 255자.
    - 오브젝트 내 20개 필드. 정적 필드는 수집되지 않습니다.
  - **스택 트레이스(stack trace)**를 호출합니다.
  - 처리되거나 처리되지 않은 **예외**.

해당 설정이 적용된 프로브는 초당 한 번만 실행되는 속도 제한이 있습니다. 

<div class="alert alert-info"><p><strong>경고: 캡처된 데이터는 개인정보, 비밀번호 AWS 키와 같은 시크릿 등의 민감한 정보를 포함할 수도 있습니다.</strong></p><p>다음에 따라 해당 정보를 적절히 마스킹합니다.<ul>
<li>Datadog Dynamic Instrumentation은 여러 가지 기술을 활용하여 민감한 정보를 마스킹합니다. 기본 메커니즘에 대해 자세히 알아보거나 이를 요구 사항에 맞게 확장하는 방법을 확인하려면 <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">민감 정보 스크러빙</a> 항목을 참조하세요.</li>
<li><strong>메서드 파라미터 및 로컬 변수 캡처</strong> 옵션을 비활성화하고 로그 메시지 템플릿에 포함하려는 변수를 명시적으로 선택합니다. 이렇게 하면 로그 프로브에는 사용자가 구체적으로 지정한 변수와 관련된 데이터만 포함되므로 의도치 않게 민감한 데이터가 유출되는 위험을 줄일 수 있습니다. </li>
<li>Datadog 계정 관리자로서 다른 사용자가 <strong>메서드 파라미터 및 로컬 변수 캡처</strong> 옵션을 사용하지 못하게 설정하려면, 해당 사용자의 동적 계측 캡처 변수(<code>debugger_capture_variables</code>) 권한을 취소합니다. </li></ul></p><p>또는, 이 데이터를 로깅해야 하지만 Datadog 제품으로 접근하는 것을 방지하려면 <code>source:dd_debugger</code>에 <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">제한 쿼리</a>를 설정하여 조직 내에서 캡처된 데이터를 확인할 수 있는 사용자를 제한할 수 있습니다</p>.</div>

### 메트릭 프로브 생성하기

*메트릭 프로브*는 실행될 때 메트릭을 내보냅니다.

메트릭 프로브를 생성하려면:

1. 프로브 유형으로 **Metric**을 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)을 완료합니다(서비스, 환경, 버전 및 프로브 위치 선택).
1. `dynamic.instrumentation.metric.probe.` 접두사가 붙을 메트릭의 이름을 지정합니다.
1. 메트릭 유형(count, gauge, histogram)을 선택합니다.
1. [동적 계측 표현 언어][15]를 사용하여 메트릭 값을 선택합니다. 메서드 파라미터, 지역 변수, 클래스 필드 또는 숫자 값을 생성하는 표현식 등 실행 컨텍스트에서 원하는 숫자 값을 사용할 수 있습니다. 카운트 메트릭의 경우 선택 사항이며, 생략하면 호출할 때마다 개수가 1씩 증가합니다.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="동적 계측 메트릭 프로브 만들기" >}}

메트릭 프로브는 구성된 환경 및 버전과 일치하는 모든 서비스 인스턴스에서 자동으로 활성화됩니다. 메트릭 프로브는 속도 제한이 없으며 메서드나 행이 호출될 때마다 실행됩니다.

동적 계측 메트릭 프로브는 다음 메트릭 유형을 지원합니다.

- **Count**: 주어진 메서드나 행이 실행된 횟수를 셉니다. [메트릭 표현식][15]과 결합하여 변수 값을 사용하여 개수를 늘릴 수 있습니다.
- **Gauge**: 변수의 마지막 값을 기반으로 게이지를 생성합니다. 이 메트릭에는 [메트릭 표현식][15]이 필요합니다.
- **Histogram**: 변수의 통계적 분포를 생성합니다. 이 메트릭에는 [메트릭 표현식][15]이 필요합니다.

### 스팬 프로브 만들기

*스팬 프로브*는 메서드가 실행될 때 스팬을 내보냅니다.

스팬 프로브를 생성하려면:

1. 프로브 유형으로 **Span**을 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)을 완료합니다(서비스, 환경, 버전 및 프로브 위치 선택).

{{< img src="dynamic_instrumentation/span_probe.png" alt="동적 계측 스팬 프로브 만들기" >}}

[커스텀 계측으로 새 범위 생성][13] 대신 *스팬 프로브*를 사용할 수 있습니다. 메서드에서 예외가 발생하면 예외의 세부정보가 새로 생성된 스팬의 `error` 태그와 연결됩니다.

### 스팬 태그 프로브 만들기

*스팬 태그* 프로브는 기존 스팬에 태그 값을 추가합니다. _active_ 스팬 또는 _service Entry_ 스팬에 태그를 추가할 수 있습니다.
내부 스팬은 기본적으로 인덱싱되지 않으므로 APM에서 검색하지 못할 수도 있습니다.

스팬 태그 프로브를 생성하려면:

1. 프로브 유형으로 **Span Tag**를 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)을 완료합니다(서비스, 환경, 버전 및 프로브 위치 선택).
1. 태그의 이름을 지정합니다.
1. [동적 계측 표현 언어][15]를 사용하여 태그의 값을 지정합니다.
1. 선택적으로 동적 계측 표현 언어를 사용하여 조건을 정의합니다. 태그는 표현식이 true로 평가될 때만 추가됩니다.
1. 필요에 따라 각각 고유한 이름, 표현식 및 선택적 조건이 포함된 추가 태그를 추가합니다.


{{< img src="dynamic_instrumentation/span_tag_probe.png" alt="동적 계측 스팬 태그 프로브 만들기" >}}

[사용자 정의 계측을 사용하여 코드에 태그 추가][14] 대신 *스팬 태그 프로브*를 사용할 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/remote_config/
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-py
[5]: https://github.com/DataDog/dd-trace-dotnet
[6]: /ko/getting_started/tagging/unified_service_tagging/
[7]: /ko/integrations/guide/source-code-integration/
[8]: /ko/account_management/rbac/permissions#apm
[9]: /ko/logs/log_configuration/indexes/#exclusion-filters
[10]: /ko/logs/log_configuration/indexes/#add-indexes
[11]: /ko/dynamic_instrumentation/how-it-works/
[12]: https://app.datadoghq.com/dynamic-instrumentation
[13]: /ko/tracing/trace_collection/custom_instrumentation/java/#adding-spans
[14]: /ko/tracing/trace_collection/custom_instrumentation/java/#adding-tags
[15]: /ko/dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/setup
[17]: /ko/dynamic_instrumentation/symdb/
[18]: https://github.com/DataDog/dd-trace-js
[19]: https://github.com/DataDog/dd-trace-rb
[20]: https://github.com/DataDog/dd-trace-php