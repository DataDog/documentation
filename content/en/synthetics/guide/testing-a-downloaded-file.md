---
title: Test a downloaded file
kind: guide
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
---

Journeys on web applications often involve files download: be it an order confirmation for an ecommerce website, exporting the history of a bank account’s transaction to a pdf or a csv, or downloading certificates from official authorities.

Confirm that all these download links are working as expected using Datadog’s browser tests and the `Test a downloaded file` assertion. This means that Datadog can verify that your downloaded files are correctly being served (potentially by your FTP server), but also that they are being downloaded with the expected name, size, and that the data is not corrupted along the way.

In order to setup such browser test:

1. **Record the step that generates the file download** in your browser test. The example below shows how to record a click on a button that triggers the download of a `.docx` file:

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="Recording steps" video="true">}}

2. **Add a `Test a downloadeded file` assertion** to confirm that the file was correctly downloaded:

    {{< img src="synthetics/guide/testing-a-downloaded-file/adding_assertion.mp4" alt="Adding assertions" video="true">}}

     If needed, you can perform some more advanced verifications, for instance on your filename, on its size, and even on its integrity using a md5 string:

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_verifications.mp4" alt="Advanced verification" video="true">}}

     See the full list of [Browser test assertions][1] to learn more on the `Test a downloaded file` assertion.

3. **Confirm that the file was downloaded** and matched the requirements you set up in your assertion by looking at the generated test result:

    {{< img src="synthetics/guide/testing-a-downloaded-file/tests_results.png" alt="Test results" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/#assertion
