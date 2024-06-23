---
aliases:
- /es/developers/integrations/oauth_for_data_integrations/
description: Utiliza OAuth para autenticar integraciones.
kind: Documentación
title: OAuth para integraciones
---
{{< callout btn_hidden="true" >}}
La plataforma para desarrolladores de Datadog se encuentra en fase beta. Si no tienes acceso, ponte en contacto con apps@datadoghq.com.
{{< /callout >}} 

## Información general

OAuth permite a los clientes de Datadog autorizar de forma segura el acceso de terceros a su organización Datadog. Esta autorización permite a las integraciones enviar datos a Datadog o extraerlos de Datadog sin necesidad de que los clientes introduzcan claves de API o de aplicaciones. Por ejemplo, un usuario puede aceptar proporcionar una herramienta de notificación disponible con acceso de lectura a los monitores de su organización Datadog.

Para obtener más información sobre la implementación de OAuth en Datadog, consulta la [documentación de OAuth2 en Datadog][1].

## Cuándo utilizar OAuth en una integración

La compatibilidad con OAuth es necesaria para todas las integraciones SaaS creadas por socios que envían o consultan datos directamente a/desde [endpoints de API][12] públicos de Datadog. OAuth no se aplica al software desplegado de forma local, ni a los checks del Datadog Agent. 

## Crear una integración con OAuth

Al crear una integración con OAuth, sólo debes seleccionar los contextos a los que necesita acceder tu aplicación. Una vez que un cliente autorice tu integración, todos los contextos enumerados estarán disponibles para tu aplicación a través de un token.

Puedes incluir OAuth en una nueva integración (o añadirlo a una integración existente) en la página [Marketplace][2] o [Integraciones][3], siguiendo los pasos que se indican a continuación. Para las integraciones existentes, ten en cuenta que no necesitas cambiar tu `app_uuid` en el `manifest.json`. 

### Crear una aplicación a partir de una plantilla

1. Ve a la [plataforma para desarrolladores de Datadog][4] y haz clic en **+New App** (+Nueva aplicación).

   Necesitas crear una aplicación para cada integración de cliente OAuth. Datadog vincula esta aplicación a tu integración una vez que tu integración es publicada.

2. Selecciona una **Aplicación vacía** y añade un nombre para tu aplicación.
3. Haz clic en **Create** (Crear).
4. En la pestaña **Basic Information** (Información básica), rellena los campos que aparecen en la vista detallada.
5. Una vez que esté todo listo para la publicación de tu cliente OAuth, haz clic en el botón **Mark Stable** (Marcar como estable).
6. Haz clic en **Save** (Guardar).

### Crear un cliente OAuth

El cliente es el componente de una aplicación que permite a los usuarios autorizar el acceso de la aplicación a los datos de Datadog del cliente. Para poder acceder, el cliente necesita el token de acceso adecuado.

1. Ve a la pestaña **OAuth & Permissions** (OAuth y Permisos) en **Features** (Características) y haz clic en **New Confidential OAuth Client** (Nuevo cliente confidencial OAuth).

   Los clientes OAuth que creas para las integraciones son **clientes confidenciales** que proporcionan un ID y un secreto de cliente. El cliente que creas en este paso es una versión privada de cliente, cuyas credenciales puedes utilizar para realizar tests. Cuando se crea una versión publicada de este cliente, recibes un nuevo conjunto de credenciales. **Estas credenciales no se volverán a mostrar después de la creación del cliente, así que asegúrate de guardarlas en un lugar seguro.**

2. Introduce la información de tu cliente, como el nombre, la descripción, los URI de redireccionamiento y la URL de incorporación.
3. Configura contextos para el cliente OAuth buscando contextos y seleccionando sus casillas de verificación en la columna **Requested** (Necesarios).

   Los contextos determinan los tipos de datos a los que puede acceder tu aplicación en la cuenta Datadog del cliente. Esto permite a tu integración acceder a los contextos necesarios. Solicita únicamente la cantidad mínima de contextos necesarios para tu caso de uso, ya que más adelante se pueden añadir más datos en función de las necesidades.

   Para enviar datos a Datadog, debe seleccionarse el contexto `api_keys_write`. Se trata de un contexto privad que sólo está aprobado para socios de integraciones y te permite crear una clave de API en nombre del usuario, que puedes utilizar para enviar datos a Datadog.

4. Haz clic en **Save Changes** (Guardar cambios).
5. Después de crear un cliente OAuth y asignarle contextos, puedes implementar el protocolo OAuth PKCE en tu integración, completar el flujo de concesión de códigos de autorización y empezar a escribir código de integración utilizando los endpoints disponibles a través de OAuth.

   En el flujo de concesión de códigos de autorización, recibes un código de autorización y un token de actualización, y luego intercambias el código por un token de acceso que puede utilizarse para acceder a los datos que quieres extraer de Datadog.

   Para obtener más información sobre la implementación del protocolo OAuth con Datadog, consulta [OAuth2 Datadog][1]. Para obtener más información sobre la creación y la publicación de una integración, consulta la [documentación para desarrolladores de integraciones][5].

### Probar el cliente OAuth

Una vez que hayas implementado el protocolo OAuth, debes probar tu cliente OAuth para asegurarte de que puedes enviar datos a Datadog o extraer datos de Datadog, según tu caso de uso.

**Nota**: Hasta que se publique tu cuadro de integración sólo puedes autorizar al cliente OAuth desde tu organización sandbox. Esto significa que sólo puedes enviar datos a tu cuenta del sandbox o extraer datos de ella.

Para probar tu cliente OAuth, completa los siguientes pasos:

#### Comprueba que la autorización funciona correctamente.
Asegúrate de que no se produce ningún error al recorrer el flujo de autorización básico.

   1. Ve a la plataforma para desarrolladores, haz clic en el icono Edit (Editar) en tu aplicación y abre la pestaña **OAuth and Permissions** (OAuth y Permisos).
   2. Selecciona tu cliente OAuth y haz clic en el botón **Test Authorization** (Probar autorización) en la página de informaciones de tu cliente.
   3. Esto te dirige a la URL de incorporación e inicia el flujo de autorización que recorre un cliente. Al hacer clic en este botón, se proporciona el parámetro `domain` en el redireccionamiento a `onboarding_url`.
   4. Recorre el flujo OAuth y autoriza tu integración.

#### Crear una clave de API
Si su cliente OAuth solicita el contexto, asegúrate de que puede realizar correctamente una solicitud al endpoint `marketplace_create_api`, con tu token en el encabezado de la solicitud.

Si todo sale como se espera, esta solicitud devuelve una clave de API que puedes encontrar en la [página de gestión de claves de API][10]. Debes guardar esta clave de forma segura y utilizarla para enviar datos a Datadog en nombre del usuario. **No podrás volver a acceder al valor de esta clave de API después de la respuesta a la solicitud inicial**.

#### Probar varios sitios Datadog 
Realiza tests para verificar que tu cliente OAuth puede funcionar en varios [sitios Datadog][8], poniendo en marcha la autorización desde tu organización sandbox UE Datadog.
   1. Si no tienes acceso a una cuenta sandbox en otro sitio, ponte en contacto con `ecosystems@datadog.com`.
   2. Exporta el manifiesto de tu aplicación desde la organización en el sitio Datadog US1 *original*, accediendo a la aplicación que has creado en la plataforma para desarrolladores, haciendo clic en el icono del engranaje a la derecha de **Documentation** (Documentación) y luego haciendo clic en **Export App Manifest** (Exportar manifiesto de aplicación).
   3. En la organización sandbox UE, ve a la plataforma para desarrolladores e importa el manifiesto de la aplicación del paso 2.
   4. Después de importar correctamente tu manifiesto, ve a la pestaña **OAuth & Permissions** (OAuth y Permisos) para encontrar tu cliente OAuth, junto con su ID de cliente y secreto de cliente. Actualiza tu implementación de OAuth para utilizar estas credenciales.
   5. Haz clic en el botón **Test Authorization** (Autorización de test) y sigue el flujo de OAuth.

### Confirmar el flujo de datos para todos los contextos
Asegúrate de que puedes enviar datos, extraer datos o editar datos para cada contexto que hayas solicitado.

### Publicar el cliente OAuth

#### Crear o actualizar tu solicitud de extracción
Para publicar un cliente OAuth, primero tienes que abrir una solicitud de extracción para tu integración en los repositorios de GitHub [`integrations-extras`][5] o [Marketplace][6], si aún no lo has hecho.

Como parte de tu solicitud de extracción, completa los siguientes pasos:

1. Actualiza tu archivo LÉEME, con una sección `## Uninstallation` en `## Setup`, que incluya las siguientes instrucciones (junto con cualquier instrucción personalizada que quieras añadir):
       - Una vez desinstalada este integración, se revocarán todas las autorizaciones anteriores. 
       - Además, asegúrate de que todas las claves de API asociadas a esta integración se han deshabilitado. Para ello, busca el nombre de la integración en la [página de claves de API][10].
2. Actualiza tu archivo `manifest.json` para hacer referencia a esta nueva sección `## Uninstallation`. Esta referencia debe aparecer directamente debajo del campo de asistencia:
       - ```
           "support": "README.md#Support",
           "uninstallation": "README.md#Uninstallation",
         ```

#### Iniciar el proceso de publicación en la plataforma para desarrolladores

Para iniciar el proceso de publicación en la [plataforma de desarrolladores][4]:

1. Ve a la pestaña **Publishing** (Publicación) en **General**. En la parte superior de esta pestaña, recibirás tu ID y tu secreto de cliente publicados. Tu implementación de OAuth necesita ser actualizada para incluir estas credenciales de cliente. **Nota:** Guarda tu ID y tu secreto de cliente en un lugar seguro. Esta información no se volverá a mostrar.

2. En la sección de publicación de integraciones, sigue los pasos para añadir tu información de OAuth y luego utilizarla en tu solicitud de extracción. 

3. Al abrir una solicitud de extracción para una **nueva integración** en `integrations-extras` o en `Marketplace`, copia el valor `app_uuid` en la sección de publicación de la integración y pégalo en tu archivo manifest.json, en el campo `app_uuid`. 

Una vez que un cliente OAuth se envía para su publicación, el equipo recibe una notificación. Cuando tu solicitud de extracción es aprobada por todas las partes necesarias y está lista para ser combinada, también se publica tu cliente OAuth. Luego, tu cuadro de integración se publica en tu cuenta sandbox (no para todos los clientes) y tu cliente OAuth puede recibir autorizaciones de cualquier organización Datadog (no sólo tu organización sandbox).

En este punto, Datadog recomienda realizar tests finales de tu cliente OAuth para asegurarte de que la autorización funciona sin problemas.

#### Realizar cambios después de enviar el cliente para su publicación

No puedes editar un cliente OAuth publicado directamente, así que sólo recorre el flujo de publicación cuando todo haya sido probado y esté listo para funcionar. Para realizar actualizaciones en el cliente OAuth después de ser enviado para su publicación, tienes que volver a pasar por el flujo de publicación y volver a enviarlo. **Las credenciales del cliente publicado no aparecerán de nuevo**.

Para obtener más información sobre cómo publicar tu cuadro de integración y crear tu solicitud de extracción, consulta la [documentación del Marketplace y de las integraciones][7].

## Leer más

Más enlaces, artículos y documentación útiles:

- [OAuth 2.0 en Datadog][1]
- [Autoriza tus integraciones Datadog con OAuth][11]

[1]: https://docs.datadoghq.com/es/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering/#list-an-offering
[8]: https://docs.datadoghq.com/es/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://www.datadoghq.com/blog/oauth/
[12]: https://docs.datadoghq.com/es/api/latest/using-the-api/