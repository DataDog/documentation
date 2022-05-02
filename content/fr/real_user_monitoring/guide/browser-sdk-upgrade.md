---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser la solution Session Replay de Datadog pour visualiser en temps réel
    les parcours utilisateur
kind: guide
title: Mettre à niveau le SDK Browser
---

Suivez les instructions de ce guide pour passer d'une version majeure à une autre des SDK RUM et Browser pour les logs.

## De la version 3 à la version 4

La version 4 des SDK RUM et Browser pour les logs inclut plusieurs changements majeurs.

### Changements

#### URL d'admission

Les URL vers lesquelles le SDK Browser envoie des données ont été modifiées. Vérifiez que votre [stratégie de sécurité de contenu a bien été modifiée en conséquence][1].

#### Version minimale de Typescript compatible

La version 4 du SDK Browser ne prend pas en charge les versions de TypeScript antérieures à la v3.8.2. Si vous utilisez TypeScript, veillez donc à utiliser au minimum la version 3.8.2.

#### Syntaxe des tags

Les paramètres d'initialisation `version`, `env` et `service` sont envoyés à Datadog sous la forme de tags. Le SDK Browser les nettoie légèrement, pour s'assurer qu'ils ne génèrent pas plusieurs tags, et affiche un avertissement si ces valeurs ne répondent pas aux exigences de la syntaxe des tags.

#### Typage plus strict des paramètres d'initialisation

Les types TypeScript représentant des paramètres d'initialisation sont désormais plus stricts et peuvent rejeter certains paramètres non compatibles qui étaient auparavant acceptés. Si vous rencontrez des erreurs de vérification des types, assurez-vous que vous fournissez des paramètres d'initialisation pris en charge.

#### Priorité des options de confidentialité

Lorsque plusieurs options de confidentialité sont définies pour un seul élément, Datadog applique l'option la plus restrictive, afin d'éviter toute fuite de données sensibles. Par exemple, si les classes `dd-privacy-allow` et `dd-privacy-hidden` sont toutes les deux spécifiées pour un seul élément, celui-ci est masqué et non autorisé.

#### Calcul des noms d'action

Lors du calcul des noms d'action, le SDK Browser supprime le texte des éléments enfant avec l'attribut `data-dd-action-name` provenant du texte interne.

Par exemple, pour l'élément `container` suivant, la version 3 calculait le nom d'action `Container sensitive data`, tandis que la version 4 calcule le nom `Container` :
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```


### Suppressions

#### Champ XHR `_datadog_xhr`

Le SDK Browser utilisait auparavant une propriété `_datadog_xhr` sur les objets `XMLHttpRequest` afin de représenter son état interne. Cette propriété a été supprimée et n'est pas remplacée, car elle était uniquement destinée à un usage interne.

#### Paramètre d'initialisation `proxyHost`

Le paramètre d'initialisation `proxyHost` a été supprimé. Utilisez à la place le paramètre d'initialisation `proxyUrl`.

#### Prise en charge des options de confidentialité

Les options de confidentialité `input-ignored` et `input-masked` ne sont plus acceptées. Utilisez à la place l'option de confidentialité `mask-user-input`. Vous devez donc remplacer :

* les noms de classe `dd-privacy-input-ignored` et `dd-privacy-input-masked` par `dd-privacy-mask-user-input` ;
* les valeurs d'attribut `dd-privacy="input-masked"` et `dd-privacy="input-ignored"` par `dd-privacy="mask-user-input"`.

## De la version 2 à la version 3

La version 3 du SDK Browser propose une nouvelle fonctionnalité : [Session Replay][2]. Cette mise à jour modifie également de façon considérable le fonctionnement des SDK RUM et Browser pour les logs.

### Changements
#### Erreurs RUM

Le SDK RUM Browser ne génère plus d'[erreurs RUM][3] pour les appels Fetch et XHR échoués. Les échecs de ces requêtes réseau sont toujours recueillis sous la forme de [ressources RUM][4], avec l'attribut du code de statut.


Pour continuer à visualiser les échecs de requêtes réseau sous la forme d'erreurs RUM, Datadog recommande d'intercepter la ressource avec l'[API beforeSend][5], de vérifier la propriété `status_code`, puis d'envoyer manuellement une erreur grâce à l'[API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Attribut source des erreurs RUM

Le SDK RUM Browser ne vous permet plus de spécifier la source d'une erreur recueillie avec l'[API addError][6]. L'attribut source de toutes les erreurs recueillies avec cette API est défini sur `custom`. L'[API addError][6] accepte un objet de contexte comme deuxième paramètre, afin de transmettre plus de contexte sur l'erreur.

### Suppressions
#### API RUM

| Ancienne API       | Nouvelle API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Options d'initialisation

| Anciennes options        | Nouvelles options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | AUCUNE        |

#### Types TypeScript

| Anciens types                    | Nouveaux types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/faq/content_security_policy
[2]: /fr/real_user_monitoring/session_replay
[3]: /fr/real_user_monitoring/browser/collecting_browser_errors/
[4]: /fr/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /fr/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[6]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually