---
description: Aprenda cómo funciona el nuevo método de detección de valores.
title: Nuevo valor
---
## Descripción general {#overview}

El nuevo método de detección de valores alerta cuando aparecen en sus registros valores de atributos que no se habían visto antes, como un nuevo usuario, cuenta, clave de API o ID de objeto.

Consulte [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de nuevo valor.

## Cómo funciona el nuevo método de detección de valores {#how-the-new-value-detection-method-works}

Una regla de detección de nuevo valor:

- Aprende los valores de los campos que ha seleccionado, como `@userIdentity.arn`.
- Aprende registrando valores durante un período de aprendizaje o utiliza un método de umbral que no requiere un período de aprendizaje. Consulte [Duración del aprendizaje](#learning-duration) para obtener más información.
- Activa una señal cuando aparece un valor que no se ha observado dentro del contexto actual.
- Olvida un valor aprendido si el valor no se ha observado durante el número de días establecido en la opción [Olvidar valor](#forget-value). Si el valor se ha olvidado, la regla envía una alerta cuando el valor vuelve a aparecer.

### Opciones de configuración {#configuration-options}

#### Detectar nuevos valores {#detect-new-values}

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="Consulta de una regla de nuevo valor con la configuración de detección de nuevo valor resaltada" style="width:100%;" >}}

El campo {{< ui >}}Detect new value{{< /ui >}} define los atributos que contienen los valores que se deben aprender. Puede agregar hasta cinco atributos.

#### Campos de agrupación {#group-by-fields}

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="Campo de agrupación de la consulta de una regla de nuevo valor resaltado" style="width:100%;" >}}

El campo `group by` define el contexto dentro del cual se evalúan los nuevos valores, como por cuenta.

#### Duración de aprendizaje {#learning-duration}

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="Consulta de una regla de nuevo valor con el ajuste de duración de aprendizaje resaltado" style="width:100%;" >}}

La duración de aprendizaje tiene las siguientes opciones:
- {{< ui >}}for all new values{{< /ui >}}: La regla se activa con cualquier valor nuevo.
- {{< ui >}}after the first seen value{{< /ui >}}: La regla se activa con cualquier valor nuevo después de que el valor se haya observado una vez.
- {{< ui >}}after{{< /ui >}}: Defina la duración durante la cual la regla aprende los valores para los campos seleccionados. Por ejemplo, si selecciona {{< ui >}}after 7 days{{< /ui >}}, la regla aprende los valores durante los primeros siete días y luego se activa con cualquier valor nuevo después de los siete días. La duración máxima de aprendizaje es de 30 días.

#### Olvidar valor {#forget-value}

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="Sección de otros parámetros de una regla de nuevo valor que muestra la opción de olvidar después" style="width:40%;" >}}

La opción [Forget value][2] determina cuánto tiempo mantiene la regla un valor como conocido. Después de que transcurre este período, el valor se olvida y la regla vuelve a alertar sobre el valor. El número máximo de días para {{< ui >}}Forget value{{< /ui >}} es 30 días.

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value
[2]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value&cloud_siem_detection_rule_type=real_time_rule#forget-value-rt-new-value