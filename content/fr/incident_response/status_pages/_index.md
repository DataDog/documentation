---
aliases:
- /fr/service_management/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Tenez les parties prenantes informées avec les pages de statut Datadog
- link: /incident_response/incident_management/
  tag: Documentation
  text: En savoir plus sur la gestion des incidents
- link: /incident_response/on-call/
  tag: Documentation
  text: En savoir plus sur la planification des astreintes
- link: /incident_response/incident_management/integrations/status_pages
  tag: Documentation
  text: Intégrez les pages de statut Datadog avec la gestion des incidents
title: Pages de statut
---
## Aperçu {#overview}

{{< img src="service_management/status_pages/shopist_status_page3.png" alt="Exemple de page de statut montrant les composants de service avec leur statut actuel et les mises à jour récentes des incidents" style="width:100%;" >}}

Les pages de statut font partie de la suite de réponse aux incidents de Datadog, aux côtés de l'astreinte et de la gestion des incidents. Cela permet à votre équipe de communiquer de manière proactive **la disponibilité des services**, **les incidents** et **la maintenance planifiée** avec les clients ou les parties prenantes internes via une page web partageable.

Utilisez les pages de statut pour :

* Partager la disponibilité des systèmes et des fonctionnalités critiques
* Communiquer clairement les interruptions de service pendant les incidents
* Annoncer la maintenance programmée et les temps d'arrêt prévus à l'avance
* Réduire le volume de support entrant avec des notifications par e-mail proactives

## Configurer les autorisations {#configure-permissions}

Il existe trois autorisations RBAC qui sont pertinentes pour les pages de statut. Les utilisateurs ayant le rôle d'administrateur Datadog disposent de toutes les autorisations nécessaires.

Pour créer, mettre à jour ou publier des pages de statut, vous devez avoir les autorisations RBAC `status_pages_settings_read`, `status_pages_settings_write` et `status_pages_incident_write`. Pour plus d'informations, voir [Contrôle d'accès][1].

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
      <td style="white-space: nowrap;">Paramètres des pages de statut en lecture<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Consultez la liste des pages de statut, les paramètres de chaque page de statut, leurs avis et les pages de statut internes lancées.</td>
      <td>Rôle en lecture seule Datadog</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Paramètres des pages de statut en écriture<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Créez et lancez de nouvelles pages de statut, et configurez les paramètres des pages de statut.</td>
      <td>Rôle administrateur Datadog</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Avis sur les pages de statut en écriture<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publiez et mettez à jour les incidents.</td>
      <td>Rôle administrateur Datadog</td>
    </tr>
  </tbody>
</table>

## Créez une page de statut {#create-a-status-page}

1. Dans Datadog, accédez à [**Status Pages**][2].
1. Cliquez sur **Create Status Page** et suivez le processus d'intégration :

   | Champ             | Description |
   | ----------------- | ----------- |
   | **Type de page de statut**    | Choisissez qui peut accéder à la page : <br>- **Public** - Quiconque ayant le lien peut voir <br>- **Interne** - Seuls les utilisateurs authentifiés au sein de votre organisation Datadog peuvent voir |
   | **Nom de la page**     | Affiché comme l'en-tête de la page (si aucun logo n'est téléchargé). <br>*Exemple : Plateforme Cloud Acme* |
   | **Préfixe de domaine** | Utilisé comme préfixe de sous-domaine de votre page de statut. Pour plus d'informations sur les domaines personnalisés, consultez la section [Définir un domaine personnalisé](#set-a-custom-domain).<br>*Exemple : shopist → shopist.statuspage.datadoghq.com* <br>- Doit être **globalement unique** <br>- En minuscules, alphanumériques et avec des traits d’union <br>- Peut affecter les liens s'il est modifié ultérieurement |
   | **Abonnements** *(facultatif)* | Permettre aux utilisateurs de recevoir des notifications par e-mail concernant les mises à jour de la page de statut. Lorsque les abonnements sont activés, les utilisateurs peuvent s'inscrire pour être informés des nouveaux avis et mises à jour. Vous pouvez activer ou désactiver les abonnements pour chaque page de statut. **Remarque** : [Les abonnements par e-mail](#email-subscriptions) sont à double opt-in, l'e-mail doit être confirmé. |
   | **Logo de l'entreprise, Favicon ou image d'en-tête d'e-mail** *(facultatif)* | Téléchargez un logo, un favicon ou une image pour personnaliser l'apparence de votre page de statut et des notifications par e-mail. |
1. (Facultatif) [Ajoutez des composants](#add-components) pour montrer l'état des services individuels.
1. Cliquez sur **Save Settings**.
   <div class="alert alert-info">Une page de statut <strong>n'est pas Live</strong> après avoir enregistré vos paramètres. Pour rendre la page disponible, <a href="#publish-your-status-page">publish your status page</a>.</div>

## Ajoutez des composants {#add-components}

{{< img src="/service_management/status_pages/status_page_components.png" alt="Configuration des composants de la page de statut avec un panneau d'aperçu en direct" style="width:100%;" >}}

Les composants sont les éléments constitutifs de votre page de statut. Chacun représente un service ou une fonctionnalité qui intéresse vos utilisateurs. Quelques exemples de composants incluent :
- Passerelle API
- Tableau de bord Web
- Cluster de bases de données
- Services de la région des États-Unis

Vous pouvez ajouter des composants à votre page de statut soit lors de la configuration initiale, soit via les paramètres de la page de statut :

1. Depuis votre page de statut, cliquez sur **Settings** et sélectionnez l'onglet **Components**.
1. Créez des composants individuels ou un groupe de composants connexes. Vous pouvez associer [des avis](#add-a-notice) à ces composants pour refléter l'impact sur votre page de statut.
1. Sélectionnez un type de visualisation :
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

### Component hierarchy {#component-hierarchy}

Si plusieurs avis affectent le même composant, l'avis ayant le plus grand impact prévaut :
Major Outage > Partial Outage > Degraded Performance > Maintenance > Operational

## Publish your status page {#publish-your-status-page}

Après avoir enregistré les paramètres de votre page de statut, cliquez sur **Launch Status Page** pour rendre la page disponible à son URL.

Si vous avez sélectionné :
- **Public**, la page est immédiatement accessible à tous les visiteurs.
- **Internal**, l'accès est limité aux utilisateurs Datadog authentifiés de votre organisation.

## Add a notice {#add-a-notice}

Les avis sont des messages publiés sur une page de statut pour communiquer l'état du système. Les pages de statut prennent en charge deux types d'avis : **degradations** pour un impact de service non planifié et **maintenance windows** pour un temps d'arrêt planifié.

{{< img src="service_management/status_pages/select_notice_type_status_page.png" alt="Sélecteur de type d'avis de page de statut avec options « degradations » et « maintenance windows »." style="width:60%;" >}}

### Publish a degradation {#publish-a-degradation}

{{< img src="service_management/status_pages/shopist_status_page_degradations2.png" alt="Exemple de page de statut montrant que les composants de service subissent une dégradation" style="width:100%;" >}}

Les avis de dégradation communiquent **unplanned service impact**, tels que des incidents ou des interruptions de service. Utilisez des avis de dégradation pour tenir les utilisateurs informés pendant qu'un problème est examiné, atténué et résolu.

Depuis une page de statut, cliquez sur **Publish Notice** et sélectionnez **Degradation**, puis fournissez :

| Champ | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the issue <br>*Example: Increased error rates in US region* |
| **Status** | Current state of the issue: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | Additional details for your users <br>*Example: We are aware of the issue and are actively working on a fix.* |
| **Components impacted** | One or more components affected by the degradation |
| **Impact** | Impact level per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | Toggle to send updates to subscribed users |

{{< img src="service_management/status_pages/publish_status_page_degradation_1.png" alt="Exemple de modal de publication d'avis pour les dégradations" style="width:60%;" >}}

Après qu'un avis de dégradation a été examiné et publié, il :
- Appears on the **Status Pages List** under Active Notices.
- Updates the uptime bars for impacted components.
- Is visible in the notice history timeline.

Vous pouvez publier des mises à jour au fil du temps et marquer l'avis comme **Resolved** lorsque le problème est entièrement atténué.

### Backfill a degradation {#backfill-a-degradation}

Les dégradations renseignées rétroactivement permettent de documenter rétroactivement les interruptions de service qui n'ont pas été annoncées auparavant. Chaque mise à jour peut se voir attribuer son horodatage d'origine, de sorte que la chronologie des incidents apparaisse avec précision dans votre historique de disponibilité.

Depuis une page de statut, sélectionnez le menu déroulant à côté de **Publish Notice**, sélectionnez **Publish Backfilled Notice** > **Degradation**, puis fournissez :

| Field| Description|
| ---- | ---- |
| **Notice title** | Short, clear description of the incident <br>*Example: Increased error rates in US region* |
| **Mises à jour** | Exactement deux mises à jour horodatées représentant le début et la fin de la dégradation. Chaque mise à jour nécessite un horodatage de début, un statut (En cours d'investigation ou Résolu), une description et les composants affectés. |

{{< img src="service_management/status_pages/publish_status_page_backfill_degradation.png" alt="Exemple de modal de publication d'avis rétroactif pour les dégradations" style="width:60%;" >}}

### Planifier une fenêtre de maintenance {#schedule-a-maintenance-window}

{{< img src="service_management/status_pages/shopist_maintenance_example.png" alt="Exemple de page d'état montrant les composants de service en cours de maintenance" style="width:100%;" >}}

Les fenêtres de maintenance vous permettent de communiquer de manière proactive sur les temps d'arrêt ou l'impact sur le service prévus avant qu'ils ne se produisent. Contrairement aux dégradations qui sont utilisées pour des incidents imprévus, les fenêtres de maintenance sont planifiées à l'avance pour des mises à niveau d'infrastructure, de la maintenance système, des migrations de bases de données et d'autres travaux prévus. Cela vous permet de tenir les clients informés et de réduire le volume de support.

Depuis la page d'état, cliquez sur **Planifier la maintenance**, ou cliquez sur **Publier un avis** et sélectionnez **Maintenance planifiée**. Ensuite, fournissez les détails suivants :

| Champ | Description |
| ---- | ---- |
| **Titre de l'avis** | Description claire de l'activité de maintenance <br>*Exemple : Mise à niveau de l'infrastructure de la base de données* |
| **Fenêtre de maintenance** | Heure de début et de fin prévue pour la maintenance |
| **Messages** | Messages qui sont publiés automatiquement au fur et à mesure de l'avancement de la maintenance |
| **Composants impactés** | Composants affectés pendant la fenêtre de maintenance |
| **Notifier les abonnés** | Basculer pour envoyer une notification préalable aux abonnés |

{{< img src="service_management/status_pages/publish_status_page_maintenance.png" alt="Exemple de modal de publication d'avis pour les fenêtres de maintenance" style="width:60%;" >}}

Après révision et planification, la fenêtre de maintenance :
- Apparaît sous **Maintenance à venir** sur la page d'état
- Met automatiquement à jour le statut des composants à **Maintenance** lorsque la fenêtre commence
- Renvoie les composants à **Opérationnel** lorsque la fenêtre se termine (sauf si contourné manuellement)

Vous pouvez publier des mises à jour si les plans changent ou reprogrammer la fenêtre de maintenance si nécessaire.

### Remplir une fenêtre de maintenance {#backfill-a-maintenance-window}

Les fenêtres de maintenance rétroactives vous permettent de documenter rétroactivement les temps d'arrêt prévus qui n'avaient pas été annoncés auparavant. Chaque mise à jour peut se voir attribuer son horodatage d'origine, de sorte que la chronologie de maintenance apparaisse avec précision dans votre historique de disponibilité.

Depuis une page d'état, sélectionnez le menu déroulant à côté de **Publier un avis**, sélectionnez **Publier un avis rétroactif** > **Maintenance planifiée**, puis fournissez :

| Champ | Description |
| ---- | ---- |
| **Titre de l'avis** | Description claire de l'activité de maintenance <br>*Exemple : Mise à niveau de l'infrastructure de base de données* |
| **Mises à jour** | Exactement deux mises à jour horodatées représentant le début et la fin de la fenêtre de maintenance. Chaque mise à jour nécessite un horodatage de début, un statut (En cours ou Terminé), une description et les composants affectés. |

{{< img src="service_management/status_pages/publish_status_page_backfill_maintenance.png" alt="Exemple de modal de publication d'avis rétroactif pour les fenêtres de maintenance" style="width:60%;" >}}

## Abonnements par e-mail {#email-subscriptions}

Les abonnements par e-mail sur les pages d'état sont **double opt-in**. Après avoir saisi un e-mail pour s'abonner, les utilisateurs reçoivent un e-mail de confirmation et doivent cliquer sur le lien de confirmation pour activer leur abonnement. Au cours de ce processus, les utilisateurs peuvent choisir de recevoir des notifications pour l'ensemble de la page d'état ou sélectionner des composants spécifiques qu'ils souhaitent surveiller. Un fuseau horaire préféré peut être configuré pour le formatage des horodatages dans les notifications. Les utilisateurs peuvent gérer leurs préférences et mettre à jour leurs abonnements à tout moment via le lien de gestion des abonnements inclus dans les e-mails de notification.

Pour les pages d'état **internes**, le processus d'abonnement est le même, mais les utilisateurs doivent se connecter à la même organisation Datadog pour confirmer leur abonnement et recevoir des notifications.

{{< img src="/service_management/status_pages/status_pages_subscription_1.png" alt="Capture d'écran du modal d'abonnement à la page d'état avec les champs remplis" style="width:70%;" >}}

## Définir un domaine personnalisé {#set-a-custom-domain}

Pour correspondre à votre image de marque, vous avez la possibilité de mapper votre page d'état à un domaine personnalisé comme `status.acme.com`.

1. Depuis votre page de statut, cliquez sur **Paramètres**.
1. Sélectionnez **Domaine personnalisé**.
1. Suivez les instructions pour entrer votre domaine et ajouter des enregistrements DNS.
1. Datadog détecte automatiquement la configuration DNS et provisionne un certificat SSL.

<div class="alert alert-warning">Les domaines personnalisés nécessitent un accès à votre fournisseur DNS pour ajouter un enregistrement CNAME ou A.</div>

**Remarque** :

- La propagation DNS peut prendre plusieurs minutes.
- Vous pouvez revenir au domaine par défaut de Datadog à tout moment.
- Assurez-vous que les modifications DNS sont effectuées par quelqu'un ayant accès à votre registraire de domaine.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages