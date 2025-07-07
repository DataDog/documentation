To set up PCI compliant Application Performance Monitoring, you must meet the following requirements:
- Audit Trail must be enabled and remain enabled for PCI DSS compliance. If you haven't already enabled Audit Trail, it is _automatically enabled_ once the org is configured as PCI-compliant (after following the steps below).
- Your Datadog organization is in the US1 site.
- All spans sent to the PCI endpoints using HTTPS only. If you are using the Agent to send spans, you should enforce HTTPS transport.
- **All** your spans endpoints need to be changed to the PCI endpoints for spans.
- You may request access to the PCI Attestation of Compliance and Customer Responsibility Matrix on [Datadog's Trust Center][105] - note that these documents are only applicable once you have finished all the onboarding steps and have been manually configured to be compliant by Datadog support.

To begin **onboarding**:
1. Contact [Datadog support][101] or your [Customer Success Manager][102] to request to being the PCI onboarding process while ensuring the necessary PCI requirements are met.
2. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the respective configuration file to send spans to the dedicated PCI compliant endpoint:
   
- `https://trace-pci.agent.datadoghq.com` for Agent and non-Agent traffic

3. For example, add the following lines to the Agent configuration file:
```
apm_config:
  apm_dd_url: <https://trace-pci.agent.datadoghq.com>
```
4. All spans that are sent to the PCI compliant endpoint(s) automatically have a set of [Sensitive Data Scanner][106] PCI rules that are applied to scrub any cardholder data. These dedicated PCI rules must be enabled for PCI DSS compliance and are included with no additional charge. Note that Sensitive Data Scanner for PCI customers does not include the Summary page or estimated usage metric capabilities.

To finish onboarding and be moved to **compliant**:
1. Inform your [Datadog support][101] or your [Customer Success Manager][102] that you have moved over **all** your endpoints to the PCI compliant endpoint(s).
2. Once confirmed by Datadog, your span configuration and Application Performance Monitoring is considered PCI-compliant.

If you have any questions about how your now PCI-compliant Application Performance Monitoring satisfies the applicable requirements under PCI DSS, contact your account manager. See information on setting up [PCI-compliant Log Management][104].

[101]: /help/
[102]: mailto:success@datadoghq.com
[103]: /account_management/audit_trail/#setup
[104]: /data_security/pci_compliance/?tab=logmanagement
[105]: https://trust.datadoghq.com/
[106]: /sensitive_data_scanner
