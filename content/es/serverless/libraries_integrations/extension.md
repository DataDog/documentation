---
aliases:
- /es/serverless/datadog_lambda_library/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
title: Extensión Datadog Lambda
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licencia](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**Nota:** Este repositorio contiene notas de la versión, problemas, instrucciones y scripts relacionados con la extensión de Datadog Lambda. La extensión es una compilación especial del Datadog Agent . El código fuente se puede encontrar [aquí](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless). 

La extensión Datadog Lambda es una AWS Lambda Extension que admite el envío de métricas personalizadas, trazas (traces) y Logs de forma asíncrona mientras se ejecuta tu función AWS Lambda.

## Instalación

Sigue las [instrucciones de instalación](https://docs.datadoghq.com/serverless/installation) y ve las métricas mejoradas, trazas y logs de tu función en Datadog.

## Extensión Lambda de nueva generación

Nos complace anunciar que ya está disponible nuestra extensión Lambda de nueva generación y bajo consumo de recursos. Esta nueva extensión está empaquetada junto con nuestra extensión existente, pero ofrece arranques en frío sustancialmente más rápidos, así como un menor consumo de recursos.

Puedes excluirte de la extensión Lambda de nueva generación estableciendo la variable de entorno `DD_EXTENSION_VERSION: compatibility` y utilizando la versión de la extensión `v67` o posterior.

### Configuraciones admitidas

En la actualidad, todas las cargas de trabajo que utilizan logs y métricas son compatibles.

APM Tracing es compatible con los tiempos de ejecución Python, NodeJS, Go, Java y .NET.
ASM aún no es compatible, y volverá al modo de compatibilidad.

### Comentarios

Nos encantaría conocer tu opinión sobre la extensión Lambda de nueva generación. Puedes abrir una incidente en GitHub con la etiqueta `version/next`, encontrarnos en [Datadog Community Slack](https://chat.datadoghq.com/) en el canal #serverless, o ponerte en contacto conmigo directamente en aj@datadoghq.com.

## Actualización

Para actualizar, actualiza la versión de la extensión Datadog en tus configuraciones de la Lambda Layer o en el archivo Docker (para las funciones Lambda desplegadas como imágenes del contenedor). Consulta las últimas [versiones](https://github.com/DataDog/datadog-lambda-extension/releases) y los logs de cambio correspondientes antes de actualizar.

## Configuraciones

Sigue las [instrucciones de configuración](https://docs.datadoghq.com/serverless/configuration) para etiquetar tu telemetría, capturar cargas útiles de solicitud/respuesta, filtrar o depurar información sensible de logs o trazas y mucho más.

## Sobrecarga

La extensión Lambda de Datadog introduce una pequeña cantidad de sobrecarga en los arranques en frío de tu función de Lambda (es decir, la mayor duración de init), ya que la extensión necesita inicializarse. Datadog está optimizando continuamente el rendimiento de la extensión Lambda y recomienda utilizar siempre la última versión.

Es posible que observes un aumento de la duración informada de tu función de Lambda (`aws.lambda.duration` o `aws.lambda.enhanced.duration`). Esto se debe a que la extensión Lambda de Datadog necesita enviar datos a la API de Datadog. Aunque el tiempo empleado por la extensión en la descarga de datos se indica como parte de la duración, se realiza _después_ de que AWS devuelva la respuesta de la función al cliente. En otras palabras, la duración añadida _no ralentiza_ tu función de Lambda. Para obtener más información técnica, consulta esta [entrada de blog de AWS](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/). Para monitorizar el rendimiento real de tu función y excluir la duración añadida por la extensión Datadog, utiliza la métrica `aws.lambda.enhanced.runtime_duration`.

Por defecto, la extensión envía los datos a Datadog al final de cada invocación (por ejemplo, los arranques en frío siempre activan el envío). Esto evita retrasos en la llegada de datos para invocaciones esporádicas de aplicaciones con poco tráfico, trabajos cron y tests manuales. Una vez que la extensión detecta un patrón de invocación constante y frecuente (más de una vez por minuto), agrupa los datos de varias invocaciones y los descarga periódicamente al principio de la invocación cuando corresponde. Esto significa que _cuanto más ocupada esté tu función, menor será la sobrecarga de duración media por invocación_. En otras palabras, para aplicaciones con poco tráfico, la sobrecarga de duración sería notable mientras que la sobrecarga de coste asociada es normalmente insignificante; para aplicaciones con mucho tráfico, la sobrecarga de duración sería apenas perceptible. Para comprender la sobrecarga de duración que utiliza la extensión de Datadog para vaciar los datos, utiliza la métrica `aws.lambda.post_runtime_extensions_duration` o `aws.lambda.enhanced.post_runtime_duration`.

En el caso de las funciones de Lambda desplegadas en una región alejada del sitio de Datadog, por ejemplo, una función de Lambda desplegada en eu-west-1 que envíe datos al sitio US1 de Datadog, puedes observar una sobrecarga de duración (y, por tanto, de coste) mayor debido a la latencia de la red. Para reducir la sobrecarga, configura la extensión para vaciar los datos con menos frecuencia, por ejemplo cada minuto, estableciendo la variable de entorno `DD_SERVERLESS_FLUSH_STRATEGY=periodically,60000` en tu función de Lambda. Para más información, consulta https://docs.datadoghq.com/serverless/guide/agent_configuration/#basic-configuration.

En algunos casos poco frecuentes en los cuales se configura un tiempo de espera muy corto (la definición de lo que es _corto_ depende del tiempo de ejecución), es posible advertir que el código del controlador Lambda no se ejecuta en invocaciones posteriores. Esto es posible cuando se agota el tiempo de ejecución de la primera invocación, lo que requiere que la `INIT` [fase](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html#runtimes-extensions-api-lifecycle) se inicie de nuevo en la siguiente invocación. En la invocación posterior, si el tiempo de espera de la función finaliza antes de que se complete la fase de `INIT`, Lambda termina la función y el código del controlador no se ejecuta. Puedes identificar estos errores utilizando `INIT_REPORT` [logs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle-init-errors). Datadog recomienda aumentar el tiempo de espera para una función Lambda en la cual se haya identificado esto.

## Problemas de apertura

Si encuentras un error en este paquete, queremos saberlo. Antes de abrir un nuevo problema, busca los problemas existentes para evitar duplicados.

Cuando abras una incidencia, incluye la versión de la extensión y la traza de stack si está disponible. Además, incluye los pasos para reproducir cuando proceda.

También puedes abrir un problema para solicitar una función.

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

A menos que se indique explícitamente lo contrario, todos los archivos de este repositorio tienen Licencia de Apache Versión 2.0.

Este producto incluye el software desarrollado en Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.