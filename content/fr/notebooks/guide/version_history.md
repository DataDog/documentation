---
disable_toc: false
further_reading:
- link: /notebooks/
  tag: documentation
  text: Vue d'ensemble des notebooks
- link: /account_management/audit_trail/
  tag: documentation
  text: Présentation du journal dʼaudit
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: blog
  text: Suivre les modifications des dashboards et des notebooks Datadog avec l'historique
    des versions
kind: documentation
title: Historique des versions pour les notebooks
---

## Présentation
L'historique des versions suit automatiquement les modifications apportées à vos notebooks et enregistre les versions précédentes afin que vous puissiez voir exactement ce qui a été modifié et par qui. Vous pouvez consulter les versions précédentes, restaurer n'importe quelle version enregistrée de votre notebook ou cloner une version pour en créer un nouveau.

## Prérequis
Tous les notebooks conservent par défaut l'historique des versions pendant 30 jours. Pour voir les versions précédentes, une modification doit avoir été effectuée au cours des 30 derniers jours. 

Lorsque le [journal dʼaudit][1] est activé, l'historique des versions passe de 30 à 90 jours. Une fois que vous avez activé le journal d'audit, vous pouvez voir toutes les modifications effectuées au cours des 30 à 90 derniers jours sur tous les notebooks existants. 

## Afficher les versions
Dans un notebook, cliquez sur l'icône **Configure** et cliquez sur **Version History** pour ouvrir le volet latéral de lʼhistorique des versions. Si aucune modification n'a été apportée pendant la période de rétention, l'option Version History est désactivée.

{{< img src="/notebooks/guide/version_history/disabled_version_history.png" alt="Option pour lʼhistorique des versions désactivée dans un notebook" style="width:100%;" >}}

Dans le volet latéral de l'historique des versions, vous pouvez voir pour chaque version :
- L'utilisateur de Datadog qui a effectué la modification
- La date et l'heure de la modification
- Un résumé de la modification et une description détaillée de ce qui a été modifié par rapport à la version précédente.

## Prévisualiser une version
Dans le volet latéral de lʼhistorique des versions, cliquez sur une version pour avoir un aperçu de votre notebook si vous choisissiez de restaurer cette version. Cliquez sur n'importe quelle version pour faire défiler jusqu'à lʼemplacement de la modification et mettre en évidence les widgets ou les cellules qui ont été modifiés.

**Remarque** : Le fait de cliquer sur une version pour la prévisualiser n'enregistre aucune modification et n'a aucune incidence sur ce que les autres utilisateurs voient jusqu'à ce que vous choisissiez de restaurer cette version.

## Restaurer une version
Il existe deux manières de restaurer une version antérieure de votre notebook.

{{< img src="/notebooks/guide/version_history/version_history_options.png" alt="Exemple de notebooks affichant des options relatives à lʼhistorique des versions" style="width:100%;" >}}

- Dans le volet latéral de lʼhistorique des versions, après avoir choisi la version à restaurer, cliquez sur le menu déroulant à droite d'un profil d'utilisateur et sélectionnez **Restore this version**.
- Lorsque le volet latéral de l'historique des versions s'ouvre, un bouton apparaît en haut de la page avec lʼoption **Restore this version**.

La restauration d'une version met à jour le notebook avec cette version pour tous les utilisateurs et une nouvelle entrée est ajoutée à l'historique des versions pour indiquer la restauration. Cette opération n'écrase pas l'historique de vos modifications, de sorte que vous pouvez toujours prévisualiser et restaurer n'importe quelle version pendant votre période de rétention. 

## Cloner une version
Si vous ne souhaitez pas modifier votre notebook mais que vous voulez créer une copie d'une version antérieure, vous pouvez créer un clone à partir de n'importe quelle version de l'historique des versions. Dans le volet latéral de l'historique des versions, après avoir choisi la version dont vous voulez faire une copie, cliquez sur le menu déroulant à droite d'un profil d'utilisateur et sélectionnez **Clone**.

## Rétention de l'historique des versions

|                          | Période de rétention    |
| -----------------------  | ------- |
| Journal d'audit **désactivé** | 30 jours |
| Journal d'audit **activé**  | 90 jours |


[1]: /fr/account_management/audit_trail/

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}