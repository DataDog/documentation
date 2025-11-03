---
aliases:
- /es/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /es/agent/faq/agent-5-custom-agent-check/
- /es/developers/write_agent_check/
further_reading:
- link: /developers/
  tag: Documentación
  text: Desarrollar en Datadog
title: Escribir un check del Agent personalizado
---

## Información general

Esta página te guía por el proceso para crear un check básico personalizado del Agent "Hello world!". También te muestra cómo cambiar el intervalo mínimo de recopilación para el check.

## Configuración

### Instalación

Antes de crear un check del Agent personalizado, instala el [Datadog Agent][1].

<div class="alert alert-danger">Para trabajar con la última versión del Agent, tu check del Agent personalizado debe ser compatible con Python 3.</div>

### Configuración

1. Cambia al directorio `conf.d` de tu sistema. Para más información sobre dónde encontrar el directorio `conf.d`, consulta [archivos de configuración del Agent][2].
2. En el directorio `conf.d`, crea un nuevo archivo de configuración para tu nuevo check de Agent. Nombra el archivo `custom_checkvalue.yaml`.
3. Edita el archivo para incluir lo siguiente:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Crea un archivo de check en el directorio `checks.d`. Nombra el archivo `custom_checkvalue.py`.

   <div class="alert alert-info">
     <strong>Naming your checks:</strong>
     <ul>
       <li>It's a good idea to prefix your check with <code>custom_</code> to avoid conflicts with the name of a pre-existing Datadog Agent integration. For example, if you have a custom Postfix check, name your check files <code>custom_postfix.py</code> and <code>custom_postfix.yaml</code> instead of <code>postfix.py</code> and <code>postfix.yaml</code>.</li>
       <li>The names of the configuration and check files must match. If your check is called <code>custom_checkvalue.py</code>, your configuration file <i>must</i> be named <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. Edita el archivo para incluir lo siguiente:
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Reinicia el Agent][3] y espera a que aparezca una nueva métrica llamada `hello.world` en el [Resumen de métricas][4].

Si tienes problemas para que el check personalizado funcione, comprueba los permisos del archivo. El archivo del check debe ser legible y ejecutable por el usuario del Agent. Para conocer más pasos para solucionar problemas, consulta [Solución de problemas de un check del Agent][7].

### Actualización del intervalo de recopilación

Para cambiar el intervalo de recopilación de tu check, utiliza el ajuste `min_collection_interval` de tu archivo `custom_checkvalue.yaml` y especifica un ajuste en segundos. El valor por defecto es de 15 segundos. Debes añadir el `min_collection_interval` a nivel de instancia. Si tu check personalizado está configurado para monitorizar múltiples instancias, debes configurar el intervalo individualmente por instancia.

Establecer el `min_collection_interval` en `30` no garantiza que la métrica se recopile cada 30 segundos. El recopilador del Agent intenta ejecutar el check cada 30 segundos, pero el check podría terminar en cola detrás de otras integraciones y checks, según cuántas integraciones y checks estén habilitados en el mismo Agent. Si un método `check` tarda más de 30 segundos en completarse, el Agent se da cuenta de que el check sigue en ejecución y se salta su ejecución hasta el siguiente intervalo.

#### Fijar un intervalo de recopilación

Para una única instancia, utiliza esta configuración para establecer el intervalo de recopilación en 30 segundos:

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

El siguiente ejemplo muestra cómo cambiar el intervalo de un hipotético check personalizado que monitoriza un servicio llamado `my_service` en dos servidores distintos:

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

### Verificación de tu check

Para verificar que tu check se está ejecutando, utiliza el siguiente comando:

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

Después de verificar que tu check está funcionando, [reinicia el Agent][3] para incluir el check y comenzar a reportar datos.

## Escribir checks que ejecuten programas de línea de comandos

Es posible crear un check personalizado que ejecute un programa de línea de comandos y capture su salida como un archivo de métrica personalizada. Por ejemplo, el check puede ejecutar el comando `vgs` para obtener información sobre grupos de volúmenes.

Debido a que el intérprete de Python que ejecuta los checks está incrustado en el tiempo de ejecución de múltiples subprocesos de Go, no se permite el uso de los módulos `subprocess` o `multithreading` de la librería estándar de Python. Para ejecutar un subproceso dentro de un check, utiliza la [función`get_subprocess_output()`][5] del módulo `datadog_checks.base.utils.subprocess_output`. El comando y sus argumentos se pasan a `get_subprocess_output()` en forma de lista, con el comando y sus argumentos como una cadena dentro de lista.

Por ejemplo, un comando que se introduce en el símbolo del sistema de la siguiente manera:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

debe pasarse así a `get_subprocess_output()`:

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

Cuando ejecutas el programa de línea de comandos, el check captura la misma salida que al ejecutar la línea de comandos en el terminal. Haz el procesamiento en cadena en la salida y llama a `int()` o `float()` en el resultado para devolver un tipo numérico.

Si no haces un procesamiento por cadena de la salida del subproceso, o si no devuelve un entero o un número flotante, el check parece ejecutarse sin errores, pero no informa de ninguna métrica o evento. El check tampoco devuelve métricas o eventos si el usuario del Agent no tiene los permisos correctos en cualquiera de los archivos o directorios referenciados en el comando, o los permisos correctos para ejecutar el comando pasado como argumento a `get_subprocess_output()`.

He aquí un ejemplo de check que devuelve los resultados de un programa de línea de comandos:

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Envío de datos desde un balanceador de carga

Un caso de uso común para escribir un check personalizado de Agent es enviar métricas de Datadog desde un balanceador de carga. Antes de empezar, sigue los pasos de [Configuración](#configuration).

Para ampliar los archivos para enviar datos desde tu balanceador de carga:

1. Sustituye el código de `custom_checkvalue.py` por el siguiente (sustituyendo el valor de `lburl` por la dirección de tu balanceador de carga):
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

1. Actualiza el archivo `custom_checkvalue.yaml` (sustituyendo `ipaddress` por la dirección IP de tu balanceador de carga):
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Reinicia tu Agent][3]. En un minuto, deberías ver aparecer una nueva métrica en el [Resumen de métrica][4] llamado `coreapp.update.value` que envía las métricas desde tu balanceador de carga.
1. [Crea un dashboard][6] para esta métrica.

## Versiones del Agent

Utiliza el siguiente bloque try/except para hacer que el check personalizado sea compatible con cualquier versión del Agent:

{{< code-block lang="python" >}}
intenta:
    # primero intenta importar la clase de base de versiones nuevas del Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # si falla, el check se está ejecutando en el Agent versión < 6.6.0
    from checks import AgentCheck

# el contenido de la variable especial __version__ se mostrará en la página de estado del Agent
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /es/dashboards/
[7]: /es/agent/troubleshooting/agent_check_status/
