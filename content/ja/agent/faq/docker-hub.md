---
title: Docker Hub
---
<div class="alert alert-warning">Docker Hub はイメージプルレート制限の対象です。Docker Hub をご利用でない場合は、Datadog Agent および Cluster Agent の構成を更新し、Datadog Container Registry、GCR、または ECR からイメージを取得するようにすることを Datadog は推奨します。その手順については、<a href="/agent/guide/changing_container_registry">コンテナのレジストリを変更する</a>を参照してください。</div>

Docker を使用する場合は、[Datadog Container Registry][12]、[GCR][10]、および [ECR][11] で利用可能な複数のコンテナイメージがあります。Docker Hub を使用する必要がある場合:

| Datadog サービス                         | Docker Hub                               | Docker プルコマンド                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

[1]: /ja/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /ja/extend/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /ja/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /ja/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /ja/agent/guide/container-images-for-docker-environments/?tab=gcr
[11]: /ja/agent/guide/container-images-for-docker-environments/?tab=ecr
[12]: /ja/containers/guide/changing_container_registry/