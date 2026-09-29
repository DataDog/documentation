---
description: Aprenda cómo Datadog Feature Flags utiliza el contexto de evaluación
  y la clave de segmentación para evaluar Feature Flags para un sujeto.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas de segmentación y filtros
- link: /feature_flags/concepts/traffic_splitting
  tag: Documentación
  text: División de tráfico y aleatorización
- link: /feature_flags/client/
  tag: Documentación
  text: SDKs del lado del cliente
- link: /feature_flags/server/
  tag: Documentación
  text: SDKs del lado del servidor
title: Contexto de evaluación
---
## Descripción general {#overview}

Un **contexto de evaluación** es el conjunto de atributos que un SDK pasa a Datadog cuando evalúa una Feature Flag. Datadog Feature Flags utiliza el contexto de evaluación de [OpenFeature][1]: un mapa plano de atributos que describe al sujeto que se está evaluando, como un usuario, sesión o dispositivo. Las [reglas de segmentación][2] y los [despliegues porcentuales][3] leen estos atributos para decidir qué variante recibe un sujeto.

Sin un contexto de evaluación, el SDK aún puede evaluar Feature Flags booleanas de encendido/apagado. No puede coincidir con reglas de segmentación que filtran por atributos del sujeto, ni producir una asignación de despliegue consistente para ese sujeto.

## La clave de segmentación {#the-targeting-key}

La `targetingKey` es el identificador principal en un contexto de evaluación. Por lo general, es un ID de usuario, ID de sesión o ID de dispositivo. Datadog utiliza la `targetingKey` para [aleatorización determinista][3], de modo que el mismo sujeto reciba consistentemente la misma variante para una Feature Flag.

Utilice un identificador estable y consistente para el mismo sujeto a través de las sesiones. Para sujetos que no han iniciado sesión o son anónimos, utilice un identificador persistente, como un UUID almacenado en el almacenamiento local o `SharedPreferences`, en lugar de omitir la `targetingKey` o regenerarla en cada sesión.

## Atributos de contexto {#context-attributes}

Más allá de la `targetingKey`, un contexto de evaluación puede incluir cualquier cantidad de atributos adicionales, como `user_role`, `country` o `tier`. Haga referencia a estos atributos en los [filtros][2] de las reglas de segmentación para controlar quién ve cada variante.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. Los objetos y arreglos anidados no son compatibles y pueden causar que los datos de exposición se pierdan.</div>

### Ejemplo de contexto de evaluación {#example-evaluation-context}

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: 'user-123',
  user_role: 'admin',
  country: 'US',
  tier: 'premium',
};
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "user_id": "user-123",
        "user_role": "admin",
        "country": "US",
        "tier": "premium",
    },
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "user_id":   "user-123",
        "user_role": "admin",
        "country":   "US",
        "tier":      "premium",
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Contexto del lado del cliente frente al lado del servidor {#client-side-vs-server-side-context}

Los SDK de cliente y servidor establecen el contexto de evaluación de manera diferente:

- **Los SDKs del lado del cliente** mantienen un único contexto de evaluación global para la instancia del SDK. Establézcalo una vez durante la inicialización, luego llame a `OpenFeature.setContext()` para actualizarlo cuando los atributos del sujeto cambien, como después de que un usuario inicie sesión. Todas las evaluaciones de Feature Flags posteriores utilizan el contexto actualizado.
- **Los SDKs del lado del servidor** no mantienen un contexto global. Cree un contexto de evaluación para cada solicitud entrante, basado en el usuario o la sesión actual, y páselo explícitamente a cada llamada de evaluación de Feature Flag para esa solicitud. Reutilice el mismo objeto de contexto en las evaluaciones dentro de una solicitud y solo vuelva a crearlo si los atributos del sujeto cambian.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/evaluation-context
[2]: /es/feature_flags/concepts/targeting_rules/
[3]: /es/feature_flags/concepts/traffic_splitting/