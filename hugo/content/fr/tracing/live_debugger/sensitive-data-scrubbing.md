---
aliases:
- /fr/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing/
- /fr/dynamic_instrumentation/sensitive-data-scrubbing/
- /fr/tracing/dynamic_instrumentation/sensitive-data-scrubbing
description: Protégez les données d'application sensibles capturées par Live Debugger.
further_reading:
- link: /tracing/live_debugger/#setup
  tag: Documentation
  text: Configuration de Live Debugger
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
title: Masquage des données sensibles de Live Debugger
---
## Présentation {#overview}

[Live Debugger][5] capture des logs et des instantanés de variables qui peuvent contenir des données d'application sensibles, en particulier lors de l'utilisation de l'option {{< ui >}}Capture Variables{{< /ui >}}.

Les mécanismes de masquage suivants aident à protéger les données capturées :

- **Les règles relatives aux identifiants et aux types** masquent les valeurs correspondantes dans votre infrastructure, avant leur envoi.
- **Les modes de masquage de Live Debugger** déterminent quelles valeurs capturées sont visibles. Consultez [masquage selon le mode](#mode-based-redaction).
- **Les règles de Sensitive Data Scanner** masquent les données correspondantes après leur arrivée dans Datadog. Consultez [Sensitive Data Scanner](#redact-based-on-variable-values-with-sensitive-data-scanner). Ces règles ne remplacent pas les règles qui empêchent les valeurs sensibles de quitter votre infrastructure.

## Masquage selon le mode {#mode-based-redaction}

Live Debugger dispose de deux modes de masquage :

- {{< ui >}}Strict Mode{{< /ui >}} : Masque toutes les valeurs à l'exception des nombres et des booléens. [Bits Live Debugger][8] n'est pas disponible pour les combinaisons de service et d'environnement définies sur {{< ui >}}Strict Mode{{< /ui >}}.
- {{< ui >}}Targeted Mode{{< /ui >}} : Masque les modèles sensibles connus tels que les numéros de carte de crédit, les clés d'API, les adresses IP et autres PII. Il exécute également un détecteur de secrets à haute entropie qui masque automatiquement les secrets potentiels, lesquels apparaissent sous la forme `[REDACTED:HIGH_ENTROPY]` dans les données capturées.

Ces modes de masquage ne peuvent pas être désactivés : il est seulement possible de passer de l'un à l'autre. Targeted Mode est appliqué automatiquement dans les environnements de préproduction courants tels que `staging` ou `preprod`. La modification du mode de masquage nécessite l'autorisation **Live Debugger Redaction Write**.

## Masquez les données en fonction des identifiants {#redact-based-on-identifiers}

### Comportement par défaut {#default-behavior}

Live Debugger masque automatiquement les valeurs liées à des identifiants sensibles, tels que `password` et `accessToken`, avant que les données capturées ne quittent le host. Des règles de masquage supplémentaires spécifiques au langage sont intégrées dans chaque SDK. Consultez [identifiants masqués][1].

### Masquage personnalisé des identifiants {#custom-identifier-redaction}

Vous pouvez personnaliser davantage le masquage en spécifiant des identifiants supplémentaires. Dans l'environnement de votre application (et non sur `datadog-agent`), définissez la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` sur une liste d'identifiants séparés par des virgules, tels que `firstName,lastName,phoneNumber`.

Pour exclure des identifiants spécifiques de la liste de masquage par défaut, définissez la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` sur une liste d'identifiants séparés par des virgules qui ne doivent pas être masqués, tels que `cookie,sessionid`.

Le masquage s'applique universellement, quelle que soit la manière dont l'identifiant est utilisé dans le code (en tant qu'arguments de méthode, variables locales, attributs de classe, clés de dictionnaire, etc.). Les valeurs associées sont masquées dans votre infrastructure et ne sont pas envoyées à Datadog.

## Masquez les données en fonction de classes ou de types spécifiques {#redact-based-on-specific-classes-or-types}

Certaines classes peuvent contenir intrinsèquement des informations sensibles (par exemple, une classe `UserCredentials`). Toujours dans l'environnement de votre application (et non sur `datadog-agent`), définissez la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` sur une liste de types sensibles séparés par des virgules, tels que `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Avantages de la censure basée sur des classes :

- Masque les variables des types listés. Leur contenu n'est pas envoyé à Datadog.
- Empêche de placer des probes à tout emplacement du code des classes masquées.

## Masquez les données en fonction des valeurs des variables avec Sensitive Data Scanner {#redact-based-on-variable-values-with-sensitive-data-scanner}

[Sensitive Data Scanner][3] identifie et censure les informations sensibles en fonction d'expressions régulières spécifiques.

### Configurez les règles de Sensitive Data Scanner {#configure-sensitive-data-scanner-rules}

Créez, personnalisez ou désactivez des règles sur la [page du Sensitive Data Scanner][4]. Lors de la création d'une règle, définissez son filtre sur `source:dd_debugger` pour l'appliquer aux logs du Live Debugger. Pour obtenir des instructions de configuration, consultez la [documentation du Sensitive Data Scanner][3].

**Remarque** : Datadog Sensitive Data Scanner effectue le masquage _après_ l'envoi des informations à Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[3]: /fr/security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /fr/tracing/live_debugger/
[8]: /fr/tracing/live_debugger/bits-live-debugger/