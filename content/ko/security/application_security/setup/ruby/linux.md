---
code_lang: linux
code_lang_weight: 30
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection 작업 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: Linux 환경에서 Ruby용 App 및 API Protection 설정
type: multi-code-lang
---

{{% app-and-api-protection-ruby-setup-options platform="linux" %}}

{{% app-and-api-protection-ruby-overview %}}

## 사전 필수 조건

- Linux 운영 체제
- Ruby 애플리케이션
- root 또는 sudo 권한
- Datadog API 키
- Datadog Ruby 트레이싱 라이브러리([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치하기

[Linux 호스트용 설정 지침](/agent/?tab=Linux).에 따라 Datadog Agent를 설치하세요.

## 2. App 및 API Protection 모니터링을 활성화합니다.

Ruby 애플리케이션에서 `datadog` gem을 설치하고 구성합니다.

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Gemfile에 `datadog` gem을 추가합니다.

```ruby
gem 'datadog', '~> 2.0'
```

종속성 설치:

```bash
bundle install
```

이니셜라이저를 추가하여 Datadog 라이브러리 구성:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.tracing.enabled = true

  # Rails에 대한 트레이싱 계측(instrumentation)은 명시적으로 활성화해야 합니다.
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  #App 및 API Protection을 사용하려면 Rails 계측이 필요합니다.
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

`datadog` gem을 Gemfile에 추가하고 자동 계측 필수 지정:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

종속성 설치:

```bash
bundle install
```

애플리케이션 환경 변수를 설정하세요. 다음 항목을 배포 구성 파일 또는 셸 환경에 추가합니다.

```bash
export DD_APPSEC_ENABLED=true
export DD_API_SECURITY_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}

App 및 API Protection을 활성화한 상태에서 APM 트레이싱을 비활성화하려면 APM 트레이싱 설정을 false로 지정해야 합니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

Gemfile에 `datadog` gem을 추가합니다.

```ruby
gem 'datadog', '~> 2.0'
```

종속성 설치:

```bash
bundle install
```

이니셜라이저를 추가하여 Datadog 라이브러리 구성:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  # Disable APM Tracing
  c.tracing.enabled = false

  # Rails 트레이싱 계측은 명시적으로 활성화해야 합니다.
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # App 및 API Protection을 사용하려면 Rails 계측이 필요합니다.
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment Variables" %}}

`datadog` gem을 Gemfile에 추가하고 자동 계측 필수 지정:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

종속성 설치:

```bash
bundle install
```

애플리케이션에 대한 환경 변수를 설정하세요. 다음 항목을 배포 구성 파일 또는 셸 환경에 추가합니다.

```bash
export DD_APPSEC_ENABLED=true
export DD_API_SECURITY_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3: 애플리케이션 실행

위 설정으로 애플리케이션을 시작하세요.

## 4. 설정 확인

App 및 API Protection이 올바르게 작동하는지 확인하려면,

1. 트래픽 일부를 애플리케이션에 전송합니다.
2. Datadog에서 [App 및 API Protection 서비스 인벤토리](https://app.datadoghq.com/security/appsec/inventory/services)를 확인합니다.
3. 서비를 찾은 다음 **Coverage** 열에서 App 및 API 보호가 활성화되어 있는지 확인합니다.

## 트러블슈팅

Ruby 애플리케이션에서 App 및 API Protection을 설정하는 중 문제가 발생하면 [Ruby App 및 API Protection 문제 해결 가이드][2]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/ruby/compatibility
[2]: /ko/security/application_security/setup/ruby/troubleshooting