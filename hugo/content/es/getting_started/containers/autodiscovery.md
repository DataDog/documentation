---
aliases:
- /es/agent/autodiscovery/basic_autodiscovery
- /es/getting_started/agent/autodiscovery
- /es/agent/autodiscovery
description: Haga un seguimiento automáticamente de los servicios en contenedores
  con Autodiscovery del Datadog Agent. Configure plantillas para detectar y hacer
  un seguimiento dinámico de los servicios en contenedores.
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Cree y cargue una plantilla de integración de Autodiscovery
- link: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
  tag: Documentación
  text: Configure Autodiscovery con DatadogInstrumentation CRD
- link: /agent/guide/ad_identifiers/
  tag: Documentación
  text: Haga coincidir un contenedor con la plantilla de integración correspondiente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Administre qué contenedor incluir en el Autodiscovery del Agent
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigne y recopile etiquetas dinámicamente desde su aplicación
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: preguntas frecuentes
  text: Configuración de integración para ECS Fargate
- link: /agent/configuration/secrets-management/
  tag: Documentación
  text: Gestión de secretos
title: Autodiscovery básico del Datadog Agent
---
## Descripción general {#overview}

Cuando hace un seguimiento de una infraestructura en contenedores, un desafío que surge es que los contenedores pueden cambiar de servidor a servidor. La naturaleza dinámica de los sistemas en contenedores hace que sean difíciles de hacer un seguimiento manualmente.

Para resolver este problema, puede usar la función Autodiscovery de Datadog para identificar automáticamente los servicios que se ejecutan en un contenedor específico y recopilar datos de esos servicios. Cada vez que se inicia un contenedor, el Datadog Agent identifica qué servicios se están ejecutando en este nuevo contenedor, busca la configuración de seguimiento correspondiente y comienza a recopilar métricas.

Autodiscovery le permite definir plantillas de configuración para las verificaciones del Datadog Agent y especificar a qué contenedores debe aplicarse cada verificación.

El Datadog Agent observa eventos como la creación, destrucción, inicio y detención de contenedores. Luego, el Datadog Agent habilita, deshabilita y regenera configuraciones de verificación estática ante tales eventos. A medida que el Datadog Agent inspecciona cada contenedor en ejecución, verifica si el contenedor coincide con alguno de los [identificadores de contenedor de Autodiscovery][1] de cualquier plantilla cargada. Para cada coincidencia, el Datadog Agent genera una configuración de verificación estática sustituyendo las [Variables de Plantilla][2] con los valores específicos del contenedor coincidente. Luego, habilita la verificación usando la configuración estática.

## Cómo funciona {#how-it-works}

{{< img src="agent/autodiscovery/ad_1.png" alt="Descripción general de Autodiscovery" style="width:80%;">}}

En la figura anterior, hay un nodo servidor con tres pods, incluyendo un pod de Redis y un pod del Datadog Agent. El Kubelet, que programa los contenedores, se ejecuta como un binario en este nodo y expone los puntos de conexión `/metrics` y `/pods`. Cada 10 segundos, el Datadog Agent consulta `/pods` y encuentra la especificación de Redis. También puede ver información sobre el pod de Redis en sí.

La especificación de Redis en este ejemplo incluye las siguientes anotaciones:

{{< tabs >}}

{{% tab "Anotaciones de AD v2 (Datadog Agent 7.36+)" %}}

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

En el ejemplo anterior, las etiquetas `tags.datadoghq.com` establecen `env`, `service` e incluso `version` como etiquetas para todos los registros y métricas emitidos para el contenedor `redis` del pod. Estas etiquetas estándar son parte de [Unified Service Tagging][1]. Como mejor práctica, Datadog recomienda usar Unified Service Tagging al configurar etiquetas y variables de entorno.

La clave de anotación de configuración de la verificación sigue el formato `ad.datadoghq.com/<container-name>.checks`.

`redisdb` es el nombre de la verificación que se ejecutará. `init_config` contiene algunos parámetros de configuración, como el intervalo mínimo de recolección, y es opcional. Cada elemento en `instances` representa la configuración para ejecutar una instancia de una verificación. **Nota**: En este ejemplo, `%%host%%` es una variable de plantilla que se completa dinámicamente con la IP de su contenedor.

[1]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "Anotaciones de AD v1" %}}

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

En el ejemplo anterior, las etiquetas `tags.datadoghq.com` establecen `env`, `service` e incluso `version` como etiquetas para todos los registros y métricas emitidos para el contenedor `redis` del pod. Estas etiquetas estándar son parte de [Unified Service Tagging][1]. Como mejor práctica, Datadog recomienda usar Unified Service Tagging al configurar etiquetas y variables de entorno.

Las claves de anotación de configuración de la verificación siguen el formato `ad.datadoghq.com/<container-name>.check_names`, `ad.datadoghq.com/<container-name>.init_configs` y `ad.datadoghq.com/<container-name>.instances`.

`check_names` incluye los nombres de la verificación que se ejecutará, y `init_configs` contiene algunos parámetros de configuración, como el intervalo mínimo de recolección. Cada elemento en `instances` representa la configuración para ejecutar una instancia de una verificación. **Nota**: En este ejemplo, `%%host%%` es una variable de plantilla que se completa dinámicamente con la IP de su contenedor.

[1]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

A partir de esto, el Datadog Agent genera una configuración de verificación estática.

## Configuración {#setup}

Configurar Autodiscovery para su infraestructura requiere los siguientes dos pasos:

1. [Habilite Autodiscovery](#enable-autodiscovery) para su Datadog Agent.
2. Cree [plantillas de configuración específicas de la integración](#integration-templates) para cada servicio al que desee hacer un seguimiento. **Nota**: Datadog proporciona plantillas de autoconfiguración para [algunos servicios en contenedores comunes][3], incluidos Apache y Redis.

### Habilitar Autodiscovery {#enable-autodiscovery}

El Datadog Agent no solo detecta automáticamente los sockets y puntos de conexión de API accesibles (como Docker, contenedor y la API de Kubernetes), sino que también activa Autodiscovery para usted.

Si Autodiscovery no funciona, verifique las funciones detectadas ejecutando `agent status`.

En caso de que la detección automática haya fallado o desee desactivar las funciones detectadas automáticamente, utilice estos parámetros de configuración en `datadog.yaml` para incluir/excluir funciones:

```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

La lista de funciones detectadas automáticamente está disponible en la plantilla `datadog.yaml`.

### Plantillas de integración {#integration-templates}

Una vez que el Autodiscovery está habilitado, el Datadog Agent intenta automáticamente el Autodiscovery para varios [servicios][3], incluidos Apache y Redis, basándose en los archivos de configuración predeterminados de Autodiscovery.

Puede definir una plantilla de integración de varias formas: como anotaciones de pod de Kubernetes, etiquetas de Docker, un archivo de configuración montado dentro del Datadog Agent, un ConfigMap y almacenes de clave-valor. Consulte la documentación de [Plantillas de integración de Autodiscovery][4] para obtener más detalles.

En Kubernetes, también puede configurar verificaciones para una carga de trabajo específica a través del recurso personalizado `DatadogInstrumentation`, en lugar de usar anotaciones de pod. Consulte [Configurar Autodiscovery con DatadogInstrumentation CRD][5].

### Notas {#notes}

Si está utilizando Autodiscovery y una aplicación se implementa en un nodo nuevo, es posible que experimente algo de retraso para ver las métricas aparecer en Datadog. Cuando cambia a un nodo nuevo, el Datadog Agent tarda un tiempo en recopilar metadatos de su aplicación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/ad_identifiers/
[2]: /es/agent/faq/template_variables/
[3]: /es/agent/faq/auto_conf/
[4]: /es/agent/kubernetes/integrations/
[5]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/