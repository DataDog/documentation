---
app_id: vercel
app_uuid: 3ee4a2db-aea9-4663-93a9-d5758f71ba9d
assets:
  dashboards:
    Vercel: assets/dashboards/vercel_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vercel.requests
      metadata_path: metadata.csv
      prefix: vercel.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10213
    source_type_name: Vercel
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- configuración y despliegue
- la red
- suministro
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vercel/README.md
display_on_public_website: true
draft: false
git_integration_title: vercel
integration_id: vercel
integration_title: Vercel
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vercel
public_title: Vercel
short_description: Monitorización de tus aplicaciones serverless que se ejecutan en
  Vercel
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Categoría::Red
  - Categoría::Suministro
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización de tus aplicaciones serverless que se ejecutan en Vercel
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Vercel
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![Integración Datadog][1]

## Información general

[Vercel][2] es una plataforma de despliegue y colaboración que permite a los desarrolladores frontend crear sitios web y aplicaciones de alto rendimiento. Vercel es también el creador de Next.js, un marco React desarrollado en colaboración con ingenieros de Google y Facebook en 2016. Los usuarios de Vercel pueden aprovechar una herramienta de despliegue integrada que gestiona el proceso de compilación y presentación, así como una [red Edge][3] propia que almacena en caché sus sitios para una rápida recuperación. Además, Vercel ofrece [funciones serverless][4] que permiten a los usuarios desplegar código serverless para llevar a cabo procesos esenciales de backend como la autenticación de usuarios, el envío de formularios y las consultas a bases de datos.

Aprovecha la integración de Vercel con Datadog para:

- Visualizar y analizar tus logs de aplicación utilizando la [gestión de logs de Datadog][5]
- Consultar el número de solicitudes y errores HTTP 4xx/5xx a tus aplicaciones serverless y tus API que se ejecutan en Vercel
- Monitorizar el rendimiento de [funciones Vercel][6] y frontend con [Datadog Synthetics][7]

## Configuración

- [Configurar la integración Vercel][8]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vercel" >}}


### Checks de servicio

La integración Vercel no incluye checks de servicio.

### Eventos

La integración Vercel no incluye eventos.

### Logs

La integración Vercel recopila logs de tu proyecto Vercel utilizando la función [Log Drains][10] de Vercel.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: /es/logs/
[6]: https://vercel.com/docs/functions
[7]: /es/synthetics/
[8]: https://app.datadoghq.com/setup/vercel
[9]: https://github.com/DataDog/integrations-extras/blob/master/vercel/metadata.csv
[10]: https://vercel.com/docs/observability/log-drains
[11]: /es/help/