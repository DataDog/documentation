---
title: Utiliser des filtres pour créer de meilleurs diagrammes
---

Le nombre de composants affichés simultanément dans les diagrammes de grands environnements peut entraîner des problèmes de performance et de lisibilité, nuisant à l'expérience utilisateur.

Pour éviter ces problèmes, Cloudcraft recommande d'utiliser la fonctionnalité **Filtered layout** pour appliquer des filtres ou exclure certains services lors de l'ajout de composants en direct.

Créer de plus petits diagrammes facilite grandement leur gestion. Cela permet également aux personnes qui les consultent de mieux contrôler la manière dont elles accèdent aux informations.

<div class='alert alert-info'>Si vous utilisez la fonctionnalité New Live Experience de Cloudcraft, consultez cette documentation : <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Créer de meilleurs diagrammes : diagrammes en direct et filtrage dans Cloudcraft">Créer de meilleurs diagrammes : diagrammes en direct et filtrage dans Cloudcraft</a>.</div>

## Modèles de recherche

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Des modèles de recherche dans Cloudcraft." responsive="true" style="width:100%;">}}

La barre de recherche de l’onglet **Live** vous permet de saisir des modèles qui influencent le résultat de l’analyse.

Les modèles pris en charge par l'application incluent :

- La correspondance avec le nom ou l'identifiant d'un composant. Par exemple : `i-052g93wu49qed3hxw`.
- La correspondance avec le type de composant. Par exemple : `type=ec2`.
- Correspondance avec l'adresse IP d'un composant. Par exemple : `172.31.42.142`.
- La correspondance avec des composants taggés. Par exemple : `environment=prod` ou `environment`.
- La correspondance avec des composants appartenant à un VPC, un groupe de sécurité ou un sous-réseau. Par exemple : `vpc-088c40abeb9ce0c1d`.

Vous pouvez également utiliser des opérateurs :

- AND (`type=ec2 AND env=prod`).
- OR (`type=ec2 OR type=rds`)
- NOT (`NOT platform=linux`)
- (...) (`type=rds AND (env=staging OR env=prod)`).

En combinant ces deux fonctionnalités, vous pouvez créer des filtres puissants permettant de limiter votre diagramme à une ou plusieurs applications.

## Exclure des services

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="Services AWS exclus d'un diagramme Cloudcraft." responsive="true" style="width:100%;">}}

Les modèles de recherche peuvent être excessifs si vous souhaitez simplement exclure quelques services, c’est pourquoi Cloudcraft propose un moyen plus simple d’effectuer cette action.

Après avoir analysé votre compte AWS, cliquez sur **Auto Layout** dans l'onglet **Live** pour afficher une liste à deux colonnes des services présents dans votre environnement AWS.

Vous pouvez déplacer des services de la colonne **Included services** vers la colonne **Excluded services**, ou inversement, en cliquant dessus.

## Utiliser des modèles de recherche et appliquer des filtres

Mettons en pratique certains de ces concepts.

Imaginez que vous créez un diagramme d'architecture mais que vous souhaitez uniquement afficher les instances EC2 et les volumes EBS taggés avec `service=wirecraft`. Vous souhaitez également ignorer les instances EC2 à l'état « Stopped ».

Vous avez déjà analysé votre environnement AWS, et Cloudcraft affiche la liste des composants de votre compte dans votre inventaire. Quelle est la prochaine étape ?

1. Dans l'onglet **Live**, saisissez dans la barre de recherche le modèle correspondant à votre requête. Dans cet exemple, le modèle est `service=wirecraft AND (type=ec2 running OR type=ebs)`. Remarquez que le bouton **Auto Layout** est désormais intitulé **Filtered Layout**.
2.  Cliquez sur **Filtered Layout**.
3. Cliquez sur **Layout**. Les composants affichés dans le diagramme correspondent maintenant au modèle saisi à l'étape 1.

Parmi les autres options possibles :

- Exécuter la même requête sur une autre région AWS. Avant de cliquer sur **Layout**, sélectionnez **Include existing components** dans le menu déroulant **Options**. Cela permet d'appliquer une disposition filtrée à tous les composants de la région secondaire présents dans votre inventaire, ainsi qu'à ceux déjà présents dans le diagramme.
- Combiner **Filtered layout** avec la fonctionnalité **Blueprint link** pour diviser de grands environnements en plusieurs diagrammes reliés entre eux. Vous pouvez également créer un diagramme d'ensemble offrant une vue globale rapide de votre architecture cloud, sans impact sur les performances.

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="Vidéo de 53 secondes montrant un utilisateur Cloudcraft créant un diagramme filtré." video="true">}}

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support