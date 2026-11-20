---
description: Administre usuarios, Teams, autenticación, claves de API, roles y configuraciones
  de seguridad para su organización de Datadog desde la sección Configuración de la
  organización.
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de API y de aplicación
- link: /account_management/users/
  tag: Documentación
  text: Gestión de usuarios
title: Configuración de la organización
---
## Descripción general {#overview}
La sección Configuración de la organización está disponible para [Administradores][1] haciendo clic en {{< ui >}}Organization Settings{{< /ui >}} desde el menú de la cuenta en la parte inferior de la navegación del lado izquierdo o seleccionando {{< ui >}}Organization Settings{{< /ui >}} desde el menú desplegable del encabezado en la parte superior de la página Configuración personal.

{{< img src="account_management/org_settings/nav.png" alt="Navegue a su Configuración de la organización en Datadog" style="width:80%;" >}}

La Configuración de la organización le permite administrar usuarios, grupos, RBAC, claves y tokens. Esta página describe cada sección y dónde en la documentación puede obtener información sobre tareas específicas en {{< ui >}}Organization Settings{{< /ui >}}.

## Identidad y cuentas {#identity-accounts}

### Usuarios {#users}

Lea la documentación de [gestión de usuarios][2] para agregar, editar y deshabilitar usuarios.

### Teams {#teams}

Lea la documentación de [Teams][3] para administrar Teams para organizar sus recursos dentro de Datadog.

### Cuentas de servicio {#service-accounts}


Las [cuentas de servicio][4] son cuentas no interactivas que puede usar para poseer claves de aplicación y otros recursos que se comparten entre sus equipos. Las claves de aplicación de las cuentas de servicio solo pueden ser vistas una vez por la persona que creó la clave. Puede usar cuentas de servicio para acceder a las API de Datadog sin asociar su aplicación o script con una persona en particular.

## Autenticación {#authentication}

### Métodos de inicio de sesión {#login-methods}


La pestaña {{< ui >}}Login Methods{{< /ui >}} muestra la configuración de autenticación de contraseña, Google y SAML. Puede alternar cada una con los menús desplegables {{< ui >}}Enabled by Default{{< /ui >}}. Para que sea "SAML Strict" o estricto para cualquier otro tipo de inicio de sesión, deshabilite los otros tipos de métodos de inicio de sesión. Puede permitir anulaciones por usuario en la pestaña Gestión de usuarios para permitir que los usuarios inicien sesión con otro método de inicio de sesión si es necesario.

Lea la [documentación sobre la configuración de métodos de inicio de sesión][5] para autenticar a los usuarios que inician sesión en su organización de Datadog.

#### Configuración de SAML {#saml-settings}

Para obtener información sobre cómo configurar SAML, lea la [documentación sobre inicio de sesión único con SAML][6].

### Asignaciones de grupos SAML {#saml-group-mappings}

Cuando se habilita, a los usuarios que inician sesión con SAML en su cuenta de Datadog se les eliminan permanentemente sus roles actuales y se les reasignan nuevos roles. La aserción SAML transmitida desde el proveedor de identidad y las asignaciones que cree determinan los nuevos roles de cada usuario.

A los usuarios que inician sesión con SAML y no tienen valores que se asignen a un rol de Datadog se les eliminan permanentemente todos los roles. Es posible que ese usuario ya no pueda iniciar sesión.
Para obtener información sobre cómo crear y establecer asignaciones, lea la [documentación sobre la asignación de atributos SAML][7].

## Acceso {#access}

### Claves de API {#api-keys}

Esta sección le permite ver, copiar y revocar cualquier clave de API de la lista. Sus claves de API son únicas para su organización. El Datadog Agent requiere una clave de API para enviar métricas y eventos a Datadog. Lea la [documentación sobre claves de API][8] para obtener más información sobre cómo crear, editar y revocar claves.

### Claves de aplicación {#application-keys}

Puede filtrar las claves de aplicación por nombre, ID o propietario, o hacer clic en el interruptor {{< ui >}}Only My Keys{{< /ui >}} para visualizar solo las claves de aplicación que usted posee. Lea la [documentación sobre claves de aplicación][8] para obtener más información sobre cómo agregar y eliminar claves.

### Roles {#roles}

Para obtener información sobre los roles predeterminados y personalizados en Datadog, lea la [documentación sobre Access Control basado en roles][9].

### Remote Configuration {#remote-configuration}

Para obtener información sobre cómo configurar de forma remota el comportamiento de los componentes de Datadog implementados en su infraestructura, lea [Cómo funciona Remote Configuration][10].

### Tokens de cliente {#client-tokens}

Los tokens de cliente se utilizan para enviar eventos y registros desde las aplicaciones web y móviles de sus usuarios. Son únicos para su organización. Eliminar un token de cliente que está vinculado a una aplicación RUM hace que su aplicación RUM deje de informar. El [proceso para crear tokens de cliente][11] es similar al de las claves de API y de aplicación.

### Correos electrónicos de la API de eventos {#events-api-emails}

Si su aplicación no tiene una integración de Datadog existente y no desea crear un custom Agent check, puede enviar eventos por correo electrónico. Para obtener información sobre cómo configurar los correos electrónicos de la API de eventos, lea la [guía de eventos por correo electrónico][12].

### Pruebas Synthetic {#synthetic-tests}

Aprenda a acceder y controlar la [configuración de Synthetic Monitoring][13].

### MCP Server {#mcp-server}

Administre cómo los agentes y herramientas de IA acceden a los datos de Datadog de su organización a través del [Datadog MCP Server][18]:

- Habilite o deshabilite el [acceso a toda la organización][19] al MCP Server y sus herramientas y, por separado, el acceso de escritura para las herramientas que crean o modifican recursos.
- Configure [URL de redireccionamiento][20] para la autenticación OAuth con el MCP Server.

## Security {#security}

### Safety Center {#safety-center}

La página [**Safety Center**][14] contiene alertas de seguridad, advertencias y recomendaciones para revisar en su organización.

### Uso compartido público {#public-sharing}

La pestaña {{< ui >}}Public Sharing{{< /ui >}} incluye configuraciones para toda la organización sobre el uso compartido, junto con listas de tableros y gráficos compartidos. Puede habilitar las funciones de uso compartido de forma granular y configurar opciones de seguridad adicionales, como establecer una duración máxima de invitación.

Para aplicar la configuración de uso compartido en todas sus organizaciones, comuníquese con [Datadog Support][16].

**Nota**: Se requiere el permiso OrgAdmin para visualizar y administrar la configuración y los recursos de uso compartido.

### Acceso móvil y de terceros {#mobile-and-third-party-access}

La página [**Acceso móvil y de terceros**][15] le permite visualizar y administrar aplicaciones móviles y de terceros en su organización.

## Compliance {#compliance}

### Audit trail {#audit-trail}

La pestaña {{< ui >}}Audit Trail{{< /ui >}} en la página de Configuración de la organización abre una nueva pestaña hacia el Explorador de eventos de auditoría.

### Configuración de audit trail {#audit-trail-settings}

La pestaña {{< ui >}}Audit Trail Settings{{< /ui >}} le permite establecer el período de retención de los audit trails y habilitar el archivado en otros servicios de almacenamiento en la nube.

### Configuración de SMTP {#smtp-configuration}

La página [**Configuración de SMTP**][17] le permite conectar su propio servidor SMTP para que los correos electrónicos de suscripción a la página de estado se envíen desde su propio dominio.

## General {#general}

### Preferencias {#preferences}

#### Nombre de la organización {#organization-name}

Para cambiar el nombre de su organización, haga clic en el botón {{< ui >}}Edit{{< /ui >}} en la pestaña {{< ui >}}Preferences{{< /ui >}} de {{< ui >}}Organization Settings{{< /ui >}}, ingrese el nuevo nombre y luego haga clic en el botón {{< ui >}}Save{{< /ui >}}.

**Nota**: El nombre de su organización no debe exceder los 32 caracteres.

#### Página de inicio de Datadog {#datadog-homepage}

Puede elegir configurar la página de inicio de su organización como Dashboard List o como un tablero individual.

#### Períodos de retención fuera de contrato para índices de registro {#out-of-contract-retention-periods-for-log-indexes}

Los usuarios con `Org Management` permiso pueden habilitar la función de períodos de retención fuera de contrato para los índices de registro. Esta función se habilita por organización. Esto significa que si un usuario habilita la función en una organización principal, la función no se habilita automáticamente para todas las organizaciones secundarias.

{{< img src="account_management/out-of-contract-retention.png" alt="La configuración de períodos de retención fuera de contrato para índices de registro que se muestra habilitada." style="width:70%;" >}}

Cuando está habilitado, los usuarios con el permiso `Modify Index` pueden elegir cualquiera de los períodos de retención de 3, 7, 15, 30, 45 y 60 días, incluso si no está en el contrato. Esto puede ser útil al diagnosticar un posible problema persistente o al cumplir con los requisitos de cumplimiento para los cuales los clientes necesitan un período de retención mayor que no forma parte del contrato actual.

**Nota**: El uso de períodos de retención fuera de contrato genera cargos bajo demanda. Si se utiliza con frecuencia un período de retención fuera de contrato, Datadog recomienda que los clientes se comuniquen con su gerente de cuenta para que lo agregue a su contrato.

#### Configuración de la duración máxima de la sesión {#max-session-duration-configuration}

Los usuarios con el permiso `Org Management` pueden establecer una duración máxima de sesión para su organización. La duración se aplica a todas las sesiones web nuevas creadas después de cambiarla, para todos los usuarios, independientemente de su rol en la organización. No se aplica a las sesiones de la aplicación móvil de Datadog.

La duración de la sesión se puede configurar dentro de los siguientes límites:
- **Duración mínima:** 1 hora
- **Duración máxima:** {{< region-param key=org_management_max_session_duration >}}

{{< img src="account_management/org_settings/max_session_duration.png" alt="Configuración de la duración máxima de la sesión" style="width:70%;" >}}

#### Configuración de la duración de la sesión por tiempo de inactividad {#idle-time-session-duration-configuration}

Los usuarios con el permiso `Org Management` pueden habilitar o deshabilitar el tiempo de espera de sesión por inactividad para su organización. Cuando está habilitado, los usuarios cierran sesión automáticamente después de 30 minutos de inactividad. La configuración se aplica a todas las sesiones web nuevas creadas después de que usted la cambie, y a todos los usuarios, independientemente de su rol en la organización. No se aplica a las sesiones de la aplicación móvil de Datadog.

{{< img src="account_management/org_settings/idle_session_timeout.png" alt="Configuración de tiempo de espera de sesión inactiva" style="width:70%;" >}}

## Lecturas adicionales {#further-reading}

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
[10]: /es/remote_configuration#how-it-works
[11]: /es/account_management/api-app-keys/#client-tokens
[12]: /es/events/guides/email/
[13]: /es/synthetics/settings/?tab=specifyvalue#overview
[14]: /es/account_management/safety_center
[15]: /es/account_management/org_settings/mobile_third_party_access
[16]: /es/help/
[17]: /es/account_management/org_settings/smtp_configuration
[18]: /es/mcp_server/
[19]: /es/mcp_server/setup/#required-permissions
[20]: /es/mcp_server/setup/#adding-oauth-clients