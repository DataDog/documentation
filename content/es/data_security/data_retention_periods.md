---
title: Periodos de conservación de datos
disable_sidebar: true
type: data_retention_periods
aliases:
  - /developers/faq/data-collection-resolution-retention/
  - /developers/guide/data-collection-resolution-retention
further_reading:
    - link: /data_security/
      tag: Documentación
      text: Revisar las principales categorías de datos enviados a Datadog
algolia:
  tags: [Conservación de datos]
filter_all: Todos
content: "La siguiente tabla enumera los periodos de conservación de datos por defecto por tipo de datos y producto. Opcionalmente, busca por palabra clave o texto descriptivo para encontrar el tipo de datos o producto que te interesa. Para obtener información sobre el intervalo de recopilación y la resolución mínima, consulta [Recopilación y resolución de datos de Datadog](/developers/guide/data-collection-resolution). ¿Aún necesitas ayuda? Ponte en contacto con el [soporte de Datadog](/help)."
attributes:
  - product: APM
    data_type: |
- **Errores**: 15 días
- **Tramos indexados**: 15 o 30 días, determinado por el plan del cliente
- **Estadísticas de servicios/recursos**: 30 días
- **Trazas vistas**: conservadas durante la vigencia de la cuenta
  - product: App and API Protection
    data_type: |
- **Señales de seguridad**: 15 meses
- **Tramos**: 90 días
  - product: Audit Trail
    data_type: |
- **Logs de auditoría (Audit Trail activado)**: 90 días
- **Logs de auditoría (Audit Trail desactivado)**: 7 días
  - product: Bits AI Dev Agent
    data_type: |
- **Código fuente**: 7 días
  - product: Navegador RUM
    data_type: |
- **Eventos de sesión, vista, acción y error**: 30 días
- **Eventos de recursos, tareas largas y signos vitales**: 15 días
  - product: Case Management
    data_type: |
- **Casos**: retenidos mientras dure la cuenta
  - product: CD Visibility
    data_type: |
- **Despliegues**: 30 días
  - product: CI Pipeline Visibility
    data_type: |
- **Pipelines, etapas, trabajos, configuraciones, comandos**: 15 meses
  - product: Cloud Cost Management
    data_type: |
- **Recomendaciones**: 90 días
  - product: Cloud Security
    data_type: |
- **Averiguaciones y vulnerabilidades resueltas**: 15 meses
  - product: Cloud SIEM
    data_type: |
- **Señales**: 15 meses
- **Detecciones, notificaciones, supresiones**: conservadas mientras dure la cuenta
  - product: Workload Protection
    data_type: |
- **Eventos**: 90 días
- **Señales de seguridad**: 15 meses
  - product: Pruebas de seguridad de aplicaciones estáticas (SAST) de Code Security
    data_type: |
- **Escaneos**: 15 meses
  - product: IAST de Code Security
    data_type: |
- **Vulnerabilidades detectadas**: 15 meses
  - product: Monitorización de contenedores y procesos
    data_type: |
- **Metadatos del contenedor**: 2 horas
- **Procesos y contenedores activos**: 36 horas
- **Definiciones YAML**: 7 días
  - product: Continuous Profiler
    data_type: |
- **Perfiles individuales (no abiertos en la interfaz de usuario)**: 8 días
- **Perfiles individuales (abiertos en la interfaz al menos una vez)**: 1 año
- **Métricas de perfiles**: 90 días
  - product: Continuous Testing
    data_type: |
- **Resultados del lote**: 2 meses
- **Resultados de test**: 2 meses
  - product: CoScreen
    data_type: |
- **Sesiones**: 15 meses
  - product: "Observabilidad de datos: monitorización de trabajos"
    data_type: |
- **Trazas de trabajo**: 90 días
  - product: Database Monitoring
    data_type: |
- **Muestras de consulta**: 15 días
- **Métricas de consulta**: 15 meses
  - product: Aplicación de Datadog
    data_type: |
- **Dashboards, notebooks, monitores**: conservados mientras dure la cuenta
  - product: Error Tracking
    data_type: |
- **Muestras de errores**: 30 días
- **Problemas**: 1 año después de la última actividad
  - product: Gestión de eventos
    data_type: |
- **Eventos**: 15 meses
  - product: Gestión de incidentes
    data_type: |
- **Incidentes**: retenidos durante la vigencia de la cuenta
  - product: LLM Observability
    data_type: |
- **Trazas y tramos de producción**: 15 días
- **Experimentos de trazas y tramos**: 90 días
- **Conjuntos de datos**: 3 años
  - product: Gestión de Logs
    data_type: |
- **Logs**: determinado por el plan del cliente
  - product: Métricas
    data_type: |
- **Etiquetas y valores**: 15 meses
  - product: Tests de aplicaciones móviles
    data_type: |
- **Resultados de test (no se muestran en la interfaz de usuario)**: 2 meses
- **Resultados de test (mostrados en la interfaz de usuario)**: 15 meses
- **Binarios de aplicaciones móviles**: conservados mientras dure la cuenta
  - product: RUM móvil
    data_type: |
- **Eventos de sesión, vista, acción y error**: 30 días
- **Eventos de recursos, tareas largas y signos vitales**: 15 días
  - product: Network Device Monitoring
    data_type: |
- **NetFlow**: 30 días
- **Trampas de SNMP**: 15 días
  - product: Monitorización de redes en la nube
    data_type: |
- **Tráfico de red**: 14 días
  - product: Ruta de red
    data_type: |
- **Test de ruta de red**: 30 días
  - product: Product Analytics
    data_type: |
- **Eventos**: 15 meses
- **Perfiles de usuario**: 30 días
  - product: Puertas de solicitudes pull
    data_type: |
- **Evaluaciones de puertas**: 30 días
  - product: Tablas de referencia
    data_type: |
- **Tablas**: conservados durante la vigencia de la cuenta
  - product: Catálogo de servicios
    data_type: |
- **Metadatos de servicio**: conservados mientras dure la cuenta
  - product: Objetivos de nivel de servicio (SLOs)
    data_type: |
- **Resultados de SLO**: 15 meses
  - product: Session Replay
    data_type: |
- **Repetición de reproducción (la opción de extensión en la interfaz de usuario no está marcada)**: 30 días
- **Repetición de reproducción (la opción de extensión en la interfaz de usuario está marcada)**: 15 meses
  - product: Software Composition Analysis (SCA)
    data_type: |
- **Vulnerabilidades detectadas**: 15 meses
  - product: Integración del código fuente
    data_type: |
- **Código fuente**: 7 días
  - product: Synthetics
    data_type: |
- **Resultados de test (no se muestran en la interfaz de usuario)**: 2 meses
- **Resultados de test (mostrados en la interfaz de usuario)**: 15 meses
  - product: Test Visibility y Intelligent Test Runner
    data_type: |
- **Tests**: 3 meses
  - product: Workflow Automation
    data_type: |
- **Flujos de trabajo**: 30 días
---

### Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
