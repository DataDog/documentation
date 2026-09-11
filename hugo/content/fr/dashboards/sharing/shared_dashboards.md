---
aliases:
- /fr/graphing/faq/is-there-a-way-to-share-graphs
- /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /fr/graphing/dashboards/shared_graph/
- /fr/dashboards/sharing/public_dashboards
description: Créez des dashboards publics, sur invitation uniquement et intégrés pour
  un accès externe avec des délais et des variables personnalisables.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards en toute sécurité avec des utilisateurs en dehors
    de votre organisation
- link: /dashboards/
  tag: Documentation
  text: Créer des dashboards dans Datadog
- link: /dashboards/template_variables/
  tag: Documentation
  text: Améliorer vos dashboards avec les template variables
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir les widgets disponibles pour votre dashboard
title: Dashboards partagés
---

## Présentation


Les dashboards partagés dans Datadog permettent aux utilisateurs externes ou à ceux qui préfèrent ne pas se connecter de consulter vos dashboards. Vous pouvez créer plusieurs dashboards partagés, chacun disposant de son propre ensemble d'options de configuration.

Pour partager un dashboard, cliquez sur **Share** puis sur **Share dashboard** en haut à droite de la page du dashboard. Pour consulter ou modifier des dashboards partagés existants, cliquez sur **Share** puis sur **Manage shared dashboards**.

{{< img src="/dashboards/sharing/shared_dashboards/manage_modal.png" alt="Exemple de fenêtre de gestion des dashboards partagés" style="width:90%;" >}}

Tous les dashboards partagés de l'organisation et leurs paramètres d'accès public sont répertoriés sur la [page Shared Dashboards][2]. Vous pouvez également ajouter des configurations de sécurité supplémentaires, comme la désactivation de types de partage spécifiques ou la définition de la durée d'accès maximale pour les invitations, sur la [page Public Sharing Settings][3].

**Remarque** : lorsque la fonctionnalité de dashboards partagés est désactivée, les dashboards ne sont plus accessibles publiquement. Leurs configurations restent toutefois consultables et modifiables. Cette fonctionnalité est indépendante du statut `Active` ou `Paused` des dashboards individuels ; même les dashboards partagés `Active` deviennent inaccessibles publiquement.

Les dashboards partagés sont actualisés environ toutes les 60 secondes, et ce [taux de rafraîchissement][1] ne peut pas être personnalisé.

Les visiteurs des dashboards partagés voient toutes les données de télémétrie affichées dans le dashboard conformément aux [autorisations du créateur][4]. Vérifiez le contenu de votre dashboard avant de le partager pour vous assurer qu'aucune donnée sensible ou confidentielle n'est exposée.

## États de partage

Les dashboards partagés peuvent se trouver dans l'un des deux états de partage suivants :

**Active**
: Le dashboard partagé se voit attribuer une URL spécifique et est accessible aux visiteurs configurés pour y accéder.

**Paused**
: Les visiteurs ne peuvent pas accéder au dashboard partagé, même s'ils ont été invités. L'URL du dashboard partagé reste cependant liée au dashboard, et l'accès précédent est rétabli si le dashboard repasse à l'état **Active**.

**Annuler le partage** d'un dashboard supprime son URL de partage et efface tous les paramètres de configuration partagés, rendant tous les liens invalides. Lorsque vous partagez à nouveau le dashboard, il ne conserve pas l'URL ni les paramètres de partage précédents.

## Dashboards partagés sur invitation uniquement

Les dashboards sur invitation uniquement vous permettent de partager un dashboard avec des adresses e-mail individuelles ou des domaines e-mail spécifiques.

Pour partager un dashboard avec une ou plusieurs adresses e-mail :

1. Cliquez sur les options **Share** dans le coin supérieur droit du dashboard que vous souhaitez partager.
2. Sélectionnez **Share Dashboard**.
3. Sélectionnez **Invite only**.
4. Configurez les options de temps, de variables et de couleurs souhaitées. Pour plus de détails, consultez la section [Options de configuration](#configuration-options).
5. Ajoutez les adresses e-mail ou domaines e-mail auxquels vous souhaitez accorder l'accès, et définissez la date d'expiration pour chaque invitation. Ajoutez un domaine pour empêcher l'accès public et limiter l'accès au dashboard à toute personne disposant de cette adresse de domaine.
6. Cliquez sur **Share Dashboard** pour générer une URL de partage et envoyer par e-mail un lien d'accès aux invités spécifiques. Les e-mails sont uniquement envoyés aux adresses e-mail spécifiques. Pour les domaines e-mail, vous devez distribuer manuellement le lien du dashboard, car aucun e-mail n'est envoyé.

**Remarque** : les adresses e-mail invitées perdent leur accès à 00 h 00 (heure locale) à la date d'expiration. 

La durée d'accès maximale d'une invitation peut être configurée par un administrateur d'organisation dans [**Organization Settings > Public Sharing**][3]. Par défaut, elle n'est pas configurée.

**Remarque** : la durée d'accès maximale est appliquée par horodatage exact. Par exemple, avec une durée d'accès maximale d'un jour, une invitation créée le 1er janvier à 11 h 00 doit expirer au plus tard le 2 janvier à 11 h 00. 

### Accéder à un dashboard partagé sur invitation uniquement

Les personnes invitées à des dashboards partagés reçoivent un e-mail contenant un lien d'accès à durée limitée. Les destinataires de l'e-mail doivent cliquer sur le lien dans l'heure suivant sa réception pour accéder au dashboard partagé.

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Exemple d'invitation par e-mail avec un lien d'accès à un dashboard privé" style="width:90%;" >}}

Après avoir cliqué sur le lien, les invités peuvent accéder au dashboard partagé sur le même ordinateur et navigateur pendant 30 jours avant de devoir renouveler leur accès. Vous pouvez continuer à renouveler l'accès tant que vous êtes un destinataire valide et que le dashboard est à l'état actif.

#### Obtenir un nouveau lien d'accès

Les destinataires valides peuvent demander un nouveau lien d'accès à tout moment sans avoir besoin de l'approbation du partageur. Si vous visitez le dashboard partagé sans accès actif, vous êtes invité à saisir votre adresse e-mail pour recevoir le nouveau lien d'accès. Seuls les destinataires valides peuvent recevoir cet e-mail.

### Révoquer l'accès à un dashboard partagé sur invitation uniquement

Pour révoquer l'accès à un dashboard partagé, supprimez les adresses e-mail souhaitées de la liste des destinataires et enregistrez les modifications. Ces destinataires supprimés n'ont plus accès au dashboard ni la possibilité de demander un nouveau lien d'accès.

**Remarque** : l'utilisateur qui partage un dashboard sur invitation uniquement reste un destinataire valide et ne peut pas être supprimé. 

## Dashboards partagés publics

Les dashboards publics permettent aux utilisateurs de rendre un dashboard partagé accessible à toute personne disposant du lien sur Internet.

Pour partager un dashboard public :

1. Cliquez sur les options **Share** dans le coin supérieur droit du dashboard que vous souhaitez partager.
2. Sélectionnez **Share Dashboard**.
3. Sélectionnez l'option **Public** à l'étape **Select a Share Type** et confirmez que vous comprenez que le dashboard sera accessible à toute personne disposant du lien.
4. Configurez les options de temps, de variables et de couleurs souhaitées à l'étape **Configure Dashboard**.
5. Cliquez sur **Share Dashboard** pour créer l'URL de partage.

Par défaut, les dashboards publics sont accessibles pendant un an avant d'expirer et de passer à l'état **Paused**. Vous pouvez désactiver ou ajuster la date d'expiration à l'étape **Select a Share Type**.

## Dashboards partagés intégrés

Vous pouvez intégrer des dashboards partagés dans un site Web à l'aide d'une iframe. L'accès à ces dashboards intégrés est limité aux référents de requêtes figurant sur liste d'autorisation.
Cette fonctionnalité n'est pas prise en charge sur le navigateur Web Safari.

L'en-tête de référent de la requête HTTP est comparé aux entrées de la liste d'autorisation à des fins de validation. Dans la plupart des cas, saisir `window.location.origin` dans la console de votre navigateur devrait vous donner le référent attendu. Cependant, si vous avez des manipulations spéciales sur les en-têtes du navigateur (par exemple, des paramètres de confidentialité du navigateur), vous devez vérifier la requête réseau réelle.

Pour partager un dashboard intégré :

1. Cliquez sur **Share** dans le coin supérieur droit du dashboard.
2. Sélectionnez **Share Dashboard**.
3. Sélectionnez l'option **Embed** à l'étape **Select a Share Type**.
4. Configurez les options de temps, de variables et de couleurs souhaitées à l'étape **Configure Dashboard**.
5. Ajoutez les référents que vous souhaitez ajouter à la liste d'autorisation.
6. Cliquez sur **Share Dashboard** pour créer l'URL de partage.

## Options de configuration

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Section de configuration pour partager un dashboard affichant un intervalle de temps par défaut d'1 heure, permettant aux visiteurs de modifier l'intervalle de temps, et un thème clair par défaut" style="width:90%;" >}}

À l'étape **Configure Dashboard**, apportez des modifications au dashboard partagé.

**Remarque** : les modifications de configuration des dashboards partagés peuvent prendre jusqu'à 5 minutes pour se propager à tous les visiteurs. Si les modifications n'apparaissent pas immédiatement, patientez quelques minutes et rafraîchissez le dashboard.

**Published Name**
: Le nom publié remplacera le titre du dashboard sur le dashboard partagé. Ce nom est également celui sous lequel le dashboard partagé est répertorié sur la page de liste des dashboards partagés.

**Default Timeframe**
: Ce paramètre définit l'intervalle de temps par défaut pour les visiteurs du dashboard partagé. Si l'option "Allow viewers to change the timeframe" est désactivée, il s'agit du seul intervalle de temps disponible. L'activer offre aux visiteurs un ensemble fixe d'options d'intervalles de temps parmi lesquelles choisir, bien que les intervalles de temps personnalisés et le défilement temporel ne soient pas pris en charge.

**Variables**
: Ce paramètre permet aux utilisateurs de spécifier quelles template variables du dashboard sont disponibles pour les visiteurs. Définir la même valeur par défaut et disponible pour une template variable la rend non modifiable par les visiteurs. <br>**Remarque** : Cela s'applique même si les valeurs sont définies sur un caractère générique (\*). <br><br>Par défaut, le dashboard partagé hérite des valeurs sélectionnées et disponibles actuellement utilisées par le partageur.

**Default Theme**
: Ce paramètre permet aux utilisateurs de choisir si le dashboard partagé est affiché en mode clair ou sombre par défaut. Les visiteurs peuvent remplacer cette option à tout moment.

## Restrictions sur les dashboards partagés

### Les dashboards ne peuvent pas être partagés par des utilisateurs désactivés

Les dashboards partagés doivent être partagés par un utilisateur actif au sein de votre organisation. Si le partageur est désactivé, le dashboard partagé **n'affiche plus de données** jusqu'à ce qu'un utilisateur actif en revendique la propriété. L'URL du dashboard partagé et les options de configuration sont préservées pendant cet état.

### Tous les types de widgets ne sont pas disponibles

Les types de widgets suivants ne sont pas pris en charge sur les dashboards partagés. Les widgets de ces types sur les dashboards partagés n'afficheront pas de données.

* Topology Map
* List Widget (toutes les sources de données)
* Widget treemap hérité

### Options d'intervalles de temps limitées

Les dashboards partagés prennent en charge un nombre limité d'options d'intervalles de temps et ne permettent pas le défilement temporel ni les délais personnalisés.

## Modifier les dashboards partagés

<div class="alert alert-danger">Toute modification apportée au contenu ou à la mise en page d'un dashboard est immédiatement répercutée dans la version partagée. Soyez prudent lors des modifications pour éviter de partager involontairement des données privées.</div>

Pour modifier le type de partage, la configuration ou les destinataires d'un dashboard partagé :

1. Cliquez sur les options **Share** dans le coin supérieur droit du dashboard.
2. Sélectionnez **Edit shared dashboard**.
3. Ajustez les paramètres souhaités.
4. Cliquez sur **Save** pour que les modifications prennent effet.

Vous pouvez temporairement suspendre ou réactiver l'accès à un dashboard partagé depuis ce menu.

## Afficher tous les dashboards partagés

Consultez tous les dashboards partagés de votre organisation et vos paramètres sur la page [Shared Dashboards][2]. Depuis cette page, vous pouvez interroger, filtrer et trier les dashboards par type de partage, dernier accès, partageur, et bien plus encore. Vous pouvez également trouver et revendiquer les dashboards partagés sans propriétaire.

{{< img src="/dashboards/sharing/shared_dashboards/shared_search.png" alt="Exemple de page de liste des dashboards partagés" style="width:90%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
[3]: https://app.datadoghq.com/organization-settings/public-sharing
[4]: /fr/account_management/rbac/data_access/#dashboards-and-notebooks