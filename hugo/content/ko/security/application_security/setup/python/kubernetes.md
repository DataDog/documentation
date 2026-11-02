---
code_lang: kubernetes
code_lang_weight: 20
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
title: Kubernetes에서 Python용 App and API Protection 설정
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_python_overview %}}

## 전제 조건 {#prerequisites}

- Kubernetes 클러스터
- Docker로 컨테이너화된 Python 애플리케이션
- 클러스터에 액세스하도록 구성된 kubectl
- Helm(Agent 설치 권장)
- Datadog API 키
- Datadog Python SDK([버전 요구 사항][1] 참조)

## 1. Datadog Agent 설치 {#1-installing-the-datadog-agent}

[Kubernetes 설정 지침](/agent/?tab=cloud_and_container)에 따라 Datadog Agent를 설치합니다.

## 2. App and API Protection 모니터링 활성화 {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection 모니터링 수동 활성화 {#manually-enabling-app-and-api-protection-monitoring}

init 컨테이너를 사용하거나 애플리케이션의 Dockerfile에서 Datadog Python SDK를 설치합니다.

```dockerfile
RUN pip install ddtrace
```

Datadog을 통해 서비스를 구성하고 실행합니다.

{{% collapse-content title="APM 추적 활성화" level="h4" %}}

환경 변수를 사용하여 App and API Protection을 활성화한 상태에서 Python 애플리케이션을 시작합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM 추적 비활성화" level="h4" %}}
App and API Protection을 활성화한 상태에서 APM 추적을 비활성화하려면 APM 추적 변수를 'false'로 설정해야 합니다.

환경 변수를 사용하여 App and API Protection을 활성화한 상태에서 Python 애플리케이션을 시작합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. 애플리케이션 실행 {#3-run-your-application}

업데이트된 배포를 적용합니다.

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## 문제 해결 {#troubleshooting}

Python 애플리케이션에 App and API Protection을 설정하는 과정에서 문제가 발생할 경우, [Python App and API Protection 문제 해결 가이드][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/python
[2]: /ko/security/application_security/setup/python/troubleshooting