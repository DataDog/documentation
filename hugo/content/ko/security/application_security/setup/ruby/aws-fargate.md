---
code_lang: aws-fargate
code_lang_weight: 60
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
title: AWS Fargate에서 Ruby용 App 및 API Protection 설정
type: multi-code-lang
---

{{% app-and-api-protection-ruby-overview %}}

## 사전 필수 조건

- AWS Fargate 환경
- Docker로 컨테이너화된 Ruby 애플리케이션
- 적절한 권한으로 구성된 AWS CLI
- Datadog API 키
- Datadog Ruby 트레이싱 라이브러리([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치하기

Fargate 작업 정의에 Datadog Agent를 설치합니다.

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        }
      ]
    }
  ]
}
```

## 2. App 및 API Protection 모니터링을 활성화합니다.

Ruby 애플리케이션에서 `datadog` gem을 설치하고 구성합니다.

{{% collapse-content title="APM 트레이싱 활성화됨" level="h4" %}}
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

  # Rails의 트레이싱 계측은 명시적으로 활성화해야 합니다.
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

작업 정의를 업데이트하여 App 및 API Protection 구성 포함:

```json
{
  "containerDefinitions": [
    {
      "name": "your-app",
      "image": "your-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_API_SECURITY_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        }
      ],
      "command": [
        "bin/rails",
        "server"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}

App 및 API Protection을 활성화한 상태에서 APM 트레이싱을 비활성화하려면 APM 트레이싱 설정을 false로 지정해야 합니다.

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

APM 트레이싱을 비활성화한 상태로 App 및 API Protection 구성을 포함하도록 작업 정의를 업데이트하세요.

```json
{
  "containerDefinitions": [
    {
      "name": "your-app",
      "image": "your-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_API_SECURITY_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        }
      ],
      "command": [
        "bin/rails",
        "server"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. 애플리케이션 실행

업데이트된 구성으로 Fargate 작업 배포:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

## 4. 설정 확인

App 및 API Protection이 올바르게 작동하는지 확인하는 방법:

1. 트래픽 일부를 애플리케이션에 전송합니다.
2. Datadog에서 [App 및 API Protection 서비스 인벤토리](https://app.datadoghq.com/security/appsec/inventory/services)를 확인합니다.
3. 서비를 찾은 다음 **Coverage** 열에서 App 및 API 보호가 활성화되어 있는지 확인합니다.

## 트러블슈팅

Ruby 애플리케이션에서 App 및 API Protection을 설정하는 중 문제가 발생하면 [Ruby App 및 API Protection 문제 해결 가이드][2]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/ruby/compatibility
[2]: /ko/security/application_security/setup/ruby/troubleshooting