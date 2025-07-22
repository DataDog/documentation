---
title: Escribir un check del Agent personalizado
aliases:
    - /agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
    - /agent/faq/agent-5-custom-agent-check/
    - /developers/write_agent_check/
further_reading:
- link: "/developers/"
  tag: "Documentación"
  text: "Desarrollo en Datadog"
---

## Información general

Esta página te guía a través del proceso de crear un check personalizado básico del Agent "¡Hello world!" También te muestra cómo cambiar el intervalo mínimo de recopilación para el check.

## Configuración

### Instalación

Antes de crear un check del Agent personalizado, instala el [Datadog Agent][1].

<div class="alert alert-warning">Para trabajar con la última versión del Agent, tu check personalizado del Agent debe ser compatible con Python 3.</div>

### Configuración

1. Cambia al directorio `conf.d` de tu sistema. Para obtener más información sobre dónde encontrar el directorio `conf.d`, consulta [Archivos de configuración del Agent][2].
2. En el directorio `conf.d`, crea un nuevo archivo de configuración para tu nuevo check del Agent. Nombra el archivo `custom_checkvalue.yaml`.
3. Edita el archivo para incluir lo siguiente:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Crea un archivo de check en el directorio `checks.d`. Nombra el archivo `custom_checkvalue.py`.
   
   <div class="alert alert-info">
   <strong>Nombrar tus checks:</strong>
     <ul>
       <li>Una buena idea es anteponer tu comprobación con <code>custom_</code> para evitar conflictos con el nombre de una integración preexistente del Datadog Agent. Por ejemplo, si tienes un check Postfix personalizada, nombra tus archivos de check <code>custom_postfix.py</code> y <code>custom_postfix.yaml</code> en lugar de <code>postfix.py</code> y <code>postfix.yaml</code>.</li>
       <li>Los nombres de los archivos de configuración y check deben coincidir. Si su comprobación se llama <code>custom_checkvalue.py</code>, su archivo de configuración <i>debe</i> llamarse <code>custom_checkvalue.yaml</code>.</li>
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

Si tienes problemas para que tu check personalizada funcione, revisa los permisos del archivo. El archivo de check debe ser legible y ejecutable por el usuario del Agent. Para más pasos de solución de problemas, consulta [Solución de problemas de un Agent de check][7].

### Actualización del intervalo de recopilación

Para cambiar el intervalo de recopilación de tu check, usa la opción `min_collection_interval` en tu archivo `custom_checkvalue.yaml` y especifica un ajuste en segundos. El valor predeterminado es de 15 segundos. Debes añadir el `min_collection_interval` al nivel de instancia. Si tu check personalizado está configurado para supervisar varias instancias, debes configurar el intervalo de forma individual para cada instancia.

Configurar `min_collection_interval` en `30` no garantiza que la métrica se recopile cada 30 segundos. El recopilador del Agent intenta ejecutar el check cada 30 segundos, pero este podría quedar en cola detrás de otras integraciones y comprobaciones, dependiendo de cuántas estén activadas en el mismo Agent. Si un método `check` tarda más de 30 segundos en completarse, el Agent detecta que el check sigue en curso y omite su ejecución hasta el siguiente intervalo.

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

Es posible crear un check personalizado que ejecute un programa de línea de comandos y capture su salida como una métrica personalizada. Por ejemplo, un check puede ejecutar el comando `vgs` para informar sobre los grupos de volúmenes.

Dado que el intérprete de Python que ejecuta los check está incrustado en el tiempo de ejecución de Go multihilo, el uso de los módulos `subprocess` o `multithreading` de la biblioteca estándar de Python no es compatible. Para ejecutar un subproceso dentro de un check, usa la función [`get_subprocess_output()`][5] del módulo `datadog_checks.base.utils.subprocess_output`. El comando y sus argumentos se pasan a `get_subprocess_output()` en forma de lista, con el comando y sus argumentos como una cadena dentro de la lista.

Por ejemplo, un comando que se introduce en el símbolo del sistema de la siguiente manera:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

debe pasarse a `get_subprocess_output()` de esta manera:

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

Cuando ejecutas el programa de línea de comandos, el check captura la misma salida que al ejecutarlo en el terminal. Realiza el procesamiento de cadenas en la salida y llama a `int()` o `float()` sobre el resultado para devolver un tipo numérico.

Si no realizas el procesamiento de cadenas en la salida del subproceso, o si no devuelve un número entero o un número flotante, el check parece ejecutarse sin errores, pero no informa de ningún dato ni eventos. El check tampoco devuelve métricas o eventos si el usuario del Agent no tiene los permisos adecuados en ninguno de los archivos o directorios referenciados en el comando, o los permisos necesarios para ejecutar el comando pasado como argumento a `get_subprocess_output()`.

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

Un uso común para escribir un check personalizado del Agent es enviar métricas de Datadog desde un balanceador de carga. Antes de empezar, sigue los pasos en [Configuration (Configuración)](#configuration).

Para ampliar los archivos para enviar datos desde tu balanceador de carga:

1. Sustituye el código en `custom_checkvalue.py` por el código a continuación (reemplazando el valor de `lburl` con la dirección de tu balanceador de carga):
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

1. [Reinicia tu Agent][3]. En un minuto, deberías ver una nueva métrica en el [Resumen de métricas][4] llamada `coreapp.update.value` que envía las métricas desde tu balanceador de carga.
2. [Crea un dashboard][6] para esta métrica.

## Versiones del Agent

Utiliza el siguiente bloque try/except para hacer que el check personalizado sea compatible con cualquier versión del Agent:

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /dashboards/
[7]: /agent/troubleshooting/agent_check_status/