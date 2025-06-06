---
app_id: proxysql
app_uuid: aadfa11b-3de5-4827-9cdd-888c4e9587d0
assets:
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: proxysql.active_transactions
      metadata_path: metadata.csv
      prefix: proxysql.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10096
    source_type_name: ProxySQL
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
- 로그 수집
- 캐싱(caching)
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md
display_on_public_website: true
draft: false
git_integration_title: proxysql
integration_id: proxysql
integration_title: ProxySQL
integration_version: 7.1.0
is_public: true
manifest_version: 2.0.0
name: proxysql
public_title: ProxySQL
short_description: ProxySQL 메트릭 및 로그를 수집합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 카테고리::데이터 저장
  - Category::Log Collection
  - 카테고리::캐싱(Caching)
  - 제공::통합
  configuration: README.md#Setup
  description: ProxySQL 메트릭 및 로그를 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ProxySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [ProxySQL][1]을 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

ProxySQL 통합은 [Datadog 에이전트][3] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

#### SSL 활성화
완전 SSL/TLS 검증을 사용해 ProxySQL에 연결하려면 `conf.yaml`에서 `tls_verify` 옵션을 활성화합니다. SSL/TLS에 연결할 때 필요한 인증서와 비밀번호를 포함하세요.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. 에이전트의 구성 디렉토리 루트에 있는 `conf.d/` 폴더에서 `proxysql.d/conf.yaml` 파일을 편집하여 ProxySQL 성능 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 proxysql.d/conf.yaml][2]을 참고하세요.

2. [에이전트를 재시작][3]하세요.

##### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 원하는 로그 파일을 `proxysql.d/conf.yaml` 파일에 추가하여 ProxySQL 로그 수집을 시작하세요.

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

    `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 proxysql.d/conf.yaml][2]을 참고하세요.

3. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

#### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `proxysql`                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### 로그 수집

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `proxysql`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "proxysql" >}}


### 이벤트

ProxySQL 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "proxysql" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.



[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help