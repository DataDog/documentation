---
app_id: mapr
app_uuid: 96cb179f-2a53-424b-95ce-302610f155eb
assets:
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mapr.metrics.submitted
      metadata_path: metadata.csv
      prefix: mapr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10073
    source_type_name: MapR
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mapr/README.md
display_on_public_website: true
draft: false
git_integration_title: mapr
integration_id: mapr
integration_title: MapR
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: mapr
public_title: MapR
short_description: MapR가 제공하는 모니터링 메트릭을 수집합니다.
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: MapR가 제공하는 모니터링 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MapR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [MapR][1] 6.1+를 모니터링합니다.

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

MapR 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다. 하지만 추가 설정 운영이 필요합니다.

#### 사전 필수 조건

- [MapR 모니터링][3]이 올바르게 실행 중입니다.
- `/var/mapr/mapr.monitoring/metricstreams` 스트림에 '사용' 권한이 있는 사용 가능한 [MapR 사용자][4](이름, 비밀번호, UID 및 GID 포함)가 있습니다. 이 사용자는 기존 사용자이거나 새로 생성된 사용자일 수 있습니다.
- **비보안 클러스터**: [클러스터 보안 없이 사칭(Impersonation) 설정하기][5]에 따라 `dd-agent` 사용자가 이 MapR 사용자를 사칭할 수 있도록 합니다.
- **보안 클러스터**: `dd-agent` 사용자가 읽을 수 있는, 해당 사용자에 대한 [장기 서비스 티켓][6]을 생성합니다.

각 노드에 대한 설치 단계:

1. [에이전트를 설치합니다][2].
2. [이 지침][7]에 따라 _mapr-streams-library_에 필요한 _librdkafka_ 라이브러리를 설치합니다.
3. 다음 명령으로 _mapr-streams-library_ 라이브러리를 설치합니다.

    `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

    에이전트 v7에서 파이썬(Python) 3을 사용하는 경우 `pip`를 `pip3`로 변경합니다.

4. `/etc/ld.so.conf` (또는 `/etc/ld.so.conf.d/`의 파일)에 `/opt/mapr/lib/`을 추가합니다. 이는 에이전트가 MapR 공유 라이브러리를 찾는 데 사용하는 _mapr-streams-library_에 필요합니다.
5. `sudo ldconfig`을 실행하여 라이브러리를 다시 로드합니다.
6. 티켓 위치를 지정하여 통합을 설정합니다.

#### 추가 참고 사항

- 클러스터에서 '보안'을 활성화하지 않은 경우 티켓 없이 계속 진행할 수 있습니다.
- 프로덕션 환경에서 gcc와 같은 컴파일 도구(mapr-streams-library 빌드에 필요)를 허용하지 않는 경우, 개발 인스턴스에서 라이브러리의 컴파일된 휠을 생성하고 컴파일된 휠을 프로덕션 호스트에 배포할 수 있습니다. 개발과 프로덕션 호스트는 컴파일된 휠이 호환될 수 있을 정도로 유사해야 합니다. `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` 을 실행하여 개발 머신에서 휠 파일을 생성할 수 있습니다. 그런 다음 프로덕션 머신에서 `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <THE_WHEEL_FILE>` 을 실행합니다.
- 에이전트 v7에서 파이썬(Python) 3을 사용하는 경우, _mapr-streams-library_를 설치할 때 `pip`을 `pip3`로 변경해야 합니다.

### 구성

#### 메트릭 수집

1. MapR 성능 데이터를 수집하려면 에이전트의 설정 디렉토리 루트의 `conf.d/` 폴더에서 `mapr.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [mapr.d/conf.yaml 샘플][8]을 참조하세요.
2. 설정에서 `ticket_location` 파라미터를 생성한 장기 티켓의 경로로 설정하세요.
3. [에이전트를 재시작합니다] [9].

#### 로그 수집

MapR은 로그에 FluentD를 사용합니다. [FluentD Datadog 플러그인][10]을 사용하여 MapR 로그를 수집합니다. 다음 명령으로 플러그인을 다운로드하여 올바른 디렉토리에 설치합니다.

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

그런 다음 `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf`를 다음 섹션으로 업데이트합니다.

```text
<match *>
  @type copy
  <store> # This section is here by default and sends the logs to ElasticCache for Kibana.
    @include /opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/es_config.conf
    include_tag_key true
    tag_key service_name
  </store>
  <store> # This section also forwards all the logs to Datadog:
    @type datadog
    @id dd_agent
    include_tag_key true
    dd_source mapr  # Sets "source: mapr" on every log to allow automatic parsing on Datadog.
    dd_tags "<KEY>:<VALUE>"
    service <YOUR_SERVICE_NAME>
    api_key <YOUR_API_KEY>
  </store>
```

사용 가능한 옵션에 대한 자세한 내용은 [fluent_datadog_plugin][10]을 참조하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][11]하고 점검 섹션에서 `mapr`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mapr" >}}


### 이벤트

MapR 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "mapr" >}}


## 트러블슈팅

- **MapR 통합 설정 후 에이전트가 크래시 루프 상태입니다.**

  권한 문제로 인해 _mapr-streams-python_ 내의 C 라이브러리 세그먼트 오류가 발생하는 경우가 몇 건 있었습니다. `dd-agent` 사용자에게 티켓 파일 읽기 권한이 있는지, `dd-agent` 사용자가 `MAPR_TICKETFILE_LOCATION` 환경 변수가 티켓을 포인팅할 때 `maprcli` 명령을 실행할 수 있는지 확인하세요.

- **통합은 정상 작동하는데 메트릭을 전송하지 않습니다.**

  통합은 토픽에서 데이터를 가져오고 MapR은 해당 토픽에 데이터를 푸시해야 하므로 에이전트를 최소 몇 분 동안 실행해야 합니다.
  해당 방법이 효과가 없지만 `sudo`으로 에이전트를 수동 실행하면 데이터가 표시되는 경우 권한에 문제가 있는 것입니다. 모든 사항을 두 번 점검합니다. `dd-agent` Linux 사용자는 로컬에 저장된 티켓을 사용할 수 있어야 하며, 사용자 X( `dd-agent` 자체일 수도 있고 아닐 수도 있음)로서 MapR에 대해 쿼리를 실행할 수 있어야 합니다. 또한 사용자 X는 `/var/mapr/mapr.monitoring/metricstreams` 스트림에 대한 `consume` 권한이 있어야 합니다.

- **`confluent_kafka was not imported correctly ...` 메시지가 표시됩니다.**

  에이전트 임베디드 환경이 `import confluent_kafka` 명령을 실행할 수 없습니다. 이는 임베디드 환경 내에 _mapr-streams-library_가 설치되지 않았거나 mapr-core 라이브러리를 찾을 수 없음을 뜻합니다. 오류 메시지에 자세한 내용이 표시됩니다.

도움이 더 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.


[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://mapr.com/docs/61/AdministratorGuide/Monitoring.html
[4]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[5]: https://docs.datafabric.hpe.com/52/SecurityGuide/t_config_impersonation_notsecure.html?hl=secure%2Ccluster
[6]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[7]: https://github.com/confluentinc/librdkafka#installing-prebuilt-packages
[8]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/mapr/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/
