---
aliases:
- /ko/integrations/docker_daemon
app_id: 도커(Docker)
categories:
- 컨테이너
- 로그 수집
- 네트워크
custom_kind: 통합
description: 컨테이너 성능과 내부에서 실행 중인 서비스 성능을 상호 연결합니다.
further_reading:
- link: https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent
  tag: 설명서
  text: Docker Daemon documentation
- link: https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker
  tag: 설명서
  text: Docker Daemon documentation
- link: https://www.datadoghq.com/blog/the-docker-monitoring-problem
  tag: 블로그
  text: The Docker monitoring problem
- link: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
  tag: 블로그
  text: How to monitor Docker resource metrics
- link: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
  tag: 블로그
  text: How to collect Docker metrics
- link: https://www.datadoghq.com/docker-adoption
  tag: 설명서
  text: 8 surprising facts about real Docker adoption
integration_version: 1.12.0
media: []
supported_os:
- linux
- macos
title: 도커(Docker) Daemon
---
**참고**: 도커(Docker) Daemon 점검은 여전히 지원되나 **에이전트 v5**에서만 동작합니다.

<div class="alert alert-warning">
<b>에이전트 v6에서 도커(Docker) 통합을 사용하려면 하단 <a href="#에이전트-v6">에이전트 v6 섹션을</a> 참조하세요.</b>
</div>

![Docker default dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png)

## 개요

다음과 같이 본 에이전트 점검을 설정하여 Docker_daemon 서비스에서 메트릭을 실시간으로 가져옵니다.

- Docker_daemon 상태를 시각화 및 모니터링합니다.
- Docker_daemon 오류 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

To collect Docker metrics about all your containers, run **one** Datadog Agent on every host. There are two ways to run the Agent: directly on each host, or within a [docker-dd-agent container](https://github.com/DataDog/docker-dd-agent) (recommended).

For either option, your hosts need cgroup memory management enabled for the Docker check to succeed. See the [docker-dd-agent repository](https://github.com/DataDog/docker-dd-agent#cgroups) for how to enable it.

#### 호스트 설치

1. 도커(Docker)가 호스트에서 실행 중인지 확인합니다.
1. Install the Agent as described in [the Agent installation instructions](https://app.datadoghq.com/account/settings/agent/latest) for your host OS.
1. Enable [the Docker integration tile in the application](https://app.datadoghq.com/account/settings#integrations/docker).
1. `usermod -a -G docker dd-agent` 도커(Docker) 그룹에 에이전트 사용자를 추가합니다.
1. Create a `docker_daemon.yaml` file by copying [the example file in the Agent conf.d directory](https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example). If you have a standard install of Docker on your host, there shouldn't be anything you need to change to get the integration to work.
1. 추가 통합을 활성화하려면 `docker ps`으로 해당 애플리케이션에서 사용하는 포트를 식별하세요.
   ![Docker ps command](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png)

#### 컨테이너 설치

1. 도커(Docker)가 호스트에서 실행 중인지 확인합니다.

1. As per [the Docker container installation instructions](https://app.datadoghq.com/account/settings/agent/latest?platform=docker), run:

   ```
    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY={YOUR_DD_API_KEY} \
      datadog/docker-dd-agent:latest
   ```

위의 명령에서는 도커(Docker) 의 `-e` 환경 변수 플래그로 Datadog 에이전트에 API 키를 전달할 수 있습니다. 다른 변수는 다음과 같습니다.

| **변수**                                                                                      | **설명**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Datadog API 키를 설정합니다.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | 에이전트 컨테이너의 `datadog.conf` 파일 호스트명을 설정합니다. 해당 변수를 설정하지 않으면 에이전트 컨테이너는 기본값으로 `Name` 필드(`docker info` 명령으로 전송한)를 에이전트 컨테이너 호스트명으로 사용합니다.  |
| DD_URL                                                                                            | Sets the Datadog intake server URL where the Agent sends data. This is useful when [using the Agent as a proxy](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy).                                                                                                              |
| LOG_LEVEL                                                                                         | 로깅 상세도(중요, 오류, 경고, 정보, 디버그)를 설정합니다. 예를 들어 `-e LOG_LEVEL=DEBUG`의 경우 로깅을 디버그 모드로 설정합니다.                                                                                                    |
| TAGS                                                                                              | 호스트 태그를 쉼표로 구분한 문자열로 설정합니다. 단순 태그나 키 값 태그 모두 사용할 수 있습니다(예: `-e TAGS="simple-tag, tag-key:tag-value"`).                                                                           |
| EC2_TAGS                                                                                          | 본 기능을 활성화하면, 시작 도중 에이전트가 EC2 API를 사용하여 설정된 커스텀 태그를 캡처 및 쿼링할 수 있습니다. 활성화하려면 `-e EC2_TAGS=yes`를 사용합니다. **참고**: 본 기능을 사용하려면 인스턴스와 연결된 IAM 역할이 필요합니다.        |
| NON_LOCAL_TRAFFIC                                                                                 | Enabling this feature allows StatsD reporting from any external IP. To enable, use `-e NON_LOCAL_TRAFFIC=yes`. This is used to report metrics from other containers or systems. See [network configuration](https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration) for more details. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | Sets proxy configuration details. **Note**: `PROXY_PASSWORD` is required for passing in an authentication password and cannot be renamed. For more information, see the [Agent proxy documentation](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy).                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Enables and configures Autodiscovery. For more information, see the [Autodiscovery guide](https://docs.datadoghq.com/agent/autodiscovery).                                                                                                                                   |

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

The standard Docker image is based on Debian Linux, but as of Datadog Agent v5.7, there is an [Alpine Linux](https://alpinelinux.org) based image. The Alpine Linux image is considerably smaller in size than the traditional Debian-based image. It also inherits Alpine's security-oriented design.

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

For more information about building custom Docker containers with the Datadog Agent, the Alpine Linux based image, versioning, and more, reference the [docker-dd-agent project on Github](https://github.com/DataDog/docker-dd-agent).

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `docker_daemon` under the Checks section.

## 에이전트 v6

최신 도커(Docker) 점검은 `docker`로 명명되며 새로운 내부 아키텍처를 활용하기 위해 Go로 작성되었습니다. 에이전트 v6.0이후로는 `docker_daemon` 점검은 에이전트 v5에서 계속 사용 가능하고 유지되더라도 로드되지 않습니다. 다음과 같은 지원 중단 항목을 제외한 모든 기능은 6.0 이상 버전에서 포트됩니다.

- The `url`, `api_version` and `tags*` options are deprecated. Direct use of the [standard Docker environment variables](https://docs.docker.com/engine/reference/commandline/cli/#environment-variables) is encouraged.
- `ecs_tags`, `performance_tags`, `container_tags` 옵션 지원이 중단됩니다. 기본적으로 관련 태그는 전부 자동으로 수집합니다.
- `docker.container.count` 메트릭을 활성화하는  `collect_container_count` 옵션은 지원되지 않습니다. `docker.containers.running` 및 `.stopped`를 사용하세요.

일부 옵션은 `docker_daemon.yaml`에서 주요 `datadog.yaml`로 이동했습니다.

- `collect_labels_as_tags`의 이름이 `docker_labels_as_tags`로 바뀌었으며 카디널리티(cardinality)가 높은 태그를 지원합니다. 자세한 정보를 확인하려면 `datadog.yaml.example`를 참조하세요.
- `exclude` 및 `include` 리스트의 이름이  `ac_include` 및 `ac_exclude`로 변경되었습니다 . 이제 에이전트의 모든 컴포넌트에서 필터를 일관적으로 적용하기 위해 임의의 태그로 필터링하지 않아도 됩니다. 태그 필터링은 `image`(이미지명) 및 `name`(컨테이너명)만 지원됩니다. 정규식 필터링은 계속 사용할 수 있습니다. 예시를 확인하려면 `datadog.yaml.example`를 참조하세요.
- `docker_root` 옵션은 두 가지 옵션(`container_cgroup_root`, `container_proc_root`)으로 나뉘었습니다.
- `exclude_pause_container`를 추가하여 쿠버네티스(Kubernetes)와 Openshift에서 일시 중지된 컨테이너를 제외합니다(기본값: true). 오류로 인해 제외 목록에서 삭제되는 것을 방지할 수 있습니다.

추가 변경 사항:

- `TAGS` 환경 변수의 이름이 `DD_TAGS`로 변경되었습니다.
- The Docker Hub repository has changed from [datadog/docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent) to [datadog/agent](https://hub.docker.com/r/datadog/agent).

The [`import`](https://docs.datadoghq.com/agent/#cli) command converts the old `docker_daemon.yaml` to the new `docker.yaml`. The command also moves needed settings from `docker_daemon.yaml` to `datadog.yaml`.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **docker.container.open_fds** <br>(gauge) | The number of open file descriptors<br>_Shown as file_ |
| **docker.container.size_rootfs** <br>(gauge) | Total size of all the files in the container<br>_Shown as byte_ |
| **docker.container.size_rootfs.95percentile** <br>(gauge) | 95th percentile of docker.container.size_rootfs<br>_Shown as byte_ |
| **docker.container.size_rootfs.avg** <br>(gauge) | Average value of docker.container.size_rootfs<br>_Shown as byte_ |
| **docker.container.size_rootfs.count** <br>(rate) | The rate that the value of docker.container.size_rw was sampled<br>_Shown as sample_ |
| **docker.container.size_rootfs.max** <br>(gauge) | Max value of docker.container.size_rootfs<br>_Shown as byte_ |
| **docker.container.size_rootfs.median** <br>(gauge) | Median value of docker.container.size_rootfs<br>_Shown as byte_ |
| **docker.container.size_rw** <br>(gauge) | Total size of all the files in the container which have been created or changed by processes running in the container<br>_Shown as byte_ |
| **docker.container.size_rw.95percentile** <br>(gauge) | 95th percentile of docker.container.size_rw<br>_Shown as byte_ |
| **docker.container.size_rw.avg** <br>(gauge) | Average value of docker.container.size_rw<br>_Shown as byte_ |
| **docker.container.size_rw.count** <br>(rate) | The rate that the value of docker.container.size_rw was sampled<br>_Shown as sample_ |
| **docker.container.size_rw.max** <br>(gauge) | Max value of docker.container.size_rw<br>_Shown as byte_ |
| **docker.container.size_rw.median** <br>(gauge) | Median value of docker.container.size_rw<br>_Shown as byte_ |
| **docker.containers.running** <br>(gauge) | The number of containers running on this host tagged by image|
| **docker.containers.running.total** <br>(gauge) | The total number of containers running on this host|
| **docker.containers.stopped** <br>(gauge) | The number of containers stopped on this host tagged by image|
| **docker.containers.stopped.total** <br>(gauge) | The total number of containers stopped on this host|
| **docker.cpu.limit** <br>(gauge) | Limit on CPU available to the container, expressed as percentage of a core<br>_Shown as percent_ |
| **docker.cpu.shares** <br>(gauge) | Shares of CPU usage allocated to the container|
| **docker.cpu.system** <br>(gauge) | The percent of time the CPU is executing system calls on behalf of processes of this container, unnormalized<br>_Shown as percent_ |
| **docker.cpu.system.95percentile** <br>(gauge) | 95th percentile of docker.cpu.system \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.system.avg** <br>(gauge) | Average value of docker.cpu.system \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.system.count** <br>(rate) | The rate that the value of docker.cpu.system was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.cpu.system.max** <br>(gauge) | Max value of docker.cpu.system<br>_Shown as percent_ |
| **docker.cpu.system.median** <br>(gauge) | Median value of docker.cpu.system \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.throttled** <br>(gauge) | Number of times the cgroup has been throttled|
| **docker.cpu.usage** <br>(gauge) | The percent of CPU time obtained by this container<br>_Shown as percent_ |
| **docker.cpu.user** <br>(gauge) | The percent of time the CPU is under direct control of processes of this container, unnormalized<br>_Shown as percent_ |
| **docker.cpu.user.95percentile** <br>(gauge) | 95th percentile of docker.cpu.user \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.user.avg** <br>(gauge) | Average value of docker.cpu.user \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.user.count** <br>(rate) | The rate that the value of docker.cpu.user was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.cpu.user.max** <br>(gauge) | Max value of docker.cpu.user \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.cpu.user.median** <br>(gauge) | Median value of docker.cpu.user \[deprecated in agent 6.0\]<br>_Shown as percent_ |
| **docker.data.free** <br>(gauge) | Storage pool disk space free<br>_Shown as byte_ |
| **docker.data.percent** <br>(gauge) | The percent of storage pool used<br>_Shown as percent_ |
| **docker.data.total** <br>(gauge) | Storage pool disk space total<br>_Shown as byte_ |
| **docker.data.used** <br>(gauge) | Storage pool disk space used<br>_Shown as byte_ |
| **docker.image.size** <br>(gauge) | Size of all layers of the image on disk<br>_Shown as byte_ |
| **docker.image.virtual_size** <br>(gauge) | Size of all layers of the image on disk<br>_Shown as byte_ |
| **docker.images.available** <br>(gauge) | The number of top-level images|
| **docker.images.intermediate** <br>(gauge) | The number of intermediate images, which are intermediate layers that make up other images|
| **docker.io.read_bytes** <br>(gauge) | Bytes read per second from disk by the processes of the container<br>_Shown as byte_ |
| **docker.io.read_bytes.95percentile** <br>(gauge) | 95th percentile of docker.io.read_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.read_bytes.avg** <br>(gauge) | Average value of docker.io.read_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.read_bytes.count** <br>(rate) | The rate that the value of docker.io.read_bytes was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.io.read_bytes.max** <br>(gauge) | Max value of docker.container.io.read_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.read_bytes.median** <br>(gauge) | Median value of docker.container.io.read_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.write_bytes** <br>(gauge) | Bytes written per second to disk by the processes of the container<br>_Shown as byte_ |
| **docker.io.write_bytes.95percentile** <br>(gauge) | 95th percentile of docker.io.write_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.write_bytes.avg** <br>(gauge) | Average value of docker.io.write_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.write_bytes.count** <br>(rate) | The rate that the value of docker.io.write_bytes was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.io.write_bytes.max** <br>(gauge) | Max value of docker.container.io.write_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.io.write_bytes.median** <br>(gauge) | Median value of docker.container.io.write_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.kmem.usage** <br>(gauge) | The amount of kernel memory that belongs to the container's processes.<br>_Shown as byte_ |
| **docker.mem.cache** <br>(gauge) | The amount of memory that is being used to cache data from disk (e.g. memory contents that can be associated precisely with a block on a block device)<br>_Shown as byte_ |
| **docker.mem.cache.95percentile** <br>(gauge) | 95th percentile value of docker.mem.cache \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.cache.avg** <br>(gauge) | Average value of docker.mem.cache \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.cache.count** <br>(rate) | The rate that the value of docker.mem.cache was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.cache.max** <br>(gauge) | Max value of docker.mem.cache \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.cache.median** <br>(gauge) | Median value of docker.mem.cache \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.in_use** <br>(gauge) | The fraction of used memory to available memory, IF THE LIMIT IS SET<br>_Shown as fraction_ |
| **docker.mem.in_use.95percentile** <br>(gauge) | 95th percentile of docker.mem.in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.in_use.avg** <br>(gauge) | Average value of docker.mem.in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.in_use.count** <br>(rate) | The rate that the value of docker.mem.in_use was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.in_use.max** <br>(gauge) | Max value of docker.container.mem.in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.in_use.median** <br>(gauge) | Median value of docker.container.mem.in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.limit** <br>(gauge) | The memory limit for the container, if set<br>_Shown as byte_ |
| **docker.mem.limit.95percentile** <br>(gauge) | 95th percentile of docker.mem.limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.limit.avg** <br>(gauge) | Average value of docker.mem.limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.limit.count** <br>(rate) | The rate that the value of docker.mem.limit was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.limit.max** <br>(gauge) | Max value of docker.mem.limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.limit.median** <br>(gauge) | Median value of docker.mem.limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.rss** <br>(gauge) | The amount of non-cache memory that belongs to the container's processes. Used for stacks, heaps, etc.<br>_Shown as byte_ |
| **docker.mem.rss.95percentile** <br>(gauge) | 95th percentile value of docker.mem.rss \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.rss.avg** <br>(gauge) | Average value of docker.mem.rss \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.rss.count** <br>(rate) | The rate that the value of docker.mem.rss was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.rss.max** <br>(gauge) | Max value of docker.mem.rss \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.rss.median** <br>(gauge) | Median value of docker.mem.rss \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.soft_limit** <br>(gauge) | The memory reservation limit for the container, if set<br>_Shown as byte_ |
| **docker.mem.soft_limit.95percentile** <br>(gauge) | 95th percentile of docker.mem.soft_limit. Ordinarily this value will not change<br>_Shown as byte_ |
| **docker.mem.soft_limit.avg** <br>(gauge) | Average value of docker.mem.soft_limit. Ordinarily this value will not change<br>_Shown as byte_ |
| **docker.mem.soft_limit.count** <br>(rate) | The rate that the value of docker.mem.soft_limit was sampled<br>_Shown as sample_ |
| **docker.mem.soft_limit.max** <br>(gauge) | Max value of docker.mem.soft_limit. Ordinarily this value will not change<br>_Shown as byte_ |
| **docker.mem.soft_limit.median** <br>(gauge) | Median value of docker.mem.soft_limit. Ordinarily this value will not change<br>_Shown as byte_ |
| **docker.mem.sw_in_use** <br>(gauge) | The fraction of used swap + memory to available swap + memory, if the limit is set<br>_Shown as fraction_ |
| **docker.mem.sw_in_use.95percentile** <br>(gauge) | 95th percentile of docker.mem.sw_in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.sw_in_use.avg** <br>(gauge) | Average value of docker.mem.sw_in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.sw_in_use.count** <br>(rate) | The rate that the value of docker.mem.sw_in_use was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.sw_in_use.max** <br>(gauge) | Max value of docker.container.mem.sw_in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.sw_in_use.median** <br>(gauge) | Median value of docker.container.mem.sw_in_use \[deprecated in agent 6.0\]<br>_Shown as fraction_ |
| **docker.mem.sw_limit** <br>(gauge) | The swap + memory limit for the container, if set<br>_Shown as byte_ |
| **docker.mem.sw_limit.95percentile** <br>(gauge) | 95th percentile of docker.mem.sw_limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.sw_limit.avg** <br>(gauge) | Average value of docker.mem.sw_limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.sw_limit.count** <br>(rate) | The rate that the value of docker.mem.sw_limit was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.sw_limit.max** <br>(gauge) | Max value of docker.mem.sw_limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.sw_limit.median** <br>(gauge) | Median value of docker.mem.sw_limit. Ordinarily this value will not change \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.swap** <br>(gauge) | The amount of swap currently used by the container<br>_Shown as byte_ |
| **docker.mem.swap.95percentile** <br>(gauge) | 95th percentile value of docker.mem.swap \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.swap.avg** <br>(gauge) | Average value of docker.mem.swap \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.swap.count** <br>(rate) | The rate that the value of docker.mem.swap was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.mem.swap.max** <br>(gauge) | Max value of docker.mem.swap \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.mem.swap.median** <br>(gauge) | Median value of docker.mem.swap \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.metadata.free** <br>(gauge) | Storage pool metadata space free<br>_Shown as byte_ |
| **docker.metadata.percent** <br>(gauge) | The percent of storage pool metadata used<br>_Shown as percent_ |
| **docker.metadata.total** <br>(gauge) | Storage pool metadata space total<br>_Shown as byte_ |
| **docker.metadata.used** <br>(gauge) | Storage pool metadata space used<br>_Shown as byte_ |
| **docker.net.bytes_rcvd** <br>(gauge) | Bytes received per second from the network<br>_Shown as byte_ |
| **docker.net.bytes_rcvd.95percentile** <br>(gauge) | 95th percentile of docker.net.bytes_rcvd \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_rcvd.avg** <br>(gauge) | Average value of docker.net.bytes_rcvd \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_rcvd.count** <br>(rate) | The rate that the value of docker.net.bytes_rcvd was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.net.bytes_rcvd.max** <br>(gauge) | Max value of docker.container.net.bytes_rcvd \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_rcvd.median** <br>(gauge) | Median value of docker.container.net.bytes_rcvd \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_sent** <br>(gauge) | Bytes sent per second to the network<br>_Shown as byte_ |
| **docker.net.bytes_sent_bytes.95percentile** <br>(gauge) | 95th percentile of docker.net.bytes_sent_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_sent_bytes.avg** <br>(gauge) | Average value of docker.net.bytes_sent_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_sent_bytes.count** <br>(rate) | The rate that the value of docker.net.bytes_sent_bytes was sampled \[deprecated in agent 6.0\]<br>_Shown as sample_ |
| **docker.net.bytes_sent_bytes.max** <br>(gauge) | Max value of docker.container.net.bytes_sent_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.net.bytes_sent_bytes.median** <br>(gauge) | Median value of docker.container.net.bytes_sent_bytes \[deprecated in agent 6.0\]<br>_Shown as byte_ |
| **docker.thread.count** <br>(gauge) | Current thread count for the container<br>_Shown as thread_ |
| **docker.thread.limit** <br>(gauge) | Thread count limit for the container, if set<br>_Shown as thread_ |
| **docker.uptime** <br>(gauge) | Time since the container was started<br>_Shown as second_ |

### 이벤트

도커(Docker) 통합은 다음 이벤트를 생성합니다.

- Delete Image
- Die
- 오류
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- 업데이트

### 서비스 점검

**docker.service_up**

Returns `CRITICAL` if the Agent is unable to collect the list of containers from the Docker daemon. Returns `OK` otherwise.

_상태: ok, critical_

**docker.container_health**

Returns `CRITICAL` if a container is unhealthy. Returns `OK` otherwise or `UNKNOWN` if the health is unknown.

_상태: ok, critical, unknown_

**docker.exit**

Returns `CRITICAL` if a container exited with a non-zero exit code. Returns `OK` otherwise.

_상태: ok, critical_

## 트러블슈팅

Need help? Contact [Datadog support](https://docs.datadoghq.com/help).

## 참고 자료

- [Compose and the Datadog Agent](https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent)
- [DogStatsD and Docker](https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker)
- [The Docker Monitoring Problem](https://www.datadoghq.com/blog/the-docker-monitoring-problem) (series)
- [How to Monitor Docker Resource Metrics](https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics)
- [How to Collect Docker Metrics](https://www.datadoghq.com/blog/how-to-collect-docker-metrics)
- [8 Surprising Facts about Real Docker Adoption](https://www.datadoghq.com/docker-adoption)
- [Monitor Docker on Amazon ECS](https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs)
- [Dockerize Datadog](https://www.datadoghq.com/blog/docker-performance-datadog)
- [Monitor Docker with Datadog](https://www.datadoghq.com/blog/monitor-docker-datadog)