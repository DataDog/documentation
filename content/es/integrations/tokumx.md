---
"app_id": "tokumx"
"app_uuid": "8169c714-555c-4e00-9be0-c6604cf1e858"
"assets":
  "dashboards":
    "tokumx": "assets/dashboards/tokumx_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "tokumx.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "tokumx"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "74"
    "source_type_name": "TokuMX"
  "saved_views":
    "tokumx_processes": "assets/saved_views/tokumx_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tokumx"
"integration_id": "tokumx"
"integration_title": "TokuMX"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "tokumx"
"public_title": "TokuMX"
"short_description": "Realiza un seguimiento de las métricas de opcounters, demoras de replicación, tamaño de tablas de caché y más"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Almacenamiento en caché"
  - "Category::Almacenes de datos"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Realiza un seguimiento de las métricas de opcounters, demoras de replicación, tamaño de tablas de caché y más"
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications"
  "support": "README.md#Soporte"
  "title": "TokuMX"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

<div class="alert alert-danger">
Esta integración está en modo de mantenimiento. Sólo puede funcionar con Python 2.
No se incluye con las versiones del Agent posteriores a la v7.37. Las versiones de corrección de errores del Agent 6 seguirán incluyéndola.
</div>


Este check recopila métricas de TokuMX, incluyendo:

- Opcounters.
- Demoras de replicación.
- Uso de la tabla de caché y del tamaño de almacenamiento.

## Configuración

### Instalación

El check de TokuMX está incluido en el paquete del [Datadog Agent][1]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Preparación de TokuMX

1. Instala el módulo MongoDB Python en tu servidor MongoDB utilizando el siguiente comando:

   ```shell
   sudo pip install --upgrade "pymongo<3.0"
   ```

2. Puedes verificar que el módulo está instalado utilizando este comando:

   ```shell
   python -c "import pymongo" 2>&1 | grep ImportError && \
   echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
   echo -e "\033[0;32mpymongo python module - OK\033[0m"
   ```

3. Inicia el shell de Mongo. En el shell, crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin`:

   ```shell
   # Authenticate as the admin user.
   use admin
   db.auth("admin", "<YOUR_TOKUMX_ADMIN_PASSWORD>")
   # Add a user for Datadog Agent
   db.addUser("datadog", "<UNIQUEPASSWORD>", true)
   ```

4. Comprueba que has creado el usuario con el siguiente comando (no en el shell de Mongo).

   ```shell
   python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
   grep True && \
   echo -e "\033[0;32mdatadog user - OK\033[0m" || \
   echo -e "\033[0;31mdatadog user - Missing\033[0m"
   ```

Para obtener más detalles sobre la creación y la gestión de usuarios en MongoDB, consulta la [documentación sobre seguridad de MongoDB][2].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host, haz lo siguiente:

1. Edita el archivo `tokumx.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1].
   Para conocer todas las opciones de configuración disponibles, consulta el [tokumx.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     - server: "mongodb://<USER>:<PASSWORD>@localhost:27017"
   ```

2. [Reinicia el Agent][3] para empezar a enviar métricas de TokuMX a Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican abajo.

| Parámetro            | Valor                                                      |
| -------------------- | ---------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `tokumx`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "mongodb://<USER>:<PASSWORD>@%%host%%:27017"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][3] y busca `tokumx` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tokumx" >}}


### Eventos

**Cambios en el estado de la replicación**:

Este check emite un evento cada vez que un nodo TokuMX muestra un cambio en su estado de replicación.

### Checks de servicios
{{< get-service-checks-from-git "tokumx" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

- [Monitorización de tus clave métricas de TokuMX para aplicaciones MongoDB][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.mongodb.com/manual/security/
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications
