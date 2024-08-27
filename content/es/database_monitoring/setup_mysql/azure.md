---
description: Instalar y configurar la Monitorización de base de datos para PostgreSQL
  gestionado en Azure.
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
title: Configuración de la Monitorización de base de datos para Azure Database para
  MySQL
---

La Monitorización de base de datos proporciona una amplia visibilidad de tus bases de datos MySQL mediante la exposición de métricas de consultas, ejemplos de consultas, planes de explicación, datos de conexión, métricas de sistemas y telemetría para el motor de almacenamiento InnoDB.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza los siguientes pasos para habilitar la monitorización de base de datos con tu base de datos de MySQL:

1. [Configura parámetros de bases de datos](#configure-mysql-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala y configura el Agent](#install-and-configure-the-agent).
1. [Instala la integración de Azure MySQL](#install-the-azure-mysql-integration).

## Antes de empezar

Versiones de MySQL compatibles
: 5.7, o 8.0+

Tipos de despliegue de Azure MySQL compatibles
: MySQL en máquinas virtuales de Azure, Single Server, Flexible Server (la Actividad de consulta y Recopilación de eventos de espera no son compatibles con Flexible Server).

Versiones compatibles del Agent 
: 7.36.1+

Impacto del rendimiento
: el valor predeterminado de configuración del Agent para la Monitorización de base de datos es conservador, pero puedes ajustar parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas para que se adapten mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
La Monitorización de base de datos se ejecuta como integración sobre el Agent base ([ver valores de referencia][1]).

Proxies, equilibradores de carga y agrupadores de conexiones
: el Datadog Agent debe conectarse directamente al host que está siendo monitorizado, preferiblemente a través del endpoint de la instancia. El Agent no debe conectarse a la base de datos a través de un proxy, equilibrador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes hosts mientras se está ejecutando (como en el caso de la conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos hosts, produciendo métricas inexactas.

Consideraciones sobre la seguridad de los datos
: para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configuración de parámetros de MySQL

Configura los siguientes [parámetros del servidor][3] y, a continuación, **reinicia el servidor** para que los ajustes surtan efecto:

| Parámetro | Valor | Descripción |
| --- | -- | --- |
| `performance_schema` | `ON` | Obligatorio. Activa el [Esquema de rendimiento][1]. |

El Agent también requiere que los consumidores de `performance_schema.events_statements_*` se establezcan en `ON` para recopilar las consultas que se están ejecutando actualmente. De forma predeterminada, Azure MySQL Database habilita los consumidores de esquemas de rendimiento, por lo que no se requiere una configuración adicional.

## Conceder acceso al Agent 

El Datadog Agent requiere acceso de solo lectura a la base de datos para poder recopilar estadísticas y realizar consultas.

Crea el usuario `datadog` y concédele permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

Crea el siguiente esquema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Crea el procedimiento `explain_statement` para que el Agent pueda recopilar los planes de explicación:

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

Además, crea este procedimiento **en cada esquema** del que desees recopilar planes de explicación. Sustituye `<YOUR_SCHEMA>` por el esquema de tu base de datos:

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

## Instalación y configuración del Agent

Para monitorizar hosts de Azure, instala el Datadog Agent en tu infraestructura y configúralo para conectarse a cada endpoint de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para conocer otros métodos de instalación del Agent no mencionados aquí, consulta las [Instrucciones de instalación del Agent][5].

{{< tabs >}}
{{% tab "Host" %}}

Para configurar este check para un Agent que se ejecuta en un host, por ejemplo, cuando se aprovisiona una pequeña máquina virtual para que el Agent recopile de la base de datos:

Edita el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1] para empezar a recopilar métricas de MySQL. Ve el [ejemplo mysql.d/conf.yaml][2] para todas las opciones disponibles de configuración, incluidas las de métricas personalizadas.

Añade este bloque de configuración a tu `mysql.d/conf.yaml` para recopilar métricas de MySQL:

```yaml
init_config:

instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # del paso CREATE USER (crear usuario) anterior

    # Después de añadir tu proyecto e instancia, configura la integración de Datadog Azure para extraer datos de la nube adicionales como CPU y memoria.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

Consulta [la especificación de la integración MySQL][4] para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`.

**Nota**: Escribe tu contraseña entre comillas simples en caso de que haya un carácter especial.

[Reinicia el Agent][3] para empezar a enviar métricas de MySQL a Datadog.


[1]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{% tab "Docker" %}}

Para configurar el Agent de la Monitorización de base de datos que se ejecuta en un contenedor de Docker, puedes establecer las [plantillas de integración de Autodiscovery][1] como etiquetas (label) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que las etiquetas (labels) de Autodiscovery funcionen.

### Línea de comandos

Ejecuta el siguiente comando para ejecutar el Agent desde tu línea de comandos. Sustituye los valores para que coincidan con tu cuenta y tu entorno:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Archivo Docker

Las etiquetas también pueden especificarse en un `Dockerfile`, por lo que puedes crear y desplegar un Agent personalizado sin cambiar la configuración de tu infraestructura:

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

Consulta [la especificación de la integración MySQL][4] para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`.

Para evitar exponer la contraseña del usuario `datadog` en texto simple, utiliza el [paquete de gestión de secretos][2] del Agent y declara la contraseña utilizando la sintaxis `ENC[]` o consulta la [documentación de variables de plantilla de Autodiscovery][3] para saber cómo pasar la contraseña como una variable de entorno.


[1]: /es/agent/docker/integrations/?tab=docker
[2]: /es/agent/configuration/secrets-management
[3]: /es/agent/faq/template_variables/
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tienes un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para la Monitorización de base de datos.

Sigue las instrucciones para [activar los checks de clúster][2] si no están ya habilitados en tu clúster de Kubernetes. Puedes declarar la configuración de MySQL con archivos estáticos integrados en el contenedor del Cluster Agent, o con anotaciones de servicio:

### Helm

Realiza los siguientes pasos para instalar el [Datadog Cluster Agent][1] en tu clúster de Kubernetes. Sustituye los valores para que coincidan con tu cuenta y tu entorno.

1. Sigue las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: -|
          cluster_check: true
          init_config:
            instances:
              - dbm: true
                host: '<AZURE_INSTANCE_ENDPOINT>'
                port: 3306
                username: datadog
                password: '<UNIQUE_PASSWORD>'
                azure:
                  deployment_type: '<DEPLOYMENT_TYPE>'
                  fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'

    clusterChecksRunner:
      enabled: true
    ```

3. Despliega el Agent con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añade <code>--set targetSystem=Windows</code> al comando <code>helm install</code>.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
[3]: /es/containers/kubernetes/installation/?tab=helm#installation

### Configurar con archivos integrados

Para configurar un check de clúster con un archivo de configuración integrado, integra el archivo de configuración del contenedor del Cluster Agent en la ruta `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Asegúrate de incluir este indicador
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
    # Después de añadir tu proyecto e instancia, configura la integración de Datadog Azure para extraer los datos de la nube adicionales como CPU, Memoria, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

### Configurar con anotaciones de servicios de Kubernetes

En lugar de integrar un archivo, puedes declarar la configuración de la instancia como servicio de Kubernetes. Para configurar este check en un Agent que se ejecuta en Kubernetes, crea un servicio en el mismo espacio de nombres que el Datadog Cluster Agent:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
          }
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```

Consulta [la especificación de la integración MySQL][5] para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`.

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de SQL Server.

Para evitar exponer la contraseña del usuario `datadog` en texto simple, utiliza el [paquete de gestión de secretos][4] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /es/agent/configuration/secrets-management
[5]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{< /tabs >}}

### Validar

[Ejecuta el subcomando de estado del Agent][6] y busca `mysql` en la sección **Checks**. Si no, visita la página [Bases de datos][7] para empezar.

## Ejemplo de configuraciones del Agent
{{% dbm-mysql-agent-config-examples %}}

## Instalación de la integración Azure MySQL

Para recopilar métricas de base de datos más completas de Azure, instala la [integración MySQL][8] (opcional).

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como se esperaba, consulta [Solucionar problemas][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.microsoft.com/en-us/azure/mysql/howto-server-parameters
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /es/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /es/integrations/azure_db_for_mysql
[9]: /es/database_monitoring/setup_mysql/troubleshooting
[10]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html