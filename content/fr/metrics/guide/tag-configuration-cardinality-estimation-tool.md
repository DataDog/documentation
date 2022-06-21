---
title: Outil d'estimation de la cardinalité des configurations de tags
kind: guide
is_beta: true
---
<div class="alert alert-warning">Cette fonctionnalité est en bêta privée. Son endpoint est susceptible d'être modifié.</div>

## Présentation

L'outil d'estimation de la cardinalité des configurations de tags vous aide à mesurer le nombre approximatif de métriques custom distinctes fournies par une configuration de tags spécifiques, pour une métrique donnée. Avant de pouvoir utiliser cet outil, vous devez avoir [une clé d'API et une clé d'application Datadog][1].

### Chemin

```
GET https://api.datadoghq.com/api/metric/estimate
```

## Requête

### Paramètres

| Champ                     | Type             | Description                                                                                                                                                                         |
|---------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `metric_name` (*requis*) | chaîne           | Nom de la métrique utilisée pour l'estimation.                                                                                                                                                     |
| `groups[]`                | liste de chaînes | Groupes à inclure lors de l'estimation de la sortie d'une série temporelle.                                                                                                                           |
| `hours_ago`               | nombre entier          | Délai en heures à soustraire pour récupérer les données historiques. Valeur par défaut : 49. Toute valeur inférieure peut générer des résultats inexacts.                                                                 |
| `timespan_h`              | nombre entier          | Durée en heures pour la surveillance des données, avant la valeur `hours_ago`. Nous vous recommandons un intervalle d'une heure.                                           |
| `pct`                     | booléen          | Calcule le nombre de groupes de centiles au lieu d'une distribution, d'un count ou d'une gauge. Valeur par défaut : `false`. Fonctionne uniquement pour les métriques de distribution ; renvoie une erreur pour toute autre métrique. |

### Exemple

```curl
https://api.datadoghq.com/metric/estimate?metric_name=dist.dd.dogweb.latency&groups[]=host&groups[]=page&hours_ago=120&pct=true
```

## Réponse

### Modèle

| Champ                     | Type             | Description                                                                                                                                                                      |
|---------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `estimated_output_series` | nombre entier          | Nombre de valeurs des sorties uniques de série temporelle lors de l'intervalle indiqué dans la requête des groupes spécifiés. Début de l'intervalle : Heure actuelle - `hours_ago` - `timespan_h`. Fin de l'intervalle : Heure actuelle - `hours_ago`. |
| `estimate_type`           | chaîne           | Type de la métrique estimée. Valeur possibles : [distribution][2], [percentile][3], [count][4] ou [gauge][5].                                                                                         |
| `as_of`                   | chaîne de timestamp | Le timestamp au format UTC des dernières données utilisées ( `hours_ago` à compter de l'heure actuelle). Exemple : `2020-04-16 09:25:40.214469`.                                                              |

### Exemple

```json
{"estimated_output_series":35334,"estimate_type":"percentile","as_of":"2020-04-16 09:29:57.789176"}
```



[1]: /fr/account_management/api-app-keys/
[2]: /fr/metrics/types/?tab=distribution#metric-types
[3]: /fr/metrics/types/?tab=distribution#calculation-of-percentile-aggregations
[4]: /fr/metrics/types/?tab=count#metric-types
[5]: /fr/metrics/types/?tab=gauge#metric-types