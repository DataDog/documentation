---
algolia:
  tags:
  - clave de API
aliases:
- /es/account_management/faq/how-do-i-reset-my-application-keys/
- /es/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /es/account_management/faq/api-app-key-management/
description: Gestiona claves de API, claves de aplicación y tokens de cliente para
  aplicaciones de navegador con funciones de seguridad.
title: Claves de API y aplicación
---

## Claves de API

Las claves de API son exclusivas de tu organización. El Datadog Agent requiere una [clave de API][1] para enviar métricas y eventos a Datadog.

## Claves de aplicación

Las [claves de aplicación][2], junto con la clave de API de tu organización, permiten a los usuarios acceder a la API programática de Datadog. Las claves de aplicación están asociadas a la cuenta de usuario que las creó y, por defecto, tienen los permisos del usuario que las creó.

### Modo de lectura única

El modo de lectura única (OTR) es una función de seguridad que limita la visibilidad de los secretos de las claves de aplicación únicamente al momento de la creación. Cuando el modo OTR está activado, los secretos de las claves de aplicación solo se muestran una vez durante la creación y no se pueden recuperar posteriormente por motivos de seguridad.

#### Para las nuevas organizaciones

Todas las claves de aplicación para nuevas organizaciones matrices (y sus organizaciones secundarias) creadas después del 20 de agosto de 2025 tienen el modo de OTR activado en forma predeterminada. Esta configuración es permanente y no puede modificarse.

#### Para las organizaciones existentes

Los administradores de la organización pueden activar o desactivar el modo de OTR desde [**Organization Settings** > **Application Keys** (Configuración de la organización > Claves de aplicación)][2]. Después de activar el modo de OTR:

- Los secretos de las claves de aplicación solo son visibles una vez, en el momento de su creación
- Ya no se pueden recuperar a través de la interfaz de usuario ni la API.
- Los administradores de la organización pueden activar o desactivar la configuración durante 3 meses después de activarla.
- Transcurridos 3 meses de activación continua, el modo de OTR se convierte en permanente y se suprime la alternancia.

**Permisos**: Los usuarios deben tener los permisos `org_app_keys_write` y `org_management` para activar o desactivar el modo de OTR para su organización.

### Contextos


Para proteger mejor tus aplicaciones, puedes indicar contextos de autorización para tus claves de aplicación. De este modo, podrás definir permisos más específicos y minimizar el acceso que las aplicaciones tienen a tus datos de Datadog. Esto te da un control pormenorizado sobre tus aplicaciones y minimiza las vulnerabilidades de seguridad al limitar el acceso externo. Por ejemplo, una aplicación que solo lee dashboards no necesita derechos de administrador para gestionar usuarios ni eliminar los datos de tu organización.

La forma recomendada de determinar el contexto de las claves de aplicación es otorgar los mínimos privilegios y permisos necesarios para que una aplicación funcione según lo previsto. A las claves de aplicación con contexto solo se les conceden los contextos indicados por el usuario y ningún otro permiso. Aunque puedes modificar los contextos de autorización de tus claves de aplicación en cualquier momento, deberás valorar cómo esos cambios podrían afectar a la funcionalidad o al acceso de tu aplicación.

**Notas:**

- Los usuarios o cuentas de servicio con [permisos][3] para crear o editar claves de aplicación pueden abarcar claves de aplicación. Un usuario debe tener el permiso `user_app_keys` para abarcar sus propias claves de aplicación o el permiso `org_app_keys_write` para abarcar claves de aplicación propiedad de cualquier usuario de su organización. Un usuario debe tener el permiso `service_account_write` para abarcar claves de aplicación para cuentas de servicio.
- Los propietarios de aplicaciones no pueden autorizar una aplicación si les faltan los permisos necesarios, ni siquiera si definen el contexto de una clave de aplicación con contextos de autorización de otra persona.
- Los errores debidos a la falta de permisos al escribir claves de aplicación o autorizar aplicaciones muestran un error `403 Forbidden`. Encontrará más información sobre las distintas respuestas de error en la documentación de [API de Datadog][4].
- Si el rol o los permisos de algún usuario cambian, los contextos de autorización indicados para sus claves de aplicación seguirán iguales.

### Acceso a API de acciones

Las API de acciones incluyen:
- [App Builder][5]
- [Conexiones de acciones][6]
- [Workflow Automation (automatización de procesos)][7]

Para utilizar claves de aplicación con estas API, debes activar el acceso a API de acciones en la clave de aplicación. Esto puede hacerse [a través de la interfaz de usuario][2] o [API][21]. En forma predeterminada, las claves de aplicación no se pueden utilizar con estas API.

{{< img src="account_management/click-enable-actions-api-access.png" alt="Activar con un clic el acceso a la API de acciones" style="width:80%;" >}}

## Tokens de cliente

Por razones de seguridad, las claves de API no pueden utilizarse para enviar datos desde un navegador, un móvil o una aplicación de TV, ya que quedarían expuestas al cliente. En su lugar, las aplicaciones destinadas al usuario final utilizan tokens de cliente para enviar datos a Datadog.

 Varios tipos de clientes envían datos que requieren un token de cliente, como los siguientes ejemplos:
- Los recopiladores de logs para [navegador web][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] y [Roku][13] envían logs.
- Las aplicaciones [Real User Monitoring][14] envían eventos y logs.

Los tokens de cliente son exclusivos de tu organización. Para gestionarlos, accede a **Organization Settings** (Parámetros de organización) y haz clic en la pestaña **Client Tokens** (Tokens de cliente).

**Nota**: Cuando se desactiva un usuario que ha creado un token de cliente, ese token de cliente permanece activo.

## Añadir una clave de API o token de cliente

Para añadir una clave de API o token de cliente de Datadog:

1. Va a Configuración de la organización y, a continuación, haz clic en la pestaña [**API keys** (Claves de API)][1] o [**Client Tokens** (Tokens de cliente)][15].
2. Haz clic en el botón **New Key** (Nueva clave) o **New Client Token** (Nuevo token de cliente), según lo que vayas a crear.
3. Indica un nombre para tu clave o token.
4. Haz clic en **Create API key** (Crear clave de API) o **Create Client Token** (Crear token de cliente).

{{< img src="account_management/api-key.png" alt="Navega a la página de claves de API para tu organización en Datadog" style="width:80%;" >}}

**Notas:**

- Tu organización debe tener al menos una clave de API y un máximo de 50.
- Los nombres de las claves deben ser únicos en toda tu organización.

## Eliminar claves de API o tokens de cliente

Para eliminar una clave de API o un token de cliente de Datadog, ve a la lista de claves o tokens y haz clic en el icono **Delete** (Eliminar)  {{< img src="icons/delete.png" inline="true" style="width:14px;">}} situado junto a la clave o token que desees eliminar.

## Añadir claves de aplicación

Para añadir una clave de aplicación de Datadog, ve a [**Organization Settings** > **Application Keys** (Configuración de la organización > Claves de aplicación)][2]. Si tienes el [permiso][3] para crear claves de aplicación, haz clic en **New Key** (Nueva clave).

{{< img src="account_management/app-key.png" alt="Navega a la página de Claves de aplicación para tu organización en Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov" >}}
<div class="alert alert-danger">Asegúrate de almacenar de forma segura tu clave de aplicación inmediatamente después de la creación, ya que el secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

<div class="alert alert-info">Si tu organización tiene activado el modo de lectura única (OTR), asegúrate de almacenar de forma segura tu clave de aplicación inmediatamente después de la creación, ya que el secreto de la clave no se puede recuperar más tarde.</div>

**Notas:**

- Los nombres de las claves de aplicación no pueden quedar en blanco.

## Eliminar claves de aplicación

Para eliminar una clave de aplicación de Datadog, ve a [**Organization Settings** > **Application Keys** (Configuración de la organización > Claves de aplicación)][2]. Si tienes el [permiso][3] para crear y gestionar claves de aplicación, puedes ver tus propias claves y hacer clic en **Revoke** (Revocar) junto a la clave que deseas revocar. Si tienes el permiso para gestionar todas las claves de aplicación de la organización, puedes buscar la clave que deseas revocar y hacer clic en **Revoke** (Revocar) junto a ella.

## Retraso en la propagación de claves y coherencia final

Las claves de API y de aplicación de Datadog siguen un modelo de coherencia eventual. Debido a la naturaleza distribuida de los sistemas de Datadog, las actualizaciones de las claves, como la creación y la revocación, pueden tardar unos segundos en propagarse por completo.

Como resultado:

- No utilices nuevas claves de API o de aplicación inmediatamente en flujos de trabajo críticos. Deja un breve tiempo (unos segundos) para la propagación. Puedes implementar una estrategia de reintento con un backoff exponencial corto para manejar errores transitorios durante el intervalo de propagación.
- Para validar si una clave de API está activa y utilizable, llama al endpoint [/api/v1/validate][16].
- Para verificar que una clave de aplicación está activa, utiliza el endpoint `/api/v2/validate_keys` con el par de claves adecuado.

Intentar utilizar una clave recién creada antes de que se haya propagado completamente puede provocar errores de autenticación temporales como 403 Forbidden o 401 Unauthorized.

## Definir el contexto de claves de aplicación

Para especificar ámbitos de autorización para claves de aplicación, [realiza una solicitud a la API de Datadog ][4] o a la interfaz de usuario para crear o editar una clave de aplicación. Se pueden especificar ámbitos para claves de aplicación propiedad del [usuario actual][17] o una [cuenta de servicio][18]. Si no se especifica este campo, las claves de aplicación tendrán en forma predeterminada los mismos ámbitos y permisos que el usuario que las creó.

**Notas:**

- Los nombres de los contextos distinguen entre mayúsculas y minúsculas.

## Usar varias claves de API

Valora la posibilidad de configurar varias claves de API para tu organización. Por ejemplo, usa distintas claves de API para cada uno de tus métodos de implementación: una para implementar un Agent en Kubernetes, en AWS; otra para hacerlo localmente con Chef; otra para scripts de Terraform que automaticen tus dashboards o monitores, y otra para desarrolladores que hagan implementaciones en local.

El uso de varias claves de API te permite rotar las claves como parte de tus protocolos de seguridad, o revocar una clave en concreto si se expone inadvertidamente o si quieres dejar de usar el servicio al que está asociada.

Si tu organización necesita más del límite incorporado de 50 claves de API, ponte en contacto con [Asistencia técnica][19] para solicitar información sobre cómo aumentar tu límite.

## Desactivar una cuenta de usuario

Cuando la cuenta de un usuario está desactivada, se revocan todas las claves de aplicación que haya creado ese usuario. No obstante, las claves de API creadas por la cuenta desactivada no se eliminarán y seguirán siendo válidas.

## Transferir claves

Por motivos de seguridad, Datadog no transfiere claves de aplicaciones de un usuario a otro. Si necesitas compartir una clave de aplicación, utiliza una [cuenta de servicio][20].

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

Si detectas alguna actividad inusual o necesitas más ayuda para proteger tu cuenta, ponte en contacto con [Asistencia técnica de Datadog][19].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][19].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /es/account_management/rbac/permissions
[4]: /es/api/latest/key-management/
[5]: /es/api/latest/app-builder/
[6]: /es/api/latest/action-connection/
[7]: /es/api/latest/workflow-automation/
[8]: /es/logs/log_collection/javascript/
[9]: /es/logs/log_collection/android/
[10]: /es/logs/log_collection/ios/
[11]: /es/logs/log_collection/reactnative/
[12]: /es/logs/log_collection/flutter/
[13]: /es/logs/log_collection/roku/
[14]: /es/real_user_monitoring/
[15]: https://app.datadoghq.com/organization-settings/client-tokens
[16]: /es/api/latest/authentication/#validate-api-key
[17]: /es/api/latest/key-management/#create-an-application-key-for-current-user
[18]: /es/api/latest/service-accounts/
[19]: /es/help/
[20]: /es/account_management/org_settings/service_accounts/
[21]: /es/api/latest/action-connection/#register-a-new-app-key