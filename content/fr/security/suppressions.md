---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: Documentation
  text: En savoir plus sur les règles de détection
kind: documentation
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: CSM Threats
  url: /security/threats/
title: Suppressions
---

{{< product-availability >}}

## Présentation

Les suppressions sont des conditions spécifiques dans lesquelles un signal ne doit pas être généré, ce qui peut améliorer la précision et la pertinence des signaux générés.

## Voies de suppression

Vous pouvez définir une requête de suppression dans une [règle de détection] (#regles-de-detection) individuelle ou définir une [règle de suppression] (#regles-de-suppression) distincte pour supprimer des signaux dans une ou plusieurs règles de détection.

### Règles de détection

Lorsque vous [créez][1] ou [modifiez][2] une règle de détection, vous pouvez définir une requête de suppression pour empêcher la génération d'un signal. Par exemple, ajoutez une requête de règle pour déterminer quand une règle de détection doit déclencher un signal de sécurité. Vous pouvez également personnaliser la requête de suppression afin de supprimer les signaux pour une valeur d'attribut spécifique.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="L'éditeur de règles de détection affichant la section de la requête d'ajout de suppression" style="width:65%;" >}}

### Règles de suppression

Les règles de suppression permettent de définir des conditions générales de suppression pour plusieurs règles de détection au lieu de définir des conditions de suppression pour chaque règle de détection. Par exemple, vous pouvez définir une règle de suppression pour supprimer tout signal contenant une adresse IP spécifique.

## Configuration des suppressions

### Liste des suppressions

La [liste des suppressions][3] permet de gérer les suppressions de façon centralisée et organisée dans plusieurs règles de détection.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="La page des suppressions affichant la liste des règles de suppression" style="width:90%;" >}}

## Créer une règle de suppression

1. Accédez à la page [Suppressions][3].
1. Cliquez sur **+ New Suppression**.
1. Saisissez un nom pour la requête de suppression.
1. Ajoutez une description pour expliquer le contexte dans lequel cette suppression est appliquée.
1. Il est possible d'ajouter une date d'expiration à laquelle la suppression sera désactivée.
1. Sélectionnez les règles de détection auxquelles vous souhaitez appliquer cette suppression. Vous pouvez sélectionner plusieurs règles de détection.
1. Dans la section **Add Suppression Query** (Ajouter une requête de suppression), vous avez la possibilité de saisir des requêtes de suppression afin qu'un signal ne soit pas généré en fonction des valeurs. Par exemple, si un utilisateur `john.doe` déclenche un signal, mais que ses actions sont bénignes et que vous ne souhaitez plus que des signaux soient déclenchés par cet utilisateur, saisissez la requête de log : `@user.username:john.doe`.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="La requête d'ajout de suppression avec la requête @user.username:john.doe" style="width:65%;" >}}
  Les requêtes de règles de suppression sont basées sur les **attributs de signal**. 
1. En outre, vous pouvez ajouter une requête d'exclusion de log pour exclure des logs de l'analyse. Ces requêtes sont basées sur les **attributs de logs**. **Remarque** : l'ancienne suppression était basée sur les requêtes d'exclusion de logs, mais elle est maintenant incluse dans l'étape **Ajouter une requête de suppression** de la règle de suppression.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /fr/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/rules
[5]: /fr/logs/explorer/facets/#log-side-panel