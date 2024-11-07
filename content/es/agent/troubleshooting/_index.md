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

Si aún no tienes instalado el Datadog Agent, accede [a la página dedicada a la integración del Agent][1] para obtener información sobre su instalación. Si acabas de instalar el Agent, es posible que las métricas tarden un poco en aparecer. El primer lugar donde deberías consultar las métricas es el [Metrics Explorer][2] (Navegador de métricas).

Si crees que algo va mal, lo primero que deberías hacer es comprobar lo siguiente:

* ¿El contenedor de tu Agent se detiene justo después de iniciarse? Puede ser un problema de detección del [nombre de host][3].
* ¿Tu host está conectado a Internet o puede acceder a Internet a través de un proxy?
* Si utilizas un proxy: ¿tienes el [Agent configurado para dicho proxy][4]?
* ¿Está configurada la clave de API de Datadog en tu archivo de configuración `datadog.yaml`? Nos referimos a [la clave de API correspondiente a tu plataforma de Datadog][5].
* ¿Coincide el sitio definido en tu archivo de configuración `datadog.yaml` con el [sitio de tu organización][6]?
* ¿Solo hay un Datadog Agent ejecutándose en tu host?
* ¿Has reiniciado el Datadog Agent después de editar un archivo de configuración YAML?

Si la respuesta a todas las preguntas anteriores es `sí`, [ejecuta el comando de estado][7] para obtener más datos sobre tu Agent y el estado de sus integraciones. También puedes comprobar los [logs del Agent][8] directamente y activar el modo de depuración para que [el Agent genere más logs][9].

Si todavía no te ha quedado claro cuál es el problema, puedes ponerte en contacto con el [equipo de asistencia de Datadog][10] enviando [un flare][11] desde el Agent.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /es/agent/troubleshooting/hostname_containers/
[4]: /es/agent/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/agent/troubleshooting/site/
[7]: /es/agent/guide/agent-commands/#agent-status-and-information
[8]: /es/agent/guide/agent-log-files/
[9]: /es/agent/troubleshooting/debug_mode/
[10]: /es/help/
[11]: /es/agent/troubleshooting/send_a_flare/