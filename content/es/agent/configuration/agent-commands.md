---
algolia:
  tags:
  - agent status command
aliases:
- /es/agent/faq/agent-status-and-information
- /es/agent/faq/start-stop-restart-the-datadog-agent
- /es/agent/faq/agent-commands
- /es/agent/guide/agent-commands
description: Referencia completa de los comandos del Agente de Datadog para iniciar,
  detener, solucionar problemas y gestionar el Agente.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Solución de problemas del Agente
title: Comandos del Agente
---
<div class="alert alert-danger">
Para sistemas basados en Linux donde el comando envoltorio <code>service</code> no está disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consulta la lista de alternativas</a>.
</div>

## Iniciar, detener y reiniciar el Agente {#start-stop-and-restart-the-agent}

### Iniciar el Agente {#start-the-agent}

Lista de comandos para iniciar el Agente de Datadog:

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consulta la [documentación del Agente][1] para tu sistema operativo.                      |
| Docker     | Utiliza el [comando de instalación][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema |
| Fuente     | `sudo service datadog-agent start`                                 |
| Windows    | Consulta la [documentación del Agente de Windows][3].                          |

### Detener el Agente {#stop-the-agent}

Lista de comandos para detener el Agente de Datadog:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consulta la [documentación del Agente][1] para tu sistema operativo.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | `launchctl stop com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema                |
| Fuente     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulta la [documentación del Agente de Windows][3].                                        |

### Reiniciar el Agente {#restart-the-agent}

Lista de comandos para reiniciar el Agente de Datadog:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulta la [documentación del Agente][1] para tu sistema operativo.                                    |
| Docker     | Utiliza el [comando de instalación][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | Detén y luego inicia el Agente con:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>O utiliza la aplicación de la bandeja del sistema |
| Fuente     | *Plataforma no soportada*                                                           |
| Windows    | Consulta la [documentación del Agente de Windows][3].                                        |


## Estado e información del agente {#agent-status-and-information}

### Estado del servicio {#service-status}

Lista de comandos para mostrar el estado del Agente de Datadog:

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consulta la [documentación del Agente][1] para tu sistema operativo.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema             |
| Fuente          | `sudo service datadog-agent status`                                           |
| Windows         | Consulta la [documentación del Agente de Windows][4].                                     |
| [Agente de Clúster (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Información del agente {#agent-information}

Lista de comandos para mostrar el estado de tu Agente de Datadog y las integraciones habilitadas.

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` o a través de la [web GUI][6]   |
| Fuente     | `sudo datadog-agent status`                          |
| Windows    | Consulta la [documentación del Agente de Windows][4].            |
| [Agente de Clúster (Kubernetes)][5] | `datadog-cluster-agent status`       |

Una integración correctamente configurada se muestra bajo **Comprobaciones en Ejecución** sin advertencias ni errores, como se ve a continuación:

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

La interfaz de línea de comandos del Agente se basa en subcomandos. Para ver la lista de subcomandos disponibles, ejecute:

```shell
<AGENT_BINARY> --help
```

Para ejecutar un subcomando, se debe invocar el binario del Agente:

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Algunas opciones tienen banderas y opciones detalladas en `--help`. Por ejemplo, usa ayuda con el subcomando `check`:

```shell
<AGENT_BINARY> check --help
```

| Subcomando        | Notas                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Ejecuta la verificación especificada.                                                    |
| `config`          | [Gestión de configuración en tiempo de ejecución][7].                                      |
| `configcheck`     | Imprime todas las configuraciones cargadas y resueltas de un Agente en ejecución.              |
| `diagnose`        | Ejecuta un diagnóstico de conectividad en tu sistema.                              |
| `flare`           | [Recoge un flare y envíalo a Datadog][8].                                |
| `health`          | Imprime la salud actual del Agente.                                             |
| `help`            | Ayuda sobre cualquier comando.                                                     |
| `hostname`        | Imprime el nombre de host utilizado por el Agente.                                       |
| `import`          | Importa y convierte archivos de configuración de versiones anteriores del Agente de Datadog. |
| `jmx`             | Solución de problemas de JMX.                                                        |
| `launch-gui`      | Inicie la GUI del Agente de Datadog.                                                |
| `restart-service` | Reinicie el Agente de Datadog dentro del administrador de control de servicios. Solo en Windows.         |
| `start-service`   | Inicie el Agente de Datadog dentro del administrador de control de servicios. Solo en Windows.           |
| `stream-logs`     | Transmita los registros que está procesando un Agente de Datadog en ejecución.                         |
| `stopservice`     | Detenga el Agente de Datadog dentro del administrador de control de servicios. Solo en Windows.            |
| `version`         | Imprime la información de versión.                                                         |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/docker/
[3]: /es/agent/basic_agent_usage/windows/
[4]: /es/agent/basic_agent_usage/windows/#status-and-information
[5]: /es/containers/cluster_agent/
[6]: /es/agent/basic_agent_usage/#gui
[7]: /es/agent/troubleshooting/config/
[8]: /es/agent/troubleshooting/send_a_flare/