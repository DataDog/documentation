---
description: Más información para empezar con CloudPrem localmente utilizando Docker
  o Docker Compose
further_reading:
- link: /cloudprem/ingest/
  tag: Documentación
  text: Configurar la ingesta de logs
- link: /cloudprem/configure/
  tag: Documentación
  text: Configurar CloudPrem
title: Instalar CloudPrem localmente con Docker
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta guía de instalación te muestra cómo ejecutar Datadog CloudPrem localmente utilizando contenedores Docker o Docker Compose independientes. Sigue estos pasos para desplegar un entorno CloudPrem mínimo en tu equipo, ideal para explorar las funciones de CloudPrem y probar la ingesta de logs con Datadog antes de desplegarla en producción.

## Requisitos previos

Antes de empezar a utilizar CloudPrem, asegúrate de que dispones de:

- Una cuenta **Datadog** con la función CloudPrem activada.
- **Credenciales de API**: Ten a mano tu [clave de API Datadog][2].
- **Docker**: [Docker][4] instalado y funcionando en tu máquina.
- **Docker Compose** (opcional): [Docker Compose][5] para una configuración de línea de comandos única.

## Pasos de la instalación

Elige uno de los siguientes métodos de instalación:

1. **Contenedores Docker independientes**: Configuración mínima para tests
2. **Docker Compose**: Una sola línea de comandos para ejecutar CloudPrem y el Datadog Agent

{{< tabs >}}
{{% tab "Configuración de Docker independiente" %}}

Este método utiliza contenedores de Docker independientes para una configuración mínima de CloudPrem.

Exporta tus credenciales de Datadog como variables de entorno:

```shell
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### Paso 1: Iniciar CloudPrem

Crea el directorio de datos e inicia el contenedor CloudPrem:

```shell
# Start CloudPrem
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Paso 2: Iniciar el Datadog Agent

Para recopilar logs de tus contenedores locales y enviarlos a CloudPrem, inicia el Datadog Agent:

```shell
docker run \
  --name dd-agent \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_ENV=dev \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_LOGS_DD_URL=http://host.docker.internal:7280 \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_CONTAINER_EXCLUDE="name:dd-agent" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  gcr.io/datadoghq/agent:latest
```
{{% /tab %}}

{{% tab "Configuración de Docker Compose" %}}

Este método proporciona una configuración de CloudPrem con la integración del Datadog Agent.

### Paso 1: Crear el archivo Docker Compose

Crea un archivo `docker-compose.yml` en tu directorio de trabajo:

```yaml
services:
  cloudprem:
    image: datadog/cloudprem:edge
    command: ["run"]
    ports:
      - "127.0.0.1:7280:7280"
    environment:
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
    restart: unless-stopped

  datadog-agent:
    image: gcr.io/datadoghq/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://cloudprem:7280
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION=100000
      - DD_CONTAINER_EXCLUDE="name:datadog-agent"
      - DD_ENV=dev
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    depends_on:
      cloudprem:
        condition: service_healthy
    restart: unless-stopped
```

Configuración de Docker Compose:
1. Inicia CloudPrem y espera a que esté sano.
2. Inicia el Datadog Agent para recopilar logs de contenedor.

### Paso 2: Configurar variables de entorno

Crea un archivo `.env` en el mismo directorio:

```shell
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
```

### Paso 3: Iniciar Docker Compose

```shell
docker compose up -d
```
{{% /tab %}}
{{< /tabs >}}

## Siguientes pasos

Después de iniciar CloudPrem utilizando cualquiera de los dos métodos, comprueba que la instalación funciona correctamente:

### Comprobar el estado de CloudPrem

**Verificar que CloudPrem se está ejecutando**:

```shell
curl http://localhost:7280/api/v1/version
```

Deberías ver una respuesta con información sobre la versión.

### Enviar un log

En tu terminal, envía una entrada de log "Hello World" directamente a tu instancia CloudPrem local utilizando la API:

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Buscar tus logs locales en el Log Explorer

Después de verificar que CloudPrem se está ejecutando, puedes buscar y analizar tus logs en el Log Explorer utilizando el índice `cloudprem`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/