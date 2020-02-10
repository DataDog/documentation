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
Cet article fait partie d'une [série de billets sur la sécurité des données][1].

Le produit Log Management prend en charge de nombreux [environnements et formats][2]. Nos clients sont ainsi libres d'envoyer à Datadog la grande majorité de leurs données, selon leurs besoins. Cet article décrit les principales garanties de sécurité et les commandes de filtrage proposées aux utilisateurs lors de l'envoi de logs à Datadog.

## Sécurité des données

L'Agent Datadog transmet des logs à Datadog via une connexion TCP avec chiffrement TLS, qui nécessite une communication sortante sur le port `10516`. Datadog utilise un chiffrement symétrique au repos (AES-256) pour les logs indexés. Les logs indexés sont supprimés de la plateforme Datadog lorsque leur période de rétention expire (telle que définie par le client).

## Filtrage des logs

Si vous utilisez la version 6, vous pouvez configurer l'Agent afin de filtrer les logs envoyés par l'Agent à l'application Datadog. Pour empêcher l'envoi de logs spécifiques, utilisez le [paramètre][3] `log_processing_rules` avec le `type` **exclude_at_match** ou **include_at_match**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent de filtrer les logs en fonction des listes d'inclusion ou d'exclusion.

## Obfuscation des logs

Si vous utilisez la version 6, vous pouvez configurer l'Agent afin d'obfusquer des patterns  spécifiques au sein des logs envoyés par l'Agent à l'application Datadog. Pour masquer des séquences sensibles au sein vos logs, utilisez le [paramètre][4] `log_processing_rules` avec le `type` **mask_sequences**. Cela permet de créer une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent d'effacer les informations sensibles au sein de vos logs.

## Exigences de configuration pour les clients soumis à la loi américaine HIPAA

Datadog signe un Business Associate Agreement (BAA) avec les clients qui transmettent des informations de santé protégées électroniquement (ePHI) via le service Log Management de Datadog.

Avant d'exécuter un BAA, les clients envoyant des ePHI au service Log Management de Datadog doivent installer les configurations suivantes :

* L'Agent Datadog doit être configuré de façon à envoyer des logs vers `tcp-encrypted-intake.logs.datadoghq.com`.
* La [fonction Lambda de collecte de logs AWS][5] de Datadog doit être configurée afin d'envoyer les logs vers `lambda-tcp-encrypted-intake.logs.datadoghq.com` en définissant la variable d'environnement `DD_URL` et en définissant `DD_USE_TCP` sur `true`.
* Le [redirecteur push GCP][6] doit être configuré de façon à envoyer ses logs vers `gcp-encrypted-intake.logs.datadoghq.com`.
* Outre l'Agent Datadog, les autres sources de logs doivent être configurées afin d'envoyer des logs vers `http-encrypted-intake.logs.datadoghq.com`.

La configuration d'échantillonnage suivante peut être utilisée avec l'Agent Datadog pour soumettre directement des logs à un endpoint conforme à la loi HIPAA (à savoir, sans un proxy) :

```yaml
logs_enabled: true
logs_config:
  logs_dd_url: tcp-encrypted-intake.logs.datadoghq.com:10516
  logs_no_ssl: false
```

Avec l'Agent Docker,  passez `DD_LOGS_CONFIG_LOGS_DD_URL=tcp-encrypted-intake.logs.datadoghq.com:10516` en tant que variable d'environnement.

De plus, certaines fonctionnalités ne sont actuellement pas disponibles pour les clients qui ont signé le BAA de Datadog. Ainsi :

* Les utilisateurs ne peuvent pas demander de l'aide via le chat.
* La réintégration de logs à partir d'archives est désactivée
* La création de métriques à partir de logs est désactivée
* Les notifications des log monitors ne peuvent pas inclure des exemples de logs.
* Les log monitors ne peuvent pas être configurés avec une condition `group-by`.
* Il n'est pas possible de [partager][7] des logs (ou des traces) à partir de l'Explorer via une intégration web.

Pour toute question sur la conformité du service Log Management aux exigences applicables de la loi HIPAA, contactez votre chargé de compte.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security
[2]: /fr/logs/log_collection
[3]: /fr/agent/logs/advanced_log_collection/?tab=exclude_at_match#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /fr/integrations/amazon_lambda/#log-collection
[6]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[7]: /fr/logs/explorer/#share-views