---
disable_toc: false
title: Viaje imposible
---

## Información general

El método de viaje imposible detecta accesos desde diferentes localizaciones cuya distancia es mayor que la distancia que puede recorrer un humano en el tiempo que transcurre entre los dos eventos de acceso. Consulte [Crear regla][1] para obtener instrucciones detalladas sobre cómo crear una regla de viaje imposible.

## Funcionamiento del método de viaje imposible

### Localizaciones de usuario de referencia

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="Consulta de una regla de viaje imposible con la opción de localizaciones de referencia resaltada" style="width:100%;" >}}

Cuando configures una consulta para tu regla de viaje imposible, puedes activar **Localizaciones de usuario de referencia** si quieres que Datadog aprenda las localizaciones habituales de cada usuario antes de que la regla comience a crear señales.

#### Localizaciones de usuario de referencia desactivadas

Cuando la opción **Baseline User Locations** (Localizaciones de usuario de referencia) está desactivada (por defecto):

- Cada log se evalúa para ver si contiene una localización a la que sea imposible llegar desde una localización ya encontrada.

- Es imposible viajar entre dos localizaciones si la velocidad de desplazamiento es superior a 1.000 km/h y la distancia es superior a 500 km.

#### Localizaciones de usuario de referencia activadas

Cuando la opción **Baseline User Locations** (Localizaciones de usuario de referencia) está activada:

- Hay un periodo de aprendizaje de 24 horas para cada usuario. Durante este tiempo, Datadog aprende las localizaciones habituales (ciudad y país) de cada usuario y no se crean señales.
- Las localizaciones encontradas se olvidan al cabo de 30 días si no se han vuelto a encontrar.
- Si se encuentra una nueva localización, Datadog:
    - Comprueba si la localización es una de las localizaciones habituales. Si lo es, Datadog pasa al siguiente log o evento.
    - Comprueba si se trata de una situación de viaje imposible.
        - Si no lo es, Datadog pasa al siguiente log o evento.
        - Si se trata de una situación de viaje imposible, Datadog comprueba si existe un patrón de transición IP. Por ejemplo, si un usuario viaja de la localización A a la localización B y ese patrón de viaje se ha producido en el pasado, no se activa una señal.

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule