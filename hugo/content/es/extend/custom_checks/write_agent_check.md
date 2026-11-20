---
aliases:
- /es/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /es/agent/faq/agent-5-custom-agent-check/
- /es/developers/write_agent_check/
- /es/developers/custom_checks/write_agent_check/
further_reading:
- link: /extend/
  tag: Documentación
  text: Extensión de Datadog
title: Cómo escribir una verificación de agent personalizada
---
## Descripción general {#overview}

Esta página lo guía a través del proceso de creación de un "¡Hola mundo!" básico verificación personalizada del Agent. También le muestra cómo cambiar el intervalo mínimo de recolección para la verificación.

## Configuración {#setup}

### Instalación {#installation}

Antes de crear una verificación personalizada del Agent, instale el [Datadog Agent][1].

<div class="alert alert-danger">Para trabajar con la versión más reciente del Agent, su verificación personalizada del Agent debe ser compatible con Python 3.</div>

### Configuración {#configuration}

1. Cambie al directorio `conf.d` en su sistema. Para obtener más información sobre dónde encontrar el directorio `conf.d`, consulte [Archivos de configuración del Agent][2].
2. En el directorio `conf.d`, cree un nuevo archivo de configuración para su nueva verificación del Agent. Asigne al archivo el nombre `custom_checkvalue.yaml`.
3. Edite el archivo para incluir lo siguiente:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Cree un archivo de verificación en el directorio `checks.d`. Asigne al archivo el nombre `custom_checkvalue.py`.
   
   <div class="alert alert-info">
     <strong>Cómo nombrar sus verificaciones:</strong>
     <ul>
       <li>Es buena idea anteponer un prefijo al nombre de su verificación <code>custom_</code> para evitar conflictos con el nombre de una integración de Datadog Agent preexistente. Por ejemplo, si tiene una verificación personalizada de Postfix, asigne a sus archivos de verificación los nombres <code>custom_postfix.py</code> y <code>custom_postfix.yaml</code> en lugar de <code>postfix.py</code> y <code>postfix.yaml</code>.</li>
       <li>Los nombres de los archivos de configuración y de verificación deben coincidir. Si su verificación se llama <code>custom_checkvalue.py</code>, su archivo de configuración <i>debe</i> llamarse <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. Edite el archivo para incluir lo siguiente:
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Reinicie el Agent][3] y espere a que una nueva métrica llamada `hello.world` aparezca en [Metrics Catalog][4].

Si tiene problemas para hacer que su verificación personalizada funcione, verifique los permisos del archivo. El archivo de verificación debe ser legible y ejecutable por el usuario del Agent. Para obtener más pasos de solución de problemas, consulte [Solución de problemas de una verificación del Agent][7].

### Actualización del intervalo de recolección {#updating-the-collection-interval}

Para cambiar el intervalo de recolección de su verificación, utilice el ajuste `min_collection_interval` en su archivo `custom_checkvalue.yaml` y especifique un valor en segundos. El valor predeterminado es 15 segundos. Debe agregar el `min_collection_interval` a nivel de instancia. Si su verificación personalizada está configurada para monitorear múltiples instancias, debe configurar el intervalo individualmente por instancia.

Establecer el `min_collection_interval` en `30` no garantiza que la métrica se recolecte cada 30 segundos. El recolector del Agent intenta ejecutar la verificación cada 30 segundos, pero la verificación podría quedar en cola detrás de otras integraciones y verificaciones, dependiendo de cuántas integraciones y verificaciones estén habilitadas en el mismo Agent. Si un método `check` tarda más de 30 segundos en completarse, el Agent nota que la verificación aún se está ejecutando y omite su ejecución hasta el siguiente intervalo.

#### Establecer un intervalo de recolección {#set-a-collection-interval}

Para una sola instancia, utilice esta configuración para establecer el intervalo de recolección en 30 segundos:

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

El siguiente ejemplo demuestra cómo cambiar el intervalo para una verificación personalizada hipotética que monitorea un servicio llamado `my_service` en dos servidores separados:

{{< code-block lang="yaml" >}}
init_config:

instances:
  - host: "http://localhost/"
    service: my_service
    min_collection_interval: 30

  - host: "http://my_server/"
    service: my_service
    min_collection_interval: 30
{{< /code-block >}}

### Cómo comprobar que se ejecuta su verificación {#verifying-your-check}

Para verificar que su verificación se esté ejecutando, use el siguiente comando:

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

Después de verificar que su verificación se esté ejecutando, [reinicie el Agent][3] para incluir la verificación y comenzar a informar datos.

## Escritura de verificaciones que ejecutan programas de línea de comandos {#writing-checks-that-run-command-line-programs}

Es posible crear una verificación personalizada que ejecute un programa de línea de comandos y capture su salida como una métrica personalizada. Por ejemplo, una verificación puede ejecutar el comando `vgs` para proporcionar información sobre grupos de volúmenes.

Debido a que el intérprete de Python que ejecuta las verificaciones está integrado en el entorno de ejecución multihilo de Go, no se admite el uso de los módulos `subprocess` o `multithreading` de la biblioteca estándar de Python. Para ejecutar un subproceso dentro de una verificación, use la [función `get_subprocess_output()`][5] del módulo `datadog_checks.base.utils.subprocess_output`. El comando y sus argumentos se pasan a `get_subprocess_output()` en forma de lista, con el comando y sus argumentos como una cadena dentro de la lista.

Por ejemplo, un comando que se ingresa en el símbolo del sistema de esta manera:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

debe pasarse a `get_subprocess_output()` de esta manera:

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

Cuando ejecuta el programa de línea de comandos, la verificación captura la misma salida que al ejecutarlo en la línea de comandos en la terminal. Realice el procesamiento de cadenas en la salida y llame a `int()` o `float()` en el resultado para devolver un tipo numérico.

Si no realiza el procesamiento de cadenas en la salida del subproceso, o si no devuelve un número entero o de punto flotante, la verificación parece ejecutarse sin errores pero no informa ninguna métrica ni evento. La verificación tampoco devuelve métricas ni eventos si el usuario del Agent no tiene los permisos correctos en los archivos o directorios a los que se hace referencia en el comando, o los permisos correctos para ejecutar el comando pasado como argumento a `get_subprocess_output()`.

Aquí hay un ejemplo de una verificación que devuelve los resultados de un programa de línea de comandos:

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Envío de datos desde un balanceador de carga {#sending-data-from-a-load-balancer}

Un caso de uso común para escribir una verificación personalizada del Agent es enviar métricas de Datadog desde un balanceador de carga. Antes de comenzar, siga los pasos en [Configuración](#configuration).

Para expandir los archivos para enviar datos desde su balanceador de carga:

1. Reemplace el código en `custom_checkvalue.py` con lo siguiente (reemplazando el valor de `lburl` con la dirección de su balanceador de carga):
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
import urllib2
import simplejson
from checks import AgentCheck

class CheckValue(AgentCheck):
  def check(self, instance):
    lburl = instance['ipaddress']
    response = urllib2.urlopen("http://" + lburl + "/rest")
    data = simplejson.load(response)

    self.gauge('coreapp.update.value', data["value"])
{{< /code-block >}}

1. Actualice el archivo `custom_checkvalue.yaml` (reemplazando `ipaddress` con la dirección IP de su balanceador de carga):
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Reinicie su Agent][3]. En un minuto, debería ver aparecer en [Metrics Catalog][4] una nueva métrica llamada `coreapp.update.value` que envía las métricas desde su balanceador de carga.
1. [Cree un tablero][6] para esta métrica.

## Control de versiones del Agent {#agent-versioning}

Utilice el siguiente bloque try/except para hacer que la verificación personalizada sea compatible con cualquier versión del Agent:

{{< code-block lang="python" >}}
try:
    # first, try to import the base class from new versions of the Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/catalog
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /es/dashboards/
[7]: /es/agent/troubleshooting/agent_check_status/