---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-sentinelone/
  tag: Blog
  text: Optimizar los logs de EDR y enviarlos a SentinelOne con Observability Pipelines
title: Destino SentinelOne
---

Utiliza el destino SentinelOne de Observability Pipelines para enviar logs a SentinelOne.

## Configuración

Configura el destino SentinelOne y sus variables de entorno cuando [configures un pipeline][1]. La información a continuación se configura en la interfaz de usuario de los pipelines.

### Configurar el destino

{{% observability_pipelines/destination_settings/sentinelone %}}

### Configurar las variables de entorno 

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

## Visualizar logs en un clúster SentinelOne

Una vez configurado el pipeline para el envío de logs al destino SentinelOne, podrás visualizar los logs en un clúster SentinelOne:

1. Inicia sesión en la [consola S1][2].
2. Ve a la página "Buscar" de Singularity Data Lake (SDL). Para acceder a ella desde la consola, haz clic en "Visibility" (Visibilidad) en el menú de la izquierda para ir a SDL y asegúrate de que estás en la pestaña "Buscar".
3. Asegúrate de que el filtro situado junto a la barra de búsqueda está configurado como **Todos los datos**.
4. Esta página muestra los logs que enviaste desde Observability Pipelines a SentinelOne.

## Cómo funciona el destino

### Colocación de eventos en lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Para obtener más información, consulta [lotes de eventos][3].

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| Ninguno           | 1,000,000       | 1                   |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /es/observability_pipelines/destinations/#event-batching