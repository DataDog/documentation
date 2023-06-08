---
aliases:
- /es/agent/autodiscovery/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
kind: documentación
title: Identificadores de contenedor de Autodiscovery
---

Los identificadores de contenedor de Autodiscovery, o `ad_identifiers`, te permiten implementar la plantilla de un archivo de configuración de Autodiscovery en un contenedor determinado, ya sea con el [nombre corto de la imagen del contenedor](#short-image-container-identifiers) o con un [identificador de contenedor personalizado de Autodiscovery](#custom-autodiscovery-container-identifiers).

**Nota**: En lo que se refiere a otros tipos de configuración, como los almacenes de valores clave, las etiquetas de Docker o las anotaciones de pod de Kubernetes, la asociación de una plantilla de configuración de integración con su correspondiente contenedor se basa en el parámetro `<CONTAINER_IDENTIFIER>`. Este está presente en la configuración de los almacenes de valores clave, las etiquetas o las anotaciones.

## Identificadores de contenedor en nombres cortos de imágenes

Para implementar la siguiente plantilla de configuración de Autodiscovery en un contenedor determinado, usa el nombre **corto de la imagen del contenedor** en `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`:

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

Por ejemplo, el Agent puede utilizar la siguiente plantilla de configuración de Autodiscovery para Apache:

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

Esto sirve para **CUALQUIER** imagen de contenedor de tipo `httpd` que haya en tu host. Supongamos que tienes un contenedor activo en `library/httpd:latest` y otro, en `<WHATEVER>/httpd:v2`. En ese caso, el Agent implementará la plantilla anterior en ambos contenedores, dado que tienes que usar nombres cortos en las imágenes de los contenedores. Ejemplo: `httpd` en vez de `library/httpd:latest`.

Cuando se utilizan nombres cortos de imágenes como identificadores de contenedor de Autodiscovery, **el Agent es incapaz de distinguir las imágenes que tienen el mismo nombre, incluso si son de fuentes diferentes o tienen tags diferentes**.

## Añadir tags a partir de etiquetas estándar

Aunque la configuración de Autodiscovery se defina en un archivo de configuración personalizado, se pueden utilizar en conjunto las etiquetas estándar para el etiquetado de `env`, `service` y `version`.

Consulta la sección [Etiquetado de servicios unificado][1] para obtener más información sobre cómo configurar estas etiquetas en tus contenedores.

### Varios identificadores

Añade varios nombres de imágenes a la lista de `ad_identifiers` para concretarlos. Ejemplo:

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## Identificadores de contenedor personalizados de Autodiscovery

Para implementar diferentes plantillas de configuración de Autodiscovery en contenedores que ejecuten la misma imagen, utiliza un valor personalizado `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` y aplícalo a la etiqueta `com.datadoghq.ad.check.id` para identificar tu contenedor. Si usas el siguiente archivo de configuración:

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

para habilitar la plantilla en un contenedor de:

{{< tabs >}}
{{% tab "Docker" %}}
Añade la siguiente etiqueta para implementar esta plantilla de configuración de Autodiscovery en un contenedor concreto de Docker.

```yaml
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```
**Nota**: La etiqueta `com.datadoghq.ad.check.id` prevalece sobre la imagen/nombre.

{{% /tab %}}
{{% tab "Kubernetes" %}}
Añade la siguiente anotación en Kubernetes para aplicar esta configuración de Autodiscovery en caso de que `<CONTAINER_IDENTIFIER>` sea el nombre del contenedor en ese pod.

```text
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

**Nota**: Solo se puede añadir esta anotación en las versiones `6.25.0` y `7.25.0`, y posteriores. La etiqueta `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` prevalece sobre la imagen/nombre.
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging