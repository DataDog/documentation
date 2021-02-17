---
title: "Envoi de métriques\_: check custom d'Agent"
kind: documentation
further_reading:
  - link: /developers/write_agent_check/
    tag: Documentation
    text: Écrire un check custom d'Agent
---
L'envoi de métriques avec un [check custom d'Agent][1] repose sur l'utilisation de fonctions. Les fonctions disponibles varient en fonction du [type de métrique][2]. De même, l'envoi et le type de métrique stocké par Datadog dépendent de la fonction utilisée.

## Fonctions

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

Cette fonction est utilisée pour suivre une métrique COUNT brute qui ne peut qu'augmenter. L'Agent Datadog calcule le delta entre chaque envoi. Les échantillons qui possèdent une valeur plus faible que l'échantillon précédent sont ignorés. En effet, des valeurs plus faibles indiquent généralement que la métrique COUNT brute sous-jacente a été réinitialisée. La fonction peut faire l'objet de plusieurs appels durant l'exécution d'un check.

Par exemple, l'envoi des échantillons 2, 3, 6 et 7 transmet une valeur de 5 (7 - 2) durant l'exécution du premier check. L'envoi des échantillons 10 et 11 avec la même fonction `monotonic_count` transmet une valeur de 4 (11 - 7) durant l'exécution du deuxième check.

**Remarque** : les métriques envoyées à l'aide de cette fonction sont stockées en tant que métrique de type `COUNT` dans Datadog. Chaque valeur dans les séries temporelles stockées correspond à un delta de la valeur de la métrique entre les échantillons (sans normalisation temporelle).

Modèle de la fonction :

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Obligatoire | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Nom de la métrique.                                                             |
| `value`       | Valeur flottante           | Oui      | -             | Valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Liste des tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Current host  | Hostname à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute un tag au format `device:<NOM_APPAREIL>` à la liste de tags. |

### `count()`

Cette fonction envoie le nombre d'événements qui se sont produits durant l'intervalle du check. Elle peut faire l'objet de plusieurs appels durant l'exécution d'un check, chaque échantillon étant ajouté à la valeur transmise.

**Remarque** : les métriques envoyées à l'aide de cette fonction sont stockées en tant que métrique de type `COUNT` dans Datadog. Chaque valeur dans les séries temporelles stockées correspond à un delta de la valeur de la métrique entre les échantillons (sans normalisation temporelle).

Modèle de la fonction :

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Obligatoire | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Nom de la métrique.                                                             |
| `value`       | Valeur flottante           | Oui      | -             | Valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Liste des tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Host actuel  | Hostname à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute un tag au format `device:<NOM_APPAREIL>` à la liste de tags. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`

Cette fonction envoie la valeur d'une métrique à un timestamp donné. Si elle fait l'objet de plusieurs appels durant l'exécution d'un check pour une métrique, seul le dernier échantillon est utilisé.

**Remarque** : les métriques envoyées à l'aide de cette fonction sont stockées en tant que métrique de type `GAUGE` dans Datadog.

Modèle de la fonction :

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Obligatoire | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Nom de la métrique.                                                             |
| `value`       | Valeur flottante           | Oui      | -             | Valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Liste des tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Host actuel  | Hostname à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute un tag au format `device:<NOM_APPAREIL>` à la liste de tags. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

Cette fonction envoie la valeur brute échantillonnée de votre métrique RATE. L'Agent Datadog calcule le delta de la valeur de cette métrique entre deux envois, puis le divise par l'intervalle de transmission pour obtenir le taux. Cette fonction doit être appelée une seule fois durant le check, sans quoi elle ignore toutes les valeurs inférieures à la valeur précédemment envoyée.

**Remarque** : les métriques envoyées à l'aide de cette fonction sont stockées en tant que métrique de type `GAUGE` dans Datadog. Chaque valeur dans les séries temporelles stockées correspond à un delta de la valeur de la métrique entre les échantillons (avec normalisation temporelle).

Modèle de la fonction :

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Obligatoire | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Nom de la métrique.                                                             |
| `value`       | Valeur flottante           | Oui      | -             | Valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Liste des tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Host actuel  | Hostname à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute un tag au format `device:<NOM_APPAREIL>` à la liste de tags. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

Cette fonction envoie l'échantillon d'une métrique histogram générée durant l'intervalle du check. Elle peut faire l'objet de plusieurs appels durant l'exécution d'un check, chaque échantillon étant ajouté à la distribution statistique de l'ensemble des valeurs pour cette métrique.

**Remarque** : toutes les agrégations de métriques générées sont stockées en tant que métrique de type `GAUGE` dans Datadog, sauf pour la fonction `<NOM_MÉTRIQUE>.count`, pour laquelle les métriques sont stockées en tant que métrique de type `RATE` dans Datadog.

Modèle de la fonction :

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Obligatoire | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Nom de la métrique.                                                             |
| `value`       | Valeur flottante           | Oui      | -             | Valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Liste des tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Host actuel  | Hostname à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute un tag au format `device:<NOM_APPAREIL>` à la liste de tags. |

{{% /tab %}}
{{< /tabs >}}

## Tutoriel

Suivez les étapes ci-dessous pour créer un [check custom d'Agent][2] qui transmet régulièrement tous les types de métriques :

1. Créez le répertoire `metrics_example.d/` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].

2. Dans le dossier `metrics_example.d/`, créez un fichier de configuration vide `metrics_example.yaml` avec le contenu suivant :

    ```yaml
    instances: [{}]
    ```

3. À un niveau supérieur du dossier `conf.d/`, accédez au dossier `checks.d/`. Créez un fichier de check custom `metrics_example.py` avec le contenu ci-dessous :

    ```python
    import random

    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.decrement",
                -1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.increment",
                1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.rate(
                "example_metric.rate",
                1,
                tags=["env:dev","metric_submission_type:rate"],
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:gauge"],
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags=["env:dev","metric_submission_type:monotonic_count"],
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
    ```

4. [Redémarrez l'Agent][4].
5. Vérifiez que votre check custom s'exécute correctement avec la [sous-commande status de l'Agent][5]. Cherchez `metrics_example` dans la section Checks :

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        metrics_example (1.0.0)
        -----------------------
          Instance ID: metrics_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 8, Total: 16
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 2ms

        (...)
    ```

6. Vérifiez que vos métriques sont transmises à Datadog sur votre [page Metric Summary][6] :

{{< img src="developers/metrics/agent_metrics_submission/metrics_metrics_summary.png" alt="Métriques dans le Metric Summary" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/write_agent_check/
[2]: /fr/developers/metrics/types/
[3]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
[5]: /fr/agent/guide/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/summary