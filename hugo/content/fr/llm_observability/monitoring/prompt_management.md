---
description: Créez, versionnez et récupérez des prompts gérés dans des applications
  Python avec Prompt Management.
further_reading:
- link: /llm_observability/monitoring/prompt_tracking
  tag: Documentation
  text: Prompt Tracking
- link: /llm_observability/playground
  tag: Documentation
  text: Playground
- link: /llm_observability/instrumentation/sdk/?tab=python
  tag: Documentation
  text: Agent Observability SDK
title: Prompt Management
---
{{< callout url="https://www.datadoghq.com/" btn_hidden="true">}}
Prompt Management est en préversion.
{{< /callout >}}

## Vue d'ensemble {#overview}

Prompt Management fournit un registre centralisé pour les prompts utilisés par vos applications LLM. Au lieu de coder en dur les modèles de prompt dans le code de l'application ou les fichiers de configuration, créez, versionnez et mettez à jour les prompts via Agent Observability, puis récupérez-les au moment de l'exécution.

La récupération de prompts au moment de l'exécution est prise en charge en Python via `ddtrace` le SDK. La récupération de prompts et Prompt Tracking sont distincts : `LLMObs.get_prompt()` peut récupérer un prompt géré sans activer Agent Observability, mais Agent Observability doit être activé pour créer des spans LLM et leur associer des métadonnées de prompt.

Prompt Management fonctionne parallèlement au [Prompt Tracking][1]. Lorsque Agent Observability est activé, les prompts gérés transmis directement aux appels LLM pris en charge et instrumentés automatiquement sont associés aux spans résultants.

## Prérequis {#prerequisites}

- Python 3.9 ou version ultérieure.
- Votre [site Datadog][2] et une [Datadog API key][3]. La clé d'API est requise pour la récupération de prompts même si les traces sont envoyées via Datadog Agent.
- Une [Datadog Application Key][4] avec les autorisations `llm_observability_read`, `feature_flag_config_read` et `feature_flag_environment_config_read` pour résoudre les prompts par environnement. Si vous sélectionnez une clé d'application existante dans Datadog, assurez-vous qu'elle dispose de ces autorisations.
- Pour gérer les prompts via l'API ou le SDK Python, la clé d'application nécessite également les autorisations `llm_observability_write` et `feature_flag_config_write`.

## Installez le SDK {#install-the-sdk}

Installez ou mettez à niveau le dernier package `ddtrace` dans l'environnement Python utilisé par votre application :

```shell
pip install --upgrade ddtrace
```

## Utilisez un prompt géré en Python {#use-a-managed-prompt-in-python}

### Intégrez Prompt Management avec un agent de codage {#integrate-prompt-management-with-a-coding-agent}

Intégrez un prompt géré avec l'agent de codage de votre choix en collant le prompt suivant :

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrumentation/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

En option, ajoutez les identifiants Datadog sélectionnés afin que l'agent de codage puisse configurer et vérifier l'intégration au cours de la même session :

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**Remarque :** L'inclusion des clés d'API et d'application dans le prompt est facultative et n'est pas requise pour que l'agent de codage intègre la gestion des prompts. Incluez-les uniquement dans une session d'agent de codage de confiance.

Une fois l'intégration terminée, exécutez votre application et déclenchez le flux LLM modifié. Retournez sur la page des prompts pour consulter l'utilisation ; les nouveaux appels de prompt peuvent mettre une minute à apparaître.

### Configurez la récupération de prompts {#configure-prompt-retrieval}

Fournissez le site Datadog, les identifiants et l'environnement de déploiement via le flux de travail de configuration et de gestion des secrets déjà utilisé par votre application. Par exemple, utilisez le fichier d'environnement de l'application, la configuration Docker Compose ou Kubernetes, la plateforme de déploiement ou le gestionnaire de secrets. Au moment de l'exécution, les variables d'environnement suivantes doivent être définies avant l'importation de `ddtrace` :

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` sélectionne l'environnement utilisé pour résoudre la version du prompt et doit correspondre à un environnement où le prompt est déployé.

### Récupérez, formatez et utilisez un prompt {#retrieve-format-and-use-a-prompt}

Conservez le prompt déjà utilisé par votre application comme solution de secours. La solution de secours permet à l'application de continuer à fonctionner en cas de défaillance du registre, de la résolution d'environnement, du réseau ou du serveur.

L'exemple suivant récupère et formate un prompt de chat, puis transmet les messages formatés directement à OpenAI :

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme Inc.",
    "question": "How do I reset my password?",
}

prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    fallback=default_messages,
)
messages = prompt.format(**variables)

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

`prompt.format()` renvoie une chaîne pour un prompt de texte et une liste de messages pour un prompt de chat. Transmettez la valeur formatée au paramètre de texte ou de message correspondant de votre appel au fournisseur de LLM.

Si la récupération échoue et qu'aucun repli n'est fourni, `get_prompt()` génère une `ValueError`. Un repli ne remplace pas l'authentification : `DD_API_KEY` est toujours requis, et `DD_APP_KEY` est également requis lorsque `DD_ENV` est défini.

Les prompts gérés ne peuvent pas référencer d'autres prompts gérés dans leurs modèles. Pour composer des prompts, combinez-les dans le code de l'application ou gérez le prompt final destiné au fournisseur comme un seul prompt.

### Sélectionnez une version {#select-a-version}

Sans `DD_ENV`, `get_prompt()` récupère la dernière version du prompt :

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

Avec `DD_ENV`, `get_prompt()` résout la version du prompt pour cet environnement. Cela nécessite `DD_APP_KEY` avec les autorisations de lecture répertoriées dans [Prérequis](#prerequisites).

Pour récupérer une version numérique exacte indépendamment de `DD_ENV`, transmettez `version` :

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

L'argument `version` prévaut sur la résolution de l'environnement.

### Suivez l'utilisation des prompts {#track-prompt-usage}

Pour associer un prompt géré à une étendue LLM, [activez Agent Observability][5] et exécutez l'application avec une instrumentation automatique via son flux d'exécution existant.

Si l'application reçoit sa configuration avant le démarrage du processus Python, utilisez `ddtrace-run`. Par exemple, la commande shell équivalente est :

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

Si l'application charge sa configuration en Python, chargez d'abord la configuration, puis importez `ddtrace.auto` avant d'importer le fournisseur de LLM ou d'autres modules de l'application :

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

Exécutez cette configuration avec la commande Python normale de l'application, telle que `python app.py`. N'utilisez pas non plus `ddtrace-run` ; cela initialise `ddtrace` avant que l'application ne puisse charger sa configuration.

Si l'application n'envoie pas de données via Datadog Agent, définissez également `DD_LLMOBS_AGENTLESS_ENABLED=1`.

Pour un [fournisseur instrumenté automatiquement pris en charge][6], transmettez la valeur renvoyée par `prompt.format()` directement à l'appel du fournisseur, comme indiqué dans [Récupérer, formater et utiliser un prompt](#retrieve-format-and-use-a-prompt). Ceci associe automatiquement le prompt géré à l'étendue résultante.

La copie, la reconstruction ou la conversion de la valeur formatée peut entraîner la perte de ses métadonnées de suivi de prompt. Par exemple, la concaténation d'un prompt système géré avec une question utilisateur crée une nouvelle chaîne sans ces métadonnées. Utilisez `LLMObs.annotation_context()` pour associer le prompt géré à l'étendue LLM résultante :

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent writing for a {{audience}} audience.",
)
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

Passez les mêmes variables à `to_annotation_dict()` que celles que vous passez à `format()` afin que le prompt suivi inclut les valeurs utilisées pour cet appel.

`annotation_context()` associe des métadonnées à une étendue LLM créée dans le contexte; cela ne crée pas l'étendue. Pour les fournisseurs qui ne sont pas instrumentés automatiquement, [instrumentez manuellement l'appel LLM][7] d'abord pour créer une étendue LLM. Un `annotation_context()` explicite prévaut sur le suivi automatique des prompts. Voir [Prompt Tracking][1] pour plus d'informations.

## Créez et gérez des prompts {#create-and-manage-prompts}

Créez des prompts et publiez de nouvelles versions dans l'interface utilisateur {{< ui >}}Prompts{{< /ui >}}, via le SDK Python ou via l'API.

### Créez un prompt {#create-a-prompt}

#### Promouvez un prompt suivi {#promote-a-tracked-prompt}

Pour promouvoir un prompt déjà suivi dans Agent Observability vers un prompt géré, accédez à la page {{< ui >}}Prompts{{< /ui >}}, ouvrez le prompt et cliquez sur {{< ui >}}Register{{< /ui >}}. Vous pouvez ensuite mettre à jour le prompt dans l'interface utilisateur et le récupérer au moment de l'exécution.

#### Dans l'interface utilisateur à partir de zéro {#in-the-ui-from-scratch}

Accédez à la page {{< ui >}}Prompts{{< /ui >}} et cliquez sur {{< ui >}}+ New Prompt{{< /ui >}}.

Dans l'éditeur de prompt :

1. Ajoutez un ou plusieurs messages et attribuez à chacun un rôle : {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}} ou {{< ui >}}Assistant{{< /ui >}}.
2. Utilisez `Utilisez la syntaxe {{variable_name}} dans n'importe quel message pour ajouter du contenu dynamique.
3. Facultatif : Cliquez sur {{< ui >}}Run{{< /ui >}} pour tester le prompt avec des valeurs d'exemple.
4. Cliquez sur {{< ui >}}Save Prompt{{< /ui >}} pour ouvrir la boîte de dialogue d'enregistrement.

Structurez le prompt de manière à ce que la requête de l'utilisateur et le contexte soient injectés sous forme de variables :

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="Le Playground avec un message de prompt système indiquant « Vous êtes un agent de support pour {{company}} » et un message de prompt utilisateur contenant {{question}}, avec le bouton Enregistrer le prompt en haut à droite." style="width:100%;" >}}

Dans la boîte de dialogue d'enregistrement :

| Champ | Description |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | Un identifiant unique pour le prompt, tel que `customer-support-greeting`. Utilisez cet ID pour récupérer le prompt avec `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Notes facultatives sur cette version. |
| {{< ui >}}Deployment{{< /ui >}} | L'environnement dans lequel cette version est déployée. |

Cliquez sur {{< ui >}}Create Prompt{{< /ui >}} pour enregistrer le prompt dans le registre.

### Mettez à jour, listez et supprimez des prompts {#update-list-and-delete-prompts}

#### Dans l'interface utilisateur {#in-the-ui}

Ouvrez un prompt dans la page {{< ui >}}Prompts{{< /ui >}} pour :

- **Créez une nouvelle version** : Cliquez sur {{< ui >}}Edit{{< /ui >}} et mettez à jour les messages dans l'éditeur de prompt.
- **Déployez une version vers un autre environnement** : Sélectionnez une version et mettez à jour ses environnements {{< ui >}}Deployment{{< /ui >}}.
- **Supprimez un prompt** : Sélectionnez {{< ui >}}Delete{{< /ui >}} dans le menu des options du prompt. Cela supprime le prompt et son historique de versions du registre.

### Utilisez le SDK Python {#use-the-python-sdk}

Utilisez `LLMObs.create_prompt()` pour créer un prompt et déployer sa première version dans un ou plusieurs environnements. Les valeurs `env_ids` sont les identifiants d'environnement des Feature Flags, que vous pouvez obtenir à partir de l'[API de liste des environnements][9] :

```python
from ddtrace.llmobs import LLMObs

chat_template = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

created_prompt = LLMObs.create_prompt(
    "customer-support-greeting",
    chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

Pour publier et déployer une autre version, utilisez `LLMObs.create_prompt_version()` :

```python
created_version = LLMObs.create_prompt_version(
    "customer-support-greeting",
    updated_chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

Traitez la création, le versionnage et le déploiement de prompts comme des opérations de configuration. Ne les effectuez pas lors du démarrage de l'application ou à partir d'un chemin de requête. Au moment de l'exécution, récupérez les prompts déployés avec `LLMObs.get_prompt()`.

Ces méthodes nécessitent les autorisations de clé d'application et d'API répertoriées dans [Prérequis](#prerequisites).

Utilisez `LLMObs.list_prompts()` et `LLMObs.list_prompt_versions()` pour inspecter les prompts gérés, `LLMObs.update_prompt()` et `LLMObs.update_prompt_version()` pour mettre à jour les métadonnées ou les déploiements, et `LLMObs.delete_prompt()` pour supprimer un prompt et toutes ses versions.

### Utilisez l'API {#use-the-api}

Utilisez l'API de gestion des prompts pour créer, récupérer, mettre à jour et supprimer des prompts et des versions de prompts. Consultez la [référence de l'API LLM Observability][8] pour les schémas de points de terminaison, les types de médias de requête et des exemples.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/monitoring/prompt_tracking
[2]: /fr/getting_started/site/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/account_management/api-app-keys/#application-keys
[5]: /fr/llm_observability/instrumentation/sdk/?tab=python
[6]: /fr/llm_observability/instrumentation/auto_instrumentation/?tab=python
[7]: /fr/llm_observability/instrumentation/sdk/?tab=python#manual-instrumentation
[8]: /fr/api/latest/llm-observability/
[9]: /fr/api/latest/feature-flags/list-environments/