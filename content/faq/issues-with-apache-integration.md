---
title: Issues with Apache Integration
kind: faq
customnav: main_references
---

If you are having issues with your Apache integration, it is mostly like due to the Agent not being able to access your Apache status URL.  

Try running curl for the apache_status_url that you have in your apache.yaml file on your host, making sure to include your login credentials if applicable, to see if it outputs the stats correctly. If it does not, you'll need to change your permissions for the status URL to allow access from the host. You can read this article for more info: http://httpd.apache.org/docs/2.2/mod/mod_status.html

If you still have issues, please email support@datadohq.com with your Agent info command output, Agent logs, datadog.conf, and apache.yaml file so we can help you resolve the issue.