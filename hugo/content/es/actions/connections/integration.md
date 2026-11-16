---
aliases:
- /es/actions/connections/aws_integration/
- /es/actions/connections/integration_connections/
description: Utilice las credenciales de las Integrations de Datadog existentes para
  autenticar acciones en flujos de trabajo y aplicaciones.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentación
  text: Obtenga más información sobre las credenciales de conexión
title: Integration Connections
---
## Descripción general {#overview}

Integration Connections permiten que los flujos de trabajo y las acciones de Datadog utilicen credenciales que ya están configuradas en Integrations de Datadog. Esto elimina la necesidad de configurar una conexión independiente para una acción y simplifica el acceso al servicio externo.

## Casos de uso admitidos {#supported-use-cases}

Integration Connections son compatibles con:

- **ServiceNow**: utilice las credenciales de una instancia de integración de ServiceNow existente para ejecutar acciones de ServiceNow.
- **AWS**: utilice las credenciales de una cuenta de integración de AWS existente para ejecutar acciones de AWS de solo lectura compatibles. Para obtener más información sobre las acciones y permisos de AWS compatibles, consulte [conexiones de integración de AWS](#aws-integration-connections).

Para otras integraciones u operaciones, [cree una conexión][2].

## Configuración {#configuration}

Antes de comenzar, asegúrese de que la integración esté activa y de que tenga acceso para editar los permisos de la cuenta o instancia de integración que desea utilizar.

El siguiente ejemplo configura una conexión de integración de ServiceNow. Puede seguir el mismo proceso general para las acciones de AWS compatibles, sujeto a los [requisitos adicionales de AWS](#aws-integration-connections).

### 1. Configure los permisos de integración {#1-configure-integration-permissions}

Para configurar el permiso {{< ui >}}Executor{{< /ui >}} para una instancia de integración de ServiceNow:

1. En Datadog, navegue a [**Integrations**][4].
1. Haga clic en la integración {{< ui >}}ServiceNow{{< /ui >}}.
1. Seleccione la instancia de ServiceNow que desea utilizar para ejecutar acciones.
1. Haga clic en {{< ui >}}Set Permissions{{< /ui >}}.
    - Si ve un botón {{< ui >}}Request Edit Access{{< /ui >}} en lugar de un botón {{< ui >}}Set Permissions{{< /ui >}}, pídale al administrador de su organización de Datadog que lo agregue como Editor para la instancia.
1. Seleccione un usuario, equipo u organización y haga clic en {{< ui >}}Add{{< /ui >}}.
1. En {{< ui >}}People with access{{< /ui >}}, seleccione el permiso {{< ui >}}Executor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### 2. Agregue la integración a una acción {#2-add-the-integration-to-an-action}

1. En [Workflow Automation][5], haga clic en el flujo de trabajo que desea editar.
1. Agregue una acción de ServiceNow.
1. En el panel de configuración, haga clic en el menú desplegable {{< ui >}}Connection{{< /ui >}} y desplácese hasta {{< ui >}}Existing ServiceNow Integrations{{< /ui >}}.
1. Seleccione la instancia de ServiceNow que configuró en el paso anterior.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Conexiones de integración de AWS {#aws-integration-connections}

Los flujos de trabajo y las acciones de Datadog pueden utilizar sus credenciales de integración de AWS de Datadog existentes para realizar operaciones de solo lectura en su entorno de AWS. Datadog utiliza las mismas credenciales de AWS que impulsan integraciones como el monitoreo de Amazon EC2, RDS y S3 para ejecutar de forma segura las acciones de solo lectura admitidas.

Existen dos formas de ejecutar acciones de AWS en su entorno:

- Utilice la integración de AWS de Datadog para ejecutar acciones de solo lectura permitidas bajo la política de [`ViewOnlyAccess` permisos][1].
- Utilice una conexión de AWS personalizada vinculada a un rol de IAM de AWS dedicado con permisos específicos para operaciones no incluidas en los [`ViewOnlyAccess` permisos][1].

### Acciones de AWS admitidas {#supported-aws-actions}

Algunos ejemplos incluyen:

- Listar o describir recursos de AWS, como `ListECSClusters`, `DescribeInstances` y `GetBucketPolicy`
- Leer configuraciones o metadatos de servicios de AWS, como `GetFunctionConfiguration` y `ListSecrets`
- Inspeccionar etiquetas, métricas o registros de recursos

Para otras acciones de AWS, utilice una [conexión dedicada][2] en su lugar.

### Requisitos de AWS {#aws-requirements}

Para ejecutar acciones con éxito con una conexión de integración de AWS:

- El rol de IAM de integración de AWS configurado para la delegación de roles debe tener los permisos requeridos para las operaciones deseadas, tales como `ecs:ListClusters`.
- La acción seleccionada debe ser de solo lectura. Las acciones de escritura o mutación, tales como `Put*`, `Delete*` y `Update*`, no son compatibles y fallan al ejecutarse.
- El usuario, equipo u organización que ejecuta la acción debe tener el permiso {{< ui >}}Executor{{< /ui >}} explícito en la cuenta de integración de AWS en Datadog.

<div class="alert alert-info">
La ejecución de acciones mediante la integración de AWS de Datadog solo está disponible para los usuarios que han configurado la integración de AWS de Datadog a través de <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">delegación de roles</a>. Además, aunque se permiten las operaciones bajo los <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">permisos ViewOnlyAccess</a>, es posible que el rol de IAM asociado con la integración de AWS de Datadog no tenga los permisos necesarios. Asegúrese de que el rol tenga los permisos correctos si encuentra problemas.
</div>

Antes de configurar una conexión de integración de AWS, asegúrese de que:

- La integración de AWS esté activa para su cuenta de AWS de destino y Datadog no haya detectado ningún problema de integración. Si no ha configurado la integración de AWS, siga la [guía de configuración de la integración de AWS][6].
- El rol de IAM asociado con la integración tenga los permisos para las operaciones requeridas, tales como `ecs:ListClusters`.
- Usted tenga acceso para editar los permisos de las cuentas de AWS que desea utilizar.

Para configurar el permiso {{< ui >}}Executor{{< /ui >}} para una cuenta de integración de AWS, siga [los pasos de configuración](#1-configure-integration-permissions), seleccionando la integración {{< ui >}}Amazon Web Services{{< /ui >}} y la cuenta de AWS relevante en lugar de ServiceNow.

Para agregar la integración de AWS a una acción:

1. En [Workflow Automation][5], haga clic en el flujo de trabajo que desea editar.
1. Agregue una acción de AWS, tal como {{< ui >}}List ECS Clusters{{< /ui >}}.
1. En el panel de configuración, haga clic en el menú desplegable {{< ui >}}Connection{{< /ui >}} y desplácese hasta {{< ui >}}Existing AWS Integrations{{< /ui >}}.
1. Seleccione la cuenta de AWS que configuró.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html
[2]: /es/actions/connections/#create-a-connection
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/workflow
[6]: /es/integrations/amazon-web-services/#setup