---
title: Upload and Download A Test File
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Upload
  and Download A Test File
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/testing-file-upload-and-download/index.html
---

# Upload and Download A Test File

## Overview{% #overview %}

Web applications can embed a lot of logic, and although end-to-end tests are often mostly made of basic interactions (for example, clicks and input forms) for testing your website, you sometimes need to go one step further and verify complex interactions to ensure key business transactions can be performed on your application.

## Testing a file upload{% #testing-a-file-upload %}

You can **upload a file** to validate the final step of a functional workflow to test a profile creation. When uploading a file at the test recorder level, Datadog Synthetic browser tests automatically identify the uploaded file and create the [`Upload file` associated step](https://docs.datadoghq.com/synthetics/browser_tests/actions/#upload-file). It is then able to upload that file again at test execution.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/testing-a-downloaded-file/upload_file.mp4" /%}

## Testing a file download{% #testing-a-file-download %}

**Downloading files** is another common action users take on web applications: downloading an order confirmation from an e-commerce website or the PDF or CSV export history of bank account transactions.

Datadog's browser tests and the `Test a downloaded file` assertion allow you to verify that downloadable files from your web application are correctly being served (for example, from your FTP server). With this assertion, downloadable files can be tested to ensure they have the correct file name, size, and data.

To setup a browser test with this assertion:

1. **Record the step that generates the file download** in your browser test. The example below shows how to record a click on a button that triggers the download of a `.docx` file. The file size must be below 250Mb.

   {% video
      url="https://datadog-docs.imgix.net/images/synthetics/guide/testing-a-downloaded-file/recording_step.mp4" /%}

1. **Add a `Test a downloaded file` assertion** to confirm that the file was correctly downloaded:

   {% video
      url="https://datadog-docs.imgix.net/images/synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" /%}

If needed, you can perform some more advanced verifications, for instance on your filename, on its size, and even on its integrity using a md5 string:

   {% video
      url="https://datadog-docs.imgix.net/images/synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" /%}

See the full list of [Browser test assertions](https://docs.datadoghq.com/synthetics/browser_tests/actions/#assertion) to learn more on the `Test a downloaded file` assertion.

1. **Confirm that the file was downloaded** and matched the requirements you set up in your assertion by looking at the generated test result:

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/testing-a-downloaded-file/test_results.e092adb139afd044679077c8e062f827.png?auto=format"
      alt="Test results" /%}

## Further Reading{% #further-reading %}

- [Introducing Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/introducing-synthetic-monitoring/)
- [Learn about Synthetic Monitoring](https://docs.datadoghq.com/synthetics/)
- [Configure a Browser Test](https://docs.datadoghq.com/synthetics/browser_tests)
