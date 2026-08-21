---
title: Docker Hub
---
<div class="alert alert-warning">Docker Hub에는 이미지 풀 속도 제한이 적용됩니다. Docker Hub 고객이 아니라면 Datadog은 Datadog Container Registry, GCR 또는 ECR에서 이미지를 가져오도록 Datadog Agent 및 Cluster Agent 구성을 업데이트할 것을 권장합니다. 관련 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참조하세요.</div>

Docker를 사용하는 경우 [Datadog Container Registry][12], [GCR][10] 및 [ECR][11]을 통해 사용할 수 있는 여러 Container Images가 있습니다. Docker Hub를 사용해야 하는 경우:

| Datadog 서비스                         | Docker Hub                               | Docker Pull 명령                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

[1]: /ko/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /ko/extend/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /ko/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /ko/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /ko/agent/guide/container-images-for-docker-environments/?tab=gcr
[11]: /ko/agent/guide/container-images-for-docker-environments/?tab=ecr
[12]: /ko/containers/guide/changing_container_registry/