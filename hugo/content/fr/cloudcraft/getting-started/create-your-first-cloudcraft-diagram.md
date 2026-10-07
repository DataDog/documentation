---
title: Créer votre premier diagramme cloud Live
---

Cloudcraft vous permet d'importer vos environnements cloud AWS et Azure sous forme de *diagrammes Live*. Cloudcraft effectue une rétro-ingénierie de l'architecture de votre compte cloud afin de générer automatiquement de nouveaux diagrammes ou d'améliorer les existants, ce qui vous fait gagner des heures, voire même des jours, de travail.

<div class="alert alert-info">Si vous utilisez la nouvelle expérience Live de Cloudcraft, consultez plutôt la section <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Créer de meilleurs diagrammes : diagrammes Live et filtrage dans Cloudcraft">Créer de meilleurs diagrammes : diagrammes Live et filtrage dans Cloudcraft</a>.</div>

## Prérequis

Avant de commencer, connectez votre compte cloud à Cloudcraft.

- Pour les comptes AWS, consultez la section [Connecter votre compte AWS à Cloudcraft][1].
- Pour les comptes Azure, consultez la section [Connecter votre compte Azure à Cloudcraft][2].

## Votre premier diagramme Live

Pour analyser et visualiser votre architecture cloud, créez un nouveau blueprint. Un blueprint contient votre diagramme, un budget, ainsi que toute la documentation que vous associez aux composants individuels.

1. Dans Cloudcraft, sélectionnez l'onglet **AWS** ou **Azure**, puis l'onglet **Live**. Ce guide se focalise avant tout sur les comptes AWS. Si vous disposez d'un compte Azure, le processus est similaire.

Depuis l'onglet **Live**, vous pouvez sélectionner votre compte, analyser des régions, générer des dispositions et visualiser toutes les ressources de votre compte.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Un diagramme d'infrastructure Live dans Cloudcraft, avec les onglets AWS et Live mis en évidence." responsive="true" style="width:100%;">}}

Si vous n'avez ajouté qu'un seul compte AWS à Cloudcraft, il est automatiquement sélectionné. Sinon, choisissez un compte dans la liste déroulante.

2. Sélectionnez la région dans laquelle vous souhaitez effectuer l'analyse. Bien qu'il soit possible d'analyser et d'intégrer plusieurs régions au sein d'un seul diagramme, il est recommandé de commencer par une seule région.

Sous le bouton **Scan now** se trouve un interrupteur permettant de basculer entre les options **Live** ou **Snapshot**. Cela indique à l'application le type de diagramme que vous souhaitez créer. Si vous sélectionnez **Live**, le diagramme est constamment mis à jour en fonction des informations de votre compte. Si vous sélectionnez **Snapshot**, une image fixe est créée : il n'y a alors pas de mise à jour automatique du diagramme.

Pour cet exemple, vous allez utiliser l'option **Live**. Veillez à ce que l'interrupteur indique **Live**. L'icône en forme d'engrenage située à droite de l'option fournit des paramètres de personnalisation supplémentaires pour la mise à jour de votre diagramme. Pour les besoins de ce guide, il est recommandé de ne pas modifier les paramètres.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Interface Cloudcraft interactive avec l'interrupteur défini sur Live pour la représentation des ressources dans un diagramme Live." responsive="true" style="width:100%;">}}

3. Cliquez sur **Scan now** pour analyser les [composants AWS pris en charge][3] de votre compte. Le message **Scan complete** s'affiche à la fin de l'analyse.

Une fois l'analyse terminée, l'interface affiche le bouton **Auto Layout** ainsi que tous les composants pris en charge de votre compte AWS. Vous pouvez dès à présent commencer à les ajouter manuellement. Toutefois, il est recommandé de laisser l'application gérer automatiquement leur disposition.

Il existe deux façons de gérer automatiquement la disposition :

- Avec la fonctionnalité **Auto Layout**
- Avec la fonctionnalité **Filtered Layout**

La fonctionnalité **Auto Layout** est la plus simple à utiliser, car elle ajoute tous les composants au diagramme et représente leurs connexions et leurs relations. Par exemple, vous pouvez faire en sorte que la fonctionnalité **Auto Layout** affiche uniquement les instances EC2 et exclue tous les autres composants.

Puisque vous utilisez un diagramme de type **Live**, si vous supprimez une instance EC2 de votre compte AWS, le changement est appliqué dans votre diagramme.

La fonctionnalité **Filtered Layout** fournit une solution plus avancée et plus efficace pour schématiser votre architecture cloud, car elle vous permet de créer des diagrammes qui suivent un pattern. Par exemple, si vous avez de nombreuses ressources avec les tags `environment=production` et `environment=staging`, mais que vous souhaitez uniquement ajouter les composants en production au diagramme, vous pouvez appliquer un filtre basé sur `environment=production` afin d'inclure uniquement les composants qui possèdent cette combinaison précise de valeur et de clé.

Si vos ressources ne sont pas taguées par votre fournisseur cloud, vous pouvez tout de même vous servir des filtres. Par exemple, pour créer un diagramme qui représente seulement les instances EC2 qui ne sont pas en cours d'exécution, vous pouvez utiliser le filtre `ec2 !running`.

La vidéo suivante illustre à quel point la fonctionnalité **Filtered Layout** est utile. Notre équipe commerciale tague dans AWS plusieurs ressources liées à une démonstration de Cloudcraft avec la clé `Environment` et la valeur `Demo`. Pour visualiser le contenu de la démonstration ainsi que la relation entre chaque composant, l'équipe peut utiliser le filtre `Environment=demo` dans la barre de recherche juste en dessous de l'onglet **Live**.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example-video.mp4" alt="Une vidéo de 11 secondes montrant un utilisateur créant un diagramme filtré dans Cloudcraft." video="true">}}

Les composants avec `Environment=demo` sont affichés dans leurs VPC, sous-réseaux et groupes de sécurité correspondants, alors même que ces ressources ne possèdent pas de tels tags dans AWS. Bien qu'il possède les mêmes tags, le composant WAF est placé en dehors du VPC, car l'API AWS n'indique aucun lien entre WAF et le reste des composants.

Les interconnexions entre les composants dépendent des services. Cloudcraft utilise toutes les API cloud disponibles pour découvrir les relations dans la mesure du possible.

4. Pour continuer à configurer la fonctionnalité **Auto Layout**, sélectionnez **Auto Layout** sous l'interrupteur **Live/Snapshot**.

Vous pouvez choisir dans la nouvelle boîte de dialogue qui s'affiche les composants AWS à inclure dans votre diagramme. La boîte de dialogue comprend également un menu déroulant **Options** vous permettant de choisir parmi les trois options suivantes :

- Replace existing components
- Include existing components
- Leave existing components

Ces options indiquent à l'application le comportement à adopter lorsque vous utilisez la fonctionnalité **Auto Layout** sur un diagramme comprenant déjà des composants.

- Si vous sélectionnez l'option **Replace existing components**, tout le contenu existant du diagramme est remplacé par les nouveaux composants.
- Si vous sélectionnez l'option **Include existing components**, l'application crée automatiquement une disposition à partir de tous les composants de votre inventaire ainsi que des composants existants du diagramme.
- Si vous sélectionnez l'option **Leave existing components**, les composants du diagramme ne sont pas modifiés, mais l'application crée automatiquement une disposition pour les nouveaux composants.

Puisque vous créez un nouveau diagramme, choisissez l'option **Replace existing components** dans le menu. Sélectionnez **Layout** pour ajouter automatiquement tous les composants de votre inventaire, ainsi que leurs connexions, au diagramme.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Diagramme interactif d'une infrastructure AWS créé avec Cloudcraft, avec une disposition automatique des composants et des connexions visibles sur une grille en arrière-plan." responsive="true" style="width:100%;">}}

Le diagramme est personnalisable. Par exemple, vous pouvez améliorer le rendu en utilisant des éléments de l'onglet **Design**, tout en observant les données en temps réel de chaque composant.

Si vous sélectionnez un composant, la boîte de dialogue **Live feed** apparaît dans le coin inférieur gauche de votre écran. Elle affiche des informations en direct sur le composant que vous avez sélectionné.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="Diagramme interactif d'une infrastructure cloud, avec une boîte de dialogue comprenant des informations sur les instances et le flux en direct. Des statuts et des détails sur les instances sont affichés." responsive="true" style="width:100%;">}}

## Nouvelle expérience Live

La nouvelle expérience Live améliorée qui est proposée par Cloudcraft fait partie d’une démarche continue d’amélioration de l’expérience utilisateur et de rationalisation du processus de schématisation des infrastructures cloud. Tous les utilisateurs peuvent bénéficier de cette fonctionnalité. Elle est proposée par défaut aux nouveaux utilisateurs.

Pour en savoir plus, consultez la section [Créer de meilleurs diagrammes : diagrammes Live et filtrage dans Cloudcraft][4].

[1]: /fr/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /fr/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: /fr/cloudcraft/faq/supported-aws-components/
[4]: /fr/cloudcraft/getting-started/crafting-better-diagrams/