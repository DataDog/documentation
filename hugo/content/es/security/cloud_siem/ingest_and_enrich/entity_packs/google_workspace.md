---
description: Sincronice su directorio de usuario de Google Workspace en Cloud SIEM
  para agregar contexto de identidad a las señales, los riesgos y las investigaciones.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentación
  text: Obtenga más información sobre los Entity Packs
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentación
  text: Configure el Entity Pack de identidad de Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentación
  text: Configure el paquete de entidades de identidad de Microsoft Entra ID
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentación
  text: Explore los usuarios sincronizados en el User Inventory
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentación
  text: Explore las entidades y la puntuación de riesgo con Entity Risks
- link: /integrations/gsuite/
  tag: Documentación
  text: Recopile registros de Google Workspace con la integración de Google Workspace
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: Blog
  text: Detecte actividad maliciosa en aplicaciones de Google Workspace con Datadog
    Cloud SIEM
title: Paquete de entidades de identidad de Google Workspace
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Los Entity Packs no están disponibles para el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Descripción general {#overview}

El Google Workspace Identity Entity Pack sincroniza su Google Workspace user directory en Cloud SIEM. Después de conectarlo, Cloud SIEM utiliza ese directorio para:

- Complete el [User Inventory][8] con sus usuarios de Google Workspace.
- Adjunte una etiqueta de usuario a las señales para que pueda ver quién está detrás de la actividad.
- Califique el riesgo de un usuario en todas sus cuentas en [Entity Risks][1].


Para obtener información sobre lo que ofrecen los Entity Packs en general y los permisos que requieren, consulte [Entity Packs][10].

Datadog lee su directorio a través de la [Google Admin SDK Directory API][2] utilizando una cuenta de servicio de Google Cloud que usted crea y a la que otorga delegación en todo el dominio. Datadog solicita acceso de solo lectura a los registros de usuario; no escribe en su directorio.

## Requisitos previos {#prerequisites}

En esta configuración intervienen dos identidades de Google diferentes, y ambas se denominan comúnmente "cuenta de servicio" en las conversaciones. No son intercambiables:

| Identidad | Qué es | Dónde se usa |
| --- | --- | --- |
| **Cuenta de servicio de Google Cloud** | La entidad de Google Cloud con la que Datadog se autentica. | Cargue su archivo de clave JSON en Datadog. |
| **Usuario administrador de Google Workspace** | Un usuario de Google Workspace con privilegios de administrador que la cuenta de servicio suplanta al llamar a la API de Directory. | Ingrese en el campo **Correo electrónico del administrador de Workspace**. |

El campo **Correo electrónico del administrador de Workspace** requiere el usuario administrador de Google Workspace, no la cuenta de servicio. Si la dirección que está por ingresar termina en `@<project-id>.iam.gserviceaccount.com`, es el correo electrónico de la cuenta de servicio y la conexión fallará.

Antes de comenzar, asegúrese de tener:

- Un proyecto de Google Cloud en el que puede crear una cuenta de servicio y habilitar API.
- **Super Admin** privilegios en el Google Workspace tenant que desea sincronizar, o un Super Admin que pueda otorgar delegación a nivel de dominio en su nombre.
- El permiso **SIEM Entities Admin** en Datadog, el cual es necesario para conectar un directorio. Los analistas que necesiten ver el contexto de identidad que proporciona requieren al menos **SIEM Entities Read**. Consulte [Entity Packs][10].
- Al menos un usuario en el directorio de Google Workspace. Un directorio vacío produce un Inventario de usuarios vacío.

Datadog recomienda suplantar una cuenta de administrador compartida con un nombre genérico, como `datadog-integration@example.com`, en lugar de la cuenta de una persona. Si la integración depende de la cuenta de una persona específica y esa persona deja la organización o pierde los privilegios de administrador, la sincronización deja de funcionar y la causa es difícil de trazar.

## Configuración {#setup}

Puede configurar un conjunto de credenciales por dominio de Google Workspace. Para sincronizar más de un dominio, consulte [Connect additional domains](#connect-additional-domains).

### Crear una cuenta de servicio en Google Cloud {#create-a-service-account-in-google-cloud}

1. En la consola de Google Cloud, seleccione el proyecto en el que desea crear la cuenta de servicio.
1. Siga la sección **Create a service account** de las [instrucciones de la cuenta de servicio][4].
1. Cree una clave JSON para la cuenta de servicio y guarde el archivo descargado. Suba este archivo a Datadog en un paso posterior.

La cuenta de servicio no necesita ningún rol de IAM de Google Cloud. El acceso a su directorio proviene de la concesión de delegación a nivel de dominio en la consola de administración de Google Workspace, no de Google Cloud IAM.

### Habilite la Admin SDK API {#enable-the-admin-sdk-api}

1. En la consola de Google Cloud, confirme que el proyecto al que pertenece su cuenta de servicio esté seleccionado.
1. Vaya a **APIs & Services** > **Library**.
1. Busque y abra la **Admin SDK API** (`admin.googleapis.com`).
1. Haga clic en **Enable**.

### Otorgue delegación a nivel de dominio {#grant-domain-wide-delegation}

1. En la consola de Google Cloud, abra su cuenta de servicio, haga clic en **Show advanced settings** y, en **Domain-wide delegation**, copie el **Client ID** de la cuenta de servicio. Este es el mismo valor numérico que se muestra como **Unique ID** en la pestaña **Details** de la cuenta de servicio.
1. En la consola de administración de Google Workspace, vaya a **Security** > **Access and data control** > **API controls**.
1. Bajo **Domain-wide delegation**, haga clic en **Manage Domain Wide Delegation**.
1. Haga clic en **Add new**.
1. Pegue el **Client ID** de la cuenta de servicio en el campo **Client ID**.
1. En **Contextos de OAuth**, ingrese el siguiente contexto:
   ```text
   https://www.googleapis.com/auth/admin.directory.user.readonly
   ```
1. Haga clic en **Authorize**.
1. Para confirmar el acceso, encuentre la nueva **Client ID** en la lista, haga clic en **View details** y verifique que se liste el contexto.

Para obtener más detalles, consulte [Delegar autoridad en todo el dominio a una cuenta de servicio][5] de Google.

### Agregue credenciales en Datadog{#add-credentials-in-datadog}

1. En Datadog, vaya a **Cloud SIEM** > [**Content Packs**][6].
1. Filtrar por **Entity Pack**, luego, abra el pack de entidad **Google Workspace Identity**. Está marcado como **AVAILABLE** hasta que conecte un directorio.
1. Haga clic en **Add Credentials**.
1. En el diálogo **Add credentials and activate content pack**, haga clic **Browse files** y seleccione el archivo clave JSON de la cuenta de servicio que descargó. Datadog extrae los valores `client_email`, `private_key` y `project_id` del archivo.
1. Complete los campos restantes:
   | Campo | Descripción |
   | --- | --- |
   | **Name** | Un nombre que se muestra para este conjunto de credenciales, por ejemplo `Production credentials`. Utilice un nombre que identifique el dominio si planea conectar más de uno. |
   | **Domain** | El dominio Google Workspace para sincronizar, por ejemplo `example.com`. |
   | **Workspace Admin email** | El usuario de administrador de Google Workspace que la cuenta de servicio suplanta, por ejemplo `datadog-integration@example.com`. No utilice el correo electrónico de la cuenta de servicio. |
1. Haga clic en **Test Connection**. Datadog valida las credenciales con Google Workspace antes de almacenarlas. Si la validación falla, consulte [Troubleshooting](#troubleshooting).
1. Una vez que la prueba de conexión sea exitosa, guarde las credenciales para activar el Entity Pack.

Datadog almacena la clave privada de la cuenta de servicio cifrada y no la devuelve en la interfaz de Datadog ni en las respuestas de la API.

## Verifique la sincronización {#verify-the-sync}

La sincronización es continua. La primera sincronización comienza tan pronto como Datadog valida la credencial, y cada sincronización posterior comienza cuando termina la anterior, por lo que nunca programa ni activa una sincronización usted mismo. Un tiempo **Last synced** mucho más antiguo que lo normal para su cuenta que vale la pena investigar.

Después de que Datadog valida una credencial, el Entity Pack se marca como **ACTIVO**. Desde **Cloud SIEM** > [**Content Packs**][6], abra el mosaico **Google Workspace Identity** para ver su panel lateral, luego verifique lo siguiente:

### Credenciales {#credentials}

La sección **Credenciales** enumera cada cuenta conectada. Expanda una cuenta para ver:

| Campo | Qué le indica |
| --- | --- |
| **Dominio** | El dominio de Google Workspace que sincroniza esta cuenta. |
| **Estado** | Si la sincronización está habilitada o deshabilitada para esta cuenta. Utilice el interruptor para cambiarlo, o el menú de desbordamiento para eliminar la credencial. |
| **Última actualización** | Cuándo se modificó la credencial por última vez. |
| **Estado de sincronización** | Si la sincronización más reciente se completó; por ejemplo, `Synced`. |
| **Última sincronización** | Hace cuánto tiempo se ejecutó la sincronización más reciente. |
| **Duración de la última sincronización** | Cuánto tiempo tomó esa sincronización. |

Cada cuenta también incluye una insignia de validación:

| Insignia | Significado |
| --- | --- |
| **Válido** | Datadog puede autenticarse en Google Workspace con estas credenciales. |
| **No válido** | Datadog no puede autenticarse. Consulte [Solución de problemas](#troubleshooting). |

### Métricas clave{#key-metrics}

La sección **Métricas clave** muestra cuatro widgets:

- **Usuarios sincronizados**: la cantidad de usuarios cuyos atributos actualizó una sincronización. Esto mide la rotación del directorio, no el tamaño del directorio, por lo que normalmente es mucho menor que el recuento total de usuarios.
- **Usuarios por credencial**: el mismo recuento actualizado de usuarios, desglosado por cuenta conectada.
- **Historial de sincronización por credencial**: sincronizaciones completadas a lo largo del tiempo. Los espacios indican sincronizaciones fallidas u omitidas.
- **Duración de la sincronización por credencial**: cuánto tiempo tomó cada sincronización, en milisegundos. Los picos aislados son normales; un aumento sostenido puede indicar un directorio en crecimiento o una limitación de la API por parte de Google.

Los widgets por credencial se agrupan por `credential_name`, una forma normalizada del **Nombre** que ingresa. Por ejemplo, `Production credentials` se convierte en `production_credentials`.

### Entidades {#entities}

La sección **Entidades** enumera los usuarios que este paquete de entidades sincronizó, con **Nombre para mostrar**, **ID principal**, **Tipo de usuario** (por ejemplo, `human` o `service_account`) y **Estado de la cuenta**.

Utilice el recuento de entidades, no **Usuarios sincronizados**, cuando desee saber cuántos usuarios ha incorporado este paquete de entidades a Cloud SIEM. Haga clic en **Ver en el inventario de usuarios** para ver el [inventario completo][9].

Para confirmar que el contexto de identidad está llegando a sus señales, abra una señal atribuida a un usuario sincronizado y verifique que aparezca una píldora de usuario.

## Conectar dominios adicionales {#connect-additional-domains}

Cada conjunto de credenciales sincroniza un dominio de Google Workspace. Después de que el paquete de entidades esté **ACTIVO**, use **Agregar cuenta** en la sección **Credenciales** para conectar cada dominio adicional.

Para cada dominio adicional:

1. [Otorgue la delegación de todo el dominio](#grant-domain-wide-delegation) en la consola de administración de Google Workspace de ese inquilino. Una concesión de delegación se aplica solo al inquilino donde la crea.
1. En el panel lateral del paquete de entidades, haga clic en **Agregar cuenta** en la sección **Credenciales**.
1. Complete los mismos campos descritos en [Agregar credenciales en Datadog](#add-credentials-in-datadog), luego haga clic en **Probar conexión**.

Cuando ejecute más de un dominio:

- Asigne a cada cuenta un **Nombre** que identifique su dominio, para que **Usuarios por credencial**, **Historial de sincronización por credencial** y **Duración de la sincronización por credencial** permanezcan legibles.
- Asegúrese de que el **Correo electrónico del administrador de Workspace** pertenezca al mismo dominio que el valor de **Dominio**. Una discrepancia provoca que la prueba de conexión falle.

## Solución de problemas {#troubleshooting}

### La prueba de conexión falla {#the-connection-test-fails}

Revise estas causas en orden:

| Causa | Cómo confirmar | Solución |
| --- | --- | --- |
| Correo electrónico de la cuenta de servicio ingresado como correo electrónico del administrador | El valor de **Correo electrónico del administrador de Workspace** termina en `@<project-id>.iam.gserviceaccount.com` | Ingrese un usuario de Google Workspace con privilegios de administrador en su lugar. |
| API de Admin SDK no habilitada | En la consola de Google Cloud, **API y servicios** > **API y servicios habilitados** no enumera **API de Admin SDK** | [Habilite la API de Admin SDK](#enable-the-admin-sdk-api) en el proyecto que posee la cuenta de servicio. |
| Delegación de todo el dominio no otorgada | El **ID de cliente** de la cuenta de servicio no aparece en la página **Administrar delegación de todo el dominio** | [Otorgue la delegación de todo el dominio](#grant-domain-wide-delegation) . |
| Contexto de OAuth incorrecto o faltante | Haga clic en **Ver detalles** en la entrada de delegación; `https://www.googleapis.com/auth/admin.directory.user.readonly` no aparece en la lista | Edite la entrada de delegación y agregue el contexto exactamente como está escrito, sin caracteres adicionales al final. |
| El usuario suplantado no es administrador | El usuario en **Correo electrónico del administrador de Workspace** no tiene un rol de administrador en la consola de administración de Google Workspace | Utilice una cuenta con privilegios de administrador o asigne una con acceso de lectura a los usuarios. |
| Discrepancia de dominio | El valor de **Dominio** no coincide con el dominio del usuario administrador suplantado | Corrija el valor de **Dominio** o suplante a un administrador en ese dominio. |
| Archivo de clave JSON incompleto o incorrecto | Al archivo cargado le falta `client_email`, `private_key` o `project_id`, o `type` no es `service_account` | Vuelva a descargar la clave JSON de la cuenta de servicio y cargue el archivo sin modificaciones. |

Google señala que los cambios de delegación pueden tardar hasta 24 horas en entrar en vigor, aunque normalmente se aplican más rápidamente. Si acaba de otorgar la delegación o agregó un contexto, espere y luego ejecute **Probar conexión** nuevamente.

### Las credenciales funcionaban y ahora no son válidas {#credentials-were-working-and-are-now-invalid}

Las causas más comunes son cambios por parte de Google:

- El usuario administrador suplantado fue suspendido, eliminado o perdió su rol de administrador. Esta es la falla habitual cuando la integración está vinculada a la cuenta de una persona en lugar de una compartida.
- La clave JSON de la cuenta de servicio fue rotada, deshabilitada o eliminada. Cree una clave y súbala.
- La cuenta de servicio en sí fue eliminada, o la entrada de delegación para todo el dominio fue eliminada.
- La API de Admin SDK fue deshabilitada en el proyecto de Google Cloud.

### La sincronización se realiza correctamente pero no aparecen usuarios {#the-sync-succeeds-but-no-users-appear}

Confirme que el valor de **Dominio** coincida con el dominio cuyos usuarios espera. Un usuario administrador válido en un dominio diferente al que ingresó puede producir un resultado vacío.

### No aparece ninguna píldora de usuario en las señales {#no-user-pill-appears-on-signals}

El contexto de identidad se vincula a los eventos mediante la dirección de correo electrónico. Si un usuario sincronizado no tiene una píldora en su actividad, confirme que los registros de esa fuente completan el campo de correo electrónico del usuario y que la canalización OCSF de la fuente esté activa. Consulte [Open Cybersecurity Schema Framework][7].

Un paquete de entidades no requiere la integración de registro o el paquete de contenido correspondiente, y ninguno de ellos requiere el paquete de entidades. Si está sincronizando el directorio pero no ve ninguna actividad de Google Workspace a la cual adjuntarlo, es posible que también necesite la [integración de registro de Google Workspace][3].

Si aún necesita ayuda, comuníquese con el [soporte técnico de Datadog][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developers.google.com/workspace/admin/directory/v1/guides
[3]: /es/integrations/gsuite/
[4]: https://developers.google.com/workspace/guides/create-credentials#service-account
[5]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /es/help/
[9]: /es/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/