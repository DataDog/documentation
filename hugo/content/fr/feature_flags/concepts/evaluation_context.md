---
description: Découvrez comment Datadog Feature Flags utilise le contexte d'évaluation
  et la clé de ciblage pour évaluer les flags pour un sujet.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres
- link: /feature_flags/concepts/traffic_splitting
  tag: Documentation
  text: Fractionnement du trafic et randomisation
- link: /feature_flags/client/
  tag: Documentation
  text: SDK côté client
- link: /feature_flags/server/
  tag: Documentation
  text: SDK côté serveur
title: Contexte d'évaluation
---
## Présentation {#overview}

Un **contexte d'évaluation** est l'ensemble des attributs qu'un SDK transmet à Datadog lorsqu'il évalue un flag. Datadog Feature Flags utilise le contexte d'évaluation d'[OpenFeature][1] : une flat map d'attributs décrivant le sujet en cours d'évaluation, tel qu'un utilisateur, une session ou un appareil. Les [règles de ciblage][2] et les [déploiements progressifs][3] lisent ces attributs pour décider quelle variante un sujet reçoit.

Sans contexte d'évaluation, le SDK peut toujours évaluer les flags booléens activés/désactivés. Il ne peut pas faire correspondre les règles de ciblage qui filtrent sur les attributs du sujet, ni produire une attribution de déploiement progressif cohérente pour ce sujet.

## La clé de ciblage {#the-targeting-key}

La `targetingKey` est l'identifiant principal dans un contexte d'évaluation. Il s'agit généralement d'un ID utilisateur, d'un ID de session ou d'un ID d'appareil. Datadog utilise la `targetingKey` pour la [randomisation déterministe][3], afin que le même sujet reçoive systématiquement la même variante pour un flag.

Utilisez un identifiant stable et cohérent pour le même sujet à travers les sessions. Pour les sujets déconnectés ou anonymes, utilisez un identifiant persistant, tel qu'un UUID stocké dans le stockage local ou `SharedPreferences`, au lieu d'omettre la `targetingKey` ou de la régénérer à chaque session.

## Attributs de contexte {#context-attributes}

Au-delà de la `targetingKey`, un contexte d'évaluation peut inclure un nombre illimité d'attributs supplémentaires, tels que `user_role`, `country` ou `tier`. Référencez ces attributs dans les [filtres][2] des règles de ciblage pour contrôler qui voit chaque variante.

<div class="alert alert-warning">Datadog Feature Flags exige que les attributs de contexte d'évaluation soient des valeurs primitives simples : chaînes de caractères, nombres et booléens. Les objets et tableaux imbriqués ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

### Exemple de contexte d'évaluation {#example-evaluation-context}

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

## Contexte côté client vs côté serveur {#client-side-vs-server-side-context}

Les SDK client et serveur définissent le contexte d'évaluation différemment :

- **Les SDK côté client** conservent un contexte d'évaluation global unique pour l'instance du SDK. Définissez-le une fois lors de l'initialisation, puis appelez `OpenFeature.setContext()` pour le mettre à jour lorsque les attributs du sujet changent, par exemple après la connexion d'un utilisateur. Toutes les évaluations de flags ultérieures utilisent le contexte mis à jour.
- **Les SDK côté serveur** ne conservent pas de contexte global. Créez un contexte d'évaluation pour chaque requête entrante, en fonction de l'utilisateur ou de la session actuelle, et transmettez-le explicitement à chaque appel d'évaluation de flag pour cette requête. Réutilisez le même objet de contexte pour toutes les évaluations au sein d'une requête, et ne le reconstruisez que si les attributs du sujet changent.

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/evaluation-context
[2]: /fr/feature_flags/concepts/targeting_rules/
[3]: /fr/feature_flags/concepts/traffic_splitting/