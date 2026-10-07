---
aliases:
- /es/security/cloud_security_management/severity_scoring/
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Comience a rastrear misconfigurations con Cloud Security Misconfigurations
- link: /security/cloud_security_management/identity_risks/
  tag: Documentación
  text: Comprenda su panorama de identidad con Cloud Security Identity Risks
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Aprenda más sobre Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifique y priorice visualmente los riesgos de seguridad utilizando Cloudcraft
title: Puntuación de severidad
---
Puntuaciones de severidad precisas ayudan a los equipos de seguridad a entender los riesgos que las vulnerabilidades representan para su entorno. Esta guía explica cómo Cloud Security utiliza diferentes medidas de severidad para calcular las puntuaciones.

## Marco de puntuación de severidad de Cloud Security {#cloud-security-severity-scoring-framework}

Cloud Security Misconfigurations, Cloud Security Identity Risks y Security Inbox Misconfigurations utilizan el marco de puntuación de severidad de Cloud Security para determinar la severidad de un hallazgo. El marco compara la probabilidad de que un adversario aproveche una configuración incorrecta con el riesgo que representa para su entorno. Al ponderar ambos aspectos, los hallazgos pueden ser priorizados de manera más precisa según los riesgos del mundo real. Las matrices a continuación muestran cómo se calcula la puntuación de severidad de una configuración incorrecta en función de su probabilidad de abuso e impacto.

### Probabilidad {#likelihood}

El componente de probabilidad se compone de dos subcomponentes:

* **Vector de ataque**: Los medios a través de los cuales se puede explotar una configuración incorrecta.
* **Accesibilidad**: Si el recurso es accesible públicamente o no.

#### Vector de ataque {#attack-vector}

El vector de ataque se determina por los siguientes criterios:

|    Vector de Ataque    |                                                              Definición                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Privilegios Requeridos |                                           Requiere privilegios o acceso específicos para abusar.                                           |
|    Vulnerabilidad    | Requiere un componente vulnerable para abusar, como una vulnerabilidad de software en una instancia de cómputo o una contraseña o clave de acceso filtrada. |
|  Sin Autorización   |                                        No requiere autorización ni autenticación para abusar.                                         |

#### Accesibilidad {#accessibility}

La accesibilidad se determina por los siguientes criterios:

| Accesibilidad |                              Definición                               |
|:-------------:|:---------------------------------------------------------------------:|
|    Privado    |     El componente o recurso vulnerable está en una red privada.     |
|    Público     | El componente o recurso vulnerable es accesible desde Internet. |

#### Puntuación de Probabilidad {#likelihood-score}

Juntos, el vector de ataque y la accesibilidad determinan la puntuación de probabilidad:

| Vector de Ataque           | Accesibilidad |                 |
|-------------------------|---------------|-----------------|
|                         | **Privado**   | **Público**      |
| **Privilegios Requeridos** | Improbable| Posible|
| **Vulnerabilidad**       | Posible| Probable|
| **Sin Autorización**    | Probable| Altamente Probable|

### Impacto{#impact}

El componente de impacto es cuán dañina sería la explotación de la configuración incorrecta para el entorno.

|  Impacto |                                                                                                                 Definición |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Bajo   | Esta configuración incorrecta está relacionada con el endurecimiento de la seguridad, la higiene, los metadatos de recursos o las configuraciones de mejores prácticas de la industria. Por sí sola, esta configuración incorrecta representa poco o ningún impacto en el entorno.                                                                                                             |
|  Medio  | Abusar de esta configuración incorrecta resulta en un impacto en la confidencialidad, integridad o disponibilidad del componente vulnerable o de sus recursos directamente asociados.                                                                   |
|   Alto   | Abusar de esta configuración incorrecta resulta en un impacto en la confidencialidad, integridad o disponibilidad del componente vulnerable y afecta a un número significativo de otros recursos. Por ejemplo, una identidad con la `S3FullAccess` política adjunta. |
| Crítico | Abusar de esta configuración incorrecta resulta en el control total de todos los recursos en la cuenta. Por ejemplo, una identidad con la `AdministratorAccess` política adjunta. |

### Matriz de puntuación de severidad {#severity-scoring-matrix}

Los componentes de probabilidad e impacto se utilizan para calcular la puntuación de severidad general de una configuración incorrecta.

| Probabilidad          | Impacto  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Bajo** | **Medio** | **Alto** | **Crítico** |
| **Improbable**      | Bajo     | Bajo        | Medio   | Medio       |
| **Posible**        | Bajo     | Medio     | Alto     | Alto         |
| **Probable**        | Medio  | Alto       | Alto     | Crítico     |
| **Altamente Probable** | Medio  | Alto       | Crítico | Crítico     |

### Ejemplos {#examples}

Para explicar cómo se utiliza el marco, aquí hay algunos ejemplos.

#### Ejemplo 1: El tema de SNS debe tener restricciones de acceso establecidas para la suscripción {#example-1-sns-topic-should-have-access-restrictions-set-for-subscription}

La regla de detección para [El tema de SNS debe tener restricciones de acceso establecidas para la suscripción][1] verifica si el tema de SNS tiene una política basada en recursos que contiene un `Principal` de `*`, y un `Action` con el permiso `sns:Subscribe`. Esta combinación le da a cualquiera la capacidad de suscribirse al tema de SNS y recibir sus notificaciones. 

Usando el marco de puntuación de severidad de seguridad en la nube, la regla se puntuaría de la siguiente manera:

- **Puntuación de probabilidad**: Altamente Probable
  - **Vector de ataque**: Sin Autorización
    - El Vector de Ataque está marcado como "Sin Autorización" porque la política basada en recursos contiene un `*`. Este comodín otorga a cualquiera la capacidad de actuar sobre el recurso. No se requiere autenticación ni autorización para explotar la configuración incorrecta.
  - **Accesibilidad**: Pública
    - La accesibilidad se marca como "Pública" porque la configuración incorrecta puede ser explotada a través de Internet mediante su política basada en recursos. No se requiere acceso a una red específica.
- **Impacto**: Medio
  - El impacto se marca como "Medio" debido a que la confidencialidad del recurso se ve afectada. Un adversario que explote esta configuración incorrecta puede recibir mensajes enviados por SNS Topic.
- **Puntuación de severidad**: Altamente Probable x Medio = Alto
  - La puntuación final de severidad es Alta. Esto se debe a que una probabilidad Altamente Probable combinada con un impacto Medio resulta en una puntuación general de Alta.

#### Ejemplo 2: Las instancias de EC2 deben hacer cumplir IMDSv2 {#example-2-ec2-instances-should-enforce-imdsv2}

La regla de detección para [las instancias de EC2 deben hacer cumplir IMDSv2][2] verifica si una instancia de EC2 está utilizando la Versión 1 del Servicio de Metadatos de Instancia ([IMDSv1][3]), que es vulnerable a ataques comunes de aplicaciones web. Si se explota, un adversario puede obtener acceso a las credenciales de IAM almacenadas en el IMDS y usarlas para acceder a recursos en la cuenta de AWS.

Usando el marco de puntuación de severidad de Cloud Security, la regla se puntuaría de la siguiente manera:

- **Puntuación de probabilidad**: Posible
  - **Vector de ataque**: Vulnerabilidad
    - El vector de ataque se marca como "Vulnerabilidad". Esto se debe a que la explotación de esta configuración incorrecta requiere que el recurso contenga un componente vulnerable, como software vulnerable que se ejecute en la instancia de EC2 y que pueda ser abusado para realizar ataques de [forzado de solicitud del lado del servidor][4].
  - **Accesibilidad**: Privada
    - La accesibilidad se marca como "Privada", porque la instancia de EC2 no ha sido explícitamente hecha pública.
- **Impacto**: Medio
  - El impacto se marca como "Medio" debido a los impactos en la confidencialidad de la instancia de EC2. Un adversario podría acceder al IMDS y potencialmente obtener credenciales de IAM asociadas con el recurso.
- **Puntuación de severidad**: Posible x Medio = Medio
  - La puntuación final de severidad es "Medio". Esto se debe a que una posible probabilidad combinada con un impacto Medio resulta en una puntuación general de Medio.

## CVSS 4.0 {#cvss-40}

Cloud Security Vulnerabilities utiliza el Common Vulnerability Scoring System version 4.0 ([CVSS 4.0][5]) y recurre a versiones anteriores (3.1, 3.0, 2) en ausencia de puntuación 4.0 para determinar una puntuación base para una vulnerabilidad. Luego modifica la puntuación base para tener en cuenta lo siguiente:

- Si la infraestructura subyacente está en funcionamiento y cuán extendido es el impacto.
- El entorno en el que está funcionando la infraestructura subyacente. Por ejemplo, si el entorno no es de producción, la severidad se reduce.
- Si hay un exploit activo para una vulnerabilidad dada de fuentes como el [catálogo KEV de CISA][6].
- La probabilidad de explotación, calculada y verificada utilizando [EPSS][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/security/default_rules/aws-sns-topic-sns-topic-should-have-access-restrictions-set-for-subscription/
[2]: https://docs.datadoghq.com/es/security/default_rules/aws-ec2-instance-ec2-instances-and-autoscaling-groups-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v4-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/