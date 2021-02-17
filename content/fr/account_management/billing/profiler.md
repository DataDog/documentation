---
title: Facturation du service Profileur en continu
kind: documentation
---
Le service [Profileur en continu de Datadog][1] vous permet d'analyser les performances du code en production, sur l'ensemble de votre stack et avec une charge système minimale. Vous pouvez tirer parti du profiling de code pour identifier et optimiser rapidement les méthodes ou les classes qui consomment le plus de ressources dans votre application, et ainsi améliorer l'efficacité du code et réduire les coûts facturés par votre fournisseur de cloud.

| Paramètre de facturation  | Prix                                      | Conteneurs                                                                 | Facturation                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host avec profileur][2]      | 12 $ par [host profilé][2] par mois | Quatre conteneurs profilés* par host profilé inclus dans le prix. Tout conteneur profilé supplémentaire est facturé 2 $ par conteneur et par mois.    | Le nombre de hosts que vous surveillez en même temps via le service Profileur en continu de Datadog est mesuré toutes les heures. À la fin du mois, ces mesures horaires sont classées de la plus élevée à la moins élevée, et Datadog envoie une facture basée sur la neuvième mesure la plus élevée (la huitième la plus élevée uniquement pour le mois de février). <br> En outre, Datadog mesure le nombre total de conteneurs qui sont profilés. Toutes les cinq minutes, Datadog enregistre le nombre de conteneurs uniques que vous surveillez via le service Profileur en continu. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement. Pour le service Profileur en continu, Datadog comptabilise uniquement les conteneurs qui exécutent le service Profileur en continu dans le nombre total de conteneurs surveillés. |


**Remarque :** un conteneur profilé est un conteneur qui exécute le service Profileur en continu. Les conteneurs non profilés ne sont pas inclus. Par exemple, si un conteneur de service DNS qui n'est pas profilé s'exécute en même temps qu'un conteneur d'application profilé, le premier conteneur sera pas comptabilisé dans le quota de quatre conteneurs profilés.

## Scénarios de déploiement

Ces exemples illustrent des cas d'utilisation courants avec des tarifs correspondant à une facturation annuelle. Contactez votre représentant commercial ou votre [chargé de compte][3] pour discuter d'éventuels tarifs préférentiels.

### Hosts sans conteneurs

Utilisation de 5 hosts exécutant une application profilée dans chaque host. Aucun conteneur.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 12 $ par host                                                                                    | 5 * 12 $       | 60 $                   |
| Conteneurs profilés  | 0 par host | 0 $, car il n'y a aucun conteneur supplémentaire                                                              | 0 * 2 $        | 0 $                    |
| Total          |            |                                                                                                 | 60 $ + 0 $      | **60 $ par mois**    |


### Hosts avec 4 conteneurs profilés

Utilisation de 5 hosts exécutant chacun 4 conteneurs profilés. Un conteneur profilé est un conteneur qui exécute le service Profileur en continu et envoie des données de profiling à l'Agent Datadog. Les conteneurs non profilés ne sont pas pris en compte.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 12 $ par host                                                                                    | 5 * 12 $       | 60 $                   |
| Conteneurs profilés  | 4 par host | 0 $, car l'utilisation de 4 conteneurs rentre exactement dans le quota. Aucuns frais supplémentaires ne sont facturés.        | 0 * 2 $        | 0 $                    |
| Total          |            |                                                                                                 | 60 $ + 0 $      | **60 $ par mois**    |


### Hosts avec 6 conteneurs profilés

Utilisation de 5 hosts exécutant chacun 6 conteneurs profilés. Un conteneur profilé est un conteneur qui exécute le service Profileur en continu et envoie des données de profiling à l'Agent Datadog. Les conteneurs non profilés ne sont pas pris en compte.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 12 $ par host                                                                                    | 5 * 12 $       | 60 $                   |
| Conteneurs profilés  | 6 par host | 2 $ par conteneur supplémentaire par host. Ici, il y a 6 - 4 = 2 conteneurs supplémentaires pour chaque host.        | 2  * 2 $ * 5 hosts         | 20 $                   |
| Total          |            |                                                                                                 | 60 $ + 20 $      | **80 $ par mois**    |


### Hosts avec 5 conteneurs, dont 2 seulement sont profilés

Utilisation de 4 hosts exécutant chacun 5 conteneurs, mais seulement deux d'entre eux sont des conteneurs profilés. Un conteneur profilé est un conteneur qui exécute le service Profileur en continu et envoie des données de profiling à l'Agent Datadog. Les conteneurs non profilés ne sont pas pris en compte.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 12 $ par host                                                                                    | 5 * 12 $       | 60 $                   |
| Conteneurs profilés  | 2 par host | 0 $, car avec 2 conteneurs, on reste en dessous du quota. Aucuns frais supplémentaires ne sont facturés. Les 3 conteneurs restants qui n'envoient pas de données de profiling ne sont pas comptabilisés dans le quota.         | 0 * 2 $        | 0 $                    |
| Total          |            |                                                                                                 | 60 $ + 0 $      | **60 $ par mois**    |


### Hosts exécutant des nombres différents de conteneurs profilés

Utilisation de deux hosts profilés : Host A et Host B.

* Host A exécute 8 conteneurs
* Host B exécute 2 conteneurs

Les 10 conteneurs exécutent des instances d'applications qui sont profilées, ce qui signifie que Host A exécute 4 conteneurs supplémentaires non compris dans l'offre et que Host B peut ajouter 2 conteneurs supplémentaires.

Dans ce scénario, tous les conteneurs de tous les hosts (soit 2 hosts et 10 conteneurs) sont agrégés. Le prix inclut alors 8 conteneurs, et 2 conteneurs sont ajoutés. Le calcul détaillé est le suivant :


| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 12 $ par host                                                                                    | 2 * 12 $       | 24 $                   |
| Conteneurs profilés  | 10 après agrégation de host A et de host B | 2 $ par conteneur supplémentaire. Ici, 2 hosts permettent d'utiliser jusqu'à 8 conteneurs, mais il faut ajouter 2 conteneurs en surplus pour les 2 hosts : 10 - 8 = 2 conteneurs supplémentaires.        | 2 $ * 2 hosts        | 4 $                    |
| Total          |            |                                                                                                 | 24 $ + 4 $      | **28 $ par mois**    |


## FAQ
**1. Comment un « host Profileur en continu » est-il défini pour la facturation ?**

Un host est une instance de système d'exploitation physique ou virtuel. Le nombre de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog est mesuré toutes les heures. Pour la facturation d'un profileur en continu, le nombre de hosts sur lesquels la bibliothèque du profileur est installée et qui envoient des profils est calculé toutes les heures. Ces mesures horaires sont triées par ordre décroissant à la fin du mois, et Datadog facture selon la neuvième mesure la plus élevée (huitième mesure la plus élevée uniquement en février).

**2. Comment le tarif facturé est-il calculé en cas de déploiement d'un Agent par conteneur ?**

Datadog recommande de configurer un Agent par host sous-jacent en cas de déploiement sur des conteneurs. Si vous souhaitez malgré tout exécuter un Agent par conteneur, chaque conteneur est considéré comme un host distinct. Ainsi, le pris s'élève à (prix par host d'APM) * (nombre de conteneurs).

**3. Comment la facture est-elle calculée en cas redimensionnement soudain de mon environnement ?**

Étant donné que les mesures horaires des 99 premiers centiles de hosts sont triées par ordre décroissant à la fin du mois et que Datadog facture selon la neuvième mesure la plus élevée (la huitième plus élevée uniquement en février), cela vous évite d'être facturé en cas de pic inattendu.

**4. Les conteneurs pause Kubernetes sont-ils facturés ?**

Kubernetes crée des conteneurs pause pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoigne ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent 5.8+).

**5. Le nombre de hosts facturés tient-il compte de mes services ?**

La facturation du service Profileur en continu est calculée en fonction du nombre de hosts déployés avec des Agents qui envoient des profils, et non en fonction du nombre de services.

**6. Est-il possible d'utiliser le profiling en continu sans l'APM ?**

Non. Si vous souhaitez utiliser le profiling en continu sans activer l'APM, faites-le nous savoir. Contactez notre [service commercial][4] ou votre [chargé de comte][3].

[1]: /fr/tracing/profiling/
[2]: /fr/account_management/billing/pricing/#continuous-profiler
[3]: mailto:success@datadoghq.com
[4]: mailto:sales@datadoghq.com