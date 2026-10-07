---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: Documentation
  text: En savoir plus sur les règles de détection
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
title: Suppressions
---
{{< product-availability >}}

## Présentation {#overview}

Les suppressions sont des conditions spécifiques dans lesquelles un signal ne doit pas être généré, ce qui peut améliorer la précision et la pertinence des signaux générés.

{{< callout btn_hidden="true" header="Évaluation de la suppression" respect-site-support="false" >}}
Il existe deux types de requêtes de suppression : suppression sur les **attributs de signal** et suppression sur les **attributs de log ou d'événement**. Les suppressions basées sur les signaux ne sont évaluées qu'au moment de la création d'un signal. Elles ne sont pas réévaluées lorsqu'un signal est mis à jour. Les suppressions d'attributs de log et d'événement empêchent les événements correspondants provenant de nouveaux signaux et de signaux existants mis à jour. Datadog recommande d'utiliser les suppressions d'attributs de log et d'événement pour exclure de manière fiable une activité spécifique.
{{< /callout >}}

## Routes de suppression {#suppression-routes}

Vous pouvez configurer une requête de suppression au sein d'une [règle de détection](#detection-rules) individuelle, ou définir une [règle de suppression](#suppression-rules) distincte pour supprimer des signaux sur une ou plusieurs règles de détection.

### Règles de détection {#detection-rules}

Lorsque vous [créez][1] ou [modifiez][2] une règle de détection, vous pouvez définir une requête de suppression pour empêcher la génération d'un signal. Par exemple, ajoutez une requête de règle pour déterminer quand une règle de détection déclenche un signal de sécurité. Vous pouvez également personnaliser la requête de suppression pour supprimer les signaux pour une valeur d'attribut spécifique.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="L'éditeur de règles de détection affichant la section d'ajout de requête de suppression" style="width:65%;" >}}

### Règles de suppression {#suppression-rules}

Utilisez des règles de suppression pour définir des conditions de suppression générales sur plusieurs règles de détection au lieu de configurer des conditions de suppression pour chaque règle de détection individuelle. Par exemple, vous pouvez configurer une règle de suppression pour supprimer tout signal contenant une IP spécifique.

## Configuration des suppressions {#suppressions-configuration}

### Liste de suppression {#suppression-list}

La [liste des suppressions][3] permet de gérer les suppressions de façon centralisée et organisée dans plusieurs règles de détection.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="La page des suppressions affichant une liste de règles de suppression" style="width:90%;" >}}

## Créer une règle de suppression {#create-a-suppression-rule}

1. Accédez à la page [Suppressions][3].
1. Cliquez sur {{< ui >}}\+ New Suppression{{< /ui >}}.
1. Saisissez un nom pour la requête de suppression.
1. Ajoutez une description pour expliquer pourquoi cette suppression est appliquée.
1. Optionnellement, ajoutez une date d'expiration à laquelle cette suppression sera désactivée.
1. Sélectionnez les règles de détection auxquelles vous souhaitez appliquer cette suppression. Vous pouvez sélectionner plusieurs règles de détection.
1. Dans la section {{< ui >}}Add Suppression Query{{< /ui >}}, vous avez la possibilité de saisir des requêtes de suppression afin qu'aucun signal ne soit généré lorsque les valeurs sont atteintes. Par exemple, si un utilisateur `john.doe` déclenche un signal, mais que ses actions sont bénignes et que vous ne souhaitez plus que des signaux soient déclenchés par cet utilisateur, saisissez la requête de log : `@user.username:john.doe`.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="La requête d'ajout de suppression associée à la requête @user.username:john.doe" style="width:65%;" >}}
  Les requêtes de règle de suppression sont basées sur des **attributs de signal**.
1. De plus, vous pouvez ajouter une requête d'exclusion de log pour exclure les logs de l'analyse. Ces requêtes sont basées sur des **attributs de log**. **Remarque** : L'ancienne suppression était basée sur des requêtes d'exclusion de log, mais elle est désormais incluse dans l'étape {{< ui >}}Add a suppression query{{< /ui >}} de la règle de suppression.

### Restreindre les autorisations de modification {#restrict-edit-permissions}

{{% security-products/suppressions-granular-access %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /fr/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /fr/logs/explorer/facets/#log-side-panel