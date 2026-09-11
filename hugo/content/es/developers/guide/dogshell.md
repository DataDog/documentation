---
aliases:
- /es/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /es/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Utiliza la API de Datadog desde el terminal o el shell
title: Dogshell
---

Puedes utilizar la API de Datadog en la línea de comandos utilizando una envoltura llamada Dogshell.

## Instalar Dogshell

Dogshell viene con la [biblioteca de Python `datadogpy`][1] admitida oficialmente, que a menudo se utiliza para enviar datos a Datadog con [`DogStatsD`][2]. Para instalar la librería con PIP, ejecuta el siguiente comando:

{{< code-block lang="shell" >}}
pip install Datadog
{{< /code-block >}}

En función de tu entorno, puede que tengas que añadir la librería a tu RUTA. Consulta el [repositorio de GitHub`datadogpy`][3] para obtener instrucciones de instalación alternativas.

## Configurar Dogshell

Dogshell utiliza un archivo de configuración llamado `.dogrc` para almacenar tu clave de la API, tu clave de la aplicación y tu sitio de Datadog.

Para configurar Dogshell:
1. Crea un archivo `.dogrc` en tu directorio personal:
   {{< code-block lang="shell" >}}
toca ~/.dogrc
{{< /code-block >}}

1. Añade el siguiente contenido al archivo, sustituyendo `MY_API_KEY` y `MY_APP_KEY` con tu clave de la API y tu clave de la aplicación, respectivamente:
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">Puedes crear varios archivos de configuración si necesitas ejecutar comandos en diferentes entornos. Utiliza la marca <code>--configuración</code> para especificar la ruta a un archivo de configuración alternativo.</div>

1. Prueba el comando `dogshell` publicando una métrica de test:
   {{< code-block lang="shell" >}}
test_metric 1 de publicación de métricas de dog
{{< /code-block >}}

## Comandos de Dogshell

Utiliza la marca `-h` para obtener una lista completa de los comandos de Dogshell disponibles:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

Puedes añadir la opción `-h` a los siguientes comandos para obtener más información sobre el uso específico de Dogshell:

* `dog metric`
* `dog event`
* `dog service_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

Para obtener más información, consulta el [código de Dogshell][4].

### Ejemplo de Dogshell

La siguiente sintaxis publica una métrica en tu cuenta de Datadog:

{{< code-block lang="shell" disable_copy="true">}}
publicación de métrica de dog MY_METRIC_NAME METRIC_VALUE --etiquetas (tags) "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

Por ejemplo, el siguiente comando envía una métrica llamada `test_dogshell_metric` a tu cuenta con un valor de `1.0` y las etiquetas (tags) `test:one` y `example:one`:

{{< code-block lang="shell" >}}
publicación de métrica de dog test_dogshell_metric 1.0 --etiquetas (tags) "test:one,example:one"
{{< /code-block >}}

Después de ejecutar el comando, busca`test_dogshell_metric` utilizando el [Explorador de métricas][5].

{{< img src="developers/guide/dogshell_test1.png" alt="Observar test_dogshell_metric desde el explorador de métricas" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer
