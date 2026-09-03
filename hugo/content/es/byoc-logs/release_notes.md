---
description: Cambios por versión para el binario de BYOC Logs, incluido en el chart
  de Helm datadog/cloudprem.
disable_toc: false
further_reading:
- link: /byoc-logs/operate/updates/
  tag: Documentación
  text: Planificar actualizaciones de BYOC Logs
- link: /byoc-logs/install/
  tag: Documentación
  text: Instalar BYOC Logs
- link: /byoc-logs/operate/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de BYOC Logs
title: Notas de la versión de BYOC Logs
---
## Descripción general {#overview}

Esta página rastrea los lanzamientos del **binario de BYOC (Bring Your Own Cloud) Logs**, distribuido como una imagen de Docker e incluido por el `datadog/cloudprem` chart de Helm. Las nuevas funciones y correcciones se envían en el binario; el chart las empaqueta para su implementación.

### Verifique su versión de binario instalada {#check-your-installed-binary-version}

Observe el campo `image` en un pod de BYOC Logs:

```shell
kubectl get pods -n <BYOC_LOGS_NAMESPACE> \
  -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}' \
  | sort -u
```

La etiqueta de la imagen (por ejemplo, `:v0.1.26`) es la versión del binario. Para ver qué versión de binario incluye un chart de Helm, ejecute:

```shell
helm show chart datadog/cloudprem --version <CHART_VERSION> | grep appVersion
```

### Actualizar {#upgrade}

Las actualizaciones del binario se distribuyen a través del chart de Helm. Consulte [Instalar BYOC Logs](/byoc-logs/install/) para obtener el comando de actualización del chart para su plataforma.

## Lanzamientos {#releases}

### v0.1.33 — 2026-08-18 {#v0133-2026-08-18}

*Incluido en el chart: `0.5.2`.*
*Validado con Observability Pipelines Worker: `2.20.x`.*

#### Cambiado {#changed}
- Agrega la agrupación de documentos para agrupar registros similares y reducir la huella de almacenamiento entre un 10% y un 20%. Para deshabilitar la agrupación de documentos, configure `QW_DISABLE_DOCS_CLUSTERING=true`.
- Agrega soporte para consultas de agrupación por atributos planos.
- Agrega métricas operativas para el uso de recursos del sistema, desmantelamiento, fallas de PUT de S3, uso de WAL, capacidad de metastore y resultados de búsqueda dividida.

#### Cambios en el Helm chart {#helm-chart-changes}
- **Cambio importante**: Elimina el `medium` tamaño de pod. `indexer.podSize` y `searcher.podSize` aceptan `large`, `xlarge`, `2xlarge`, `4xlarge`, `6xlarge` y `8xlarge`.
- Ajusta las solicitudes y límites de CPU y memoria del tamaño del pod para tener en cuenta las reservas de nodos y los complementos. Esto reajusta las cachés, las colas de ingesta y las búsquedas divididas simultáneas en consecuencia.
- Habilita el clúster de documentos de forma predeterminada con `config.docs_clustering`.
- Establece los tiempos de espera de desmantelamiento del indexador y del compactador independiente al 90% de `terminationGracePeriodSeconds` de cada carga de trabajo.
- Agrega un `PodDisruptionBudget` de metastore predeterminado y una configuración de `ndots: 1` DNS global.
- Reduce el objetivo de CPU de HPA del indexador al 70% y elimina la ventana de estabilización de escalado para que los indexadores se escalen horizontalmente bajo carga.

### v0.1.32 — 2026-07-21 {#v0132-2026-07-21}

*Incluido en el chart: `0.4.6`.*
*Validado con Observability Pipelines Worker: `2.20.0` (`datadog/observability-pipelines-worker` Helm chart `2.20.0`).*

#### Cambiado {#changed-1}
- Agrega soporte opcional de réplica de lectura de metastore de PostgreSQL para rutas de lectura de búsqueda y análisis.
- Agrega un servicio de compactador independiente opcional para ejecutar el trabajo de combinación fuera de los nodos del indexador.
- Reduce la inestabilidad de las búsquedas DNS de S3 mediante el almacenamiento en caché de la resolución DNS para los clientes de S3.
- Mejora la estabilidad del plano de control después de reinicios de actores y respuestas de sobrecarga del metastore.

#### Cambios en el chart de Helm {#helm-chart-changes-1}
- Agrega valores `metastore_ro` para implementar un grupo de réplicas de metastore de solo lectura para escalar las lecturas del metastore independientemente del escritor.
- Agrega `enableStandaloneCompactors` para ejecutar la compactación en trabajadores dedicados en lugar de nodos indexadores.
- Deshabilita la ingesta v1 de forma predeterminada con `QW_DISABLE_INGEST_V1=true`; reemplacela con `environment`.
- Enruta las trazas del servicio BYOC a la ingesta de telemetría de Datadog cuando `datadog.byocTelemetry.enabled` está habilitado.
- Utiliza el puerto `health` dedicado para pruebas de actividad y de inicio.

### v0.1.31 — 2026-07-08 {#v0131-2026-07-08}

*Incluido en el chart: `0.4.5`.*

#### Cambios en {#changed-2}
- Corrige las consultas de prefijo de frase de un solo token en campos sin procesar para que las búsquedas `match_phrase_prefix` devuelvan todos los términos de prefijo coincidentes en lugar de estar limitadas por `max_expansions`.
- Hasta 3 veces más rápido en la intersección para consultas de términos selectivos con rango de tiempo.

#### Cambios en el Helm chart {#helm-chart-changes-2}
- Agrega los valores `indexer.volumeAttributesClass` y `searcher.volumeAttributesClass` para aprovisionar recursos `VolumeAttributesClass` de Kubernetes para volúmenes persistentes de indexador y buscador. Utilice estos valores para ajustar los atributos del volumen, como IOPS y rendimiento. Esta función está deshabilitada de forma predeterminada, requiere Kubernetes 1.31 o posterior y requiere `driverName` cuando está habilitada.
- Corrige la dirección de anuncio de Kubernetes configurando `KUBERNETES_POD_IP` a partir de la IP del pod en lugar del nombre del pod.
- Deshabilita `serviceAccount.automountServiceAccountToken` de forma predeterminada para reducir la exposición de tokens en pods que no necesitan acceso a la API de Kubernetes.
- Habilita `securityContext.readOnlyRootFilesystem` de forma predeterminada en todas las cargas de trabajo para un fortalecimiento de defensa en profundidad.

### v0.1.30 — 2026-06-30 {#v0130-2026-06-30}

*Incluido en el chart: `0.4.3`.*

#### Cambios {#changed-3}
- Reduce el tiempo de CPU de búsqueda para consultas de histograma de fecha anidadas hasta en un 20%, con las mayores ganancias en ventanas de siete días.
- Añade un escucha de verificación de estado dedicado en el puerto `7284` para las verificaciones de actividad y preparación de los componentes de CloudPrem.

#### Cambios en el Helm chart {#helm-chart-changes-3}
- Añade valores globales `volumes` y `volumeMounts` que se aplican a todos los componentes de CloudPrem y se fusionan con los `extraVolumes` y `extraVolumeMounts` existentes por componente.
- Añade soporte global para `topologySpreadConstraints`, fusionado con restricciones por componente, para distribuir los pods de carga de trabajo de CloudPrem a través de dominios de topología.
- Actualiza los servicios de CloudPrem y las verificaciones de estado de ingreso interno de AWS ALB para usar el punto de conexión de estado dedicado.

### v0.1.29 — 2026-06-05 {#v0129-2026-06-05}

*Incluido en el chart: `0.4.2`.*

#### Cambios {#changed-4}
- Ejecución más rápida para consultas comunes de análisis de registros, incluyendo consultas de rango 2 veces más rápidas, agregaciones de cardinalidad 1.6 veces más rápidas y hasta 6 veces más rápidas las intersecciones con consultas de rango.
- Trata los filtros `field:*` como consultas de existencia y corrige la ordenación por agregaciones de percentiles.
- Uso de memoria reducido para las cargas a Google Cloud Storage para mejorar la estabilidad de la indexación.

#### Cambios en el Helm chart {#helm-chart-changes-4}
- Habilita la telemetría del servicio BYOC de forma predeterminada con `datadog.byocTelemetry.enabled`; esto exporta únicamente los registros y las métricas del servicio BYOC, no los registros, las métricas ni las trazas ingeridas por el cliente.
- Desaconseja e ignora `cloudprem.index.retention`, y ya no establece `CP_RETENTION_PERIOD`.

### v0.1.26 — 2026-05-05 {#v0126-2026-05-05}

*Incluido en el chart: `0.4.0`.*

#### Cambiado {#changed-5}
- Agregaciones de términos hasta 4 veces más rápidas con orden por subagregación y agregaciones de cardinalidad hasta 1.5 veces más rápidas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}