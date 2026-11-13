---
aliases:
- /fr/journey_monitoring/guide/
- /fr/journey_monitoring/guide/configuring_journeys/
description: Définissez des parcours et ajoutez une couverture Product Analytics,
  RUM et Synthetic.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/details_report/
  tag: Documentation
  text: En savoir plus sur le rapport de détails de parcours
title: Configurez les parcours
---
## Présentation {#overview}

Utilisez cette page pour configurer des parcours qui représentent des flux d'utilisateurs importants et révèlent leur état de santé.

La configuration d'un [parcours basé sur des événements][28] comporte trois étapes :

1. Créez un parcours et définissez son flux utilisateur.
2. Ajoutez des [opérations Real User Monitoring (RUM)][21] qui représentent des étapes techniques critiques.
3. Ajoutez des [tests Synthetic][24] qui couvrent le parcours.

Une fois ces étapes terminées, validez les [indicateurs clés de performance (KPI)][26], les opérations, les [objectifs de niveau de service (SLO)][25], les tests et les [variantes][3] du parcours.

Dans une [configuration Synthetics uniquement][29], les [collections de tests][14] apparaissent automatiquement en tant que parcours.

## Quand utiliser Journey Monitoring {#when-to-use-journey-monitoring}

Journey Monitoring combine le comportement des utilisateurs et la santé technique pour un flux de bout en bout. Il peut servir de lieu principal pour surveiller et dépanner un flux qui nécessiterait autrement des configurations distinctes dans plusieurs produits.

Les alternatives courantes incluent :

- **RUM** :
  - [Entonnoirs dans le RUM Session Explorer][30] ou widgets d'entonnoir basés sur des événements RUM
  - Widgets qui suivent l'activité des utilisateurs, tels que les clics sur des boutons ou les pages vues
  - Métriques ou actions personnalisées qui mesurent le volume de flux, le temps jusqu'à l'achèvement ou les parcours terminés
  - [Custom vitals][31] qui représentent des étapes techniques clés, que les opérations RUM peuvent représenter au sein d'un parcours
- **Synthetic Monitoring & Testing** : Tests multiples qui couvrent le même flux mais ne sont pas organisés dans une collection de tests de parcours
- **[Product Analytics][22]** : Entonnoirs, chemins de parcours ou autres visualisations qui suivent le comportement sur un flux de bout en bout

Journey Monitoring utilise Product Analytics pour comprendre le comportement et l'expérience des utilisateurs, RUM pour évaluer les performances et la disponibilité, et les tests Synthetic pour détecter les régressions et mesurer le [temps de disponibilité du parcours][17].

## Avant de commencer {#before-you-begin}

Consultez les [prérequis de Journey Monitoring][1]. Journey Monitoring nécessite un essai actif ou un abonnement payant à au moins un produit pris en charge.

Différentes étapes de configuration nécessitent différents produits :

- La définition d'un parcours avec des événements d'action ou de vue nécessite un accès RUM et Product Analytics en version Preview, en essai ou payant.
- L'ajout de données d'opération RUM nécessite un essai actif ou un abonnement payant à [RUM without Limits&trade;][4].
- L'ajout d'une couverture Synthetic nécessite un essai actif ou un abonnement payant à [Synthetic Browser Tests][12] ou [Synthetic Mobile Tests][13].

### Autorisations et rôles {#permissions-and-roles}

Journey Monitoring utilise des ressources provenant de plusieurs produits ; l'accès aux parcours et aux ressources liées dépend donc des autorisations de chaque produit. Consultez [Rôles et autorisations de Journey Monitoring][15] pour connaître les exigences d'accès.

Pour créer ou modifier des parcours :

- Votre rôle doit disposer d'un accès en écriture à Journey Monitoring.
- La création d'une collection de tests Synthetic pour un parcours nécessite également un accès en écriture à Synthetic Monitoring. Sans cela, Datadog crée le parcours sans collection de tests. Ajoutez-en une plus tard avec l'accès requis.

## Étape 1 : Créer un parcours {#step-1-create-a-journey}

### RUM et Product Analytics {#rum-and-product-analytics}

Utilisez des événements d'action ou de vue RUM pour définir un parcours basé sur les événements.

#### Choisissez un flux utilisateur {#choose-a-user-flow}

Créez des parcours pour les flux utilisateurs critiques qui contribuent à un résultat métier. Un parcours doit couvrir plusieurs étapes et représenter une action significative.

Suivez ces directives pour que chaque parcours reste ciblé :

**À faire :**

- Créez un parcours distinct pour chaque flux utilisateur différent.
- Utilisez des événements de début et de fin partagés pour révéler les [parcours en amont et en aval][16].
- Utilisez un parcours de haut niveau et des filtres d'attributs pour comparer des cohortes, telles que les utilisateurs aux États-Unis et au Royaume-Uni.

**À ne pas faire :**

- Créer un parcours pour une interaction unique et courte. Utilisez plutôt une opération RUM.
- Combinez plusieurs flux utilisateur distincts en un seul parcours.
- Créez des parcours en double qui ne diffèrent que par la valeur d'un attribut, comme le pays.

#### Choisissez une méthode de création {#choose-a-creation-method}

Créez un parcours manuellement lorsque vous savez quel flux utilisateur surveiller. Commencez par un [parcours suggéré][2] pour utiliser un flux que Datadog identifie à partir de l'activité des utilisateurs.

Pour créer un parcours :

1. Accédez à **Digital Experience > Journey Monitoring**.
2. Cliquez sur **New Journey**, ou sélectionnez un parcours suggéré depuis la carte ou le catalogue.
3. Sélectionnez une application frontend.
4. Saisissez un nom de parcours.
5. Sélectionnez un ou plusieurs événements de début.
6. Sélectionnez un ou plusieurs événements de fin.
7. Ajoutez éventuellement une description, des filtres d'attributs, une attribution à une équipe, des tags ou des variantes.
8. Cliquez sur **Save Journey**.

Les parcours suggérés incluent un nom, une description, un événement de début et un événement de fin préconfigurés. Vérifiez ces champs avant d'enregistrer. Une fois le parcours enregistré, Datadog ouvre son [rapport détaillé][5].

#### Définissez les conditions de début et de fin {#define-start-and-end-conditions}

Sélectionnez des événements d'action, des événements de vue, ou les deux. L'[entonnoir][27] se met à jour en fonction des événements sélectionnés et affiche le volume, le taux de conversion et le temps moyen de conversion pour chaque étape.

##### Événements de début et de fin multiples {#multiple-start-and-end-events}

Plusieurs événements de début peuvent représenter plusieurs points d'entrée dans le même flux utilisateur. Plusieurs événements de fin peuvent représenter plusieurs conclusions valides.

Chaque événement supplémentaire élargit la définition du parcours. Un grand nombre d'événements de début ou de fin peut rendre le périmètre du parcours flou et ses KPI moins précis.

##### Filtres d'attributs {#attribute-filters}

Les attributs au niveau du parcours incluent ou excluent de larges cohortes, telles que les utilisateurs internes. Les attributs sur les conditions de début et de fin individuelles restreignent davantage le flux.

Inclure des filtres d'attributs importants dans le nom ou la description du parcours aide les utilisateurs à comprendre le périmètre de ses KPI.

##### Chemins de provenance {#referrer-paths}

Les chemins de référent limitent un événement de début ou de fin aux instances qui suivent une vue de page spécifique. Ils aident à distinguer un événement qui apparaît dans plusieurs contextes de parcours de l'instance qui appartient à un parcours particulier.

##### Sélectionnez des événements de début et de fin significatifs {#select-meaningful-start-and-end-events}

Un événement de début doit clairement lancer le parcours et représenter une action intentionnelle de l'utilisateur.

<div class="alert alert-danger">Choisissez un événement de fin qui confirme que le parcours est terminé. Cliquer sur <strong>Pay</strong> ou <strong>Submit</strong> ne confirme pas la réussite. Si un événement ultérieur confirme la réussite, utilisez cet événement afin que les tentatives échouées ne soient pas comptabilisées comme des parcours terminés.</div>

Par exemple :

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

#### Ajoutez des variantes {#add-variants}

Une variante représente une séquence courante d'événements intermédiaires entre le début et la fin du parcours. Ajoutez des variantes pour comparer les KPI et les données de télémétrie sur différents chemins.

#### Ajoutez des tags et attribuez une équipe responsable {#add-tags-and-ownership}

Les tags et l'attribution à une équipe responsable aident les équipes à trouver les parcours pertinents et à filtrer le [catalogue de parcours][20]. Une convention de nommage et de marquage cohérente permet de garder les parcours organisés à mesure que le catalogue s'agrandit.

### Synthetics uniquement {#synthetics-only}

Avec uniquement Synthetic Monitoring & Testing, les collections de tests apparaissent automatiquement sous forme de parcours. Créez une autre collection de tests pour ajouter un parcours.

## Étape 2 : Ajouter des opérations RUM {#step-2-add-rum-operations}

Les opérations RUM mesurent la disponibilité et la latence des actions critiques dans le parcours. Utilisez-les pour déterminer si les performances techniques contribuent à l'abandon du parcours par les utilisateurs.

Les SLO sur les opérations liées contribuent au [statut du parcours][6].

### Examinez les opérations correspondantes {#review-matching-operations}

Datadog utilise la corrélation temporelle pour identifier les opérations RUM existantes qui peuvent faire partie du parcours. Ces opérations apparaissent sous la mention **Matching** dans le rapport détaillé.

Ne liez une opération que si les utilisateurs la rencontrent en effectuant le parcours.

{{< img src="journey_monitoring/journey-monitoring-matching-operations.png" alt="Le rapport détaillé de Journey Monitoring affiche les opérations RUM repérées par corrélation temporelle, ainsi que les exécutions, le taux de réussite, la latence et les options de création de SLO." style="width:100%;" >}}

### Créer des opérations {#create-operations}

Si aucune opération correspondante ne représente une action critique, choisissez une méthode d'instrumentation :

- **RUM SDK APIs** : [Instrumentez l'opération dans le code de votre application frontend][10] et signalez explicitement quand elle démarre, réussit ou échoue. Cette méthode offre un contrôle précis sur le cycle de vie de l'opération, mais nécessite des modifications de code.
- **Datadog UI** : [Créez l'opération dans Datadog][8] en sélectionnant les conditions de démarrage, de succès et d'échec à partir des événements RUM ingérés. Vous pouvez la créer à partir du catalogue d'opérations ou du tableau des opérations dans le rapport de détails du parcours. Cette méthode ne nécessite aucune modification de code, mais capture les échecs avec moins de précision car elle dépend des événements que Datadog collecte déjà.

[L'outil `create_rum_operation` de Datadog MCP Server][32] et l'[API RUM Operations][9] permettent également de créer des opérations configurées via l'interface utilisateur à partir de conditions d'événements RUM. Datadog lie automatiquement les opérations créées à partir d'un rapport de détails de parcours. Pour les opérations créées ailleurs, liez l'opération au parcours après l'avoir créée.

### Gérez les opérations {#manage-operations}

Sélectionnez **Manage Operations** pour ajouter ou supprimer des opérations du parcours.

Lier une opération :

- Identifie l'opération comme faisant partie du chemin critique du parcours
- Ajoute les SLO de l'opération au statut du parcours
- Crée un SLO de disponibilité avec un objectif de 99% si l'opération ne possède pas déjà au moins un SLO

### Gérez les SLO des opérations {#manage-operation-slos}

Chaque opération liée nécessite au moins un SLO pour que Datadog puisse évaluer sa contribution au parcours. Une opération peut avoir des SLO de disponibilité, des SLO de latence, ou les deux. Pour obtenir des conseils, consultez les [Meilleures pratiques pour créer des SLO sur les opérations RUM][11].

<div class="alert alert-tip">
Commencez par l'opération qui a le plus grand impact sur la conversion du parcours. Ajoutez d'autres opérations si nécessaire.
<ul>
<li>Pour un parcours de connexion utilisateur, surveillez l'action de connexion finale pour vérifier que des identifiants valides aboutissent à une authentification réussie.</li>
<li>Pour un parcours de paiement e-commerce, surveillez l'action de paiement car un échec de paiement empêche l'utilisateur de terminer le parcours.</li>
</ul>
</div>

## Étape 3 : Ajouter une couverture de tests Synthetic {#step-3-add-synthetic-test-coverage}

Les tests Synthetic fournissent une couverture technique pour les chemins de parcours critiques. Les échecs de test peuvent indiquer des régressions qui affectent les utilisateurs, et les tests de couverture déterminent la disponibilité du parcours.

Lorsque vous créez un parcours basé sur des événements avec un accès en écriture à Synthetic Monitoring, Datadog crée une collection de tests et ajoute les tests existants qui couvrent le parcours. La collection inclut un SLO de disponibilité modifiable avec un objectif par défaut de 99.9%. Sans accès en écriture à Synthetic Monitoring, Datadog crée le parcours sans collection de tests.

Pour les parcours basés uniquement sur Synthetics, la collection de tests existante définit le parcours. La section Synthetic Monitoring & Testing du rapport de détails du parcours décrit les performances et la disponibilité de la collection.

### Examinez les tests correspondants {#review-matching-tests}

Pour les parcours basés sur des événements, Datadog utilise les données RUM pour identifier les tests Synthetic qui couvrent le parcours. Ces tests correspondants apparaissent dans le rapport de détails du parcours et sur la page de la collection de tests.

- Examinez chaque test correspondant.
- Ajoutez des tests qui couvrent un chemin critique du parcours.

{{< img src="journey_monitoring/journey-monitoring-matching-tests.png" alt="Le rapport de détails du Journey Monitoring affichant les tests Synthetics correspondants avec leur statut d'alerte et leur disponibilité." style="width:100%;" >}}

### Créer des tests {#create-tests}

Pour créer une couverture, créez un test de navigateur ou un test d'application mobile, puis ajoutez-le à la collection du parcours.

Lorsqu'aucun test Synthetic ne couvre un parcours, [Bits Testing][18] peut générer des tests de couverture.

### Gérer les tests {#manage-tests}

Sélectionnez **Manage Tests** pour ajouter des tests à la collection de tests du parcours ou en supprimer. Ajoutez des tests de couverture lorsque la collection est vide ou lorsque Datadog identifie de nouveaux tests correspondants.

### Maintenir la couverture {#maintain-coverage}

- Les modifications apportées aux conditions de début ou de fin d'un parcours peuvent affecter les tests qui le couvrent. Examinez la couverture après avoir modifié ces conditions.
- Un parcours dispose d'une couverture Synthetic et indique sa disponibilité lorsque sa collection contient au moins un test de couverture.
- Supprimez les tests qui ne couvrent plus le parcours et ajoutez de nouveaux tests correspondants à mesure que l'application évolue.

La gestion de la couverture modifie les tests Synthetic, elle nécessite donc un accès en écriture à Synthetic Monitoring et une politique de restriction sur la collection.

## Valider un parcours {#validate-a-journey}

Après avoir configuré un parcours, vérifiez que :

- Ses événements de début et de fin représentent le flux utilisateur prévu.
- Ses KPI correspondent au trafic et au comportement utilisateur attendus.
- Ses variantes représentent des chemins attendus distincts.
- Chaque opération RUM liée représente une action critique et possède au moins un SLO.
- Sa collection de tests contient des tests qui couvrent les chemins critiques.
- Ses tags et l'équipe qui en est responsable aident les utilisateurs à trouver le parcours dans le catalogue.

## Maintenir un parcours {#maintain-a-journey}

Après avoir modifié les événements de début ou de fin d'un parcours, examinez ses variantes, les opérations correspondantes, sa couverture Synthetic et ses KPI. Utilisez le catalogue de parcours pour trouver et modifier des parcours. La [page d'état du parcours][6] explique comment examiner les états **Degraded** et **Missing coverage**.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/journey_monitoring/#prerequisites
[2]: /fr/journey_monitoring/suggested_journeys/
[3]: /fr/journey_monitoring/variants/
[4]: /fr/real_user_monitoring/rum_without_limits/
[5]: /fr/journey_monitoring/details_report/
[6]: /fr/journey_monitoring/status/
[8]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[9]: /fr/api/latest/rum-operations/
[10]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[11]: /fr/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[12]: /fr/synthetics/browser_tests/
[13]: /fr/synthetics/mobile_app_testing/
[14]: /fr/synthetics/test_suites/
[15]: /fr/journey_monitoring/roles_and_permissions/
[16]: /fr/journey_monitoring/overview/#upstream-and-downstream-journeys
[17]: /fr/journey_monitoring/details_report/#synthetic-monitoring--testing
[18]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[20]: /fr/journey_monitoring/overview/#journey-catalog
[21]: /fr/real_user_monitoring/operations_monitoring/
[22]: /fr/product_analytics/
[24]: /fr/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[25]: /fr/service_level_objectives/
[26]: /fr/journey_monitoring/details_report/#traffic-and-conversion-trends
[27]: /fr/product_analytics/charts/funnel_analysis/
[28]: /fr/journey_monitoring/#rum-and-product-analytics
[29]: /fr/journey_monitoring/#synthetics-only
[30]: /fr/real_user_monitoring/explorer/visualize/#funnels
[31]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#measure-component-level-performance-with-custom-vitals
[32]: /fr/mcp_server/tools/#create_rum_operation