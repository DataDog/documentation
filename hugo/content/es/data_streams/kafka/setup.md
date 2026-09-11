---
description: Configure la consola de Kafka, incluidos los requisitos previos, la configuración
  del Agent y los pasos adicionales necesarios para inspeccionar los mensajes de Kafka.
title: Configuración de la consola de Kafka
---
Esta página cubre los requisitos previos y los pasos de configuración para la consola de Kafka.

## Requisitos previos {#prerequisites}

### Versión del Datadog Agent {#datadog-agent-version}

Se requiere la versión 7.78 o posterior del Datadog Agent.

### Permisos de ACL {#acl-permissions}

Si su clúster de Kafka utiliza ACL, el usuario del Datadog Agent requiere los siguientes permisos mínimos:

| Nombre del recurso | Tipo de recurso | Operación        |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

## Configuración {#setup}

Vaya a la [página de configuración de la consola de Kafka][1] y haga clic en {{< ui >}}Get Started{{< / ui >}}. Luego elija su entorno y siga las instrucciones. Para solicitar asistencia, elija {{< ui >}}Request a pairing session{{< /ui >}}.

{{< img src="data_streams/kafka_setup-2.png" alt="El cuadro de diálogo de configuración de la consola de Kafka que muestra la selección del entorno, el protocolo de seguridad, las opciones del registro de esquemas y las instrucciones de configuración de Kubernetes" >}}

La página de configuración proporciona instrucciones de configuración específicas para el entorno. Puede copiar las instrucciones directamente a un agente de IA con {{< ui >}}Copy for AI{{< /ui >}}.

## Habilitar inspección de mensajes {#enable-message-inspection}

Esta sección se aplica solo si desea visualizar las cargas útiles de los mensajes de Kafka en la sección {{< ui >}}Messages{{< /ui >}}. Omítela si no planea utilizar la inspección de mensajes.

### Permiso de ACL adicional {#additional-acl-permission}

Además de los permisos de ACL enumerados en [Requisitos previos](#acl-permissions), el usuario del Datadog Agent requiere el permiso `READ` para los temas:

| Nombre del recurso | Tipo de recurso | Operación |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

El nombre de recurso `*` otorga acceso `Read` a todos los temas. Para restringir el Agent a temas específicos, reemplace `*` por esos nombres de tema.

### Remote Configuration {#remote-configuration}

[Remote configuration][3] debe estar habilitada en tres niveles:

1. En el [nivel de organización][5].
2. En el [nivel de Agent][10].
3. En el [nivel de clave de API][11].

### Permiso de usuario {#user-permission}

Para visualizar mensajes de Kafka, un usuario debe tener el permiso `Data Streams Monitoring Capture Messages`.

Puede verificar sus permisos actuales en su [{{< ui >}}Profile{{< /ui >}} página][7]. Para habilitar permisos, edite un rol existente o cree un rol en la [{{< ui >}}Roles{{< /ui >}} página][8]. Si no tiene permiso para modificar roles, comuníquese con el administrador de su organización.

{{% collapse-content title="Cree un rol y asígnelo a los usuarios." level="h4" expanded=false %}}

#### 1. Cree un rol {#1-create-a-role}

1. Vaya a la [{{< ui >}}Roles{{< /ui >}} página][8] en Datadog.
2. Haga clic en {{< ui >}}+ New Role{{< /ui >}} en la esquina superior derecha.
   <div class="alert alert-info">
   Si ve "Read Only" en lugar del botón "+ New Role", no tiene permiso para crear roles. Comuníquese con su administrador de Datadog para obtener ayuda.
   </div>
3. Ingrese un nombre descriptivo para su rol (por ejemplo, "Data Streams Messages Access").
4. En el campo {{< ui >}}Search Permissions{{< /ui >}}, escriba `Data Streams Monitoring Capture Messages`.
5. Seleccione el permiso de los resultados de búsqueda para habilitarlo para este rol.
6. Haga clic en {{< ui >}}Save{{< /ui >}}.
7. Confirme que su rol se creó correctamente buscándolo en la lista.

#### 2. Asigne el rol a los usuarios {#2-assign-the-role-to-users}

1. Vaya a la [{{< ui >}}Users{{< /ui >}} página][9] en Datadog.
2. Busque y haga clic en el usuario al que desea asignar el rol.
3. En el panel de detalles del usuario, haga clic en {{< ui >}}Edit{{< /ui >}} junto a su nombre.
   <div class="alert alert-info">
   Si no ve un botón {{< ui >}}Edit{{< /ui >}}, necesita privilegios de administrador para modificar los roles de usuario. Comuníquese con su administrador de Datadog.
   </div>
4. En la ventana modal que se abre, localice la sección {{< ui >}}Roles{{< /ui >}}.
5. Agregue el rol que acaba de crear al usuario.
6. Haga clic en {{< ui >}}Save{{< /ui >}}.
7. Busque un mensaje de confirmación {{< ui >}}User updated{{< /ui >}} para verificar que el cambio se realizó correctamente.

{{% /collapse-content %}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /es/remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /es/remote_configuration/#enable-remote-configuration
[11]: /es/account_management/api-app-keys/