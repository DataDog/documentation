---
disable_toc: false
private: true
title: Comandos del Agent 5
---

## Información general

Esta página aborda los comandos del Agent 5. Datadog recomienda instalar o actualizar al Agent 7 para obtener las últimas características. Para obtener información sobre la instalación de la última versión del Agent, sigue las [instrucciones de instalación del Agent 7][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización al Datadog Agent v7][2].

**Nota**: Si el contenedor `service` no está disponible en tu sistema, utiliza:

* Para sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
* Para sistemas basados en `systemd`: `sudo systemctl start/stop/restart/status datadog-agent`


## Iniciar, detener y reiniciar el Agent

### Iniciar el Agent

Lista de comandos para iniciar el Datadog Agent:

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | Consulta la [documentación del Docker Agent][3].  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Fuente   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | Consulta [comandos de Windows](#Windows-commands). |

### Detener el Agent

Lista de comandos para detener el Datadog Agent:

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | Consulta la [documentación del Docker Agent][3].  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Fuente   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | Consulta [comandos de Windows](#Windows-commands). |

### Reinicio del Agent

Lista de comandos para reiniciar el Datadog Agent:

| Plataforma | Comando                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | Consulta la [documentación del Docker Agent][3].  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Fuente   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | Consulta [comandos de Windows](#Windows-commands). |

## Estado e información del Agent

### Estado del servicio

Lista de comandos para mostrar el estado del Datadog Agent:

| Plataforma        | Comando                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| Fuente          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | Consulta [comandos de Windows](#Windows-commands).                               |

### Información del Agent

Lista de comandos para mostrar el estado del Datadog Agent y las integraciones habilitadas.

| Plataforma   | Comando                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Fuente     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | Consulta [comandos de Windows](#Windows-commands).                             |

Se mostrará una integración debidamente configurada en **Checks** sin que figuren avisos ni errores, tal y como se muestra a continuación:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

### Información sobre el estado de Windows

Para verificar que el Agent se esté ejecutando, comprueba si, en el panel Services (Servicios), el estado del servicio aparece como "Started" (Iniciado). También debería aparecer un proceso llamado `ddagent.exe` en el Administrador de tareas.

La información sobre el estado del Agent en el Agent v5.2 (y posteriores) se encuentra disponible en
*Datadog Agent Manager -> Settings -> Agent Status* (Datadog Agent Manager -> Configuración -> Estado del Agent):

{{< img src="agent/faq/windows_status.png" alt="Estado en Windows" style="width:50%;" >}}

Para conocer el estado del Agent en las versiones que van de la 3.9.1 a la 5.1, dirígete a `http://localhost:17125/status`.

El comando info se puede usar en PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

También en cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

## Comandos de Windows

Utiliza el Datadog Agent Manager (disponible en el menú de inicio).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Menú de Inicio de Windows" style="width:75%;">}}

Utiliza los comandos `start`, `stop` y `restart` en el Datadog Agent Manager:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Snapshot del Manager" style="width:75%;">}}

También puedes utilizar Windows PowerShell, si se encuentra disponible:
`[start|stop|restart]-service datadogagent`


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md