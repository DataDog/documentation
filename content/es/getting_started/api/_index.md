---
aliases:
- /es/developers/faq/using-postman-with-datadog-apis
- /es/getting_started/using-postman-with-datadog-apis
- /es/developers/guide/using-postman-with-datadog-apis
title: Utilización de Postman con las API de Datadog
---

## Información general

La API de Datadog permite obtener datos dentro y fuera de Datadog. Utiliza URL orientadas a recursos y códigos de estado para indicar el éxito o el fracaso de las solicitudes, y luego devuelve JSON de todas las solicitudes.

Este artículo explica cómo utilizar [Postman][1] para realizar llamadas de API a Datadog mostrando las acciones disponibles dentro de la API de Datadog, y proporcionando una introducción de alto nivel al uso de Postman para `GET`, `POST`, `PUT`, y `DELETE`.

## Requisitos previos

Ahora tienes:

- Una implementación activa de Datadog.
- Acceso a tu Datadog [claves API y de aplicación][2].
- Conocimientos básicos de la estructura de la API y del formato JSON.
- Una [cuenta Postman gratuita][3].

## Configuración

### Importa la colección Datadog a Postman

Empieza [iniciando sesión en Postman][4]. Datadog recomienda [descargar la aplicación Postman][5].

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"
data-postman-param="env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6ImFwcGxpY2F0aW9uX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoxfV0="></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

</br>Esta colección funciona en Postman para la web o en tu aplicación Postman. Puede tardar varios segundos en cargarse.

**Nota**: Configura el entorno de autenticación de la colección Postman de Datadog con tu API y tu clave de aplicación.

### Configuración del entorno Postman

Una vez importada la colección Postman, en el panel izquierdo de Postman se estructura por carpetas una completa lista de las llamadas a la API de Datadog disponibles.

#### Autenticación

La colección incluye un [entorno Postman][6] llamado `Autenticación Datadog` donde puedes añadir tu API de Datadog y claves de aplicación para la autenticación.

{{< img src="getting_started/postman/authentication-blurred.png" alt="Datadog Authentication collection with API and Application Key fields completed" (Colección de autenticaciones de Datadog con los campos de API y clave de aplicación completos) style="width:100%;">}}

Sigue estos pasos para configurar tu entorno:

1. Haz clic en el menú desplegable **Environments (Entornos)** situado en la esquina superior derecha de Postman. Si actualmente no tienes seleccionado un entorno, el menú desplegable **Entornos** dice `No Environment`.

2. Selecciona **Datadog Authentication (Autenticación de Datadog)**.

3. Edita el entorno **Datadog Authentication** entorno para añadir tu [clave API][2] de Datadog como valor inicial y valor actual para la variable `api_key`, y añade tu [clave de aplicación][2] de Datadog como valor inicial y valor actual para la variable `application_key`.

4. Haz clic en **Save** (Guardar).

#### Cambia el endpoint de la API

Si accedes a un sitio Datadog distinto de `https://api.datadoghq.com`, deberás cambiar la colección Postman para acceder a una URL de endpoint diferente.

Sigue estos pasos para actualizar la instancia a tu sitio seleccionado ({{< region-param key="dd_site_name" >}}):

1. En la carpeta Datadog API Collection (Colección API Datadog) del panel izquierdo, haz clic en el menú de tres puntos y selecciona **Edit (Editar)**.

    {{< img src="getting_started/postman/view-more-actions.png" alt="View more actions" (Ver más acciones)>}}

2. En la pestaña **Variables**, deselecciona la variable `site` con el valor `datadoghq.com` y selecciona `site` con el valor {{< region-param key="dd_site" code="true" >}}.

3. Haz clic en **Update (Actualizar)**.

## Trabajar con la colección

Una vez completada la configuración, estás listo para empezar a hacer llamadas a la API. En la carpeta Postman --> Datadog, hay subcarpetas para cada tipo de categoría de API mencionada en la [Referencia de la API de Datadog][7]. Expande las subcarpetas para ver los métodos HTTP y los nombres de las llamadas a la API.

### Constructor

Al hacer clic en una llamada a la API de la colección, esta se carga en el panel `Builder` de la derecha. En este panel puede enviar la llamada a la API y ver el estado devuelto, el tiempo de respuesta y el código de respuesta de la API.

{{< img src="getting_started/postman/apiGetCalls.png" alt="postman_api_response" style="width:70%;">}}

### Descripción

Al hacer clic en el nombre del endpoint, se muestra una descripción del endpoint y todos los parámetros necesarios/opcional para ayudarte a crear tus solicitudes:

{{< img src="getting_started/postman/description.mp4" alt="Postman description" video="true" >}}

### Parámetros

La pestaña **Params** muestra todos los parámetros y valores que están en la llamada a la API. Aquí puedes añadir parámetros y valores. Consulta los argumentos disponibles en la sección correspondiente de la [Documentación de la API de Datadog][8].

{{< img src="getting_started/postman/parameters.png" alt="postman_param" style="width:70%;">}}

Este pestaña es una alternativa a la visualización de la estructura `param1:value1&param2:value2` de la llamada a la API.

**Notas**:

- El signo (&) y los dos puntos (:) no son necesarios en la tabla Params. Postman los inserta por ti.
- Todos los parámetros siguen el formato: `<PLACEHOLDER>`. Deben reemplazarse antes de ejecutar una consulta.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/sending-requests/environments/managing-environments/
[7]: /es/api/latest/#api-reference
[8]: /es/api/