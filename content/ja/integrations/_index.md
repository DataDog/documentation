---
title: Integrations
disable_sidebar: true
aliases:
    - /integrations/verisign_openhybrid/
    - /integrations/snyk/
    - /integrations/lightstep_incident_response/
    - /integrations/mainstorconcept_ziris/
    - /integrations/rookout/
    - /integrations/rookout_license/
    - /integrations/shoreline/
    - /integrations/shoreline_license/
    - /integrations/shoreline_software_license/
description: すべてのシステム、アプリケーション、そしてサービスからデータを収集
cascade:
- _target:
    path: /integrations/akamai_datastream_2.md
  aliases:
    - /integrations/akamai_datastream
- _target:
    path: /integrations/azure.md
  algolia:
    rank: 80
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['azure', 'microsoft azure']
- _target:
    path: /integrations/kubernetes_state_core.md
  algolia:
    rank: 60
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['ksm']
- _target:
    path: /integrations/google_cloud_platform.md
  algolia:
    rank: 80
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['gcp', 'google cloud platform']
- _target:
    path: /integrations/amazon_web_services.md
  algolia:
    rank: 80
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['aws', 'amazon web services']
- _target:
    path: /integrations/eks_fargate.md
  algolia:
    rank: 60
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['eks logging']
- _target:
    path: /integrations/win32_event_log.md
  aliases:
    - /integrations/eventviewer/
  algolia:
    rank: 60
    category: ドキュメント
    subcategory: インテグレーション
    tags: ['event viewer']
- _target:
    path: /integrations/lambdatest_license.md
  aliases:
    - /integrations/lambdatest_software_license/
- _target:
    path: /integrations/mongo.md
  aliases:
    - /integrations/mongodb/
- _target:
    path: /integrations/rapdev_validator.md
  aliases:
    - /integrations/rapdev_dashboard_widget_pack/
- _target:
    path: /integrations/wmi_check.md
  aliases:
    - /integrations/wmi/
- _target:
    path: /integrations/jfrog_platform_self_hosted.md
  aliases:
    - /integrations/jfrog_platform/
- _target:
    path: /integrations/komodor_license.md
  aliases:
    - /integrations/komodor_komodor/
- _target:
    path: /integrations/stormforge_license.md
  aliases:
    - /integrations/stormforge_stormforge_license/
- _target:
    path: /integrations/feed.md
  aliases:
    - /integrations/rss/
- _target:
    path: /integrations/java.md
  aliases:
    - /agent/faq/jmx_integrations/
    - /agent/faq/docker-jmx/
- _target:
    path: /integrations/amazon_elb.md
  aliases:
    - /integrations/awselb
- _target:
    path: /integrations/elastic.md
  aliases:
    - /integrations/awses
- _target:
    path: /integrations/amazon_s3.md
  aliases:
    - /integrations/awss3
- _target:
    path: /integrations/snowflake_web.md
  aliases:
    - /integrations/snowflake/
---

すべてのシステム、アプリケーション、サービスの横断的な監視を実現します。Datadog が提供する {{< translate key="integration_count" >}} 以上の組み込みインテグレーションをご活用ください。

インテグレーションとは何でしょうか？ [インテグレーションをご紹介します][1]

{{< integrations >}}

[1]: /getting_started/integrations/
