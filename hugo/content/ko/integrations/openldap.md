---
app_id: openldap
app_uuid: ea3487c9-2c55-417c-bed5-17a42bdf71cf
assets:
  dashboards:
    OpenLDAP Overview: assets/dashboards/openldap_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openldap.connections.current
      metadata_path: metadata.csv
      prefix: openldap.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10040
    source_type_name: OpenLDAP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openldap/README.md
display_on_public_website: true
draft: false
git_integration_title: openldap
integration_id: openldap
integration_title: OpenLDAP
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: openldap
public_title: OpenLDAP
short_description: cn=모니터링 백엔드를 사용하여 OpenLDAP 서버에서 메트릭을 수집합니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: cn=모니터링 백엔드를 사용하여 OpenLDAP 서버에서 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenLDAP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

OpenLDAP 통합을 사용하여 OpenLDAP 서버의 `cn=Monitor` 백엔드에서 메트릭을 가져옵니다.

## 설정

### 설치

OpenLDAP 통합은 에이전트와 같이 패키징되어 있습니다. 다음과 같이 OpenLDAP 메트릭 수집을 시작합니다.

1. OpenLDAP 서버에 `cn=Monitor` 백엔드를 설정합니다.
2. OpenLDAP 서버에 [에이전트를 설치][1]합니다.

### 설정

#### OpenLDAP 준비

`cn=Monitor` 백엔드가 서버에 설정되어 있지 않은 경우 다음을 따릅니다.

1. 설치에 모니터링이 활성화되어 있는 경우 다음을 점검합니다.

   ```shell
    sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
   ```

   `olcModuleLoad: back_monitor.la`가 있는 줄이 표시되고 모니터링이 이미 활성화되어 있으면 3단계로 이동합니다.

2. 다음과 같이 서버에서 모니터링을 활성화합니다.

   ```text
       cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
       dn: cn=module{0},cn=config
       changetype: modify
       add: olcModuleLoad
       olcModuleLoad: back_monitor.la
       EOF
   ```

3. `slappasswd`로 암호화된 비밀번호를 생성합니다.
4. 새 사용자를 추가합니다.

   ```text
       cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
       dn: <USER_DISTINGUISHED_NAME>
       objectClass: simpleSecurityObject
       objectClass: organizationalRole
       cn: <COMMON_NAME_OF_THE_NEW_USER>
       description: LDAP monitor
       userPassword:<PASSWORD>
       EOF
   ```

5. 모니터링 데이터베이스를 설정합니다.

   ```text
       cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
       dn: olcDatabase=Monitor,cn=config
       objectClass: olcDatabaseConfig
       objectClass: olcMonitorConfig
       olcDatabase: Monitor
       olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
       EOF
   ```

#### OpenLDAP 통합을 설정합니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

###### 메트릭 수집

1. 에이전트 설정 디렉토리 루트에 있는 `conf.d` 폴더에서 `openldap.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [openldap.d/conf.yaml 샘플][1]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Full URL of your ldap server. Use `ldaps` or `ldap` as the scheme to
     ## use TLS or not, or `ldapi` to connect to a UNIX socket.
     #
     - url: ldaps://localhost:636

       ## @param username - string - optional
       ## The DN of the user that can read the monitor database.
       #
       username: "<USER_DISTINGUISHED_NAME>"

       ## @param password - string - optional
       ## Password associated with `username`
       #
       password: "<PASSWORD>"
   ```

2. [에이전트를 재시작합니다][2].

###### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. OpenLDAP 로그 수집을 시작하려면 `openldap.d/conf.yaml` 파일에 다음 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/slapd.log
       source: openldap
       service: "<SERVICE_NAME>"
   ```

    `path`와 `service` 파라미터 값을 내 환경에 맞게 변경 및 설정하세요. 사용할 수 있는 설정 옵션 전체를 보려면 [openldap.d/conf.yaml 샘플][1]을 참고하세요.

3. [에이전트를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

###### 메트릭 수집

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `openldap`                                                                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"url":"ldaps://%%host%%:636","username":"<USER_DISTINGUISHED_NAME>","password":"<PASSWORD>"}` |

###### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "openldap", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령][2]을 실행하고 점검 섹션에서 `openldap`을 찾습니다.

## 호환성

이 점검은 다른 주요 플랫폼과 모두 호환됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "openldap" >}}


### 이벤트

Openldap 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "openldap" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/