---
algolia:
  tags:
  - clave de API
aliases:
- /es/account_management/faq/how-do-i-reset-my-application-keys/
- /es/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /es/account_management/faq/api-app-key-management/
title: Claves de API y aplicación
---

## Claves de API

Las claves de API son exclusivas de tu organización. El Datadog Agent requiere una [clave de API][1] para enviar métricas y eventos a Datadog.

## Claves de aplicación

Las [claves de aplicación][2], junto con la clave de API de tu organización, permiten a los usuarios acceder a la API programática de Datadog. Las claves de aplicación están asociadas a la cuenta de usuario que las creó y, por defecto, tienen los permisos del usuario que las creó.

### Contextos

Para proteger mejor tus aplicaciones, puedes indicar contextos de autorización para tus claves de aplicación. De este modo, podrás definir permisos más específicos y minimizar el acceso que las aplicaciones tienen a tus datos de Datadog. Esto te da un control pormenorizado sobre tus aplicaciones y minimiza las vulnerabilidades de seguridad al limitar el acceso externo. Por ejemplo, una aplicación que solo lee dashboards no necesita derechos de administrador para gestionar usuarios ni eliminar los datos de tu organización.

La forma recomendada de determinar el contexto de las claves de aplicación es otorgar los mínimos privilegios y permisos necesarios para que una aplicación funcione según lo previsto. A las claves de aplicación con contexto solo se les conceden los contextos indicados por el usuario y ningún otro permiso. Aunque puedes modificar los contextos de autorización de tus claves de aplicación en cualquier momento, deberás valorar cómo esos cambios podrían afectar a la funcionalidad o al acceso de tu aplicación.

**Notas:**

- Los usuarios o cuentas de servicio con [permisos][4] para crear o editar claves de aplicación pueden definir el contexto de las claves de aplicación. Los usuarios deben tener el permiso `user_app_keys` para definir el contexto de sus propias claves de aplicación, o el permiso `org_app_keys_write` para definir el contexto de las claves de aplicación que pertenezcan a cualquier usuario de su organización. Los usuarios deben tener el permiso `service_account_write` para definir el contexto de las claves de aplicación en el caso de las cuentas de servicio.
- Los propietarios de aplicaciones no pueden autorizar una aplicación si les faltan los permisos necesarios, ni siquiera si definen el contexto de una clave de aplicación con contextos de autorización de otra persona.
- Los errores debido a la falta de permisos al escribir claves de aplicación o autorizar aplicaciones mostrarán el código `403 Forbidden`. Encontrarás más información sobre las distintas respuestas de error en la documentación acerca de la [API de Datadog][5].
- Si el rol o los permisos de algún usuario cambian, los contextos de autorización indicados para sus claves de aplicación seguirán iguales.

## Tokens de cliente

Por razones de seguridad, las claves de API no pueden utilizarse para enviar datos desde un navegador, un móvil o una aplicación de TV, ya que quedarían expuestas al cliente. En su lugar, las aplicaciones destinadas al usuario final utilizan tokens de cliente para enviar datos a Datadog.

 Varios tipos de clientes envían datos que requieren un token de cliente, como los siguientes ejemplos:
- Los recopiladores de logs de [navegador web][6], [Android][7], [iOS][8], [React Native][9], [Flutter][10] y [Roku][11] envían logs.
- Las aplicaciones de [Real User Monitoring][12] envían eventos y logs.

Los tokens de cliente son exclusivos de tu organización. Para gestionarlos, accede a **Organization Settings** (Parámetros de organización) y haz clic en la pestaña **Client Tokens** (Tokens de cliente).

**Nota**: Cuando se desactiva un usuario que ha creado un token de cliente, ese token de cliente permanece activo.

## Añadir una clave de API o token de cliente

Para añadir una clave de API o token de cliente de Datadog:

1. Ve a Parámetros de organización y haz clic en la pestaña [**API keys**][1] (Claves de API) o [**Client Tokens**][13] (Tokens de cliente).
2. Haz clic en el botón **New Key** (Nueva clave) o **New Client Token** (Nuevo token de cliente), según lo que vayas a crear.
3. Indica un nombre para tu clave o token.
4. Haz clic en **Create API key** (Crear clave de API) o **Create Client Token** (Crear token de cliente).

{{< img src="account_management/api-key.png" alt="Navega a la página de claves de API para tu organización en Datadog" style="width:80%;" >}}

**Notas:**

- Tu organización debe tener al menos una clave de API y un máximo de 50.
- Los nombres de las claves deben ser únicos en toda tu organización.

## Eliminar claves de API o tokens de cliente

Para eliminar una clave de API o token de cliente de Datadog, accede a la lista de claves o tokens y haz clic en el icono de la **papelera** con **Revoke** (Revocar) junto a la clave o token que quieras eliminar.

## Añadir claves de aplicación

Para añadir una clave de aplicación de Datadog, ve a  [**Organization Settings** > **Application Keys**][2] (Parámetros de organización > Claves de aplicación). Si tienes [permiso][4] para crear claves de aplicación, haz clic en **New Key** (Nueva clave).

{{< img src="account_management/app-key.png" alt="Navega a la página de Claves de aplicación para tu organización en Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov" >}}
<div class="alert alert-warning">Asegúrate de almacenar de forma segura tu clave de aplicación inmediatamente después de la creación, ya que el secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

**Notas:**

- Los nombres de las claves de aplicación no pueden quedar en blanco.

## Eliminar claves de aplicación

Para eliminar una clave de aplicación de Datadog, accede a [**Organization Settings** (Parámetros de organización) > **Application Keys** (Claves de aplicación)][2]. Si tienes [permiso][4] para crear y gestionar claves de aplicación, podrás ver tus claves y hacer clic en **Revoke** (Revocar) junto a la que quieras revocar. Si tienes permiso para gestionar todas las claves de aplicaciones de tu organización, podrás buscar la que quieres revocar y hacer clic en **Revoke** junto a ella.

## Retraso en la propagación de claves y coherencia final

Las claves de API y de aplicación de Datadog siguen un modelo de coherencia eventual. Debido a la naturaleza distribuida de los sistemas de Datadog, las actualizaciones de las claves, como la creación y la revocación, pueden tardar unos segundos en propagarse por completo.

Como resultado:

- No utilices nuevas claves de API o de aplicación inmediatamente en flujos de trabajo críticos. Deja un breve tiempo (unos segundos) para la propagación. Puedes implementar una estrategia de reintento con un backoff exponencial corto para manejar errores transitorios durante el intervalo de propagación.
- Para validar si una clave de API está activa y utilizable, llama al endpoint [/api/v1/validate][18].
- Para verificar que una clave de aplicación está activa, utiliza el endpoint `/api/v2/validate_keys` con el par de claves adecuado.

Intentar utilizar una clave recién creada antes de que se haya propagado completamente puede provocar errores de autenticación temporales como 403 Forbidden o 401 Unauthorized.

## Definir el contexto de claves de aplicación

Para especificar contextos de autorización para claves de aplicación, [haz una solicitud a la API de Datadog][5] o a la interfaz de usuario para crear o editar una clave de aplicación. Los contextos pueden especificarse para claves de aplicación propiedad del [usuario actual][14] o de una [cuenta de servicio][15]. Si no se especifica este campo, las claves de aplicación tendrán por defecto los mismos contextos y permisos que el usuario que las creó.

**Notas:**

- Los nombres de los contextos distinguen entre mayúsculas y minúsculas.

## Usar varias claves de API

Valora la posibilidad de configurar varias claves de API para tu organización. Por ejemplo, usa distintas claves de API para cada uno de tus métodos de implementación: una para implementar un Agent en Kubernetes, en AWS; otra para hacerlo localmente con Chef; otra para scripts de Terraform que automaticen tus dashboards o monitores, y otra para desarrolladores que hagan implementaciones en local.

El uso de varias claves de API te permite rotar las claves como parte de tus protocolos de seguridad, o revocar una clave en concreto si se expone inadvertidamente o si quieres dejar de usar el servicio al que está asociada.

Si tu organización necesita más del límite incorporado de 50 claves de API, ponte en contacto con [Soporte][16] para solicitar información sobre cómo aumentar tu límite.

## Desactivar una cuenta de usuario

Cuando la cuenta de un usuario está desactivada, se revocan todas las claves de aplicación que haya creado ese usuario. No obstante, las claves de API creadas por la cuenta desactivada no se eliminarán y seguirán siendo válidas.

## Transferir claves

Por motivos de seguridad, Datadog no transfiere claves de aplicaciones de un usuario a otro. Si necesitas compartir una clave de aplicación, utiliza una [cuenta de servicio][17].

## Qué hacer si una clave de API o aplicación se ve expuesta

Si alguna clave privada está en riesgo o se ha filtrado públicamente, se deben tomar medidas lo antes posible para garantizar la seguridad de la cuenta. Eliminar el archivo que contiene la clave de un sitio público como GitHub **no** garantiza que otras personas no hayan accedido ya a él.

Sigue estos pasos para proteger tu cuenta:

**Nota:** Revocar una clave activa puede afectar a tus servicios. Si el contexto de uso es amplio o indeterminado, plantéate seguir los pasos del 2 al 5 **antes** de revocar la clave afectada.

1. Revoca la clave afectada.
2. Elimina el código que contiene la clave privada de cualquier archivo con acceso público:
    - Publica el archivo saneado en tu repositorio público.
    - Elimina los datos confidenciales de tu historial de confirmaciones.
3. Crea una clave nueva.
4. Actualiza los servicios afectados con la nueva clave.
5. Revisa la cuenta para comprobar si ha habido algún acceso no autorizado:
    - Usuarios añadidos recientemente
    - Nuevos recursos
    - Cambios en permisos o roles

Si se detecta alguna actividad inusual o si necesitas más información sobre cómo proteger tu cuenta, ponte en contacto con el [soporte de Datadog][16].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][16].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[4]: /es/account_management/rbac/permissions
[5]: /es/api/latest/key-management/
[6]: /es/logs/log_collection/javascript/
[7]: /es/logs/log_collection/android/
[8]: /es/logs/log_collection/ios/
[9]: /es/logs/log_collection/reactnative/
[10]: /es/logs/log_collection/flutter/
[11]: /es/logs/log_collection/roku/
[12]: /es/real_user_monitoring/
[13]: https://app.datadoghq.com/organization-settings/client-tokens
[14]: /es/api/latest/key-management/#create-an-application-key-for-current-user
[15]: /es/api/latest/service-accounts/
[16]: /es/help/
[17]: /es/account_management/org_settings/service_accounts/
[18]: /es/api/latest/authentication/#validate-api-key