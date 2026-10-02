---
description: Configurez des parcours avec des événements de début et de fin significatifs,
  une couverture technique, des SLO, des tests Synthetic et des variantes.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/details_report/
  tag: Documentation
  text: En savoir plus sur le rapport de détails de parcours
- link: /journey_monitoring/uptime/
  tag: Documentation
  text: En savoir plus sur la disponibilité des parcours.
title: Configuration de parcours dans Datadog
---
## Présentation {#overview}

Ce guide explique comment configurer des parcours qui représentent des flux d'utilisateurs importants et révèlent leur état de santé.

La configuration d'un parcours comporte trois étapes :

1. Créez un parcours et définissez son flux utilisateur.
2. Ajoutez des opérations RUM qui représentent des étapes techniques critiques.
3. Ajoutez des tests Synthetic qui couvrent le parcours.

Une fois ces étapes terminées, validez les indicateurs clés de performance (KPI), les opérations, les objectifs de niveau de service (SLO), les tests et les variantes du parcours.

## Quand utiliser Journey Monitoring {#when-to-use-journey-monitoring}

Journey Monitoring combine le comportement des utilisateurs et la santé technique pour un flux de bout en bout. Il peut servir de lieu principal pour surveiller et dépanner un flux qui nécessiterait autrement des configurations distinctes dans plusieurs produits.

Les alternatives courantes incluent :

- **Real User Monitoring (RUM)** :
  - Entonnoirs dans le RUM Session Explorer ou widgets d'entonnoir basés sur des événements RUM
  - Widgets qui suivent l'activité des utilisateurs, tels que les clics sur des boutons ou les pages vues
  - Métriques ou actions personnalisées qui mesurent le volume de flux, le temps jusqu'à l'achèvement ou les parcours terminés
  - Données vitales personnalisées qui représentent des étapes techniques clés, que les opérations RUM peuvent représenter au sein d'un parcours
- **Synthetic Monitoring** : Tests multiples qui couvrent le même flux, mais qui ne sont pas organisés sous forme de collection de tests de parcours
- **Product Analytics** : Entonnoirs, chemins de parcours ou autres visualisations qui suivent le comportement pour un flux de bout en bout

Journey Monitoring utilise Product Analytics pour comprendre le comportement et l'expérience des utilisateurs, RUM pour évaluer les performances et la disponibilité, et les tests Synthetic pour détecter les régressions et mesurer le temps de disponibilité des parcours.

## Avant de commencer {#before-you-begin}

Avant de suivre ce guide, consultez [l'aperçu et les prérequis de Journey Monitoring][1]. Pour utiliser Journey Monitoring, votre organisation doit disposer d'un abonnement payant ou d'essai à au moins l'un des produits suivants : RUM without Limits, Product Analytics, Synthetic Browser Tests ou Synthetic Mobile Tests.

### Autorisations et rôles {#permissions-and-roles}

Journey Monitoring utilise des ressources provenant de plusieurs produits ; l'accès aux parcours et aux ressources liées dépend donc des autorisations de chaque produit.

Pour créer ou modifier des parcours :

- Votre rôle doit disposer d'un accès en écriture à Journey Monitoring.
- La création d'une collection de tests Synthetic pour un parcours nécessite également un accès en écriture à Synthetic Monitoring. Sans cela, Datadog crée le parcours sans collection de tests, et vous pourrez en ajouter une plus tard.

Pour plus de détails sur la consultation et la modification des parcours et de leurs ressources associées, consultez [Rôles et autorisations][10].

## Étape 1 : Créer un parcours {#step-1-create-a-journey}

### Choisir un flux utilisateur {#choose-a-user-flow}

Créez des parcours pour les flux critiques orientés utilisateur que les utilisateurs doivent effectuer pour soutenir un résultat commercial. Un parcours doit couvrir plusieurs étapes et représenter une action significative.

Suivez ces directives pour que chaque parcours reste ciblé :

**À faire :**

- Créez un parcours distinct pour chaque flux utilisateur différent et connectez les parcours associés entre eux.
- Utilisez un parcours de haut niveau et des filtres d'attributs pour comparer des cohortes, telles que les utilisateurs aux États-Unis et au Royaume-Uni.

**À ne pas faire :**

- Créer un parcours pour une interaction unique et courte. Utilisez plutôt une [opération RUM][4].
- Combinez plusieurs flux utilisateur distincts en un seul parcours.
- Créez des parcours en double qui ne diffèrent que par la valeur d'un attribut, comme le pays.

### Choisissez une méthode de création {#choose-a-creation-method}

Créez un parcours manuellement ou commencez avec un parcours suggéré. Pour obtenir des instructions, consultez [Configuration de Journey Monitoring][2].

Choisissez une méthode de création selon que vous avez un flux utilisateur spécifique en tête :

- Commencez avec un [parcours suggéré][6] si vous ne savez pas quels parcours créer. Les parcours suggérés fournissent des KPI de haut niveau, notamment les démarrages, les conversions et le taux de conversion.
- Examinez les nouveaux parcours suggérés à mesure que vous publiez des fonctionnalités et mettez à jour l'expérience de l'application. Datadog génère des suggestions basées sur l'activité des utilisateurs dans l'application.
- Créez un parcours manuellement lorsque vous avez un flux utilisateur spécifique que vous souhaitez surveiller.

### Définissez les conditions de début et de fin {#define-start-and-end-conditions}

Un parcours est défini par ses événements de début et de fin. Sélectionnez des événements d'action, des événements de vue, ou les deux.

#### Événements de début et de fin multiples {#multiple-start-and-end-events}

Plusieurs événements de début peuvent représenter plusieurs points d'entrée dans le même flux utilisateur. Plusieurs événements de fin peuvent représenter plusieurs conclusions valides.

Chaque événement supplémentaire élargit la définition du parcours. Un grand nombre d'événements de début ou de fin peut rendre le périmètre du parcours flou et ses KPI moins précis.

#### Filtres d'attributs {#attribute-filters}

Les attributs au niveau du parcours incluent ou excluent de larges cohortes, telles que les utilisateurs internes. Les attributs sur les conditions de début et de fin individuelles restreignent davantage le flux.

Inclure des filtres d'attributs importants dans le nom ou la description du parcours aide les utilisateurs à comprendre le périmètre de ses KPI.

#### Chemins de référence {#referrer-paths}

Les chemins de référent limitent un événement de début ou de fin aux instances qui suivent une vue de page spécifique. Ils aident à distinguer un événement qui apparaît dans plusieurs contextes de parcours de l'instance qui appartient à un parcours particulier.

#### Variantes de parcours {#journey-variants}

La définition de base du parcours inclut uniquement les événements de début et de fin. Une variante ajoute une séquence spécifique d'événements d'action ou de vue intermédiaires entre ces points. Les variantes distinguent les chemins courants au sein d'un même parcours sans modifier le périmètre global de celui-ci.

La sélection d'une variante filtre les métriques et la télémétrie du parcours pour cette séquence d'événements. Cela vous permet de comparer le volume, le taux de conversion et le temps nécessaire à l'achèvement entre différents chemins. Les filtres d'attributs peuvent restreindre davantage une variante à une cohorte spécifique.

Chaque variante nécessite un nom unique et au moins un événement intermédiaire. Pour plus d'informations sur la création, l'analyse et la suppression de variantes, consultez [Journey variants][3].

#### Sélection des événements de début et de fin {#start-and-end-event-selection}

Un événement de début doit clairement lancer le parcours et représenter une action intentionnelle de l'utilisateur.

<div class="alert alert-danger">Choisissez un événement de fin qui confirme que le parcours est terminé. Cliquer sur « Payer » ou « Soumettre » ne signifie pas que l'action a fonctionné. Si un événement ultérieur confirme le succès, utilisez cet événement à la place, afin que les tentatives échouées ne soient pas comptabilisées comme des parcours terminés.</div>

Exemple :

- **Parcours de connexion**
  - Début : L'utilisateur ouvre la page de connexion.
  - Fin : L'application redirige l'utilisateur vers l'écran d'accueil.
  - Éviter de terminer par : L'utilisateur clique sur **Se connecter**.
- **Parcours de paiement**
  - Début : L'utilisateur ouvre la page de paiement.
  - Fin : L'application affiche une fenêtre modale de confirmation de paiement.
  - Éviter de terminer par : L'utilisateur clique sur **Payer**.
- **Parcours de soumission de formulaire**
  - Début : L'utilisateur ouvre le formulaire.
  - Fin : L'application affiche un message de confirmation de soumission.
  - Éviter de terminer par : L'utilisateur clique sur **Soumettre**.

### Ajouter des noms, des tags et une attribution {#add-names-tags-and-ownership}

Les tags et la propriété d'équipe aident les équipes à trouver les parcours pertinents et à filtrer le catalogue de parcours. Une convention de nommage et de marquage cohérente permet de garder les parcours organisés à mesure que le catalogue s'agrandit.

## Étape 2 : Ajouter des opérations RUM {#step-2-add-rum-operations}

Les opérations RUM fournissent une couverture technique pour les moments clés du parcours. Leur disponibilité et leur latence aident à expliquer si la performance technique contribue à l'abandon des utilisateurs.

### Lier les opérations suggérées {#link-suggested-operations}

Le rapport de détails du parcours utilise la corrélation temporelle pour suggérer des opérations RUM existantes qui peuvent faire partie du parcours. Ne liez une opération que si les utilisateurs la rencontrent en effectuant le parcours.

{{< img src="journey_monitoring/journey-monitoring-correlated-operations.png" alt="Le rapport de détails de Journey Monitoring affiche les opérations RUM corrélées temporellement avec les exécutions, le taux de réussite, la latence et les options de création de SLO." style="width:100%;" >}}

Lier une opération :

- Lie l'opération au parcours et l'identifie comme faisant partie du chemin critique du parcours.
- Crée automatiquement un SLO de disponibilité pour l'opération si elle ne possède pas déjà de SLO.

### Créer des opérations {#create-operations}

Créez une opération avec l'une des méthodes suivantes :

- [Dans Datadog][11]
- [Avec l'API RUM Operations][12]
- [Avec les API du SDK RUM][13]

### Créer des SLO pour les opérations {#create-slos-for-operations}

Chaque opération liée nécessite au moins un SLO pour que Datadog puisse évaluer sa contribution au parcours. Une opération peut avoir des SLO de disponibilité, des SLO de latence, ou les deux. Pour obtenir des conseils, consultez [Meilleures pratiques pour la création de SLO sur les opérations RUM][14].

Lorsque vous créez une opération à partir du rapport de détails du parcours, Datadog la lie au parcours et crée un SLO de disponibilité. Si vous créez une opération avec les API du SDK RUM ou l'API RUM Operations, utilisez l'[API RUM Operations][12] pour la lier au parcours.


<div class="alert alert-tip">
Commencez par l'opération qui a le plus grand impact sur la conversion du parcours. Ajoutez d'autres opérations si nécessaire.
<ul>
<li>Pour un parcours de connexion utilisateur, surveillez l'action de connexion finale pour vérifier que des identifiants valides aboutissent à une authentification réussie.</li>
<li>Pour un parcours de paiement e-commerce, surveillez l'action de paiement car un échec de paiement empêche l'utilisateur de terminer le parcours.</li>
</ul>
</div>

## Étape 3 : Ajouter une couverture de tests Synthetic {#step-3-add-synthetic-test-coverage}

Les tests Synthetic fournissent une couverture technique pour les chemins de parcours critiques. Les échecs de test peuvent indiquer des régressions qui affectent les utilisateurs, et les tests de couverture déterminent la disponibilité du parcours.

Datadog crée automatiquement une collection de tests Synthetic et un SLO de disponibilité modifiable avec un objectif par défaut de 99,9 % pour chaque parcours. Il ajoute également des tests Synthetic qui couvrent le parcours. Pour plus d'informations sur la couverture des tests, la gestion des tests et le SLO de disponibilité, consultez [Disponibilité du parcours][5].

### Vérifier la couverture du parcours {#review-journey-coverage}

Datadog utilise les données RUM pour identifier les tests Synthetic qui couvrent un parcours. Ces tests apparaissent sur la page des détails du parcours et sur la page de la collection de tests Synthetic.

- Examinez les tests que Datadog identifie comme couvrant le parcours.
- Si Datadog identifie des tests de couverture qui ne sont pas dans la suite, un indicateur met en évidence les tests supplémentaires.

### Ajouter des tests au parcours {#add-tests-to-a-journey}

Ajoutez des tests de couverture au parcours lorsque la suite est vide ou lorsque Datadog identifie des tests supplémentaires :

- Pour ajouter des tests existants, sélectionnez **Manage journey coverage**, puis sélectionnez les tests à ajouter.
- Pour créer une couverture, créez un [test de navigateur][7] ou un [test d'application mobile][8], puis ajoutez-le à la suite du parcours. Pour plus d'informations, consultez [Suites de tests][9].

{{< img src="journey_monitoring/journey-monitoring-covering-tests.png" alt="Le panneau Manage Tests in Suite affichant les tests de navigateur synthétiques qui couvrent un parcours." style="width:100%;" >}}

**Preview** : Lorsqu'aucun test Synthetic ne couvre un parcours, [Bits Testing][15] peut générer un test de navigateur de couverture. [Sign up for the Bits Testing preview][16].

### Maintenir la couverture {#maintain-coverage}

- Les modifications apportées aux conditions de début ou de fin d'un parcours peuvent affecter les tests qui le couvrent. Examinez la couverture après avoir modifié ces conditions.
- Un parcours ne rapporte de temps de disponibilité que lorsque sa suite contient au moins un test de couverture. Si le parcours perd sa couverture, il cesse de rapporter le temps de disponibilité.

La gestion de la couverture modifie les tests Synthetic, elle nécessite donc un accès en écriture à Synthetic Monitoring et une politique de restriction sur la suite. Consultez [Rôles et autorisations][10].

## Valider la configuration de Journey Monitoring {#validate-the-journey-monitoring-configuration}

Un parcours bien configuré présente les caractéristiques suivantes :

- Ses indicateurs clés de performance de haut niveau (démarrages, volume de conversion, taux de conversion et temps de conversion) correspondent au comportement attendu des utilisateurs.
- Ses opérations RUM liées et ses tests Synthetic représentent la performance technique des étapes critiques du parcours.
- Chaque opération liée dispose d'au moins un SLO et d'un taux de réussite élevé, indiquant que les étapes critiques sont disponibles pour les utilisateurs.
- Ses tests Synthetic produisent des résultats cohérents sans échecs intermittents.
- Si les utilisateurs peuvent effectuer le parcours via différents chemins attendus, des variantes représentent ces chemins.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/journey_monitoring/
[2]: /fr/journey_monitoring/#setup
[3]: /fr/journey_monitoring/details_report/variants/
[4]: /fr/real_user_monitoring/operations_monitoring/
[5]: /fr/journey_monitoring/uptime/
[6]: /fr/journey_monitoring/map/suggested_journeys/
[7]: /fr/synthetics/browser_tests/
[8]: /fr/synthetics/mobile_app_testing/
[9]: /fr/synthetics/test_suites/
[10]: /fr/journey_monitoring/roles_and_permissions/
[11]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[12]: /fr/api/latest/rum-operations/
[13]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[14]: /fr/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[15]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[16]: https://www.datadoghq.com/product-preview/bits-testing/