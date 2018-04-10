---
title: Puis-je configurer le check dd-agent mysql sur mon Google CloudSQL?
kind: faq
---

Tout comme [l'intégration "native" AWS RDS](/integrations/amazon_rds) avec MySQL, vous pouvez configurer l'intégration MySQL d'un agent Datadog pour le monitorer sur une instance MySQL fonctionnant dans Google CloudSQL. Avec cette configuration, vous pouvez compléter les métriques que vous obtiendriez de [l'intégration Datadog  Google CloudSQL](/integrations/google_cloudsql/) avec les métriques disponibles dans [Intégration MySQL](/integrations/mysql/) de l'agent Datadog. 

Pour configurer cette intégration "supplémentaire" sur votre instance Google CloudSQL, vous pouvez configurer l'intégration de MySQL sur un agent Datadog et la [configurer pour se connecter à distance](https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7) à votre instance Google CloudSQL au lieu d'utiliser la valeur par défaut localhost. Les étapes de configuration sont par ailleurs les mêmes que pour n'importe quelle autre instance MySQL.

Avec une réserve: Google CloudSQL [ne supporte pas performance_schemas](https://cloud.google.com/sql/docs/features#differences), donc vous ne pouvez pas 'GRANT SELECT ON performance_schema. * `À l'utilisateur de l'agent Datadog . Par conséquent, deux des métriques supplémentaires / facultatives du check MySQL ne sont pas disponibles pour les instances Google CloudSQL. Sinon, l'intégration devrait fonctionner comme avec n'importe quelle instance MySQL hébergée localement.