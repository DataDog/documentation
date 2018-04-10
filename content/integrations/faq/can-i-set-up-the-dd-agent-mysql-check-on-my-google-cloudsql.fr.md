---
title: Puis-je configurer le check dd-agent mysql sur mon Google CloudSQL?
kind: faq
---

Tout comme [l'intégration "native" AWS RDS][1] avec MySQL, vous pouvez configurer l'intégration MySQL d'un Agent Datadog pour le monitorer sur une instance MySQL fonctionnant dans Google CloudSQL. Avec cette configuration, vous pouvez compléter les métriques que vous obtiendriez de [l'intégration Datadog  Google CloudSQL][2] avec les métriques disponibles dans [Intégration MySQL][3] de l'Agent Datadog. 

Pour configurer cette intégration "supplémentaire" sur votre instance Google CloudSQL, vous pouvez configurer l'intégration de MySQL sur un Agent Datadog et la [configurer pour se connecter à distance][4] à votre instance Google CloudSQL au lieu d'utiliser la valeur par défaut localhost. Les étapes de configuration sont par ailleurs les mêmes que pour n'importe quelle autre instance MySQL.

Avec une réserve: Google CloudSQL [ne supporte pas performance_schemas][5], donc vous ne pouvez pas 'GRANT SELECT ON performance_schema. * `À l'utilisateur de l'Agent Datadog . Par conséquent, deux des métriques supplémentaires / facultatives du check MySQL ne sont pas disponibles pour les instances Google CloudSQL. Sinon, l'intégration devrait fonctionner comme avec n'importe quelle instance MySQL hébergée localement.

[1]: /integrations/amazon_rds
[2]: /integrations/google_cloudsql/
[3]: /integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences
