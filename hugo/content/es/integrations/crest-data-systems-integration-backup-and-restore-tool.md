---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_integration_backup_and_restore_tool
app_id: crest-data-systems-integration-backup-and-restore-tool
categories:
- marketplace
custom_kind: integración
description: Realiza copias de seguridad de todos tus archivos de configuración del
  Agent, integraciones y dependencias, y restáuralas rápidamente.
integration_version: 1.0.1
media:
- caption: Información general de Integration Backup and Restore
  image_url: images/integration_backup_restore_overview.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Integration Backup and Restore Tool
---
## Información general

Lleva tu experiencia de Datadog al siguiente nivel con Integration Backup and Restore Tool (IBRT). Esta potente herramienta te ayuda a agilizar tu flujo de trabajo permitiéndote crear fácilmente copias de seguridad de tu configuración de Datadog, asegurando que puedas restaurar rápidamente tu configuración después de actualizaciones o migraciones del Agent.

### Funciones

- Crea una copia de seguridad completa de tu configuración de Datadog, incluyendo:
  - Integraciones
  - Dependencias
  - Archivos de configuración (por ejemplo, archivos `datadog.yaml` y `conf.yaml` de las integraciones)
- Admite varias localizaciones de copias de seguridad, lo que te permite almacenar tus copias de seguridad en las localizaciones que mejor se adapten a tus necesidades.
- Programación flexible de las copias de seguridad:
  - Ejecuta copias de seguridad on-demand según sea necesario
  - Programa copias de seguridad periódicas para que se ejecuten automáticamente, en función de tus necesidades específicas.
- Ofrece opciones durante la restauración:
  1. **Migración o reinstalación del Agent**: instala todas las integraciones y copia los archivos YAML, incluyendo el `conf.yaml` y `datadog.yaml` de la integración, para una experiencia de migración sin fisuras.
  1. **Actualización del Agent**: instala integraciones como configuraciones YAML y preserva las dependencias durante el proceso de actualización.

### Localizaciones de copia de seguridad compatibles

- Máquina local
- Máquina remota
- Servicios en la nube:
  - Buckets de AWS S3
  - Almacenamiento de Azure Blob
  - Google Cloud Storage

### Facilidad de uso

A diferencia de los métodos tradicionales de copia de seguridad que requieren una instalación y configuración manual, la IBRT ofrece una forma sencilla y cómoda de crear copias de seguridad. Puedes crear fácilmente una copia de seguridad de tu configuración de Datadog ejecutando un comando on-demand en el nivel del Agent, o programando copias de seguridad periódicas para que se ejecuten automáticamente. Además, restaurar la copia de seguridad es igual de fácil, ya que sólo se necesita un script para que la configuración vuelva a funcionar.

## Cada instancia se programa independientemente de las demás.
#
instances:

    ## @param backup_storage_platform - lista de cadenas - obligatorio
    ## La plataforma donde deseas crear un archivo zip de copia de seguridad.
    ## Posibles valores: local, vm, aws, gcp, azure
    ## Para almacenar en local => local
    ## Para almacenar en otras VM => vm
    ## Bucket de AWS S3 => aws
    ## Cuentas de Azure Storage => azure
    ## Google Cloud Storage => gcp
    ##
    ## Si deseas almacenar copias de seguridad en varios lugares, como local, aws y vm al mismo tiempo, luego puedes proporcionar valores en este formato:

    ## - backup_storage_platform: 
    ##   - local
    ##   - vm
    ##   - aws
    ##
    ## Nota: Si seleccionas "vm", asegúrate de que el servidor OpenSSH esté activado y en ejecución si tu máquina de destino se ejecuta en Windows.
    ## Si no deseas activar un servidor OpenSSH, luego debes almacenar copias de seguridad en servicios en la nube, como bucket de AWS S3, Azure Blob Storage, o Google Cloud Service.
    ## Luego puedes descargar manualmente copias de seguridad en tu máquina de destino al momento de la restauración.
    ## Para Linux y macOS, el servidor OpenSSH está activado por defecto.
    #
  - backup_storage_platform:
      - local

    ## @param backup_zip_path_local - cadena - opcional
    ## La ruta donde se creará el archivo zip de copia de seguridad en tu máquina local. 
    ## Obligatorio si backup_storage_platform es "local".
    ## Nota: Los usuarios deben tener permisos de escritura en este directorio.
    ## Los usuarios tampoco deben modificar manualmente ningún archivo de esta carpeta.
    #
    # backup_zip_path_local: <backup_zip_path_local>

    ## @param backup_zip_path_vm - cadena - opcional
    ## La ruta donde se creará el archivo zip de copia de seguridad en la máquina remota.
    ## Obligatorio si backup_storage_platform es 'vm'.
    ## Nota: Los usuarios deben tener permisos de escritura en este directorio.
    ## Los usuarios tampoco deben modificar manualmente ningún archivo de esta carpeta.
    #
    # backup_zip_path_vm: <backup_zip_path_vm>

    ## @param vm_hostname - cadena - opcional
    ## El nombre de host de la máquina virtual en la que se guardará el zip.
    #
    # vm_hostname: <ip_address OR hostname>

    ## @param vm_username - cadena - opcional
    ## El nombre de usuario de la máquina virtual en la que se guardará el zip.
    #
    # vm_username: <username>

    ## @param vm_password - cadena - opcional
    ## La contraseña de la máquina virtual en la que se guardará el zip.
    #
    # vm_password: <password>

    ## @param aws_s3_bucket - cadena - opcional
    ## Si backup_storage_platform es aws, el nombre del bucket de s3 que almacena los archivos de copia de seguridad.
    #
    # aws_s3_bucket: <aws_s3_bucket>

    ## @param aws_access_key - cadena - opcional
    ## Si backup_storage_platform es aws, la clave de acceso utilizada para autenticarse con la API de AWS para subir a s3.
    #
    # aws_access_key: <aws_access_key>

    ## @param aws_secret_key - cadena - opcional
    ## Si backup_storage_platform es aws, la clave secreta utilizada para autenticarse con la API de AWS para subir a s3.
    #
    # aws_secret_key: <aws_secret_key>

    ## @param aws_bucket_region - cadena - opcional
    ## Si backup_storage_platform es aws, la región utilizada para identificar el bucket de s3.
    #
    # aws_bucket_region: <aws_bucket_region>

    ## @param azure_connection_string - cadena - opcional
    ## Si backup_storage_platform es azure, la cadena de conexión de la cuenta de almacenamiento para la autenticación.
    #
    # azure_connection_string: <azure_connection_string>

    ## @param azure_container_name - cadena - opcional
    ## Si backup_storage_platform es azure, el nombre del contenedor que contiene el almacenamiento blob.
    #
    # azure_container_name: <azure_container_name>

    ## @param gcp_service_account_key_path - cadena - opcional
    ## Si backup_storage_platform es GCP, la ruta del archivo json que contiene la clave de cuenta de servicio de GCP.
    #
    # gcp_service_account_key_path: <gcp_service_account_key_path>

    ## @param gcs_bucket_name - cadena - opcional
    ## Si backup_storage_platform es GCP, el nombre del bucket de Google Cloud Storage.
    #
    # gcs_bucket_name: <gcs_bucket_name>

    ## @param proxy_type - cadena - opcional
    ## Tipo de servidor de proxy. El tipo de proxy permitido es http.
    ## Obligatorio si se proporciona 'proxy_host', y viceversa.
    #
    # proxy_type: http

    ## @param proxy_host - cadena - opcional
    ## Host del servidor de proxy.
    ## Obligatorio si se proporciona 'proxy_type', y viceversa.
    #
    # proxy_host: 10.0.0.1

    ## @param proxy_port - entero - opcional - por defecto: 3128
    ## Puerto del servidor de proxy.
    #
    # proxy_port: 3128

    ## @param proxy_username - cadena - opcional
    ## El nombre de usuario del servidor de proxy.
    ## Obligatorio si se proporciona 'proxy_password', y viceversa.
    #
    # proxy_username: <PROXY_USERNAME>

    ## @param proxy_password - cadena - opcional
    ## La contraseña del servidor de proxy.
    ## Obligatorio si se proporciona 'proxy_username', y viceversa.
    #
    # proxy_password: <PROXY_PASSWORD>

    ## @param tags - lista de cadenas - opcional
    ## Una lista de etiquetas para adjuntar a cada métrica y check de servicio emitido por esta instancia.
    ##
    ## Más información sobre el etiquetado en https://docs.datadoghq.com/tagging
    #
    # tags:
    #   - <KEY_1>:<VALUE_1>
    #   - <KEY_2>:<VALUE_2>

    ## @param service - cadena - opcional
    ## Adjunta la etiqueta `service:<SERVICE>` a cada métrica, evento y check de servicio emitidos por esta integración.
    ##
    ## Anula cualquier `service` definido en la sección `init_config`.
    #
    # service: <SERVICE>

    ## @param min_collection_interval - número - obligatorio - por defecto: 1296000
    ## Solo debería ser necesario generar copias de seguridad cada 15 días como máximo.
    ## El valor por defecto de min_collection_interval es igual a 15 días.
    ## El valor mínimo permitido para min_collection_interval es 3600 segundos (1 hora).
    #
    min_collection_interval: 1296000

    ## @param empty_default_hostname - booleano - opcional - por defecto: false
    ## Obliga al check a enviar métricas sin nombre de host. Esto es útil para los checks a nivel de clúster.
    #
    # empty_default_hostname: false

    ## @param metric_patterns - asignación - opcional
    ## Una asignación de métricas a incluir o excluir, siendo cada entrada una expresión regular.
    ##
    ## Las métricas definidas en `exclude` tendrán prioridad en caso de solapamiento.
    #
    # metric_patterns:
    #   include:
    #   - <INCLUDE_REGEX>
    #   exclude:
    #   - <EXCLUDE_REGEX>
```
````

3. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `crest_data_systems_integration_backup_and_restore_tool` en la sección Checks.

También puedes utilizar uno de los siguientes comandos para obtener información detallada sobre la integración:

- Linux

  ```
  sudo -Hu dd-agent datadog-agent check crest_data_systems_integration_backup_and_restore_tool --log-level debug
  ```

- Windows

  ```
  "%programfiles%\Datadog\Datadog Agent\bin\agent.exe" check crest_data_systems_integration_backup_and_restore_tool --log-level debug
  ```

- macOS

  ```
  sudo datadog-agent check crest_data_systems_integration_backup_and_restore_tool --log-level debug
  ```

### Restaurar la copia de seguridad

Sigue estos pasos una vez creada la copia de seguridad:

1. Descarga o copia la copia de seguridad en la última ubicación del agent.
1. Descomprime el archivo zip.
1. Restaura la configuración de Datadog ejecutando el script `cds_ibrt_restore_script.py`, que se proporciona en la copia de seguridad.

**Nota:** No modifiques manualmente el contenido del directorio de copia de seguridad descomprimido.

Sigue los pasos que se indican a continuación para restaurar la configuración, en función de tu tipo de Agent:

### Linux

- Para ejecutar el script, otorga al usuario `dd-agent` la propiedad del directorio descomprimido en el que se encuentra `cds_ibrt_restore_script.py` 

- Ejecuta el siguiente comando, sustituyendo `<directory>` por el directorio que contiene el script `cds_ibrt_restore_script.py`:

  ```
  sudo chown dd-agent:dd-agent <directory> -R
  ```

- Después de esto, ejecuta el siguiente comando para ejecutar el script:

  ```
  sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/python cds_ibrt_restore_script.py
  ```

**Nota para usuarios de RHEL y CentOS**: si estás ejecutando este script en RHEL o CentOS, asegúrate de que todos los directorios principales son accesibles por el usuario `dd-agent`. Si el script se almacena en tu directorio personal (por ejemplo, `/home/devuser/`), asegúrate de que ese directorio tiene permiso 755:

```
sudo chmod 755 /home/devuser
```

Si prefieres no cambiar los permisos, elige una ubicación de almacenamiento en la que el usuario `dd-agent` ya tenga acceso de escritura, como `/opt/datadog-agent`.

### Windows

Abre el símbolo del sistema como administrador y ejecuta el siguiente comando:

```
"%programfiles%\Datadog\Datadog Agent\embedded3\python.exe" cds_ibrt_restore_script.py
```

### macOS

```
sudo /opt/datadog-agent/embedded/bin/python cds_ibrt_restore_script.py
```

### Docker

Para restaurar una copia de seguridad en tu contenedor de Docker, utiliza el siguiente comando:

```
/opt/datadog-agent/embedded/bin/python cds_ibrt_restore_script.py
```

Después de ejecutar el script, elige la opción que mejor se adapte a tu escenario:

- Selecciona `1` para **Agent migration/reinstallation** (Migración/reinstalación del Agent): instala todas las integraciones y copia los archivos YAML, incluyendo `integration conf.yaml` y `datadog.yaml`, para una experiencia de migración sin problemas.
- Selecciona `2` para **Agent Upgrade** (Actualizar Agent): instala las integraciones como configuraciones YAML, preservando las dependencias durante el proceso de actualización.

Una vez seleccionada una opción, tu entorno de Datadog se configurará en consecuencia.

```
What is your Datadog agent installation scenario?
1. Fresh agent installation/reinstallation or agent migration
2. Just upgraded existing datadog-agent
Enter your choice (1/2):
```

### Solucionar problemas

A continuación, te explicamos cómo solucionar algunos de los problemas más comunes.

- Si encuentras algún problema almacenando archivos de copia de seguridad en una máquina virtual remota utilizando **proxy**, asegúrate de que has permitido el puerto SSH en tu servidor de proxy.
  Por ejemplo, si utilizas un servidor de proxy Squid, deberás permitir el puerto SSH en el archivo `squid.conf` y reiniciar el servidor de proxy.
  ```
  acl SSL_ports port 22
  http_access allow SSL_ports
  ```
- Si te encuentras con algún problema de permisos, asegúrate de haber seguido todos los pasos mencionados en la sección **Notas para evitar problemas de permisos**.
- Estas son algunas cosas que debes tener en cuenta al restaurar tu copia de seguridad:
  - Las integraciones básicas se omitirán con el siguiente mensaje de log durante el proceso de restauración, ya que estas integraciones se envían con el Datadog Agent.
    - `INFO - <integration_name> is core integration, hence skipping...`
  - Las integraciones personalizadas, que no se encuentran en Datadog Marketplace, se omitirán con el siguiente mensaje de log durante el proceso de restauración:
    - `INFO - <integration_name> is custom integration, hence skipping...`

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de soporte: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Crest Data Datadog Marketplace Integrations FAQ](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-integration-backup-and-restore-tool" target="_blank">Haz clic aquí</a> para comprar esta aplicación.