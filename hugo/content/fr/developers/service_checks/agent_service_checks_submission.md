---
title: "Envoi de checks de service\_: check de l'Agent"
further_reading:
  - link: /developers/custom_checks/write_agent_check/
    tag: Documentation
    text: Écrire un check d'Agent custom
---
Pour envoyer un check de service à Datadog dans un check d'Agent custom, utilisez la fonction prédéfinie `service_check()` dans la classe `AgentCheck`.

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

Retrouvez ci-dessous les différents paramètres et types de données disponibles pour la fonction `service_check()` :

| Paramètre  | Type            | Obligatoire | Valeur par défaut | Description                                                                                                   |
|------------|-----------------|----------|---------------|---------------------------------------------------------------------------------------------------------------|
| `name`     | chaîne          | oui      | -             | Le nom du check de service.                                                                                |
| `status`   | nombre entier             | oui      | -             | Une constante décrivant le statut du service : `0` pour OK, `1` pour Warning, `2` pour Critical et `3` pour Unknown. |
| `tags`     | liste de chaînes | non       | `None`        | Une liste de tags à associer à ce check de service.                                                          |
| `hostname` | chaîne          | non       | host actuel  | Le hostname à associer à ce check de service. Par défaut, il s'agit du host actuel.                                |
| `message`  | chaîne          | non       | `None`        | Informations supplémentaires ou une description de la raison pour laquelle ce statut est généré.                                          |

## Exemple

Voici un exemple de check d'Agent test qui envoie régulièrement un seul check de service. Consultez la section [Écrire un check custom d'Agent][1] pour en savoir plus.

1. Créez un répertoire `service_check_example.d/` dans le [dossier `conf.d/`][2] de votre Agent.

2. Dans votre dossier `service_check_example.d/`, créez un fichier de configuration vide `service_check_example.yaml` avec le contenu suivant :

    ```yaml
    instances: [{}]
    ```

3. Accédez au dossier `checks.d/` dans le dossier parent de `conf.d/`.
4. Dans ce dossier, créez un fichier de check custom `service_check_example.py` avec le contenu ci-dessous :

    {{< code-block lang="python" filename="service_check_example.py" >}}
from datadog_checks.base import AgentCheck

__version__ = "1.0.0"

class MyClass(AgentCheck):
    def check(self, instance):
        self.service_check('example_service_check', 0, message='Example application is up and running.')
    {{< /code-block >}}

5. [Redémarrez l'Agent][3].

6. Vérifiez que votre check custom s'exécute correctement avec la [commande status de l'Agent][4]. La sortie devrait ressembler à ceci :

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        service_check_example (1.0.0)
        -----------------------------
          Instance ID: service_check_example:d884b5186b651429 [OK]
          Total Runs: 1
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 1, Total: 1
          Average Execution Time : 2ms

        (...)
    ```

7. Enfin, accédez au [sommaire des checks de service Datadog][5] pour vérifier que votre check de service envoie bien des données :

{{< img src="developers/service_checks/agent_service_checks_submission/service_check.png" alt="Checks de service" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/custom_checks/write_agent_check/
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/agent/guide/agent-commands/#agent-information
[5]: https://app.datadoghq.com/check/summary