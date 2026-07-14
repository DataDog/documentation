---
aliases:
- /ko/agent/faq/agent-5-autodiscovery
private: true
title: Agent v5를 활용한 자동탐지
---

<div class="alert alert-info">
자동탐지는 이전에 서비스 탐지(Service Discovery)라는 이름으로 불렸습니다. Agent 코드와 일부 설정 옵션에서는 여전히 서비스 탐지라는 이름을 사용하기도 합니다.
</div>

도커(Docker)는 [빠르게 도입되고 있습니다][1]. 도커 Swarm, 쿠버네티스ㄹ(Kubernetes), Amazon ECS 등의 오케스트레이션 플랫폼은 여러 호스트 간의 오케스트레이션과 레플리케이션을 관리하여 도커화된(Dockerized) 서비스를 용이하게 실행하도록 돕고, 회복 탄력성을 높여줍니다. 하지만 모니터링은 더욱 어려워지고 있습니다. 호스트 사이를 예측 불가능하게 이동하는 서비스를 대상으로 신뢰도 높은 모니터링 결과를 얻으려면 어떻게 해야 할까요?

Datadog Agent는 자동탐지 기능을 사용하여 어떤 서비스가 어디에서 실행되고 있는지를 자동으로 추적합니다. 자동탐지를 사용하면 Agent 점검 설정 템플릿을 정의하고, 각 점검을 어떤 컨테이너에 적용할지 지정할 수 있습니다.

Agent는 컨테이너 상태가 바뀌면 정적 점검 구성을 활성화/비활성화하거나 템플릿에서 재생성합니다. 예를 들어 NGINX 컨테이너가 10.0.6에서 10.0.0.17로 이동하면 Agent는 자동탐지 기능을 이용하여 NGINX 점검 구성을 새로운 IP 주소로 갱신합니다. 따라서 사용자가 따로 조작하지 않아도 NGINX 메트릭을 계속 수집할 수 있습니다.

## 개요

전통적인 비(非) 컨테이너 환경에서 Datadog Agent 설정은 환경과 마찬가지로 정적입니다. Agent는 부팅 시 디스크에서 점검 설정을 읽어내고, 실행 중에 구성된 모든 점검을 지속해서 수행합니다.

설정 파일은 정적입니다. 설정 파일 내에서 구성된 네트워크 관련 옵션은 모니터링 대상 서비스 인스턴스를(예: 10.0.0.61:6379의 Redis 인스턴스) 특정하기 위해 사용됩니다. Agent 점검이 원하는 서비스에 연결할 수 없는 경우 사용자가 문제를 해결할 때까지 메트릭이 제공되지 않습니다. Agent 점검은 관리자가 모니터링 대상 서비스를 복원하거나 점검 설정을 수정할 때까지 실패한 연결을 재시도합니다.

자동탐지를 활성화하면 에이전트는 다양한 방법으로 점검을 실행합니다.

### 다양한 설정

정적 구성 파일은 항상 변화하는 네트워크 엔드포인트에서 데이터를 수집하는 점검에 적합하지 않습니다. 그래서 자동탐지는 점검 구성에 **템플릿(*을 사용합니다. Agent는 각 템플릿에서 2개의 템플릿 변수(`%%host%%`와 `%%port%%`를 찾습니다. 이 변수는 대부분 하드코드(hardcode)되는 네트워크 옵션을 대신하여 위치합니다. 예를 들어 Agent의 [GoExpvar 점검][2] 템플릿에는 옵션 `expvar_url: http://%%host%%:%%port%%`가 포함됩니다. 여러 IP 주소 또는 공개 포트를 가진 컨테이너의 경우, 자동탐지에서 [템플릿 변수 인덱스](#supported-template-variables)를 사용하여 올바른 주소/포트를 선택하도록 명령할 수 있습니다.

템플릿은 모니터링할 서비스의 인스턴스를(어느`%host%`의 `%port%`든) 특정하지 않습니다. 따라서 자동탐지가 템플릿에 대입할 IP와 포트를 판단할 수 있도록, 템플릿별로 하나 이상의 **컨테이너 식별자**가 필요합니다. 도커의 경우 컨테이너 식별자는 이미지 이름이나 컨테이너 라벨입니다.

마지막으로 자동탐지는 점검 템플릿을 디스크 이외의 장소에서 불러올 수 있습니다. 다른 **템플릿 소스**로는 Consul 등의 키값(key-value) 스토어나, 쿠버네티스에서 실행하는 경우 팟 어노테이션이 있습니다.

### 다양한 실행 방법

자동탐지를 활성화하고 Agent를 시작하면 Agent는 [어느 하나의 소스가 아닌](#template-source-precedence), 사용 가능한 모든 템플릿 소스에서 점검 템플릿과 템플릿의 컨테이너 식별자를 함께 불러옵니다. 기존 Agent 설정과 달리, Agent가 항상 모든 점검을 수행하지는 않습니다. Agent는 Agent로서 같은 호스트에서 실행되는 모든 컨테이너를 조사하여 활성화할 점검을 결정합니다.

Agent는 실행 중인 컨테이너를 조사할 때 불러온 템플릿 한 개의 컨테이너 식별자가 해당 컨테이너와 일치하는지 확인합니다. 그리고 일치할 때마다 컨테이너의 IP 주소와 포트를 대입한 정적 점검 설정을 생성합니다. 또, 해당 정적 설정을 사용해 점검을 활성화합니다.

Agent는 도커 이벤트(컨테이너 생성, 폐기, 부팅, 정지)를 모니터링하고 이벤트 발생 시 정적 점검 구성을 활성화/비활성화하거나 재생성합니다.

## 설정 방법

### Agent 컨테이너의 실행

어떤 컨테이너 오케스트레이션 플랫폼을 사용하든, 클러스터의 각 호스트에서 처음에 단일 [docker-dd-agent 컨테이너][3]를 실행해야 합니다. 쿠버네티스를 사용하는 경우, docker-dd-agent의 실행법을 알아보려면 [쿠버네티스 통합 안내 페이지][4]를 참조하시기 바랍니다. Amazon ECS를 사용한다면 [Amazon ECS 통합 안내 페이지][5]를 참조하세요.

도커 Swarm을 사용한다면 관리자 노드에서 다음의 명령어를 실행하세요.

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR_DATADOG_API_KEY> \
      -e SD_BACKEND=docker \
      gcr.io/datadoghq/docker-dd-agent:latest

또는 docker-dd-agent 설명서를 참조해 자세한 안내를 받고, 지원되는 [환경 변수][6]의 전체 목록을 확인하시기 바랍니다.

**Agent가 JMX 기반 점검을 자동탐지하길 원하는 경우**:

1. `gcr.io/datadoghq/docker-dd-agent:latest-jmx` 이미지를 사용하세요. 이 이미지는 `latest`를 기반으로 하나, Agent에서 [jmxfetch][7]를 실행할 때 필요한 JVM을 포함합니다.
2. `gcr.io/datadoghq/docker-dd-agent:latest-jmx`를 시작할 때 환경 변수 `SD_JMX_ENABLE=yes`를 전달하세요.

## 점검 템플릿

아래의 각 **템플릿 소스** 섹션에서 점검 템플릿과 컨테이너 식별자를 설정하는 방법을 알려드리겠습니다.

### 파일(auto-conf)

템플릿을 로컬 파일로 저장할 때는 외부 서비스나 오케스트레이션 플랫폼이 필요하지 않습니다. 이 방법의 단점은 템플릿을 변경, 추가하거나 삭제할 때마다 Agent 컨테이너를 다시 시작해야 한다는 것입니다.

Agent는 `conf.d/auto_conf` 디렉터리에서 자동탐지 템플릿을 찾습니다. 다음의 점검에 해당하는 기본 템플릿이 이 디렉터리에 포함됩니다.

- [Apache][8]
- [Consul][9]
- [CouchDB][10]
- [Couchbase][11]
- [Elasticsearch][12]
- [Etcd][13]
- [Kubernetes_state][14]
- [Kube_dns][15]
- [Kyototycoon][16]
- [Memcached][17]
- [Redis][18]
- [Riak][19]

기본적으로는 이 템플릿만으로 충분합니다. 그러나 기타 점검 옵션을 활성화하는 경우, 여러 컨테이너 식별자를 사용하는 경우, [템플릿 변수 인덱스](#supported-template-variables)를 사용하는 경우 등에는 Agent 커스텀 점검 설정을 사용해야 합니다. 이때 나만의 auto-conf 파일을 작성하세요. 이 파일은 다음과 같은 방법으로 제공할 수 있습니다.

1. docker-dd-agent를 실행할 각 호스트에 파일을 추가하고, docker-dd-agent 컨테이너를 부팅할 때 컨테이너에 [그 파일을 포함하는 디렉토리를 마운트][20]합니다.
2. docker-dd-agent를 바탕으로 고유한 도커 이미지를 빌드하고, 커스텀 템플릿을 `/etc/dd-agent/conf.d/auto_conf`에 추가합니다.
3. 쿠버네티스의 경우에는 ConfigMaps를 사용해 이를 추가하세요

### Apache 점검

docker-dd-agent와 패키지로 구성된 `apache.yaml` 템플릿은 다음과 같습니다.

```yaml
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

최소한의 [Apache 점검 구성][21]과 거의 동일하지만, 여기에는 `docker_images` 옵션이 있음을 알 수 있습니다. 이 필수 옵션을 사용하여 컨테이너 식별자를 지정할 수 있습니다. 자동탐지는 같은 호스트에서 `httpd` 이미지를 실행하는 모든 컨테이너에 이 템플릿을 적용합니다.

_모든_ `httpd` 이미지입니다.한 컨테이너가 `library/httpd:latest`를 실행하고 다른 컨테이너가 `<YOUR_USERNAME>/httpd:v2`를 실행하고 있다고 가정해보겠습니다. 자동탐지는 위의 템플릿을 양쪽 컨테이너에 모두 적용합니다. 자동탐지는 auto-conf 파일을 불러올 때 소스가 다르거나 태그가 다르지만 이름이 동일한 이미지를 서로 구별할 수 없습니다. 또 **컨테이너 이미지에는 짧은 이름을 지정해야 합니다.** 예를 들자면 `library/httpd:latest`는 안 되지만, `httpd`는 가능합니다.

이 제한이 너무 엄격하다고 느껴진다면, 즉 동일한 이미지를 실행하는 여러 컨테이너에 각기 다른 점검 구성을 적용해야 하는 경우에는 라벨을 사용하여 컨테이너를 특정하세요. 각 컨테이너에 다른 라벨을 지정하고, 각 라벨을 템플릿 파일의 `docker_images` 목록에 추가합니다. `docker_images`는 이미지에 국한되지 않고 _모든_ 종류의 컨테이너 식별자를 배치하는 곳입니다.

### 키값(Key-value) 스토어

자동탐지는 Consul, etcd, Zookeeper를 템플릿 소스로 사용할 수 있습니다. 키값 스토어를 사용하려면 이를 `datadog.conf`로 설정하거나 docker-dd-agent 컨테이너로 전달되는 환경 변수로 설정해야 합니다.

#### datadog.conf 내의 설정

`datadog.conf` 파일에서 `sd_config_backend`, `sd_backend_host`, `sd_backend_port` 옵션을 각각 키값 스토어의 유형(`etcd`, `consul`, `zookeeper`), IP 주소, 포트에 설정합니다.

```conf
# 현재 도커만이 지원되므로 이 행의 코멘트를 해제해야 할 수 있습니다.
service_discovery_backend: docker

# 설정 템플릿을 찾을 때 어느 키/값 스토어를 사용해야 하는지 정의하세요.
# 기본 설정은 etcd입니다. Consul도 지원됩니다.
sd_config_backend: etcd

# 백엔드 연결 설정. 기본 설정이므로, 다른 설정을 원한다면 수정하세요.
sd_backend_host: 127.0.0.1
sd_backend_port: 4001

# 기본적으로 Agent는 설정 템플릿을 백엔드의
# `/datadog/check_configs` 키에서 찾습니다.
# 설정을 바꾸려면 이 옵션을 코멘트 해제한 다음 값을 수정하세요.
# sd_template_dir: /datadog/check_configs

# Consul 스토어에서 서비스 탐지용 토큰 인증을 요구하는 경우, 토큰을 여기에서 정의할 수 있습니다.
# consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1
```

Consul을 사용하고 Consul 클러스터가 인증을 요구하는 경우에는 `consul_token`을 설정하세요.

[Agent를 재시작][22]해 설정의 변경 사항을 적용합니다.

#### 환경 변수의 설정

환경 변수를 사용하는 경우 컨테이너를 부팅할 때 동일한 옵션이 컨테이너에 전달됩니다.

```shell
docker service create \
  --name dd-agent \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
  --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
  -e API_KEY=<YOUR API KEY> \
  -e SD_BACKEND=docker \
  -e SD_CONFIG_BACKEND=etcd \
  -e SD_BACKEND_HOST=127.0.0.1 \
  -e SD_BACKEND_PORT=4001 \
  gcr.io/datadoghq/docker-dd-agent:latest
```

**참조*: 자동탐지를 활성화하는 옵션 이름은 `datadog.conf`에서는 `service_discovery_backend`이지만 환경 변수로는 `SD_BACKEND`입니다.

---

키값 스토어가 템플릿 소스로 활성화되어 있는 경우 Agent는 키`/datadog/check_configs`에서 템플릿을 찾습니다. 자동탐지는 아래와 같은 키값 위계를 전제로 합니다.

```text
/datadog/
  check_configs/
    docker_image_1/                 # container identifier, for example, httpd
      - check_names: [<CHECK_NAME>] # for example, apache
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
```

각 템플릿은 점검명, `init_config`, `instances` 세 가지로 구성되었습니다. 여기서는 이전 섹션에서 말씀드렸듯, 자동탐지에 컨테이너 식별자를 지정하기 위한 `docker_images` 옵션이 필요하지 않습니다. 키값 스토어의 경우는 컨테이너 식별자가 `check_config` 아래 첫 번째 레벨의 키가 됩니다(또한 이전 섹션에서 설명한 파일 기반 템플릿에서는 이번 예시와 같은 점검 이름이 필요하지 않다는 점에 유의하세요. Agent는 파일 이름을 바탕으로 점검 이름을 추정했습니다),

#### Apache 점검

다음의 etcd 명령을 실행하면 이전 섹션의 예시와 똑같이 Apache 점검 템플릿이 생성됩니다.

```text
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

3개의 값이 각각 목록으로 나열된다는 점에 주의하세요. 자동탐지는 공유된 목록 인덱스를 바탕으로, 목록의 항목을 점검 설정에 집약해 넣습니다. 이번 예시를 보면 `check_names[0]`, `init_configs[0]`, `instances[0]`에서 최초의 (유일한) 점검 설정이 구성됩니다.

auto-conf 파일과 달리 **키값 스토어의 경우, 컨테이너 식별자로 짧은 이미지명(`httpd` 등)과 긴 이미지명(`library/httpd:latest` 등)을 모두 사용할 수 있습니다**.아래의 예시에서는 긴 이름을 사용합니다.

#### Apache 점검과 웹사이트 가용성 모니터링

다음의 etcd 명령을 실행하면 동일한 Apache 템플릿이 생성되고, Apache 컨테이너를 통해 작성된 웹사이트의 가용성을 모니터링하는 [HTTP 점검][23] 템플릿이 추가됩니다.

```text
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

여기에서도 각 목록의 순서가 중요합니다. Agent는 각 점검 설정 요소가 3개 목록의 동일한 인덱스에 있는 경우에만 HTTP 점검 설정을 제대로 생성할 수 있습니다(이번 예시에서는 동일한 인덱스 1에 있습니다).

### 쿠버네티스 팟 어노테이션

버전 5.12 이상의 Datadog Agent에서는 점검 템플릿을 쿠버네티스 팟 어노테이션에 저장할 수 있습니다. 자동탐지가 활성화된 경우 Agent는 쿠버네티스에서 실행되는지 여부를 탐지하고, 실행 중인 경우 모든 팟 어노테이션에서 자동으로 점검 템플릿을 검색합니다. 키값 스토어의 경우처럼 템플릿 소스로 쿠버네티스를 (`SD_CONFIG_BACKEND`로) 설정할 필요가 없습니다.

자동탐지는 어노테이션이 다음과 같이 표시될 것으로 전제합니다.

```text
annotations:
  service-discovery.datadoghq.com/<container identifier>.check_names: '[<CHECK_NAME>]'
  service-discovery.datadoghq.com/<container identifier>.init_configs: '[<INIT_CONFIG>]'
  service-discovery.datadoghq.com/<container identifier>.instances: '[<INSTANCE_CONFIG>]'
```

이 형식은 키값 스토어와 유사합니다. 차이는 다음과 같습니다.

* 어노테이션은 `service-discovery.datadoghq.com/`으로 시작해야 합니다. 키값 스토어는 `/datadog/check_configs/`로 시작했습니다.
* 어노테이션의 경우, 자동탐지는 컨테이너를 이미지가 아닌 _이름_으로 식별합니다(auto-conf 파일 및 키값 스토어와 동일합니다). 즉, `<container identifier>`를 `.spec.containers[0].image` 대신 `.spec.containers[0].name`과 비교합니다.

쿠버네티스 팟을 직접 정의하는(`kind: Pod`) 경우는 각 팟 어노테이션을 해당 `metadata` 섹션 바로 아래에 추가하세요(아래 첫 번째 예시를 참조하시기 바랍니다). 팟을 Replication Controllers, Replica Sets 또는 Deployments를 통해 _간접적으로_ 정의한 경우에는 팟 어노테이션을 `.spec.templates.metadata` 아래에 추가하세요(두 번째 예시를 참조하세요).

#### Apache 점검과 웹사이트 가용성 모니터링

다음의 팟 어노테이션은 `apache` 컨테이너용 템플릿(이전 섹션의 마지막 템플릿과 같음) 2개를 정의합니다.

```yaml
apiVersion: v1
metadata:
  name: apache
  annotations:
    service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
    service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
    service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # use this as the container identifier in your annotations
      image: httpd # NOT this
      ports:
        - containerPort: 80
```

#### Apache 및 HTTP 점검

Deployments에서 팟을 정의한다면 템플릿 어노테이션을 Deployments의 메타데이터에 추가하지 마세요. Agent는 이 어노테이션을 참조하지 않습니다. 아래와 같이 설정하여 어노테이션을 추가하시기 바랍니다.

```yaml
apiVersion: apps/v1beta1
metadata: # Don't add templates here
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # use this as the container identifier in your annotations
        image: httpd # NOT this
        ports:
        - containerPort: 80
```

### 도커 라벨 어노테이션

버전 5.17 이상의 Datadog Agent는 점검 템플릿을 도커 라벨에 저장해줍니다. 자동탐지가 활성화된 경우 Agent는 도커에서 점검이 실행되는지 여부를 탐지하고, 모든 라벨에서 자동으로 점검 템플릿을 검색합니다. 키값 스토어의 경우처럼 템플릿 소스를 (`SD_CONFIG_BACKEND`로) 설정할 필요가 없습니다.

자동탐지는 파일 유형에 따라, 라벨이 아래 예시와 같이 표시될 것으로 전제합니다.

**Dockerfile**

```text
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**

```text
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**docker run command**

```text
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

#### NGINX Dockerfile

다음 Dockerfile은 자동탐지가 활성화된 NGINX 컨테이너를 부팅합니다.

```text
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
```

## 레퍼런스

### 지원하는 템플릿 변수

다음 템플릿 변수는 Agent에서 처리할 수 있습니다.

- 컨테이너 IP: `host`
  - `%%host%%`: 네트워크를 자동으로 탐지합니다. 네트워크가 존재하는 경우는 `bridge` 네트워크 IP를 반환합니다. 최근 **정렬된** 네트워크 IP로 폴백합니다.
  - `%%host_<NETWORK NAME>%%`: 여러 네트워크에 연결된 경우 `%%host_bridge%%`, `%%host_swarm%%`을 비롯해 사용할 네트워크 이름을 특정합니다. 지정된 네트워크 이름을 찾을 수 없는 경우에는 `%%host%%`와 동일하게 작동합니다.

- 컨테이너 포트: `port`
  - `%%port%%`: **숫자로 오름차순으로 정렬**했을 때, 가장 많이 노출된 포트를 사용합니다. (예를 들어 포트 80, 443, 8443을 노출하는 컨테이너의 경우 8443을 반환합니다.)
  - `%%port_0%%`:  **숫자 오름차순으로 정렬**했을 때, 첫 번째 포트를 사용합니다. (동일한 컨테이너에서 `%%port_0%%`은 포트 80을 참조하고 `%%port_1%%`은 443을 참조합니다)
  - 사용하는 포트가 바뀌지 않는다면 `port` 변수를 사용하지 말고 포트를 직접 지정하시길 권장합니다.

- 컨테이너 PID: `pid` (버전 5.15.x에서 추가)
  - `%%pid%%`: `docker inspect --format '{{.State.Pid}}' <CONTAINER>`에서 반환하는 컨테이너 프로세스 ID를 가져옵니다.

- 컨테이너 이름: `container_name` (버전 5.15.x에서 추가)
  - `%%container_name%%`: 컨테이너 이름을 가져옵니다.

### 라벨

컨테이너는 컨테이너의 이름이나 이미지가 아닌 라벨로 식별합니다. 컨테이너에 `com.datadoghq.sd.check.id: <SOME_LABEL>`이라고 하는 라벨을 추가한 다음, 일반적으로 컨테이너 이름이나 이미지를 두는 곳에 `<SOME_LABEL>`을 배치하세요. 예를 들어 컨테이너에 `com.datadoghq.sd.check.id: special-container`라는 라벨을 붙인 경우, 자동탐지는 `docker_images` 목록에서 `special-container`를 포함하는 auto-conf 템플릿을 컨테이너에 적용합니다.

자동탐지는 각 컨테이너를 라벨 또는 이미지/이름으로만 식별합니다. 이때 이미지나 이름 중 하나만을 사용하며, 라벨이 우선합니다. `com.datadoghq.sd.check.id: special-nginx`라는 라벨이 붙었으며 `nginx` 이미지를 실행하는 컨테이너에 대해, Agent는 컨테이너 식별자로 `nginx` 만을 포함하는 템플릿을 적용하지 않습니다.

### 템플릿 소스 우선 순위

여러 템플릿 소스에서 동일한 점검 유형의 템플릿을 제공하는 경우, Agent는 아래 순서대로 템플릿을 검색하고 가장 먼저 발견한 템플릿을 사용합니다.

* 쿠버네티스 어노테이션
* 키값 스토어
* 파일

따라서 `redisdb` 템플릿을 Consul 내에서 설정하고 파일(`conf.d/auto_conf/redisdb.yaml`)로도 설정했다면, Agent는 Consul 템플릿을 사용합니다.

## 트러블슈팅

자동탐지가 설정해둔 특정 점검을 불러올지 알 수가 없다면 에이전트 `configcheck` init 스크립트 명령어를 사용하세요. 예를 들어 Redis 템플릿을 쿠버네티스 어노테이션에서(기본 `auto_conf/redisdb.yaml` 파일이 아님에 주의하세요) 불러오는지 확인하기 위해 다음을 실행할 수 있습니다.

```text
# docker exec -it <AGENT_CONTAINER_NAME> /etc/init.d/datadog-agent configcheck
.
..
...
Check "redisdb":
  source --> Kubernetes Pod Annotation
  config --> {'instances': [{u'host': u'10.244.1.32', u'port': u'6379', 'tags': [u'image_name:kubernetes/redis-slave', u'kube_namespace:guestbook', u'app:redis', u'role:slave', u'docker_image:kubernetes/redis-slave:v2', u'image_tag:v2', u'kube_replication_controller:redis-slave']}], 'init_config': {}}
```

자동탐지가 JMX 기반 점검을 불러오는지 확인하려면 다음을 사용하세요.

```text
# docker exec -it <AGENT_CONTAINER_NAME> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
```

[1]: https://www.datadoghq.com/docker-adoption
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://gcr.io/datadoghq/docker-dd-agent
[4]: /ko/agent/kubernetes/
[5]: /ko/integrations/amazon_ecs/#installation
[6]: https://github.com/DataDog/docker-dd-agent#environment-variables
[7]: https://github.com/DataDog/jmxfetch
[8]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[20]: https://github.com/DataDog/docker-dd-agent#configuration-files
[21]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[22]: /ko/agent/configuration/agent-commands/#start-stop-restart-the-agent
[23]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example