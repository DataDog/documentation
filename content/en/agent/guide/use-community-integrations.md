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

Follow the installation method for your environment. 




{{< tabs >}}
{{% tab "Host installation" %}}

For Agent v7.21+ / v6.21+:

1. Run the following command to install the Agent integration:

    ```
    sudo -u dd-agent datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

   The version for the integration can be found in the respective changelog on the integration's Github repository.
2. Configure your integration similar to core [integrations][1].
3. [Restart the Agent][2].

[1]: /getting_started/integrations/
[2]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized installation" %}}
#### Building the image

To use a community or Marketplace integration in a containerized environment, build a custom Agent image that includes your desired integration.

Building a custom image ensures the integration persists across deployments each time a container starts.

Use the following Dockerfile to build a custom version of the Agent that includes the `<INTEGRATION_NAME>` from [integrations-extras][2]. If you are installing a Marketplace integration, the `<INTEGRATION_NAME>` is available in the configuration instructions.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```
Build and push the image:

```
docker build -t <RepoName>/agent:<version>-custom .
docker push <RepoName>/agent:<version>-custom
```

If you use both `amd64` and `arm` host architectures, you can also [build multi-architecture images][3].

#### Deploying the image

To deploy the custom image in Kubernetes, update your Helm chart or Datadog Operator configuration to pull the image.

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
[4]: /containers/guide/container-images-for-docker-environments/?tab=gcr
