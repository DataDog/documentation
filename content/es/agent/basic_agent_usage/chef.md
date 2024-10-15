---
dependencies:
- https://github.com/DataDog/chef-datadog/blob/main/README.md
title: Chef
---
Las recetas del Datadog Chef se usan para desplegar los componentes y la configuración de Datadog automáticamente. El cookbook es compatible con:

* Datadog Agent v7.x (predeterminado)
* Datadog Agent v6.x
* Datadog Agent v5.x

**Nota**: Es posible que esta página describa funciones que no están disponibles en la versión que has elegido. Consulta el archivo README de la
etiqueta git o la versión gem de la documentación de tu versión.

## Configuración

### Requisitos

El cookbook de Datadog Chef es compatible con `chef-client` >= 12.7. Si necesitas compatibilidad con Chef < 12.7, usa la [versión 2.x del cookbook][2]. Consulta [CHANGELOG][3] para más información.

#### Platformas

Se admiten las siguientes plataformas:

* AlmaLinux (requiere Chef 16 >= 16.10.8 o Chef >= 17.0.69)
* Amazon Linux
* CentOS
* Debian
* RedHat (RHEL 8 requiere Chef >= 15)
* Rocky (requiere Chef 16 >= 16.17.4 o Chef >= 17.1.35)
* Scientific Linux
* Ubuntu
* Windows
* SUSE (requiere Chef >= 13.3)

#### Cookbooks

Los siguientes cookbooks de Opscode son dependencias:

* `apt`
* `chef_handler`
* `yum`

**Nota**: Se necesita, como mínimo, la v7.1 del cookbook `apt` para instalar el Agent en Debian 9 (y posteriores).

#### Chef

**Usuarios de Chef 12**: Dependiendo de la versión de Chef 12 que uses, puede haber restricciones adicionales relacionadas con las dependencias:

```ruby
# Chef < 12.14
depends 'yum', '< 5.0'
```

```ruby
# Chef < 12.9
depends 'apt', '< 6.0.0'
depends 'yum', '< 5.0'
```

**Usuarios de Chef 13**: Con Chef 13 y `chef_handler` 1.x, puede que la receta `dd-handler` os dé algún problema. La única solución conocida es actualizar la dependencia a `chef_handler` >= 2.1.

### Instalación

1. Añade el cookbook a tu servidor de Chef con [Berkshelf][5] o [Knife][6]:
    ```text
    # Berksfile
    cookbook 'datadog', '~> 4.0.0'
    ```

    ```shell
    # Knife
    knife cookbook site install datadog
    ```

2. Configura los [atributos específicos de Datadog](#datadog-attributes) en un rol, entorno u otra receta:
    ```text
    node.default['datadog']['api_key'] = "<YOUR_DD_API_KEY>"

    node.default['datadog']['application_key'] = "<YOUR_DD_APP_KEY>"
    ```

3. Carga el cookbook actualizado en tu servidor de Chef:
    ```shell
    berks upload
    # or
    knife cookbook upload datadog
    ```

4. Después de cargar el cookbook, añádelo a los parámetros `run_list` o `role` de tu nodo:
    ```text
    "run_list": [
      "recipe[datadog::dd-agent]"
    ]
    ```

5. Espera a que se ejecute el próximo `chef-client` programado o actívalo manualmente.

### Entorno dockerizado

Para crear un entorno de Docker, usa los archivos que aparece debajo de `docker_test_env`:

```
cd docker_test_env
docker build -t chef-datadog-container .
```

Para ejecutar el contenedor, usa:

```
docker run -d -v /dev/vboxdrv:/dev/vboxdrv --privileged=true chef-datadog-container
```

Luego, asocia una consola al contenedor o usa la función de contenedor remoto de VSCode para programar dentro del contenedor.

#### Atributos de Datadog

Puedes usar los siguientes métodos para añadir tus [claves de API y aplicación de Datadog][4]:

* Como atributos de nodo con un `environment` o `role`.
* Como atributos de nodo, declarando las claves en otro cookbook con un nivel más alto de prioridad.
* En el nodo `run_state`, definiendo `node.run_state['datadog']['api_key']` en otro cookbook que sea anterior a las recetas de Datadog en la `run_list`. Esta opción no guarda las credenciales en el servidor de Chef como texto sin cifrar.

**Nota**: Cuando se usa el estado de ejecución para guardar las claves de API y aplicación, hay que configurarlas en el momento de la compilación y antes que `datadog::dd-handler` en la lista de ejecuciones.

#### Configuración extra

Para añadir más elementos al archivo de configuración del Agent (generalmente, `datadog.yaml`) sin que estén directamente disponibles como atributos del cookbook, usa el atributo `node['datadog']['extra_config']`. Se trata de un atributo hash que se ordena dentro del archivo de configuración como corresponde.

##### Ejemplos

El código siguiente define el campo `secret_backend_command` en el archivo de configuración `datadog.yaml`:

```ruby
 default_attributes(
   'datadog' => {
     'extra_config' => {
       'secret_backend_command' => '/sbin/local-secrets'
     }
   }
 )
```

También se puede definir `secret_backend_command` usando:

```text
default['datadog']['extra_config']['secret_backend_command'] = '/sbin/local-secrets'
```

Usa la sintaxis de objeto para los atributos anidados. El código siguiente define el campo `logs_config` en el archivo de configuración `datadog.yaml`:

```ruby
default['datadog']['extra_config']['logs_config'] = { 'use_port_443' => true }
```

#### Despliegue de Chef en AWS OpsWorks

Sigue los pasos siguientes para desplegar el Datadog Agent con Chef en AWS OpsWorks:

1. Añade el JSON personalizado de Chef:
  ```json
  {"datadog":{"agent_major_version": 7, "api_key": "<API_KEY>", "application_key": "<APP_KEY>"}}
  ```

2. Incluye la receta en la receta `install-lifecycle`:
  ```ruby
  include_recipe '::dd-agent'
  ```

### Integraciones

Incluye la [receta](#recipes) y los detalles de la configuración en la lista de ejecuciones y los atributos de tu rol para activar las integraciones del Agent.
**Nota**: Puedes usar el recurso `datadog_monitor` para activar las integraciones del Agent sin una receta.

Asocia tus recetas con los `roles` que prefieras. Por ejemplo, `role:chef-client` debería contener `datadog::dd-handler` y `role:base` debería iniciar el Agent con `datadog::dd-agent`. A continuación, te mostramos un ejemplo de rol con las recetas `dd-handler`, `dd-agent` y `mongo`:

```ruby
name 'example'
description 'Example role using DataDog'

default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'api_key' => '<YOUR_DD_API_KEY>',
    'application_key' => '<YOUR_DD_APP_KEY>',
    'mongo' => {
      'instances' => [
        {'host' => 'localhost', 'port' => '27017'}
      ]
    }
  }
)

run_list %w(
  recipe[datadog::dd-agent]
  recipe[datadog::dd-handler]
  recipe[datadog::mongo]
)
```

**Nota**: No se usa `data_bags` en esta receta porque es improbable que haya varias claves de API con una sola clave de aplicación.

## Versiones

Por defecto, la actual versión principal de este cookbook instala el Agent v7. Los siguientes atributos sirven para controlar la versión del Agent instalada:

| Parámetro              | Descripción                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`  | Ancla la versión principal del Agent a la 5, 6, o 7 (predeterminado).                                                                                                                         |
| `agent_version`        | Ancla una versión concreta del Agent (recomendado).                                                                                                                                         |
| `agent_package_action` | (Solo Linux) Se establece por defecto como `'install'` (recomendado); `'upgrade'` sirve para actualizar automáticamente el Agent (no recomendado). Usa la opción predeterminada y cambia el parámetro `agent_version` anclado para actualizar. |
| `agent_flavor` | (Solo Linux) Se establece por defecto como `'datadog-agent'` para instalar el Datadog Agent; se puede cambiar a `'datadog-iot-agent'` para instalar el IoT Agent. |

Consulta el ejemplo [attributes/default.rb][1] correspondiente a tu versión del cookbook para ver todos los atributos disponibles.

### Pasar a una versión posterior

Los nombres de algunos atributos han cambiado entre las versiones 3.x y 4.x del cookbook. Usa esta tabla de referencia para actualizar tu configuración:

| Acción                | Cookbook 3.x                                          | Cookbook 4.x                              |
|-----------------------|-------------------------------------------------------|-------------------------------------------|
| Instalar el Agent 7.x     | No compatible                                         | `'agent_major_version' => 7`              |
| Instalar el Agent 6.x     | `'agent6' => true`                                    | `'agent_major_version' => 6`              |
| Instalar el Agent 5.x     | `'agent6' => false`                                   | `'agent_major_version' => 5`              |
| Anclar versión del Agent     | `'agent_version'` o `'agent6_version'`               | `'agent_version'` para todas las versiones        |
| Cambiar package_action | `'agent_package_action'` o `'agent6_package_action'` | `'agent_package_action'` para todas las versiones |
| Cambiar URL de repositorio APT   | `'aptrepo'` o `'agent6_aptrepo'`                     | `'aptrepo'` para todas las versiones              |
| Cambiar distribución de repositorio APT  | `'aptrepo_dist'` o `'agent6_aptrepo_dist'`           | `'aptrepo_dist'` para todas las versiones         |
| Cambiar repositorio YUM       | `'yumrepo'` o `'agent6_yumrepo'`                     | `'yumrepo'` para todas las versiones              |
| Cambiar repositorio SUSE      | `'yumrepo_suse'` o `'agent6_yumrepo_suse'`           | `'yumrepo_suse'` para todas las versiones         |

Usa uno de los siguientes métodos para actualizar el Agent v6 al v7:

* Define `agent_major_version` como `7` y `agent_package_action` como `install`, y ancla una versión específica de v7 como `agent_version` (recomendado).
* Define `agent_major_version` como `7` y `agent_package_action` como `upgrade`.

El siguiente ejemplo muestra cómo se puede cambiar del Agent v6 al v7. Para pasar del Agent v5 al v6, sigue los mismos pasos.

```ruby
default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'agent_version' => '7.25.1',
    'agent_package_action' => 'install',
  }
)
```

### Pasar a una versión anterior

Para cambiar a una versión anterior del Agent, define `'agent_major_version'`, `'agent_version'` y `'agent_allow_downgrade'`.

El siguiente ejemplo muestra cómo se puede cambiar del Agent v7 al v6. Para pasar del Agent v6 al v5, sigue los mismos pasos.

```ruby
  default_attributes(
    'datadog' => {
      'agent_major_version' => 6,
      'agent_version' => '6.10.0',
      'agent_allow_downgrade' => true
    }
  )
```

### Desinstalar

Para desinstalar el Agent, elimina la receta `dd-agent` y añade la receta `remove-dd-agent` sin atributos.

## Recetas

Accede a las [recetas de Datadog Chef en GitHub][7].

### Predeterminada

La [receta predeterminada][8] es un parámetro.

### Agent

La [receta dd-agent][9] instala el Datadog Agent en el sistema de destino, establece tu [clave de API de Datadog][4] e inicia el servicio para enviar métricas de sistemas locales.

**Nota**: Los usuarios de Windows que actualicen las versiones del Agent <= 5.10.1 a >= 5.12.0 a otras posteriores, deben definir el atributo `windows_agent_use_exe` como `true`. Para más información, consulta la [wiki de dd-agent][10].

### Handler

La [receta dd-handler][11] instala el gem [chef-handler-datadog][12] e invoca el handler al final de una ejecución de Chef para enviar los detalles al muro de noticias.

### DogStatsD

Para instalar una biblioteca en un lenguaje concreto para interactuar con DogStatsD:

- Ruby: [receta dogstatsd-ruby][13]
- Python: Añade una dependencia del cookbook `poise-python` en tu cookbook personalizado/contenedor y usa el recurso que te presentamos a continuación. Para más información, consulta el [repositorio poise-python][14].
    ```ruby
    python_package 'dogstatsd-python' # assumes python and pip are installed
    ```

### Rastreo

Para instalar una biblioteca en un lenguaje concreto para rastrear aplicaciones (APM):

- Ruby: [receta ddtrace-ruby][15]
- Python: Añade una dependencia del cookbook `poise-python` en tu cookbook personalizado/contenedor y usa el recurso que te presentamos a continuación. Para más información, consulta el [repositorio poise-python][14].
    ```ruby
    python_package 'ddtrace' # assumes python and pip are installed
    ```

### Integraciones

Hay muchas [recetas][7] que pueden ayudarte a desplegar los archivos de configuración y las dependencias de la integración del Agent.

### System-probe

La [receta system-probe][17] se incluye automáticamente por defecto y es la encargada de redactar el archivo `system-probe.yaml`. Se puede modificar este comportamiento si se establece `node['datadog']['system_probe']['manage_config']` como false.

Para activar [Network Performance Monitoring][7] (NPM) en `system-probe.yaml`, define `node['datadog']['system_probe']['network_enabled']` como true.

Para activar [Universal Service Monitoring][7] (USM) en `system-probe.yaml`, define `node['datadog']['system_probe']['service_monitoring_enabled']` como true.

**Nota para usuarios de Windows**: Windows admite NPM con el Agent v6.27/v7.27 (y posteriores). Esta herramienta se distribuye como un componente opcional que solo se instala si `node['datadog']['system_probe']['network_enabled']` está configurado como true en el momento de instalar o actualizar el Agent. Por este motivo, las instalaciones existentes podrían requerir la desinstalación y reinstalación del Agent para instalar el componente NPM, a no ser que se actualice el Agent al mismo tiempo.

## Recursos

### Integraciones sin recetas

Usa el recurso `datadog_monitor` para activar integraciones del Agent sin ninguna receta.

#### Acciones

- `:add`: (predeterminado) Prepara el archivo de configuración, añade los permisos correctos al archivo y reinicia el Agent para activar la integración.
- `:remove`: Desactiva una integración.

#### Sintaxis

```ruby
datadog_monitor 'name' do
  init_config                       Hash # default value: {}
  instances                         Array # default value: []
  logs                              Array # default value: []
  use_integration_template          true, false # default value: false
  action                            Symbol # defaults to :add
end
```

#### Propiedades

| Propiedad                   | Descripción                                                                                                                                                                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'name'`                   | Nombre de la integración del Agent que hay que configurar y activar.                                                                                                                                                                                                                                     |
| `instances`                | Campos que se usan para rellenar los valores de la sección `instances` dentro del archivo de configuración de la integración.                                                                                                                                                                                            |
| `init_config`              | Campos que se usan para rellenar los valores de la sección `init_config` dentro del archivo de configuración de la integración.                                                                                                                                                                                      |
| `logs`                     | Campos que se usan para rellenar los valores de la sección `logs` dentro del archivo de configuración de la integración.                                                                                                                                                                                             |
| `use_integration_template` | Establécela como `true` (recomendado) para usar la plantilla predeterminada, la cual redacta los valores de `instances`, `init_config` y `logs` en el YAML con sus claves correspondientes. Esto cambia por defecto a `false` para garantizar la compatibilidad con versiones anteriores, pero puede que se establezca de forma predeterminada como `true` en una versión principal futura del cookbook. |

#### Ejemplo

Este ejemplo muestra cómo se activa la integración de ElasticSearch usando el recurso `datadog_monitor`. Esto proporciona la configuración de la instancia (en este caso, la URL para conectar con ElasticSearch) y define el indicador de `use_integration_template` para usar la plantilla de configuración predeterminada. Además, avisa al recurso `service[datadog-agent]` para que reinicie el Agent.

**Nota**: La instalación del Agent debe estar por encima de esta receta en la lista de ejecuciones.

```ruby
include_recipe '::dd-agent'

datadog_monitor 'elastic' do
  instances  [{'url' => 'http://localhost:9200'}]
  use_integration_template true
  notifies :restart, 'service[datadog-agent]' if node['datadog']['agent_start']
end
```

Consulta las [recetas de Chef para su integración con Datadog][7] si deseas ver más ejemplos.

### Versiones de integraciones

Para instalar una versión específica de una integración de Datadog, usa el recurso `datadog_integration`.

#### Acciones

- `:install`: (predeterminado) Instala una integración con la versión especificada.
- `:remove`: Elimina una integración.

#### Sintaxis

```ruby
datadog_integration 'name' do
  version                      String         # version to install for :install action
  action                       Symbol         # defaults to :install
  third_party                  [true, false]  # defaults to :false
end
```

#### Propiedades

- `'name'`: Nombre de la integración del Agent que se va a instalar. Ejemplo: `datadog-apache`.
- `version`: Versión de la integración que se va a instalar (solo se necesita con la acción `:install`).
- `third_party`: Debe establecerse como false si se va a instalar una integración de Datadog y como true en caso contrario. Solamente disponible para las versiones 6.21/7.21 y posteriores del Datadog Agent.

#### Ejemplo

Este ejemplo instala la versión `1.11.0` de la integración de ElasticSearch usando el recurso `datadog_integration`.

**Nota**: La instalación del Agent debe estar por encima de esta receta en la lista de ejecuciones.

```ruby
include_recipe '::dd-agent'

datadog_integration 'datadog-elastic' do
  version '1.11.0'
end
```

Para obtener las versiones disponibles de las integraciones, consulta el `CHANGELOG.md` específico de la integración en el [repositorio integrations-core][16].

**Nota**: En el caso de los usuarios de Chef con Windows, `chef-client` debe tener permiso para leer el archivo `datadog.yaml` cuando este recurso use el binario `datadog-agent` disponible en el nodo.


[1]: https://github.com/DataDog/chef-datadog/blob/master/attributes/default.rb
[2]: https://github.com/DataDog/chef-datadog/releases/tag/v2.18.0
[3]: https://github.com/DataDog/chef-datadog/blob/master/CHANGELOG.md
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.chef.io/berkshelf/
[6]: https://docs.chef.io/knife/
[7]: https://github.com/DataDog/chef-datadog/tree/master/recipes
[8]: https://github.com/DataDog/chef-datadog/blob/master/recipes/default.rb
[9]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-agent.rb
[10]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[11]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-handler.rb
[12]: https://rubygems.org/gems/chef-handler-datadog
[13]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dogstatsd-ruby.rb
[14]: https://github.com/poise/poise-python
[15]: https://github.com/DataDog/chef-datadog/blob/master/recipes/ddtrace-ruby.rb
[16]: https://github.com/DataDog/integrations-core
[17]: https://github.com/DataDog/chef-datadog/blob/master/recipes/system-probe.rb