---
"app_id": "cisco-duo"
"app_uuid": "8d3e0e2f-df52-4a12-a976-3ded71553a3a"
"assets":
  "dashboards":
    "Cisco Duo - Activity Logs": assets/dashboards/cisco_duo_activity_logs.json
    "Cisco Duo - Administrator Logs": assets/dashboards/cisco_duo_administrator_logs.json
    "Cisco Duo - Authentication Logs": assets/dashboards/cisco_duo_authentication_logs.json
    "Cisco Duo - Offline Enrollment Logs": assets/dashboards/cisco_duo_offline_enrollment_logs.json
    "Cisco Duo - Telephony Logs": assets/dashboards/cisco_duo_telephony_logs.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "6576439"
    "source_type_name": cisco-duo
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/cisco_duo/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cisco_duo"
"integration_id": "cisco-duo"
"integration_title": "Cisco Duo"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "cisco_duo"
"public_title": "Cisco Duo"
"short_description": "Gain insights into Cisco Duo logs."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Gain insights into Cisco Duo logs.
  "media":
  - "caption": Cisco Duo - Authentication Logs
    "image_url": images/cisco_duo_authentication_logs.png
    "media_type": image
  - "caption": Cisco Duo - Activity Logs
    "image_url": images/cisco_duo_activity_logs.png
    "media_type": image
  - "caption": Cisco Duo - Administrator Logs
    "image_url": images/cisco_duo_administrator_logs.png
    "media_type": image
  - "caption": Cisco Duo - Telephony Logs
    "image_url": images/cisco_duo_telephony_logs.png
    "media_type": image
  - "caption": Cisco Duo - Offline Enrollment Logs
    "image_url": images/cisco_duo_offline_enrollment_logs.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cisco Duo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Duo][1] is a multi-factor authentication (MFA) and secure access solution. It adds an additional layer of security by requiring users to verify their identity through a second factor, such as a mobile app, before gaining access to applications or systems. Duo is often used to enhance the security of remote access and helps protect against unauthorized access, even if passwords are compromised.

This integration ingests the following logs:
- 認証
- Activity
- 管理者
- Telephony
- Offline Enrollment

The Cisco Duo integration seamlessly collects multi-factor authentication (MFA) and secure access logs, channeling them into Datadog for analysis. Leveraging the built-in logs pipeline, these logs are parsed and enriched, enabling effortless search and analysis. The integration provides insight into fraud authentication events, authentication activity timeline, locations of accessed, authentication devices, and many more through the out-of-the-box dashboards.

## セットアップ

### 構成

#### Get API Credentials of Cisco Duo

1. Sign up for a [**Duo account**][2].
2. Log in to the [**Duo Admin Panel**][3].
3. Navigate to **Applications**.
4. Click **Protect an Application** and locate the entry for _Admin API_ in the applications list.
6. Click **Protect** to configure the application and retrieve your `integration key`, `secret key`, and `API hostname`. This information will be used to configure the Cisco Duo integration.
7. Ensure the _Grant read log_ permission is selected and click **Save Changes**.

#### Cisco Duo DataDog Integration Configuration

Configure the Datadog endpoint to forward Cisco Duo logs to Datadog.

1. Navigate to `Cisco Duo`.
2. Add your Cisco Duo credentials.

| Cisco Duo Parameters | 説明  |
| -------------------- | ------------ |
| ホスト                 | The API Hostname from Cisco Duo. It is the `XXXXXXXX` part of `https://api-XXXXXXXX.duosecurity.com`.  |
| Integration Key      | The Integration Key from Cisco Duo.    |
| Secret Key           | The Secret Key from Cisco Duo.         |

## 収集データ

### ログ

The Cisco Duo integration collects and forwards Cisco Duo Authentication, Activity, Administrator, Telephony and Offline Enrollment logs to Datadog.

### メトリクス

The Cisco Duo integration does not include any metrics.

### イベント

The Cisco Duo integration does not include any events.

## サポート

For further assistance, contact [Datadog Support][4].

[1]: https://duo.com/
[2]: https://signup.duo.com/
[3]: https://admin.duosecurity.com/
[4]: https://docs.datadoghq.com/help/

