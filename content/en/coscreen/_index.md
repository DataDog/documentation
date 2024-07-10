---
title: CoScreen
further_reading:
- link: 'https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/'
  tag: 'Blog'
  text: 'Leverage collaborative screen sharing with Datadog CoScreen'
cascade:
    algolia:
        rank: 70
---

{{< img src="coscreen/collab-v2.mp4" alt="Three users share three windows at the same time." width=80% video="true">}}

## Overview
[CoScreen][1] is a collaborative meeting tool that allows multiple participants to simultaneously share and interact with any application window on their desktops. It is specifically designed for engineering use cases—such as pair programming, incident management, joint troubleshooting, team standups, and employee onboarding.

## Setup
#### Requirements
{{< tabs >}}
{{% tab "Desktop" %}}
The CoScreen desktop app is available for Windows 10 and macOS v10.15 Catalina and higher.

[Download CoScreen][1].

After installing CoScreen, launch the desktop app. You can sign in with your Datadog account.

[1]: https://www.coscreen.co/download
{{% /tab %}}
{{% tab "Web" %}}
The [CoScreen web app][1] is supported in Chrome v87+, Edge v87+, and Safari v16+.

The CoScreen web app has limited functionality. To make full use of CoScreen's features, use the desktop app.

[1]: https://app.coscreen.co/
{{% /tab %}}
{{< /tabs >}}

## Usage
### Join a CoScreen

If you were invited to a CoScreen, click on the link. You can click on **Join from browser** to join the CoScreen through the web app, or you can launch the desktop app. You can also join manually by entering your meeting link or ID.

When you join a CoScreen, it is added to your list of _Recent CoScreens_ in the main menu. You can rejoin these at any time.

To enable noise reduction in the desktop app, go to **Settings** > **Audio** and select _Apply noise reduction to my microphone_.

On macOS, you can enable background blurring under **Settings** > **Camera** > **Video Effects**.

### Invite your collaborators

Invite collaborators by sharing the link.

You can also add your closest collaborators to the list of _Your Collaborators_ in the main menu. After a collaborator accepts your request, you can see if they are online and available and call them with a click.

### Share windows

With the CoScreen desktop app, you can share application windows in multiple ways.

#### Select individual windows to be shared

{{< img src="coscreen/sharewindow2.mp4" alt="A 'Share window' tab-shaped button is attached to the top of a window. Clicking on this button highlights the window in purple. The text changes to 'Unshare window.'" width=50% video="true">}}

Once you have joined a CoScreen, you can hover over any window in any of your displays, and a **Share** tab appears. Share and unshare windows by clicking on this tab. You can also use the window sharing dialog to select the application window(s) that you want to share with other members of the CoScreen you've joined.

Multiple users can share multiple windows at the same time. Shared windows have a border around them, in a different color assigned to each CoScreen participant.

#### Use the window sharing dialog to share entire displays or individual windows

Click on the **Share windows** button to open the window sharing dialog.

{{< img src="coscreen/share_windows_button.png" alt="A panel of buttons from the CoScreen desktop UI. The 'Share windows' button is highlighted." style="width:50%;">}}

If you have multiple displays, you can select a display and click **Share the entire display** to share all open windows on that display. While screen sharing is enabled, all windows that you open or drag onto your shared display are also shared.

You can also select any number of windows on any of your displays to share.

Screen sharing is deactivated by default when you join a CoScreen.

### Collaborate in shared windows

{{< img src="coscreen/v5-control-tabs.mp4" alt="Two cursors interact with a shared window at the same time." video="true" width=70% >}}

You can see the mouse pointers of remote participants whenever they move their pointers over a shared window. When viewing a remote window, two tabs appear: **Control**, which enables you to interact with the window, click on buttons, and type into text fields; and **Draw**, which enables you to draw on the window.

### Collaborate in a shared terminal

CoScreen includes a shared, collaborative terminal that enables users to run commands and to write and debug code together.

To start a shared terminal, click on the **Share terminal** button in the meeting menu:

{{< img src="coscreen/share_terminal.png" alt="A panel of buttons from the CoScreen desktop UI. The 'Share terminal' button is highlighted." style="width:70%;">}}

The shared terminal appears for you and all other participants in the CoScreen session. If you enable remote control in CoScreen, other users can type and click into your terminal.

{{< img src="coscreen/coterm.png" alt="A shared CoScreen terminal window." style="width:60%;">}}

To stop sharing, click the **Unshare** tab on the terminal window, or on the button in the meeting menu. 

For privacy, CoScreen uses [Sensitive Data Scanner][8] and entropy filters to detect and obfuscate sensitive data.

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
[8]: /sensitive_data_scanner/
