---
description: Cómo un runner de acciones privado se inscribe en Datadog, cómo la inscripción
  establece la propiedad del runner y cómo la propiedad determina qué modelo de autorización
  utiliza el runner.
further_reading:
- link: /actions/private_actions/set_up_agent_based
  tag: Documentación
  text: Configurar un ejecutor de Private Actions
- link: /actions/private_actions/authorize_private_actions
  tag: Documentación
  text: Autorizar Private Actions
- link: /actions/private_actions/execution_policies
  tag: Documentación
  text: Políticas de ejecución
title: Inscripción y propiedad
---
## Descripción general {#overview}

Cuando se inicia un runner de acciones privado, este se inscribe en su organización de Datadog. Se registra a sí mismo y recibe una identidad que utiliza para autenticarse en cada solicitud. La inscripción también establece la **propiedad** del runner, y la propiedad determina qué modelo de autorización utiliza el runner durante el resto de su vida útil. Debido a que no puede cambiar la propiedad de un runner sin volver a inscribirlo, elija su método de inscripción deliberadamente antes de realizar la implementación.

La inscripción se aplica a ambas formas de runner. La inscripción sin propietario, y la autorización [Execution Policies] que se deriva de ella, se aplican solo a un runner en el Datadog Agent. Un runner independiente siempre tiene propietario.

## El proceso de inscripción {#the-enrollment-process}

1. Usted inicia el runner con un conjunto de credenciales y una configuración que lo habilita.
2. El runner se registra en Datadog. De forma predeterminada (`self_enroll: true`), lo hace automáticamente al iniciarse, sin ningún paso manual.
3. Datadog le otorga al runner una identidad: un identificador de runner único y un par de claves. El runner conserva esta identidad y la reutiliza en reinicios posteriores.
4. El runner utiliza su identidad para autenticarse con Datadog y verificar las tareas que recibe.

Para aprovisionar previamente la identidad de un runner usted mismo en lugar de utilizar la auto-inscripción, consulte [Opciones de configuración](#configuration-options).

## Tipos de inscripción y propiedad {#enrollment-types-and-ownership}

Usted inscribe un runner de una de dos maneras. La credencial con la que se inscribe establece la propiedad del runner, y la propiedad determina el modelo de autorización. Un solo runner está autorizado por un modelo, no por ambos. La propiedad se establece una vez, durante la inscripción, y permanece fija durante la vida útil del runner. Para cambiarla, vuelva a inscribir el runner con el otro tipo de credencial. Decida qué modelo desea antes de realizar la implementación y, a continuación, realice la inscripción con la credencial correspondiente. Para comparar los dos modelos en detalle, consulte [Authorize private actions][5].

| Inscribir con | Propiedad del runner | Modelo de autorización |
|---|---|---|
| Una **clave de API** que tiene la capacidad de Private Action Runner | Sin propietario | [Execution Policies][1] |
| Una **clave de API** y una **clave de aplicación** | Con propietario | [Connections][2] |

### Runners sin propietario {#ownerless-runners}

Un runner inscrito con una **clave de API que tiene la capacidad de Private Action Runner** es **sin propietario**: no tiene un propietario individual. Los runners sin propietario se autorizan con [Execution Policies][1], que controlan el acceso mediante etiquetas de Agent en toda su flota. La inscripción sin propietario se aplica a los runners en el Datadog Agent.

La capacidad de **Private Action Runner** se muestra con una insignia, similar a Remote Configuration. Su gestión requiere los permisos de clave de API **API Keys Read** (`api_keys_read`) y **API Keys Write** (`api_keys_write`). Para obtener más información, consulte [API and application key permissions][9].

Para inscribir un runner sin propietario:

1. En Datadog, navegue a [**Organization Settings > API Keys**][3].
2. Cree o seleccione una clave de API y habilite la capacidad **Private Action Runner**.
3. Configure el runner con esa clave de API y habilite la inscripción solo con clave de API. Para conocer los pasos de implementación y la versión requerida del Datadog Agent, consulte [Set up a private action runner in the Datadog Agent][4].

En Kubernetes, almacene la clave de API en un secreto que el runner pueda leer:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

### Runners con propietario {#owned-runners}

Un runner registrado con una clave de aplicación es **con propietario**: el usuario que realiza el registro se convierte en el propietario del runner. Los runners con propietario se autorizan con [Connections][2]. Durante el registro, Datadog crea conexiones para las integraciones en la allowlist del runner, por lo que el runner está listo para usarse con esas integraciones.

La inscripción con propietario es la vía de disponibilidad general y funciona tanto para el runner independiente como para el Datadog Agent.

En Kubernetes, almacene la clave de API y la clave de aplicación en un secreto que el runner pueda leer:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY> \
  --from-literal app-key=<DD_APP_KEY>
```

## Administrar el acceso a runners con propietario {#manage-access-to-owned-runners}

Esta sección se aplica solo a runners **con propietario**. Un runner sin propietario no tiene un propietario individual; quién puede ejecutar acciones en él se controla mediante [Execution Policies][1] en su lugar.

Utilice el [control de acceso basado en roles (RBAC)][6] para controlar el acceso a un runner con propietario. Puede establecer permisos en el runner para restringir modificaciones o evitar que se adjunten nuevas conexiones. De forma predeterminada, solo el creador del runner tiene acceso de Editor; el creador puede otorgar acceso a usuarios adicionales, cuentas de servicio, roles o equipos. Para ver la lista de permisos que se aplican a los runners de acciones privados, consulte [Permisos de roles de Datadog][7].

### Niveles de permiso {#permission-levels}

**Lector**
: Puede visualizar el runner y las conexiones adjuntas a él.

**Colaborador**
: Puede visualizar y colaborar en el runner adjuntándole nuevas conexiones.

**Editor**
: Puede ver, contribuir (adjuntar nuevas conexiones) y editar el runner.

### Establecer permisos en un runner {#set-permissions-on-a-runner}

1. Navegue a la página de edición del runner.
2. En la sección **¿Quién tiene acceso?** , haga clic en **Editar acceso**.
3. Seleccione un usuario, cuenta de servicio, rol o equipo del menú desplegable y, luego, haga clic en **Agregar**. El principal seleccionado aparece en la parte inferior del cuadro de diálogo.
4. Junto al nombre del principal, seleccione el permiso deseado en el menú desplegable.
5. Para eliminar el acceso de un principal, seleccione **Eliminar acceso** en el menú desplegable de permisos.
6. Haga clic en **Done** para finalizar la configuración de permisos.
7. Haga clic en **Save** para aplicar los nuevos permisos al runner.

## Opciones de configuración {#configuration-options}

La configuración a continuación controla la inscripción. Para obtener la lista completa de la configuración del runner y sus valores predeterminados, consulte la [referencia del private action runner][8].

| Configuración | Propósito |
|---|---|
| `self_enroll` | Inscribir automáticamente al iniciar. Habilitado de forma predeterminada. |
| `api_key_only_enrollment` | Inscribir como un runner sin propietario usando una clave de API con la capacidad de Private Action Runner. |
| `actions_allowlist` | Las acciones que el runner tiene permitido ejecutar. Para los runners con propietario, Datadog crea conexiones para estas integraciones durante la inscripción. |

### Almacenamiento de identidad en Kubernetes {#identity-storage-on-kubernetes}

Un runner en el Datadog Agent conserva su identidad para que sobreviva a los reinicios. Dónde se almacena la identidad depende del runner:

- **Runner del Cluster Agent:** almacena su identidad en un secreto de Kubernetes, de modo que la identidad se comparte entre las réplicas del Cluster Agent. Cuando se instala con Helm o el Datadog Operator, el nombre del secreto predeterminado es `datadog-private-action-runner-identity`.
- **Runner del Node Agent:** almacena su identidad en un archivo. En Kubernetes, respalde esa ruta con un volumen persistente para que la identidad sobreviva a los reinicios de los pods.

## Identidad del runner y autenticación de tareas{#runner-identity-and-task-authentication}

La inscripción le da a cada runner una clave privada a la que Datadog nunca tiene acceso. Datadog autentica al runner usando la clave pública correspondiente, por lo que solo sus runners pueden tomar las tareas de su organización.

Datadog firma cada tarea que envía, y el runner verifica la firma antes de ejecutar la tarea.

## Rotación de credenciales de runner privado{#rotating-private-runner-credentials}

Para rotar las credenciales de un runner privado sin volver a implementar, ejecute `/opt/datadog-agent/embedded/bin/privateactionrunner rotate-identity` en un servidor o en un Node Agent, o `/opt/datadog-agent/bin/datadog-cluster-agent rotate-par-identity` para el Cluster Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/execution_policies/
[2]: /es/actions/connections/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/actions/private_actions/set_up_agent_based/
[5]: /es/actions/private_actions/authorize_private_actions/
[6]: /es/account_management/rbac/
[7]: /es/account_management/rbac/permissions/#app-builder--workflow-automation
[8]: /es/actions/private_actions/reference/
[9]: /es/account_management/rbac/permissions/#api-and-application-keys