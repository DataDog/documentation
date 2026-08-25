---
title: Instrumentación de aplicaciones serverless de Java mediante el Datadog Forwarder
---
## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/java">instrucciones para instrumentar tus funciones de Lambda mediante la Datadog Lambda Extension</a>. Si configuraste Datadog Serverless con el Datadog Forwarder antes de que Lambda ofreciera la funcionalidad lista para usar, utiliza esta guía para mantener tu instancia.
</div>

<div class="alert alert-warning">
Algunas versiones más antiguas de <code>datadog-lambda-java</code> importan <code>log4j <=2.14.0</code> como una dependencia de transición. A continuación se incluyen las <a href="#upgrading">instrucciones de actualización</a>.
</div>

## Requisitos previos

Se necesita la [función de Lambda del Datadog Forwarder][2] para ingerir las trazas (traces), las métricas mejoradas, las métricas personalizadas y los logs de AWS Lambda.

Para completar la instrumentación de tu aplicación serverless con el rastreo distribuido, debes tener tus funciones de Lambda de Java con los tiempos de ejecución Java 8 Corretto (`java8.al2`), Java 11 (`java11`) o Java 17 (`java17`).

## Configuración

### Instalar

Instala la librería Lambda de Datadog localmente mediante la adición de uno de los siguientes bloques de código en el archivo `pom.xml` (Maven) o `build.gradle` (Gradle). Reemplaza el parámetro `VERSION` de abajo con la última versión (sin anteponer la `v`): ![Maven Cental][4]
{{< tabs >}}
{{% tab "Maven" %}}

Incluye la siguiente dependencia en tu archivo `pom.xml`:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Incluye lo siguiente en tu archivo `build.gradle`:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentar


1. Instala la capa de Lambda de Datadog en tu función. La última `VERSION` es `{{< latest-lambda-layer-version layer="dd-trace-java" >}}`.

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. Configura las siguientes variables de entorno en tu función:

    ```yaml
    JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
    DD_LOGS_INJECTION: true
    DD_JMXFETCH_ENABLED: false
    DD_TRACE_ENABLED: true
    ```

3. Envuelve tu función de controlador de Lambda con la envoltura de la librería Lambda de Datadog.

    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda ddl = new DDLambda(request, context); //Required to initialize the trace

            do_some_stuff();
            make_some_http_requests();

            ddl.finish(); //Required to finish the active span.
            return new ApiGatewayResponse();
        }
    }
    ```

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función. Esto te permite enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][2].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][5].

### Monitorizar los arranques en frío de las funciones de Lambda de Java

Los arranques en frío se producen cuando las aplicaciones serverless reciben aumentos repentinos de tráfico, y pueden ocurrir si una función estaba previamente inactiva o si recibía un número relativamente constante de solicitudes. Los usuarios pueden notar los arranques en frío como tiempos de respuesta lentos o latencia. Datadog recomienda configurar un monitor de arranques en frío en las funciones de Lambda de Java y utilizar Datadog Serverless Insights para [mantener los arranques en frío al mínimo][6].

{{< img src="serverless/java-monitor-cold-starts.png" alt="Monitorizar los arranques en frío de las funciones de Lambda de Java" style="width:100%;">}}

Para crear un monitor de Datadog de arranques en frío en las funciones de Lambda de Java, sigue los [pasos para crear un monitor][7] con estos criterios:
- Nombre de la métrica: `aws.lambda.enhanced.invocations`
- Origen: `runtime:java*` y `cold_start:true`
- Agrupación de alertas: múltiples alertas, activa una alerta distinta para cada `function_arn`

### Etiquetar

Aunque es opcional, Datadog recomienda etiquetar las aplicaciones serverless con las etiquetas reservadas `env`, `service` y `version`. Para obtener más información sobre las etiquetas reservadas, consulta la [documentación del etiquetado de servicios unificado][8].

## Explorar

Una vez que tienes tu función configurada según los pasos anteriores, puedes consultar tus métricas, logs y trazas en la [página de inicio de Serverless][9].

### Monitorizar la lógica de negocio personalizada

Para enviar una métrica personalizada, consulta el siguiente código de ejemplo:

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,Object> myTags = new HashMap<String, Object>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // Envía una métrica personalizada
        ddl.metric(
            "coffee_house.order_value", // Nombre de la métrica
            12.45,                      // Valor de la métrica
            myTags);                    // Etiquetas asociadas

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();
        hc.connect();

        ddl.finish();
    }
}
```

Consulta la [documentación sobre las métricas personalizadas][10] para obtener más información sobre el envío de métricas personalizadas.

### Conectar logs y trazas

Para conectar automáticamente logs y trazas de las funciones de Lambda de Java, consulta las instrucciones en [Conexión de logs y trazas de Java][11].

<div class="alert alert-info"> Si no se usa el tiempo de ejecución de Java correcto, se pueden producir errores. Por ejemplo: <code>Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar</code>. Asegúrate de usar <code>java8.al2</code> o <code>java11</code> como el tiempo de ejecución, tal como se escribe arriba. </div>

## Actualización

La Apache Foundation ha anunciado que log4j, una biblioteca popular para la generación de logs en Java, es [vulnerable a la ejecución de código remoto][12].
Algunas versiones de `datadog-lambda-java` incluyen una dependencia de transición en log4j que puede ser vulnerable. Las versiones vulnerables son las siguientes:

-  `<=0.3.3`
-  `1.4.0`

La última versión de `datadog-lambda-java` es ![Maven Cental][4]. Usa esta versión (sin anteponer la `v`) cuando sigas las instrucciones de actualización que se incluyen abajo.

Si no quieres actualizar a las versiones de `1.4.x`, las versiones de `0.3.x` también se actualizan con los parches de seguridad más recientes de log4j.
La última versión de `0.3.x` está disponible en el [repositorio `datadog-lambda-java`][13].

La versión de la dependencia de `datadog-lambda-java` en tu función de Lambda está configurada en el archivo `pom.xml` (Maven) o `build.gradle` (Gradle).

{{< tabs >}}
{{% tab "Maven" %}}

Tu archivo `pom.xml` contiene una sección similar a la siguiente:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

Reemplaza `VERSION` con la última versión de `datadog-lambda-java` (disponible más arriba).
Luego, vuelve a desplegar tu función de Lambda.

{{% /tab %}}

{{% tab "Gradle" %}}

Tu archivo `build.gradle` contiene una sección similar a la siguiente:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

Reemplaza `VERSION` con la última versión de `datadog-lambda-java` (disponible más arriba).
Luego, vuelve a desplegar tu función de Lambda.

{{% /tab %}}
{{< /tabs>}}

Si vas a actualizar de 0.3.x a 1.4.x y quieres utilizar el rastreador `dd-trace-java`, busca la referencia a la capa de Lambda `dd-trace-java` y cámbiala por lo siguiente:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:4
```


[2]: /es/serverless/forwarder/
[3]: /es/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /es/serverless/insights#cold-starts
[7]: /es/monitors/types/metric/?tab=threshold#overview
[8]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /es/serverless/custom_metrics?tab=java
[11]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases
