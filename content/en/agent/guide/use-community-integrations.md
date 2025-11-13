---
title: Use Community and Marketplace Integrations
description: Installation and configuration guide for community-developed and Marketplace integrations with the Datadog Agent across different environments.
aliases:
  - /agent/guide/community-integrations-installation-with-docker-agent
further_reading:
  - link: "/agent/troubleshooting/"
    tag: "Documentation"
    text: "Agent Troubleshooting"
  - link: "/developers/integrations/agent_integration"
    tag: "Documentation"
    text: "Create a New Integration"
---

## Overview

Community developed integrations for the Datadog Agent are stored in the Datadog [integrations-extra][1] GitHub repository. They are not packaged with the Agent, but can be installed as add-ons.

## Setup

For new users, download and install the latest version of the [Datadog Agent][2].

### Installation

{{< tabs >}}
{{% tab "Host Install" %}}

For Agent v7.21+ / v6.21+:

1. Run the following command to install the Agent integration:

    ```
    sudo -u dd-agent datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

   The version for the integration can be found in the respective changelog on the integration's Github repository
2. Configure your integration similar to core [integrations][1].
3. [Restart the Agent][2].

[1]: /getting_started/integrations/
[2]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}
#### Building Image

To use a community or Marketplace integration in a containerized environment, you must build a custom image that includes your desired community integration.  

Building a custom image ensures that the integration persists across deployments each time a new container starts.

Use the following Dockerfile to build a custom version of the Agent that includes the `<INTEGRATION_NAME>` from [integrations-extras][2]. If you are installing a Marketplace integration, the `<INTEGRATION_NAME>` is available in the configuration instructions.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```
Then build the image and push:

```
docker build -t <RepoName>/agent:<version>-custom .
docker push <RepoName>/agent:<version>-custom
```

If you are using a both `amd64` and `arm` based host architectures, you can [build multi-architecture images][3] as well.

#### Deploying Image

If you are using Kubernetes, update your Helm chart or Datadog Operator configuration to pull your custom image:

##### Helm:
```
agents:
  image:
    tag: <version>
    tagSuffix: "custom"
    repository: <Registry>/<RepoName>/agent
```
##### Operator:
```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: <Registry>/<RepoName>
    #(...)  
  override:
    nodeAgent:
      image:
        name: agent
        tag: <version>-custom
```

Use [Autodiscovery][1] to enable and configure the integration.

[1]: /agent/autodiscovery/
[2]: https://github.com/DataDog/integrations-extras
[3]: https://docs.docker.com/build/building/multi-platform/
{{% /tab %}}
{{< /tabs >}}

If your site restricts network access, ensure you have added all of the [`ip-ranges`][3] to your inclusion list, or download the integration manually.



<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: /agent/configuration/network
