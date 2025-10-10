(Optional) Create a suppression or add the rule to an existing suppression to prevent a signal from getting generated in specific cases. For example, if a user `john.doe` is triggering a signal, but their actions are benign and you do not want signals triggered from this user, add the following query into the **Add a suppression query** field: `@user.username:john.doe`.

#### Create new suppression

1. Enter a name for the suppression rule.
1. (Optional) Enter a description.
1. Enter a suppression query.
1. (Optional) Add a log exclusion query to exclude logs from being analyzed. These queries are based on **log attributes**.
    - **Note**: The legacy suppression was based on log exclusion queries, but it is now included in the suppression rule's **Add a suppression query** step.

#### Add to existing suppression

1. Click **Add to Existing Suppression**.
1. Select an existing suppression in the dropdown menu.


