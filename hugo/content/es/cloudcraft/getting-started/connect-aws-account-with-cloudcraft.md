---
title: Conectar tu cuenta de AWS a Cloudcraft
---

Conectar tus cuentas de AWS a Cloudcraft te permite visualizar tu infraestructura mediante ingeniería inversa en las relaciones de servicio del entorno en vivo en un diagrama de arquitectura del sistema. Además de generar automáticamente diagramas, también se creará un modelo de presupuesto y tus componentes importados mostrarán datos de estado en vivo directamente en tus diagramas. No hay límite en el número de cuentas de AWS que puedes conectar a Cloudcraft.

**Nota**: Para organizaciones de AWS, debes añadir manualmente el rol de Cloudcraft a cada cuenta individual de la organización.

Este artículo te guiará para conectar tu cuenta de AWS a Cloudcraft.

<div class="alert alert-info">Los usuarios de Datadog pueden evitar este proceso conectando su cuenta de Datadog a Cloudcraft. Para más información, consulta <a href="https://docs.datadoghq.com/cloudcraft/getting-started/datadog-integration/" title="Datadog Integration">integración de Datadog</a>.</div>

## Requisitos

- Un usuario de Cloudcraft con el [rol de Propietario o Administrador][1].
- Una [suscripción de Cloudcraft Pro][2] activa.
- Una cuenta de AWS con permiso para crear roles de IAM.

## Cómo funciona la sincronización de AWS en vivo

Cloudcraft utiliza un [rol entre cuentas para acceder de forma segura a tu entorno de AWS][3]. Como resultado, necesitas crear un rol específico de Cloudcraft, de sólo lectura en tu cuenta de AWS. Este rol puede ser revocado en cualquier momento.

Si tener un rol de sólo lectura con acceso a todos los componentes no está permitido o viola las políticas de tu empresa, también tienes la opción de [adjuntar una política de acceso mínimo más estricta][4], dando acceso de sólo lectura únicamente a los recursos que deseas utilizar con Cloudcraft, minimizando aún más la cantidad de datos a los que el rol puede acceder.

Cloudcraft no guarda ninguno de los datos en vivo de tu entorno de AWS. En su lugar, almacena ARNs, que son identificadores únicos para los recursos en AWS. Esto permite a la aplicación vincular los datos en vivo a los componentes en tiempo de ejecución.

Los datos de tu entorno de AWS se transmiten en tiempo real a tu navegador a través del propio entorno de AWS de Cloudcraft mediante acceso basado en roles, y sólo se almacenan del lado del cliente mientras estás utilizando la aplicación. Cuando cierras la aplicación, los datos en vivo se eliminan.

Aunque no tener acceso de escritura a tu cuenta impide a Cloudcraft ofrecer ciertas características, como borrar una instancia de EC2 tanto en el diagrama como en tu cuenta, es simplemente un enfoque más seguro.

Cloudcraft implementa rigurosos procesos de seguridad y controles para el programa de cumplimiento SOC2. Puedes obtener más información sobre el programa y los controles de seguridad de Cloudcraft en [la página de seguridad][5].

## Gestionar cuentas de AWS 

### Añadir cuenta

1. En Cloudcraft, ve a **User** > **AWS accounts** (Usuarios > Cuentas de AWS).
2. En la parte inferior del modal, haz clic en **Add AWS Account** (Añadir cuenta de AWS).
3. La página siguiente proporciona instrucciones paso a paso. Haz clic en **Open the AWS IAM Console to the Create Role page** (Abrir la consola de AWS IAM en la página Crear rol) para configurar el rol de IAM de solo lectura en AWS.

<div class="alert alert-info">Si no puedes acceder a la página <strong>Create Role</strong> (Creal rol), es posible que no tengas <strong>AdministrativeAccess</strong> o permisos de IAM suficientes para crear un nuevo rol de IAM. Si este es el caso, ponte en contacto con el administrador de tu cuenta de AWS y pídele que complete los siguientes pasos.</div>

4. En la página **Create role** (Crear rol) de AWS, deja la opción **Require MFA** (Requerir MFA) sin marcar y haz clic en **Next** (Siguiente).

<div class="alert alert-info"><strong>Require MFA (Requerir MFA)</strong> debe ser desactivado ya que no es aplicable para el acceso de sistema a sistema donde no hay un humano involucrado. En su lugar, el acceso se protege limitando al acceso desde la cuenta de Cloucraft AWS.</div>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="Pantalla de la consola de AWS Identity and Access Management que muestra opciones para seleccionar entidades de confianza para la configuración del rol." responsive="true" style="width:100%;">}}

5. A continuación, añade políticas de permisos a tu rol. Escribe **ReadOnlyAccess** en el cuadro de búsqueda y pulsa **Enter** (Intro) para filtrar las políticas por nombre.
6. Selecciona la política**ReadOnlyAccess** que proporciona acceso de sólo lectura a los servicios y recursos de AWS, luego, haz clic en **Next** (Siguiente).

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="Página de la consola de administración de AWS con la política 'ReadOnlyAccess' resaltada y seleccionada." responsive="true" style="width:100%;">}}

7. Introduce un nombre y una descripción para el rol de IAM. También puedes añadir etiquetas para organizar, rastrear o controlar el acceso al rol. El etiquetado de tu rol es opcional. Para conocer las prácticas recomendadas de etiquetado, consulta [Prácticas recomendadas para el etiquetado de recursos de AWS][6].
8. Haz clic en **Create role** (Crear rol).
9. Selecciona el rol `cloudcraft` en la lista de roles. En la página **Summary** (Resumen), copia el **ARN de rol**.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="Pantalla de configuración del rol de AWS IAM que muestra el rol de ARN para la integración de Cloudcraft." responsive="true" style="width:100%;">}}

10. En Cloudcraft, pega el ARN en el campo **Role ARN** (ARN del rol), e introduce un nombre para tu cuenta.
11. Opcionalmente, configura el acceso de equipo haciendo clic en el botón azul debajo de **Team access** (Acceso de equipo) y seleccionando los equipos con los que deseas compartir el acceso a la cuenta de AWS.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="Interfaz de Cloudcraft que muestra las opciones de Acceso de equipo con etiquetas Cloudcraft, Team Demo y Cloudcraft Sales + Support team." responsive="true" style="width:100%;">}}

12. Haz clic en **Save Account** (Guardar cuenta).

### Editar cuenta

Para editar una cuenta, haz clic en el icono de lápiz gris situado a la izquierda de la cuenta que deseas editar. Puedes cambiar los detalles de la cuenta, como el nombre, el ARN y el acceso al equipo.

Cuando hayas terminado, haz clic en **Save Account** (Guardar cuenta).

### Eliminar cuenta

Para eliminar una cuenta, haz clic en el icono de la papelera situado a la derecha de la cuenta que deseas eliminar y, a continuación, haz clic en **Remove** (Eliminar).

[1]: /es/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /es/cloudcraft/advanced/minimal-iam-policy/
[5]: https://www.cloudcraft.co/security
[6]: https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html