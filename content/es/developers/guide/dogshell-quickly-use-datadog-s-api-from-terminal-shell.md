---
aliases:
- /es/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Utiliza la API de Datadog desde el terminal o el shell
kind: guía
title: Dogshell
---

Puedes utilizar la API de Datadog directamente desde el terminal/shell mediante una función contenedora llamada `dogshell`.

## Configuración:

Dogshell viene con el soporte oficial de la [biblioteca de datadogpy Python][1], a menudo usado para enviar datos a Datadog con [DogStatsD][2]. Consulta el [repositorio de datadogpy GitHub][3] para obtener instrucciones de instalación.

Una vez que tengas esa biblioteca instalada, tienes el comando `dog` disponible en tu terminal/shell, pero aún debe ser "inicializado". Para inicializarlo, proporciónale una API y una clave de aplicación para que pueda ser utilizado para enviar y recibir datos desde y hacia tu cuenta. La primera vez que intentes ejecutar un comando `dog`, reconocerá que debe ser inicializado y te guiará a través del proceso de 2 pasos.

Como ejemplo de un comando `dog` que activaría la configuración de inicialización (aunque cualquier comando dog anterior funcionaría), puedes ejecutar lo siguiente:

```text
dog metric post test_metric 1
```

Si tu archivo `.dogrc` aún no se ha creado (es decir, el dogshell aún no se ha inicializado), devuelve algo como lo siguiente:

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

Envía "Y". Entonces responde:

```text
What is your api key? (Get it here: https://app.datadoghq.com/organization-settings/api-keys)
```

Puede pegar tu clave de API, y luego:

```text
What is your application key? (Generate one here: https://app.datadoghq.com/organization-settings/api-keys)
```

Puedes pegar la clave de tu aplicación. Termina con:

```text
Wrote ~/.dogrc.
```

A continuación, utiliza tus comandos `dog` para utilizar rápidamente la API de Datadog desde tu terminal/shell. Para obtener más ayuda e información sobre los comandos `dog`, ejecuta `dog -h`.

Si prefieres escribir tú mismo el archivo `.dogrc`, el contenido de este archivo debe ser el siguiente:

{{< site-region region="us" >}}
```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us3.datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us5.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.eu
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ddog-gov.com
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ap1.datadoghq.com
```
{{< /site-region >}}

Esto es útil si deseas enviar el archivo a muchos de sus servidores mediante programación, de modo que puedas ejecutar comandos de `dog` desde cualquiera de tus servidores.

## Comandos Dogshell

Como referencia, [encuentra el código para Dogshell][4]. Pero una vez que tengas Dogshell instalado e inicializado, puedes añadir la opción `-h` a los siguientes comandos para obtener más información sobre el uso específico de Dogshell:

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

**Nota**: El comando `dogshell` envía datos a Datadog US1 por defecto. Si necesitas enviar datos a otro sitio, puedes hacerlo utilizando el archivo `--api_host` option or by specificying an api_host in your `.dogrc`.

### Dogshell en uso

Puedes publicar métricas en tu cuenta de Datadog utilizando:

```text
dog metric post <METRIC_NAME> <METRIC_VALUE> --tags "<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_KEY_2>:<TAG_VALUE_2>"
```

Por ejemplo, el siguiente comando envía una métrica llamada `test_dogshell_metric` a tu cuenta con un valor de 1,0 y las etiquetas `test:one` y `another_test`:

```text
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Encuentra más detalles sobre el envío de métricas desde Dogshell al ejecutar:

```text
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell