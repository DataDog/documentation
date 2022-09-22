---
further_reading:
- link: /agent/docker/
  tag: 설명서
  text: 도커 Agent 시작하기
- link: /agent/cluster_agent/
  tag: 설명서
  text: 클러스터 Agent 시작하기
kind: 설명서
title: 도커(Docker) 환경용 컨테이너 이미지
---

## 개요

도커를 사용 중이라면 환경에서 사용하고자 하는 GCR, ECR, Docker Hub를 통해 여러 컨테이너 이미지를 이용할 수 있습니다.

{{< tabs >}}
{{% tab "GCR" %}}

| Datadog 서비스                          | GCR                                      | GCR Pull 명령어                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [도커 Agent][1]                        | [도커 Agent (v6+)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| 도커 Agent (v 5)                       | [도커 Agent (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog 클러스터 Agent][5]               | [클러스터 Agent][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [신서틱(Synthetics) 프라이빗 위치 워커][7]  | [신서틱(Synthetics) 프라이빗 위치 워커][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |


[1]: /kr/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /kr/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /kr/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /kr/getting_started/synthetics/private_location/
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ECR" %}}

| Datadog 서비스                         | Docker Hub                               | 도커 Pull 명령어                                                     |
|-----------------------------------------|------------------------------------------|-------------------------------------------------------------------------|
| [도커 Agent][1]                       | [도커 Agent (v6+)][2]                  | `docker pull public.ecr.aws/datadog/agent`                              |
| 도커 Agent (v 5)                      | [도커 Agent (v5)][3]                   | `docker pull public.ecr.aws/datadog/docker-dd-agent`                    |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull public.ecr.aws/datadog/dogstatsd`                          |
| [Datadog 클러스터 Agent][6]              | [클러스터 Agent][7]                       | `docker pull public.ecr.aws/datadog/cluster-agent`                      |
| [신서틱(Synthetics) 프라이빗 위치 워커][8] | [신서틱(Synthetics) 프라이빗 위치 워커][9]  | `docker pull public.ecr.aws/datadog/synthetics-private-location-worker` |


[1]: /kr/agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /kr/developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /kr/agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /kr/getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{% tab "Docker Hub" %}}

| Datadog 서비스                         | Docker Hub                               | 도커 Pull 명령어                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [도커 Agent][1]                       | [도커 Agent (v6+)][2]                  | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| 도커 Agent (v 5)                      | [도커 Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Datadog 클러스터 Agent][6]              | [클러스터 Agent][7]                       | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [신서틱(Synthetics) 프라이빗 위치 워커][8] | [신서틱(Synthetics) 프라이빗 위치 워커][9]  | `docker pull synthetics-private-location-worker`           |

Docker Hub는 `agent`, `cluster-agent`, `dogstatsd` 이미지를 대상으로 [Docker Content Trust(DCT)][10]를 지원합니다.
이미지가 변조되지 않았는지 확인하려면 `DOCKER_CONTENT_TRUST=1`을 설정해 DCT를 활성화하세요.

[1]: /kr/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /kr/developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /kr/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /kr/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: https://docs.docker.com/engine/security/trust/
{{% /tab %}}
{{< /tabs >}}

{{< partial name="whats-next/whats-next.html" >}}