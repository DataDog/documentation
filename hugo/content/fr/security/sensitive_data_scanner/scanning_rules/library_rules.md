---
aliases:
- /fr/sensitive_data_scanner/library_rules/
- /fr/sensitive_data_scanner/scanning_rules/library_rules
description: Parcourez la bibliothèque de règles prédéfinies du Sensitive Data Scanner
  pour détecter les adresses e-mail, les numéros de carte de crédit, les clés d'API,
  les identifiants, les adresses IP et d'autres modèles sensibles dans les logs, APM,
  RUM et le stockage cloud.
further_reading:
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Configurer Sensitive Data Scanner
title: Règles de la bibliothèque Sensitive Data Scanner
---
## Présentation {#overview}
La bibliothèque de règles d'analyse rassemble des règles prédéfinies permettant de détecter des patterns communs, tels que des adresses e-mail, des numéros de carte bancaire, des clés d'API, des tokens d'autorisation, etc. Les mots-clés recommandés sont utilisés par défaut lors de la création des règles de bibliothèque.

Vous pouvez consulter ces règles dans Datadog :

1. Accédez à [Sensitive Data Scanner][1].
1. Cliquez sur {{< ui >}}Scanning Rules Library{{< /ui >}} en haut à droite de la page.
1. Pour ajouter des règles de la bibliothèque à un groupe d'analyse :<br />
   1. Sélectionnez les règles que vous souhaitez ajouter.<br />
   1. Cliquez sur {{< ui >}}Add Rules to Scanning Group{{< /ui >}}.<br />
   1. Suivez les étapes décrites dans [Configurer Sensitive Data Scanner][2] pour terminer la configuration.

<div class="alert alert-info">La plupart des règles de la bibliothèque sont disponibles pour toutes les sources de données (Logs, APM, RUM, Agent Observability, Observability Pipelines, Secret Scanning et Cloud Storage). Vérifiez la colonne <b>Available For</b> afin de voir quelles sources de données chaque règle prend en charge.</div>

{{< multifilter-search resource="sds_rules" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /fr/security/sensitive_data_scanner/?#add-scanning-rules