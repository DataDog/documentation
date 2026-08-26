---
aliases:
- /ko/integrations/docker_daemon
app_id: docker
categories:
- containers
- log collection
- network
custom_kind: integration
description: 컨테이너 성능과 내부에서 실행 중인 서비스 성능을 상호 연결합니다.
further_reading:
- link: https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent
  tag: 설명서
  text: Docker Daemon 문서
- link: https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker
  tag: 설명서
  text: Docker Daemon 문서
- link: https://www.datadoghq.com/blog/the-docker-monitoring-problem
  tag: 블로그
  text: Docker 모니터링 문제
- link: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
  tag: 블로그
  text: Docker 리소스 메트릭 모니터링 방법
- link: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
  tag: 블로그
  text: Docker 메트릭 수집 방법
- link: https://www.datadoghq.com/docker-adoption
  tag: 설명서
  text: 실제 Docker 도입에 관한 8가지 놀라운 사실
integration_version: 1.12.0
media: []
supported_os:
- linux
- macos
title: Docker Daemon
---
**참고**: Docker Daemon 점검은 여전히 지원되나 **Agent v5**에서만 동작합니다.

<div class="alert alert-warning">
<b>Agent v6에서 Docker 통합을 사용하려면 하단 <a href="#Agent-v6">Agent v6 섹션을</a> 참조하세요.</b>
</div>

![Docker 기본 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png)

## 개요

다음과 같이 본 Agent 점검을 설정하여 Docker_daemon 서비스에서 메트릭을 실시간으로 가져옵니다.

- Docker_daemon 상태를 시각화 및 모니터링합니다.
- Docker_daemon 오류 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

모든 컨테이너에서 Docker 메트릭을 수집하려면 호스트에서 Datadog Agent **하나**를 실행합니다. 각 호스트에서 Agent를 직접 실행하거나 [docker-dd-agent 컨테이너](https://github.com/DataDog/docker-dd-agent)(권장) 내에서 실행하는 두 가지 방법이 있습니다.

두 옵션 모두 Docker 점검을 완료하려면 호스트의 cgroup 메모리 관리가 활성화되어 있어야 합니다. 활성화하는 방법을 확인하려면 [docker-dd-agent 리포지토리](https://github.com/DataDog/docker-dd-agent#cgroups)를 참조하세요.

#### 호스트 설치

1. Docker가 호스트에서 실행 중인지 확인합니다.
1. 호스트 OS용 [Agent 설치 지침](https://app.datadoghq.com/account/settings/agent/latest)에 설명된 대로 Agent를 설치합니다.
1. [애플리케이션에서 Docker 통합 타일](https://app.datadoghq.com/account/settings#integrations/docker)을 활성화합니다.
1. `usermod -a -G docker dd-agent` Docker 그룹에 Agent 사용자를 추가합니다.
1. [Agent conf.d 디렉터리의 예제 파일](https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example)을 복사하여 `docker_daemon.yaml` 파일을 생성합니다. 호스트에 Docker를 표준 설치한 경우 통합을 실행하기 위해 이를 변경하지 않아도 됩니다.
1. 추가 통합을 활성화하려면 `docker ps`으로 해당 애플리케이션에서 사용하는 포트를 식별하세요.
   ![Docker ps 명령](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png)

#### 컨테이너 설치

1. Docker가 호스트에서 실행 중인지 확인합니다.

1. [Docker 컨테이너 설치 지침](https://app.datadoghq.com/account/settings/agent/latest?platform=docker)에 따라 다음을 실행합니다.

   ```
    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY={YOUR_DD_API_KEY} \
      datadog/docker-dd-agent:latest
   ```

위의 명령에서는 Docker 의 `-e` 환경 변수 플래그로 Datadog Agent에 API 키를 전달할 수 있습니다. 다른 변수는 다음과 같습니다.

| **변수**                                                                                      | **설명**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Datadog API 키를 설정합니다.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | Agent 컨테이너의 `datadog.conf` 파일 호스트명을 설정합니다. 해당 변수를 설정하지 않으면 Agent 컨테이너는 기본값으로 `Name` 필드(`docker info` 명령으로 전송한)를 Agent 컨테이너 호스트명으로 사용합니다.  |
| DD_URL                                                                                            | Agent에서 데이터를 전송하는 Datadog 인테이크 서버 URL을 설정합니다. [Agent를 프록시로 사용할 때] 유용합니다(https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy).                                                                                                              |
| LOG_LEVEL                                                                                         | 로깅 상세도(중요, 오류, 경고, 정보, 디버그)를 설정합니다. 예를 들어 `-e LOG_LEVEL=DEBUG`의 경우 로깅을 디버그 모드로 설정합니다.                                                                                                    |
| TAGS                                                                                              | 호스트 태그를 쉼표로 구분한 문자열로 설정합니다. 단순 태그나 키 값 태그 모두 사용할 수 있습니다(예: `-e TAGS="simple-tag, tag-key:tag-value"`).                                                                           |
| EC2_TAGS                                                                                          | 본 기능을 활성화하면, 시작 도중 Agent가 EC2 API를 사용하여 설정된 커스텀 태그를 캡처 및 쿼링할 수 있습니다. 활성화하려면 `-e EC2_TAGS=yes`를 사용합니다. **참고**: 본 기능을 사용하려면 인스턴스와 연결된 IAM 역할이 필요합니다.        |
| NON_LOCAL_TRAFFIC                                                                                 | 본 기능을 활성화하면 어떤 외부 IP에서든 StatsD를 보고할 수 있습니다. 활성화하려면  `-e NON_LOCAL_TRAFFIC=yes`를 사용합니다. 이는 다른 컨테이너 또는 시스템에서 메트릭을 보고하는 데 사용됩니다. 자세한 내용을 확인하려면 [네트워크 설정](https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration)을 참조하세요. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | 프록시 구성 세부 정보를 설정합니다. **참고**: `PROXY_PASSWORD`는 인증 비밀번호를 전달하는 데 필요하며, 이름을 변경할 수 없습니다. 자세한 내용을 확인하려면 [Agent 프록시 문서](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy)를 참조하세요.                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Autodiscovery 기능을 활성화 및 구성합니다. 자세한 내용을 확인하려면 [Autodiscovery 지침](https://docs.datadoghq.com/agent/autodiscovery)을 참조하세요.                                                                                                                                   |

**참고**: Agent 재시작을 되도록 줄이려면 `--restart=unless-stopped`를 추가합니다.

#### 아마존 리눅스에서 Agent 컨테이너 실행하기

아마존 리눅스에서 Datadog Agent 컨테이너를 실행하려면 다음과 같이 `cgroup` 볼륨 마운트 위치로 변경합니다.

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest
```

#### 컨테이너 기반 Alpine Linux

Docker 이미지는 Debian Linux에 기반하나,  Datadog Agent v5.7부터는 [Alpine Linux](https://alpinelinux.org) 기반 이미지를 제공합니다. Alpine Linux 이미지는 기존 Debian 기반 이미지보다 크기가 상당히 작습니다. 또한 Alpine의 보안 지향적 디자인을 계승합니다.

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

Datadog Agent 버전 5.5.0부터 Docker 이미지는 새로운 버전 관리 패턴을 따릅니다. 따라서 Datadog은 동일한 Agent 버전으로 Datadog Agent의 Docker 이미지 변경 사항을 릴리스합니다.

Docker 이미지 버전은 다음과 같은 패턴을 갖습니다. **X.Y.Z**에서 **X**는 Docker 이미지의 메이저 버전, **Y**는 마이너 버전, **Z**는 Agent 버전을 나타냅니다.

예를 들어 Datadog Agent 5.5.0을 번들로 제공하는 Docker 이미지의 첫 번째 버전은 `10.0.550`입니다.

#### 컨테이너 사용자 지정 및 추가 정보

Datadog Agent로 커스텀 Docker 컨테이너 빌드, Alpine Linux 기반 이미지 및 버전 관리 등에 대한 자세한 내용을 확인하려면 [Github의 docker-dd-agent 프로젝트](https://github.com/DataDog/docker-dd-agent)를 참조하세요.

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `docker_daemon`을 찾습니다. 

## Agent v6

최신 Docker 점검은 `docker`로 명명되며 새로운 내부 아키텍처를 활용하기 위해 Go로 작성되었습니다. Agent v6.0이후로는 `docker_daemon` 점검은 Agent v5에서 계속 사용 가능하고 유지되더라도 로드되지 않습니다. 다음과 같은 지원 중단 항목을 제외한 모든 기능은 6.0 이상 버전에서 포트됩니다.

- `url`, `api_version`, `tags*` 옵션 지원이 중단됩니다. [표준 Docker 환경 변수](https://docs.docker.com/engine/reference/commandline/cli/#environment-variables)를 직접 사용하시길 권장합니다.
- `ecs_tags`, `performance_tags`, `container_tags` 옵션 지원이 중단됩니다. 기본적으로 관련 태그는 전부 자동으로 수집합니다.
- `docker.container.count` 메트릭을 활성화하는  `collect_container_count` 옵션은 지원되지 않습니다. `docker.containers.running` 및 `.stopped`를 사용하세요.

일부 옵션은 `docker_daemon.yaml`에서 주요 `datadog.yaml`로 이동했습니다.

- `collect_labels_as_tags`의 이름이 `docker_labels_as_tags`로 바뀌었으며 카디널리티(cardinality)가 높은 태그를 지원합니다. 자세한 정보를 확인하려면 `datadog.yaml.example`를 참조하세요.
- `exclude` 및 `include` 리스트의 이름이  `ac_include` 및 `ac_exclude`로 변경되었습니다 . 이제 Agent의 모든 컴포넌트에서 필터를 일관적으로 적용하기 위해 임의의 태그로 필터링하지 않아도 됩니다. 태그 필터링은 `image`(이미지명) 및 `name`(컨테이너명)만 지원됩니다. 정규식 필터링은 계속 사용할 수 있습니다. 예시를 확인하려면 `datadog.yaml.example`를 참조하세요.
- `docker_root` 옵션은 두 가지 옵션(`container_cgroup_root`, `container_proc_root`)으로 나뉘었습니다.
- `exclude_pause_container`를 추가하여 쿠버네티스(Kubernetes)와 Openshift에서 일시 중지된 컨테이너를 제외합니다(기본값: true). 오류로 인해 제외 목록에서 삭제되는 것을 방지할 수 있습니다.

추가 변경 사항:

- `TAGS` 환경 변수의 이름이 `DD_TAGS`로 변경되었습니다.
- Docker Hub 리포지토리가 [datadog/docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent)에서 [datadog/agent](https://hub.docker.com/r/datadog/agent)로 변경되었습니다.

[`import`](https://docs.datadoghq.com/agent/#cli) 명령은 기존 `docker_daemon.yaml`을 신규 `docker.yaml`으로 변환합니다. 또한 필요한 설정을 `docker_daemon.yaml`에서 `datadog.yaml`로 이동합니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **docker.container.open_fds** <br>(gauge) | 열려있는 파일 디스크립터 수<br>_file로 표시됨_ |
| **docker.container.size_rootfs** <br>(gauge) | 컨테이너에 있는 모든 파일의 총 크기<br>_byte로 표시_ |
| **docker.container.size_rootfs.95percentile** <br>(gauge) | docker.container.size_rootfs의 95번째 백분위수<br>_byte로 표시_ |
| **docker.container.size_rootfs.avg** <br>(gauge) | docker.container.size_rootfs의 평균값<br>_byte로 표시_ |
| **docker.container.size_rootfs.count** <br>(rate) | docker.container.size_rw 값의 샘플링 속도<br>_sample로 표시_ |
| **docker.container.size_rootfs.max** <br>(gauge) | docker.container.size_rootfs의 최댓값<br>_byte로 표시_ |
| **docker.container.size_rootfs.median** <br>(gauge) | docker.container.size_rootfs의 중앙값<br>_byte로 표시_ |
| **docker.container.size_rw** <br>(gauge) | 컨테이너에서 실행 중인 프로세스에 의해 생성되거나 변경된, 컨테이너 내 모든 파일의 총 크기<br>_byte로 표시_ |
| **docker.container.size_rw.95percentile** <br>(gauge) | docker.container.size_rw의 95번째 백분위수<br>_byte로 표시_ |
| **docker.container.size_rw.avg** <br>(gauge) | docker.container.size_rw의 평균값<br>_byte로 표시_ |
| **docker.container.size_rw.count** <br>(rate) | docker.container.size_rw 값의 샘플링 속도<br>_sample로 표시_ |
| **docker.container.size_rw.max** <br>(gauge) | docker.container.size_rw의 최댓값<br>_byte로 표시_ |
| **docker.container.size_rw.median** <br>(gauge) | docker.container.size_rw의 중앙값<br>_byte로 표시_ |
| **docker.containers.running** <br>(gauge) | 이미지로 태그된, 해당 호스트에서 실행 중인 컨테이너의 수|
| **docker.containers.running.total** <br>(gauge) | 해당 호스트에서 실행 중인 총 컨테이너의 수|
| **docker.containers.stopped** <br>(gauge) | 이미지로 태그된, 해당 호스트에서 중단된 컨테이너의 수|
| **docker.containers.stopped.total** <br>(gauge) | 해당 호스트에서 중지된 총 컨테이너의 수|
| **docker.cpu.limit** <br>(gauge) | 코어의 백분률로 표시된, 컨테이너에서 사용할 수 있는 CPU 한도<br>_percent로 표시_ |
| **docker.cpu.shares** <br>(gauge) | 컨테이너에 할당된 CPU 사용량 점유분|
| **docker.cpu.system** <br>(gauge) | CPU가 해당 컨테이너의 프로세스를 대신하여 시스템 호출을 실행하는 시간의 백분율(비정규화됨)<br>_percent로 표시_ |
| **docker.cpu.system.95percentile** <br>(gauge) | docker.cpu.system의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.system.avg** <br>(gauge) | docker.cpu.system의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.system.count** <br>(rate) | docker.cpu.system 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.cpu.system.max** <br>(gauge) | docker.cpu.system의 최댓값<br>_percent로 표시_ |
| **docker.cpu.system.median** <br>(gauge) | docker.cpu.system의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.throttled** <br>(gauge) | cgroup이 스로틀링된 횟수|
| **docker.cpu.usage** <br>(gauge) | 이 컨테이너가 획득한 CPU 시간의 백분율<br>_percent로 표시_ |
| **docker.cpu.user** <br>(gauge) | 컨테이너의 프로세스가 CPU가를 직접 제어하는 시간의 백분율(비정규화됨)<br>_percent로 표시_ |
| **docker.cpu.user.95percentile** <br>(gauge) | docker.cpu.user의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.user.avg** <br>(gauge) | docker.cpu.user의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.user.count** <br>(rate) | docker.cpu.user 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.cpu.user.max** <br>(gauge) | docker.cpu.user의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.cpu.user.median** <br>(gauge) | docker.cpu.user의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_percent로 표시_ |
| **docker.data.free** <br>(gauge) | 스토리지 풀의 디스크 여유 공간<br>_byte로 표시_ |
| **docker.data.percent** <br>(gauge) | 사용된 스토리지 풀의 비율<br>_percent로 표시_ |
| **docker.data.total** <br>(gauge) | 스토리지 풀의 총 디스크 공간<br>_byte로 표시_ |
| **docker.data.used** <br>(gauge) | 스토리지 풀 디스크 공간 사용량<br>_byte로 표시_ |
| **docker.image.size** <br>(gauge) | 디스크에 있는 이미지의 모든 레이어 크기<br>_byte로 표시_ |
| **docker.image.virtual_size** <br>(gauge) | 디스크에 있는 이미지의 모든 레이어 크기<br>_byte로 표시_ |
| **docker.images.available** <br>(gauge) | 상위 레벨 이미지 수|
| **docker.images.intermediate** <br>(gauge) | 다른 이미지를 구성하는 중간 레이어인 중간 이미지의 수.|
| **docker.io.read_bytes** <br>(gauge) | 컨테이너의 프로세스가 디스크에서 초당 읽는 바이트 수<br>_byte로 표시_ |
| **docker.io.read_bytes.95percentile** <br>(gauge) | docker.io.read_bytes의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.read_bytes.avg** <br>(gauge) | docker.io.read_bytes의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.read_bytes.count** <br>(rate) | docker.io.read_bytes 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.io.read_bytes.max** <br>(gauge) | docker.container.io.read_bytes의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.read_bytes.median** <br>(gauge) | docker.container.io.read_bytes의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.write_bytes** <br>(gauge) | 컨테이너의 프로세스가 디스크에 초당 기록하는 바이트 수<br>_byte로 표시_ |
| **docker.io.write_bytes.95percentile** <br>(gauge) | docker.io.write_bytes의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.write_bytes.avg** <br>(gauge) | docker.io.write_bytes의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.write_bytes.count** <br>(rate) | docker.io.write_bytes 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.io.write_bytes.max** <br>(gauge) | docker.container.io.write_bytes의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.io.write_bytes.median** <br>(gauge) | docker.container.io.write_bytes의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.kmem.usage** <br>(gauge) | 컨테이너의 프로세스에 속한 커널 메모리의 양.<br>_byte로 표시_ |
| **docker.mem.cache** <br>(gauge) | 디스크에서 데이터를 캐시하는 데 사용되는 메모리 양(예: 블록 디바이스의 블록과 정확하게 연관될 수 있는 메모리 콘텐츠)<br>_바이트로 표시_. |
| **docker.mem.cache.95percentile** <br>(gauge) | docker.mem.cache의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.cache.avg** <br>(gauge) | docker.mem.cache의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.cache.count** <br>(rate) | docker.mem.cache 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.cache.max** <br>(gauge) | docker.mem.cache의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.cache.median** <br>(gauge) | docker.mem.cache의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.in_use** <br>(gauge) | 사용 가능한 메모리 대비 사용 메모리 비율(한도가 설정된 경우)<br>_fraction으로 표시_ |
| **docker.mem.in_use.95percentile** <br>(gauge) | docker.mem.in_use의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.in_use.avg** <br>(gauge) | docker.mem.in_use의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.in_use.count** <br>(rate) | docker.mem.in_use 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.in_use.max** <br>(gauge) | docker.container.mem.in_use의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.in_use.median** <br>(gauge) | docker.container.mem.in_use의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.limit** <br>(gauge) | 컨테이너의 메모리 한도(설정된 경우)<br>_byte로 표시_ |
| **docker.mem.limit.95percentile** <br>(gauge) | docker.mem.limit의 95번째 백분위수. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.limit.avg** <br>(gauge) | docker.mem.limit의 평균값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.limit.count** <br>(rate) | docker.mem.limit 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.limit.max** <br>(gauge) | docker.mem.limit의 최댓값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.limit.median** <br>(gauge) | docker.mem.limit의 중앙값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.rss** <br>(gauge) | 컨테이너의 프로세스에 속한 논캐시(non-cache) 메모리의 양. 스택, 힙 등에 사용됩니다.<br>_byte로 표시_ |
| **docker.mem.rss.95percentile** <br>(gauge) | docker.mem.rss의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.rss.avg** <br>(gauge) | docker.mem.rss의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.rss.count** <br>(rate) | docker.mem.rss 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.rss.max** <br>(gauge) | docker.mem.rss의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.rss.median** <br>(gauge) | docker.mem.rss의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.soft_limit** <br>(gauge) | 컨테이너의 메모리 예약 제한(설정된 경우)<br>_byte로 표시_ |
| **docker.mem.soft_limit.95percentile** <br>(gauge) | docker.mem.soft_limit의 95번째 백분위수. 일반적으로 해당 값은 변하지 않습니다.<br>_byte로 표시_ |
| **docker.mem.soft_limit.avg** <br>(gauge) | docker.mem.soft_limit의 평균값. 일반적으로 해당 값은 변하지 않습니다.<br>_byte로 표시_ |
| **docker.mem.soft_limit.count** <br>(rate) | docker.mem.soft_limit 값의 샘플링 속도<br>_sample로 표시_ |
| **docker.mem.soft_limit.max** <br>(gauge) | docker.mem.soft_limit의 최댓값. 일반적으로 해당 값은 변하지 않습니다.<br>_byte로 표시_ |
| **docker.mem.soft_limit.median** <br>(gauge) | docker.mem.soft_limit의 중앙값. 일반적으로 해당 값은 변하지 않습니다.<br>_byte로 표시_ |
| **docker.mem.sw_in_use** <br>(gauge) | 가용 스왑 + 메모리 대비 사용된 스왑 + 메모리의 비율(제한 설정된 경우)<br>_fraction으로 표시_ |
| **docker.mem.sw_in_use.95percentile** <br>(gauge) | docker.mem.sw_in_use의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.sw_in_use.avg** <br>(gauge) | docker.mem.sw_in_use의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.sw_in_use.count** <br>(rate) | docker.mem.sw_in_use 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.sw_in_use.max** <br>(gauge) | docker.container.mem.sw_in_use의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.sw_in_use.median** <br>(gauge) | docker.container.mem.sw_in_use의 중앙값 \[Agent 6.0에서 지원 중단됨\]<br>_fraction으로 표시_ |
| **docker.mem.sw_limit** <br>(gauge) | 컨테이너의 스왑 + 메모리 제한(설정된 경우)<br>_byte로 표시_ |
| **docker.mem.sw_limit.95percentile** <br>(gauge) | docker.mem.sw_limit의 95번째 백분위수. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.sw_limit.avg** <br>(gauge) | docker.mem.sw_limit의 평균값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.sw_limit.count** <br>(rate) | docker.mem.sw_limit 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.sw_limit.max** <br>(gauge) | docker.mem.sw_limit의 최댓값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.sw_limit.median** <br>(gauge) | docker.mem.sw_limit의 중앙값. 일반적으로 해당 값은 변하지 않습니다. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.swap** <br>(gauge) | 컨테이너가 현재 사용 중인 스왑 양<br>_byte로 표시_ |
| **docker.mem.swap.95percentile** <br>(gauge) | docker.mem.swap의 95번째 백분위수 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.swap.avg** <br>(gauge) | docker.mem.swap의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.swap.count** <br>(rate) | docker.mem.swap 값의 샘플링 속도 \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.mem.swap.max** <br>(gauge) | docker.mem.swap의 최댓값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.mem.swap.median** <br>(gauge) | docker.mem.swap의 중앙값. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.metadata.free** <br>(gauge) | 스토리지 풀의 메타데이터 여유 공간<br>_byte로 표시_ |
| **docker.metadata.percent** <br>(gauge) | 사용된 스토리지 풀 메타데이터의 비율<br>_percent로 표시_ |
| **docker.metadata.total** <br>(gauge) | 스토리지 풀의 메타데이터 총 공간<br>_byte로 표시_ |
| **docker.metadata.used** <br>(gauge) | 스토리지 풀 메타데이터 공간 사용량<br>_byte로 표시_ |
| **docker.net.bytes_rcvd** <br>(gauge) | 네트워크에서 초당 수신한 바이트<br>_byte로 표시_ |
| **docker.net.bytes_rcvd.95percentile** <br>(gauge) | docker.net.bytes_rcvd의 95번째 백분위수. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_rcvd.avg** <br>(gauge) | docker.net.bytes_rcvd의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_rcvd.count** <br>(rate) | docker.net.bytes_rcvd 값의 샘플링 속도. \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.net.bytes_rcvd.max** <br>(gauge) | docker.container.net.bytes_rcvd의 최댓값. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_rcvd.median** <br>(gauge) | docker.container.net.bytes_rcvd의 중앙값. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_sent** <br>(gauge) | 네트워크로 초당 전송된 바이트<br>_byte로 표시_ |
| **docker.net.bytes_sent_bytes.95percentile** <br>(gauge) | docker.net.bytes_sent_bytes의 95번째 백분위수. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_sent_bytes.avg** <br>(gauge) | docker.net.bytes_sent_bytes의 평균값 \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_sent_bytes.count** <br>(rate) | docker.net.bytes_sent_bytes 값의 샘플링 속도. \[Agent 6.0에서 지원 중단됨\]<br>_sample로 표시_ |
| **docker.net.bytes_sent_bytes.max** <br>(gauge) | docker.container.net.bytes_sent_bytes의 최댓값. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.net.bytes_sent_bytes.median** <br>(gauge) | docker.container.net.bytes_sent_bytes의 중앙값. \[Agent 6.0에서 지원 중단됨\]<br>_byte로 표시_ |
| **docker.thread.count** <br>(gauge) | 컨테이너의 현재 스레드 수<br>_thread로 표시_ |
| **docker.thread.limit** <br>(gauge) | 컨테이너의 스레드 수 한도(설정된 경우)<br>_thread로 표시_ |
| **docker.uptime** <br>(gauge) | 컨테이너가 시작된 이후 경과된 시간<br>_second로 표시_ |

### 이벤트

Docker 통합은 다음 이벤트를 생성합니다.

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

Agent가 Docker Daemon에서 컨테이너 목록을 수집할 수 없는 경우 `CRITICAL`을, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**docker.container_health**

컨테이너가 정상 상태가 아닌 경우 `CRITICAL`을 반환합니다. 그렇지 않으면 `OK`, 상태를 알 수 없는 경우 `UNKNOWN`을 반환합니다.

_상태: ok, critical, unknown_

**docker.exit**

컨테이너가 0이 아닌 종료 코드로 종료된 경우 `CRITICAL`을, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀](https://docs.datadoghq.com/help)에 문의하세요.

## 참고 자료

- [Compose 및 Datadog Agent](https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent)
- [DogStatsD 및 Docker](https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker)
- [Docker 모니터링 문제](https://www.datadoghq.com/blog/the-docker-monitoring-problem)(시리즈)
- [Docker 리소스 메트릭 모니터링 방법](https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics)
- [Docker 메트릭 수집 방법](https://www.datadoghq.com/blog/how-to-collect-docker-metrics)
- [실제 Docker 도입에 대한 8가지 놀라운 사실](https://www.datadoghq.com/docker-adoption)
- [Amazon ECS에서 Docker 모니터링하기](https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs)
- [Datadog을 Docker로 컨테이너화하기](https://www.datadoghq.com/blog/docker-performance-datadog)
- [Datadog으로 Docker 모니터링하기](https://www.datadoghq.com/blog/monitor-docker-datadog)