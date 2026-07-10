---
description: Surveillez les modifications apportées aux dashboards, prévisualisez
  des versions, restaurez des états précédents et dupliquez des dashboards à l'aide
  de l'historique des versions.
disable_toc: false
further_reading:
- link: /dashboards/
  tag: documentation
  text: Présentation des dashboards
- link: /account_management/audit_trail/
  tag: documentation
  text: Présentation du journal dʼauditaudit
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: blog
  text: Suivre les modifications des dashboards et des notebooks Datadog avec l'historique
    des versions
title: Historique des versions pour les dashboards
---

## Présentation
L'historique des versions suit automatiquement les modifications apportées à vos dashboards et enregistre les versions précédentes afin que vous puissiez voir exactement ce qui a été modifié et par qui. Vous pouvez consulter les versions précédentes, restaurer n'importe quelle version enregistrée de votre dashboard ou dupliquer une version pour créer un dashboard.

## Prérequis
Tous les dashboards conservent par défaut l'historique des versions pendant 30 jours. Pour voir les versions précédentes, une modification doit avoir été effectuée au cours des 30 derniers jours.

Lorsque le [journal dʼaudit][1] est activé, l'historique des versions passe de 30 à 90 jours. Une fois que vous avez activé le journal d'audit, vous pouvez voir toutes les modifications effectuées au cours des 30 à 90 derniers jours sur tous les dashboards existants. 

## Afficher les versions
Dans un dashboard, cliquez sur **Configure** en haut de la page, puis sélectionnez **Version history**. Si aucune modification n'a été apportée pendant la période de rétention, l'option Version history est désactivée.

{{< img src="/dashboards/guide/version_history/configure_actions_version_history.png" alt="L'option Version history désactivée dans le menu Configuration Actions d'un dashboard" style="width:50%;" >}}

Dans le volet latéral de l'historique des versions, vous pouvez voir pour chaque version :
- L'utilisateur de Datadog qui a effectué la modification
- La date et l'heure de la modification
- Un résumé de la modification et une description détaillée de ce qui a été modifié par rapport à la version précédente.

## Prévisualiser une version
Dans le volet latéral de l'historique des versions, cliquez sur une version pour afficher un aperçu de votre dashboard si vous choisissiez de restaurer cette version. Cliquez sur n'importe quelle version pour faire défiler jusqu'à l'emplacement de la modification et mettre en évidence les widgets ou les cellules qui ont été modifiés.

**Remarque** : Le fait de cliquer sur une version pour la prévisualiser n'enregistre aucune modification et n'a aucune incidence sur ce que les autres utilisateurs voient jusqu'à ce que vous choisissiez de restaurer cette version.

## Restaurer une version
Il existe deux manières de restaurer une version antérieure de votre dashboard.

{{< img src="/dashboards/guide/version_history/dashboard_version_history_options.png" alt="Le volet latéral de l'historique des versions, avec des versions précédentes d'un dashboard et différentes options pour les restaurer." style="width:100%;" >}}

- Dans le volet latéral de l'historique des versions, après avoir choisi la version à restaurer, cliquez sur le menu déroulant à droite d'un profil d'utilisateur et sélectionnez **Restore this version**.
- Lorsque le volet latéral de l'historique des versions s'ouvre, un bouton apparaît en haut de la page avec lʼoption **Restore this version**.

La restauration d'une version met à jour le dashboard avec cette version pour tous les utilisateurs, et une nouvelle entrée est ajoutée à l'historique des versions pour indiquer la restauration. Cette opération n'écrase pas l'historique de vos modifications, de sorte que vous pouvez toujours prévisualiser et restaurer n'importe quelle version pendant votre période de rétention.

## Cloner une version
Si vous ne souhaitez pas modifier votre dashboard mais que vous voulez créer une copie d'une version antérieure, vous pouvez créer une copie à partir de n'importe quelle version de l'historique des versions. Dans le volet latéral de l'historique des versions, après avoir choisi la version dont vous voulez faire une copie, cliquez sur le menu représentant trois points verticaux à droite d'un profil d'utilisateur et sélectionnez **Clone**.

## Rétention de l'historique des versions

|                          | Période de rétention    |
| -----------------------  | ------- |
| Journal d'audit **désactivé** | 30 jours |
| Journal d'audit **activé**  | 90 jours |


[1]: /fr/account_management/audit_trail/

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}