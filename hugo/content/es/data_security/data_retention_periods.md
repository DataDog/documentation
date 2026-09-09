---
algolia:
  tags:
  - data retention
aliases:
- /es/developers/faq/data-collection-resolution-retention/
- /es/developers/guide/data-collection-resolution-retention
attributes:
- data_type: '- **Errores**: 15 días

    - **Tramos indexados**: 15 o 30 días, determinado por el plan del cliente

    - **Estadísticas de servicios/recursos**: 30 días

    - **Trazas vistas**: Se conservan durante la duración de la cuenta

    '
  product: APM
- data_type: '- **Señales de seguridad**: 15 meses

    - **Tramos**: 90 días

    '
  product: App and API Protection
- data_type: '- **Registros de auditoría (Audit Trail habilitado)**: 90 días

    - **Registros de auditoría (Audit Trail deshabilitado)**: 7 días

    '
  product: Audit Trail
- data_type: '- **Mensajes**: 15 meses

    '
  product: Bits Chat
- data_type: '- **Código fuente**: 7 días

    '
  product: Bits Code
- data_type: '- **Investigaciones**: Se conservan durante la duración de la cuenta

    '
  product: Bits Investigation
- data_type: '- **Eventos de sesión, visualización, acción y error**: 30 días

    - **Eventos de recursos, tareas largas y métricas vitales**: 15 días

    '
  product: Browser RUM
- data_type: '- **Incidencias**: Se conservan durante la duración de la cuenta

    '
  product: Case Management
- data_type: '- **Implementaciones**: 30 días

    '
  product: CD Visibility
- data_type: '- **Canalizaciones, etapas, trabajos, configuraciones, comandos**: 15
    meses

    '
  product: CI Pipeline Visibility
- data_type: '- **Métricas de costos**: 15 meses

    - **Recomendaciones**: 90 días

    '
  product: Cloud Cost Management
- data_type: '- **Hallazgos y vulnerabilidades resueltas**: 15 meses

    '
  product: Cloud Security
- data_type: '- **Señales**: 15 meses

    - **Detecciones, notificaciones, supresiones**: Se conservan durante la duración
    de la cuenta

    '
  product: Cloud SIEM
- data_type: '- **Eventos**: 90 días

    - **Señales de seguridad**: 15 meses

    '
  product: Workload Protection
- data_type: '- **Escaneos**: 15 meses

    '
  product: Code Security SAST
- data_type: '- **Vulnerabilidades detectadas**: 15 meses

    '
  product: Code Security IAST
- data_type: '- **Metadatos de contenedores**: 2 horas

    - **Procesos y contenedores en vivo**: 36 horas

    - **Definiciones YAML**: 7 días

    '
  product: Container and Process Monitoring
- data_type: '- **Gráficos de llama, gráficos de llamadas y líneas de tiempo de hilos**:
    8 días

    - **Gráficos de llama exportados a Notebooks**: 1 año

    - **Perfiles individuales abiertos en la interfaz de usuario al menos una vez**:
    1 año

    - **Métricas de perfil**: 30 días

    '
  product: Continuous Profiler
- data_type: '- **Resultados de lotes**: 2 meses

    - **Resultados de pruebas**: 2 meses

    '
  product: Continuous Testing
- data_type: '- **Trazas de trabajo**: 90 días

    '
  product: 'Data Observability: Jobs Monitoring'
- data_type: '- **Muestras de consultas**: 15 días

    - **Métricas de consultas**: 15 meses

    '
  product: Database Monitoring
- data_type: '- **Dashboards, Notebooks, Monitors**: Se conservan durante la duración
    de la cuenta

    '
  product: Datadog App
- data_type: '- **Implementaciones**: 2 años

    '
  product: DORA Metrics
- data_type: '- **Muestras de errores**: 30 días

    - **Problemas**: 1 año después de la última actividad

    '
  product: Error Tracking
- data_type: '- **Eventos**: 15 meses

    '
  product: Event Management
- data_type: '- **Incidentes**: Se conservan durante la duración de la cuenta

    '
  product: Incident Management
- data_type: '- **Trazas y tramos de producción**: 15 (predeterminado), 30, 60 o 90
    días, determinado por el plan del cliente

    - **Trazas y tramos de experimentos**: 15 (predeterminado), 90, 180, 270, 365
    días, determinado por el plan del cliente

    - **Conjuntos de datos**: 3 años

    '
  product: Agent Observability
- data_type: '- **Registros**: Determinado por el plan del cliente

    - **Registros de ejemplo de Sensitive Data Scanner**: <span class="d-none site-region-container"
    data-region="us,us3,us5,eu,ap1,ap2,uk1">3 días</span><span class="d-none site-region-container"
    data-region="gov,gov2">7 días</span>

    '
  product: Log Management
- data_type: '- **Etiquetas y valores**: 15 meses

    '
  product: Metrics
- data_type: '- **Resultados de pruebas (no mostrados en la interfaz de usuario)**:
    2 meses

    - **Resultados de pruebas (mostrados en la interfaz de usuario)**: 15 meses

    - **Binarios de aplicaciones móviles**: Se conservan durante la duración de la
    cuenta

    '
  product: Mobile App Testing
- data_type: '- **Eventos de sesión, visualización, acción y error**: 30 días

    - **Eventos de recursos, tareas largas y métricas vitales**: 15 días

    '
  product: Mobile RUM
- data_type: '- **NetFlow**: 15, 30, 60 o 90 días, determinado por el plan del cliente

    - **SNMP traps**: Determinado por el plan del cliente, 15 días por defecto

    '
  product: Network Device Monitoring
- data_type: '- **Tráfico de red**: 14 días

    '
  product: Cloud Network Monitoring
- data_type: '- **Pruebas de Network Path**: 30 días

    '
  product: Network Path
- data_type: '- **Eventos**: 15 meses

    - **Perfiles de usuario**: 15 meses, o 30 días si <a href=\"/product_analytics/guide/rum_and_product_analytics/#how-do-i-set-up-product-analytics\">Product
    Analytics no está habilitado</a>

    '
  product: Product Analytics
- data_type: '- **Evaluaciones de puertas**: 30 días

    '
  product: Quality Gates
- data_type: '- **Tablas**: Se conservan durante la duración de la cuenta

    '
  product: Reference Tables
- data_type: '- **Metadatos de servicio**: Se conservan durante la duración de la
    cuenta

    '
  product: Service Catalog
- data_type: '- **Resultados de SLO**: 15 meses

    '
  product: Service Level Objectives
- data_type: '- **Reproducciones (la opción de extensión en la interfaz de usuario
    no está marcada)**: 30 días

    - **Reproducciones (la opción de extensión en la interfaz de usuario está marcada)**:
    15 meses

    '
  product: Session Replay
- data_type: '- **Vulnerabilidades detectadas**: 15 meses

    '
  product: Software Composition Analysis (SCA)
- data_type: '- **Código fuente**: 7 días

    '
  product: Source Code Integration
- data_type: '- **Resultados de pruebas**: 15 meses

    '
  product: Synthetics
- data_type: '- **Pruebas**: 3 meses

    '
  product: Test Visibility & Intelligent Test Runner
- data_type: '- **Flujos de trabajo**: 30 días

    '
  product: Workflow Automation
content: La siguiente tabla enumera los períodos de retención de datos predeterminados
  por tipo de datos y producto. Opcionalmente, busque por palabra clave o texto de
  descripción para encontrar el tipo de datos o producto que le interesa. Para obtener
  información sobre el intervalo de recopilación y la resolución mínima, consulte
  [Datadog Data Collection and Resolution](/extend/guide/data-collection-resolution).
  ¿Aún necesita ayuda? Comuníquese con el [soporte de Datadog](/help).
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revise las categorías principales de datos enviados a Datadog
title: Períodos de retención de datos
type: data_retention_periods
---
### Lecturas Adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}