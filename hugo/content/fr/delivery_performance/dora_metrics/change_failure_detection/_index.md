---
aliases:
- /fr/dora_metrics/change_failure_detection/
description: Apprenez à configurer la détection des échecs de changement dans DORA
  Metrics à l'aide de restaurations, de PR de réversion et de filtres de PR personnalisés.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: En savoir plus sur DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentation
  text: Configurer des sources de données pour DORA Metrics
title: Détection des échecs de changement
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

La détection des échecs de changement de Datadog identifie automatiquement les déploiements qui corrigent des déploiements ayant précédemment échoué. En associant les échecs de changement aux déploiements de remédiation, elle fournit une vue complète de la performance de livraison, aidant les équipes à équilibrer la vitesse de publication et la stabilité opérationnelle.

Un **échec de changement** est un déploiement qui cause des problèmes en production et nécessite une remédiation. Les échecs de changement sont utilisés pour calculer les métriques suivantes :

- [Taux d'échec de changement][2]
: Le pourcentage de déploiements causant des problèmes en production, calculé comme suit :

 $$\\text\"Taux d'échec de changement\" = \\text\"Nombre d'échecs de changement\" / \\text\"Nombre total de déploiements\"$$

- [Temps de récupération après un déploiement ayant échoué][3]
: La durée médiane entre un déploiement ayant échoué et sa remédiation, soit par un déploiement de restauration, soit par un déploiement en avant.

La détection des échecs de changement identifie deux types de déploiements de remédiation :
- **Restaurations** : Détectées automatiquement lorsqu'une version précédemment déployée est redéployée
- **Déploiements en avant** : Détectés via des règles personnalisées qui correspondent à des modèles de métadonnées (tels que les PR de réversion et les étiquettes de correctifs)


## Restaurations {#rollbacks}

Une restauration se produit lorsqu'une version précédemment déployée est redéployée pour rétablir le système après un changement ayant échoué ou défectueux.

### Comment fonctionne la classification des restaurations {#how-rollback-classification-works}

Un déploiement est classé comme une restauration lorsqu'il déploie une version qui correspond à une version précédemment déployée mais qui diffère du déploiement immédiatement précédent.

- Si les métadonnées Git sont présentes, la correspondance est basée sur le SHA du commit.
- Si les métadonnées Git ne sont pas présentes, la correspondance est basée sur le tag de version.

Lorsqu'une restauration est détectée, l'échec de changement est le premier déploiement après la cible de restauration (la version vers laquelle vous êtes revenu).

### Exemple : Détection de restauration {#example-rollback-detection}

Pour la séquence V1 → V2 → V3 → V1, la cible de restauration est la V1 originale, donc V2 est marqué comme l'échec de changement et V1 comme un déploiement de restauration.

{{< img src="delivery_performance/dora_metrics/rollback_example.png" alt="Un exemple de déploiement de restauration détecté" style="width:100%;" >}}

**Remarque** : Le redéploiement consécutif de la même version (par exemple, V1 → V1) n'est pas considéré comme une restauration.

## Déploiements en avant {#rollforwards}

Un déploiement en avant se produit lorsqu'un nouveau déploiement est effectué pour corriger ou outrepasser un changement ayant échoué ou défectueux. Contrairement aux restaurations (qui redéploient une version précédente), les déploiements en avant déploient du nouveau code pour remédier aux problèmes. Cela peut inclure des pull requests de réversion qui restaurent le comportement précédent via une nouvelle version.

Les déploiements en avant sont détectés via des règles personnalisées qui correspondent aux modèles de métadonnées de déploiement. Les règles personnalisées sont configurées sur la [page Paramètres DORA][1].

## Règles personnalisées {#custom-rules}

Vous pouvez définir des règles personnalisées pour classer automatiquement les déploiements en avant en fonction des métadonnées du dépôt ou de la version. Les règles peuvent fonctionner de deux manières :
- **Liaison des déploiements** : Associer les déploiements via des valeurs de variables partagées (par exemple, numéro de PR ou version)
- **Modèles statiques** : Associer les modèles de métadonnées sans variables (par exemple, étiquettes ou noms de branche)

### Règles liées aux déploiements ayant échoué {#rules-linked-to-failed-deployments}

Utilisez ces règles pour identifier les déploiements en avant qui doivent être liés à un déploiement ayant échoué précédemment. Ces règles utilisent des modèles d'expression régulière (regex) avec des variables pour faire correspondre les déploiements via des références partagées.

Vous pouvez saisir des règles regex qui incluent l'une de ces variables :
| Variable      | Description            |
|---------------|-----------------------|
| `$pr_title`   | Correspond aux titres de PR     |
| `$pr_number`  | Correspond aux numéros de PR    |
| `$version`    | Correspond aux tags de version  |

#### Comment fonctionne la classification basée sur les variables {#how-variable-based-classification-works}

Lorsqu'une règle correspond à un déploiement, les actions suivantes se produisent :
1. La valeur de la variable est extraite du déploiement actuel.
2. Le système trouve le déploiement précédent avec la même valeur extraite.
3. Le déploiement actuel est marqué comme un déploiement en avant lié à ce déploiement précédent.
4. Le déploiement précédent est marqué comme l'échec de changement.

Ces règles fonctionnent mieux lorsque le déploiement ayant échoué peut être identifié par un SHA de commit partagé, un tag de version ou une référence de PR.

#### Exemple : Pull requests de réversion {#example-revert-pull-requests}

Les pull requests de réversion sont un modèle de récupération courant. Par exemple, une PR intitulée `Revert "Add feature X"` fait référence à la PR originale.

```
Revert "$pr_title"
```

Lorsqu'un titre de PR correspond à ce modèle, les actions suivantes se produisent :
1. Le système extrait le titre de la PR originale de la PR d'annulation (la valeur de `$pr_title`).
2. Il trouve le déploiement précédent qui inclut ce titre de PR original.
3. Le déploiement actuel (avec l'annulation) est marqué comme un déploiement en avant.
4. Le déploiement précédent est marqué comme l'échec de changement.

**Remarque** : Si la PR d'origine n'est trouvée dans aucun déploiement antérieur, ou si la PR d'origine et son annulation se trouvent dans le même déploiement, aucune classification n'est appliquée.

### Règles statiques {#static-rules}

Les règles statiques classent les déploiements en avant en fonction de modèles de métadonnées sans utiliser de variables. Ces règles correspondent à des indicateurs généraux de remédiation.

Vous pouvez définir des règles regex qui correspondent à des types spécifiques de métadonnées. Le tableau suivant présente quelques exemples de modèles que vous pouvez utiliser, mais vous pouvez les ajuster pour les adapter à vos processus :

| Type de métadonnée    | Exemple de modèle Regex   | Description                         |
|------------------|------------------------|-------------------------------------|
| **Titre de PR**         | `.*rollforward.*`      | Correspond aux titres de PR contenant `rollforward`   |
| **Étiquette de PR**         | `.*hotfix.*`           | Correspond aux étiquettes de PR contenant `hotfix`        |
| **Nom de branche de PR**      | `recovery/.*`          | Correspond aux noms de branche commençant par `recovery/`|
| **Message de commit**      | `^Revert ".*"$ `          | Correspond aux messages de commit commençant par `Revert` et se terminant par `"`|
| **Tag de version**      | `.*_hotfix`            | Correspond aux tags de version se terminant par `_hotfix`   |

#### Fonctionnement de la classification par règles statiques {#how-static-rule-classification-works}

Lorsqu'une règle statique correspond à un déploiement, les actions suivantes se produisent :
1. Le déploiement actuel est marqué comme un déploiement en avant.
2. Le déploiement immédiatement précédent est marqué comme étant l'échec de changement.

Utilisez des règles statiques pour des indicateurs de remédiation généraux tels que les étiquettes de correctifs, les préfixes de branche ou les conventions de tags de version.


### Règles par défaut {#default-rules}

Datadog fournit des règles par défaut qui sont automatiquement activées :

- **PR d'annulation** : les titres de PR respectant les conventions de nommage d'annulation (par exemple, « Revert » faisant référence à une PR précédente) sont traités comme des déploiements en avant. Le déploiement précédent contenant le changement initial est marqué comme l'échec de changement, en utilisant les règles de liaison basées sur des variables décrites ci-dessus.
- **Indicateurs de correctif (hotfix)** : les étiquettes, titres ou noms de branche de PR contenant « hotfix » sont traités comme des déploiements en avant, le déploiement précédent étant marqué comme l'échec de changement.

Ces règles par défaut sont entièrement configurables sur la page [Paramètres des métriques DORA][1]. Elles sont conçues comme des points de départ orientés qui interprètent les signaux courants comme une activité probable de déploiements en avant. Vous devez adapter les modèles (tels que les conventions de nommage, les étiquettes ou les tags de version) selon vos besoins pour refléter vos propres workflows et améliorer la précision au fil du temps.

## Mettre à jour le statut du déploiement {#update-deployment-status}

Bien que la détection automatique et les règles personnalisées gèrent la plupart des cas, vous pouvez toujours mettre à jour manuellement le statut d'un déploiement pour le marquer comme un échec de changement ou marquer un échec de changement comme stable.

### Quand mettre à jour le statut du déploiement {#when-to-update-deployment-status}

Envisagez de mettre à jour manuellement le statut d'un déploiement dans les scénarios suivants :
- Un déploiement a causé des problèmes en production mais n'a pas été détecté comme un échec de changement.
- Un déploiement a été classé à tort comme un échec de changement (faux positif).
- Vous devez immédiatement mettre à jour le statut approprié à des fins de rapport.

### Mettre à jour le statut via l'API {#update-status-through-the-api}

Utilisez l'[API DORA Metrics][4] pour mettre à jour le statut d'un déploiement par programmation. L'exemple suivant marque un déploiement comme un échec de changement et le lie à une remédiation par restauration :

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

Le champ `remediation` est facultatif, mais requis pour calculer le temps de récupération d'un déploiement ayant échoué.

### Mettre à jour le statut via l'interface utilisateur {#update-status-through-the-ui}

Pour mettre à jour le statut d'un déploiement depuis l'interface utilisateur Datadog :

1. Accédez à {{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}} et cliquez sur [{{< ui >}}View Deployments{{< /ui >}}][5].
2. Cliquez sur un déploiement pour ouvrir le panneau des détails du déploiement.
3. Dans le panneau des détails du déploiement, sélectionnez {{< ui >}}Deployment status{{< /ui >}} dans la liste déroulante pour marquer le déploiement comme ayant échoué ou étant stable.

{{< img src="delivery_performance/dora_metrics/deployment_status_update.mp4" alt="Mise à jour du statut d'échec de changement d'un déploiement depuis l'interface utilisateur Datadog" video="true" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /fr/delivery_performance/dora_metrics/calculation/#change-failure-rate
[3]: /fr/delivery_performance/dora_metrics/calculation/#failed-deployment-recovery-time
[4]: /fr/api/latest/dora-metrics/#patch-a-deployment-event
[5]: https://app.datadoghq.com/ci/dora?detail=deployments