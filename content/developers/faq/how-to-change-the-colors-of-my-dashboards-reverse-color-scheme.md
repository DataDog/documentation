---
title: How to change the colors of my dashboards? Reverse Color Scheme
kind: faq
customnav: developersnav
---

Customers reported to us 2 solutions to change colors on dashboards, to obtain a reverse color scheme.

## Deluminate (Chrome)

This Chrome plugin will help you change the Color Scheme for your browser (Contrast, Reverse Colors, Image colors, Luminance) [Deluminate](https://chrome.google.com/webstore/detail/deluminate/iebboopaeangfpceklajfohhbpkkfiaa?hl=en-US).

Simple to setup and easily activated/unactivated, Deluminate is a good fit for Datadog Screenboards.
{{< img src="developers/faq/deluminate.png" alt="deluminate" responsive="true" >}}

## Stylebot (Chrome)

Stylish offers more possibilities to customize the css of any web page.

You can use the library created by adamjt for Datadog Screenboards: `http://stylebot.me/styles/4320`

{{< img src="developers/faq/style_bot.jpg" alt="style_bot" responsive="true" >}}

Here is how to proceed to enjoy this css style on Chrome using Stylebot:

1. Install the Stylebot extension for Chrome: `https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha?hl=en`
2. On the css page, `http://stylebot.me/styles/4320`, click the scissors "CSS" icon and copy all the css
3. Click the Stylebot icon to open the menu, choose "Options"
4. In the left colunm choose 'Styles', then click "Add a new Style"
5. URL: p.datadoghq.com
6. In the text zone, paste the whole css code previously copied from our css page
7. Save
8. Next time you will visit a shared dashboard, this new css style will be enabled.

If you have any custom css style sheet that you would like to share, please [reach out to us](/help)