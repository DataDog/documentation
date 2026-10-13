---
aliases:
- /es/dora_metrics/change_failure_detection/
description: Aprenda a configurar la detección de fallos en cambios en DORA Metrics
  mediante rollbacks, revert PRs y filtros de PR personalizados.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Obtenga información sobre DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentación
  text: Configure fuentes de datos para DORA Metrics
title: Detección de fallos en cambios
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

La detección de fallos en cambios de Datadog identifica automáticamente las implementaciones que corrigen implementaciones fallidas anteriormente. Al vincular los fallos en cambios con las implementaciones de corrección, proporciona una visualización completa del rendimiento de entrega, ayudando a los equipos a equilibrar la velocidad de lanzamiento con la estabilidad operativa.

Un **fallo en cambios** es una implementación que causa problemas en producción y requiere corrección. Los fallos en cambios se utilizan para calcular las siguientes métricas:

- [Tasa de fallos en cambios][2]
: El porcentaje de implementaciones que causan problemas en producción, calculado de la siguiente manera:

 $$\\text\"Tasa de fallos en cambios\" = \\text\"Número de fallos en cambios\" / \\text\"Número total de implementaciones\"$$

- [Tiempo de recuperación de implementaciones fallidas][3]
: La duración mediana entre una implementación fallida y su corrección, ya sea mediante una implementación de reversión o de avance.

La detección de fallos en cambios identifica dos tipos de implementaciones de corrección:
- **Reversiones**: Se detectan automáticamente cuando se vuelve a implementar una versión implementada anteriormente
- **Avances**: Se detectan mediante reglas personalizadas que coinciden con patrones de metadatos (como solicitudes de extracción de reversión y etiquetas de corrección rápida)


## Reversiones {#rollbacks}

Una reversión ocurre cuando se vuelve a implementar una versión implementada anteriormente para restaurar el sistema después de un cambio fallido o defectuoso.

### Cómo funciona la clasificación de reversiones {#how-rollback-classification-works}

Una implementación se clasifica como reversión cuando implementa una versión que coincide con una versión implementada anteriormente pero que difiere de la implementación inmediatamente anterior.

- Si los metadatos de Git están presentes, la coincidencia se basa en el SHA de la confirmación.
- Si los metadatos de Git no están presentes, la coincidencia se basa en la etiqueta de versión.

Cuando se detecta una reversión, el fallo del cambio es la primera implementación después del objetivo de reversión (la versión a la que volvió).

### Ejemplo: Detección de reversión {#example-rollback-detection}

Para la secuencia V1 → V2 → V3 → V1, el objetivo de reversión es la V1 original, por lo que V2 se marca como el fallo del cambio y V1 como una implementación de reversión.

{{< img src="delivery_performance/dora_metrics/rollback_example.png" alt="Un ejemplo de una implementación de reversión detectada" style="width:100%;" >}}

**Nota**: Volver a implementar la misma versión consecutivamente (por ejemplo, V1 → V1) no se considera una reversión.

## Avances {#rollforwards}

Un avance ocurre cuando se realiza una nueva implementación para corregir o anular un cambio fallido o defectuoso. A diferencia de las reversiones (que vuelven a implementar una versión anterior), los avances implementan código nuevo para solucionar problemas. Esto puede incluir pull requests de revertir que restauran el comportamiento anterior a través de una nueva versión.

Los avances se detectan mediante reglas personalizadas que coinciden con los patrones de metadatos de implementación. Las reglas personalizadas se configuran en la [página de configuración de DORA][1].

## Reglas personalizadas {#custom-rules}

Puede definir reglas personalizadas para clasificar automáticamente las implementaciones de avance según los metadatos del repositorio o de la versión. Las reglas pueden funcionar de dos maneras:
- **Vinculación de implementaciones**: Coincidir implementaciones a través de valores de variables compartidos (por ejemplo, número de PR o versión)
- **Patrones estáticos**: Coincidir patrones de metadatos sin variables (por ejemplo, etiquetas o nombres de rama)

### Reglas vinculadas a implementaciones fallidas {#rules-linked-to-failed-deployments}

Utilice estas reglas para identificar las implementaciones rollforward que deben vincularse a una implementación fallida anterior específica. Estas reglas utilizan patrones de expresiones regulares (regex) con variables para hacer coincidir implementaciones a través de referencias compartidas.

Puede ingresar reglas de regex que incluyan una de estas variables:
| Variable      | Descripción            |
|---------------|-----------------------|
| `$pr_title`   | Coincide con títulos de PR     |
| `$pr_number`  | Coincide con números de PR    |
| `$version`    | Coincide con etiquetas de versión  |

#### Cómo funciona la clasificación basada en variables {#how-variable-based-classification-works}

Cuando una regla coincide con una implementación, ocurren las siguientes acciones:
1. El valor de la variable se extrae de la implementación actual.
2. El sistema encuentra la implementación anterior con el mismo valor extraído.
3. La implementación actual se marca como un avance vinculado a esa implementación anterior.
4. La implementación anterior se marca como el fallo de cambio.

Estas reglas funcionan mejor cuando la implementación fallida puede identificarse mediante un SHA de confirmación, una etiqueta de versión o una referencia de PR compartidos.

#### Ejemplo: Revertir solicitudes de extracción {#example-revert-pull-requests}

Las solicitudes de extracción de reversión son un patrón de recuperación común. Por ejemplo, una PR titulada `Revert "Add feature X"` hace referencia a la PR original.

```
Revert "$pr_title"
```

Cuando el título de una PR coincide con este patrón, ocurren las siguientes acciones:
1. El sistema extrae el título de la PR original de la PR de reversión (el valor de `$pr_title`).
2. Encuentra la implementación anterior que incluye ese título de PR original.
3. El despliegue actual (con la reversión) está marcado como el avance.
4. La implementación anterior se marca como el fallo de cambio.

**Nota**: Si el PR original no se encuentra en ningún despliegue anterior, o si tanto el PR original como su reversión están en el mismo despliegue, no se aplica ninguna clasificación.

### Reglas estáticas {#static-rules}

Las reglas estáticas clasifican los despliegues de avance (rollforward) basándose en patrones de metadatos sin utilizar variables. Estas reglas coinciden con indicadores generales de remediación.

Puede definir reglas de expresiones regulares que coincidan con tipos específicos de metadatos. La siguiente tabla muestra algunos patrones de ejemplo que puede utilizar, pero puede ajustarlos para que se adapten a sus procesos:

| Tipo de metadatos    | Patrón de Regex de ejemplo   | Descripción                         |
|------------------|------------------------|-------------------------------------|
| **Título de PR**         | `.*rollforward.*`      | Coincide con títulos de PR que contienen `rollforward`   |
| **Etiqueta de PR**         | `.*hotfix.*`           | Coincide con etiquetas de PR que contienen `hotfix`        |
| **Nombre de rama de PR**      | `recovery/.*`          | Coincide con nombres de rama que comienzan con `recovery/`|
| **Mensaje de confirmación**      | `^Revert ".*"$ `          | Coincide con mensajes de confirmación que comienzan con `Revert` y terminan con `"`|
| **Etiqueta de versión**      | `.*_hotfix`            | Coincide con etiquetas de versión que terminan con `_hotfix`   |

#### Cómo funciona la clasificación de reglas estáticas {#how-static-rule-classification-works}

Cuando una regla estática coincide con un despliegue, ocurren las siguientes acciones:
1. El despliegue actual está marcado como un avance.
2. El despliegue inmediatamente anterior está marcado como el fallo de cambio.

Utilice reglas estáticas para indicadores generales de remediación como etiquetas de hotfix, prefijos de rama o convenciones de etiquetas de versión.


### Reglas predeterminadas {#default-rules}

Datadog proporciona reglas predeterminadas que se habilitan automáticamente:

- **Revertir PRs**: Los títulos de PR que siguen las convenciones de nomenclatura de reversión (por ejemplo, "Revert" haciendo referencia a un PR anterior) se tratan como avances. La implementación anterior que contiene el cambio original está marcada como el fallo de cambio, utilizando las reglas de vinculación basadas en variables descritas anteriormente.
- **Indicadores de corrección rápida**: Las etiquetas, títulos o nombres de rama de PR que contienen "hotfix" se tratan como avances, y la implementación anterior se marca como la falla de cambio.

Estas reglas predeterminadas son totalmente configurables en la página de [configuración de DORA Metrics][1]. Están pensadas como puntos de partida basados en opiniones que interpretan señales comunes como una actividad probable de avance. Debe adaptar los patrones (como convenciones de nomenclatura, etiquetas o etiquetas de versión) según sea necesario para reflejar sus propios flujos de trabajo y mejorar la precisión con el tiempo.

## Actualizar el estado de la implementación {#update-deployment-status}

Aunque la detección automática y las reglas personalizadas manejan la mayoría de los casos, aún puede actualizar manualmente el estado de una implementación para marcarla como una falla de cambio o marcar una falla de cambio como estable.

### Cuándo actualizar el estado de la implementación {#when-to-update-deployment-status}

Considere actualizar manualmente el estado de una implementación en los siguientes escenarios:
- Una implementación causó problemas en producción pero no se detectó como una falla de cambio.
- Una implementación se clasificó incorrectamente como una falla de cambio (falso positivo).
- Necesita reflejar inmediatamente el estado correcto para fines de informes.

### Actualizar el estado a través de la API {#update-status-through-the-api}

Utilice la [DORA Metrics API][4] para actualizar el estado de una implementación mediante programación. El siguiente ejemplo marca una implementación como una falla de cambio y la vincula a una corrección de reversión:

```shell
curl -X PATCH "https://api.datadoghq.com/api/v2/dora/deployment/{deployment_id}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "data": {
    "attributes": {
      "change_failure": true,
      "remediation": {
        "id": "eG42zNIkVjM",
        "type": "rollback"
      }
    },
    "id": "z_RwVLi7v4Y",
    "type": "dora_deployment_patch_request"
  }
}
EOF
```

El campo `remediation` es opcional, pero es necesario para calcular el tiempo de recuperación de una implementación fallida.

### Actualizar el estado a través de la UI {#update-status-through-the-ui}

Para actualizar el estado de una implementación desde la Datadog UI:

1. Vaya a {{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}} y haga clic en [{{< ui >}}View Deployments{{< /ui >}}][5].
2. Haga clic en una implementación para abrir el panel de detalles de la implementación.
3. En el panel de detalles de la implementación, seleccione el {{< ui >}}Deployment status{{< /ui >}} del dropdown para marcar la implementación como fallida o estable.

{{< img src="delivery_performance/dora_metrics/deployment_status_update.mp4" alt="Actualización del estado de falla de cambio de una implementación desde la Datadog UI" video="true" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /es/delivery_performance/dora_metrics/calculation/#change-failure-rate
[3]: /es/delivery_performance/dora_metrics/calculation/#failed-deployment-recovery-time
[4]: /es/api/latest/dora-metrics/#patch-a-deployment-event
[5]: https://app.datadoghq.com/ci/dora?detail=deployments