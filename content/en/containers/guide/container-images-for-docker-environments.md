---
title: Container Images for Docker Environments
description: Overview of available Datadog container images for Docker environments across different registries
aliases:
  - /agent/guide/container-images-for-docker-environments
further_reading:
- link: "/agent/docker/"
  tag: "Documentation"
  text: "Get started with the Docker Agent"
- link: "/agent/cluster_agent/"
  tag: "Documentation"
  text: "Get started with the Cluster Agent"
---

## Overview

If you are using Docker, there are several container images available through the Datadog Container Registry, GCR, ECR, and ACR that you may want to use within your environment:

{{< tabs >}}
{{% tab "Datadog Container Registry" %}}

| Datadog service            | Registry           | Pull Command                                       |
| -------------------------- | ------------------ | -------------------------------------------------- |
| [Docker Agent][1]          | Docker Agent (v6+) | `docker pull registry.datadoghq.com/agent`         |
| [DogStatsD][2]             | DogStatsD          | `docker pull registry.datadoghq.com/dogstatsd`     |
| [Datadog Cluster Agent][3] | Cluster Agent      | `docker pull registry.datadoghq.com/cluster-agent` |

**Note:** Additional images such as the Synthetics Private Location Worker will be added to this registry in the future.

[1]: /agent/docker/
[2]: /developers/dogstatsd/
[3]: /agent/cluster_agent/
{{% /tab %}}
{{% tab "GCR" %}}

| Datadog service                         | GCR                                     | GCR Pull Command                                                  |
| --------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                 | `docker pull gcr.io/datadoghq/agent`                              |
| Docker Agent (v 5)                      | [Docker Agent (v5)][2]                  | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                          | [DogStatsD][4]                          | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog Cluster Agent][5]              | [Cluster Agent][6]                      | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Synthetics Private Location Worker][7] | [Synthetics Private Location Worker][8] | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |

Regional GCR registries are also available:
- **Europe**: `eu.gcr.io/datadoghq`
- **Asia**: `asia.gcr.io/datadoghq`

[1]: /agent/docker/
[2]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/agent
[3]: /developers/dogstatsd/
[4]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/dogstatsd
[5]: /agent/cluster_agent/
[6]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/cluster-agent
[7]: /getting_started/synthetics/private_location/
[8]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ECR" %}}

| Datadog service                         | ECR                                     | ECR Pull Command                                                        |
| --------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                 | `docker pull public.ecr.aws/datadog/agent`                              |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                  | `docker pull public.ecr.aws/datadog/docker-dd-agent`                    |
| [DogStatsD][4]                          | [DogStatsD][5]                          | `docker pull public.ecr.aws/datadog/dogstatsd`                          |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                      | `docker pull public.ecr.aws/datadog/cluster-agent`                      |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9] | `docker pull public.ecr.aws/datadog/synthetics-private-location-worker` |


[1]: /agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ACR" %}}

| Datadog service                         | ACR                                | ACR Pull Command                                                      |
| --------------------------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| [Docker Agent][1]                       | Docker Agent (v6+)                 | `docker pull datadoghq.azurecr.io/agent`                              |
| [DogStatsD][2]                          | DogStatsD                          | `docker pull datadoghq.azurecr.io/dogstatsd`                          |
| [Datadog Cluster Agent][3]              | Cluster Agent                      | `docker pull datadoghq.azurecr.io/cluster-agent`                      |
| [Synthetics Private Location Worker][4] | Synthetics Private Location Worker | `docker pull datadoghq.azurecr.io/synthetics-private-location-worker` |


[1]: /agent/docker/
[2]: /developers/dogstatsd/
[3]: /agent/cluster_agent/
[4]: /getting_started/synthetics/private_location
{{% /tab %}}
{{< /tabs >}}

If you need to use Docker Hub, see [Docker Hub][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/docker-hub/
