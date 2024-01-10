| Name                         | Description of audit event                                                                  | Query in audit explorer                                               |
|------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [One-click Activation][24]   | A user activated or de-activated ASM on a service.                                          | `@evt.name:"Application Security" @asset.type:compatible_services`    |
| [Protection][23]             | A user enabled or disabled the ASM protection.                                              | `@evt.name:"Application Security" @asset.type:blocking_configuration` |
| [Denylist][22]               | A user blocked, unblocked, or extended the blocking duration of an IP address or a user ID. | `@evt.name:"Application Security" @asset.type:ip_user_denylist`       |
| [Passlist][81]               | A user added, modified, or deleted an entry to the passlist.                                | `@evt.name:"Application Security" @asset.type:passlist_entry`         |
| [In-App WAF Policy][82]      | A user created, modified, or deleted an In-App WAF policy.                                  | `@evt.name:"Application Security" @asset.type:policy_entry`           |
| [In-App WAF Custom Rule][83] | A user validated, created, modified, or deleted an In-App WAF custom rule.                  | `@evt.name:"Application Security" @asset.type:waf_custom_rule`        |

[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Aip_user_denylist
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Ablocking_configuration
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Acompatible_services
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apasslist_entry
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apolicy_entry
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Awaf_custom_rule