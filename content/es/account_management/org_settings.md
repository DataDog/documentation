---
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de API y aplicación
- link: /account_management/users/
  tag: Documentación
  text: Gestión de usuarios
title: Parámetros de organización
---
## Información general
Los [administradores][1] pueden acceder a los parámetros de organización haciendo clic en **Organization Settings**, en el menú de la cuenta que aparece en la parte inferior del panel izquierdo de navegación, o seleccionando **Organization Settings** en el menú desplegable de la página Personal Settings (Parámetros personales).

Desde Organization Settings, puedes gestionar usuarios, grupos, la configuración del control de acceso basado en roles (RBAC), claves y tokens. En esta página, se describen todas las secciones y se indica dónde encontrar información sobre tareas específicas de **Organization Settings** en la documentación.

## Identidad y cuentas

### Usuarios

Lee la documentación sobre la [gestión de usuarios][2] para añadir, editar y desactivar usuarios.

### Equipos

Lee la documentación sobre los [equipos][3] para gestionar equipos y organizar tus activos en Datadog.

### Cuentas de servicio


Las [cuentas de servicio][3] son cuentas no interactivas que puedes usar para tener claves de aplicación y otros recursos compartidos en tus equipos. Las claves de aplicación de cuentas de servicio solo las puede ver una vez la persona que las creó. Puedes utilizar cuentas de servicio para acceder a las API de Datadog sin asociar tu aplicación ni tu script a una persona concreta.

## Autenticación

### Métodos de inicio de sesión


La pestaña **Login Methods** muestra los parámetros de autenticación mediante contraseña, Google y SAML. Puedes activarlos todos con los desplegables **Enabled by Default** (Activados de forma predeterminada). Si quieres elegir la configuración "SAML Strict" o estricta para cualquier otro tipo de inicio de sesión, desactiva primero los otros tipos de métodos de inicio de sesión. También puedes permitir las anulaciones por parte de usuarios en la pestaña User Management (Gestión de usuarios). Así, los usuarios podrán iniciar sesión con otro método si es necesario.

Lee la documentación sobre la [configuración de métodos de inicio de sesión][5] para autenticar a los usuarios de forma que puedan iniciar sesión en tu organización de Datadog.

#### Parámetros SAML

Para saber cómo debes configurar SAML, consulta la [documentación sobre el inicio de sesión único con SAML][6].

### Asignación de grupos SAML

Cuando se habilita esta función, los usuarios que inician sesión a través de SAML en tu cuenta de Datadog pierden sus roles actuales y se les asignan unos nuevos. La aserción SAML que transmite el proveedor de identidad y las asignaciones que creas determinan los nuevos roles de los usuarios.

Los usuarios que inician sesión a través de SAML y no tienen valores que correspondan a un rol de Datadog pierden todos los roles y no se les permite entrar a la aplicación.
Para descubrir cómo crear y configurar asignaciones, consulta la [documentación sobre asignación de atributos SAML][7].

## Access

### Claves de API

En esta sección, puedes ver, copiar y revocar cualquier clave de API de la lista. Tus claves de API son específicas de tu organización. El Datadog Agent necesita una clave de API para enviar métricas y eventos a Datadog. Consulta la [documentación acerca de las claves de API][8] para obtener más información sobre cómo crear, editar y revocar claves.

### Claves de aplicación

Puedes filtrar las claves de aplicación por nombre, ID o propietario haciendo clic en el conmutador **Only My Keys** (Solo mis claves) para ver únicamente tus claves de aplicación. Consulta la [documentación acerca de las claves de aplicación][8] para obtener más información sobre cómo añadir y revocar claves.

### Roles

Para obtener más información sobre los roles predeterminados y personalizados de Datadog, consulta [la documentación acerca del control de acceso basado en roles][9].

### Configuración remota

Para obtener más información sobre cómo configurar de forma remota el comportamiento o los componentes de Datadog desplegados en tu infraestructura, lee [Cómo funciona la configuración remota][10].

### Tokens de cliente

Los tokens de cliente pertenecen de forma exclusiva a tu organización y se usan para enviar eventos y logs desde las aplicaciones web y móviles de tu usuario. Borrar un token de cliente asociado a una aplicación de RUM hace que dicha aplicación deje de enviar informes. El [proceso para crear tokens de cliente][11] es similar al que se usa para las claves de API y aplicación.

### Correos electrónicos de la API de eventos

Si tu aplicación no cuenta con una integración de Datadog, y no quieres crear un check del Agent personalizado, puedes enviar eventos con el correo electrónico. Para obtener información sobre cómo configurar correos electrónicos de la API de eventos, consulta la [guía de eventos con correo electrónico][12].

## Productos

### Logs


##### Períodos de retención fuera de contrato en los índices de logs

Los usuarios con el permiso `Org Management` pueden activar la función de los períodos de retención fuera de contrato en los índices de logs. Esta función se activa por organización; por tanto, aunque un usuario la active en una organización principal, no se habilitará automáticamente en las organizaciones secundarias.

{{< img src="account_management/out-of-contract-retention.png" alt="Función de los períodos de retención fuera de contrato en los índices de logs activada." style="width:70%;" >}}

Cuando se activa esta función, los usuarios con el permiso `Modify Index` pueden elegir entre períodos de retención de 3, 7, 15, 30, 45 y 60 días, incluso si no es lo que corresponde por contrato. Esto puede resultar útil cuando hay que solucionar un problema que viene de atrás o cuando un cliente deba cumplir determinados requisitos para los que necesite un período de retención superior al estipulado por contrato.

**Nota**: Los períodos de retención fuera de contrato implican cargos específicos. Si se usan de forma regular, Datadog recomienda que el cliente se ponga en contacto con el gestor de su cuenta para que los añada al contrato.

### Monitores

#### Preferencia de zona horaria del monitor


Los usuarios con el permiso `Org Management` pueden personalizar la zona horaria en las snapshots del gráfico de alertas, en las notificaciones de alertas del monitor.

{{< img src="account_management/monitors-time-zone-preference.png" alt="Preferencia de zona horaria del monitor" style="width:70%;" >}}

Este parámetro se aplica a **todas** las notificaciones de alertas del monitor y afecta a toda la organización.

### Tests Synthetic

Obtén información acerca de cómo acceder y controlar los [parámetros de la monitorización Synthetic][13].

## Seguridad

### Centro de seguridad

La página **Safety Center** (Centro de seguridad) contiene alertas de seguridad, advertencias y recomendaciones para revisar en tu organización. También puedes configurar **Security Contacts** (Contactos de seguridad) a fin de recibir notificaciones de seguridad para tu organización. Para ello, haz clic en **Configuration* (Configuración), introduce hasta dos direcciones de correo electrónico y haz clic en el botón **Save** (Guardar).

### Uso compartido público

La pestaña **Public Sharing** (Uso compartido público) incluye una lista de dashboards y gráficas compartidas. Recuerda que puedes editar los parámetros para compartir haciendo clic en los conmutadores de activación **Enabled**.

### Python

La página [**OAuth Apps**][14] te permite ver o gestionar aplicaciones de OAuth de tu organización.

## Cumplimiento

### Traza de auditoría

La pestaña **Audit Trail** (Traza de auditoría) de la página Organization Settings (Parámetros de organización) abre una nueva pestaña que te dirige al navegador de eventos de auditoría.

### Parámetros de las trazas de auditoría

La pestaña de **Audit Trail Settings** (Parámetros de las trazas de auditoría) te permite definir el período de retención de las trazas de auditoría y activar la función para que se archiven en otros servicios de almacenamiento en la nube.

## General

### Preferencias

#### Nombre de la organización

Para cambiar el nombre de tu organización, haz clic en el botón **Edit** (Editar) de la pestaña **Preferences** (Preferencias) de **Organization Settings** (Parámetros de organización), indica el nuevo nombre y haz clic en el botón **Save** (Guardar).

**Nota**: El nombre de tu organización no puede superar los 32 caracteres.

#### Página de inicio de Datadog

Puedes elegir si quieres que la página de inicio de tu organización sea una lista de dashboards o un único dashboard.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/users/default_roles/
[2]: /es/account_management/users/
[3]: /es/account_management/teams/?s=login%20methods
[4]: /es/account_management/org_settings/service_accounts
[5]: /es/account_management/login_methods/
[6]: /es/account_management/saml/
[7]: /es/account_management/saml/mapping
[8]: /es/account_management/api-app-keys/
[9]: /es/account_management/rbac/
[10]: /es/agent/remote_config/?tab=configurationyamlfile#how-it-works
[11]: /es/account_management/api-app-keys/#client-tokens
[12]: /es/service_management/events/guides/email/
[13]: /es/synthetics/settings/?tab=specifyvalue#overview
[14]: /es/account_management/org_settings/oauth_apps