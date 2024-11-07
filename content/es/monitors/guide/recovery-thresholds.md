---
aliases:
- /es/monitors/faq/what-are-recovery-thresholds
further_reading:
- link: /monitors/types/metric/
  tag: Documentación
  text: Monitor de métricas
kind: Guía
title: Umbrales de recuperación
---

## Definición

Los umbrales de recuperación son umbrales opcional añadidos a un monitor para indicar una condición adicional a la recuperación de un monitor de estados de alerta o advertencia.

## Comportamiento

El umbral de recuperación añade una condición a la recuperación del monitor, por lo que este sólo entra en estado recuperado una vez que ha **pasado** el umbral de recuperación. Si no se establece ningún umbral de recuperación, el monitor se recupera cuando dejan de cumplirse las condiciones de alerta.

El umbral de recuperación se satisface cuando se cumple la condición de recuperación. La condición de recuperación varía en función de la condición de alerta:

| Condición de alerta    | Condición de recuperación          |
|--------------------|-----------------------------|
| > umbral de alerta  | <= umbral de recuperación de alertas |
| >= umbral de alerta | < umbral de recuperación de alertas  |
| < umbral de alerta  | >= umbral de recuperación de alertas |
| <= umbral de alerta | > umbral de recuperación de alertas  |

## Caso práctico

Los umbrales de recuperación reducen el ruido de un monitor de flapping. Esto puede aumentar la confianza en que la métrica de alerta se recupere y el problema se resuelva tras la recuperación.

## ¿Cómo configurar los umbrales de recuperación?

### Interfaz de usuario del sitio web

Cuando crees un monitor, configura el umbral de recuperación de alertas o advertencias en **Set alert conditions** > **Advanced Options** (Configurar condiciones de alerta > Opciones avanzadas).

### API

Cuando [crees/edites un monitor a través de la API][1], utiliza los atributos `critical_recovery` y `warning_recovery` en el atributo `options.thresholds` de tu monitor JSON:

```text
"thresholds": {
                "critical": 80,
                "warning": 60,
                "critical_recovery": 70,
                "warning_recovery": 50
              }
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/v1/monitors/