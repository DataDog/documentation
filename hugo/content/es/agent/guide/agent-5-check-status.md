---
disable_toc: false
private: true
title: Solucionar problemas de un check del Agent en Agent 5
---

Esta página aborda cómo solucionar problemas de un check del Agent en Agent 5. Para obtener información sobre la última versión del Agent, consulta [Solucionar problemas en el check del Agent][4].

Si tienes problemas con un check del Agent, utiliza estos comandos para obtener más información sobre la resolución de problemas.

**Notas**:
- Sustituye el `<CHECK_NAME>` en los siguientes ejemplos por cualquier check del Agent. Por ejemplo: `activemq`, `ceph` o `elastic`. Consulta la [documentación sobre la integración][1] para confirmar el nombre del check del Agent.
- Para deshabilitar temporalmente un check de servicio mientras solucionas los problemas, cambia el nombre de `/conf.d/<CHECK_NAME>.d/conf.yaml` por otro que no tenga la extensión de archivo `.yaml` o `.yml`, como `conf.yaml.disable`.

## Linux

Para realizar un test de un check del Agent, ejecuta:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

Sustituye el `<CHECK_NAME>` por cualquier check del Agent. Por ejemplo: `activemq`, `ceph` o `elastic`. Consulta la [documentación sobre la integración][1] para confirmar el nombre del check del Agent.

Si quieres incluir métricas de frecuencia, añade `--check-rate` a tu comando. Por ejemplo, en el Agent v6.x, ejecuta:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

Si el problema persiste, [ponte en contacto con el equipo de soporte de Datadog][2] con un [flare][3].

## Windows

{{< tabs >}}
{{% tab "Agent v<=5.11" %}}

Al instalar el Agent se incluye un archivo llamado `shell.exe` en tu directorio `Program Files` del Datadog Agent. Este archivo se puede utilizar para ejecutar Python en el entorno del Agent. En cuanto se escriba tu check (llamado `<CHECK_NAME>`) y tengas los archivos `.py` y `.yaml` en sus lugares correctos, ejecuta lo siguiente en shell.exe:

```python
from checks import run_check
run_check('<CHECK_NAME>')
```

Esta opción muestra todas las métricas o eventos que devuelve el check.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Ejecuta el siguiente script desde una línea de comandos de PowerShell **elevada** (como administrador), con el `<CHECK_NAME>` correspondiente:

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

Por ejemplo, para ejecutar el check del disco:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab%}}
{{< /tabs >}}

## Systemd

Para los sistemas que utilizan `systemd`, utiliza `journalctl` como ayuda para la depuración.

El siguiente comando muestra el estado del Datadog Agent.

```shell
sudo systemctl status dd-agent
```

Si el Agent no se inicia y no aparece más información, utiliza el siguiente comando para mostrar todos los logs del servicio del Datadog Agent. Si es necesario, utiliza `-r` para imprimir los logs en orden inverso.

```shell
sudo journalctl -u dd-agent.service
```

[1]: /es/integrations/
[2]: /es/help
[3]: /es/agent/guide/agent-5-flare/
[4]: /es/agent/troubleshooting/agent_check_status