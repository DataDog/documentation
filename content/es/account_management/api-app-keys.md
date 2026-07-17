---
algolia:
  tags:
  - api key
aliases:
- /es/account_management/faq/how-do-i-reset-my-application-keys/
- /es/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /es/account_management/faq/api-app-key-management/
description: Administra las claves de API, las claves de aplicación y los tokens de
  cliente para aplicaciones de navegador con características de seguridad.
title: Claves de API y de aplicación
---
## Claves de API {#api-keys}

Las claves de API son únicas para tu organización. Se requiere una [clave de API][1] por parte del Agente de Datadog para enviar métricas y eventos a Datadog.

## Claves de aplicación {#application-keys}

Las [claves de aplicación][2], junto con la clave de API de tu organización, otorgan a los usuarios acceso a la API programática de Datadog. Las claves de aplicación están asociadas con la cuenta de usuario que las creó y, por defecto, tienen los permisos del usuario que las creó.

### Modo de Lectura Única {#one-time-read-mode}

El modo de Lectura Única (OTR) es una característica de seguridad que limita la visibilidad de los secretos de la clave de aplicación solo al momento de creación. Cuando el modo OTR está habilitado, los secretos de la clave de aplicación solo se muestran una vez durante la creación y no se pueden recuperar más tarde por razones de seguridad.

#### Para nuevas organizaciones {#for-new-organizations}

Todas las claves de aplicación para nuevas organizaciones principales (y sus organizaciones secundarias) creadas después del 20 de agosto de 2025 tienen el modo OTR habilitado por defecto. Esta configuración es permanente y no se puede cambiar.

#### Para organizaciones existentes {#for-existing-organizations}

Los administradores de la organización pueden habilitar o deshabilitar el modo OTR desde [**Configuración de la Organización** > **Claves de Aplicación**][2]. Después de habilitar el modo OTR:

- Los secretos de la clave de aplicación son visibles solo una vez, en el momento de la creación
- Ya no se pueden recuperar a través de la interfaz de usuario o la API
- La configuración puede ser activada o desactivada por los administradores de la organización durante 3 meses después de habilitar
- Después de 3 meses de estar habilitado continuamente, el modo OTR se vuelve permanente y se elimina el interruptor

**Permisos**: Los usuarios deben tener tanto el `org_app_keys_write` como el `org_management` permisos para habilitar o deshabilitar el modo OTR para su organización.

### Contextos {#scopes}

Para proteger y asegurar mejor sus aplicaciones, puede especificar contextos de autorización para las claves de su aplicación para definir permisos más granulares y minimizar el acceso que las aplicaciones tienen a sus datos de Datadog. Esto le brinda un control de acceso detallado sobre sus aplicaciones y minimiza las vulnerabilidades de seguridad al limitar el acceso innecesario. Por ejemplo, una aplicación que solo lee tableros no necesita derechos de administrador para gestionar usuarios o eliminar cualquiera de los datos de su organización.

La práctica recomendada para configurar los contextos de las claves de aplicación es otorgar a sus claves solo los privilegios y permisos mínimos necesarios para que una aplicación funcione como se espera. Las claves de aplicación con contexto solo reciben los contextos especificados por el usuario, y ningún permiso adicional. Si bien puede modificar los contextos de autorización de sus claves de aplicación en cualquier momento, considere cómo esos cambios pueden afectar la funcionalidad o el acceso existente de su aplicación.

**Notas:**

- Los usuarios o cuentas de servicio con [permisos][3] para crear o editar claves de aplicación pueden establecer el contexto de las claves de aplicación. Un usuario debe tener el `user_app_keys` permiso para establecer el contexto de sus propias claves de aplicación, o el `org_app_keys_write` permiso para establecer el contexto de las claves de aplicación propiedad de cualquier usuario en su organización. Un usuario debe tener el `service_account_write` permiso para establecer el contexto de las claves de aplicación para cuentas de servicio.
- Los propietarios de aplicaciones no pueden autorizar una aplicación si les faltan permisos requeridos, incluso si establecen el contexto de una clave de aplicación con contextos de autorización que no tienen.
- Los errores debido a permisos faltantes al escribir claves de aplicación o autorizar aplicaciones muestran un `403 Forbidden` error. Más información sobre varias respuestas de error se puede encontrar en la documentación de la [API de Datadog][4].
- Si el rol o los permisos de un usuario cambian, los contextos de autorización especificados para sus claves de aplicación permanecen sin cambios.

### Acceso a la API de acciones {#actions-api-access}

Las API de acciones incluyen:
- [App Builder][5]
- [Actions Connections][6]
- [Workflow Automation][7]

Para utilizar claves de aplicación con estas API, debe habilitar el acceso a la API de Acciones en la clave de aplicación. Esto se puede hacer [a través de la interfaz de usuario][2] o [API][21]. Por defecto, las claves de aplicación no se pueden usar con estas API.

{{< img src="account_management/click-enable-actions-api-access.png" alt="Haga clic en Habilitar para el Acceso a la API de Acciones" style="width:80%;" >}}

**Nota**: La sección {{< ui >}}Last used{{< /ui >}} solo se muestra si [Audit Trail está habilitado][22] en la cuenta y usted tiene [`Audit Trail Read`][23] permiso.

## Tokens de cliente {#client-tokens}

Por razones de seguridad, las claves de API no se pueden usar para enviar datos desde un navegador, aplicación móvil o de TV, ya que estarían expuestas del lado del cliente. En su lugar, las aplicaciones orientadas al usuario final utilizan tokens de cliente para enviar datos a Datadog.

 Varios tipos de clientes envían datos que requieren un token de cliente, incluidos los siguientes ejemplos:
- Los recolectores de registros para [navegador web][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] y [Roku][13] envían registros.
- Las aplicaciones de [Real User Monitoring][14] envían eventos y registros.

Los tokens de cliente son únicos para su organización. Para gestionar sus tokens de cliente, vaya a {{< ui >}}Organization Settings{{< /ui >}}, luego haga clic en la pestaña {{< ui >}}Client Tokens{{< /ui >}}.

**Nota**: Cuando un usuario que creó un token de cliente es desactivado, el token de cliente permanece activo.

## Agregue una clave de API o token de cliente {#add-an-api-key-or-client-token}

Para agregar una clave de API de Datadog o un token de cliente:

1. Navegue a la configuración de la organización, luego haga clic en la pestaña [**Claves de API**][1] o [**Tokens de Cliente**][15].
2. Haga clic en el botón {{< ui >}}New Key{{< /ui >}} o {{< ui >}}New Client Token{{< /ui >}}, dependiendo de cuál esté creando.
3. Ingrese un nombre para su clave o token.
4. Haga clic en {{< ui >}}Create API key{{< /ui >}} o {{< ui >}}Create Client Token{{< /ui >}}.

{{< img src="account_management/api-key.png" alt="Navegue a la página de Claves de API para su organización en Datadog" style="width:80%;" >}}

**Notas:**

- Su organización debe tener al menos una clave de API y como máximo 50 claves de API.
- Los nombres de las claves deben ser únicos en su organización.

## Elimine claves de API o tokens de cliente {#remove-api-keys-or-client-tokens}

Para eliminar una clave de API o token de cliente de Datadog, navegue a la lista de claves o tokens y haga clic en el {{< ui >}}Delete{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icono junto a la clave o token que desea eliminar.

## Agregue claves de aplicación {#add-application-keys}

Para agregar una clave de aplicación de Datadog, navegue a [**Configuración de la Organización** > **Claves de Aplicación**][2]. Si tiene el [permiso][3] para crear claves de aplicación, haga clic en {{< ui >}}New Key{{< /ui >}}.

{{< img src="account_management/app-key.png" alt="Navegue a la página de Claves de Aplicación para su organización en Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Asegúrese de almacenar de forma segura su clave de aplicación inmediatamente después de la creación, ya que el secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

<div class="alert alert-info">Si su organización tiene habilitado el modo de Lectura Única (OTR), asegúrese de almacenar de forma segura su clave de aplicación inmediatamente después de la creación, ya que el secreto de la clave no se puede recuperar más tarde.</div>

**Notas:**

- Los nombres de las claves de aplicación no pueden estar en blanco.

## Elimine claves de aplicación {#remove-application-keys}

Para eliminar una clave de aplicación de Datadog, navegue a [**Configuración de la Organización** > **Claves de Aplicación**][2]. Si tiene el [permiso][3] para crear y gestionar claves de aplicación, puede ver sus propias claves y hacer clic en {{< ui >}}Revoke{{< /ui >}} junto a la clave que desea revocar. Si tiene el permiso para gestionar todas las claves de aplicación de la organización, puede buscar la clave que desea revocar y hacer clic en {{< ui >}}Revoke{{< /ui >}} junto a ella.

## Retraso en la propagación de claves y consistencia eventual {#key-propagation-delay-and-eventual-consistency}

Las claves de API y de aplicación de Datadog siguen un modelo de consistencia eventual. Debido a la naturaleza distribuida de los sistemas de Datadog, las actualizaciones a las claves, como la creación y revocación, pueden tardar unos segundos en propagarse completamente.

Como resultado:

- No utilice nuevas claves de API o de aplicación de inmediato en flujos de trabajo críticos. Permita un breve período (unos segundos) para la propagación. Puede implementar una estrategia de reintento con un retroceso exponencial corto para manejar errores transitorios durante la ventana de propagación.
- Para validar si una clave de API está activa y utilizable, llame al punto de conexión [/api/v1/validate][16].
- Para verificar que una clave de aplicación está activa, utilice el punto de conexión `/api/v2/validate_keys` con el par de claves apropiado.

Intentar usar una clave recién creada antes de que se propague completamente puede resultar en errores de autenticación temporales como 403 Prohibido o 401 No autorizado.

## Contextos de autorización para claves de aplicación {#scope-application-keys}

Para especificar los contextos de autorización para las claves de aplicación, [haga una solicitud a la API de Datadog][4] o a la interfaz de usuario para crear o editar una clave de aplicación. Los contextos pueden especificarse para las claves de aplicación propiedad de [el usuario actual][17] o de una [cuenta de servicio][18]. Si este campo no se especifica, las claves de aplicación por defecto tienen los mismos contextos y permisos que el usuario que las creó.

**Notas:**

- Los nombres de los contextos son sensibles a mayúsculas y minúsculas.

## Uso de múltiples claves de API {#using-multiple-api-keys}

Considere configurar múltiples claves de API para su organización. Por ejemplo, use diferentes claves de API para cada uno de sus diversos métodos de implementación: una para implementar un Agent en Kubernetes en AWS, una para implementarlo en las instalaciones con Chef, una para scripts de Terraform que automatizan sus tableros o seguimientos, y una para desarrolladores que implementan localmente.

El uso de múltiples claves de API le permite rotar claves como parte de su práctica de seguridad, o revocar una clave específica si se expone inadvertidamente o si desea dejar de usar el servicio asociado.

Si su organización necesita más de las 50 claves de API incorporadas, comuníquese con [Soporte][19] para preguntar sobre el aumento de su límite.

## Deshabilitando una cuenta de usuario {#disabling-a-user-account}

Si la cuenta de un usuario está deshabilitada, se revocan todas las claves de aplicación que el usuario creó. Cualquier clave de API que fue creada por la cuenta deshabilitada no se elimina y sigue siendo válida.

## Transfiriendo claves {#transferring-keys}

Por razones de seguridad, Datadog no transfiere claves de aplicación de un usuario a otro. Si necesita compartir una clave de aplicación, utilice una [cuenta de servicio][20].

## Qué hacer si una clave de API o de aplicación fue expuesta {#what-to-do-if-an-api-or-application-key-was-exposed}

Si una clave privada ha sido comprometida o expuesta públicamente, se deben tomar medidas lo más rápido posible para garantizar la seguridad de su cuenta. Eliminar el archivo que contiene la clave de un sitio público como GitHub **no** garantiza que no haya sido accedido por otra parte.

Siga estos pasos para ayudar a proteger su cuenta:

**Nota:** Revocar una clave activa puede causar un impacto en sus servicios. Si el alcance de uso es grande o indeterminado, considere los pasos 2-5 **antes** de revocar la clave afectada.

1. Revocar la clave afectada.
2. Eliminar el código que contiene la clave privada de cualquier archivo accesible públicamente:
    - Publique el archivo sanitizado en su repositorio público.
    - Elimine los datos sensibles de su historial de commits.
3. Cree una nueva clave.
4. Actualice los servicios afectados con la nueva clave.
5. Revise su cuenta en busca de accesos no aprobados:
    - Usuarios que han sido añadidos recientemente
    - Nuevos recursos
    - Cambios en roles o permisos

Si se identifica alguna actividad inusual, o si necesita ayuda adicional para proteger su cuenta, contacte a [Datadog support][19].

## Solución de problemas {#troubleshooting}

¿Necesita ayuda? Contacte a [Datadog support][19].

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
[22]: /es/account_management/audit_trail/#setup
[23]: /es/account_management/rbac/permissions/#compliance