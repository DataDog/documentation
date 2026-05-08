---
aliases:
- /es/service_management/incident_management/incident_settings/information/
title: Información
---

## Información general

Desde la página de [Información de configuración de incidentes][1], puedes personalizar los estados y la gravedad de tus incidentes y activar las funciones principales para incidente, como incidentes privados, incidentes de test y anulaciones de fecha y hora.

## Niveles de gravedad

 {{< img src="/service_management/incidents/incident_settings/settings_info_severity_levels.png" alt="Niveles de gravedad personalizables en la configuración del incidente" style="width:100%;" >}}

Utiliza la configuración del nivel de gravedad para:

1. Define tu gravedad más crítica como `SEV-0` o `SEV-1` (por defecto `SEV-1`)
2. Personalizar las subetiquetas de las gravedades (**Por defecto:** Crítica, Alta, Moderada, Baja, Menor)
3. Personaliza las descripciones de tus gravedades
4. Añade o elimina gravedades desde el final de tu lista, con un mínimo de una y un máximo de diez
5. Activar la gravedad "Desconocido"

**Nota**: Si intentas eliminar una gravedad a la que se hace referencia en una [regla de notificación][2], se te pedirá que confirmes tu decisión. Si decides continuar, se desactivarán las reglas de notificación afectadas, ya que dejarán de ser válidas. La eliminación de una gravedad o el cambio de la gravedad inicial no actualiza automáticamente ninguna consulta de [Incident Management Analytics][3].

## Niveles de estado

{{< img src="/service_management/incidents/incident_settings/settings_info_status_levels.png" alt="Niveles de estado personalizables en la configuración del incidente" style="width:100%;" >}}

Utiliza la configuración de nivel de estado para:

1. Personalizar las descripciones de los estados
2. Activar el estado opcional `Completed` 

**Nota**: La eliminación del estado `Completed` no actualiza automáticamente los incidentes en el estado `Completed` y no actualiza automáticamente ninguna consulta de [Incident Management Analytics][3] que haga referencia explícita al mismo. Cualquier regla de notificación que haga referencia al estado `Completed` se desactiva.

## Texto auxiliar

{{< img src="/service_management/incidents/incident_settings/settings_info_helper_text.png" alt="Configuración del texto auxiliar de Declarar incidente" style="width:100%;">}}

El texto auxiliar aparece junto al [Modal de creación de incidentes][4] y ayuda a tus respondedores a entender cómo deben definir el incidente.

Puedes utilizar markdown en el texto auxiliar para añadir listas con sangría, texto formateado e hipervínculos a otros recursos.

## Incidentes privados (visibilidad del incidente)

_Por defecto: desactivado_

La **visibilidad** de un incidente determina qué usuarios de tu organización de Datadog pueden verlo. Si la visibilidad del incidente es **organización**, cualquier usuario con permiso **Lectura de incidentes** puede verlo. Si la visibilidad del incidente es **privada**, solo podrán verla los respondedores del incidente o los usuarios con el permiso **Acceso global a incidentes privados**.

En la [página de incidentes de Datadog][5], puedes buscar incidentes privados utilizando la faceta **Visibilidad** de la izquierda. También puedes añadir condiciones en torno a la visibilidad del incidente al definir [reglas de notificación][2] del incidente.

### Incidentes privados en Slack

Al declarar incidentes privados, Datadog crea canales privados de Slack en lugar de canales públicos.

Si conviertes un incidente en privado, Datadog archiva el canal de incidentes existente, crea un nuevo canal privado y añade a él todos los respondedores existentes.

Para convertir un incidente en privado en Slack, utiliza `/datadog incident private`.

## Eliminación del incidente

_Por defecto: desactivado_

Cuando la eliminación del incidente está habilitada para un tipo de incidente, cualquier usuario con el permiso **Escritura de incidentes** puede eliminar cualquier incidente del tipo de incidente.

Una vez eliminado un incidente, ya no influye en los análisis del incidente y ningún usuario puede acceder a él. Los incidentes eliminados no se pueden recuperar.

## Anular las marcas de tiempo de estado

_Por defecto: desactivado_

Cuando se habilitan las anulaciones de fecha y hora en un tipo de incidente, cualquier usuario con el permiso **Escritura de incidente** puede definir anulaciones de fecha y hora en cualquier incidente de ese tipo de incidente.

Cuando está activada, puedes definir anulaciones para las marcas de tiempo `declared`, `detected` y `resolved` en un incidente. Para obtener más información, consulta [Incident Analytics][3].

## Incidentes de test

_Por defecto: desactivado_

Cuando los incidentes de test están habilitados en un tipo de incidente, cualquier usuario con el permiso **Escritura de incidentes** puede declarar incidentes de test del tipo de incidente.

Los incidentes de test se distinguen visualmente por un banner morado. Por defecto, los incidentes de test no aparecen en la búsqueda del incidente, no ejecutan automatizaciones, no ejecutan reglas de notificación ni afectan a los análisis. El declarante puede optar por estas funciones durante la declaración.

[1]: https://app.datadoghq.com/incidents/settings#Information
[2]: /es/incident_response/incident_management/incident_settings/notification_rules
[3]: /es/incident_response/incident_management/analytics
[4]: /es/incident_response/incident_management/#from-the-incidents-page
[5]: https://app.datadoghq.com/incidents