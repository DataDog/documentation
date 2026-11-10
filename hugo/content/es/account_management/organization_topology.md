---
aliases:
- /es/account_management/org_settings/organization_topology/
- /es/getting_started/organization_topology/
description: Elija entre implementaciones de Datadog de organización única y de múltiples
  organizaciones, logre el aislamiento con controles de acceso y gestione entornos
  de múltiples organizaciones.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentación
  text: Administración de cuentas de múltiples organizaciones
- link: /account_management/organization_groups/
  tag: Documentación
  text: Grupos de organización
- link: /account_management/org_settings/cross_org_visibility/
  tag: Documentación
  text: Visibilidad entre organizaciones
- link: /account_management/rbac/
  tag: Documentación
  text: Role Based Access Control (RBAC)
- link: /account_management/rbac/data_access/
  tag: Documentación
  text: Data Access Control
- link: /account_management/rbac/granular_access/
  tag: Documentación
  text: Granular Access Control
- link: /account_management/teams/
  tag: Documentación
  text: Teams
- link: /account_management/saml/
  tag: Documentación
  text: SAML Single Sign-On
title: Topología de la organización
---
## Descripción general {#overview}

Su topología de organización de Datadog (organización única o múltiples organizaciones) determina cómo observa los servicios, controla el acceso, gestiona los usuarios y atribuye los costos.

Esta página cubre:
- Las capacidades de una topología de organización única
- Los escenarios que justifican una topología de múltiples organizaciones
- Cómo decidir qué topología se ajusta a sus necesidades

## Comience con una organización única {#start-with-a-single-organization}

Datadog recomienda una [topología de organización única](#single-organization-topology-recommended) para la mayoría de las implementaciones. Puede gestionar una organización única personalizando el nivel de acceso a sus recursos de Datadog. Por ejemplo, las grandes empresas con miles de usuarios y múltiples unidades de negocio pueden usar [Teams][7] y [control de acceso granular][6] para satisfacer estrictos requisitos de cumplimiento.

Use una [topología de múltiples organizaciones](#multi-organization-topology) solo cuando una organización única no pueda satisfacer un requisito estricto.

## Topología de organización única (recomendada) {#single-organization-topology-recommended}

En una topología de organización única, las unidades de negocio, los equipos y los entornos comparten una organización. Las convenciones basadas en etiquetas (`team:`, `env:`, `service:`, `cost_center:`) determinan las políticas de acceso, los tableros y la atribución de facturación. Los controles de acceso aplican el aislamiento entre grupos cuando es necesario.

### Capacidades de una topología de organización única {#capabilities-of-a-single-org-topology}
Una organización única le brinda:

- **Observabilidad conectada:** Las trazas distribuidas fluyen de extremo a extremo a través de los servicios sin brechas. Las vistas correlacionadas entre métricas, registros y trazas funcionan sin personalización adicional.
- **Una superficie de configuración:** Los monitores, tableros, pipelines y SLO residen en un solo lugar, sin duplicación ni desviaciones.
- **Gestión de usuarios centralizada:** Solo necesita una configuración de SSO, una integración [SCIM][11] y un conjunto de roles y equipos.
- **Visibilidad de costos por equipo:** La atribución de uso desglosa el gasto por equipo, servicio o unidad de negocio mediante etiquetas, por lo que no necesita organizaciones separadas para vistas de facturación independientes.
- **Bajo costo operativo:** Una sola organización no requiere módulos de Terraform por organización, soluciones alternativas entre organizaciones ni enrutamiento de alertas duplicado.

**Ejemplo:** Una gran empresa de tecnología con 5,000 usuarios de Datadog en 12 unidades de negocio utiliza una sola organización. Cada unidad de negocio tiene un Team con restricciones de control de acceso discrecional sobre su telemetría. Los administradores de la plataforma tienen un rol global. Los ingenieros de las unidades de negocio solo ven los datos de su equipo.

### Control de acceso dentro de una sola organización {#access-control-within-a-single-organization}

La mayoría de las organizaciones pueden cumplir con sus requisitos mediante los controles de acceso de una sola organización. [RBAC][3], [Data Access Control][4], [Granular Access Control][6], [Teams][7] y [listas de permitidos de IP][10] aplican una estricta segregación de datos dentro de una sola organización, incluso en industrias reguladas.

Para obtener una guía de implementación detallada, consulte la [documentación de control de acceso][3].

### Limitaciones {#limitations}

Todos los usuarios dentro de una organización pueden ver la funcionalidad principal, como la infraestructura. No todos los tipos de telemetría admiten restricciones a nivel de fila. Consulte los [tipos de telemetría admitidos][5] para ver la lista completa.

## Topología de múltiples organizaciones {#multi-organization-topology}

Utilice múltiples organizaciones cuando una sola organización con controles de acceso no pueda satisfacer un requisito estricto, o cuando entidades de facturación separadas requieran una facturación independiente. Los siguientes cinco escenarios califican.

### Escenario 1: Aislamiento de datos normativo o contractual {#scenario-1-regulatory-or-contractual-data-isolation}

_¿La ubicación conjunta de estos datos en la misma organización violaría una regulación o contrato, incluso con restricciones de acceso basadas en equipos?_

Algunas regulaciones requieren que los datos nunca coexistan en el mismo límite lógico. El requisito no es que los usuarios no puedan ver los datos, sino que los datos no pueden compartir la misma organización. Si su equipo de cumplimiento o sus auditores externos requieren una separación física a nivel de organización (no restricciones a nivel de fila), usar múltiples organizaciones es la opción correcta.

Utilice múltiples organizaciones: una por carga de trabajo regulada, una por región requerida (por ejemplo, una región europea) y una para todo lo demás. [Cross-Organization Visibility][2] conecta las organizaciones para paneles operativos utilizando métricas consolidadas. La organización regulada tiene políticas de acceso, listas de permitidos de IP y controles de auditoría más estrictos.

**Ejemplo:** Una empresa de servicios financieros separa la telemetría de su plataforma de negociación (sujeta a los requisitos de manejo de datos de la SEC/FINRA) en una organización dedicada. Todas las demás unidades de negocio comparten la organización principal.

### Escenario 2: Cumplir con los requisitos de residencia de datos {#scenario-2-meet-data-residency-requirements}

_¿Está prohibida la transferencia de datos entre regiones para estos datos?_

Cuando las regulaciones prohíben que la telemetría salga de una región geográfica, usted necesita organizaciones en diferentes sitios de Datadog (por ejemplo, US1, EU1, AP1).

### Escenario 3: Aislar datos entre equipos {#scenario-3-firewall-data-between-teams}

_¿Es un riesgo si un equipo ve alguna traza de los datos de otro equipo?_

Los controles de acceso de Datadog restringen las fuentes más comunes de datos confidenciales. Estos no admiten una separación completa mediante firewall de todos los datos de telemetría o metadatos de activos. Si sus requisitos exigen cero mezcla de datos, utilice organizaciones separadas.

### Escenario 4: Aislar clientes de MSP {#scenario-4-isolate-msp-customers}

_¿Necesita facturación, límites de datos y grupos de usuarios separados por cliente?_

Los proveedores de servicios administrados (MSP) que atienden a múltiples clientes externos generalmente necesitan que cada cliente esté en una organización aislada con facturación, datos y gestión de usuarios independientes. El [modelo de organización padre-hijo][1] de Datadog admite este patrón.

Utilice una organización principal para las operaciones internas del MSP, con organizaciones secundarias por cliente. Cada organización secundaria tiene datos, usuarios y facturación aislados. La organización principal proporciona vistas operativas centralizadas a través de [Cross-Organization Visibility][2].

**Ejemplo:** Un proveedor de infraestructura administrada con más de 200 clientes crea una organización secundaria por cliente. El equipo de NOC de la organización principal monitorea el estado del servicio en todas las organizaciones de los clientes con paneles de control entre organizaciones.

### Escenario 5: Integrar una empresa adquirida {#scenario-5-integrate-an-acquired-company}

_¿Está integrando una empresa adquirida que ya tiene su propia organización de Datadog?_

Las fusiones y adquisiciones a menudo crean estados temporales de múltiples organizaciones. La organización de la empresa adquirida permanece activa durante la integración mientras usted prepara la organización de destino con los controles de acceso, equipos y configuraciones adecuados. El objetivo es la consolidación en una sola organización una vez que los controles de acceso y las herramientas de migración estén implementados. Para obtener orientación sobre la consolidación, comuníquese con su equipo de cuenta.

**Ejemplo:** Después de adquirir una empresa de SaaS, una compañía conecta ambas organizaciones con [Cross-Organization Visibility][2] para obtener visibilidad operativa inmediata. Luego, la empresa ejecuta una consolidación gradual durante tres a seis meses.

## Decida su topología {#decide-your-topology}

| Escenario | Topología de la organización |
| :---- | :---- |
| Una regulación o contrato requiere que los datos existan en un límite de organización físicamente separado. | Múltiples organizaciones |
| La transferencia de datos entre regiones está prohibida para parte de su telemetría. | Múltiples organizaciones |
| Su política de seguridad requiere cero mezcla de datos entre equipos, incluso con [RBAC][3], [Data Access Control][4] y [Granular Access Control][6] implementados. | Múltiples organizaciones |
| Usted presta servicios a clientes externos que necesitan facturación, datos y grupos de usuarios separados. | Multi-organización (MSP) |
| Usted está integrando una empresa adquirida que ya tiene su propia organización de Datadog. | Multi-organización temporal |
| Ninguna de las anteriores | Organización única |

### Comparar capacidades de la organización {#compare-org-capabilities}

En el siguiente gráfico, "sin cambios" indica que Organization Groups no introduce nuevas capacidades.

| Capacidad | Organización única | Multi-organización | Con Organization Groups |
| :---- | :---- | :---- | :---- |
| Trazas distribuidas de extremo a extremo | Completas | No pueden cruzar los límites entre organizaciones | Sin cambios |
| Datos de telemetría | Completo | Comparta métricas, registros y datos de CI en paneles con [Cross-Organization Visibility][2] | Sin cambios |
| Paneles (métricas, registros, trazas) | Completo | Comparta [paneles compartidos solo por invitación][9] con miembros de otra organización | Sin cambios |
| Alertas de seguimiento entre fuentes de datos | Completo | No se puede evaluar el seguimiento entre organizaciones | Sin cambios |
| SLOs entre servicios | Completo | No pueden extenderse a varias organizaciones | Sin cambios |
| Gestión de usuarios | Una integración | [SCIM][11] separado por organización | Centralizado desde el grupo |
| RBAC y roles personalizados | Una configuración | Debe duplicarse por organización | Centralizado desde el grupo |
| SSO / SAML | Una configuración ([multi-SAML][8] admite múltiples IdPs) | SAML separado por organización | Sin cambios |
| Facturación y uso | Atribución de uso por organización | Datadog agrega el uso en todas las organizaciones secundarias y lo factura al nivel de la organización principal | Sin cambios |
| Lanzamiento de funciones | Inmediato | Debe habilitarse por organización | Centralizado desde el grupo |

Si su caso de uso requiere múltiples organizaciones, consulte [Organization Groups][12] para una gobernanza centralizada en todas las organizaciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/multi_organization/
[2]: /es/account_management/org_settings/cross_org_visibility/
[3]: /es/account_management/rbac/
[4]: /es/account_management/rbac/data_access/
[5]: /es/account_management/rbac/data_access/#supported-telemetry
[6]: /es/account_management/rbac/granular_access/
[7]: /es/account_management/teams/
[8]: /es/account_management/saml/
[9]: /es/dashboards/sharing/shared_dashboards/#invite-only-shared-dashboards
[10]: /es/account_management/org_settings/ip_allowlist/
[11]: /es/account_management/scim/
[12]: /es/account_management/organization_groups/