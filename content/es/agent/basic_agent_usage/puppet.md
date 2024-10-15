---
dependencies:
- https://github.com/DataDog/puppet-datadog-agent/blob/main/README.md
title: Puppet
---
Este módulo instala el Datadog Agent y envía informes de Puppet a Datadog.

### Requisitos

El módulo Puppet de Datadog es compatible con Linux y Windows, así como con Puppet 4.6.x o Puppet Enterprise 2016.4 (y versiones posteriores). Para obtener información detallada sobre la compatibilidad, consulta la [página dedicada a este módulo en Puppet Forge][1].

### Instalación

Instala el módulo Puppet de [datadog_agent][1] en la ruta del módulo de tu nodo maestro Puppet:

```shell
puppet module install datadog-datadog_agent
```

#### Actualización

- El Datadog Agent v7.x está instalado por defecto. Para utilizar una versión anterior del Agent, modifica el parámetro `agent_major_version`.
- `agent5_enable` ya no se utiliza, pues ha sido sustituido por `agent_major_version`.
- `agent6_extra_options` se ha renombrado como `agent_extra_options`, ya que se aplica tanto al Agent v6 como al v7.
- `agent6_log_file` se ha renombrado como `agent_log_file`, ya que se aplica tanto al Agent v6 como al v7.
- `agent5_repo_uri` y `agent6_repo_uri` se convierten en `agent_repo_uri` en todas las versiones del Agent.
- `conf_dir` y `conf6_dir` se convierten en `conf_dir` en todas las versiones del Agent.
- El archivo de repositorio creado en Linux se llama `datadog` en todas las versiones del Agent en vez de `datadog5`/`datadog6`.

### Configuración

Una vez que el módulo `datadog_agent` esté instalado en tu `puppetserver`/`puppetmaster` (o en un host sin nodo maestro), sigue estos pasos de configuración:

1. Obtén tu [clave de API de Datadog][2].
2. Añade la clase Datadog a los manifiestos de tus nodos (ej.: `/etc/puppetlabs/code/environments/production/manifests/site.pp`).

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
    }
    ```

    Si utilizas un sitio de Datadog distinto al predeterminado (datadoghq.com), configúralo aquí también:

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        datadog_site => "datadoghq.eu",
    }
    ```

    Para las versiones de CentOS/RHEL anteriores a la 7.0 y las de Ubuntu anteriores a la 15.04, especifica el proveedor de servicio como `upstart`:

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        service_provider => 'upstart'
    }
    ```

    Consulta la sección [Variables de configuración]( #configuration-variables) para ver la lista de argumentos que puedes utilizar aquí.

4. (Opcional) Incluye cualquier integración que quieras utilizar con el Agent. En el siguiente ejemplo, instalamos la integración de Mongo:

    ```conf
    class { 'datadog_agent::integrations::mongo':
        # integration arguments go here
    }
    ```

    Consulta los [comentarios del código][6] para conocer todos los argumentos disponibles en una integración determinada.

    Si una integración no tiene ningún [manifiesto con una clase específica][7], puedes añadir una configuración al respecto. A continuación, te mostramos un ejemplo para el check `ntp`:

    ```conf
    class { 'datadog_agent':
        api_key      => "<YOUR_DD_API_KEY>",
        integrations => {
            "ntp" => {
                init_config => {},
                instances => [{
                    offset_threshold => 30,
                }],
            },
        },
    }
    ```

5. (Opcional) Para recopilar métricas y eventos sobre Puppet, consulta la sección [Informes](#reporting).

### Actualización de las integraciones

Para instalar y anclar versiones de integraciones específicas, utiliza `datadog_agent::install_integration`. De este modo, se invoca el comando `datadog-agent integration` para garantizar la instalación o desinstalación de una integración específica. Ejemplo:

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

El argumento `ensure` puede presentar dos valores:

- `present` (predeterminado)
- `absent` (elimina una versión previamente anclada de una integración)

Para instalar una integración de terceros (ej.: del Marketplace), define el argumento `third_party` como `true`.

Ten en cuenta que no es posible cambiar una integración a una versión anterior a la suministrada con el Agent.

### Informes

Para enviar los informes sobre las ejecuciones de Puppet a tu línea de tiempo de Datadog, activa el procesador de informes en tu nodo maestro de Puppet y el envío de informes para tus clientes. Los clientes envían al nodo maestro un informe de ejecución después de cada registro.

1. Define la opción `puppet_run_reports` como true en el manifiesto de configuración de tu nodo maestro:

    ```ruby
    class { 'datadog-agent':
      api_key            => '<YOUR_DD_API_KEY>',
      puppet_run_reports => true
      # ...
    }
    ```

    El GEM dogapi se instala automáticamente. Configura `manage_dogapi_gem` como false si quieres personalizar la instalación.

2. Añade estas opciones de configuración a la configuración del nodo maestro de Puppet (ej.: `/etc/puppetlabs/puppet/puppet.conf`):

    ```ini
    [main]
    # No modification needed to this section
    # ...

    [master]
    # Enable reporting to Datadog
    reports=datadog_reports
    # If you use other reports, add datadog_reports to the end,
    # for example: reports=store,log,datadog_reports
    # ...

    [agent]
    # ...
    report=true
    ```

Con el [módulo `ini_setting`](https://forge.puppet.com/modules/puppetlabs/inifile):

```puppet
  ini_setting { 'puppet_conf_master_report_datadog_puppetdb':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'master',
    setting => 'reports',
    value   => 'datadog_reports,puppetdb',
    notify  => [
      Service['puppet'],
      Service['puppetserver'],
    ],
  }
```

3. En todos tus nodos de cliente de Puppet, añade lo siguiente en la misma localización:

    ```ini
    [agent]
    # ...
    report=true
    ```

Con el [módulo `ini_setting`](https://forge.puppet.com/modules/puppetlabs/inifile):

```puppet
  ini_setting { 'puppet_conf_agent_report_true':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'agent',
    setting => 'report',
    value   => 'true',
    notify  => [
      Service['puppet'],
    ],
  }
```

4. (Opcional) Habilita el etiquetado de informes con hechos:

    Puedes añadir etiquetas en los informes que se envían a Datadog como eventos. Estas etiquetas se pueden extraer de los hechos de Puppet en el nodo en el que se basa el informe. Estos deben ser individuales y no involucrar hechos estructurados (hashes, matrices, etc.) para garantizar su legibilidad. Para habilitar el etiquetado regular de hechos, ajusta el parámetro `datadog_agent::reports::report_fact_tags` al valor de la matriz de los hechos; por ejemplo, `["virtual","operatingsystem"]`. Para activar el etiquetado de hechos fiables, ajusta el parámetro `datadog_agent::reports::report_trusted_fact_tags` al valor de la matriz de los hechos; por ejemplo,`["certname","extensions.pp_role","hostname"]`.

    NOTA: Para modificar estos parámetros, hay que reiniciar pe-puppetserver (o puppetserver) para releer el procesador de informes. Asegúrate de que se hayan desplegado los cambios antes de reiniciar el servicio.

    Consejos:
    - Utiliza dot index para especificar un hecho de destino; de lo contrario, todo el conjunto de datos del hecho se convierte en un valor en forma de cadena (y esto no es muy útil).
    - No dupliques los datos comunes de la monitorización, como el nombre de host, el tiempo de actividad, la memoria, etc.
    - Coordina datos básicos como el rol, el propietario, la plantilla, el centro de datos, etc., que te ayudarán a crear correlaciones significativas con las mismas etiquetas (tags) de las métricas.

5. Busca `sources:puppet` en la herramienta [Event Stream][5] para verificar que tus datos de Puppet están en Datadog.

### Configuración de NPM

Para habilitar las funciones de la herramienta Network Performance Monitoring (NPM) del Datadog Agent, sigue estos pasos:

1. (Solo para Windows) Si el Agent ya está instalado, pasa `win_ensure => absent` a la clase principal y elimina las definiciones de otras clases para desinstalarlo.
2. (Solo para Windows) Pasa la opción `windows_npm_install` con valor `true` a la clase `datadog::datadog_agent`. Elimina `win_ensure` si se ha añadido en el paso anterior.
3. Utiliza la clase `datadog_agent::system_probe` para crear correctamente el archivo de configuración:

```conf
class { 'datadog_agent::system_probe':
    network_enabled => true,
}
```

### Configuración de USM

Para habilitar la herramienta Universal Service Monitoring (USM) del Datadog Agent, utiliza la clase `datadog_agent::system_probe` para crear correctamente el archivo de configuración:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

### Solucionar problemas

Puedes ejecutar el Puppet Agent manualmente para comprobar si hay errores en la salida:

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

     Example response:

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

Si aparece el siguiente error, asegúrate de que `reports=datadog_reports` está definido en `[master]`, no en `[main]`.

    ```text
    err: Could not send report:
    Error 400 on SERVER: Could not autoload datadog_reports:
    Class Datadog_reports is already defined in Puppet::Reports
    ```

Si no ves llegar ningún informe, comprueba los logs de tu servidor Puppet.

### Puppet sin nodo maestro

1. El módulo de Datadog y sus dependencias deben instalarse en todos los nodos que ejecuten sin nodo maestro.
2. Añade esto al archivo `site.pp` de cada nodo:
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. Ejecuta Puppet en una configuración sin nodo maestro:
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

### Etiquetar nodos de cliente

El archivo de configuración del Datadog Agent se recrea a partir de la plantilla en cada ejecución de Puppet. Si necesitas etiquetar tus nodos, añade una entrada de matriz en Hiera:

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
Para generar etiquetas (tags) a partir de hechos personalizados, clasifica tus nodos con hechos de Puppet como si se tratase de una matriz en el parámetro ```facts_to_tags```, ya sea a través de la consola Puppet Enterprise o de Hiera. He aquí un ejemplo:

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["os.family","networking.domain","my_custom_fact"],
}
```

Consejos:

1. En el caso de los hechos estructurados, se debe indexar en el valor del hecho específico. De lo contrario, la matriz se presentaría como una cadena y resultaría difícil de utilizar.
2. Los hechos dinámicos, tales como el uso de la CPU o el tiempo de actividad, entre otros, no son los más indicados para el etiquetado, dado que lo normal es que cambien en cada ejecución. Los hechos estáticos, que normalmente permanecen inalterables durante toda la vida útil de un nodo, son más idóneos para el etiquetado.

### Variables de configuración

Estas variables pueden establecerse en la clase `datadog_agent` para controlar la configuración del Agent. Consulta los [comentarios del código][8] para ver la lista completa de argumentos admitidos.

| nombre de la variable                           | descripción                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | La versión del Agent que se va a instalar: ya sea la 5, la 6 o la 7 (por defecto, es la 7).                                                                                                                              |
| `agent_version`                         | Te permite anclar una versión anterior específica del Agent que ser va a instalar. Ejemplo: `1:7.16.0-1`. Déjalo vacío para instalar la versión más reciente.                                                             |
| `collect_ec2_tags`                      | Recopila las etiquetas EC2 personalizadas de una instancia como etiquetas del Agent mediante el parámetro `true`.                                                                                                                             |
| `collect_instance_metadata`             | Recopila los metadatos EC2 de una instancia como etiquetas del Agent mediante el parámetro `true`.                                                                                                                                |
| `datadog_site`                          | El sitio de Datadog al que se envía la información (solo para el Agent v6 y v7). Por defecto, es `datadoghq.com`. Ejemplo: `datadoghq.eu` o`us3.datadoghq.com`.                                                          |
| `dd_url`                                | La URL del servidor de ingesta de Datadog. Es poco probable que necesites anular esto. Anula el parámetro `datadog_site`.                                                                                                 |
| `host`                                  | Anula el nombre de host del nodo.                                                                                                                                                                  |
| `local_tags`                            | Una matriz de cadenas `<KEY:VALUE>` que se establecen como etiquetas del nodo.                                                                                                                             |
| `non_local_traffic`                     | Permite que otros nodos retransmitan su tráfico a través de este nodo.                                                                                                                                      |
| `apm_enabled`                           | Un booleano que habilita el APM Agent (se establece por defecto como false).                                                                                                                                           |
| `process_enabled`                       | Un booleano que habilita el Agent de proceso (se establece por defecto como false).                                                                                                                                       |
| `scrub_args`                            | Un booleano que habilita la limpieza de líneas de comandos de proceso (se establece por defecto como true).                                                                                                                            |
| `custom_sensitive_words`                | Una matriz para añadir más palabras, aparte de las predeterminadas, usada por la función de limpieza (se establece por defecto como `[]`).                                                                                             |
| `logs_enabled`                          | Un booleano que habilita el Logs Agent (se establece por defecto como false).                                                                                                                                          |
| `windows_npm_install`                   | Un booleano que habilita la instalación del controlador NPM de Windows (se establece por defecto como falso).                                                                                                                     |
| `win_ensure`                            | Un enum (presente/ausente) para garantizar la presencia/ausencia del Datadog Agent en Windows (por defecto, presente).                                                                                    |
| `container_collect_all`                 | Un booleano que habilita la recopilación de logs en todos los contenedores.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | Un hash para proporcionar opciones adicionales de configuración (solo para el Agent v6 y v7).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Una expresión regular que se utiliza al extraer el nombre del host del grupo capturado para informar de la ejecución en Datadog en lugar de enviar el nombre del nodo de Puppet. Ejemplo:<br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?` |

(1) `agent_extra_options` se utiliza para proporcionar un control preciso de las opciones de configuración adicionales del Agent v6/v7. Se realiza una fusión profunda que puede anular las opciones proporcionadas en los parámetros de clase`datadog_agent`. Ejemplo:

```
class { "datadog_agent":
    < your other arguments to the class >,
    agent_extra_options => {
        use_http => true,
        use_compression => true,
        compression_level => 6,
    },
}
```

(2) `hostname_extraction_regex` es útil cuando el módulo Puppet y el Datadog Agent dan diferentes nombres para el mismo host en la lista de infraestructuras.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/integrations/mongo.pp
[7]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
[8]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp