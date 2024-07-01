---
aliases:
- /es/agent/autodiscovery/basic_autodiscovery
- /es/getting_started/agent/autodiscovery
- /es/agent/autodiscovery
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
- link: /agent/guide/ad_identifiers/
  tag: Documentación
  text: Usa la plantilla de integración correspondiente a cada contenedor
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna y recopila las etiquetas (tags) de tu aplicación dinámicamente
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: Configuración de la integración de ECS y Fargate
- link: /agent/configuration/secrets-management/
  tag: Documentación
  text: Gestión de secretos
kind: documentación
title: Autodiscovery básico del Agent
---

## Información general

Una de las dificultades que surgen cuando se monitoriza una infraestructura contenedorizada es que los contenedores pueden pasar de un host a otro. Así pues, la naturaleza dinámica de los sistemas contenedorizados dificulta la monitorización manual.

Para solucionar este problema, puedes usar la función Autodiscovery de Datadog, que permite identificar automáticamente los servicios que se ejecutan en un contenedor en concreto y reunir datos procedentes de estos. Cada vez que se inicia un contenedor, el Datadog Agent identifica los servicios que se ejecutan en este nuevo contenedor, busca la configuración de monitorización correspondiente y pone en marcha la recopilación de métricas.

Autodiscovery te permite definir plantillas de configuración para llevar a cabo checks de Agent, así como indicar en qué contenedor debería aplicarse cada check.

El Agent detecta eventos como la creación, destrucción, inicio y detención de contenedores. Acto seguido, activa, desactiva y regenera la configuración estática de checks en dichos eventos. El Agent, al inspeccionar todos los contenedores en ejecución, comprueba si estos coinciden con alguno de los [identificadores de contenedor de Autodiscovery][1] presentes en las plantillas cargadas. Por cada coincidencia, el Agent genera una configuración estática de checks sustituyendo las [variables de plantilla][2] por los valores concretos del contenedor correspondiente. Una vez hecho esto, activa el check mediante la configuración estática.

## Cómo funciona

{{< img src="agent/autodiscovery/ad_1.png" alt="Información general de Autodiscovery" style="width:80%;">}}

En la imagen de arriba, hay un nodo de host con tres pods, uno de los cuales es de Redis y otro, de Agent. El kubelet, que es el que programa los contenedores, se ejecuta como un binario en este nodo y expone los endpoints `/metrics` y `/pods`. Cada 10 segundos, el Agent consulta `/pods` y obtiene las especificaciones de Redis. Además, puede ver la información del pod de Redis.

En este ejemplo, las especificaciones de Redis incluyen las siguientes anotaciones:

{{< tabs >}}

{{% tab "Anotaciones de Autodiscovery v2 (Agent 7.36+)" %}}
```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"%%env_REDIS_PASSWORD%%"
          }
        ]
      }
    }
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

En el ejemplo de arriba, las marcas `tags.datadoghq.com` determinan que `env`, `service` e incluso `version` son etiquetas en todos los logs y métricas emitidos del pod de Redis. Estas marcas estándar forman parte del [etiquetado de servicios unificado][1]. Datadog recomienda usar el etiquetado de servicios unificado para configurar etiquetas y variables de entorno.

`redisdb` es el nombre del check que debe ejecutarse. `init_config` contiene algunos parámetros de configuración, como el intervalo mínimo de recopilación, y es opcional. Cada elemento de `instances` representa la configuración que debe llevarse a cabo en una instancia de un check. **Nota**: En este ejemplo, `%%host%%` es una variable de plantilla que puede completarse dinámicamente con la IP de tu contenedor.

[1]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "Anotaciones de Autodiscovery v1" %}}
```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.check_names: '["redisdb"]'
  ad.datadoghq.com/redis.init_configs: '[{}]'
  ad.datadoghq.com/redis.instances: |
    [
      {
        "host": "%%host%%",
        "port":"6379",
        "password":"%%env_REDIS_PASSWORD%%"
      }
    ]
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

En el ejemplo de arriba, las marcas `tags.datadoghq.com` determinan que `env`, `service` e incluso `version` son etiquetas en todos los logs y métricas emitidos del pod de Redis. Estas marcas estándar forman parte del [etiquetado de servicios unificado][1]. Datadog recomienda usar el etiquetado de servicios unificado para configurar etiquetas y variables de entorno.

`check_names` presenta los nombres de los checks que deben ejecutarse. `init_configs` contiene algunos parámetros de configuración, como el intervalo mínimo de recopilación. Cada elemento de `instances` representa la configuración que debe llevarse a cabo en una instancia de un check. **Nota**: En este ejemplo, `%%host%%` es una variable de plantilla que puede completarse dinámicamente con la IP de tu contenedor.

[1]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

A partir de este punto, el Agent genera una configuración estática de checks.

## Configuración

Para configurar Autodiscovery en tu infraestructura, tienes que efectuar los dos siguientes pasos:

1. [Activa Autodiscovery](#enable-autodiscovery) en tu Datadog Agent.
2. Crea [plantillas de configuración específicas para integraciones](#integration-templates) en cada servicio que desees monitorizar. **Nota**: Datadog ofrece plantillas de configuración automática para [algunos servicios contenedorizados habituales][3], como Apache y Redis.

### Activar Autodiscovery

El Agent no solo detecta automáticamente los sockets accesibles y los endpoins de la API (como Docker, containerd y la API de Kubernetes), sino que también activa Autodiscovery por ti.

Si Autodiscovery no funciona, ejecuta `agent status` para verificar las funciones detectadas.

En caso de que la detección automática falle o quieras desactivar las funciones detectadas automáticamente, usa estos parámetros de configuración en `datadog.yaml` para incluir/excluir funciones:
```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

La lista completa de funciones detectadas automáticamente está disponible en la plantilla `datadog.yaml`.

### Plantillas de integración

Una vez que se active Autodiscovery, el Datadog Agent intentará usarlo automáticamente en varios [servicios][3], como Apache y Redis, en función de los archivos de configuración predeterminados de Autodiscovery.

Una plantilla de integración puede definirse de varias formas, a saber: con anotaciones de pod de Kubernetes, con marcas textuales de Docker, con un archivo de configuración integrado en el Agent, con un ConfigMap y con almacenes de valores clave. Para más información, consulta la documentación sobre las [plantillas de integración de Autodiscovery][4].

### Notas

Si utilizas Autodiscovery y se despliega una aplicación en un nodo nuevo, es posible que experimentes algún retraso al ver las métricas que aparecen en Datadog. Cuando cambias a un nodo nuevo, el Datadog Agent tarda un poco en recopilar metadatos de tu aplicación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/ad_identifiers/
[2]: /es/agent/faq/template_variables/
[3]: /es/agent/faq/auto_conf/
[4]: /es/agent/kubernetes/integrations/