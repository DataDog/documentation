---
description: Découvrez comment fonctionnent les filtres de rétention dans RUM without
  Limits.
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guide
  text: Bonnes pratiques pour les retention filter (filtre de rétention)
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentation
  text: Analysez les performances avec des métriques
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentation
  text: Contrôlez les coûts avec des quotas de rétention
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifiez et corrélez les données frontend et backend avec des filtres de rétention
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centre d'apprentissage
  text: 'Laboratoire interactif : filtres de rétention RUM'
title: Conserver les données avec des retention filter (filtre de rétention)
---
{{< learning-center-callout header="Essayez les filtres de rétention RUM dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Découvrez comment utiliser les filtres de rétention RUM pour contrôler les données de session stockées et optimiser votre budget d'observabilité.
{{< /learning-center-callout >}}

## Présentation {#overview}

Les filtres de rétention sont un ensemble de requêtes, similaires à celles utilisées dans le RUM Session Explorer, qui sont exécutées sur les événements RUM (sessions, vues, actions, ressources, etc.) au moment de leur ingestion. Ces filtres déterminent si une session est conservée pendant la période de rétention RUM standard de 30 jours ou si elle est supprimée.

Le **taux de rétention** spécifie le pourcentage de sessions correspondantes que vous souhaitez conserver, ce qui permet un meilleur contrôle des coûts. Bien que les filtres soient comparés à des événements individuels, tous les événements de la session sous-jacente sont conservés lorsqu'une décision d'échantillonnage est prise, garantissant ainsi une visibilité de bout en bout sur les sessions utilisateur.

## Fonctionnement {#how-it-works}

Une session est stockée dès qu'un filtre de rétention correspond à l'un de ses événements constitutifs sur la base de la requête prédéfinie, et elle est retenue en fonction du taux de rétention configuré

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagramme montrant le flux logique des filtres de rétention et leur impact sur le nombre de sessions finalement conservées." style="width:80%" >}}

Le flux logique des filtres de rétention est le suivant :

- Tous les événements RUM sont évalués par rapport à chaque filtre en séquence, en commençant par le premier reçu.
- Lorsqu'un événement `A` correspond à un filtre, une décision est prise sur la base du taux de rétention pour soit retenir l'intégralité de la session, soit attendre que les événements futurs soient évalués Dans les deux cas, l'événement `A` n'est pas évalué davantage par rapport aux filtres de rétention suivants. C'est pourquoi **l'ordre des filtres de rétention est important**.
- Les sessions conservées sont enregistrées et accessibles dans le Session Explorer et sur d'autres pages RUM. Les nouveaux événements provenant de cette session ne passent pas par la liste des filtres de rétention, mais sont automatiquement conservés pour garantir une visibilité complète.

**Remarques** :

- Si un événement ne correspond à aucun filtre, ou s'il correspond à un filtre mais que la décision est prise de ne pas conserver la session en fonction du taux de rétention configuré, les événements futurs de la même session continueront d'être évalués. Par conséquent, la session peut finir par être conservée.
- Soyez prudent lors de la définition de filtres sur des attributs d'événement qui se mettent à jour au fil du temps. Par exemple, un filtre conservant les sessions avec moins de deux erreurs pourrait retenir par erreur des sessions, car le nombre d'erreurs se met à jour en temps réel et toutes les sessions commencent à zéro Utilisez soit des conditions « supérieur ou égal à » (≥) pour les champs qui se mettent à jour, tels que `@session.error.count >= 2`, soit assurez-vous que les objets Session et View qui sont mutables sont complets avant de les évaluer par rapport aux filtres de rétention, en ajoutant `@session.is_active: false` ou `@view.is_active: false`.
- Nos SDK regroupent et compressent les événements avant de les envoyer à Datadog, et les échecs de téléchargement sont replacés à la fin de la file d'attente sur l'appareil. Par conséquent, il peut arriver que l'événement `B` soit évalué avant l'événement `A`, mais tous les événements sont finalement évalués par rapport à la liste des filtres de rétention afin d'éviter les lacunes.

## Fonctionnement des filtres de rétention avec les replays {#how-retention-filters-work-with-replays}

Vous pouvez gérer l'échantillonnage des sessions avec les replays en utilisant des filtres de rétention. Chaque fois qu'une session avec replays est facturée, les événements de session et l'enregistrement vidéo sont conservés et facturés. Cela signifie que si vous collectez 100 % des sessions et 100 % des replays à partir des SDK, chaque fois qu'un filtre de rétention conserve une session, Datadog conserve et facture à la fois la session et le replay.

**Remarque** : bien que les SDK mobiles de Datadog fournissent également des API pour démarrer et arrêter l'enregistrement de manière conditionnelle (au lieu de s'appuyer sur un taux d'échantillonnage fixe), seuls les replays collectés de force par le SDK Browser sont conservés par défaut

## Filtres de rétention permanents {#permanent-retention-filters}

Les filtres de rétention permanents sont des filtres de rétention prédéfinis qui ne peuvent pas être modifiés, désactivés ou supprimés. Ils sont placés en haut de votre liste de filtres de rétention.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="Les trois filtres de rétention permanents affichés en haut de la liste des filtres de rétention." style="width:100%" >}}

Il existe trois filtres de rétention permanents :

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}} : conserve 1 % des sessions avec des traces distribuées ingérées (et indexe leurs traces sur l'APM). Ces sessions (et leurs traces) **ne sont pas soumises à la facturation RUM (ou à la facturation APM)**.
- {{< ui >}}Synthetics Sessions{{< /ui >}} : conserve toutes les sessions générées par [Synthetic Monitoring][1]. Ces sessions sont facturées dans le cadre de Synthetic Monitoring et **ne sont pas soumises à la facturation RUM**.
- {{< ui >}}Sessions with forced replays{{< /ui >}} : conserve toutes les sessions pour lesquelles une relecture a été collectée de force via le mécanisme de [collecte forcée][2].

<div class="alert alert-info">Le filtre de rétention permanent RUM-APM Flat Sampling ne s'applique qu'avec les SDK suivants : <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## Création d'un filtre de rétention {#creating-a-retention-filter}

Pour créer un filtre de rétention :

1. Accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3].
1. Créez une application RUM ou cliquez sur une application existante.
1. Sous Product Settings, accédez à la page {{< ui >}}Retention Filters{{< /ui >}}.
1. Cliquez sur le bouton {{< ui >}}+ Add Retention Filter{{< /ui >}}.
1. Donnez un nom descriptif au filtre de rétention.
1. Sélectionnez un type d'événement dans la liste déroulante et saisissez une requête. Toute requête pouvant être rédigée dans le [RUM Explorer][4] fonctionne avec les filtres de rétention.
1. Optionnellement, définissez un taux de rétention pour les sessions qui correspondent à la requête de rétention. Vous pouvez cliquer sur {{< ui >}}Generate Estimate{{< /ui >}} pour vous aider à définir ce taux.

Le nouveau filtre est ajouté en bas de la liste des filtres de rétention. Il faut quelques secondes à Datadog pour propager un nouveau filtre et commencer à prendre des décisions d'échantillonnage.

## Modification des filtres {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Passez la souris sur un filtre de rétention pour le modifier." style="width:100%" >}}

### Modification d'un filtre {#edit-a-filter}

Pour modifier un filtre existant :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

### Duplication d'un filtre {#duplicate-a-filter}

Pour dupliquer un filtre :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Duplicate{{< /ui >}}.
1. Apportez les modifications souhaitées au filtre, puis cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

### Suppression d'un filtre {#delete-a-filter}

Pour supprimer un filtre de rétention :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Delete{{< /ui >}}.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Désactivation d'un filtre {#disable-a-filter}

Les filtres désactivés ignorent simplement les événements et ne prennent aucune décision d'échantillonnage. Les événements circulant dans la liste ignoreront les filtres désactivés.

Utilisez le bouton bascule à droite du filtre pour le désactiver ou l'activer.

### Réorganisation des filtres {#reorder-filters}

Faites glisser et déposez les filtres pour les réorganiser à leur nouvelle position.

## Exclusion des sessions utilisant des filtres de rétention {#excluding-sessions-using-retention-filters}

RUM without Limits utilise des filtres de rétention pour spécifier quelles sessions conserver, plutôt que lesquelles exclure. Vous ne pouvez pas définir un pourcentage de rétention à 0 % (la valeur par défaut est 1 %). De plus, définir des pourcentages de rétention faibles n'est pas une stratégie d'exclusion efficace car les sessions peuvent toujours être conservées par d'autres filtres dans votre configuration.

Pour vous assurer que les sessions provenant d'un environnement, d'une version d'application, d'un type d'appareil ou d'autres critères particuliers ne sont pas conservées, ajoutez explicitement des exclusions **dans la requête de TOUS VOS FILTRES**. Exemple :

- L'ajout de `-version:(1* OR 2*)` à tous les filtres de rétention garantit que vous ne conservez jamais d'événements provenant des anciennes versions 1 et 2 de votre application.
- L'ajout de `-@device.type:Bot` à tous les filtres de rétention exclut les robots des moteurs de recherche et autres bots auto-déclarés.
- L'ajout de `-@geo.country:"South Korea"` à tous les filtres de rétention exclut toutes les sessions provenant de Corée du Sud.

Par exemple, pour exclure les sessions provenant de Corée du Sud tout en conservant toutes les autres sessions, créez un filtre avec la requête `-@geo.country:"South Korea"` et définissez le taux de rétention sur 100 %.

**Remarque** : Il n'existe aucun moyen d'empêcher qu'un événement spécifique soit conservé. Vous pouvez utiliser des requêtes négatives (par exemple, en ajoutant `-@error.message:"Script error."` à un filtre de rétention ciblant les erreurs RUM) pour minimiser le volume d'événements indésirables, mais d'autres filtres de rétention peuvent toujours prendre une décision de rétention positive concernant une session contenant l'événement que vous avez tenté d'exclure.

## Plafonnement de la rétention avec des quotas {#capping-retention-with-quotas}

Pour plafonner le nombre total de sessions conservées par jour sur l'ensemble de vos filtres de rétention, consultez [Contrôler les coûts avec des quotas de rétention][9].

## Filtres de rétention inter-produits {#cross-product-retention-filters}

Les filtres de rétention inter-produits vous permettent d'optimiser la corrélation entre différents produits afin de conserver une télémétrie plus riche. Lors de la configuration d'un filtre de rétention RUM, vous pouvez activer un filtre de rétention inter-produits pour les traces APM.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="Filtres de rétention RUM avec filtres de rétention inter-produits activés pour les traces APM." style="width:100%" >}}

Le {{< ui >}}APM traces filter{{< /ui >}} indexe les traces APM pour le pourcentage spécifié de sessions conservées par le filtre de rétention RUM parent qui disposent de traces disponibles.

**Remarque** : La disponibilité des traces APM dépend de votre **configuration du SDK d'échantillonnage de traces** (découvrez comment <a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">corréler RUM avec les traces APM</a>)

  <div class="alert alert-info">Le filtre de traces APM est uniquement compatible avec les versions suivantes des SDK : <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">La configuration de filtres de rétention inter-produits peut augmenter les volumes indexés APM.</div>

Pour **trouver des sessions avec des traces APM indexées** dans le RUM Explorer, effectuez la requête `@session.has_indexed_apm_traces:true`.

### Exemple {#example}

Considérez une configuration où vous définissez un filtre de rétention RUM unique configuré comme suit :

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="Un filtre de rétention RUM ciblant les erreurs avec une rétention de 60 %, avec un filtre de rétention inter-produits réglé à 25 % pour les traces APM." style="width:60%" >}}

Si vous avez configuré le SDK pour échantillonner 40 % des traces, le résultat est le suivant :

- 40 % des sessions RUM ingérées ont leurs traces ingérées sur l'APM.
- 60 % des sessions RUM ingérées contenant au moins une erreur sont conservées.
- 25 % x 40 % = 10 % de ces sessions conservées ont leurs traces APM indexées.

<div class="alert alert-info">Les filtres de rétention inter-produits s'appliquent uniquement aux sessions conservées par le filtre de rétention RUM correspondant. Cela signifie que l'ordre des filtres est important tant pour la rétention RUM que pour les filtres de rétention inter-produits.<br><br>

Pour plus d'informations, consultez <a href="/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works">Comment cela fonctionne</a>.</div>

### Filtres de rétention inter-produits sur les filtres permanents {#cross-product-retention-filters-on-permanent-filters}

Les filtres de rétention inter-produits sont également disponibles sur les <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Filtres de rétention permanents</a>. Le filtre de traces APM est **uniquement modifiable sur les filtres de Synthetic Monitoring Sessions et sur ceux de Sessions with forced replays**.

<div class="alert alert-danger">Les traces APM indexées via un filtre de rétention inter-produits sur les filtres permanents Synthetics ou Forced Replay sont soumises à la facturation APM.</div>

## Bonnes pratiques {#best-practices}

Consultez [Bonnes pratiques pour les filtres de rétention][5].

## API {#api}

Les filtres de rétention et les filtres de rétention inter-produits peuvent être gérés via des [API][6] ou les [modules Terraform][7] dédiés de Datadog.

## Étapes suivantes {#next-steps}

Analysez les performances avec des [métriques][8].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/
[2]: /fr/session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /fr/real_user_monitoring/explorer/
[5]: /fr/real_user_monitoring/guide/retention_filter_best_practices
[6]: /fr/api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /fr/real_user_monitoring/rum_without_limits/metrics
[9]: /fr/real_user_monitoring/rum_without_limits/retention_quotas