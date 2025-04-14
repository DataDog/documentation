---
aliases:
- /ko/security_platform/application_security/setup_and_configure
- /ko/security/application_security/setup_and_configure
- /ko/security/application_security/threats/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리를 통해 위협으로부터 보호
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: 즉시 사용 가능한 애플리케이션 보안 관리 규칙
- link: /security/application_security/add-user-info/
  tag: 설명서
  text: 트레이스에 사용자 정보 추가
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: ASM 트러블슈팅
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: Datadog에서 애플리케이션 보안 관리가 작동하는 방식
title: 라이브러리 구성
---


## 클라이언트 IP 헤더 구성

ASM은 `X-Forwarded-For`와 같이 잘 알려진 헤더에서 자동으로 `http.client_ip`를 해결하려고 시도합니다. 이 필드에 커스텀 헤더를 사용하거나 확인 알고리즘을 우회하려면 `DD_TRACE_CLIENT_IP_HEADER`를 설정합니다. 이 변수가 설정되면 라이브러리는 클라이언트 IP에 대해 지정된 헤더만 확인합니다.

## 인증된 악의적인 행위자 추적

치명적인 공격은 가장 민감한 엔드포인트에 액세스할 수 있는 인증된 사용자에 의해 수행됩니다. 의심스러운 보안 활동을 생성하는 악의적인 행위자를 식별하려면 표준화된 사용자 태그로 서비스를 계측하여 트레이스에 사용자 정보를 추가합니다. 루트 스팬에 커스텀 태그를 추가하거나 계측 함수를 사용할 수 있습니다.

Datadog 트레이싱 라이브러리는 호환 가능한 인증 프레임워크가 사용 중이고 ASM이 활성화된 경우 사용자 로그인 및 등록 이벤트를 감지하려고 시도합니다.

사용자 활동을 수동으로 추적하는 방법에 대한 자세한 내용은 [사용자 활동 추적][1]을 참조하거나 자동 추적 [해제 방법][7]을 참조하세요.

## 탐지 트리거에서 특정 파라미터 제외하기

ASM 신호 또는 보안 트레이스가 오탐일 수 있습니다. 예를 들어 ASM이 동일한 보안 트레이스를 반복적으로 감지하고 신호가 생성되지만 해당 신호가 검토 결과 위협이 아닌 것으로 확인되는 경우입니다.

규칙의 이벤트를 무시하는 항목을 패스리스트에 추가하여 노이즈가 많은 신호 패턴을 제거하고 합법적인 보안 트레이스에 집중할 수 있습니다.

패스리스트 항목을 추가하려면 다음 중 하나를 수행합니다:

- [ASM Signals][4]에서 신호를 클릭하고 *Add to passlist* suggested action 옆에 있는 **Add Entry** 링크를 클릭합니다. 이 방법은 대상 서비스에 대한 항목을 자동으로 추가합니다.
- [Passlist Configuration][5]으로 이동하여 사용자 기준에 따라 새 허용 목록 항목을 수동으로 구성하세요.

**참고**: 패스리스트와 일치하는 요청(트레이스)에는 요금이 청구되지 않습니다.

## 데이터 보안 고려사항

Datadog으로 수집하는 데이터에는 필터링, 난독화, 스크러빙, 필터링, 수정 또는 수집하지 않으려는 민감한 정보가 포함될 수 있습니다. 또한 데이터에는 위협 감지가 부정확해지거나 Datadog이 서비스 보안을 정확하게 표시하지 못하게 할 수 있는 합성 트래픽이 포함될 수 있습니다.

기본적으로 ASM은 요청이 의심스러운 것으로 표시된 이유를 이해할 수 있도록 보안 추적에서 정보를 수집합니다. 데이터를 보내기 전에 ASM은 데이터가 중요하다는 것을 나타내는 패턴과 키워드를 검색합니다. 데이터가 중요하다고 간주되면 `<redacted>` 플래그로 대체됩니다. 이를 통해 요청이 의심스럽더라도 데이터 보안 문제로 인해 요청 데이터가 수집되지 않았음을 관찰할 수 있습니다. 인증된 요청의 사용자 ID와 같은 사용자 관련 데이터는 수정되는 데이터의 일부가 아닙니다.

사용자 데이터를 보호하기 위해 **ASM에서는 민감한 데이터 검사가 기본적으로 활성화됩니다**. 다음 환경 변수를 사용하여 구성을 사용자 정의할 수 있습니다. 스캐닝은 [RE2 구문][2]을 기반으로 합니다. 스캐닝을 사용자 정의하려면 다음 환경 변수의 값을 유효한 [RE2][9] 패턴으로 설정합니다.

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - 값에 일반적으로 민감한 데이터가 포함된 키를 검색하는 패턴입니다. 발견되면 키와 연결된 값 및 모든 하위 노드가 수정됩니다.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - 민감한 데이터를 나타낼 수 있는 값을 검색하는 패턴입니다. 발견되면 값과 해당 하위 노드가 모두 수정됩니다.



<div class="alert alert-info"><strong>Ruby에만 해당, <code>ddtrace</code> 버전 1.1.0부터 적용</strong>

<p>코드에서 스캔 패턴을 구성할 수도 있습니다.</p>

```ruby
Datadog.configure do |c|
  # ...

  # 커스텀 RE2 정규식 설정
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


다음은 민감한 것으로 플래그가 지정된 데이터의 예입니다.

* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

민감한 데이터를 제거하는 데 사용할 수 있는 Datadog Agent 및 라이브러리의 메커니즘에 대한 자세한 내용은 [APM 데이터 보안][3]을 참조하세요.

자동 사용자 활동 추적 모드 및 구성 방법에 대한 자세한 내용은 [자동 사용자 활동 이벤트 추적 모드][10]를 참조하세요. Datadog 라이브러리를 통해 모드에 대한 짧은 이름(`ident|anon|disabled`)이 있는 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 환경 변수를 사용하여 자동 계측을 구성할 수 있습니다.


## 커스텀 차단 페이지 또는 페이로드 구성

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM이 차단된 IP에서 발생하는 요청을 차단할 때 표시되는 페이지." width="75%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /ko/tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /ko/help/
[7]: /ko/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking
[8]: https://app.datadoghq.com/security/configuration/asm/services-config
[9]: https://github.com/google/re2/wiki/Syntax
[10]: /ko/security/application_security/threats/add-user-info/?tab=set_user#automatic-user-activity-event-tracking-modes