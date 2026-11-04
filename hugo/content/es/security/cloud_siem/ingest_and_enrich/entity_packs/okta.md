---
description: Sincronice su directorio de usuarios de Okta en Cloud SIEM para agregar
  contexto de identidad a las señales, los riesgos y las investigaciones.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentación
  text: Obtenga más información sobre los Entity Packs
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentación
  text: Configure el Entity Pack de identidad de Google Workspace
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentación
  text: Configure el paquete de entidades de identidad de Microsoft Entra ID
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentación
  text: Explore los usuarios sincronizados en el User Inventory
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentación
  text: Explore las entidades y la puntuación de riesgo con Entity Risks
- link: /integrations/okta/
  tag: Documentación
  text: Recopile registros de Okta con la integración de Okta
title: Paquete de entidades de identidad de Okta
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Los Entity Packs no están disponibles para el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Descripción general {#overview}

El paquete de identidad de entidades de Okta sincroniza su directorio de usuarios de Okta en Cloud SIEM. Después de conectarlo, Cloud SIEM utiliza ese directorio para:

- Llene el [User Inventory][8] con sus usuarios de Okta.
- Adjunte una etiqueta de usuario a las señales para que pueda ver quién está detrás de la actividad.
- Califique el riesgo de un usuario en todas sus cuentas en [Entity Risks][1].

Para obtener información sobre lo que ofrecen los Entity Packs en general y los permisos que requieren, consulte [Entity Packs][10].

Datadog lee su directorio a través de la [Okta Users API][2], autenticándose con un token de API de Okta que usted crea. Solo se necesita acceso de solo lectura. Datadog nunca escribe en su directorio.

## Requisitos previos {#prerequisites}

La configuración requiere tres valores: un **Nombre**, su **Dominio de Okta** y un **Token de API**. Ingrese los tres en el Entity Pack; el token se crea en Okta.

Antes de comenzar, asegúrese de tener:

- Un rol de administrador de Okta que pueda crear un token de API y leer usuarios. **Administrador de solo lectura** es suficiente, y los roles de administrador más amplios también funcionan. Consulte los [roles y permisos de administrador estándar][5] de Okta.
- El permiso **SIEM Entities Admin** en Datadog, el cual es necesario para conectar un directorio. Los analistas que necesitan el contexto de identidad que proporciona necesitan al menos **Lectura de entidades SIEM**. Consulte [Entity Packs][10].

## Configuración {#setup}

Puede configurar un conjunto de credenciales por organización de Okta. Para sincronizar más de una, consulte [Conectar organizaciones de Okta adicionales](#connect-additional-okta-orgs).

### Cree el token de API {#create-the-api-token}

1. En la Admin Console de Okta, vaya a **Security** > **API**.
1. Haga clic en la pestaña **Tokens**, luego haga clic en **Crear token**.
1. Asigne al token un nombre que identifique a Datadog como el consumidor; por ejemplo, `datadog-cloud-siem`.
1. Asegúrese **de que las llamadas a la API realizadas con este token se originen desde**, y seleccione **Any IP**. Para restringir el token a las direcciones de Datadog en su lugar, consulte [Restricciones de red](#network-restrictions).
1. Haga clic en **Crear token**, luego copie el valor del token inmediatamente. Okta lo muestra solo una vez y almacena un hash del mismo después.

Para conocer el procedimiento completo y las otras opciones de zona de red, consulte [Administrar tokens de API de Okta][4] de Okta.

<div class="alert alert-info">Cree el token desde una cuenta de servicio dedicada, como <code>datadog-integration@example.com</code>, en lugar de desde la cuenta de una persona. Un token hereda los permisos de la cuenta que lo creó, y Okta rechaza los tokens de cuentas que han sido desactivadas. Si esa cuenta pertenece a alguien que deja o pierde su rol de administrador, la sincronización se detiene y la causa es difícil de rastrear.</div>

#### Expiración del token {#token-expiration}

Los tokens de API de Okta son válidos por 30 días y cada solicitud de API renueva el token. Por lo tanto, un Entity Pack activo mantiene vivo su propio token. Un token que no se utiliza durante más de 30 días se revoca permanentemente y no se puede restablecer.

#### Restricciones de red {#network-restrictions}

Seleccionar **Any IP** es la opción más sencilla. Si su organización requiere un token restringido, asígnelo a una zona IP de Okta que contenga los rangos de IP publicados de Datadog.

Datadog publica esos rangos como JSON en un punto de conexión por sitio. Para el sitio US1, ese punto de conexión es `https://ip-ranges.datadoghq.com/`. Use el que coincida con su propio sitio de Datadog y actualice su zona siempre que los rangos cambien. La respuesta incluye los campos `version` y `modified` que puede monitorear. Para obtener la lista completa de puntos de conexión, consulte [IP Ranges][12].

Se aplican dos restricciones de Okta si elige esta ruta. Los tokens SSWS solo funcionan con zonas basadas en IP, no con zonas dinámicas, y no se pueden usar con zonas de lista de bloqueo.

#### Dominio de Okta {#okta-domain}

Ingrese el servidor al que inicia sesión, sin un esquema o ruta (por ejemplo, `example.okta.com`).

### Agregue credenciales en Datadog{#add-credentials-in-datadog}

1. En Datadog, vaya a **Cloud SIEM** > [**Content Packs**][6].
1. Filtre por **Entity Pack**, luego abra el Entity Pack de **Okta Identity**. Está marcado como **AVAILABLE** hasta que conecte un directorio.
1. Haga clic en **Add Credentials**.
1. En el cuadro de diálogo **Add credentials and activate content pack**, complete los tres campos:
   | Campo | Descripción |
   | --- | --- |
   | **Name** | Un nombre para mostrar para este conjunto de credenciales; por ejemplo, `Production credentials`. Use un nombre que identifique a la organización si planea conectar más de una. |
   | **Okta Domain** | La organización de Okta que se va a sincronizar; por ejemplo, `example.okta.com`. Ingrese solo el servidor, sin esquema ni ruta. |
   | **API Token** | El valor del token que copió de Okta. Pegue el valor por sí solo, sin el prefijo `SSWS` utilizado en las solicitudes de API sin procesar. |
1. Haga clic en **Test Connection**. Datadog valida las credenciales con Okta antes de guardarlas. Si la validación falla, consulte [Troubleshooting](#troubleshooting).
1. Cuando la verificación de conexión sea exitosa, guarde las credenciales para activar el Entity Pack.

Datadog cifra el token de API en reposo y nunca lo devuelve en la interfaz ni en las respuestas de la API.

## Verifique la sincronización {#verify-the-sync}

La sincronización es continua. La primera sincronización comienza tan pronto como Datadog valida la credencial, y cada sincronización posterior comienza cuando termina la anterior, por lo que nunca tendrá que programar o activar una sincronización usted mismo.

Eso convierte a **Last synced** en una verificación de estado por derecho propio. Una cuenta saludable siempre está sincronizada recientemente, por lo que un tiempo de **Last synced** que deja de avanzar significa que algo anda mal.

Después de que Datadog valida una credencial, el Entity Pack se marca como **ACTIVO**. Abra su panel lateral en Cloud SIEM y verifique lo siguiente:

### Credenciales {#credentials}

La sección **Credenciales** enumera cada cuenta conectada. Expanda una cuenta para ver:

| Campo | Qué le indica |
| --- | --- |
| **Dominio** | La organización de Okta que sincroniza esta cuenta. |
| **Estado** | Si la sincronización está **habilitada** o deshabilitada para esta cuenta. Use el interruptor para cambiarlo. |
| **Última actualización** | Cuándo se modificó la credencial por última vez. |
| **Estado de sincronización** | Si la sincronización más reciente se completó; por ejemplo, `Synced`. |
| **Última sincronización** | Hace cuánto tiempo se ejecutó la sincronización más reciente. |
| **Duración de la última sincronización** | Cuánto tiempo tomó esa sincronización. |

Cada cuenta también incluye una insignia de validación:

| Insignia | Significado |
| --- | --- |
| **VÁLIDO** | Datadog puede autenticarse en Okta con estas credenciales. |
| **INVÁLIDO** | Datadog no puede autenticarse. Consulte [Solución de problemas](#troubleshooting). |

A través de la API, una credencial informa `initializing` después de que Datadog la acepta y antes de que se complete la primera sincronización.

### Métricas clave{#key-metrics}

El tablero de **Métricas clave** muestra cuatro widgets:

- **Usuarios sincronizados**: cuántos usuarios actualizó una sincronización. Esto mide la rotación del directorio en lugar del tamaño del directorio, por lo que normalmente se lee mucho más bajo que su recuento total de usuarios. Para el total, utilice la sección [Entidades](#entities) a continuación.
- **Usuarios por credencial**: el mismo recuento, desglosado por cuenta conectada.
- **Historial de sincronización por credencial**: Sincronizaciones completadas a lo largo del tiempo. Un espacio significa que una sincronización falló o se omitió.
- **Duración de la sincronización por credencial**: Cuánto tiempo tomó cada sincronización. Un pico ocasional es normal. Un aumento sostenido generalmente significa que el directorio está creciendo o que Okta está limitando la tasa de llamadas.

Cada widget por credencial se agrupa por `credential_name`, que se deriva del **Nombre** que ingresó.

### Entidades {#entities}

La sección **Entidades** enumera los usuarios que este Entity Pack sincronizó. Cada fila muestra **Display Name**, **Principal ID**, **User Type** (por ejemplo, `human` o `service_account`) y **Account Status** (por ejemplo, **ACTIVE**).

Cloud SIEM normaliza los estados de usuario de Okta al modelo de estado común que utiliza para cada proveedor de identidad (**ACTIVO**, **SUSPENDIDO**, **ELIMINADO**). Los valores aquí no son los nombres de estado propios de Okta.

El recuento de entidades es el número total de usuarios sincronizados desde este directorio, lo que lo convierte en la cifra para comparar con el tamaño de su directorio de Okta. La lista cubre un rango de tiempo que puede cambiar. Para ver todo, haga clic en **View in User Inventory**.

## Conectar organizaciones adicionales de Okta{#connect-additional-okta-orgs}

Cada conjunto de credenciales sincroniza una organización de Okta. Para sincronizar otra, cree un token de API en esa organización, luego haga clic en **Add account** en la sección **Credentials** del panel lateral del Entity Pack.

Cuando conecta varias organizaciones:

- Asigne un nombre a cada cuenta según la organización que sincroniza. Los tres widgets por credencial se agrupan por `credential_name`, una forma normalizada del **Name** que ingresó, por lo que los nombres vagos hacen que esos widgets sean difíciles de leer.
- Utilice el interruptor por cuenta en **Status** para pausar la sincronización de una organización sin eliminar su credencial.
- Cree un token de API independiente en cada organización. Un token se autentica solo contra la organización que lo emitió.

## Solución de problemas {#troubleshooting}

### La prueba de conexión falla {#the-connection-test-fails}

Revise estas causas en orden:

| Causa | Cómo confirmar | Solución |
| --- | --- | --- |
| El valor del token se pegó con el prefijo `SSWS` o espacios en blanco circundantes | El valor que pegó es más largo que el token que mostró Okta | Vuelva a pegar el valor del token por sí solo. |
| Okta domain entered with a scheme or path | El valor de **Okta Domain** comienza con `https://`, o termina en `/admin` o con una barra diagonal final | . Ingrese solo el servidor; por ejemplo, `example.okta.com`. |
| Servidor de organización de Okta incorrecto | El valor usa `example.okta.com` para una organización de vista previa, o omite el sufijo `-emea` para una organización de EMEA | Utilice el servidor con el que inicia sesión: `example.oktapreview.com` o `example.okta-emea.com`. |
| El creador del token no es administrador, o no puede leer usuarios | La cuenta que creó el token no tiene rol de administrador en la Admin Console de Okta | Cree el token desde una cuenta con **Administrador de solo lectura** o un rol de administrador más amplio. |
| El creador del token fue desactivado | La cuenta que creó el token ya no está activa en Okta | Cree un token desde una cuenta de servicio activa. Okta rechaza tokens de usuarios desactivados. |
| Token revocado o caducado | El token no aparece en la pestaña **Tokens** en Okta, o su fecha de último uso tiene más de 30 días | Cree un token y agréguelo en Datadog. Okta revoca permanentemente los tokens que no se utilizan durante 30 días. |
| Token restringido a zonas de red que excluyen a Datadog | La configuración **El token se puede usar desde** del token es distinta a **Cualquier IP** | Establezca el token en **Cualquier IP**, o confirme que la zona IP cubre los rangos publicados de Datadog. Consulte [Restricciones de red](#network-restrictions). |

### Las credenciales funcionaban y ahora no son válidas {#credentials-were-working-and-are-now-invalid}

La causa suele ser un cambio por parte de Okta:

- La cuenta que creó el token fue desactivada o perdió el rol de administrador que le otorgaba acceso de lectura a los usuarios. Los permisos de un token siguen a los de la cuenta que lo creó, por lo que un cambio de rol por sí solo puede interrumpir la sincronización. Este es el error común cuando el token pertenece a una persona en lugar de a una cuenta de servicio.
- El token fue revocado desde la pestaña **Tokens**, o expiró después de 30 días sin uso.
- Las restricciones de zona de red del token cambiaron.

Okta registra la creación y revocación de tokens en el Registro del sistema como `API token created` y `API token revoked`. Esa es la forma más rápida de confirmar si un token fue revocado y por quién.

### Las sincronizaciones son lentas o intermitentes {#syncs-are-slow-or-intermittent}

Okta aplica límites de tasa de API por organización y devuelve `HTTP 429 Too Many Requests` una vez que se excede un límite. Los tokens creados en el Admin Console de Okta tienen como valor predeterminado el 50% de cada límite de tasa, y cualquier otra integración que realice llamadas con el mismo token utiliza ese mismo presupuesto.

- En Okta, verifique **Reports** > **Rate Limits** para ver advertencias y violaciones, que Okta también escribe en el Registro del sistema.
- En la página del token en Okta, aumente el porcentaje de **Token rate limits** si el valor predeterminado está limitando la sincronización.
- Asigne a Datadog su propio token en lugar de reutilizar uno con el que otras integraciones ya realizan llamadas.

Consulte la [rate limits overview][11] de Okta.

### La sincronización se realiza correctamente pero no aparecen usuarios {#the-sync-succeeds-but-no-users-appear}

- Confirme que el valor de **Domain** coincida con el dominio cuyos usuarios espera. Un usuario administrador válido en un dominio diferente al que ingresó puede producir un resultado vacío.


### No aparece ninguna píldora de usuario en las señales {#no-user-pill-appears-on-signals}

Cloud SIEM hace coincidir el contexto de identidad con los eventos mediante la dirección de correo electrónico. Si un usuario sincronizado no tiene un user pill en su actividad, verifique que los registros de esa fuente completen el campo de correo electrónico del usuario y que la canalización OCSF de la fuente esté activa. Consulte [Open Cybersecurity Schema Framework][7].

Un Entity Pack no requiere la integración de registros coincidente, y la integración no requiere el Entity Pack. Si está sincronizando el directorio pero no ve ninguna actividad de Okta para adjuntarlo, es posible que también necesite la [Okta log integration][3].

Si aún necesita ayuda, comuníquese con el [soporte técnico de Datadog][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user
[3]: /es/integrations/okta/
[4]: https://help.okta.com/en-us/content/topics/security/api.htm
[5]: https://help.okta.com/en-us/content/topics/security/administrators-admin-comparison.htm
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /es/help/
[9]: /es/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/
[11]: https://developer.okta.com/docs/reference/rate-limits/
[12]: /es/api/latest/ip-ranges/