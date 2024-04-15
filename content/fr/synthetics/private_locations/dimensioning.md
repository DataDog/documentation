---
description: Exigences en matière de dimensionnement pour vos emplacements privés
further_reading:
- link: /synthetics/private_locations/monitoring
  tag: Documentation
  text: Surveiller vos emplacements privés

title: Dimensionner vos emplacements privés
---

## Présentation

Les emplacements privés peuvent exécuter des tests [API][1], [API à plusieurs étapes][2] et [Browser][3]. Les tests Browser nécessitent plus de ressources que les tests API et API à plusieurs étapes. Il est possible d'exécuter plusieurs types de tests sur un seul emplacement privé.

Vous pouvez calculer les dimensions de vos emplacements privés en définissant leurs types de tests, le nombre maximal d'exécutions des tests ainsi que les ressources matérielles totales requises. Cette approche vous permet de distribuer les ressources entre plusieurs workers, afin d'exécuter plus efficacement vos tests.

Pour améliorer le dimensionnement de vos emplacements, répartissez vos tests en fonction de leur type. Par exemple, certains emplacements privés peuvent être dédiés à l'exécution de tests API et API à plusieurs étapes, tandis que d'autres peuvent exécuter exclusivement des tests Browser.

### Prérequis

Pour débuter avec le dimensionnement de vos emplacements privés, vous aurez besoin :

1. de connaître les bases de l'orchestration de conteneurs ainsi que l'option que vous utilisez pour exécuter votre emplacement privé ;
2. de monter le fichier de configuration de l'emplacement privé avec l'orchestrateur de votre choix, et de le rendre accessible aux conteneurs sous-jacents de votre emplacement privé ;
3. si vous utilisez des [tests Browser avec des IP bloquées][4], un accès `sudo` sera peut-être nécessaire.

### Définir le nombre maximal d'exécutions de test

Les exigences en matière de ressources varient en fonction du nombre maximal de tests que votre emplacement privé peut être amené à exécuter en parallèle, ainsi que de l'application ou des applications à tester. Tenez compte des pics qui peuvent se produire lors de l'exécution de tests à la demande (par exemple, lors de l'exécution de tests dans le cadre de vos [pipelines de CI/CD][5]), mais également de la taille et du nombre de ressources à charger.

Définissez le paramètre `concurrency` de votre emplacement privé sur le nombre maximal d'exécutions de test. Par défaut, jusqu'à 10 tests peuvent être exécutés en parallèle.

Pour en savoir plus, consultez la rubrique [Configuration avancée][4].

### Définir les ressources matérielles totales requises

Maintenant que vous savez le type de test et le nombre maximal de tests à exécuter en parallèle, définissez les ressources matérielles totales requises pour votre emplacement privé.

La configuration de base inclut un CPU doté de 0,150 cœur et une mémoire de 150 MiB.

Les exigences supplémentaires dépendent du type des tests exécutés par l'emplacement privé.

| Type de test                                     | Recommandations processeur/mémoire/disque    |
| --------------------------------------------- | --------------------------------- |
| [Tests API][1] et [tests API à plusieurs étapes][2] | 100 mCores/200 MiB/100 MiB par test   |
| [Tests Browser][3]                           | 800 mCores/1 GiB/500 MiB par test |

Par exemple, Datadog recommande de prévoir environ 8 cœurs de CPU `(150 mCores + (800 mCores * 10 exécutions de test))`, environ 10 GiB de mémoire `(150 MiB + (1 GiB * 10 exécutions de test))` et environ 5 GiB de disque `(500 MiB * 10 exécutions de test)` pour un emplacement privé exécutant exclusivement des tests Browser, avec jusqu'à `10` exécutions simultanées.

**Remarque** : si vous exécutez des tests API ou API à plusieurs étapes ainsi que des tests Browser sur un emplacement privé, basez-vous sur les exigences des tests Browser pour calculer les ressources matérielles totales requises.

### Attribuer des ressources à votre emplacement privé

Après avoir déterminé les [ressources totales requises pour votre emplacement privé](#definir-les-ressources-materielles-totales-requises), choisissez la façon dont vous souhaitez distribuer ces ressources. Vous pouvez attribuer toutes les ressources à un seul worker ou les distribuer entre plusieurs workers. Pour attribuer toutes les ressources à un seul worker, exécutez un conteneur pour un emplacement privé doté d'un fichier de configuration.
1. Définissez le [paramètre `concurrency`][4] sur le `nombre maximal de tests pouvant être exécutés en parallèle sur votre emplacement privé`.
2. Attribuez les [ressources totales requises pour votre emplacement privé](#definir-les-ressources-materielles-totales-requises) à votre unique conteneur.

Pour distribuer vos ressources entre plusieurs workers, exécutez plusieurs conteneurs pour un emplacement privé doté d'un fichier de configuration.

 1. Définissez le [paramètre `concurrency`][4] sur le résultat du calcul `nombre maximal de tests pouvant être exécutés en parallèle sur votre emplacement privé / nombre de workers associés à votre emplacement privé`.
 2. Attribuez à chaque conteneur d'emplacement privé le nombre de ressources correspondant au résultat du calcul `ressources totales requises pour l'emplacement privé / nombre de workers`.


Par exemple, Datadog recommande environ 8 cœurs de CPU, 10 GiB de mémoire et 5 GiB de disque pour un emplacement privé exécutant exclusivement des tests Browser, avec jusqu'à `10` exécutions simultanées. Pour distribuer ces ressources entre deux workers, définissez le [paramètre `concurrency`][4] sur 5 et allouez environ 4 cœurs de CPU, 5 GiB de mémoire et 2,5 GiB de disque à chaque worker.

#### Mécanisme de mise en file d'attente

Lorsque plusieurs workers sont associés à un emplacement privé, chaque worker demande un certain nombre d'exécutions de test, en fonction du [paramètre `concurrency`][4] et du nombre de tests supplémentaires qui peuvent être attribués.

Exemple : dix tests sont programmés pour s'exécuter simultanément sur un emplacement privé sur lequel deux workers s'exécutent. Si le worker 1 exécute deux tests, il peut demander l'exécution de trois tests supplémentaires. Si le worker 2 n'exécute aucun test, il peut demander les cinq prochains tests. Les deux tests restants peuvent être demandés par le worker qui termine ses tests en premier (à savoir un worker avec des disponibilités).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/multistep?tab=requestoptions
[3]: /fr/synthetics/browser_tests/?tab=requestoptions
[4]: /fr/synthetics/private_locations/configuration#advanced-configuration
[5]: /fr/synthetics/cicd_integrations
