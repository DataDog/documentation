---
kind: faq
title: Docker Hub
---
Docker を使用する場合は、[GCR][11]、[ECR][12] を通して、いくつかのコンテナイメージが利用可能です。Docker Hub を使用する必要がある場合:

| Datadog サービス                         | Docker Hub                               | Docker プルコマンド                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Datadog クラスター Agent][6]              | [クラスター Agent][7]                       | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Synthetics プライベートロケーションワーカー][8] | [Synthetics プライベートロケーションワーカー][9]  | `docker pull synthetics-private-location-worker`           |

Docker Hub は、`agent`、`cluster-agent`、`dogstatsd` イメージの [Content Trust][10] をサポートします。
イメージの改ざんを防ぐため、`DOCKER_CONTENT_TRUST=1` を設定して Content Trust を有効にします。

[1]: /ja/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /ja/developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /ja/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /ja/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: https://docs.docker.com/engine/security/trust/
[11]: /ja/agent/guide/container-images-for-docker-environments/?tab=gcr
[12]: /ja/agent/guide/container-images-for-docker-environments/?tab=ecr