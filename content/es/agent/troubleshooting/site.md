---
title: Problemas con el sitio del Agent
---

El Agent envía sus datos de forma predeterminada al sitio de Datadog en Estados Unidos: `app.datadoghq.com`. Si tu organización está en otro sitio, debes actualizar el parámetro `site` en el [archivo de configuración principal de tu Agent][1] o establecer la variable de entorno `DD_SITE`.

Para actualizar la documentación de Datadog en función de tu sitio, utiliza el selector de la derecha. En estos momentos, estás consultando la documentación de: {{< region-param key="dd_full_site" code="true" >}}.

Establece la variable `DD_SITE` en {{< region-param key="dd_site" code="true" >}} o actualiza el parámetro `site` en tu `datadog.yaml`.

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
#
site: {{< region-param key="dd_site" >}}
```


[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file