---
description: Configura el Datadog Agent para enviar datos al sitio de Datadog correcto
  estableciendo el parámetro de sitio o la variable de entorno DD_SITE.
title: Problemas con el sitio del Agent
---

Por defecto, el Agent envía sus datos al sitio de EE. UU. de Datadog: `app.datadoghq.com`. Si tu organización se encuentra en otro sitio, debes actualizar el parámetro `site`en tu [archivo principal de configuración del Agent][1] o configurar la variable de entorno `DD_SITE`.

Para actualizar la documentación de Datadog en función de tu sitio, utiliza el selector de la derecha. En estos momentos, estás consultando la documentación de: {{< region-param key="dd_full_site" code="true" >}}.

Establece la variable `DD_SITE` en {{< region-param key="dd_site" code="true" >}} o actualiza el parámetro `site` en tu `datadog.yaml`

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
#
site: {{< region-param key="dd_site" >}}
```


[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file