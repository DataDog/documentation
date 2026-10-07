---
app_id: cloudquery-cloud
categories:
- herramientas de desarrollo
- nube
custom_kind: integración
description: Movimiento de datos sencillo, rápido y ampliable
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: CloudQuery Cloud
---
## Información general

[CloudQuery](https://www.cloudquery.io/) es un marco de integración de datos de código abierto y alto rendimiento creado para desarrolladores y compatible con una amplia gama de complementos.

CloudQuery extrae, transforma y carga configuración desde las APIs de la nube a una variedad de destinos compatibles, como bases de datos, lagos de datos o plataformas de streaming para su posterior análisis.

[CloudQuery Cloud](https://cloud.cloudquery.io/) es una gran manera de empezar con CloudQuery y sincronizar datos desde la fuente al destino sin necesidad de desplegar tu propia infraestructura. También facilita la conexión a fuentes y destinos con el soporte de autenticación OAuth integrado. Solo tienes que seleccionar un complemento de origen y destino y CloudQuery se encargará del resto.

## Configuración

### Instalación

1. Regístrate gratis en [cloud.cloudquery.io](https://cloud.cloudquery.io/).
1. En Datadog, navega hasta el cuadro de integración de CloudQuery Cloud
1. Haz clic en **Connect Accounts** (Conectar cuentas).
1. Serás redirigido a CloudQuery para iniciar sesión
1. Ve a la página **Sources** (Fuentes) y añade una fuente de Datadog 
1. En la sección **Authentication** (Autenticación), utiliza el botón **Authenticate** (Autenticar) para conceder acceso a tu cuenta de Datadog utilizando el flujo OAuth2.

Para obtener más información sobre el uso de CloudQuery Cloud, consulta la [guía de inicio rápido](https://docs.cloudquery.io/docs/quickstart/cloudquery-cloud).

### Configuración

La documentación detallada de la fuente CloudQuery Datadog está disponible [aquí](https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs)

## Desinstalación

1. Ve a la página **Fuentes** en [CloudQuery Cloud](https://cloud.cloudquery.io/) y busca la fuente Datadog configurada previamente. 
1. En la pestaña **Edit source** (Editar fuente), haz clic en el botón **Delete this source** (Eliminar esta fuente).

## Soporte

Para obtener ayuda, ponte en contacto con [CloudQuery](https://www.cloudquery.io/) o [CloudQuery Community](https://community.cloudquery.io/).