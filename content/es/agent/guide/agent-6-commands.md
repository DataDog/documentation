---
disable_toc: false
private: true
title: Comandos del Agent 6
---

## Información general

Esta página aborda los comandos del Agent 6. Datadog recomienda instalar o actualizar al Agent 7 para obtener las últimas características. Para obtener información sobre la instalación de la última versión del Agent, sigue las [instrucciones de instalación del Agent 7][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización al Datadog Agent v7][2].

## Iniciar, detener y reiniciar el Agent

### Iniciar el Agent

Lista de comandos para iniciar el Datadog Agent:

| Plataforma   | Comando                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consulta la [documentación del Agent][3] de tu sistema operativo.                      |
| Docker     | Utiliza el [comando de instalación][4].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *o* a través de la aplicación systray |
| Fuente     | `sudo service datadog-agent start`                                 |
| Windows    | Consulta la [documentación del Agent Windows][5].                          |

### Detener el Agent

Lista de comandos para detener el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consulta la [documentación del Agent][3] de tu sistema operativo.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`. Nota: El pod se reprograma automáticamente. |
| macOS      | `launchctl stop com.datadoghq.agent` *o* a través de la aplicación systray                |
| Fuente     | `sudo service datadog-agent stop`                                                |
| Windows    | Consulta la [documentación del Agent Windows][5].                                        |

### Reinicio del Agent

Lista de comandos para reiniciar el Datadog Agent:

| Plataforma   | Comando                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consulta la [documentación del Agent][3] de tu sistema operativo.                                    |
| Docker     | Utiliza el [comando de instalación][4].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`. Nota: El pod se reprograma automáticamente. |
| macOS      | Ejecuta `stop` y, luego, `start`, *o* a través de la aplicación systray.                            |
| Fuente     | *Plataforma no compatible*                                                           |
| Windows    | Consulta la [documentación sobre el Windows Agent][3].                                        |

## Estado e información del Agent

### Estado del servicio

Lista de comandos para mostrar el estado del Datadog Agent:

| Plataforma        | Comando                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consulta la [documentación del Agent][3] de tu sistema operativo.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *o* a través de la aplicación systray             |
| Fuente          | `sudo service datadog-agent status`                                           |
| Windows         | Consulta la [documentación del Agent Windows][5].                                     |

### Información del Agent

Lista de comandos para mostrar el estado del Datadog Agent y las integraciones habilitadas.

| Plataforma   | Comando                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` o a través de la [GUI web][7]   |
| Fuente     | `sudo datadog-agent status`                          |
| Windows    | Consulta la [documentación del Agent Windows][5].            |

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

La interfaz de línea de comandos de Agent v6 se basa en subcomandos. Para ver la lista de subcomandos disponibles, ejecuta:
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
| `config`          | [Gestión de la configuración del tiempo de ejecución][8].                                      |
| `configcheck`     | Muestra todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Realiza un diagnóstico de conectividad en tu sistema.                              |
| `flare`           | [Recopila un flare y envíalo a Datadog][9].                                |
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

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: /es/agent/
[4]: /es/agent/docker/
[5]: /es/agent/basic_agent_usage/windows/
[6]: /es/agent/docker/?tab=standard#setup
[7]: /es/agent/basic_agent_usage/#gui
[8]: /es/agent/troubleshooting/config/
[9]: /es/agent/troubleshooting/send_a_flare/