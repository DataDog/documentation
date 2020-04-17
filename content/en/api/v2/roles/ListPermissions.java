import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        try {
            PermissionsResponse result = apiInstance.listPermissions();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#listPermissions");
            e.printStackTrace();
        }
    }
}