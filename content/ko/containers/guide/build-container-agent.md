---
aliases:
- /ko/agent/guide/build-container-agent
title: Datadog Agent 이미지 빌드
---

아래의 안내를 따라 특정 `<AGENT_VERSION>` Agent 버전(v6.0 이상)에 따라 Datadog 도커(Docker) Agent 이미지를 빌드하세요.

1. Datadog Agent 리포지터리를 복제합니다.

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. `datadog-agent/Dockerfile/agent/` 폴더로 이동하세요.

    ```shell
    cd datadog-agent/Dockerfiles/agent/
    ```

3. 빌드하고자 하는 Agent 버전의 브랜치로 전환합니다.

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. 원하는 Agent 버전에 맞는 데비안(Debian) 패키지를 다운로드합니다. AMD 및 ARM 아키텍처 중에서 선택하세요.

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

    **참조**: 전체 데비안 패키지 목록은 [APT 목록][1]에서 확인할 수 있습니다.

5. 실행을 통해 Agent 이미지 빌드:

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

    Agent 버전 7.17.0을 AMD 아키텍처에 빌드하고자 하는 경우에는 다음을 실행하세요.

    ```shell
    docker build --build-arg DD_AGENT_ARTIFACT=./datadog-agent_7.17.0-1_amd64.deb --file amd64/Dockerfile --pull --tag documentation-example .
    ```

     사용 가능한 `<BUILD_ARGS>`는 다음과 같습니다.

    | 인수          | 정의                                                                  | 기본 설정 |
    | ----------------- | --------------------------------------------------------------------------- | ------- |
    | PYTHON_VERSION    | Agent 점검의 파이썬(Python) 런타임 버전.                            | `-`     |
    | WITH_JMX          | `true`로 설정된 경우 Agent 컨테이너에 JMX 가져오기 로직이 포함됩니다.         | `false` |
    | DD_AGENT_ARTIFACT | Agent 데비안 아티팩트 패키지가 동일 폴더에 위치하지 않은 경우 사용하는 경로. | `-`     |

[1]: http://apt.datadoghq.com/pool/d/da/