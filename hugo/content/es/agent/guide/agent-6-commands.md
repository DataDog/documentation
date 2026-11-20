---
disable_toc: false
private: true
title: Comandos de Agent 6
---
## Descripción general {#overview}

Esta página cubre los comandos de Agent 6. Datadog recomienda instalar o actualizar a Agent 7 para obtener las funciones más recientes. Para obtener información sobre cómo instalar la versión más reciente del Agent, siga las [Instrucciones de instalación de Agent 7][1]. Para obtener información sobre cómo actualizar a Agent 7 desde una versión anterior, consulte [Actualizar a Datadog Agent v7][2].

## Iniciar, detener y reiniciar el Agent {#start-stop-and-restart-the-agent}

### Iniciar el Agent {#start-the-agent}

Lista de comandos para iniciar el Datadog Agent:

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| Linux      | Consulte la [documentación del Agent][3] para su sistema operativo.                      |
| Docker     | Utilice el [comando de instalación][4].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema |
| Fuente     | `sudo service datadog-agent start`                                 |
| Windows    | Consulte la [documentación del Agent para Windows][5].                          |

### Detener el Agent {#stop-the-agent}

Lista de comandos para detener el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulte la [documentación del Agent][3] para su sistema operativo.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | `launchctl stop com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema                |
| Fuente     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulte la [documentación del Agent para Windows][5].                                        |

### Reinicie el Agent {#restart-the-agent}

Lista de comandos para reiniciar el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulte la [documentación del Agent][3] para su sistema operativo.                                    |
| Docker     | Utilice el [comando de instalación][4].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—nota: el pod se reprograma automáticamente |
| macOS      | ejecute `stop` luego `start`, *o* a través de la aplicación de la bandeja del sistema                            |
| Fuente     | *Plataforma no compatible*                                                           |
| Windows    | Consulte la [documentación del Agent de Windows][3].                                        |

## Estado e información del Agent {#agent-status-and-information}

### Estado del servicio {#service-status}

Lista de comandos para mostrar el estado del Datadog Agent:

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Linux           | Consulte la [documentación del Agent][3] para su sistema operativo.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *o* a través de la aplicación de la bandeja del sistema             |
| Fuente          | `sudo service datadog-agent status`                                           |
| Windows         | Consulte la [documentación del Agent de Windows][5].                                     |

### Información del Agent {#agent-information}

Lista de comandos para mostrar el estado de su Datadog Agent y las integraciones habilitadas.

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` o a través de la [GUI web][7]   |
| Fuente     | `sudo datadog-agent status`                          |
| Windows    | Consulte la [documentación del Agent de Windows][5].            |

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

La interfaz de línea de comandos del Agent v6 se basa en subcomandos. Para ver la lista de subcomandos disponibles, ejecute:

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
| `check`           | Ejecute la comprobación especificada.                                                    |
| `config`          | [Gestión de configuración en tiempo de ejecución][8].                                      |
| `configcheck`     | Imprima todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Ejecute un diagnóstico de conectividad en el sistema.                              |
| `flare`           | [Recopile un flare y envíelo a Datadog][9].                                |
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

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: /es/agent/
[4]: /es/agent/docker/
[5]: /es/agent/basic_agent_usage/windows/
[6]: /es/agent/docker/?tab=standard#setup
[7]: /es/agent/basic_agent_usage/#gui
[8]: /es/agent/troubleshooting/config/
[9]: /es/agent/troubleshooting/send_a_flare/