---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
kind: documentación
title: Estado del check del Agent
---

Si tienes problemas con un check del Agent específico, utiliza estos comandos de tu sistema operativo y obtén más información sobre cómo solucionarlos:

- [Linux](#linux)
- [Windows](#windows)
- [Systemd](#systemd)
- [Referencias adicionales](#further-reading)

**Nota**: Sustituye el `<CHECK_NAME>` en los siguientes ejemplos por cualquier check del Agent. Por ejemplo: `activemq`, `ceph` o `elastic`. Consulta la [documentación sobre las integraciones][1] para confirmar el nombre del check del Agent.

**Nota**: Para deshabilitar temporalmente un check de servicio mientras solucionas los problemas, cambia el nombre de `/conf.d/<CHECK_NAME>.d/conf.yaml` por otro que no tenga la extensión de archivo `.yaml` o `.yml`, como `conf.yaml.disable`.

## Linux

Para realizar un test de un check del Agent, ejecuta:

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

Si quieres incluir métricas de frecuencia, añade `--check-rate` a tu comando. Por ejemplo, en el Agent v6.x, ejecuta:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

Sustituye el `<CHECK_NAME>` por cualquier check del Agent. Por ejemplo: `activemq`, `ceph` o `elastic`. Consulta la [documentación sobre las integraciones][4] para confirmar el nombre del check del Agent.

Si quieres incluir métricas de frecuencia, añade `--check-rate` a tu comando. Por ejemplo, en el Agent v6.x, ejecuta:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

Si continúas teniendo problemas, [ponte en contacto con el equipo de asistencia de Datadog][1] mediante un [flare][2].

## Windows

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Ejecuta el siguiente script desde una línea de comandos de PowerShell **elevada** (como administrador), con el `<CHECK_NAME>` correspondiente:

En el Agent v6.12 y posteriores:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

En el Agent v6.11 y anteriores:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v<=5.11" %}}

Al instalar el Agent se incluye un archivo llamado `shell.exe` en tu directorio `Program Files` de Datadog Agent. Este archivo se puede utilizar para ejecutar Python en el entorno del Agent. En cuanto se escriba tu check (llamado `<CHECK_NAME>`) y tengas los archivos `.py` y `.yaml` en sus lugares correctos, ejecuta lo siguiente en shell.exe:

```python
from checks import run_check
run_check('<CHECK_NAME>')
```

Esta opción muestra todas las métricas o eventos que devuelve el check.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Ejecuta el siguiente script desde una línea de comandos de PowerShell **elevada** (como administrador), con el archivo `<CHECK_NAME>` correspondiente:

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

Por ejemplo, para ejecutar el check del disco:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

En [sistemas que utilizan systemd][3], utiliza `journalctl` para facilitar la depuración.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
El siguiente comando muestra el estado del Datadog Agent.

```shell
sudo systemctl status datadog-agent
```

Si el Agent no se inicia y no aparece más información, utiliza el siguiente comando para mostrar todos los logs del servicio del Datadog Agent. Si es necesario, utiliza `-r` para imprimir los logs en orden inverso.

```shell
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "Agent v5" %}}
El siguiente comando muestra el estado del Datadog Agent.

```shell
sudo systemctl status dd-agent
```

Si el Agent no se inicia y no aparece más información, utiliza el siguiente comando para mostrar todos los logs del servicio del Datadog Agent. Si fuera necesario, usa `-r` para visualizar los logs en orden inverso.

```shell
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/agent/troubleshooting/send_a_flare/
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands