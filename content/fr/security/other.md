---
title: Considérations de sécurité supplémentaires
kind: documentation
further_reading:
  - link: /security/
    tag: Documentation
    text: Consulter les principales catégories de données envoyées à Datadog
---
<div class="alert alert-info">Cette page est consacrée à la sécurité de Datadog ; si vous recherchez le produit Security Monitoring, consultez la section <a href="/security_monitoring" target="_blank">Security Monitoring</a>.</div>

Cet article fait partie d'une [série d'articles sur la sécurité des données][1].

Cet article décrit des considérations de sécurité supplémentaires à prendre en compte dans le cadre de l'utilisation de Datadog et de l'Agent.

## Obfuscation des arguments de processus

Si vous utilisez la version 6, vous pouvez configurer l'Agent afin d'obfusquer des commandes de [processus][2] ou des arguments envoyés par l'Agent à l'application Datadog. Pour masquer des séquences sensibles au sein de vos données de processus, utilisez le [paramètre][3] `custom_sensitive_words`. Il s'agit d'une liste contenant une ou plusieurs expressions régulières qui demandent à l'Agent de filtrer des informations de processus en fonction d'une liste d'exclusion.

De plus, les mots-clés suivants sont obfusqués par défaut :

```
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

## Sécurité des intégrations cloud

Datadog permet aux clients d'intégrer des services tiers. Datadog propose plus de [{{< translate key="integration_count" >}} intégrations intégrées][4], certaines d'entre elles étant directement configurées dans l'application. Ainsi, les clients doivent parfois fournir des identifiants pour permettre à Datadog de se connecter à un service tiers en leur nom. Les identifiants fournis par les clients sont chiffrés et stockés par Datadog dans un datastore sécurisé soumis à des protocoles de sécurité strictes. Toutes les données sont chiffrées durant leur stockage et leur transfert. L'accès au datastore sécurisé est soumis à des contrôles et à une surveillance renforcés. Chaque service et chaque action de service ont uniquement accès aux données qui lui sont nécessaires.
Un système de détection des comportements anormaux surveille en permanence les accès non autorisés. L'accès des employés à des fins de maintenance est limité à un petit groupe d'ingénieurs.

En raison de leur nature sensible, des protocoles de sécurité supplémentaires sont mis en place lors de l'intégration avec les fournisseurs cloud lorsque cela est possible, notamment via l'utilisation d'identifiants spécifiques à Datadog avec des autorisations limitées. Par exemple :

* L'[intégration avec Amazon Web Services][5] nécessite que le client configure la délégation des rôles par le biais d'AWS IAM, conformément au [guide des bonnes pratiques pour AWS IAM][6]. Le client doit également accorder les autorisations spécifiques avec une stratégie AWS.
* Pour configurer l'intégration avec [Microsoft Azure][7], le client doit définir un locataire pour Datadog. L'accès à une application spécifique n'est accordé qu'au rôle « reader » pour les abonnements qu'il souhaite surveiller.
* Pour configurer l'intégration avec [Google Cloud Platform][8], le client doit définir un compte de service pour Datadog. Il doit également octroyer les rôles « Compute Viewer » et « Monitoring Viewer » uniquement.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/
[2]: /fr/infrastructure/process/
[3]: /fr/infrastructure/process/#process-arguments-scrubbing
[4]: /fr/integrations/
[5]: /fr/integrations/amazon_web_services/
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[7]: /fr/integrations/azure/
[8]: /fr/integrations/google_cloud_platform/