---
aliases:
- /fr/agent/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
- /fr/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
description: Configurez l'intégration MySQL de l'Agent Datadog pour surveiller une
  instance MySQL exécutée dans Google CloudSQL avec une configuration de connexion
  à distance.
title: Puis-je configurer le check mysql de l'Agent Datadog sur mon Google CloudSQL ?
---

Tout comme l'[intégration Amazon RDS][1] « native » avec MySQL, vous pouvez configurer l'intégration MySQL de l'Agent Datadog pour surveiller une instance MySQL exécutée dans Google CloudSQL. Avec cette configuration, vous pouvez compléter les métriques que vous obtiendriez autrement à partir de l'[intégration Google CloudSQL][2] de Datadog avec les métriques disponibles dans l'[intégration MySQL][3] de l'Agent Datadog.

Pour configurer cette intégration « supplémentaire » sur votre instance Google CloudSQL, vous pouvez configurer l'intégration MySQL sur un Agent Datadog et [la configurer pour qu'elle se connecte à distance][4] à votre instance Google CloudSQL au lieu d'utiliser le localhost par défaut. Les étapes de configuration sont par ailleurs identiques à celles de toute autre instance MySQL hébergée localement.

Avec une réserve : Google CloudSQL [ne prend pas en charge performance_schemas][5], vous ne pouvez donc pas accorder `GRANT SELECT ON performance_schema.*` à l'utilisateur de l'Agent Datadog. Par conséquent, deux des métriques supplémentaires/facultatives du check MySQL ne sont pas disponibles pour les instances Google CloudSQL. À part cela, l'intégration devrait fonctionner comme avec n'importe quelle instance MySQL hébergée localement.

[1]: /fr/integrations/amazon_rds/
[2]: /fr/integrations/google_cloudsql/
[3]: /fr/integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences