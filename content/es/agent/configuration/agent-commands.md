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

<div class="alert alert-danger">
En sistemas basados en Linux en los que no se encuentre disponible el comando del contenedor <code>service</code>, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consulta la lista de alternativas</a>.
</div>

## Iniciar, detener y reiniciar el Agent

### Iniciar el Agent

Lista de comandos para iniciar el Datadog Agent:

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consulta la [documentación sobre el Agent][1] correspondiente a tu sistema operativo.                      |
| Docker     | Utiliza el [comando de instalación][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *o* a través de la aplicación systray |
| Fuente     | `sudo service datadog-agent start`                                 |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                          |

### Detener el Agent

Lista de comandos para detener el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consulta la [documentación sobre el Agent][1] correspondiente a tu sistema operativo.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`. Nota: El pod se reprograma automáticamente. |
| macOS      | `launchctl stop com.datadoghq.agent` *o* a través de la aplicación systray                |
| Fuente     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                                        |

### Reinicio del Agent

Lista de comandos para reiniciar el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulta la [documentación sobre el Agent][1] correspondiente a tu sistema operativo.                                    |
| Docker     | Utiliza el [comando de instalación][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`. Nota: El pod se reprograma automáticamente. |
| macOS      | Detener y luego iniciar el Agent con <br>`launchctl stop com.datadoghq.agent`<br> `launchctl start com.datadoghq.agent`<br> o utilizar la aplicación systray |
| Source     | *Plataforma no compatible*                                                           |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                                        |


## Estado e información del Agent

### Estado del servicio

Lista de comandos para mostrar el estado del Datadog Agent:

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consulta la [documentación sobre el Agent][1] correspondiente a tu sistema operativo.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *o* a través de la aplicación systray             |
| Fuente          | `sudo service datadog-agent status`                                           |
| Windows         | Consulta la [documentación del Agent Windows][4].                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Información del Agent

Lista de comandos para mostrar el estado del Datadog Agent y las integraciones habilitadas.

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` o a través de la [GUI web][6]   |
| Fuente     | `sudo datadog-agent status`                          |
| Windows    | Consulta la [documentación del Agent Windows][4].            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

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

## Otros comandos

La interfaz de línea de comandos del Agent se basa en subcomandos. Para consultar la lista de subcomandos disponibles, ejecuta:
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
| `config`          | [Gestión de la configuración del tiempo de ejecución][7].                                      |
| `configcheck`     | Muestra todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Realiza un diagnóstico de conectividad en tu sistema.                              |
| `flare`           | [Recopila una bengala y envíala a Datadog][8].                                |
| `health`          | Muestra el estado en que se encuentra el Agent en el momento de la ejecución del subcomando.                                             |
| `help`            | Ofrece ayuda con cualquier comando.                                                     |
| `hostname`        | Muestra el nombre de host que utiliza el Agent.                                       |
| `import`          | Importa y convierte archivos de configuración de versiones anteriores del Agent. |
| `jmx`             | Soluciona problemas de JMX.                                                        |
| `launch-gui`      | Inicia la GUI del Datadog Agent.                                                |
| `restart-service` | Reinicia el Agent en el administrador de control de servicios. Solo en Windows.         |
| `start-service`   | Inicia el Agent en el administrador de control de servicios. Solo en Windows.           |
| `stream-logs`     | Transmite los logs que procesa un Agent en ejecución.                         |
| `stopservice`     | Detiene el Agent en el administrador de control de servicios. Solo en Windows.            |
| `version`         | Muestra información acerca de la versión.                                                         |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/docker/
[3]: /es/agent/basic_agent_usage/windows/
[4]: /es/agent/basic_agent_usage/windows/#status-and-information
[5]: /es/containers/cluster_agent/
[6]: /es/agent/basic_agent_usage/#gui
[7]: /es/agent/troubleshooting/config/
[8]: /es/agent/troubleshooting/send_a_flare/