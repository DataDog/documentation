---
app_id: ibm-ace
app_uuid: 81e0df5f-8778-4558-88c3-884dcab5ce89
assets:
  dashboards:
    IBM ACE Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_ace.messages.current
      metadata_path: metadata.csv
      prefix: ibm_ace.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10262
    source_type_name: IBM ACE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_ace/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_ace
integration_id: ibm-ace
integration_title: IBM ACE
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_ace
public_title: IBM ACE
short_description: IBM ACE 리소스 통계 및 메시지 플로 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: IBM ACE 리소스 통계 및 메시지 플로 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM ACE
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent를 통해 [IBM ACE][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### IBM MQ

IBM ACE에서 메트릭 메시지를 받아 처리하려면 [IBM MQ][3] 서버가 필요합니다.

<div class="alert alert-warning">
Linux의 경우 계속하기 전에 <a href="https://docs.datadoghq.com/integrations/ibm_mq/">IBM MQ 설정</a>에 설명된 대로 LD_LIBRARY_PATH 환경 변수를 설정해야 합니다.
</div>

### IBM ACE

1. 최소 12.0.2.0 버전 이상이 설치되어 있는지 확인합니다.
2. 다음과 같이 `<MQ_POLICY_NAME>.policyxml` 형식으로 이름이 지정된 [MQEndpoint 정책][4] 파일을 적용합니다.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <policies>
        <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
            <connection>CLIENT</connection>
            <destinationQueueManagerName>...</destinationQueueManagerName>
            <queueManagerHostname>...</queueManagerHostname>
            <listenerPortNumber>1414</listenerPortNumber>
            <channelName>...</channelName>
            <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
        </policy>
    </policies>
    ```
3. `mqsisetdbparms -n mq::<MQ_SECURITY_IDENTITY> -u <user> -p <password>`를 실행하여 자격 증명을 [설정][5]합니다.
4. `server.conf.yaml` 파일을 다음 설정으로 업데이트하세요.
    ```yaml
    remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
    Events:
      OperationalEvents:
        MQ:
          enabled: true
      BusinessEvents:
        MQ:
          enabled: true
          outputFormat: json
    Statistics:
      Resource:
        reportingOn: true
      Snapshot:
        publicationOn: active
        outputFormat: json
        accountingOrigin: basic
        nodeDataLevel: advanced
        threadDataLevel: basic
    Monitoring:
      MessageFlow:
        publicationOn: active
        eventFormat: MonitoringEventV2
    AdminLog:
      enabled: true
      fileLog: true
      consoleLog: true
      consoleLogFormat: ibmjson
    ```
5. IBM ACE를 다시 시작합니다.

### 설치

IBM ACE 점검은 [Datadog Agent][6] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `ibm_ace.d/conf.yaml` 파일을 편집하여 ibm_ace 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 ibm_ace.d/conf.yaml][7]을 참조하세요.

2. [Agent를 재시작합니다][8].

### 검증

[Agent의 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `ibm_ace`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ibm_ace" >}}


### 이벤트

IBM ACE 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ibm_ace" >}}


### 로그 수집

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
    logs_enabled: true
    ```

2. IBM ACE 로그 수집을 시작하려면 `ibm_ace.d/conf.yaml` 파일에 이 구성 블록을 추가하세요.

    ```yaml
    logs:
      - type: file
        path: /home/aceuser/ace-server/log/integration_server.txt
        source: ibm_ace
    ```

    `path` 파라미터 값을 환경에 맞게 바꾸세요. 사용할 수 있는 설정 옵션을 모두 보려면  [샘플 `ibm_ace.d/conf.yaml`][7]을 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.


[1]: https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://www.ibm.com/products/mq
[4]: https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy
[5]: https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/assets/service_checks.json
[12]: https://docs.datadoghq.com/ko/help/