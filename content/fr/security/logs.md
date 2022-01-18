---
title: Sécurité de Log Management
kind: documentation
aliases:
  - /fr/logs/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Consulter les principales catégories de données envoyées à Datadog
---
<div class="alert alert-info">Cette page est consacrée à la sécurité de Datadog ; si vous recherchez le produit Cloud SIEM product, consultez la section <a href="/security_platform/cloud_siem" target="_blank"></a>.</div>

Cet article fait partie d'une [série d'articles sur la sécurité des données][1].

Le produit Log Management prend en charge de nombreux [environnements et formats][2]. Nos clients sont ainsi libres d'envoyer à Datadog la grande majorité de leurs données, selon leurs besoins. Cet article décrit les principales garanties de sécurité et les commandes de filtrage proposées aux utilisateurs lors de l'envoi de logs à Datadog.

## Sécurité des données

L'Agent Datadog transmet les logs à Datadog via HTTPS ou via une connexion TCP avec chiffrement TLS sur le port 10516, ce qui nécessite une communication sortante (consultez [Transport de l'Agent pour les logs][3]).

Datadog utilise un chiffrement symétrique au repos (AES-256) pour les logs indexés. Les logs indexés sont supprimés de la plateforme Datadog lorsque leur période de rétention expire (telle que définie par le client).

## Filtrage des logs

Si vous utilisez la version 6 ou une version ultérieure, vous pouvez configurer l'Agent afin de filtrer les logs envoyés par l'Agent à l'application Datadog. Pour empêcher l'envoi de logs spécifiques, utilisez le [paramètre][4] `log_processing_rules` avec le `type` **exclude_at_match** ou **include_at_match**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent de filtrer les logs en fonction des règles d'inclusion ou d'exclusion fournies.

## Obfuscation des logs

Si vous utilisez la version 6, vous pouvez configurer l'Agent afin d'obfusquer des patterns spécifiques au sein des logs envoyés par l'Agent à l'application Datadog. Pour masquer des séquences sensibles au sein de vos logs, utilisez le [paramètre][5] `log_processing_rules` avec le `type` **mask_sequences**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent d'effacer les informations sensibles au sein de vos logs.

## Clients soumis à la loi américaine HIPAA

Datadog signe un Business Associate Agreement (BAA) avec les clients qui transmettent des informations de santé protégées électroniquement (ePHI) via le service Log Management de Datadog.

Ces fonctionnalités ne sont pas disponibles pour les clients qui ont signé le BAA de Datadog :

* Les utilisateurs ne peuvent pas demander de l'aide via le chat.
* Les dimensions de regroupement sont limitées aux tags de host, à la source, au service et au statut pour les [métriques basées sur des logs][6].
* Les notifications des log monitors ne peuvent pas inclure des exemples de logs.
* Les log monitors ne peuvent pas être configurés avec une condition `group-by`.
* Il n'est pas possible de [partager][7] des logs, des signaux de sécurité ou des traces à partir de l'Explorer via une intégration web.
* Les règles de sécurité ne peuvent pas envoyer de notifications.

Pour toute question sur la conformité du service Log Management aux exigences applicables de la loi HIPAA, contactez votre chargé de compte.

**Remarques :**

Auparavant, les clients soumis à la loi américaine HIPAA devaient utiliser des endpoints particuliers pour transmettre leurs logs afin d'appliquer des chiffrements spécifiques. Ce n'est plus nécessaire. Les chiffrements sont activés sur tous les endpoints de transmission de logs.

Ces endpoints hérités sont toujours pris en charge :

* `tcp-encrypted-intake.logs.datadoghq.com`
* `lambda-tcp-encrypted-intake.logs.datadoghq.com`
* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/
[2]: /fr/logs/log_collection/
[3]: /fr/agent/logs/log_transport
[4]: /fr/agent/logs/advanced_log_collection/#filter-logs
[5]: /fr/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[6]: /fr/logs/logs_to_metrics/
[7]: /fr/logs/explorer/#share-views