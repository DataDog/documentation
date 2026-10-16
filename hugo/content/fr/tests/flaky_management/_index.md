---
description: Suivez, triez et gérez les tests instables.
further_reading:
- link: /continuous_integration/tests/
  tag: Documentation
  text: En savoir plus sur Test Optimization
- link: /tests/flaky_tests/
  tag: Documentation
  text: En savoir plus sur le travail avec les tests instables
- link: https://www.datadoghq.com/knowledge-center/flaky-tests/
  tag: Centre de connaissances
  text: Présentation des tests instables
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centre d'apprentissage
  text: Démarrage avec Test Optimization
title: Gestion des tests instables
---
## Présentation {#overview}

La page [Gestion des tests instables][1] offre une vue centralisée pour suivre, trier et corriger les tests instables dans toute votre organisation. Vous pouvez consulter l'état de chaque test ainsi que des métriques d'impact clés telles que le nombre d'échecs de pipeline, le temps CI gaspillé et le taux d'échec.

Depuis cette interface utilisateur, vous pouvez agir sur les tests instables pour atténuer leur impact. Mettez en quarantaine ou désactivez les tests problématiques pour éviter que les instabilités connues ne bloquent les builds, et créez des éléments de travail et des tickets Jira pour suivre les travaux de correction.

Chaque test instable possède un identifiant unique et stable dérivé d'un hachage de l'identifiant du dépôt et du nom complet du test. Dans le Test Optimization Explorer, il s'agit de la facette `@test.fingerprint_fqn`. Dans l'[API de gestion des tests instables][18], il s'agit du `id` du test, et vous pouvez filtrer l'endpoint de recherche des tests instables à l'aide de la clé `fingerprint_fqn`. Utilisez cet identifiant pour rechercher ou mettre à jour un test spécifique via l'API.

{{< img src="tests/flaky_management-2.png" alt="Présentation de l'interface utilisateur de gestion des tests instables" style="width:100%;" >}}

## Modifier l'état d'un test instable {#change-a-flaky-tests-state}

Utilisez le menu déroulant d'état pour modifier la façon dont un test instable est traité dans votre pipeline CI. Cela peut aider à réduire le bruit dans la CI tout en conservant la traçabilité et le contrôle. Les états disponibles sont :

| État     | Description |
| ----------- | ----------- |
| {{< ui >}}Active{{< /ui >}} | Le test est connu pour être instable et s'exécute dans la CI. |
| {{< ui >}}Quarantined{{< /ui >}} | Maintenez le test en cours d'exécution en arrière-plan, mais les échecs n'affectent pas le statut de la CI et n'interrompent pas les pipelines. Ceci est utile pour isoler les tests instables sans bloquer les fusions. Datadog marque les événements d'exécution de test avec `@test.test_management.is_quarantined:true` lorsqu'ils sont mis en quarantaine. |
| {{< ui >}}Disabled{{< /ui >}} | Ignorez complètement le test dans la CI. Utilisez ceci lorsqu'un test n'est plus pertinent ou doit être temporairement supprimé du pipeline. Datadog marque les événements d'exécution de test avec `@test.test_management.is_disabled:true` lorsqu'ils sont désactivés. Les tests désactivés sont exclus du déplacement automatique vers {{< ui >}}Fixed{{< /ui >}}. |
| {{< ui >}}Fixed{{< /ui >}} | Le test a réussi de manière cohérente et n'est plus instable. Si cela est pris en charge, utilisez le [flux de remédiation](#confirm-fixes-for-flaky-tests) pour confirmer la correction et appliquer automatiquement cet état après sa fusion dans la branche par défaut. |

<div class="alert alert-info">Les actions d'état ont des exigences de version minimale pour la bibliothèque d'instrumentation de chaque langage de programmation. Consultez <a href="#compatibility">Compatibilité</a> pour plus de détails.</div>

## Configurez des politiques pour automatiser le cycle de vie des tests instables {#configure-policies-to-automate-the-flaky-test-lifecycle}

Configurez des politiques automatisées de tests instables pour régir la manière dont les tests instables sont gérés dans chaque dépôt. Par exemple, un test qui devient instable dans la branche par défaut peut être automatiquement mis en quarantaine, puis désactivé s'il reste non corrigé après 30 jours.

1. Cliquez sur le bouton {{< ui >}}Policy Settings{{< /ui >}} en haut à droite de la page de gestion des tests instables. Vous pouvez également ouvrir [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][13] et cliquer sur la ligne {{< ui >}}Flaky Test Policies{{< /ui >}} pour configurer les politiques par défaut de votre organisation ou les remplacer pour chaque dépôt.
2. Recherchez et sélectionnez le dépôt que vous souhaitez configurer. Cela ouvre le panneau latéral {{< ui >}}Flaky Test Policies{{< /ui >}}.
    {{< img src="tests/flaky-policies-4.png" alt="Page des politiques de tests instables avec le volet de modification des politiques ouvert pour configurer une politique." style="width:100%;" >}}

3. Utilisez les commutateurs pour activer des actions automatisées spécifiques, et utilisez les règles d'automatisation pour personnaliser davantage la manière dont les tests sont mis en quarantaine, désactivés ou relancés :
   <table>
     <thead>
       <tr>
         <th>Action</th>
         <th>Description</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>{{< ui >}}Quarantine{{< /ui >}}</td>
         <td>
           <p>Activez pour permettre la mise en quarantaine des tests instables pour ce dépôt.</p>
           <p>Personnalisez les règles d'automatisation en fonction de :</p>
           <ul>
             <li>{{< ui >}}Time{{< /ui >}} : Mettre un test en quarantaine si son état est <code>Active</code> pendant un nombre de jours spécifié. La règle est déclenchée chaque jour à 12:15 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}} : Mettre en quarantaine un <code>Active</code> test s'il est instable dans une ou plusieurs branches spécifiées.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}} : Mettre en quarantaine un <code>Active</code> test si son taux d'échec au cours des 7 derniers jours est supérieur ou égal au seuil spécifié. La règle est déclenchée toutes les 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Disable{{< /ui >}}</td>
         <td>
           <p>Activez cette option pour permettre la désactivation des tests instables pour ce dépôt. Vous pourriez vouloir faire cela après une mise en quarantaine ou pour protéger des branches spécifiques contre l'instabilité.</p>
           <p>Personnalisez les règles d'automatisation en fonction de :</p>
           <ul>
             <li>{{< ui >}}State and time{{< /ui >}} : Désactiver un test s'il présente un état spécifié pendant un nombre de jours défini. La règle est déclenchée chaque jour à 12:30 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}}: Désactiver un <code>Active</code> ou <code>Quarantined</code> test s'il est instable dans une ou plusieurs branches spécifiées.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}}: Désactiver un <code>Active</code> ou <code>Quarantined</code> test si son taux d'échec au cours des 7 derniers jours est supérieur ou égal au seuil spécifié. La règle est déclenchée toutes les 15 minutes.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Attempt&nbsp;to&nbsp;Fix{{< /ui >}}</td>
         <td>Lorsque vous tentez de corriger un test instable, réessayez automatiquement le test un nombre défini de fois sur le commit contenant la correction.</td>
       </tr>
       <tr>
         <td>{{< ui >}}Fixed{{< /ui >}}</td>
         <td>
           <p>Si un test instable ne présente plus d'instabilité pendant 30 jours, il est automatiquement déplacé vers l'état Corrigé. Cette automatisation est un comportement par défaut et ne peut pas être personnalisée.</p>
           <p>Les tests dans l'état {{< ui >}}Disabled{{< /ui >}} sont exclus de cette automatisation et ne sont jamais automatiquement déplacés vers {{< ui >}}Fixed{{< /ui >}}. Comme les tests désactivés sont ignorés dans l'intégration continue (CI), Datadog ne reçoit aucun signal indiquant s'ils sont toujours instables. Pour rendre à nouveau un test désactivé éligible, changez son état en {{< ui >}}Active{{< /ui >}} ou {{< ui >}}Quarantined{{< /ui >}}.</p>
           <p>Avant que Datadog ne déplace automatiquement un test instable vers {{< ui >}}Fixed{{< /ui >}}, il vérifie si le test est peut-être défectueux plutôt que corrigé. Un test défectueux est un test instable dont les exécutions récentes ont toutes échoué, ce qui entraîne un taux d'échec de 100 % au cours des 7 derniers jours. Datadog ne marque pas automatiquement ces tests comme corrigés, ce qui aide à empêcher les tests mis en quarantaine qui échouent toujours de casser à nouveau la CI.</p>
           <p>Utilisez la facette {{< ui >}}Broken test{{< /ui >}} dans le Flaky Tests Management Explorer pour identifier ces tests. Filtrer sur <code>broken_test:true</code> pour afficher les tests avec un taux d'échec de 100 % au cours des 7 derniers jours.</p>
         </td>
       </tr>
     </tbody>
   </table>

## Suivre l'évolution des tests instables {#track-evolution-of-flaky-tests}

Suivez l'évolution du nombre de tests instables avec la métrique prête à l'emploi `test_optimization.test_management.flaky_tests`. La métrique est enrichie avec les tags ci-dessous pour vous aider à analyser les décomptes plus en détail.

- `repository_id`
- `test_service`
- `branch`
- `flaky_status`
- `test_codeowners`
- `flaky_category`

Le tag `branch` n'existe que lorsque le test a été instable dans la branche par défaut du dépôt au cours des 30 derniers jours. Cela vous aide à écarter les tests instables qui n'ont présenté d'instabilité que dans les branches de fonctionnalités, car ils peuvent ne pas être pertinents. Vous pouvez configurer la branche par défaut de vos dépôts sous [Repository Settings][2].

## Examinez un test instable {#investigate-a-flaky-test}

Pour plus d'informations sur un test instable spécifique, utilisez ces options dans le menu d'actions à la fin de chaque ligne :

- {{< ui >}}View Last Failed Test Run{{< /ui >}} : Ouvrez le panneau latéral avec les détails de la dernière exécution ayant échoué du test.
- {{< ui >}}View related test executions{{< /ui >}} : Ouvrez le [Test Optimization Explorer][3] affichant toutes les exécutions récentes du test.

## Créez des éléments de travail pour les tests instables {#create-work-items-for-flaky-tests}

Pour tout test instable, vous pouvez créer un élément de travail et utiliser [Work Management][4] pour suivre tout travail de remédiation. Cliquez sur le bouton {{< ui >}}Create Work Item{{< /ui >}} ou utilisez le menu d'actions à la fin de la ligne.

## Confirmez les correctifs pour les tests instables {#confirm-fixes-for-flaky-tests}

Lorsque vous corrigez un test instable, le flux de remédiation de Test Optimization peut confirmer le correctif en relançant le test plusieurs fois. Pour activer le flux de remédiation :

1. Pour le test que vous corrigez, cliquez sur {{< ui >}}Link commit to Flaky Test fix{{< /ui >}} dans l'interface de gestion des tests instables.
1. Copiez la clé de test instable unique qui s'affiche (par exemple, `DD_ABC123`).
1. Incluez la clé de test dans le titre ou le message de votre commit Git pour le correctif (par exemple, `git commit -m "DD_ABC123"`).
1. Lorsque Datadog détecte la clé de test, il déclenche automatiquement le flux de remédiation pour ce test. La clé n'a pas besoin d'être dans le commit le plus récent. Datadog vérifie également les commits précédents récents, de sorte que le flux se déclenche toujours lorsque vous poussez plusieurs commits ensemble ou lorsque votre fournisseur CI ne signale que le commit le plus récent. Le flux de remédiation :
    - Relance les tests que vous tentez de corriger 20 fois (ou le nombre de tentatives que vous avez spécifié dans votre [configuration des politiques de tests instables](#configure-policies-to-automate-the-flaky-test-lifecycle)).
      - Marque chaque tentative avec `@test.test_management.is_attempt_to_fix:true` dans les événements d'exécution de test.
    - Exécute les tests même s'ils sont marqués comme `Disabled`.
    - Si toutes les tentatives réussissent, marque le correctif comme {{< ui >}}in progress{{< /ui >}} dans l'interface de gestion des tests instables, l'associe à la branche utilisée pour le correctif et attend que cette branche soit fusionnée.
      - Marque la dernière tentative de test avec `@test.test_management.attempt_to_fix_passed:true` dans les événements d'exécution de test.
      - Démarre une [période de grâce](#grace-period-mechanism) de 14 jours pour laisser le temps au correctif de se propager partout dans le dépôt.
    - Si une tentative échoue, conserve l'état actuel du test (`Active`, `Quarantined` ou `Disabled`).
      - Marque la dernière tentative de test avec `@test.test_management.attempt_to_fix_passed:false` dans les événements d'exécution de test.

<div class="alert alert-danger">Pour Cypress, ce flux de remédiation nécessite que l'<a href="https://docs.cypress.io/app/core-concepts/test-isolation">isolation des tests</a> soit activée. Avec <code>testIsolation: false</code>, les tentatives de correction automatique ne s'exécutent pas. Voir aussi <a href="/tests/setup/javascript/?tab=cypress#retries-require-cypress-test-isolation">Les réessais nécessitent l'isolation des tests Cypress</a>.</div>

### Suivre les correctifs en cours {#track-fixes-that-are-in-progress}

Après une exécution de remédiation réussie, la gestion des tests instables suit la branche contenant le correctif et affiche un indicateur {{< ui >}}Fix in progress{{< /ui >}} jusqu'à ce que le correctif atteigne la branche par défaut du dépôt. Lorsque la demande de tirage associée est fusionnée, le test passe automatiquement à `Fixed` et l'indicateur est supprimé. Si le correctif est poussé directement vers la branche par défaut, le test est marqué `Fixed` immédiatement.

Exigences et limitations :
- L'intégration du code source doit être configurée pour un fournisseur SCM pris en charge (GitHub, GitLab ou Azure DevOps) afin que Datadog puisse recevoir les webhooks de fusion de demandes de tirage. Voir [Configuration de l'intégration du code source][17].
- Renommer ou supprimer la branche de fonctionnalité après l'exécution de la remédiation empêche Datadog de détecter la fusion.
- Les branches contenant des correctifs datant de plus de trois mois cessent d'être surveillées ; relancez le flux de remédiation pour actualiser le suivi.
- Si votre fournisseur SCM n'est pas pris en charge ou si l'intégration du code source n'est pas configurée, Datadog ne peut pas détecter les fusions automatiquement. Faites passer manuellement le test à `Fixed` une fois le correctif déployé.

### Mécanisme de période de grâce {#grace-period-mechanism}

Après avoir corrigé un test instable, il peut falloir du temps pour que le correctif se propage à toutes les branches, ce qui peut entraîner la persistance de l'instabilité du test dans les branches obsolètes. Un mécanisme de période de grâce empêche les tests instables d'apparaître sur les branches obsolètes après l'application du correctif.

Une période de grâce de 14 jours s'applique à chaque test instable ayant fait l'objet d'une correction réussie après l'utilisation du [flux de remédiation](#confirm-fixes-for-flaky-tests). Pendant cette période, Datadog traite le test en fonction de son statut avant le début de la période de grâce :
- Si le test était {{< ui >}}Active{{< /ui >}} ou {{< ui >}}Quarantined{{< /ui >}}, Datadog traite le test comme {{< ui >}}Quarantined{{< /ui >}}.
- Si le test était {{< ui >}}Disabled{{< /ui >}}, Datadog traite le test comme {{< ui >}}Disabled{{< /ui >}}.

Cette méthode évite les échecs inutiles de CI et permet aux développeurs de gagner du temps.

## Corrections de tests instables basées sur Bits AI {#bits-ai-powered-flaky-test-fixes}

Une fois que Test Optimization a détecté un test instable, [Bits Code][16] peut automatiquement le diagnostiquer et le corriger. Bits Code analyse les modèles d'échec du test et génère des modifications de code prêtes pour la production. Vous pouvez ensuite créer une pull request GitHub directement à partir des suggestions de Bits Code.

Pour que Bits Code puisse créer une correction, le test instable doit répondre aux critères suivants :
- **Taux d'échec** : Au moins 5%
- **Temps perdu** : Au moins 2 heures
- **Pipelines échoués** : Au moins 2 pipelines
- **Branche** : Doit avoir été instable dans la branche par défaut
- **Exécutions échouées** : Doit avoir au moins 1 exécution échouée incluant à la fois les tags `@error.message` et `@test.source.file`

{{< img src="tests/bits_ai_flaky_test_fixes-2.png" alt="Bits Code affichant une correction proposée pour un test instable" style="width:100%;" >}}

### Configuration {#setup}

Pour permettre à Bits Code de suggérer des corrections de tests instables, activez Bits Code pour Test Optimization en suivant les instructions de configuration dans la [documentation de Bits Code][16]. Bits Code crée automatiquement des corrections pour les tests instables détectés par Test Optimization.

Une fois Bits Code activé, lors de la consultation d'un test instable, cliquez sur {{< ui >}}Generate fix{{< /ui >}}.

## Catégorisation des tests instables par IA {#ai-powered-flaky-test-categorization}

La gestion des tests instables utilise l'IA pour attribuer automatiquement une catégorie de cause racine à chaque test instable en fonction des modèles d'exécution et des signaux d'erreur. Cela vous aide à filtrer, trier et hiérarchiser les tests instables plus efficacement.

<div class="alert alert-info">Un test doit avoir au moins une exécution échouée incluant à la fois les tags <code>@error.message</code> et <code>@error.stack</code> pour être éligible à la catégorisation. Si le test a été récemment détecté, la catégorisation peut prendre plusieurs minutes.</div>

### Catégories {#categories}

| Catégorie                | Description |
|-------------------------|-------------|
| {{< ui >}}Concurrency{{< /ui >}}         | Test qui invoque plusieurs threads interagissant de manière non sécurisée ou imprévue. L'instabilité est causée, par exemple, par des conditions de concurrence résultant d'hypothèses implicites sur l'ordre d'exécution, conduisant à des blocages lors de certaines exécutions de tests. |
| {{< ui >}}Randomness{{< /ui >}}          | Le test utilise le résultat d'un générateur de données aléatoires. Si le test ne prend pas en compte tous les cas possibles, il peut échouer par intermittence, par exemple, uniquement lorsque le résultat d'un générateur de nombres aléatoires est zéro. |
| {{< ui >}}Floating Point{{< /ui >}}      | Le test utilise le résultat d'une opération en virgule flottante. Les opérations en virgule flottante peuvent souffrir de dépassements de capacité (over- et under-flows) de précision, d'addition non associative, etc., ce qui, s'il n'est pas correctement pris en compte, peut entraîner des résultats incohérents (par exemple, comparer un résultat en virgule flottante à une valeur réelle exacte dans une assertion). |
| {{< ui >}}Unordered Collection{{< /ui >}}| Le test suppose un ordre d'itération particulier pour un objet de collection non ordonné. Comme aucun ordre n'est spécifié, les tests qui supposent un ordre fixe seront probablement instables pour diverses raisons (par exemple, l'implémentation de la classe de collection). |
| {{< ui >}}Too Restrictive Range{{< /ui >}}| Test dont les assertions n'acceptent qu'une partie de la plage de sortie valide. Il échoue par intermittence sur des cas limites non gérés. |
| {{< ui >}}Timeout{{< /ui >}}             | Le test échoue en raison de limitations de temps, soit au niveau du test individuel, soit dans le cadre d'une collection. Cela inclut les tests qui dépassent leur limite de temps d'exécution (par exemple, un test unique ou l'ensemble de la collection) et échouent par intermittence en raison de temps d'exécution variables. |
| {{< ui >}}Order Dependency{{< /ui >}}    | Le test dépend d'une valeur ou d'une ressource partagée modifiée par un autre test. Modifier l'ordre d'exécution des tests peut briser ces dépendances et produire des résultats incohérents. |
| {{< ui >}}Resource Leak{{< /ui >}}       | Le test gère incorrectement une ressource externe (par exemple, en omettant de libérer la mémoire). Les tests ultérieurs qui réutilisent la ressource peuvent devenir instables. |
| {{< ui >}}Asynchronous Wait{{< /ui >}}   | Le test effectue un appel asynchrone ou attend que des éléments se chargent/s'affichent et n'attend pas explicitement la fin (souvent en utilisant un délai fixe). Si l'appel ou le rendu prend plus de temps que le délai imparti, le test échoue. |
| {{< ui >}}IO{{< /ui >}}                  | Le test est instable en raison de sa gestion des entrées/sorties — par exemple, il échoue lorsque l'espace disque est épuisé pendant une écriture. |
| {{< ui >}}Network{{< /ui >}}             | Le test dépend de la disponibilité du réseau (par exemple, interrogation d'un serveur). Si le réseau est indisponible ou encombré, le test peut échouer. |
| {{< ui >}}Time{{< /ui >}}                | Le test repose sur l'heure système et peut être instable en raison de divergences de précision ou de fuseau horaire (par exemple, il échoue lors du passage à minuit en UTC). |
| {{< ui >}}Environment Dependency{{< /ui >}} | Le test dépend d'un système d'exploitation, de versions de bibliothèque ou d'un matériel spécifiques. Il peut réussir dans un environnement mais échouer dans un autre, en particulier dans les environnements CI cloud où les machines varient de manière non déterministe. |
| {{< ui >}}Unknown{{< /ui >}}             | Le test est instable pour une raison inconnue. |

## Recevez des notifications {#receive-notifications}

Configurez des notifications pour suivre les modifications apportées à vos tests instables. Les notifications sont envoyées lorsque :
- Un nouveau test instable est détecté sur la branche par défaut du dépôt.
- Un utilisateur ou une règle modifie l'état d'un test instable.
- Le flux de remédiation pour un test instable réussit ou échoue.

Vous pouvez envoyer des notifications à des adresses e-mail ou à des canaux Slack (voir l'[intégration Slack Datadog][5]), et acheminer les messages en fonction des propriétaires du code de test. Lorsque plusieurs propriétaires de code sont spécifiés, un test instable doit être assigné à tous les propriétaires de code spécifiés pour que la règle de notification corresponde. Si aucun propriétaire de code n'est spécifié, tous les destinataires sélectionnés sont informés de toutes les modifications de tests instables dans le dépôt. Configurez les notifications pour chaque dépôt à partir du panneau latéral [{{< ui >}}Flaky Test Policies{{< /ui >}}][13] dans les paramètres d'optimisation CI/CD.

Les notifications sont regroupées sur une courte période pour réduire le bruit. Le résumé hebdomadaire est uniquement envoyé aux règles de notification pour lesquelles des propriétaires de code sont configurés.

### Types de notification {#notification-types}

| Type de notification | Description |
|---|---|
| {{< ui >}}New flaky test detected{{< /ui >}} | Un nouveau test instable est détecté sur la branche par défaut du dépôt. |
| {{< ui >}}Test quarantined{{< /ui >}} | Un test est mis en quarantaine par une règle de politique automatisée (basée sur le temps, la branche ou le taux d'échec). |
| {{< ui >}}Test disabled{{< /ui >}} | Un test est désactivé par une règle de politique automatisée (basée sur le temps, la branche ou le taux d'échec). |
| {{< ui >}}Fix successful{{< /ui >}} | Un test réussit toutes les tentatives dans le flux de remédiation et est marqué comme « correction en cours ». |
| {{< ui >}}Fix failed{{< /ui >}} | Un test échoue pendant le flux de remédiation. |
| {{< ui >}}Manual state change{{< /ui >}} | Un utilisateur modifie manuellement l'état d'un test instable. |
| {{< ui >}}Weekly digest summary{{< /ui >}} | **Bêta** : Un résumé hebdomadaire envoyé chaque lundi, rapportant l'état actuel des tests instables et les changements depuis la semaine précédente, regroupés par dépôt et propriétaire de code. Envoyé uniquement aux règles de notification pour lesquelles des propriétaires de code sont configurés, et peut être désactivé par règle depuis les paramètres de notification de la règle. |

{{< img src="tests/flaky_management_notifications_settings-3.png" alt="Interface des paramètres de notification." style="width:100%;" >}}

## Compatibilité {#compatibility}

Pour utiliser les fonctionnalités de gestion des tests instables, vous devez utiliser l'instrumentation native de Datadog pour votre framework de test. Le tableau ci-dessous présente les versions minimales de chaque SDK Datadog requises pour mettre en quarantaine, désactiver et tenter de corriger les tests instables. Cliquez sur le nom d'un langage pour obtenir des informations de configuration :

| Langage        | Mise en quarantaine et désactivation          | Tentative de correction               |
| --------------- | ----------------------------- | ---------------------------- |
| [.NET][6]       | 3.13.0+                       | 3.23.0+                      |
| [Go][7]         | 1.73.0+ (Orchestrion v1.3.0+) | 2.2.2+ (Orchestrion v1.6.0+) |
| [Java][8]       | 1.47.0+                       | 1.52.0+                      |
| [JavaScript][9] | 5.44.0+                       | 5.59.0+                      |
| [Python][10]    | 3.3.0+                        | 3.8.0+                       |
| [Ruby][11]      | 1.13.0+                       | 1.17.0+                      |
| [Swift][12]     | 2.6.1+                        | 2.6.1+                       |

## Dépannage {#troubleshooting}

### Les tests instables désactivés ne sont pas automatiquement déplacés vers l'état Corrigé {#disabled-flaky-tests-are-not-automatically-moved-to-fixed}

Datadog ne déplace pas automatiquement les tests {{< ui >}}Disabled{{< /ui >}} vers l'état {{< ui >}}Fixed{{< /ui >}}, même après qu'ils ont cessé d'être instables pendant 30 jours. Un test désactivé est ignoré dans l'intégration continue (CI), donc Datadog ne reçoit aucune donnée d'exécution de test pour celui-ci et ne peut pas vérifier s'il est toujours instable.

Pour corriger un test désactivé, effectuez l'une des opérations suivantes :

- Déclenchez le flux de remédiation [tentative de correction](#confirm-fixes-for-flaky-tests). Il relance le test même lorsqu'il est désactivé, et le déplace vers {{< ui >}}Fixed{{< /ui >}} une fois la correction confirmée et fusionnée.
- Modifiez manuellement l'état du test vers {{< ui >}}Active{{< /ui >}} ou {{< ui >}}Quarantined{{< /ui >}} à l'aide du [menu déroulant d'état](#change-a-flaky-tests-state). Datadog déplace ensuite automatiquement le test vers {{< ui >}}Fixed{{< /ui >}} lors de la prochaine exécution de l'automatisation, à moins que le test ne redevienne instable.

### Les notifications Slack ne sont pas envoyées {#slack-notifications-are-not-delivered}

Si les notifications Slack ne sont pas envoyées, vérifiez que votre règle de notification utilise le format `@slack-ACCOUNT-CHANNEL`.

Si vous utilisez `@slack-CHANNEL` (sans le nom du compte), la notification est acheminée vers le premier compte Slack configuré. Pour les organisations disposant de plusieurs espaces de travail Slack, il se peut que ce ne soit pas l'espace de travail souhaité.

Pour trouver le nom de votre compte, accédez à la [tuile d'intégration Slack][5] et vérifiez le champ
{{< ui >}}Account Name{{< /ui >}} pour l'espace de travail que vous souhaitez utiliser.

### La remédiation « Tentative de correction » ne se déclenche pas après la liaison d'un correctif {#attempt-to-fix-remediation-does-not-trigger-after-linking-a-fix}

Une fois que vous avez inclus la clé de test (par exemple, `DD_ABC123`) dans un commit, Datadog analyse le commit qui a déclenché l'exécution de test ainsi que les 10 commits les plus récents qui le précèdent. Si le flux de remédiation ne démarre pas, vérifiez les points suivants :

- **La clé se trouve dans un commit plus ancien.** Datadog analyse uniquement le commit déclencheur et les 10 commits les plus récents de son historique. Si vous poussez plus de 10 commits à la fois, incluez la clé dans le commit déclencheur ou dans l'un des 10 commits les plus récents.
- **Le correctif a été fusionné par squash.** Une fusion par squash combine les commits originaux en un seul commit, donc Datadog ne lit que le message du commit de squash ; les commits individuels précédant le squash ne sont plus analysés. La plupart des fournisseurs incluent les messages de commit originaux dans le commit de squash, donc une clé présente dans l'un d'eux est conservée. Si votre fournisseur les omet, ajoutez la clé au message du commit de squash.
- **La clé ne correspond pas au format attendu.** Utilisez la clé exacte affichée dans l'interface utilisateur de gestion des tests instables (par exemple, `DD_ABC123`) dans le titre ou le message du commit.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: https://app.datadoghq.com/source-code/repositories
[3]: /fr/tests/explorer
[4]: /fr/incident_response/work_management
[5]: /fr/integrations/slack/?tab=datadogforslack
[6]: /fr/tests/setup/dotnet/
[7]: /fr/tests/setup/go/
[8]: /fr/tests/setup/java/
[9]: /fr/tests/setup/javascript/
[10]: /fr/tests/setup/python/
[11]: /fr/tests/setup/ruby/
[12]: /fr/tests/setup/swift/
[13]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[16]: /fr/bits_ai/bits_code/
[17]: /fr/integrations/guide/source-code-integration/
[18]: /fr/api/latest/test-optimization/