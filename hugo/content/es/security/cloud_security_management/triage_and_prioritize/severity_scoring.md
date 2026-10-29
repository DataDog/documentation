---
aliases:
- /es/security/cloud_security_management/severity_scoring/
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Comience a rastrear las configuraciones incorrectas con Cloud Security Misconfigurations
- link: /security/cloud_security_management/identity_risks/
  tag: Documentación
  text: Comprenda su panorama de identidad con Cloud Security Identity Risks
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Obtenga más información sobre Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifique y priorice visualmente los riesgos de seguridad mediante Cloudcraft
title: Puntuación de gravedad
---
Las puntuaciones de gravedad precisas ayudan a los equipos de seguridad a comprender los riesgos que las vulnerabilidades representan para su entorno. Esta guía explica cómo Cloud Security utiliza diferentes medidas de gravedad para calcular las puntuaciones.

## Marco de puntuación de gravedad de Cloud Security {#cloud-security-severity-scoring-framework}

Cloud Security Misconfigurations, Cloud Security Identity Risks y las configuraciones incorrectas de Security Inbox utilizan el marco de puntuación de gravedad de Cloud Security para determinar la gravedad de un hallazgo. El marco compara la probabilidad de que un adversario aproveche una configuración incorrecta con el riesgo que representa para su entorno. Al ponderar ambos aspectos, los hallazgos pueden priorizarse con mayor precisión según los riesgos del mundo real. Las matrices a continuación muestran cómo se calcula la puntuación de gravedad de una configuración incorrecta según su probabilidad de abuso e impacto.

### Probabilidad {#likelihood}

El componente de probabilidad se compone de dos subcomponentes:

* **Vector de ataque**: Los medios a través de los cuales se puede explotar una configuración incorrecta.
* **Accesibilidad**: Si el recurso es accesible públicamente o no.

#### Vector de ataque {#attack-vector}

El vector de ataque se determina mediante los siguientes criterios:

|    Vector de ataque    |                                                              Definición                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Privilegios requeridos |                                           Se requieren privilegios o acceso específicos para explotarla.                                           |
|    Vulnerabilidad    | Se requiere un componente vulnerable para explotarla, como una vulnerabilidad de software en una instancia de cómputo o una contraseña o clave de acceso filtrada. |
|  Sin autorización   |                                        No requiere autorización ni autenticación para ser explotado.                                         |

#### Accesibilidad {#accessibility}

La accesibilidad se determina mediante los siguientes criterios:

| Accesibilidad |                              Definición                               |
|:-------------:|:---------------------------------------------------------------------:|
|    Privado    |     El componente o recurso vulnerable se encuentra en una red privada.     |
|    Público     | El componente o recurso vulnerable es accesible desde internet. |

#### Puntuación de probabilidad {#likelihood-score}

En conjunto, el vector de ataque y la accesibilidad determinan la puntuación de probabilidad:

| Vector de ataque           | Accesibilidad |                 |
|-------------------------|---------------|-----------------|
|                         | **Privado**   | **Público**      |
| **Privilegios requeridos** | Improbable    | Posible        |
| **Vulnerabilidad**       | Posible      | Probable        |
| **Sin autorización**    | Probable      | Altamente probable |

### Impacto {#impact}

El componente de impacto es qué tan perjudicial sería para el entorno la explotación de la configuración incorrecta.

|  Impacto  |                                                                                                                 Definición                                                                                                                |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Bajo   | Esta configuración incorrecta está relacionada con el fortalecimiento de la seguridad, la higiene, los metadatos de recursos o las configuraciones de mejores prácticas de la industria. Por sí sola, esta configuración incorrecta tiene poco o ningún impacto en el entorno.                                                                                                             |
|  Medio  | Aprovechar esta configuración incorrecta afecta la confidencialidad, integridad o disponibilidad del componente vulnerable o de sus recursos directamente asociados.                                                                   |
|   Alto   | Aprovechar esta configuración incorrecta afecta la confidencialidad, integridad o disponibilidad del componente vulnerable y también a un número significativo de otros recursos. Por ejemplo, una identidad con la política `S3FullAccess` adjunta. |
| Crítico | Aprovechar esta configuración incorrecta permite controlar por completo todos los recursos de la cuenta. Por ejemplo, una identidad con la política `AdministratorAccess` adjunta. |

### Matriz de puntuación de gravedad {#severity-scoring-matrix}

Los componentes de probabilidad e impacto se utilizan para calcular la puntuación de gravedad general de una configuración incorrecta.

| Probabilidad          | Impacto  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Bajo** | **Medio** | **Alto** | **Crítico** |
| **Improbable**      | Bajo     | Bajo        | Medio   | Medio       |
| **Posible**        | Bajo     | Medio     | Alto     | Alto         |
| **Probable**        | Medio  | Alto       | Alto     | Crítico     |
| **Altamente probable** | Medio  | Alto       | Crítico | Crítico     |

### Ejemplos {#examples}

Para explicar cómo se utiliza el marco de trabajo, aquí hay algunos ejemplos.

#### Ejemplo 1: El tema de SNS debe tener restricciones de acceso establecidas para la suscripción {#example-1-sns-topic-should-have-access-restrictions-set-for-subscription}

La regla de detección para [El tema de SNS debe tener restricciones de acceso establecidas para la suscripción][1] verifica si el tema de SNS tiene una política basada en recursos que contiene un `Principal` de `*` y una `Action` con el permiso `sns:Subscribe`. Esta combinación le da a cualquiera la capacidad de suscribirse al tema de SNS y recibir sus notificaciones. 

Utilizando el marco de puntuación de gravedad de Cloud Security, la regla se calificaría de la siguiente manera:

- **Puntuación de probabilidad**: Altamente probable
  - **Vector de ataque**: Sin autorización
    - El vector de ataque se marca como "Sin autorización" porque la política basada en recursos contiene un `*`. Este comodín otorga a cualquier persona la capacidad de actuar sobre el recurso. No se requiere autenticación ni autorización para explotar la configuración incorrecta.
  - **Accesibilidad**: Pública
    - La accesibilidad se marca como "Pública" porque la configuración incorrecta se puede explotar a través de internet mediante su política basada en recursos. No se requiere acceso de red específico.
- **Impacto**: Medio
  - El impacto se marca como "Medio" porque la confidencialidad del recurso se ve afectada. Un adversario que explote esta configuración incorrecta puede recibir mensajes enviados por el tema de SNS.
- **Puntuación de gravedad**: Altamente probable x Medio = Alto
  - La puntuación de gravedad final es alta. Esto se debe a que una probabilidad clasificada como "Altamente probable", combinada con un impacto "Medio", da como resultado una puntuación general "Alta".

#### Ejemplo 2: los casos de EC2 deberían reforzar IMDSv2 {#example-2-ec2-instances-should-enforce-imdsv2}

La regla de detección [los casos de EC2 deberían reforzar IMDSv2][2] verifica si una instancia de EC2 utiliza Instance Metadata Service Version 1 ([IMDSv1][3]), que es vulnerable a ataques comunes de aplicaciones web. Si se explota, un adversario puede obtener acceso a las credenciales de IAM almacenadas en el IMDS y utilizarlas para acceder a recursos en la cuenta de AWS.

Utilizando el marco de puntuación de gravedad de Cloud Security, la regla se calificaría de la siguiente manera:

- **Puntuación de probabilidad**: Posible
  - **Vector de ataque**: Vulnerabilidad
    - El vector de ataque se marca como "Vulnerabilidad". Esto se debe a que, para explotar esta configuración incorrecta, el recurso debe contener un componente vulnerable, como software vulnerable que se ejecute en la instancia EC2 y que pueda aprovecharse para realizar ataques de [falsificación de solicitudes del lado del servidor][4].
  - **Accesibilidad**: Privada
    - La accesibilidad está marcada como "Privada", debido a que la instancia EC2 no se ha hecho pública explícitamente.
- **Impacto**: Medio
  - El impacto está marcado como "Medio" debido a los impactos en la confidencialidad de la instancia EC2. Un adversario podría acceder al IMDS y potencialmente obtener credenciales de IAM asociadas con el recurso.
- **Puntuación de gravedad**: Posible x Medio = Media
  - La puntuación de gravedad final es "Media". Esto se debe a que una probabilidad calificada como "Posible" combinada con un impacto "Medio" da como resultado una puntuación general "Media".

## CVSS 4.0 {#cvss-40}

Cloud Security Vulnerabilities utiliza la versión 4.0 del Common Vulnerability Scoring System ([CVSS 4.0][5]) y recurre a versiones anteriores (3.1, 3.0, 2) en ausencia de una puntuación 4.0 para determinar una puntuación base para una vulnerabilidad. Luego modifica la puntuación base para tener en cuenta lo siguiente:

- Si la infraestructura subyacente está en ejecución y qué tan amplio es el impacto.
- El entorno en el que se está ejecutando la infraestructura subyacente. Por ejemplo, si el entorno no es de producción, la gravedad se reduce.
- Si existe un exploit activo para una vulnerabilidad determinada, según fuentes como el [catálogo KEV de CISA][6].
- La probabilidad de explotación, calculada y verificada utilizando [EPSS][7].

### Gravedad desconocida {#unknown-severity}

Una vulnerabilidad tiene una gravedad **Desconocida** cuando ni el aviso del proveedor ni la [National Vulnerability Database (NVD)][8] proporcionan una puntuación CVSS. La gravedad desconocida es más común para:

- CVE que nunca recibieron una puntuación, lo cual es común entre las CVE muy antiguas.
- Vulnerabilidades de fuentes de avisos que no publican puntuaciones CVSS, como la base de datos de vulnerabilidades de Go.

Debido a que los ajustes basados en el riesgo de Datadog se aplican sobre la puntuación CVSS base, la gravedad de Datadog también es **Desconocida** en estos casos.

Puede asignar una gravedad a estos hallazgos creando una [regla de modificador de gravedad][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/security/default_rules/aws-sns-topic-sns-topic-should-have-access-restrictions-set-for-subscription/
[2]: https://docs.datadoghq.com/es/security/default_rules/aws-ec2-instance-ec2-instances-and-autoscaling-groups-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v4-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/
[8]: https://nvd.nist.gov/
[9]: /es/security/automation_pipelines/modify_severity/