---
title: Build Datadog Agent image
kind: guide
---

Follow the instructions below to build the Datadog docker Agent image for a given `<AGENT_VERSION>` Agent version (above v6.0).

1. Clone the Datadog agent repository:

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. Go into the `datadog-agent/Dockerfile/agent/` folder:

    ```shell
    cd datadog-agent/Dockerfile/agent/
    ```

3. Switch to the Agent version branch you want to build Agent from:

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. Download the Agent debian package corresponding to the Agent version you want. Choose between the AMD and ARM architecture:

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_amd64.deb -o datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_arm64.deb -o datadog-agent_<AGENT_VERSION>-1_arm64.deb
```

{{% /tab %}}
{{< /tabs >}}

    **Note**: The full list of debian package available can be found [on this APT listing][1]

5. Build the Agent image by running:

    ```shell
    docker build --build-arg <BUILD_ARGS> --pull --tag <IMAGE_TAG> .
    ```

    For instance to build the Agent version 7.17.0 with the Python 3 runtime you would run:

    ```shell
    docker build --build-arg PYTHON_VERSION=3 --pull --tag documentation-example .
    ```

     Available `<BUILD_ARGS>` are:

    | Argument          | Definition                                                                  | Default |
    | ----------------- | --------------------------------------------------------------------------- | ------- |
    | PYTHON_VERSION    | The python runtime version for your Agent check.                            | `-`     |
    | WITH_JMX          | If set to `true`, the Agent container contains the JMX fetch logic.         | `false` |
    | DD_AGENT_ARTIFACT | Path to the Agent debian artifact package to use if not in the same folder. | `-`     |

[1]: http://apt.datadoghq.com/pool/d/da/
