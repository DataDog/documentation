---
aliases:
- /es/developers/faq/using-postman-with-datadog-apis
- /es/getting_started/using-postman-with-datadog-apis
- /es/developers/guide/using-postman-with-datadog-apis
description: Aprende a utilizar Postman para realizar llamadas de API a Datadog para
  operaciones GET, POST, PUT y DELETE con configuración de autenticación.
title: Utilización de Postman con las API de Datadog
---

## Información general

La API de Datadog permite obtener datos dentro y fuera de Datadog. Utiliza URL orientadas a recursos y códigos de estado para indicar el éxito o el fracaso de las solicitudes y, luego, devuelve JSON de todas las solicitudes.

En este artículo, se explica cómo utilizar [Postman][1] para realizar llamadas de API a Datadog mostrando las acciones disponibles dentro de la API de Datadog y proporcionando una introducción muy clara sobre cómo se usa Postman con `GET`, `POST`, `PUT` y `DELETE`.

## Requisitos previos

Ahora tienes:

- Una implementación activa de Datadog.
- Acceso a tus [claves de API y de aplicación][2] de Datadog.
- Conocimientos básicos de la estructura de la API y del formato JSON.
- Una [cuenta Postman gratuita][3].

## Configuración

### Importar la colección de Datadog en Postman

Empieza [iniciando sesión en Postman][4]. Datadog recomienda [descargar la aplicación Postman][5].

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"></div>
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

**Nota**: Configura las **variables de colección** de la colección de API de Datadog con tus valores de API y clave de aplicación.

### Configuración de la colección de Postman

Una vez importada la colección de Postman, en el panel izquierdo de Postman se estructuran por carpetas todas las llamadas a la API de Datadog disponibles.

#### Autenticación

Añade tu API de Datadog y claves de aplicación a las [variables de colección][6] para la autenticación.

Sigue estos pasos para configurar tu entorno:

1. Selecciona la colección de API de Datadog.

2. Haz clic en la pestaña **Variables**.

3. Añade tus valores válidos de API de Datadog y clave de aplicación al campo **Current value** (Valor actual) de las variables `api_key` y `application_key`, respectivamente.

4. Haz clic en **Save** (Guardar).

{{< img src="getting_started/postman/collection_variables.png" alt="La colección de API de Datadog API con las variables de colección api_key y application_key configuradas" style="width:100%;">}}

#### Cambiar el endpoint de la API

Si accedes a un sitio de Datadog distinto de `https://api.datadoghq.com`, deberás cambiar la colección de Postman para acceder a una URL de endpoint diferente.

Sigue estos pasos para usar el sitio seleccionado en la instancia ({{< region-param key="dd_site_name" >}}):

1. En la carpeta Datadog API Collection (Colección de API de Datadog) del panel izquierdo, haz clic en el menú de tres puntos y selecciona **Edit** (Editar).

    {{< img src="getting_started/postman/view-more-actions.png" alt="Ver más acciones">}}

2. En la pestaña **Variables**, anula la selección de la variable `site` con el valor `datadoghq.com` y selecciona `site` con el valor {{< region-param key="dd_site" code="true" >}}.

3. Haz clic en **Update** (Actualizar).

## Trabajar con la colección

Una vez completada la configuración, ya puedes empezar a hacer llamadas a la API. En la carpeta Postman --> Datadog, hay subcarpetas para cada tipo de categoría de API del artículo [Referencia a la API de Datadog][7]. Expande las subcarpetas para ver los métodos HTTP y los nombres de las llamadas a la API.

### Generador

Al hacer clic en una llamada a la API de la colección, esta se carga en el panel `Builder` (Generador) de la derecha. En este panel se puede enviar la llamada a la API y ver el estado devuelto, el tiempo de respuesta y el código de respuesta de la API.

{{< img src="getting_started/postman/apiGetCalls.png" alt="Respuesta de la API de Postman" style="width:70%;">}}

### Descripción

Al hacer clic en el nombre del endpoint, se muestra una descripción del endpoint y todos los parámetros necesarios y opcionales para ayudarte a crear tus solicitudes:

{{< img src="getting_started/postman/description.mp4" alt="Descripción de Postman" video="true" >}}

### Parámetros

La pestaña **Params** muestra todos los parámetros y valores de la llamada a la API. Aquí puedes añadir los parámetros y valores que quieras. Consulta los argumentos disponibles en la sección correspondiente de la [documentación de la API de Datadog][8].

{{< img src="getting_started/postman/parameters.png" alt="Parámetros de Postman" style="width:70%;">}}

Esta pestaña es una alternativa a la visualización de la estructura `param1:value1&param2:value2` de la llamada a la API.

**Notas**:

- El ampersand (&) y los dos puntos (:) no son necesarios en la tabla Params. Postman los inserta por ti.
- Todos los parámetros siguen el formato: `<PLACEHOLDER>`. Deben reemplazarse antes de ejecutar una consulta.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/sending-requests/variables/variables/#defining-collection-variables
[7]: /es/api/latest/#api-reference
[8]: /es/api/