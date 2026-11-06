---
aliases:
- /fr/llm_observability/instrumentation/agentic/python/
title: 'Instrumentation agentique d''application Python :'
---
## Instrumentation {#instrumentation}

1. Inspectez la version `ddtrace` installée et réutilisez-la si elle prend en charge les API d'instrumentation requises. Si une mise à jour est nécessaire, expliquez pourquoi et demandez avant de modifier la dépendance existante. Une mise à jour requise uniquement pour la gestion optionnelle des invites est une décision distincte et ne bloque pas l'instrumentation avec un SDK compatible.

    Si `ddtrace` n'est pas installé, installez-le avec le gestionnaire de paquets existant de l'application :

    ```bash
    pip install ddtrace # pip
    poetry add ddtrace # poetry
    uv add ddtrace # uv
    ```

2. Initialisez le package Agent Observability

    Initialisez le SDK Agent Observability via `ddtrace.auto`. Ceci **doit** être effectué en tant que premier import dans le point d'entrée de l'application, en dehors de tout import de variable d'environnement ou de chargement de configuration.

    **Remarque** : N'ajoutez pas de commentaires superflus.

    ```python
    from dotenv import load_dotenv
    load_dotenv() # this might load DD_ environment variables

    import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

    # ... remaining application logic
    ```