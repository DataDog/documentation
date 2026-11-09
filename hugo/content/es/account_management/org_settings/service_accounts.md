---
description: Cree y administre cuentas de servicio no interactivas para scripts automatizados
  y claves de aplicación compartidas entre equipos con controles de acceso seguros.
further_reading:
- link: /account_management/service-access-tokens/
  tag: Documentación
  text: Tokens de acceso de servicio
- link: https://docs.datadoghq.com/api/latest/service-accounts/
  tag: Documentación
  text: Referencia de la API de Cuentas de servicio
title: Cuentas de servicio
---
## Descripción general {#overview}

Las cuentas de servicio son cuentas no interactivas que puede usar para poseer claves de aplicación y otros recursos que se comparten entre sus equipos. Las claves de aplicación de las cuentas de servicio solo pueden ser vistas una vez por la persona que creó la clave.

Suponga que un empleado de su empresa configura un script automatizado para enviar solicitudes a la Datadog API, utilizando su clave de aplicación personal. Cuando ese empleado deja la empresa, usted desactiva su cuenta de Datadog y su clave de aplicación deja de funcionar. El script automatizado también deja de funcionar, hasta que alguien lo actualiza con una clave de aplicación válida. Usar una clave de aplicación de cuenta de servicio en lugar de una clave de aplicación personal para solicitudes automatizadas a la Datadog API evita este problema.

## Navigation {#navigation}

Las cuentas de servicio se encuentran en [Organization Settings][1]. 

Para acceder a las cuentas de servicio en la interfaz de usuario:

1. Navegue a {{< ui >}}Organization Settings{{< /ui >}} desde el menú de su cuenta.
2. En {{< ui >}}Accounts{{< /ui >}}, seleccione {{< ui >}}Service Accounts{{< /ui >}}.

La [página Service Accounts][2] contiene una lista de todas las cuentas de servicio de su organización. Los usuarios con el permiso Service Account Write, incluidos los usuarios con el rol Datadog Admin, pueden crear cuentas de servicio. Los usuarios sin el permiso de Write de cuenta de servicio ven una vista de solo lectura.

### Visualizar cuentas de servicio {#view-service-accounts}

De forma predeterminada, la página Service Accounts muestra solo las cuentas de servicio activas. Para incluir cuentas de servicio deshabilitadas en la lista a continuación, seleccione {{< ui >}}Disabled{{< /ui >}}.

Use el cuadro de búsqueda en la parte superior de la página para filtrar las cuentas de servicio. El filtro busca en los campos de nombre, correo electrónico y rol.

Haga clic en una cuenta para acceder a una vista detallada del panel lateral con la siguiente información: 

- Estado (activo o deshabilitado)
- Fechas de creación y última modificación
- Roles
- Claves de aplicación
- Permisos

### Crear cuenta de servicio {#create-service-account}

Para crear una cuenta de servicio, realice los siguientes pasos:

1. Haga clic en {{< ui >}}New Service Account{{< /ui >}}. Aparece un cuadro de diálogo.
2. Ingrese un nombre y una dirección de correo electrónico para su cuenta de servicio.
3. Utilice el menú desplegable {{< ui >}}Assign Roles{{< /ui >}} para elegir uno o más roles para su cuenta de servicio.
4. Para guardar, haga clic en {{< ui >}}Create Service Account{{< /ui >}}.

A diferencia de las direcciones de correo electrónico de los usuarios de Datadog, las direcciones de correo electrónico de las cuentas de servicio no necesitan ser únicas en toda la organización.

### Editar cuenta de servicio {#edit-service-account}

Para modificar una cuenta de servicio, haga clic en una de la lista de cuentas de servicio. 

1. En el panel lateral, haga clic en {{< ui >}}Edit{{< /ui >}} junto al nombre de la cuenta de servicio. Aparece un cuadro de diálogo.
2. Actualice los campos que desea cambiar. Puede editar el nombre, la dirección de correo electrónico, el estado y los roles.
3. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para deshabilitar una cuenta de servicio, el usuario debe tener el permiso User Manage Access además de Service Account Write.

Para deshabilitar una cuenta de servicio, siga el procedimiento anterior para editar la cuenta de servicio y establezca el estado en {{< ui >}}Disabled{{< /ui >}}.

### Service Access Tokens {#service-access-tokens}

[Los Service Access Tokens (SATs)][4] son la forma recomendada de autenticar las llamadas a Datadog API desde
una cuenta de servicio. Los SAT tienen un alcance definido, son opcionalmente de larga duración y autónomos; no requieren una clave de API.

Para crear un SAT para una cuenta de servicio:

1. Vaya a [**Organization Settings** > **Service Accounts**][2] y haga clic en una cuenta de servicio. Aparece el panel de detalles.
2. En **Access Tokens**, haga clic en {{< ui >}}\+ New Token{{< /ui >}}.
3. Siga los pasos de [Crear un Service Access Token][5].

**Nota:** Cada cuenta de servicio puede tener hasta 500 SATs.

### Crear o revocar claves de aplicación {#create-or-revoke-application-keys}

Para crear o revocar claves de aplicación de cuenta de servicio, seleccione una cuenta de la lista de cuentas de servicio. Aparece el panel lateral de la cuenta de servicio.

Para crear una nueva clave de aplicación, siga los pasos a continuación:

- Haga clic en {{< ui >}}New Key{{< /ui >}}. Aparece un cuadro de diálogo.
- Asigne a la clave un nombre descriptivo.
- Haga clic en {{< ui >}}Create Key{{< /ui >}}. 

El cuadro de diálogo se actualiza y le muestra la clave. Copie y pegue la clave en la ubicación deseada. Después de cerrar el cuadro de diálogo, no podrá recuperar el valor de la clave.

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Las claves de aplicación de las cuentas de servicio solo se pueden consultar una vez. Asegúrese de almacenar de forma segura su clave de aplicación inmediatamente después de crearla, ya que el secreto de la clave no se puede recuperar más tarde.</div>
{{< /site-region >}}

Para revocar una clave de aplicación, busque la clave en el panel lateral de la vista detallada de la cuenta de servicio y coloque el cursor sobre ella. Los iconos de lápiz y papelera aparecen a la derecha. Haga clic en la papelera para revocar la clave. Después de revocar la clave, haga clic en {{< ui >}}Confirm{{< /ui >}}.

### API {#api}

Consulte la [referencia de la API de cuentas de servicio][3] para utilizar cuentas de servicio a través de Datadog API.

## Claves de aplicación de cuenta de servicio {#service-account-application-keys}

Puede visualizar la clave de aplicación de una cuenta de servicio exactamente una vez, inmediatamente después de crearla. Limitar el acceso a la clave de aplicación evita cualquier problema que pueda ocurrir cuando otro usuario accede a la clave. Si pierde u olvida una clave de cuenta de servicio, revóquela y cree una nueva.

## Permisos {#permissions}

Al crear una cuenta de servicio, usted crea un actor que interactúa con Datadog en su nombre. Sus capacidades en la página Service Accounts varían según sus roles y permisos de Datadog.

La creación de una cuenta de servicio requiere el permiso Service Account Write. El rol Datadog Admin incluye el permiso Service Account Write, por lo que cualquier persona con el rol Datadog Admin puede crear cuentas de servicio.

Al crear una cuenta de servicio, puede asignarle cualquier subconjunto de los roles y permisos que usted tenga. La excepción es si usted tiene el permiso User Access Manage, que le otorga acceso de administrador para realizar cualquier acción en Datadog. Las cuentas de Datadog con el permiso User Access Manage no tienen restricciones sobre los roles y permisos que pueden asignar a las cuentas de servicio.


## Notifications {#notifications}

Datadog envía una notificación a la dirección de correo electrónico asociada con la cuenta de servicio cuando ocurren las siguientes acciones:
- Crear una clave de aplicación
- Revocar una clave de aplicación
- Deshabilitar la cuenta de servicio


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /es/api/latest/service-accounts/
[4]: /es/account_management/service-access-tokens/
[5]: /es/account_management/service-access-tokens/#create-a-service-access-token