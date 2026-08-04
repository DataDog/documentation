---
aliases:
- /es/integrations/awsrds/
- /es/integrations/rds/
- /es/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
app_id: amazon_rds
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
- network
custom_kind: integración
description: Rastrea una gran cantidad de métricas relacionadas con Amazon RDS.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/
  tag: Blog
  text: Monitorizar métricas de rendimiento de RDS MySQL
- link: https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/
  tag: Blog
  text: Métricas clave para monitorizar AWS RDS PostgreSQL
- link: https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/
  tag: Blog
  text: Monitorizar métricas de rendimiento de Amazon Aurora
title: Amazon RDS
---
{{< img src="integrations/awsrds/rdsdashboard.png" alt="Dashboard RDS" popup="true">}}

## Información general

Amazon Relational Database Service (RDS) es un servicio web utilizado para configurar, operar y escalar una base de datos relacional en la nube. Habilita esta integración para ver todas tus métricas de RDS en Datadog.

**Nota**: Asegúrate de que la variable de entorno `DD_SITE` está establecida en tu región fuera del código, {{< region-param key="dd_site" code="true" >}}, o establece la variable en el código de la siguiente manera:

`DD_SITE = os.getenv("DD_SITE", default="{{< region-param key="dd_site" code="true" >}}")`

Existen tres opciones para la monitorización de instancias RDS: Estándar, Mejorada y Nativa. **Revisa la [lista de métricas](#data-collected) completa antes de elegir una configuración**, ya que cada métrica está etiquetada con su configuración correspondiente. Además, revisa la información que aparece a continuación para conocer mejor los requisitos de cada configuración y el dashboard preestablecido:

{{< tabs >}}

{{% tab "Standard" %}}

La integración estándar requiere habilitar RDS en la pestaña `Metric Collection` de la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services). Esto te permite recibir métricas sobre tu instancia tan a menudo como tu integración de CloudWatch lo permita. Se admiten todos los tipos de motores de RDS.

El dashboard preestablecido para esta integración incluye la siguiente información métrica: conexión, latencia de replicación, operaciones de lectura y latencia, ordenador, RAM, operaciones de escritura y latencia, y métricas de disco.

{{% /tab %}}

{{% tab "Enhanced" %}}

La integración mejorada requiere configuración adicional y está disponible para motores MySQL, Aurora, MariaDB, SQL Server, Oracle y PostgreSQL. Hay métricas adicionales disponibles, pero se requiere AWS Lambda para enviar las métricas a Datadog. La mayor especificidad y los servicios adicionales requeridos pueden dar lugar a cargos adicionales de AWS.

El dashboard preestablecido para esta integración incluye la siguiente información métrica: cargas, tiempo de actividad, utilización de CPU, tareas, memoria, SWAP, recepción de red, transmisión de red, CPU utilizada por proceso, memoria utilizada por proceso, operaciones de disco, sistema de archivos utilizado (pct), tareas en ejecución y utilización de la CPU del sistema.

{{% /tab %}}

{{% tab "Native" %}}

La integración nativa de bases de datos es opcional y está disponible para los motores MySQL, Aurora, MariaDB, SQL Server y PostgreSQL. Para que las métricas de RDS y las de la integración nativa coincidan, utiliza la etiqueta (tag) `dbinstanceidentifier` de la integración nativa basada en el identificador que asignes a la instancia RDS. A las instancias RDS se les asigna automáticamente la etiqueta.

Hay 3 dashboards preestablecidos disponibles para esta configuración: MySQL, Aurora y PostgreSQL. Cada dashboard incluye la siguiente información métrica: volumen de consultas, E/S de disco, conexiones, replicación y métricas de recursos de AWS.

**Nota**: Estos dashboards muestran métricas tanto de AWS CloudWatch como del propio motor de base de datos individual. Habilita una de las integraciones, [MySQL](https://app.datadoghq.com/integrations/amazon-web-services), [Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html) o [PostgreSQL](https://docs.datadoghq.com/integrations/postgres/), para todas las métricas de la integración.

{{% /tab %}}

{{< /tabs >}}

## Configuración

### Instalación

{{< tabs >}}

{{% tab "Standard" %}}

Para la integración estándar de RDS, configura primero la [integración de Amazon Web Services](https://app.datadoghq.com/integrations/amazon-web-services).

{{% /tab %}}

{{% tab "Enhanced" %}}

Habilita la monitorización mejorada para tu instancia de RDS durante la creación de la instancia o después eligiendo **Modify** (Modificar) en **Instance Actions** (Acciones de Instancia). Se recomienda elegir `15` para Monitorizar la granularidad. 

Las siguientes instrucciones utilizan KMS y la consola de gestión de Lambda para crear una versión cifrada de tu clave de API de Datadog que solo puede utilizarse con la función Lambda RDS Enhanced Monitoring. Si ya dispones de una clave de API cifrada de otro Lambda como [Log Forwarder](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html), consulta [el README de la función Lambda](https://docs.datadoghq.com/integrations/postgres/) para conocer otras opciones.

#### Crear tu clave de KMS

1. Abre la página de inicio de KMS en https://console.aws.amazon.com/kms/home.
1. Entra en **Customer managed keys** (Claves gestionadas por el cliente).
1. Elige **Crear clave**.
1. Introduce un Alias para la clave, como por ejemplo `lambda-datadog-key`. _Nota: Un alias no puede empezar por aws. Los alias que comienzan por aws están reservados por Amazon Web Services para representar CMKs gestionadas por AWS en tu cuenta._
1. Añade los administradores adecuados para determinar quién puede administrar esta clave.
1. No es necesario añadir roles.
1. Guarda tu clave de KMS.

#### Crea tu aplicación Lambda

1. Desde la [consola de gestión de Lambda](https://console.aws.amazon.com/lambda/), crea una nueva aplicación Lambda.
   **Nota**: Tu aplicación Lambda debe estar en la misma región que la clave KMS que has creado.
1. Elige la pestaña **Serverless application** (Aplicación sin servidor).
1. Busca y selecciona `Datadog-RDS-Enhanced`.
1. Dale un nombre único a la aplicación .
1. En el campo **KMSKeyId**, pega el ID de la clave creada en la sección anterior.
1. Haz clic en **Deploy** (Desplegar).

#### Configurar el cifrado con KMS

1. Una vez desplegada la aplicación, haz clic en su valor **Logical ID** (ID lógico) en la sección **Resources** (Recursos) para abrir la función Lambda.
1. Selecciona la pestaña **Configuration** (Configuración).
1. Haz clic en la opción **Environment variables** (Variables de entorno) del menú de la izquierda.
1. Haz clic en **Edit** (Editar).
1. Para la variable de entorno `kmsEncryptedKeys`, añade el valor de tu [clave de API de Datadog](https://app.datadoghq.com/integrations/amazon-web-services) en el campo **Value** (Valor), en formato JSON: `{"api_key":"<YOUR_API_KEY>"}`.
1. Seleccione **Enable helpers for encryption in transit** (Habilitar axiliares para el cifrado en tránsito).
1. Asegúrate de que está seleccionado **Use a customer master key** (Utilizar una clave maestra de cliente) y de que se introduce el ARN de la clave de KMS creada anteriormente en el campo **Customer master key** (Clave maestra de cliente).
1. Haz clic en **Encript** (Encriptar) junto al valor de la variable de entorno `kmsEncryptedKeys`.
1. En la ventana emergente, selecciona la misma clave de KMS creada anteriormente.
1. Haz clic en **Encript** (Encriptar).
1. Haz clic en **Save** (Guardar).

#### Añadir un activador a tu grupo de logs de CloudWatch

1. En la página de la función Lambda creada, haz clic en **Add trigger** (Añadir activador).
1. En **Trigger configuration** (Activar configuración), selecciona **CloudWatch Logs**.
1. En **Log group** (Grupo de logs), selecciona el grupo de logs de CloudWatch `RDSOSMetrics`.
1. Da un nombre al filtro y, opcionalmente, especifica un patrón de filtrado.
1. Haz clic en **Add** (Añadir).

**Nota**: No se pueden crear eventos de test en la pestaña **Test** con esta configuración.

{{% /tab %}}

{{% tab "Native" %}}

1. Ve a la consola de AWS y abre la sección de RDS para encontrar la instancia que quieres monitorizar.
   {{< img src="integrations/awsrds/rds-console.png" alt="RDS console" >}}
1. Anota la URL del endpoint, por ejemplo: **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**, que se utiliza para configurar el Agent. Asimismo, toma nota del `DB Instance identifier`, por ejemplo: **mysqlrds**, que se utiliza para crear gráficos y dashboards.

{{% /tab %}}

{{< /tabs >}}

### Configuración

{{< tabs >}}

{{% tab "Standard" %}}

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `RDS` está activado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html) para recopilar métricas de Amazon RDS. Para obtener más información, consulta las [políticas de RDS](https://docs.datadoghq.com/integrations/postgres/) en el sitio web de AWS.

   | Permiso de AWS             | Descripción                          |
   | ------------------------- | ------------------------------------ |
   | `rds:DescribeDBInstances` | Describe instancias de RDS para añadir etiquetas.  |
   | `rds:ListTagsForResource` | Añade etiquetas personalizadas en instancias de RDS.    |
   | `rds:DescribeEvents` | Añade eventos relacionados con bases de datos de RDS. |

1. Instala la [integración de Datadog y Amazon RDS](https://console.aws.amazon.com/lambda/).

{{% /tab %}}

{{% tab "Enhanced" %}}

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `RDS` está activado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html) para recopilar métricas de Amazon RDS. Para obtener más información, consulta las [políticas de RDS](https://docs.datadoghq.com/integrations/postgres/) en el sitio web de AWS.

   | Permiso de AWS             | Descripción                          |
   | ------------------------- | ------------------------------------ |
   | `rds:DescribeDBInstances` | Describe instancias de RDS para añadir etiquetas.  |
   | `rds:ListTagsForResource` | Añade etiquetas personalizadas en instancias de RDS.    |
   | `rds:DescribeEvents` | Añade eventos relacionados con bases de datos de RDS. |

1. Instala la [integración de Datadog y Amazon RDS](https://console.aws.amazon.com/lambda/).

{{% /tab %}}

{{% tab "Native" %}}

Configura un Agent y conéctate a tu instancia RDS editando el archivo yaml apropiado en tu directorio conf.d y luego reinicia tu Agent:

Para RDS Aurora, edita el archivo YAML del tipo de base de datos que estés utilizando.

Si estás usando MySQL o MariaDB, edita `mysql.yaml`

```yaml
init_config:

instances:
    # The endpoint URL from the AWS console
    - server: 'mysqlrds.blah.us-east-1.rds.amazonaws.com'
      user: '<USERNAME>'
      pass: '<PASSWORD>'
      port: 3306
      tags:
          - 'dbinstanceidentifier:<INSTANCE_NAME>'
```

Si estás usando PostgreSQL, edita `postgres.yaml`:

```yaml
init_config:

instances:
    - host: 'postgresqlrds.blah.us-east-1.rds.amazonaws.com'
      port: 5432
      username: '<USERNAME>'
      password: '<PASSWORD>'
      dbname: '<DB_NAME>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

Si estás usando Microsoft SQL, edita `sqlserver.yaml`:

```yaml
init_config:

instances:
    - host: 'sqlserverrds.blah.us-east-1.rds.amazonaws.com,1433'
      username: '<USERNAME>'
      password: '<PASSWORD>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

### Validación

[Ejecuta el subcomando de estado del Agent](https://app.datadoghq.com/integrations/amazon-web-services) y busca algo similar en la sección Checks:

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

{{% /tab %}}

{{< /tabs >}}

### Utilización

Después de unos minutos, se puede acceder a las métricas de RDS y las [métricas de MySQL, Aurora, MariaDB, SQL Server, Oracle, o PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html) en Datadog desde el Metrics Explorer, [dashboards](https://docs.datadoghq.com/dashboards/), y [alertas](https://docs.datadoghq.com/monitors/).
Este es un ejemplo de un dashboard de Aurora que muestra varias métricas tanto de RDS como de la integración de MySQL. Las métricas de ambas integraciones en la instancia `quicktestrds` se unifican utilizando la etiqueta `dbinstanceidentifier`.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash" popup="true">}}

### Recopilación de logs

#### Activar logging

Es posible reenviar logs de MySQL, MariaDB y Postgres a Amazon CloudWatch. Sigue las instrucciones de [Monitorizar los logs de Amazon Aurora MySQL, Amazon RDS para MySQL y MariaDB con Amazon CloudWatch](https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch) para comenzar a enviar tus logs de RDS a CloudWatch.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function).
1. Una vez instalada la función Lambda, añade manualmente un activador en el grupo de logs de CloudWatch que contenga tus logs de RDS. Selecciona el grupo de logs de CloudWatch correspondiente, añade un nombre de filtro (opcional) y añade el activador.

Una vez hecho esto, entra en tu [sección Log de Datadog](https://app.datadoghq.com/logs) para explorar tus logs.

## Datos recopilados

Además de las [métricas recopiladas de los motores de base de datos](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html), también recibirás las siguientes métricas de RDS.

### Métricas

| | |
| --- | --- |
| **aws.rds.active_transactions** <br>(gauge) | La tasa media de transacciones actuales que se ejecutan en una instancia de base de datos. Solo disponible para bases de datos Aurora MySQL.<br>_Se muestra como transacción_ |
| **aws.rds.aurora_binlog_replica_lag** <br>(gauge) | La cantidad de tiempo que un clúster de réplica de base de datos que se ejecuta en Aurora con compatibilidad MySQL se retrasa con respecto al clúster de base de datos fuente. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como segundo_ |
| **aws.rds.aurora_replica_lag** <br>(gauge) | El retraso medio al replicar actualizaciones desde la instancia primaria. Solo disponible para bases de datos de Aurora.<br>_Se muestra en milisegundos_ |
| **aws.rds.aurora_replica_lag_maximum** <br>(gauge) | La cantidad máxima de retraso entre la instancia primaria y cada instancia de Aurora en el clúster de base de datos. Solo disponible para bases de datos de Aurora.<br>_Se muestra como milisegundo_ |
| **aws.rds.aurora_replica_lag_minimum** <br>(gauge) | La cantidad mínima de retraso entre la instancia primaria y cada instancia de Aurora en el clúster de base de datos. Solo disponible para base de datos de Aurora.<br>_Se muestra como milisegundo_ |
| **aws.rds.backup_retention_period_storage_used** <br>(gauge) | La cantidad de almacenamiento de copias de seguridad utilizado para almacenar copias de seguridad continuas en el momento actual. Solo disponible para bases de datos de Aurora. <br>_Se muestra en bytes_ |
| **aws.rds.bin_log_disk_usage** <br>(gauge) | Cantidad de espacio en disco ocupado por logs binarios en el maestro. Solo disponible para bases de datos que no sean de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.blocked_transactions** <br>(count) | Tasa media de transacciones bloqueadas en la base de datos. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como transacción_ |
| **aws.rds.buffer_cache_hit_ratio** <br>(gauge) | Porcentaje de solicitudes servidas por la caché del búfer. Solo disponible para bases de datos de Aurora.<br>_Se muestra como porcentaje_ |
| **aws.rds.burst_balance** <br>(gauge) | Porcentaje de créditos de E/S del bucket de ráfaga de SSD de uso general (gp2) disponibles. Solo disponible para bases de datos que no sean de Aurora.<br>_Se muestra como porcentaje_ |
| **aws.rds.commit_latency** <br>(gauge) | La cantidad de latencia para las transacciones comprometidas. Solo disponible para bases de datos de Aurora.<br>_Se muestra en milisegundos_ |
| **aws.rds.commit_throughput** <br>(rate) | Tasa media de transacciones comprometidas. Solo disponible para bases de datos de Aurora.<br>_Se muestra como transacción_ |
| **aws.rds.cpucredit_balance** <br>(gauge) | \[instancias T2\] Número de créditos de CPU que ha acumulado una instancia. Disponible para bases de datos de Aurora.|
| **aws.rds.cpucredit_usage** <br>(gauge) | \[Instancias T2\] Número de créditos de CPU consumidos. Disponible para bases de datos de Aurora.|
| **aws.rds.cpusurplus_credit_balance** <br>(gauge) | El número de créditos excedentes que han sido consumidos por una instancia ilimitada cuando su valor CPUCreditBalance es cero.|
| **aws.rds.cpusurplus_credits_charged** <br>(gauge) | El número de créditos excedentes consumidos que no se amortizan con créditos de CPU ganados y que, por lo tanto, incurren en un cargo adicional.|
| **aws.rds.cpuutilization** <br>(gauge) | Porcentaje de utilización de la CPU. Métrica recomendada para la monitorización estándar. Disponible para bases de datos de Aurora.<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.guest** <br>(gauge) | El porcentaje de CPU en uso por los programas invitados. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.idle** <br>(gauge) | El porcentaje de CPU que está inactivo. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.irq** <br>(gauge) | El porcentaje de CPU en uso por interrupciones de software. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.kern** <br>(gauge) | El porcentaje de CPU en uso por el kernel. (Mejorado, solo SQL Server)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.maximum** <br>(gauge) | Porcentaje máximo de utilización de la CPU.<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.nice** <br>(gauge) | El porcentaje de CPU en uso por los programas que se ejecutan con la prioridad más baja. (Mejorado)<br>_Se muestra en porcentaje_ |
| **aws.rds.cpuutilization.steal** <br>(gauge) | El porcentaje de CPU en uso por otras máquinas virtuales. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.system** <br>(gauge) | El porcentaje de CPU en uso por el kernel. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.total** <br>(gauge) | El porcentaje total de la CPU en uso. Este valor excluye el valor agradable. Métrica recomendada para la monitorización mejorada. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.user** <br>(gauge) | El porcentaje de CPU en uso por los programas de usuario. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.cpuutilization.wait** <br>(gauge) | Porcentaje de CPU no utilizado mientras se espera un acceso de E/S. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.database_connections** <br>(gauge) | Número de conexiones de base de datos en uso. Disponible para bases de datos de Aurora.<br>_Se muestra como conexión_ |
| **aws.rds.dbload** <br>(gauge) | El número de sesiones activas para el motor de base de datos (Performance Insights debe estar activado).<br>_Se muestra como sesión_ |
| **aws.rds.dbload_cpu** <br>(gauge) | El número de sesiones activas en las que el tipo de evento de espera es CPU (Performance Insights debe estar activado).<br>_Se muestra como sesión_ |
| **aws.rds.dbload_non_cpu** <br>(gauge) | El número de sesiones activas en las que el tipo de evento de espera no es CPU (Performance Insights debe estar activado).<br>_Se muestra como sesión_ |
| **aws.rds.dbload_relative_to_num_vcpus** <br>(gauge) | La relación entre la carga de la base de datos y el número de CPU virtuales para la base de datos.<br>_Se muestra como porcentaje_ |
| **aws.rds.ddllatency** <br>(gauge) | La cantidad de latencia para las solicitudes DDL (crear/alterar/eliminar). Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.ddlthroughput** <br>(rate) | Tasa media de solicitudes DDL por segundo. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como solicitud_ |
| **aws.rds.deadlocks** <br>(count) | Número medio de bloqueos en la base de datos por segundo. Solo disponible para bases de datos de Aurora.<br>_Se muestra como bloqueo_ |
| **aws.rds.delete_latency** <br>(gauge) | Latencia media de las consultas de borrado. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.delete_throughput** <br>(rate) | Tasa media de consultas de borrado. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como consulta_ |
| **aws.rds.disk_queue_depth** <br>(gauge) | Número de E/S (solicitudes de lectura/escritura) pendientes de acceso al disco. Disponible para bases de datos de Aurora.<br>_Se muestra como solicitud_ |
| **aws.rds.diskio.avgQueueLen** <br>(gauge) | Número de solicitudes en espera en la cola del dispositivo de E/S. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como solicitud_ |
| **aws.rds.diskio.avgReqSz** <br>(gauge) | El tamaño medio de las solicitudes. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.diskio.await** <br>(gauge) | El número de milisegundos necesarios para responder a las solicitudes, incluido el tiempo en cola y el tiempo de servicio. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como milisegundo_ |
| **aws.rds.diskio.readIOsPS** <br>(rate) | La tasa de operaciones de lectura. (Mejorado)<br>_Se muestra como operación_ |
| **aws.rds.diskio.readKb** <br>(gauge) | La cantidad total de datos leídos. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.diskio.readKbPS** <br>(rate) | La velocidad a la que se leen los datos. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.diskio.readLatency** <br>(gauge) | El tiempo transcurrido entre el envío de una solicitud de E/S de lectura y su finalización, en milisegundos. (Mejorado, solo Aurora)<br>_Se muestra como milisegundo_ |
| **aws.rds.diskio.readThroughput** <br>(rate) | La cantidad de rendimiento de red utilizado por las solicitudes al clúster de base de datos, en bytes por segundo. (Mejorado, solo Aurora)<br>_Se muestra como byte_ |
| **aws.rds.diskio.rrqmPS** <br>(rate) | La tasa de cola de solicitudes de lectura fusionadas. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como solicitud_ |
| **aws.rds.diskio.tps** <br>(rate) | La tasa de transacciones de E/S. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como transacción_ |
| **aws.rds.diskio.util** <br>(gauge) | El porcentaje de tiempo de CPU durante el cual se emitieron solicitudes. Porcentaje de tiempo de CPU durante el cual se emitieron solicitudes. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.diskio.writeIOsPS** <br>(rate) | La tasa de operaciones de escritura. (Mejorado)<br>_Se muestra como operación_ |
| **aws.rds.diskio.writeKb** <br>(gauge) | La cantidad total de datos escritos. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.diskio.writeKbPS** <br>(rate) | La velocidad a la que se escriben los datos. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.diskio.writeLatency** <br>(gauge) | El tiempo medio transcurrido entre el envío de una solicitud de E/S de escritura y su finalización, en milisegundos. (Mejorado, solo Aurora)<br>_Se muestra como milisegundo_ |
| **aws.rds.diskio.writeThroughput** <br>(rate) | La cantidad de rendimiento de red utilizado por las respuestas del clúster de base de datos, en bytes por segundo. (Mejorado, solo Aurora)<br>_Se muestra como byte_ |
| **aws.rds.diskio.wrqmPS** <br>(rate) | La tasa de cola de solicitudes de escritura fusionadas. Esta métrica no está disponible para Amazon Aurora. (Mejorado)<br>_Se muestra como solicitud_ |
| **aws.rds.dmllatency** <br>(gauge) | La latencia media para inserciones, actualizaciones y eliminaciones. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.dmlthroughput** <br>(rate) | Tasa media de inserciones, actualizaciones y eliminaciones. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como operación_ |
| **aws.rds.engine_uptime** <br>(gauge) | La cantidad de tiempo que la instancia de base de datos ha estado activa. Solo disponible para bases de datos de Aurora.<br>_Se muestra como segundo_ |
| **aws.rds.failed_sqlserver_agent_jobs_count** <br>(count) | El número de trabajos fallidos del Agent de SQL Server durante el último minuto.<br>_Se muestra como minuto_ |
| **aws.rds.filesystem.maxFiles** <br>(gauge) | El número máximo de archivos que se pueden crear para el sistema de archivos. (Mejorado)<br>_Se muestra como archivo_ |
| **aws.rds.filesystem.total** <br>(gauge) | La cantidad total de espacio en disco disponible para el sistema de archivos. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.filesystem.used** <br>(gauge) | La cantidad de espacio en disco utilizado por los archivos en el sistema de archivos. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.filesystem.usedFilePercent** <br>(gauge) | El porcentaje de archivos disponibles en uso. (Mejorado)<br>_Se muestra en porcentaje_ |
| **aws.rds.filesystem.usedFiles** <br>(gauge) | El número de archivos en el sistema de archivos. (Mejorado)<br>_Se muestra como archivo_ |
| **aws.rds.filesystem.usedPercent** <br>(gauge) | El porcentaje de espacio en disco del sistema de archivos en uso. (Mejorado)<br>_Se muestra en porcentaje_ |
| **aws.rds.free_local_storage** <br>(gauge) | La cantidad de almacenamiento local que está libre en una instancia. Solo disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.free_storage_space** <br>(gauge) | Cantidad de espacio de almacenamiento disponible.<br>_Se muestra como byte_ |
| **aws.rds.freeable_memory** <br>(gauge) | Cantidad de memoria de acceso aleatorio disponible.<br>_Se muestra como byte_ |
| **aws.rds.insert_latency** <br>(gauge) | La cantidad de latencia para las consultas de inserción. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.insert_throughput** <br>(rate) | Tasa media de consultas de inserción. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como consulta_ |
| **aws.rds.load.1** <br>(gauge) | Número de procesos que han solicitado tiempo de CPU durante el último minuto. (Mejorado)<br>_Se muestra como proceso_ |
| **aws.rds.load.15** <br>(gauge) | Número de procesos que han solicitado tiempo de CPU en los últimos 15 minutos. (Mejorado)<br>_Se muestra como proceso_ |
| **aws.rds.load.5** <br>(gauge) | Número de procesos que han solicitado tiempo de CPU en los últimos 5 minutos. (Mejorado)<br>_Se muestra como proceso_ |
| **aws.rds.login_failures** <br>(count) | Número medio de intentos de inicio de sesión fallidos por segundo.  Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como operación_ |
| **aws.rds.maximum_used_transaction_ids** <br>(count) | El ID de transacción máximo que se ha utilizado. Solo disponible para bases de datos de Aurora PostgreSQL.|
| **aws.rds.memory.active** <br>(gauge) | La cantidad de memoria asignada. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.buffers** <br>(gauge) | Cantidad de memoria utilizada para almacenar en búfer las solicitudes de E/S antes de escribir en el dispositivo de almacenamiento. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.cached** <br>(gauge) | La cantidad de memoria utilizada para el almacenamiento en caché de E/S basadas en el sistema de archivos. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.commitLimitKb** <br>(gauge) | El valor máximo posible para la métrica commitTotKb. Este valor es la suma del tamaño actual del archivo de páginas más la memoria física disponible para contenidos paginables, excluyendo la RAM asignada a áreas no paginables. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.commitPeakKb** <br>(gauge) | El mayor valor de la métrica commitTotKb desde la última vez que se inició el sistema operativo. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.commitTotKb** <br>(gauge) | La cantidad de espacio de direcciones virtuales respaldado por archivos de páginas en uso, es decir, la carga de confirmación actual. Este valor se compone de memoria principal (RAM) y disco (archivos de página). (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.dirty** <br>(gauge) | La cantidad de páginas de memoria en RAM que se han modificado pero no se han escrito en su bloque de datos relacionado en el almacenamiento. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.free** <br>(gauge) | La cantidad de memoria no asignada. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.hugePagesFree** <br>(gauge) | El número de páginas enormes libres. (Mejorado)<br>_Se muestra como página_ |
| **aws.rds.memory.hugePagesRsvd** <br>(gauge) | El número de páginas enormes comprometidas. (Mejorado)<br>_Se muestra como página_ |
| **aws.rds.memory.hugePagesSize** <br>(gauge) | El tamaño de cada unidad de páginas gigantes. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.hugePagesSurp** <br>(gauge) | El número de páginas enormes sobrantes disponibles sobre el total. (Mejorado)<br>_Se muestra como página_ |
| **aws.rds.memory.hugePagesTotal** <br>(gauge) | El número total de páginas enormes del sistema. (Mejorado)<br>_Se muestra como página_ |
| **aws.rds.memory.inactive** <br>(gauge) | La cantidad de memoria inactiva (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.kernNonpagedKb** <br>(gauge) | La cantidad de memoria en el grupo de kernel no paginado. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.kernPagedKb** <br>(gauge) | La cantidad de memoria en el grupo de kernel paginado. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.kernTotKb** <br>(gauge) | La suma de la memoria en los grupos de kernel paginados y no paginados. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.mapped** <br>(gauge) | La cantidad total de contenido del sistema de archivos que está asignado en memoria dentro del espacio de direcciones de un proceso. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.pageSize** <br>(gauge) | El tamaño de una página. (Mejorado, solo SQL Server)<br>_Se muestra como byte_ |
| **aws.rds.memory.pageTables** <br>(gauge) | Cantidad de memoria utilizada por las tablas de página. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.physAvailKb** <br>(gauge) | La cantidad de memoria física disponible. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.physTotKb** <br>(gauge) | La cantidad de memoria física. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.slab** <br>(gauge) | Cantidad de estructuras de datos del kernel reutilizables. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.sqlServerTotKb** <br>(gauge) | La cantidad de memoria asignada a Microsoft SQL Server. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.sysCacheKb** <br>(gauge) | La cantidad de memoria caché del sistema. (Mejorada, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.total** <br>(gauge) | La cantidad total de memoria. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.memory.writeback** <br>(gauge) | La cantidad de páginas desfasada en RAM que todavía se están escribiendo en el almacenamiento de respaldo. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.network.rdBytesPS** <br>(gauge) | El número de bytes recibidos por segundo. (Mejorado, solo SQL Server)<br>_Se muestra como byte_ |
| **aws.rds.network.rx** <br>(gauge) | El número de paquetes recibidos. (Mejorado)<br>_Se muestra como paquete_ |
| **aws.rds.network.tx** <br>(gauge) | El número de paquetes cargados. (Mejorado)<br>_Se muestra como paquete_ |
| **aws.rds.network.wrBytesPS** <br>(gauge) | El número de bytes enviados por segundo. (Mejorado, solo SQL Server)<br>_Se muestra como byte_ |
| **aws.rds.network_receive_throughput** <br>(rate) | Tráfico de red entrante (recepción) en la instancia de base de datos. Disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.network_throughput** <br>(rate) | La tasa de rendimiento de red enviada y recibida de los clientes por cada instancia en el clúster de base de datos. Solo disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.network_transmit_throughput** <br>(rate) | Tráfico de red saliente (Transmisión) en la instancia de base de datos. Disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.oldest_replication_slot_lag** <br>(gauge) | El tamaño de la réplica más retrasada en términos de datos WAL recibidos. Solo disponible para bases de datos de Aurora PostgreSQL.<br>_Se muestra como byte_ |
| **aws.rds.process.cpuUsedPc** <br>(gauge) | El porcentaje de CPU utilizado por el proceso. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.process.memUsedPc** <br>(gauge) | Porcentaje de la memoria total utilizada por el proceso. (Mejorado, solo SQL Server)<br>_Se muestra como porcentaje_ |
| **aws.rds.process.memoryUsedPc** <br>(gauge) | El porcentaje de memoria utilizado por el proceso. (Mejorado)<br>_Se muestra como porcentaje_ |
| **aws.rds.process.parentID** <br>(gauge) | El identificador del proceso principal del proceso. (Mejorado)|
| **aws.rds.process.pid** <br>(gauge) | El identificador del proceso. Este valor no está presente para los procesos que son propiedad de Amazon RDS. (Mejorado, solo SQL Server)|
| **aws.rds.process.ppid** <br>(gauge) | El identificador del proceso principal de este proceso. Este valor solo está presente para procesos secundarios. (Mejorado, solo SQL Server)|
| **aws.rds.process.rss** <br>(gauge) | La cantidad de RAM asignada al proceso. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.process.tgid** <br>(gauge) | El identificador del grupo de subprocesos, que es un número que representa el ID del proceso al que pertenece un subproceso. Este identificador se utiliza para agrupar subprocesos de un mismo proceso. (Mejorado)|
| **aws.rds.process.tid** <br>(gauge) | El identificador del subproceso. Este valor solo está presente para los subprocesos. El proceso propietario puede identificarse utilizando el valor pid. (Mejorado, solo SQL Server)|
| **aws.rds.process.virtKb** <br>(gauge) | La cantidad de espacio de direcciones virtuales que utiliza el proceso. El uso de espacio de direcciones virtual no implica necesariamente el uso correspondiente de páginas de disco o de memoria principal. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.process.vss** <br>(gauge) | La cantidad de memoria virtual asignada al proceso. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.process.workingSetKb** <br>(gauge) | La cantidad de memoria en el conjunto de trabajo privado más la cantidad de memoria que está en uso por el proceso y puede ser compartida con otros procesos. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.process.workingSetPrivKb** <br>(gauge) | La cantidad de memoria que está en uso por un proceso, pero no puede ser compartida con otros procesos. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.process.workingSetShareableKb** <br>(gauge) | La cantidad de memoria que está en uso por un proceso y puede ser compartida con otros procesos. (Mejorado, solo SQL Server)<br>_Se muestra como kibibyte_ |
| **aws.rds.queries** <br>(rate) | La tasa media de consultas. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como consulta_ |
| **aws.rds.rdsto_aurora_postgre_sqlreplica_lag** <br>(gauge) | La cantidad de retardo en segundos cuando se replican actualizaciones desde la instancia de RDS PostgreSQL primaria a otros nodos del clúster. Solo disponible para bases de datos de Aurora PostgreSQL.<br>_Se muestra como segundo_ |
| **aws.rds.read_iops** <br>(rate) | Número medio de operaciones de E/S de lectura de disco.<br>_Se muestra como operación_ |
| **aws.rds.read_latency** <br>(gauge) | Tiempo medio que tarda cada operación de E/S de lectura de disco.<br>_Se muestra en segundos_ |
| **aws.rds.read_throughput** <br>(rate) | Número medio de bytes leídos del disco.<br>_Se muestra como byte_ |
| **aws.rds.replica_lag** <br>(gauge) | Cantidad de tiempo que una instancia de base de datos de réplica de lectura se retrasa de la instancia de base de datos fuente.<br>_Se muestra como segundo_ |
| **aws.rds.replication_slot_disk_usage** <br>(gauge) | El espacio de disco utilizado por los archivos de ranura de replicación. Disponible para bases de datos de Aurora PostgreSQL.<br>_Se muestra como byte_ |
| **aws.rds.result_set_cache_hit_ratio** <br>(gauge) | Porcentaje de solicitudes atendidas por la caché de Resultset. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como porcentaje_ |
| **aws.rds.select_latency** <br>(gauge) | Latencia media de las consultas de selección. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.select_throughput** <br>(rate) | Tasa media de consultas selectas. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como consulta_ |
| **aws.rds.snapshot_storage_used** <br>(gauge) | La cantidad de almacenamiento de copia de seguridad utilizada para almacenar instantáneas manuales más allá del periodo de retención de la copia de seguridad. Solo disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.swap.cached** <br>(gauge) | La cantidad de memoria swap utilizada como memoria caché. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.swap.free** <br>(gauge) | La cantidad total de memoria swap libre. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.swap.in** <br>(gauge) | La cantidad de memoria intercambiada desde el disco. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.swap.out** <br>(gauge) | La cantidad de memoria intercambiada desde el disco. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.swap.total** <br>(gauge) | La cantidad total de memoria swap disponible. (Mejorado)<br>_Se muestra como kibibyte_ |
| **aws.rds.swap_usage** <br>(gauge) | Cantidad de espacio de swap utilizado en la instancia de base de datos.<br>_Se muestra como byte_ |
| **aws.rds.tasks.blocked** <br>(gauge) | El número de tareas que están bloqueadas. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.tasks.running** <br>(gauge) | El número de tareas que se están ejecutando. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.tasks.sleeping** <br>(gauge) | El número de tareas que están suspendidas. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.tasks.stopped** <br>(gauge) | Número de tareas detenidas. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.tasks.total** <br>(gauge) | El número total de tareas. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.tasks.zombie** <br>(gauge) | El número de tareas secundarias que están inactivas con una tarea principal activa. (Mejorado)<br>_Se muestra como tarea_ |
| **aws.rds.total_backup_storage_billed** <br>(gauge) | La suma de BackupRetentionPeriodStorageUsed y SnapshotStorageUsed menos una cantidad de almacenamiento de copia de seguridad libre que equivale al tamaño del volumen del clúster para un día. Solo disponible para bases de datos de Aurora. <br>_Se muestra como byte_ |
| **aws.rds.total_storage_space** <br>(gauge) | Cantidad total de almacenamiento disponible en una instancia.<br>_Se muestra como byte_ |
| **aws.rds.transaction_logs_disk_usage** <br>(gauge) | Cantidad de espacio en disco ocupado por los logs de transacciones. Solo disponible para bases de datos de Aurora PostgreSQL.<br>_Se muestra como byte_ |
| **aws.rds.transaction_logs_generation** <br>(gauge) | El tamaño de los logs de transacciones generados por segundo.<br>_Se muestra como byte_ |
| **aws.rds.update_latency** <br>(gauge) | Latencia media de las consultas de actualización. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra en milisegundos_ |
| **aws.rds.update_throughput** <br>(rate) | Tasa media de consultas de actualización. Solo disponible para bases de datos de Aurora MySQL.<br>_Se muestra como consulta_ |
| **aws.rds.uptime** <br>(gauge) | Tiempo de actividad de la instancia de RDS. (Mejorado)<br>_Se muestra como segundo_ |
| **aws.rds.virtual_cpus** <br>(gauge) | El número de CPUs virtuales para la instancia de base de datos. (Mejorado)<br>_Se muestra como cpu_ |
| **aws.rds.volume_bytes_used** <br>(gauge) | La cantidad de almacenamiento en bytes utilizados por tu base de datos de Aurora. Solo disponible para bases de datos de Aurora.<br>_Se muestra como byte_ |
| **aws.rds.volume_read_iops** <br>(count) | Número de operaciones de E/S de lectura facturadas de un volumen de clúster, notificadas en intervalos de 5 minutos. Solo disponible para bases de datos de Aurora.<br>_Se muestra como operación_ |
| **aws.rds.volume_write_iops** <br>(count) | Número medio de operaciones de E/S de disco de escritura en el volumen del clúster notificado en intervalos de 5 minutos. Solo disponible para bases de datos de Aurora.<br>_Se muestra como operación_ |
| **aws.rds.write_iops** <br>(rate) | Número medio de operaciones de E/S de escritura en disco por segundo.<br>_Se muestra como operación_ |
| **aws.rds.write_latency** <br>(gauge) | Tiempo medio que tarda cada operación de E/S de escritura en disco.<br>_Se muestra en segundos_ |
| **aws.rds.write_throughput** <br>(rate) | Número medio de bytes escritos.<br>_Se muestra como byte_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de Amazon RDS incluye eventos relacionados con instancias de base de datos, grupos de seguridad, snapshots y grupos de parámetros. Consulta los eventos de ejemplo a continuación:

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Eventos de Amazon RDS" >}}

### Checks de servicio

**aws.rds.read_replica_status**
Monitoriza el estado de la [replicación de lectura](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring). Este check devuelve uno de los siguientes estados:

- OK - replicando o conectando
- CRÍTICO - error o finalizado
- ADVERTENCIA - detenido
- DESCONOCIDO - otro

## Monitorización predefinida

La integración de Amazon RDS proporciona capacidades de monitorización listas para usar para monitorizar y optimizar el rendimiento.

- Dashboard de Amazon RDS: obtén una visión global de tus instancias de RDS con el [dashboard de Amazon RDS] predefinido (https://app.datadoghq.com/dash/integration/62/aws-rds).
- Monitores recomendados: habilita [Monitores recomendados de Amazon RDS](https://app.datadoghq.com/monitors/recommended) para detectar problemas de forma proactiva y recibir alertas oportunas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}