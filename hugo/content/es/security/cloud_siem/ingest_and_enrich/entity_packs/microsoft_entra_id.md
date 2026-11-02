---
description: Sincronice su directorio de usuario de Microsoft Entra ID en Cloud SIEM
  para agregar contexto de identidad a las señales, los riesgos y las investigaciones.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentación
  text: Obtenga más información sobre los Entity Packs
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentación
  text: Configure el Entity Pack de identidad de Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentación
  text: Configure el Entity Pack de identidad de Google Workspace
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentación
  text: Explore los usuarios sincronizados en el User Inventory
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentación
  text: Explore las entidades y la puntuación de riesgo con Entity Risks
- link: /getting_started/integrations/azure/
  tag: Documentación
  text: Comience con la integración de Azure
title: Paquete de entidades de Microsoft Entra ID
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Los Entity Packs no están disponibles para el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Descripción general {#overview}

El Entity Pack de Microsoft Entra ID sincroniza su directorio de usuarios de Microsoft Entra ID en Cloud SIEM. Después de conectarlo, Cloud SIEM utiliza ese directorio para:

- Rellene el [User Inventory][8] con sus usuarios de Entra ID.
- Adjunte una etiqueta de usuario a las señales para que pueda ver quién está detrás de la actividad.
- Califique el riesgo de un usuario en todas sus cuentas en [Entity Risks][1].

Para obtener información sobre lo que ofrecen los Entity Packs en general y los permisos que requieren, consulte [Entity Packs][9].

Datadog lee su directorio a través de la [Microsoft Graph API][2], autenticándose como un registro de aplicación de Azure al que usted otorga permisos de aplicación y al que un administrador de inquilinos da su consentimiento. Datadog solicita acceso de solo lectura; no escribe en su directorio.

A diferencia de los otros Entity Packs, Microsoft Entra ID se basa en la [integración de Azure de Datadog][10] en lugar de en una credencial que usted ingresa directamente en Cloud SIEM. El registro de la aplicación que respalda el Entity Pack es el mismo que utiliza la integración de Azure, y debe tener habilitada la recopilación de recursos. Si ya ejecuta la integración de Azure, la mayor parte de la configuración está hecha; usted está agregando dos permisos de Microsoft Graph a un registro de aplicación existente.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:

- Una [integración de Azure][10] configurada en Datadog, con la **recopilación de recursos habilitada** en el registro de la aplicación que planea utilizar. La recopilación de recursos es obligatoria; el Paquete de entidades no se sincroniza sin ella.
- Al menos una suscripción de Azure configurada en ese registro de aplicación, incluso si no la utiliza de otra manera.
- Permiso en el portal de Azure para agregar permisos de aplicación de Microsoft Graph y otorgar consentimiento de administrador. Otorgar consentimiento requiere el rol de **Administrador de roles con privilegios** o **Administrador global**.
- Los siguientes permisos de Datadog:

  | Permiso | Por qué es necesario |
  | --- | --- |
  | **SIEM Entities Admin** | Conecte un directorio de usuario y administre sus credenciales. Consulte [Entity Packs][9]. |
  | **Integrations Manage** | Modifique la integración de Azure, a través de la cual se configura este Entity Pack. |

  Para ver el contexto de identidad que proporciona el Entity Pack, los analistas requieren al menos **SIEM Entities Read**.

## Configuración {#setup}

Puede configurar un registro de aplicación por inquilino de Entra ID. Para sincronizar más de un inquilino, consulte [Conectar inquilinos adicionales](#connect-additional-tenants).

Si ya tiene una integración de Azure con la recopilación de recursos habilitada, pase a [Otorgar permisos de Microsoft Graph](#grant-microsoft-graph-permissions).

### Configure la integración de Azure {#set-up-the-azure-integration}

1. En Datadog, vaya a **Integrations** > [**Azure**][3].
1. Si aún no tiene una integración de Azure, siga [Getting Started with Azure][10]. Puede configurarla de tres maneras:
   - **Quickstart**, que ejecuta un script de instalación en Azure Cloud Shell.
   - **Terraform**, para flujos de trabajo de infraestructura como código.
   - **Registro de aplicación existente**, donde usted mismo ingresa el ID de inquilino, el ID de cliente y el secreto de cliente.
1. Si ya tiene una integración de Azure, confirme que el registro de la aplicación que planea usar esté listo:
   1. En la pestaña **Configuración**, seleccione el registro de la aplicación de la lista. Cada entrada muestra su nombre o ID de cliente y cuántas suscripciones tiene. Confirme que tiene al menos una suscripción.
   1. Abra la pestaña **Recopilación de recursos** y confirme que **Habilitar recopilación de recursos** esté activado. Si está desactivado, actívelo.

Tome nota de qué registro de aplicación confirmó. Es la que usted otorga permisos de Microsoft Graph en el siguiente paso, y la que selecciona en Cloud SIEM posteriormente.

### Otorgar permisos de Microsoft Graph {#grant-microsoft-graph-permissions}

El registro de la aplicación necesita permisos de aplicación de Microsoft Graph para leer datos de usuario. Estos son adicionales a los permisos que la integración de Azure ya utiliza.

1. En el portal de Azure, vaya a **Microsoft Entra ID** > **App registrations**.
1. Seleccione el registro de su aplicación de Datadog. Si varios parecen similares, busque por ID de cliente.
1. En la barra lateral izquierda, haga clic en **API permissions**.
1. Haga clic en **Agregar un permiso** > **Microsoft Graph** > **Application permissions**.
1. Agregue los siguientes permisos:
   | Permiso | Requerido para | Lo que lee |
   | --- | --- | --- |
   | `User.Read.All` | Perfiles de usuario | Atributos de usuario: correo electrónico, nombre, departamento, cargo, estado de la cuenta y marcas de tiempo de cambio de contraseña. |
   | `AuditLog.Read.All` | Estado de MFA y actividad de inicio de sesión | Estado de registro de MFA, detalles del método de autenticación y actividad de inicio de sesión. |

   Puede otorgar `Directory.Read.All` en lugar de `User.Read.All`. Es más amplio: cubre los datos del usuario además de otros objetos del directorio. Otorgue `User.Read.All` a menos que su organización tenga una razón para preferir el contexto más amplio.
1. Haga clic en **Grant admin consent for \<your tenant name\>**. Para obtener más detalles, consulte [Grant tenant-wide admin consent][4].
1. Confirme que ambos permisos muestren una marca de verificación verde en la columna **Status**. Agregar un permiso no es lo mismo que otorgar consentimiento para él, y este es el paso que se omite con mayor frecuencia.

<div class="alert alert-info">Sin <code>AuditLog.Read.All</code>, el directorio sigue sincronizándose y los usuarios siguen apareciendo en el User Inventory, pero sus registros no incluyen el estado de MFA ni la actividad de inicio de sesión.</div>

### Agregar un registro de aplicación en Datadog {#add-an-app-registration-in-datadog}

1. En Datadog, vaya a **Cloud SIEM** > [**Content Packs**][5].
1. Filtre por **Entity Pack**, luego abra el Entity Pack de **Microsoft Entra ID**. Está marcado como **AVAILABLE** hasta que conecte un directorio.
1. Haga clic en **Add Account**.
1. En el cuadro de diálogo **Add App Registration**, seleccione un método de configuración:
   | Método | Úselo cuando |
   | --- | --- |
   | **Quickstart** | Desea que el script de instalación de Datadog configure la integración por usted a través de Azure Cloud Shell. |
   | **Terraform** | Usted administra la configuración de Azure como código. |
   | **Existing App Registration** | Ya configuró un registro de aplicación en Azure con los permisos necesarios, lo cual es el caso si siguió los pasos anteriores. |
1. El paquete de identidad muestra sus registros de su app de Azure. Seleccione aquel al que le otorgó permisos de Microsoft Graph y confirme que tiene habilitada la recopilación de recursos.
1. Si ve una advertencia como **6 aplicaciones de Azure tienen la recopilación de recursos deshabilitada.**, busque en la lista que aparece debajo el registro de la aplicación al que le otorgó permisos de Microsoft Graph. Un punto rojo significa que la recopilación de recursos está deshabilitada. Haga clic en **Configurar** junto a él, o abra el registro de la aplicación en **Integraciones** > [**Azure**][3], y active **Habilitar recopilación de recursos** en su pestaña **Recopilación de recursos**.

## Verifique la sincronización {#verify-the-sync}

La sincronización de Entra ID depende de la recopilación de recursos de Azure, por lo que los usuarios no aparecen en Cloud SIEM inmediatamente después de conectar un registro de aplicación.

Después de conectar y validar un registro de aplicación, el paquete de entidades se marca como **ACTIVO**. Abra su panel lateral en Cloud SIEM y verifique lo siguiente:

### Credenciales {#credentials}

La sección **Credenciales** muestra cuántas cuentas están conectadas y enumera cada una. Expanda una cuenta para ver:

| Campo | Qué le indica |
| --- | --- |
| **Suscripción** | El ID de suscripción de Azure que identifica esta cuenta. |
| **Creado el** | Cuándo se conectó la cuenta. |
| **Estado de sincronización** | Si la sincronización más reciente se completó; por ejemplo, `Synced`. |
| **Última sincronización** | Hace cuánto tiempo se ejecutó la sincronización más reciente. |
| **Duración de la última sincronización** | Cuánto tiempo tomó esa sincronización. |

Una insignia **SALUDABLE** junto al ID de suscripción significa que la cuenta se está sincronizando normalmente. Utilice el interruptor a la derecha de la cuenta para habilitar o deshabilitar la sincronización sin eliminar la cuenta.

Debajo de los detalles de sincronización, la cuenta lista sus aplicaciones de Azure por ID de cliente, con la cantidad de suscripciones que tiene cada una. Un punto verde significa que la recopilación de recursos está habilitada en ese registro de aplicación; un punto rojo significa que está deshabilitada. Cuando alguna está deshabilitada, una línea de resumen sobre la lista las cuenta, por ejemplo **6 aplicaciones de Azure tienen la recopilación de recursos deshabilitada.** Haga clic en **Configure** junto a un registro de aplicación para abrir su configuración y habilitar la recopilación de recursos.

La recopilación de recursos debe estar habilitada en el registro de la aplicación al que otorgó permisos de Microsoft Graph. Una cuenta puede mostrar **SALUDABLE** y **Sincronizado** mientras otros registros de aplicación en la lista, aún tienen la recopilación de recursos deshabilitada.

### Métricas clave{#key-metrics}

El tablero de **Métricas clave** muestra cuatro widgets:

- **Usuarios sincronizados**: La cantidad de usuarios cuyos atributos fueron actualizados por una sincronización. Esta es una medida de la rotación del directorio, no del tamaño del directorio, por lo que normalmente es mucho menor que su cantidad total de usuarios. Utilice la sección **Entidades** a continuación para obtener el total.
- **Usuarios por credencial**: La misma cantidad de usuarios actualizados, desglosada por cuenta conectada.
- **Historial de sincronización por credencial**: Sincronizaciones completadas a lo largo del tiempo. Los espacios indican sincronizaciones fallidas u omitidas.
- **Duración de la sincronización por credencial**: Cuánto tiempo tomó cada sincronización. Los picos aislados son normales; un aumento sostenido puede indicar un directorio en crecimiento o una limitación de Microsoft Graph en el lado de Azure.

Los widgets por credencial se agrupan por `credential_name`.

### Entidades {#entities}

La sección **Entidades** enumera los usuarios que este Paquete de entidades sincronizó, con **Nombre para mostrar**, **ID principal**, **Tipo de usuario** (por ejemplo, `human` o `service_account`) y **Estado de la cuenta** (por ejemplo, **ACTIVO**). El recuento de entidades es el número total de usuarios sincronizados en Cloud SIEM desde este directorio, por lo que es la cifra que debe comparar con el tamaño de su inquilino de Entra ID. La lista está limitada a un rango de tiempo, el cual puede cambiar. Haga clic en **View in User Inventory** para ver el [inventario completo][8].

Para confirmar que el contexto de identidad está llegando a sus señales, abra una señal atribuida a un usuario sincronizado y verifique que aparezca una píldora de usuario.

## Conectar inquilinos adicionales {#connect-additional-tenants}

Cada registro de aplicación cubre un inquilino de Entra ID. Para sincronizar inquilinos adicionales, repita el procedimiento de [Setup](#setup) en cada uno, luego haga clic en **Add App Registration** en la sección **Credenciales** del panel lateral de Entity Pack.

Cuando conecta varios inquilinos:

- Utilice el interruptor en cada cuenta para pausar la sincronización de un inquilino sin eliminar su cuenta.
- Otorgue permisos de Microsoft Graph y consentimiento de administrador por separado en cada inquilino. El consentimiento se aplica solo al inquilino donde lo otorga.
- Habilite la recopilación de recursos en cada registro de aplicación. Es una configuración por registro de aplicación, no una global.

## Solución de problemas {#troubleshooting}

### No aparecen usuarios {#no-users-appear}

Revise estas causas en orden:

| Causa | Cómo confirmar | Solución |
| --- | --- | --- |
| No ha pasado suficiente tiempo | Otorgó permisos o conectó el registro de la aplicación muy recientemente | Espere y verifique nuevamente. La sincronización de Entra ID depende de la recopilación de recursos de Azure, por lo que los usuarios no aparecen de inmediato. |
| Consentimiento de administrador no otorgado | La columna **Estado** en **Permisos de API** no muestra una marca de verificación verde para ambos permisos | Haga clic en **Grant admin consent for<tenant\>** y confirme ambas marcas de verificación. Agregar un permiso sin otorgar consentimiento para él no hace nada. |
| Recopilación de recursos deshabilitada | En la sección **Credenciales**, el registro de la aplicación al que otorgó permisos de Microsoft Graph tiene un punto rojo | Haga clic en **Configure** junto al registro de la aplicación, o ábralo en **Integrations** > [**Azure**][3], y active **Enable Resource Collection** en su pestaña **Recopilación de recursos**. |
| No hay ninguna suscripción configurada | En la sección **Credenciales**, o en la lista de registros de aplicaciones en **Integrations** > [**Azure**][3], el registro de la aplicación muestra **0 suscripciones** | Configure al menos una suscripción, incluso si no la utiliza de otra manera. |
| Se seleccionó el registro de aplicación incorrecto | El registro de la aplicación seleccionado en el Entity Pack no es al que otorgó permisos de Graph | Seleccione el registro de la aplicación al que otorgó permisos, o otorgue los permisos en el que seleccionó. |
| El directorio está vacío | El inquilino de Entra ID no contiene usuarios | Conecte un inquilino que tenga usuarios. Un directorio vacío se sincroniza correctamente y produce un inventario de usuarios vacío. |
| Mirando el número incorrecto | **Usuarios sincronizados** indica cero o un número muy bajo | Verifique el recuento de **Entidades** en su lugar. **Usuarios sincronizados** solo cuenta a los usuarios cuyos atributos fueron modificados por una sincronización, por lo que muestra un número bajo en un directorio estable incluso cuando la sincronización es correcta. |

### Falta el estado de MFA o la actividad de inicio de sesión {#mfa-status-or-sign-in-activity-is-missing}

`AuditLog.Read.All` no se ha concedido o no se ha otorgado consentimiento para ello. En el portal de Azure, abra **Permisos de API** del registro de la aplicación y confirme que el permiso aparece en la lista con una marca de verificación verde en **Estado**. Los perfiles de usuario se sincronizan sin esto; el estado de registro de MFA y la actividad de inicio de sesión no.

### Errores de permiso denegado {#permission-denied-errors}

- Confirme que la cuenta de Azure que otorgó el consentimiento posee el rol de **Administrador de roles con privilegios** o **Administrador global**. Los roles con menos privilegios pueden agregar una solicitud de permiso, pero no pueden otorgar consentimiento para ella.
- Confirme que su cuenta de Datadog tiene **Administrador de entidades SIEM** y **Integrations Manage**. Consulte [Entity Packs][9].

### Una cuenta funcionaba y ya no está SALUDABLE{#an-account-was-working-and-is-no-longer-healthy}

Las causas más comunes son cambios en el lado de Azure:

- El secreto de cliente del registro de la aplicación expiró o fue rotado. Los secretos de cliente de Azure tienen una vida útil finita, por lo que este es el error que se debe esperar primero en una conexión que funcionó durante meses y luego se detuvo.
- El registro de la aplicación fue eliminado, o sus permisos de Microsoft Graph o el consentimiento del administrador fueron revocados.
- La recopilación de recursos fue deshabilitada en el registro de la aplicación.

Para ver mensajes de error específicos, abra el registro de la aplicación en **Integrations** > [**Azure**][3] y revise su pestaña **Issues**.

### No aparece ninguna píldora de usuario en las señales {#no-user-pill-appears-on-signals}

El contexto de identidad se vincula a los eventos mediante la dirección de correo electrónico. Si un usuario sincronizado no tiene una píldora en su actividad, confirme que los registros de esa fuente completan el campo de correo electrónico del usuario y que la canalización OCSF de la fuente esté activa. Consulte [Open Cybersecurity Schema Framework][6].

Un paquete de entidades no requiere la integración de registros correspondiente, y viceversa. Si está sincronizando el directorio pero no ve actividad de Entra ID para adjuntarlo, es posible que también necesite enviar registros de Entra ID a Datadog.

Si aún necesita ayuda, comuníquese con el [soporte de Datadog][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://learn.microsoft.com/en-us/graph/api/resources/users
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent
[5]: https://app.datadoghq.com/security/siem/content-packs
[6]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[7]: /es/help/
[8]: /es/security/cloud_siem/triage_and_investigate/user_inventory/
[9]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/
[10]: /es/getting_started/integrations/azure/