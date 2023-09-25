---
aliases:
- /ko/agent/faq/agent-v6-changes
further_reading:
- link: /agent/versions/upgrade_to_agent_v6/
  tag: 설명서
  text: Agent v6으로 업그레이드
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: 설명서
  text: Datadog에서 Agent 호스트네임을 결정하는 방법
kind: faq
title: Agent v6 변경 사항
---

## 개요

Datadog Agent v6은 이전 Agent 버전에 비해 달라진 점이 많습니다. 변경 사항과 지원을 중단한 기능을 아래 섹션에서 자세히 소개해드리겠습니다.

## 기능

다음의 Agent v5 기능은 Agent v6에서 **사용할 수 없습니다**.

* [Agent를 프록시로 활용][1]
* [커스텀 이미터][2]
* [Dogstream][3]
* [go-metro][4]
* Graphite 지원

## 설정

이전 버전의 Agent는 설정 파일을 `/etc/dd-agent`에 저장했습니다. Agent v6.0 이후 설정 파일은 `/etc/datadog-agent`에 저장됩니다.

{{< tabs >}}
{{% tab "Agent" %}}

[Agent의 주요 설정 파일] [1]은 **INI** 형식에서 **YAML* 형식으로 전환됩니다. 이를 통해 복잡한 설정을 지원하며, Agent와 점검 전체에서 일관된 경험을 제공합니다.

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

Agent 설정 경로와 형식을 전환하려면 Agent 명령어를 사용하세요.
```bash
sudo -u dd-agent -- datadog-agent import
```

이 명령어는 기존 `datadog.conf`를 해석하여 지원되는 파라미터를 새로운 `datadog.yaml` 형식으로 변환합니다. 이 명령어는 활성화된 점검의 설정 파일도 복사합니다. 자세한 정보는 [Datadog Agent v6으로 업그레이드하기][2] 가이드를 참조하세요.

#### 옵션

다음 Agent 설정 옵션은 Agent v6에서 변경되거나 삭제되었습니다. 삭제된 설정 옵션은 다른 옵션으로 대체되었거나, 이전 버전과 다르게 작동하는 기능과 관련되어 있습니다.

##### 변경

| 이전 이름               | 업데이트된 이름                 | 비고                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | 프록시 설정은 URI 목록으로 표시됩니다. 자세한 정보는 [프록시][3] 설명서에서 확인하실 수 있습니다. |
| `collect_instance_metadata` | `enable_metadata_collection` | 메타데이터 수집을 활성화합니다.                                                                      |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | Syslog 설정은 URI로 표시됩니다.                                               |
|                             | `syslog_pem`                 | TLS 클라이언트 인증용 Syslog 설정 클라이언트 인증서.                                |
|                             | `syslog_key`                 | TLS 클라이언트 인증용 Syslog 설정 클라이언트 프라이빗 키.                                |

##### 삭제됨

| 이름                         | 비고                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | `proxy`로 대체되었습니다. 상세한 정보는 [프록시][3] 문서를 참조해주세요.                                                  |
| `proxy_user`                 | `proxy`로 대체되었습니다. 상세한 정보는 [프록시][3] 문서를 참조해주세요.                                                  |
| `proxy_password`             | `proxy`로 대체되었습니다. 상세한 정보는 [프록시][3] 문서를 참조해주세요.                                                  |
| `proxy_forbid_method_switch` | 지원 중단                                                                                                              |
| `use_mount`                  | Agent 레벨에서 지원이 중단되었으며, [디스크 점검][4]으로 이동했습니다.                                                       |
| `device_blacklist_re`        | Agent 레벨에서 지원이 중단되었으며, `device_blacklist`로서 [디스크 점검][4]으로 이동했습니다.                                 |
| `use_curl_http_client`       | 지원 중단                                                                                                              |
| `exclude_process_args`       | 지원 중단된 기능                                                                                                    |
| `check_timings`              | 내부 통계로 대체되었습니다.                                                                                          |
| `non_local_traffic`          | Dogstatsd에서는 `dogstatsd_non_local_traffic`로, 트레이스 Agent에서는 `apm_config.apm_non_local_traffic`으로 대체되었습니다. |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | 지원 중단된 기능입니다, 대신 [로그 Agent][5]를 사용하세요.                                                                  |
| `custom_emitters`            |                                                                                                                       |
| `forwarder_log_file`         | `log_file`로 대체되었습니다.                                                                                              |
| `dogstatsd_log_file`         | `log_file`로 대체되었습니다.                                                                                              |
| `jmxfetch_log_file`          | `log_file`로 대체되었습니다.                                                                                              |
| `syslog_port`                | `syslog_uri`로 대체되었습니다.                                                                                            |
| `check_freq`                 |                                                                                                                       |
| `collect_orchestrator_tags`  | 메타데이터 컬렉터에서 구현되었습니다.                                                                                    |
| `utf8_decoding`              |                                                                                                                       |
| `developer_mode`             |                                                                                                                       |
| `use_forwarder`              |                                                                                                                       |
| `autorestart`                |                                                                                                                       |
| `dogstream_log`              | 지원 중단된 기능입니다, 대신 [로그 Agent][5]를 사용하세요.                                                                  |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | 지원 중단되었습니다, [AWS 통합][6]으로 기능을 이용할 수 있습니다.                                                         |

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/agent/guide/upgrade-to-agent-v6/
[3]: /ko/agent/proxy/
[4]: /ko/integrations/disk/
[5]: /ko/logs/
[6]: /ko/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "점검" %}}

Agent v6은 유효한 YAML 파일을 `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.d/`로 불러옵니다. 이를 통해 복잡한 설정을 여러 개의 파일로 분할할 수 있습니다.

예를 들어 `http_check`용 설정 파일을 다음과 처리할 수 있습니다.
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Agent는 `<CHECK_NAME>.d` 폴더 하위 디렉터리의 설정 파일을 불러오지 않습니다. 예를 들어, 아래와 같은 설정 파일은 불러오지 **않습니다**.
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

[자동탐지][1] 템플릿 파일(`auto_conf.yaml`)도 설정 폴더에 저장됩니다. `redisdb` 점검 설정 폴더의 예시는 다음과 같습니다.
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

`<CHECK_NAME>.d` 폴더 내의 YAML 파일은 이름을 마음대로 정할 수 있습니다. 단, 확장자는 `.yaml` 또는 `.yml`이어야 합니다. 표준 이름은 `conf.yaml`입니다.

하위 호환성을 유지하는 차원에서 Agent는 `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.yaml` 형식으로 설정 파일을 처리하지만, 갱신된 레이아웃으로 마이그레이션하시길 권장합니다.

#### 설정 옵션

Agent v6은 점검의 `instance` 섹션에서 다음 옵션을 지원합니다.

| 옵션                    | 설명                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | 기본 설정인 15초 간격보다 점검 실행 빈도가 낮은 경우, 별도의 실행 간격을 초 단위로 설정합니다. |
| `empty_default_hostname`  | `true`로 설정되면 호스트네임 없이 메트릭, 이벤트, 서비스 점검을 전송합니다.                                           |
| `tags`                    | 점검 시 전송한 태그와 더불어 커스텀 태그를 전송합니다.                                                               |


[1]: /ko/getting_started/agent/autodiscovery/
{{% /tab %}}
{{% tab "환경 변수" %}}

Agent v6에서 사용하는 환경 변수의 대부분은 이전 버전과 **다릅니다**. [Agent v6 환경 변수] [1] 목록을 참조하시기 바랍니다.

**참조**: `DD_TAGS`는 동일한 태그이지만, Agent v6에서는 여백(스페이스)을 구분 문자로 사용하는 형식을 사용합니다. 이전 버전은 쉼표를 구분 문자로 사용했습니다(v6의 예시: `DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`).

#### 프록시

v6.4.0 이상의 경우 Agent 프록시 설정은 다음 환경 변수로 덮어쓸 수 있습니다.

| 환경 변수        | 설명                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` 요청에 프록시로 사용할 URL.                    |
| `DD_PROXY_HTTPS`    | `https` 요청에 프록시로 사용할 URL.                   |
| `DD_PROXY_NO_PROXY` | 프록시를 사용하지 않아야 하며, 공백으로 구분된 URL 목록. |

표준 환경 변수(`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`)는 Agent v6에서 지원되지만 `DD_PROXY_*`변수를 사용하시길 권장합니다. `DD_PROXY_*` 변수는 다른 프록시 변수보다 우선합니다.

Agent v6 프록시 옵션의 우선 순위는 이전 버전과 다릅니다.

* Agent v6는 환경 변수를 먼저 사용하고, 다음으로 설정 파일을 사용합니다.
* Agent v6는 설정 파일의 값을 환경 내의 값으로 덮어씁니다. 예를 들어, 설정 파일에서 `proxy.http`와 `proxy.https`가 모두 구성되어 있고, 환경에서 `DD_PROXY_HTTPS`만 설정되어 있는 경우 Agent는 환경의 `https` 값과 설정 파일의 `http`값을 사용합니다.

[1]: /ko/agent/docker/#environment-variables
{{% /tab %}}
{{% tab "호스트네임" %}}

Agent v5와 Agent v6의 호스트네임 결정 방식은 서로 다릅니다. 자세한 정보는 [Datadog가 Agent 호스트네임을 결정하는 방법] [1]을 참조하시기 바랍니다.

[1]: /ko/agent/faq/how-datadog-agent-determines-the-hostname/#agent-versions
{{% /tab %}}
{{< /tabs >}}

## 로그

[Agent 로그 파일][5]은 여전히 리눅스(Linux)의 경우 `/var/log/datadog/`에, 윈도우즈(Windows)의 경우 `C:\ProgramData\Datadog\logs`에 위치합니다.

이전 버전에서는 여러 파일(`collector.log`, `forwarder.log`, `dogstatsd.log`등)에 로그를 기록했습니다. Agent v6 에서는 하나의 로그 파일 `agent.log`에 로그를 기록합니다.

## 인터페이스

Agent v6의 명령줄 인터페이스는 서브 명령어 기반입니다. 이용 가능한 서브 명령어 목록을 확인하려면 다음을 수행하세요.
```shell
<AGENT_BINARY> --help
```

서브 명령어를 실행하려면 Agent 바이너리를 호출해야 합니다.
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

일부 옵션에는 플래그와 옵션이 있으며, '--help'에서 상세하게 설명하고 있습니다. 예를 들어, 'check' 서브 명령어를 사용하려면 다음을 수행하세요.
```shell
<AGENT_BINARY> check --help
```

사용 가능한 명령어 전체 목록을 보려면 [Agent 명령어][6]를 참조하세요.

### 운영 체제 변경

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

리눅스용 Agent v6의 주요 변경점은 다음과 같습니다.

* Agent의 _라이프사이클 명령어_(`start`/`stop`/`restart`/`status`)만은 `sudo service`/`sudo initctl`/`sudo systemctl`로 실행해야 합니다.
* 다른 모든 명령어는 기본적으로 `datadog-agent`로서 `PATH`(`/usr/bin`)에 있는 Agent 바이너리로 호출해야 합니다. `dd-agent` 명령어는 더 이상 사용할 수 없습니다.
* `info` 서브 명령어는 `status`로 이름이 바뀌었습니다.
* Agent v6에는 SysV-init 스크립트가 포함되지 않습니다(이전에는 `/etc/init.d/datadog-agent`에 있었습니다).

#### 서비스 라이프사이클 명령어

사용자의 시스템에서 `service` 래퍼 명령어를 사용할 수 있는 경우, 라이프사이클 명령어는 변경되지 않습니다.
예를 들어 우분투(Ubuntu)의 경우 _라이프사이클 명령어_는 다음과 같습니다.

| 명령어                              | 설명                            |
|--------------------------------------|----------------------------------------|
| `sudo service datadog-agent start`   | 서비스형 Agent를 시작          |
| `sudo service datadog-agent stop`    | 서비스형 Agent를 중지                |
| `sudo service datadog-agent restart` | 서비스형 Agent를 다시 시작             |
| `sudo service datadog-agent status`  | Agent 서비스 상태를 출력 |

시스템에서 `service` 래퍼 명령어를 사용할 수 없는 경우, 다음을 사용하세요.

* `upstart` 기반 시스템의 경우: `sudo start/stop/restart/status datadog-agent`
* `systemd` 기반 시스템의 경우: `sudo systemctl start/stop/restart/status datadog-agent`

디스트리뷰션이 기본적으로 사용하는 init 시스템을 알 수 없다면 아래 표를 참조하세요.

| 디스트리뷰션 \ init 시스템      | upstart                   | systemd                   | sysvinit                                  | 비고                         |
|---------------------------------|---------------------------|---------------------------|-------------------------------------------|-------------------------------|
| 아마존 리눅스(<= 2017.09)       | <i class="icon-check-bold"></i> |                           |                                           |                               |
| 아마존 리눅스 2 (>= 2017.12)     |                           | <i class="icon-check-bold"></i> |                                           |                               |
| CentOS/RHEL 6                   | <i class="icon-check-bold"></i> |                           |                                           |                               |
| CentOS/RHEL 7                   |                           | <i class="icon-check-bold"></i> |                                           |                               |
| 데비안(Debian) 7 (wheezy)               |                           |                           | <i class="icon-check-bold"></i> (Agent v6.6.0+) |                               |
| 데비안(Debian) 8 (jessie) & 9 (stretch) |                           | <i class="icon-check-bold"></i> |                                           |                               |
| SUSE 11                         |                           |                           |                                           | `systemd` 없이 지원되지 않음 |
| SUSE 12                         |                           | <i class="icon-check-bold"></i> |                                           |                               |
| 우분투(Ubuntu) < 15.04                  | <i class="icon-check-bold"></i> |                           |                                           |                               |
| 우분투(Ubuntu) >= 15.04                 |                           | <i class="icon-check-bold"></i> |                                           |                               |

#### Agent 명령어

Agent v6 이후로, 다른 기능은 Agent 바이너리 자체에서 서브 명령어로 지원하므로 `service`/`systemctl`/`initctl`로 호출할 수 없습니다. 아래로 몇 가지 예시를 보여드리겠습니다.

| Agent v5 명령어                                  | Agent v6 명령어                                       | 비고                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | 실행 중인 Agent의 상태 페이지 |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Flare를 전송                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Agent 사용 내역 표시            |
| `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` | 점검 실행                    |

{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

윈도우즈용 Agent v6의 주요 변경점은 다음과 같습니다.

* Agent v5 윈도우즈 Agent Manager GUI는 브라우저 기반 크로스 플랫폼 매니저로 대체되었습니다. 자세한 내용은 [윈도우즈용 Datadog Agent Manager][1] 페이지를 참조하세요.
* 주요 실행 가능 파일은 `agent.exe`입니다(이전에는 `ddagent.exe`였습니다).
* 명령어는 **관리자** 명령어 프롬프트에서 명령줄 `"%ProgramFiles%\datadog\datadog agent\embedded\agent.exe" <COMMAND>`로 실행해야 합니다.
* 윈도우즈 서비스가 "자동 지연"된 상태로 시작됩니다. 부팅 시 자동으로 시작되지만, 다른 모든 서비스를 시작한 후에 시작된다는 뜻입니다. 이로 인해 재부팅 후 메트릭 보고 시 약간의 지연이 발생합니다.
* 윈도우즈 GUI와 윈도우즈 시스템 트레이 아이콘이 개별적으로 구현되었습니다. 자세한 내용은 [윈도우즈용 Datadog Agent Manager][1] 가이드를 참조하시기 바랍니다.

[1]: /ko/agent/guide/datadog-agent-manager-windows/
{{% /tab %}}
{{% tab "MacOS" %}}

MacOS용 Agent v6의 주요 변경점은 다음과 같습니다.

* _라이프사이클 명령어_(이전에는 `datadog-agent start`/`stop`/`restart`/`status`)는 `com.datadoghq.agent` 서비스의 `launchctl` 명령어로 대체되며, 로그인한 사용자가 명령어를 실행해야 합니다. 이러한 명령어에서는 Datadog Agent systray 앱을 사용할 수도 있습니다.
* 다른 모든 명령어는 기본적으로 `PATH`(`/usr/local/bin/`)에 있는`datadog-agent` 바이너리로 실행할 수 있습니다.
* `info` 명령어는 `status`로 이름이 바뀌었습니다.
* 설정 GUI는 웹 기반 어플리케이션으로 명령어 `datadog-agent launch-gui`를 실행하거나, systray 앱을 사용하여 액세스할 수 있습니다.

**변경점의 예시**:

| Agent v5 명령어                   | Agent v6 명령어                                     | 설명                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` 또는 systray 앱 | 서비스형 Agent를 시작   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` 또는 systray 앱  | 서비스형 Agent를 중지         |
| `datadog-agent restart`            | _`stop`을 실행하고, 다음으로 `start`_ 또는 systray 앱을 실행하세요             | 서비스형 Agent를 다시 시작      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` 또는 systray 앱  | Agent 서비스 상태를 출력 |
| `datadog-agent info`               | `datadog-agent status` 또는 웹 GUI                    | 실행 중인 Agent의 상태 페이지 |
| `datadog-agent flare`              | `datadog-agent flare` 또는 웹 GUI                     | Flare를 전송                     |
| _구현되지 않음_                  | `datadog-agent --help`                               | 명령어 사용법 표시          |
| `datadog-agent check <CHECK_NAME>` | `datadog-agent check <CHECK_NAME>`                   | 점검 실행(변화 없음)        |

{{% /tab %}}
{{< /tabs >}}

## 수집 Agent

{{< tabs >}}
{{% tab "APM Agent" %}}

APM Agent 는 리눅스, MacOS, 윈도우즈용 Agent v6 패키지에 기본적으로 포함됩니다.

리눅스에서 APM Agent는 기본적으로 활성화되어 있습니다. 다른 플랫폼에서 활성화하거나 리눅스에서 비활성화하려면, `datadog.yaml`의 `apm_config` 키를 업데이트하세요.
```yaml
apm_config:
  enabled: true
```

도커(Docker) 이미지의 경우 APM Agent는 기본적으로 비활성화되어 있습니다. `DD_APM_ENABLED`를 `true`로 설정하면 활성화할 수 있습니다. 기본적으로는 모든 인터페이스를 주시(listen)합니다. 다른 플랫폼에서 로컬 이외의 트래픽을 주시하고자 하는 경우에는 `DD_APM_NON_LOCAL_TRAFFIC`를 `true`로 설정하세요. 자세한 정보는 [도커 애플리케이션의 트레이스][1]를 참조하시기 바랍니다.

[1]: /ko/agent/docker/apm/
{{% /tab %}}
{{% tab "Process Agent" %}}

Process Agent는 리눅스용 Agent v6 패키지에만 기본으로 포함되어 있습니다.

Process Agent 는 기본적으로 활성화되지 않습니다. 활성화하려면 `datadog.yaml` 파일을 다음과 같이 갱신하세요.
```yaml
process_config:
  enabled: "true"
```

`enabled` 값은 스트링이며, 다음과 같은 옵션이 있습니다.

* `"true"`: Process Agent를 활성화하여 프로세스와 컨테이너를 수집합니다.
* `"false"`: 가능한 경우 컨테이너만 수집합니다(기본 설정입니다).
* `"disabled"`: Process Agent를 실행하지 않습니다.

{{% /tab %}}
{{< /tabs >}}

## 점검

{{< tabs >}}
{{% tab "Docker" %}}

Agent v6에서 도커 버전 1.12.1 이상이 지원됩니다.

도커 점검은 Agent의 내부 아키텍처를 이용하기 위해 Go로 다시 작성되었습니다. 따라서 파이썬(Python) 버전(`docker_daemon`)은 지원이 중단됩니다.

새 점검의 이름은 `docker`입니다. [Agent Import 명령](?tab=agent #configuration)은 레거시의 `docker_daemon.yaml` 설정에서 설정을 불러옵니다. 모든 기능이 이식되나, 다음은 제외됩니다.

* `url`, `api_version`, `tags*`의 지원이 중단됩니다. [표준 도커 환경 변수][1]를 사용하시길 권장합니다.
* `ecs_tags`, `performance_tags`, `container_tags`의 지원이 중단됩니다. 관련된 태그는 전부 자동으로 수집합니다.
* `docker.container.count` 메트릭을 활성화하는 `collect_container_count` 사용은 지원되지 않습니다. `docker.containers.running` 및 `.stopped`를 사용하세요.

일부 옵션은 `docker_daemon.yaml`에서 주요 `datadog.yaml`로 이동했습니다.

* `collect_labels_as_tags`는 `docker_labels_as_tags`로 이름이 바뀌었으며 카디널리티(cardinality)가 높은 태그를 지원합니다. 자세한 정보는 [태그 할당과 추출][2] 가이드를 참조하세요.
* `exclude`와 `include`는 `ac_include`와 `ac_exclude`로 이름이 바뀌었습니다. 이제 Agent의 모든 컴포넌트에서 일관적으로 필터링하기 위해 임의의 태그로 필터링할 필요가 없습니다. 태그 필터링은 `image`(이미지명) 및 `name`(컨테이너명)만 지원됩니다. 정규식 표현의 필터링은 계속 사용할 수 있습니다. 자세한 내용은 [컨테이너 탐지 관리][3] 가이드를 참조하세요.
* `docker_root` 옵션은 두 가지 옵션(`container_cgroup_root`, `container_proc_root`)으로 나뉘었습니다.
* 쿠버네티스(Kubernetes)와 Openshift에서 실행을 일시 정지한 컨테이너를 제외하기 위해 `exclude_pause_container`가 추가되었습니다(기본값은 `true`입니다).

[1]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[2]: /ko/agent/docker/tag/
[3]: /ko/agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Agent v6에서 쿠버네티스 버전 1.3 이상이 지원됩니다.

쿠버네티스 통합은 다음을 결합하여 인사이트를 제공합니다.

* kubelet의 [kubelet][1] 점검 메트릭
* API 서버에서 발생한 [kubernetes_apiserver][2] 점검 이벤트와 서비스 점검

[Agent Import 명령어](?tab=agent #configuration)(v6.2 이후)는 레거시의 `kubernetes.yaml`에서 설정을 불러옵니다. 다음 옵션은 지원이 중단되었습니다.

* API 서버 자격증명(`api_server_url`, `apiserver_client_crt`, `apiserver_client_key`, `apiserver_ca_cert`): 대신 `kubernetes_kubeconfig_path`로 Agent에 `kubeconfig` 파일을 전달합니다.
* `use_histogram`: [Datadog 지원팀] [3]에 문의하여 최적의 대안을 알아보세요.
* `namespaces`와 `namespace_name_regexp`: Agent v6는 가능한 모든 네임스페이스에서 메트릭을 수집합니다.

업그레이드된 로직에서는 Kubernetes 버전 1.7.6 이상과 호환되는 Prometheus 메트릭 수집이 활성화됩니다. 구형 버전을 실행하고 있거나 cadvisor 수집 로직으로 되돌리고 싶을 때는 `cadvisor_port`를 `4194`(kubelet이 cadvisor를 공개하는 포트)로 설정하세요.

[kubernetes_state][4] 점검은 Agent v5 또는 Agent v6에서 작동합니다.

#### 태그 설정

Agent v5는 모든 팟 라벨을 태그로 자동으로 수집했지만 Agent v6에는 허가 목록이 필요합니다. `datadog.yaml`의 `kubernetes_pod_labels_as_tags`옵션에서 허가 목록을 만들 수 있습니다. 자세한 내용은 [태그 할당 및 추출][5]를 참조하세요.

다음 옵션과 태그는 지원이 중단됩니다.

* `label_to_tag_prefix`는 `kubernetes_pod_labels_as_tags`로 대체되었습니다.
* `container_alias` 태그는 수집되지 않습니다.
* `kube_replicate_controller`는 레플리케이션 컨트롤러에서 팟을 생성한 경우에만 추가됩니다. 대신 관련된 크리에이터(creator) 태그를(`kube_deployment`나 `kube_daemon_set` 등) 사용해주세요.

[1]: /ko/integrations/kubelet/
[2]: /ko/integrations/kube_apiserver_metrics/
[3]: /ko/help/
[4]: /ko/agent/kubernetes/
[5]: /ko/agent/kubernetes/tag/#extract-node-labels-as-tags
{{% /tab %}}
{{% tab "JMX" %}}

Agent v6은 JMXFetch를 포함하나, 다음과 같은 변경 사항이 있습니다.

#### Jmxterm

Agent v6에는 `jmxterm` JAR이 포함되지 않습니다. `jmxterm`을 다운로드하여 사용하려면 [업스트림 프로젝트][1]를 참조하시기 바랍니다.

#### 트러블슈팅 명령어

트러블슈팅 명령어 구문이 변경되었습니다. 이러한 명령어는 v6.2.0 이상부터 사용할 수 있습니다. 이전 버전에 대해서는, [JMX Agent 트러블슈팅][2] 가이드를 참조해주세요.

| 명령어                                                | 설명                                                                                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | 하나 이상의 인스턴스 설정에 일치하는 속성을 나열합니다.                                                                                        |
| `sudo -u dd-agent datadog-agent jmx list limited`      | 인스턴스 설정 중 하나에 일치하지만, 수집할 수 있는 메트릭 수를 초과한 관계로 수집되지 않은 속성을 나열합니다. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | 현재 인스턴스 설정에서 수집한 속성을 나열합니다.                                                                                     |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | 인스턴스 설정과 일치하지 않는 속성을 나열합니다.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx list everything`   | JMXFetch에서 지원하는 유형에 해당하며 사용 가능한 속성을 전부 나열합니다.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx collect`           | 현재 설정을 기반으로 메트릭 수집을 시작하여 콘솔에 표시합니다.                                                            |

**참조**: 기본적으로 이 명령어는 설정된 모든 JMX 점검에서 실행됩니다. 특정 점검을 지정하려면 `--checks` 플래그를 사용하세요. 예:
`sudo datadog-agent jmx list collected --checks tomcat`

[1]: https://github.com/jiaqi/jmxterm
[2]: /ko/integrations/faq/troubleshooting-jmx-integrations/#agent-troubleshooting
{{% /tab %}}
{{% tab "시스템" %}}

_윈도우즈 Agent에만 영향을 줍니다_

윈도우즈 Agent v5에서 `system.mem.pagefile.*` 메트릭은 일관성 없는 단위를 표시합니다(10^6 차이).

이 문제는 Windows Agent v6에서 수정되었습니다. 단, 하위 호환성을 위해 Agent v5의 불일치 문제는 그대로 남아 있습니다. 따라서 Agent v5에서 Agent v6으로 업그레이드할 경우 보고되는 값(과 관련된 모니터링 정보)이 달라집니다.

{{% /tab %}}
{{< /tabs >}}

## 자동탐지

[자동탐지] [7] 시스템이 Agent v6용으로 재구성되었습니다. 또한 컨테이너 런타임과 오케스트레이터가 분리되어 더욱 유연해졌습니다. 여기에는 템플릿의 `docker_images`에서 `ad_identifiers`로의 이동이 포함됩니다.

{{< tabs >}}
{{% tab "쿠버네티스" %}}

쿠버네티스를 사용할 경우 자동탐지는 도커 daemon이 아닌 kuberlet에서 정보를 가져옵니다. 따라서 도커 소켓에 액세스하지 않아도 자동탐지가 기능합니다. 또, 기본적으로 팟 어노테이션에서 자동탐지 템플릿을 가져옵니다. `docker` 설정 공급자(config-provider)를 활성화하여 컨테이너 라벨을 사용하고, 팟이 부족한 컨테이너에서 자동탐지가 필요할 경우 `kubelet` 주시자(listener)를 도커 주시자로 대체할 수 있습니다.

팟 애노테이션에서 [자동탐지 템플릿][1]을 지정할 경우 애노테이션 이름의 프레픽스(접두어)는 `ad.datadoghq.com/`입니다. 이전 애노테이션 프레픽스(`service-discovery.datadoghq.com/`)는 Agent v6에서도 계속 지원됩니다. 단, 추후 버전에서는 삭제될 예정입니다.

[1]: /ko/agent/kubernetes/integrations/
{{% /tab %}}
{{% tab "도커(Docker)" %}}

도커 라벨의 [자동탐지 템플릿][1]은 동일한 프레픽스 `com.datadoghq.ad.*`로 작동합니다.

일관성을 유지하기 위해 식별자 덮어쓰기(override) 라벨의 이름이 `com.datadoghq.sd.check.id`에서 `com.datadoghq.ad.check.id`로 바뀌었습니다. 이전 이름은 Agent v6에서도 계속 지원됩니다. 단, 추후 버전에서는 삭제될 예정입니다.

[1]: /ko/agent/docker/integrations/
{{% /tab %}}
{{< /tabs >}}

## 파이썬(Python) 모듈

Agent v6에서 모든 점검 관련 파이썬 코드는`datadog_checks` [네임스페이스][8]에서 불러옵니다. Agent v5에 포함된 대부분의 파이썬 라이브러리는 Agent v6에 포함됩니다. 변경 사항은 다음과 같습니다.

* `util.py` 및 그와 관련된 함수는 Agent v6에서 삭제되었습니다.
* `util.headers(...)`는 계속해서 Agent v6에 포함됩니다. 단, C 및 Go로 구현되어 점검으로 넘어갑니다.

**참조** : 모든 공식 통합은 지원 중단된 모듈을 삭제하도록 업데이트되었습니다. 따라서 이러한 변경은 커스텀 점검에만 영향을 미칩니다.

많은 `utils` 디렉토리가 Agent v6에서 삭제되었지만, 삭제된 콘텐츠 대부분은 점검과 직접적인 관련이 없었습니다. 예를 들어 flare 모듈은 삭제되고 Go로 재구현되었으나 커스텀 점검에서 사용하신 분은 없었습니다. 자세한 정보가 필요하신 분은 [커스텀 점검 개발자 가이드][9]를 읽어주세요.

{{< tabs >}}
{{% tab "통합" %}}

Agent v6는 파이썬 점검을 완전히 지원하지만, 공식 Agent v5 통합의 일부는 삭제되거나 치환되어 있습니다.

* agent_metrics - 삭제됨
* docker_daemon - [도커 점검](?tab=docker#checks)으로 대체됨
* kubernetes - [쿠버네티스 점검](?tab=kubernetes#checks)으로 대체됨

{{% /tab %}}
{{% tab "점검 API" %}}

파이썬 점검 기본 클래스(`AgentCheck`)는 `datadog_checks.base.checks`에서 불러옵니다. 클래스 API에서 여러 요소가 삭제되거나 변경되었습니다. 또, 각 점검 인스턴스는 클래스의 독자적인 인스턴스가 되었습니다. 따라서 인스턴스 사이에 상태를 공유할 수 없습니다.

다음의 `AgentCheck` 클래스 내 메소드는 구현되지 않았습니다.

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

메트릭 전송자의 함수 서명이 변경되었습니다.

```python
# Previous versions
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)

# Agent v6
gauge(self, name, value, tags=None, hostname=None, device_name=None)
```

다음의 메소드는 `AgentCheck`에서 영구 삭제되었습니다.

* `_roll_up_instance_metadata`
* `instance_count`
* `is_check_enabled`
* `read_config`
* `set_check_version`
* `set_manifest_path`
* `_get_statistic_name_from_method`
* `_collect_internal_stats`
* `_get_internal_profiling_stats`
* `_set_internal_profiling_stats`
* `get_library_versions`
* `get_library_info`
* `from_yaml`
* `get_service_checks`
* `has_warnings`
* `get_metrics`
* `has_events`
* `get_events`

**참조** : 모든 공식 통합은 지원 중단된 메소드를 삭제하도록 업데이트되었습니다. 따라서 이러한 변경은 커스텀 점검에만 영향을 미칩니다.

{{% /tab %}}
{{% tab "커스텀 점검" %}}

#### 우선 순위

Agent v6에서는 [공식 점검][1]을 커스텀 점검(`<AGENT_DIRECTORY>/checks.d`의 점검)보다 우선합니다. 공식 점검과 이름이 같은 커스텀 점검은 무시됩니다.

Agent v6에서 커스텀 점검 설정을 수정하려면 영향을 받는 커스텀 점검 이름을 사용되지 않은 새 이름으로 변경하고, 이에 따라 관련된 `.yaml` 설정 파일의 이름을 변경하세요.

#### 의존

커스텀 점검을 사용하는 경우, 사용자의 코드가 Agent v6에 포함되지 않은 파이썬 코드에 의존할 가능성이 있습니다. 다음의 패키지는 더 이상 Agent에 포함되지 않습니다.

- backports.ssl-match-hostname
- datadog
- decorator
- future
- futures
- google-apputils
- pycurl
- pyOpenSSL
- python-consul
- python-dateutil
- python-etcd
- python-gflags
- pytz
- PyYAML
- rancher-metadata
- tornado
- uptime
- websocket-client

코드가 이러한 패키지에 의존하는 경우, 다음을 실행해 누락된 패키지를 설치하세요.

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

마찬가지로 Agent v5에서 커스텀 점검 요건을 충족하기 위해 PIP 패키지를 추가했을 가능성이 있습니다. 추가된 PIP 패키지에 이미 Agent v5에 포함된 패키지와 내부 의존 관계가 있는 경우(위의 목록을 참조하세요), Agent v6로 업그레이드한 후 의존 관계가 상실됩니다. 위의 설명에 따라 누락된 패키지를 설치하세요.

[1]: https://github.com/DataDog/integrations-core
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /ko/agent/guide/dogstream/
[4]: /ko/integrations/go-metro/
[5]: /ko/agent/guide/agent-log-files/
[6]: /ko/agent/guide/agent-commands/
[7]: /ko/getting_started/agent/autodiscovery/
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[9]: https://github.com/DataDog/datadog-agent/tree/main/docs/dev/checks
