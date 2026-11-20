---
algolia:
  tags:
  - api key
aliases:
- /es/account_management/faq/how-do-i-reset-my-application-keys/
- /es/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /es/account_management/faq/api-app-key-management/
description: Administre claves de API, claves de aplicación y tokens de cliente para
  aplicaciones de navegador con funciones de seguridad.
title: Claves de API y de aplicación
---
## Claves de API {#api-keys}

Las claves de API son únicas para su organización. El Datadog Agent requiere una [clave de API][1] para enviar métricas y eventos a Datadog.

## Claves de aplicación {#application-keys}

Las [claves de aplicación][2], junto con la clave de API de su organización, brindan a los usuarios acceso a la API programática de Datadog. Las claves de aplicación están asociadas con la cuenta de usuario que las creó y, de forma predeterminada, tienen los permisos del usuario que las creó. Algunas API requieren acceso adicional en la clave de aplicación antes de que pueda usarla. Consulte [Acceso a la API de acciones](#actions-api-access).

### Modo de lectura única {#one-time-read-mode}

El modo de lectura única (OTR) es una función de seguridad que limita la visibilidad de los secretos de las claves de aplicación solo al momento de su creación. Cuando el modo OTR está habilitado, los secretos de las claves de aplicación solo se muestran una vez durante la creación y no se pueden recuperar posteriormente por motivos de seguridad.

#### Para organizaciones nuevas {#for-new-organizations}

Todas las claves de aplicación para organizaciones principales nuevas (y sus organizaciones secundarias) creadas después del 20 de agosto de 2025 tienen el modo OTR habilitado de forma predeterminada. Esta configuración es permanente y no se puede cambiar.

#### Para organizaciones existentes {#for-existing-organizations}

Los administradores de la organización pueden habilitar o deshabilitar el modo OTR desde [**Configuración de la organización** > **Claves de aplicación**][2]. Después de habilitar el modo OTR:

- Los secretos de las claves de aplicación son visibles solo una vez, al momento de la creación
- Ya no se pueden recuperar a través de la interfaz de usuario o la API
- La configuración puede ser activada o desactivada por los administradores de la organización durante 3 meses después de habilitarla
- Después de 3 meses de estar habilitado continuamente, el modo OTR se vuelve permanente y se elimina el interruptor

**Permisos**: Los usuarios deben tener tanto los permisos `org_app_keys_write` como `org_management` para habilitar o deshabilitar el modo OTR para su organización.

### Contextos {#scopes}

Para proteger y asegurar mejor sus aplicaciones, puede especificar contextos de autorización para sus claves de aplicación a fin de definir permisos más granulares y minimizar el acceso que las aplicaciones tienen a sus datos de Datadog. Esto le brinda un control de acceso detallado sobre sus aplicaciones y minimiza las vulnerabilidades de seguridad al limitar el acceso innecesario. Por ejemplo, una aplicación que solo lee paneles no necesita derechos de administrador para gestionar usuarios o eliminar cualquiera de los datos de su organización.

La mejor práctica recomendada para definir el contexto de las claves de aplicación es otorgar a sus claves los privilegios y permisos mínimos necesarios para que una aplicación funcione según lo previsto. Las claves de aplicación con contextos asignados reciben únicamente los contextos especificados por el usuario y ningún otro permiso adicional. Aunque puede modificar los contextos de autorización de sus claves de aplicación en cualquier momento, considere cómo esos cambios pueden afectar la funcionalidad o el acceso existente de su aplicación.

**Notas:**

- Los usuarios o las cuentas de servicio con [permisos][3] para crear o editar claves de aplicación pueden asignar contextos a las claves de aplicación. Un usuario debe tener el permiso `user_app_keys` para asignar contextos a sus propias claves de aplicación, o el permiso `org_app_keys_write` para asignar contextos a las claves de aplicación propiedad de cualquier usuario de su organización. Un usuario debe tener el permiso `service_account_write` para asignar contextos a las claves de aplicación de las cuentas de servicio.
- Los propietarios de aplicaciones no pueden autorizar una aplicación si les falta algún permiso requerido, incluso si asignan contextos a una clave de aplicación con contextos de autorización que ellos no tienen.
- Los errores debidos a la falta de permisos al escribir claves de aplicación o autorizar aplicaciones muestran un error `403 Forbidden`. Puede encontrar más información sobre diversas respuestas de error en la documentación de la [Datadog API][4].
- Si el rol o los permisos de un usuario cambian, los contextos de autorización especificados para sus claves de aplicación permanecen sin cambios.

### Acceso a la API de acciones {#actions-api-access}

Las API de acciones incluyen:
- [App Builder][5]
- [Actions Connections][6]
- [Workflow Automation][7]

Para utilizar claves de aplicación con estas API, debe habilitar el acceso a la API de acciones en la clave de aplicación. Esto se puede hacer [a través de la interfaz de usuario][2] o [API][21]. De forma predeterminada, las claves de aplicación no se pueden utilizar con estas API.

{{< img src="account_management/click-enable-actions-api-access.png" alt="Haga clic en Habilitar para el acceso a la API de Actions" style="width:80%;" >}}

**Nota**: La marca de tiempo {{< ui >}}Last used{{< /ui >}} es visible para todos los clientes. [Audit Trail][22] amplía el tiempo durante el cual esta información está disponible.

## Tokens de cliente {#client-tokens}

Por razones de seguridad, las claves de API no pueden utilizarse para enviar datos desde un navegador, una aplicación móvil o de TV, ya que quedarían expuestas en el lado del cliente. En su lugar, las aplicaciones orientadas al usuario final utilizan tokens de cliente para enviar datos a Datadog.

 Varios tipos de clientes envían datos que requieren un token de cliente, incluidos los siguientes ejemplos:
- Los recopiladores de registros para [navegador web][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] y [Roku][13] envían registros.
- Las aplicaciones de [Real User Monitoring][14] envían eventos y registros.

Los tokens de cliente son únicos para su organización. Para administrar sus tokens de cliente, vaya a {{< ui >}}Organization Settings{{< /ui >}} y luego haga clic en la pestaña {{< ui >}}Client Tokens{{< /ui >}}.

**Nota**: Cuando se desactiva a un usuario que creó un token de cliente, el token de cliente permanece activo.

## Agregue una clave de API o un token de cliente {#add-an-api-key-or-client-token}

Para agregar una clave de Datadog API o un token de cliente:

1. Vaya a la configuración de la organización y, a continuación, haga clic en la pestaña [**Claves de API**][1] o [**Tokens de cliente**][15].
2. Haga clic en el botón {{< ui >}}New Key{{< /ui >}} o {{< ui >}}New Client Token{{< /ui >}}, según lo que esté creando.
3. Ingrese un nombre para su clave o token.
4. Haga clic en {{< ui >}}Create API key{{< /ui >}} o {{< ui >}}Create Client Token{{< /ui >}}.

{{< img src="account_management/api-key.png" alt="Vaya a la página de claves de API de su organización en Datadog" style="width:80%;" >}}

**Notas:**

- Su organización debe tener al menos una clave de API y, de forma predeterminada, puede tener hasta 50 claves de API. Si necesita más, [comuníquese con el equipo de soporte][19] para solicitar un límite mayor. Las claves de API administradas, marcadas con una etiqueta {{< ui >}}Managed{{< /ui >}} en la columna Name, son creadas y controladas por una integración o servicio de Datadog en lugar de por usted, y no cuentan para este límite. Puede visualizar que existe una clave de API administrada y revocarla, pero no puede ver su valor ni editar su nombre.
- Los nombres de las claves deben ser únicos en toda su organización.

## Revocar claves de API o eliminar tokens de cliente {#revoke-api-keys-or-remove-client-tokens}

Para revocar una clave de Datadog API, vaya a la lista de claves y haga clic en el {{< ui >}}Revoke{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icono junto a la clave. Para eliminar un token de cliente, vaya a la lista de tokens y haga clic en el {{< ui >}}Delete{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icono junto al token.

Una clave de API revocada permanece en la lista con un estado de {{< ui >}}Revoked{{< /ui >}} durante 7 días, periodo durante el cual puede restaurarla. Consulte [Restaurar una clave de API](#unrevoke-an-api-key). Los tokens de cliente no admiten esta ventana de restauración; una vez que elimina un token de cliente, no se puede recuperar.

## Restaurar una clave de API {#unrevoke-an-api-key}

Si revoca una clave de API por error, puede restaurarla dentro de los 7 días posteriores a la revocación. Después de 7 días, una clave de API revocada se elimina permanentemente y no se puede recuperar.

Para restaurar una clave de API:

1. Navegue a Configuración de la organización y, luego, haga clic en la pestaña [**Claves de API**][1].
2. En el filtro {{< ui >}}Status{{< /ui >}}, seleccione {{< ui >}}Revoked{{< /ui >}}.
3. Localice la clave que desea restaurar.
4. Haga clic en el icono {{< ui >}}Unrevoke{{< /ui >}} junto a la clave.

{{< img src="account_management/unrevoke-api-key.png" alt="La página de Claves de API filtrada por el estado Revocada, con el icono de restaurar resaltado junto a una clave revocada" style="width:80%;" >}}

La clave vuelve al estado {{< ui >}}Active{{< /ui >}} con su nombre, ID y valor originales sin cambios.

Anular la revocación de una clave de API solo está disponible en la interfaz de usuario; no existe un punto de conexión de API público para ello.

## Agregar claves de aplicación {#add-application-keys}

Para agregar una clave de aplicación de Datadog, navegue a [**Configuración de la organización** > **Claves de aplicación**][2]. Si tiene el [permiso][3] para crear claves de aplicación, haga clic en {{< ui >}}New Key{{< /ui >}}.

{{< img src="account_management/app-key.png" alt="Navegue a la página de Claves de aplicación para su organización en Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Asegúrese de almacenar de forma segura su clave de aplicación inmediatamente después de crearla. El secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Si su organización tiene habilitado el modo de lectura única (OTR), asegúrese de almacenar de forma segura su clave de aplicación inmediatamente después de crearla. El secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

Debido a que las claves de API y las claves de aplicación son de larga duración y no tienen una fecha de vencimiento integrada, almacénelas en un administrador de secretos, como AWS Secrets Manager, HashiCorp Vault o Azure Key Vault, en lugar de en el código fuente o en archivos de entorno. AWS Secrets Manager admite [rotación administrada para claves de Datadog API y claves de aplicación][24].

**Notas:**

- Los nombres de las claves de aplicación no pueden estar en blanco.

## Eliminar claves de aplicación {#remove-application-keys}

Para eliminar una clave de aplicación de Datadog, navegue a [**Configuración de la organización** > **Claves de aplicación**][2]. Si tiene el [permiso][3] para crear y administrar claves de aplicación, puede ver sus propias claves y hacer clic en {{< ui >}}Revoke{{< /ui >}} junto a la clave que desea revocar. Si tiene el permiso para administrar todas las claves de aplicación de la organización, puede buscar la clave que desea revocar y hacer clic en {{< ui >}}Revoke{{< /ui >}} junto a ella.

**Nota**: La revocación de una clave de aplicación es permanente. La ventana de restauración de 7 días descrita en [Anular la revocación de una clave de API](#unrevoke-an-api-key) se aplica solo a las claves de API.

## Retraso en la propagación de claves y consistencia eventual {#key-propagation-delay-and-eventual-consistency}

Las claves de API y de aplicación de Datadog siguen un modelo de consistencia eventual. Debido a la naturaleza distribuida de los sistemas de Datadog, las actualizaciones de las claves, como la creación y la revocación, pueden tardar unos segundos en propagarse por completo.

Como resultado:

- No utilice claves de API o de aplicación nuevas inmediatamente en flujos de trabajo críticos. Permita un breve período (unos segundos) para la propagación. Puede implementar una estrategia de reintento con retroceso exponencial corto para manejar errores transitorios durante la ventana de propagación.
- Para validar si una clave de API está activa y utilizable, llame al punto de conexión [/api/v1/validate][16].
- Para verificar que una clave de aplicación esté activa, utilice el punto de conexión `/api/v2/validate_keys` con el par de claves correspondiente.

Intentar utilizar una clave recién creada antes de que se propague por completo puede resultar en errores de autenticación temporales como 403 Forbidden o 401 Unauthorized.

## Defina el contexto de las claves de aplicación {#scope-application-keys}

Para especificar contextos de autorización para las claves de aplicación, [realice una solicitud a la Datadog API][4] o a la interfaz de usuario para crear o editar una clave de aplicación. Los contextos pueden especificarse para claves de aplicación propiedad de [el usuario actual][17] o de una [cuenta de servicio][18]. Si este campo no se especifica, las claves de aplicación tienen por defecto los mismos contextos y permisos que el usuario que las creó.

**Notas:**

- Los nombres de los contextos distinguen entre mayúsculas y minúsculas.

## Uso de múltiples claves de API {#using-multiple-api-keys}

Considere configurar múltiples claves de API para su organización. Por ejemplo, utilice diferentes claves de API para cada uno de sus diversos métodos de implementación: una para desplegar un Agent en Kubernetes en AWS, una para implementarlo on prem con Chef, una para scripts de Terraform que automaticen sus tableros o monitores, y una para los desarrolladores que desplieguen localmente.

El uso de múltiples claves de API le permite rotar las claves como parte de su práctica de seguridad, o revocar una clave específica si se expone inadvertidamente o si desea dejar de utilizar el servicio con el que está asociada.

Si su organización necesita más que el límite integrado de 50 claves de API, comuníquese con [Soporte][19] para solicitar un aumento de su límite.

## Deshabilitación de una cuenta de usuario {#disabling-a-user-account}

Si la cuenta de un usuario está deshabilitada, cualquier clave de aplicación que el usuario haya creado será revocada. Cualquier clave de API que haya sido creada por la cuenta deshabilitada no se elimina y sigue siendo válida.

## Transferencia de claves {#transferring-keys}

Por razones de seguridad, Datadog no transfiere claves de aplicación de un usuario a otro. Si necesita compartir una clave de aplicación, utilice una [cuenta de servicio][20].

## Qué hacer si una clave de API o de aplicación fue expuesta {#what-to-do-if-an-api-or-application-key-was-exposed}

Si una clave privada ha sido comprometida o expuesta públicamente, se deben tomar medidas lo más rápido posible para garantizar la seguridad de su cuenta. Eliminar el archivo que contiene la clave de un sitio público como GitHub **no** garantiza que no haya sido accedido previamente por otra parte.

Siga estos pasos para ayudar a proteger su cuenta:

**Nota:** Revocar una clave activa puede causar un impacto en sus servicios. Si el contexto de uso es amplio o indeterminado, considere los pasos 2-5 **antes** de revocar la clave afectada.

1. Revoque la clave afectada.
2. Elimine el código que contiene la clave privada de cualquier archivo accesible públicamente:
    - Publique el archivo saneado en su repositorio público.
    - Elimine los datos confidenciales de su historial de confirmaciones.
3. Cree una clave nueva.
4. Actualice los servicios afectados con la clave nueva.
5. Revise su cuenta en busca de cualquier acceso no aprobado:
    - Usuarios que se han agregado recientemente
    - Nuevos recursos
    - Cambios en roles o permisos

Si identifica alguna actividad inusual, o si necesita ayuda adicional para proteger su cuenta, comuníquese con el [soporte de Datadog][19].

## Solución de problemas {#troubleshooting}

¿Necesita ayuda? Comuníquese con [soporte de Datadog][19].

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
[24]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/