---
app_id: sap-hana
app_uuid: 53d66afa-de92-4f09-9514-778324f38f5c
assets:
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sap_hana.uptime
      metadata_path: metadata.csv
      prefix: sap_hana.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10076
    source_type_name: SAP HANA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- sap
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md
display_on_public_website: true
draft: false
git_integration_title: sap_hana
integration_id: sap-hana
integration_title: SAP HANA
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: sap_hana
public_title: SAP HANA
short_description: SAP HANA 시스템에서 메모리, 네트워크, 볼륨 및 기타 메트릭을 모니터링하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::SAP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: SAP HANA 시스템에서 메모리, 네트워크, 볼륨 및 기타 메트릭을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [SAP HANA][1] 2.0, SPS 2를 모니터링합니다.

## 설정

### 설치

SAP HANA 점검은 [Datadog 에이전트 ][2] 패키지에 포함되어 있습니다. 이 통합을 사용하려면 [hdbcli][3] 라이브러리를 수동 설치해야 합니다.


Unix용:

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install hdbcli==2.21.28
```

윈도우즈(Windows)용:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install hdbcli==2.21.28
```

#### HANA 준비

특정 보기를 쿼리 하려면 선택한 HANA 모니터링 사용자에게 특정 권한을 부여해야 합니다. 자세한 내용은 [권한 부여하기](#granting-privileges)를 참조하세요.

HANA 테넌트, 단일 테넌트 및 시스템 데이터베이스의 포트 번호를 설정하는 방법을 알아보려면 [SAP 연결 설명서][4]를 참조하세요.

##### 사용자 생성

1. 시스템 데이터베이스에 연결하고 다음 명령을 실행하여 사용자를 만듭니다.

   ```shell
   CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>;
   ```

2. 다음 명령을 실행하여 사용자가 시스템에 연결할 수 있도록 허용합니다.

   ```shell
   ALTER USER <USER> ENABLE CLIENT CONNECT;
   ```

3. (선택 사항) 서비스 중단을 방지하려면 오래 사용 가능한 비밀번호를 만드는 것이 좋습니다.

   ```shell
   ALTER USER <USER> DISABLE PASSWORD LIFETIME;
   ```

##### 권한 부여

1. 다음 명령을 실행하여 모니터링 역할을 만듭니다(이 예에서는 `DD_MONITOR`로 명명):

   ```shell
   CREATE ROLE DD_MONITOR;
   ```

2. 다음 명령을 실행하여 모든 시스템 보기에 읽기 전용 액세스 권한을 부여합니다:

   ```shell
   GRANT CATALOG READ TO DD_MONITOR;
   ```

3. 그런 다음 다음 명령을 실행하여 각 시스템 보기에서 선택 권한을 부여합니다.

   ```shell
   GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR;
   GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR;
   ```

4. 마지막으로 다음 명령을 실행하여 원하는 사용자에게 모니터링 역할을 할당합니다.

   ```shell
   GRANT DD_MONITOR TO <USER>;
   ```

### 설정

1. 에이전트 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `sap_hana.d/conf.yaml` 파일을 편집하여 sap_hana 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 sap_hana.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

#### 로그 수집

1. SAP HANA 데이터베이스에서 감사 로그를 읽을 수 있는지 확인하려면 다음 명령을 실행합니다.

    ```shell
    GRANT AUDIT READ TO DD_MONITOR;
    GRANT SELECT ON SYS.AUDIT_LOG TO DD_MONITOR
    ```

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `sap_hana.d/conf.yaml` 파일에 추가하여 SAP HANA 로그 수집을 시작하고 `service` 값을 조정하여 환경에 맞게 설정합니다.

   ```yaml
   logs:
     - type: integration
       source: sap_hana
       service: sap_hana
   ```

    사용 가능한 모든 설정 옵션은 [샘플 sap_hana.d/conf.yaml][5]을 참조하세요.

3. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션에서 `sap_hana`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "sap_hana" >}}


### 이벤트

SAP HANA에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "sap_hana" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.sap.com/products/hana.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.org/project/hdbcli/
[4]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[5]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/