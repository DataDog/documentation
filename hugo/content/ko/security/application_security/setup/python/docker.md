---
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: Docker에서 Python용 App and API Protection 설정
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="docker" %}}

{{% app_and_api_protection_python_overview %}}

## 전제 조건 {#prerequisites}

- 호스트에 설치된 Docker
- Docker로 컨테이너화된 Python 애플리케이션
- Datadog API 키
- Datadog Python SDK([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치 {#1-installing-the-datadog-agent}

[Docker용 설정 지침](/agent/?tab=cloud_and_container)에 따라 Datadog Agent를 설치합니다.

## 2. App and API Protection 모니터링 활성화 {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection 모니터링 수동 활성화 {#manually-enabling-app-and-api-protection-monitoring}

{{% collapse-content title="APM 추적 활성화" level="h4" %}}

Dockerfile에 다음 환경 변수를 추가합니다.

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM 추적 비활성화" level="h4" %}}
App and API Protection을 활성화한 상태에서 APM 추적을 비활성화하려면 APM 추적 변수를 'false'로 설정해야 합니다.

Dockerfile에 다음 환경 변수를 추가합니다.

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. 애플리케이션 실행 {#3-run-your-application}
이미지를 빌드한 다음 컨테이너를 실행합니다.

컨테이너를 실행할 때 다음을 수행합니다.
1. 컨테이너를 Datadog Agent와 동일한 Docker 네트워크에 연결합니다.
2. 필수 환경 변수를 설정합니다.

```bash
docker run -d \
  --name your-python-app \
  your-python-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## 문제 해결 {#troubleshooting}

Python 애플리케이션에 App and API Protection을 설정하는 과정에서 문제가 발생할 경우, [Python App and API Protection 문제 해결 가이드][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/python
[2]: /ko/security/application_security/setup/python/troubleshooting