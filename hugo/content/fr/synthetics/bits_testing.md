---
description: Utilisez Bits Testing, un agent IA qui explore votre application pour
  cartographier les parcours utilisateur critiques et générer des tests Synthetic.
further_reading:
- link: /synthetics/goal_based_testing/
  tag: Documentation
  text: Test basé sur un objectif
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Tests de navigateurs
- link: /synthetics/api_tests/http_tests
  tag: Documentation
  text: Tests HTTP
- link: /synthetics/network_path_tests/
  tag: Documentation
  text: Tests de chemin réseau
- link: /synthetics/test_suites/
  tag: Documentation
  text: Collections de tests
- link: /synthetics/platform/settings/#global-variables
  tag: Documentation
  text: Variables globales
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: Tarification
  text: Tarification du Synthetic Monitoring
private: true
title: Bits Testing
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing est en préversion. Demandez l'accès pour rejoindre la liste d'attente.
{{< /callout >}}

## Présentation {#overview}

Bits Testing est un agent IA qui explore votre application pour cartographier ses parcours utilisateur les plus critiques. Il recommande des moyens d'augmenter la couverture de test et peut générer les tests Synthetic nécessaires pour combler les lacunes de couverture.

Bits Testing peut également générer des [tests basés sur des objectifs][1]. Ce type de test Synthetic utilise des tests agentiques non déterministes basés sur des invites pour vérifier que les utilisateurs peuvent atteindre un objectif spécifique dans votre application.

## Prérequis {#prerequisites}

Si votre application est protégée par une protection anti-bots ou un Web Application Firewall (WAF), autorisez les adresses IP listées sous `synthetics` dans les [plages IP Datadog][2] auprès de votre fournisseur. Pour exécuter Bits Testing depuis un emplacement unique, vous pouvez autoriser uniquement la plage IP de cet emplacement à la place. Consultez [Exécuter Bits Testing](#run-bits-testing) pour connaître les emplacements depuis lesquels Bits Testing peut s'exécuter.

## Accéder à Bits Testing {#access-bits-testing}

Ouvrez Bits Testing depuis Synthetic Monitoring & Testing en utilisant l'une des méthodes suivantes :

- **Bits Testing** dans la navigation supérieure de Synthetic Monitoring & Testing.
- `Cmd+K` sur macOS ou `Ctrl+K` sur Windows, puis recherchez Bits Testing.
- **Bits Testing** dans le menu de navigation latéral, sous **Digital Experience > Synthetic Monitoring & Testing**.

## Exécuter Bits Testing {#run-bits-testing}

1. Sur la page Bits Testing, décrivez la couverture souhaitée en langage clair. Par exemple, demandez à Bits Testing d'augmenter la couverture de manière générale ou de se concentrer sur des fonctionnalités spécifiques.
1. Sélectionnez un emplacement depuis lequel exécuter l'exploration :
   - Francfort (GCP : `gcp:europe-west3`)
   - Virginie septentrionale (AWS : `aws:us-east-1`)
   - Ohio (AWS : `aws:us-east-2`)
   - Virginie (Azure : `azure:eastus`)
1. Sélectionnez éventuellement un [profil d'Agent](#agent-profiles-optional).
1. Cliquez sur {{< ui >}}Start Discovery{{< /ui >}}, ou sur {{< ui >}}Start Discovery Without a Profile{{< /ui >}} si aucun profil n'est sélectionné.

{{< img src="synthetics/bits_testing/start_discovery.png" alt="Le panneau de configuration de l'exécution de Bits Testing avec des sélecteurs d'URL de départ, d'emplacement et de profil d'Agent" style="width:80%;" >}}

### Découverte en cours {#discovery-in-progress}

Bits Testing explore votre application à partir de l'URL que vous fournissez. À chaque nouvelle page rencontrée, il détermine un ensemble d'actions à essayer et répète ce processus à mesure qu'il parcourt votre application. Cliquez sur {{< ui >}}View Discovery Run{{< /ui >}} pour examiner une exécution en cours.

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="Une exécution de Bits Testing en cours, explorant une application à partir de son URL de départ" style="width:100%;" >}}

## Profils d'Agent (facultatif) {#agent-profiles-optional}

Un profil d'Agent stocke le contexte que Bits Testing utilise lors de l'interaction avec votre application, tel que les identifiants de connexion.

Pour créer un profil d'Agent :

1. Ouvrez le menu déroulant {{< ui >}}Agent Profile{{< /ui >}} et sélectionnez {{< ui >}}\+ New Profile{{< /ui >}}.
1. Nommez le profil.
1. Ajoutez une ou plusieurs variables. Pour chaque variable, définissez :
   - **Utilisation** : L'objectif de la variable, par exemple `username` ou `password`.
   - **Valeur** : Soit une valeur typée, soit une [Variable globale][3] existante.
1. Cliquez sur {{< ui >}}Create Profile{{< /ui >}}.

Le nouveau profil est automatiquement sélectionné pour l'exécution en cours. Les profils d'Agent enregistrés peuvent être réutilisés lors d'exécutions ultérieures de Bits Testing sans avoir à redéfinir leurs variables.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="La fenêtre modale New Profile pour créer un profil d'Agent, avec des champs pour le nom, l'utilisation des variables et la valeur" style="width:100%;" >}}

## Examiner les résultats{#review-results}

Lorsqu'une exécution se termine, Bits Testing affiche un graphique des branches qu'il a explorées :

- **Les branches réussies (vert)** ont mené à un parcours utilisateur pertinent pour lequel Bits Testing peut générer un test.
- **Les branches infructueuses (indigo)** n'ont pas donné lieu à un parcours pertinent, soit parce que Bits Testing a jugé le flux non pertinent ou incohérent, soit parce qu'il a rencontré une erreur.

Si une exécution ne se termine pas correctement, le graphique affiche l'erreur qui l'a interrompue.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="Un graphique d'exploration Bits Testing terminé montrant les branches explorées et les parcours trouvés" style="width:100%;" >}}

## Collections de tests générées{#generated-test-suites}

Cliquez sur une carte de parcours verte pour ouvrir la collection de tests générée par l'IA pour ce parcours. Une collection de tests peut inclure :

- **[Tests de navigateur][6]** qui rejouent les interactions qu'un utilisateur effectue pour terminer le parcours, avec des assertions tout au long du processus.
- **[Tests HTTP][7]** qui valident les endpoints que le parcours appelle pour récupérer des données.
- **[Tests de chemin réseau][8]** qui vérifient que les hosts alimentant le parcours sont accessibles.
- **[Tests basés sur des objectifs][1]** qui valident le parcours en utilisant des tests agentiques non déterministes.

Chaque test de la collection inclut un exemple gratuit d'exécution de test. Examinez la collection et soit :

- Cliquez sur {{< ui >}}Ignore{{< /ui >}} si la collection n'est pas pertinente, et partagez éventuellement vos commentaires sur la raison.
- Cliquez sur {{< ui >}}Start Testing{{< /ui >}} pour ajouter les tests de la collection à votre compte.

Une fois que vous commencez à tester une collection, chaque test devient un test Synthetic standard que vous pouvez modifier ou supprimer. Par défaut, les tests générés s'exécutent toutes les 5 minutes depuis l'emplacement que vous avez sélectionné pour l'exécution de Bits Testing.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="Une collection de tests générée avec des tests de navigateur, HTTP, de chemin réseau et basés sur des objectifs, montrant les détails d'une exécution réussie." style="width:100%;" >}}

## Facturation {#billing}

Pendant la préversion, l'exécution des tests Bits Testing et basés sur des objectifs est gratuite. Les tests que vous activez à partir d'une exécution Bits Testing sont facturés comme des tests Synthetic standard, en fonction des exécutions de tests. Voir la [tarification de Synthetic Monitoring][4].

## Emplacements pris en charge {#supported-locations}

Les tests Bits Testing et basés sur des objectifs ne s'exécutent qu'à partir des emplacements indiqués dans [Exécuter Bits Testing](#run-bits-testing). Les tests de navigateur, HTTP et de chemin réseau générés par Bits Testing ne sont pas soumis à cette restriction. Une fois créés, ils prennent en charge les mêmes emplacements que tout autre test Synthetic, y compris les [emplacements privés][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/goal_based_testing/
[2]: /fr/api/latest/ip-ranges/list-ip-ranges/
[3]: /fr/synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /fr/synthetics/platform/private_locations/
[6]: /fr/synthetics/browser_tests/
[7]: /fr/synthetics/api_tests/http_tests
[8]: /fr/synthetics/network_path_tests/