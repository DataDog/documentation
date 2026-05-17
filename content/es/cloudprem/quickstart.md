---
description: Empieza a utilizar CloudPrem de forma local en menos de 5 minutos
further_reading:
- link: /cloudprem/install/docker/
  tag: Documentación
  text: Instalación de Docker en CloudPrem
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentación
  text: API REST de CloudPrem
title: Inicio rápido de CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Empieza a utilizar CloudPrem de forma local en menos de 5 minutos. Este inicio rápido cubre lo siguiente:
1. Inicia CloudPrem de forma local utilizando Docker.
2. Comprueba el estado del clúster.
3. Envía un log "Hello World".
4. Consulta el inicio de sesión en el Datadog Log Explorer.

## Requisitos previos

- Solicita la [vista previa de CloudPrem][1].
- **Clave de API de Datadog**: [obtén tu clave de API][2].
- **Docker**: [instala Docker][3].

## Paso 1: Iniciar CloudPrem

Ejecuta el siguiente comando en tu terminal para iniciar una instancia local de CloudPrem. Sustituye `<YOUR_API_KEY>` por tu clave de API real de Datadog.

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## Paso 2: Verificar el estado en la consola de CloudPrem

En Datadog, ve a la [consola de CloudPrem][4] y comprueba que tu clúster está conectado. Deberías ver el estado `connected`.

En la consola de CloudPrem, puedes editar los metadatos del clúster y cambiarle el nombre a `demo`.

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="Captura de pantalla de la consola de CloudPrem que muestra el estado Conectado del clúster" style="width:100%;" >}}

## Paso 3: Enviar un log

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

## Paso 4: Explorar los logs

1. Ve al [Datadog Log Explorer][5].
2. En el panel izquierdo, selecciona la casilla correspondiente a tu índice en **CLOUDPREM INDEXES** (ÍNDICES DE CLOUDPREM).
3. Deberías ver tu entrada de log "Hello world from CloudPrem".

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="La selección del índice de CloudPrem en el Datadog Log Explorer" style="width:100%;" >}}

## Siguientes pasos

Con CloudPrem en funcionamiento, puedes:
- [Enviar logs con Datadog Agent][6] para recopilar automáticamente los logs de tus contenedores.
- [Enviar logs con Observability Pipelines][7].

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/cloudprem
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /es/cloudprem/ingest/agent/
[7]: /es/cloudprem/ingest/observability_pipelines/