import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        String userHandle = test@datadoghq.com; // String | The id of the user
        User body = ; // User | 
        try {
            UserResponse result = apiInstance.updateUser(userHandle, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#updateUser");
            e.printStackTrace();
        }
    }
}