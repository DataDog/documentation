---
algolia:
  tags:
  - advanced log filter
description: (Legacy) Utiliza el Datadog Agent para detectar y agregar automáticamente
  logs multilínea
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentación
  text: Empezando con Logging without LimitsTM
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentación
  text: Utiliza el Datadog Agent solo para la recopilación de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre el análisis
- link: /logs/live_tail/
  tag: Documentación
  text: La funcionalidad Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
title: (Legacy) Detección y agregación automática multilínea
---

<div class="alert alert-danger">Este documento se aplica a las versiones del Agent anteriores a la <strong>v7.65.0</strong>, o cuando la detección automática multilínea legacy está explícitamente activada. Para versiones más recientes del Agent, consulta <a href="/agent/logs/auto_multiline_detection">Detección y agregación automática multilínea</a>.</div>

## Agregación automática global multilínea
Con el Agent 7.37+, puedes habilitar `auto_multi_line_detection` para que detecte automáticamente [patrones multilínea comunes][1] en **todas** las integraciones de log configuradas.

{{< tabs >}}
{{% tab "Configuration file" %}}
Activa `auto_multi_line_detection` globalmente en el archivo `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
Utiliza la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION` en el contenedor del Datadog Agent para configurar una regla global de agregación automática multilínea. Por ejemplo:

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
#### Operación
Utiliza el parámetro `spec.override.nodeAgent.env` en tu manifiesto del Datadog Operator para establecer la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION` para configurar una regla global de agregación automática multilínea. Por ejemplo:

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION
          value: "true"
```

#### Helm
Utiliza la opción `Datadog.log.autoMultiLineDetection` en el Helm chart para configurar una regla global de agregación automática multilínea. Por ejemplo:

```yaml
datadog:
  logs:
    enabled: true
    autoMultiLineDetection: true
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"> En las versiones del Agent 7.65+, puedes elegir el comportamiento legacy al configurar en  <strong>true</strong> lo siguiente:<br> <strong>- logs_config.force_auto_multi_line_detection_v1</strong> en tu archivo datadog.yaml <br>O <br> <strong>- LOGS_CONFIG_FORCE_AUTO_MULTI_LINE_DETECTION_V1</strong> en tu variable de entorno.</div>

## Activar la agregación multilínea por integración
Alternativamente, puedes activar o desactivar la agregación multilínea para la recopilación de logs de una integración individual. Al cambiar la agregación multilínea para una integración se anula la configuración global.

{{< tabs >}}
{{% tab "Configuration file" %}}
En un entorno de host, habilita `auto_multi_line_detection` con el método [Recopilación de logs personalizada][2]. Por ejemplo:

[2]: https://docs.datadoghq.com/es/agent/logs/?tab=tailfiles#custom-log-collection

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.log` en tu contenedor para especificar la configuración del log. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
En un entorno de Kubernetes, utiliza la anotación `ad.datadoghq.com/<CONTAINER_NAME>.log` en tu pod para especificar la configuración del log. Por ejemplo:

```yaml
apiVersion: apps/v1
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: testApp:latest
```
{{% /tab %}}
{{< /tabs >}}

## Personalizar la configuración de la agregación multilínea

La detección automática multilínea utiliza una lista de [expresiones regulares comunes][1] para coincidir con los logs. Si la lista incorporada no es suficiente, también puedes añadir patrones y umbrales personalizados para la detección.

### Patrones personalizados
{{< tabs >}}
{{% tab "Configuration file" %}}
En un archivo de configuración, añade `auto_multi_line_extra_patterns` a tu `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

### Umbral personalizado
El parámetro `auto_multi_line_default_match_threshold` determina hasta qué punto los logs deben coincidir con los patrones para que funcione la agregación multilínea automática.

Si tus logs multilínea no se agregan como se espera, puedes cambiar la sensibilidad de la coincidencia configurando el parámetro `auto_multi_line_default_match_threshold`. Añade el parámetro `auto_multi_line_default_match_threshold` a tu archivo de configuración con un valor inferior (para aumentar las coincidencias) o superior (para reducirlas) al valor del umbral actual. 

Reinicia el Datadog Agent para aplicar el nuevo valor de umbral a los logs recién ingeridos. Para conocer el valor de umbral actual, ejecuta el [comando `status` del Agent][3].

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
  auto_multi_line_default_match_threshold: 0.1
```
[3]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-information

{{% /tab %}}

{{% tab "Docker" %}}
En un Agent en contenedores, añade la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`:

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Nota**: El Datadog Agent interpreta los espacios en la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` como separadores entre varios patrones. En el siguiente ejemplo, los dos patrones de expresión regular están divididos por un espacio, y `\s` en el segundo patrón de expresión regular coincide con espacios.

### Umbral personalizado
El parámetro `auto_multi_line_default_match_threshold` determina el grado de coincidencia de los logs con los patrones para que funcione la agregación multilínea automática.

Si tus logs multilínea no se agregan como se espera, puedes cambiar la sensibilidad de la coincidencia configurando el parámetro `auto_multi_line_default_match_threshold`.

Añade el parámetro `auto_multi_line_default_match_threshold` a tu archivo de configuración con un valor inferior (para aumentar las coincidencias) o superior (para disminuirlas) al valor del umbral actual.

Para conocer el valor umbral actual, ejecuta el [comando `status` del Agent][4].

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD=0.1
```
[4]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-information]

{{% /tab %}}

{{% tab "Kubernetes" %}}
En Kubernetes, añade la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`:

#### Operación
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```

#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Nota**: El Datadog Agent interpreta los espacios en la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` como separadores entre varios patrones. En el siguiente ejemplo, los dos patrones de expresión regular están divididos por un espacio, y `\s` en el segundo patrón de expresión regular coincide con espacios.

### Umbral personalizado
El parámetro `auto_multi_line_default_match_threshold` determina el grado de coincidencia de los logs con los patrones para que funcione la agregación multilínea automática.

Si tus logs multilínea no se agregan como se espera, puedes cambiar la sensibilidad de la coincidencia configurando el parámetro `auto_multi_line_default_match_threshold`. Añade el parámetro `auto_multi_line_default_match_threshold` a tu archivo de configuración con un valor inferior (para aumentar las coincidencias) o superior (para reducirlas) al valor del umbral actual. Para conocer el valor de umbral actual, ejecuta el [comando `status` del Agent][1].

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-information

#### Operación
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
          value: "0.1"
```
#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
      value: "0.1"
```

{{% /tab %}}
{{< /tabs >}}

## Proceso de detección
La detección automática multilínea detecta los logs que comienzan y cumplen los siguientes formatos de fecha/hora:
- ANSIC
- RFC822
- RFC822Z
- RFC850
- RFC1123
- RFC1123Z
- RFC3339
- RFC3339Nano
- Formato de fecha Ruby
- Formato de fecha Unix
- Formato de fecha SimpleFormatter de logs Java por defecto

Con la agregación multilínea activada, el Agent intenta primero detectar un patrón en cada nuevo archivo de log. Este proceso de detección dura como máximo 30 segundos o los primeros 500 logs, lo que ocurra primero. Durante el proceso de detección inicial, los logs se envían como líneas individuales.

Una vez alcanzado el umbral de detección, todos los logs futuros de esa fuente se agregan con el patrón que mejor coincida, o como líneas únicas si no se encuentra ningún patrón.

**Nota**: Si puedes controlar el patrón de nombres del log rotado, asegúrate de que el archivo rotado sustituya al archivo activo anteriormente con ese mismo nombre. El Agent reutiliza un patrón detectado anteriormente en el archivo recién rotado para evitar tener que volver a ejecutar la detección.



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187