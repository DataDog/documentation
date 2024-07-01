---
kind: guía
title: Recopilar logs de Heroku
---

Heroku ofrece 3 tipos de logs:

* `App logs`: salida de la aplicación que enviaste a la plataforma.
* `System logs`: mensajes sobre acciones realizadas por la infraestructura de plataforma de Heroku en nombre de tu aplicación.
* `API logs`: cuestiones administrativas implementadas por ti y otros desarrolladores que trabajan en tu aplicación.

[Las purgas de HTTP/S de Heroku][1] disminuyen los mensajes de log y envían lotes de mensajes a un endpoint de HTTPS mediante una solicitud POST.
El cuerpo de POST contiene mensajes con formato Syslog, enmarcados utilizando el método de enmarcado de recuento de octetos del protocolo TCP de Syslog.
La API de HTTP de Datadog implementa y entiende el estándar Logplex definido por el encabezado de contenido `application/logplex-1`.

Para enviar todos estos logs a Datadog:

* Conéctate a tu proyecto de Heroku.
* Configura la purga de HTTPS con el siguiente comando:

```text
heroku drains:add "https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&ddtags=env:<ENV>&service=<SERVICE>&host=<HOST>" -a <APPLICATION_NAME>
```

* Sustituye `<DD_API_KEY>` por tu [clave de API de Datadog][2].
* Sustituye `<ENV>` por el [entorno][3] de tu aplicación.
* Sustituye `<APPLICATION_NAME>` y `<SERVICE>` por el nombre de tu aplicación.
* Sustituye `<host>` por el nombre de host que desees.
**Notas**:
   - Según la [sección de host][4], las métricas y trazas (traces) establecen el nombre de host por defecto como nombre de dyno. No es posible establecer dinámicamente el nombre de dyno como nombre de host para logs. Utiliza las etiquetas `dyno` y `dynotype` para correlacionar entre métricas, trazas y logs.
   - El paquete de compilación añade automáticamente etiquetas `dyno` (que representan el nombre del dyno, como `web.1`), y `dynotype` (el tipo de dyno, como `run` o `web`). Consulta la guía [Empezando con etiquetas][3] para obtener más información.

### Atributos personalizados

Añade atributos personalizados a logs desde tu aplicación sustituyendo la URL en la purga de la siguiente manera:

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/getting_started/tagging/#introduction
[4]: /es/agent/basic_agent_usage/heroku/#hostname