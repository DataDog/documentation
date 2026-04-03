---
title: Google Workspace
description: Connect Datadog Actions to Google Workspace services using OAuth2 to automate tasks in Gmail, Calendar, Drive, Docs, Sheets, Forms, and Chat.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials"
---

Use a Google Workspace connection to authenticate Datadog Actions against Google Workspace APIs. This allows you to interact with Gmail, Google Calendar, Google Drive, Google Docs, Google Sheets, Google Forms, and Google Chat in your workflows and apps.

## Prerequisites

Before creating the connection in Datadog, you must set up an OAuth2 client in Google Cloud.

### 1. Create a Google Cloud project

If you don't already have a Google Cloud project:

1. Go to the [Google Cloud Console][1].
1. Click **Select a project** > **New Project**.
1. Enter a project name and click **Create**.

### 2. Enable the required APIs

Enable the Google APIs you plan to use in your workflows:

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**.
1. Search for and enable the APIs for the Google Workspace services you intend to use:

| Google Workspace service | API to enable |
|---|---|
| Gmail | Gmail API |
| Google Calendar | Google Calendar API |
| Google Drive | Google Drive API |
| Google Docs | Google Docs API |
| Google Sheets | Google Sheets API |
| Google Forms | Google Forms API |
| Google Chat | Google Chat API |

### 3. Configure the OAuth consent screen

1. In the Google Cloud Console, navigate to **APIs & Services** > **OAuth consent screen**.
1. Select a user type:
   - **Internal**: Limits access to users in your Google Workspace organization. Recommended for most enterprise use cases.
   - **External**: Allows any Google account to authorize. Requires app verification for production use.
1. Fill in the required app information fields and click **Save and Continue**.
1. Under **Scopes**, add the OAuth scopes required for the actions you intend to use. See the [scopes reference](#scopes-reference) below.
1. Complete the remaining steps and click **Back to Dashboard**.

### 4. Create OAuth2 credentials

1. In the Google Cloud Console, navigate to **APIs & Services** > **Credentials**.
1. Click **Create Credentials** > **OAuth client ID**.
1. For **Application type**, select **Web application**.
1. Under **Authorized redirect URIs**, add the Datadog OAuth callback URL. This URL is displayed in the Datadog connection creation dialog when you select **Google Workspace**.
1. Click **Create**.
1. Copy the **Client ID** and **Client Secret** — you need these when creating the connection in Datadog.

## Create the connection in Datadog

1. From the [Workflow Automation page][2] or the [App Builder page][3], click the **Connections** tab.
1. Click **New Connection**.
1. Select the **Google Workspace** icon.
1. Enter a **Connection Name**.
1. Enter the **Client ID** and **Client Secret** from your Google Cloud OAuth2 credentials.
1. Select the **Scopes** required for the actions you plan to use. See the [scopes reference](#scopes-reference) below.
1. The **Authorize URL** and **Token URL** fields are pre-populated with Google's default OAuth2 endpoints. Leave these as-is unless you have a specific reason to change them.
1. Click **Create**.
1. In the authorization window that opens, sign in with the Google account you want to use and grant the requested permissions.

## Scopes reference

Select only the scopes required by the actions you intend to use.

### Gmail

| Scope label | Scope value | Description |
|---|---|---|
| Gmail: Full Access | `https://mail.google.com/` | Full read and write access to all Gmail resources |
| Gmail: Read, Compose, Send, and Permanently Delete Threads | `https://www.googleapis.com/auth/gmail.modify` | All access except deleting permanently |
| Gmail: Read Only | `https://www.googleapis.com/auth/gmail.readonly` | View email messages and settings |
| Gmail: Send Only | `https://www.googleapis.com/auth/gmail.send` | Send email on behalf of the user |
| Gmail: Compose and Send | `https://www.googleapis.com/auth/gmail.compose` | Manage drafts and send email |
| Gmail: Manage Labels | `https://www.googleapis.com/auth/gmail.labels` | Create, read, update, and delete labels |
| Gmail: View Metadata Only | `https://www.googleapis.com/auth/gmail.metadata` | View email metadata such as labels and headers |

### Google Calendar

| Scope label | Scope value | Description |
|---|---|---|
| Calendar: Full Access | `https://www.googleapis.com/auth/calendar` | Full read and write access to calendars |
| Calendar: Read Only | `https://www.googleapis.com/auth/calendar.readonly` | View calendars |
| Calendar: Manage Events | `https://www.googleapis.com/auth/calendar.events` | View and edit events on all calendars |
| Calendar: View Events | `https://www.googleapis.com/auth/calendar.events.readonly` | View events on all calendars |

### Google Drive

| Scope label | Scope value | Description |
|---|---|---|
| Drive: Full Access | `https://www.googleapis.com/auth/drive` | Full read and write access to all Drive files |
| Drive: Read Only | `https://www.googleapis.com/auth/drive.readonly` | View files in Drive |
| Drive: Access Files Created by This App | `https://www.googleapis.com/auth/drive.file` | Access only files created or opened by this app |
| Drive: App Data Folder | `https://www.googleapis.com/auth/drive.appdata` | Access the app-specific data folder |
| Drive: Manage Metadata | `https://www.googleapis.com/auth/drive.metadata` | View and manage metadata of files |
| Drive: View Metadata | `https://www.googleapis.com/auth/drive.metadata.readonly` | View metadata of files |

### Google Docs

| Scope label | Scope value | Description |
|---|---|---|
| Docs: Full Access | `https://www.googleapis.com/auth/documents` | View and manage Google Docs documents |
| Docs: Read Only | `https://www.googleapis.com/auth/documents.readonly` | View Google Docs documents |

### Google Sheets

| Scope label | Scope value | Description |
|---|---|---|
| Sheets: Full Access | `https://www.googleapis.com/auth/spreadsheets` | View and manage Google Sheets spreadsheets |
| Sheets: Read Only | `https://www.googleapis.com/auth/spreadsheets.readonly` | View Google Sheets spreadsheets |

### Google Forms

| Scope label | Scope value | Description |
|---|---|---|
| Forms: Create and Edit Forms | `https://www.googleapis.com/auth/forms.body` | View and manage form definitions |
| Forms: View Forms | `https://www.googleapis.com/auth/forms.body.readonly` | View form definitions |
| Forms: View Responses | `https://www.googleapis.com/auth/forms.responses.readonly` | View form responses |

### Google Chat

| Scope label | Scope value | Description |
|---|---|---|
| Chat: View, Compose, and Delete Messages | `https://www.googleapis.com/auth/chat.messages` | View, create, update, and delete messages |
| Chat: Compose and Send Messages | `https://www.googleapis.com/auth/chat.messages.create` | Create and send messages in spaces |
| Chat: View Messages | `https://www.googleapis.com/auth/chat.messages.readonly` | View messages and reactions |
| Chat: Manage Spaces | `https://www.googleapis.com/auth/chat.spaces` | Create, view, update, and delete spaces |
| Chat: Create Spaces | `https://www.googleapis.com/auth/chat.spaces.create` | Create spaces |
| Chat: View Spaces | `https://www.googleapis.com/auth/chat.spaces.readonly` | View spaces |

### User identity

| Scope label | Scope value | Description |
|---|---|---|
| User Info: Email Address | `https://www.googleapis.com/auth/userinfo.email` | View the user's email address |
| User Info: Basic Profile | `https://www.googleapis.com/auth/userinfo.profile` | View the user's basic profile info |
| OpenID Connect | `openid` | Authenticate using OpenID Connect |

### Google Workspace Admin

| Scope label | Scope value | Description |
|---|---|---|
| Admin: Manage Users | `https://www.googleapis.com/auth/admin.directory.user` | Create, read, update, and delete users |
| Admin: View Users | `https://www.googleapis.com/auth/admin.directory.user.readonly` | View users in the directory |
| Admin: Manage Groups | `https://www.googleapis.com/auth/admin.directory.group` | Create, read, update, and delete groups |
| Admin: View Groups | `https://www.googleapis.com/auth/admin.directory.group.readonly` | View groups in the directory |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** or **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://console.cloud.google.com/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/app-builder
[4]: https://chat.datadoghq.com/
