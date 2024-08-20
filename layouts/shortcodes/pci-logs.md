To set up PCI compliant Log Management, you must have the following:
- If not already enabled, Audit Trail is automatically enabled when the org is configured as PCI compliant. Audit Trail must be enabled and remain enabled for PCI DSS compliance.
- Datadog organization is in the US1 site.
- Any traffic is sent to the PCI endpoints using HTTPS only. If you are using the Agent, you should [enforce HTTPS transport][104].
- **All** your endpoints are changed to the PCI endpoints. 
- You may request access to the PCI Attestation of Compliance and Customer Responsibility Matrix on [Datadog's Trust Center][105] - note that these documents are only applicable once you have finished all the onboarding steps and have been manually configured to compliant by Datadog support.

To begin **onboarding**:
1. Contact [Datadog support][101] or your [Customer Success Manager][102] to request to being the PCI onboarding process while ensuring the necessary PCI requirements are met.
1. After Datadog support or Customer Success confirms that the org is ready to onboard, configure the respective configuration file to send all your logs to the dedicated PCI compliant endpoint(s):

- `agent-http-intake-pci.logs.datadoghq.com:443` for Agent traffic
- `http-intake-pci.logs.datadoghq.com:443` for non-Agent traffic
- `pci.browser-intake-datadoghq.com:443` for browser logs

For example, add the following lines to the Agent configuration file:
```
logs_config:
  logs_dd_url: <agent-http-intake-pci.logs.datadoghq.com:443>
```
3. All logs that are sent to the PCI compliant endpoint(s) automatically have a set of [Sensitive Data Scanner][106] PCI rules that are applied to scrub any cardholder data. These dedicated PCI rules must be enalbed for PCI DSS compliance and are included with no additional charge.

To finish onboarding and be moved to **compliant**:
1. Inform your [Datadog support][101] or your [Customer Success Manager][102] that you have moved over **all** your endpoints to the PCI compliant endpoint(s).
2. Once confirmed by Datadog, your Logs will be configured to be PCI compliant. Only now is your Log Management considered PCI compliant.

If you have any questions about how the Log Management service satisfies the applicable requirements under PCI DSS, contact your account manager.

[101]: /help/
[102]: mailto:success@datadoghq.com
[103]: /account_management/audit_trail/#setup
[104]: /tracing/configure_data_security/#pci-dss-compliance-for-compliance-for-apm
[105]: https://trust.datadoghq.com/
[106]: /sensitive_data_scanner
