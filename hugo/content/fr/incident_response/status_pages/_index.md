---
aliases:
- /fr/service_management/status_pages/
description: Communiquez la disponibilité des services, les incidents et la maintenance
  planifiée aux clients ou aux parties prenantes internes via une page de statut partageable.
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Tenez les parties prenantes informées avec les pages de statut Datadog
- link: /incident_response/incident_management/
  tag: Documentation
  text: En savoir plus Incident Management
- link: /incident_response/on-call/
  tag: Documentation
  text: En savoir plus sur la planification On-Call
- link: /incident_response/incident_management/integrations/status_pages
  tag: Documentation
  text: Intégrez les pages de statut Datadog à Incident Management
title: Pages de statut
---
## Présentation {#overview}

{{< img src="incident_response/status_pages/shopist_status_page3.png" alt="Exemple de page de statut affichant les composants de service avec leur statut actuel et les mises à jour récentes des incidents" style="width:100%;" >}}

Les pages de statut font partie de la suite Incident Response de Datadog, aux côtés d'On-Call et d'Incident Management. Elles permettent à votre équipe de communiquer de manière proactive sur la **disponibilité des services**, les **incidents** et la **maintenance planifiée** auprès des clients ou des parties prenantes internes via une page Web partageable.

Utilisez les pages de statut pour :

* Partagez la disponibilité des systèmes et fonctionnalités critiques
* Communiquez clairement sur les interruptions de service lors des incidents
* Annoncez à l'avance la maintenance programmée et le downtime planifié
* Réduisez le volume des demandes d'assistance grâce à des notifications proactives par e-mail et Slack

## Configurer les autorisations {#configure-permissions}

Pour créer, mettre à jour ou publier des pages de statut, vous devez disposer des autorisations RBAC appropriées. Pour plus d'informations, consultez [Access Control][1].

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Nom</th>
      <th>Description</th>
      <th>Rôle par défaut</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Lecture des paramètres des pages de statut<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Affichez la liste des pages de statut, les paramètres de chaque page de statut, leurs avis et les pages de statut internes lancées.</td>
      <td>Rôle Datadog Read Only</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Écriture des paramètres des pages de statut<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Créez de nouvelles pages de statut et configurez leurs paramètres.</td>
      <td>Rôle Datadog Admin</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Écriture des avis sur les pages de statut<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publiez et mettez à jour des incidents.</td>
      <td>Rôle Datadog Admin</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Publication de page de statut publique<br><code style="white-space: nowrap;">status_pages_public_page_publish</code></td>
      <td>Publiez et dépubliez des pages de statut publiques.</td>
      <td>Aucun</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Publication de page de statut interne<br><code style="white-space: nowrap;">status_pages_internal_page_publish</code></td>
      <td>Publiez et dépubliez des pages de statut internes.</td>
      <td>Aucun</td>
    </tr>
  </tbody>
</table>

## Créez une page de statut {#create-a-status-page}

1. Dans Datadog, accédez à [**Status Pages**][2].
1. Cliquez sur **Create Status Page** et suivez le processus d'intégration :

   | Field             | Description |
   | ----------------- | ----------- |
   | **Status Page Type**    | Choisissez qui peut accéder à la page : <br>- **Public** - Toute personne disposant du lien peut la consulter <br>- **Internal** - Seuls les utilisateurs authentifiés au sein de votre organisation Datadog peuvent la consulter |
   | **Page name**     | Affiché dans l'en-tête de la page (si aucun logo n'est téléchargé). <br>*Exemple : Acme Cloud Platform* |
   | **Domain Prefix** | Utilisé comme préfixe de sous-domaine pour votre page de statut. Pour plus d'informations sur les domaines personnalisés, consultez la section [Définir un domaine personnalisé](#set-a-custom-domain).<br>*Exemple : shopist → shopist.statuspage.datadoghq.com* <br>- Doit être **unique à l'échelle mondiale** <br>- En minuscules, alphanumérique et avec des traits d'union<br>- Peut affecter les liens s'il est modifié ultérieurement|
   | **Abonnements** *(facultatif)* | Permettez aux utilisateurs de recevoir des notifications sur les mises à jour de la page de statut par [e-mail](#email-subscriptions) ou [Slack](#slack-subscriptions). Lorsque les abonnements sont activés, les visiteurs peuvent s'inscrire depuis la page publiée pour être informés des nouveaux avis et mises à jour. Les abonnements par e-mail et Slack peuvent être activés ou désactivés indépendamment pour chaque page de statut. **Remarque** : [Les abonnements par e-mail](#email-subscriptions) fonctionnent selon le principe du double opt-in ; l'adresse e-mail doit être confirmée. |
   | **Logo de l'entreprise, Favicon, image d'en-tête d'e-mail ou icône d'application Slack** *(facultatif)* | Téléchargez des images pour personnaliser votre page de statut et vos notifications. L'icône de l'application Slack apparaît comme l'avatar de l'expéditeur dans les notifications Slack, à côté du nom de votre page. |
1. (Optional) [Add components](#add-components) pour afficher le statut des services individuels.
1. Cliquez sur **Save Settings**.
   <div class="alert alert-info">La page de statut <strong>n'est pas mise en ligne</strong> après l'enregistrement de vos paramètres. Pour rendre la page disponible, <a href="#publish-your-status-page">publiez votre page de statut</a>.</div>

## Ajouter des composants {#add-components}

{{< img src="/incident_response/status_pages/status_page_components.png" alt="Configuration des composants de la page de statut avec panneau de prévisualisation en direct" style="width:100%;" >}}

Les composants sont les éléments constitutifs de votre page de statut. Chacun représente un service ou une fonctionnalité qui intéresse vos utilisateurs. Voici quelques exemples de composants :
- API Gateway
- Web Dashboard
- Database Cluster
- US Region Services

Vous pouvez ajouter des composants à votre page de statut lors de la configuration initiale ou via les paramètres de la page de statut :

1. Depuis votre page de statut, cliquez sur **Settings** et sélectionnez l'onglet **Components**.
1. Créez des composants individuels ou un groupe de composants associés. Vous pouvez associer des [avis](#add-a-notice) à ces composants pour refléter leur impact sur votre page de statut.
1. Sélectionnez un type de visualisation :
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

### Hiérarchie des composants {#component-hierarchy}

Si plusieurs avis affectent le même composant, l'avis ayant le plus grand impact prévaut :
Panne majeure > Panne partielle > Performances dégradées > Maintenance > Opérationnel

### État et temps de disponibilité des composants {#component-status-and-uptime}

Chaque état de composant affecte différemment les barres de disponibilité et le pourcentage de disponibilité :

| Status | Uptime bars | Uptime percentage |
|--------|-------------|-------------------|
| Panne majeure | Affiché | Compte comme downtime |
| Panne partielle | Affiché | Compte comme downtime |
| Performances dégradées | Affiché | Aucun impact |
| Maintenance | Affiché | Aucun impact |
| Opérationnel | Affiché comme sain | Aucun impact |

**Note** : Partial Outage et Major Outage sont pondérés de manière égale. La durée totale à l'un ou l'autre de ces statuts compte comme downtime dans le calcul de l'uptime percentage.

## Publiez votre page de statut {#publish-your-status-page}

Une fois vos paramètres de page de statut enregistrés, cliquez sur **Launch Status Page** pour rendre la page disponible à son URL.

Si vous avez sélectionné :
- **Public**, la page est immédiatement accessible à tous les visiteurs.
- **Internal**, l'accès est limité aux utilisateurs Datadog authentifiés de votre organisation.

## Ajouter un avis {#add-a-notice}

Les avis sont des messages publiés sur une page de statut pour communiquer l'état du système. Les pages de statut prennent en charge deux types d'avis : les **dégradations** pour un impact sur le service imprévu et les **fenêtres de maintenance** pour un downtime planifié.

{{< img src="incident_response/status_pages/select_notice_type_status_page.png" alt="Sélecteur de type d'avis de page de statut avec des options de dégradation et de maintenance planifiée" style="width:60%;" >}}

### Publier une dégradation {#publish-a-degradation}

{{< img src="incident_response/status_pages/shopist_status_page_degradations2.png" alt="Exemple de page de statut montrant des composants de service subissant une dégradation" style="width:100%;" >}}

Les avis de dégradation communiquent les **impacts sur le service imprévus**, tels que des incidents ou des interruptions de service. Utilisez les avis de dégradation pour tenir les utilisateurs informés pendant qu'un problème est étudié, atténué et résolu.

Depuis une page de statut, cliquez sur **Publish Notice** et sélectionnez **Degradation**, puis fournissez :

| Champ | Description |
| ---- | ---- |
| **Notice title** |  Description courte et claire du problème <br>*Exemple : Increased error rates in US region* |
| **Status** |  État actuel du problème : <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | Détails supplémentaires pour vos utilisateurs <br>*Exemple : We are aware of the issue and are actively working on a fix.* |
| **Components impacted** | Un ou plusieurs composants affectés par la dégradation |
| **Impact** | Niveau d'impact par composant : <br>- Opérationnel <br>- Performances dégradées <br>- Panne partielle <br>- Panne majeure |
| **Notifier les abonnés** | Activez pour envoyer des mises à jour aux utilisateurs abonnés |

{{< img src="incident_response/status_pages/publish_status_page_degradation_1.png" alt="Exemple de fenêtre modale de publication d'avis pour les dégradations" style="width:60%;" >}}

Une fois qu'un avis de dégradation est examiné et publié, il :
- Apparaît sur la **Liste des pages de statut** sous Avis actifs.
- Met à jour les barres de disponibilité pour les composants impactés. Les composants définis sur **Panne partielle** ou **Panne majeure** voient également leur pourcentage de disponibilité réduit pour la durée de l'impact.
- Est visible dans la chronologie de l'historique des avis.

Vous pouvez publier des mises à jour au fil du temps et marquer l'avis comme **Résolu** lorsque le problème est entièrement atténué.

**Remarque** : Chaque page de statut prend en charge un maximum de 100 dégradations actives (non résolues) à la fois.

### Enregistrer rétroactivement une dégradation {#backfill-a-degradation}

Les dégradations rétroactives vous permettent de documenter a posteriori des interruptions de service qui n'avaient pas été annoncées précédemment. Chaque mise à jour peut se voir attribuer son horodatage d'origine, afin que la chronologie de l'incident apparaisse avec précision dans votre historique de disponibilité.

Depuis une page de statut, sélectionnez le menu déroulant à côté de **Publier un avis**, sélectionnez **Publier un avis rétroactif** > **Dégradation**, puis fournissez :

| Champ | Description |
| ---- | ---- |
| **Titre de l'avis** | Description courte et claire de l'incident <br>*Exemple : Augmentation des taux d'erreur dans la région US* |
| **Mises à jour** | Exactement deux mises à jour horodatées représentant le début et la fin de la dégradation. Chaque mise à jour nécessite un horodatage de début, un statut (En cours d'investigation ou Résolu), une description et les composants affectés. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_degradation.png" alt="Exemple de fenêtre modale de publication d'avis rétroactif pour les dégradations" style="width:60%;" >}}

### Modifier une mise à jour de dégradation {#edit-a-degradation-update}

Après avoir publié une mise à jour de dégradation, vous pouvez modifier son statut et son message pour corriger des fautes de frappe, rectifier une sélection de statut inexacte ou clarifier la description. Pour modifier une mise à jour, ouvrez l'avis de dégradation sur la page de statut, survolez la mise à jour que vous souhaitez modifier et cliquez sur l'icône d'édition qui apparaît. Effectuez vos modifications dans la fenêtre modale **Modifier la mise à jour**.

{{< img src="incident_response/status_pages/edit_degradation_update.png" alt="Fenêtre modale Modifier la mise à jour affichant les options de Statut de l'avis et un champ Message" style="width:60%;" >}}

Seuls les champs **Statut de l'avis** et **Message** peuvent être modifiés. Pour résoudre l'avis ou mettre à jour les composants concernés, ajoutez plutôt une nouvelle mise à jour. Cliquez sur **Enregistrer les modifications** pour appliquer les modifications.

### Supprimer une mise à jour de dégradation {#delete-a-degradation-update}

Pour supprimer une mise à jour publiée par erreur, ouvrez l'avis de dégradation sur la page de statut, survolez la mise à jour que vous souhaitez supprimer et cliquez sur l'icône de suppression qui apparaît. Confirmez dans la fenêtre modale **Supprimer la mise à jour**.

{{< img src="incident_response/status_pages/delete_degradation_update.png" alt="Fenêtre modale de confirmation de suppression de mise à jour" style="width:60%;" >}}

La suppression d'une mise à jour la remplace sur la chronologie par une note indiquant qu'elle a été supprimée par l'administrateur de la page. Cette action ne peut pas être annulée.

### Planifier une fenêtre de maintenance {#schedule-a-maintenance-window}

{{< img src="incident_response/status_pages/shopist_maintenance_example.png" alt="Exemple de page de statut montrant des composants de service en cours de maintenance" style="width:100%;" >}}

Les fenêtres de maintenance vous permettent de communiquer de manière proactive le downtime planifié ou l'impact sur le service avant qu'ils ne surviennent. Contrairement aux dégradations qui sont utilisées pour les incidents imprévus, les fenêtres de maintenance sont planifiées à l'avance pour les mises à niveau de l'infrastructure, la maintenance du système, les migrations de bases de données et d'autres travaux planifiés. Cela vous permet de tenir les clients informés et de réduire le volume des demandes d'assistance.

Depuis la page de statut, cliquez sur **Planifier une maintenance**, ou cliquez sur **Publier un avis** et sélectionnez **Maintenance planifiée**. Ensuite, fournissez les détails suivants :

| Champ | Description |
| ---- | ---- |
| **Titre de l'avis** | Description claire de l'activité de maintenance <br>*Exemple : Mise à niveau de l'infrastructure de base de données* |
| **Fenêtre de maintenance** | Heure de début et de fin planifiée pour la maintenance |
| **Messages** | Messages qui sont automatiquement publiés au fur et à mesure de la progression de la maintenance |
| **Composants impactés** | Composants affectés pendant la fenêtre de maintenance |
| **Notifier les abonnés** | Activez pour envoyer une notification préalable aux abonnés |

{{< img src="incident_response/status_pages/publish_status_page_maintenance.png" alt="Exemple de fenêtre modale de publication d'avis pour les fenêtres de maintenance" style="width:60%;" >}}

Après examen et planification, la fenêtre de maintenance :
- Apparaît sous **Maintenance à venir** sur la page de statut
- Met automatiquement à jour le statut du composant vers **Maintenance** lorsque la fenêtre commence
- Rétablit les composants vers **Opérationnel** lorsque la fenêtre se termine (sauf intervention manuelle contraire)

Vous pouvez publier des mises à jour si les plans changent ou reprogrammer la fenêtre de maintenance selon vos besoins.

**Remarque** : Chaque page de statut prend en charge un maximum de 100 fenêtres de maintenance planifiées ou en cours à la fois.

### Annuler une fenêtre de maintenance {#cancel-a-maintenance-window}

Pour annuler une fenêtre de maintenance planifiée avant qu'elle ne commence, ouvrez l'avis de maintenance, cliquez sur l'icône à trois points et sélectionnez **Annuler la maintenance**. Confirmez l'annulation dans la boîte de dialogue qui s'affiche.

{{< img src="incident_response/status_pages/cancel-maintenance-window.png" alt="Boîte de dialogue de confirmation d'annulation de maintenance pour une fenêtre de maintenance planifiée" style="width:60%;" >}}

L'annulation d'une fenêtre de maintenance la supprime de **Maintenance à venir** sur la page de statut. Cette action ne peut pas être annulée.

**Remarque** : Une fenêtre de maintenance en cours ne peut pas être annulée.

### Enregistrer rétroactivement une fenêtre de maintenance {#backfill-a-maintenance-window}

Les fenêtres de maintenance rétroactives vous permettent de documenter rétroactivement le downtime planifié qui n'avait pas été annoncé précédemment. Chaque mise à jour peut se voir attribuer son horodatage d'origine, afin que la chronologie de maintenance apparaisse avec précision dans votre historique de disponibilité.

Depuis une page de statut, sélectionnez le menu déroulant à côté de **Publier un avis**, sélectionnez **Publier un avis rétroactif** > **Maintenance planifiée**, puis fournissez :

| Champ | Description |
| ---- | ---- |
| **Titre de l'avis** | Description claire de l'activité de maintenance <br>*Exemple : Mise à niveau de l'infrastructure de base de données* |
| **Mises à jour** | Exactement deux mises à jour horodatées représentant le début et la fin de la fenêtre de maintenance. Chaque mise à jour nécessite un horodatage de début, un statut (En cours ou Terminé), une description et les composants affectés. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_maintenance.png" alt="Exemple de fenêtre modale de publication d'avis rétroactif pour les fenêtres de maintenance" style="width:60%;" >}}

### Modifier une mise à jour de maintenance {#edit-a-maintenance-update}

Après avoir publié une mise à jour de maintenance, vous pouvez modifier son message pour corriger des fautes de frappe ou clarifier la description. Pour modifier une mise à jour passée, ouvrez l'avis de maintenance sur la page de statut, survolez la mise à jour que vous souhaitez modifier dans la chronologie, puis cliquez sur l'icône de modification qui apparaît. Effectuez vos modifications dans la fenêtre modale **Modifier la mise à jour**.

{{< img src="incident_response/status_pages/edit_maintenance_update.png" alt="Fenêtre modale Modifier la mise à jour affichant un champ Message pour une mise à jour de maintenance passée" style="width:60%;" >}}

Seul le champ **Message** peut être modifié. Cliquez sur **Enregistrer les modifications** pour appliquer les modifications.

## Utilisez des modèles d'avis {#use-notice-templates}

Les modèles vous permettent d'enregistrer du texte préconfiguré pour les avis de dégradation et les fenêtres de maintenance que vous publiez de manière répétée, comme une activité de maintenance récurrente ou un type connu d'interruption de service. Lorsque vous publiez un avis, sélectionnez un modèle pour préremplir le titre de l'avis, les messages par statut et les composants affectés au lieu de les saisir à chaque fois.

### Créer un modèle {#create-a-template}

1. Depuis votre page de statut, cliquez sur **Paramètres** et sélectionnez l'onglet **Modèles**.
1. Dans la section **Modèles de dégradation** ou **Modèles de maintenance**, cliquez sur **Ajouter un modèle**.
1. Fournissez les détails suivants :

   | Champ | Description |
   | ---- | ---- |
   | **Nom du modèle** | Nom interne utilisé pour identifier le modèle lors de sa sélection. Non affiché sur la page de statut publiée. |
   | **Titre de l'avis** | Titre par défaut prérempli lorsque le modèle est utilisé. |
   | **Messages** | Un message pour chaque statut d'avis. Les modèles de dégradation prennent en charge **En cours d'investigation**, **Identifié**, **En cours de surveillance** et **Résolu**. Les modèles de maintenance prennent en charge **Planifié**, **En cours** et **Terminé**. |
   | **Composants** | Composants à présélectionner lors de l'utilisation du modèle. Pour les modèles de dégradation, vous pouvez également définir un statut initial pour chaque composant. |

1. Cliquez sur **Enregistrer**.

{{< img src="incident_response/status_pages/create_degradation_template.png" alt="Créez un modèle de dégradation avec un titre, des messages par statut utilisant des variables de modèle et des composants impactés" style="width:100%;" >}}

### Insérer des variables de modèle {#insert-template-variables}

Insérez une variable dans un message de modèle pour que Datadog la résolve lorsque le modèle est appliqué à un avis. Selon la variable, Datadog remplit la valeur automatiquement ou invite l'éditeur à en fournir une. Le panneau **Variables de message** à côté des champs de message répertorie les variables disponibles :

| Variable | Description |
| ---- | ---- |
| `{{date}}` | Prompts the publisher to select a date and time when the template is applied. |
| `{{components_impacted}}` | Remplit automatiquement la liste des composants sélectionnés sur l'avis. |

Pour insérer une variable, tapez `{{` dans un champ de message et sélectionnez une variable dans la liste, ou cliquez sur une variable dans le panneau **Variables de message** pour l'insérer au niveau du curseur.

### Appliquer un modèle à un avis {#apply-a-template-to-a-notice}

Depuis la fenêtre modale **Publier un avis**, sélectionnez un modèle dans le menu déroulant **Modèle** pour préremplir l'avis avec son titre, ses messages et ses composants.

L'application d'un modèle préremplit les champs de l'avis, qui restent modifiables. Pour annuler vos modifications et restaurer le contenu original du modèle, cliquez sur **Réinitialiser les valeurs**. 

{{< img src="incident_response/status_pages/apply_template_to_notice.png" alt="Fenêtre modale Publier un avis avec un modèle appliqué, préremplissant le titre de l'avis, le message et les composants impactés" style="width:60%;" >}}

## Abonnements par e-mail {#email-subscriptions}

Les abonnements par e-mail sur les pages de statut sont en **double opt-in**. Après avoir saisi une adresse e-mail pour s'abonner, les utilisateurs reçoivent un e-mail de confirmation et doivent cliquer sur le lien de confirmation pour activer leur abonnement. Au cours de ce processus, les utilisateurs peuvent choisir de recevoir des notifications pour l'ensemble de la page de statut ou de sélectionner des composants spécifiques qu'ils souhaitent surveiller. Un fuseau horaire préféré peut être configuré pour le formatage de l'horodatage dans les notifications. Les utilisateurs peuvent gérer leurs préférences et mettre à jour leurs abonnements à tout moment via le lien de gestion des abonnements inclus dans les e-mails de notification.

Pour les pages de statut **internes**, le processus d'abonnement est le même, mais les utilisateurs doivent se connecter à la même organisation Datadog pour confirmer leur abonnement et recevoir des notifications.

{{< img src="/incident_response/status_pages/status_pages_subscription_1.png" alt="Capture d'écran de la fenêtre modale d'abonnement à la page de statut avec les champs remplis" style="width:70%;" >}}


## Configurer un domaine d'expéditeur d'e-mails personnalisé {#configure-a-custom-email-sender-domain}

Par défaut, les e-mails d'abonnement à la page de statut sont envoyés depuis une adresse e-mail Datadog. Pour envoyer des notifications depuis votre propre domaine, configurez un serveur SMTP personnalisé dans les paramètres de l'organisation.

<div class="alert alert-danger">La <code>org_management</code> est requise pour ajouter des serveurs SMTP dans les paramètres de l'organisation. Les entrées <code>status_pages_settings_write</code> est requise pour sélectionner le domaine de l'expéditeur d'e-mails sur une page de statut.</div>

1. Sur votre page de statut, accédez à **Paramètres** > **Abonnements**.
2. Sous **Domaine de l'expéditeur d'e-mails**, cliquez sur **Paramètres de l'organisation**.
3. Dans les paramètres de l'organisation, [ajoutez et validez un serveur SMTP][3].
4. Revenez à **Paramètres** > **Abonnements** et sélectionnez votre serveur SMTP comme domaine de l'expéditeur d'e-mails.

## Abonnements Slack {#slack-subscriptions}

Les visiteurs peuvent s'abonner aux mises à jour de la page de statut dans Slack via l'application Slack **Datadog Status Pages**. Lorsqu'un avis ou une maintenance planifiée est publié avec l'option **Notifier les abonnés** activée, l'application publie des mises à jour sur chaque canal abonné pour les composants qu'il suit, en utilisant le nom de votre page et l'icône de l'application Slack comme expéditeur. Les abonnements Slack sont configurés indépendamment des [abonnements par e-mail](#email-subscriptions).

### Activer les abonnements Slack {#enable-slack-subscriptions}

1. Depuis votre page de statut, cliquez sur **Paramètres**.
2. Activer **les abonnements Slack**.
3. (Facultatif) Sous **Icône de l'application Slack**, téléchargez une image à utiliser comme avatar de l'expéditeur pour les notifications Slack.

{{< img src="incident_response/status_pages/status_pages_enable_slack.png" alt="Paramètres de la page de statut affichant le bouton d'activation des abonnements Slack et le téléchargement de l'icône de l'application Slack" style="width:80%;" >}}

Cliquez sur **S'abonner** sur la page publiée pour ouvrir une fenêtre modale avec un onglet pour chaque type d'abonnement activé.

### S'abonner dans Slack {#subscribe-in-slack}

Depuis une page publiée avec les abonnements Slack activés :

1. Cliquez sur **S'abonner** et ouvrez l'onglet **Slack**.
1. (Facultatif) Sélectionnez **S'abonner à des services spécifiques** pour choisir des composants individuels, ou laissez cette option décochée pour suivre la page entière.
1. Cliquez sur **S'abonner via Slack**.
   {{< img src="incident_response/status_pages/status_pages_slack_subscription_modal.png" alt="Fenêtre modale S'abonner aux mises à jour avec l'onglet Slack sélectionné et un bouton S'abonner via Slack" style="width:70%;" >}}
1. Autorisez l'application **Datadog Status Pages** pour votre espace de travail et sélectionnez le canal pour recevoir les mises à jour.
   {{< img src="incident_response/status_pages/status_pages_slack_oauth.png" alt="Écran d'autorisation Slack accordant à l'application Datadog Status Pages l'accès à un espace de travail et à un canal" style="width:70%;" >}}

Après l'abonnement, le canal sélectionné reçoit un message de bienvenue confirmant l'abonnement.

**Canaux privés** : Après l'abonnement, l'utilisateur reçoit un message dans l'onglet **Messages** de l'application Slack lui demandant d'inviter le bot **Datadog Status Pages** dans le canal. Le bot doit être invité avant de pouvoir publier des mises à jour. Les canaux de messagerie directe (DM) ne sont pas pris en charge. Sur les pages de statut **internes**, les utilisateurs doivent être connectés à la même organisation Datadog pour s'abonner.

### Gérer les abonnements {#manage-subscriptions}

Les abonnés peuvent modifier les composants qu'ils suivent ou se désabonner à tout moment via le lien **Gérer les préférences** présent dans toute notification Slack.

Les propriétaires de la page de statut peuvent consulter les abonnés dans les paramètres de la page de statut, qui répertorie les espaces de travail et les canaux Slack abonnés. La suppression d'un espace de travail désabonne tous ses canaux de la page.

<div class="alert alert-info">
Si le serveur SMTP sélectionné échoue, les notifications sont envoyées aux abonnés via <strong>Datadog Default</strong> (<code>no-reply@dtdg.co</code>).
</div>

## Définir un domaine personnalisé {#set-a-custom-domain}

Pour correspondre à votre image de marque, vous avez la possibilité d'associer l'URL de votre page de statut à un domaine personnalisé comme `status.acme.com`. Ceci est distinct de la [configuration d'un domaine d'expéditeur d'e-mail personnalisé](#configure-a-custom-email-sender-domain), qui contrôle l'adresse d'expéditeur sur les e-mails d'abonnement.

1. Depuis votre page de statut, cliquez sur **Paramètres**.
1. Sélectionnez **Domaine personnalisé**.
1. Suivez les instructions pour saisir votre domaine et ajouter des enregistrements DNS.
1. Datadog détecte automatiquement la configuration DNS et provisionne un certificat SSL.

<div class="alert alert-warning">Les domaines personnalisés nécessitent un accès à votre fournisseur DNS pour ajouter un enregistrement CNAME ou A.</div>

**Note** :

- La propagation DNS peut prendre plusieurs minutes.
- Vous pouvez revenir au domaine Datadog par défaut à tout moment.
- Les modifications DNS doivent être effectuées par une personne ayant accès à votre registraire de domaine.

## Gérer les pages de statut avec Terraform {#manage-status-pages-with-terraform}
Vous pouvez utiliser Terraform pour créer ou gérer vos pages de statut. Pour plus de détails sur les ressources disponibles, consultez le [registre Terraform][4] de Datadog.  


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
[3]: /fr/account_management/org_settings/smtp_configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/status_page