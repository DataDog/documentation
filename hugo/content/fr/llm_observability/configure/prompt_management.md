---
aliases:
- /fr/llm_observability/monitoring/prompt_management/
description: Créez, versionnez et récupérez des prompts gérés dans des applications
  Python avec la Gestion des prompts.
further_reading:
- link: /llm_observability/instrument/prompt_tracking
  tag: Documentation
  text: Suivi des prompts
- link: /llm_observability/improve/playground
  tag: Documentation
  text: Playground
- link: /llm_observability/instrument/sdk/?tab=python
  tag: Documentation
  text: SDK Agent Observability
title: Gestion des prompts
---
## Présentation {#overview}

La Gestion des prompts fournit un registre centralisé pour les prompts utilisés par vos applications LLM. Au lieu de coder en dur les modèles de prompts dans le code de l'application ou les fichiers de configuration, créez, versionnez et mettez à jour les prompts via Agent Observability, puis récupérez-les au moment de l'exécution.

La récupération au moment de l'exécution est prise en charge en Python via le SDK `ddtrace`. La récupération de prompts et le Suivi des prompts sont distincts : `LLMObs.get_prompt()` peut récupérer un prompt géré sans activer Agent Observability, mais Agent Observability doit être activé pour créer des spans LLM et leur associer des métadonnées de prompt.

Après avoir créé des versions de prompts, utilisez [Prompt Experimentation][10] pour les comparer avec un test A/B ou en déployer une progressivement avec un Déploiement contrôlé.

La Gestion des prompts fonctionne parallèlement au [Suivi des prompts][1]. Lorsque Agent Observability est activé, les prompts gérés transmis directement aux appels LLM pris en charge et instrumentés automatiquement sont associés aux spans résultants.

## Prérequis {#prerequisites}

- Python 3.9 ou version ultérieure.
- ddtrace>=4.13.0
- Votre [site Datadog][2] et une [clé d'API Datadog][3]. La clé d'API est requise pour la récupération de prompts même si les traces sont envoyées via Datadog Agent.
- Une [clé d'application Datadog][4] avec les autorisations `llm_observability_read`, `feature_flag_config_read` et `feature_flag_environment_config_read` pour résoudre les prompts par environnement. Si vous sélectionnez une clé d'application existante dans Datadog, assurez-vous qu'elle dispose de ces autorisations.
- Pour gérer les prompts via l'API ou le SDK Python, la clé d'application nécessite également les autorisations `llm_observability_write` et `feature_flag_config_write`.

## Installez le SDK {#install-the-sdk}

Installez ou mettez à niveau le dernier package `ddtrace` dans l'environnement Python utilisé par votre application :

```shell
pip install --upgrade ddtrace
```

## Utilisez un prompt géré en Python {#use-a-managed-prompt-in-python}

### Intégrez la Gestion des prompts à un agent de codage {#integrate-prompt-management-with-a-coding-agent}

Intégrez un prompt géré avec l'agent de codage de votre choix en collant le prompt suivant :

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

Optionnellement, ajoutez les identifiants Datadog sélectionnés afin que l'agent de codage puisse configurer et vérifier l'intégration au cours de la même session :

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**Remarque :** L'inclusion des clés d'API et d'application dans le prompt est facultative et n'est pas requise pour que l'agent de codage intègre la Gestion des prompts. Incluez-les uniquement dans une session d'agent de codage de confiance.

Une fois l'intégration terminée, exécutez votre application et déclenchez le flux LLM modifié. Revenez à la page des prompts pour voir l'utilisation ; les nouveaux appels de prompt peuvent mettre une minute à apparaître.

### Configurer la récupération de prompts {#configure-prompt-retrieval}

Fournissez le site Datadog, les identifiants et l'environnement de déploiement via le workflow de configuration et de gestion des secrets déjà utilisé par votre application. Par exemple, utilisez le fichier d'environnement de l'application, la configuration Docker Compose ou Kubernetes, la plateforme de déploiement ou le gestionnaire de secrets. Au moment de l'exécution, les variables d'environnement suivantes doivent être définies avant d'importer `ddtrace` :

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` sélectionne l'environnement utilisé pour résoudre la version du prompt et doit correspondre à un environnement où le prompt est déployé.

### Récupérez, formatez et utilisez un prompt {#retrieve-format-and-use-a-prompt}

Conservez le prompt déjà utilisé par votre application comme solution de secours. La solution de secours permet à l'application de continuer à fonctionner en cas de défaillance du registre, de la résolution d'environnement, du réseau ou du serveur.

L'exemple suivant récupère et formate un prompt de chat, puis transmet les messages formatés directement à OpenAI :

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

`prompt.format()` renvoie une chaîne pour un prompt de texte et une liste de messages pour un prompt de chat. Transmettez la valeur formatée au paramètre de texte ou de messages correspondant de votre appel au fournisseur LLM.

Si la récupération échoue et qu'aucune solution de secours n'est fournie, `get_prompt()` génère une `ValueError`. Une solution de secours ne remplace pas l'authentification : `DD_API_KEY` est toujours requis, et `DD_APP_KEY` est également requis lorsque `DD_ENV` est défini.

Les prompts gérés ne peuvent pas référencer d'autres prompts gérés dans leurs modèles. Pour composer des prompts, combinez-les dans le code de l'application ou gérez le prompt final destiné au fournisseur en tant que prompt unique.

### Sélectionnez une version {#select-a-version}

Sans `DD_ENV`, `get_prompt()` récupère la dernière version du prompt :

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

Avec `DD_ENV`, `get_prompt()` résout la version du prompt pour cet environnement. Cela nécessite `DD_APP_KEY` avec les autorisations de lecture répertoriées dans [Prérequis](#prerequisites).

Pour récupérer une version numérique exacte indépendamment de `DD_ENV`, passez `version` :

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

L'argument `version` prévaut sur la résolution de l'environnement.

### Suivez l'utilisation du prompt {#track-prompt-usage}

Pour associer un prompt géré à un span LLM, [activez Agent Observability][5] et exécutez l'application avec une instrumentation automatique via son workflow d'exécution existant.

Si l'application reçoit sa configuration avant le démarrage du processus Python, utilisez `ddtrace-run`. Par exemple, la commande shell équivalente est :

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

Si l'application charge sa configuration en Python, chargez d'abord la configuration, puis importez `ddtrace.auto` avant d'importer le fournisseur LLM ou d'autres modules de l'application :

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

Exécutez cette configuration avec la commande Python normale de l'application, telle que `python app.py`. N'utilisez pas non plus `ddtrace-run` ; cela initialise `ddtrace` avant que l'application ne puisse charger sa configuration.

Si l'application n'envoie pas de données via un Datadog Agent, définissez également `DD_LLMOBS_AGENTLESS_ENABLED=1`.

Pour un [fournisseur instrumenté automatiquement pris en charge][6], passez la valeur renvoyée par `prompt.format()` directement à l'appel du fournisseur, comme indiqué dans [Récupérer, formater et utiliser un prompt](#retrieve-format-and-use-a-prompt). Cela associe automatiquement le prompt géré au span résultant.

La copie, la reconstruction ou la conversion de la valeur formatée peut supprimer ses métadonnées de suivi de prompt. Par exemple, la concaténation d'un prompt système géré avec une question utilisateur crée une nouvelle chaîne sans ces métadonnées. Utilisez `LLMObs.annotation_context()` pour associer le prompt géré au span LLM résultant :

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

Transmettez les mêmes variables à `to_annotation_dict()` que celles que vous transmettez à `format()` afin que le prompt suivi inclue les valeurs utilisées pour cet appel.

`annotation_context()` associe des métadonnées à un span LLM créé dans le contexte ; cela ne crée pas le span. Pour les fournisseurs qui ne sont pas instrumentés automatiquement, commencez par [instrumenter manuellement l'appel LLM][7] pour créer un span LLM. Un `annotation_context()` explicite prévaut sur le suivi automatique des prompts. Voir [Suivi des prompts][1] pour plus d'informations.

## Créer et gérer des prompts {#create-and-manage-prompts}

Créez des prompts et publiez de nouvelles versions dans l'interface utilisateur {{< ui >}}Prompts{{< /ui >}}, via le SDK Python ou via l'API.

### Créer un prompt {#create-a-prompt}

#### Promouvoir un prompt suivi {#promote-a-tracked-prompt}

Pour promouvoir un prompt déjà suivi dans Agent Observability en un prompt géré, accédez à la page {{< ui >}}Prompts{{< /ui >}}, ouvrez le prompt et cliquez sur {{< ui >}}Register{{< /ui >}}. Vous pouvez ensuite mettre à jour le prompt dans l'interface utilisateur et le récupérer au moment de l'exécution.

#### Dans l'interface utilisateur à partir de zéro {#in-the-ui-from-scratch}

Accédez à la page {{< ui >}}Prompts{{< /ui >}} et cliquez sur {{< ui >}}\+ New Prompt{{< /ui >}}.

Dans l'éditeur de prompt :

1. Ajoutez un ou plusieurs messages et attribuez à chacun un rôle : {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}} ou {{< ui >}}Assistant{{< /ui >}}.
2. Utilisez la syntaxe `{{variable_name}}` dans n'importe quel message pour ajouter du contenu dynamique.
3. Facultatif : Cliquez sur {{< ui >}}Run{{< /ui >}} pour tester le prompt avec des valeurs d'exemple.
4. Cliquez sur {{< ui >}}Save Prompt{{< /ui >}} pour ouvrir la boîte de dialogue d'enregistrement.

Structurez le prompt de manière à ce que la requête de l'utilisateur et le contexte soient injectés sous forme de variables :

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="Le Playground avec un message de System Prompt indiquant « Vous êtes un agent de support pour {{company}} » et un message de User Prompt contenant {{question}}, avec le bouton Save Prompt en haut à droite." style="width:100%;" >}}

Dans la boîte de dialogue d'enregistrement :

| Champ | Description |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | Un identifiant unique pour le prompt, tel que `customer-support-greeting`. Utilisez cet ID pour récupérer le prompt avec `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Notes facultatives sur cette version. |
| {{< ui >}}Deployment{{< /ui >}} | L'environnement vers lequel cette version est déployée. |

Cliquez sur {{< ui >}}Create Prompt{{< /ui >}} pour enregistrer le prompt dans le registre.

### Mettez à jour, listez et supprimez des prompts {#update-list-and-delete-prompts}

#### Dans l'interface utilisateur {#in-the-ui}

Ouvrez un prompt dans la page {{< ui >}}Prompts{{< /ui >}} pour :

- **Créez une nouvelle version** : Cliquez sur {{< ui >}}Edit{{< /ui >}} et mettez à jour les messages dans l'éditeur de prompt.
- **Déployez une version vers un autre environnement** : Sélectionnez une version et mettez à jour ses environnements {{< ui >}}Deployment{{< /ui >}}.
- **Supprimez un prompt** : Sélectionnez {{< ui >}}Delete{{< /ui >}} dans le menu d'options du prompt. Cela supprime le prompt et son historique de versions du registre.

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

Pour publier et déployer une autre version, utilisez `LLMObs.create_prompt_version()` :

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

Utilisez l'API de gestion des prompts pour créer, récupérer, mettre à jour et supprimer des prompts et des versions de prompts. Consultez la [référence de l'API Agent Observability][8] pour les schémas d'endpoint, les types de médias de requête et des exemples.

## Configuration de la version du prompt {#version-prompt-configuration}

<div class="alert alert-info"><strong>Aperçu :</strong> La configuration de prompt versionnée est disponible en aperçu. Pour demander l'accès, contactez <a href="https://www.datadoghq.com/support/">Datadog Support</a> ou votre Customer Success Manager.</div>

Stockez les paramètres avec votre prompt afin de pouvoir mettre à jour et restaurer les deux en tant que version unique. Utilisez la configuration pour :

- **Paramètres du modèle**, tels que `model` et `temperature`.
- **Schémas de sortie structurés**, tels que `response_format`.
- **Définitions d'outils**, telles que `tools` et `tool_choice`.

La configuration est un objet JSON dont vous définissez les champs. Votre application lit et applique ces paramètres ; Datadog ne les applique pas automatiquement aux exécutions dans le Playground ou aux appels de modèle. Ne stockez pas de secrets dans la configuration.

### Ajouter une configuration {#add-configuration}

1. Sur la page {{< ui >}}Prompts{{< /ui >}}, cliquez sur {{< ui >}}New Prompt{{< /ui >}} et rédigez votre modèle.
2. Cliquez sur {{< ui >}}Save Prompt{{< /ui >}}. Saisissez un ID de prompt, développez {{< ui >}}Configuration (optional){{< /ui >}}, et ajoutez des paramètres :

   ```json
   {
     "model": "<MODEL_NAME>",
     "temperature": 0.2
   }
   ```

3. Remplacez `<MODEL_NAME>` par un modèle qui prend en charge ces paramètres, puis cliquez sur {{< ui >}}Create prompt{{< /ui >}}.

L'éditeur nécessite un objet JSON valide. Son texte d'exemple est un espace réservé, pas une configuration enregistrée.

{{< img src="llm_observability/monitoring/create-prompt-configuration-document-extractor.png" alt="Créez une nouvelle boîte de dialogue de prompt avec la section Configuration facultative développée, affichant les paramètres du modèle, de la température et du format de réponse JSON." style="width:100%;" >}}

### Mettre à jour la configuration {#update-configuration}

1. Ouvrez une version de prompt et sélectionnez l'onglet {{< ui >}}Configuration{{< /ui >}}.
2. Cliquez sur {{< ui >}}Update configuration{{< /ui >}} et modifiez les paramètres.
3. Cliquez sur {{< ui >}}Save version{{< /ui >}}. Pour inspecter la différence avant d'enregistrer, cliquez d'abord sur {{< ui >}}Review changes{{< /ui >}}.

{{< img src="llm_observability/monitoring/configuration-tab-app-configured-cropped.png" alt="Onglet Configuration affichant les paramètres de modèle enregistrés et le bouton Mettre à jour la configuration." style="width:100%;" >}}

Cela crée une version sans écraser l'original. Utilisez {{< ui >}}Compare{{< /ui >}} pour inspecter les modifications de configuration.

Déployez la version dans un environnement lorsqu'elle est prête. Les applications récupérant cet environnement reçoivent son modèle et sa configuration sélectionnés ensemble. Pour restaurer les deux, déployez une version antérieure. La simple sauvegarde ne modifie pas la version utilisée par un environnement.

### Utilisez la configuration dans votre application {#use-configuration-in-your-application}

Récupérez le prompt déployé dans l'environnement de votre application, puis transmettez sa configuration à votre client de modèle.

**Aperçu de l'accès au SDK :** Contactez Datadog Support ou votre Customer Success Manager pour connaître la version du SDK à utiliser pour votre langage.

Ces exemples utilisent un prompt nommé `summarizer` avec la configuration affichée ci-dessus.

{{< tabs >}}
{{% tab "Python" %}}

Accédez à la configuration via `prompt.config` :

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt("summarizer")
config = prompt.config

model = config["model"]
temperature = config.get("temperature", 0.2)
```

Utilisez ces valeurs avec `prompt.format(...)` dans votre [appel de modèle](#retrieve-format-and-use-a-prompt).

{{% /tab %}}
{{% tab "Node.js" %}}

Une fois `dd-trace` initialisé, accédez à `prompt.config` dans votre code d'application asynchrone :

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('summarizer')
const config = prompt.config

const model = config.model
const temperature = config.temperature ?? 0.2
```

Transmettez ces valeurs à votre client de modèle existant avec le prompt formaté.

{{% /tab %}}
{{% tab "Go" %}}

Accédez à `prompt.Config()` dans votre gestionnaire de requêtes ou votre fonction d'application :

```go
prompt, err := llmobs.GetPrompt(ctx, "summarizer")
if err != nil {
    return err
}
config := prompt.Config()

model := config["model"].(string)
temperature, ok := config["temperature"].(float64)
if !ok {
    temperature = 0.2
}
```

Transmettez ces valeurs à votre client de modèle avec les messages renvoyés par `prompt.Format(...)`.

{{% /tab %}}
{{< /tabs >}}

**Création d'API :** Vous pouvez également créer des prompts et des versions avec l'[API de gestion des prompts][8]. L'omission de `config` crée une configuration vide pour un nouveau prompt ou hérite de la dernière configuration pour une nouvelle version. Envoyez `{}` pour l'effacer.

## Utilisation avancée {#advanced-usage}

### Diffuser plusieurs versions à partir d'un seul environnement {#serve-multiple-versions-from-one-environment}

La gestion des prompts s'appuie sur le produit Feature Flags de Datadog. Chaque environnement résout les appels `get_prompt()` vers une version par défaut, et peut également diffuser une version différente pour les appels qui correspondent à une règle de ciblage.

Par exemple, déployez une version de prompt instable auprès d'un sous-ensemble d'utilisateurs dans `production` avec une règle de ciblage, tandis que tous les autres continuent de recevoir la version stable :

```python
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
```

Pour configurer cela :

1. Dans la liste des versions du prompt, survolez un environnement et cliquez sur {{< ui >}}Targeting Rules{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="Un panneau d'environnement montrant l'environnement diffusant actuellement une version de prompt, avec un lien vers les règles de ciblage." style="width:60%;" >}}

2. Cliquez sur {{< ui >}}Add Targeting Rule{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="Le panneau des règles de ciblage pour un environnement, montrant la version par défaut diffusée lorsqu'aucune règle ne correspond et un bouton Ajouter une règle de ciblage." style="width:100%;" >}}

3. Définissez le filtre de règle. Par exemple, faites correspondre les appels à `get_prompt()` qui transmettent l'attribut `tag=unstable`, et définissez la variante résultante sur la version de prompt instable.

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="Le générateur de filtres de règles de ciblage, correspondant à un attribut de tag défini sur instable." style="width:100%;" >}}

4. Enregistrez la règle. Les appels avec `tag=unstable` se résolvent vers la version correspondante ; tous les autres appels retombent sur la version par défaut.

Passez les attributs référencés par vos règles de ciblage en tant qu'arguments nommés à `get_prompt()`. Les appels qui ne transmettent pas d'attribut correspondant continuent de se résoudre vers la version par défaut de l'environnement.

Pour récupérer une version exacte indépendamment de toute règle de ciblage, passez `version` comme décrit dans [Select a version](#select-a-version).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrument/prompt_tracking
[2]: /fr/getting_started/site/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/account_management/api-app-keys/#application-keys
[5]: /fr/llm_observability/instrument/sdk/?tab=python
[6]: /fr/llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /fr/llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[8]: /fr/api/latest/agent-observability/
[9]: /fr/api/latest/feature-flags/list-environments/
[10]: /fr/llm_observability/configure/prompt_experimentation/