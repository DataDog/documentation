---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-snmp-trap-logs"
"app_uuid": "754df420-1cf8-4742-b98c-9d3a76f83c41"
"assets":
  "dashboards":
    "RapDev SNMP Trap Logs": assets/dashboards/rapdev_snmp_trap_logs_dashboard.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- network
- snmp
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_snmp_trap_logs"
"integration_id": "rapdev-snmp-trap-logs"
"integration_title": "SNMP Trap Logs"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_snmp_trap_logs"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": snmp-trap-logs
  "short_description": Flat fee for this integration
  "unit_price": !!int "1000"
"public_title": "SNMP Trap Logs"
"short_description": "Convert SNMP trap messages into Datadog logs"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Network"
  - "Category::SNMP"
  - "Supported OS::Linux"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Convert SNMP trap messages into Datadog logs
  "media":
  - "caption": RapDev SNMP Trap Logs
    "image_url": images/1.png
    "media_type": image
  - "caption": SNMP Trap Log Messages
    "image_url": images/2.png
    "media_type": image
  - "caption": Parsed SNMP Trap
    "image_url": images/3.png
    "media_type": image
  - "caption": SNMP Trap Log Dashboard
    "image_url": images/4.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/"
  "support": "README.md#Support"
  "title": SNMP Trap Logs
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Overview
The RapDev SNMP Trap Logs package enables converting SNMP Trap messages into Datadog Logs for thousands of different
SNMP devices. We have collected as many MIB files as we could find, and have converted them to a format allowing for
the translation of SNMP traps into human-readable log messages.

This package comes with an install script to setup Logstash as an SNMP trap receiver, with the proper configurations
and MIB files to translate your messages, allowing you to alert on network events within Datadog.

For a list of all MIBs that are included with this package, see the [mib_yamls.txt file][4].

## Support

For support or feature requests, contact RapDev.io through the following channels:

- Email: [support@rapdev.io][7]
- Chat: [rapdev.io][3]
- Phone: 855-857-0222

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor and diagnose network performance issues with SNMP Traps][8]

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://docs.datadoghq.com/logs/guide/enrichment-tables
[2]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-message-remapper
[3]: https://www.rapdev.io/#Get-in-touch
[4]: https://files.rapdev.io/datadog/configs/mib_yamls.txt
[5]: mailto:sales@rapdev.io
[6]: https://mibs.observium.org
[7]: mailto:support@rapdev.io
[8]: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-trap-logs" target="_blank">Click Here</a> to purchase this application.
