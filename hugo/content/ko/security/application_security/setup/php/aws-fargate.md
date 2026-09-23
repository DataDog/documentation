---
code_lang: aws-fargate
code_lang_weight: 60
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
title: AWS Fargate에서 PHP용 App and API Protection 설정
type: multi-code-lang
---
{{% app_and_api_protection_php_overview %}}

## 전제 조건 {#prerequisites}

- AWS Fargate 환경
- Docker로 컨테이너화된 PHP 애플리케이션
- 적절한 권한으로 구성된 AWS CLI
- Datadog API 키
- Datadog PHP SDK ([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치 {#1-installing-the-datadog-agent}

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
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

## 2. App and API Protection 모니터링 활성화 {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection 모니터링 수동 활성화 {#manually-enabling-app-and-api-protection-monitoring}

Dockerfile에 Datadog PHP 라이브러리가 포함되어 있는지 확인합니다.

Dockerfile에 다음을 추가하세요.

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% collapse-content title="APM 추적 활성화" level="h4" %}}

App and API Protection 구성이 적용된 PHP 애플리케이션 컨테이너를 포괄하도록 작업 정의를 업데이트합니다.

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM 추적 비활성화" level="h4" %}}
App and API Protection을 활성화한 상태에서 APM 추적을 비활성화하려면 APM 추적 변수를 'false'로 설정해야 합니다.

App and API Protection 구성이 적용된 PHP 애플리케이션 컨테이너를 포괄하도록 작업 정의를 업데이트합니다.

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
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
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. 애플리케이션 실행 {#3-running-your-application}

업데이트된 구성으로 Fargate 작업을 배포합니다.

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## 문제 해결 {#troubleshooting}

PHP 애플리케이션에 App and API Protection을 설정하는 과정에서 문제가 발생할 경우, [PHP App and API Protection 문제 해결 가이드][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/php
[2]: /ko/security/application_security/setup/php/troubleshooting