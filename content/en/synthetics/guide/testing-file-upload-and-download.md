---
title: Upload and Download A Test File
kind: guide
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
      tag: 'Blog'
      text: 'Introducing Datadog Synthetic Monitoring'
    - link: 'synthetics/'
      tag: 'Documentation'
      text: 'Learn about Synthetic Monitoring'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
---

## Overview

Web applications can embed a lot of logic, and although end-to-end tests are often mostly made of basic interactions (for example, clicks and input forms) for testing your website, you sometimes need to go one step further and verify complex interactions to ensure key business transactions can be performed on your application.

## Testing a file upload

You can **upload a file** to validate the final step of a functional workflow to test a profile creation. When uploading a file at the test recorder level, Datadog Synthetic browser tests automatically identify the uploaded file and create the [`Upload file` associated step][1]. It is then able to upload that file again at test execution.

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="Upload File" video="true" width="100%">}}

## Testing a file download

**Downloading files** is another common action users take on web applications: downloading an order confirmation from an e-commerce website or the PDF or CSV export history of bank account transactions.

Datadog's browser tests and the `Test a downloaded file` assertion allow you to verify that downloadable files from your web application are correctly being served (for example, from your FTP server). With this assertion, downloadable files can be tested to ensure they have the correct file name, size, and data.

To setup a browser test with this assertion:

1. **Record the step that generates the file download** in your browser test. The example below shows how to record a click on a button that triggers the download of a `.docx` file. The file size must be below 100Mb.

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="Recording steps" video="true">}}

2. **Add a `Test a downloaded file` assertion** to confirm that the file was correctly downloaded:

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="Adding assertions" video="true">}}

     If needed, you can perform some more advanced verifications, for instance on your filename, on its size, and even on its integrity using a md5 string:

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="Advanced verification" video="true">}}

     See the full list of [Browser test assertions][2] to learn more on the `Test a downloaded file` assertion.

3. **Confirm that the file was downloaded** and matched the requirements you set up in your assertion by looking at the generated test result:

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="Test results" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/#upload-file
[2]: /synthetics/browser_tests/actions/#assertion
