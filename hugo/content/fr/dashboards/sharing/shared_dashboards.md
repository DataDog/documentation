---
aliases:
- /fr/graphing/faq/is-there-a-way-to-share-graphs
- /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /fr/graphing/dashboards/shared_graph/
- /fr/dashboards/sharing/public_dashboards
description: Créez des dashboards publics, sur invitation uniquement ou intégrés pour
  un accès externe avec des périodes et des variables personnalisables.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards en tout sécurité avec des utilisateurs en dehors de
    votre organisation
- link: /dashboards/
  tag: Documentation
  text: Créer des dashboards dans Datadog
- link: /dashboards/template_variables/
  tag: Documentation
  text: Améliorer vos dashboards avec les variables de modèle
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir les widgets disponibles pour votre Dashboard
title: Dashboards partagés
---
## Présentation {#overview}


Les dashboards partagés dans Datadog permettent aux utilisateurs externes ou à ceux qui préfèrent ne pas se connecter de consulter vos dashboards. Vous pouvez créer plusieurs dashboards partagés, chacun avec son propre ensemble d'options de configuration.

Pour partager un dashboard, cliquez sur {{< ui >}}Share{{< /ui >}} puis sur {{< ui >}}Share dashboard{{< /ui >}} en haut à droite de la page du dashboard. Pour afficher ou modifier des dashboards partagés existants, cliquez sur {{< ui >}}Share{{< /ui >}} puis sur {{< ui >}}Manage shared dashboards{{< /ui >}}.

{{< img src="/dashboards/sharing/shared_dashboards/manage_modal.png" alt="Exemple d'une fenêtre modale de gestion des dashboards partagés :" style="width:90%;" >}}

Tous les dashboards partagés de l'organisation et leurs paramètres d'accès public sont répertoriés sur la [page Shared Dashboards][2]. Vous pouvez également ajouter des configurations de sécurité supplémentaires, telles que la désactivation de types de partage spécifiques ou la définition de la Période d'accès maximale pour les invitations sur la [page Paramètres de partage public][3].

**Remarque**: Lorsque la fonctionnalité de dashboards partagés est désactivée, les dashboards ne sont plus accessibles au public. Cependant, leurs configurations restent consultables et modifiables. Cette fonctionnalité fonctionne indépendamment du statut {{< ui >}}Active{{< /ui >}} ou {{< ui >}}Paused{{< /ui >}} des dashboards individuels, même si les dashboards partagés {{< ui >}}Active{{< /ui >}} deviennent inaccessibles au public.

Les dashboards partagés s'actualisent environ toutes les 60 secondes, et ce [taux d'actualisation][1] ne peut pas être personnalisé.

Les spectateurs des dashboards partagés voient toutes les données de télémétrie affichées dans le Dashboard conformément aux [autorisations du créateur][4]. Examinez le contenu de votre dashboard avant de le partager afin de vous assurer qu'aucune donnée sensible ou confidentielle n'est exposée.

## États de partage {#share-states}

Les dashboards partagés peuvent être dans l'un des deux états de partage suivants :

{{< ui >}}Active{{< /ui >}}
: Le dashboard partagé se voit attribuer une URL spécifique et est disponible pour les spectateurs configurés pour accéder au dashboard.

{{< ui >}}Paused{{< /ui >}}
: Les spectateurs ne peuvent pas accéder au dashboard partagé, même s'ils sont invités. Cependant, l'URL du dashboard partagé reste liée au dashboard, et l'accès précédent est rétabli si le dashboard est réinitialisé sur {{< ui >}}Active{{< /ui >}}.

**Annuler le partage** d'un dashboard supprime son URL de partage et efface tous les paramètres de configuration partagés, rendant tous les liens invalides. Lorsque vous partagez à nouveau le dashboard, il ne conserve pas l'URL de partage ou les paramètres précédents.

## Dashboards partagés sur invitation uniquement {#invite-only-shared-dashboards}

Les dashboards sur invitation uniquement vous permettent de partager un dashboard avec des adresses e-mail individuelles ou des domaines e-mail spécifiques.

Pour partager un dashboard avec une ou plusieurs adresses e-mail :

1. Cliquez sur les {{< ui >}}Share{{< /ui >}} options dans le coin supérieur droit du dashboard que vous souhaitez partager.
2. Sélectionnez {{< ui >}}Share Dashboard{{< /ui >}}.
3. Sélectionnez {{< ui >}}Invite only{{< /ui >}}.
4. Configurez les options de temps, de variable et de couleur souhaitées. Pour plus de détails, consultez les [Options de configuration](#configuration-options).
5. Ajoutez les adresses e-mail ou les domaines e-mail auxquels vous souhaitez accorder l'accès, et définissez la date d'expiration pour chaque invitation. Ajoutez un domaine pour empêcher l'accès public et limiter l'accès au dashboard à toute personne possédant cette adresse de domaine.
6. Cliquez sur {{< ui >}}Share Dashboard{{< /ui >}} pour générer une URL de partage et envoyer par e-mail un lien d'accès à des invités spécifiques. Les e-mails ne sont envoyés qu'aux adresses e-mail spécifiques. Pour les domaines e-mail, vous devez distribuer manuellement le lien du dashboard, car aucun e-mail n'est envoyé.

**Remarque** : Les adresses e-mail invitées perdent l'accès à 00h00, heure locale, à la date d'expiration.

Par défaut, les invitations n'expirent pas. Pour exiger que les invitations expirent après une durée spécifique, un administrateur de l'organisation peut activer la Période d'accès maximale dans [Paramètres de l'organisation > Partage public][3]. Lorsque ce paramètre est activé, vous pouvez spécifier le nombre maximal de jours pendant lesquels une invitation reste valide.

Pour autoriser des invitations sans date d'expiration, désactivez la Période d'accès maximale. Si vous configurez ce paramètre via l'API, définissez la valeur sur `null`. Dans l'interface utilisateur, définir la Période d'accès maximale sur `0` désactive le paramètre et définit la valeur sur `null`.

**Remarque** : La Période d'accès maximale est appliquée par horodatage exact. Par exemple, avec une Période d'accès maximale d'un jour, une invitation créée le 1er janvier à 11h00 doit expirer le 2 janvier à 11h00.

### Accéder à un dashboard partagé sur invitation uniquement {#access-an-invite-only-shared-dashboard}

Les personnes invitées à des dashboards partagés reçoivent un e-mail contenant un lien d'accès à durée limitée. Les destinataires de l'e-mail doivent cliquer sur le lien dans un délai d'une heure pour accéder au dashboard partagé.

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Exemple d'une invitation par e-mail avec un lien d'accès à un dashboard privé." style="width:90%;" >}}

Après avoir cliqué sur le lien, les personnes invitées peuvent accéder au dashboard partagé sur le même ordinateur et le même navigateur pendant 30 jours avant de devoir renouveler l'accès. Vous pouvez continuer à renouveler l'accès tant que vous restez un destinataire valide et que le dashboard est dans un état actif.

#### Obtenir un nouveau lien d'accès {#get-a-new-access-link}

Les destinataires valides peuvent demander un nouveau lien d'accès à tout moment sans avoir besoin de l'approbation de la personne qui partage. Si vous visitez le dashboard partagé sans accès actif, vous êtes invité à saisir votre adresse e-mail pour recevoir le nouveau lien d'accès. Seuls les destinataires valides peuvent recevoir cet e-mail.

### Révoquer l'accès à un dashboard partagé sur invitation uniquement {#revoke-access-to-an-invite-only-shared-dashboard}

Pour révoquer l'accès à un dashboard partagé, supprimez les adresses e-mail souhaitées de la liste des destinataires et enregistrez les modifications. Ces destinataires supprimés n'ont plus accès ni la possibilité de demander un nouveau lien d'accès.

**Remarque** : L'utilisateur qui partage un dashboard sur invitation uniquement reste un destinataire valide et ne peut pas être supprimé.

## Dashboards partagés publics {#public-shared-dashboards}

Les dashboards publics permettent aux utilisateurs de rendre un dashboard partagé accessible à toute personne sur Internet disposant du lien.

Pour partager un dashboard public :

1. Cliquez sur les {{< ui >}}Share{{< /ui >}} options dans le coin supérieur droit du dashboard que vous souhaitez partager.
2. Sélectionnez {{< ui >}}Share Dashboard{{< /ui >}}.
3. Sélectionnez l'option {{< ui >}}Public{{< /ui >}} à l'étape {{< ui >}}Select a Share Type{{< /ui >}} et confirmez que vous comprenez que le dashboard sera accessible à toute personne disposant du lien.
4. Configurez les options souhaitées pour le temps, la variable et la couleur à l'étape {{< ui >}}Configure Dashboard{{< /ui >}}.
5. Cliquez sur {{< ui >}}Share Dashboard{{< /ui >}} pour créer l'URL de partage.

Par défaut, les dashboards publics sont accessibles pendant un an avant d'expirer et de passer à un état {{< ui >}}Paused{{< /ui >}}. Vous pouvez désactiver ou ajuster la date d'expiration à l'étape {{< ui >}}Select a Share Type{{< /ui >}}.

## Dashboards partagés intégrés {#embedded-shared-dashboards}

Vous pouvez intégrer des dashboards partagés dans un site web à l'aide d'une iFrame. Il existe deux types de dashboards intégrés : basique et sécurisé.

### Intégration basique {#basic-embed}

Les dashboards intégrés basiques restreignent l'accès en fonction des référents de requête autorisés. Cette fonctionnalité n'est pas prise en charge sur les navigateurs web Safari.

L'en-tête de référent de la requête HTTP est vérifié par rapport aux entrées autorisées pour validation. Dans la plupart des cas, saisir `window.location.origin` dans la console de votre navigateur vous donne le référent attendu. Cependant, si vous effectuez une manipulation spéciale sur les en-têtes du navigateur (par exemple, les paramètres de confidentialité du navigateur), vérifiez la requête réseau réelle.

Pour partager un dashboard intégré basique :

1. Cliquez sur {{< ui >}}Share{{< /ui >}} dans le coin supérieur droit du dashboard.
2. Sélectionnez {{< ui >}}Share Dashboard{{< /ui >}}.
3. Sélectionnez l'option {{< ui >}}Embed{{< /ui >}} à l'étape {{< ui >}}Select a Share Type{{< /ui >}}.
4. Configurez les options de temps, de variable et de couleur souhaitées à l'étape {{< ui >}}Configure Dashboard{{< /ui >}}.
5. Ajoutez les référents que vous souhaitez autoriser.
6. Cliquez sur {{< ui >}}Share Dashboard{{< /ui >}} pour créer l'URL de partage.

### Intégration sécurisée {#secure-embed}

Les dashboards intégrés sécurisés utilisent un jeton généré par le backend pour authentifier chaque chargement de page au lieu de s'appuyer sur des listes d'autorisation de référents. Votre serveur d'application détient les informations d'identification et génère une URL iFrame unique par session, de sorte que les informations d'identification ne sont jamais exposées au navigateur. Les intégrations sécurisées fonctionnent dans les navigateurs qui bloquent les cookies tiers, y compris Safari.

Pour les instructions de configuration, consultez [Dashboards intégrés sécurisés][6].

## Options de configuration {#configuration-options}

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Section de configuration pour partager un dashboard affichant une période par défaut de la dernière heure, permettant aux spectateurs de modifier la période, et un thème clair par défaut" style="width:90%;" >}}

À l'étape {{< ui >}}Configure Dashboard{{< /ui >}}, apportez des modifications au dashboard partagé.

**Remarque**: Les modifications de configuration apportées aux dashboards partagés peuvent prendre jusqu'à 5 minutes pour être propagées à tous les spectateurs. Si les modifications n'apparaissent pas immédiatement, attendez quelques minutes et actualisez le dashboard.

{{< ui >}}Published Name{{< /ui >}}
: Le nom publié remplacera le titre du dashboard sur le dashboard partagé. Ce nom est également celui sous lequel le dashboard partagé est répertorié sur la page de liste Shared Dashboards.

{{< ui >}}Default Timeframe{{< /ui >}}
: Ceci définit la période par défaut pour les spectateurs du dashboard partagé. Si « Autoriser les spectateurs à modifier la période » est désactivé, il s'agit de la seule période disponible. L'activer offre aux spectateurs un ensemble fixe d'options de période parmi lesquelles choisir, bien que les périodes personnalisées et le nettoyage de la période ne soient pas prises en charge.

{{< ui >}}Variables{{< /ui >}}
: Ce paramètre permet aux utilisateurs de spécifier quelles variables de modèle sur le dashboard sont disponibles pour les spectateurs. Définir la même valeur par défaut et la même valeur disponible pour une variable de modèle la rend immuable par les spectateurs. <br>**Remarque** : Ceci s'applique même si les valeurs sont définies sur un caractère générique (*). <br><br>Par défaut, le dashboard partagé hérite des valeurs sélectionnées et disponibles actuellement utilisées par la personne qui partage.

{{< ui >}}Default Theme{{< /ui >}}
: Ce paramètre permet aux utilisateurs de choisir si le dashboard partagé est affiché en mode clair ou sombre par défaut. Les spectateurs peuvent remplacer cette option à tout moment.

## Restrictions sur les dashboards partagés {#restrictions-on-shared-dashboards}

### Les dashboards ne peuvent pas être partagés par des utilisateurs désactivés {#dashboards-cannot-be-shared-by-deactivated-users}

Les dashboards partagés doivent être partagés par un utilisateur actif au sein de votre organisation. Si l'utilisateur qui partage est désactivé, le dashboard partagé **n'affiche plus de données** jusqu'à ce qu'un utilisateur actif en revendique la propriété. L'URL du dashboard partagé et les options de configuration sont conservées pendant cet état.

### Tous les types de widgets ne sont pas disponibles {#not-all-widget-types-are-available}

Les dashboards partagés prennent en charge les types de widgets du tableau suivant. Les widgets de tout autre type n'affichent pas de données lorsque le dashboard est partagé.

| Catégorie | Widgets pris en charge |
| -------- | ----------------- |
| Séries temporelles et distributions | Séries temporelles, graphique à barres, distribution, carte thermique, nuage de points, Sankey |
| Valeurs uniques et résumés | Valeur de requête, changement, top list, valeur d'alerte, graphique d'alerte, résumé du service |
| Tableaux et hiérarchies | Tableau, Treemap, Graphique en secteurs, Entonnoir, Rétention |
| Cartes | Geomap, Hostmap |
| Monitors et SLO | Résumé des monitors, État du check, SLO, Liste des SLO |
| Texte et média | Notes et liens, Texte libre, Image, Iframe |
| Autre | Chronologie des événements, Wildcard |

Le partage d'un dashboard contenant un widget non pris en charge ne produit pas d'erreur, et l'API Dashboards ne rejette pas ces widgets. Le widget apparaît sur le dashboard partagé sans données.

### Options de période limitées {#limited-timeframe-options}

Les dashboards partagés prennent en charge un nombre limité d'options de période et ne permettent pas le nettoyage de la période ni les périodes personnalisées.

### Restrictions d'adresse IP {#ip-address-restrictions}

Vous pouvez restreindre l'accès aux dashboards partagés en fonction de l'adresse IP. Envoyez un e-mail au [support Datadog][5] pour activer la liste d'autorisation d'adresses IP. Une fois activée, les administrateurs peuvent gérer les restrictions IP sur la [page Paramètres de partage public][3].

## Modifier les dashboards partagés {#edit-shared-dashboards}

<div class="alert alert-danger">Toute modification apportée au contenu ou à la mise en page d'un dashboard est instantanément répercutée dans la version partagée. Soyez prudent lors de la modification pour éviter de partager involontairement des données privées.</div>

Pour modifier le type de partage, la configuration ou les destinataires d'un dashboard partagé :

1. Cliquez sur les options {{< ui >}}Share{{< /ui >}} dans le coin supérieur droit du dashboard.
2. Sélectionnez {{< ui >}}Edit shared dashboard{{< /ui >}}.
3. Ajustez les paramètres souhaités.
4. Cliquez sur {{< ui >}}Save{{< /ui >}} pour que les modifications prennent effet.

Vous pouvez suspendre temporairement ou réactiver l'accès à un dashboard partagé depuis ce menu.

## Afficher tous les dashboards partagés {#view-all-shared-dashboards}

Affichez tous les dashboards partagés de votre organisation et vos paramètres sur la page [Shared Dashboards][2]. Depuis cette page, vous pouvez interroger, filtrer et trier les dashboards par type de partage, dernier accès, auteur du partage, et plus encore. Vous pouvez également trouver et réclamer tout dashboard partagé sans propriétaire.

{{< img src="/dashboards/sharing/shared_dashboards/shared_search.png" alt="Exemple de page de liste des dashboards partagés" style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
[3]: https://app.datadoghq.com/organization-settings/public-sharing
[4]: /fr/account_management/rbac/data_access/#dashboards-and-notebooks
[5]: /fr/help/
[6]: /fr/dashboards/sharing/secure_embedded_dashboards/