---
aliases:
- /fr/graphing/infrastructure/hostmap/
- /fr/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: Graphiques
  text: Consulter en temps réel tous les conteneurs de votre environnement
- link: /infrastructure/process/
  tag: Graphiques
  text: Découvrir ce qui se passe à tous les niveaux de votre système
kind: documentation
title: Hostmap
---

## Présentation

Les hostmaps affichent une vue d'ensemble de plusieurs hosts sur un seul écran, en utilisant des formes et des couleurs pour faciliter la compréhension des métriques.

## Utilisation

### Filter by

La fonction `Filter by` limite la hostmap à un sous-ensemble précis d'une infrastructure. La barre d'entrée de filtres en haut à gauche permet de filtrer la hostmap en saisissant des tags ou encore des attributs fournis par Datadog.

Si la barre d'entrée de filtres est vide, la carte affiche tous les hosts qui transmettent la métrique sélectionnée à Datadog.

Par exemple, si vous ajoutez un tag à vos hosts précisant leur environnement, vous pouvez appliquer le filtre 'production' pour exclure de la carte les hosts de vos environnements staging et autres. Si vous souhaitez retirer tous les rôles de host à l'exception d'un rôle en production, ajoutez ce rôle au filtre. Les filtres sont liés par la logique `AND`.

**Remarque** : les filtres `tag:value` et `"tag:value"` n'ont pas le même effet. Le filtre `tag:value` recherche précisément ce tag, tandis que le filtre `"tag:value"` effectue une recherche à partir de ce texte.

### Group hosts by tags

La fonction `Group hosts by tags` effectue un tri spatial de vos hosts en les rassemblant dans des clusters. Tous les hosts d'un groupe partagent le ou les tags utilisés pour définir le regroupement.

Pour illustrer cela, imaginons que vous regroupez vos hosts en fonction de leur zone de disponibilité d'AWS. Si vous ajoutez un deuxième tag de regroupement, comme un type d'instance, alors les hosts sont à nouveau sous-divisés en groupes, d'abord par zone de disponibilité, puis par type d'instance, comme indiqué ci-dessous.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Groupes d'instances AZ hostmaps Datadog" >}}

### Tags

Des [tags][1] peuvent être appliqués automatiquement par des [intégrations Datadog][2] ou manuellement. Vous pouvez les utiliser pour filtrer vos hosts.

Par exemple, si certains de vos hosts s'exécutent sur AWS, vous pouvez utiliser les tags suivants spécifiques à AWS :

* `availability-zone`
* `region`
* `image`
* `instance-type`
* `security-group`
* n'importe quel tag EC2 pertinent, comme `name`

L'Agent Datadog recueille également des métadonnées sur le host et des informations sur les applications, dont certaines peuvent être utilisées comme filtre ou pour regrouper des termes. Ces champs comprennent :

- `field:metadata_agent_version`
- `field:metadata_platform`
- `field:metadata_processor`
- `field:metadata_machine`
- `field:apps`

### Zoom

Lorsque vous avez identifié un host que vous souhaitez étudier, cliquez dessus pour obtenir des détails. Datadog zoome alors sur celui-ci et affiche jusqu'à six intégrations qui transmettent des métriques de ce host. S'il y a plus de six intégrations, elles figurent toutes sous l'en-tête « Apps » du panneau de détails du host, comme illustré sur la capture d'écran ci-dessous.

Cliquez sur le nom d'une intégration pour afficher un dashboard condensé des métriques de cette intégration. Sur la capture d'écran ci-dessous, nous avons cliqué sur « system » pour obtenir des métriques système, comme l'utilisation du processeur et de la mémoire, la latence du disque, etc.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Agrandissement - hostmaps Datadog" style="width:75%;" >}}

### Formes et couleurs

Par défaut, la couleur de chaque host est définie de façon à représenter le pourcentage d'utilisation du CPU sur ce host. Elle varie du vert (0 % d'utilisation) au orange (100 % d'utilisation). Vous pouvez sélectionner différentes métriques à partir du sélecteur `Fill by`.  

Les hostmaps peuvent également communiquer d'autres métriques facultatives avec la taille de l'hexagone. Pour ce faire, utilisez le sélecteur `Size by`. 

**Remarque** : la métrique « % CPU utilized » utilise la mesure la plus fiable et récente de l'utilisation du processeur, qu'elle soit évaluée par l'Agent Datadog ou directement par AWS ou vSphere.

### Afficher les hosts qui n'ont pas installé d'Agent sur la hostmap

Par défaut, la hostmap ne présente que les hosts qui transmettent la métrique sélectionnée. Ces données peuvent alors être utilisées pour définir une couleur ou une taille pour un seul hexagone de la grille.

### Pertinence et signification des données

Les données de la hostmap sont actualisées toutes les minutes environ, sauf si vous interagissez en continu avec la hostmap. La date de la dernière mise à jour des données figure en bas à droite de l'écran.

## Cas d'utilisation

### Optimisation des ressources

Si vous êtes un utilisateur AWS, vous utilisez sans doute différents types d'instances. Certaines instances sont optimisées pour la mémoire, d'autres pour le calcul ; il y en a des petites et des grandes.  
Si vous souhaitez réduire vos dépenses AWS, vous pouvez commencer par déterminer à quoi servent les instances les plus coûteuses. Commencez par les regrouper par `instance-type`, puis par `role` ou par `name`. Observez les types d'instances coûteuses, comme **c3.8xlarge**. Certains rôles de host affichent-ils une utilisation insuffisante de leur processeur ? Si c'est le cas, zoomez sur les hosts individuels pour voir si toute cette puissance informatique s'est avérée nécessaire au cours des derniers mois, ou si ce groupe de hosts pourrait être migré vers un type d'instance moins onéreux.  

Vous trouverez ci-dessous un sous-ensemble de l'infrastructure de Datadog. Comme vous pouvez le constater, les instances **c3.2xlarge** présentent une charge particulièrement élevée.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="Hostmap partie 1" style="width:80%;">}}

Comme vous pouvez le voir ci-dessous, si vous cliquez sur le groupe c3.2xlarge et que vous créez des sous-groupes par rôle, vous pouvez remarquer que seulement certains rôles sont chargés, tandis que d'autres sont presque inactifs. Si vous rétrogradez ces 7 nœuds verts sur c3.xlarge, vous pouvez économiser quasiment 13 000 $ par an (0,21 $ d'économie par heure et par host x 24 h/jour * 365 jours/an * 7 hosts = 12 877,20 $/an).

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="Groupes rôles/instances - hostmaps Dadadog" style="width:80%;">}}

### Placement des zones de disponibilité

Les hostmaps vous permettent de visualiser les distributions de machines dans chacune de vos zones de disponibilité. Filtrez les hosts pour afficher ceux qui vous intéressent et regroupez-les par zone de disponibilité pour découvrir immédiatement si les ressources doivent être rééquilibrées.

Dans l'exemple ci-dessous, la distribution des hosts est inégale avec `role:daniels` sur l'ensemble des zones de disponibilité (Daniels est le nom d'une application interne).

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="Distribution des zones de disponibilité - hostmaps Datadog" style="width:80%;" >}}

### Résolution de problèmes

Imaginez que vous rencontrez un problème en production. Par exemple, les processeurs de certains de vos hosts sont encombrés, résultat : les temps de réponse sont longs. Les hostmaps peuvent vous aider à visualiser rapidement s'il y a une différence entre les hosts chargés et non chargés. Vous pouvez les regrouper par dimension que vous souhaitez étudier et déterminer visuellement si les serveurs posant problème appartiennent à un certain groupe.  
Ainsi, vous pouvez procéder à un regroupement selon une zone de disponibilité, une région, un type d'instance, une image ou n'importe quel tag utilisé au sein de votre système.

La capture d'écran ci-dessous illustre un problème récent rencontré par Datadog. Certains hosts disposent de beaucoup moins de mémoire utilisable que d'autres, bien qu'ils fassent partie du même cluster. Le regroupement par image de machine nous montre que deux images différentes ont été utilisées, et que l'une d'entre elles est surchargée.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Deux bandes d'utilisation de la mémoire - hostmaps Datadog" style="width:80%;" >}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Deux groupes d'images - hostmaps Datadog" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/
[2]: /fr/integrations/