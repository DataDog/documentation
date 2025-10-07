---
title: Build Datadog Agent image
description: Instructions for building custom Datadog Agent Docker images from source code
aliases:
 - /agent/guide/build-container-agent
---

Follow the instructions below to build the Datadog Docker Agent image for a given `<AGENT_VERSION>` Agent version (above v6.0).

1. Clone the Datadog Agent repository:

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. Go into the `datadog-agent/Dockerfiles/agent/` folder:

    ```shell
    cd datadog-agent/Dockerfiles/agent/
    ```

3. Switch to the Agent version branch you want to build the Agent from:

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. Download the Agent Debian package that corresponds to the Agent version you want. Choose between the AMD and ARM architecture:

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_amd64.deb -o datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_arm64.deb -o datadog-agent_<AGENT_VERSION >-1_arm64.deb
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"> For <strong>Agent ≥ 7.44</strong> – the build Dockerfile expects a <strong>data.tar.xz</strong> archive. As such, do one of the following: <br><br>

- download the release tarball `datadog-agent_<AGENT_VERSION>-<ARCH>.tar.xz` (`<ARCH>` = amd64 or arm64) <br>
**OR** <br>
- extract the data payload from the `.deb`with `ar -x datadog-agent_<AGENT_VERSION>-<ARCH>.deb # produces data.tar.xz`and pass `data.tar.xz` to `DD_AGENT_ARTIFACT`. 
    </div>

**Note**: The full list of Debian packages available can be found [on this APT listing][1].
<br>
<br>

5. Build the Agent image by running:

    {{< tabs >}}
    {{% tab "AMD" %}}    
```shell
     docker build --build-arg <BUILD_ARGS> --file amd64/Dockerfile --pull --tag <IMAGE_TAG> .
```
    {{% /tab %}}

    {{% tab "ARM" %}}
```shell
    docker build --build-arg <BUILD_ARGS> --file arm64/Dockerfile --pull --tag <IMAGE_TAG> .
```
    {{% /tab %}}
    {{< /tabs >}} 

    For instance to build the Agent version 7.17.0 on the AMD architecture you would run:

    ```shell
    docker build --build-arg DD_AGENT_ARTIFACT=./datadog-agent_7.17.0-1_amd64.deb --file amd64/Dockerfile --pull --tag documentation-example .
    ```
     

<div class="alert alert-info"> <strong> For Agent ≥ 7.44 - recent Agent tags ship a single multi-arch Dockerfile. For your command:</strong> <br> 

- use `--file Dockerfile`
- remove the leading `./` in `DD_AGENT_ARTIFACT` and 
- point to the `*.tar.xz`file from _Step 4_.
<br>

```shell
# Agent ≥ 7.44 example
docker build \
  --build-arg DD_AGENT_ARTIFACT=datadog-agent_<AGENT_VERSION>-<ARCH>.tar.xz \
  --file Dockerfile \
  --pull \
  --tag dd-agent:<AGENT_VERSION> .
```
</div>



Available `<BUILD_ARGS>` are:

| Argument  | Definition   | Default |
| ----------| -------------| ------- |
| PYTHON_VERSION    | The Python runtime version for your Agent check.   | `-`     |
| WITH_JMX          | If set to `true`, the Agent container contains the JMX fetch logic. | `false` |
| DD_AGENT_ARTIFACT | Path to the Agent Debian artifact package to use if not in the same folder. | `-`     |

[1]: http://apt.datadoghq.com/pool/d/da/
