---
aliases:
- /es/service_management/incident_management/incident_settings/information/
- /es/incident_response/incident_management/incident_settings/information
title: Información
---
## Descripción general {#overview}

Desde la página [Incident Settings Information][1], puede personalizar los estados y los niveles de gravedad de sus incidentes y habilitar capacidades principales de incidentes, como incidentes privados, incidentes de prueba y anulaciones de marcas de tiempo.

## Niveles de gravedad {#severity-levels}

 {{< img src="/incident_response/incident_management/setup_and_configuration/settings_info_severity_levels.png" alt="Niveles de gravedad personalizables en la configuración de incidentes" style="width:100%;" >}}

Utilice la configuración de niveles de gravedad para:

1. Definir su nivel de gravedad más crítico como `SEV-0` o `SEV-1` (el valor predeterminado es `SEV-1`)
2. Personalizar las subetiquetas de sus niveles de gravedad (**Valores predeterminados:** Critical, High, Moderate, Low, Minor)
3. Personalizar las descripciones de sus niveles de gravedad
4. Agregar o eliminar niveles de gravedad desde la parte inferior de su lista, con un mínimo de uno y un máximo de diez
5. Habilitar el nivel de gravedad "Unknown"

**Nota**: Si intenta eliminar un nivel de gravedad al que se hace referencia en una [regla de notificación][2], se le solicitará que confirme su decisión. Si decide continuar, se deshabilitan las reglas de notificación afectadas porque dejan de ser válidas. Eliminar un nivel de gravedad o cambiar el nivel de gravedad inicial no actualiza automáticamente ninguna consulta de [Incident Management Analytics][3].

## Niveles de estado {#status-levels}

{{< img src="/incident_response/incident_management/setup_and_configuration/settings_info_status_levels.png" alt="Niveles de estado personalizables en la configuración de incidentes" style="width:100%;" >}}

Utilice la configuración de niveles de estado para:

1. Personalizar las descripciones de los estados
2. Habilitar el estado opcional `Completed`

**Nota**: Eliminar el estado `Completed` no actualiza automáticamente los incidentes en el estado `Completed` y no actualiza automáticamente ninguna consulta de [Incident Management Analytics][3] que haga referencia explícita a él. Cualquier regla de notificación que haga referencia al estado `Completed` se deshabilita.

## Texto de ayuda {#helper-text}

{{< img src="/incident_response/incident_management/setup_and_configuration/settings_info_helper_text.png" alt="Configuración del texto de ayuda de Declare Incident" style="width:100%;">}}

El texto de ayuda aparece junto al [Incident Creation Modal][4] y ayuda a sus respondedores a entender cómo deben definir el incidente.

Puede usar markdown en el texto de ayuda para agregar listas con sangría, texto con formato e hipervínculos a otros recursos.

## Incidentes privados (visibilidad del incidente) {#private-incidents-incident-visibility}

_Predeterminado: deshabilitado_

La **visibilidad** de un incidente determina qué usuarios de su organización de Datadog pueden verlo. Si la visibilidad de un incidente es **organization**, cualquier usuario con el permiso **Incidents Read** puede verlo. Si la visibilidad del incidente es **private**, solo los respondedores del incidente o los usuarios con el permiso **Private Incidents Global Access** pueden verlo.

En la [página Incidents de Datadog][5], puede buscar incidentes privados usando la faceta **Visibility** a la izquierda. También puede agregar condiciones sobre la visibilidad de los incidentes al definir [reglas de notificación][2] de incidentes.

### Separar los incidentes de seguridad de los incidentes operativos {#separate-security-incidents-from-operational-incidents}

Para manejar los incidentes de seguridad por separado de los incidentes operativos, cree un tipo de incidente dedicado para ellos. Cada tipo de incidente tiene su propia configuración y automatizaciones de incidentes, por lo que puede ejecutar un flujo de trabajo que se aplique solo a los incidentes de seguridad.

Los tipos de incidentes no tienen sus propios controles de acceso. Para restringir quién puede ver los incidentes confidenciales, declárelos como incidentes privados.

### Incidentes privados en Slack {#private-incidents-in-slack}

Cuando declara incidentes privados, Datadog crea canales privados de Slack en lugar de canales públicos.

Si convierte un incidente en privado, Datadog archiva el canal del incidente existente, crea un nuevo canal privado y agrega a ese canal a todos los respondedores existentes.

Para convertir un incidente en privado en Slack, use `/datadog incident private`.

## Eliminación de incidentes {#incident-deletion}

_Predeterminado: deshabilitado_

Cuando la eliminación de incidentes está habilitada para un tipo de incidente, cualquier usuario con el permiso **Incidents Write** puede eliminar cualquier incidente de ese tipo.

Después de eliminar un incidente, este ya no influye en los análisis de incidentes y ningún usuario puede acceder a él. Los incidentes eliminados no se pueden recuperar.

## Anular marcas de tiempo de estado {#override-status-timestamps}

_Predeterminado: deshabilitado_

Cuando las anulaciones de marcas de tiempo están habilitadas para un tipo de incidente, cualquier usuario con el permiso **Incidents Write** puede definir anulaciones de marcas de tiempo en cualquier incidente de ese tipo.

Cuando está habilitado, puede definir anulaciones para las marcas de tiempo `declared`, `detected` y `resolved` en un incidente. Para obtener más información, consulte [Incident Analytics][3].

## Incidentes de prueba {#test-incidents}

_Predeterminado: deshabilitado_

Cuando los incidentes de prueba están habilitados para un tipo de incidente, cualquier usuario con el permiso **Incidents Write** puede declarar incidentes de prueba de ese tipo.

Los incidentes de prueba se distinguen visualmente por un banner morado. De forma predeterminada, los incidentes de prueba no aparecen en la búsqueda de incidentes, no ejecutan automatizaciones, no ejecutan reglas de notificación ni afectan los análisis. El declarante puede optar por estas funciones durante la declaración.

Para obtener más información, consulte [Uso de incidentes de prueba][6].

[1]: https://app.datadoghq.com/incidents/settings#Information
[2]: /es/incident_response/incident_management/setup_and_configuration/notification_rules
[3]: /es/incident_response/incident_management/analytics_and_reporting
[4]: /es/incident_response/incident_management/#from-the-incidents-page
[5]: https://app.datadoghq.com/incidents
[6]: /es/incident_response/incident_management/guides/test_incidents