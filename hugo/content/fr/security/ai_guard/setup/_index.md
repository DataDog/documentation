---
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Démarrez avec AI Guard
title: Configurer AI Guard
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Suivez les étapes suivantes pour configurer AI Guard :

## 1. Vérifier les prérequis {#1-check-prerequisites}

Avant de configurer AI Guard, assurez-vous d'avoir tout ce dont vous avez besoin :
- Pendant qu'AI Guard est en version préliminaire, Datadog doit activer un indicateur de fonctionnalité backend pour chaque organisation dans la version préliminaire. Contactez le [support Datadog][1] avec un ou plusieurs noms d'organisation Datadog et régions pour l'activer.
- Certaines étapes de configuration nécessitent des autorisations Datadog spécifiques. Un administrateur peut avoir besoin de créer un nouveau rôle avec les autorisations requises et de vous l'attribuer :
  | Autorisation                                    | Type  | Description                                                                                                                                                                                                     |
  |-----------------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate** (`ai_guard_evaluate`)   | Écriture | Requis pour appeler l'API d'évaluation AI Guard et pour créer une clé d'application avec la portée `ai_guard_evaluate`.                                                                                                 |
  | **AI Guard View** (`ai_guard_view`)           | Lecture  | Requis pour afficher l'interface utilisateur d'AI Guard, y compris les signaux, les spans et les paramètres en lecture seule (politiques de blocage de service, sensibilité d'évaluation, politiques d'outils, liste d'autorisation d'outils). Également requis pour signaler les faux positifs. |
  | **AI Guard Write** (`ai_guard_write`)         | Écriture | Requis pour modifier la configuration d'AI Guard, y compris les politiques de blocage, l'analyse des données sensibles, les politiques d'outils, le blocage d'outils, la liste d'autorisation d'outils et les seuils de sensibilité d'évaluation.                           |
  | **User Access Manage** (`user_access_manage`) | Écriture | Requis pour créer un jeu de données restreint qui [limite l'accès aux spans AI Guard](#limit-access) avec le contrôle d'accès aux données.                                                                                         |

### Limites d'utilisation {#usage-limits}

L'API de l'évaluateur AI Guard présente les limites d'utilisation suivantes :
- 1 milliard de jetons évalués par jour.
- 12 000 requêtes par minute, par IP.

Si vous dépassez ces limites, ou si vous prévoyez de les dépasser bientôt, contactez le [support Datadog][1] pour discuter des solutions possibles.

## 2. Créer des clés d'API et d'application {#create-keys}

Pour utiliser AI Guard, vous devez disposer d'au moins une clé d'API et une clé d'application définies dans vos services Agent, généralement à l'aide de variables d'environnement. Suivez les instructions sur [Clés d'API et d'application][2] pour créer les deux.

Lors de l'ajout de [scopes][3] pour la **clé d'application**, ajoutez le scope `ai_guard_evaluate`. L'utilisateur qui crée la clé d'application doit disposer de l'autorisation [AI Guard Evaluate](#1-check-prerequisites).

## 3. Instrumenter votre application {#instrumentation}

Choisissez une approche d'instrumentation en fonction de votre framework et de votre langage :

### SDK {#sdk}

Le [SDK AI Guard][12] fournit des bibliothèques spécifiques au langage (Python, JavaScript, Java, Ruby) pour appeler l'API REST AI Guard et surveiller l'activité en temps réel dans Datadog.

### Intégrations automatiques {#automatic-integrations}

Les [intégrations automatiques][10] fournissent une protection AI Guard prête à l'emploi pour les frameworks pris en charge. Lorsque vous exécutez votre application avec le SDK Datadog, les évaluations AI Guard sont effectuées automatiquement sans nécessiter de modifications de code.

| Langage | Frameworks pris en charge         |
|----------|------------------------------|
| Python   | LangChain, OpenAI, Anthropic |
| Node.js  | AI SDK, OpenAI, Anthropic    |
| Ruby     | RubyLLM                      |

### Intégrations manuelles {#manual-integrations}

Les [intégrations manuelles][11] nécessitent une configuration supplémentaire pour activer la protection AI Guard pour les frameworks pris en charge.

| Langage   | Frameworks pris en charge           |
|------------|--------------------------------|
| Python     | Amazon Strands, LiteLLM Proxy  |

### API HTTP {#http-api}

L'[API HTTP AI Guard][13] vous permet d'appeler directement l'endpoint JSON:API d'AI Guard avec n'importe quel client HTTP, pour les langages ou les environnements que le SDK ne couvre pas.

## 4. Créer un filtre de rétention personnalisé {#retention-filter}

Pour afficher les évaluations AI Guard dans Datadog, créez un [filtre de rétention][5] personnalisé pour les spans générés par AI Guard. Suivez les instructions liées pour créer un filtre de rétention avec les paramètres suivants :
- {{< ui >}}Retention query{{< /ui >}} : `resource_name:ai_guard`
- {{< ui >}}Span rate{{< /ui >}} : 100 %
- {{< ui >}}Trace rate{{< /ui >}} : 100 %

## 5. Configurer les politiques AI Guard {#configure-policies}

AI Guard fournit des paramètres pour contrôler la manière dont les évaluations sont appliquées, la sensibilité de la détection des menaces et si l'analyse des données sensibles est activée.

### Configurer les politiques de service {#service-policies}

Sur la page {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6], vous pouvez configurer les politiques qui déterminent les actions qu'AI Guard doit entreprendre lorsqu'il détecte du contenu non sécurisé. Pour chaque politique, vous déterminez :
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy) : Surveiller uniquement ou bloquer les requêtes non sécurisées
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning) : Si AI Guard doit rechercher et masquer les données sensibles
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context) : Informations supplémentaires sur le service qu'AI Guard utilise lors de l'évaluation pour réduire les faux positifs

À côté de {{< ui >}}Default policy{{< /ui >}}, cliquez sur {{< ui >}}Edit{{< /ui >}} pour définir le comportement par défaut d'AI Guard. Pour remplacer le comportement par défaut, cliquez sur {{< ui >}}Add Service Policy{{< /ui >}}, sélectionnez le service et l'environnement auxquels vous souhaitez appliquer votre remplacement, puis configurez la politique plus spécialisée.

#### Politique de blocage {#blocking-policy}

Par défaut, AI Guard évalue les conversations et renvoie une action (`ALLOW`, `DENY` ou `ABORT`) mais ne bloque pas les requêtes. Pour activer le blocage afin que les actions `DENY` et `ABORT` empêchent activement les interactions non sécurisées de se poursuivre, configurez la politique de blocage pour vos services.

Vous pouvez configurer le blocage à différents niveaux de granularité, les paramètres les plus spécifiques étant prioritaires :
- **À l'échelle de l'organisation** : Appliquez une politique de blocage par défaut à tous les services et environnements.
- **Par environnement** : Remplacez la valeur par défaut de l'organisation pour un environnement spécifique.
- **Par service** : Remplacez la valeur par défaut de l'organisation pour un service spécifique.
- **Par service et environnement** : Remplacez tout ce qui précède pour un service spécifique dans un environnement spécifique (par exemple, activez le blocage en production mais pas en staging).

#### Analyse des données sensibles {#sensitive-data-scanning}

AI Guard peut détecter des informations personnellement identifiables (PII) telles que des adresses e-mail, des numéros de téléphone et des numéros de sécurité sociale, ainsi que des secrets tels que des clés d'API et des jetons, dans les conversations LLM. Lorsque vous créez ou modifiez une politique pour un service, vous pouvez définir l'analyse des données sensibles sur {{< ui >}}Disabled{{< /ui >}}, {{< ui >}}Scanning{{< /ui >}} ou {{< ui >}}Scanning and redacting{{< /ui >}}.

Lorsque l'analyse est activée, AI Guard analyse le dernier message de chaque appel d'évaluation, y compris les invites utilisateur, les réponses de l'assistant, les arguments d'appel d'outil et les résultats d'appel d'outil. Les résultats apparaissent sur les traces APM pour une meilleure visibilité. Avec {{< ui >}}Scanning and redacting{{< /ui >}}, AI Guard renvoie également le remplacement pour chaque valeur sensible qu'une règle modifie. La rédaction n'est prise en charge qu'avec une intégration manuelle du SDK : consultez [Sensitive Data Redaction][20] pour la configurer et appliquer les remplacements.

Par défaut, AI Guard recherche un ensemble standard de secrets, tels que les clés AWS et les clés Datadog API. Pour personnaliser les [règles d'analyse][14] qu'utilise AI Guard, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15], où vous pouvez activer ou désactiver des règles individuelles, et créer des groupes d'analyse avec des règles personnalisées, limitées spécifiquement aux évaluations AI Guard.

### Bloquer des outils spécifiques {#block-specific-tools}

Vous pouvez configurer AI Guard pour bloquer les requêtes pour des outils spécifiques, pour des services et des environnements spécifiques. Pour ce faire, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8]. Cliquez sur {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}, sélectionnez le service, l'environnement et l'outil, puis choisissez si AI Guard doit suivre la politique de service par défaut ou bloquer toutes les requêtes pour cet outil.

### Sensibilité de l'évaluation {#evaluation-sensitivity}

AI Guard attribue un score de confiance à chaque catégorie de menace qu'il détecte (par exemple, l'injection d'invite ou le jailbreaking). Vous pouvez contrôler le score de confiance minimum requis pour qu'AI Guard signale une menace en accédant à {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7].

La sensibilité de l'évaluation est une valeur comprise entre 0,0 et 1,0, avec une valeur par défaut de 0,5.
- Une valeur **inférieure** **augmente** la sensibilité : AI Guard signale les menaces même lorsque la confiance est faible, faisant apparaître plus d'attaques potentielles mais aussi plus de faux positifs.
- Une valeur **supérieure** **diminue** la sensibilité : AI Guard ne signale les menaces que lorsque la confiance est élevée, réduisant le bruit mais manquant potentiellement certaines attaques.

### Ajouter un contexte d'évaluation {#evaluation-context}

Vous pouvez fournir à AI Guard un contexte supplémentaire sur un service, tel que son objectif et le type de données qu'il traite. AI Guard utilise ce contexte lors de l'évaluation pour mieux distinguer le comportement légitime de l'agent des menaces réelles, ce qui aide à réduire les faux positifs.

Pour ajouter un contexte d'évaluation pour un service, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6]. Cliquez sur {{< ui >}}Edit{{< /ui >}} à côté de la politique par défaut, ou ajoutez ou modifiez une politique de service, puis saisissez votre contexte dans le champ {{< ui >}}Evaluation context{{< /ui >}} (jusqu'à 1 000 caractères). Exemple :

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

Comme pour la [politique de blocage](#blocking-policy), le contexte d'évaluation suit la même priorité, les paramètres les plus spécifiques étant prioritaires : à l'échelle de l'organisation, par environnement, par service, puis par service et environnement.

Utilisez le [AI Guard Playground][19] pour tester comment le contexte d'évaluation affecte le résultat d'une évaluation avant de l'appliquer à un service. Le Playground possède son propre champ {{< ui >}}Evaluation Context{{< /ui >}} qui s'applique uniquement à la conversation que vous testez, vous permettant ainsi d'expérimenter sans modifier aucune politique de service. Importez une charge utile existante dans le Playground, puis ajoutez un contexte d'évaluation pour voir comment cela modifie le résultat de l'évaluation.

### Ajouter du contexte avec votre invite système {#system-prompt-context}

AI Guard évalue la conversation complète, y compris votre invite système, lors de l'évaluation des menaces. Ajouter du contexte sur l'objectif de votre agent, les données qu'il traite et les outils qu'il est autorisé à utiliser aide AI Guard à distinguer les opérations légitimes des menaces réelles, réduisant ainsi les faux positifs sans diminuer la couverture de sécurité.

<div class="alert alert-info">Pour ajouter ce type de contexte sans modifier le code de votre application, utilisez plutôt le champ <a href="#evaluation-context">Contexte d'évaluation</a> dans les paramètres de votre service.</div>

#### Que faut-il inclure {#what-to-include}

Dans votre invite système, décrivez :
- **Objectif de l'agent** : Le rôle et la portée prévue de l'agent.
- **Données autorisées** : Les catégories de données que l'agent est censé lire, écrire ou exporter.
- **Outils autorisés** : Les outils et opérations que l'agent est autorisé à appeler.

#### Exemple {#example}

Une invite système avec un contexte minimal est plus susceptible d'entraîner des faux positifs pour des opérations légitimes :

```text
You are a helpful assistant.
```

Une invite système avec un contexte explicite aide AI Guard à évaluer l'intention avec précision :

```
You are a financial data analyst assistant for internal employees. You are authorized to:
- Query internal financial databases (read-only) using the `sql_query` tool.
- Export query results to CSV or PDF using the `file_export` tool.
- Retrieve and summarize internal financial reports.

Do not access external systems or process requests unrelated to financial reporting.
```

Avec ce contexte, AI Guard traite les requêtes SQL et les exportations de fichiers comme des opérations attendues et autorisées, et est moins susceptible de les signaler comme une exfiltration de données ou des appels d'outils destructeurs.

#### Limitations {#limitations}

N'utilisez pas l'invite système pour contourner les contrôles de sécurité d'AI Guard ou pour donner des instructions directement à AI Guard. AI Guard évalue l'invite système dans le cadre du contexte de la conversation et ignore les instructions qui tentent de désactiver ou d'affaiblir ses propres contrôles de sécurité.

## 6. (Facultatif) Limiter l'accès aux AI Guard spans {#limit-access}

Pour restreindre l'accès aux AI Guard spans pour des utilisateurs spécifiques, vous pouvez utiliser [Data Access Control][9]. Suivez les instructions liées pour créer un jeu de données restreint, limité aux **données APM**, avec le filtre `resource_name:ai_guard` appliqué. Ensuite, vous pouvez accorder l'accès au jeu de données à des rôles ou des équipes spécifiques.

## Désactiver le traçage APM {#disable-apm-tracing}

Pour désactiver le traçage APM sur le traceur tout en gardant AI Guard activé, définissez `DD_APM_TRACING_ENABLED=false` :

{{< code-block lang="bash" >}}
DD_AI_GUARD_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: /fr/account_management/api-app-keys/
[3]: /fr/account_management/api-app-keys/#scopes
[4]: /fr/agent/?tab=Host-based
[5]: /fr/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /fr/security/ai_guard/setup/automatic_integrations/
[11]: /fr/security/ai_guard/setup/manual_integrations/
[12]: /fr/security/ai_guard/setup/sdk/
[13]: /fr/security/ai_guard/setup/http_api/
[14]: /fr/security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /fr/security/ai_guard/setup/sensitive_data_redaction/