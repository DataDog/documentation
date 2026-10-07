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

### Datadog

Para conectar Datadog con Vercel, activa la integración y selecciona una clave de API.

1. Abre el cuadro de integración de Vercel.

2. Selecciona la pestaña **Configure** (Configurar) y selecciona **Configure the Vercel integration** (Configurar la integración de Vercel).

3. En el formulario **Your Datadog account info** (Tu información de cuenta de Datadog), selecciona **Select an API Key** (Seleccionar una clave de API) y elige una clave de API existente o selecciona **+ Create New** (+ Crear nueva) para utilizar una nueva clave de API para la integración de Vercel.

4. Una vez realizada la selección, selecciona **Use API Key** (Usar clave de API). Esto copia la clave de API seleccionada en el portapapeles de tu dispositivo.

5. Una vez seleccionada la clave de API, se te redirigirá de nuevo al formulario  **Your Datadog account info** (Tu información de cuenta de Datadog). Selecciona **Vercel > Add Integration** (Vercel > Añadir integración) para completar la configuración de integración para Vercel.
### Vercel

1. Haz clic en el enlace **Vercel > Add Integration** (Vercel > Añadir integración) para ser redirigido a la página de integración de Datadog de Vercel.

2. Selecciona **Connect Account** (Conectar cuenta) para abrir el formulario **Connect Datadog Account** (Conectar cuenta de Datadog).

3. Selecciona el equipo de Vercel al que deseas conectar la integración. (Los equipos que ya tienen instalada la integración tienen un icono al lado con la etiqueta **Installed** [Instalada]).

4. Selecciona el botón de opción asociado con la activación de la integración para todos los proyectos o para un proyecto específico del que sea propietario el equipo. Selecciona **Connect Account** (Conectar cuenta) para guardar los cambios.

5. Pega la clave de API que copiaste en el portapapeles en el paso 4 de la configuración de Datadog anterior en la casilla denominada **Your Datadog API Key** (Tu clave de API de Datadog).

6. Desplázate hasta la parte inferior del formulario y selecciona **Add Integración** (Añadir integración) para guardar los cambios.

- {{< region-param key="vercel_setup" link="true" text="Configurar la integración de Vercel" >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vercel" >}}


### Checks de servicio

La integración Vercel no incluye checks de servicio.

### Eventos

La integración Vercel no incluye eventos.

### Logs

La integración de Vercel recopila logs de tu proyecto de Vercel utilizando la función [Log Drains][9] de Vercel.

## Solucionar problemas

Si estás utilizando el Vercel OpenTelemetry Collector, el `serviceName` especificado en el bloque `registerOTel` de tu [inicializador][10] debe coincidir con el nombre del proyecto de Vercel. Esto permite que aparezcan trazas en Datadog con las métricas y log apropiados.


¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: https://docs.datadoghq.com/es/logs/
[6]: https://vercel.com/docs/functions
[7]: https://docs.datadoghq.com/es/synthetics/
[8]: https://github.com/DataDog/integrations-extras/blob/master/vercel/metadata.csv
[9]: https://vercel.com/docs/observability/log-drains
[10]: https://vercel.com/docs/observability/otel-overview#initialize-otel
[11]: https://docs.datadoghq.com/es/help/