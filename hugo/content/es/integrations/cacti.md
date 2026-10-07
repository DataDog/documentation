---
app_id: cacti
categories:
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
description: Reenvía tus RRD de Cacti a Datadog para obtener alertas más completas
  y gráficos más atractivos.
integration_version: 4.0.0
media: []
supported_os:
- Linux
title: Cacti
---
## Información general

Obtén métricas de Cacti en tiempo real para:

- Visualizar y monitorizar estados de Cacti.
- Recibir notificaciones sobre fallos y eventos de Cacti.

## Configuración

### Instalación

El check de Cacti está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). Para empezar a recopilar métricas, primero debes:

1. Instalar los encabezados `librrd` y las bibliotecas.
1. Instalar los enlaces a `rrdtool` de Python.

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

1. Verifica el usuario y los derechos:

   ```shell
   mysql -u datadog --password=<MYSQL_PASSWORD> -e "show status" | \
   grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
   echo -e "\033[0;31mCannot connect to MySQL\033[0m"

   mysql -u datadog --password=<MYSQL_PASSWORD> -D cacti -e "select * from data_template_data limit 1" && \
   echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
   echo -e "\033[0;31mMissing SELECT grant\033[0m"
   ```

1. Otorga al usuario `datadog-agent` acceso a los archivos RRD:

   ```shell
   sudo gpasswd -a dd-agent www-data
   sudo chmod -R g+rx /var/lib/cacti/rra/
   sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
   then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
   else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
   fi'
   ```

#### Configuración del Agent

1. Configurar el Agent para conectarse a MySQL, editar tu archivo `cacti.d/conf.yaml`. Consulta el [ejemplo de cacti.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example) para ver todas las opciones de configuración disponibles:

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

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cacti` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cacti.hosts.count** <br>(gauge) | Número de hosts monitorizados por Cacti<br>_Se muestra como host_ |
| **cacti.metrics.count** <br>(gauge) | Número de métricas recopiladas de Cacti|
| **cacti.rrd.count** <br>(gauge) | Número de archivos RRD de Cacti<br>_Se muestra como archivo_ |
| **system.disk.free.last** <br>(gauge) | Cantidad de espacio libre en disco, último valor de sondeo<br>_Se muestra en bytes_ |
| **system.disk.free.max** <br>(gauge) | Cantidad de espacio libre en disco, máximo valor de sondeo<br>_Se muestra en bytes_ |
| **system.disk.free.min** <br>(gauge) | Cantidad de espacio libre en disco, mínimo valor de sondeo<br>_Se muestra en bytes_ |
| **system.disk.used.last** <br>(gauge) | Cantidad de espacio utilizado en disco, último valor de sondeo<br>_Se muestra en bytes_ |
| **system.disk.used.max** <br>(gauge) | Cantidad de espacio utilizado en disco, máximo valor de sondeo<br>_Se muestra en bytes_ |
| **system.disk.used.min** <br>(gauge) | Cantidad de espacio utilizado en disco, mínimo valor de sondeo<br>_Se muestra en bytes_ |
| **system.load.1.last** <br>(gauge) | Carga media del sistema durante un minuto, último valor de sondeo|
| **system.load.1.max** <br>(gauge) | Carga media del sistema durante un minuto, máximo valor de sondeo|
| **system.load.1.min** <br>(gauge) | Carga media del sistema durante un minuto, mínimo valor de sondeo|
| **system.load.15.last** <br>(gauge) | Carga media del sistema durante 15 minutos, último valor de sondeo|
| **system.load.15.max** <br>(gauge) | Carga media del sistema durante 15 minutos, máximo valor de sondeo|
| **system.load.15.min** <br>(gauge) | Carga media del sistema durante 15 minutos, mínimo valor de sondeo|
| **system.load.5.last** <br>(gauge) | Carga media del sistema durante 5 minutos, último valor de sondeo|
| **system.load.5.max** <br>(gauge) | Carga media del sistema durante 5 minutos, máximo valor de sondeo|
| **system.load.5.min** <br>(gauge) | Carga media del sistema durante 5 minutos, mínimo valor de sondeo|
| **system.mem.buffered.last** <br>(gauge) | Cantidad de RAM física utilizada para buffers de archivos, último valor de sondeo<br>_Se muestra en bytes_ |
| **system.mem.buffered.max** <br>(gauge) | Cantidad de RAM física utilizada para buffers de archivos, máximo valor de sondeo<br>_Se muestra en bytes_ |
| **system.mem.buffered.min** <br>(gauge) | Cantidad de RAM física utilizada para buffers de archivos, mínimo valor de sondeo<br>_Se muestra en bytes_ |
| **system.ping.latency** <br>(gauge) | Latencia de ping del sistema, valor medio de sondeo<br>_Se muestra en milisegundos_ |
| **system.ping.latency.max** <br>(gauge) | Latencia de ping del sistema, valor máximo de sondeo<br>_Se muestra en milisegundos_ |
| **system.proc.running.last** <br>(gauge) | Número de procesos en ejecución, último valor de sondeo<br>_Se muestra como proceso_ |
| **system.proc.running.max** <br>(gauge) | Número de procesos en ejecución, máximo valor de sondeo<br>_Se muestra como proceso_ |
| **system.proc.running.min** <br>(gauge) | Número de procesos en ejecución, mínimo valor de sondeo<br>_Se muestra como proceso_ |
| **system.swap.free.max** <br>(gauge) | Cantidad de espacio de intercambio libre, valor máximo de sondeo<br>_Se muestra en bytes_ |
| **system.users.current.last** <br>(gauge) | Número de usuarios conectados, último valor de sondeo|
| **system.users.current.max** <br>(gauge) | Número de usuarios conectados, máximo valor de sondeo|
| **system.users.current.min** <br>(gauge) | Número de usuarios conectados, mínimo valor de sondeo|

### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `cacti.d/conf.yaml` para empezar a recopilar logs de Cacti:

   ```yaml
   logs:
     - type: file
       path: /opt/cacti/log/cacti.log
       source: cacti
   ```

   Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [ejemplo cacti.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Eventos

El check de Cacti no incluye eventos.

### Checks de servicio

El check de Cacti no incluye checks de servicio.

## Solucionar problemas

### Problemas conocidos

La biblioteca Python que utiliza esta integración presenta fugas de memoria en determinadas circunstancias. Si esto te sucede, una solución alternativa es instalar el paquete [python-rrdtool](https://github.com/pbanaszkiewicz/python-rrdtool) en lugar de rrdtool. Este paquete más antiguo no recibe mantenimiento y esta integración no lo admite oficialmente, pero ha ayudado a otras personas a resolver problemas de memoria.

Se ha abierto un [incidente en Github](https://github.com/commx/python-rrdtool/issues/25) para rastrear esta fuga de memoria.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).