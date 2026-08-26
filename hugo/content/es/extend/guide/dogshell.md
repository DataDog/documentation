---
aliases:
- /es/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /es/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /es/developers/guide/dogshell/
description: Utiliza la API de Datadog desde la Terminal o Shell
title: Dogshell
---
<div class="alert alert-danger">Dogshell está obsoleto y ha sido reemplazado por <a href="/cli/">Pup CLI</a>, una CLI integral lista para agentes de IA para interactuar con las APIs de Datadog.</div>

Puede usar la API de Datadog en la línea de comandos utilizando un envoltorio llamado Dogshell.

## Instale Dogshell {#install-dogshell}

Dogshell viene con la [`datadogpy` biblioteca de Python][1] oficialmente soportada, que a menudo se utiliza para enviar datos a Datadog con [`DogStatsD`][2]. Para instalar la biblioteca con PIP, ejecute el siguiente comando:

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

Dependiendo de su entorno, es posible que tenga que agregar la biblioteca a su PATH. Consulte el [`datadogpy` repositorio de GitHub][3] para instrucciones de instalación alternativas.

## Configure Dogshell {#configure-dogshell}

Dogshell utiliza un archivo de configuración llamado `.dogrc` para almacenar su clave de API, clave de aplicación y sitio de Datadog.

Para configurar Dogshell:
1. Cree un `.dogrc` archivo en su directorio personal:
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. Agregue el siguiente contenido al archivo, reemplazando `MY_API_KEY` y `MY_APP_KEY` con su clave de API y clave de aplicación respectivamente:
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">You can create multiple configuration files if you need to run commands against different environments. Use the <code>--config</code> flag to specify the path to an alternative configuration file.</div>

1. Test the `dogshell` command by posting a test metric:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell commands 

Use the `-h` flag for a full list of the available Dogshell commands:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

You can append the `-h` option to the following commands to get more information on specific Dogshell usage:

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

For additional information, see the [Dogshell code][4].

### Dogshell example 

The following syntax posts a metric to your Datadog account:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of `1.0` and the tags `test:one` and `example:one`:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

After you run the command, search for `test_dogshell_metric` using the [Metrics Explorer][5].

{{< img src="extend/guide/dogshell_test1.png" alt="Observando test_dogshell_metric desde el Metrics Explorer" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer