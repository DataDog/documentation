---
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Ajustes de Plan y Uso
- link: https://www.datadoghq.com/blog/datadog-teams/
  tag: Blog
  text: Agiliza la colaboración en toda tu organización con Datadog Teams
title: Gestiona Datadog con Terraform
---

## Información general

Puedes utilizar [Terraform][28] para interactuar con la API de Datadog y gestionar tu organización de Datadog, organizaciones secundarias, usuarios, credenciales, permisos y mucho más. Esta guía proporciona ejemplos de casos de uso para la gestión de Datadog con Terraform, con enlaces a recursos y fuentes de datos de uso común de Datadog en el registro de Terraform.

También puedes [importar][29] tus recursos existentes en la configuración de Terraform para establecer los ajustes luego a través de Terraform, y hacer referencia a los recursos existentes como [fuentes de datos][30] de Terraform.

## Configuración

Si aún no lo has hecho, configura el [proveedor de Datadog Terraform][8] para interactuar con APIs de Datadog en tu nombre.

## Usuarios, roles, equipos y cuentas de servicio 

Los siguientes recursos y fuentes de datos te permiten seguir el principio de seguridad de privilegio mínimo, mediante el que concedes solo los privilegios necesarios para las actividades esenciales a los usuarios, equipos y cuentas de servicio que operan en tus organizaciones de Datadog.

### Usuarios

Crea los [usuarios][10] de tu cuenta y asígnales cualquiera de los roles predeterminados o [personalizados][9] disponibles. También puedes utilizar el recurso de [asignación de autenticación][20] para asignar automáticamente roles a los usuarios en función de sus atributos SAML. También puedes importar tus usuarios, roles y asignaciones de autenticación existentes a tu configuración de Terraform.

La [fuente de datos del usuario][21] puede servir para recuperar información sobre los usuarios existentes en tu configuración de Terraform para su uso en otros recursos, como el recurso de pertenencia a equipos de Datadog.

### Roles

Datadog proporciona tres roles predefinidos para los permisos de usuario, pero también puedes utilizar el [recurso de roles][18] para crear y gestionar roles personalizados.

La [fuente de datos de roles][22] puede servir para recuperar información sobre roles existentes para su uso en otros recursos, como el recurso de usuario de Datadog.

### Teams

Utiliza el recurso [Datadog Team][11] para asociar recursos específicos a un grupo de usuarios y filtrar su experiencia en Datadog para dar prioridad a esos recursos. Gestiona la pertenencia al equipo con el recurso de [pertenencia al equipo][12] y controla quién puede gestionar el equipo con el recurso [configuración de permisos del equipo][17].

La [fuente de datos de equipos][23] y la [fuente de datos de miembros de equipos][24] pueden servir para recuperar información sobre los equipos existentes y los miembros de los equipos, respectivamente, para su uso en otros recursos.

Para más información, consulta la página de [Teams][13].

### Cuentas de servicio

El recurso [cuenta de servicio][14] proporciona una cuenta no interactiva que puede utilizarse para ser propietario de [claves de aplicación de cuenta de servicio][15] y otros recursos que se comparten entre tus equipos. 

La [fuente de datos de la cuenta de servicio][25] puede servir para recuperar información sobre cuentas existentes en servicio para su uso en otros recursos.

Consulta [Cuentas de servicio][16] para obtener más información.

## Credenciales

### Claves de API y aplicación

Las [claves de API][6] permiten el envío de datos a tu cuenta de Datadog, y las [claves de aplicación][7] permiten crear recursos en tu cuenta de Datadog. También puedes importar tus credenciales existentes.

La [fuente de datos de la clave de API][26] y la [fuente de datos de la clave de aplicación][27] se pueden utilizar para recuperar información sobre las credenciales existentes que ya se están gestionando con Terraform.

## Organizaciones

Los recursos a nivel de organización te permiten gestionar parámetros de organización tanto para entornos de una sola cuenta como de varias cuentas.

### Parámetros de organización

Configura el acceso a cuentas y capacidades de uso compartido de widget para cualquiera de tus cuentas con el recurso [Parámetros de organización][4]. Por ejemplo, puedes gestionar los enpoints del IdP, las URL de inicio de sesión y si está activado o no el modo estricto de SAML. Consulta [Inicio de sesión único con SAML][5] para obtener más información.

También puedes importar tus parámetros de organización existentes a tu configuración de Terraform.

### Organizaciones secundarias

<div class="alert alert-info">La función Cuenta de varias organizaciones no está activada por defecto. Ponte en contacto con <a href="https://docs.datadoghq.com/help/" target="_blank">el soporte de Datadog</a> para activarla.</div>

Si necesitas mantener entornos separados y aislados, puedes crear [organizaciones secundarias][1] bajo una organización principal. Desde la cuenta principal, puedes hacer un seguimiento del uso de las subcuentas asociadas, y los usuarios con acceso a varias organizaciones pueden cambiar entre ellas con un solo clic.

Consulta [Gestión de cuentas de varias organizaciones][3] para obtener más información.

**Nota**: Las organizaciones secundarias no heredan las configuraciones SAML de la organización principal.

## Políticas de restricción

Las políticas de restricción están asociadas a un **recurso** específico y definen el nivel de acceso proporcionado a roles, equipos o usuarios. Utiliza el recurso [política de restricción][19] para crear y gestionar tus políticas de restricción, o importa tus políticas de restricción existentes a tu configuración de Terraform.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[2]: /es/help/
[3]: /es/account_management/multi_organization/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/organization_settings
[5]: /es/account_management/saml/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[8]: /es/integrations/terraform/
[9]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_membership
[13]: /es/account_management/teams/
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account_application_key
[16]: /es/account_management/org_settings/service_accounts
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_permission_setting
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/authn_mapping
[21]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/user
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/role
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team_memberships
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/service_account
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/api_key
[27]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/application_key
[28]: https://www.terraform.io/
[29]: https://developer.hashicorp.com/terraform/cli/import
[30]: https://developer.hashicorp.com/terraform/language/data-sources