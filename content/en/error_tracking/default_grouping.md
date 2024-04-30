---
title: Default Grouping
kind: documentation
description: Understand how errors are grouped into issues.
---

## Overview

Error Tracking intelligently groups similar errors into issues. This grouping is based on the following error properties:

- `service`: the service where the error occurred.
- `error.type` or `error.kind`: the class of the error.
- `error.message`: a description of the error.
- `error.stack`: the file name and the function name of the frame where the error was thrown.

If any of those properties differ for two given errors, they will be grouped under different issues. Therefore, Error Tracking cannot group issues across services or error types.

**Note**: Error Tracking removes variables such as versions, ids, dates from these properties to improve the grouping accuracy. 

## Special considerations
 
### Mobile and frontend applications

Upload your source maps to identify the error stack frame and experience a better grouping.

- Web: [Sourcemaps upload][1]
- Mobile: [Crash reporting][2] 

[1]: /real_user_monitoring/guide/upload-javascript-source-maps
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup
