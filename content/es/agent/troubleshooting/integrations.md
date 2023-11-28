---
aliases:
- /es/integrations/faq/issues-getting-integrations-working
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Solucionar problemas del Agent
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Solucionar problemas del Agent
  text: Enviar un flare del Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Solucionar problemas del Agent
  text: Consultar el estado de un check del Agent
kind: documentación
title: Activar las integraciones
---

Las integraciones de Datadog se configuran a través del Datadog Agent mediante archivos de configuración YAML. Para conocer la ruta del directorio de configuración de tu sistema operativo, consulta la documentación sobre los [archivos de configuración del Agent][1].

Si una integración que has configurado no aparece en Datadog, ejecuta el [comando de la CLI `status`][2] y busca la integración en *Running Checks* (checks en ejecución).

Si la integración aparece en **Running Checks**, pero no es visible en la aplicación de Datadog:
1. Comprueba que no hay errores ni advertencias en la entrada de la integración, en `status`.
1. Consulta el [Metrics Explorer][3] (Navegador de métricas) para comprobar si las métricas del sistema se muestran desde el host. Por ejemplo, busca `system.cpu.user` en el host donde configuraste la integración.
1. Si aun así no hay métricas, verifica si hay errores en los [logs de Datadog][4] y envíaselos al [equipo de asistencia de Datadog][5] junto con el resultado del comando `status`.

Si la integración no aparece en **Running Checks**:
1. Comprueba que el archivo de configuración de la integración se encuentra en la localización correcta y tiene el nombre adecuado.
1. [Consulta la documentación][6] de la integración para comprobar que la has configurado correctamente.
1. Revisa el archivo de configuración mediante un [parseador de YAML][7] para asegurarte de que el YAML es válido.
1. Cada vez que muevas o modifiques el archivo, [reinicia el Agent][8] y ejecuta de nuevo el comando `status` para comprobar los cambios.
1. Si, a pesar de todo lo anterior, no consigues que la integración aparezca en `status`, comprueba si hay errores en los [logs de Datadog][4] y envíaselos al [equipo de asistencia de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /es/agent/guide/agent-commands/#agent-information
[3]: https://app.datadoghq.com/metric/explorer
[4]: /es/agent/guide/agent-log-files/
[5]: /es/help/
[6]: /es/integrations/
[7]: https://codebeautify.org/yaml-parser-online
[8]: /es/agent/guide/agent-commands/#start-stop-restart-the-agent