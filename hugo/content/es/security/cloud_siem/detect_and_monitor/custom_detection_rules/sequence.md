---
description: Aprenda cómo funciona el método de detección de secuencias.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsando la innovación en las operaciones de seguridad'
title: Secuencia
---
## Descripción general {#overview}

El método de secuencia le permite detectar ataques de varias etapas mediante la identificación de patrones ordenados de eventos relacionados, como el acceso inicial, la escalada de privilegios y la exfiltración de datos.

Puede definir una secuencia de pasos que deben ocurrir dentro de un marco de tiempo definido y a través de entidades relacionadas, como un usuario, un servidor o una dirección IP. Cada secuencia puede combinar condiciones de múltiples registros o señales para identificar actividades coordinadas que podrían pasar desapercibidas para las reglas individuales.

Consulte [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de secuencia.

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="Página del editor de secuencias que muestra una vista previa de los pasos" style="width:100%;" >}}

## Cómo funciona el método de secuencia {#how-the-sequence-method-works}

### Lógica de detección {#detection-logic}

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="Página del editor de secuencias que muestra tres pasos" style="width:100%;" >}}

La detección de secuencias evalúa una serie definida de pasos que representan etapas distintas de comportamiento sospechoso. Cada paso corresponde a:

- Una condición, como un umbral en una consulta de registro o una coincidencia de señal
- Transiciones que definen el orden y las restricciones de tiempo entre los pasos

La regla se activa cuando todos los pasos ocurren en el orden especificado y dentro de los intervalos de tiempo configurados.

### Vinculación de entidades {#linking-entities}

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="Página del editor de secuencias que muestra un paso con el campo de agrupación resaltado" style="width:100%;" >}}

La secuencia de pasos se puede correlacionar entre usuarios, cuentas, direcciones IP y otros campos para rastrear automáticamente las entidades vinculadas a través de campos `group by`. Esto le permite seguir la ruta de un atacante a través de diferentes identidades y sistemas.

### Ventana de evaluación {#evaluation-window}

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="Página del editor de secuencias que muestra la ventana de evaluación resaltada" style="width:100%;" >}}

Cada transición entre pasos tiene una ventana de evaluación configurable que determina cuánto tiempo espera la regla a que ocurra el siguiente paso. Por ejemplo, una regla podría activarse cuando a `user login from an unusual location` le sigue en un plazo de 20 minutos un `privilege escalation`, donde el usuario podría haber pasado de un rol estándar a un rol de administrador.

## Opciones de configuración {#configuration-options}

Cuando [crea una regla de detección de secuencias][1], puede configurar estas opciones:

| Configuración | Descripción | Impacto |
|---------|-------------|--------|
| {{< ui >}}Data type{{< /ui >}} | Especifique si cada consulta evalúa registros, señales o reglas. | Define las fuentes de datos para la detección. |
| {{< ui >}}Steps{{< /ui >}} | Defina cada condición de detección, incluyendo la consulta y el umbral. | Determina qué comportamientos se monitorean. |
| {{< ui >}}Step transitions{{< /ui >}} | Defina el orden y la relación temporal entre los pasos. | Controla cuándo una secuencia califica para una señal. |
| {{< ui >}}Evaluation window{{< /ui >}} | Después de que ha ocurrido un paso, el tiempo (en segundos) de espera para el siguiente paso. | Las ventanas más grandes aumentan la cobertura de detección, pero pueden resultar en más ruido. |
| {{< ui >}}Group by fields{{< /ui >}} | Campos utilizados para vincular la actividad entre pasos (por ejemplo, `@usr.email`, `@ip`). | Determina cómo se correlacionan las entidades entre las consultas. |

## Límites {#limits}

- La detección de secuencias admite hasta 10 pasos por regla y una ventana de evaluación total de 24 horas.
- Los pasos deben estar en una secuencia lineal.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=sequence