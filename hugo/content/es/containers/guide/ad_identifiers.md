---
aliases:
- /es/agent/autodiscovery/ad_identifiers
- /es/agent/guide/ad_identifiers
further_reading:
- link: /contenedores/Kubernetes/integraciones/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Kubernetes
- link: /contenedores/Docker/integraciones/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Docker
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
title: Identificadores de contenedor de Autodiscovery
---

Este documento explica cómo aplicar una plantilla de configuración de [Autodiscovery][1] a un contenedor específico. El parámetro `ad_identifiers` puede coincidir con un nombre de imagen del contenedor o con un identificador personalizado.

## Nombre de la imagen del contenedor

Para aplicar la siguiente plantilla de configuración de Autodiscovery a un determinado contenedor, sustituye `<AUTODISCOVERY_IDENTIFIER>` por el nombre [corto][2] de la imagen de contenedor:

```yaml
ad_identifiers:
  <AUTODISCOVERY_IDENTIFIER>

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

Si deseas aplicar diferentes plantillas de configuración a contenedores que ejecutan la misma imagen, utiliza identificadores personalizados de contenedor.

1. Proporciona un identificador personalizado de contenedor a tu contenedor utilizando una etiqueta de Docker o una anotación de Kubernetes.

   **Ejemplo**: 
   Aplica una etiqueta de Docker o una anotación de Kubernetes para identificar tu contenedor como `foo`:

   {{< tabs >}}
   {{% tab "Etiqueta de Docker" %}}

   ```yaml
   LABEL com.datadoghq.ad.check.id="foo"
   ```

   **Nota**: La etiqueta `com.datadoghq.ad.check.id` tiene prioridad sobre el nombre de la imagen.

   {{% /tab %}}
   {{% tab "Anotación de Kubernetes" %}}

   ```text
   ad.datadoghq.com/<CONTAINER_NAME>.check.id: 'foo'
   ```

   Sustituye `<CONTAINER_NAME>` por el nombre de contenedor dentro del pod.

   **Nota**: Compatible con Datadog Agent v6.25+ y v7.25. La etiqueta `ad.datadoghq.com/<CONTAINER_NAME>.check.id` tiene prioridad sobre el nombre de la imagen.
   {{% /tab %}}
   {{< /tabs >}}

2. Haz referencia a este valor personalizado en tu plantilla de configuración de Autodiscovery.

   **Ejemplo**: 
   La siguiente plantilla de configuración de Apache Autodiscovery designa una imagen de contenedor con el nombre personalizado `foo`:

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/autodiscovery
[2]: /es/glossary/#short-image