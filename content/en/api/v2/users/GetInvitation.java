import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        String userInvitationUuid = userInvitationUuid_example; // String | The UUID of the user invitation.
        try {
            UserInvitationResponse result = apiInstance.getInvitation(userInvitationUuid);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#getInvitation");
            e.printStackTrace();
        }
    }
}