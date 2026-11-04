---
description: Sincronice su directorio de usuario en Cloud SIEM para agregar contexto
  de identidad a las señales, los riesgos y las investigaciones.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentación
  text: Configure el Entity Pack de identidad de Okta
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
- link: /security/cloud_siem/ingest_and_enrich/content_packs/
  tag: Documentación
  text: Obtenga más información sobre Cloud SIEM Content Packs.
- link: /security/cloud_siem/triage_and_investigate/investigator/
  tag: Documentación
  text: Obtenga más información sobre el Investigator
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Revise los permisos de roles de Datadog
title: Paquetes de entidades
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Los Entity Packs no están disponibles para el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Descripción general {#overview}

Un paquete de entidades es un tipo de [Cloud SIEM Content Pack][1] que sincroniza su directorio de usuario en Cloud SIEM.
- **Content Packs** incorporan contenido de seguridad basado en registros, como reglas de detección y paneles.
- **Entity Packs** incorporan los registros de identidad detrás de esa actividad, para que Cloud SIEM pueda indicarle a *quién* se refiere una señal, no solo *lo que* sucedió.

Cuando un paquete de entidades está activo, Cloud SIEM correlaciona los usuarios del directorio y sus atributos con sus registros y señales de seguridad. Cada paquete de entidades incluye:

- **Sincronización automatizada**: Cloud SIEM sincroniza a los usuarios y sus atributos desde su proveedor de identidad para que permanezcan actualizados.
- **[User Inventory][2]**: Explore, busque y filtre los usuarios sincronizados con Cloud SIEM. Vea los atributos de un usuario, incluidos el nombre para mostrar, el ID principal, el tipo de usuario y el estado de la cuenta. Investigue todas las señales, los riesgos y los registros asociados con sus usuarios.
- **Píldora de usuario en Signals**: Contexto de identidad adjunto directamente a una señal de seguridad, para que pueda ver a quién involucra la señal mientras la clasifica.
- **Acumulación de riesgo de usuario en [Entity Risks][8]**: Las puntuaciones de riesgo se agregan por usuario, para que pueda ver el riesgo total de un solo usuario en todas las señales en lugar de leer las señales una por una.

<div class="alert alert-info">Los paquetes de entidades sincronizan los datos del directorio de usuario, lo que incluye datos personales como nombres y direcciones de correo electrónico. Revise los requisitos de privacidad de su organización antes de conectar un directorio.</div>

## Paquetes de entidades disponibles {#available-entity-packs}

Cloud SIEM admite los siguientes paquetes de entidades:

| Paquete de entidades | Directorio sincronizado | Tipo de credencial |
|---|---|---|
| [Okta Identity][3] | Usuarios de Okta y sus atributos | Dominio de Okta y token de API |
| [Google Workspace Identity][4] | Usuarios de Google Workspace y sus atributos | Archivo de clave JSON de cuenta de servicio |
| [Microsoft Entra ID][5] | Usuarios de Microsoft Entra ID y sus atributos | Registro de aplicación de Azure |

Para encontrarlos en Datadog, vaya a **Cloud SIEM** > [**Content Packs**][6]. Luego, filtre por paquetes de entidades, ya sea buscando `type:entityPack` o haciendo clic en el filtro **paquete de entidades**.

## Requisitos previos {#prerequisites}

### Permisos {#permissions}

Los paquetes de entidades utilizan los siguientes permisos. Un usuario con el [Datadog Admin Role][7] puede otorgarlos a una cuenta de usuario.

| Permiso | Lo que permite |
|---|---|
| **Notificación de entidades de SIEM** | Los usuarios con este permiso pueden modificar las notificaciones de Riesgos de entidad. |
| **SIEM Entities Read** |  Vea los usuarios sincronizados en el Inventario de usuarios, vea la píldora de usuario en las señales y en Entity Risks, y abra un panel lateral del paquete de entidades. |
| **SIEM Entities Admin** | : Todo lo que permite **SIEM Entities Read**, además de conectar un directorio de usuarios, agregar y eliminar credenciales, y habilitar o deshabilitar la sincronización. |
| **Integrations Manage** | : Requerido solo para el paquete de entidades de Microsoft Entra ID, para configurar la suscripción de Azure y la recopilación de recursos. |

Cada usuario que trabaja con contexto de identidad necesita **SIEM Entities Read** o **SIEM Entities Admin**. Si a un usuario le falta uno de estos permisos:

- El Inventario de usuarios está vacío, incluso cuando un paquete de entidades está activo y sincronizándose.
- La píldora de usuario no aparece en las señales ni en Entity Risks.
- Los paneles laterales del paquete de entidades no se abren desde la interfaz de Content Packs.

<div class="alert alert-info">Otorgue <strong>SIEM Entities Read</strong> a sus analistas como parte de la implementación de un paquete de entidades. Sin ese permiso, aunque el directorio se sincronice correctamente, los analistas que carezcan de dicho permiso no podrán ver el contexto de identidad que proporciona. Si el Inventario de usuarios está vacío, verifique los permisos antes de solucionar problemas de sincronización.</div>

### Acceso al proveedor de identidad {#identity-provider-access}

Para configurar un paquete de entidades, también necesita acceso administrativo al proveedor de identidad que desea conectar, suficiente para crear la credencial que requiere el paquete de entidades. Cada Paquete de entidades utiliza un tipo de credencial diferente:

- Okta Identity requiere un dominio de Okta y un token de API.
- Google Workspace Identity requiere un archivo de clave JSON de cuenta de servicio de Google, su dominio y una dirección de correo electrónico de administrador de Workspace.
- Microsoft Entra ID requiere un registro de aplicación de Azure. Puede crear uno con el script de inicio rápido proporcionado o con Terraform, o conectar un registro de aplicación que ya tenga los permisos necesarios.

Para conocer los permisos y alcances exactos del lado del proveedor que necesita cada credencial, consulte la página de configuración de ese paquete de entidades.

### Integraciones de registros {#log-integrations}

Un paquete de entidades no requiere la integración de registros ni el Content Pack correspondiente, y el Content Pack correspondiente no requiere el paquete de entidades. Puede sincronizar su directorio de usuarios de Okta con el paquete de entidades de Okta Identity sin enviar ningún registro de Okta a Datadog.

Ambos siguen funcionando mejor juntos: el paquete de entidades proporciona el contexto de identidad y el Content Pack basado en registros proporciona la actividad a la que Cloud SIEM adjunta ese contexto. Configure ambos para obtener contexto de identidad en las señales generadas a partir de los registros de un proveedor.

## Estados del paquete de entidades {#entity-pack-states}

Al igual que otros Content Packs, cada paquete de entidades aparece como un mosaico en la interfaz de Content Packs y tiene dos estados. Abrir el panel lateral de un mosaico requiere el permiso **SIEM Entities Read** o **SIEM Entities Admin**.

### Disponible{#available}

Un paquete de entidades que aún no ha conectado está marcado como **Disponible**. Su panel lateral muestra lo que proporciona el paquete de entidades después de habilitarlo y le permite conectar su directorio de usuarios. Haga clic en **Agregar credenciales** (o **Agregar cuenta** para Microsoft Entra ID) para comenzar la configuración. Conectar un directorio requiere el permiso **SIEM Entities Admin**.

### Activo {#active}

Después de conectar una credencial y de que Datadog la valide, el paquete de entidades se marca como **Activo**. Su panel lateral muestra el estado del paquete de entidades:

- **Credenciales**: cada cuenta conectada, con su dominio, estado de validación, estado de habilitado o deshabilitado, hora de la última actualización, estado de sincronización, hora de la última sincronización y duración de la última sincronización. Puede agregar cuentas adicionales o habilitar y deshabilitar la sincronización para una cuenta individual.
- **Métricas clave**: un tablero interactivo que muestra los usuarios sincronizados, los usuarios por credencial, el historial de sincronización por credencial y la duración de la sincronización por credencial.
- **Entidades**: los usuarios sincronizados por este paquete de entidades, con nombre para mostrar, ID principal, tipo de usuario (por ejemplo, `human` o `service_account`) y estado de la cuenta. Haga clic en **Visualizar en el inventario de usuarios** para ver el inventario completo.

Utilice las secciones **Métricas** y **Credenciales** para confirmar que una sincronización esté actualizada y que la credencial siga siendo válida.

## Configure un paquete de entidades {#set-up-an-entity-pack}

Los pasos de configuración difieren según el proveedor de identidad. Siga la guía para el directorio que está conectando:

- [Paquete de entidades de identidad de Okta][3]
- [Paquete de entidades de identidad de Google Workspace][4]
- [Paquete de entidad de Microsoft Entra ID][5]

Cada guía explica cómo crear la credencial en su proveedor de identidad, cómo agregarla en Datadog y cómo probar la conexión.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/ingest_and_enrich/content_packs/
[2]: /es/security/cloud_siem/triage_and_investigate/user_inventory/
[3]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /es/account_management/rbac/
[8]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/