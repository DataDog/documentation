---
algolia:
  tags:
  - agent status command
aliases:
- /es/agent/faq/agent-status-and-information
- /es/agent/faq/start-stop-restart-the-datadog-agent
- /es/agent/faq/agent-commands
- /es/agent/guide/agent-commands
description: Referencia completa de los comandos del Datadog Agent para iniciar, detener,
  solucionar problemas y administrar el Agent.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Agent Troubleshooting
title: Comandos del Agent
---
<div class="alert alert-danger">
Para sistemas basados en Linux donde el <code>service</code> comando wrapper no está disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consulte la lista de alternativas</a>.
</div>

## Inicie, detenga y reinicie el Agent {#start-stop-and-restart-the-agent}

### Inicie el Agent {#start-the-agent}

Lista de comandos para iniciar el Datadog Agent:

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -g datadog-agent`                                        |
| Linux      | Consulte la [documentación del Agent][1] para su SO.                      |
| Docker     | Utilice el [comando de instalación][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | Consulte la [documentación del Agent para macOS][9].                            |
| Fuente     | `sudo service datadog-agent start`                                 |
| Windows    | Consulte la [documentación del Agent de Windows][3].                          |

### Detenga el Agent {#stop-the-agent}

Lista de comandos para detener el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -g datadog-agent`                                                       |
| Linux      | Consulte la [documentación del Agent][1] para su SO.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | Consulte la [documentación del Agent para macOS][9].                                          |
| Fuente     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulte la [documentación del Agent de Windows][3].                                        |

### Reinicie el Agent {#restart-the-agent}

Lista de comandos para reiniciar el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -g datadog-agent`, luego `startsrc -g datadog-agent`                     |
| Linux      | Consulte la [documentación del Agent][1] para su SO.                                    |
| Docker     | Utilice el [comando de instalación][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | Consulte la [documentación del Agent para macOS][9].                                          |
| Fuente     | *Plataforma no compatible*                                                           |
| Windows    | Consulte la [documentación del Agent para Windows][3].                                        |


## Estado e información del Agent {#agent-status-and-information}

### Estado del servicio {#service-status}

Lista de comandos para mostrar el estado del Datadog Agent:

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -g datadog-agent`                                                      |
| Linux           | Consulte la [documentación del Agent][1] para su SO.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | Consulte la [documentación del Agent para macOS][9].                                       |
| Fuente          | `sudo service datadog-agent status`                                           |
| Windows         | Consulte la [documentación del Agent para Windows][4].                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Información del Agent {#agent-information}

Lista de comandos para mostrar el estado de su Datadog Agent y las integraciones habilitadas.

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | Consulte la [documentación del Agent para macOS][9].              |
| Fuente     | `sudo datadog-agent status`                          |
| Windows    | Consulte la [documentación del Agent para Windows][4].            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

Una integración configurada correctamente se muestra en **Running Checks** sin advertencias ni errores, como se ve a continuación:

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

## Otros comandos {#other-commands}

La interfaz de línea de comandos del Agent se basa en subcomandos. Para ver la lista de subcomandos disponibles, ejecute:

```shell
<AGENT_BINARY> --help
```

Para ejecutar un subcomando, se debe invocar el binario del Agent:

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Algunas opciones tienen indicadores y opciones detalladas en `--help`. Por ejemplo, use help con el subcomando `check`:

```shell
<AGENT_BINARY> check --help
```

| Subcomando        | Notas                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Ejecute la verificación especificada.                                                    |
| `config`          | [Gestión de configuración en tiempo de ejecución][7].                                      |
| `configcheck`     | Imprima todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Ejecute un diagnóstico de conectividad en su sistema.                              |
| `flare`           | [Recopile un flare y envíelo a Datadog][8].                                |
| `health`          | Imprima el estado actual del Agent.                                             |
| `help`            | Ayuda sobre cualquier comando.                                                     |
| `hostname`        | Imprima el nombre de host utilizado por el Agent.                                       |
| `import`          | Importe y convierta archivos de configuración de versiones anteriores del Agent. |
| `jmx`             | Solución de problemas de JMX.                                                        |
| `launch-gui`      | Inicie la GUI del Datadog Agent.                                                |
| `restart-service` | Reinicie el Agent desde el administrador de control de servicios. Solo para Windows.         |
| `start-service`   | Inicie el Agent desde el administrador de control de servicios. Solo para Windows.           |
| `stream-logs`     | Transmita los registros que está procesando un Agent en ejecución.                         |
| `stopservice`     | Detenga el Agent desde el administrador de control de servicios. Solo para Windows.            |
| `version`         | Imprima la información de la versión.                                                         |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/docker/
[3]: /es/agent/basic_agent_usage/windows/
[4]: /es/agent/basic_agent_usage/windows/#status-and-information
[5]: /es/containers/cluster_agent/
[6]: /es/agent/basic_agent_usage/#gui
[7]: /es/agent/troubleshooting/config/
[8]: /es/agent/troubleshooting/send_a_flare/
[9]: /es/agent/supported_platforms/osx/