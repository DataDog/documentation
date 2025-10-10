---
app_id: ably
app_uuid: 4596cd59-d3f2-4921-8133-3a448ccaea61
assets:
  dashboards:
    Ably: assets/dashboards/ably.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - ably.channels.mean
      - ably.channels.min
      - ably.channels.peak
      - ably.connections.all.mean
      - ably.connections.all.min
      - ably.connections.all.peak
      metadata_path: metadata.csv
      prefix: ably.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10340
    source_type_name: Ably
  oauth: assets/oauth_clients.json
author:
  homepage: https://ably.com
  name: Ably
  sales_email: sales@ably.com
  support_email: support@ably.com
categories:
- nube
- métricas
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ably/README.md
display_on_public_website: true
draft: false
git_integration_title: ably
integration_id: ably
integration_title: Ably
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ably
public_title: Ably
short_description: Recopilar y graficar métricas de Ably
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Nube
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopilar y graficar métricas de Ably
  media:
  - caption: 'Ably: dashboard'
    image_url: images/ably-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Ably
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Información general
La plataforma [Ably][1] se utiliza para potenciar casos de uso en tiempo real como multijugadores, chat, sincronización de datos, transmisión de datos y notificaciones en aplicaciones web y móviles altamente escalables de todo el mundo. Al utilizar nuestras API, los ingenieros pueden centrarse en la creación de funciones básicas, en lugar de tener que aprovisionar y mantener servidores e infraestructuras en la nube.

La integración Datadog de Ably envía métricas de [estadísticas de Ably][2] directamente a tu cuenta de Datadog.

Al utilizar la integración Datadog de Ably, puedes:
- Utilizar [estadísticas de Ably][2] junto con otras métricas clave en Datadog
- Correlacionar el uso de mensajes, canales y conexiones de Ably para el análisis colaborativo en dashboards de Datadog
- Visualizar y realizar un seguimiento de las estadísticas de uso de Ably en Datadog

## Ajuste

- **En Datadog**: Ve a **integraciones**, selecciona el cuadro de Ably y haz clic en **Install Integration** (Instalar integración).

- Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar la autorización de esta integración. Se te redirigirá a [Ably][1].

- **En Ably**: Inicia sesión y ve a **Tus aplicaciones**.

![Captura de pantalla de Ably][3]

- Seleccione la **aplicación Ably** para la que quieres configurar la **integración Datadog** y haz clic en **Integrations** (Integraciones).

![Captura de pantalla de Ably][4]

- Haz clic en el botón **Connect to Datadog** (Conectarse a Datadog) para iniciar la autorización de esta integración.

- Se te redirigirá a la página de autorización de Datadog.

- Haz clic en el botón **Authorise** (Autorizar) para finalizar la configuración y volver al sitio web de Ably.

![Captura de pantalla de Ably][5]

Tus estadísticas de aplicaciones Ably aparecen ahora en Datadog.

## Datos recopilados

Para ver más detalles sobre las estadísticas de Ably, lee la [documentación sobre estadísticas de aplicaciones][2].

### Métricas
{{< get-metrics-from-git "ably" >}}


### Eventos

La integración de Ably no incluye eventos.

### Checks de servicios

La integración de Ably no incluye checks de servicio.

## Desinstalación

- **En Ably**: Ingresa a https://ably.com, inicia sesión y ve a **Tus aplicaciones**.

- Selecciona la aplicación Ably de la que quieres desinstalar la **integración Datadog**.

- Haz clic en el botón **Remove** (Eliminar) de la sección **Integración Datadog**.

![Captura de pantalla de Ably][7]

Las estadísticas de tu aplicación Ably ya no se envían a Datadog.

- **En Datadog**: Ve a **integraciones**, selecciona el cuadro de Ably y haz clic en **Uninstall Integration** (Desinstalar integración).

Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.

Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la [página de claves de API][8].

## Agent
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Ably][9].

[1]: https://ably.com
[2]: https://ably.com/docs/general/statistics
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png
[6]: https://github.com/DataDog/integrations-extras/blob/master/ably/metadata.csv
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png
[8]: https://app.datadoghq.com/organization-settings/api-keys?filter=Ably
[9]: https://ably.com/support