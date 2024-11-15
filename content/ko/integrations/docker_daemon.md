---
app_id: 도커(Docker)
app_uuid: ca1a7870-7d95-40c7-9790-ef6c1e928967
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: docker.containers.running
      metadata_path: metadata.csv
      prefix: 도커(Docker).
    process_signatures:
    - dockerd
    - docker-containerd
    - 도커(Docker) 실행
    - 도커(Docker) Daemon
    - docker-containerd-shim
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 73
    source_type_name: 도커(Docker)
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 로그 수집
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docker_daemon/README.md
display_on_public_website: true
draft: false
git_integration_title: docker_daemon
integration_id: 도커(Docker)
integration_title: 도커(Docker) Daemon
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: docker_daemon
public_title: 도커(Docker) Daemon
short_description: 컨테이너 성능과 내부에서 실행 중인 서비스 성능을 상호 연결합니다.
supported_os:
- 리눅스
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Containers
  - Category::Log Collection
  - Category::Network
  configuration: README.md#Setup
  description: 컨테이너 성능과 내부에서 실행 중인 서비스 성능을 상호 연결합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 도커(Docker) Daemon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


**참고**: 도커(Docker) Daemon 점검은 여전히 지원되나 **에이전트 v5**에서만 동작합니다.

<div class="alert alert-warning">
<b>에이전트 v6에서 도커(Docker) 통합을 사용하려면 하단 <a href="#에이전트-v6">에이전트 v6 섹션을</a> 참조하세요.</b>
</div>

![도커(Docker) 기본 대시보드][1]

## 개요

다음과 같이 본 에이전트 점검을 설정하여 Docker_daemon 서비스에서 메트릭을 실시간으로 가져옵니다.

* Docker_daemon 상태를 시각화 및 모니터링합니다.
* Docker_daemon 오류 및 이벤트에 대한 알림을 받습니다.

## 설정
### 설치

모든 컨테이너에서 도커(Docker) 메트릭을 수집하려면 모든 호스트에서 Datadog 에이전트 **하나**를 실행합니다. 각 호스트에서 에이전트를 직접 실행하거나 [docker-dd-agent  컨테이너][2](권장) 내에서 실행하는 두 가지 방법이 있습니다.

두 옵션 모두 도커(Docker) 점검을 완료하려면 호스트의 cgroup 메모리 관리가 활성화되어 있어야 합니다. 활성화하는 방법을 확인하려면 [docker-dd-agent  리포지토리][3]를 참조하세요.

#### 호스트 설치

1. 도커(Docker)가 호스트에서 실행 중인지 확인합니다.
2. 호스트 OS용 [에이전트 설치 지침][4]에 설명된 대로 에이전트를 설치합니다.
3. [애플리케이션에서 도커(Docker) 통합 타일]을 활성화합니다[5].
4. `usermod -a -G docker dd-agent` 도커(Docker) 그룹에 에이전트 사용자를 추가합니다.
5. [에이전트 conf.d 디렉토리의 예제 파일[6]을 복사하여 `docker_daemon.yaml` 파일을 생성합니다. 호스트에 도커(Docker)를 표준 설치한 경우 통합을 실행하기 위해 이를 변경하지 않아도 됩니다.
6. 추가 통합을 활성화하려면 `docker ps`으로 해당 애플리케이션에서 사용하는 포트를 식별하세요.
    ![도커(Docker) ps 명령][7]

#### 컨테이너 설치

1. 도커(Docker)가 호스트에서 실행 중인지 확인합니다.
2. [도커(Docker) 컨테이너 설치 지침][8]에 따라 다음을 실행합니다.

        docker run -d --name dd-agent \
          -v /var/run/docker.sock:/var/run/docker.sock:ro \
          -v /proc/:/host/proc/:ro \
          -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
          -e API_KEY={YOUR_DD_API_KEY} \
          datadog/docker-dd-agent:latest

위의 명령에서는 도커(Docker) 의 `-e` 환경 변수 플래그로 Datadog 에이전트에 API 키를 전달할 수 있습니다. 다른 변수는 다음과 같습니다.

| **변수**                                                                                      | **설명**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Datadog API 키를 설정합니다.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | 에이전트 컨테이너의 `datadog.conf` 파일 호스트명을 설정합니다. 해당 변수를 설정하지 않으면 에이전트 컨테이너는 기본값으로 `Name` 필드(`docker info` 명령으로 전송한)를 에이전트 컨테이너 호스트명으로 사용합니다.  |
| DD_URL                                                                                            | 에이전트에서 데이터를 전송하는 Datadog 인테이크 서버 URL을 설정합니다. [에이전트를 프록시로 사용할 때] 유용합니다[9].                                                                                                              |
| LOG_LEVEL                                                                                         | 로깅 상세도(중요, 오류, 경고, 정보, 디버그)를 설정합니다. 예를 들어 `-e LOG_LEVEL=DEBUG`의 경우 로깅을 디버그 모드로 설정합니다.                                                                                                    |
| TAGS                                                                                              | 호스트 태그를 쉼표로 구분한 문자열로 설정합니다. 단순 태그나 키 값 태그 모두 사용할 수 있습니다(예: `-e TAGS="simple-tag, tag-key:tag-value"`).                                                                           |
| EC2_TAGS                                                                                          | 본 기능을 활성화하면, 시작 도중 에이전트가 EC2 API를 사용하여 설정된 커스텀 태그를 캡처 및 쿼링할 수 있습니다. 활성화하려면 `-e EC2_TAGS=yes`를 사용합니다. **참고**: 본 기능을 사용하려면 인스턴스와 연결된 IAM 역할이 필요합니다.        |
| NON_LOCAL_TRAFFIC                                                                                 | 본 기능을 활성화하면 어떤 외부 IP에서든 StatsD를 보고할 수 있습니다. 활성화하려면  `-e NON_LOCAL_TRAFFIC=yes`를 사용합니다. 이는 다른 컨테이너 또는 시스템에서 메트릭을 보고하는 데 사용됩니다. 자세한 내용을 확인하려면 [네트워크 설정][10]을 참조하세요. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | 프록시 설정 세부 정보를 설정합니다. **참고**: `PROXY_PASSWORD`는 인증 비밀번호를 전달하는 데 필요하며, 이름을 변경할 수 없습니다. 자세한 내용을 확인하려면 [에이전트 프록시 문서][11]를 참조하세요.                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | 자동탐지 기능을 활성화 및 설정합니다. 자세한 내용을 확인하려면 [자동탐지 지침][12]을 참조하세요.                                                                                                                                   |

**참고**: 에이전트 재시작을 되도록 줄이려면 `--restart=unless-stopped`를 추가합니다.

#### 아마존 리눅스에서 에이전트 컨테이너 실행하기

아마존 리눅스에서 Datadog 에이전트 컨테이너를 실행하려면 다음과 같이 `cgroup` 볼륨 마운트 위치로 변경합니다.

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest
```

#### 컨테이너 기반 Alpine Linux

표준 도커(Docker) 이미지는 데비안(Debian) Linux에 기반하나,  Datadog 에이전트 v5.7부터는 [Alpine Linux][13] 기반 이미지를 제공합니다. Alpine Linux 이미지는 기존 데비안(Debian) 기반 이미지보다 크기가 상당히 작습니다. 또한 Alpine의 보안 지향적 디자인을 계승합니다.

Alpine Linux 이미지를 사용하려면 `-alpine`을 버전 태그에 추가합니다. 예시:

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest-alpine
```

#### 이미지 버전 관리
Datadog 에이전트 버전 5.5.0부터 도커(Docker) 이미지는 새로운 버전 관리 패턴을 따릅니다. 따라서 Datadog은 동일한 에이전트 버전으로 Datadog 에이전트의 도커(Docker) 이미지 변경 사항을 릴리스합니다.

도커(Docker) 이미지 버전은 다음과 같은 패턴을 갖습니다. **X.Y.Z**에서 **X**는 도커(Docker) 이미지의 메이저 버전, **Y**는 마이너 버전, **Z**는 에이전트 버전을 나타냅니다.

예를 들어 Datadog 에이전트 5.5.0을 번들로 제공하는 도커(Docker) 이미지의 첫 번째 버전은 `10.0.550`입니다.

#### 컨테이너 사용자 지정 및 추가 정보

Datadog 에이전트, Alpine Linux 기반 이미지, 버전 관리 등을 사용하여 커스텀 도커(Docker) 컨테이너를 빌드하는 방법에 대한 자세한 내용을 확인하려면 [Github의 docker-dd-agent 프로젝트][2]를 참조하세요.

### 검증

[에이전트 상태 하위 명령을 실행하고][14] 점검 섹션에서 `docker_daemon`를 찾으세요.

## 에이전트 v6

최신 도커(Docker) 점검은 `docker`로 명명되며 새로운 내부 아키텍처를 활용하기 위해 Go로 작성되었습니다. 에이전트 v6.0이후로는 `docker_daemon` 점검은 에이전트 v5에서 계속 사용 가능하고 유지되더라도 로드되지 않습니다. 다음과 같은 지원 중단 항목을 제외한 모든 기능은 6.0 이상 버전에서 포트됩니다.

  * `url`, `api_version`, `tags*` 옵션 지원이 중단됩니다. [표준 도커 환경 변수][15]를 직접 사용하시길 권장합니다.
  * `ecs_tags`, `performance_tags`, `container_tags` 옵션 지원이 중단됩니다. 기본적으로 관련 태그는 전부 자동으로 수집합니다.
  * `docker.container.count` 메트릭을 활성화하는  `collect_container_count` 옵션은 지원되지 않습니다. `docker.containers.running` 및 `.stopped`를 사용하세요.

일부 옵션은 `docker_daemon.yaml`에서 주요 `datadog.yaml`로 이동했습니다.

  * `collect_labels_as_tags`의 이름이 `docker_labels_as_tags`로 바뀌었으며 카디널리티(cardinality)가 높은 태그를 지원합니다. 자세한 정보를 확인하려면 `datadog.yaml.example`를 참조하세요.
  * `exclude` 및 `include` 리스트의 이름이  `ac_include` 및 `ac_exclude`로 변경되었습니다 . 이제 에이전트의 모든 컴포넌트에서 필터를 일관적으로 적용하기 위해 임의의 태그로 필터링하지 않아도 됩니다. 태그 필터링은 `image`(이미지명) 및 `name`(컨테이너명)만 지원됩니다. 정규식 필터링은 계속 사용할 수 있습니다. 예시를 확인하려면 `datadog.yaml.example`를 참조하세요.
  * `docker_root` 옵션은 두 가지 옵션(`container_cgroup_root`, `container_proc_root`)으로 나뉘었습니다.
  * `exclude_pause_container`를 추가하여 쿠버네티스(Kubernetes)와 Openshift에서 일시 중지된 컨테이너를 제외합니다(기본값: true). 오류로 인해 제외 목록에서 삭제되는 것을 방지할 수 있습니다.

추가 변경 사항:

  * `TAGS` 환경 변수의 이름이 `DD_TAGS`로 변경되었습니다.
  * 도커(Docker) 허브 리포지토리가 [datadog/docker-dd-agent][16]에서 [datadog/agent][17]로 변경되었습니다.

[`import`][18] 명령은 기존 `docker_daemon.yaml`을 신규 `docker.yaml`으로 변환합니다. 또한 필요한 설정을 `docker_daemon.yaml`에서 `datadog.yaml`로 이동합니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "docker_daemon" >}}


### 이벤트
도커(Docker) 통합은 다음 이벤트를 생성합니다.

* Delete Image
* Die
* 오류
* Fail
* Kill
* Out of memory (oom)
* Pause
* Restart container
* Restart Daemon
* 업데이트

### 서비스 점검
{{< get-service-checks-from-git "docker_daemon" >}}


**참고**: `docker.exit`를 사용하려면 [도커(Docker) YAML file][21] 파일에 `collect_exit_codes: true`를 추가하고 에이전트를 다시 시작합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][22]에 문의해주세요.

## 참고 자료

* [구성 및 Datadog 에이전트][23]
* [DogStatsD 및 도커(Docker)][24]
* [도커(Docker) 모니터링 문제][25] (시리즈)
* [도커(Docker) 리소스 메트릭 모니터링 방법][26]
* [도커(Docker) 메트릭 수집 방법][27]
* [실제 도커(Docker) 도입에 대한 8가지 놀라운 사실][28]
* [AWS ECS에서 도커(Docker) 모니터링하기][29]
* [Datadog 도커화][30]
* [Datadog으로 도커(Docker) 모니터링하기][31]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://github.com/DataDog/docker-dd-agent#cgroups
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/account/settings#integrations/docker
[6]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png
[8]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[9]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy
[10]: https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration
[11]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy
[12]: https://docs.datadoghq.com/ko/agent/autodiscovery
[13]: https://alpinelinux.org
[14]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[15]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[16]: https://hub.docker.com/r/datadog/docker-dd-agent
[17]: https://hub.docker.com/r/datadog/agent
[18]: https://docs.datadoghq.com/ko/agent/#cli
[19]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/assets/service_checks.json
[21]: https://github.com/DataDog/integrations-core/blob/7.39.0/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example#L151-L154
[22]: https://docs.datadoghq.com/ko/help
[23]: https://docs.datadoghq.com/ko/agent/guide/compose-and-the-datadog-agent
[24]: https://docs.datadoghq.com/ko/integrations/faq/dogstatsd-and-docker
[25]: https://www.datadoghq.com/blog/the-docker-monitoring-problem
[26]: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
[27]: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
[28]: https://www.datadoghq.com/docker-adoption
[29]: https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs
[30]: https://www.datadoghq.com/blog/docker-performance-datadog
[31]: https://www.datadoghq.com/blog/monitor-docker-datadog