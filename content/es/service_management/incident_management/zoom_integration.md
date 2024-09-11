---
description: Conecta Zoom a Datadog para ayudar a que tu equipo colabore
private: true
title: Integración con Zoom
---

## Información general

Al conectar Zoom y Datadog, puedes crear rápidamente reuniones por Zoom para colaborar con tu equipo en caso de incidencias activas.

## Configuración

### Instalación

Para instalar la aplicación Datadog para Zoom:

1. En Datadog, busca la página Configuración de incidencias en **Gestión del servicio**.
2. Ve a **Integrations** (Integraciones) y activa la opción **Automatically create a meeting in Zoom for every incident** (Crear automáticamente una reunión en Zoom para cada incidencia). Este ajuste sustituye el botón **Add Video Call** (Añadir videollamada) por el botón **Start Zoom Call** (Iniciar llamada de Zoom) para crear reuniones de Zoom con un solo clic desde la página de resumen de incidencias de Datadog.
3. Cuando hagas clic en el botón **Start Zoom Call** (Iniciar llamada de Zoom), se te pedirá que añadas la aplicación Datadog Zoom App. Asegúrate de permitir ver y gestionar la información en nombre de Zoom.

## Uso

Una vez instalada la aplicación, puedes hacer clic en el botón **Start Zoom Call** (Iniciar llamada de Zoom) desde una incidencia para crear una nueva llamada de Zoom y vincularla automáticamente a la incidencia.

## Permisos

Datadog para Zoom requiere los siguientes contextos de autorización. Para obtener más información, consulta la [documentación de contextos de autorización de Zoom][2].

### Contextos a nivel de usuario

| Contextos                   | Motivo de la solicitud                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Crea reuniones cuando los usuarios hagan clic en **Start Zoom Call** (Iniciar llamada por Zoom) en el producto Gestión de incidencias.                         |

## Eliminar la aplicación
Para eliminar la aplicación Datadog para Zoom:

1. Inicia sesión en tu cuenta de Zoom y navega hasta Zoom App Marketplace.
2. Haz clic en **Manage** > **Added Apps** (Gestión > Aplicaciones añadidas), o buscar la aplicación **Datadog**.
3. Haz clic en la aplicación **Datadog**.
4. Haz clic en **Remove** (Eliminar).

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de soporte de Datadog][1].

[1]: /es/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/