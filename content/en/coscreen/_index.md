---
title: CoScreen
kind: documentation
---

## Overview
[CoScreen][1] is a collaborative meeting tool that allows multiple participants to simultaneously share and interact with any application window on their desktops. It was specifically designed for engineers for use cases such as pair programming, incident management, joint troubleshooting, team standups, and employee onboarding.

## Setup
### Requirements
CoScreen is a desktop app available for Windows 10 and macOS v10.15 Catalina and higher. 

## Usage

With CoScreen, multiple users can share windows with each other at the same time. You can share application windows in multiple ways.

 - **Select individual windows to be shared**.

   When you join a CoScreen, you can use a window picker to select the application window(s) that you want to share with other members of the CoScreen you've joined. You can also share and unshare windows by clicking on the tab above each window.

   You can share multiple windows at the same time. Shared windows have a border around them in a color assigned to each CoScreen participant.

   {{< img src="coscreen/sharewindow.mp4" alt="Facet creation for custom tag" style="width:60%;" video="true">}}
 - **Share all windows on your display**.
 
   When you join a CoScreen, click on the screen sharing icon next to your user and select _All Windows_. This shares all open windows on a designated display. While screen sharing is enabled, all windows that you open or drag onto that display are also shared.

Screen sharing is deactivated by default when you join a CoScreen. CoScreen shares windows, but does not share your desktop backgrounds or icons. 

**Note**: If your company uses a corporate firewall/SSL Inspection, the CoScreen client might not be able to connect to the CoScreen server and would therefore be unable to establish a connection between you and your team members. Contact support for a list of URLs to whitelist.

### Integrations

You can integrate CoScreen with Slack, Google Calendar, VS Code, and other apps. [See all CoScreen integrations.][2]

#### CoScreen + Slack

To install the CoScreen Slack app, go to [coscreen.co/slack][3] and click on _Add to Slack_. To enable CoScreen in private channels, type `@coscreen` and hit enter/return, then click on _Invite to Channel_. To enable CoScreen in multi-user DMs, go to _View Member List_ -> _Add People_ -> _CoScreen_.

#### CoScreen + Google Calendar

To configure this integration, install the [CoScreen Chrome extension][4] and sign in. Open any Google Calendar event and use the **Add CoScreen** button to make the event a CoScreen meeting.

## Security and privacy

 - **Network Security**

	CoScreen uses a P2P (peer-to-peer) connection whenever you and another participant can connect directly (for example, when no corporate firewalls or proxies are between the two of you). None of your audio, video, window, or control input feeds touch CoScreen's servers. Connections are end-to-end encrypted using DTLS-SRTP.

 - **Video Infrastructure**

   Participants collaborate using an enterprise-grade, HIPAA-compatible video infrastructure with hundreds of servers that run the Jitsi framework. All video data is encrypted using DTLS-SRTP during transmission.


 - **Data Storage**
   CoScreen does not recore or store any shared information (e.g. shared windows, audio, video or remote control input).

   CoScreen captures general usage data, like used app features and session statistics, to learn about bugs and usage patterns. CoScreen never records or accesses shared windows or control input apart from enabling you to exchange window content and controls with your peers. See [CoScreen's Privacy Policy][5] for more details.

For all the details on how CoScreen enables secure collaboration, read the [CoScreen Security Whitepaper][6].

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/integrations
[3]: https://coscreen.co/slack
[4]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[5]: https://app.termly.io/document/privacy-policy/f8dd1607-7755-4f56-9f7a-bc7d57a69e49
[6]: https://www.coscreen.co/security
