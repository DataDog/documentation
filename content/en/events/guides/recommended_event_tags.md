---
title: Recommend Tagging Practices for Events
kind: documentation
description: Recommended event tags and how to add them.
aliases:
    - /developers/taggingevents/
further_reading:
- link: "/getting_started/tagging/assigning_tags"
  tag: "Documentation"
  text: "Assigning Tags"

---

It is recommended that all events should have the below tags to help you:
- Identify potential issues faster
- Locate other related events
- Filter to more accurately e.g to a particular environment

If using the [API][1], they can be added within the tags param or to learn more about to how add them to certain integrations, check out [assigning_tags][2]

### Recommended Default Attributes (Type: all)

| **Attribute** | **Notes**                                                                                                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env          | The environment in which the event is from e.g production, edge, staging. <br>Enables you to ensure that events from a lower environment are not confused to be of a higher priority |
| service      | The name of the service                                                                                                                                                              |
| host         | The host name that either the service, pod, cluster, etc is running on                                                                                                               |
| team         | The team which owns the event, so that they can be later notified if need be                                                                                                         |
| version      | The build, service, etc version so that you know that an outage for instance is only related to a particular version released                                                        |


### Type: Alert

The current supported alerts integrations, are:

- [Amazon CloudWatch Alarms][3]
- [Nagios][4]
- [New Relic][5]
- [Prometheus AlertManager][6]
- [Sentry][7]
- [SolarWinds Orion][8]
- [Splunk][9]
- [Sumo Logic][10]
- [Webhooks][11]
- [Zabbix][12]

For all alerts it recommended at minimum to use the above standard attributes and for the above integrations they will automatically have an aggregation_key added to them.

| **Attribute**    | **Notes**                                                                                                                                                                  |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| aggregation_key | All events coming from an alerts integration will have this attribute in order to deduplicate them. It can be found under the event attributes tab in the events explorer. |


[1]: ../../api/latest/events/#post-an-event
[2]: /getting_started/tagging/assigning_tags
[3]: /integrations/amazon_web_services
[4]: /integrations/nagios
[5]: /integrations/new_relic
[6]: /integrations/prometheus
[7]: /integrations/sentry
[8]: /integrations/solarwinds
[9]: /integrations/splunk
[10]: /integrations/sumo_logic
[11]: /integrations/webhooks
[12]: /integrations/zabbix
