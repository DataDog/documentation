---
further_reading:
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Configurer AI Guard
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: SDK AI Guard
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentation
  text: Règles d'analyse des données sensibles
title: Rédaction de données sensibles
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard utilise le Sensitive Data Scanner pour identifier les données sensibles, telles que les informations personnellement identifiables (PII), les identifiants et les secrets, dans les messages évalués par AI Guard. Les données correspondantes peuvent être hachées, remplacées par un texte personnalisé ou partiellement expurgées avant d'être envoyées au modèle. Pour remplacer chaque correspondance par une étiquette ou `****`, utilisez l'action **Redact** et saisissez la valeur comme texte de remplacement.

<div class="alert alert-warning">La rédaction de données sensibles n'est prise en charge qu'avec une intégration manuelle du SDK. Les instrumentations automatiques, telles qu'OpenAI ou Anthropic, ne sont pas encore prises en charge : elles signalent les résultats du Sensitive Data Scanner, mais elles ne rédigent pas les messages que votre application envoie au modèle. Pour masquer des données sensibles, appelez directement le SDK et transférez la conversation masquée renvoyée par l'évaluation. Voir <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

## Versions du SDK prises en charge {#supported-sdk-versions}

| Langage   | Version minimale     |
|------------|---------------------|
| Python     | dd-trace-py 4.14.0  |
| JavaScript | dd-trace-js 6.13.0  |
| Java       | À venir         |
| Ruby       | À venir         |

## Configuration {#setup}

Pour activer la rédaction de données sensibles, configurez les règles de rédaction pour AI Guard, activez l'analyse des données sensibles pour votre service et appliquez les remplacements renvoyés par AI Guard.

### 1. Configurer les règles de rédaction {#1-configure-redaction-rules}

Les règles du Sensitive Data Scanner pour AI Guard sont configurées au niveau de l'organisation. Pour choisir les données qu'AI Guard doit masquer et comment elles sont remplacées :

1. Accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][1].
1. Créez ou modifiez un groupe d'analyse AI Guard et activez les règles pour les données sensibles que vous souhaitez détecter.

{{< img src="security/ai_guard/ai_guard_sds_configuration.png" alt="L'onglet AI Guard sur la page de configuration Sensitive Data Scanner" style="width:100%;" >}}

Sous {{< ui >}}Action on Match{{< /ui >}}, sélectionnez ce qui se passe lorsque la règle correspond à des données sensibles :

{{< img src="security/ai_guard/ai_guard_action_on_match_options.png" alt="Options d'action de Sensitive Data Scanner en cas de correspondance : Hachage, Masquage, Masquage partiel, Dissimulation et Aucune action" style="width:100%;" >}}

- **Hachage** : remplace définitivement toute la valeur correspondante par un jeton haché.
- **Masquage** : remplace définitivement toute la valeur correspondante par le texte de remplacement que vous spécifiez.
- **Masquage partiel** : occulte définitivement seule une partie de la valeur correspondante.
- **Dissimulation** : masque la valeur correspondante dans Datadog, mais préserve la valeur sous-jacente afin que les utilisateurs disposant des autorisations nécessaires puissent la révéler.
- **Aucune action** : laisse la valeur correspondante inchangée.

Pour remplacer des données sensibles par une valeur exacte avant qu'elles ne soient envoyées au modèle, sélectionnez **Redact** et saisissez un texte de remplacement tel que `[sensitive_data]` ou `****`.

{{< img src="security/ai_guard/ai_guard_redact_replacement_text.png" alt="L'action Redact sélectionnée avec un champ de texte de remplacement personnalisé" style="width:100%;" >}}

Les tags catégorisent la détection mais ne modifient pas le contenu correspondant.

<div class="alert alert-info">Cette configuration s'applique à l'ensemble de votre organisation. Les règles ne sont appliquées qu'aux services pour lesquels l'analyse des données sensibles est activée.</div>

### 2. Activer l'analyse des données sensibles pour un service {#2-enable-sensitive-data-scanning-for-a-service}

L'activation des règles de Sensitive Data Scanner pour AI Guard ne suffit pas en soi. Une fois les règles activées, vous devez également activer l'analyse des données sensibles sur le service AI Guard que vous souhaitez protéger :

1. Accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2].
1. Modifiez la politique par défaut ou la politique du service et de l'environnement que vous souhaitez protéger.
1. Sous {{< ui >}}Sensitive data scanning{{< /ui >}}, sélectionnez l'une des options suivantes, puis enregistrez la politique :
   - {{< ui >}}Disabled{{< /ui >}} : AI Guard n'analyse pas les requêtes à la recherche de données sensibles.
   - {{< ui >}}Scanning{{< /ui >}} : AI Guard analyse les requêtes à la recherche de données sensibles et signale les résultats sur l'AI Guard span, mais renvoie les messages inchangés.
   - {{< ui >}}Scanning and redacting{{< /ui >}} : AI Guard analyse les requêtes à la recherche de données sensibles et expurge les correspondances, en suivant l'action configurée pour chaque règle.

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="Une politique de service AI Guard avec les options Désactivé, Analyse, et Analyse et expurgation pour l'analyse des données sensibles" style="width:100%;" >}}

La politique de service active ou désactive la configuration complète de Sensitive Data Scanner pour ce service. Configurez les données détectées et expurgées sur la [page de configuration d'AI Guard dans Sensitive Data Scanner][1].

Lorsque {{< ui >}}Scanning and redacting{{< /ui >}} est activé, AI Guard expurge le dernier message de la conversation évaluée.

<div class="alert alert-info">Comme le contexte de la conversation est construit de manière incrémentielle, AI Guard ne réanalyse pas l'historique de la conversation. Le remplacement des messages dans votre application par leurs versions expurgées relève de la responsabilité de votre implémentation du SDK. Voir <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

### 3. Appliquez les remplacements d'expurgation avec le SDK {#3-apply-redaction-replacements-with-the-sdk}

Lorsque le SDK évalue des messages, la réponse d'évaluation inclut un remplacement entièrement expurgé et son chemin pour chaque valeur qu'une règle configurée modifie. Le SDK applique ces remplacements à une copie de la conversation évaluée et la renvoie avec le résultat de l'évaluation. Transmettez cette conversation au modèle et conservez-la dans l'état de votre application, afin que les données sensibles ne quittent pas votre application et ne soient pas réintroduites au tour suivant.

AI Guard analyse uniquement le dernier message de chaque appel d'évaluation et utilise les messages précédents comme contexte. Cela inclut une invite utilisateur, une réponse de l'assistant, des arguments d'appel d'outil ou un résultat d'appel d'outil lorsqu'il s'agit du dernier message évalué. Les messages précédents de la conversation ne sont pas réanalysés, le résultat contient donc la conversation complète que vous avez transmise, avec seul le dernier message expurgé. L'application des remplacements ne modifie pas les objets de message appartenant à votre application.

La manière dont vous lisez la conversation expurgée dépend du langage du SDK :

- [Python][3]
- [JavaScript][4]
- [Java][5]

Pour désactiver la rédaction dans le traceur tout en conservant la détection et le signalement, définissez `DD_AI_GUARD_REDACTION_ENABLED=false` dans l'environnement de votre application. L'évaluation continue de s'exécuter et les résultats sont toujours signalés, mais le SDK renvoie les messages inchangés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /fr/security/ai_guard/setup/sdk/?prog_lang=python#example-apply-sensitive-data-redaction-python
[4]: /fr/security/ai_guard/setup/sdk/?prog_lang=node_js#example-apply-sensitive-data-redaction-node-js
[5]: /fr/security/ai_guard/setup/sdk/?prog_lang=java#example-apply-sensitive-data-redaction-java