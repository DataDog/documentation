1. Contact [Datadog support][101] or your [Customer Success Manager][102] to request that the org be configured as a PCI-compliant org and discuss the necessary paperwork to complete the PCI requirements.
1. If not already enabled, [Audit Trail][103] is automatically enabled when the org is configured as PCI-compliant. Audit Trail *must* be enabled and remain enabled for PCI DSS compliance.
1. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the Agent configuration file to send spans to the dedicated PCI-compliant endpoint (`https://trace-pci.agent.datadoghq.com`):
    ```
    apm_config:
      apm_dd_url: <https://trace-pci.agent.datadoghq.com>
    ```

[101]: /help/
[102]: mailto:success@datadoghq.com
[103]: /account_management/audit_trail/#setup
