---
aliases:
- /es/agent/autodiscovery/ad_identifiers
- /es/agent/guide/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
kind: documentation
title: Identificadores de contenedor de Autodiscovery
---

Los identificadores de contenedores Autodiscovery, o `ad_identifiers`, te permiten aplicar una plantilla de archivo de configuración Autodiscovery a un determinado contenedor, ya sea utilizando el nombre de imagen del contenedor o un identificador de contenedor Autodiscovery personalizado.

Incluso si la configuración de Autodiscovery está definida dentro de un archivo de configuración personalizado, puedes utilizar las etiquetas (labels) estándar para etiquetar `env` , `service` y `version`. Consulta [Etiquetado unificado de servicios][1] para obtener más información sobre cómo configurar estas etiquetas en tus contenedores.

**Nota**: Otros tipos de configuraciones, incluidas las bases de datos clave-valor, las etiquetas (labels) de Docker o las anotaciones en pods de Kubernetes utilizan un método diferente para hacer coincidir las plantillas de configuración de integraciones con sus contenedores correspondientes. Para estos tipos de configuraciones, la correspondencia entre una plantilla de configuración de integraciones y el contenedor se basa en el `<CONTAINER_IDENTIFIER>` incluido en las bases de datos clave-valor, en las etiquetas o en las anotaciones.

## Nombre de la imagen del contenedor

Para aplicar la siguiente plantilla de configuración de Autodiscovery a un determinado contenedor, utiliza el nombre corto de la imagen del contenedor como `<INTEGRATION_Autodiscovery_IDENTIFIER>`:

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**Ejemplo**: la siguiente plantilla de configuración de Autodiscovery en Apache se aplica a una imagen de contenedor llamada `httpd`:

```yaml
ad_identifiers:
  - httpd
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

Esto coincide con **cualquier** imagen de contenedor `httpd` en tu host. Si tienes un contenedor que ejecuta `foo/httpd:latest` y otro que ejecuta `bar/httpd:v2`, el Agent aplica la plantilla anterior a ambos contenedores.

Cuando se utilizan nombres cortos de imágenes como identificadores de contenedores de Autodiscovery, el Agent no puede distinguir entre imágenes con nombres idénticos procedentes de distintas fuentes o con diferentes etiquetas (tags).

### Múltiples identificadores

Define múltiples nombres de imágenes añadiéndolos a la lista de `ad_identifiers`, por ejemplo:

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

Esto coincide con **cualquier** imagen de contenedor en tu host que coincida con `httpd` **o** `my-custom-httpd-image`.

## Identificadores de contenedores de Autodiscovery personalizados

Para aplicar diferentes plantillas de configuración de Autodiscovery a contenedores que ejecutan la misma imagen, elige un valor personalizado para proporcionar como `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`. Luego, aplica una etiqueta (label) de Docker o una anotación de Kubernetes a tu contenedor que contenga este valor personalizado.

**Ejemplo**: la siguiente plantilla de configuración de Autodiscovery en Apache designa una imagen de contenedor con el nombre personalizado `foo`:

```yaml
ad_identifiers:
  - foo
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

Luego, aplica una etiqueta (label) de Docker o una anotación de Kubernetes para identificar tu contenedor como `foo`:

{{< tabs >}}
{{% tab "Docker label" (Etiqueta (label) de Docker) %}}

```yaml
LABEL com.datadoghq.ad.check.id="foo"
```

**Nota**: La etiqueta (label) `com.datadoghq.ad.check.id` tiene prioridad sobre el nombre de la imagen.

{{% /tab %}}
{{% tab "Kubernetes annotation" (Anotación de Kubernetes) %}}

```text
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

Sustituye el `<CONTAINER_IDENTIFIER>` por el nombre del contenedor dentro del pod.

**Nota**: Compatible con el Datadog Agent v6.25 o posteriores y v7.25. La etiqueta (label)`ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` tiene prioridad sobre el nombre de la imagen.
{{% /tab %}}
{{< /tabs >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging