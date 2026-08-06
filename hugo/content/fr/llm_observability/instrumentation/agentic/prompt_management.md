---
title: Intégration Agentic de Prompt Management
---
## Objectif {#goal}

Utilisez un prompt géré par Datadog existant ou promouvez le prompt local d'une application, préservez le comportement existant de l'application en tant que solution de secours et suivez l'utilisation du prompt géré dans Agent Observability.

## Sélectionnez le flux de travail {#select-the-workflow}

- **Utilisez un prompt géré existant :** Si la demande de l'utilisateur inclut un prompt ID, un environnement et des noms de variables, utilisez-les sans demander s'il faut activer à nouveau Prompt Management.
- **Promouvez un prompt local :** Utilisez ce workflow uniquement après que l'utilisateur a donné son accord via le [Agentic Instrumentation guide](/llm_observability/instrumentation/agentic). Promouvez le prompt de chat local sélectionné, déployez sa première version dans l'environnement demandé, puis intégrez la récupération au moment de l'exécution.

## Directives {#guidelines}

1. La récupération au moment de l'exécution de Prompt Management n'est prise en charge que pour les applications Python. Si l'application cible n'est pas en Python, n'ajoutez pas de récupération au moment de l'exécution. Revenez au [Agentic Instrumentation guide](/llm_observability/instrumentation/agentic) principal et instrumentez plutôt les prompts sélectionnés avec structured Prompt Tracking. N'implémentez pas de client HTTP direct et ne réécrivez pas l'application en Python.
2. Inspectez l'application avant de la modifier. Identifiez son gestionnaire de paquets, son flux de travail de configuration et de gestion des secrets, sa commande de démarrage, l'instrumentation Datadog existante, le fournisseur LLM, la construction du prompt et le site d'appel du fournisseur.
3. Pour un prompt géré existant, utilisez l'ID de prompt, l'environnement et les noms de variables fournis dans le prompt de l'utilisateur sans lui demander de les confirmer. Pour une promotion, dérivez un ID de prompt descriptif à partir de l'objectif du prompt sélectionné et demandez à l'utilisateur de le confirmer avant de créer le prompt.
4. Si plusieurs sites d'appel de prompt ou de fournisseur sont plausibles, demandez à l'utilisateur lequel modifier et attendez une réponse avant d'effectuer des modifications.
5. Préservez le gestionnaire de paquets, le flux de travail de configuration, la commande de démarrage, le fournisseur, le modèle et le comportement métier existants de l'application. L'utilisation existante des variables d'environnement ambiantes, telle que `os.getenv()`, est une convention de configuration même lorsqu'aucun `.env` ou fichier de configuration n'existe. Étendez cette convention sans poser de questions. Si le dépôt ne possède aucune convention applicable, demandez à l'utilisateur quelle approche utiliser et attendez une réponse au lieu d'en introduire une.
6. Maintenez la récupération des prompts gérés à la limite de construction de prompt existante de l'application. Ne déplacez pas la construction du prompt vers le site d'appel du fournisseur et ne la dupliquez pas à cet endroit lorsqu'un utilitaire, une bibliothèque ou un autre composant la possède déjà.
7. Lorsque plusieurs fragments de prompt locaux sont composés en un seul appel de fournisseur, promouvez la liste de messages finale destinée au fournisseur en tant que prompt géré unique. Ne créez pas de références de prompts gérés imbriquées. Si l'utilisateur souhaite explicitement qu'un fragment de prompt soit géré indépendamment, préservez la composition existante et suivez explicitement ce fragment.
8. Respectez les limites de propriété du dépôt. Si le dépôt extrait est une bibliothèque et qu'une application host indisponible possède la configuration d'exécution, les secrets, l'instrumentation ou le démarrage, implémentez tout de même les changements de dépendance de paquet, de construction d'invite et d'appel de fournisseur détenus par la bibliothèque. N'inventez pas de configuration détenue par le host, n'initialisez pas le traçage à l'intérieur de la bibliothèque et ne revendiquez pas de vérification en direct. Signalez le travail exact restant à effectuer côté host. Demandez l'application host uniquement lorsqu'une modification de code requise n'est pas détenue par le dépôt extrait.
9. Traitez toute clé d'application ou API fournie dans l'invite de l'utilisateur comme un secret. Ne le validez pas et ne le répétez pas dans le code source, la configuration suivie, la documentation, les journaux ou la réponse finale. Configurez les identifiants fournis via la configuration locale non validée ou le flux de travail de gestion des secrets existant de l'application, et n'exigez pas de l'utilisateur qu'il les saisisse à nouveau. Ne placez jamais de valeurs d'identifiants dans les arguments de commande ou les modèles de recherche. Vérifiez que les secrets ne sont pas suivis en utilisant les chemins de fichiers, `git status` et `git diff`, sans rechercher de valeurs d'identifiants littérales. Lorsque la tâche a été fournie directement dans la conversation, n'imprimez pas et ne relisez pas une copie locale contenant des identifiants.
10. Ne créez, ne mettez à jour et ne déployez jamais une invite gérée à partir du démarrage de l'application ou d'un chemin de requête. La promotion est une opération de configuration ponctuelle effectuée par l'agent de codage après que l'utilisateur a donné son accord.

## Installez le Prompt Management SDK {#install-the-prompt-management-sdk}

Utilisez le gestionnaire de paquets existant de l'application pour installer ou mettre à niveau vers la dernière version `ddtrace` dans l'environnement Python de l'application. Rendez l'installation reproductible à partir d'un environnement propre et préservez les conventions de gestion des dépendances existantes de l'application.

## Promouvez un prompt local {#promote-a-local-prompt}

Ignorez cette section lorsque l'utilisateur a fourni un ID d'invite gérée existant.

1. À la limite de construction d'invite sélectionnée, séparez le modèle de message de chat statique de ses valeurs dynamiques. Utilisez `{{variable}}` placeholders in the template and keep a value available for every variable.
2. Propose a stable, descriptive prompt ID based on the prompt's purpose, then wait for the user to confirm it. If the deployment environment was not supplied, ask which environment to use at the same time.
3. Before creating the prompt, obtain a Datadog API key and a one-time application key with the `llm_observability_write`, `feature_flag_config_write`, and `feature_flag_environment_config_read` permissions. If the user did not already provide a suitable application key, ask for one. Do not add this setup credential to the application's runtime configuration.
4. Follow the [List environments API](/api/latest/feature-flags/list-environments/) and call `GET /api/v2/feature-flags/environments?dd_env=<URL_ENCODED_DD_ENV>`. The `dd_env` filter matches `DD_ENV` exactly against each environment's `attributes.queries`.
   - Si un seul environnement correspond, utilisez son `data[].id` comme ID d'environnement Feature Flags.
   - Si plusieurs environnements correspondent, demandez à l'utilisateur lequel utiliser. Ne devinez pas.
   - Si aucun environnement ne correspond, expliquez que le `DD_ENV` actuel de l'application n'est pas mappé à un environnement Feature Flags et demandez si l'utilisateur souhaite que vous en créiez un. Ne demandez pas un `DD_ENV` différent et ne créez pas d'environnement sans approbation explicite.
     - Si l'utilisateur accepte, demandez le nom d'affichage de l'environnement et s'il représente la production. Suivez ensuite l'[API de création d'environnement](/api/latest/feature-flags/create-an-environment/) pour créer un environnement dont le `queries` contient la valeur `DD_ENV` exacte : Tentez la requête avec la clé d'application fournie. Si Datadog la rejette car la clé manque d'autorisation, demandez à l'utilisateur d'accorder `feature_flag_environment_config_write` ou de fournir une clé d'application avec cette autorisation, puis réessayez. Laissez l'approbation des indicateurs de fonctionnalité désactivée à moins que l'utilisateur ne le demande explicitement, et utilisez le `data.id` renvoyé.
     - Si l'utilisateur refuse, ne déployez pas l'invite gérée dans un autre environnement. Expliquez qu'un environnement de Feature Flags correspondant à celui de l'application `DD_ENV` doit exister avant que l'invite puisse y être déployée.
5. Vérifiez s'il existe une correspondance exacte de l'ID d'invite avec `LLMObs.list_prompts()`. Si l'ID appartient déjà à une invite gérée, ne l'écrasez pas : demandez s'il faut intégrer cette invite ou choisir un ID différent. Une invite suivie qui n'est pas encore gérée peut être promue en utilisant son ID existant.
6. Créez et déployez la première version en une seule opération avec `env_ids` :

```python
from ddtrace.llmobs import LLMObs

created_prompt = LLMObs.create_prompt(
    "<PROMPT_ID>",
    chat_template,
    env_ids=[environment_id],
)
```

Utilisez cette méthode SDK publique pour la promotion. Si le SDK installé n'accepte pas `env_ids`, signalez qu'il ne prend pas en charge le déploiement de l'invite lors de la création. N'appelez ni de méthodes SDK privées ni l'API HTTP de Prompt Management comme solution de contournement.

Si la création signale un conflit, listez à nouveau les invites. Intégrez l'invite uniquement si l'ID confirmé appartient désormais à l'invite gérée prévue ; sinon, demandez à l'utilisateur de choisir un ID différent. Ne mettez pas à jour ou ne remplacez pas silencieusement une invite gérée existante.

Conservez la valeur `created_prompt["id"]` renvoyée. Il s'agit de l'UUID de l'invite utilisé par la page d'invites Datadog. Déterminez le host de l'application Datadog à partir de `DD_SITE` : utilisez `app.datadoghq.com` pour `datadoghq.com`, `app.datadoghq.eu` pour `datadoghq.eu`, `app.ddog-gov.com` pour `ddog-gov.com`, et la valeur `DD_SITE` elle-même pour les autres sites pris en charge. Incluez `https://<APPLICATION_HOST>/llm/prompts/<PROMPT_UUID>` dans la réponse finale après une promotion réussie. Si le host de l'application ne peut pas être déterminé en toute sécurité, identifiez l'invite créée par son prompt ID et demandez à l'utilisateur de l'ouvrir depuis Prompt Management au lieu de deviner une URL.

Une fois la promotion réussie, poursuivez avec la configuration et la récupération au moment de l'exécution ci-dessous. La clé d'application unique avec droits d'écriture peut être supprimée ; la récupération au moment de l'exécution doit utiliser une clé d'application avec le privilège minimum, dotée des autorisations de lecture décrites dans la section suivante.

## Configurez l'application {#configure-the-application}

Rendez les valeurs suivantes disponibles avant que `ddtrace` ne s'initialise, en utilisant le flux de travail de configuration et de gestion des secrets existant de l'application :

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

Préservez l'identité existante de l'application. Si `DD_SERVICE` ou `DD_LLMOBS_ML_APP` est déjà configuré, conservez cette valeur et ne renommez pas l'application dans le cadre de cette intégration. Si aucun des deux n'est configuré, définissez `DD_SERVICE` sur un nom logique basé sur le nom de l'application, du service ou du projet existant :

`DD_API_KEY` est requis pour la récupération de l'invite. Lorsque `DD_ENV` est défini, `DD_APP_KEY` est requis pour résoudre la version de l'invite déployée dans cet environnement. La clé d'application doit disposer des autorisations `llm_observability_read`, `feature_flag_config_read` et `feature_flag_environment_config_read`.

Si l'application n'envoie pas de données via un Datadog Agent, définissez également :

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

Si la configuration est disponible avant le démarrage du processus, conservez le flux de travail de démarrage existant et utilisez `ddtrace-run` si nécessaire pour l'instrumentation automatique. Si l'application charge la configuration en Python, chargez-la avant d'importer `ddtrace.auto`, puis exécutez la commande Python normale de l'application. Ne combinez pas le chargement de la configuration au niveau de l'application avec `ddtrace-run`.

Lors de la documentation d'un démarrage basé sur un shell, confirmez que la configuration atteint le processus Python enfant en exportant les variables, en les assignant en ligne sur la commande de lancement ou en préservant le mécanisme existant de l'application. Ne présentez pas d'assignations shell brutes et non exportées comme une configuration exécutable.

Une clé d'application avec droits d'écriture utilisée pour promouvoir une invite est un identifiant de configuration à usage unique. Ne l'ajoutez pas à la configuration d'exécution de l'application à moins que l'utilisateur ne l'ait explicitement sélectionnée pour une utilisation lors de l'exécution et qu'elle dispose également des autorisations de lecture requises. Sinon, utilisez une clé d'application d'exécution distincte avec le privilège minimum.

Pour une intégration d'invite gérée existante, si l'invite de l'utilisateur n'inclut pas d'identifiants, ne demandez pas à l'utilisateur de les fournir. Complétez les références de code et de configuration dans la mesure du possible, puis signalez que la résolution et le suivi de l'invite en direct n'ont pas pu être vérifiés. La promotion est différente : il s'agit d'une opération de configuration approuvée par l'utilisateur qui nécessite les identifiants avec droits d'écriture décrits dans [Promouvoir une invite locale](#promote-a-local-prompt).

## Récupérer et formater l'invite gérée {#retrieve-and-format-the-managed-prompt}

1. Utilisez l'ID d'invite et les noms de variables fournis pour une invite gérée existante sans demander à l'utilisateur de les confirmer. Pour une invite promue, utilisez l'ID et les variables confirmés lors de la promotion. Si les métadonnées requises sont manquantes, demandez-les au lieu de les deviner.
2. Confirmez que chaque variable d'invite gérée dispose d'une valeur significative disponible à la limite de construction d'invite sélectionnée. Si l'application ne peut pas en fournir une, demandez à l'utilisateur comment l'associer et attendez une réponse.
3. Importez `LLMObs` depuis `ddtrace.llmobs` à la limite de construction d'invite existante.
4. Remplacez la construction d'invite existante à cet endroit par `LLMObs.get_prompt()` en utilisant l'ID d'invite fourni par l'utilisateur.
5. Préservez l'invite de chat existante de l'application en tant que liste de messages `fallback`.
6. Exprimez les espaces réservés de secours dynamiques avec `{{variable}}` syntax, using the exact supplied variable names. Do not leave Python-style `{variable}` placeholders in the fallback.
7. Call `prompt.format()` avec des valeurs pour chaque variable fournie, puis transmettez les messages formatés à l'appel de fournisseur existant sans modifier le fournisseur, le modèle ou tout comportement non lié.

Exemple :

```python
from ddtrace.llmobs import LLMObs

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": company,
    "question": question,
}

prompt = LLMObs.get_prompt(
    "<PROMPT_ID>",
    fallback=default_messages,
)
messages = prompt.format(**variables)
```

## Suivez l'utilisation des invites {#track-prompt-usage}

Lorsque la valeur formatée est transmise directement à un fournisseur pris en charge et instrumenté automatiquement, conservez cette valeur inchangée afin que Datadog puisse associer automatiquement le prompt géré à l’étendue LLM résultante.

Si l’application copie, reconstruit, concatène, modifie ou transforme autrement la valeur formatée avant l'appel au fournisseur, enveloppez cet appel avec `LLMObs.annotation_context()` et transmettez les mêmes variables à `prompt.to_annotation_dict()` que celles transmises à `prompt.format()`. Traitez l’ajout ou l’extension d’une liste de messages de chat formatée avec des messages utilisateur, des réponses d’assistant, des appels d’outils ou des résultats d’outils — y compris dans une boucle multi-tours — comme une transformation, et maintenez le contexte d’annotation actif pour chaque appel de fournisseur qui utilise cette conversation.

Avant de terminer l’intégration, inspectez le flux de données réel de `prompt.format()` vers chaque appel de fournisseur : si un élément intermédiaire copie, reconstruit, concatène, modifie ou convertit la valeur formatée, utilisez `annotation_context()`.

```python
variables = {"audience": audience}
system_prompt = prompt.format(**variables)
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(**variables),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

`annotation_context()` ne crée pas d'étendue LLM. Assurez-vous que le fournisseur est instrumenté automatiquement ou conservez l’instrumentation manuelle d’étendue LLM existante de l’application.

## Vérifiez l'intégration {#verify-the-integration}

1. Utilisez le flux de travail existant de l’application pour effectuer des vérifications locales qui n’effectuent pas de requêtes externes.
2. N'interrogez pas Datadog et n’utilisez pas les méthodes de lecture d’étendue du SDK pour vérifier le suivi des invites.
3. Si la vérification nécessite l’exécution de l’application, l’envoi d’une requête au fournisseur, l’engagement de frais, l’émission de télémétrie ou la génération d’un autre effet secondaire externe, ne terminez pas la tâche simplement en fournissant la commande d’exécution. Demandez l’approbation pour cette commande exacte via le mécanisme d’approbation de l’environnement de codage, ou demandez directement à l’utilisateur et attendez sa confirmation. L'approbation de l'exécution d'un outil constitue une confirmation.
4. Si l'utilisateur autorise l'exécution, utilisez le flux de travail d'exécution normal de l'application et exécutez l'appel de fournisseur modifié. Si l'utilisateur refuse, indiquez-lui la commande ou l'action exacte nécessaire pour le faire.
5. Dans la réponse finale, indiquez si l'application a été exécutée. Après une promotion, incluez le lien direct vers la page d'invite construit à partir de l'UUID renvoyé par `LLMObs.create_prompt()`. Sinon, incluez un lien direct vers la page d’invite lorsque son UUID et le host de l’application sont connus. Demandez à l’utilisateur de déclencher le flux LLM modifié si nécessaire, de retourner sur cette page d’invite dans Datadog et d’attendre un court instant que l’utilisation de l’invite apparaisse.
6. Signalez toute erreur d’authentification, d’autorisation, de récupération ou de suivi avec précision. Ne prétendez pas que le suivi côté Datadog a été vérifié à moins que l'utilisateur ne le confirme.