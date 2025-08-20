Use unit testing to test your rules against sample logs and make sure the detection rule is working as expected. This can be helpful when you are creating a detection rule for an event that hasn't happened yet, so you don't have actual logs for it. For example: You have logs with a `login_attempt` field and want to detect logs with `login_attempt:failed`, but you only have logs with `login_attempt:success`. To test the rule, you can construct a sample log by copying a log with `login_attempt:success` and changing the `login_attempt` field to `failed`.

To use unit testing:

1. After entering the rule query, click **Unit Test**.
1. To construct a sample log, you can:  
    a. Navigate to [Log Explorer][2].  
    b. Enter the same detection rule query in the search bar.  
    c. Select one of the logs.  
    d. Click the export button at the top right side of the log side panel, and then select **Copy**.
1. Navigate back to the **Unit Test** modal, and then paste the log into the text box. Edit the sample as needed for your use case.
1. Toggle the switch for **Query is expected to match based on the example event** to fit your use case.
1. Click **Run Query Test**.