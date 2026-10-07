---
title: Suivi de schéma
---

Data Streams Monitoring offre une visibilité sur les schémas utilisés par les producteurs et les consommateurs, ainsi que sur l'impact des problèmes de schéma sur les services en aval. Vous pouvez suivre les nouveaux schémas ajoutés, les schémas présentant des erreurs et les évolutions de schéma pour gérer les migrations de schéma et identifier les problèmes.

La modification d'un schéma produit par un service sans mise à jour du consommateur peut conduire ce dernier à avoir des difficultés à traiter les charges utiles, bloquant ainsi le flux de données en aval. La compréhension des changements de schéma garantit la compatibilité des données entre les producteurs et les consommateurs, et prévient finalement les problèmes.

## Prérequis

Data Streams Monitoring doit être [installé][1] sur les services producteurs et consommateurs.

## Langages pris en charge

|        | Avro      | Protobuf  | Version minimale du traceur |
| ------ | --------- | --------- | ---------------------- |
| Java   | {{< X >}} | {{< X >}} | v1.36+                 |
| Node.js | {{< X >}} | {{< X >}} | v5.24+ ou v4.48+.       |
| Python | {{< X >}} | {{< X >}} | v2.14+                 |
| .NET   |           | {{< X >}} | v3.15+                 |
| Golang |           |           |                        |

## Afficher les schémas

### Liste des schémas

Dans la [liste des schémas][3], vous pouvez afficher tous les schémas utilisés dans vos pipelines.

{{< img src="data_streams/schema_list.png" alt="Vue en liste de trois schémas" style="width:100%;" >}}

Pour chaque schéma, le tableau affiche les informations suivantes :
- Type
- Name
- Première et dernière occurrence
- Taux de production, taux de consommation et taux d'erreur dans l'intervalle de temps sélectionné
- Tous les producteurs et consommateurs du schéma
- Lag des consommateurs : le lag Kafka maximal pour tous les consommateurs d'un schéma spécifique

La sélection d'un schéma dans la liste affiche le débit du schéma par service, les erreurs par service et le schéma complet. 

{{< img src="data_streams/schema_panel.png" alt="Vue de la liste des schémas avec un panneau latéral ouvert affichant des informations détaillées sur un schéma" style="width:100%;" >}}

Suivez les étapes ci-dessous pour afficher des informations détaillées sur un schéma :
1. Accédez à [Data Streams Monitoring][4].
1. Cliquez sur l'onglet **Schemas**.
1. Sélectionnez l'intervalle de temps.
1. Utilisez les filtres rapides pour filtrer les nouveaux schémas (détectés pour la première fois au cours des 3 dernières heures), les schémas présentant des taux d'erreur élevés ou les schémas actifs.
1. Sélectionnez un schéma. Un panneau latéral s'ouvre avec des informations détaillées sur ce schéma.

### Au niveau du service

Pour chaque service que vous suivez dans Data Streams Monitoring, vous pouvez consulter des informations sur les schémas qu'il utilise.

Pour afficher les informations sur les schémas au niveau du service :
1. Accédez à [Data Streams Monitoring][4].
1. Assurez-vous que l'onglet **Explore** est sélectionné.
1. Cliquez sur un service. Le panneau latéral de détails du service s'affiche.
1. Sélectionnez l'onglet **Schemas**.

Dans l'onglet des schémas, vous pouvez :
- Afficher le débit d'entrée par schéma.
- Afficher la liste de tous les schémas détectés dans l'intervalle de temps sélectionné, ainsi que les dates de première et dernière occurrence, le type (schéma d'entrée ou de sortie), le taux d'erreur et le débit.
- Développer un schéma pour afficher tous ses champs.

[1]: /fr/data_streams/java/
[2]: https://github.com/DataDog/dd-trace-java
[3]: https://app.datadoghq.com/data-streams/schemas
[4]: https://app.datadoghq.com/data-streams/