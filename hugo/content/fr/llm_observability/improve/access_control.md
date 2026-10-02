---
description: Utilisez Data Access Control pour restreindre un projet Agent Observability,
  ainsi que tout son contenu, à des équipes ou des rôles spécifiques.
further_reading:
- link: /account_management/rbac/data_access/
  tag: Documentation
  text: Data Access Control
- link: /llm_observability/data_governance/
  tag: Documentation
  text: Gouvernance des données
- link: /account_management/rbac/permissions/#access-management
  tag: Documentation
  text: Autorisations de gestion des accès
title: Data Access Control dans Agent Observability
---
## Présentation {#overview}

Les projets Agent Observability peuvent contenir des éléments sensibles, notamment des prompts de jeux de données et les sorties attendues, des traces issues d'exécutions d'expériences, des résultats d'évaluation et des traces en cours d'examen dans les files d'attente d'annotation. [Data Access Control][1] vous permet de restreindre un projet afin que seules les équipes ou les rôles que vous spécifiez puissent le voir.

Lorsqu'un projet est restreint, les utilisateurs en dehors des équipes ou des rôles auxquels vous avez accordé l'accès ne peuvent pas :

- Voir le projet, ou ses expériences, jeux de données et files d'attente d'annotation, dans n'importe quelle vue de liste ou résultat de recherche
- Lire les enregistrements du jeu de données du projet, y compris les entrées et les sorties attendues
- Lire les métriques d'évaluation produites par les exécutions d'expériences du projet
- Lire les spans produits par ces exécutions, à l'exception des expériences exécutées via le SDK (voir [Limitations](#limitations))
- Lire les files d'attente d'annotation du projet, y compris les traces en cours d'examen et les étiquettes qui leur sont appliquées
- Créer, modifier ou supprimer tout élément à l'intérieur du projet, même avec un ID obtenu précédemment

Les utilisateurs en dehors de ces équipes ou rôles reçoivent une réponse *non trouvé* lorsqu'ils ouvrent un lien direct vers le projet ou vers tout élément à l'intérieur de celui-ci.

Les restrictions s'appliquent dans l'interface utilisateur Datadog et dans l'API. Les clés d'application sont soumises aux mêmes restrictions que l'utilisateur qui les possède.

## Prérequis {#prerequisites}

- Data Access Control est configuré pour votre organisation. Voir [Data Access Control][1].
- Vous disposez du rôle Datadog Admin, ou d'un autre rôle comportant l'autorisation [`user_access_manage` permission][2].
- Le projet que vous souhaitez restreindre existe déjà dans Agent Observability.

## Restreindre un projet dans l'interface utilisateur {#restrict-a-project-in-the-ui}

<div class="alert alert-info">Datadog déploie une page de contrôle d'accès repensée. Votre organisation dispose soit de la page <strong>Data Access Controls</strong>, soit de la page <strong>Access Control</strong> repensée. Le lien de l'étape 1 vous dirige vers celle dont vous disposez, et les deux configurent la même restriction.</div>

1. Accédez à [Organization Settings > Data Access Controls][3].
2. Créez une restriction qui couvre un sous-ensemble de données :
   - Sur la page Data Access Controls, cliquez sur **New Restricted Dataset**.
   - Sur la page Access Control, cliquez sur **New Policy > Sensitive Data Partition**.
3. Donnez-lui un nom qui identifie le projet qu'il protège, par exemple `Experiments - Fraud Detection`.
4. Ajoutez un filtre sur le produit **Agent Observability**, puis spécifiez le projet :
   - Sur la page Access Control, sélectionnez le projet dans la liste des valeurs. La liste comporte deux groupes : vos projets et les applications qui envoient des traces à Agent Observability. Sélectionnez dans le groupe des projets.
       
       <div class="alert alert-warning"><ul><li>Saisir le nom du projet, même partiellement ou avec une faute de frappe, ne correspond à aucune donnée Experiments. Le projet reste visible pour tout le monde et la restriction semble fonctionner.</li><li>Les projets déjà couverts par un autre Restricted Dataset n'apparaissent pas dans la liste. Un projet ne peut appartenir qu'à un seul Restricted Dataset à la fois.</li></ul></div>
   
   - Sur la page Data Access Controls, saisissez l'ID du projet comme valeur `ml_app`. Consultez [Trouver l'ID d'un projet](#find-a-projects-id).

5. Accordez l'accès aux équipes ou aux rôles qui doivent conserver l'accès au projet. Un maximum de 50 équipes ou rôles peut être associé à un seul Restricted Dataset.
6. Enregistrez le jeu de données restreint.

**Remarque** : La clé de filtre peut être verrouillée. Agent Observability utilise une clé de tag, `ml_app`, pour les applications et les projets, et Data Access Control autorise une clé de tag par type de télémétrie. Si votre organisation possède déjà un jeu de données restreint pour Agent Observability, les nouveaux jeux de données réutilisent la même clé.

La restriction prend effet dès son enregistrement. Le projet ainsi que ses expériences, jeux de données, enregistrements de jeux de données et files d'attente d'annotation sont immédiatement masqués, quelle que soit leur date de création. Les spans et les métriques d'évaluation sont soumis aux exceptions mentionnées dans [Limitations](#limitations).

## Restreindre un projet via l'API {#restrict-a-project-through-the-api}

Vous pouvez également créer une restriction avec l'[API Datasets][5] de Data Access Control. Le filtre de produit `ml_obs` utilise l'ID de projet comme valeur `ml_app` :

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Experiments - Fraud Detection",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:3547f4ac-3af4-4733-9a70-8fe596e1e76d"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

## Files d'attente d'annotation {#annotation-queues}

Une file d'attente d'annotation appartenant à un projet hérite de la restriction de ce projet. La restriction d'un projet masque ses files d'attente, les traces qu'elles contiennent pour examen, les étiquettes appliquées par les examinateurs et le schéma d'étiquetage de chaque file d'attente. Les utilisateurs extérieurs aux équipes ou aux rôles autorisés ne peuvent pas annoter, modifier ou supprimer une file d'attente, et ne peuvent pas exporter ses interactions annotées vers un jeu de données ou au format CSV.

Les [paramètres d'accès][7] propres à une file d'attente sont distincts : les restrictions sur l'examinateur et le responsable contrôlent qui peut annoter une file d'attente qu'un utilisateur peut déjà voir. Data Access Control détermine qui peut voir la file d'attente.

Chaque file d'attente d'annotation que vous créez doit appartenir à un projet. Les files d'attente créées avant l'entrée en vigueur de cette exigence peuvent ne pas avoir de projet. Voir [Limitations](#limitations).

## Trouver l'ID d'un projet {#find-a-projects-id}

La page Data Access Control et l'API Datasets utilisent un ID de projet comme valeur `ml_app`, et non un nom de projet. Récupérez l'ID de projet depuis l'URL du projet dans Experiments, ou depuis le champ `id` renvoyé par l'[Experiments API][4] lors de la liste des projets.

## Accorder et révoquer l'accès {#grant-and-revoke-access}

Accordez l'accès en modifiant les équipes ou les rôles sur le Restricted Dataset. La suppression d'une équipe ou d'un rôle prend effet immédiatement. La suppression du Restricted Dataset supprime entièrement la restriction, et le projet redevient visible pour tous les membres de l'organisation ayant un accès en lecture à Agent Observability.

Être administrateur ne vous dispense pas d'une restriction. L'autorisation `user_access_manage` vous permet de créer et de modifier des Restricted Datasets, mais l'accès à un projet restreint suit uniquement l'appartenance aux équipes et aux rôles. Un administrateur qui ne fait pas partie d'une équipe ou d'un rôle autorisé voit le projet comme introuvable, exactement comme n'importe quel autre utilisateur.

## Limitations {#limitations}

- **Les spans provenant d'une exécution d'expérience via le SDK ne sont pas restreints par un Restricted Dataset sur le projet.** Ces spans sont attribués à l'application qui a exécuté l'expérience, et non au projet. Un Restricted Dataset sur le projet masque le projet et ses jeux de données, enregistrements de jeux de données et métriques d'évaluation, mais pas les entrées et sorties de ces spans. Pour restreindre également ces spans, ajoutez un second filtre pour la valeur `ml_app` de l'application au même Restricted Dataset.
- **Les spans et les métriques d'évaluation qui n'ont pas été marqués avec le projet lors de l'ingestion ne sont pas restreints.** Le projet est attaché à ces événements en tant que tag au moment de l'ingestion, et les événements passés ne sont pas re-tagués. Les événements qui portent le tag sont masqués dès que la restriction est enregistrée. Les vues de liste, les métadonnées et les enregistrements de jeux de données sont masqués indépendamment de leur date de création.
- **Les prompts gérés ne sont pas pris en charge** par Data Access Control. Consultez [Data Access Control][1] pour obtenir la liste complète de la télémétrie prise en charge.
- **Une file d'attente d'annotation qui n'appartient pas à un projet est visible par tous** ceux ayant un accès en lecture à Agent Observability, et aucun Restricted Dataset ne peut la masquer. Déplacez la file d'attente dans un projet, ou recréez-la dans un projet, pour la soumettre à une restriction.
- **Un projet sans Restricted Dataset est visible par tout le monde** disposant d'un accès en lecture à Agent Observability. Data Access Control est permissif par défaut, sauf si votre organisation a activé le [mode strict][6] pour Agent Observability. Un Restricted Dataset dont la valeur ne correspond à aucun projet ne restreint rien silencieusement. Confirmez chaque nouvelle restriction auprès d'un utilisateur extérieur aux équipes ou aux rôles autorisés.
- **En [mode strict][6], un projet n'est visible que si un jeu de données restreint mentionne son ID de projet.** Une valeur `ml_app` qui est un nom d'application n'accorde rien dans Experiments, de sorte que le projet reste masqué pour tout le monde, y compris pour les équipes et les rôles sur vos autres Restricted Datasets. Consultez [Trouver l'ID d'un projet](#find-a-projects-id).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/data_access/
[2]: /fr/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /fr/llm_observability/improve/experiments/api/
[5]: /fr/api/latest/datasets/
[6]: /fr/account_management/rbac/data_access/#strict-mode
[7]: /fr/llm_observability/investigate/annotation_queues/#managing-queue-access