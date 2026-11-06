---
disable_toc: false
title: Viaje imposible
---
## Descripción general {#overview}

El método de viaje imposible detecta accesos desde diferentes ubicaciones cuya distancia es mayor que la distancia que un humano puede recorrer en el tiempo transcurrido entre los dos eventos de acceso.

Consulte [Crear regla][1] para obtener instrucciones detalladas sobre cómo crear una regla de viaje imposible.

## Cómo funciona el método de viaje imposible {#how-the-impossible-travel-method-works}

### Ubicaciones de usuario base {#baseline-user-locations}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="Una regla de viaje imposible con la opción de ubicaciones base resaltada" style="width:100%;" >}}

Cuando configura una consulta para su regla de viaje imposible, puede habilitar {{< ui >}}Baseline User Locations{{< /ui >}} si desea que Datadog aprenda las ubicaciones comunes de cada usuario antes de que la regla comience a crear señales.

#### Ubicaciones de usuario base deshabilitadas {#baseline-user-locations-disabled}

Cuando {{< ui >}}Baseline User Locations{{< /ui >}} está deshabilitado (predeterminado):

- Cada registro se evalúa para determinar si contiene una ubicación a la que es imposible viajar desde una ubicación ya encontrada.

- El viaje es imposible entre dos ubicaciones si la velocidad de viaje es superior a 1000 km/h y la distancia es mayor que 500 km.

#### Ubicaciones de usuario base habilitadas {#baseline-user-locations-enabled}

Cuando {{< ui >}}Baseline User Locations{{< /ui >}} está habilitado:

- Existe un período de aprendizaje de 24 horas para cada usuario. Durante este tiempo, Datadog aprende las ubicaciones comunes (ciudad y país) de cada usuario y no se crean señales.
- Las ubicaciones encontradas se olvidan después de 30 días si no se han vuelto a encontrar.
- Si se encuentra una nueva ubicación, Datadog:
    - Verifica si la ubicación es una de las ubicaciones comunes. Si es una de las ubicaciones comunes, Datadog pasa al siguiente registro o evento.
    - Verifica si es una situación de viaje imposible.
        - Si no es una situación de viaje imposible, Datadog pasa al siguiente registro o evento.
        - Si es una situación de viaje imposible, Datadog verifica si existe un patrón de transición de IP. Por ejemplo, si un usuario viaja de la ubicación A a la ubicación B y ese patrón de viaje ha ocurrido en el pasado, no se activa una señal.

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=impossible_travel