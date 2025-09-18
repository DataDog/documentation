---
app_id: cacti
app_uuid: b18f92f2-2aa5-435e-b04e-84ce3538fa2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cacti.rrd.count
      metadata_path: metadata.csv
      prefix: cacti.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25
    source_type_name: Cacti
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cacti/README.md
display_on_public_website: true
draft: false
git_integration_title: cacti
integration_id: cacti
integration_title: Cacti
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: cacti
public_title: Cacti
short_description: Reenvía tus RRD de Cacti a Datadog para obtener alertas más completas
  y gráficas atractivas.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Herramientas para desarrolladores
  - Category::Recopilación de logs
  - Supported OS::Linux
  - Offering::integración
  configuration: README.md#Instalación
  description: Reenvía tus RRD de Cacti a Datadog para obtener alertas más completas
    y gráficas atractivas.
  media: []
  overview: README.md#Descripción general
  support: README.md#Soporte
  title: Cacti
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas de Cacti en tiempo real para:

- Visualizar y monitorizar estados de Cacti.
- Recibir notificaciones sobre fallos y eventos de Cacti.

## Configuración

### Instalación

El check de Cacti está incluido en el paquete del [Datadog Agent][1]. Para comenzar a recopilar métricas, primero debes:

1. Instalar los encabezados `librrd` y las bibliotecas.
2. Instalar los enlaces a `rrdtool` de Python.

#### Encabezados y bibliotecas

En Debian/Ubuntu:

```shell
sudo apt-get install librrd-dev
```

En RHEL/CentOS:

```shell
sudo yum install rrdtool-devel
```

#### Enlaces de Python

Añade el paquete Python `rrdtool` al Agent con el siguiente comando:

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### Configuración

#### Crear un usuario de Datadog

1. Crea un usuario de Datadog con derechos de solo lectura para la base de datos Cacti.

   ```shell
   sudo mysql -e "create user 'datadog'@'localhost' identified by '<MYSQL_PASSWORD>';"
   sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
   ```

2. Verifica el usuario y los derechos:

   ```shell
   mysql -u datadog --password=<MYSQL_PASSWORD> -e "show status" | \
   grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
   echo -e "\033[0;31mCannot connect to MySQL\033[0m"

   mysql -u datadog --password=<MYSQL_PASSWORD> -D cacti -e "select * from data_template_data limit 1" && \
   echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
   echo -e "\033[0;31mMissing SELECT grant\033[0m"
   ```

3. Otorga al usuario `datadog-agent` acceso a los archivos RRD:

   ```shell
   sudo gpasswd -a dd-agent www-data
   sudo chmod -R g+rx /var/lib/cacti/rra/
   sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
   then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
   else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
   fi'
   ```

#### Configuración del Agent

1. Configura el Agent para que se conecte a MySQL y edita tu archivo `cacti.d/conf.yaml`. Consulta el [cacti.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param mysql_host - string - required
     ## url of your MySQL database
     #
     - mysql_host: "localhost"

       ## @param mysql_port - integer - optional - default: 3306
       ## port of your MySQL database
       #
       # mysql_port: 3306

       ## @param mysql_user - string - required
       ## User to use to connect to MySQL in order to gather metrics
       #
       mysql_user: "datadog"

       ## @param mysql_password - string - required
       ## Password to use to connect to MySQL in order to gather metrics
       #
       mysql_password: "<MYSQL_PASSWORD>"

       ## @param rrd_path - string - required
       ## The Cacti checks requires access to the Cacti DB in MySQL and to the RRD
       ## files that contain the metrics tracked in Cacti.
       ## In almost all cases, you'll only need one instance pointing to the Cacti
       ## database.
       ## The `rrd_path` will probably be `/var/lib/cacti/rra` on Ubuntu
       ## or `/var/www/html/cacti/rra` on any other machines.
       #
       rrd_path: "<CACTI_RRA_PATH>"
   ```

2. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `cacti` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cacti" >}}


### Recopilación de logs

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `cacti.d/conf.yaml` para empezar a recopilar logs de Cacti:

    ```yaml
    logs:
      - type: file
        path: /opt/cacti/log/cacti.log
        source: cacti
    ```

   Cambia el valor del parámetro `path` en función de tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [cacti.d/conf.yaml de ejemplo][2].

3. [Reinicia el Agent][3].

### Eventos

El check de Cacti no incluye eventos.

### Checks de servicio

El check de Cacti no incluye checks de servicio.

## Solucionar problemas

### Problemas conocidos

La librería Python que utiliza esta integración pierde memoria en determinadas circunstancias. Si esto te sucede, una solución alternativa es instalar el paquete [python-rrdtool][6] en lugar de rrdtool. Este paquete antiguo no recibe mantenimiento y esta integración no lo admite oficialmente, pero ha ayudado a otros a resolver los problemas de memoria.

Se ha abierto un [problema de Github][7] para rastrear esta pérdida de memoria.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/es/help/
