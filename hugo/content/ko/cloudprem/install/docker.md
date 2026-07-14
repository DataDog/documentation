---
description: Docker 또는 Docker Compose를 사용하여 로컬에서 CloudPrem을 시작하는 방법을 알아보세요.
further_reading:
- link: /cloudprem/ingest/
  tag: 설명서
  text: 로그 수집 구성
- link: /cloudprem/configure/
  tag: 설명서
  text: CloudPrem 구성
title: Docker를 사용하여 CloudPrem을 로컬에 설치
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 설치 가이드는 독립 실행형 Docker 컨테이너 또는 Docker Compose를 사용하여 Datadog CloudPrem을 로컬에서 실행하는 방법을 보여줍니다. 다음 단계를 따라 최소한의 CloudPrem 환경을 구축하면 운영 환경에 배포하기 전에 CloudPrem 기능을 탐색하고 Datadog을 사용한 로그 수집을 테스트할 수 있습니다.

## 사전 필수 조건

CloudPrem을 시작하기 전에 다음 사항을 확인하세요.

- CloudPrem 기능이 활성화된 **Datadog 계정**.
- **API 자격 증명**: [Datadog API 키][2]를 준비하세요.
- **Docker**: 기기에 설치되어 실행 중인 [Docker][4].
- **Docker Compose**(선택 사항): 단일 명령줄 설정용 [Docker Compose][5].

## 설치 단계

다음 설치 방법 중 선택합니다.

1. **독립형 Docker 컨테이너**: 테스트를 위한 최소한의 설정
2. **Docker Compose**: CloudPrem과 Datadog Agent를 실행하는 단일 명령줄

{{< tabs >}}
{{% tab "독립형 Docker 설정" %}}

이 방법은 최소한의 CloudPrem 설정을 위해 개별 Docker 컨테이너를 사용합니다.

Datadog 자격 증명을 환경 변수로 내보냅니다.

```shell
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### 1단계: CloudPrem 시작

데이터 디렉터리를 생성하고 CloudPrem 컨테이너를 시작합니다.

```shell
# CloudPrem을 시작합니다
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### 2단계: Datadog Agent 시작

Datadog Agent를 시작하여 로컬 컨테이너에서 로그를 수집하고 CloudPrem으로 전송합니다.

```shell
docker run \
  --name dd-agent \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_ENV=dev \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_LOGS_DD_URL=http://host.docker.internal:7280 \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_CONTAINER_EXCLUDE="name:dd-agent" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  registry.datadoghq.com/agent:latest
```
{{% /tab %}}

{{% tab "Docker Compose 설정" %}}

이 방법은 Datadog Agent 통합을 포함한 CloudPrem 설정을 제공합니다.

### 1단계: Docker Compose 파일 생성

작업 디렉터리에 `docker-compose.yml` 파일을 생성합니다.

```yaml
services:
  cloudprem:
    image: datadog/cloudprem:edge
    command: ["run"]
    ports:
      - "127.0.0.1:7280:7280"
    environment:
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
    restart: unless-stopped

  datadog-agent:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://cloudprem:7280
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION=100000
      - DD_CONTAINER_EXCLUDE="name:datadog-agent"
      - DD_ENV=dev
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    depends_on:
      cloudprem:
        condition: service_healthy
    restart: unless-stopped
```

Docker Compose 설정:
1. CloudPrem을 시작하고 정상 상태가 될 때까지 기다립니다.
2. 컨테이너 로그 수집을 위해 Datadog Agent를 시작합니다.

### 2단계: 환경 변수 설정

같은 디렉터리에 `.env` 파일을 생성합니다.

```shell
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
```

### 3단계: Docker Compose 시작

```shell
docker compose up -d
```
{{% /tab %}}
{{< /tabs >}}

## 다음 단계

두 가지 방법 중 하나로 CloudPrem을 시작한 후 설치가 올바르게 작동하는지 확인합니다.

### CloudPrem 상태 확인

**CloudPrem이 실행 중인지 확인합니다.**

```shell
curl http://localhost:7280/api/v1/version
```

버전 정보가 포함된 응답을 확인합니다.

### 로그 전송

터미널에서 API를 사용하여 "Hello World" 로그 항목을 로컬 CloudPrem 인스턴스로 직접 전송합니다.

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Log Explorer에서 로컬 로그 검색

CloudPrem이 실행 중인지 확인한 후에는 Logs Explorer에서 `cloudprem` 인덱스를 검색하여 로그를 검색하고 분석할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/