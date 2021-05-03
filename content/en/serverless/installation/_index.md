---
title: Installing Serverless Monitoring
kind: documentation
aliases:
    - /serverless/installation/installing_the_library/
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
---

### Install Datadog's AWS integration

Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS CloudWatch. 

### Instrument your serverless application

Select the Lambda runtime below for instructions to instrument your serverless application.

   {{< partial name="serverless/getting-started-languages.html" >}}

[1]: /integrations/amazon_web_services/#setup
