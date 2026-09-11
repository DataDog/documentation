---
app_id: twingate
app_uuid: c88bd253-18da-4224-af14-7854ce8ae6ed
assets:
  dashboards:
    Twingate Dashboard: assets/dashboards/twingate_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10338
    source_type_name: Twingate
author:
  homepage: https://www.twingate.com/?utm_source=datadog&utm_medium=partner&utm_campaign=integrations
  name: Twingate
  sales_email: sales@twingate.com
  support_email: support@twingate.com
categories:
- 네트워크
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/twingate/README.md
display_on_public_website: true
draft: false
git_integration_title: twingate
integration_id: twingate
integration_title: Twingate
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: twingate
public_title: Twingate
short_description: Twingate는 기업 VPN에 대한 현대적인 제로 트러스트 대안을 제공합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - 카테고리::보안
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Twingate는 기업 VPN에 대한 현대적인 제로 트러스트 대안을 제공합니다.
  media:
  - caption: Twingate Activity Log
    image_url: images/twingate_activity_log.png
    media_type: image
  - caption: Twingate Real-Time Activity Dashboard
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-network-access-with-twingate/
  support: README.md#Support
  title: Twingate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Twingate][1]은 빠르게 성장하는 기업이 AWS 환경에 대한 안전한 액세스를 빠르고 쉽게 제공할 수 있도록 지원하는 제로 트러스트 네트워크 액세스 플랫폼입니다. NAT 통과, QUIC, 개인 프록시, 분할 터널링과 같은 최신 기술을 통합함으로써 Twingate는 기존 또는 클라우드 VPN을 대체하는 동시에 사용자 성능과 전반적인 보안을 향상시킬 수 있습니다.

이러한 통합을 통해 조직은 사용자의 리소스 액세스 활동을 실시간으로 모니터링할 수 있습니다.

## 설정
### 사전 필수 조건
1. Twingate Connector 서버에 Datadog  Agent가 설치되어 있습니다. 해당 호스트에 연결하고 파일을 편집하여  Agent 및 YAML 통합 구성을 구성할 수 있어야 합니다. Datadog Agent를 설치하려면 [ Agent 시작하기][2]를 참조하세요.
2. Twingate Connector를 배포해야 합니다. 실시간 연결 로그를 활성화하려면 [Twingate 설명서][3]를 참조하세요.

### Datadog 에이전트 설정
#### Systemd Connector
1. [Datadog journald 통합][4]을 설정합니다.
2. `journald.d/conf.yaml`를 다음 구성으로 변경합니다.
   ```yaml
    logs:
      - type: journald
        container_mode: true
        include_units:
          - twingate-connector.service
        service: Twingate Connection
        source: Twingate
        log_processing_rules:
        - type: include_at_match
          name: analytics
          pattern: ANALYTICS
        - type: mask_sequences
          name: remove_analytics
          replace_placeholder: ""
          pattern: "ANALYTICS "
   ```
3. `usermod -a -G systemd-journal dd-agent`를 사용하여 `dd-agent` 사용자를 `systemd-journal` 그룹에 추가합니다.
4. `service datadog-agent restart`를 실행하여 Datadog Agent를 다시 시작합니다.
5. [Log Explorer][5]에 Twingate Analytic 로그가 나타나는지 확인합니다.


#### Docker Connector
##### Host Agent에 대한 Datadog Docker 통합 설정
`datadog.yaml` 구성 파일에 다음 줄을 추가합니다.
```yaml
logs_enabled: true
listeners:
- name: docker
config_providers:
- name: docker
polling: true
logs_config:
container_collect_all: true
container_exclude: ["image:.*"]
container_include: ["image:twingate/connector"]
```
- `usermod -a -G docker dd-agent`를 사용하여 `dd-agent` 사용자를 `docker` 그룹에 추가합니다.
- `service datadog-agent restart`를 실행하여 Datadog Agent를 다시 시작합니다.

##### Container Agent에 대한 Datadog Docker 통합 설정
추가 파라미터 `-e DD_CONTAINER_EXCLUDE="image:.*"` 및 `-e DD_CONTAINER_INCLUDE="image:twingate/connector"`를  Docker 실행 명령에 추가합니다.
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=xxx \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="image:.*" \
           -e DD_CONTAINER_INCLUDE="image:twingate/connector" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

##### 추가 Docker 파라미터를 사용하여 Twingate Connector 설정
Twingate Connector Docker 실행 명령에 `com.datadoghq.ad.logs`를 추가합니다.
```shell
docker run -d --sysctl net.ipv4.ping_group_range="0 2147483647" \
  -l "com.datadoghq.ad.logs"='[{"service":"Twingate Connection","source":"Twingate","log_processing_rules":[{"type":"include_at_match","name":"analytics","pattern":"ANALYTICS"},{"type":"mask_sequences","name":"remove_analytics","replace_placeholder":"","pattern":"ANALYTICS "}]}]' \
  --env TENANT_URL="https://xxx.twingate.com" \
  --env ACCESS_TOKEN="xxx" \
  --env REFRESH_TOKEN="xxx" \
  --env TWINGATE_LABEL_HOSTNAME="`hostname`" \
  --name "twingate-golden-seal" \
  --restart=unless-stopped \
  $(docker run --help | grep -- --pull >/dev/null && echo "--pull=always") twingate/connector:1
```
**참고**: 새 라벨을 추가하려면 Twingate Connector 컨테이너를 다시 생성해야 합니다.

### Twingate Analytics 대시보드
1. Datadog [Dashboard List][6]로 이동합니다
2. Twingate Analytics 대시보드를 검색합니다.

## 트러블슈팅
도움이 필요하신가요? [Twingate 지원팀][7]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Twingate 제품을 통해 네트워크 액세스 모니터링][8]

[1]: https://www.twingate.com/
[2]: https://docs.datadoghq.com/ko/getting_started/agent/
[3]: https://docs.twingate.com/docs/connector-real-time-logs
[4]: https://docs.datadoghq.com/ko/agent/logs/?tab=journald
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://help.twingate.com/hc/en-us
[8]: https://www.datadoghq.com/blog/monitor-network-access-with-twingate/