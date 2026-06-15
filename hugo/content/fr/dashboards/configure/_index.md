---
description: Configurer les détails du dashboard, les template variables, les autorisations
  et les contrôles d'accès pour personnaliser vos dashboards Datadog
disable_toc: false
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Présentation des dashboards
title: Configurer un monitor
---

## Présentation

Les dashboards offrent une visibilité sur vos données à travers les produits Datadog. Ajouter des détails et des configurations pour accélérer le dépannage et se concentrer sur les informations que vous visualisez.

Configurer des dashboards individuels pour :
- [Ajouter des détails et des informations descriptives sur ce que le dashboard visualise](#détails-du-dashboard)
- [Consulter les actions de configuration pour personnaliser l'affichage de votre dashboard et consulter les activités liées au dashboard](#actions-de-configuration)
- [Restreindre l'accès aux dashboards individuels avec les autorisations](#autorisations)
- [Personnaliser les vues avec les template variables](#template-variables)

## Détails des dashboards

Depuis un dashboard individuel, passez la souris sur le titre du dashboard pour consulter et modifier les détails du dashboard. Un panneau s'ouvre qui affiche le titre et le créateur.

{{< img src="dashboards/suggested_dashboards.png" alt="Détails du dashboard mettant en évidence le titre modifiable, les dashboards suggérés et les fonctionnalités Teams" style="width:70%;" >}}

Mettez à jour les descriptions de dashboard prenant en charge Markdown ou associez des [équipes][1] à un dashboard :

1. Passez le curseur sur le titre du dashboard. Un volet contextuel s'ouvre alors.
1. Cliquez sur le titre ou sur la description du dashboard pour modifier ces informations.
1. Cliquez sur le bouton de vérification pour modifier le titre.
1. Sélectionnez jusqu'à cinq équipes à partir du menu déroulant **Teams**.
1. (Facultatif) Ajoutez `[[suggested_dashboards]]` dans la description du dashboard pour obtenir une liste de dashboards suggérés. Ces dashboards sont recommandés en fonction de l'activité des utilisateurs de votre organisation et de la fréquence à laquelle les utilisateurs passent de ce dashboard à d'autres dashboards.

## Template variables

 Les template variables vous permettent de concentrer vos dashboards sur un sous-ensemble particulier d'hosts, de conteneurs ou de services en fonction de tags ou de facettes. Consultez la section [Template variables][2] pour découvrir comment :
 - Ajouter et configurer des template variables de dashboard
 - Appliquer des template variables aux widgets de dashboard
 - Utiliser des template variables pour créer des vues enregistrées

## Actions de configuration

Cliquez sur **Configure** pour ouvrir un menu d'options de configuration disponibles pour votre dashboard, notamment :

| Configuration    | Rôle |
| ----------- | ----------- |
| Clone dashboard | Copiez l'intégralité du dashboard vers un nouveau dashboard. Vous êtes invité à nommer le clone. |
| Display UTC time | Basculez entre l'heure UTC et votre fuseau horaire par défaut. |
| Include Flex Logs | Contrôlez si les widgets recherchent des [Flex Logs][3] ou des logs [Standard Indexed][4]. Basculez entre les données récentes et historiques sans modifier les widgets individuels. Il s'agit d'une préférence au niveau de l'utilisateur qui persiste d'une session à l'autre pour ce dashboard. |
| Increase density | Le mode Densité élevée affiche simultanément plusieurs widgets Groupe au sein d'un dashboard, pour pouvoir comparer facilement les données de plusieurs widgets. Ce mode est activé par défaut sur les écrans de grande taille pour les dashboards utilisant des widgets Groupe. |
| Keyboard&nbsp;shortcuts | Consultez une liste de raccourcis clavier disponibles. |
| Pause Auto-Refresh | Suspendez l'actualisation automatique par défaut pour les dashboards avec des plages temporelles relatives afin d'optimiser l'utilisation du calcul et de réduire l'activité en arrière-plan. Ce paramètre s'applique à tous les utilisateurs qui consultent le dashboard. |
| TV Mode | Basculez pour afficher les métriques clés de performance sur de grands écrans ou des téléviseurs. Pour en savoir plus, consultez la section [Utilisation du mode TV pour les dashboards][5]. |
| Historique des versions | Prévisualisez, restaurez ou clonez l'historique des versions de votre dashboard. Pour en savoir plus, consultez la section [Guide de l'historique des versions][6]. |
| View audit events | Consultez qui utilise ce dashboard au sein de votre organisation. En tant qu'individu, vous pouvez consulter un flux de vos propres actions. Pour en savoir plus, consultez la section [Datadog Audit Trail][7]. |

### Section Notifications

Activez le suivi des notifications pour recevoir des notifications de changement pour un dashboard. Tout utilisateur de l'organisation peut activer cette fonction pour lui-même, quels que soient ses privilèges administratifs.

Lorsque les notifications sont activées pour un dashboard, un événement est créé dans l'[Event Explorer][8]. Cet événement fournit des informations sur les modifications de texte, les modifications de widgets, le clonage de dashboard et la suppression de dashboard, ainsi que le nom de l'utilisateur effectuant l'action. Consultez les événements de changement pour un dashboard spécifique dans l'Event Explorer en recherchant :

```text
tags:(audit AND dash) <DASHBOARD_NAME>
```

### Copy/Import/Export dashboard JSON

Copiez, importez ou exportez le JSON d'un dashboard en utilisant l'icône d'export (en haut à droite) avec les options suivantes :

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copier le JSON du dashboard dans votre presse-papiers.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Coller ou importer votre fichier JSON vers le dashboard. Cette option remplace tout le contenu du dashboard. Si le fichier JSON se trouve déjà dans votre presse-papiers, utilisez `Ctrl + V` (ou `Cmd + V` sur un Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Télécharger un fichier JSON contenant le JSON de votre dashboard.                                                                                                                |

### Delete dashboard

<div class="alert alert-danger">Les dashboards doivent être retirés des favoris avant la suppression.</div>

Utilisez cette option pour supprimer définitivement votre dashboard. Utilisez la liste prédéfinie **Recently Deleted** pour restaurer les dashboards supprimés. Les dashboards dans **Recently Deleted** sont définitivement supprimés après 30 jours. Pour en savoir plus, consultez la section [Liste de dashboards][9].

## Autorisations

<div class="alert alert-info">Les restrictions d'<em>affichage</em> sur les dashboards individuels sont disponibles sur demande pour toute personne disposant d'un forfait payant. Contactez votre équipe de compte ou l'<a href="/help/">assistance Datadog</a> pour activer cette fonctionnalité.</div>

{{< img src="dashboards/access_popup.png" alt="Boîte de dialogue avec un menu déroulant permettant aux utilisateurs de choisir un rôle pour accéder au dashboard" style="width:70%;">}}

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][10] qui peuvent modifier un dashboard particulier :
1. Pendant que vous consultez un dashboard, cliquez sur l'engrenage **Configure** en haut à droite.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes ou utilisateurs autorisés à modifier le dashboard.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.

**Remarque :** pour conserver votre accès en modification au dashboard, le système vous oblige à inclure au moins un rôle dont vous êtes membre avant d'enregistrer. Pour en savoir plus sur les rôles, consultez la section [documentation RBAC][10].

Pour restaurer l'accès général à un dashboard avec accès restreint, suivez les étapes ci-dessous :
1. Pendant que vous consultez un dashboard, cliquez sur l'engrenage **Configure** en haut à droite.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

Si le dashboard a été créé avec le paramètre obsolète « read only », tous les rôles qui disposent de l'autorisation Access Management (`user_access_manage`) sont ajoutés à la liste de contrôle d'accès.

Si vous gérez vos dashboards avec Terraform, vous pouvez utiliser la dernière version du fournisseur Datadog Terraform pour contrôler quels rôles peuvent modifier vos dashboards. Pour en savoir plus, consultez la section [Guide de restriction de rôle de dashboard Terraform][11].

L'indicateur d'accès apparaît en haut à droite de chaque dashboard avec restriction de modification. Selon vos autorisations, il peut indiquer **Gain Edit Access** ou **Request Edit Access**. Cliquez sur l'indicateur d'accès pour comprendre vos autorisations d'accès et les étapes à suivre pour modifier le dashboard.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/teams/
[2]: /fr/dashboards/template_variables/
[3]: /fr/logs/log_configuration/flex_logs/
[4]: /fr/logs/log_configuration/indexes
[5]: /fr/dashboards/guide/tv_mode
[6]: /fr/dashboards/guide/version_history/
[7]: /fr/account_management/audit_trail/
[8]: /fr/events/
[9]: /fr/dashboards/list
[10]: /fr/account_management/rbac/
[11]: /fr/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/