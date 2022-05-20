---
title: Règles de notification
kind: documentation
description: Créez des règles de notification pour prévenir automatiquement votre équipe et envoyer des messages via des intégrations lorsqu'une règle de détection se déclenche.
aliases:
  - /fr/security_platform/notification_profiles/
further_reading:
  - link: /security_platform/detection_rules/
    tag: Documentation
    text: Explorer les règles de détection
---
## Présentation

Les règles de notification sont un élément clé de la solution Cloud SIEM. Elles permettent de tenir votre équipe informée en cas de problème de sécurité sans que vous ayez besoin de modifier manuellement vos préférences de notification pour chaque règle de détection.

Vous pouvez créer et modifier vos préférences de notification au sein d'une règle de notification pour faire en sorte que ces préférences s'appliquent à plusieurs règles et signaux de sécurité en fonction de divers paramètres, tels que la gravité du problème, le type de règle, les tags de la règle, les attributs du signal et les tags du signal.

Accédez à la page **Notification Rules** pour visualiser toutes les règles de notification créées et rechercher celles qui vous intéressent. Créez, modifiez, clonez, activez, désactivez, supprimez ou consultez les règles de notification créées par les utilisateurs de votre organisation.

{{< img src="security_platform/notification-profiles-overview.png" alt="Règles de notification" style="width:100%;" >}}

## Créer une règle de notification

Pour créer une règle de notification, suivez les instructions ci-dessous.

1. Dans Datadog, accédez à l'[onglet Notification Rules][1] via **Security** > **Setup & Configuration**.
2. Cliquez sur le bouton **+ New Notification Rule** en haut à droite de la page.
3. Saisissez le nom de votre règle de notification dans le champ **Name**.
4. Définissez la logique de déclenchement de cette règle de notification en choisissant les conditions auxquelles doivent répondre les règles de détection et/ou les signaux de sécurité.
    - Les règles de notification liées aux règles de détection peuvent être configurées en fonction des conditions suivantes : gravité, type de règle ou tags de la règle.
    - Les règles de notification liées aux signaux de sécurité peuvent être configurées en fonction de n'importe quel attribut ou tag de signal.

    Par exemple, si vous choisissez `Medium` comme condition de gravité, alors un signal déclenchera une règle de notification s'il répond au moins une fois à la condition définie à l'étape 4.

5. Sélectionnez toutes les parties que vous souhaitez notifier dans le champ **Recipients**. Vous pouvez par exemple notifier des personnes spécifiques, des équipes, des listes ou des handles.
6. Un aperçu des règles répondant aux critères de votre règle de notification s'affiche dans un volet sur la droite, ce qui vous permet de déterminer si la règle est trop spécifique ou trop large.
7. Cliquez sur **Save and Activate** pour enregistrer la règle de notification. La règle est alors automatiquement activée, et vous revenez à la page **Notification Rules** principale.

{{< img src="security_platform/notification-profiles-setup.png" alt="Configuration d'une règle de notification" style="width:100%;" >}}

Si la règle de notification est associée à une règle de détection, vous pouvez consulter les conditions de déclenchement de la règle dans la section « Set severity and notifications » de vos règles.

Si la règle de notification répond aux conditions définies, la notification générée affiche les détails de la règle correspondante en bas.

## Gérer une règle de notification

### Rechercher

La fonction de recherche textuelle permet de filtrer les règles de notification en fonction du texte saisi sur la page **Notification Rule**. Sélectionnez un tag de type de règle, un tag de règle, un attribut de signal ou un tag de signal pour l'ajouter à la recherche et voir uniquement les règles de notification correspondant à cette valeur.

Les résultats se mettent à jour en temps réel à mesure que vous modifiez vos critères de recherche. Il n'y a pas de bouton « Rechercher ».

### Activer ou désactiver

Utilisez le bouton en haut à droite de la carte d'une règle de notification pour activer ou désactiver la règle.

### Modifier

Pour modifier une règle de notification, placez votre curseur sur la carte de la règle et cliquez dessus.

### Cloner

Pour cloner une règle de notification, cliquez sur les trois petits points en haut à droite de la carte d'une règle de notification et sélectionnez l'option **Clone Notification Rule** dans le menu.

### Supprimer

Pour supprimer une règle de notification, cliquez sur les trois petits points en haut à droite de la carte d'une règle de notification et sélectionnez l'option **Delete Notification Rule** dans le menu.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-profiles