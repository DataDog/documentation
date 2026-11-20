---
app_id: appkeeper
app_uuid: fc54f5f2-0ce1-4d4e-b1e0-191eece029d3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: AppKeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10130
    source_type_name: AppKeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIOS AppKeeper
  sales_email: rd-pd-1@sios.com
  support_email: rd-pd-1@sios.com
categories:
- aws
- nube
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: appkeeper
integration_id: appkeeper
integration_title: AppKeeper
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: appkeeper
public_title: AppKeeper
short_description: Appkeeper reinicia servicios basándose en alertas de Datadog
supported_os:
- Linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Notificaciones
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Appkeeper reinicia servicios basándose en alertas de Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AppKeeper
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

SIOS AppKeeper reinicia automáticamente servicios Amazon EC2 fallidos cuando recibe notificaciones de Datadog, lo que elimina la necesidad de una costosa intervención manual. Cuando Datadog activa una alerta, reinicia el servicio EC2 mediante la API de recuperación de AppKeeper.

## Configuración

### Obtener la clave de API de SIOS AppKeeper

Obtén la clave de API de SIOS AppKeeper desde la GUI de AppKeeper.

1. Haz clic en **Account Information** (Información de la cuenta) y abre el cuadro de diálogo modal.
2. Haz clic en **Get Token** (Obtener token).
3. Copia el token.

![snapshot][1]

### Instalación y configuración de la integración de webhooks

1. En el sitio Datadog, ve a [integración de webhooks][2] e instala la integración.
2. Selecciona la pestaña **Configuración**.
3. En el encabezado **Webhooks**, haz clic en **New** (Nuevo).
4. Introduce la siguiente URL: "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover"
5. Introduce el `id` y el nombre de `name` para la instancia de monitorización en la sección **Carga útil**.
3. Registre el token de la API de AppKeeper en la sección **Cabeceras personalizadas**.

![snapshot][3]

### Integración con la monitorización de Datadog

1. Crea un nuevo [test Synthetic][4] en Datadog. Haz clic en **New Test** (Nuevo test) en la esquina superior derecha.
2. En el paso **Definir solicitudes**, introduce la URL que quieres monitorizar.
3. En el paso **Definir aserciones**, haz clic en **New Assertion** (Nueva aserción) y añade los siguientes parámetros: Cuando `status code` es `200`. Esto activa una alerta cuando el código de estado **no** es 200. Si la solicitud requiere una notificación basada en un estado diferente, sustituye 200 por tu código de estado.
4. Haga clic de nuevo en **New Assertion** (Nueva aserción) y añade un segundo conjunto de parámetros: Y `response time` es inferior a `2000` ms. Esto activa una alerta cuando el tiempo de respuesta es superior a 2000 ms. Si necesitas una duración mayor o menor, sustituye `2000` por tu duración preferida.
5. En el paso **Notificar a tu equipo**, añade el webhook con el formato `@webhook-name_of_the_webhook`. Incluye un mensaje de notificación. **Nota**: El intervalo de monitorización mínimo para **volver a enviar una notificación si el monitor no se resuelve** en este paso es `Every 10 Minutes`. Si se define en **Nunca**, el webhook no podrá llamar a la API de recuperación de AppKeeper.

![snapshot][5]

Los resultados de las recuperaciones realizadas por AppKeeper aparecen en la GUI de AppKeeper.

![snapshot][6]

## Datos recopilados

### Métricas

Para ver la lista de métricas de esta integración, consulta [metadata.csv][7].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://app.datadoghq.com/synthetics/list
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test_params.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[7]: https://github.com/DataDog/integrations-extras/blob/master/appkeeper/metadata.csv
[8]: https://docs.datadoghq.com/es/help/