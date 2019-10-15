---
title: Distributions
kind: documentation
beta: true
further_reading:
  - link: graphing/metrics/distributions
    tag: Documentation
    text: En savoir plus sur l'interface utilisateur dédiée pour les métriques de distribution
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance Datadog</a> afin d'activer les métriques de distribution pour votre compte.
</div>

## Présentation

Les métriques Distribution agrègent les valeurs envoyées par plusieurs hosts lors d'un intervalle de transmission afin de mesurer les distributions statistiques dans l'ensemble de votre infrastructure. Elles sont conçues pour instrumenter des objets logiques, comme des services, indépendamment des hosts sous-jacents, et pour résoudre le problème créé par l'agrégation au niveau de l'Agent.

Contrairement au type de métrique Histogram qui effectue l'agrégation au niveau de l'Agent, les distributions envoient toutes les données brutes recueillies durant un intervalle de transmission, et les agrégations se font du côté serveur. La structure de données sous-jacente n'ayant pas été agrégée et représentant les données brutes, les distributions présentent deux caractéristiques importantes :

* Calcul des agrégations par centiles
* Personnalisation du tagging

#### Exemple

Supposons que le host `HOST_1` transmette une métrique avec les valeurs [1,1,1,2,2,2,3,3], et que le host `HOST_2` transmette la même métrique avec les valeurs [1,1,2] durant un intervalle de transmission.

Ici, le p50 (médiane) pour `HOST_1` est 2, et le p50 pour `HOST_2` est 1. L'agrégation par valeur moyenne du côté serveur donnerait 1,5.

En réalité, le p50 (médiane) global est la médiane de l'ensemble complet [1,1,1,1,1,2,2,2,2,3,3], qui est égal à 2. C'est une valeur statistique exacte qui peut être renvoyée par une métrique Distribution.

### Calcul des agrégations par centiles

Comme d'autres types de métriques, `gauge` ou `histogram` par exemple, le type de métrique `distribution` dispose des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Une métrique Distribution est initialement taguée de la même manière que d'autres métriques (avec des tags personnalisés définis dans le code) et est résolue avec le tag de host qui a signalé la métrique.

Une métrique Distribution, en revanche, dispose d'agrégations par centiles supplémentaires (`p50`, `p75`, `p90`, `p95`, `p99`). Pour une métrique Distribution avec des agrégations par centiles durant un intervalle de transmission de 10 secondes, les agrégations suivantes sont disponibles : `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` et `p99`.

Les agrégations par centiles peuvent être ajoutées dans l'application sur la [page Distribution Metric de Datadog][1].

### Personnalisation du tagging

Cette fonctionnalité vous permet de contrôler le tagging pour les métriques pour lesquelles une granularité au niveau des hosts n'est pas nécessaire. Consultez la [page Métriques de distribution][2] pour en savoir plus sur le contrôle des tags à partir d'une liste blanche. **Remarque** : l'exclusion de tags comportant le caractère `!` n'est pas possible avec cette fonction.

## Envoi

Les différents types de métriques Datadog doivent être envoyés sous différents noms de métriques.

### DogStatsD

{{% table responsive="true" %}}

| Méthode | Présentation |
| :----- | :------- |
| `dog.distribution(String nom.metrique, double valeur, String... tags)` | Surveille la distribution statistique d'un ensemble de valeurs sur un ou plusieurs hosts. |

#### Exemple

Pour évaluer la durée d'une requête HTTP, représentée par la métrique `http_request.time`, utilisez l'extrait de code Python suivant :

```python
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('http_request.time', duration,'env:dev')
```

L'instrumentation ci-dessus calcule les agrégations suivantes : somme, quantité, moyenne, minimum et maximum. Pour les centiles, consultez la [page Distributions][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/metric/distribution_metrics
[2]: /fr/graphing/metrics/distributions/#customize-tagging