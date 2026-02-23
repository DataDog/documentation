---
title: Generar una clave de API
---

Cloudcraft ofrece una [API para desarrolladores][1] que proporciona un acceso mediante programación y una presentación remota de tus diagramas de arquitectura. La API también proporciona una visualización totalmente automatizada de las cuentas de AWS y de Azure que están vinculadas con tu cuenta de Cloudcraft, ya sea como imágenes predefinidas o como datos JSON.

La autenticación es necesaria para utilizar esta API. Esta guía describe cómo crear una clave de API mediante la interfaz web.

<div class="alert alert-info">La posibilidad de utilizar la API para desarrolladores de Cloudcraft sólo está disponible para los suscriptores Pro. Para obtener más información sobre los planes de suscripción, consulta la <a href="https://www.cloudcraft.co/pricing">página de precios de Cloudcraft</a>.</div>

## Requisitos previos

Esta guía asume que tienes:

- Un usuario de Cloudcraft con un rol de [propietario o administrador][2].
- Una [suscripción Cloudcraft Pro][3] activa.

## Crear una clave de API

Para crear una clave de API para la automatización, ve a **User** > **API keys** (Usuario > Claves de API) y haz clic en **Create API key** (Crear clave de API).

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="Captura de pantalla de la interfaz de usuario de Cloudcraft para la gestión de claves de API, donde se resalta el botón 'Create API key' (Crear clave de API)." responsive="true" style="width:75%;">}}

Ponle un nombre a la clave para describir su objetivo, por ejemplo, 'Clave de Automatización', y asigna los permisos apropiados. Selecciona el permiso que mejor se adapte a esta clave, pero intenta seguir el [principio del menor privilegio][4]. El mismo principio se aplica a la hora de darles acceso a los equipos a esta clave.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="Captura de pantalla de la interfaz para la creación de claves de API, con campos para nombrar y definir permisos." responsive="true" style="width:100%;">}}

Cuando hayas terminado, haz clic en **Save key** (Guardar clave) para crear una nueva clave de API. Asegúrate de anotar la clave en una localización segura para poder utilizarla más tarde.

Si tienes alguna pregunta o problema al crear una clave de API, [ponte en contacto con el equipo de asistencia de Cloudcraft a través de la baliza en la aplicación][5].

[1]: /es/cloudcraft/api/
[2]: /es/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[5]: https://app.cloudcraft.co/support