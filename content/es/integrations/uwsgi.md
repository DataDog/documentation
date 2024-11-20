---
categories:
- recopilación de logs
- web
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/uwsgi.md
description: Recopila logs de uWSGI para realizar un seguimiento de las solicitudes
  por segundo, los bytes servidos, el estado de las solicitudes y más.
doc_link: /integrations/uwsgi/
git_integration_title: uwsgi
has_logo: true
integration_id: uwsgi
integration_title: uWSGI
is_public: true
name: uwsgi
public_title: Integración de Datadog con uWSGI
short_description: Recopila logs de uWSGI para realizar un seguimiento de las solicitudes
  por segundo, los bytes servidos, el estado de las solicitudes y más.
supported_os:
- Linux
- mac_os
- Windows
title: uWSGI
---

## Información general

Recopila logs de uWSGI para realizar un seguimiento de las solicitudes por segundo, los bytes servidos, el estado de las solicitudes (2xx, 3xx, 4xx, 5xx), el tiempo de actividad de servicios, la lentitud y más.

## Configuración

### Instalación

[Instala el Agent][1] en la instancia que ejecuta el servidor uWSGI.

### Configuración

Por defecto, el servidor uWSGI genera logs en stdout. Ejecuta el siguiente comando para comenzar a generar logs en un archivo o sigue las [instrucciones de uWSGI para la generación de logs en un archivo][2]:

```text
uwsgi --socket :3031 --logger file:logfile=/var/log/uwsgi/uwsgi.log,maxsize=2000000
```

Crea el archivo `uwsgi.d/conf.yaml` en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent.

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítala en tu archivo `datadog.yaml` con:

```yaml
logs_enabled: true
```

A continuación, añade este bloque de configuración a tu archivo `uwsgi.d/conf.yaml` para empezar a recopilar tus logs:

```yaml
logs:
    - type: file
      path: /var/log/uwsgi/uwsgi.log
      service: '<MY_APPLICATION>'
      source: uwsgi
```

Por último, [reinicia el Agent][3].

Por defecto, la integración uWSGI en Datadog admite el [formato de log uWSGI predeterminado][4] y el [formato combinado tipo Apache][5].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://uwsgi-docs.readthedocs.io/en/latest/Logging.html#logging-to-files
[3]: /es/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#uwsgi-default-logging
[5]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#apache-style-combined-request-logging
[6]: /es/help/