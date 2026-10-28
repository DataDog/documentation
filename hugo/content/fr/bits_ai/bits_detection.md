---
description: Découvrez comment Bits Detection identifie de manière autonome les services
  critiques et gère la couverture de surveillance à mesure que votre système évolue.
further_reading:
- link: https://www.datadoghq.com/blog/bits-detection/
  tag: Blog
  text: Surveillez de manière autonome les dégradations importantes avec Bits Detection
title: Bits Detection
---
{{< callout url="#" btn_hidden="true" header="faux">}}
  Bits Detection est en version préliminaire. Contactez votre représentant Datadog pour demander l'accès.
{{< /callout >}}

## Vue d'ensemble {#overview}

La couverture de surveillance dérive avec le temps. À mesure que les ingénieurs ajoutent des endpoints, déplacent des dépendances et modifient les flux d'utilisateurs, les moniteurs continuent de refléter le système tel qu'il était. Un service peut sembler sain au niveau supérieur alors qu'un chemin critique est défaillant. Bits Detection identifie les endpoints qui nécessitent une couverture, définit la logique de détection à partir du comportement observé en production et maintient la couverture à jour sans que votre équipe n'ait à créer, régler et maintenir manuellement chaque monitor.

Lorsque Bits Detection signale un problème, il indique le endpoint affecté et la télémétrie associée comme point de départ pour le triage. Il s'agit de la première étape du workflow Bits AI, qui se poursuit par l'investigation avec [Bits Investigation][4] jusqu'à l'analyse de la cause racine et la remédiation.

## Activez Bits Detection {#enable-bits-detection}

<div class="alert alert-danger">Bits Detection est en version préliminaire. Contactez votre représentant Datadog pour demander l'accès.</div>

Une fois Bits Detection activé, il initialise la surveillance des 100 services les plus critiques de votre environnement, en se basant sur la télémétrie des services, les dépendances, les métadonnées de propriété, les changements récents et les signaux d'impact sur les utilisateurs. La couverture est prise en charge pour les services HTTP et gRPC instrumentés par APM, en donnant la priorité à la surveillance à la périphérie de votre application. Pour demander une couverture pour d'autres types de ressources, contactez [Datadog Support][1].

Les moniteurs existants de votre équipe restent en place. Bits Detection fonctionne parallèlement à ceux-ci, en ajoutant une couverture adaptative pour les parties de votre système qui changent trop rapidement pour être modélisées manuellement.

Vous pouvez activer Bits Detection pour des services supplémentaires à partir de plusieurs points d'entrée :

### Option 1 : Page de couverture de Bits Detection {#enable-from-bits-ai}
1. Dans Datadog, accédez à [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5] et cliquez sur {{< ui >}}Enable New Detection Coverage{{< /ui >}}.
1. Filtrez la liste des services pour trouver les services que vous souhaitez activer, et sélectionnez un ou plusieurs services dans la liste.
1. Configurez une destination de notification afin que l'équipe sache quand Bits détecte une dégradation critique.
1. Examinez la couverture gérée une fois l'initialisation terminée. Vous recevez un e-mail lorsque votre nouvelle posture de santé est prête.

### Option 2 : Page de service {#enable-from-service-page}

1. Dans Datadog, accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2] et sélectionnez un service.
1. Ouvrez la vue d'ensemble de la surveillance du service depuis la barre d'état du monitor ou la carte de Bits Detection.
1. Suivez l'invite pour activer la surveillance Bits Detection pour le service.
1. Examinez la couverture gérée une fois l'initialisation terminée. Vous recevez un e-mail lorsque votre nouvelle posture de santé est prête.

## Utilisez Bits Detection {#use-bits-detection}

Bits Detection gère la surveillance en trois étapes :

- **Identifier les ressources critiques** : Bits Detection évalue les services et ressources pris en charge pour déterminer quels endpoints, dépendances ou flux sont susceptibles d'être importants pour vos utilisateurs et votre entreprise.
- **Détecter les dégradations significatives** : Bits Detection crée et ajuste des moniteurs gérés pour les ressources critiques.
- **S'adapter aux changements de services** : Bits Detection maintient la surveillance alignée sur la production en réévaluant la criticité des ressources, la couverture de surveillance et le comportement d'alerte à mesure que vos services évoluent.

Utilisez les sections ci-dessous pour examiner la couverture, configurer le routage des alertes et fournir des commentaires pour aider Bits à s'adapter au fil du temps.

### Examiner la surveillance Bits Detection {#review-bits-detection-monitoring}

Utilisez la page de couverture Bits Detection, la Page de service ou la Liste de monitors pour découvrit comment Bits Detection surveille votre système.

**Page de couverture Bits Detection**

Pour examiner toutes les étendues où Bits Detection est active, accédez à [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5]. Chaque ligne est une étendue de détection indiquant le nombre de endpoints critiques et de moniteurs gérés que Bits maintient, la date de la dernière alerte de l'étendue, si les notifications d'alerte sont configurées et si l'auto-investigation est activée. Sélectionnez une étendue pour ouvrir ses Bits Detection Details, où vous pouvez examiner l'état de santé sur une fenêtre temporelle choisie, les endpoints que Bits Detection considère comme critiques (chacun avec une justification expliquant pourquoi il a été sélectionné), les moniteurs que Bits Detection gère et l'historique des alertes de l'étendue.

Depuis la Bits Detection Coverage Page, vous pouvez :

- Examiner l'état de santé de Bits Detection pour tous les services couverts.
- Activer une nouvelle couverture Bits Detection en sélectionnant les services que vous souhaitez que Bits Detection surveille.
- Afficher les détails d'une étendue gérée.
- Examiner les endpoints critiques couverts par la Bits Detection.
- Marquer un endpoint comme non critique.
- Gérer les règles de notification d'alerte.

**Service Page**

Pour ouvrir la vue Bits Detection d'un service, accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2], sélectionnez un service et ouvrez la vue d'ensemble de la surveillance depuis la barre d'état du monitor ou la carte Bits Detection.

{{< img src="bits_ai/bits_detection/service_page_bits_detection_card.png" alt="La carte Bits Detection sur la page Services APM affichant le statut de la surveillance et les endpoints critiques pour un service." style="width:90%;" >}}

La Service Page affiche Bits Detection monitors pour le service, y compris leur état actuel et l'historique des alertes, ainsi que les endpoints que Bits Detection considère comme critiques. Bits donne la priorité aux endpoints les plus susceptibles d'affecter directement les clients — tels que les chemins de paiement, d'inscription ou d'authentification — et chaque endpoint inclut une justification de criticité expliquant pourquoi il a été sélectionné.

Depuis la page de service, vous pouvez :

- Examiner l'état de santé de Bits Detection pour le service.
- Ouvrir une alerte active.
- Afficher les détails d'un type de détection géré.
- Examiner les endpoints critiques couverts par la Bits Detection.
- Marquer un endpoint comme non critique.
- Gérer les règles de notification d'alerte.

**Liste des monitors**

Pour afficher les monitors Bits Detection, accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}List{{< /ui >}}][3] et sélectionnez le filtre {{< ui >}}Bits Managed{{< /ui >}}. La bannière récapitulative affiche le nombre de moniteurs gérés dans chaque état. Développez une ligne de service pour afficher ses monitors gérés.

{{< img src="bits_ai/bits_detection/monitor_list_bits_managed.png" alt="La liste des monitors filtrée sur les monitors Bits Managed, affichant les services regroupés par état de monitor géré." style="width:90%;" >}}

La liste des monitors regroupe les monitors Bits Detection par service. Pour chaque service, vous pouvez examiner l'état, la priorité, le nom du monitor et les tags de chaque monitor géré. Les moniteurs Bits Detection sont marqués d'une icône d'étincelle afin que vous puissiez les distinguer des moniteurs que vos équipes créent et gèrent.

### Manage Bits Detection notifications {#manage-bits-detection-notifications}

Les moniteurs Bits Detection sont ajustés au comportement de production, et non à des seuils statiques. Utilisez des règles de notification d'alerte pour acheminer les alertes vers les bonnes équipes. Pour configurer une règle, accédez à la [service monitoring overview][2] et cliquez sur {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}.

1. Dans {{< ui >}}Match notifications with specific tags{{< /ui >}}, examinez la requête. Datadog pré-remplit la règle avec des tags pour le service sélectionné et les moniteurs gérés par Bits Detection. Vous pouvez filtrer davantage.
1. Dans {{< ui >}}Choose routing conditions and recipients{{< /ui >}}, sélectionnez {{< ui >}}Manual Routing{{< /ui >}} ou {{< ui >}}Dynamic Routing{{< /ui >}}.
1. Ajoutez les destinataires qui doivent recevoir les notifications de monitor correspondantes.
1. Nommez la règle.
1. Définissez les autorisations pour la règle.
1. Cliquez sur {{< ui >}}Create Rule{{< /ui >}}.

La règle de notification s'applique aux moniteurs qui correspondent à la requête de tag. Le panneau latéral indique combien de moniteurs correspondent à la règle et liste des exemples de moniteurs correspondants.

### Aidez Bits à apprendre {#help-bits-learn}

Utilisez les commentaires pour ajuster Bits Detection à votre environnement. Vous pouvez signaler les alertes comme utiles ou non pertinentes, et mettre à jour les endpoints considérés comme critiques depuis la page Service.

**Donnez votre avis sur une alerte**

1. Ouvrez l'alerte Bits Detection.
1. Dans l'invite de commentaires, cliquez sur {{< ui >}}Yes{{< /ui >}} si Bits aurait dû vous alerter, ou cliquez sur {{< ui >}}No, Because…{{< /ui >}} si cela n'aurait pas dû être le cas.
1. Si vous avez cliqué sur {{< ui >}}No, Because…{{< /ui >}}, sélectionnez un motif.
1. Cliquez sur {{< ui >}}Send Feedback{{< /ui >}}.

**Donnez votre avis sur la criticité des ressources**

Bits Detection utilise la criticité pour déterminer quelles ressources doivent bénéficier d'une couverture de surveillance gérée. Depuis la [présentation de la surveillance des services][2], cliquez sur {{< ui >}}Mark as Not Critical{{< /ui >}} à côté d'un endpoint qui ne devrait pas avoir de couverture critique, ou sur {{< ui >}}Add a New Endpoint{{< /ui >}} pour en marquer un comme critique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /fr/bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits-ai/detection/scopes