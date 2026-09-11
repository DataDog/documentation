---
aliases:
- /fr/logs/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Conformité PCI DSS
title: Sécurité des données de Log Management
---

<div class="alert alert-info">Cette page est consacrée à la sécurité des données transmises à Datadog. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

La solution Log Management prend en charge de nombreux [environnements et formats][1]. Vous êtes ainsi libres d'envoyer à Datadog la grande majorité de vos données, selon vos besoins. Cet article décrit les principales garanties de sécurité et les commandes de filtrage dont vous disposez lors de l'envoi de logs à Datadog.

**Remarques** :
- Les logs peuvent être consultés dans divers produits Datadog. Tous les logs consultés dans l'interface Datadog, y compris les logs consultés dans les pages de traces APM, font partie du produit Log Management.
- Les outils et politiques de Datadog sont conformes à PCI v4.0. Pour en savoir plus, consultez la section [Conformité PCI DSS][10].

## Sécurité des données

Datadog utilise un chiffrement symétrique au repos (AES-256) pour les logs indexés. Ces derniers sont supprimés de la plateforme Datadog lorsque leur période de rétention que vous avez définie expire.

## Filtrage des logs

Depuis la version 6, vous pouvez configurer l'Agent afin de filtrer les logs qu'il envoie à l'application Datadog. Pour empêcher l'envoi de logs spécifiques, utilisez le [paramètre][3] `log_processing_rules` avec le `type` **exclude_at_match** ou **include_at_match**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent de filtrer les logs en fonction des règles d'inclusion ou d'exclusion fournies.

## Obfuscation des logs

Depuis la version 6, vous pouvez configurer l'Agent afin d'obfusquer des patterns spécifiques au sein des logs envoyés par l'Agent à l'application Datadog. Pour masquer des séquences sensibles au sein de vos logs, utilisez le [paramètre][4] `log_processing_rules` avec le `type` **mask_sequences**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent de censurer les informations sensibles au sein de vos logs.

Vous pouvez également utiliser [Sensitive Data Scanner][7] dans le cloud ou avec l'Agent pour identifier, étiqueter et masquer les données sensibles. Dans Sensitive Data Scanner, configurez un groupe d'analyse pour définir les données à analyser, puis configurez des règles d'analyse pour déterminer les informations sensibles à rechercher dans les données. Vous pouvez choisir de masquer les données en cas de correspondance. Datadog fournit une bibliothèque de règles prédéfinies pour détecter les informations sensibles telles que les numéros de carte de crédit, les adresses e-mail, les adresses IP, les clés d'API, et plus encore. Vous pouvez également définir vos propres règles d'analyse basées sur des expressions régulières pour identifier les informations sensibles.

Sensitive Data Scanner est également disponible en tant que [processeur][8] dans [Observability Pipelines][9]. Avec Observability Pipelines, vous pouvez collecter et traiter des logs au sein de votre propre infrastructure, puis les acheminer vers des intégrations en aval.

## Clients soumis à la loi américaine HIPAA

{{% hipaa-customers %}}

## Chiffrement des endpoints

Tous les endpoints de soumission de logs sont chiffrés. Ces endpoints hérités sont toujours pris en charge :

* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/
[2]: /fr/agent/logs/log_transport
[3]: /fr/agent/logs/advanced_log_collection/#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /fr/logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/
[7]: /fr/security/sensitive_data_scanner/
[8]: /fr/observability_pipelines/processors/sensitive_data_scanner
[9]: /fr/observability_pipelines/
[10]: /fr/data_security/pci_compliance/