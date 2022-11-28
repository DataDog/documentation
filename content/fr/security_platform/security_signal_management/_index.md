---
kind: documentation
title: Gestion des signaux de sécurité
---
## Présentation

Grâce à Cloud SIEM et à la gestion des signaux de sécurité CWS, les utilisateurs disposant de l'autorisation `Security Signals Write` peuvent prendre des mesures basées sur les signaux de sécurité générés au cours des deux jours précédents, par exemple en modifiant leur statut. Ils ont également la possibilité de consulter l'historique des mesures dans le log d'audit. Le Signals Explorer permet de filtrer les signaux gérés grâce à des facettes dédiées et d'afficher des informations générales sur les mesures d'une ligne. Lorsque des mesures ont été prises pour un signal, il est possible de consulter l'historique de ces mesures dans le log d'audit.

Pour consulter et gérer des signaux de sécurité, accédez à **Security** > **Security Signals**, puis sélectionnez un signal Cloud SIEM ou CWS. Vous pouvez alors utiliser l'en-tête du volet latéral pour prendre des mesures.

## Contrôle d'accès basé sur les rôles pour la gestion des signaux de sécurité

Pour vous familiariser avec les rôles par défaut de Datadog, consultez la [documentation relative au RBAC][1]. Les autorisations RBAC granulaires qui sont proposées pour la plateforme de sécurité cloud sont décrites dans la documentation sur le [RBAC pour la sécurité dans le cloud][2].

Pour modifier le statut d'un signal, activez l'autorisation « Security Signals Write » pour chaque utilisateur.

## Consulter des signaux de sécurité et prendre des mesures

Lorsque Datadog détecte une menace basée sur une règle de sécurité, un signal de sécurité est créé. Affichez, recherchez, filtrez et corrélez les signaux de sécurité dans le Signals Explorer sans avoir à apprendre un langage de requête dédié. Vous pouvez surveiller les signaux à partir de la plateforme de sécurité cloud Datadog ou configurer des [règles de notification][3] de façon à envoyer des signaux à des outils tiers. Les signaux peuvent être attribués à des utilisateurs ou à vous-même dans la plateforme Datadog.

Voici les différents statuts d'un signal :
* **Open** : la plateforme de sécurité cloud Datadog a déclenché une détection basée sur une règle, et le signal associé n'a pas été résolu.
* **Under Review** : lors d'une enquête active, vous pouvez définir un signal sur ce statut. Selon votre avancement, vous pouvez ensuite rétablir le statut Open ou définir le statut Archived.
* **Archived** : lorsque vous résolvez la détection à l'origine du signal, vous pouvez définir un signal sur ce statut. Si un problème archivé se reproduit, ou si une enquête plus poussée s'avère nécessaire, vous pouvez rétablir le statut Open d'un signal dans les deux jours qui suivent sa création.

Lorsque vous prenez des mesures en lien avec un signal, un message de confirmation apparaît, afin de vous laisser la possibilité d'**annuler** l'opération. Il s'affiche dans une bannière au-dessus du volet latéral du signal lorsque vous enregistrez l'opération. Cette bannière récapitule la mesure prise, la personne à son origine et sa date.

## Visualiser les mesures liées à des signaux dans le Security Signals Explorer

Le Security Signals Explorer affiche tous les signaux que votre rôle vous permet de voir. Après avoir sélectionné **Security Signals**, filtrez les signaux comme suit :

* Pour ajouter la colonne **Signal State**, sélectionnez le bouton **Options** en haut à droite du tableau, puis ajoutez la facette `@workflow.triage.state`. Cette opération permet d'afficher le statut du signal et d'effectuer un tri par statut via l'en-tête.
* Pour rechercher des signaux par statut, utilisez la syntaxe de recherche `@workflow.triage.state:` en précisant le statut à filtrer avec la requête.
* Sélectionnez la facette **Signal State** dans le volet des facettes pour filtrer les signaux qui en utilisent.

## Gestion et triage des signaux

Pour modifier le statut des signaux, suivez les instructions ci-dessous :

1. Dans Datadog, sélectionnez Security dans le menu principal de navigation sur la gauche, puis sélectionnez Security Signals.
2. Sélectionnez un signal de type Log Detection ou Workload Security dans le tableau.
3. Pour attribuer un signal à un utilisateur Datadog ou à vous-même, cliquez sur l'icône du profil utilisateur avec le signe Plus en haut à droite du volet latéral du signal.
4. Sélectionnez le statut de votre choix depuis le menu déroulant en haut à droite du volet latéral du signal. Par défaut, le statut est défini sur **Open**.

    - **Open** : la plateforme de sécurité cloud Datadog a déclenché une détection basée sur une règle, et le signal associé n'a pas encore été résolu.
    - **Under Review** : lors d'une enquête active, vous pouvez définir le signal sur ce statut. Vous pouvez ensuite rétablir le statut **Open** ou définir le statut **Archived** selon vos besoins.
    - **Archived** : lorsque la détection à l'origine du signal a été résolue, vous pouvez définir le signal sur ce statut. Si un problème archivé se reproduit, ou si une enquête plus poussée s'avère nécessaire, vous pouvez rétablir le statut Open du signal dans les deux jours qui suivent sa création.

4. Une fois le statut enregistré, un message de confirmation apparaît, afin de vous laisser la possibilité d'annuler l'opération. Il s'affiche dans une bannière au-dessus du volet latéral du signal lorsque vous enregistrez l'opération. Cette bannière récapitule la mesure prise, la personne à son origine et sa date.

Tout avertissement d'un signal de sécurité concernant une possible interruption des services de votre organisation peut être considéré comme un incident. Il est souvent nécessaire d'avoir un système bien défini pour traiter ce genre de menaces. La [gestion des incidents][4] fournit un système qui permet d'identifier et de réduire les incidents de manière efficace.

Déclarez un incident directement à partir d'un signal Cloud SIEM ou Cloud Workload Security en cliquant sur les trois petits points en haut à droite du volet latéral, puis sur **Declare incident**.

Déclarez un incident à partir d'un signal Application Security Monitoring en sélectionnant le bouton d'exportation en haut à droite du volet latéral, puis en cliquant sur **Export to incident**.

{{< img src="monitors/incidents/security-signal-incidents.png" alt="Créer un incident depuis un signal de sécurité" style="width:80%;">}}

## Logs d'audit pour les mesures liées aux signaux de sécurité

En tant qu'administrateur ou membre de l'équipe de sécurité, vous pouvez utiliser les [logs d'audit][5] (bêta publique) pour consulter les mesures prises par votre équipe pour répondre aux signaux de sécurité dans Datadog. En tant qu'utilisateur simple, vous pouvez également consulter le flux de vos propres mesures. La période de rétention de l'historique des mesures liées aux signaux correspond à la [période de rétention][6] du log d'audit défini. Par défaut, elle est définie sur 7 jours. Vous pouvez définir une période de rétention de 3 à 90 jours. L'Audit Log Explorer présente toutes les mesures prises en lien avec des signaux. Pour le consulter, accédez à Organization Settings et sélectionnez Audit Logs Settings sous Security.

Pour afficher exclusivement les logs d'audit générés par les mesures prises dans la plateforme de sécurité cloud, procédez comme suit :
* Utilisez la syntaxe de recherche @evt.name:"Security Monitoring".
* Sélectionnez la facette « Security Monitoring » sous la facette « Event Name ».





[1]: /fr/account_management/rbac/?tab=datadogapplication#pagetitle
[2]: /fr/account_management/rbac/permissions/#cloud-security-platform
[3]: /fr/security_platform/notifications/rules/
[4]: /fr/monitors/incident_management/#pagetitle
[5]: /fr/account_management/audit_trail/#overview
[6]: /fr/account_management/audit_trail/#retention