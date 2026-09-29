---
aliases:
- /es/service_management/incident_management/zoom_integration/
- /es/incident_response/incident_management/zoom_integration
description: Conecte Zoom a Datadog para ayudar a su equipo a colaborar
title: Integre Zoom con Datadog Incident Management
---
## Descripción general {#overview}

Al conectar Zoom y Datadog, puede crear rápidamente reuniones de Zoom para colaborar con su equipo en incidentes activos.

## Configuración {#setup}

### Instalación {#installation}

Para instalar la aplicación Datadog for Zoom:

1. En Datadog, busque la página [**Incidents Settings**][3].
2. Vaya a **Integrations** y habilite el interruptor **Automatically create a meeting in Zoom for every incident**. Esta configuración reemplaza el botón **Add Video Call** con un botón **Start Zoom Call** para la creación de reuniones de Zoom con un solo clic desde la página de descripción general de incidentes de Datadog.
3. Cuando hace clic en el botón **Start Zoom Call**, se le solicita que agregue la aplicación Datadog Zoom. Asegúrese de permitirle visualizar y administrar información en nombre de Zoom.

## Uso {#usage}

Una vez que la aplicación se haya instalado, puede hacer clic en el botón **Start Zoom Call** desde un incidente para crear una nueva llamada de Zoom y vincularla al incidente automáticamente.

## Permisos {#permissions}

Datadog for Zoom requiere los siguientes alcances de OAuth. Para obtener más información, consulte la [documentación de alcances de OAuth de Zoom][2].

### Alcances a nivel de usuario {#user-level-scopes}

| Alcances                   | Motivo de la solicitud                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Crear reuniones cuando los usuarios hagan clic en **Start Zoom Call** en el producto Incident Management.                         |

## Eliminación de la aplicación {#removing-the-app}
Para eliminar la aplicación Datadog for Zoom:

1. Inicie sesión en su cuenta de Zoom y navegue al Zoom App Marketplace.
2. Haga clic en **Manage** > **Added Apps**, o busque la aplicación **Datadog**.
3. Haga clic en la aplicación **Datadog**.
4. Haga clic en **Eliminar**.

## Solución de problemas {#troubleshooting}

¿Necesita ayuda? Comuníquese con el [soporte de Datadog][1].

[1]: /es/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/
[3]: https://app.datadoghq.com/incidents/settings