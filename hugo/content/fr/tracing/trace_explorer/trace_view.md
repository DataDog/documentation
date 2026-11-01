---
algolia:
  tags:
  - trace view
aliases:
- /fr/tracing/visualization/trace/
description: Visualisez et analysez des traces individuelles à l'aide de graphiques
  en flamme, de listes de span, de cascades et de cartes avec des informations détaillées
  sur les span.
further_reading:
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : rapprocher les équipes frontend grâce à un
    contexte partagé'
- link: /tracing/trace_collection/
  tag: Documentation
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services qui envoient des rapports à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
title: Vue Trace
---
{{< img src="tracing/trace_view/trace_view.png" alt="Vue Trace" style="width:90%;">}}

## Présentation {#overview}

Affichez une [trace][1] individuelle pour voir tous ses [span][2] et les métadonnées associées. Chaque trace peut être visualisée sous forme de graphique en flamme, de liste de span, de cascade ou de carte.

L'en-tête de trace affiche des informations critiques sur la trace, notamment le nom du service du span racine, le nom de la ressource, l'ID de trace, la durée de bout en bout de la trace et l'heure de début de la trace. Pour obtenir un lien permanent vers la trace, cliquez sur {{< ui >}}Open Full Page{{< /ui >}} et enregistrez l'URL.

{{< img src="tracing/trace_view/trace_header.png" alt="En-tête de trace" style="width:90%;">}}


## Visualisations de trace {#trace-visualizations}

{{< tabs >}}
{{% tab "Graphique en flamme" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="Graphique en flamme" style="width:90%;">}}

Le graphique en flamme est la visualisation par défaut qui affiche tous les span codés par couleur d'une trace sur une chronologie. Ceci est utile pour comprendre le chemin d'exécution d'une requête et où le temps a été passé au cours d'une trace.

Pour naviguer dans le graphique, faites défiler pour zoomer, cliquez et faites glisser pour vous déplacer, et utilisez la mini-carte pour zoomer sur le span sélectionné ou effectuer un zoom arrière sur la trace complète.

La légende détaille le code couleur du graphique en flamme. Regroupez les span par {{< ui >}}Service{{< /ui >}} (par défaut), {{< ui >}}[Base service][1]{{< /ui >}} (service à partir duquel le span est émis), {{< ui >}}Host{{< /ui >}} ou {{< ui >}}Container{{< /ui >}}. Choisissez d'afficher soit le pourcentage du temps d'exécution de la trace ({{< ui >}}% Exec Time{{< /ui >}}), soit le nombre de span ({{< ui >}}Spans{{< /ui >}}) par groupe. Si des erreurs existent sur des span dans la trace, mettez-les en évidence dans le graphique en flamme en cochant la case {{< ui >}}Errors{{< /ui >}} sous {{< ui >}}Filter Spans{{< /ui >}}.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Les span provenant de [services inférés][2] sont représentés avec un contour en pointillés.

[2]: /fr/tracing/services/inferred_services
{{< /site-region >}}

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="Légende du graphique en flamme" video="true" style="width:90%;">}}

[1]: /fr/tracing/guide/service_overrides#base-service
{{% /tab %}}
{{% tab "Liste de span" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="Vue Trace" style="width:90%;">}}

Affiche les [ressources][1] par groupe ([service][2] par défaut) et les trie en fonction de leur nombre de span. Cette visualisation est utile pour analyser les informations de latence par ressource ou par regroupement.

Filtrez les ressources par type ou par information de nommage à l'aide des boutons correspondants et de la recherche textuelle.

{{< img src="tracing/trace_view/spanlist_headers.png" alt="En-têtes de la liste de span" style="width:90%;">}}

Les groupes peuvent être triés en cliquant sur l'en-tête de colonne correspondant : {{< ui >}}RESOURCE{{< /ui >}}, {{< ui >}}SPANS{{< /ui >}}, durée moyenne ({{< ui >}}AVG DURATION{{< /ui >}}), temps d'exécution ({{< ui >}}EXEC TIME{{< /ui >}}) ou pourcentage du temps d'exécution de la trace ({{< ui >}}% EXEC TIME{{< /ui >}}).

[1]: /fr/tracing/glossary/#resources
[2]: /fr/tracing/glossary/#services
{{% /tab %}}
{{% tab "Cascade" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="Cascade" style="width:100%;">}}

Affiche tous les spans d'une trace sur une chronologie où chaque ligne correspond à un span. Cette visualisation est utile pour isoler et se concentrer sur les parties pertinentes d'une trace.

Chaque ligne (span) indique les éléments suivants :

- **Durée relative du span** : La longueur de la barre à code couleur correspond au pourcentage de la durée totale de la trace.
- **Durée absolue du span** : Le temps absolu en millisecondes (ms).
- **Détails du span** : Le nom du service et le nom de la ressource correspondants sont affichés.
- **Statuts** : Le cas échéant, un code d'état HTTP est affiché.
- **Code couleur** : Les spans sont codés par couleur selon le service (par défaut), le host ou le conteneur. Pour modifier le codage couleur des spans, utilisez le menu déroulant {{< ui >}}Color by{{< /ui >}}.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Les spans provenant de [services inférés][1] sont représentés par un soulignement en pointillés.

[1]: /fr/tracing/services/inferred_services
{{< /site-region >}}

Pour développer ou réduire les descendants d'un span, cliquez sur l'icône chevron (>) sur une ligne. Pour développer ou réduire tous les spans, cliquez sur les boutons {{< ui >}}Expand all{{< /ui >}} (+) ou {{< ui >}}Collapse all{{< /ui >}} (-).

{{% /tab %}}
{{% tab "Map" %}}

{{< img src="tracing/trace_view/trace-map.png" alt="Carte de trace" style="width:100%;">}}

La carte de trace affiche une représentation de tous les services impliqués dans une seule trace. Elle fournit une vue d'ensemble du cycle de vie de la transaction au niveau du service et montre les dépendances des services.

Chaque nœud sur la carte représente un service dans le cycle de vie de la transaction. Pour éviter les dépendances cycliques sur la carte, les services qui appellent un autre service ayant déjà été invoqué par le service d'origine sont représentés par des nœuds dupliqués. Les [services déduits][2] sont représentés par un contour en pointillés et un arrière-plan violet.

Les nœuds de service montrent explicitement le pourcentage de {{< ui >}}total execution time{{< /ui >}}, qui affiche la répartition de la durée de la trace au niveau du service.

Si un [service entry span][1] est dans un état d'erreur, le nœud de service correspondant est marqué d'une bordure rouge pour mettre en évidence un service défaillant. Si une erreur se produit dans un [service exit span], le lien indiquant l'appel au service suivant est également surligné en rouge.

Pour afficher des informations supplémentaires sur les spans d'entrée de service pour chaque nœud, survolez l'état d'erreur. L'infobulle affiche des détails sur l'opération et le nom de la ressource du span d'entrée de service, ainsi que tout message d'erreur. Pour poursuivre l'investigation, cliquez sur {{< ui >}}View Entry Span{{< /ui >}} pour passer à la vue Cascade.

[1]: /fr/glossary/#service-entry-span
[2]: /fr/tracing/services/inferred_services
{{% /tab %}}
{{< /tabs >}}

### Focus sur un span {#focus-on-a-span}
Dans les visualisations en cascade et en flamme, vous pouvez vous concentrer sur un span pour restreindre la vue à ce span et à ses enfants. Ceci est utile pour les traces volumineuses, où la mise au point vous permet d'isoler et d'étudier un groupe spécifique d'opérations sans que le reste de la trace n'ajoute de bruit.

Dans le graphique en flamme, sélectionnez un span, puis cliquez sur l'icône de focus à côté de la minicarte. Dans la vue en cascade, survolez un span et cliquez sur l'icône de focus sur son côté droit. La visualisation se recalibre avec le span sélectionné comme nouvelle racine, et ses descendants remplissent la chronologie. Pour revenir à la trace complète, réinitialisez le focus.

{{< img src="/tracing/trace_view/flamegraph-focus-on-span.mp4" alt="Focus du Flamegraph sur le span" video="true" style="width:90%;">}}
{{< img src="tracing/trace_view/waterfall-focus-on-spans.mp4" alt="Focus du Waterfall sur le span" video="true" style="width:90%;">}}

<div class="alert alert-info">Le focus modifie uniquement ce qui est affiché. Il ne filtre pas les spans des résultats de recherche et ne modifie pas la trace sous-jacente.</div>

### Aperçu de la trace {#trace-preview}
Lorsqu'une trace dépasse 100 Mo, elle ne peut pas être entièrement visualisée à l'aide du panneau latéral de trace par défaut. Dans ce cas, le mode Aperçu de la trace est activé. Ce mode ne renvoie que les spans les plus critiques pour vous aider à poursuivre votre investigation. Celles-ci incluent :

- Spans au niveau d'entrée de service
- Spans d'erreur
- Spans de longue durée
- Spans liés à d'autres spans ou traces

Les options de visualisation disponibles pour les traces volumineuses se limitent aux vues Cascade et carte. En mode Aperçu, la vue Cascade offre une option supplémentaire pour récupérer les spans qui ne sont pas inclus par défaut. Ces spans sont regroupés et représentés à l'aide de pastilles numérotées. Chaque pastille affiche le nombre total de spans disponibles dans ce groupe. Vous pouvez cliquer sur une pastille numérotée pour développer et afficher tous les spans de ce groupe.

{{< img src="tracing/visualization/trace/trace-preview.png" alt="Aperçu de la trace" style="width:100%;">}}

## Recherche de span {#span-search}

Dans les visualisations Cascade et graphique en flamme, l'option de recherche vous permet de trouver les spans qui correspondent à des requêtes spécifiques. Les spans qui correspondent à la requête de recherche sont mis en surbrillance dans la vue de trace et vous pouvez naviguer entre ces correspondances à l'aide des flèches situées à côté de la barre de recherche.

<img src="https://github.com/user-attachments/assets/4c6fc35a-65b7-42ee-bc24-fcb9adb9d0b8" alt="Search bar" style="width:90%;">

**Remarque** : Lorsque la case `Error` est cochée, les résultats de recherche renvoient les spans qui correspondent à la requête et qui sont dans un état d'erreur.

La requête de recherche sur le panneau latéral de trace prend en charge les options suivantes :

- **Recherche en texte libre :**
La recherche en texte libre permet de filtrer par nom de service, de ressource ou d'opération. Elle met en surbrillance les spans contenant le texte spécifié au sein de ces catégories.
Exemple : `web`
- **Recherche clé-valeur :**
Utilisez l'expression clé:valeur pour filtrer les spans avec des paires clé-valeur spécifiques.
Exemple : `service:web-ui`

**Remarque** : Les caractères génériques ne sont pas pris en charge dans la barre de recherche de trace.

**Expressions prises en charge :**
- Expression de groupe : `language:(go OR python)`
- Expression booléenne : `service:event-query OR terminator`
- Expression de plage : `duration:>200ms`

**Remarque** : Les valeurs numériques prennent en charge les expressions `<`, `>`, `<=` et `>=`.


## Plus d'informations {#more-information}

La partie inférieure réglable en hauteur de la vue de trace affiche les informations sur le span et la trace sélectionnés.

<div class="alert alert-tip">Sur les traces contenant des erreurs, cliquez sur <strong>Investigate With Bits AI</strong> dans le panneau de détails de la trace pour lancer une investigation automatisée. Bits AI parcourt l'arborescence des spans pour identifier où la requête a échoué et corrèle les résultats avec les logs associés. Pour plus d'informations, consultez <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

L'en-tête de span contient les noms du service, de l'opération et de la ressource du span sélectionné, ainsi que des informations sur la latence. Passez à d'autres parties de la plateforme ou affinez votre recherche [Trace Explorer][5] en cliquant sur la pastille de nommage.

{{< img src="tracing/trace_view/span_header.png" alt="En-tête de span" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Lorsque le span représente un appel client d'un service instrumenté vers une base de données, une file d'attente ou un service tiers, l'en-tête de span affiche le service et l'entité déduite.

{{< img src="tracing/trace_view/span_header_inferred.png" alt="En-tête de span déduit" style="width:90%;">}}
{{< /site-region >}}

{{< tabs >}}
{{% tab "Informations sur le span" %}} 

Consultez toutes les métadonnées du span, y compris les tags personnalisés. Cliquez sur un tag de span pour mettre à jour la requête de recherche dans le Trace Explorer ou copiez la valeur du tag dans le presse-papiers.

D'autres informations peuvent être affichées dans diverses conditions :
- Message d'erreur et trace de pile (sur un span d'erreur)
- Balisage de requête SQL (sur les spans de base de données)
- Contexte et métadonnées RUM (sur les spans RUM)
- Métriques Spark (sur les spans de job Spark)
- Un message d'avertissement git (lorsque les informations git sont manquantes sur un test CI)

{{< img src="tracing/trace_view/info_tab.png" alt="Onglet Informations sur le span" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Lorsque le nom du service est un remplacement du nom de service de base, le haut de la section d'informations affiche :
- {{< ui >}}[Base service][2]{{< /ui >}} : service à partir duquel le span est émis, identifié par l'attribut `@base_service`.
- {{< ui >}}[Service override][3]{{< /ui >}} : nom du service, différent du nom de service de base, défini automatiquement dans les intégrations Datadog ou modifié via l'API programmatique. Le remplacement de service est identifié par l'attribut réservé `service`.
- {{< ui >}}[Inferred service][4]{{< /ui >}} (_le cas échéant_) : nom de l'entité déduite appelée par le service de base, identifiée par l'un des [attributs de pair][5].

{{< img src="tracing/trace_view/base_override_inferred_service.png" alt="Service de base, de remplacement et déduit" style="width:80%;">}}

[2]: /fr/tracing/guide/service_overrides#base-service
[3]: /fr/tracing/guide/service_overrides
[4]: /fr/tracing/services/inferred_services
[5]: /fr/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

[1]: /fr/tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infrastructure" %}}

Basculez entre les informations d'infrastructure au niveau du host et au niveau du conteneur (lorsqu'elles sont disponibles) pour le span sélectionné.

Consultez les tags associés, ainsi que les graphiques de métriques critiques du host/conteneur, notamment CPU, mémoire et I/O, avec une superposition du moment où la trace s'est produite.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Onglet Infrastructure" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

Consultez les logs liés à votre service au moment de la trace. Lorsque vous survolez un log, une ligne indiquant son horodatage s'affiche sur le graphique en flamme de la trace. Cliquer sur le log vous amène à la [recherche dans le Log Explorer][1].

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Logs dans les traces" style="width:100%;">}}


[1]: /fr/logs/explorer/search/
{{% /tab %}}
{{% tab "Processus" %}}

Cliquez sur le span d'un service pour voir les processus s'exécutant sur son infrastructure sous-jacente. Les processus du span d'un service sont corrélés avec les hosts ou les pods sur lesquels le service s'exécute au moment de la requête. Vous pouvez analyser les métriques de processus telles que CPU et la mémoire RSS parallèlement aux erreurs au niveau du code pour distinguer les problèmes spécifiques à l'application des problèmes d'infrastructure plus larges. Cliquer sur un processus vous amènera à la [page Live Processes][1]. Pour afficher les processus spécifiques à un span, activez la [collecte de processus][2]. Les processus associés ne sont actuellement pas pris en charge pour les traces serverless et de navigateur. 

{{< img src="tracing/trace_view/processes_tab.png" alt="Onglet Processus" style="width:90%;">}}

[1]: https://docs.datadoghq.com/fr/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/fr/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Cliquez sur le span d'un service pour voir les dépendances réseau du service effectuant la requête. Utilisez des métriques de performance réseau clés telles que le volume, les erreurs (retransmissions TCP) et la latence réseau (temps d'aller-retour TCP) pour différencier les problèmes spécifiques à l'application des problèmes à l'échelle du réseau, surtout lorsqu'aucune erreur de code n'a été générée. Par exemple, vous pouvez utiliser la télémétrie réseau pour déterminer si une latence de requête élevée est due à une surcharge de trafic de l'application concernée, ou à des dépendances défectueuses avec un pod en aval, un groupe de sécurité ou tout autre endpoint tagué. Cliquer sur un processus vous redirige vers la page [Network Analytics][1]. Pour afficher les processus spécifiques à un span, activez [Cloud Network Monitoring][2].

**Remarque** : La télémétrie réseau associée n'est actuellement pas prise en charge pour les traces serverless.

{{< img src="tracing/trace_view/network_tab.png" alt="Onglet Réseau" style="width:90%;">}}

[1]: /fr/network_monitoring/performance/network_analytics
[2]: /fr/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

Visualisez les tentatives d'attaque qui ciblent les services de la trace distribuée. Vous pouvez voir le modèle utilisé par l'attaquant, la règle qui détecte l'attaque et si l'attaquant a trouvé une vulnérabilité dans votre service.

Cliquez sur {{< ui >}}View in AAP{{< /ui >}} pour approfondir l'investigation en utilisant [Datadog App and API Protection][1].

{{< img src="tracing/trace_view/security_tab.png" alt="Onglet Security" style="width:90%;">}}

[1]: /fr/security/application_security/how-it-works/
{{% /tab %}}
{{% tab "Profiles" %}}

Affichez les [Profils][1] pour identifier les lignes de code liées aux problèmes de performance. Les valeurs sur la gauche représentent le temps passé dans chaque appel de méthode pendant le span sélectionné.

{{< img src="profiler/profiles_tab.png" alt="Onglet Profils affichant le temps passé dans chaque méthode pour un span sélectionné" style="width:90%;">}}

[1]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "Liens de spans" %}}

Les [liens de span][4] corrèlent un ou plusieurs spans ensemble qui sont liés causalement mais n'ont pas de relation parent-enfant typique.

Cliquez sur un span dans le graphique en flamme pour afficher les spans connectés avec des liens de span :

{{< img src="tracing/span_links/span_links_tab_2.png" alt="Onglet Liens de span" style="width:90%;">}}

**Remarque** : Les liens de span ne s'affichent que lorsque les spans correspondants sont ingérés et indexés, par exemple, avec un [filtre de rétention][1].

Pour en savoir plus sur les liens de span et comment les ajouter avec une instrumentation personnalisée, lisez [Liens de span][4].

[1]: /fr/tracing/trace_pipeline/trace_retention/
[2]: /fr/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /fr/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /fr/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/tracing/glossary/#spans
[3]: /fr/tracing/glossary/#services
[4]: /fr/tracing/glossary/#resources
[5]: /fr/tracing/trace_explorer
[6]: /fr/glossary/#service-entry-span