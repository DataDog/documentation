---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-zoom"
"app_uuid": "a79217b7-6499-4de5-8ebd-73a91d227644"
"assets":
  "dashboards":
    "RapDev Zoom Call Quality": assets/dashboards/rapdev_zoom_meeting_quality.json
    "RapDev Zoom Geolocation Overview": assets/dashboards/rapdev_zoom_geo_overview.json
    "RapDev Zoom Overview": assets/dashboards/rapdev_zoom_overview.json
    "RapDev Zoom Phones Overview": assets/dashboards/rapdev_zoom_phones_overview.json
    "RapDev Zoom Rooms Dashboard": assets/dashboards/rapdev_zoom_rooms_dashboard.json
    "RapDev Zoom User Details": assets/dashboards/rapdev_zoom_user_details.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.zoom.meetings.count
      "metadata_path": metadata.csv
      "prefix": rapdev.zoom.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10150"
    "source_type_name": RapDev Zoom
  "logs": {}
  "monitors":
    "Zoom API Limit Was Encountered": assets/monitors/zoom_api_rate_limit.json
    "Zoom Room's Component is Offline or Not Working Properly": assets/monitors/zoom_room_component_has_problem.json
    "Zoom Room's Health is in Warning or Critical State": assets/monitors/zoom_room_has_problem.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- cloud
- collaboration
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_zoom"
"integration_id": "rapdev-zoom"
"integration_title": "Zoom"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_zoom"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.zoom
  "product_id": zoom
  "short_description": Unit price per user or device
  "tag": zoom_user_email
  "unit_label": Zoom Registered User and Phone Device
  "unit_price": !!int "1"
"public_title": "Zoom"
"short_description": "Monitor your Zoom accounts and optimize your license"
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
  - "Category::Cloud"
  - "Category::Collaboration"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor your Zoom accounts and optimize your license
  "media":
  - "caption": Meetings Overview
    "image_url": images/meetings.png
    "media_type": image
  - "caption": Zoom Rooms Dashboard
    "image_url": images/rooms.png
    "media_type": image
  - "caption": Meeting Quality Overview
    "image_url": images/meeting_quality.png
    "media_type": image
  - "caption": User Details Dashboard
    "image_url": images/user_details.png
    "media_type": image
  - "caption": Geolocation Overview
    "image_url": images/geo.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Zoom
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The Zoom Integration has the capability of monitoring Meetings, Rooms, Users, Network Statistics, and Geolocation Overviews to provide an optimal experience for your employees, no matter where they are located around the world. The integration comes pre-built with four fully customizable dashboards that bring the most crucial information to the surface. Additionally, we've designed our visuals to be deliverable without changes to C-Level Executives, Managers, Tech Leads, Engineers, and much more!

### Monitors

1. Zoom Room Has Problem
2. Zoom Room's Component Has A Problem 

### Dashboards

1. RapDev Zoom Meetings Overview
2. RapDev Zoom Rooms Dashboard
3. RapDev Zoom Meeting Quality
4. RapDev Zoom User Details
5. RapDev Zoom Geo Overview
6. RapDev Zoom Phones Overview

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-zoom" target="_blank">Click Here</a> to purchase this application.
