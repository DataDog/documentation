---
title: CoScreen
kind: documentation
further_reading:
- link: 'https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/'
  tag: 'Blog'
  text: 'Leverage collaborative screen sharing with Datadog CoScreen'
---

{{< img src="coscreen/collab-v2.mp4" alt="Three users share three windows at the same time." width=80% video="true">}}

## Overview
[CoScreen][1] is a collaborative meeting tool that allows multiple participants to simultaneously share and interact with any application window on their desktops. It was specifically designed for engineers for use cases such as pair programming, incident management, joint troubleshooting, team standups, and employee onboarding.

## Setup
#### Requirements
CoScreen is a desktop app available for Windows 10 and macOS v10.15 Catalina and higher.

[Download CoScreen][2].

After installing CoScreen, launch the desktop app and sign up.

### Join your first CoScreen

Click on **New CoScreen** to create a new CoScreen. If you were invited to a CoScreen, click on the link, or click on **Join a CoScreen** and paste the CoScreen ID or URL.

When you join a CoScreen, it is added to your list of _Recent CoScreens_ in the main menu. You can rejoin these at any time.

### Invite your collaborators

Invite collaborators by sharing the link.

You can also add your closest collaborators to the list of _Your Collaborators_ in the main menu. After a collaborator accepts your request, you can see if they are online and available and call them with a click.

### Share windows

You can share application windows in multiple ways.

 - **Select individual windows to be shared**.

   {{< img src="coscreen/sharewindow.mp4" alt="A 'Share window' tab-shaped button is attached to the top of a window. Clicking on this button highlights the window in purple. The text changes to 'Unshare window.'" width=50% video="true">}}

Share and unshare windows by clicking on the tab above each window. You can also use the window sharing dialog to select the application window(s) that you want to share with other members of the CoScreen you've joined.

 Multiple users can share multiple windows at the same time. Shared windows have a border around them in a different color assigned to each CoScreen participant.

 - **Share all windows on your display**.

Open the window sharing dialog and select the first option, _Entire display_, to share all open windows on this display. While screen sharing is enabled, all windows that you open or drag onto that display are also shared.

Click on the **Share windows** button to open the window sharing dialog.

{{< img src="coscreen/share_windows_button.png" alt="A panel of buttons from the CoScreen desktop UI. The 'Share windows' button is highlighted." style="width:50%;">}}

By default, when you join a CoScreen, the following dialog appears:

{{< img src="coscreen/share_windows.png" alt="The window sharing dialog. Users are prompted to choose a display, and then to select a window or windows to share." style="width:60%;">}}

If you have multiple displays, choose which display contains the window or windows you want to share.


Screen sharing is deactivated by default when you join a CoScreen.

### Collaborate in shared windows

{{< img src="coscreen/collaborate-v2.mp4" alt="Two cursors interact with a shared window at the same time." video="true" width=70% >}}

You can see the mouse pointers of remote participants whenever they move their pointers over a shared window. **Everyone can click and type into any shared window**. If you click the _Draw_ button on the tab of a remote window, you can also draw on a shared window.

### Integrations

You can integrate CoScreen with Slack, Google Calendar, VS Code, and other apps. [See all CoScreen integrations.][3]

#### CoScreen + Slack

To install the CoScreen Slack app, go to [coscreen.co/slack][4] and click on _Add to Slack_. To enable CoScreen in private channels, type `@coscreen` and hit enter/return, then click on _Invite to Channel_. To enable CoScreen in multi-user DMs, go to _View Member List_ -> _Add People_ -> _CoScreen_.

#### CoScreen + Google Calendar

To configure this integration, install the [CoScreen Chrome extension][5] and sign in. Open any Google Calendar event and use the **Add CoScreen** button to make the event a CoScreen meeting.

## Security and privacy

 - **Network security**

CoScreen uses a P2P (peer-to-peer) connection whenever you and another participant can connect directly (for example, when there are no corporate firewalls or proxies between you). None of your audio, video, window, or control input feeds touch CoScreen's servers. Connections are end-to-end encrypted using DTLS-SRTP. If there are three or more users in a session, the connection is over a video bridge.

 - **Video infrastructure**

Participants collaborate using an enterprise-grade, HIPAA-compatible video infrastructure with hundreds of servers that run the Jitsi framework. All video data is encrypted using DTLS-SRTP during transmission.


 - **Data storage**

CoScreen does not record or store any shared information (for example, shared windows, audio, video or remote control input).

CoScreen captures general usage data, like used app features and session statistics, to learn about bugs and usage patterns. CoScreen never records or accesses shared windows or control input apart from enabling you to exchange window content and controls with your peers. See [CoScreen's Privacy Policy][6] for more details.

For all the details on how CoScreen enables secure collaboration, read the [CoScreen Security Whitepaper][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/download
[3]: https://www.coscreen.co/integrations
[4]: https://coscreen.co/slack
[5]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[6]: https://www.datadoghq.com/legal/privacy/
[7]: https://www.coscreen.co/security
