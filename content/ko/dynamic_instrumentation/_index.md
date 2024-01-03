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
- link: /tracing/service_catalog/
  tag: 설명서
  text: Datadog에 보고되는 서비스 검색 및 카탈로그 작성
- link: /metrics
  tag: 설명서
  text: 메트릭에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/dynamic-instrumentation-application-logging/
  tag: 블로그
  text: Datadog 동적 계측을 사용하여 재배치 없이 애플리케이션 로그 추가
is_beta: false
kind: 설명서
private: false
title: 동적 계측
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에 대해 동적 계측이 지원되지 않습니다.</div>
{{< /site-region >}}


## 개요

동적 계측 기능을 사용하면 재시작 없이 실행 중인 프로덕션 시스템에 계측 기능을 추가할 수 있고 타사 라이브러리를 포함한 애플리케이션 코드의 어느 위치에서도 계측 기능을 추가할 수 있습니다. Datadog UI에서 로그, 메트릭, 스팬(span) 및 해당 태깅에 대한 원격 계측 기능을 추가하거나 수정할 수 있습니다. 동적 계측 기능은 오버헤드가 적고 시스템에 부작용이 없습니다.

## 시작하기

### 전제조건

동적 계측에는 다음 사항이 필요합니다:

- [Datadog Agent][1] 7.44.0 이상이 서비스와 함께 설치됩니다.
- [원격 설정][2]은 해당 에이전트에서 활성화됩니다.
- 자바(Java) 애플리케이션의 경우 추적 라이브러리 [`dd-trace-java`][3] 1.24.0 이상입니다.
- 파이썬(Python) 애플리케이션의 경우 추적 라이브러리[`dd-trace-py`][4] 2.2.0 이상입니다.
- .NET 애플리케이션의 경우 추적 라이브러리 [`dd-trace-dotnet`][5] 2.42.0 이상입니다.
- [통합 서비스 태깅][6] `service`, `env`, and `version` 태그가 배포에 적용됩니다.
- 선택적으로 [소스 코드 통합][7]이 서비스에 대해 설정됩니다.
- 동적 계측 페이지에 액세스하려면 **동적 계측 읽기 설정** (`debugger_read`) 권한이 필요합니다
- 계측을 만들거나 수정하려면 **동적 계측 쓰기 설정** (`debugger_write`) 권한이 필요합니다. 
- **동적 계측 읽기 설정** (`debugger_capture_variables`) 권한은 **방식 파라미터 및 로컬 변수 캡처** 옵션을 사용하는 데 필요합니다.

 역할 및 사용자에게 역할을 할당하는 방법에 대한 자세한 내용은 [역할 기반 액세스 제어][8]를 참조하세요.

### 로그 인덱스 생성하기

동적 계측은 Datadog로 전송되고 일반 애플리케이션 로그와 함께 나타나는 "동적 로그"를 만듭니다.

[제외 필터][9]를 사용하는 경우 동적 계측 로그가 필터링되지 않았는지 확인합니다:

1. 로그 인덱스를 생성하고 **샘플링 없음**을 사용하여 원하는 보존으로 [구성합니다][10].
2. `source:dd_debugger` 태그에 일치하도록 필터를 설정합니다. 모든 동적 계측 로그에는 이 소스가 있습니다.
3. 첫 번째 일치 항목이 중요하므로 해당 태그와 일치하는 필터를 사용하여 새 인덱스가 다른 인덱스보다 우선 순위로 오는지 확인합니다.

### 동적 계측 활성화하기

서비스에서 동적 계측을 활성화하려면 [인앱 설정 페이지][16]로 이동합니다. 

자세한 설명을 보려면 아래에서 런타임을 선택하세요:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## 동적 계측 탐색하기

동적 계측은 런타임에 애플리케이션이 수행하는 작업을 이해하는 데 도움이 됩니다. 동적 계측 프로브를 추가하면 코드를 변경하거나 다시 배포할 필요 없이 애플리케이션에서 추가 데이터를 내보냅니다.

### 프로브 사용하기

프로브를 사용하면 프로그램 실행을 중단하지 않고도 코드의 특정 지점에서 데이터를 수집할 수 있습니다. 

프로브를 사용하면 코드를 변경하거나 배포하거나 서비스를 다시 시작할 필요 없이 실행 중인 애플리케이션에 동적 로그, 메트릭, 스팬을 추가하여 통합 가시성을 향상시킬 수 있습니다. 또한, 사용자 환경을 방해하거나 오랜 시간 동안 배포할 필요 없이 즉시 데이터를 수집할 수 있습니다.

개발자는 프로브를 '중단되지 않는 중단점'이라고 생각할 수도 있습니다. 기존 디버깅에서 중단점은 프로그램에서 실행이 중지되는 지점으로, 개발자는 해당 지점에서 프로그램의 상태를 검사할 수 있습니다. 그러나 실제 프로덕션 환경에서는 프로그램 실행을 중단하는 것이 실용적이지 않거나 불가능하기도 합니다. 프로브는 프로덕션 환경의 변수 상태를 침해하지 않고 검사할 수 있도록 함으로써 이러한 공백을 메워줍니다.

### 프로브 생성하기

모든 프로브 유형은 동일한 초기 설정이 필요합니다:

1. [동적 계측 페이지][12]로 이동합니다.
1. 오른쪽 상단에 있는 **Create Probe**를 클릭하거나 서비스의 세개의 점 메뉴를 클릭한 후 **Add a probe for this service**를 선택합니다.
1. 미리 입력되지 않은 경우 서비스, 런타임, 환경 및 버전을 선택합니다.
1. 소스 코드에서 클래스와 메서드 또는 소스 파일과 라인을 선택하여 프로브를 설정할 위치를 지정합니다. 서비스에 대한 소스 코드 통합을 설정하면 자동 완성 기능이 파일 선택에 대한 제안을 표시하고 해당 줄을 선택할 수 있도록 파일 코드를 표시합니다.

각 프로브 유형에 대한 구체적인 작성 단계는 아래의 개별 프로브 유형을 참조하세요.

또는 다음과 같은 다른 컨텍스트에서 프로브를 생성할 수 있습니다:

프로파일링
: 프로파일러 플레임 그래프 프레임의 컨텍스트 메뉴에서 **Instrument this frame with probe**를 선택하여 메서드에 대한 프로브를 만들 수 있습니다.

오류 추적
: 스택 트레이스에서 스택 프레임 위에 마우스를 놓고 **Instrument**를 클릭합니다.  이렇게 하면 문제 컨텍스트로 프로브 생성 양식이 미리 채워집니다.

### 로그 프로브 생성하기

*로그 프로브*는 실행될 때 로그를 내보냅니다. 

로그 프로브를 생성하는 방법:

1. 프로브 유형으로 **Log**를 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)(서비스, 환경, 버전 및 프로브 위치 선택)을 완료합니다.
1. 로그 메시지 템플릿을 정의합니다. 동적 계측 표현식 언어를 사용하여 실행 컨텍스트의 값을 참조할 수 있습니다.
1. 필요에 따라 프로브에서 추가 데이터 캡처를 활성화합니다(베타).
1. 필요에 따라 동적 계측 표현식 언어를 사용하여 조건을 정의합니다. 표현식이 true로 평가되면 로그가 내보내집니다.

로그 프로브는 지정된 환경 및 버전과 일치하는 모든 서비스 인스턴스에서 기본적으로 활성화됩니다. 서비스의 각 인스턴스에서 초당 최대 5000회가 실행되도록 속도가 제한되어 있습니다.

모든 로그 프로브에 로그 메시지 템플릿을 설정해야 합니다. 템플릿은 중괄호 안에 [표현식][15]을 포함하는 것을 지원합니다. 예: `User {user.id} purchased {count(products)} products`

[표현식 언어][15]를 사용하여 로그 프로브에 대한 조건을 설정할 수도 있습니다. 표현식은 부울로 평가되어야 합니다. 식이 true이면 프로브가 실행되고, 식이 false이면 데이터를 캡처하거나 내보내지 않습니다.

{{< img src="dynamic_instrumentation/log_probe.png" alt="동적 계측 로그 프로브 만들기" >}}

**베타**: 로그 프로브에서 **메사드 파라미터 및 로컬 변수 캡처**를 활성화하면 모든 실행 컨텍스트가 로그 이벤트에 추가됩니다:
  - **메서드 인수**, **로컬 변수** 및 **필드**는 다음과 같은 기본 제한이 있습니다:
    - 세 가지 수준의 참조를 따릅니다(UI에서 설정 가능).
    - 컬렉션 내 첫 번째 100개 항목.
    - 문자열 값의 경우 첫 255자.
    - 개체 내의 20개 필드. 정적 필드는 수집되지 않습니다.
  - **스택 트레이스**를 호출합니다.
  - 포착된 것과 포착되지 않은 **예외**.

이 설정이 활성화된 프로브는 초당 1회 히트로 속도가 제한됩니다.

<div class="alert alert-warning"><p><strong>경고: 캡처된 데이터에는 개인 정보, 암호 및 AWS 키와 같은 민감한 정보가 포함되어 있을 수 있습니다.</strong></p><p>이 정보가 올바르게 수정되었는지 확인하려면:<ul>
<li>Datadog 동적 계측은 민감한 정보를 수정하는 몇 가지 기술을 사용합니다. 기본 메커니즘 또는 필요에 맞게 확장하는 방법에 대한 자세한 내용은 <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">민감한 데이터 스크러빙</a>을 참조하세요.</li>
<li><strong>메서드 파라미터 및 로컬 변수 캡처</strong> 옵션을 해제하고 로그 메시지 템플릿에 포함할 변수를 명시적으로 선택합니다. 이렇게 하면 로그 프로브에 특정 변수와 관련된 데이터만 포함되므로 의도치 않게 민감한 데이터를 유출할 위험이 줄어듭니다. </li>
<li>Datadog 계정의 관리자로서 다른 사용자가 <strong>메서드 파라미터 및 로컬 변수 캡처</strong> 옵션을 사용할 수 없도록 하려면 동적 계측 캡처 변수 (<code>debugger_capture_variables</code>) 권한을 취소할 수 있습니다. </li></ul></p><p>또는 이 데이터를 기록해야 하나 Datadog 제품에서 액세스할 수 있는 것과 관련된 위험을 완화하려면 <code>source:dd_debugger</code>에서 <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">제한 쿼리</a>를 설정하여 캡처된 데이터를 볼 수 있는 조직의 사용자를 제한할 수 있습니다.</p></div>

### 메트릭 프로브 생성

*메트릭 프로브*는 실행 시 메트릭을 방출합니다.

메트릭 프로브를 생성하려면:

1. 프로브 유형으로 **Metric**을 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)(서비스, 환경, 버전 및 프로브 위치 선택)을 완료합니다.
1. `dynamic.instrumentation.metric.probe.` 접두사가 붙은 메트릭의 이름을 지정합니다.
1. 메트릭 유형(카운트, 게이지 또는 히스토그램)을 선택합니다.
1. [동적 계측 표현식 언어][15]를 사용하여 메트릭의 값을 선택합니다. 메서드 파라미터, 로컬 변수, 클래스 필드 또는 숫자 값을 산출하는 표현식 등 실행 컨텍스트에서 원하는 숫자 값을 사용할 수 있습니다. 카운트 메트릭의 경우 이는 선택 사항이며, 생략할 경우 호출할 때마다 카운트가 1씩 증가합니다.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="동적 계측 메트릭 프로브 생성" >}}

메트릭 프로브는 설정된 환경 및 버전과 일치하는 모든 서비스 인스턴스에서 자동으로 활성화됩니다. 메트릭 프로브는 속도 제한이 없으며 메서드나 라인이 호출될 때마다 실행됩니다.

동적 계측 메트릭 프로브는 다음 메트릭 유형을 지원합니다:

- **카운트**: 주어진 메서드 또는 라인이 실행된 횟수를 카운트합니다. [메트릭 표현식][15]과 결합해 변수의 값을 사용하여 카운트를 증가시킬 수 있습니다.
- **게이지**: 변수의 마지막 값을 기준으로 게이지를 생성합니다. 이 메트릭에는 [메트릭 표현식][15]이 필요합니다.
- **히스토그램**: 변수의 통계적 분포를 생성합니다. 이 메트릭을 사용하려면 [메트릭 표현식][15]이 필요합니다.

### 스팬 프로브 생성

*스팬 프로브*는 메서드를 실행할 때 스팬을 방출합니다.

스팬 프로브를 생성하려면:

1. 프로브 유형으로 **Span**을 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)(서비스, 환경, 버전 및 프로브 위치 선택)을 완료합니다.

{{< img src="dynamic_instrumentation/span_probe.png" alt="동적 계측 스팬 프로브 생성" >}}

[커스텀 계측으로 새로운 스팬을 생성하는][13] 대신 *스팬 프로브*를 사용할 수 있습니다. 메서드에서 예외가 발생하면 예외에 대한 세부 정보가 새로 생성된 스팬의 `error` 태그와 연결됩니다.

### 스팬 태그 프로브 생성

*스팬 태그* 프로브는 기존 스팬에 태그 값을 추가합니다. _활성_스팬 또는 _서비스 항목_스팬에 태그를 추가할 수 있습니다.
내부 스팬은 기본적으로 인덱싱되지 않으므로 애플리케이션 성능 모니터링(APM)에서 검색되지 않을 수 있음을 유의하세요.

스팬 태그 프로브를 생성하려면:

1. 프로브 유형으로 **Span Tag**를 선택합니다.
1. [일반 프로브 설정](#creating-a-probe)(서비스, 환경, 버전 및 프로브 위치 선택)을 완료합니다.
1. 태그의 이름을 지정합니다.
1. [동적 계측 표현식 언어][15]를 사용하여 태그 값을 지정합니다.
1. 필요에 따라 동적 계측 표현식 언어를 사용하여 조건을 정의하세요. 태그는 표현식이 true로 평가될 때만 추가됩니다.
1. 필요에 따라 각각 고유한 이름, 표현식 및 선택적 조건이 포함된 추가 태그를 추가합니다.


{{< img src="dynamic_instrumentation/span_tag_probe.png" alt="동적 계측 스팬 태그 프로브 생성" >}}

[커스텀 계측을 사용하여 코드에 태그를 추가하는][14] 대신 *스팬 태그 프로브*를 사용할 수 있습니다.


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