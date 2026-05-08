---
aliases:
- /es/integrations/guide/storage-monitoring-setup
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimiza y soluciona los problemas de almacenamiento en la nube a escala con
    Storage Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduce los costos de almacenamiento en la nube y mejora la eficiencia operativa
    con Datadog Storage Monitoring
title: Storage Management
---

## Información general

Storage Management para Amazon S3, Google Cloud Storage y Azure Blob Storage proporciona análisis profundos a nivel de prefijo para ayudarte a comprender exactamente cómo se está utilizando tu almacenamiento. Con Storage Management puedes:
- **Identificar de dónde procede el gasto en tu bucket**: desglosa el coste de almacenamiento por prefijo para saber qué cargas de trabajo, equipos o entornos impulsan el crecimiento.
- **Identificar los datos inactivos**: detecta los buckets con prefijos a los que se accede con poca frecuencia y mueve los datos inactivos a niveles de menor coste.
- **Ajustar las reglas de retención y ciclo de vida con datos**: las métricas de lectura/escritura y antigüedad muestran cuándo se utilizaron los objetos por última vez, por lo que puedes desplazar los prefijos no utilizados a Glacier, Intelligent-Tiering y otras clases de bajo coste.
- **Monitorizar la novedad de los datos**: las métricas de edad muestran qué tan recientemente se actualizó cada prefijo, para que puedas confirmar que las copias de seguridad y otros datos sensibles al tiempo están aterrizando en los prefijos cuando deberían.

Puedes acceder a Storage Management en Datadog navegando a **Infrastructure** (Infraestructura) > [**Storage Management**][1].

Utiliza las siguientes guías para configurar Storage Management en Datadog para tu servicio de almacenamiento en la nube.

{{< partial name="cloud_storage_monitoring/storage-monitoring-setup.html" >}}

[1]: https://app.datadoghq.com/storage-management