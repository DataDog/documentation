---
aliases:
- /ko/agent/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
- /ko/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
title: 내 Google CloudSQL에서 dd-agent mysql 검사를 설정할 수 있나요?
---

MySQL과의 "네이티브" [Amazon RDS 통합][1]과 마찬가지로, Datadog Agent의 MySQL 통합을 설정하여 Google CloudSQL에서 실행되는 MySQL 인스턴스를 모니터링할 수 있습니다. 이 설정을 사용하면 Datadog의 [Google CloudSQL 통합][2]에서 얻을 수 있는 메트릭을 Datadog Agent의 [MySQL 통합][3]에서 제공하는 메트릭으로 보완할 수 있습니다.

Google CloudSQL 인스턴스에 이 "추가" 통합을 설정하려면 Datadog Agent에서 MySQL 통합을 설정하고 로컬 호스트 기본값을 사용하는 대신 Google CloudSQL 인스턴스에 [원격으로 연결하도록 설정][4]할 수 있습니다. 그 외에는 로컬로 호스팅되는 다른 MySQL 인스턴스와 설정 단계가 동일합니다.

한 가지 유의할 점은 Google CloudSQL이 [performance_schemas를 지원하지 않는다는 것입니다][5]. 따라서 Datadog Agent 사용자에게 `GRANT SELECT ON performance_schema.*`를 허용할 수 없습니다. 따라서 MySQL 점검의 두 가지 추가/선택적 메트릭을 Google CloudSQL 인스턴스에서 사용할 수 없습니다. 그 외에는 로컬로 호스팅되는 모든 MySQL 인스턴스와 마찬가지로 통합이 작동합니다.

[1]: /ko/integrations/amazon_rds/
[2]: /ko/integrations/google_cloudsql/
[3]: /ko/integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences