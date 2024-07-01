---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "performetriks-composer"
"app_uuid": "b1b4d663-f81a-4892-8aef-5dd67b40a37f"
"assets": {}
"author":
  "homepage": "https://www.performetriks.com/composer-datadog-product-guide"
  "name": Performetriks
  "sales_email": composer@performetriks.com
  "support_email": composer@performetriks.com
  "vendor_id": performetriks
"categories":
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "performetriks_composer"
"integration_id": "performetriks-composer"
"integration_title": "Composer"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "performetriks_composer"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": composer
  "short_description": Monthly flat fee for Performetriks Composer
  "unit_price": !!int "99"
"public_title": "Composer"
"short_description": "Configuration management for your Datadog environment"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Configuration management for your Datadog environment
  "media":
  - "caption": Composer is a Configuration tool to simplify administrative tasks in Datadog and provide a configuration management solution for all config settings.
    "image_url": images/composervideo.png
    "media_type": video
    "vimeo_id": !!int "692276988"
  - "caption": Composer reduces complexity and increases efficiency when dealing with version management of your Datadog configuration. You can quickly find out if there have been changes in the configuration and easily reset them.
    "image_url": images/composer1.png
    "media_type": image
  - "caption": Composer reduces complexity and increases efficiency when dealing with version management of your Datadog configuration. You can quickly find out if there have been changes in the configuration and easily reset them.
    "image_url": images/composer2.png
    "media_type": image
  - "caption": Composer simplifies Datadog admin tasks through introducing Version Management for Datadog, identifying changes in tenants, and automating manual tasks such as the creation of applications, dashboards, and management zones from templates.
    "image_url": images/composer3.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/manage-datadog-configurations-as-code-with-performetriks/"
  "support": "README.md#Support"
  "title": Composer
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Performetriks Composer is a tool that allows you to manage your entire Datadog environment configuration. Composer provides a quick, easy way to document and store your Datadog configuration, as well as find and resolve configuration errors in your Datadog environment.

### Composer Use Cases

**Backup Datadog configuration**

No matter how many Datadog environments you have, Composer allows you to create backups of all your configuration items. You can start a backup ad-hoc or entirely automate a backup from a CI/CD pipeline.

**Check in to software configuration management systems**

Composer allows you to manage your monitoring configurations as code and check that code into a repository, ensuring that there is a record of all monitoring settings.

**Find changes**

If several admins manage your Datadog environment, they need to ensure that everyone knows and agrees when any settings are adjusted. Composer simplifies this process by ensuring there is always a backup available, allowing admins to detect the most recent changes.

**Restore your configuration**

Errors in monitoring configuration can be difficult to spot, but Composer simplifies this process dramatically. Select your most recent Datadog configuration from the created backup and undo your mistakes within seconds.

**Upload your configuration**

It's all about monitoring as code these days. Composer allows your team to store monitoring settings in your code repositories, track changes, and upload these settings to existing or new Datadog environments.

## Support

For support or feature requests, contact Performetriks through the following channel:

- Email: [composer@performetriks.com][2]

### Further Reading

Additional helpful documentation, links, and articles:

- [Store and manage Datadog configurations as code with Performetriks’ offering in the Datadog Marketplace][3]

[1]: https://docs.datadoghq.com/account_management/api-app-keys/
[2]: mailto:composer@performetriks.com
[3]: https://www.datadoghq.com/blog/manage-datadog-configurations-as-code-with-performetriks/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/performetriks-composer" target="_blank">Click Here</a> to purchase this application.
