---
description: Aprenda a enviar registros de Azure Event Hubs a Observability Pipelines
  utilizando la fuente de Kafka.
disable_toc: false
title: Envíe registros de Azure Event Hubs a Observability Pipelines.
---
## Descripción general {#overview}

Este documento explica cómo enviar registros de Azure Event Hubs a Observability Pipelines utilizando la fuente de Kafka. Los pasos de configuración incluyen preparar Azure Event Hubs para la fuente de Kafka:

- [Cree un espacio de nombres de Event Hubs](#create-an-azure-event-hubs-namespace)
- [Cree un Event Hub (tema de Kafka)](#create-an-event-hub-kafka-topic)
- [Configure la política de acceso compartido](#configure-shared-access-policy)
- [Configure la configuración de diagnóstico](#set-up-diagnostic-settings)
- [Configure la conexión compatible con Kafka para el Event Hub](#configure-kafka-compatible-connection-for-the-event-hub)

Una vez configurado Azure Event Hubs, usted [configura una canalización con la fuente de Kafka](#set-up-a-pipeline-with-the-kafka-source) para enviar registros de Azure Event Hubs a Observability Pipelines.

## Configure Azure Event Hubs para la fuente de Kafka {#set-up-azure-event-hubs-for-the-kafka-source}

### Cree un espacio de nombres de Azure Event Hubs {#create-an-azure-event-hubs-namespace}

1. En Azure Portal, navegue a [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces).
1. Haga clic en **Crear**.
1. Complete los **Detalles del proyecto** (suscripción, grupo de recursos) y los **Detalles de la instancia** (nombre del espacio de nombres, región, seleccione el nivel Estándar, Premium o Dedicado).
1. Asegúrese de que la región coincida con sus recursos de Azure (por ejemplo, `westus`).
1. Haga clic en **Revisar + crear**.

**Nota**: El punto de conexión de Kafka se habilita automáticamente para los niveles estándar y superiores.

### Cree un Event Hub (tema de Kafka) {#create-an-event-hub-kafka-topic}

1. En el espacio de nombres que creó, seleccione **Event Hubs** y haga clic en **+ Event Hub**.
1. Ingrese un nombre (por ejemplo, `datadog-topic`) y configure los ajustes (por ejemplo, 4 particiones y un tiempo de retención de 7 días).
1. Haga clic en **Revisar + crear**. Este Event Hub actúa como un tema de Kafka.

### Configure la política de acceso compartido {#configure-shared-access-policy}

1. En el Event Hub que creó, navegue a **Ajustes** > **Políticas de acceso compartido**.
1. Haga clic en **+ Agregar**.
1. Ingrese un nombre de política (por ejemplo, `DatadogKafkaPolicy`).
1. Seleccione la casilla **Administrar**, la cual debería seleccionar automáticamente las casillas **Enviar** y **Escuchar**.
1. Haga clic en **Crear**.
1. La **Clave principal** y la **Cadena de conexión principal** son necesarias para la autenticación de Kafka cuando configure la fuente de Kafka de Observability Pipelines.

### Configure los ajustes de diagnóstico {#set-up-diagnostic-settings}

1. Configure los recursos de Azure (por ejemplo, máquinas virtuales, App Services) o los registros de actividad a nivel de suscripción para transmitir registros a Event Hub.
1. Para recursos:
    1. Navegue al recurso y luego a **Monitoreo** > **Ajustes de diagnóstico**.
    1. Haga clic en **+ Agregar ajuste de diagnóstico**.
    1. Seleccione las categorías de registro que desee (por ejemplo, AuditLogs, SignInLogs para Microsoft Entra ID).
    1. En **Detalles de destino**:
        1. Marque la casilla **Transmitir a un Event Hub**.
        1. Seleccione el espacio de nombres y el Event Hub (`datadog-topic`).
    1. Haga clic en **Guardar**.
1. Para registros de actividad:
    1. Navegue a **Microsoft Entra ID** > **Monitoreo** > **Registros de auditoría** > **Configuración de exportación de datos**.
    1. Marque la casilla **Transmitir al Event Hub**.
1. Repita para cada región. Los registros deben transmitirse a Event Hubs en la misma región.

### Configure la conexión compatible con Kafka para el Event Hub {#configure-kafka-compatible-connection-for-the-event-hub}

Azure Event Hubs expone un punto de conexión de Kafka en `NAMESPACE.servicebus.windows.net:9093`, que Observability Pipelines utiliza como fuente de Kafka.

#### Obtenga el punto de conexión de Kafka {#get-the-kafka-endpoint}

1. En el Portal de Azure, navegue a su espacio de nombres de Event Hubs (por ejemplo, `myeventhubns`).
1. En la página **Información general**, en la sección **Conceptos básicos**, localice el **Nombre del servidor** o el **Nombre de dominio completo (FQDN)**. Tiene el formato: `<NAMESPACE>.servicebus.windows.net` (por ejemplo, `myeventhubns.servicebus.windows.net`).
1. Agregue el puerto de Kafka `:9093` para formar el valor de Bootstrap Servers: `<NAMESPACE>.servicebus.windows.net:9093`.
    - Por ejemplo, si su espacio de nombres es `myeventhubns`, los Bootstrap Servers son `myeventhubns.servicebus.windows.net:9093`.
    - Necesita esta información cuando configure la fuente de Kafka de Observability Pipelines.

#### Configure la autenticación {#set-up-authentication}

1. Azure Event Hubs utiliza SASL_SSL con el mecanismo PLAIN para la autenticación de Kafka.
1. La cadena de conexión tiene el formato para Observability Pipelines:
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Configure una canalización con la fuente de Kafka {#set-up-a-pipeline-with-the-kafka-source}

Seleccione su plataforma.

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. Navegue a [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Seleccione la fuente de Kafka.
    1.  En el campo {{< ui >}}Group ID{{< /ui >}}, especifique o cree un grupo de consumidores único (por ejemplo, `datadog-consumer-group`).
    1.  En el campo {{< ui >}}Topics{{< /ui >}}, ingrese `datadog-topic` o el tema que configuró anteriormente para su Event Hub.
    1.  Cambie el interruptor para habilitar la autenticación SASL.
    1.  En el menú desplegable {{< ui >}}Mechanism{{< /ui >}}, seleccione {{< ui >}}PLAIN{{< /ui >}}.
    1.  Habilite TLS.
        1. Configure su archivo `values.yaml` para usar el certificado que funciona como parte de la imagen del contenedor:
            ```
            initContainers:
            - name: copy-config
            image: gcr.io/datadoghq/observability-pipelines-worker:latest
            imagePullPolicy: IfNotPresent
            command: ['/bin/sh', '-c', 'mkdir -p /config-volume/observability-pipelines-worker/config/ && cp /etc/ssl/certs/ca-certificates.crt /config-volume/observability-pipelines-worker/config/ca-certificates.crt']
            volumeMounts:
            - name: config-volume
                mountPath: /config-volume
            extraVolumes:
            - name: config-volume
            emptyDir: {}
            extraVolumeMounts:
            - name: config-volume
            mountPath: /config-volume
            ```
            **Note**: When install the Worker with the install command you need to add:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        1. In the {{< ui >}}Certificate path{{< /ui >}} campo, ingrese `/ca-certificates.crt` si usó el ejemplo anterior. De lo contrario, ingrese el nombre de su certificado.
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="La configuración de la fuente de Kafka con valores de ejemplo" style="width:45%;" >}}
1. Haga clic en {{< ui >}}Next: Select Destination{{< /ui >}}.
1. Después de configurar sus destinos y procesadores, haga clic en {{< ui >}}Next: Install{{< /ui >}}.
1. Seleccione su plataforma en el menú desplegable {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Ingrese las variables de entorno para su fuente de Kafka:
    1.  Para {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}, ingrese `<NAMESPACE>.servicebus.windows.net:9093` (por ejemplo, `myeventhubns.servicebus.windows.net:9093`).
    1.  Para {{< ui >}}Kafka SASL Username{{< /ui >}}, ingrese `$$$$ConnectionString`. **Nota**: Debe tener `$$$$` delante de `ConnectionString` porque `$$$$` termina siendo `$$` cuando se transpone al entorno.
    1.  Para {{< ui >}}Kafka SASL Password{{< /ui >}}, ingrese la cadena de conexión completa. Por ejemplo, `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`.
        - Esta es la **Cadena de conexión principal** en las [políticas de acceso compartido](#configure-shared-access-policy) de su instancia de Event Hub.
    1. Ingrese su frase de contraseña de TLS de Kafka.
        - Esta es la **Clave principal** en las [políticas de acceso compartido](#configure-shared-access-policy) de su instancia de Event Hub.
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="La página de instalación con valores de ejemplo para las variables de entorno de Kafka" style="width:60%;" >}}
1. Ingrese las variables de entorno para sus destinos, si corresponde.
1. Siga el resto de las instrucciones en la página para instalar el Worker según su plataforma.
{{% /tab %}}
{{% tab "máquina virtual (VM)" %}}

1. Navegue a [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Seleccione la fuente de Kafka.
    1.  En el campo {{< ui >}}Group ID{{< /ui >}}, especifique o cree un grupo de consumidores único (por ejemplo, `datadog-consumer-group`).
    1.  Ingrese `datadog-topic` en el campo {{< ui >}}Topics{{< /ui >}}.
    1.  Cambie el interruptor para habilitar la autenticación SASL.
    1.  En el menú desplegable {{< ui >}}Mechanism{{< /ui >}}, seleccione {{< ui >}}PLAIN{{< /ui >}}.
    1.  Habilite TLS. Para el certificado, copie el certificado desde su ubicación original al directorio de configuración de datos predeterminado de Observability Pipelines:
        1. Dado que Observability Pipelines Worker aún no se ha instalado, ejecute este comando para crear el directorio para el certificado:
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Run this command to copy the certificate to the directory you created:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        1. In the {{< ui >}}Certificate path{{< /ui >}} campo, ingrese `/ca-certificates.crt`.
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="La configuración de la fuente de Kafka con valores de ejemplo" style="width:45%;" >}}
1. Haga clic en {{< ui >}}Next: Select Destination{{< /ui >}}.
1. Después de configurar sus destinos y procesadores, haga clic en {{< ui >}}Next: Install{{< /ui >}}.
1. Seleccione su plataforma en el menú desplegable {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Ingrese las variables de entorno para su fuente de Kafka:
    1.  Para {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}, ingrese `<NAMESPACE>.servicebus.windows.net:9093` (por ejemplo, `myeventhubns.servicebus.windows.net:9093`).
    1.  Para {{< ui >}}Kafka SASL Username{{< /ui >}}, ingrese `\$\$ConnectionString`. **Nota**: Debe escapar el `$` delante de `ConnectionString`, de lo contrario la variable de entorno no se cargará.
    1.  Para {{< ui >}}Kafka SASL Password{{< /ui >}}, ingrese la cadena de conexión completa entre comillas (`"`). Por ejemplo, `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`.
        - Esta es la **Cadena de conexión principal** en las [políticas de acceso compartido](#configure-shared-access-policy) de su instancia de Event Hub.
    1. Ingrese su frase de contraseña de TLS de Kafka.
        - Esta es la **Clave principal** en las [políticas de acceso compartido](#configure-shared-access-policy) de su instancia de Event Hub.
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="La página de instalación con valores de ejemplo para las variables de entorno de Kafka" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Solución de problemas {#troubleshooting}

Si tiene problemas después de instalar el Worker, verifique su archivo de entorno de Observability Pipelines (`/etc/default/observability-pipelines-worker`) para asegurarse de que las variables de entorno estén configuradas correctamente:

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### Falta la variable de entorno {#missing-environment-variable}

Si ve el error `Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` y está ejecutando el Worker en una VM, asegúrese de que la variable esté entre comillas (`"`) cuando ejecute el script de instalación del Worker. Por ejemplo:

```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```

## Métricas de salud {#health-metrics}

Para las [métricas de componente][1] y las [métricas de búfer de fuente][2] emitidas por todas las fuentes, consulte la documentación de [métricas de uso de Pipelines][3]. Dado que utiliza la fuente de Kafka para enviar registros desde Azure Event Hubs a los Observability Pipelines, utilice la etiqueta `component_type:kafka` para filtrar las métricas relevantes.

[1]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/