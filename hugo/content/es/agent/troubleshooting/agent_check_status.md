---
description: Aprende a probar los checks del Datadog Agent y a solucionar sus problemas
  utilizando comandos y herramientas systemd para diagnosticar problemas de integraciones.
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
title: Solucionar problemas de un check del Agent
---

Si tienes problemas con un check del Agent, utiliza estos comandos para obtener más información sobre la resolución de problemas.

**Nota**: Sustituye el `<CHECK_NAME>` en los siguientes ejemplos por cualquier check del Agent. Por ejemplo: `activemq`, `ceph` o `elastic`. Consulta la [documentación sobre la integración][1] para confirmar el nombre del check del Agent.

**Nota**: Para deshabilitar temporalmente un check de servicio mientras solucionas los problemas, cambia el nombre de `/conf.d/<CHECK_NAME>.d/conf.yaml` por otro que no tenga la extensión de archivo `.yaml` o `.yml`, como `conf.yaml.disable`.

## Linux

Para realizar un test de un check del Agent, ejecuta:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

Si quieres incluir métricas de frecuencia, añade `--check-rate` a tu comando. Por ejemplo, en el Agent v6.x, ejecuta:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```

Si el problema persiste, [ponte en contacto con el equipo de asistencia de Datadog][3] mediante un [flare][2].

## Windows

Ejecuta el siguiente script desde una línea de comandos de PowerShell **elevada** (como administrador), con el `<CHECK_NAME>` correspondiente:

En el Agent v6.12 y posteriores:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

En el Agent v6.11 y anteriores:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

## Systemd

Para los sistemas que utilizan `systemd`, utiliza `journalctl` como ayuda para la depuración.

El siguiente comando muestra el estado del Datadog Agent.

```shell
sudo systemctl status datadog-agent
```

Si el Agent no se inicia y no aparece más información, utiliza el siguiente comando para mostrar todos los logs del servicio del Datadog Agent. Si es necesario, utiliza `-r` para imprimir los logs en orden inverso.

```shell
sudo journalctl -u datadog-agent.service
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/agent/troubleshooting/send_a_flare/
[3]: /es/help