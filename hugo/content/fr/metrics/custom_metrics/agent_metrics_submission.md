---
aliases:
- /fr/developers/metrics/agent_metrics_submission/
- /fr/metrics/agent_metrics_submission
description: Soumettez des Custom Metrics à partir d'un check personnalisé de l'Agent
  en utilisant les fonctions count, gauge, histogram et rate.
further_reading:
- link: /extend/custom_checks/write_agent_check/
  tag: Documentation
  text: Écrivez un check personnalisé de l'Agent
title: 'Soumission de métriques : check personnalisé de l''Agent'
---
Les fonctions sont utilisées pour soumettre des métriques avec un [check personnalisé de l'Agent][1]. Différentes fonctions sont disponibles en fonction du [type de métrique][2]. Selon la fonction utilisée, la soumission et le type de métrique réel stocké dans Datadog peuvent différer.

## Fonctions {#functions}

{{< tabs >}}
{{% tab "Nombre de valeurs" %}}

### `monotonic_count()` {#monotonic-count}

Cette fonction est utilisée pour suivre une métrique COUNT brute qui augmente toujours. Le Datadog Agent calcule le delta entre chaque soumission. Les échantillons ayant une valeur inférieure à l'échantillon précédent sont ignorés. Des valeurs inférieures indiquent généralement que la métrique COUNT brute sous-jacente a été réinitialisée. La fonction peut être appelée plusieurs fois pendant l'exécution d'un check.

Par exemple, la soumission des échantillons 2, 3, 6, 7 envoie une valeur de 5 (7-2) lors de la première exécution du check. La soumission des échantillons 10, 11 sur le même `monotonic_count` envoie une valeur de 4 (11-7) lors de la deuxième exécution du check.

**Remarque** : les métriques soumises avec cette fonction sont stockées avec un type de métrique `COUNT` dans Datadog. Chaque valeur dans la série temporelle stockée est un delta de la valeur de la métrique entre les échantillons (non normalisé par le temps).

Modèle de fonction :

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Requis | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Le nom de la métrique.                                                             |
| `value`       | Flottant           | Oui      | -             | La valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Une liste de tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | Host actuel  | Un nom d'hôte à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute plutôt un tag sous la forme `device:<DEVICE_NAME>` à la liste des tags. |

### `count()` {#count}

Cette fonction soumet le nombre d'événements survenus pendant l'intervalle du check. Elle peut être appelée plusieurs fois au cours de l'exécution d'un check, chaque échantillon étant ajouté à la valeur envoyée.

**Remarque** : Les métriques soumises avec cette fonction sont stockées avec un type de métrique `COUNT` dans Datadog.

Modèle de fonction :

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Requis | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Le nom de la métrique.                                                             |
| `value`       | Flottant           | Oui      | -             | La valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Une liste de tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | host actuel  | Un nom d'hôte à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute plutôt un tag sous la forme `device:<DEVICE_NAME>` à la liste des tags. |

{{% /tab %}}
{{% tab "Jauge" %}}

### `gauge()` {#gauge}

Cette fonction soumet la valeur d'une métrique à un horodatage donné. Si elle est appelée plusieurs fois au cours de l'exécution d'un check pour une métrique, seul le dernier échantillon est utilisé.

**Remarque** : Les métriques soumises avec cette fonction sont stockées avec un type de métrique `GAUGE` dans Datadog.

Modèle de fonction :

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Requis | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Le nom de la métrique.                                                             |
| `value`       | Flottant           | Oui      | -             | La valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Une liste de tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | host actuel  | Un nom d'hôte à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute plutôt un tag sous la forme `device:<DEVICE_NAME>` à la liste des tags. |

{{% /tab %}}
{{% tab "Taux" %}}

### `rate()` {#rate}

Cette fonction soumet la valeur brute échantillonnée de votre métrique RATE. Le Datadog Agent calcule le delta de la valeur de cette métrique entre deux soumissions et le divise par l'intervalle de soumission pour obtenir le taux. Cette fonction ne doit être appelée qu'une seule fois pendant un check, sinon elle rejette toute valeur inférieure à une valeur précédemment soumise.

**Remarque** : Les métriques soumises avec cette fonction sont stockées en tant que type de métrique `GAUGE` dans Datadog. Chaque valeur dans la série temporelle stockée est un delta normalisé dans le temps de la valeur de la métrique entre les échantillons.

Modèle de fonction :

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Requis | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Le nom de la métrique.                                                             |
| `value`       | Flottant           | Oui      | -             | La valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Une liste de tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | host actuel  | Un nom d'hôte à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute plutôt un tag sous la forme `device:<DEVICE_NAME>` à la liste des tags. |

{{% /tab %}}

{{% tab "Histogramme" %}}

### `histogram()` {#histogram}

Cette fonction soumet l'échantillon d'une métrique d'histogramme recueilli pendant l'intervalle du check. Elle peut être appelée plusieurs fois pendant l'exécution d'un check. Chaque échantillon est ajouté à la distribution statistique de l'ensemble des valeurs pour cette métrique.

**Remarque** : Toutes les agrégations de métriques produites sont stockées en tant que type de métrique `GAUGE` dans Datadog, à l'exception du `<METRIC_NAME>.count` qui est stocké en tant que type de métrique `RATE` dans Datadog.

Modèle de fonction :

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Paramètre     | Type            | Requis | Valeur par défaut | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Chaîne          | Oui      | -             | Le nom de la métrique.                                                             |
| `value`       | Flottant           | Oui      | -             | La valeur de la métrique.                                                           |
| `tags`        | Liste de chaînes | Non       | -             | Une liste de tags à associer à cette métrique.                                       |
| `hostname`    | Chaîne          | Non       | host actuel  | Un nom d'hôte à associer à cette métrique.                                           |
| `device_name` | Chaîne          | Non       | -             | Obsolète. Ajoute plutôt un tag sous la forme `device:<DEVICE_NAME>` à la liste des tags. |

{{% /tab %}}
{{< /tabs >}}

## Tutoriel {#tutorial}

Suivez les étapes ci-dessous pour créer un [check personnalisé de l'Agent][2] qui envoie périodiquement tous les types de métriques :

1. Créez le répertoire `metrics_example.d/` dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][3].

2. Dans le dossier `metrics_example.d/`, créez un fichier de configuration vide nommé `metrics_example.yaml` avec le contenu suivant :

    ```yaml
    instances: [{}]
    ```

3. Un niveau au-dessus du dossier `conf.d/`, accédez au dossier `checks.d/`. Créez un fichier de check personnalisé nommé `metrics_example.py` avec le contenu ci-dessous :

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
5. Vérifiez que votre check personnalisé fonctionne correctement à l'aide de la [sous-commande status de l'Agent][5]. Recherchez `metrics_example` dans la section {{< ui >}}Checks{{< /ui >}} :

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

6. Vérifiez que vos métriques sont transmises à Datadog sur votre [page Metrics Catalog][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/extend/custom_checks/write_agent_check/
[2]: /fr/metrics/types/
[3]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /fr/agent/configuration/agent-commands/#restart-the-agent
[5]: /fr/agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/catalog