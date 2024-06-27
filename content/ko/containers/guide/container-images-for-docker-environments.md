---
aliases:
- /ko/agent/guide/container-images-for-docker-environments
further_reading:
- link: /agent/docker/
  tag: 설명서
  text: 도커 Agent 시작하기
- link: /agent/cluster_agent/
  tag: 설명서
  text: 클러스터 Agent 시작하기
kind: 도움말
title: 도커(Docker) 환경용 컨테이너 이미지
---

## 개요

Docker를 사용 중인 경우 내 환경에 맞는 GCR 및 ECR을 통해 사용 가능한 컨테이너 이미지가 여러 개 있습니다.

{{< tabs >}}
{{% tab "GCR" %}}

| Datadog 서비스                          | GCR                                      | GCR Pull 명령어                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [도커 Agent][1]                        | [도커 Agent (v6+)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| 도커 Agent (v 5)                       | [도커 Agent (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog 클러스터 Agent][5]               | [클러스터 Agent][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [신서틱(Synthetics) 프라이빗 위치 워커][7]  | [신서틱(Synthetics) 프라이빗 위치 워커][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |


[1]: /ko/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /ko/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /ko/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /ko/getting_started/synthetics/private_location/
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


[1]: /ko/agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /ko/developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /ko/agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /ko/getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{< /tabs >}}

Docker Hub를 사용해야 하는 경우에는 [Docker Hub][1]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/docker-hub/