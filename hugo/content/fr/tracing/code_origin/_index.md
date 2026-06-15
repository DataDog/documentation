---
aliases:
- /fr/tracing/code_origins/
- /fr/tracing/guide/code_origins/
description: Apprenez à utiliser Code Origin pour comprendre d'où proviennent vos
  spans dans votre codebase.
further_reading:
- link: /tracing/glossary/
  tag: Documentation
  text: Découvrez les termes et concepts APM.
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/live_debugger/
  tag: Documentation
  text: Apprenez à déboguer les services de production avec Live Debugger.
- link: /dynamic_instrumentation/
  tag: Documentation
  text: Apprenez à ajouter des spans personnalisés avec Dynamic Instrumentation.
title: Code Origin pour les spans
---
## Aperçu {#overview}

Code Origin capture les emplacements exacts dans votre codebase où les spans APM sont créés. Lorsqu'il est activé sur un service compatible, il ajoute automatiquement le chemin du fichier, le numéro de ligne et le nom de la fonction à chaque [span d'entrée de service][12], facilitant ainsi :

- Déboguer les problèmes de performance
- Comprendre le flux d'exécution du code
- Identifier les goulets d'étranglement de performance

Dans Trace Explorer, sélectionnez un span d'un service activé pour voir les détails de Code Origin dans l'onglet Aperçu :
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Détails de Code Origin" style="width:100%;">}}


## Commencer {#getting-started}

### Prérequis {#prerequisites}
- [Datadog APM][6] est configuré pour capturer des spans.
- [Source Code Integration][7] est activé (nécessaire pour les aperçus de code).
- Votre service répond aux [exigences de compatibilité](#compatibility-requirements).

### Exigences de compatibilité {#compatibility-requirements}

{{% tabs %}}

{{% tab "Java" %}}

| Version SDK | Frameworks |
|---|---|
| 1.47.0+ | Spring Boot/Data, serveurs gRPC, Micronaut 4, consommateurs Kafka |

**Limitation :** Sur JDK 18 et inférieur, les classes compilées avec le `-parameters` flag peuvent ne pas être prises en charge. Spring 6+, Spring Boot 3+ et Scala utilisent ce flag par défaut.

{{% /tab %}}

{{% tab "Python" %}}

| Version SDK | Frameworks |
|---|---|
| 2.15.0+ | Django, Flask, Starlette et dérivés |

{{% /tab %}}

{{% tab "Node.js" %}}

| Version SDK | Frameworks |
|---|---|
| 4.49.0+ | Fastify |
| 5.54.0+ | Express |

**Remarque :** NestJS n'est pas pris en charge, même si le framework sous-jacent est soit Express soit Fastify.

{{% /tab %}}

{{% tab ".NET" %}}

| Version SDK | Frameworks |
|---|---|
| 3.15.0+ | ASP.NET, ASP.NET Core |

{{% /tab %}}

{{% tab "PHP" %}}

| Version SDK | Frameworks |
|---|---|
| 1.11.0+ | Tous les frameworks web pris en charge |

{{% /tab %}}

{{% /tabs %}}

### Activer Code Origin {#enable-code-origin}

Exécutez votre service avec la variable d'environnement suivante :

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  Pour les applications Node.js transpilées (par exemple, TypeScript), assurez-vous de générer et de publier des cartes sources avec l'application déployée, exécutez Node.js avec le <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> flag, et utilisez v5.59.0 ou une version plus récente du traceur Node.js. Sinon, les aperçus de code ne fonctionnent pas. Consultez la documentation Node.js <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">Intégration du Code Source</a> pour plus de détails.
</div>

## Utilisation de Code Origin {#using-code-origin}

### Dans Trace Explorer {#in-the-trace-explorer}

1. Naviguez vers le [Trace Explorer][1].
1. Recherchez "Service Entry Spans" parmi vos services activés pour Code Origin.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Rechercher les Service Entry Spans" style="width:100%;">}}

1. Cliquez sur un span pour voir ses détails.
1. Dans le panneau latéral des détails de trace, recherchez la section "Code Origin".

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Détails de Code Origin dans Trace Explorer" style="width:100%;">}}

1. À partir de la section Code Origin :
    - Démarrez une session de [Débogueur en Direct][11] sur le service en cours d'exécution en cliquant sur "Démarrer la Session de Débogage" pour capturer les journaux à l'emplacement de la méthode de Code Origin. Ou, sélectionnez un point d'arrêt dans la marge de l'aperçu du code pour capturer les journaux à la ligne de code sélectionnée.

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Code Origin - Démarrer la Session de Débogueur en Direct" style="width:100%;">}}

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Ajouter une balise span avec Dynamic Instrumentation" style="width:100%;">}}


### Dans votre IDE {#in-your-ide}

1. Configurez votre [Intégration IDE Datadog][4].
    - IDEs pris en charge : IntelliJ, VS Code
    - Langages pris en charge : Java, Python
2. Affichez les métriques RED (Requêtes, Erreurs et Durée) en tant qu'annotations en ligne au-dessus de vos méthodes de point de terminaison.

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="Détails de Code Origin dans l'IDE" style="width:100%;">}}

## Dépannage {#troubleshooting}

### La section Code Origin est manquante {#code-origin-section-is-missing}

- Vérifiez que Code Origin est [activé](#enable-code-origin) dans la configuration de votre SDK.
- Confirmez que votre service répond à toutes les [exigences de compatibilité](#compatibility-requirements) (c'est-à-dire, langage de service, frameworks pris en charge et version minimale du traceur).
- Pour la plupart des services, les données de Code Origin sont capturées uniquement pour les [service entry spans][12]. Vous pouvez filtrer sur "Service Entry Spans" dans l'[APM Trace Explorer][1].

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Rechercher les Service Entry Spans" style="width:100%;">}}

### L'aperçu du code n'est pas visible ou le fichier est introuvable {#code-preview-is-not-visible-or-the-file-is-not-found}

- Assurez-vous que toutes les exigences de configuration de l'[Source Code Integration][7] sont respectées, y compris que vos `DD_GIT_*` variables d'environnement sont configurées avec les bonnes valeurs.
- Pour les applications Node.js transpilées (par exemple, TypeScript), assurez-vous de générer et de publier des cartes sources avec l'application déployée, d'exécuter Node.js avec le [`--enable-source-maps`][10] flag, et d'utiliser v5.59.0 ou une version plus récente du traceur Node.js. Sinon, les aperçus de code ne fonctionneront pas. Consultez la documentation de [Source Code Integration][9] de Node.js pour plus de détails.
- Code Origin est conçu pour référencer uniquement le code utilisateur, mais dans certains cas, des références de code tiers peuvent passer inaperçues. Vous pouvez signaler ces cas au [support Datadog][13] et aider à améliorer ces références.

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /fr/tracing/services/service_page/
[3]: /fr/tracing/services/resource_page/
[4]: /fr/ide_plugins/
[5]: /fr/dynamic_instrumentation/
[6]: /fr/tracing/trace_collection/
[7]: /fr/integrations/guide/source-code-integration/
[8]: /fr/tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /fr/integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /fr/tracing/live_debugger/
[12]: /fr/glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/