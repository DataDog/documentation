import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        UserInvitationPayload body = ; // UserInvitationPayload | 
        try {
            UserInvitationsResponse result = apiInstance.sendInvitations(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#sendInvitations");
            e.printStackTrace();
        }
    }
}