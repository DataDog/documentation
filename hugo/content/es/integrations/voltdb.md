---
app_id: voltdb
app_uuid: 4ea56824-28da-4beb-8937-c45ef32fdb7f
assets:
  dashboards:
    VoltDB - Overview: assets/dashboards/voltdb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: voltdb.cpu.percent_used
      metadata_path: metadata.csv
      prefix: voltdb.
    process_signatures:
    - voltdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10149
    source_type_name: VoltDB
  monitors:
    Voltdb Node CPU is high: assets/monitors/cpu_load.json
  saved_views:
    voltdb_processes: assets/saved_views/voltdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md
display_on_public_website: true
draft: false
git_integration_title: voltdb
integration_id: voltdb
integration_title: VoltDB
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: voltdb
public_title: VoltDB
short_description: Recopila métricas de estado, de rendimiento y otras métricas de
  un clúster VoltDB.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas de estado, de rendimiento y otras métricas de un
    clúster VoltDB.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: VoltDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [VoltDB][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

**Nota**: Este check sólo debe configurarse en un Agent por clúster. Si estás monitorizando un clúster repartido entre varios hosts, instala un Agent en cada host. Pero no habilites la integración VoltDB en más de un host, ya que se duplicarían las métricas.

### Instalación

El check de VoltDB está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Añade un usuario a `datadog-agent`. Puedes hacerlo editando tu archivo `deployment.xml` VoltDB. **Nota**: No se requieren roles específicos, así que asigna el rol `user` integrado.

    ```xml
    <users>
        <!-- ... -->
        <user name="datadog-agent" password="<PASSWORD>" roles="user" />
    </users>
    ```

2. Edita el archivo `voltdb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu VoltDB. Para conocer todas las opciones de configuración disponibles, consulta el [voltdb.d/conf.yaml de ejemplo][4].

    ```yaml
    init_config:

    instances:
      - url: http://localhost:8080
        username: datadog-agent
        password: "<PASSWORD>"
    ```

3. [Reinicia el Agent][5].

#### Compatibilidad con TLS

Si [TLS/SSL][6] está activado en el puerto HTTP del cliente:

1. Exporta el archivo CA de tu certificado en formato PEM:

    ```bash
    keytool -exportcert -file /path/to/voltdb-ca.pem -keystore <KEYSTORE> -storepass <PASSWORD> -alias voltdb -rfc
    ```

1. Exporta tu certificado en formato PEM:

    ```bash
    openssl pkcs12 -nodes -in <KEYSTORE> -out /path/to/voltdb.pem -password pass:<PASSWORD>
    ```

   El archivo resultante debe contener la clave privada _sin descifrar_ y el certificado:

    ```
    -----BEGIN PRIVATE KEY-----
    <Private key contents...>
    -----END PRIVATE KEY-----
    -----BEGIN CERTIFICATE-----
    <Certificate contents...>
    -----END CERTIFICATE-----
    ```

2. En tu instancia de configuración, apunta `url` al endpoint del cliente habilitado por TLS y configura las opciones `tls_cert` y `tls_ca_cert`. Por ejemplo:

    ```yaml
    instances:
    - # ...
      url: https://localhost:8443
      tls_cert: /path/to/voltdb.pem
      tls_ca_cert: /path/to/voltdb-ca.pem
    ```

3. [Reinicia el Agent][5].

#### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `voltdb.d/conf.yaml` para empezar a recopilar logs de VoltDB:

    ```yaml
    logs:
      - type: file
        path: /var/log/voltdb.log
        source: voltdb
    ```

  Cambia el valor `path` en función de tu entorno. Consulta el [`voltdb.d/conf.yaml` de ejemplo][4] para conocer todas las opciones de configuración disponibles.

  3. [Reinicia el Agent][5].

  Para habilitar logs para entornos Kubernetes, consulta [Recopilación de logs de Kubernetes][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `voltdb` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "voltdb" >}}


### Eventos

Este check no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "voltdb" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[7]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/voltdb/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/