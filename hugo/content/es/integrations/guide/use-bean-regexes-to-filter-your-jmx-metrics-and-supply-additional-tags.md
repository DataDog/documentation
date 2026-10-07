---
aliases:
- /es/integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags
further_reading:
- link: /integrations/java/
  tag: Documentación
  text: Integración de Java
- link: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: Documentación
  text: Ver los datos de JMX en jConsole y configurar tu jmx.yaml para recogerlos
title: Utilizar expresiones regulares de Bean para filtrar tus métricas de JMX y suministrar
  etiquetas adicionales
---

Datadog admite expresiones regulares para hacer coincidir nombres de Mbean JMX y nombres de dominio para configurar tus filtros `include` y `exclude`. Las expresiones regulares deben ajustarse al [formato de expresión regular de Java][1]. Ten en cuenta que estos filtros se añadieron en la versión 5.5.0.

Los grupos de captura de la expresión regular proporcionada pueden utilizarse para suministrar valores de etiqueta adicionales para tus métricas.

Este artículo proporciona un ejemplo de cómo utilizar la `bean_regex` de la [integración de Java][2] y cómo hacer referencia a dichos grupos de captura para establecer etiquetas adicionales.

Supongamos que tienes el siguiente nombre de Mbean: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`. Hay cierta información que podrías utilizar como etiquetas una vez que el Agent ha recogido la métrica. Por ejemplo, podrías exportar una métrica con las siguientes etiquetas:

* `env`: `dev`
* `region`: `eu-central-1`
* `method`: `GET`
* `status`: `200`

Las expresiones regulares de Bean pueden suministrarse como una única expresión regular o como lista de expresiones regulares. En este último caso, sólo se tendrá en cuenta la primera entrada de la lista que coincida. Ve un ejemplo de archivo de configuración para exportar tus métricas personalizadas con algunas etiquetas adicionales:

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: domain.example.com
          bean_regex:
            - "domain.example.com:name=my.metric.name.*(?:\\.env\\.)([a-z]+)(?:.*\\.region\\.)([a-z-]+[0-9])(?:.*\\.method\\.)([A-Z]+)(?:.*\\.status\\.)([0-9]+)(?:.*)"
          attribute:
            attribute1:
              metric_type: gauge
              alias: "my.jmx.metric"
          tags:
              env: $1
              region: $2
              method: $3
              status_code: $4
              optional: tag
```

Cada grupo de captura se almacena en un mapa de Java. El primer grupo de captura comienza en la posición `0`. Una vez que hayas determinado qué grupo de captura deseas exportar como etiqueta, deberás hacer referencia a ellos en la sección `tags` de tu filtro `include` o `exclude`, así como al número del grupo (por ejemplo, la posición dentro del Mapa).

Para el ejemplo proporcionado en `bean_regex`, los grupos de captura son:

* `$0`: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`
* `$1`: `dev`
* `$2`: `eu-central-1`
* `$3`: `GET`
* `$4`: `200`

Con el [Metrics Explorer][3], puedes consultar tus métricas y filtrarlas por las etiquetas que acabas de crear.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[2]: /es/integrations/java/
[3]: /es/metrics/explorer/