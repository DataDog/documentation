---
disable_toc: false
products:
- icon: logs
  name: Logs
title: Destino Datadog CloudPrem
---

{{< product-availability >}}

Utiliza el destino CloudPrem de Observability Pipelines para enviar logs a Datadog CloudPrem.


## Requisitos previos

Antes de configurar el destino, debes desplegar un clúster CloudPrem. Aprende a instalarlo en la [sección de instalación de CloudPrem][3].

## Instalación

Configura el destino CloudPrem y sus variables de entorno cuando [configures un pipeline][1].

### Configurar el destino

Opcionalmente, activa el interruptor para activar **Opciones de almacenamiento en buffer** (Vista previa).<br>**Nota**: Ponte en contacto con tu gestor de cuenta para solicitar acceso.
- Si está desactivado (por defecto): Se almacenan en buffer hasta 500 eventos antes de la descarga.
- Si está activado:
    1. Selecciona el tipo de buffer que quieres configurar.
        - **Memoria**: Rápida, limitada por la RAM
        - **Tamaño del buffer**: Durable, sobrevive a reinicios
    1. Introduce el tamaño del buffer y selecciona la unidad.
        - Capacidad máxima en MB o GB.

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="Parámetros del destino CloudPrem" style="width:35%;" >}}

### Configurar las variables de entorno

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="Página de instalación que muestra el campo de variables de entorno CloudPrem" style="width:75%;" >}}

- URL del endpoint de CloudPrem
    - Observability Pipelines envía logs al endpoint de admisión de CloudPrem. Define la URL del clúster, como `http://cloudprem.acme.internal:7280`. **Nota**: La URL debe incluir el puerto.
    - El Worker añade `/api/v2/logs` y `/api/v1/validate` a la URL del endpoint, por lo que estos endpoints deben estar autorizados si estás utilizando reglas de reenvío o de cortafuegos.
  - Almacenada como variable de entorno: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta los [eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/cloudprem/install/