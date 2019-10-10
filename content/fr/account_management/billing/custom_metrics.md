---
title: Facturation des métriques custom
kind: faq
aliases:
  - /fr/integrations/faq/what-standard-integrations-emit-custom-metrics/
---
## Présentation

De manière générale, les [métriques custom][1] désignent toutes les métriques qui ne font pas partie de la série d'intégrations classique. Il s'agit par exemple des métriques qui font appel à des checks custom ou des métriques d'API de votre pile d'applications.

* Le volume total facturable est calculé en fonction du nombre moyen de `métriques custom/heure` dans le mois.
* Les offres Pro incluent 100 métriques custom par host.
* Les offres Enterprise incluent 200 métriques custom par host.
* Le nombre moyen de métriques est calculé pour tous les hosts payés.
* Vous avez la possibilité d'acheter des forfaits de métriques custom supplémentaires.

Contactez le [service commercial][2] ou votre [chargé de compte][3] pour discuter de vos métriques custom.

### Intégrations standard
Les intégrations standard suivantes peuvent potentiellement générer des métriques custom.

Les intégrations suivantes sont limitées à 350 métriques custom par défaut :

* [ActiveMQ XML][4]
* [Go-Expvar][5]

Les intégrations suivantes ne sont soumises à aucune limite par défaut :

* [Métriques de l'Agent][6]
* [Directory][7]
* [Linux Proc Extras][8]
* [Nagios][9]
* [Check PDH][10]
* [Prometheus][11]
* [SNMP][12]
* [Windows Services][13]
* [WMI][14]

Bien d'autres intégrations peuvent être configurées pour collecter des métriques custom, par exemple :

* [MySQL][15]
* [Oracle][16]
* [Postgres][17]
* [SQL Server][18]

## Dépannage
Pour toute question technique, contactez [l'assistance Datadog][19].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: /fr/developers/metrics/custom_metrics
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /fr/integrations/activemq/#activemq-xml-integration
[5]: /fr/integrations/go_expvar
[6]: /fr/integrations/agent_metrics
[7]: /fr/integrations/directory
[8]: /fr/integrations/linux_proc_extras
[9]: /fr/integrations/nagios
[10]: /fr/integrations/pdh_check
[11]: /fr/integrations/prometheus
[12]: /fr/integrations/snmp
[13]: /fr/integrations/windows_service
[14]: /fr/integrations/wmi_check
[15]: /fr/integrations/mysql
[16]: /fr/integrations/oracle
[17]: /fr/integrations/postgres
[18]: /fr/integrations/sqlserver
[19]: /fr/help