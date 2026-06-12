---
aliases:
- /ko/integrations/faq/compose-and-the-datadog-agent
- /ko/agent/guide/compose-and-the-datadog-agent
further_reading:
- link: https://github.com/DataDog/docker-compose-example
  tag: Github
  text: Datadog 예제와 함께 Docker Compose 사용
- link: /agent/docker/
  tag: 설명서
  text: Datadog Docker Agent 설명서
- link: /agent/docker/log/
  tag: 설명서
  text: Datadog Docker\u0008 로그 수집 설명서

title: Compose 및 Datadog Agent
---

[Compose][1]는 여러 컨테이너를 하나의 애플리케이션으로 정의, 빌드 및 실행할 수 있도록 하여 Docker에서 애플리케이션 구축을 단순화하는 Docker 도구입니다.

[단일 컨테이너 설치 지침][2]에 따라 기본 Datadog Agent 컨테이너가 실행되는 동안 Compose 애플리케이션의 일부인 다른 컨테이너화된 서비스에 대한 통합을 활성화할 수 있습니다. 이렇게 하려면 통합 YAML 파일을 기본 Datadog Agent 이미지와 결합하여 Datadog Agent 컨테이너를 생성해야 합니다. 그런 다음 Compose YAML에 컨테이너를 추가합니다.

### Redis 예시

다음은 Compose를 사용하여 Redis 컨테이너를 모니터링하는 방법의 예입니다. 파일 구조는 다음과 같습니다:

```text
|- docker-compose.yml
|- datadog
  |- Dockerfile
  |- conf.d
    |-redisdb.yaml
```

`docker-compose.yml` 파일은 컨테이너가 함께 작동하는 방식을 설명하고 컨테이너에 대한 일부 구성 세부 정보를 설정합니다.

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

`redisdb.yaml`은 [redisdb.yaml.example 파일][3]을 따라 패턴화되었으며 Datadog Agent에게 `redis`라는 이름의 (`docker-compose.yaml` 위에 정의된) 호스트에서 Redis를 찾고 표준 Redis 포트를 사용하도록 지시합니다.

```yaml
init_config:

instances:
    - host: redis
      port: 6379
```

`Dockerfile`은 Docker Compose가 올바른 위치에 `redisdb.yaml` 파일을 포함하는 Datadog Agent 이미지를 구축하도록 지시하는데 사용됩니다.

```
FROM gcr.io/datadoghq/agent:latest
ADD conf.d/redisdb.yaml /etc/datadog-agent/conf.d/redisdb.yaml
```


### 로그 수집

`docker-compose.yml`은 Datadog Agent가 컨테이너 로그를 수집할 수 있도록 확장할 수 있습니다.

```yaml
version: '3'
services:
  redis:
    image: redis
    labels:
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

**참고**: 위의 구성은 `Redis` 컨테이너에서 로그만 수집합니다. 유사한 `com.datadoghq.ad.logs` 라벨을 추가하여 Datadog Agent에서 로그를 수집할 수 있습니다. 또한, 환경 변수 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`를 `true`로 설정하여 모든 컨테이너에 대해 로그 수집을 명시적으로 활성화할 수도 있습니다. 자세한 내용은 [Docker 로그 수집 설명서][4]를 참조하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /ko/agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: /ko/agent/logs/