---
title: Clone your Synthetic tests
kind: faq
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
---

You can clone your Synthetic test from within the UI or by using our API:

**Using the UI**
![Screen Recording 2022-02-17 at 12 06 08 p m](https://user-images.githubusercontent.com/66995358/154469062-80817bde-254b-4fed-bacb-81b452b156ba.gif)



**Using the API**
1. Retrieve your test configuration using the relevant endpoint [Get an API test][1] or [Get a Browser test][2].
2. Perform modifications if needed (URL, tags, etc.).
3. Send your new test configuration using the relevant endpoint [Create an API test][3] or [Create a Browser test][4].

[1]: /api/latest/synthetics/#get-a-browser-test
[2]: /api/latest/synthetics/#get-an-api-test
[3]: /api/latest/synthetics/#create-an-api-test
[4]: /api/latest/synthetics/#create-a-browser-test


