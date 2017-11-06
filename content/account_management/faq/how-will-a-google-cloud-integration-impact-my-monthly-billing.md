---
title: How will a Google Cloud integration impact my monthly billing?
kind: faq
customnav: accountmanagementnav
---

Beginning August 1st 2017, we bill for all hosts running the Agent as well as for all GCE instances picked up by the Google Cloud integration. You will not get billed twice if you are running the Agent on an Google Cloud instance picked up by the Google Cloud integration.

Other Google Cloud resources (e.g. CloudSQL, Google App Engine, Pub/Sub) are not currently part of monthly billing. Note that this may change in the future.

To control which Google Compute Engines are being monitoring, select ‘limit metric collection to hosts’ in the [Google Cloud Integration](https://app.datadoghq.com/account/settings#integrations/google_cloud_platform) tile and customize using tags accordingly.