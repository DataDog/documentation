---
aliases:
- /ja/agent/guide/container-images-for-docker-environments
further_reading:
- link: /agent/docker/
  tag: Documentation
  text: Get started with the Docker Agent
- link: /agent/cluster_agent/
  tag: Documentation
  text: Get started with the Cluster Agent
title: Container Images for Docker Environments
---

## 概要

Docker を使用している場合は、GCR と ECR を介して利用できる、環境内で使用できるコンテナイメージが複数あります。

{{< tabs >}}
{{% tab "GCR" %}}

| Datadog サービス                          | GCR                                      | GCR プルコマンド                                                  |
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
[7]: /ja/getting_started/synthetics/private_location/
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ECR" %}}

| Datadog サービス                         | Docker Hub                               | Docker プルコマンド                                                     |
|-----------------------------------------|------------------------------------------|-------------------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull public.ecr.aws/datadog/agent`                              |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull public.ecr.aws/datadog/docker-dd-agent`                    |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull public.ecr.aws/datadog/dogstatsd`                          |
| [Datadog クラスター Agent][6]              | [クラスター Agent][7]                       | `docker pull public.ecr.aws/datadog/cluster-agent`                      |
| [Synthetics プライベートロケーションワーカー][8] | [Synthetics プライベートロケーションワーカー][9]  | `docker pull public.ecr.aws/datadog/synthetics-private-location-worker` |


[1]: /ja/agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /ja/developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /ja/agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /ja/getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{< /tabs >}}

Docker Hub を使用する必要がある場合は、[Docker Hub][1] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/docker-hub/