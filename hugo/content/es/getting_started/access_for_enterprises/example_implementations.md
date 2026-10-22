---
description: Plantillas de implementación de Access Control empresarial para cuatro
  arquetipos organizacionales comunes.
further_reading:
- link: /account_management/rbac/
  tag: Documentación
  text: Access Control (RBAC)
- link: /account_management/rbac/data_access
  tag: Documentación
  text: Data Access Control
- link: /account_management/rbac/granular_access
  tag: Documentación
  text: Granular Access Control
- link: /getting_started/teams/
  tag: Documentación
  text: Primeros pasos con Teams
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: Documentación
  text: Proveedor de Terraform de Datadog
title: Ejemplos de implementaciones
---
## Descripción general {#overview}

Estas cuatro plantillas de implementación muestran cómo se ve una estrategia de acceso completamente implementada, incluidos qué mecanismos están en uso, cómo se estructuran los roles y los Teams, y cómo funcionan las capas en conjunto. Representan arquetipos de organización comunes, no empresas específicas. Úselas como punto de partida para su propia implementación.

## Elija su plantilla {#choose-your-template}

Utilice las siguientes preguntas para identificar qué patrones son más relevantes para usted:

| Pregunta | Si la respuesta es sí, consulte... |
| :---- | :---- |
| **¿Tiene datos regulados que deben ser invisibles para ciertos grupos de usuarios?** | [Plantilla 1 (Financiera)](#template-1-large-financial-institution)<br>[Plantilla 2 (Multi-BU regulada)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **¿Tiene límites de cumplimiento estrictos que requieren un aislamiento completo de datos entre divisiones?** | [Plantilla 2 (Multi-BU regulada)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **¿Tiene un gran volumen de claves de API y muchas canalizaciones de automatización?** | [Plantilla 3 (Gran empresa tecnológica)](#template-3-large-technology-company) |
| **¿Presta servicios a múltiples inquilinos internos o clientes en una plataforma compartida?** | [Plantilla 4 (Proveedor de plataforma)](#template-4-government-agency--platform-provider) |
| **¿Gestiona la configuración a través de Terraform o herramientas de IaC similares?** | [Plantilla 4 (Proveedor de plataforma)](#template-4-government-agency--platform-provider) |
| **¿Opera muchas organizaciones y necesita Access Control consistente en todas ellas?** | [Plantilla 4 (proveedor de la plataforma)](#template-4-government-agency--platform-provider) |

## Plantilla 1: Gran institución financiera {#template-1-large-financial-institution}

### Perfil {#profile}

Una empresa global de servicios financieros con 15,000 usuarios de Datadog en las divisiones de banca minorista, banca de inversión, gestión patrimonial y seguros. Opera en una única organización de Datadog con 150 Teams asignados a líneas de negocio. Sujeto a SOC 2, PCI DSS y múltiples reguladores financieros nacionales. Utiliza Okta para la identidad con aprovisionamiento SCIM.

### Estrategia de acceso {#access-strategy}

| Capa | Implementación |
| :---- | :---- |
| **Org structure** | Organización única con Data Access Control para la segregación de datos entre divisiones, preservando las capacidades de investigación de incidentes entre divisiones. |
| **Custom roles** | 5 roles: Solo lectura (auditors y Compliance), Usuario estándar (la mayoría de los ingenieros), Platform Admin, Usuario restringido (contratistas) y Trading Floor (acceso elevado a registros para datos regulados). Actualizaciones automáticas configuradas para seguir la plantilla de rol Estándar. |
| **Identidad** | SCIM desde Okta. Cada división tiene su propio grupo de Okta asignado a un Datadog Team. La asignación de roles se basa en la pertenencia al grupo de Okta, con revisiones de acceso trimestrales impulsadas por Compliance. |
| **Restricciones de datos** | Conjuntos de datos de Access Control de datos para los datos de negociación (`data_sensitivity:trading`) restringidos a los equipos de negociación y compliance. Conjunto de datos separado para datos etiquetados como PII (`data_sensitivity:pii`) restringido al equipo de Privacidad. Los datos que no están en un Conjunto de Datos Restringido permanecen **Sin restricciones** (el valor predeterminado). |
| **Protecciones de activos** | Todos los monitores de producción y tableros operativos restringidos al equipo propietario para el acceso de Edición. Un equipo de "Gobernanza de Plataforma" tiene acceso de Edición anulado en todos los activos. |
| **Claves y tokens** | Cuentas de servicio para cada canalización de CI/CD. Claves de aplicación limitadas a puntos finales de API específicos. Claves de API por equipo. Cadencia de rotación de 90 días para las claves de aplicación, aplicada a través de Terraform. |
| **Auditing** | Audit Trail habilitado con alertas sobre cambios de roles, creación de claves y modificaciones de políticas de Data Access Control. Informes de revisión de acceso trimestrales generados para los reguladores. |

### Conclusión clave {#key-takeaway}

Data Access Control permite a esta organización mantener una única org para la observabilidad conectada mientras mantiene límites de datos estrictos entre divisiones. El factor crítico de éxito es el etiquetado consistente en la ingesta. Sin `data_sensitivity` etiquetas confiables, Data Access Control no puede hacer cumplir los límites.

## Plantilla 2: Empresa regulada con múltiples unidades de negocio {#template-2-regulated-enterprise-with-multiple-business-units}

### Perfil {#profile-1}

Un conglomerado multinacional con 8,000 usuarios de Datadog en 5 divisiones principales: aeroespacial y defensa, electrónica comercial, salud, transporte y energía. Cada división tiene su propio régimen de Compliance (ITAR para defensa, HIPAA para salud, SOX para energía). Opera a través de 12 orgs de Datadog organizadas bajo una org principal. Utiliza Entra ID (Azure AD) con mapeo SAML y SCIM complementario.

### Estrategia de acceso {#access-strategy-1}

| Capa | Implementación |
| :---- | :---- |
| **Estructura de la org** | 12 orgs secundarias. La división de defensa requiere un aislamiento de datos completo incluso para los metadatos, lo que justifica una org separada. Otras divisiones comparten orgs por región y función empresarial. Org principal utilizada para la facturación centralizada y Dashboards ejecutivos a través de Cross-Org Visibility. |
| **Custom roles** | Cada org secundaria tiene de 4 a 5 roles personalizados adaptados a sus requisitos de Compliance. La org de defensa utiliza un rol personalizado mínimo que elimina todos los permisos de escritura para el personal que no es de ingeniería. La organización de atención médica tiene un rol dedicado de Analista HIPAA con acceso a datos etiquetados como PHI. |
| **Identidad** | SAML de Entra ID, con políticas de Acceso Condicional por división. La división de defensa requiere MFA y atestación de dispositivos administrados. SCIM para la membresía de Teams. |
| **Restricciones de datos** | La organización de defensa utiliza la configuración **Restringido** para datos que no están en Conjuntos de datos restringidos. Todos los datos están ocultos de forma predeterminada y a los usuarios se les otorga acceso explícito a conjuntos de datos específicos. La organización de atención médica utiliza Data Access Control con la configuración predeterminada **Sin restricciones** y conjuntos de datos restringidos para telemetría etiquetada como PHI. Las divisiones comerciales utilizan Data Access Control con la configuración predeterminada **Sin restricciones** para la segregación de datos basada en servicio. |
| **Protecciones de activos** | Cada organización administra sus propias políticas de acceso a activos. Los Monitors de producción en las orgs de defensa y de atención médica están restringidos a Edit por el Teams propietario, además del equipo de seguridad de la división. |
| **Cross-org** | La organización matriz tiene habilitada la Cross-Org Visibility para Dashboards ejecutivos que muestran el estado del sistema en todas las divisiones. Grupos de organización (Preview) para centralizar políticas en orgs secundarias. |
| **Claves y tokens** | Todas las claves se administran a través de Terraform. La organización de defensa utiliza una canalización de Terraform reforzada con puertas de aprobación para cualquier cambio de clave o rol. Se utilizan cuentas de servicio exclusivamente. No hay claves de aplicación propiedad de humanos. |

### Conclusión clave {#key-takeaway-1}

La organización múltiple se justifica aquí debido a los estrictos límites de cumplimiento. Las regulaciones crean requisitos estrictos de aislamiento y residencia de datos. El uso de la configuración **Restringido** por parte de la división de defensa refleja el requisito de denegación predeterminada de su entorno regulatorio. La visibilidad entre organizaciones mantiene la funcionalidad de los informes centralizados sin comprometer el aislamiento.

## Plantilla 3: Gran empresa de tecnología {#template-3-large-technology-company}

### Perfil {#profile-2}

Una empresa de tecnología global con 12,000 usuarios de Datadog que ejecuta una plataforma de comercio y procesamiento de pagos a gran escala. Opera una única org que representa 20 líneas principales de productos. Utiliza un sistema de identidad propietario integrado con la Teams API y Terraform. Uso intensivo de API con más de 500 claves de aplicación activas y 200 cuentas de servicio.

### Estrategia de acceso {#access-strategy-2}

| Capa | Implementación |
| :---- | :---- |
| **Org structure** | Una sola org que representa 20 líneas principales de productos. Data Access Control y Teams proporcionan límites internos dentro de cada org. Dos orgs adicionales utilizadas para sandbox y entornos non-prod. |
| **Roles personalizados** | 5 roles personalizados, estandarizados en toda la empresa a través de módulos de Terraform: Solo lectura, Estándar, Plataforma, Administrador de la organización, Contratista. Actualizaciones automáticas habilitadas para los roles que no son de contratista. |
| **Identidad** | IdP propietario integrado con la Teams API y Terraform. La pertenencia a Teams se sincroniza cada noche desde el registro interno de propiedad de servicios. La asignación de roles se gestiona a través de un módulo de Terraform que lee desde el directorio central de empleados. |
| **Restricciones de datos** | Access Control estándar que separa las líneas de productos en tipos de telemetría de claves confidenciales (registros, RUM, costos en la nube). Conjuntos de datos restringidos creados según el servicio, con acceso entre equipos otorgado a través de asignaciones explícitas de conjuntos de datos. Los usuarios contratistas están restringidos a un conjunto limitado de servicios definidos en el contexto de su contrato. |
| **Protecciones de activos** | Todos los Monitors de producción están restringidos al Teams propietario. Los Dashboards son ampliamente visibles pero con edición restringida. Un Teams de "Platform SRE" tiene acceso de anulación para la respuesta a incidentes. |
| **Claves y tokens** | Una clave de API por Teams. Cuentas de servicio para toda la automatización. Claves de aplicación limitadas a operaciones de API específicas. Auditorías trimestrales para identificar y revocar claves no utilizadas. |

### Punto clave {#key-takeaway-2}

Las claves de API por Teams y las auditorías trimestrales son esenciales para gestionar la gobernanza a esta escala. Data Access Control, Teams y el acceso granular proporcionan límites dentro de la organización.

## Plantilla 4: Agencia gubernamental / Proveedor de plataforma {#template-4-government-agency-platform-provider}

### Perfil {#profile-3}

Una gran agencia gubernamental o proveedor de servicios gestionados con 5,000 usuarios de Datadog que opera una plataforma de observabilidad compartida para aproximadamente 200 agencias, departamentos o clientes internos. Opera 3 organizaciones de Datadog segmentadas por entorno (producción, staging, desarrollo), pero cada organización contiene datos de muchos clientes distintos que deben estar aislados entre sí. Utiliza Entra ID integrado a través de una CMDB de ServiceNow, con Terraform gestionando toda la configuración.

### Estrategia de acceso {#access-strategy-3}

| Capa | Implementación |
| :---- | :---- |
| **Estructura de la organización** | 3 organizaciones por entorno, no por cliente. La segmentación dentro de la organización a través de Teams y Data Access Control proporciona aislamiento de clientes. Esto evita la sobrecarga de gestión de más de 200 organizaciones separadas mientras se mantienen límites estrictos. |
| **Roles personalizados** | 5 roles: Solo lectura (auditores), Usuario estándar, Administrador de plataforma, Administrador de organización, Observador restringido (para las partes interesadas que necesitan visibilidad limitada de los datos de un solo inquilino). El rol de Administrador de plataforma incluye una anulación que evita las restricciones de activos basadas en Teams. |
| **Identidad** | Cadena de identidad compleja: Entra ID sincroniza grupos de usuarios con ServiceNow CMDB. Los registros de CMDB determinan la organización, el Teams y el rol de Datadog del usuario. Los cambios fluyen a través de los flujos de trabajo de aprobación de ServiceNow antes de aplicarse a Datadog con Terraform. El mapeo de atributos SAML proporciona el aprovisionamiento de inicio de sesión inicial. |
| **Restricciones de datos** | Data Access Control estándar con conjuntos de datos por agencia de inquilino, definidos por la etiqueta `agency`. El Teams de cada agencia tiene acceso solo a sus propios datos. El Teams de plataforma tiene acceso a datos a nivel de infraestructura en todos los inquilinos para la planificación de la capacidad y la respuesta a incidentes. |
| **Asset protections** | Los Monitors y Dashboards de cada agencia están restringidos a su Teams para el acceso de edición. Los Monitors de infraestructura compartida críticos (network, DNS, shared compute) están restringidos al Teams de plataforma. Se incluye un Teams de anulación de administrador ("Gobernanza de plataforma") en todas las listas de acceso a activos para evitar bloqueos. |
| **Claves y tokens** | Todas las claves de API y cuentas de servicio se gestionan a través de Terraform con una puerta de aprobación de ServiceNow. Una clave de API por agencia para el envío de datos. Cuentas de servicio para pipelines de automatización compartidas. No se permiten claves de aplicación humanas. Todo el acceso a la API se realiza a través de cuentas de servicio con SAT. |
| **Gestión como código** | Todos los roles, Teams, Data Access Control datasets, políticas de acceso granular y claves se definen en Terraform. Los cambios pasan por una revisión de código y la aprobación de ServiceNow antes de aplicarse. Esto es esencial a esta escala: la configuración manual a través de 200 límites de inquilinos sería insostenible. |

### Punto clave {#key-takeaway-3}

La segmentación dentro de la organización (Teams + Data Access Control) puede reemplazar el aislamiento de múltiples organizaciones cuando los límites del inquilino son organizativos, no regulatorios. La cadena de identidad impulsada por CMDB y la configuración administrada por Terraform son necesarias a esta escala. El Teams de anulación del administrador es una red de seguridad crítica que debe establecerse antes de que se aplique cualquier restricción de activos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}