---
aliases:
- /es/agent/faq/agent-s-are-no-longer-reporting-data
- /es/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/hostname_containers/
  tag: Documentación
  text: Resolución de nombres de host del Agent en contenedores
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
- link: /agent/troubleshooting/permissions/
  tag: Documentación
  text: Problemas con los permisos del Agent
- link: /agent/troubleshooting/site/
  tag: Documentación
  text: Efectuar checks en el sitio del Agent
- link: /agent/troubleshooting/ntp/
  tag: Documentación
  text: Problemas con el NTP del Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentación
  text: Consultar el estado de un check del Agent
- link: /agent/troubleshooting/high_memory_usage/
  tag: Documentación
  text: Consumo elevado de la memoria o CPU
title: Solucionar problemas del Agent
---

Si aún no has instalado el Datadog Agent, ve [a la página exclusiva para la integración del Agent][1] para obtener instrucciones de instalación. Si acabas de instalar el Agent, pueden pasar unos instantes antes de que aparezcab métricas. El primer lugar donde deberías buscar métricas es el [Explorador de métricas][2].

Si crees que tienes problemas, sigue primero esta lista de comprobación:

* ¿Tu contenedor del Agent se detiene justo después de iniciarse? Puede tratarse de un problema de detección del [nombre de host][3].
* ¿Tu host está conectado a Internet o puedes acceder a él a través de un proxy?
* Si utilizas un proxy: ¿[tu Agent está configurado para este proxy][4]?
* ¿La clave de API Datadog está configurada en tu archivo de configuración `datadog.yaml` [la clave de API correspondiente a tu plataforma Datadog][5]?
* ¿El sitio está configurado en tu archivo de configuración `datadog.yaml` [que coincide con el de tu organización][6]?
* ¿Solo hay un Datadog Agent ejecutándose en tu host?
* ¿Has reiniciado el Datadog Agent después de editar un archivo de configuración yaml?

Si la respuesta a todas las preguntas anteriores es `yes`, entonces [ejecuta el comando de estado][7] para obtener más detalles sobre tu Agent y el estado de sus integraciones. También puedes consultar los [logs del Agent][8] directamente y habilitar el modo de depuración para [obtener más logs del Agent][9].

Si todavía no te ha quedado claro cuál es el problema, puedes ponerte en contacto con el [equipo de asistencia de Datadog][10] enviando [un flare][11] desde el Agent.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://app.datadoghq.com/metric/explorer
[3]: /es/agent/troubleshooting/hostname_containers/
[4]: /es/agent/configuration/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/agent/troubleshooting/site/
[7]: /es/agent/configuration/agent-commands/#agent-status-and-information
[8]: /es/agent/configuration/agent-log-files/
[9]: /es/agent/troubleshooting/debug_mode/
[10]: /es/help/
[11]: /es/agent/troubleshooting/send_a_flare/