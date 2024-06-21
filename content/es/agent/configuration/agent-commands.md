---
algolia:
  tags:
  - comando del estado del Agent
aliases:
- /es/agent/faq/agent-status-and-information
- /es/agent/faq/start-stop-restart-the-datadog-agent
- /es/agent/faq/agent-commands
- /es/agent/guide/agent-commands
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
title: Comandos del Agent
---

<div class="alert alert-warning">
En sistemas basados en Linux en los que no se encuentre disponible el comando del contenedor <code>service</code>, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consulta la lista de alternativas</a>.
</div>

## Iniciar, detener y reiniciar el Agent

### Iniciar el Agent

Lista de comandos para iniciar el Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consulta la [documentación sobre el Agent][1] para tu sistema operativo.                      |
| Docker     | Utiliza el [comando de instalación][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *o* a través de la aplicación systray |
| Origen     | `sudo service datadog-agent start`                                 |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                          |

[1]: /es/agent/
[2]: /es/agent/docker/
[3]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | Consulta la [documentación sobre el Docker Agent][1].  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Origen   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | Consulta la [documentación sobre el Windows Agent][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Detener el Agent

Lista de comandos para detener el Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consulta la [documentación sobre el Agent][1] para tu sistema operativo.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | `launchctl stop com.datadoghq.agent` *o* a través de la aplicación systray                |
| Origen     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulta la [documentación sobre el Windows Agent][2].                                        |

[1]: /es/agent/
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | Consulta la [documentación sobre el Docker Agent][1].  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Origen   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | Consulta la [documentación sobre el Windows Agent][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Reiniciar el Agent

Lista de comandos para reiniciar el Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulta la [documentación sobre el Agent][1] para tu sistema operativo.                                    |
| Docker     | Utiliza el [comando de instalación][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | ejecutar `stop` y luego `start`, *o* a través de la aplicación systray                            |
| Origen     | *plataforma no compatible*                                                           |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                                        |

[1]: /es/agent/
[2]: /es/agent/docker/?tab=standard#setup
[3]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | Consulta la [documentación sobre el Docker Agent][1].  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Origen   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | Consulta la [documentación sobre el Windows Agent][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Estado e información del Agent

### Estado del servicio

Lista de comandos para mostrar el estado del Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consulta la [documentación sobre el Agent][1] para tu sistema operativo.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *o* a través de la aplicación systray             |
| Origen          | `sudo service datadog-agent status`                                           |
| Windows         | Consulta la [documentación sobre el Windows Agent][2].                                     |


[1]: /es/agent/
[2]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma        | Comando                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| Origen          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | Consulta la [documentación sobre el Windows Agent][1].                                |

[1]: /es/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| Plataforma   | Comando                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Información del Agent

Lista de comandos para mostrar el estado del Datadog Agent y las integraciones habilitadas.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` o a través de la [GUI web][1]   |
| Origen     | `sudo datadog-agent status`                          |
| Windows    | Consulta la [documentación sobre el Windows Agent][2].            |

Se mostrará una integración debidamente configurada en **Running Checks** (Checks en ejecución) sin que figuren avisos ni errores, tal y como aparece a continuación:

```text
Running Checks
==============
  network (1.6.0)
  ---------------
    Total Runs: 5
    Metric Samples: 26, Total: 130
    Events: 0, Total: 0
    Service Checks: 0, Total: 0
    Average Execution Time : 0ms
```

[1]: /es/agent/basic_agent_usage/#gui
[2]: /es/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma   | Comando                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Origen     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | Consulta la [documentación sobre el Windows Agent][1].                              |

Se mostrará una integración debidamente configurada en **Checks** sin que figuren avisos ni errores, tal y como se muestra a continuación:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

[1]: /es/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| Plataforma   | Comando                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## Otros comandos

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

La interfaz de línea de comandos del Agent v6 se basa en subcomandos. Para consultar la lista de subcomandos disponibles, ejecuta:
```shell
<AGENT_BINARY> --help
```

Para ejecutar un subcomando, se debe invocar el archivo binario del Agent:
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Algunas opciones tienen marcas y opciones detalladas en el subcomando `--help`. For example, use help with the `check`:
```shell
<AGENT_BINARY> check --help
```

| Subcomando        | Notas                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Ejecuta el check especificado.                                                    |
| `config`          | [Gestión de la configuración del tiempo de ejecución][1]                                      |
| `configcheck`     | Muestra todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Realiza un diagnóstico de conectividad en tu sistema.                              |
| `flare`           | [Recopila un flare y lo envía a Datadog][2].                                |
| `health`          | Muestra el estado actual del Agent.                                             |
| `help`            | Ofrece ayuda con cualquier comando.                                                     |
| `hostname`        | Muestra el nombre de host que utiliza el Agent.                                       |
| `import`          | Importa y convierte archivos de configuración de versiones anteriores del Agent. |
| `jmx`             | Soluciona problemas de JMX.                                                        |
| `launch-gui`      | Inicia la GUI del Datadog Agent.                                                |
| `restart-service` | Reinicia el Agent en el administrador de control de servicios. Solo en Windows.         |
| `start-service`   | Inicia el Agent en el administrador de control de servicios. Solo en Windows.           |
| `stream-logs`     | Genera un flujo de los logs que procesa un Agent en ejecución.                         |
| `stopservice`     | Detiene el Agent en el administrador de control de servicios. Solo en Windows.            |
| `version`         | Muestra información acerca de la versión.                                                         |

[1]: /es/agent/troubleshooting/config/
[2]: /es/agent/troubleshooting/send_a_flare/
{{% /tab %}}
{{< /tabs >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}