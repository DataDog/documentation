---
title: Community Office Hours
type: documentation
---

## Community Code Review

Datadog runs twice monthly code reviews and office hours to assist community members who are contributing to our [open source projects](#list-of-open-source-project).  

### Where

Office hours will be held in #integrations in the [Datadog Community Slack][1] ([get an invitation][2]), in conjunction with a [Google Hangout][3].

### When

* 2nd Wednesday of each month at 10:00 AM Eastern Time.
* 4th Wednesday of each month at 3:00 PM Eastern Time.

### Guidelines and Caveats

- Review and feedback during office hours is offered on a first come, first served basis. We may not get to every review each week. We appreciate your patience and understanding.

- We welcome everyone from the community to join us and provide respectful and constructive feedback to their fellow members of the Datadog community. 

- These sessions are not intended as a channel for general Datadog support. We are primarily focused on discussing and reviewing `datadog-agent` integrations, and contributions to other Datadog [open source projects](#list-of-open-source-project). For product support we encourage you to reach out to [our support team directly][4].

- Sometimes a given PR may be complex and require further offline review before we can provide feedback.  

## List of open source projects

### Agent 

| Repository                      | Description                                                                            | Status   |
| :--------                       | :-------                                                                               | :------- |
| [datadog-agent][17]               | Datadog Agent Version 6                                                                | Active   |
| [dd-agent][7]                   | Datadog Agent Version 5                                                                | Outdated |
| [datadog-trace-agent][8]        | Datadog APM agent                                                                      | Active   |
| [datadog-process-agent][15]     | Datadog Process Agent                                                                  | Active   |
| [docker-dd-agent][16]           | Datadog Agent Dockerfile for Trusted Builds                                            | Active   |
| [agent-payload][22]             | Payload format description for communication between the agent and the Datadog backend | Active   |
| [datadog-agent-boshrelease][26] | Datadog agent for BOSH                                                                 | Active   |
| [dd-agent-builder][33]          | Windows agent build recipe                                                             | Active   |
| [dd-agent-omnibus][34]          | Omnibus project to build the Datadog Agent                                             | Active   |



### Integrations

| Repository                            | Description                                                                                                  | Status     |
| :--------                             | :-------                                                                                                     | :-------   |
| [integrations-core][5]                | Core integrations of the datadog agent                                                                       | Active     |
| [integrations-extras][6]              | Community developed integrations and plugins for the Datadog Agent                                           | Active     |
| [puppet-datadog-agent][17]            | Puppet module to install the Datadog agent                                                                   | Active     |
| [chef-datadog][18]                    | Chef cookbook for Datadog Agent & Integrations                                                               | Active     |
| [jenkins-datadog-plugin][21]          | A Jenkins plugin used to forward metrics, events, and service checks to an account at Datadog, automatically | Active     |
| [ansible-datadog][23]                 | Ansible role for Datadog Agent                                                                               | Active     |
| [ansible-datadog-callback][24]        | Ansible callback to get stats & events directly into Datadog                                                 | Active     |
| [chef-handler-datadog][25]            | Get Chef stats & events directly into Datadog                                                                | Active     |
| [datadog-cloudfoundry-buildpack][27]  | Datadog Cloud Foundry Buildpack                                                                              | Active     |
| [datadog-firehose-nozzle][28]         | CF component to forward metrics from the Loggregator Firehose to Datadog                                     | Active     |
| [datadog-firehose-nozzle-release][29] | BOSH release for datadog-firehose-nozzle                                                                     | Active     |
| [datadog-formula][30]                 | A saltstack formula for Datadog                                                                              | Active     |
| [datadog-openshift][32]               | Datadog cartridge for Openshift                                                                              | Deprecated |
| [gae_datadog][38]                     | Fetch metrics from your GAE project and send them to Datadog                                                 | Outdated   |
| [go-metro][39]                        | Passively calculate TCP RTT between hosts                                                                    | Active     |
| [jmxfetch][43]                        | Export JMX metrics                                                                                           | Active     |
| [omnibus-ruby][45]                    | Easily create full-stack installers for your project across a variety of platforms                           | Active     |
| [universe][46]                        | The Mesosphere Universe package repository                                                                   | Active     |

### Libraries 

| Repository          | Description                          | Status   |
| :--------           | :-------                             | :------- |
| [dd-trace-py][9]    | Datadog Tracing Python Client        | Active   |
| [dd-trace-go][10]   | A Go tracing package for Datadog APM | Active   |
| [dd-trace-rb][11]   | Datadog Tracing Ruby Client          | Active   |
| [dd-trace-java][12] | Datadog APM client for Java          | Active   |
| [datadogpy][14]     | The Datadog Python library           | Active   |
| [datadog-go][31]    | Go client library for datadog        | Active   |
| [dogapi-rb][36]     | Ruby client for Datadog's API        | Active   |

### DogStatsD

| Repository                    | Description                                  | Status   |
| :--------                     | :-------                                     | :------- |
| [dogstatsd-csharp-client][13] | A DogStatsD client for C#/.NET               | Active   |
| [php-datadogstatsd][20]       | A PHP client for DogStatsd                   | Active   |
| [dogstatsd-ruby][37]          | A Ruby client for DogStatsd                  | Active   |
| [java-dogstatsd-client][42]   | A java statsd client library                 | Active   |
| [statsd-datadog-backend][46]  | A plugin to connect etsy's statsD to Datadog | Active   |


### Miscellaneous

| Repository                     | Description                                         | Status   |
| :--------                      | :-------                                            | :------- |
| [documentation][19]            | The source for Datadog's documentation site         | Active   |
| [deb-s3][35]                   | Easily create and manage an APT repository on S3    | Outdated |
| [gohai][40]                    | System information collector                        | Active   |
| [heroku-buildpack-datadog][41] | Heroku Buildpack to run the Datadog Agent in a Dyno | Active   |
| [node-connect-datadog][44]     | Datadog middleware for Connect JS / Express         | Active   |



[1]: https://datadoghq.slack.com
[2]: http://chat.datadoghq.com/
[3]: https://plus.google.com/hangouts/_/datadoghq.com/dd-officehours
[4]: /help
[5]: https://github.com/DataDog/integrations-core
[6]: https://github.com/DataDog/integrations-extras
[7]: https://github.com/DataDog/dd-agent
[8]: https://github.com/DataDog/datadog-trace-agent
[9]: https://github.com/DataDog/dd-trace-py
[10]: https://github.com/DataDog/dd-trace-go
[11]: https://github.com/DataDog/dd-trace-rb
[12]: https://github.com/DataDog/dd-trace-java
[13]: https://github.com/DataDog/dogstatsd-csharp-client
[14]: https://github.com/DataDog/datadogpy
[15]: https://github.com/DataDog/datadog-process-agent
[16]: https://github.com/DataDog/docker-dd-agent
[17]: https://github.com/DataDog/puppet-datadog-agent
[18]: https://github.com/DataDog/chef-datadog
[19]: https://github.com/DataDog/documentation
[20]: https://github.com/DataDog/php-datadogstatsd
[21]: https://github.com/DataDog/jenkins-datadog-plugin
[22]: https://github.com/DataDog/agent-payload
[23]: https://github.com/DataDog/ansible-datadog
[24]: https://github.com/DataDog/ansible-datadog-callback
[25]: https://github.com/DataDog/chef-handler-datadog
[26]: https://github.com/DataDog/datadog-agent-boshrelease
[27]: https://github.com/DataDog/datadog-cloudfoundry-buildpack
[28]: https://github.com/DataDog/datadog-firehose-nozzle
[29]: https://github.com/DataDog/datadog-firehose-nozzle-release
[30]: https://github.com/DataDog/datadog-formula
[31]: https://github.com/DataDog/datadog-go
[32]: https://github.com/DataDog/datadog-openshift
[33]: https://github.com/DataDog/dd-agent-builder
[34]: https://github.com/DataDog/dd-agent-omnibus
[35]: https://github.com/DataDog/deb-s3
[36]: https://github.com/DataDog/dogapi-rb
[37]: https://github.com/DataDog/dogstatsd-ruby
[38]: https://github.com/DataDog/gae_datadog
[39]: https://github.com/DataDog/go-metro
[40]: https://github.com/DataDog/gohai
[41]: https://github.com/DataDog/heroku-buildpack-datadog
[42]: https://github.com/DataDog/java-dogstatsd-client
[43]: https://github.com/DataDog/jmxfetch
[44]: https://github.com/DataDog/node-connect-datadog
[45]: https://github.com/DataDog/omnibus-ruby
[46]: https://github.com/DataDog/universe
