---
aliases:
- /es/logs/log_collection/adobe_experience_manager
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md
description: Recopila logs de Adobe Experience Manager para realizar un seguimiento
  de errores, de tiempo de respuesta de solicitudes y de páginas web con un rendimiento
  deficiente.
doc_link: /integrations/adobe_experience_manager/
further_reading:
- link: logs/
  tag: Documentación
  text: Gestión de logs
has_logo: true
integration_id: Adobe
integration_title: Adobe Experience Manager
is_public: true
name: adobe_experience_manager
public_title: Datadog y Adobe Experience Manager
short_description: Recopila logs para realizar un seguimiento de errores, de tiempo
  de respuesta de solicitudes, etc.
supported_os:
- Linux
- mac_os
- Windows
title: Adobe Experience Manager
---

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">La integración de Adobe Experience Manager no está disponible en el <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Recopila logs de Adobe Experience Manager para realizar un seguimiento de errores, de tiempo de respuesta de solicitudes y de páginas web con un rendimiento deficiente.

## Configuración

### Instalación

[Instala el Agent][1] en la instancia que ejecuta Adobe Experience Manager.

#### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en el archivo `datadog.yaml` con:

    ```yaml
    logs_enabled: true
    ```

2. Crea `adobe.experience.manager.d/conf.yaml` en tu [directorio conf.d][2] y añade la siguiente configuración para empezar a recopilar tus logs:

    ```yaml
    logs:
        - type: file
          path: cq-installation-dir/crx-quickstart/logs/*.log
          service: '<MY_APPLICATION>'
          source: adobe.experience.manager
    ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][3].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /es/agent/guide/agent-commands/#restart-the-agent
[4]: /es/help/