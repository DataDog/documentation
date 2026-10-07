---
aliases:
- /fr/events/agent/
- /fr/events/guides/agent
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentation
  text: Écrire un check custom d'Agent

title: Événements avec un check custom d'Agent
---

## Envoi

Utilisez la fonction `event(<DICT_ÉVÉNEMENT>)` pour envoyer un événement depuis un check custom d'Agent :

```text
self.event(
            {
              "timestamp": <TIMESTAMP_EPOCH>,
              "event_type": "<NOM_ÉVÉNEMENT>",
              "msg_title": "<TITRE>",
              "msg_text": "<MESSAGE>",
              "aggregation_key": "<CLÉ_AGRÉGATION>",
              "alert_type": "<TYPE_ALERTE>",
              "source_type_name": "<TYPE_SOURCE>",
              "host": "<HOSTNAME>",
              "tags": ["<TAGS>"],
              "priority": "<PRIORITÉ>"
            }
)
```

Les types de données et de clés suivants sont disponibles dans le dictionnaire de l'événement :

| Clé                | Type            | Obligatoire | Description                                                   |
|--------------------|-----------------|----------|---------------------------------------------------------------|
| `timestamp`        | Nombre entier         | Oui      | Le timestamp epoch de l'événement                             |
| `event_type`       | Chaîne          | Oui      | Le nom de l'événement                                                |
| `msg_title`        | Chaîne          | Oui      | Le titre de l'événement                                        |
| `msg_text`         | Chaîne          | Oui      | Le corps de texte de l'événement                                    |
| `aggregation_key`  | Chaîne          | Non       | La clé à utiliser pour agréger les événements                           |
| `alert_type`       | Chaîne          | Non       | `error`, `warning`, `success` ou `info` (valeur par défaut : `info`) |
| `source_type_name` | Chaîne          | Non       | Le nom du type de source                                     |
| `host`             | Chaîne          | Non       | Le hostname                                                 |
| `tags`             | Liste de chaînes | Non       | La liste de tags associés à cet événement                    |
| `priority`         | Chaîne          | Non       | Indique la priorité de l'événement (`normal` ou `low`)      |

### Exemple

Voici un exemple d'utilisation d'un check custom d'Agent permettant d'envoyer régulièrement un événement. Consultez la rubrique [Écrire un check custom d'Agent][1] pour en savoir plus.

1. Créez un nouveau répertoire `event_example.d/` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2].

2. Dans le dossier `event_example.d/`, créez un fichier de configuration intitulé `event_example.yaml` avec le contenu suivant :

    ```yaml
    instances: [{}]
    ```

3. Accédez au dossier `checks.d/` dans le dossier parent de `conf.d/`.
4. Dans ce dossier, créez un fichier de check custom `event_example.py` avec le contenu suivant :

    {{< code-block lang="python" filename="event_example.py" >}}
    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "Exemple d'événement",
                    "msg_text": "Voici un exemple d'événement provenant de Datadog.",
                    "alert_type": "error",
                }
            )
    {{< /code-block >}}

5. [Redémarrez l'Agent][3].
6. Pour valider votre check, lancez la [commande status de l'Agent][4] et cherchez `event_example` dans la section Checks :

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        event_example (1.0.0)
        ---------------------
          Instance ID: event_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 1, Total: 2
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 0s

        (...)
    ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/developers/custom_checks/write_agent_check/
[2]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /fr/agent/configuration/agent-commands/#restart-the-agent
[4]: /fr/agent/configuration/agent-commands/#agent-information