---
code_lang: Kubernetes
code_lang_weight: 20
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
title: Kubernetes 환경에서 Ruby용 App 및 API Protection 설정
type: multi-code-lang
---

{{% app-and-api-protection-ruby-setup-options platform="kubernetes" %}}

{{% app-and-api-protection-ruby-overview %}}

## 사전 필수 조건

- Kubernetes 클러스터
- Docker로 컨테이너화된 Ruby 애플리케이션
- 클러스터에 접근하도록 구성된 kubectl
- Helm(Agent 설치에 권장)
- Datadog API 키
- Datadog Ruby 트레이싱 라이브러리([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치하기

[Kubernetes 설정 지침](/agent/?tab=cloud_and_container)에 따라 Datadog Agent를 설치하세요.

## 2. App 및 API Protection 모니터링을 활성화합니다.

Ruby 애플리케이션에서 `datadog` gem을 설치하고 구성합니다.

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Gemfile에 `datadog` gem을 추가합니다.

```ruby
gem 'datadog', '~> 2.0'
```

이니셜라이저를 추가하여 Datadog 라이브러리 구성:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.agent.host = 'your_agent_host'

  c.tracing.enabled = true

  # Rails에 대한 트레이싱 계측은 명시적으로 활성화해야 합니다.
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # App 및 API Protection을 사용하려면 Rails 계측이 필요합니다.
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

`datadog` gem을 Gemfile에 추가하고 자동 계측 필수 지정:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

애플리케이션 환경 변수를 설정하세요. 다음 항목을 배포 구성 파일에 추가합니다.

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app
spec:
  template:
    spec:
      containers:
      - name: your-app
        image: your-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_API_SECURITY_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["bin/rails"]
        args: ["server"]
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

이니셜라이저를 추가하여 Datadog 라이브러리 구성:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.agent.host = 'your_agent_host'

  # Disable APM Tracing
  c.tracing.enabled = false

  # Tracing instrumentation for Rails has to be explicitly enabled
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # Rails instrumentation is required for App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

`datadog` gem을 Gemfile에 추가하고 자동 계측 필수 지정:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

애플리케이션에 대한 환경 변수를 설정하세요. 다음 항목을 배포 구성 파일에 추가합니다.

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app
spec:
  template:
    spec:
      containers:
      - name: your-app
        image: your-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_API_SECURITY_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["bin/rails"]
        args: ["server"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. 애플리케이션 실행

업데이트된 배포를 적용합니다.

```bash
kubectl apply -f your-deployment.yaml
```

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