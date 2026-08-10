---
title: Historique des versions
---

## Section Overview

L'historique des versions permet aux utilisateurs de suivre les modifications apportées à leurs diagrammes d'architecture au fil du temps, afin de pouvoir passer en revue les changements et restaurer des versions précédentes des diagrammes. L'historique des versions fournit des informations précieuses sur l'évolution de vos diagrammes, que ce soit pour la gestion d'architectures cloud complexes ou la simple collaboration au sein d'une équipe.

Pour accéder à l'historique des versions, cliquez sur le bouton **Version history** dans le coin supérieur droit de l'application Cloudcraft.

{{< img src="cloudcraft/getting-started/version-history/cloudcraft-diagram-aws-infrastructure-version-history.png" alt="Diagramme Cloudcraft représentant une infrastructure AWS, avec une flèche pointant vers le bouton de l'historique des versions." responsive="true" style="width:100%;">}}

## Utiliser les différentes versions

L'historique des versions vous permet non seulement de consulter les changements apportés, mais également de gérer efficacement vos diagrammes actuels et futurs. Depuis l'historique, vous pouvez accomplir plusieurs actions essentielles :

1. **Restauration de versions précédentes** : vous pouvez facilement rétablir une ancienne version de votre diagramme, au besoin. Il vous suffit de cliquer sur le bouton **Restore this version** en haut à droite de l'écran lorsque vous visualisez une version précédente.
2. **Création de nouveaux blueprints** : l'historique des versions vous permet d'enregistrer n'importe quelle version spécifique de votre diagramme en tant que nouveau blueprint. Cette fonction s'avère particulièrement utile pour créer des modèles ou conserver des versions précises de l'architecture afin de pouvoir vous y référer ultérieurement. Pour créer un blueprint à partir d'une version, cliquez sur l'icône des trois points à droite du nom de la version et sélectionnez **Save as a new blueprint**.
3. **Comparaison de versions** : bien qu'il n'existe pas de réelle fonction de comparaison, vous pouvez comparer manuellement plusieurs versions afin de visualiser l'évolution de votre architecture.

**Remarque** : il n'est pas possible de créer manuellement des versions ni d'en supprimer à partir de l'historique.

### Création de versions

Des versions sont automatiquement créées pendant que vous travaillez sur vos diagrammes. Par défaut, chaque version est horodatée et nommée à partir de la date et de l'heure de sa création. Vous pouvez toutefois attribuer des noms personnalisés à des versions spécifiques, par exemple pour des étapes importantes ou des changements majeurs de votre architecture, afin de pouvoir vous y référer plus facilement.

Pour nommer une version, procédez comme suit :

1. Sélectionnez la version à nommer.
2. Cliquez sur l'icône des trois points à droite du nom de la version.
3. Choisissez l'option **Name this version** dans le menu déroulant.

{{< img src="cloudcraft/getting-started/version-history/version-history-interface-cloudcraft.png" alt="L'interface de l'historique des versions, avec des options permettant de nommer ou d'enregistrer des versions dans Cloudcraft." responsive="true" style="width:100%;">}}

Cloudcraft crée de nouvelles versions de manière intelligente, afin de concilier granularité et efficacité. Si la version actuelle date de plus de cinq minutes, toute nouvelle modification déclenche la création d'une nouvelle version. Tou changement apporté moins de cinq minutes après la création de la dernière version est intégré à celle-ci. Grâce à cette approche, l'historique des versions demeure exploitable et n'est pas surchargé de changements mineurs.

Bien que vous ne puissiez pas créer manuellement de version, sachez qu'une nouvelle version est automatiquement générée lorsque vous passez du mode [Snapshot au mode Live][1] dans votre diagramme.

### Métadonnées

Chaque version de l'historique comprend des métadonnées, telles que des noms d'utilisateurs et des horodatages.

Le nom de l'utilisateur qui a créé la version est affiché à droite du nom de la version. Si un autre utilisateur a modifié en dernier la version, son nom est également affiché. Cela permet de conserver une traçabilité précise des modifications.

{{< img src="cloudcraft/getting-started/version-history/cloudcraft-version-history-user-timestamps.png" alt="Interface de l'historique des versions, avec des détails sur des utilisateurs et des horodatages." responsive="true" style="width:100%;">}}

Pour les diagrammes Live, une icône en forme d'éclair vert est indiquée à gauche du nom de la version, afin de distinguer ces versions dynamiques des versions Snapshot.

### Recherche

Pour vous aider à utiliser votre historique des versions, Cloudcraft propose une fonctionnalité de recherche. Vous pouvez rechercher des versions spécifiques par nom ou par date, afin de retrouver plus facilement des états précis de votre diagramme à différents moments.

Pour rechercher une version, saisissez votre requête dans la barre de recherche en haut du volet de l'historique des versions.

Si vous souhaitez afficher uniquement les modifications importantes, il est possible de filtrer l'affichage en cochant la case **Only show named versions** sous la barre de recherche. Cette option masque les versions qui n'ont pas été nommées, de façon à alléger l'historique des versions affiché.

### Rétention

Les versions nommées sont conservées indéfiniment. Vous disposez ainsi d'une copie permanente des changements significatifs de vos diagrammes.

La période de rétention des versions sans nom dépend de votre offre :
- Offres gratuite et Pro : les versions sans nom sont conservées pendant 30 jours.
- Offre Enterprise : les versions sans nom sont conservées pendant 90 jours.

Cette approche à plusieurs niveaux permet aux utilisateurs occasionnels de conserver un historique utile tout en offrant une rétention prolongée aux entreprises avec des besoins plus complexes.

## Meilleures pratiques

Pour tirer le meilleur parti de la fonctionnalité d'historique des versions, plusieurs bonnes pratiques peuvent être adoptées : 

1. **Nommez les versions importantes** : attribuez des noms pertinents aux versions importantes de vos diagrammes. Cette pratique simple à appliquer permet d'identifier et de conserver durablement les étapes clés de l'évolution de votre architecture.
2. **Effectuez des examens réguliers** : consultez fréquemment votre historique des versions afin de suivre l'évolution de votre architecture. Cela vous permet d'obtenir de précieuses informations sur vos décisions de conception et leur évolution.
3. **Tirez profit de la fonctionnalité de recherche** : les recherches, et le filtre **Only show named versions**, vous permettent de parcourir efficacement votre historique des versions, notamment pour les projets comportant de nombreuses itérations.
4. **Tenez compte de la rétention des versions** : si vous bénéficiez d'une offre gratuite ou Pro, n'oubliez pas que les versions sans nom sont conservées pendant 30 jours. Prenez donc soin de nommer les versions que vous souhaitez garder plus longtemps.
5. **Appliquez une documentation collaborative** : lorsque vous travaillez avec des équipes, utilisez la fonctionnalité de nommage des versions pour documenter les personnes à l'origine des changements, ainsi que le motif des modifications. Cela vous permet de communiquer efficacement au sein de votre équipe.
6. **Utilisez des versions pour vos propositions** : avant d'apporter des modifications importantes à votre architecture, créez une version nommée. Cela vous permet de revenir facilement en arrière si les changements proposés ne sont pas approuvés ou appliqués.

[1]: /fr/cloudcraft/getting-started/live-vs-snapshot-diagrams/