---
further_reading:
- link: https://docs.datadoghq.com/api/latest/service-accounts/
  tag: Documentación
  text: Referencia de API de cuentas de servicio
title: Cuentas de servicio
---

## Información general

Las cuentas de servicio son cuentas no interactivas que puedes usar para tener claves de aplicación y otros recursos compartidos en tus equipos. Las claves de aplicación de cuentas de servicio solo las puede ver una vez la persona que las creó.

Supón que un empleado de tu empresa configura un script automatizado para enviar solicitudes a la API de Datadog, utilizando para ello su clave de aplicación personal. Cuando ese empleado se marcha de la empresa, desactivas su cuenta de Datadog y su clave de aplicación deja de funcionar. El script automatizado también deja de funcionar, hasta que alguien lo actualiza con una clave de aplicación válida. Para evitar este problema, utiliza una clave de aplicación de cuenta de servicio en lugar de una clave de aplicación personal para las solicitudes automatizadas a la API de Datadog.

## Navegación

Las cuentas de servicio se encuentran en [Organization Settings][1] (Parámetros de organización).

Para acceder a las cuentas de servicio en la IU:

1. Accede a **Organization Settings** (Parámetros de organización) desde el menú de tu cuenta.
2. En **Accounts** (Cuentas), selecciona **Service Accounts** (Cuentas de servicio).

La [página Service Accounts][2] (Cuentas de servicio) contiene una lista de todas las cuentas de servicio de tu organización. Los usuarios con permiso de escritura para cuentas de servicio, incluidos los usuarios que tienen el rol de administrador de Datadog, pueden crear cuentas de servicio. Los usuarios que no tienen este permiso tienen acceso a una vista de solo lectura.

### Ver las cuentas de servicio

De forma predeterminada, la página Service Accounts (Cuentas de servicio) solo muestra cuentas de servicio activas. Para incluir cuentas de servicio desactivadas en la siguiente lista, selecciona **Disabled** (Desactivadas).

Utiliza el cuadro de búsqueda de la parte superior de la página para filtrar cuentas de servicio. El filtro busca por nombre, correo electrónico y rol.

Haz clic en una cuenta para acceder a una vista detallada del panel lateral con la siguiente información:

- Estado (activa o desactivada)
- Fechas de creación y de última modificación
- Roles
- Claves de aplicación
- Permisos

### Crear una cuenta de servicio

Para crear una cuenta de servicio, sigue estos pasos:

1. Haz clic en **New Service Account** (Nueva cuenta de servicio). Aparecerá un cuadro de diálogo.
2. Introduce un nombre y una dirección de correo electrónico para tu cuenta de servicio.
3. Utiliza el menú desplegable **Assign Roles** (Asignar roles) para elegir uno o varios roles para tu cuenta de servicio.
4. Para guardar, haz clic en **Create Service Account** (Crear cuenta de servicio).

Las direcciones de correo electrónico de las cuentas de servicio, a diferencia de las de los usuarios de Datadog, no tienen por qué ser únicas dentro de una organización.

### Editar una cuenta de servicio

Para modificar una cuenta de servicio, haz clic en ella en la lista de cuentas de servicio.

1. En el panel lateral, haz clic en **Edit** (Editar) junto al nombre de la cuenta de servicio. Aparecerá un cuadro de diálogo.
2. Actualiza los campos que quieras modificar. Puedes editar el nombre, la dirección de correo electrónico, el estado y los roles.
3. Haz clic en **Save** (Guardar).

Si quieres desactivar una cuenta de servicio, sigue el procedimiento anterior para editarla y establecer su estado como **Disabled** (Desactivada).

### Crear o revocar claves de aplicación

Para crear o revocar claves de aplicación de cuentas de servicio, selecciona una cuenta en la lista de cuentas de servicio. Aparecerá el panel lateral de esa cuenta.

Para crear una nueva clave de aplicación, sigue estos pasos:

- Haz clic en **New Key** (Nueva clave). Aparecerá un cuadro de diálogo.
- Pon un nombre descriptivo a la clave.
- Haz clic en **Create Key** (Crear clave).

El cuadro de diálogo se actualizará y te mostrará la clave. Copia y pega la clave en la ubicación que quieras. Una vez cerrado el cuadro de diálogo, ya no podrás volver a obtener el valor de la clave.

Para revocar una clave de aplicación, busca la clave en el panel lateral de vista detallada de cuentas de servicio y pasa por encima con el ratón. A la derecha verás el icono de un lápiz y el de una papelera. Haz clic en la papelera para revocar la clave. Una vez revocada, haz clic en **Confirm** (Confirmar).

### API

Consulta la [referencia API de cuentas de servicio][3] para utilizar cuentas de servicio a través de la API de Datadog.

## Claves de aplicación de cuentas de servicio

La clave de aplicaciones de una cuenta de servicio solo se puede ver una única vez, inmediatamente después de crearla. Limitar el acceso a la clave de aplicación evita cualquier problema que pueda surgir si otro usuario accede a la clave. Si pierdes u olvidas una clave de cuenta de servicio, revócala y crea una nueva.

## Permisos

Al crear una cuenta de servicio, creas un agente que interactúa con Datadog en tu nombre. Lo que puedas hacer en la página Service Accounts (Cuentas de servicio) variará en función de los roles y permisos de Datadog que tengas.

Para crear una cuenta de servicio es necesario tener el permiso de escritura para cuentas de servicio. El rol de administrador de Datadog incluye este permiso, por lo que cualquier persona que tenga dicho rol podrá crear cuentas de servicio.

A la hora de crear una cuenta de servicio, puedes otorgarle cualquier subcojunto de roles y permisos que tengas; excepto si tienes el permiso de gestión de acceso de usuarios, que te da acceso de administrador para hacer cualquier cosa en Datadog. Las cuentas de Datadog con este permiso no tienen ninguna restricción sobre los roles y permisos que pueden asignar a las cuentas de servicio.


## Notificaciones

Datadog envía una notificación a la dirección de correo electrónico asociada a la cuenta de servicio cuando se realizan las siguientes acciones:
- Se crea una clave de aplicación
- Se revoca una clave de aplicación
- Se desactiva la cuenta de servicio


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /es/api/latest/service-accounts/