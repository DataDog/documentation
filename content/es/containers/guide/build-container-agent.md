---
aliases:
- /es/agent/guide/build-container-agent
title: Crear la imagen del Datadog Agent
---

Sigue estas instrucciones para crear la imagen del Datadog Docker Agent en una versión del Agent `<AGENT_VERSION>` específica (posterior a la v6.0).

1. Clona el repositorio del Datadog Agent:

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. Accede a la carpeta `datadog-agent/Dockerfiles/agent/`:

    ```shell
    cd datadog-agent/Dockerfiles/agent/
    ```

3. Cambia a la rama de la versión del Agent desde la que quieres crear la imagen:

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. Descarga el paquete Debian del Agent correspondiente a la versión que te interesa. Elige entre la arquitectura AMD y ARM:

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

    **Nota**: Los paquetes Debian disponibles se detallan al completo [en esta lista de APT][1].

5. Para crear la imagen del Agent, ejecuta lo siguiente:

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

    Por ejemplo, para crear la imagen de la versión 7.17.0 del Agent en la arquitectura AMD, debes ejecutar:

    ```shell
    docker build --build-arg DD_AGENT_ARTIFACT=./datadog-agent_7.17.0-1_amd64.deb --file amd64/Dockerfile --pull --tag documentation-example .
    ```

     Los `<BUILD_ARGS>` compatibles son:

    | Argumento | Definición | Predeterminado |
    | ----------------- | --------------------------------------------------------------------------- | ------- |
    | PYTHON_VERSION | La versión en tiempo de ejecución de Python para el check del Agent. | `-` |
    | WITH_JMX | Si se define como `true`, incluirá la lógica de recuperación JMX en el contenedor del Agent. | `false` |
    | DD_AGENT_ARTIFACT | Ruta al paquete de artefactos Debian del Agent que hay que utilizar si no está en la misma carpeta. | `-` |

[1]: http://apt.datadoghq.com/pool/d/da/