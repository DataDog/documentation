---
app_id: chef
categories:
- automatización
- configuración y despliegue
- seguimiento de problemas
- recopilación de logs
- suministro
custom_kind: integración
description: Infraestructura TI y entrega de aplicaciones como código para un control
  flexible y potente.
media: []
title: Chef
---
{{< img src="integrations/chef/chefdashboard.png" alt="Evento de Chef" popup="true">}}

## Información general

Chef es una popular herramienta de gestión de configuración escrita en Ruby y Erlang.

El despliegue de Datadog con Chef está pensado para ser muy sencillo y brindarle un método para obtener el valor de la monitorización en toda su infraestructura de la forma más simple posible.

Datadog también proporciona un [gestor de informes y ejecución](https://docs.chef.io/handlers.html) de Chef que puede capturar las fallas de `chef-client` así como métricas relacionadas con la ejecución de Chef, como el tiempos y los recursos actualizados.

## Configuración

### Despliegue del Agent

El [cookbook de Chef de Datadog](https://supermarket.chef.io/cookbooks/datadog) está disponible para automatizar la instalación y la configuración del Datadog Agent.

Instala la última versión publicada del cookbook de Chef en Datadog desde el [Supermarket](https://supermarket.chef.io/cookbooks/datadog) con Knife, y cárgalo en tu servidor Chef:

```text
knife cookbook site install datadog
knife cookbook upload datadog
```

Sigue las instrucciones de tu herramienta para cargar el cookbook al servidor de Chef.

Antes de añadir la receta del cookbook al `run_list` de tu nodo, debes agregar las credenciales de tu cuenta de Datadog, como claves API utilizando los atributos de Chef.

Esto se suele hacer con los archivos `role` o `environment`, u otro cookbook que declare los atributos.

He aquí un ejemplo de un archivo de roles `base.rb`, que suele aplicarse a cada host de una organización.

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)
```

**Nota**: Se necesitan dos claves. Tu [clave de API](https://app.datadoghq.com/organization-settings/api-keys) y tu [clave de aplicación](https://app.datadoghq.com/organization-settings/application-keys) de Datadog.

Proporciona ambos valores en los atributos como se muestra arriba.

Luego sube tu archivo de roles al servidor de Chef de esta manera:

```text
knife role from file roles/base.rb
```

La próxima vez que se ejecute Chef, instalará el Agent y configurará el archivo de configuración con las claves de API y de aplicación.

**NOTA:** Si utilizas otro cookbook para definir estos atributos, usa un nivel de precedencia de atributos superior a `default`.

### Gestor de informes

Datadog ofrece un gestor de informes de Chef que informa a Datadog sobre las métricas y los eventos de las ejecuciones de Chef. Una vez instalado, el gestor de informes envía métricas sobre los tiempos de ejecución de Chef y los cambios de recursos. También se crean eventos para permitir el seguimiento de las tasas de éxito y fracaso de las ejecuciones de Chef.

Esto tiene el valor agregado de llevar la salida de una ejecución de Chef al flujo de eventos de Datadog, de modo que las fallas se puedan resaltar rápidamente, discutir con el equipo y resolver.

Los éxitos tienen una prioridad "Baja", mientras que los fallos tienen una prioridad "Normal", y cuando el mismo nodo pasa la ejecución de Chef, se coloca en prioridad "Baja".

Añadir el gestor es muy sencillo, como puedes ver en este fragmento de rol:

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'datadog::dd-handler',
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "<DATADOG_API_KEY>",
    'application_key' => "<DATADOG_APPLICATION>"
  }
)
```

En este ejemplo, el cookbook `datadog::dd-handler` se ha añadido al principio de la lista de ejecución del nodo. Añadirlo al principio permite al manejador capturar detalles de todo lo que observa después de ser invocado, así que si lo has añadido al final de `run_list` y algo ha fallado antes de que se ejecutara, puede que no recibas el resultado completo.

Una vez configurado, carga el rol en tu servidor Chef y aguarda. Después de que Chef se haya ejecutado en algunos hosts, se creará un nuevo dashboard automático, con las métricas relevantes de Chef. Puedes encontrarlo en tu [lista de dashboards](https://app.datadoghq.com/dashboard/lists), en la parte derecha.

### Envío de métricas de Chef a Datadog

1. Si utilizas Berkshelf, añade el cookbook a tu Berksfile:

   ```text
   cookbook 'datadog'
   ```

   De lo contrario, instala el cookbook en tu repositorio utilizando Knife:

   ```text
   knife cookbook site install datadog
   ```

1. Configura los atributos específicos de Datadog en un rol, entorno u otra receta:

   ```conf
   # Make sure you replace the API and application key below
   # with the ones for your account

   node.default['datadog']['<API_KEY>'] = "<DATADOG_API_KEY>"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['<APPLICATION_KEY>] ="<DATADOG_APP_KEY>"
   ```

1. Carga el cookbook actualizado en el servidor de Chef.

   ```bash
   berks upload
   # or
   knife cookbook upload datadog

   knife cookbook list | grep datadog && \
   echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
   echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"
   ```

   El cookbook está listo para ser aplicado a tus nodos.

1. Una vez cargado, añádelo a la run_list o el rol de tu nodo:

   ```conf
   "run_list": [
     "recipe[datadog::dd-handler]"
   ]
   ```

1. Espera a la siguiente ejecución programada de chef-client.

### Recopilación de logs

La recopilación de logs está disponible con el Agent v6.0 o posterior. Consulta [attributes/default.rb](https://github.com/DataDog/chef-datadog/blob/v2.15.0/attributes/default.rb#L383-L388) para activarla. Para ver más detalles, consulta el [ejemplo de configuración](#customizations) a continuación.

### Validación

Desde tu [flujo de eventos](https://app.datadoghq.com/event/stream), introduce `sources:chef` en la barra de búsqueda. Deberían aparecer tus ejecuciones de Chef.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **chef.resources.elapsed_time** <br>(gauge) | Tiempo total transcurrido durante la ejecución del cliente Chef.<br>_Se muestra en segundos_ |
| **chef.resources.total** <br>(gauge) | Recuento total de recursos gestionados por Chef.<br>_Se muestra como recurso_ |
| **chef.resources.updated** <br>(gauge) | Recuento total de recursos actualizados en la ejecución del cliente Chef.<br>_Se muestra como recurso_ |

## Referencias adicionales

### Personalizaciones

El cookbook de Chef de Datadog proporciona recetas más específicas de la integración.

Incluir una de estas recetas en tu lista de ejecución instala todas las dependencias de monitorización, como cualquier módulo de Python que sea necesario para monitorizar ese servicio, así como también escribe el archivo de configuración correcto.

He aquí un ejemplo de ampliación de un archivo de roles `webserver.rb` para monitorizar automáticamente Apache con Datadog:

```ruby
name 'webserver'
description 'Webserver role, runs apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ],
      'logs' => [
        { 'type' => 'file',
          'path' => '/var/log/apache2/access.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] },
        { 'type' => 'file',
          'path' => '/var/log/apache2/error.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)
```

En este ejemplo, la receta `datadog::apache` se añadió a la lista de ejecución junto con algunos atributos para controlar qué instancias de Apache debería monitorizar Datadog.

Lee cada archivo de receta para conocer los detalles exactos de los valores de integración que se deben pasar a la parte de `instances` de los atributos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).