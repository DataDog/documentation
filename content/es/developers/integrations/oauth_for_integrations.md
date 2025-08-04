---
aliases:
- /es/developers/integrations/oauth_for_data_integrations/
description: Utiliza OAuth para autenticar integraciones.
further_reading:
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentación
  text: OAuth2 en Datadog
- link: /developers/integrations/
  tag: Documentación
  text: Crear una integración
- link: https://www.datadoghq.com/blog/oauth/
  tag: Blog
  text: Autoriza tus integraciones de Datadog con OAuth
title: OAuth para integraciones
---

## Información general

OAuth permite a los clientes de Datadog autorizar de forma segura el acceso de terceros a su organización Datadog. Esta autorización permite a las integraciones enviar datos a Datadog o extraerlos de Datadog sin necesidad de que los clientes introduzcan claves de API o de aplicaciones. Por ejemplo, un usuario puede aceptar proporcionar una herramienta de notificación disponible con acceso de lectura a los monitores de su organización Datadog.

Para obtener más información sobre la implementación de OAuth en Datadog, consulta la [documentación de OAuth2 en Datadog][1].

La publicación de un cliente OAuth no genera la publicación de una integración. Tu integración sólo aparecerá en la [página Integraciones][16] después de haber realizado un proceso de publicación independiente. Para obtener información sobre la creación y publicación de un integración, consulta [Crear una integración][18].

## Cuándo utilizar OAuth en una integración

La compatibilidad con OAuth es necesaria para todas las integraciones SaaS creadas por socios, que envían o consultan datos directamente de [endpoints de API] públicos de Datadog[12]. OAuth no se aplica al software desplegado on-premises ni a los checks del Datadog Agent.

## Crear una integración con OAuth

Al crear una integración con OAuth, debes seleccionar sólo los contextos que necesite tu aplicación. Después de que un cliente consienta en autorizar tu integración, todos los contextos enumerados estarán disponibles para tu aplicación a través de un token.

Puedes incluir OAuth en una nueva integración (o añadirla a una integración existente) en la página [Marketplace][2] o [Integraciones][3] siguiendo los pasos que se indican a continuación. Para integraciones existentes, ten en cuenta que no hay necesidad de cambiar tu `app_uuid` en el `manifest.json`.

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

   Los clientes OAuth que creas para integraciones son **clientes confidenciales** que proporcionan un ID de cliente y un secreto de cliente. El cliente que creas en este paso es una versión privada del cliente, cuyas credenciales puedes utilizar para realizar tests. Sólo permite la autorización interna de la organización. Cuando se crea una versión publicada de este cliente, se recibe un nuevo conjunto de credenciales que permiten la autorización en cualquier organización de Datadog.

   <div class="alert alert-info">Estas credenciales no se vuelven a mostrar después de crear el cliente, así que asegúrate de guardarlas en un sitio seguro.</div>

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
   2. Selecciona tu cliente OAuth y haz clic en el botón **Test Authorization** (Autorización de test) en la página de informaciones de tu cliente.
   3. Esto te dirige a la URL de incorporación e inicia el flujo de autorización que recorre un cliente. Al hacer clic en este botón, se proporciona el parámetro `domain` en el redireccionamiento a `onboarding_url`.
   4. Recorre el flujo OAuth y autoriza tu integración.

#### Crear una clave de API

Si tu cliente OAuth solicita el contexto `api_keys_write`, asegúrate de que puedes realizar correctamente una solicitud al endpoint `marketplace` con tu token en las cabeceras de la solicitud. Para obtener más información, consulta la [referencia de los endpoints de autorización OAuth2][20].

Si todo sale como se espera, esta solicitud devuelve una clave de API que puedes encontrar en la [página de gestión de claves de API][10]. Debes guardar esta clave de forma segura y utilizarla para enviar datos a Datadog en nombre del usuario. **No podrás volver a acceder al valor de esta clave de API después de la respuesta a la solicitud inicial**.

#### Probar varios sitios Datadog 

No puedes probar otras organizaciones con tu cliente de tests, pero puedes verificar que tu cliente OAuth funciona en varios [sitios Datadog][8] copiando tu cliente en tu sandbox EU e iniciando la autorización.
   1. Si no tienes acceso a una cuenta sandbox en otro sitio, ponte en contacto con `ecosystems@datadog.com`.
   2. Exporta el manifiesto de tu aplicación desde la organización en el sitio Datadog US1 *original*, accediendo a la aplicación que has creado en la plataforma para desarrolladores, haciendo clic en el icono del engranaje a la derecha de **Documentation** (Documentación) y luego haciendo clic en **Export App Manifest** (Exportar manifiesto de aplicación).
   3. En la organización sandbox UE, ve a la plataforma para desarrolladores e importa el manifiesto de la aplicación del paso 2.
   4. Después de importar correctamente tu manifiesto, ve a la pestaña **OAuth & Permissions** (OAuth y Permisos) para encontrar tu cliente OAuth, junto con su ID de cliente y secreto de cliente. Actualiza tu implementación de OAuth para utilizar estas credenciales.
   5. Haz clic en el botón **Test Authorization** (Autorización de test) y sigue el flujo de OAuth.

Una vez publicado tu cliente OAuth, puedes probarlo libremente desde otras organizaciones.

##### Compatibilidad interregional

Para que OAuth funcione para los usuarios de todas las regiones de Datadog, debes asegurarte de que realizas las llamadas a la API correctas en función de la región del usuario. Cuando el usuario inicia la autorización desde el cuadro de Datadog, se envía un parámetro de sitio en la redirección desde la URL de incorporación. Este parámetro de sitio se utiliza en las llamadas a los endpoints de autorización y token.

Si un usuario inicia la autorización directamente desde tu plataforma, este parámetro de sitio no se envía y, en su lugar, se pide al usuario que seleccione su sitio en la página de autorización de Datadog.

Asegúrate de probar las llamadas a la API Datadog que coincidan con la región del usuario. Por ejemplo, `https://trace.browser-intake-datadoghq.com` para EE.UU. y `https://public-trace-http-intake.logs.datadoghq.eu` para la UE.

Para ver una lista de destinos basados en el sitio Datadog, ve a la página de [tráfico de red][19] y utiliza el selector **SITIO DATADOG** a la derecha para cambiar de región.

### Confirmar el flujo de datos para todos los contextos

Asegúrate de que puedes enviar datos, extraer datos o editar datos para cada contexto que hayas solicitado.

### Publicar el cliente OAuth

#### Crear o actualizar tu solicitud de extracción
Para publicar un cliente OAuth, primero tienes que abrir una solicitud de extracción para tu integración en los repositorios de GitHub [`integrations-extras`][5] o [Marketplace][6], si aún no lo has hecho.

Como parte de tu solicitud de extracción, completa los siguientes pasos:

1. Actualiza tu archivo LÉEME, con una sección `## Uninstallation` en `## Setup`, que incluya las siguientes instrucciones (junto con cualquier instrucción personalizada que quieras añadir):

   - Cuando se desinstala esta integración, se revocan todas las autorizaciones anteriores. 
   - Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado, buscando el nombre de la integración en la [página de claves de API][10].

2. Actualiza tu archivo `manifest.json` para hacer referencia a esta nueva sección `## Uninstallation`. Esta referencia debe aparecer directamente debajo del campo de asistencia:

   ```
   "support": "README.md#Support",
   "uninstallation": "README.md#Uninstallation",
   ```

#### Iniciar el proceso de publicación en la plataforma para desarrolladores

Para iniciar el proceso de publicación en la [plataforma de desarrolladores][4]:

1. Ve a la pestaña **Publishing** (Publicación) en **General** y haz clic en **Next: Send App Details to Datadog** (Siguiente: Enviar detalles de la aplicación a Datadog). En la parte superior de esta pestaña, recibirás tu ID y tu secreto de cliente publicados. Tu implementación de OAuth necesita ser actualizada para incluir estas credenciales de cliente. **Nota:** Guarda tu ID y tu secreto de cliente en un lugar seguro. Esta información no se volverá a mostrar.

2. En la sección Integración de la publicación, sigue los pasos para añadir la información del cliente OAuth a tu solicitud pull. Esto incluye actualizar el archivo `manifest.json` y añadir un archivo al directorio `assets`.

3. Añade un enlace al directorio de GitHub o a la solicitud pull en el campo correspondiente.
4. Haz clic en **Finish & Send** (Finalizar y enviar).

Una vez que un cliente OAuth se envía para su publicación, el equipo recibe una notificación. Cuando tu solicitud de extracción es aprobada por todas las partes necesarias y está lista para ser combinada, también se publica tu cliente OAuth. Luego, tu cuadro de integración se publica en tu cuenta sandbox (no para todos los clientes) y tu cliente OAuth puede recibir autorizaciones de cualquier organización Datadog (no sólo tu organización sandbox).

En este punto, Datadog recomienda realizar tests finales de tu cliente OAuth para asegurarte de que la autorización funciona sin problemas.

#### Realizar cambios después de enviar el cliente para su publicación

No puedes editar un cliente OAuth publicado directamente, así que sólo recorre el flujo de publicación cuando todo haya sido probado y esté listo para funcionar. Para realizar actualizaciones en el cliente OAuth después de ser enviado para su publicación, tienes que volver a pasar por el flujo de publicación y volver a enviarlo. **Las credenciales del cliente publicado no aparecerán de nuevo**.

Para obtener más información sobre cómo publicar tu cuadro de integración y crear tu solicitud de extracción, consulta la [documentación del Marketplace y de las integraciones][7].

## Solucionar problemas

### La lista de los contextos de API no incluye el envío de métricas, eventos y logs

Para enviar datos a Datadog, utiliza el contexto `api_keys_write` al generar una clave de API en nombre del usuario. Para obtener más información, consulta [Crear una clave de API](#create-an-api-key).


### ID de cliente no válido

Error
: `invalid_request - Invalid client_id parameter value`

Hasta que se publique un cliente OAuth, sólo se puede autorizar al cliente desde la cuenta en la que este se creó (la cuenta sandbox del socio). Este error se produce si intentas autorizar al cliente fuera de esa cuenta antes de que se publique el cliente.

Si ya publicaste tu cliente OAuth, recuerda utilizar el ID de cliente y el secreto de cliente que recibiste al enviarlo. El secreto de cliente solo se mostró una vez, así que si lo perdiste, ponte en contacto con [ecosystems@datadog.com][11] para obtener ayuda.

### Errores de prohibición

Error
: `{"errors":["Forbidden"]}`

Este error puede estar relacionado con una clave de la aplicación o con un problema con las credenciales de autenticación de la API.

#### Uso de claves de aplicación

Los clientes OAuth utilizan un `access_token` para la autenticación. Utiliza `access_token` para realizar llamadas a los endpoints de la API Datadog enviándola como parte de la cabecera de autorización de tu solicitud:

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

Para obtener más información, consulta [Implementar el protocolo OAuth][17].

### Solicitudes API

Si recibes un error prohibido al intentar realizar una llamada de API a un endpoint específico y ya habilitaste el contexto correcto de ese endpoint, es posible que tu clave de API, sesión o token OAuth no sean válidos o hayan caducado.

#### Caducidad de la clave de API y del token

Los tokens de actualización no caducan a menos que el usuario revoque la autorización o el socio revoque el token. Si el socio revoca el token, el usuario debe volver a autorizar la integración para generar nuevos tokens de actualización y acceso. Para obtener más información, consulta la [referencia de los endpoints de autorización OAuth2][13].

#### Recuperación de claves de API en la cuenta sandbox de tus socios

Después de crear una clave utilizando el endpoint [api_keys/marketplace][14], la clave se devuelve en la respuesta. La clave no puede volver a generarse ni visualizarse. Asegúrate de almacenar la clave de forma segura para la transmisión continua de datos. Si pierdes tu clave de API, sigue estos pasos para revocarla y volver a crearla:

1. Ve a la página [Gestión de claves de API Datadog][15].
1. Busca la clave de API denominada `OAuth Client API Key` y selecciónala.
1. Haz clic en **Revoke** (Revocar) para desactivar la clave de API.
1. Sigue los pasos de [Crear una clave API](#create-an-api-key) para crear una nueva clave.
1. Vuelve a instalar la integración y repite el flujo de OAuth.


### El nombre de host/IP no coincide con los nombres alternativos del certificado

Error
: `Hostname/IP does not match certificate's altnames`

Cuando te conectes a la API Datadog, no incluyas el subdominio en la llamada de API. Por ejemplo, utiliza `datadoghq.eu` en lugar de `bigcorp.datadoghq.eu`.

### URI de redirección no coincidente

Error
: `invalid_request - Mismatching redirect URI`

Este error suele deberse a diferencias de configuración entre el cliente de tests y el cliente publicado. Comprueba lo siguiente:
- Que estás utilizando el `client_id` correcto durante la autorización. Por ejemplo, podrías estar utilizando el `client_id` de tu cliente de tests en lugar del client_id de tu cliente publicado.
- Que estás utilizando el URI de redirección correcto. Por ejemplo, si tu cliente está publicado, el URI de redirección debe coincidir con aquel configurado para la producción y no con el URI que utilizaste para los tests.
- Estás utilizando el cliente correcto. Utiliza tu cliente de tests hasta que la integración se publique en tu cuenta sandbox.

### Aplicaciones con subdominios

Datadog no admite aplicaciones con varios inquilinos en las que los clientes autorizan el uso de subdominios individuales. La autorización sólo se admite a través de un único dominio.

### OAuth con PKCE

Error
: `Invalid code or code verifier`

En caso de problemas con el flujo PKCE OAuth, asegúrate de que la cabecera `content-type` está correctamente configurada como `application/json` o `application/x-www-form-urlencoded`.

### Regeneración de secretos de cliente y rotación de secretos

Si se filtró tu secreto y necesitas rotarlo, ponte en contacto con [ecosystems@datadog.com][11]. Sólo puede haber un secreto activo a la vez. Después de regenerar tu secreto, el secreto existente se elimina. No es necesario volver a autorizar la integración.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: /es/developers/integrations/marketplace_offering/#list-an-offering
[8]: /es/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: mailto:ecosystems@datadog.com
[12]: /es/api/latest/using-the-api/
[13]: /es/developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /es/developers/authorization/oauth2_endpoints/#post-apiv2api_keysmarketplace
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /es/developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[18]: /es/developers/integrations/
[19]: /es/agent/configuration/network/
[20]: /es/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints