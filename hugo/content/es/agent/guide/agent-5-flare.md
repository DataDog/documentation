---
aliases:
- /es/agent/guide/windows-flare-agent-5
disable_toc: false
private: true
title: Enviar un flare del Agent 5
---

Esta página cubre los puertos utilizados por el Agent 5. Para obtener información sobre la última versión del Agent, consulta [Enviar un flare][1].

| Plataforma   | Comando                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <POD_NAME> -it /etc/init.d/datadog-agent flare <CASE_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| SUSE       | `sudo service datadog-agent flare <CASE_ID>`                            |
| Fuente     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | Consulta la [sección de Windows](#windows)                                             |

**Nota**: Si utilizas un sistema basado en Linux y el ajustador de comando `service` no está disponible, [consulta la lista de alternativas][3].

## Windows

Para enviar una copia de tus logs y configuraciones de Windows al equipo de asistencia de Datadog, sigue estos pasos:

* Abre el Datadog Agent Manager.

* Selecciona Actions (Acciones).

* Selecciona Flare.

* Introduce tu número de ticket. Si no lo tienes, deja el valor cero.

* Introduce la dirección de correo electrónico que utilizas para iniciar sesión en Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Flare en Windows" style="width:70%;">}}

El comando flare se puede usar en PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

También en cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### No se puede cargar el flare

El resultado del comando flare te dice donde se guarda el archivo flare comprimido. Si se produce algún error al cargar el archivo a Datadog, lo puedes recuperar desde este directorio y añadirlo manualmente como adjunto a un correo electrónico. Localizaciones en las que suelen guardarse los archivos flare:
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

Si utilizas alguna versión anterior del Agent en Windows, encontrarás la localización de este archivo al ejecutar lo siguiente desde el símbolo del sistema de Python del Agent:

**Paso 1**:

* Agent v5.12 (y posteriores):
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* Versiones anteriores del Agent:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**Paso 2**:

```python
import tempfile
print tempfile.gettempdir()
```

Ejemplo:

{{< img src="agent/faq/flare_fail.png" alt="Error del flare" style="width:70%;">}}

Para obtener información sobre la última versión del Agent, consulta la [documentación de Windows ][2].

[1]: /es/agent/troubleshooting/send_a_flare
[2]: /es/agent/basic_agent_usage/windows/#agent-v5
[3]: /es/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands