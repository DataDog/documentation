---
disable_toc: false
title: Enviar logs de Azure Event Hubs a Observability Pipelines
---

## Información general

Este documento explica cómo enviar logs de Azure Event Hubs a Observability Pipelines utilizando la fuente de Kafka. Los pasos de configuración incluyen la configuración de Azure Event Hubs para la fuente de Kafka:

- [Crear un espacio de nombres de Event Hubs](#create-an-azure-event-hubs-namespace)
- [Crear un Evenr Hub (tema de Kafka)](#create-an-event-hub-kafka-topic)
- [Configurar política de acceso compartido](#configure-shared-access-policy)
- [Configurar ajustes de diagnóstico](#set-up-diagnostic-settings)
- [Configurar conexión compatible con Kafka para el centro de eventos](#configure-kafka-compatible-connection-for-the-event-hub)

Después de configurar Azure Event Hubs, [configura un pipeline con la fuente de Kafka](#set-up-a-pipeline-with-the-kafka-source) para enviar los logs de Azure Event Hubs a Observability Pipelines.

## Configurar Azure Event Hubs para la fuente de Kafka

### Crear un espacio de nombres de Azure Event Hubs

1. En el Portal Azure, navega hasta [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces).
1. Haz clic en **Create** (Crear).
1. Rellena los **detalles del proyecto** (suscripción, grupo de recursos) y los **detalles de la instancia** (nombre del espacio de nombres, región, selecciona el nivel Estándar, Premium o Dedicado).
1. Asegúrate de que la región coincide con tus recursos Azure (por ejemplo, `westus`).
1. Haz clic en **Review + create** (Revisar + crear).

**Nota**: El endpoint de Kafka se habilita automáticamente para los niveles estándar y superiores.

### Crear un centro de eventos (tema de Kafka)

1. En el espacio de nombres que has creado, selecciona **Event Hubs** y haz clic en **+ Event Hub**.
1. Introduce un nombre (por ejemplo, `datadog-topic`) y configura los ajustes (por ejemplo, 4 particiones y un tiempo de retención de 7 días).
1. Haz clic en **Review + create** (Revisar + crear). Este Event Hub actúa como un tema de Kafka.

### Configurar la política de acceso compartido

1. En el centro de eventos que has creado, ve a **Settings** > **Shared access policies** (Ajustes > Políticas de acceso compartido).
1. Haz clic en **+ Add** (+ Añadir).
1. Introduce un nombre de política (por ejemplo, `DatadogKafkaPolicy`).
1. Selecciona la casilla **Manage** (Gestionar), que debería seleccionar automáticamente las casillas **Send** (Enviar) y **Listen** (Escuchar).
1. Haz clic en **Create** (Crear).
1. La **clave principal** y la **cadena de conexión principal** son necesarias para la autenticación de Kafka cuando se configura la fuente de Kafka de Observability Pipelines.

### Configurar los ajustes de diagnóstico

1. Configurs los recursos de Azure (por ejemplo, VMs, App Services) o los logs de actividad a nivel de suscripción para transmitir logs al Event Hub.
1. Para obtener recursos:
    1. Navega hasta el recurso y luego hasta **Monitoring** > **Diagnostic settings** (Monitorización > Ajustes de diagnóstico).
    1. Haz clic en **+ Add diagnostic setting** (+ Añadir parámetro de diagnóstico).
    1. Selecciona las categorías de log que desees (por ejemplo, AuditLogs, SignInLogs para Microsoft Entra ID).
    1. En **Destination details** (Detalles del destino):
        1. Marca la casilla **Stream to an event hub** (Transmitir a un Event Hub).
        1. Selecciona el espacio de nombres y el Event Hub (`datadog-topic`).
    1. Haz clic en **Save** (Guardar).
1. Para los logs de actividad:
    1. Ve a **Microsoft Entra ID** > **Monitoring** > **Audit logs** > **Export Data Settings** (Microsoft Entra ID > Monitorización > Logs de auditoría > Ajustes de exportación de datos).
    1. Marca la casilla **Stream to the Event Hub** (Transmitir al Event Hub).
1. Repítelo para cada región. Los logs deben transmitirse a los Events Hubs de la misma región.

### Configurar una conexión compatible con Kafka para el Event Hub

Azure Event Hubs expone un endpoint de Kafka en `NAMESPACE.servicebus.windows.net:9093`, que Observability Pipelines utiliza como fuente de Kafka.

#### Obtener el endpoint de Kafka

1. En el portal de Azure, navega hasta tu espacio de nombres de Event Hubs (por ejemplo, `myeventhubns`).
1. En la página **Overview** (Información general), en la sección **Essentials** (Elementos esenciales), ubica el **Host name** (Nombre de host) o **Fully Qualified Domain Name (FQDN)**. Tiene el siguiente formato: `<NAMESPACE>.servicebus.windows.net` (por ejemplo: `myeventhubns.servicebus.windows.net`).
1. Añade el puerto de Kafka `:9093` para formar el valor Bootstrap Servers (Servidores de arranque): `<NAMESPACE>.servicebus.windows.net:9093`.
    - Por ejemplo, si tu espacio de nombres es `myeventhubns`, los servidores de arranque son `myeventhubns.servicebus.windows.net:9093`.
    - Necesitarás esta información cuando configures la fuente de Kafka de Observability Pipelines.

#### Configurar la autenticación

1. Azure Event Hubs utiliza SASL_SSL con el mecanismo PLAIN para la autenticación de Kafka.
1. La cadena de conexión está formateada para Observability Pipelines:
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Configurar un pipeline con la fuente de Kafka

Selecciona tu plataforma.

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. Navega hasta [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Selecciona la fuente de Kafka.
    1.  En el campo **Group ID** (ID de grupo), especifica o crea un grupo de consumidores único (por ejemplo, `datadog-consumer-group`).
    1.  En el campo **Topics** (Temas), introduce `datadog-topic` o el tema que configuraste anteriormente para tu Event Hub.
    1.  Activa el interruptor para habilitar la autenticación SASL.
    1.  En el menú desplegable **Mechanism** (Mecanismo), selecciona **PLAIN**.
    1.  Activa TLS.
        1. Configura tu archivo `values.yaml` para utilizar el certificado que forma parte de la imagen del contenedor:
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
            **Nota**: Al instalar el worker con el comando install es necesario añadir:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        1. En el campo **Certificate path** (Ruta del certificado), introduce `/ca-certificates.crt` si has utilizado el ejemplo anterior. De lo contrario, introduce el nombre de tu certificado.
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="Los ajustes de la fuente de Kafka con valores de ejemplo" style="width:45%;" >}}
1. Pulsa **Next: Select Destination** (Siguiente: Seleccionar destino).
1. Después de configurar tus destinos y procesadores, haz clic en **Next: Install** (Siguiente: Instalar).
1. Selecciona tu plataforma en el menú desplegable **Elige tu plataforma de instalación**.
1. Introduce las variables de entorno para tu fuente de Kafka:
    1.  Para **Kafka Bootstrap Servers** (Servidores de arranque de Kafka), introduce `<NAMESPACE>.servicebus.windows.net:9093` (por ejemplo, `myeventhubns.servicebus.windows.net:9093`).
    1.  Para **Kafka SASL Username** (Nombre de usuario SASL de Kafka), introduce `$$$$ConnectionString`. **Nota**: Debes poner `$$$$` delante de `ConnectionString` porque `$$$$` acaba siendo `$$` cuando se transpone al entorno.
    1.  Para **Kafka SASL Password** (Contraseña SASL de Kafka), introduce la cadena de conexión completa. Por ejemplo, `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`.
        - Esta es la **cadena de conexión primaria** en las [políticas de acceso compartido] de tu instancia de Event Hub(#configure-shared-access-policy).
    1. Introduce tu contraseña TLS de Kafka.
        - Esta es la **clave principal** en las [políticas de acceso compartido] de tu instancia de Event Hub (#configure-shared-access-policy).
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="La página de instalación con valores de ejemplo para las variables de entorno de Kafka" style="width:60%;" >}}
1. Introduce las variables de entorno para tus destinos, si procede.
1. Sigue el resto de instrucciones en la página para instalar el Worker en función de tu plataforma.
{{% /tab %}}
{{% tab "Virtual machine (VM)" %}}

1. Navega hasta [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Selecciona la fuente de Kafka.
    1.  En el campo **Group ID** (ID de grupo), especifica o crea un grupo de consumidores único (por ejemplo, `datadog-consumer-group`).
    1.  Introduzca `datadog-topic` en el campo **Topics** (Temas).
    1.  Activa el interruptor para habilitar la autenticación SASL.
    1.  En el menú desplegable **Mechanism** (Mecanismo), selecciona **PLAIN**.
    1.  Habilita TLS. Para el certificado, copia el certificado desde su ubicación original al directorio de configuración de datos por defecto de Observability Pipelines:
        1. Dado que aún no se ha instalado el worker de Observability Pipelines, ejecuta este comando para crear el directorio para el certificado:
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Ejecuta este comando para copiar el certificado en el directorio que has creado:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        1. En el campo **Certificate path** (Ruta del certificado), introduce `/ca-certificates.crt`.
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="Ajustes de la fuente de Kafka con valores de ejemplo" style="width:45%;" >}}
1. Pulsa **Next: Select Destination** (Siguiente: Seleccionar destino).
1. Después de configurar tus destinos y procesadores, haz clic en **Next: Install** (Siguiente: Instalar).
1. Selecciona tu plataforma en el menú desplegable **Elige tu plataforma de instalación**.
1. Introduce las variables de entorno para tu fuente de Kafka:
    1.  Para **Kafka Bootstrap Servers** (Servidores de arranque de Kafka), introduce `<NAMESPACE>.servicebus.windows.net:9093` (por ejemplo, `myeventhubns.servicebus.windows.net:9093`).
    1.  Para **Kafka SASL Username** (Nombre de usuario SASL de Kafka), introduce `\$\$ConnectionString`. **Nota**: Debes escapar el `$` delante de `ConnectionString`, de lo contrario la variable de entorno no se cargará.
    1.  Para **Kafka SASL Password** (Contraseña SASL de Kafka), introduce la cadena de conexión completa entre comillas (`"`). Por ejemplo, `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`.
        - Esta es la **cadena de conexión primaria** en las [políticas de acceso compartido] de tu instancia de Event Hub(#configure-shared-access-policy).
    1. Introduce tu contraseña TLS de Kafka.
        - Esta es la **clave principal** en las [políticas de acceso compartido] de tu instancia de Event Hub (#configure-shared-access-policy).
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="La página de instalación con valores de ejemplo para las variables de entorno de Kafka" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Si tienes problemas después de instalar el worker, comprueba tu archivo de entorno de Observability Pipelines (`/etc/default/observability-pipelines-worker`) para asegurarte de que las variables de entorno están correctamente configuradas:

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### Falta una variable de entorno

Si ves el error `Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` y estás ejecutando el worker en una VM, asegúrate de que la variable está entre comillas (`"`) cuando ejecutes el script de instalación del worker. Por ejemplo:
```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```