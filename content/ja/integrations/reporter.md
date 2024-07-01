---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-reporter"
"app_uuid": "debb66b8-6675-4273-85a2-55d806e68e1b"
"assets":
  "dashboards":
    "Reporter": assets/dashboards/reporter_dashboard.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": ""
    "service_checks":
      "metadata_path": service_checks.json
    "source_type_id": !!int "10110"
    "source_type_name": Reporter
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "reporter"
"integration_id": "rapdev-reporter"
"integration_title": "Reporter"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "reporter"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": reporter
  "short_description": Flat fee for this integration
  "unit_price": !!int "299"
"public_title": "Reporter"
"short_description": "Generate Email reports for any Datadog dashboard"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Generate Email reports for any Datadog dashboard
  "media":
  - "caption": Reporter Introduction
    "image_url": images/video.png
    "media_type": video
    "vimeo_id": !!int "630489700"
  - "caption": Sample Email Report
    "image_url": images/3.png
    "media_type": image
  - "caption": Report Configuration Page
    "image_url": images/1.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Reporter
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[{{< img src="marketplace/reporter/images/video.png" alt="Reporter Introduction" >}}](https://www.youtube.com/watch?v=GK5cGDUr1CA)

Datadog Reporter allows you to schedule reports and email them out on a set interval. You can pick any of your existing dashboards, add the URL to the reporter web application, and set the mailing interval to send it out. The report will be emailed to your users as an attachment that they can open to view.  There is currently no limit to the number of reports you can generate and send.

This integration will setup a new dashboard in your Datadog instance called **Datadog Reporter**.  The application can be accessed directly by going to the dashboard and creating a new user from that iFrame.  *Your Datadog account will NOT work in the DD Reporter application.  You must register a seperate account*

## Support

For support or feature requests please contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
 Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-reporter" target="_blank">Click Here</a> to purchase this application.
