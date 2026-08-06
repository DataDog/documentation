---
categories:
- colaboración
- recopilación de logs
- suministrar
custom_kind: integration
dependencies: []
description: Seguimiento de logs de Netlify.
doc_link: https://docs.datadoghq.com/integrations/netlify/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-netlify-with-datadog/
  tag: Blog
  text: Monitoriza tus sitios de Netlify con Datadog
git_integration_title: netlify
has_logo: true
integration_id: netlify
integration_title: Netlify
integration_version: ''
is_public: true
manifest_version: '1.0'
name: netlify
public_title: Integración de Datadog y Netlify
short_description: Seguimiento de logs de Netlify.
team: web-integrations
type: ''
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

[Netlify][1] es una plataforma de desarrollo web de Jamstack que permite a los clientes crear y desplegar aplicaciones web dinámicas y de alto rendimiento.

Integra Netlify con Datadog para:

* Visualizar y analizar tu función y los logs de tráfico mediante la [Gestión de logs de Datadog][2]
* Ver el número de solicitudes a tus aplicaciones desglosadas por código de estado HTTP
* Visualizar la duración de tu función y los logs correspondientes para cada solicitud
* Monitorizar el rendimiento del frontend con la [monitorización Synthetic de Datadog][3]

## Configuración

1. Genera una [clave de API de Datadog][4].
2. Configura tu [purga de logs de Netlify][5] para enviar logs a Datadog.

## Datos recopilados

### Métricas

La integración de Netlify no incluye ninguna métrica.

### Checks de servicio

La integración de Netlify no incluye ningún check de servicio.

### Eventos

La integración de Netlify no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.netlify.com/
[2]: https://docs.datadoghq.com/es/logs/
[3]: https://docs.datadoghq.com/es/synthetics/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.netlify.com/monitor-sites/log-drains/
[6]: https://docs.datadoghq.com/es/help/