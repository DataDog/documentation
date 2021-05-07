---
title: Docker 環境のコンテナイメージ
kind: documentation
further_reading:
  - link: /agent/docker/
    tag: Documentation
    text: Docker Agent の概要
  - link: /agent/cluster_agent/
    tag: Documentation
    text: クラスター Agent の概要
---
## 概要

現在 Docker を使用している場合は、Docker Hub および GCR を介して利用できる、環境内で使用できるコンテナイメージが複数あります。

{{< tabs >}}
{{% tab "Docker Hub" %}}

| Datadog 製品                                | Docker Hub                                 | Docker プルコマンド                                           |
|--------------------------------------------|--------------------------------------------|-------------------------------------------------------------|
| [Docker Agent][1]                          | [Docker Agent (v6+)][2]                    | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`          |
| Docker Agent (v 5)                         | [Docker Agent (v5)][3]                     | `docker pull datadog/docker-dd-agent`                       |
| [DogStatsD][4]                             | [DogStatsD][5]                             | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`      |
| [Datadog クラスター Agent][6]                | [クラスター Agent][7]                        | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Synthetics プライベートロケーションワーカー][8] | [Synthetics プライベートロケーションワーカー][9] | `docker pull datadog/synthetics-private-location-worker`          |

[1]: /ja/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /ja/developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /ja/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /ja/getting_started/synthetics/private_location.md
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "GCR" %}}

| Datadog 製品                          | GCR                                      | GCR プルコマンド                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [Docker Agent][1]                        | [Docker Agent (v6+)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| Docker Agent (v 5)                       | [Docker Agent (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog クラスター Agent][5]               | [クラスター Agent][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Synthetics プライベートロケーションワーカー][7]  | [Synthetics プライベートロケーションワーカー][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |

[1]: /ja/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /ja/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /ja/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /ja/getting_started/synthetics/private_location.md
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker

{{% /tab %}}
{{< /tabs >}}

{{< partial name="whats-next/whats-next.html" >}}