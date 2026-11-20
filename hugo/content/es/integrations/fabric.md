---
app_id: fabric
categories:
- orquestación
custom_kind: integración
description: Una biblioteca y herramienta de línea de comandos de Python que simplifica
  el uso de SSH para el despliegue de aplicaciones y tareas de administración del
  sistema.
media: []
title: Fabric
---
## Información general

**Advertencia**: Esta integración ha quedado obsoleta y ya no se desarrolla activamente.

Conecta Fabric a Datadog para:

- Buscar y capturar eventos de despliegues en el flujo de eventos.
- Correlacionar eventos de despliegues con los cambios de métricas en dashboards.

## Configuración

### Configuración

1. Instala el paquete dogapi:

   ```shell
   sudo easy_install --upgrade dogapi
   ```

   o:

   ```shell
   sudo pip install dogapi
   ```

1. Importa dogapi y configura tu clave de API:

   ```python
   from dogapi.fab import setup, notify
   setup("<YOUR_DATADOG_API_KEY")
   ```

1. Añade el decorador de notificaciones a cada tarea que quieras conectar a Datadog. Asegúrate de que @notify tenga lugar justo sobre @task

   ```python
   @notify
   @task
   def a_fabric_task(...):
       # do things
   ```

## Datos recopilados

### Métricas

La integración Fabric no incluye métricas.

### Eventos

La integración Fabric no incluye eventos.

### Checks de servicio

La integración Fabric no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).