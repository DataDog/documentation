---
title: Monitor your HTTP requests are redirected into HTTPS
kind: guide
further_reading:
    - link: '/synthetics/http_tests'
      tag: 'Documentation'
      text: 'Create a HTTP Test'

---

Monitoring that your HTTP traffic is redirected into HTTPS is key to ensure the encryption of your users connections with your API endpoints and your application.

## Monitor your HTTPS redirections
Depending on your setup, you can find information about the redirection either in the response header with the presence of the `location` header or in the response body from your HTTP request (presence of `"https:"===window.location.protocol`).

To start monitoring the redirection of your HTTP traffic into HTTPS:
1. Create an HTTP.
2. Click on the **Test Url** button and look for redirection information in the response preview.
3. Make an assertion on the presence of the redirection element.

<!-- Screenshot 1 et 2-->

You will then be alerted if your HTTP traffic is not correctly redirected into HTTPS.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}