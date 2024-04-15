---
aliases:
- /ko/integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
- /ko/integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
- /ko/integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
- /ko/integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
- /ko/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
- /ko/integrations/faq/extra-hosts-with-name-n-a-reporting-data
- /ko/integrations/faq/redis-integration-error-unknown-command-config
- /ko/integrations/faq/snmp
cascade:
- private: true

title: FAQ 통합
---

## Amazon Web Services

* [AWS 통합을 사용하지 않고 EC2 태그를 어떻게 가져오나요?][1]
* [AWS 빌링 세부 정보를 어떻게 모니터링하나요?][2]
* [데이터 수신이 왜 지연되나요?][3]
* [ECS Fargate 통합 설정][4]

## Apache

* [Apache 통합 문제][5]
* [Apache SSL 인증서 문제][6]

## Elasticsearch

* [Elasticsearch가 모든 메트릭을 전송하지 않는 이유는 무엇인가요?][7]
* [Agent가 연결되지 않습니다][8]

## Git & GitHub

* [내 github 통합으로 이벤트 스트림에 이벤트가 왜 표시되지 않나요?][9]

## HAProxy

* [다중 프로세스 모드의 HAProxy][10]

## Jira

* [JIRA 통합을 설정했습니다. 이제 이벤트와 티켓을 어떻게 생성하나요?][11]

## JMX

* [JMX 통합과 일치하는 Bean이 있지만 Collect에는 아무것도 없습니다!][12]
* [jmx.yaml 오류: Include 섹션][13]
* [JMX 통합 트러블슈팅][14]
* [jConsole에서 jmx 데이터 확인 및 이를 수집하도록 jmx.yaml 설정][15]
* [JMX와 AWS 통합 모두 "이름" 태그를 사용합니다. 어떻게 해야 하나요?][16]
* [JBoss EAP 7 및 JMX를 통한 Datadog 모니터링][17]

## Kafka

* [Kafka 트러블슈팅 및 심층 분석][18]

## Kubernetes

* [apiserver 및 kubelet에 대한 클라이언트 인증][19]

## MySQL & SQL

* [MySQL 로컬호스트 오류 - Localhost VS 127.0.0.1][20]
* [SQL Server 통합에서 네임드 인스턴스를 사용할 수 있나요?
* [데이터베이스 사용자에게 권한이 없습니다.][22]

## Postgres

* [Postgres 커스텀 메트릭 수집 설명][23]

## RabbitMQ

* [태그 계열별로 RabbitMQ 대기열에 태그 지정][24]

## Unix

* [UNIX 셸에서 메트릭 수집하기][25]

## Vertica

* [커스텀 Vertica 쿼리에서 메트릭 수집하기][26]

## VMware Tanzu Application Service

* [VMware Tanzu Application Service 아키텍처][31]

## VSphere

* [vSphere로 중복 호스트 문제 해결][27]

## Webhooks

* [Webhooks를 사용하여 Trello Card 만들기][28]

## Windows

* [WMI를 통해 커스텀 Windows 성능 카운터 수집하기][29]
* [Windows 상태 기반 점검][30]

[1]: /ko/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[2]: /ko/integrations/faq/how-do-i-monitor-my-aws-billing-details/
[3]: /ko/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[4]: /ko/integrations/faq/integration-setup-ecs-fargate/
[5]: /ko/integrations/faq/issues-with-apache-integration/
[6]: /ko/integrations/faq/apache-ssl-certificate-issues/
[7]: /ko/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[8]: /ko/integrations/faq/elastic-agent-can-t-connect/
[9]: /ko/integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[10]: /ko/integrations/faq/haproxy-multi-process/
[11]: /ko/integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[12]: /ko/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[13]: /ko/integrations/faq/jmx-yaml-error-include-section/
[14]: /ko/integrations/faq/troubleshooting-jmx-integrations/
[15]: /ko/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[16]: /ko/integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[17]: /ko/integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[18]: /ko/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[19]: /ko/integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[20]: /ko/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[21]: /ko/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[22]: /ko/integrations/faq/database-user-lacks-privileges/
[23]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[24]: /ko/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[25]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[26]: /ko/integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[27]: /ko/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[28]: /ko/integrations/faq/how-to-make-trello-card-using-webhooks/
[29]: /ko/integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[30]: /ko/integrations/faq/windows-status-based-check/
[31]: /ko/integrations/faq/pivotal_architecture/
