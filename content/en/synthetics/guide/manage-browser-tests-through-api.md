---
title: Manage your browser tests programmatically
kind: guide
further_reading:
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Introduction to Browser Synthetic Tests'

---

## Easily manage browser tests via the API

Monitoring your application from an end-to-end standpoint is key to trully sense your users' experience. The Datadog Synthetic Monitoring recorder allows you to easily configure these complex testing workflows. However you may want to manage all of your Synthetic resources programmatically and using our API to define browser tests can be challenging.

To address this need, we recommend you to create your browser tests through the Datadog UI and then retrieve your tests configurations via the API.
You can follow this workflow:
1. Create your browser tests in the application with our recorder.
2. Retrieve the list of your tests with the [Get the list of all tests](https://docs.datadoghq.com/api/latest/synthetics/#get-the-list-of-all-tests) endpoint.
3. Filter on the `type: browser` and retrieve the `public_ids` of the browser tests you want to manage through the API. 
4. Retrieve the configuration files of each of these tests with the [Get a browser test](https://docs.datadoghq.com/api/latest/synthetics/#get-a-browser-test) endpoint.

Having the configuration files for your browser tests allows you to store it for later usage. With this file, you can duplicate, update or delete your tests programmatically.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}