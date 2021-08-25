---
title: Troubleshooting - Browser Issues
kind: faq
aliases:
    - /graphing/faq/troubleshooting-browser-issues
---

If you're seeing unexpected results on the Datadog site such as missing data or blank graphs/widgets, try the following checklist to troubleshoot the issue:

- Check if you have the same issue using incognito mode/private browsing
- Open your browser console to see whether there are any errors in the Network tab
- Check if you have the same issue using a different browser
- Ask teammates to check their accounts from their machines and confirm whether they can reproduce the issue
- Log in to your account from a different machine to see whether the issue persists
- Check that your system clock is not [significantly offset from NTP][1]
- Are you experiencing this from multiple locations? Can you send the output of:
    - traceroute app.datadoghq.com
    - tracepath app.datadoghq.com
- Is this dashboard specific? Using the Chrome browser, do the following:
    - Select View->Developer->Developer Tools
    - Click on the Network tab of the new window that opens
    - Load the dashboard experiencing issues
    - After the page has loaded, right click on the results that show up and * select "Save as HAR with content"
    - Save the file as an attachment and send it to [Datadog support][2].

In most of the scenarios above, the root cause of the issue is related to a browser extension, outdated browser, or something similar.

For further assistance, contact [Datadog support][2]. To expedite your request include:

- Results of the above tests
- A screenshot of your issue
- A link to the page in question
- Extensions you're running
- Browser version
- OS versions

## Mobile browsing

The Datadog application is partially supported on all mobile browsers and is presented in mobile friendly format. If you are having issues or would like to provide feedback on the mobile browsing experience, contact [Datadog support][2].

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /help/
