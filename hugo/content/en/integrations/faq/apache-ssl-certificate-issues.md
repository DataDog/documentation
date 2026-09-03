---
title: Apache SSL certificate issues

---

If you're having issues with your Apache integration, it may be because the upgraded version of Python in Agent version 5.2 has bug fixes concerning SSL certificates.

A "faulty" SSL certificate that the Agent previously accepted may be rejected resulting in errors.

To resolve the issue, patch the apache.py file in /checks.d with [these changes][1]:

[1]: https://gist.github.com/philliphaines/06e7cef908f921de94b5
