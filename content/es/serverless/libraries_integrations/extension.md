---
aliases:
- /serverless/datadog_lambda_library/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
title: Extensión Datadog Lambda
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licencia](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**Nota:** Este repositorio contiene notas de la versión, problemas, instrucciones y scripts relacionados con la extensión Datadog Lambda. La extensión es una compilación especial del Datadog Agent . El código fuente se puede encontrar [aquí](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless). 

La extensión Datadog Lambda es una AWS Lambda Extension que admite el envío de métricas personalizadas, trazas (traces) y Logs de forma asíncrona mientras se ejecuta tu función AWS Lambda.

## Instalación

Sigue las [instrucciones de instalación](https://docs.datadoghq.com/serverless/installation) y ve las métricas mejoradas, trazas y logs de tu función en Datadog.

## Actualización
Para actualizar, actualiza la versión de la extensión Datadog en tus configuraciones de la Lambda Layer o en el archivo Docker (para las funciones Lambda desplegadas como imágenes del contenedor). Consulta las últimas [versiones](https://github.com/DataDog/datadog-lambda-extension/releases) y los logs de cambio correspondientes antes de actualizar.

## Configuraciones

Sigue las [instrucciones de configuración](https://docs.datadoghq.com/serverless/configuration) para etiquetar tu telemetría, capturar cargas útiles de solicitud/respuesta, filtrar o depurar información sensible de logs o trazas y mucho más.

## Sobrecarga

La extensión Datadog Lambda introduce una pequeña cantidad de sobrecarga en los inicios en frío de tu función Lambda (es decir, la mayor duración de la inicialización), ya que es necesario que la extensión se inicialice. Datadog optimiza continuamente el rendimiento de la extensión Lambda y recomienda utilizar siempre la última versión.

Es posible que adviertas un aumento de la duración notificada de tu función Lambda (`aws.lambda.duration` o `aws.lambda.enhanced.duration`). Esto se debe a que la extensión Datadog Lambda necesita vaciar datos en diferido a la API Datadog. Aunque el tiempo empleado por la extensión en vaciar los datos se indica como parte de la duración, se hace *después* de que AWS devuelva la respuesta de tu función al cliente. En otras palabras, la duración añadida *no ralentiza* tu función Lambda. Para más información técnica, consulta este [AWS blog post](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/). Para monitorizar el rendimiento real de tu función y excluir la duración añadida por la extensión Datadog, utiliza la métrica `aws.lambda.enhanced.runtime_duration` .

Por defecto, la extensión vacía los datos en diferido a Datadog al final de cada invocación (por ejemplo, los inicios en frío siempre activan el vaciado). Esto evita retrasos en la llegada de datos para invocaciones esporádicas de aplicaciones con poco tráfico, trabajos cron y tests manuales. Una vez que la extensión detecta un patrón de invocación constante y frecuente (más de una vez por minuto), agrupa los datos de varias invocaciones y los vacía periódicamente al principio de la invocación cuando corresponde. Esto significa que *cuanto más ocupada esté tu función, menor será la sobrecarga de duración promedio por invocación*. En otras palabras, para aplicaciones con bajo tráfico, la sobrecarga de duración sería perceptible mientras que la sobrecarga de costos asociada es normalmente insignificante; para aplicaciones con alto tráfico, la sobrecarga de duración sería apenas perceptible. Para comprender la sobrecarga de duración que utiliza la extensión Datadog para vaciar los datos, utiliza la métrica `aws.lambda.post_runtime_extensions_duration` o `aws.lambda.enhanced.post_runtime_duration`. 

Para las funciones Lambda desplegadas en una región que está lejos del sitio Datadog, por ejemplo, una función Lambda desplegada en eu-west-1 que reporta datos al sitio US1 Datadog, puede observar una mayor sobrecarga de duración (y por lo tanto, de costos) debido a la latencia de la red. Para reducir la sobrecarga, configura la extensión para vaciar los datos con menos frecuencia, por ejemplo cada minuto `DD_SERVERLESS_FLUSH_STRATEGY=periodically,60000`.

En algunos casos poco frecuentes en los cuales se configura un tiempo de espera muy corto (la definición de lo que es _corto_ depende del tiempo de ejecución), es posible advertir que el código del controlador Lambda no se ejecuta en invocaciones posteriores. Esto es posible cuando se agota el tiempo de ejecución de la primera invocación, lo que requiere que la `INIT` [fase](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html#runtimes-extensions-api-lifecycle) se inicie de nuevo en la siguiente invocación. En la invocación posterior, si el tiempo de espera de la función finaliza antes de que se complete la fase de `INIT`, Lambda termina la función y el código del controlador no se ejecuta. Puedes identificar estos errores utilizando `INIT_REPORT` [logs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle-init-errors). Datadog recomienda aumentar el tiempo de espera para una función Lambda en la cual se haya identificado esto.

## Problemas de apertura

Si encuentras un error en este paquete, queremos saberlo. Antes de abrir una nueva incidencia, busca las incidencias existentes para evitar duplicados.

Cuando abras una incidencia, incluye la versión de la extensión y la traza de stack si está disponible. Además, incluye los pasos para reproducir cuando proceda.

También puedes abrir una incidencia para solicitar una función.

## Colaboración

Si encuentras un problema en este paquete y tienes que repararlo, no dudes en abrir una solicitud de incorporación de cambios siguiendo los [procedimientos](https://github.com/DataDog/datadog-agent/blob/main/docs/public/guidelines/contributing.md).

## Tests

Para probar un cambio en la inicialización serverless de Datadog en Google Cloud Run:

1. Clona este repositorio y [el repositorio del Datadog Agent](https://github.com/DataDog/datadog-agent) en el mismo directorio principal.
2. Ejecuta `VERSION=0 SERVERLESS_INIT=true ./scripts/build_binary_and_layer_dockerized.sh` en este repositorio para compilar la inicialización serverless binaria.
3. Crea una aplicación "Hello World" serverless [como se describe aquí](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/go).
4. Sigue [las instrucciones públicas](https://docs.datadoghq.com/serverless/google_cloud_run) para añadir la inicialización serverless a tu aplicación serverless.
5. Copia el archivo binario que creaste en la misma ubicación que tu archivo Docker:
```
cp datadog-lambda-extension/.layers/datadog_extension-amd64/extensions/datadog-agent ~/hello-world-app/datadog-init
```
6. En tu archivo Docker, sustituye
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
```
con
```
COPY datadog-init /app/datadog-init
```

Despliega tu aplicación serverless y se ejecutará con una versión de la inicialización serverless que incluye tus cambios en el código.

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

## Licencia

A menos que se indique explícitamente lo contrario, todos los archivos de este repositorio tienen licencia de Apache Versión 2.0.

Este producto incluye un software desarrollado en Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.