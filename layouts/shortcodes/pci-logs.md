1. Contact [Datadog support][101] or your [Customer Success Manager][102] to request that the org be configured as a PCI-compliant org and discuss the necessary paperwork to complete the PCI requirements.
1. Enable [Audit Trail][103] in the new org. Audit Trail *must* be enabled and remain enabled for PCI DSS compliance.
1. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the Agent configuration file to send logs to the dedicated PCI-compliant endpoint (`agent-http-intake-pci.logs.datadoghq.com`):
    ```
    logs_config:
      logs_dd_url: <http://agent-http-intake-pci.logs.datadoghq.com:443|agent-http-intake-pci.logs.datadoghq.com:443>
    ```
    **Note**: The port must be included in the configuration. PCI compliance uses HTTPS log forwarding only. If you are using the Agent, you should [enforce HTTPS transport][104].

If you have any questions about how the Log Management service satisfies the applicable requirements under PCI DSS, contact your account manager.

[101]: /help/
[102]: mailto:success@datadoghq.com
[103]: /account_management/audit_trail/#setup
[104]: /tracing/configure_data_security/#pci-dss-compliance-for-compliance-for-apm
