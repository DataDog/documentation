---
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Inicio de sesión único con SAML
title: Asignación de grupos SAML
---

## Información general

Con Datadog, puedes asignar atributos de la respuesta de tu proveedor de identidad (IdP) a entidades de Datadog.

Puedes asignar atributos a las siguientes entidades:
- [Roles de Datadog][1]
- [Equipos de Datadog][2]

 Los usuarios con permiso de gestión de acceso pueden asignar o eliminar entidades de Datadog basándose en los atributos SAML asignados a un usuario.

 Configurar una asignación de atributos SAML a entidades de Datadog te permite gestionar usuarios únicamente en tu proveedor de identidad. Luego, el sistema suministra usuarios en Datadog de acuerdo con las asignaciones configuradas.

## Requisitos previos

Es importante entender lo que se envía en una aserción antes de activar las asignaciones, ya que estas requieren atributos correctos. Cada proveedor de identidad (IdP) tiene asignaciones específicas. Por ejemplo, Azure trabaja con los ID de objetos, y Okta requiere que establezcas atributos en los [parámetros de Okta][3]. Datadog recomienda hacer referencias cruzadas utilizando las [herramientas de navegación incorporadas][4], como Chrome DevTools o extensiones de navegador, y [validar tus aserciones SAML][5] **antes** de crear asignaciones.

## Asignación de atributos SAML a roles de Datadog 

1. [Haz referencias cruzadas][4] y [valida][5] tu aserción SAML para comprender los atributos de tu proveedor de identidad (IdP).
2. Ve a **Organization Settings** (Parámetros de la organización) y haz clic en la pestaña **SAML Group Mappings** (Asignaciones de grupos SAML).
3. Si está visible, asegúrate de que la pestaña **Role Mappings** (Asignaciones de roles) está seleccionada.
4. Haz clic en **New Mapping** (Nueva asignación). Aparecerá un cuadro de diálogo.
5. Especifica el par `key-value` del proveedor de identidad SAML que quieres asociar a un rol de Datadog existente (ya sea predeterminado o personalizado). **Nota**: Estas entradas distinguen entre mayúsculas y minúsculas.
   Por ejemplo, si quieres que todos los usuarios cuyo atributo `member_of` tiene el valor `Development` sean asignados a un rol personalizado de Datadog denominado `Devs`:

    {{< img src="account_management/saml/create_mapping.png" alt="Crear una asignación SAML a un rol de Datadog" >}}

   **Nota**: Cada proveedor de identidad es diferente. Algunos te permiten establecer tu clave o etiqueta de atributo. Otros proporcionan una por defecto. Datadog te recomienda que utilices un inspector de aserciones en tu inicio de sesión para ver los detalles de tu aserción particular a fin de entender cómo tu proveedor de identidad envía la pertenencia de miembros a tu grupo.
6. Si aún no lo has hecho, activa las asignaciones haciendo clic en **Enable Mappings** (Activar asignaciones).

Cuando un usuario que tiene el atributo de proveedor de identidad especificado inicia sesión, se le asigna automáticamente el rol de Datadog. Del mismo modo, si a alguien se le elimina ese atributo de proveedor de identidad, pierde el acceso al rol (a menos que otra asignación se lo añada).

<div class="alert alert-warning">
 <strong>Importante:</strong> Si un usuario <i>no</i> coincide con ninguna asignación, pierde cualquier rol que haya tenido anteriormente y no podrá iniciar sesión en la organización con SAML. Vuelve a verificar tus definiciones de asignación e inspecciona tus propias aserciones antes de habilitar asignaciones, para prevenir cualquier escenario en que tus usuarios no puedan iniciar sesión.
</div>

Realiza cambios en una asignación haciendo clic en el icono del lápiz (**Edit** [Editar]), o elimina una asignación haciendo clic en el icono de la papelera (**Delete** [Eliminar]). Estas acciones sólo afectan a la asignación, no a los atributos del proveedor de identidad ni a los roles de Datadog.

Alternativamente, puedes crear y cambiar asignaciones de atributos SAML a roles de Datadog con el endpoint `authn_mappings`. Para obtener más información, consulta la [API de autenticación federada para la asignación de roles][6].

## Asignación de atributos SAML a equipos

1. Asegúrate de haber seleccionado **SAML** o **All sources** (Todas las fuentes) al elegir tu [fuente de suministros][7] para miembros del equipo.
2. [Haz referencias cruzadas][4] y [valida][5] tu aserción SAML para comprender los atributos de tu proveedor de identidad (IdP).
3. Ve a **Organization Settings** (Parámetros de la organización) y haz clic en la pestaña **SAML Group Mappings** (Asignaciones de grupos SAML).
4. Asegúrate de que la pestaña **Team Mappings** (Asignaciones de equipos) está seleccionada.
5. Haz clic en **New Mapping** (Nueva asignación). Aparecerá un cuadro de diálogo.
6. Especifica el par `key-value` del proveedor de identidad SAML que quieres asociar a un equipo de Datadog. **Nota**: Estas entradas distinguen entre mayúsculas y minúsculas.
    **Nota**: Cada proveedor de identidad es diferente. Algunos te permiten establecer tu clave o etiqueta de atributo. Otros proporcionan una por defecto. Datadog te recomienda que utilices un inspector de aserciones en tu inicio de sesión para ver los detalles de tu aserción particular a fin de entender cómo tu proveedor de identidad envía la pertenencia de los miembros a tu grupo.
8. Selecciona un **Team** (Equipo) en el menú desplegable.
9. Para añadir una asignación adicional, haga clic en **Add Row** (Añadir fila).
10. Cuando hayas terminado de añadir asignaciones, haga clic en **Create** (Crear).
11. Si aún no lo has hecho, activa las asignaciones haciendo clic en **Enable Mappings** (Activar asignaciones).

Realiza cambios en una asignación haciendo clic en el icono del lápiz (**Edit** [Editar]), o elimina una asignación haciendo clic en el icono de la papelera (**Delete** [Eliminar]). Estas acciones sólo afectan a la asignación, no a los atributos del proveedor de identidad ni al equipo de Datadog.

**Nota:** A diferencia de los roles, los equipos no afectan en modo alguno a la experiencia de inicio de sesión. Datadog utiliza la asignación de equipos únicamente como fuente de suministros. Por ejemplo, aunque un usuario no pertenezca a ningún equipo, puede iniciar sesión en Datadog.

[1]: /es/account_management/rbac/
[2]: /es/account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /es/account_management/authn_mapping/
[7]: /es/account_management/teams/#choose-provisioning-source