| Name                       | Description of audit event                                                                                              | Query in audit explorer                                                            |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [CWS agent rule][31]       | A user accessed (fetched) a CWS agent rule in the Cloud Security Platform.                                              | `@evt.name:"Cloud Security Platform" @asset.type:cws_agent_rule @action:accessed`  |
| [Notification profile][32] | A user created, updated, or deleted a notification profile in the Cloud Security Platform.                              | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile`             |
| [Security rule][33]        | A user validated, updated, deleted, or created a security rule and the previous and new values for the rule.            | `@evt.name:"Cloud Security Platform" @asset.type:security_rule`                    |
| [Security signal][34]      | A user modified the state of a signal or assigned the signal to a user, and the previous and new values for the signal. | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |
| [Report subscription][35]  | A user subscribed or unsubscribed from a K9 email report. | `@evt.name:"Cloud Security Platform" @asset.type:report_subscription` |

[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Areport_subscription%20